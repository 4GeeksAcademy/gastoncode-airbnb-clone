import { ListingMeta } from "@/components/home/ListingMeta";
import { ListingThumbnail } from "@/components/home/ListingThumbnail";
import type { ListingItem } from "@/types/home";
import Link from "next/link";

type ListingCardProps = {
  listing: ListingItem;
};

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <article>
      <Link
        href="/alojamiento"
        aria-label={`Ver detalle de ${listing.title}`}
        className="block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400"
      >
        <ListingThumbnail
          badge={listing.badge}
          rating={listing.rating}
          imageTone={listing.imageTone}
        />
        <ListingMeta
          title={listing.title}
          location={listing.location}
          priceLabel={listing.priceLabel}
          nightsLabel={listing.nightsLabel}
        />
      </Link>
    </article>
  );
}
