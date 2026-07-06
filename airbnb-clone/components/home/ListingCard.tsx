import { ListingMeta } from "@/components/home/ListingMeta";
import { ListingThumbnail } from "@/components/home/ListingThumbnail";
import type { ListingItem } from "@/types/home";

type ListingCardProps = {
  listing: ListingItem;
};

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <article>
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
    </article>
  );
}
