type StayMetaProps = {
  title: string;
  subtitle: string;
  datesLabel: string;
  priceLabel: string;
  rating: string;
};

export function StayMeta({
  title,
  subtitle,
  datesLabel,
  priceLabel,
  rating,
}: StayMetaProps) {
  return (
    <div className="space-y-1 pt-2">
      <div className="flex items-start justify-between gap-3">
        <p className="line-clamp-1 text-sm font-semibold text-zinc-900">{title}</p>
        <p className="text-xs font-medium text-zinc-700">★ {rating}</p>
      </div>
      <p className="line-clamp-1 text-xs text-zinc-500">{subtitle}</p>
      <p className="text-xs text-zinc-500">{datesLabel}</p>
      <p className="text-sm text-zinc-900">
        <span className="font-semibold">{priceLabel}</span> por 5 noches
      </p>
    </div>
  );
}
