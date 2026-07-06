import { SearchFilterChip } from "@/components/search/SearchFilterChip";
import type { SearchFilter } from "@/types/search";

type SearchFilterRowProps = {
  filters: SearchFilter[];
};

export function SearchFilterRow({ filters }: SearchFilterRowProps) {
  return (
    <div className="overflow-x-auto px-4 py-3">
      <div className="flex w-max gap-2">
        {filters.map((filter) => (
          <SearchFilterChip key={filter.id} filter={filter} />
        ))}
      </div>
    </div>
  );
}
