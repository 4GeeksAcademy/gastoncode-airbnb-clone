import { FavoriteButton } from "@/components/home/FavoriteButton";

type StayImageProps = {
  imageTone: "city" | "forest" | "sand" | "mint";
  badge?: string;
};

const toneClasses: Record<StayImageProps["imageTone"], string> = {
  city: "from-zinc-300 via-slate-200 to-zinc-100",
  forest: "from-emerald-300 via-lime-100 to-green-200",
  sand: "from-amber-200 via-orange-100 to-yellow-100",
  mint: "from-teal-200 via-emerald-100 to-cyan-100",
};

export function StayImage({ imageTone, badge }: StayImageProps) {
  return (
    <div
      className={`relative h-44 overflow-hidden rounded-2xl bg-gradient-to-br ${toneClasses[imageTone]}`}
      aria-hidden
    >
      <div className="absolute top-2 right-2">
        <FavoriteButton />
      </div>
      {badge ? (
        <span className="absolute top-2 left-2 rounded-full bg-white/95 px-2 py-1 text-[10px] font-semibold text-zinc-700">
          {badge}
        </span>
      ) : null}
    </div>
  );
}
