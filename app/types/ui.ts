import type { SearchState } from "../data/search-state";

export type SearchBarProps = {
  searchState: SearchState;
  onFieldChange: (field: keyof SearchState, value: string) => void;
  onSearch: () => void;
};

export type MobileNavTab = "explora" | "favoritos" | "sesion";

export type MobileNavProps = {
  hidden?: boolean;
};

export type CatalogSearchBarProps = SearchBarProps;

export type CatalogCategoryId = "playa" | "mansiones" | "tendencias" | "cabanas" | "vinedos";