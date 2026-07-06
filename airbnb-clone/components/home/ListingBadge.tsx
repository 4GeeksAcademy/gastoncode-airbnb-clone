type ListingBadgeProps = {
  text: string;
};

export function ListingBadge({ text }: ListingBadgeProps) {
  return (
    <span className="rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-zinc-700 shadow-sm">
      {text}
    </span>
  );
}
