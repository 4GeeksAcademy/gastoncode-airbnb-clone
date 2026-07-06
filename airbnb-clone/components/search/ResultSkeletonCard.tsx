type ResultSkeletonCardProps = {
  badgeText?: string;
};

export function ResultSkeletonCard({ badgeText }: ResultSkeletonCardProps) {
  return (
    <article className="px-4 pb-5">
      <div className="relative h-44 animate-pulse rounded-2xl bg-zinc-200">
        {badgeText ? (
          <span className="absolute top-2 left-2 rounded-full bg-white px-2 py-1 text-[10px] font-semibold text-zinc-600">
            {badgeText}
          </span>
        ) : null}
        <span className="absolute top-3 right-3 text-sm text-zinc-500">♡</span>
      </div>
      <div className="mt-2 space-y-2">
        <div className="h-3 w-11/12 animate-pulse rounded bg-zinc-200" />
        <div className="h-3 w-7/12 animate-pulse rounded bg-zinc-200" />
        <div className="h-3 w-9/12 animate-pulse rounded bg-zinc-200" />
      </div>
    </article>
  );
}
