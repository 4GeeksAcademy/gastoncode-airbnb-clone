import { StayImage } from "@/components/search/StayImage";
import { StayMeta } from "@/components/search/StayMeta";
import type { StayResult } from "@/types/search";
import Link from "next/link";

type StayCardProps = {
  stay: StayResult;
};

export function StayCard({ stay }: StayCardProps) {
  const content = (
    <>
      <StayImage imageTone={stay.imageTone} badge={stay.badge} />
      <StayMeta
        title={stay.title}
        subtitle={stay.subtitle}
        datesLabel={stay.datesLabel}
        priceLabel={stay.priceLabel}
        rating={stay.rating}
      />
    </>
  );

  return (
    <article className="px-4 pb-5">
      {stay.detailHref ? (
        <Link
          href={stay.detailHref}
          className="block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400"
          aria-label={`Ver detalle de ${stay.title}`}
        >
          {content}
        </Link>
      ) : (
        content
      )}
    </article>
  );
}
