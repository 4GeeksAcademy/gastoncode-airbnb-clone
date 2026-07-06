import type { SearchFilter } from "@/types/search";

type SearchFilterChipProps = {
  filter: SearchFilter;
};

export function SearchFilterChip({ filter }: SearchFilterChipProps) {
  return (
    <button
      type="button"
      className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs text-zinc-700"
    >
      {filter.label}
    </button>
  );
}
