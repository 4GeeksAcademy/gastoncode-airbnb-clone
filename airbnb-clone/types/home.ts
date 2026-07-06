export type CategoryItem = {
  id: string;
  icon: string;
  label: string;
};

export type ListingItem = {
  id: string;
  title: string;
  location: string;
  priceLabel: string;
  nightsLabel: string;
  badge: string;
  rating: string;
  imageTone: "sky" | "sand" | "forest" | "city" | "mint" | "rose";
};

export type ListingSectionData = {
  id: string;
  title: string;
  listings: ListingItem[];
};

export type FooterLinkGroup = {
  id: string;
  title: string;
  links: string[];
};
