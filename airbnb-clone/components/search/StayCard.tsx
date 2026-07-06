import { StayImage } from "@/components/search/StayImage";
import { StayMeta } from "@/components/search/StayMeta";
import type { StayResult } from "@/types/search";

type StayCardProps = {
  stay: StayResult;
};

export function StayCard({ stay }: StayCardProps) {
  return (
    <article className="px-4 pb-5">
      <StayImage imageTone={stay.imageTone} badge={stay.badge} />
      <StayMeta
        title={stay.title}
        subtitle={stay.subtitle}
        datesLabel={stay.datesLabel}
        priceLabel={stay.priceLabel}
        rating={stay.rating}
      />
    </article>
  );
}
