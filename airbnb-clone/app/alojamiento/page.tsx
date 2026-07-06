import { FavoriteButton } from "@/components/home/FavoriteButton";
import { MobileFrame } from "@/components/home/MobileFrame";
import { CalendarMonth } from "@/components/stay-detail/CalendarMonth";
import { DetailSection } from "@/components/stay-detail/DetailSection";
import {
  amenities,
  augustDays,
  features,
  julyDays,
  nearbyPlaces,
} from "@/data/stay-detail";
import Link from "next/link";

export default function AlojamientoPage() {
  return (
    <div className="bg-zinc-100 py-4 sm:py-8">
      <MobileFrame>
        <main className="pb-24">
          <section className="relative">
            <div className="relative h-72 overflow-hidden bg-gradient-to-br from-zinc-300 via-zinc-100 to-zinc-200">
              <div className="absolute inset-x-8 top-10 h-40 rounded-sm bg-zinc-200/80" />
              <div className="absolute inset-x-12 top-14 h-28 rounded-sm border border-zinc-300 bg-white/80" />
              <div className="absolute inset-x-14 top-16 h-24 rounded-sm bg-gradient-to-b from-sky-100 to-slate-200" />
              <div className="absolute inset-x-16 bottom-8 h-10 rounded-sm bg-zinc-500/70" />
            </div>

            <div className="absolute top-3 left-3">
              <Link
                href="/busqueda"
                aria-label="Volver a resultados"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-sm text-zinc-700 shadow-sm"
              >
                ←
              </Link>
            </div>

            <div className="absolute top-3 right-3 flex items-center gap-2">
              <button
                type="button"
                aria-label="Compartir"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-xs text-zinc-700 shadow-sm"
              >
                ↗
              </button>
              <FavoriteButton />
            </div>
          </section>

          <section className="px-4 pt-5">
            <h1 className="text-2xl leading-tight font-semibold text-zinc-900">
              Encantador apartamento en Pocitos Bueno
            </h1>

            <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl border border-zinc-200 p-3">
              <div>
                <p className="text-xs text-zinc-500">Alojamiento entero en Montevideo</p>
                <p className="mt-1 text-sm font-medium text-zinc-900">★ 4.71 · 21 resenas</p>
              </div>
              <button
                type="button"
                className="rounded-full bg-rose-500 px-5 py-2 text-xs font-semibold text-white"
              >
                Reservar
              </button>
            </div>
          </section>

          <section className="border-t border-zinc-200 px-4 py-6">
            <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 p-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-200 via-amber-100 to-rose-200" />
              <div>
                <p className="text-sm font-semibold text-zinc-900">Anfitrion: Patrick</p>
                <p className="text-xs text-zinc-500">Superanfitrion · 7 anos hospedando</p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {features.map((feature) => (
                <article key={feature.id} className="flex gap-3">
                  <span className="pt-0.5 text-sm text-zinc-700" aria-hidden>
                    {feature.icon}
                  </span>
                  <div>
                    <h3 className="text-sm font-medium text-zinc-900">{feature.title}</h3>
                    <p className="text-xs text-zinc-500">{feature.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <DetailSection title="Descripcion del lugar">
            <p className="text-sm leading-relaxed text-zinc-700">
              Apartamento luminoso con balcon, ideal para disfrutar Pocitos a pie.
              Cuenta con dormitorio principal, cocina equipada y living confortable
              para estadias de trabajo o descanso.
            </p>
            <button
              type="button"
              className="mt-3 text-sm font-semibold text-zinc-900 underline decoration-zinc-400"
            >
              Mostrar mas
            </button>
          </DetailSection>

          <DetailSection title="Lo que este lugar ofrece">
            <div className="grid grid-cols-2 gap-3">
              {amenities.map((amenity) => (
                <p
                  key={amenity.id}
                  className={`flex items-center gap-2 text-sm ${
                    amenity.unavailable ? "text-zinc-400 line-through" : "text-zinc-700"
                  }`}
                >
                  <span aria-hidden>{amenity.icon}</span>
                  <span>{amenity.label}</span>
                </p>
              ))}
            </div>
            <button
              type="button"
              className="mt-4 rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700"
            >
              Mostrar mas servicios
            </button>
          </DetailSection>

          <DetailSection title="Adonde iras">
            <p className="text-sm text-zinc-500">Pocitos, Montevideo, Uruguay</p>
            <div className="mt-3 h-44 rounded-2xl bg-gradient-to-br from-zinc-200 via-zinc-100 to-slate-200" />
          </DetailSection>

          <DetailSection
            title="1 noche en Montevideo"
            subtitle="Disponible 31 de julio - 1 de agosto"
          >
            <div className="space-y-3">
              <CalendarMonth monthLabel="Julio 2026" days={julyDays} />
              <CalendarMonth monthLabel="Agosto 2026" days={augustDays} />
            </div>
          </DetailSection>

          <DetailSection title="4.71 (21 resenas)">
            <div className="rounded-2xl border border-zinc-200 p-4">
              <p className="text-3xl font-semibold text-zinc-900">★ 4.71</p>
              <p className="mt-1 text-sm text-zinc-500">Promedio de limpieza, ubicacion y llegada</p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-zinc-600">
                <p>Limpieza: 4.8</p>
                <p>Ubicacion: 4.9</p>
                <p>Llegada: 4.7</p>
                <p>Relacion precio-calidad: 4.6</p>
              </div>
            </div>

            <article className="mt-4 rounded-2xl border border-zinc-200 p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-zinc-200" />
                <div>
                  <p className="text-sm font-semibold text-zinc-900">Maria</p>
                  <p className="text-xs text-zinc-500">Julio de 2026</p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700">
                Excelente ubicacion, muy comodo y tal cual las fotos. Repetiriamos
                sin duda para una escapada corta.
              </p>
            </article>

            <button
              type="button"
              className="mt-4 rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700"
            >
              Mostrar las 21 resenas
            </button>
          </DetailSection>

          <DetailSection title="Conoce al anfitrion">
            <article className="rounded-2xl border border-zinc-200 p-4">
              <div className="flex items-center gap-3">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-amber-200 via-orange-100 to-rose-200" />
                <div>
                  <p className="text-lg font-semibold text-zinc-900">Patrick</p>
                  <p className="text-xs text-zinc-500">Superanfitrion</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-zinc-600">
                <p>
                  <span className="block text-base font-semibold text-zinc-900">170</span>
                  Evaluaciones
                </p>
                <p>
                  <span className="block text-base font-semibold text-zinc-900">4.8</span>
                  Calificacion
                </p>
                <p>
                  <span className="block text-base font-semibold text-zinc-900">4</span>
                  Anos de anfitrion
                </p>
              </div>
            </article>

            <article className="mt-4 rounded-2xl border border-zinc-200 p-4 text-sm text-zinc-700">
              <p className="font-medium text-zinc-900">Informacion del anfitrion</p>
              <p className="mt-1">Habla espanol e ingles.</p>
              <p>Tiempo de respuesta promedio: 1 hora.</p>
            </article>

            <button
              type="button"
              className="mt-4 rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700"
            >
              Mensaje al anfitrion
            </button>
          </DetailSection>

          <DetailSection title="Lo que debes saber">
            <div className="space-y-4 text-sm text-zinc-700">
              <article>
                <h3 className="font-semibold text-zinc-900">Normas de la casa</h3>
                <p className="mt-1 text-zinc-600">Check-in desde las 15:00 · No fumar · Sin fiestas.</p>
              </article>
              <article>
                <h3 className="font-semibold text-zinc-900">Salud y seguridad</h3>
                <p className="mt-1 text-zinc-600">Detector de humo y extintor en el edificio.</p>
              </article>
              <article>
                <h3 className="font-semibold text-zinc-900">Politica de cancelacion</h3>
                <p className="mt-1 text-zinc-600">Cancelacion gratuita hasta 48 horas antes del check-in.</p>
              </article>
            </div>
          </DetailSection>

          <DetailSection title="Descubre otras opciones en Montevideo y sus alrededores">
            <div className="space-y-3">
              {nearbyPlaces.map((place) => (
                <article
                  key={place.id}
                  className="flex items-start justify-between rounded-xl border border-zinc-200 p-3"
                >
                  <p className="text-sm font-medium text-zinc-900">{place.name}</p>
                  <div className="text-right text-xs text-zinc-500">
                    <p>{place.distanceLabel}</p>
                    <p>{place.travelLabel}</p>
                  </div>
                </article>
              ))}
            </div>

            <button
              type="button"
              className="mt-4 rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700"
            >
              Mostrar todos los alojamientos
            </button>
          </DetailSection>
        </main>

        <div className="sticky bottom-0 border-t border-zinc-200 bg-white/95 px-4 py-3 backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500">Precio por noche</p>
              <p className="text-base font-semibold text-zinc-900">$U 98.490</p>
            </div>
            <button
              type="button"
              className="rounded-full bg-rose-500 px-6 py-2 text-sm font-semibold text-white"
            >
              Reservar
            </button>
          </div>
        </div>
      </MobileFrame>
    </div>
  );
}
