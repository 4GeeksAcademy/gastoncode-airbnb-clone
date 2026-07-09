"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { HeartIcon, MapPinIcon, SearchIcon } from "./icons";
import { MobileNav } from "./mobile-nav";
import {
  categoryFilters,
  footerColumns,
  inspirationLinks,
  staySections,
  type Stay,
} from "../data/home-data";

function SearchBar() {
  return (
    <section className="search-shell" aria-label="Buscador principal">
      <button className="search-chip" type="button">
        <SearchIcon />
        <span>Empieza la busqueda</span>
      </button>
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
  const [navHidden, setNavHidden] = useState(false);
  const lastScrollY = useRef(0);

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
    <div className="airbnb-clone">
      <main>
        <SearchBar />
        {staySections.map((section) => (
          <StaySection key={section.title} title={section.title} cards={section.cards} />
        ))}
        <div className="section-break" aria-hidden="true" />
        <InspirationSection />
        <FooterColumns />
      </main>
      <MobileNav hidden={navHidden} activeTab="explora" />
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

