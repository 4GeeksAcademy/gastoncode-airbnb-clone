"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { filterChips, resultStays, resultsHeader, type ResultStay } from "../data/results-data";
import { ChevronDownIcon, HeartIcon, HomeIcon, MapPinIcon, SearchIcon, StarIcon } from "./icons";
import {
  createSearchQuery,
  defaultSearchState,
  formatCompactSearchDate,
  getSearchStateSnapshot,
  parseSearchStateFromQuery,
  saveSearchStateToStorage,
  subscribeToSearchState,
  sanitizeSearchState,
  type SearchState,
} from "../data/search-state";
import type { ResultsCategoryId, ResultsSearchBarProps } from "../types/ui";

const resultsCategories: { id: ResultsCategoryId; label: string }[] = [
  { id: "playa", label: "Playa" },
  { id: "mansiones", label: "Mansiones" },
  { id: "tendencias", label: "Tendencias" },
  { id: "cabanas", label: "Cabanas" },
  { id: "vinedos", label: "Vinedos" },
];

function stayMatchesCategory(stay: ResultStay, category: ResultsCategoryId): boolean {
  const searchableText = `${stay.title} ${stay.subtitle} ${stay.details}`.toLowerCase();
  const ratingValue = Number(stay.rating);

  if (category === "playa") {
    return /playa|mar|costa|rio|puerto|balcon/.test(searchableText);
  }

  if (category === "mansiones") {
    return /casa|duplex|penthouse|premium|terraza|jacuzzi/.test(searchableText);
  }

  if (category === "tendencias") {
    return (Number.isFinite(ratingValue) && ratingValue >= 4.9) || Boolean(stay.badge) || Boolean(stay.favorite);
  }

  if (category === "cabanas") {
    return /cabana|loft|studio|monoambiente/.test(searchableText);
  }

  return /vino|vinedo|bohemio|rustica|jardin/.test(searchableText);
}

function ResultsCategoryRow({
  activeCategory,
  onCategoryChange,
}: {
  activeCategory: ResultsCategoryId;
  onCategoryChange: (categoryId: ResultsCategoryId) => void;
}) {
  return (
    <section className="category-row" aria-label="Filtros por categoria">
      {resultsCategories.map((category) => (
        <button
          key={category.id}
          className={`category-pill ${activeCategory === category.id ? "is-active" : ""}`}
          type="button"
          onClick={() => onCategoryChange(category.id)}
          aria-pressed={activeCategory === category.id}
        >
          <span className="category-icon" aria-hidden="true">
            {category.id === "playa" ? <MapPinIcon /> : null}
            {category.id === "mansiones" ? <HomeIcon /> : null}
            {category.id === "tendencias" ? <StarIcon /> : null}
            {category.id === "cabanas" ? <SearchIcon /> : null}
            {category.id === "vinedos" ? <HeartIcon /> : null}
          </span>
          {category.label}
        </button>
      ))}
    </section>
  );
}

function ResultsSearchBar({ searchState, onFieldChange, onSearch }: ResultsSearchBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const dateSummary = `${formatCompactSearchDate(searchState.checkIn)} - ${formatCompactSearchDate(searchState.checkOut)}`;
  const guestSummary = `${searchState.adults} adultos · ${searchState.children} ninos`;

  const updateGuestCount = (field: "adults" | "children", delta: number) => {
    const currentValue = Number(searchState[field]);
    const minValue = field === "adults" ? 1 : 0;
    const nextValue = Math.max(minValue, currentValue + delta);
    onFieldChange(field, String(nextValue));
  };

  const handleSearchClick = () => {
    onSearch();
    setIsExpanded(false);
  };

  return (
    <section className="search-shell" aria-label="Buscador de resultados">
      <div className="results-search-header">
        <Link href="/" className="results-home-btn" aria-label="Volver a inicio">
          <HomeIcon />
        </Link>

        <div className="search-form" role="search" aria-label="Busqueda de alojamientos">
        <button
          className={`search-chip search-chip-toggle ${isExpanded ? "is-expanded" : ""}`}
          type="button"
          onClick={() => setIsExpanded((current) => !current)}
          aria-expanded={isExpanded}
        >
          <SearchIcon />
          <span className="search-chip-copy">
            <strong>{searchState.destination}</strong>
            <small>{dateSummary} · {guestSummary}</small>
          </span>
          <span className="search-chip-caret" aria-hidden="true">{isExpanded ? "▴" : "▾"}</span>
        </button>

        {isExpanded ? (
          <div className="search-panel">
            <label className="search-field">
              <span>Destino</span>
              <input
                type="text"
                value={searchState.destination}
                onChange={(event) => onFieldChange("destination", event.target.value)}
                placeholder="Ingresa un destino"
              />
            </label>

            <div className="search-dates-row">
              <label className="search-field">
                <span>Llegada</span>
                <input
                  type="date"
                  value={searchState.checkIn}
                  onChange={(event) => onFieldChange("checkIn", event.target.value)}
                />
              </label>
              <label className="search-field">
                <span>Salida</span>
                <input
                  type="date"
                  value={searchState.checkOut}
                  onChange={(event) => onFieldChange("checkOut", event.target.value)}
                />
              </label>
            </div>

            <div className="search-guests-row" aria-label="Cantidad de personas">
              <div className="guest-stepper">
                <div>
                  <strong>Adultos</strong>
                  <small>Mayores de 13 anos</small>
                </div>
                <div className="guest-stepper-actions">
                  <button type="button" onClick={() => updateGuestCount("adults", -1)} aria-label="Restar adulto">-</button>
                  <span>{searchState.adults}</span>
                  <button type="button" onClick={() => updateGuestCount("adults", 1)} aria-label="Sumar adulto">+</button>
                </div>
              </div>

              <div className="guest-stepper">
                <div>
                  <strong>Ninos</strong>
                  <small>De 0 a 12 anos</small>
                </div>
                <div className="guest-stepper-actions">
                  <button type="button" onClick={() => updateGuestCount("children", -1)} aria-label="Restar nino">-</button>
                  <span>{searchState.children}</span>
                  <button type="button" onClick={() => updateGuestCount("children", 1)} aria-label="Sumar nino">+</button>
                </div>
              </div>
            </div>

            <div className="search-panel-actions">
              <button type="button" className="search-clear-btn" onClick={() => setIsExpanded(false)}>
                Cerrar
              </button>
              <button type="button" className="search-submit-btn" onClick={handleSearchClick}>
                Buscar
              </button>
            </div>
          </div>
        ) : null}
        </div>
      </div>
    </section>
  );
}

function ResultsMapCta() {
  return (
    <section className="results-map-cta" aria-label="Acceso al mapa">
      <button type="button" className="results-map-pill">
        {resultsHeader.mapLabel}
      </button>
    </section>
  );
}

function ResultsMapPanel({ desktop = false }: { desktop?: boolean }) {
  return (
    <section className={`results-map-panel ${desktop ? "is-desktop" : ""}`} aria-label="Mapa de alojamientos">
      <div className="results-map-surface" role="img" aria-label="Mapa aproximado con precios por zona">
        <span className="map-pin pin-1">$ 20k</span>
        <span className="map-pin pin-2">$ 33k</span>
        <span className="map-pin pin-3">$ 15k</span>
        <span className="map-pin pin-4">$ 48k</span>
      </div>
    </section>
  );
}

function ResultsSegment() {
  return (
    <section className="results-segment" aria-label="Tipo de resultados">
      <button type="button" className="is-active">
        {resultsHeader.segmentLabel}
      </button>
    </section>
  );
}

function ResultsFilters() {
  return (
    <section className="results-filters" aria-label="Filtros rapidos">
      {filterChips.map((chip) => (
        <button key={chip} type="button" className="results-chip">
          <span>{chip}</span>
          <ChevronDownIcon />
        </button>
      ))}
    </section>
  );
}

function ResultCard({ stay, dimmed, searchQuery }: { stay: ResultStay; dimmed: boolean; searchQuery: string }) {
  return (
    <Link href={`/location?${searchQuery}`} className="result-card-link" aria-label={`Ver detalle de ${stay.title}`}>
      <article className={`result-card ${dimmed ? "is-dimmed" : ""}`}>
        <header className="result-head">
          <p className="result-location">{stay.subtitle}</p>
          <p className="result-rating">
            <StarIcon />
            <span>{stay.rating}</span>
          </p>
        </header>
        <div className="result-image-wrap">
          <Image src={stay.image} alt={stay.title} fill sizes="(min-width: 768px) 320px, 100vw" />
          {stay.badge ? <span className="result-badge">{stay.badge}</span> : null}
          <button type="button" className={`result-heart ${stay.favorite ? "is-favorite" : ""}`} aria-label="Guardar alojamiento">
            <HeartIcon />
          </button>
        </div>
        <div className="result-body">
          <h2>{stay.title}</h2>
          <p className="result-details">{stay.details}</p>
          <p className="result-price">{stay.price}</p>
          <p className="result-total">{stay.total}</p>
        </div>
      </article>
    </Link>
  );
}

function SimilarDatesSection({ stays, searchQuery }: { stays: ResultStay[]; searchQuery: string }) {
  return (
    <section className="similar-dates" aria-label="Alojamientos disponibles en fechas similares">
      <header className="similar-dates-head">
        <h2>Disponibles en fechas similares</h2>
        <button type="button" aria-label="Ver mas opciones disponibles">›</button>
      </header>
      <div className="similar-dates-scroll">
        {stays.map((stay) => (
          <Link key={`similar-${stay.id}`} href={`/location?${searchQuery}`} className="similar-card-link" aria-label={`Ver detalle de ${stay.title}`}>
            <article className="similar-card">
              <div className="similar-image-wrap">
                <Image src={stay.image} alt={stay.title} fill sizes="200px" />
              </div>
              <h3>{stay.title}</h3>
              <p>{stay.price}</p>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function ResultsView() {
  const searchParams = useSearchParams();
  const searchState = parseSearchStateFromQuery(searchParams);
  const storedSearchState = useSyncExternalStore(
    subscribeToSearchState,
    getSearchStateSnapshot,
    () => defaultSearchState,
  );
  const currentSearch = searchParams.size > 0 ? searchState : storedSearchState;
  const currentSearchQuery = createSearchQuery(currentSearch);

  useEffect(() => {
    saveSearchStateToStorage(currentSearch);
  }, [currentSearch, currentSearchQuery]);

  return <ResultsViewContent key={currentSearchQuery} currentSearch={currentSearch} />;
}

function ResultsViewContent({ currentSearch }: { currentSearch: SearchState }) {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<ResultsCategoryId>("playa");
  const [editableSearch, setEditableSearch] = useState(currentSearch);
  const [stays, setStays] = useState<ResultStay[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const timeoutId = window.setTimeout(() => {
      setStays(resultStays);
      setIsLoading(false);
    }, 1000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  const handleSearchFieldChange = (field: keyof SearchState, value: string) => {
    setEditableSearch((currentState) => {
      if (field === "adults" || field === "children") {
        const parsedValue = Number(value);
        const fallbackValue = field === "adults" ? 1 : 0;

        return {
          ...currentState,
          [field]: Number.isFinite(parsedValue) ? parsedValue : fallbackValue,
        };
      }

      return {
        ...currentState,
        [field]: value,
      };
    });
  };

  const handleSearch = () => {
    const nextSearchState = sanitizeSearchState(editableSearch);
    saveSearchStateToStorage(nextSearchState);
    router.push(`/results?${createSearchQuery(nextSearchState)}`);
  };

  const searchQuery = createSearchQuery(currentSearch);

  const filteredResults = stays.filter((stay) => stayMatchesCategory(stay, activeCategory));
  const mainResults = filteredResults.slice(0, 8);
  const similarResults = filteredResults.slice(8, 12);

  return (
    <div className="results-view">
      <main>
        <ResultsSearchBar searchState={editableSearch} onFieldChange={handleSearchFieldChange} onSearch={handleSearch} />
        <ResultsCategoryRow activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
        <ResultsMapCta />
        <ResultsSegment />
        <ResultsFilters />
        <ResultsMapPanel />
        {isLoading ? (
          <p className="results-summary" role="status" aria-live="polite">Cargando alojamientos...</p>
        ) : (
          <p className="results-summary">{filteredResults.length} alojamientos en esta categoria</p>
        )}
        <div className="results-main-layout">
          <section className="results-list" aria-label="Resultados de alojamientos">
            {isLoading ? (
              <p className="results-summary" role="status" aria-live="polite">Cargando datos...</p>
            ) : mainResults.length > 0 ? mainResults.map((stay, index) => (
              <div key={stay.id} className="results-list-slot">
                {index === 3 && similarResults.length > 0 ? <SimilarDatesSection stays={similarResults} searchQuery={searchQuery} /> : null}
                <ResultCard stay={stay} dimmed={index > 4} searchQuery={searchQuery} />
              </div>
            )) : (
              <p className="results-summary">No hay resultados para esta categoria.</p>
            )}
          </section>
          <aside className="results-desktop-map" aria-hidden="true">
            <ResultsMapPanel desktop />
          </aside>
        </div>
      </main>
    </div>
  );
}