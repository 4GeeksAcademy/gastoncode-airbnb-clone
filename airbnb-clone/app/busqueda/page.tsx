import { BottomNav } from "@/components/home/BottomNav";
import { MobileFrame } from "@/components/home/MobileFrame";
import { MapHero } from "@/components/search/MapHero";
import { ResultsPagination } from "@/components/search/ResultsPagination";
import { ResultsSummary } from "@/components/search/ResultsSummary";
import { SearchFilterRow } from "@/components/search/SearchFilterRow";
import { StayResultsList } from "@/components/search/StayResultsList";
import { filters, pagination, stays } from "@/data/search";

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
