import type {
  CategoryItem,
  FooterLinkGroup,
  ListingSectionData,
} from "@/types/home";

export const categoryItems: CategoryItem[] = [
  { id: "all", icon: "✧", label: "Todo" },
  { id: "homes", icon: "⌂", label: "Alojamientos" },
  { id: "experiences", icon: "◌", label: "Experiencias" },
];

export const listingSections: ListingSectionData[] = [
  {
    id: "buenos-aires",
    title: "Alojamientos populares en Buenos Aires",
    listings: [
      {
        id: "ba-1",
        title: "Apartamento en Buenos Aires",
        location: "Buenos Aires",
        priceLabel: "$U 85.311",
        nightsLabel: "2 noches",
        badge: "Favorito entre huespedes",
        rating: "5.0",
        imageTone: "city",
      },
      {
        id: "ba-2",
        title: "Casa de huespedes en Buenos Aires",
        location: "Buenos Aires",
        priceLabel: "$U 142.871",
        nightsLabel: "2 noches",
        badge: "Favorito entre huespedes",
        rating: "4.78",
        imageTone: "sand",
      },
    ],
  },
  {
    id: "punta-del-este",
    title: "Quedate en Punta del Este",
    listings: [
      {
        id: "pde-1",
        title: "Loft en Punta del Este",
        location: "Punta del Este",
        priceLabel: "$U 449.111",
        nightsLabel: "2 noches",
        badge: "Favorito entre huespedes",
        rating: "4.91",
        imageTone: "sky",
      },
      {
        id: "pde-2",
        title: "Apartamento en Punta del Este",
        location: "Punta del Este",
        priceLabel: "$U 190.747",
        nightsLabel: "2 noches",
        badge: "Favorito entre huespedes",
        rating: "4.87",
        imageTone: "city",
      },
    ],
  },
  {
    id: "colonia",
    title: "Disponibles cerca de Colonia del Sacramento",
    listings: [
      {
        id: "cs-1",
        title: "Alojamiento en Colonia",
        location: "Colonia",
        priceLabel: "$U 362.717",
        nightsLabel: "2 noches",
        badge: "Favorito entre huespedes",
        rating: "4.78",
        imageTone: "forest",
      },
      {
        id: "cs-2",
        title: "Apartamento en Colonia",
        location: "Colonia del Sacramento",
        priceLabel: "$U 342.017",
        nightsLabel: "2 noches",
        badge: "Favorito entre huespedes",
        rating: "4.89",
        imageTone: "rose",
      },
    ],
  },
  {
    id: "bariloche",
    title: "Alojamientos en San Carlos de Bariloche",
    listings: [
      {
        id: "bari-1",
        title: "Apartamento en San Carlos de Bariloche",
        location: "Bariloche",
        priceLabel: "$U 215.003",
        nightsLabel: "2 noches",
        badge: "Favorito entre huespedes",
        rating: "4.58",
        imageTone: "mint",
      },
      {
        id: "bari-2",
        title: "Alojamiento en San Carlos de Bariloche",
        location: "Bariloche",
        priceLabel: "$U 384.449",
        nightsLabel: "2 noches",
        badge: "Favorito entre huespedes",
        rating: "4.92",
        imageTone: "sky",
      },
    ],
  },
  {
    id: "lavalleja",
    title: "Disponibles cerca de Lavalleja el proximo fin de semana",
    listings: [
      {
        id: "lava-1",
        title: "Minicasa en Minas",
        location: "Minas",
        priceLabel: "$U 675.117",
        nightsLabel: "2 noches",
        badge: "Favorito entre huespedes",
        rating: "4.98",
        imageTone: "forest",
      },
      {
        id: "lava-2",
        title: "Alojamiento en Villa Serrana",
        location: "Villa Serrana",
        priceLabel: "$U 124.799",
        nightsLabel: "2 noches",
        badge: "Favorito entre huespedes",
        rating: "4.90",
        imageTone: "mint",
      },
    ],
  },
];

export const footerGroups: FooterLinkGroup[] = [
  {
    id: "asistencia",
    title: "Asistencia",
    links: [
      "Centro de ayuda",
      "Recibe ayuda con un problema de seguridad",
      "AirCover",
      "Antidiscriminacion",
    ],
  },
  {
    id: "anfitrion",
    title: "Modo anfitrion",
    links: [
      "Pon tu espacio en Airbnb",
      "AirCover para anfitriones",
      "Recursos para anfitriones",
      "Foro comunitario",
    ],
  },
  {
    id: "airbnb",
    title: "Airbnb",
    links: [
      "Novedades de mayo de 2026",
      "Sala de prensa",
      "Empleo",
      "Inversores",
    ],
  },
];

export const inspirationTabs = [
  "Popular",
  "Arte y cultura",
  "Playa",
  "Montana",
  "Ciudad",
];

export const activeInspirationTab = "Popular";

export const inspirationLinks = [
  "West Palm Beach",
  "Gulf Shores",
  "Niagara Falls",
  "Nashville",
  "Miami",
  "Bentonville",
  "Memphis",
  "Mostrar mas",
];
