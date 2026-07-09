export type LocationHeroImage = {
  id: string;
  src: string;
  alt: string;
};

export type LocationHighlight = {
  id: string;
  title: string;
  description: string;
};

export type LocationAmenity = {
  id: string;
  label: string;
  available: boolean;
};

export type LocationReview = {
  id: string;
  name: string;
  origin: string;
  avatar: string;
  rating: string;
  date: string;
  text: string;
};

export const locationHeroImages: LocationHeroImage[] = [
  {
    id: "hero-1",
    src: "https://picsum.photos/seed/location-main-1/1200/900",
    alt: "Dormitorio principal con decoracion minimalista",
  },
  {
    id: "hero-2",
    src: "https://picsum.photos/seed/location-main-2/1200/900",
    alt: "Area de estar del apartamento",
  },
  {
    id: "hero-3",
    src: "https://picsum.photos/seed/location-main-3/1200/900",
    alt: "Vista del barrio desde el apartamento",
  },
];

export const locationHeader = {
  title: "Encantador apartamento en Pocitos bueno",
  location: "Montevideo, Uruguay",
  details: "4 huespedes · 1 dormitorio · 2 camas · 1 bano",
  rating: "4.97",
  reviews: "261",
};

export const locationHost = {
  name: "Andrea",
  role: "Anfitrion",
  yearsHosting: "Anfitrion desde hace 7 anos",
  avatar: "https://picsum.photos/seed/host-andrea/120/120",
};

export const locationHighlights: LocationHighlight[] = [
  {
    id: "hl-1",
    title: "Excelente ubicacion",
    description: "A 4 minutos caminando de la rambla y restaurantes.",
  },
  {
    id: "hl-2",
    title: "Estacionamiento gratuito",
    description: "Cochera privada en el edificio, sin costo adicional.",
  },
  {
    id: "hl-3",
    title: "Acceso autonomo",
    description: "Check-in con cerradura digital las 24 horas.",
  },
];

export const locationDescription =
  "Apartamento luminoso en Pocitos con balcon, cocina equipada y espacio de trabajo. Ideal para una estadia corta o para trabajar remoto cerca del mar. Te vas a quedar a pasos de cafeterias, supermercados y transporte publico.";

export const sleepingPlaces = [
  {
    id: "sleep-1",
    title: "Dormitorio 1",
    beds: "1 cama queen",
    image: "https://picsum.photos/seed/location-bed-1/560/420",
  },
  {
    id: "sleep-2",
    title: "Sala de estar",
    beds: "1 sofa cama",
    image: "https://picsum.photos/seed/location-bed-2/560/420",
  },
];

export const locationAmenities: LocationAmenity[] = [
  { id: "am-1", label: "Cocina completa", available: true },
  { id: "am-2", label: "Wifi de 300 Mbps", available: true },
  { id: "am-3", label: "Aire acondicionado", available: true },
  { id: "am-4", label: "Lavarropas", available: true },
  { id: "am-5", label: "Piscina", available: false },
  { id: "am-6", label: "Ascensor", available: true },
  { id: "am-7", label: "Parrillero", available: false },
  { id: "am-8", label: "Se permiten mascotas", available: true },
];

export const locationAccessibility = {
  title: "Accesibilidad",
  description: "Entrada principal sin escalones y ascensor hasta el apartamento.",
  image: "https://picsum.photos/seed/location-accessibility/1000/520",
};

export const locationAvailability = {
  heading: "1 noche en Montevideo",
  subtitle: "3 al 4 de nov de 2026",
  monthLabel: "Noviembre 2026",
  weekdays: ["L", "M", "M", "J", "V", "S", "D"],
  days: [
    "",
    "",
    "",
    "",
    "",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
  ],
  selectedRange: ["3", "4"],
};

export const locationRatingSummary = {
  score: "4.97",
  totalReviews: "261",
  categories: [
    { id: "rt-1", label: "Limpieza", value: "5.0" },
    { id: "rt-2", label: "Exactitud", value: "4.9" },
    { id: "rt-3", label: "Check-in", value: "5.0" },
    { id: "rt-4", label: "Comunicacion", value: "5.0" },
    { id: "rt-5", label: "Ubicacion", value: "4.9" },
    { id: "rt-6", label: "Precio", value: "4.8" },
  ],
};

export const locationReviews: LocationReview[] = [
  {
    id: "rv-1",
    name: "Patrick",
    origin: "Londres, Reino Unido",
    avatar: "https://picsum.photos/seed/reviewer-patrick/96/96",
    rating: "5.0",
    date: "abril de 2026",
    text: "Excelente ubicacion y apartamento impecable. Andrea estuvo siempre disponible y nos dio recomendaciones muy utiles.",
  },
  {
    id: "rv-2",
    name: "Maria",
    origin: "Rosario, Argentina",
    avatar: "https://picsum.photos/seed/reviewer-maria/96/96",
    rating: "4.9",
    date: "marzo de 2026",
    text: "Muy comodo para una escapada de fin de semana. El check-in fue facil y el barrio es muy seguro.",
  },
];

export const locationHostDetails = {
  name: "Andrea",
  avatar: "https://picsum.photos/seed/host-andrea-card/140/140",
  reviews: "170",
  rating: "4.98",
  years: "7",
  about:
    "Naci y creci en Montevideo. Me encanta recibir huespedes y recomendar rincones de la ciudad.",
  born: "Montevideo, Uruguay",
  education: "Licenciada en Diseno",
  responseRate: "100%",
  responseTime: "responde en menos de una hora",
};

export const locationFacts = [
  {
    id: "fact-1",
    title: "Politica de cancelacion",
    text: "Cancelacion gratuita durante las primeras 48 horas.",
  },
  {
    id: "fact-2",
    title: "Reglas de la casa",
    text: "No se permite fumar ni realizar fiestas.",
  },
  {
    id: "fact-3",
    title: "Seguridad y propiedad",
    text: "Detector de humo, botiquin y camara en entrada del edificio.",
  },
];

export const nearbyOptions = [
  "Apartamento en Parque Rodo",
  "Loft en Ciudad Vieja",
  "Studio en Punta Carretas",
  "Habitacion privada en Buceo",
  "Casa en Carrasco",
  "Apartamento en Palermo",
];
