"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { resultStays, resultsHeader, type ResultStay } from "../data/catalog-data";
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
import type { CatalogCategoryId, CatalogSearchBarProps } from "../types/ui";

const resultsCategories: { id: CatalogCategoryId; label: string }[] = [
  { id: "playa", label: "Playa" },
  { id: "mansiones", label: "Mansiones" },
  { id: "tendencias", label: "Tendencias" },
  { id: "cabanas", label: "Cabanas" },
  { id: "vinedos", label: "Vinedos" },
];

type PriceFilterValue = "all" | "lte-20000" | "between-20001-40000" | "gt-40000";
type PlaceTypeFilterValue = "all" | "apartamento-entero" | "casa-entera" | "habitacion-privada";
type RatingFilterValue = "all" | "gte-4.5" | "gte-4.8" | "gte-4.9";
type RoomsFilterValue = "all" | "gte-1" | "gte-2" | "gte-3";
type PriceSortOrder = "asc" | "desc";

type ResultsFilterState = {
  price: PriceFilterValue;
  placeType: PlaceTypeFilterValue;
  rating: RatingFilterValue;
  rooms: RoomsFilterValue;
};

const defaultResultsFilters: ResultsFilterState = {
  price: "all",
  placeType: "all",
  rating: "all",
  rooms: "all",
};

const priceFilterOptions: { value: PriceFilterValue; label: string }[] = [
  { value: "all", label: "Cualquier precio" },
  { value: "lte-20000", label: "Hasta $20.000" },
  { value: "between-20001-40000", label: "$20.001 a $40.000" },
  { value: "gt-40000", label: "Mas de $40.000" },
];

const placeTypeFilterOptions: { value: PlaceTypeFilterValue; label: string }[] = [
  { value: "all", label: "Cualquier tipo" },
  { value: "apartamento-entero", label: "Apartamento entero" },
  { value: "casa-entera", label: "Casa entera" },
  { value: "habitacion-privada", label: "Habitacion privada" },
];

const ratingFilterOptions: { value: RatingFilterValue; label: string }[] = [
  { value: "all", label: "Cualquier calificacion" },
  { value: "gte-4.5", label: "4.5 o mas" },
  { value: "gte-4.8", label: "4.8 o mas" },
  { value: "gte-4.9", label: "4.9 o mas" },
];

const roomsFilterOptions: { value: RoomsFilterValue; label: string }[] = [
  { value: "all", label: "Cualquier cantidad" },
  { value: "gte-1", label: "1+ habitaciones" },
  { value: "gte-2", label: "2+ habitaciones" },
  { value: "gte-3", label: "3+ habitaciones" },
];

const priceSortOptions: { value: PriceSortOrder; label: string }[] = [
  { value: "asc", label: "Precio: menor a mayor" },
  { value: "desc", label: "Precio: mayor a menor" },
];

function parsePricePerNight(price: string): number {
  const numericValue = Number(price.replace(/[^0-9]/g, ""));
  return Number.isFinite(numericValue) ? numericValue : 0;
}

function getStayRoomCount(details: string): number {
  const normalizedDetails = details.toLowerCase();

  const roomMatch = normalizedDetails.match(/(\d+)\s+habitaciones?/);
  if (roomMatch) {
    return Number(roomMatch[1]);
  }

  const bedsMatch = normalizedDetails.match(/(\d+)\s+camas?/);
  if (bedsMatch) {
    return Number(bedsMatch[1]);
  }

  const bedMatch = normalizedDetails.match(/(\d+)\s+cama\b/);
  if (bedMatch) {
    return Number(bedMatch[1]);
  }

  return 0;
}

function stayMatchesResultFilters(stay: ResultStay, filters: ResultsFilterState): boolean {
  const pricePerNight = parsePricePerNight(stay.price);
  const subtitle = stay.subtitle.toLowerCase();
  const rating = Number(stay.rating);
  const rooms = getStayRoomCount(stay.details);

  if (filters.price === "lte-20000" && pricePerNight > 20000) {
    return false;
  }

  if (filters.price === "between-20001-40000" && (pricePerNight < 20001 || pricePerNight > 40000)) {
    return false;
  }

  if (filters.price === "gt-40000" && pricePerNight <= 40000) {
    return false;
  }

  if (filters.placeType === "apartamento-entero" && !subtitle.includes("apartamento entero")) {
    return false;
  }

  if (filters.placeType === "casa-entera" && !subtitle.includes("casa entera")) {
    return false;
  }

  if (filters.placeType === "habitacion-privada" && !subtitle.includes("habitacion privada")) {
    return false;
  }

  if (filters.rating === "gte-4.5" && rating < 4.5) {
    return false;
  }

  if (filters.rating === "gte-4.8" && rating < 4.8) {
    return false;
  }

  if (filters.rating === "gte-4.9" && rating < 4.9) {
    return false;
  }

  if (filters.rooms === "gte-1" && rooms < 1) {
    return false;
  }

  if (filters.rooms === "gte-2" && rooms < 2) {
    return false;
  }

  if (filters.rooms === "gte-3" && rooms < 3) {
    return false;
  }

  return true;
}

function stayMatchesCategory(stay: ResultStay, category: CatalogCategoryId): boolean {
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
  activeCategory: CatalogCategoryId;
  onCategoryChange: (categoryId: CatalogCategoryId) => void;
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

function ResultsSearchBar({ searchState, onFieldChange, onSearch }: CatalogSearchBarProps) {
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
        <Link href="/" className="catalog-home-btn" aria-label="Volver a inicio">
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

function ResultsFilters({
  filters,
  onFilterChange,
}: {
  filters: ResultsFilterState;
  onFilterChange: <K extends keyof ResultsFilterState>(key: K, value: ResultsFilterState[K]) => void;
}) {
  return (
    <section className="results-filters" aria-label="Filtros rapidos">
      <label className="results-chip results-chip-select" aria-label="Filtrar por precio">
        <span>Precio</span>
        <select
          value={filters.price}
          onChange={(event) => onFilterChange("price", event.target.value as PriceFilterValue)}
        >
          {priceFilterOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <ChevronDownIcon />
      </label>

      <label className="results-chip results-chip-select" aria-label="Filtrar por tipo de lugar">
        <span>Tipo de lugar</span>
        <select
          value={filters.placeType}
          onChange={(event) => onFilterChange("placeType", event.target.value as PlaceTypeFilterValue)}
        >
          {placeTypeFilterOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <ChevronDownIcon />
      </label>

      <label className="results-chip results-chip-select" aria-label="Filtrar por calificacion">
        <span>Calificacion</span>
        <select
          value={filters.rating}
          onChange={(event) => onFilterChange("rating", event.target.value as RatingFilterValue)}
        >
          {ratingFilterOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <ChevronDownIcon />
      </label>

      <label className="results-chip results-chip-select" aria-label="Filtrar por habitaciones">
        <span>Habitaciones</span>
        <select
          value={filters.rooms}
          onChange={(event) => onFilterChange("rooms", event.target.value as RoomsFilterValue)}
        >
          {roomsFilterOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <ChevronDownIcon />
      </label>
    </section>
  );
}

function ResultCard({ stay, searchQuery }: { stay: ResultStay; searchQuery: string }) {
  const locationHref = `/location?id=${stay.id}${searchQuery ? `&${searchQuery}` : ""}`;

  return (
    <Link href={locationHref} className="result-card-link" aria-label={`Ver detalle de ${stay.title}`}>
      <article className="result-card">
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
          <Link key={`similar-${stay.id}`} href={`/location?id=${stay.id}${searchQuery ? `&${searchQuery}` : ""}`} className="similar-card-link" aria-label={`Ver detalle de ${stay.title}`}>
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

function ResultsSummary({ isLoading, total }: { isLoading: boolean; total: number }) {
  if (isLoading) {
    return <p className="results-summary" role="status" aria-live="polite">Cargando alojamientos...</p>;
  }

  return <p className="results-summary">{total} resultados encontrados</p>;
}

function ResultsHeader({
  isLoading,
  total,
  sortOrder,
  onSortOrderChange,
}: {
  isLoading: boolean;
  total: number;
  sortOrder: PriceSortOrder;
  onSortOrderChange: (value: PriceSortOrder) => void;
}) {
  return (
    <section className="results-header" aria-label="Resumen y orden de resultados">
      <div className="results-header-copy">
        <p className="results-header-eyebrow">Resultados</p>
        <ResultsSummary isLoading={isLoading} total={total} />
      </div>

      <label className="results-chip results-chip-select results-sort-control" aria-label="Ordenar resultados por precio">
        <span>Ordenar</span>
        <select
          value={sortOrder}
          onChange={(event) => onSortOrderChange(event.target.value as PriceSortOrder)}
          disabled={isLoading}
        >
          {priceSortOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <ChevronDownIcon />
      </label>
    </section>
  );
}

function ResultsListSection({
  isLoading,
  stays,
  similarStays,
  searchQuery,
}: {
  isLoading: boolean;
  stays: ResultStay[];
  similarStays: ResultStay[];
  searchQuery: string;
}) {
  if (isLoading) {
    return <p className="results-summary" role="status" aria-live="polite">Cargando datos...</p>;
  }

  if (stays.length === 0) {
    return <p className="results-summary">No hay resultados para esta categoria.</p>;
  }

  return (
    <>
      {stays.map((stay, index) => (
        <div key={stay.id} className="results-list-slot">
          {index === 3 && similarStays.length > 0 ? <SimilarDatesSection stays={similarStays} searchQuery={searchQuery} /> : null}
          <ResultCard stay={stay} searchQuery={searchQuery} />
        </div>
      ))}
    </>
  );
}

export function CatalogView() {
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

  return <CatalogViewContent key={currentSearchQuery} currentSearch={currentSearch} />;
}

function CatalogViewContent({ currentSearch }: { currentSearch: SearchState }) {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<CatalogCategoryId>("playa");
  const [activeFilters, setActiveFilters] = useState<ResultsFilterState>(defaultResultsFilters);
  const [sortOrder, setSortOrder] = useState<PriceSortOrder>("asc");
  const [editableSearch, setEditableSearch] = useState(currentSearch);
  const [stays, setStays] = useState<ResultStay[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
    router.push(`/catalog?${createSearchQuery(nextSearchState)}`);
  };

  const handleFilterChange = <K extends keyof ResultsFilterState>(key: K, value: ResultsFilterState[K]) => {
    setActiveFilters((currentFilters) => ({
      ...currentFilters,
      [key]: value,
    }));
  };

  const searchQuery = createSearchQuery(currentSearch);

  const filteredResults = stays.filter((stay) => (
    stayMatchesCategory(stay, activeCategory) && stayMatchesResultFilters(stay, activeFilters)
  ));
  const sortedResults = [...filteredResults].sort((leftStay, rightStay) => {
    const leftPrice = parsePricePerNight(leftStay.price);
    const rightPrice = parsePricePerNight(rightStay.price);

    return sortOrder === "asc" ? leftPrice - rightPrice : rightPrice - leftPrice;
  });
  const mainResults = sortedResults.slice(0, 8);
  const similarResults = sortedResults.slice(8, 12);

  return (
    <div className="catalog-view">
      <main>
        <ResultsSearchBar searchState={editableSearch} onFieldChange={handleSearchFieldChange} onSearch={handleSearch} />
        <ResultsCategoryRow activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
        <ResultsMapCta />
        <ResultsSegment />
        <ResultsFilters filters={activeFilters} onFilterChange={handleFilterChange} />
        <ResultsMapPanel />
        <ResultsHeader
          isLoading={isLoading}
          total={sortedResults.length}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
        />
        <div className="results-main-layout">
          <section className="results-list" aria-label="Resultados de alojamientos">
            <ResultsListSection
              isLoading={isLoading}
              stays={mainResults}
              similarStays={similarResults}
              searchQuery={searchQuery}
            />
          </section>
          <aside className="results-desktop-map" aria-hidden="true">
            <ResultsMapPanel desktop />
          </aside>
        </div>
      </main>
    </div>
  );
}