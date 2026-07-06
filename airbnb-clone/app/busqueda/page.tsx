import { BottomNav } from "@/components/home/BottomNav";
import { MobileFrame } from "@/components/home/MobileFrame";
import { MapHero } from "@/components/search/MapHero";
import { ResultsPagination } from "@/components/search/ResultsPagination";
import { ResultsSummary } from "@/components/search/ResultsSummary";
import { SearchFilterRow } from "@/components/search/SearchFilterRow";
import { StayResultsList } from "@/components/search/StayResultsList";
import type { SearchFilter, SearchPagination, StayResult } from "@/types/search";

const filters: SearchFilter[] = [
  { id: "tipo", label: "Tipo de alojamiento" },
  { id: "precio", label: "Precio" },
  { id: "habitaciones", label: "Habitaciones" },
  { id: "servicios", label: "Servicios" },
];

const stays: StayResult[] = [
  {
    id: "stay-1",
    title: "Alojamiento en Punta del Este",
    subtitle: "Vista al mar · A 4 km del centro",
    datesLabel: "27 de jul - 1 de ago",
    priceLabel: "$U 251.972",
    rating: "4.87",
    imageTone: "sand",
  },
  {
    id: "stay-2",
    title: "Apartamento en Punta del Este",
    subtitle: "Piscina climatizada · 1 dormitorio",
    datesLabel: "5 de ago - 10 de ago",
    priceLabel: "$U 204.631",
    rating: "4.92",
    imageTone: "mint",
    badge: "Superanfitrion",
  },
  {
    id: "stay-3",
    title: "Suite en Roosevelt",
    subtitle: "Edificio nuevo · Check-in autonomo",
    datesLabel: "12 de ago - 17 de ago",
    priceLabel: "$U 186.229",
    rating: "4.81",
    imageTone: "city",
  },
  {
    id: "stay-4",
    title: "Casa en Playa Mansa",
    subtitle: "Patio con parrillero · 2 banos",
    datesLabel: "17 de ago - 22 de ago",
    priceLabel: "$U 309.445",
    rating: "4.95",
    imageTone: "forest",
    badge: "Favorito entre huespedes",
  },
];

const pagination: SearchPagination = {
  currentPage: 1,
  totalPages: 25,
};

export default function BusquedaPage() {
  return (
    <div className="bg-zinc-100 py-4 sm:py-8">
      <MobileFrame>
        <main className="pb-20">
          <MapHero locationLabel="Punta del Este · 27 jul - 1 ago · 2 huespedes" />
          <SearchFilterRow filters={filters} />
          <ResultsSummary text="Mas de 1000 alojamientos encontrados" />
          <StayResultsList stays={stays} skeletonCount={8} />
          <ResultsPagination pagination={pagination} />
        </main>
      </MobileFrame>

      <BottomNav />
    </div>
  );
}
