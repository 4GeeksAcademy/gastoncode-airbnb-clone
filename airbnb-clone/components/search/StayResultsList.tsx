import { ResultSkeletonCard } from "@/components/search/ResultSkeletonCard";
import { StayCard } from "@/components/search/StayCard";
import type { StayResult } from "@/types/search";

type StayResultsListProps = {
  stays: StayResult[];
  skeletonCount: number;
};

export function StayResultsList({
  stays,
  skeletonCount,
}: StayResultsListProps) {
  return (
    <section>
      {stays.map((stay) => (
        <StayCard key={stay.id} stay={stay} />
      ))}
      {Array.from({ length: skeletonCount }, (_, index) => (
        <ResultSkeletonCard
          key={`skeleton-${index}`}
          badgeText={index % 2 === 0 ? "Favorito entre huespedes" : undefined}
        />
      ))}
    </section>
  );
}
