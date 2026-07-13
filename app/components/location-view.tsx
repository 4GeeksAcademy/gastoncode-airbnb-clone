"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { HeartIcon, HomeIcon, MapPinIcon, SearchIcon, SlidersIcon, StarIcon, UserIcon } from "./icons";
import { resultStays } from "../data/catalog-data";
import { staySections } from "../data/home-data";
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

type LocationContent = {
  heroImages: typeof locationHeroImages;
  header: typeof locationHeader;
  reservationPrice: string;
  host: typeof locationHost;
  highlights: typeof locationHighlights;
  description: typeof locationDescription;
  sleepPlaces: typeof sleepingPlaces;
  amenities: typeof locationAmenities;
  accessibility: typeof locationAccessibility;
  availability: typeof locationAvailability;
  ratingSummary: typeof locationRatingSummary;
  reviews: typeof locationReviews;
  hostDetails: typeof locationHostDetails;
  facts: typeof locationFacts;
  nearby: typeof nearbyOptions;
};

const defaultLocationContent: LocationContent = {
  heroImages: locationHeroImages,
  header: locationHeader,
  reservationPrice: "$ 24.500 UYU",
  host: locationHost,
  highlights: locationHighlights,
  description: locationDescription,
  sleepPlaces: sleepingPlaces,
  amenities: locationAmenities,
  accessibility: locationAccessibility,
  availability: locationAvailability,
  ratingSummary: locationRatingSummary,
  reviews: locationReviews,
  hostDetails: locationHostDetails,
  facts: locationFacts,
  nearby: nearbyOptions,
};

function slugifyStayId(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getLocationContentById(roomId: string | null): LocationContent {
  if (!roomId) {
    return defaultLocationContent;
  }

  const catalogMatch = resultStays.find((stay) => stay.id === roomId);

  if (catalogMatch) {
    return {
      ...defaultLocationContent,
      header: {
        ...locationHeader,
        title: catalogMatch.title,
        location: catalogMatch.subtitle,
        details: catalogMatch.details,
        rating: catalogMatch.rating,
      },
      reservationPrice: catalogMatch.price,
      availability: {
        ...locationAvailability,
        heading: `${catalogMatch.price} en la estancia seleccionada`,
      },
    };
  }

  const homeMatch = staySections
    .flatMap((section) => section.cards)
    .find((stay) => slugifyStayId(stay.title) === roomId);

  if (homeMatch) {
    return {
      ...defaultLocationContent,
      header: {
        ...locationHeader,
        title: homeMatch.title,
        location: "Alojamiento destacado",
        details: homeMatch.details,
        rating: homeMatch.rating,
      },
      reservationPrice: homeMatch.price,
      availability: {
        ...locationAvailability,
        heading: `${homeMatch.price} en la estancia seleccionada`,
      },
    };
  }

  return defaultLocationContent;
}

function HeroGallery({ catalogHref, heroImages }: { catalogHref: string; heroImages: LocationContent["heroImages"] }) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const photoPlaceholders = heroImages.length > 0 ? heroImages : locationHeroImages;
  const activePhotoIndex = currentPhotoIndex >= photoPlaceholders.length ? 0 : currentPhotoIndex;
  const currentPhoto = photoPlaceholders[activePhotoIndex] ?? photoPlaceholders[0];

  const handlePreviousPhoto = () => {
    setCurrentPhotoIndex((currentIndex) => (
      currentIndex === 0 ? photoPlaceholders.length - 1 : currentIndex - 1
    ));
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((currentIndex) => (
      currentIndex === photoPlaceholders.length - 1 ? 0 : currentIndex + 1
    ));
  };

  return (
    <section className="location-hero" aria-label="Galeria de fotos del alojamiento">
      <div className="location-hero-actions">
        <Link href={catalogHref} aria-label="Volver" className="hero-circle-btn">
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

      <div className="location-hero-gallery-shell">
        <figure className="location-hero-stage">
          <Image src={currentPhoto.src} alt={currentPhoto.alt} fill sizes="(min-width: 768px) 720px, 100vw" />
          <figcaption className="location-hero-caption">
            <span>Foto {activePhotoIndex + 1} de {photoPlaceholders.length}</span>
            <p>{currentPhoto.alt}</p>
          </figcaption>
        </figure>

        <div className="location-hero-gallery-controls" aria-label="Controles de la galeria">
          <button type="button" className="location-gallery-btn" onClick={handlePreviousPhoto}>
            Anterior
          </button>
          <button type="button" className="location-gallery-btn" onClick={handleNextPhoto}>
            Siguiente
          </button>
        </div>

        <div className="location-hero-thumbnails" aria-label="Miniaturas de la galeria">
          {photoPlaceholders.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              className={`location-hero-thumb ${index === activePhotoIndex ? "is-active" : ""}`}
              onClick={() => setCurrentPhotoIndex(index)}
              aria-label={`Ver foto ${index + 1}`}
              aria-pressed={index === activePhotoIndex}
            >
              <span className="location-hero-thumb-image">
                <Image src={photo.src} alt="" fill sizes="72px" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function LocationHeaderBlock({ header }: { header: LocationContent["header"] }) {
  return (
    <section className="location-head" aria-label="Resumen del alojamiento">
      <h1>{header.title}</h1>
      <div className="location-head-meta">
        <p className="location-head-line">{header.location}</p>
        <p className="location-head-rating">
          <StarIcon />
          <span>{header.rating}</span>
        </p>
        <p className="location-head-reviews">{header.reviews} resenas</p>
      </div>
      <p className="location-head-line location-head-details">{header.details}</p>
    </section>
  );
}

function getGuestCapacity(details: string) {
  const guestMatch = details.match(/(\d+)\s+huespedes?/i);
  const parsedCapacity = guestMatch ? Number(guestMatch[1]) : 4;

  return Number.isFinite(parsedCapacity) && parsedCapacity > 0 ? parsedCapacity : 4;
}

function ReservationCard({ pricePerNight, maxGuests }: { pricePerNight: string; maxGuests: number }) {
  const [guestCount, setGuestCount] = useState(1);

  const decreaseGuests = () => {
    setGuestCount((currentCount) => Math.max(1, currentCount - 1));
  };

  const increaseGuests = () => {
    setGuestCount((currentCount) => Math.min(maxGuests, currentCount + 1));
  };

  return (
    <section className="location-reservation-card" aria-label="Reserva del alojamiento">
      <div className="location-reservation-price-block">
        <p className="location-reservation-price">{pricePerNight}</p>
        <span className="location-reservation-price-copy">por noche</span>
      </div>

      <div className="location-reservation-guests">
        <div>
          <p className="location-reservation-guests-label">Huespedes</p>
          <span className="location-reservation-guests-copy">Hasta {maxGuests} personas</span>
        </div>

        <div className="location-reservation-stepper" aria-label="Selector de huespedes">
          <button type="button" onClick={decreaseGuests} disabled={guestCount === 1} aria-label="Reducir huespedes">-</button>
          <span>{guestCount}</span>
          <button type="button" onClick={increaseGuests} disabled={guestCount === maxGuests} aria-label="Aumentar huespedes">+</button>
        </div>
      </div>

      <button type="button" className="location-reservation-cta">Reservar ahora</button>
    </section>
  );
}

function HostSummary({ host }: { host: LocationContent["host"] }) {
  return (
    <section className="location-host-summary" aria-label="Informacion del anfitrion">
      <Image src={host.avatar} alt={host.name} width={52} height={52} />
      <div>
        <h2>Anfitrion: {host.name}</h2>
        <p>{host.role}</p>
        <p>{host.yearsHosting}</p>
      </div>
    </section>
  );
}

function HighlightsList({ highlights }: { highlights: LocationContent["highlights"] }) {
  return (
    <section className="location-highlights" aria-label="Aspectos destacados">
      {highlights.map((item) => (
        <article key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </article>
      ))}
    </section>
  );
}

function DescriptionSection({ description }: { description: LocationContent["description"] }) {
  return (
    <section className="location-description" aria-label="Descripcion del alojamiento">
      <p>{description}</p>
      <button type="button">Mostrar mas</button>
    </section>
  );
}

function SleepSection({ sleepPlaces }: { sleepPlaces: LocationContent["sleepPlaces"] }) {
  return (
    <section className="location-sleep" aria-label="Donde vas a dormir">
      <h2>Donde vas a dormir</h2>
      <div className="location-sleep-scroll">
        {sleepPlaces.map((spot) => (
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

function AmenityIcon({ label }: { label: string }) {
  const normalizedLabel = label.toLowerCase();

  if (/wifi|internet/.test(normalizedLabel)) {
    return <SearchIcon />;
  }

  if (/cocina|parrillero|mascotas/.test(normalizedLabel)) {
    return <HomeIcon />;
  }

  if (/aire|lavarropas|ascensor/.test(normalizedLabel)) {
    return <SlidersIcon />;
  }

  if (/piscina/.test(normalizedLabel)) {
    return <StarIcon />;
  }

  if (/completa|servicio/.test(normalizedLabel)) {
    return <UserIcon />;
  }

  return <HeartIcon />;
}

function AmenitiesSection({ amenities }: { amenities: LocationContent["amenities"] }) {
  return (
    <section className="location-amenities" aria-label="Servicios del alojamiento">
      <h2>Lo que este lugar ofrece</h2>
      <ul>
        {amenities.map((service) => (
          <li key={service.id} className={!service.available ? "is-missing" : ""}>
            <span className="location-amenity-icon" aria-hidden="true">
              <AmenityIcon label={service.label} />
            </span>
            <span className="location-amenity-label">{service.label}</span>
          </li>
        ))}
      </ul>
      <button type="button">Mostrar los 22 servicios</button>
    </section>
  );
}

function AccessibilitySection({ accessibility }: { accessibility: LocationContent["accessibility"] }) {
  return (
    <section className="location-accessibility" aria-label="Accesibilidad y mapa">
      <h2>{accessibility.title}</h2>
      <p>{accessibility.description}</p>
      <div className="location-map-wrap">
        <Image src={accessibility.image} alt="Mapa de la zona" fill sizes="(min-width: 768px) 740px, 100vw" />
        <span className="location-map-pin">
          <MapPinIcon />
          Pocitos
        </span>
      </div>
    </section>
  );
}

function AvailabilitySection({ availability }: { availability: LocationContent["availability"] }) {
  return (
    <section className="location-availability" aria-label="Seleccion de fechas">
      <h2>{availability.heading}</h2>
      <p>{availability.subtitle}</p>
      <div className="location-calendar">
        <header>
          <button type="button" aria-label="Mes anterior">
            ‹
          </button>
          <strong>{availability.monthLabel}</strong>
          <button type="button" aria-label="Mes siguiente">
            ›
          </button>
        </header>
        <div className="location-calendar-weekdays">
          {availability.weekdays.map((weekday, index) => (
            <span key={`${weekday}-${index}`}>{weekday}</span>
          ))}
        </div>
        <div className="location-calendar-grid">
          {availability.days.map((day, index) => (
            <span key={`${day}-${index}`} className={availability.selectedRange.includes(day) ? "is-selected" : ""}>
              {day}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsSection({ ratingSummary, reviews }: { ratingSummary: LocationContent["ratingSummary"]; reviews: LocationContent["reviews"] }) {
  return (
    <section className="location-reviews" aria-label="Resenas del alojamiento">
      <header className="location-review-summary">
        <p>
          <StarIcon />
          {ratingSummary.score}
        </p>
        <span>{ratingSummary.totalReviews} resenas</span>
      </header>

      <div className="location-review-categories">
        {ratingSummary.categories.map((category) => (
          <p key={category.id}>
            <span>{category.label}</span>
            <strong>{category.value}</strong>
          </p>
        ))}
      </div>

      <div className="location-review-list">
        {reviews.map((review) => (
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

function HostDetailsSection({ hostDetails }: { hostDetails: LocationContent["hostDetails"] }) {
  return (
    <section className="location-host-details" aria-label="Detalles del anfitrion">
      <h2>Conoce al anfitrion</h2>
      <article className="host-profile-card">
        <Image src={hostDetails.avatar} alt={hostDetails.name} width={72} height={72} />
        <div>
          <h3>{hostDetails.name}</h3>
          <p>{hostDetails.reviews} resenas · {hostDetails.rating} de calificacion</p>
          <p>{hostDetails.years} anos como anfitrion</p>
        </div>
      </article>
      <p>{hostDetails.about}</p>
      <p><strong>Nacio en:</strong> {hostDetails.born}</p>
      <p><strong>Educacion:</strong> {hostDetails.education}</p>
      <p><strong>Indice de respuesta:</strong> {hostDetails.responseRate}</p>
      <p><strong>Tiempo de respuesta:</strong> {hostDetails.responseTime}</p>
      <button type="button">Mensajea con el anfitrion</button>
    </section>
  );
}

function FactsSection({ facts }: { facts: LocationContent["facts"] }) {
  return (
    <section className="location-facts" aria-label="Informacion adicional">
      <h2>Lo que debes saber</h2>
      {facts.map((fact) => (
        <article key={fact.id}>
          <h3>{fact.title}</h3>
          <p>{fact.text}</p>
          <button type="button">Mas informacion</button>
        </article>
      ))}
    </section>
  );
}

function NearbyOptionsSection({ catalogHref, nearby }: { catalogHref: string; nearby: LocationContent["nearby"] }) {
  return (
    <section className="location-nearby" aria-label="Otras opciones en la zona">
      <h2>Descubre otras opciones en Montevideo y sus alrededores</h2>
      <div>
        {nearby.map((option) => (
          <Link key={option} href={catalogHref}>
            {option}
          </Link>
        ))}
      </div>
    </section>
  );
}

export function LocationView() {
  const searchParams = useSearchParams();
  const roomId = searchParams.get("id");
  const [locationData, setLocationData] = useState<LocationContent | null>(null);
  const [loadedRoomId, setLoadedRoomId] = useState<string | null | undefined>(undefined);
  const searchParamsWithoutId = new URLSearchParams(searchParams.toString());
  searchParamsWithoutId.delete("id");
  const searchQuery = searchParamsWithoutId.toString();
  const catalogHref = searchQuery ? `/catalog?${searchQuery}` : "/catalog";
  const isLoading = loadedRoomId !== roomId || !locationData;

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setLocationData(getLocationContentById(roomId));
      setLoadedRoomId(roomId);
    }, 1000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [roomId]);

  if (isLoading) {
    return (
      <div className="location-view">
        <main>
          <p className="location-loading-state" role="status" aria-live="polite">Cargando habitacion...</p>
        </main>
      </div>
    );
  }

  const maxGuests = getGuestCapacity(locationData.header.details);

  return (
    <div className="location-view">
      <main>
        <HeroGallery catalogHref={catalogHref} heroImages={locationData.heroImages} />
        <LocationHeaderBlock header={locationData.header} />
        <ReservationCard pricePerNight={locationData.reservationPrice} maxGuests={maxGuests} />
        <HostSummary host={locationData.host} />
        <HighlightsList highlights={locationData.highlights} />
        <DescriptionSection description={locationData.description} />
        <SleepSection sleepPlaces={locationData.sleepPlaces} />
        <AmenitiesSection amenities={locationData.amenities} />
        <AccessibilitySection accessibility={locationData.accessibility} />
        <AvailabilitySection availability={locationData.availability} />
        <ReviewsSection ratingSummary={locationData.ratingSummary} reviews={locationData.reviews} />
        <HostDetailsSection hostDetails={locationData.hostDetails} />
        <FactsSection facts={locationData.facts} />
        <NearbyOptionsSection catalogHref={catalogHref} nearby={locationData.nearby} />
      </main>
    </div>
  );
}
