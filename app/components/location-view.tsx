"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { HeartIcon, MapPinIcon, StarIcon } from "./icons";
import {
  locationAccessibility,
  locationAmenities,
  locationAvailability,
  locationDescription,
  locationFacts,
  locationHeader,
  locationHighlights,
  locationHeroImages,
  locationHost,
  locationHostDetails,
  locationRatingSummary,
  locationReviews,
  nearbyOptions,
  sleepingPlaces,
} from "../data/location-data";

function HeroGallery({ resultsHref }: { resultsHref: string }) {
  return (
    <section className="location-hero" aria-label="Galeria de fotos del alojamiento">
      <div className="location-hero-actions">
        <Link href={resultsHref} aria-label="Volver" className="hero-circle-btn">
          ←
        </Link>
        <div className="location-hero-right-actions">
          <button type="button" aria-label="Compartir" className="hero-circle-btn">
            ↗
          </button>
          <button type="button" aria-label="Guardar" className="hero-circle-btn">
            <HeartIcon />
          </button>
        </div>
      </div>
      <div className="location-hero-grid">
        {locationHeroImages.map((photo, index) => (
          <figure key={photo.id} className={`location-hero-item ${index === 0 ? "is-main" : ""}`}>
            <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 768px) 720px, 100vw" />
          </figure>
        ))}
      </div>
    </section>
  );
}

function LocationHeaderBlock() {
  return (
    <section className="location-head" aria-label="Resumen del alojamiento">
      <h1>{locationHeader.title}</h1>
      <p className="location-head-line">{locationHeader.location}</p>
      <p className="location-head-line">{locationHeader.details}</p>
      <p className="location-head-rating">
        <StarIcon />
        <span>{locationHeader.rating}</span>
        <span>·</span>
        <span>{locationHeader.reviews} resenas</span>
      </p>
    </section>
  );
}

function HostSummary() {
  return (
    <section className="location-host-summary" aria-label="Informacion del anfitrion">
      <Image src={locationHost.avatar} alt={locationHost.name} width={52} height={52} />
      <div>
        <h2>Anfitrion: {locationHost.name}</h2>
        <p>{locationHost.role}</p>
        <p>{locationHost.yearsHosting}</p>
      </div>
    </section>
  );
}

function HighlightsList() {
  return (
    <section className="location-highlights" aria-label="Aspectos destacados">
      {locationHighlights.map((item) => (
        <article key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </article>
      ))}
    </section>
  );
}

function DescriptionSection() {
  return (
    <section className="location-description" aria-label="Descripcion del alojamiento">
      <p>{locationDescription}</p>
      <button type="button">Mostrar mas</button>
    </section>
  );
}

function SleepSection() {
  return (
    <section className="location-sleep" aria-label="Donde vas a dormir">
      <h2>Donde vas a dormir</h2>
      <div className="location-sleep-scroll">
        {sleepingPlaces.map((spot) => (
          <article key={spot.id} className="location-sleep-card">
            <div className="location-sleep-image">
              <Image src={spot.image} alt={spot.title} fill sizes="200px" />
            </div>
            <h3>{spot.title}</h3>
            <p>{spot.beds}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function AmenitiesSection() {
  return (
    <section className="location-amenities" aria-label="Servicios del alojamiento">
      <h2>Lo que este lugar ofrece</h2>
      <ul>
        {locationAmenities.map((service) => (
          <li key={service.id} className={!service.available ? "is-missing" : ""}>
            <span aria-hidden="true">{service.available ? "✓" : "✕"}</span>
            <span>{service.label}</span>
          </li>
        ))}
      </ul>
      <button type="button">Mostrar los 22 servicios</button>
    </section>
  );
}

function AccessibilitySection() {
  return (
    <section className="location-accessibility" aria-label="Accesibilidad y mapa">
      <h2>{locationAccessibility.title}</h2>
      <p>{locationAccessibility.description}</p>
      <div className="location-map-wrap">
        <Image src={locationAccessibility.image} alt="Mapa de la zona" fill sizes="(min-width: 768px) 740px, 100vw" />
        <span className="location-map-pin">
          <MapPinIcon />
          Pocitos
        </span>
      </div>
    </section>
  );
}

function AvailabilitySection() {
  return (
    <section className="location-availability" aria-label="Seleccion de fechas">
      <h2>{locationAvailability.heading}</h2>
      <p>{locationAvailability.subtitle}</p>
      <div className="location-calendar">
        <header>
          <button type="button" aria-label="Mes anterior">
            ‹
          </button>
          <strong>{locationAvailability.monthLabel}</strong>
          <button type="button" aria-label="Mes siguiente">
            ›
          </button>
        </header>
        <div className="location-calendar-weekdays">
          {locationAvailability.weekdays.map((weekday, index) => (
            <span key={`${weekday}-${index}`}>{weekday}</span>
          ))}
        </div>
        <div className="location-calendar-grid">
          {locationAvailability.days.map((day, index) => (
            <span key={`${day}-${index}`} className={locationAvailability.selectedRange.includes(day) ? "is-selected" : ""}>
              {day}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  return (
    <section className="location-reviews" aria-label="Resenas del alojamiento">
      <header className="location-review-summary">
        <p>
          <StarIcon />
          {locationRatingSummary.score}
        </p>
        <span>{locationRatingSummary.totalReviews} resenas</span>
      </header>

      <div className="location-review-categories">
        {locationRatingSummary.categories.map((category) => (
          <p key={category.id}>
            <span>{category.label}</span>
            <strong>{category.value}</strong>
          </p>
        ))}
      </div>

      <div className="location-review-list">
        {locationReviews.map((review) => (
          <article key={review.id} className="location-review-card">
            <header>
              <Image src={review.avatar} alt={review.name} width={50} height={50} />
              <div>
                <h3>{review.name}</h3>
                <p>{review.origin}</p>
              </div>
            </header>
            <p className="location-review-meta">{review.rating} · {review.date}</p>
            <p>{review.text}</p>
          </article>
        ))}
      </div>

      <button type="button">Mostrar 261 resenas</button>
    </section>
  );
}

function HostDetailsSection() {
  return (
    <section className="location-host-details" aria-label="Detalles del anfitrion">
      <h2>Conoce al anfitrion</h2>
      <article className="host-profile-card">
        <Image src={locationHostDetails.avatar} alt={locationHostDetails.name} width={72} height={72} />
        <div>
          <h3>{locationHostDetails.name}</h3>
          <p>{locationHostDetails.reviews} resenas · {locationHostDetails.rating} de calificacion</p>
          <p>{locationHostDetails.years} anos como anfitrion</p>
        </div>
      </article>
      <p>{locationHostDetails.about}</p>
      <p><strong>Nacio en:</strong> {locationHostDetails.born}</p>
      <p><strong>Educacion:</strong> {locationHostDetails.education}</p>
      <p><strong>Indice de respuesta:</strong> {locationHostDetails.responseRate}</p>
      <p><strong>Tiempo de respuesta:</strong> {locationHostDetails.responseTime}</p>
      <button type="button">Mensajea con el anfitrion</button>
    </section>
  );
}

function FactsSection() {
  return (
    <section className="location-facts" aria-label="Informacion adicional">
      <h2>Lo que debes saber</h2>
      {locationFacts.map((fact) => (
        <article key={fact.id}>
          <h3>{fact.title}</h3>
          <p>{fact.text}</p>
          <button type="button">Mas informacion</button>
        </article>
      ))}
    </section>
  );
}

function NearbyOptionsSection({ resultsHref }: { resultsHref: string }) {
  return (
    <section className="location-nearby" aria-label="Otras opciones en la zona">
      <h2>Descubre otras opciones en Montevideo y sus alrededores</h2>
      <div>
        {nearbyOptions.map((option) => (
          <Link key={option} href={resultsHref}>
            {option}
          </Link>
        ))}
      </div>
    </section>
  );
}

export function LocationView() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.toString();
  const resultsHref = searchQuery ? `/results?${searchQuery}` : "/results";

  return (
    <div className="location-view">
      <main>
        <HeroGallery resultsHref={resultsHref} />
        <LocationHeaderBlock />
        <HostSummary />
        <HighlightsList />
        <DescriptionSection />
        <SleepSection />
        <AmenitiesSection />
        <AccessibilitySection />
        <AvailabilitySection />
        <ReviewsSection />
        <HostDetailsSection />
        <FactsSection />
        <NearbyOptionsSection resultsHref={resultsHref} />
      </main>
    </div>
  );
}
