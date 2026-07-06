type ListingMetaProps = {
  title: string;
  location: string;
  priceLabel: string;
  nightsLabel: string;
};

export function ListingMeta({
  title,
  location,
  priceLabel,
  nightsLabel,
}: ListingMetaProps) {
  return (
    <div className="space-y-1 pt-2">
      <p className="line-clamp-1 text-xs font-semibold text-zinc-900">{title}</p>
      <p className="line-clamp-1 text-xs text-zinc-500">{location}</p>
      <p className="text-xs text-zinc-900">
        <span className="font-semibold">{priceLabel}</span> · {nightsLabel}
      </p>
    </div>
  );
}
