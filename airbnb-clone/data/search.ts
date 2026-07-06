import type { SearchFilter, SearchPagination, StayResult } from "@/types/search";

export const filters: SearchFilter[] = [
  { id: "tipo", label: "Tipo de alojamiento" },
  { id: "precio", label: "Precio" },
  { id: "habitaciones", label: "Habitaciones" },
  { id: "servicios", label: "Servicios" },
];

export const stays: StayResult[] = [
  {
    id: "stay-1",
    title: "Alojamiento en Punta del Este",
    subtitle: "Vista al mar · A 4 km del centro",
    datesLabel: "27 de jul - 1 de ago",
    priceLabel: "$U 251.972",
    rating: "4.87",
    imageTone: "sand",
    detailHref: "/alojamiento",
  },
  {
    id: "stay-2",
    title: "Apartamento en Punta del Este",
    subtitle: "Piscina climatizada · 1 dormitorio",
    datesLabel: "5 de ago - 10 de ago",
    priceLabel: "$U 204.631",
    rating: "4.92",
    imageTone: "mint",
    badge: "Superanfitrion",
    detailHref: "/alojamiento",
  },
  {
    id: "stay-3",
    title: "Suite en Roosevelt",
    subtitle: "Edificio nuevo · Check-in autonomo",
    datesLabel: "12 de ago - 17 de ago",
    priceLabel: "$U 186.229",
    rating: "4.81",
    imageTone: "city",
    detailHref: "/alojamiento",
  },
  {
    id: "stay-4",
    title: "Casa en Playa Mansa",
    subtitle: "Patio con parrillero · 2 banos",
    datesLabel: "17 de ago - 22 de ago",
    priceLabel: "$U 309.445",
    rating: "4.95",
    imageTone: "forest",
    badge: "Favorito entre huespedes",
    detailHref: "/alojamiento",
  },
];

export const pagination: SearchPagination = {
  currentPage: 1,
  totalPages: 25,
};
