type MapHeroProps = {
  locationLabel: string;
};

export function MapHero({ locationLabel }: MapHeroProps) {
  return (
    <div className="relative h-24 overflow-hidden border-b border-zinc-200 bg-gradient-to-b from-emerald-100 via-lime-50 to-white">
      <div className="absolute inset-0 opacity-45 [background-image:radial-gradient(circle_at_1px_1px,rgba(63,63,70,0.25)_1px,transparent_0)] [background-size:20px_20px]" />
      <div className="absolute inset-x-0 top-3 flex justify-center px-4">
        <button
          type="button"
          className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-700 shadow-sm"
        >
          {locationLabel}
        </button>
      </div>
    </div>
  );
}
