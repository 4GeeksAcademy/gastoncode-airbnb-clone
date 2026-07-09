"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { ChevronDownIcon, HeartIcon, MapPinIcon, SearchIcon, StarIcon } from "./icons";
import {
  categoryFilters,
  footerColumns,
  inspirationLinks,
  staySections,
  type Stay,
} from "../data/home-data";
import { filterChips } from "../data/results-data";
import {
  createSearchQuery,
  defaultSearchState,
  formatCompactSearchDate,
  getSearchStateSnapshot,
  sanitizeSearchState,
  saveSearchStateToStorage,
  subscribeToSearchState,
  type SearchState,
} from "../data/search-state";
import type { SearchBarProps } from "../types/ui";

const HOME_PLACE_TYPE_PATTERN = /apartamento|casa|loft|cabana|minicasa|alojamiento|huespedes/;
const HOME_ROOM_PATTERN = /casa|cabana|alojamiento/;
const HOME_STAY_PATTERN = /noche|noches/;

function extractPriceValue(price: string) {
  const numericValue = Number(price.replace(/[^\d]/g, ""));
  return Number.isFinite(numericValue) && numericValue > 0 ? numericValue : Number.POSITIVE_INFINITY;
}

function matchesHomeFilter(stay: Stay, filter: string) {
  const searchableText = `${stay.title} ${stay.details}`.toLowerCase();

  if (filter === "Precio") {
    return extractPriceValue(stay.price) <= 5000;
  }

  if (filter === "Tipo de lugar") {
    return HOME_PLACE_TYPE_PATTERN.test(searchableText);
  }

  if (filter === "Calificacion") {
    return Number(stay.rating) >= 4.9;
  }

  if (filter === "Habitaciones") {
    return HOME_ROOM_PATTERN.test(searchableText);
  }

  return true;
}

function isNightlyStay(stay: Stay) {
  return HOME_STAY_PATTERN.test(stay.details.toLowerCase());
}

function formatNightlyPrice(stay: Stay) {
  return `${stay.price} / noche`;
}

function getVisibleStays(stays: Stay[], query: string, activeFilters: string[]) {
  const normalizedQuery = query.trim().toLowerCase();

  return stays
    .filter((stay) => isNightlyStay(stay))
    .filter((stay) => {
      const searchableText = `${stay.title} ${stay.details} ${stay.price}`.toLowerCase();
      const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery);
      const matchesFilters = activeFilters.every((filter) => matchesHomeFilter(stay, filter));

      return matchesQuery && matchesFilters;
    });
}

function SearchBar({ searchState, onFieldChange, onSearch }: SearchBarProps) {
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
    <section className="search-shell" aria-label="Buscador principal">
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
      <div className="category-row" aria-label="Filtros por categoria">
        {categoryFilters.map((filter, index) => (
          <button
            key={filter}
            className={`category-pill ${index === 1 ? "is-active" : ""}`}
            type="button"
          >
            <span className="category-icon" aria-hidden="true">
              {index === 0 ? <SparkleIcon /> : null}
              {index === 1 ? <HomeIcon /> : null}
              {index === 2 ? <MapPinIcon /> : null}
            </span>
            {filter}
          </button>
        ))}
      </div>
    </section>
  );
}

function HomeResultsFilters({
  activeFilters,
  onToggleFilter,
}: {
  activeFilters: string[];
  onToggleFilter: (filter: string) => void;
}) {
  return (
    <section className="results-filters" aria-label="Filtros de alojamientos">
      {filterChips.map((chip) => (
        <button
          key={chip}
          type="button"
          className={`results-chip ${activeFilters.includes(chip) ? "is-active" : ""}`}
          onClick={() => onToggleFilter(chip)}
          aria-pressed={activeFilters.includes(chip)}
        >
          <span>{chip}</span>
          <ChevronDownIcon />
        </button>
      ))}
    </section>
  );
}

function StayCard({ stay }: { stay: Stay }) {
  return (
    <Link href="/location" className="stay-card-link" aria-label={`Ver detalle de ${stay.title}`}>
      <article className="stay-card">
        <div className={`stay-image tone-${stay.accent}`}>
          <div className="stay-image-placeholder" aria-hidden="true">Foto</div>
          <Image src={stay.image} alt={stay.title} fill sizes="(min-width: 1080px) 25vw, (min-width: 768px) 33vw, 50vw" />
          <button className="heart-btn" type="button" aria-label="Guardar">
            <HeartIcon />
          </button>
        </div>
        <div className="stay-body">
          <h3>{stay.title}</h3>
          <p className="stay-price">{formatNightlyPrice(stay)}</p>
          <p className="stay-meta">
            <span className="stay-rating">
              <StarIcon />
              <span>{stay.rating}</span>
            </span>
          </p>
        </div>
      </article>
    </Link>
  );
}

function StaysGrid({ stays }: { stays: Stay[] }) {
  return (
    <section className="stay-grid-section" aria-label="Alojamientos disponibles">
      <header className="section-header">
        <h2>Alojamientos disponibles</h2>
      </header>
      <div className="stays-grid">
        {stays.map((stay) => (
          <StayCard key={`${stay.title}-${stay.image}`} stay={stay} />
        ))}
      </div>
    </section>
  );
}

function InspirationSection() {
  return (
    <section className="inspiration" aria-label="Inspiracion para escapadas">
      <h2>Inspiracion para escapadas futuras</h2>
      <nav className="inspiration-tabs" aria-label="Categorias de inspiracion">
        <button type="button" className="active">
          Popular
        </button>
        <button type="button">Arte y cultura</button>
        <button type="button">Playa</button>
        <button type="button">Montana</button>
      </nav>
      <div className="inspiration-grid">
        {inspirationLinks.map((item) => (
          <button key={item.title} type="button" className="inspiration-link">
            <strong>{item.title}</strong>
            {item.subtitle ? <span>{item.subtitle}</span> : null}
          </button>
        ))}
      </div>
    </section>
  );
}

function FooterColumns() {
  return (
    <footer className="footer-columns" aria-label="Pie de pagina">
      {footerColumns.map((column) => (
        <section key={column.title}>
          <h3>{column.title}</h3>
          {column.links.map((link) => (
            <a href="#" key={`${column.title}-${link}`}>
              {link}
            </a>
          ))}
        </section>
      ))}
      <div className="footer-meta">
        <p>Espanol · $ UYU</p>
        <p className="meta-socials">
          <span aria-hidden="true">f</span>
          <span aria-hidden="true">x</span>
          <span aria-hidden="true">ig</span>
        </p>
        <p>© 2026 Airbnb, Inc.</p>
        <p>Privacidad · Terminos</p>
      </div>
    </footer>
  );
}

export function HomeView() {
  const initialSearchState = useSyncExternalStore(
    subscribeToSearchState,
    getSearchStateSnapshot,
    () => defaultSearchState,
  );

  return <HomeViewContent key={createSearchQuery(initialSearchState)} initialSearchState={initialSearchState} />;
}

function HomeViewContent({ initialSearchState }: { initialSearchState: SearchState }) {
  const [searchState, setSearchState] = useState<SearchState>(initialSearchState);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [stays, setStays] = useState<Stay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const visibleStays = getVisibleStays(stays, searchState.destination, activeFilters);

  useEffect(() => {
    setIsLoading(true);

    const timeoutId = window.setTimeout(() => {
      setStays(staySections.flatMap((section) => section.cards));
      setIsLoading(false);
    }, 1000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  const handleSearchFieldChange = (field: keyof SearchState, value: string) => {
    setSearchState((currentState) => {
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

  const handleToggleFilter = (filter: string) => {
    setActiveFilters((currentFilters) => (
      currentFilters.includes(filter)
        ? currentFilters.filter((currentFilter) => currentFilter !== filter)
        : [...currentFilters, filter]
    ));
  };

  const handleSearch = () => {
    const nextSearchState = sanitizeSearchState(searchState);
    saveSearchStateToStorage(nextSearchState);
    router.push(`/results?${createSearchQuery(nextSearchState)}`);
  };

  return (
    <div className="airbnb-clone">
      <main>
        <SearchBar searchState={searchState} onFieldChange={handleSearchFieldChange} onSearch={handleSearch} />
        <HomeResultsFilters activeFilters={activeFilters} onToggleFilter={handleToggleFilter} />
        {isLoading ? (
          <p className="results-summary" role="status" aria-live="polite">Cargando alojamientos...</p>
        ) : visibleStays.length > 0 ? <StaysGrid stays={visibleStays} /> : (
          <p className="results-summary">No hay alojamientos que coincidan con los filtros seleccionados.</p>
        )}
        <div className="section-break" aria-hidden="true" />
        <InspirationSection />
        <FooterColumns />
      </main>
    </div>
  );
}

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 2 1.8 4.2L18 8l-4.2 1.8L12 14l-1.8-4.2L6 8l4.2-1.8z" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4.2 3.8 10.7l1.4 1.7 1.8-1.5V19h5v-4h2v4h5v-8.1l1.8 1.5 1.4-1.7z" />
    </svg>
  );
}

