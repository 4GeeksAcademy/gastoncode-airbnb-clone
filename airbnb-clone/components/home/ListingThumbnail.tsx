import { FavoriteButton } from "@/components/home/FavoriteButton";
import { ListingBadge } from "@/components/home/ListingBadge";
import { RatingPill } from "@/components/home/RatingPill";

type ListingThumbnailProps = {
  badge: string;
  rating: string;
  imageTone: "sky" | "sand" | "forest" | "city" | "mint" | "rose";
};

const toneClasses: Record<ListingThumbnailProps["imageTone"], string> = {
  sky: "from-sky-200 via-cyan-100 to-blue-200",
  sand: "from-amber-200 via-orange-100 to-yellow-100",
  forest: "from-emerald-300 via-lime-100 to-green-200",
  city: "from-zinc-300 via-slate-200 to-zinc-100",
  mint: "from-teal-200 via-emerald-100 to-cyan-100",
  rose: "from-rose-200 via-pink-100 to-orange-100",
};

export function ListingThumbnail({
  badge,
  rating,
  imageTone,
}: ListingThumbnailProps) {
  return (
    <div
      className={`relative h-32 overflow-hidden rounded-2xl bg-gradient-to-br ${toneClasses[imageTone]} p-2`}
      aria-hidden
    >
      <div className="flex items-start justify-between">
        <ListingBadge text={badge} />
        <FavoriteButton />
      </div>
      <div className="absolute right-2 bottom-2">
        <RatingPill value={rating} />
      </div>
    </div>
  );
}
