export type ResultStay = {
  id: string;
  title: string;
  subtitle: string;
  details: string;
  price: string;
  total: string;
  rating: string;
  image: string;
  badge?: string;
  favorite?: boolean;
};

export const resultsHeader = {
  location: "Cerca de Buenos Aires",
  dates: "17-22 de nov",
  guests: "2 huespedes",
  mapLabel: "Mostrar mapa",
  segmentLabel: "Alojamientos",
};

export const filterChips = ["Precio", "Tipo de lugar", "Calificacion", "Habitaciones"];

export const resultStays: ResultStay[] = [
  {
    id: "res-1",
    title: "Loft de diseno con balcon",
    subtitle: "Apartamento entero en Palermo",
    details: "2 camas - Wifi - Cocina",
    price: "$ 42.911 UYU por noche",
    total: "$ 214.555 UYU total",
    rating: "4.96",
    image: "https://picsum.photos/seed/results-home-1/900/700",
    badge: "Favorito entre huespedes",
    favorite: true,
  },
  {
    id: "res-2",
    title: "Suite moderna con bano de marmol",
    subtitle: "Habitacion privada en Recoleta",
    details: "1 cama queen - Aire - Gimnasio",
    price: "$ 18.440 UYU por noche",
    total: "$ 92.200 UYU total",
    rating: "4.88",
    image: "https://picsum.photos/seed/results-home-2/900/700",
  },
  {
    id: "res-3",
    title: "Casa luminosa con patio y parrilla",
    subtitle: "Casa entera en Colegiales",
    details: "3 camas - Estacionamiento - Patio",
    price: "$ 56.780 UYU por noche",
    total: "$ 283.900 UYU total",
    rating: "4.92",
    image: "https://picsum.photos/seed/results-home-3/900/700",
    badge: "Favorito entre huespedes",
  },
  {
    id: "res-4",
    title: "Studio tranquilo cerca del subte",
    subtitle: "Apartamento entero en Villa Crespo",
    details: "1 cama - Escritorio - Balcon",
    price: "$ 15.720 UYU por noche",
    total: "$ 78.600 UYU total",
    rating: "4.74",
    image: "https://picsum.photos/seed/results-home-4/900/700",
  },
  {
    id: "res-5",
    title: "Duplex premium con terraza",
    subtitle: "Apartamento entero en Belgrano",
    details: "2 camas - Terraza - Laundry",
    price: "$ 34.600 UYU por noche",
    total: "$ 173.000 UYU total",
    rating: "4.91",
    image: "https://picsum.photos/seed/results-home-5/900/700",
    badge: "Superanfitrion",
  },
  {
    id: "res-6",
    title: "Habitacion acogedora con vista al parque",
    subtitle: "Habitacion privada en Caballito",
    details: "1 cama doble - Desayuno",
    price: "$ 13.200 UYU por noche",
    total: "$ 66.000 UYU total",
    rating: "4.69",
    image: "https://picsum.photos/seed/results-home-6/900/700",
  },
  {
    id: "res-7",
    title: "Departamento minimalista",
    subtitle: "Apartamento entero en Almagro",
    details: "2 camas - Wifi rapido - Smart TV",
    price: "$ 21.500 UYU por noche",
    total: "$ 107.500 UYU total",
    rating: "4.81",
    image: "https://picsum.photos/seed/results-home-7/900/700",
  },
  {
    id: "res-8",
    title: "Casa reciclada con toque industrial",
    subtitle: "Casa entera en Chacarita",
    details: "2 habitaciones - Patio - Parrilla",
    price: "$ 38.900 UYU por noche",
    total: "$ 194.500 UYU total",
    rating: "4.95",
    image: "https://picsum.photos/seed/results-home-8/900/700",
    badge: "Favorito entre huespedes",
  },
  {
    id: "res-9",
    title: "Monoambiente practico en zona centro",
    subtitle: "Apartamento entero en San Nicolas",
    details: "1 cama - Aire frio/calor",
    price: "$ 14.300 UYU por noche",
    total: "$ 71.500 UYU total",
    rating: "4.62",
    image: "https://picsum.photos/seed/results-home-9/900/700",
  },
  {
    id: "res-10",
    title: "Penthouse con ventanales",
    subtitle: "Apartamento entero en Puerto Madero",
    details: "2 camas king - Gimnasio - Piscina",
    price: "$ 64.800 UYU por noche",
    total: "$ 324.000 UYU total",
    rating: "4.99",
    image: "https://picsum.photos/seed/results-home-10/900/700",
    badge: "Favorito entre huespedes",
    favorite: true,
  },
  {
    id: "res-11",
    title: "Depto tranquilo para teletrabajo",
    subtitle: "Apartamento entero en Nunez",
    details: "1 cama queen - Escritorio amplio",
    price: "$ 19.700 UYU por noche",
    total: "$ 98.500 UYU total",
    rating: "4.84",
    image: "https://picsum.photos/seed/results-home-11/900/700",
  },
  {
    id: "res-12",
    title: "Cabana urbana con jardin",
    subtitle: "Casa entera en Villa Urquiza",
    details: "2 camas - Jardin privado",
    price: "$ 29.900 UYU por noche",
    total: "$ 149.500 UYU total",
    rating: "4.87",
    image: "https://picsum.photos/seed/results-home-12/900/700",
    badge: "Favorito entre huespedes",
  },
];
