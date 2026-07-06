import { ListingCard } from "@/components/home/ListingCard";
import type { ListingItem } from "@/types/home";

type ListingGridProps = {
  listings: ListingItem[];
};

export function ListingGrid({ listings }: ListingGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}
