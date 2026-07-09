export type Stay = {
  title: string;
  details: string;
  price: string;
  rating: string;
  image: string;
  badge?: string;
  accent: string;
};

export type StaySection = {
  title: string;
  cards: Stay[];
};

export type InspirationLink = {
  title: string;
  subtitle: string;
};

export const categoryFilters = ["Todo", "Alojamientos", "Experiencias"];

export const staySections: StaySection[] = [
  {
    title: "Alojamientos populares en Buenos Aires",
    cards: [
      {
        title: "Apartamento en Buenos Aires",
        details: "$U 56.301 UYU por 2 noches",
        price: "$ 56.301",
        rating: "5.0",
        image: "https://picsum.photos/seed/bsas-home-1/640/640",
        badge: "Favorito entre huespedes",
        accent: "sunset",
      },
      {
        title: "Casa de huespedes en Buenos Aires",
        details: "$U 1.162 UYU por 2 noches",
        price: "$ 1.162",
        rating: "4.78",
        image: "https://picsum.photos/seed/bsas-home-2/640/640",
        accent: "wood",
      },
    ],
  },
  {
    title: "Quedate en Punta del Este",
    cards: [
      {
        title: "Loft en Punta del Este",
        details: "$U 9.491 UYU por 2 noches",
        price: "$ 9.491",
        rating: "4.91",
        image: "https://picsum.photos/seed/pde-home-1/640/640",
        badge: "Favorito entre huespedes",
        accent: "ocean",
      },
      {
        title: "Apartamento en Punta del Este",
        details: "$U 126 UYU por 2 noches",
        price: "$ 126",
        rating: "4.87",
        image: "https://picsum.photos/seed/pde-home-2/640/640",
        badge: "Favorito entre huespedes",
        accent: "pool",
      },
    ],
  },
  {
    title: "Disponibles cerca de Colonia del Sacramento el proximo fin de semana",
    cards: [
      {
        title: "Alojamiento en Colonia del Sacramento",
        details: "$U 3.628 UYU por 2 noches",
        price: "$ 3.628",
        rating: "4.74",
        image: "https://picsum.photos/seed/colonia-home-1/640/640",
        badge: "Favorito entre huespedes",
        accent: "forest",
      },
      {
        title: "Apartamento en Colonia del Sacramento",
        details: "$U 3.424 UYU por 2 noches",
        price: "$ 3.424",
        rating: "4.76",
        image: "https://picsum.photos/seed/colonia-home-2/640/640",
        badge: "Favorito entre huespedes",
        accent: "wine",
      },
    ],
  },
  {
    title: "Experiencias populares en Montevideo",
    cards: [
      {
        title: "Montevideo Adentro: Descubri la ciudad",
        details: "Por participante",
        price: "Por persona",
        rating: "4.95",
        image: "https://picsum.photos/seed/mvd-exp-1/640/640",
        badge: "Popular",
        accent: "gold",
      },
      {
        title: "Caminata por Montevideo - Espanol + Portugues",
        details: "Por participante",
        price: "Por persona",
        rating: "4.98",
        image: "https://picsum.photos/seed/mvd-exp-2/640/640",
        badge: "Popular",
        accent: "crowd",
      },
    ],
  },
  {
    title: "Alojamientos en San Carlos de Bariloche",
    cards: [
      {
        title: "Apartamento en San Carlos de Bariloche",
        details: "$U 3.288 UYU por 2 noches",
        price: "$ 3.288",
        rating: "4.58",
        image: "https://picsum.photos/seed/bariloche-home-1/640/640",
        badge: "Favorito entre huespedes",
        accent: "hills",
      },
      {
        title: "Alojamiento en San Carlos de Bariloche",
        details: "$U 3.445 UYU por 2 noches",
        price: "$ 3.445",
        rating: "4.92",
        image: "https://picsum.photos/seed/bariloche-home-2/640/640",
        badge: "Favorito entre huespedes",
        accent: "lake",
      },
    ],
  },
  {
    title: "Disponibles cerca de Lavalleja el proximo fin de semana",
    cards: [
      {
        title: "Minicasa en Minas",
        details: "$U 5.676 UYU por 2 noches",
        price: "$ 5.676",
        rating: "4.99",
        image: "https://picsum.photos/seed/lavalleja-home-1/640/640",
        badge: "Favorito entre huespedes",
        accent: "hills",
      },
      {
        title: "Alojamiento en Villa Serrana",
        details: "$U 3.445 UYU por 2 noches",
        price: "$ 3.445",
        rating: "4.86",
        image: "https://picsum.photos/seed/lavalleja-home-2/640/640",
        badge: "Favorito entre huespedes",
        accent: "lake",
      },
    ],
  },
];

export const inspirationLinks: InspirationLink[] = [
  { title: "West Palm Beach", subtitle: "Casas de vacaciones" },
  { title: "Gulf Shores", subtitle: "Apartamentos vacacionales" },
  { title: "Niagara Falls", subtitle: "Casas de vacaciones" },
  { title: "Naples", subtitle: "Apartamentos vacacionales" },
  { title: "Maui", subtitle: "Casas de vacaciones" },
  { title: "Berkshires", subtitle: "Cabanas vacacionales" },
  { title: "Memphis", subtitle: "Casas vacacionales" },
  { title: "Mostrar mas", subtitle: "" },
];

export const footerColumns = [
  {
    title: "Asistencia",
    links: [
      "Centro de ayuda",
      "Recibe ayuda con un problema de seguridad",
      "AirCover",
      "Seguro de viaje",
      "Antidiscriminacion",
      "Apoyo para discapacidades",
      "Opciones de cancelacion",
      "Problemas en el vecindario",
    ],
  },
  {
    title: "Modo anfitrion",
    links: [
      "Pon tu espacio en Airbnb",
      "Ofrece tu experiencia en Airbnb",
      "Ofrece tu servicio en Airbnb",
      "AirCover para anfitriones",
      "Recursos para anfitriones",
      "Foro comunitario",
      "Anfitriona con responsabilidad",
      "Unete a una clase gratuita sobre anfitrion",
      "Buscar un coanfitrion",
      "Recomienda a un anfitrion",
    ],
  },
  {
    title: "Airbnb",
    links: [
      "Novedades de mayo de 2026",
      "Sala de prensa",
      "Carreras",
      "Inversionistas",
      "Tarjeta de regalo",
      "Espacio en Airbnb.org",
    ],
  },
];
