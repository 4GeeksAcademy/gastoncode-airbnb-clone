import type { SearchPagination } from "@/types/search";

type ResultsPaginationProps = {
  pagination: SearchPagination;
};

export function ResultsPagination({ pagination }: ResultsPaginationProps) {
  return (
    <div className="flex items-center justify-center gap-4 px-4 py-6">
      <button
        type="button"
        aria-label="Pagina anterior"
        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300 text-zinc-700"
      >
        ‹
      </button>
      <p className="text-xs text-zinc-600">
        Pagina {pagination.currentPage} de {pagination.totalPages}
      </p>
      <button
        type="button"
        aria-label="Pagina siguiente"
        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300 text-zinc-700"
      >
        ›
      </button>
    </div>
  );
}
