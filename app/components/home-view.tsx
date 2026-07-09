"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HeartIcon, MapPinIcon, SearchIcon } from "./icons";
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
  readSearchStateFromStorage,
  sanitizeSearchState,
  saveSearchStateToStorage,
  type SearchState,
} from "../data/search-state";
import type { SearchBarProps } from "../types/ui";

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

function SectionHeader({ title }: { title: string }) {
  return (
    <header className="section-header">
      <h2>{title}</h2>
      <button type="button" aria-label={`Ver mas de ${title}`}>
        <ChevronRightIcon />
      </button>
    </header>
  );
}

function StayCard({ stay }: { stay: Stay }) {
  return (
    <Link href="/location" className="stay-card-link" aria-label={`Ver detalle de ${stay.title}`}>
      <article className="stay-card">
        <div className={`stay-image tone-${stay.accent}`}>
          <Image src={stay.image} alt={stay.title} fill sizes="(min-width: 768px) 280px, 165px" />
          {stay.badge ? <span className="badge">{stay.badge}</span> : null}
          <button className="heart-btn" type="button" aria-label="Guardar">
            <HeartIcon />
          </button>
        </div>
        <div className="stay-body">
          <h3>{stay.title}</h3>
          <p>{stay.details}</p>
          <p className="stay-meta">
            <span>{stay.price}</span>
            <span className="stay-rating">★ {stay.rating}</span>
          </p>
        </div>
      </article>
    </Link>
  );
}

function StaySection({ title, cards }: { title: string; cards: Stay[] }) {
  return (
    <section className="stay-section" aria-label={title}>
      <SectionHeader title={title} />
      <div className="stays-scroll">
        {cards.map((stay) => (
          <StayCard key={`${title}-${stay.title}`} stay={stay} />
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
  const [searchState, setSearchState] = useState<SearchState>(() => readSearchStateFromStorage() || defaultSearchState);
  const [visibleSections, setVisibleSections] = useState(staySections);
  const router = useRouter();

  const updateVisibleSections = (query: string) => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      setVisibleSections(staySections);
      return;
    }

    const filteredSections = staySections
      .map((section) => ({
        ...section,
        cards: section.cards.filter((stay) => {
          const searchableText = `${stay.title} ${stay.details} ${stay.price}`.toLowerCase();
          return searchableText.includes(normalizedQuery);
        }),
      }))
      .filter((section) => section.cards.length > 0);

    setVisibleSections(filteredSections);
  };

  const handleSearchFieldChange = (field: keyof SearchState, value: string) => {
    if (field === "destination") {
      updateVisibleSections(value);
    }

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

  const handleSearch = () => {
    const nextSearchState = sanitizeSearchState(searchState);
    saveSearchStateToStorage(nextSearchState);
    router.push(`/results?${createSearchQuery(nextSearchState)}`);
  };

  return (
    <div className="airbnb-clone">
      <main>
        <SearchBar searchState={searchState} onFieldChange={handleSearchFieldChange} onSearch={handleSearch} />
        {visibleSections.map((section) => (
          <StaySection key={section.title} title={section.title} cards={section.cards} />
        ))}
        <div className="section-break" aria-hidden="true" />
        <InspirationSection />
        <FooterColumns />
      </main>
    </div>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m9 6 6 6-6 6-1.4-1.4 4.6-4.6-4.6-4.6z" />
    </svg>
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

