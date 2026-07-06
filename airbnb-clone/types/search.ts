export type SearchFilter = {
  id: string;
  label: string;
};

export type StayResult = {
  id: string;
  title: string;
  subtitle: string;
  datesLabel: string;
  priceLabel: string;
  rating: string;
  imageTone: "city" | "forest" | "sand" | "mint";
  badge?: string;
};

export type SearchPagination = {
  currentPage: number;
  totalPages: number;
};
