# Especificacion de componentes

Todos los componentes de esta carpeta son pequenos y con una sola responsabilidad.

## Home mobile

- `home/MobileFrame.tsx`: limita el ancho de la app para vista movil.
- `home/IconCircleButton.tsx`: renderiza un boton circular solo iconico.
- `home/TopSearchBar.tsx`: barra de busqueda superior con accion de filtros.
- `home/CategoryChip.tsx`: muestra un chip individual de categoria.
- `home/CategoryScroller.tsx`: lista horizontal de chips.
- `home/SectionHeader.tsx`: titulo de seccion con flecha a la derecha.
- `home/ListingBadge.tsx`: badge superior de estado del alojamiento.
- `home/FavoriteButton.tsx`: boton de favorito (corazon).
- `home/RatingPill.tsx`: pildora de calificacion.
- `home/ListingThumbnail.tsx`: miniatura visual del alojamiento y overlays.
- `home/ListingMeta.tsx`: bloque de texto de detalle del alojamiento.
- `home/ListingCard.tsx`: composicion de miniatura + metadatos.
- `home/ListingGrid.tsx`: grilla de tarjetas de alojamientos.
- `home/ListingSection.tsx`: seccion completa de alojamientos.
- `home/InspirationTab.tsx`: tab individual para inspiracion.
- `home/InspirationTabs.tsx`: contenedor de tabs de inspiracion.
- `home/InspirationLinks.tsx`: links rapidos de inspiracion.
- `home/InspirationSection.tsx`: bloque completo de inspiracion futura.
- `home/FooterLinkGroup.tsx`: grupo de links en footer.
- `home/SiteFooter.tsx`: footer inferior completo.
- `home/BottomNavItem.tsx`: item individual de navegacion inferior con estado activo por ruta.
- `home/BottomNav.tsx`: barra inferior mobile (Explora, Favoritos, Iniciar sesion) que se oculta al bajar y reaparece al subir.

## Tipos

- `types/home.ts`: tipos de datos para categorias, secciones y footer.

## Search results mobile

- `search/MapHero.tsx`: bloque superior con contexto geografico y query activa.
- `search/SearchFilterChip.tsx`: chip individual de filtro.
- `search/SearchFilterRow.tsx`: contenedor horizontal de chips de filtros.
- `search/ResultsSummary.tsx`: resumen de cantidad de resultados.
- `search/StayImage.tsx`: visual principal de resultado con overlays.
- `search/StayMeta.tsx`: bloque textual con detalle del resultado.
- `search/StayCard.tsx`: composicion de imagen y metadatos del resultado.
- `search/ResultSkeletonCard.tsx`: placeholder de card para estado de carga.
- `search/StayResultsList.tsx`: lista de cards y skeletons.
- `search/ResultsPagination.tsx`: controles inferiores de paginacion.

- `types/search.ts`: tipos de filtros, resultados y paginacion.
