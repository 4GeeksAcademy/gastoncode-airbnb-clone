"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { filterChips, resultStays, resultsHeader, type ResultStay } from "../data/results-data";
import { ChevronDownIcon, HeartIcon, SearchIcon, SlidersIcon, StarIcon } from "./icons";
import { MobileNav } from "./mobile-nav";

function ResultsTopBar() {
  return (
    <header className="results-topbar" aria-label="Buscador de resultados">
      <button type="button" className="results-search-pill" aria-label="Editar busqueda">
        <SearchIcon />
        <span className="results-search-main">{resultsHeader.location}</span>
        <span className="results-search-sub">{resultsHeader.dates} - {resultsHeader.guests}</span>
      </button>
      <button type="button" className="results-filter-btn" aria-label="Filtros">
        <SlidersIcon />
      </button>
    </header>
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

function ResultCard({ stay, dimmed }: { stay: ResultStay; dimmed: boolean }) {
  return (
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
  );
}

function SimilarDatesSection({ stays }: { stays: ResultStay[] }) {
  return (
    <section className="similar-dates" aria-label="Alojamientos disponibles en fechas similares">
      <header className="similar-dates-head">
        <h2>Disponibles en fechas similares</h2>
        <button type="button" aria-label="Ver mas opciones disponibles">›</button>
      </header>
      <div className="similar-dates-scroll">
        {stays.map((stay) => (
          <article key={`similar-${stay.id}`} className="similar-card">
            <div className="similar-image-wrap">
              <Image src={stay.image} alt={stay.title} fill sizes="200px" />
            </div>
            <h3>{stay.title}</h3>
            <p>{stay.price}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ResultCardSkeleton() {
  return (
    <article className="result-card is-dimmed" aria-hidden="true">
      <div className="result-image-wrap result-image-skeleton">
        <span>...</span>
      </div>
      <div className="result-body">
        <div className="result-line result-line-lg" />
        <div className="result-line" />
        <div className="result-line result-line-sm" />
      </div>
    </article>
  );
}

export function ResultsView() {
  const [navHidden, setNavHidden] = useState(false);
  const lastScrollY = useRef(0);
  const mainResults = resultStays.slice(0, 8);
  const similarResults = resultStays.slice(8, 12);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (currentY < 12) {
        setNavHidden(false);
      } else if (delta > 4) {
        setNavHidden(true);
      } else if (delta < -4) {
        setNavHidden(false);
      }

      lastScrollY.current = currentY;
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="results-view">
      <main>
        <ResultsTopBar />
        <ResultsMapCta />
        <ResultsSegment />
        <ResultsFilters />
        <ResultsMapPanel />
        <p className="results-summary">Mas de 100 alojamientos en esta busqueda</p>
        <div className="results-main-layout">
          <section className="results-list" aria-label="Resultados de alojamientos">
            {mainResults.map((stay, index) => (
              <div key={stay.id} className="results-list-slot">
                {index === 3 ? <SimilarDatesSection stays={similarResults} /> : null}
                <ResultCard stay={stay} dimmed={index > 4} />
              </div>
            ))}
            <ResultCardSkeleton />
            <ResultCardSkeleton />
          </section>
          <aside className="results-desktop-map" aria-hidden="true">
            <ResultsMapPanel desktop />
          </aside>
        </div>
      </main>
      <MobileNav hidden={navHidden} activeTab="explora" />
    </div>
  );
}