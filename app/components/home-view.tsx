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

const HOME_ROOM_PATTERN = /casa|cabana|alojamiento/;
const HOME_STAY_PATTERN = /noche|noches/;

type HomePriceFilterValue = "all" | "lte-5000" | "between-5001-10000" | "gt-10000";
type HomePlaceTypeFilterValue = "all" | "apartamento" | "casa" | "loft-cabana" | "experiencia";
type HomeRatingFilterValue = "all" | "gte-4.7" | "gte-4.9";
type HomeRoomsFilterValue = "all" | "espacio-completo" | "hospedaje";

type HomeFilterState = {
  price: HomePriceFilterValue;
  placeType: HomePlaceTypeFilterValue;
  rating: HomeRatingFilterValue;
  rooms: HomeRoomsFilterValue;
};

const defaultHomeFilters: HomeFilterState = {
  price: "all",
  placeType: "all",
  rating: "all",
  rooms: "all",
};

const homePriceOptions: { value: HomePriceFilterValue; label: string }[] = [
  { value: "all", label: "Cualquier precio" },
  { value: "lte-5000", label: "Hasta $5.000" },
  { value: "between-5001-10000", label: "$5.001 a $10.000" },
  { value: "gt-10000", label: "Mas de $10.000" },
];

const homePlaceTypeOptions: { value: HomePlaceTypeFilterValue; label: string }[] = [
  { value: "all", label: "Cualquier tipo" },
  { value: "apartamento", label: "Apartamento" },
  { value: "casa", label: "Casa" },
  { value: "loft-cabana", label: "Loft/Cabana" },
  { value: "experiencia", label: "Experiencia" },
];

const homeRatingOptions: { value: HomeRatingFilterValue; label: string }[] = [
  { value: "all", label: "Cualquier calificacion" },
  { value: "gte-4.7", label: "4.7 o mas" },
  { value: "gte-4.9", label: "4.9 o mas" },
];

const homeRoomsOptions: { value: HomeRoomsFilterValue; label: string }[] = [
  { value: "all", label: "Cualquier opcion" },
  { value: "espacio-completo", label: "Espacio completo" },
  { value: "hospedaje", label: "Hospedaje/Experiencia" },
];

function extractPriceValue(price: string) {
  const numericValue = Number(price.replace(/[^\d]/g, ""));
  return Number.isFinite(numericValue) && numericValue > 0 ? numericValue : Number.POSITIVE_INFINITY;
}

function stayMatchesHomeFilters(stay: Stay, filters: HomeFilterState) {
  const searchableText = `${stay.title} ${stay.details}`.toLowerCase();
  const priceValue = extractPriceValue(stay.price);
  const rating = Number(stay.rating);

  if (filters.price === "lte-5000" && priceValue > 5000) {
    return false;
  }

  if (filters.price === "between-5001-10000" && (priceValue < 5001 || priceValue > 10000)) {
    return false;
  }

  if (filters.price === "gt-10000" && priceValue <= 10000) {
    return false;
  }

  if (filters.placeType === "apartamento" && !searchableText.includes("apartamento")) {
    return false;
  }

  if (filters.placeType === "casa" && !searchableText.includes("casa")) {
    return false;
  }

  if (filters.placeType === "loft-cabana" && !/loft|cabana|minicasa/.test(searchableText)) {
    return false;
  }

  if (filters.placeType === "experiencia" && !searchableText.includes("participante")) {
    return false;
  }

  if (filters.rating === "gte-4.7" && rating < 4.7) {
    return false;
  }

  if (filters.rating === "gte-4.9" && rating < 4.9) {
    return false;
  }

  if (filters.rooms === "espacio-completo" && !HOME_ROOM_PATTERN.test(searchableText)) {
    return false;
  }

  if (filters.rooms === "hospedaje" && !/huespedes|participante/.test(searchableText)) {
    return false;
  }

  return true;
}

function isNightlyStay(stay: Stay) {
  return HOME_STAY_PATTERN.test(stay.details.toLowerCase());
}

function formatNightlyPrice(stay: Stay) {
  return `${stay.price} / noche`;
}

function getVisibleStays(stays: Stay[], query: string, activeFilters: HomeFilterState) {
  const normalizedQuery = query.trim().toLowerCase();

  return stays
    .filter((stay) => isNightlyStay(stay))
    .filter((stay) => {
      const searchableText = `${stay.title} ${stay.details} ${stay.price}`.toLowerCase();
      const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery);
      const matchesFilters = stayMatchesHomeFilters(stay, activeFilters);

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
  filters,
  onFilterChange,
}: {
  filters: HomeFilterState;
  onFilterChange: <K extends keyof HomeFilterState>(key: K, value: HomeFilterState[K]) => void;
}) {
  return (
    <section className="results-filters" aria-label="Filtros de alojamientos">
      <label className="results-chip results-chip-select" aria-label="Filtrar por precio">
        <span>Precio</span>
        <select
          value={filters.price}
          onChange={(event) => onFilterChange("price", event.target.value as HomePriceFilterValue)}
        >
          {homePriceOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <ChevronDownIcon />
      </label>

      <label className="results-chip results-chip-select" aria-label="Filtrar por tipo de lugar">
        <span>Tipo de lugar</span>
        <select
          value={filters.placeType}
          onChange={(event) => onFilterChange("placeType", event.target.value as HomePlaceTypeFilterValue)}
        >
          {homePlaceTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <ChevronDownIcon />
      </label>

      <label className="results-chip results-chip-select" aria-label="Filtrar por calificacion">
        <span>Calificacion</span>
        <select
          value={filters.rating}
          onChange={(event) => onFilterChange("rating", event.target.value as HomeRatingFilterValue)}
        >
          {homeRatingOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <ChevronDownIcon />
      </label>

      <label className="results-chip results-chip-select" aria-label="Filtrar por habitaciones">
        <span>Habitaciones</span>
        <select
          value={filters.rooms}
          onChange={(event) => onFilterChange("rooms", event.target.value as HomeRoomsFilterValue)}
        >
          {homeRoomsOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <ChevronDownIcon />
      </label>
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

function HomeStaysSection({ isLoading, stays }: { isLoading: boolean; stays: Stay[] }) {
  if (isLoading) {
    return <p className="results-summary" role="status" aria-live="polite">Cargando alojamientos...</p>;
  }

  if (stays.length === 0) {
    return <p className="results-summary">No hay alojamientos que coincidan con los filtros seleccionados.</p>;
  }

  return <StaysGrid stays={stays} />;
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
  const [activeFilters, setActiveFilters] = useState<HomeFilterState>(defaultHomeFilters);
  const [stays, setStays] = useState<Stay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const visibleStays = getVisibleStays(stays, searchState.destination, activeFilters);

  useEffect(() => {
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

  const handleFilterChange = <K extends keyof HomeFilterState>(key: K, value: HomeFilterState[K]) => {
    setActiveFilters((currentFilters) => ({
      ...currentFilters,
      [key]: value,
    }));
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
        <HomeResultsFilters filters={activeFilters} onFilterChange={handleFilterChange} />
        <HomeStaysSection isLoading={isLoading} stays={visibleStays} />
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

