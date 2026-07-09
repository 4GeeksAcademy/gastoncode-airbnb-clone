export type SearchState = {
  destination: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
};

export const SEARCH_STATE_STORAGE_KEY = "airbnb-clone-search-state";
const SEARCH_STATE_CHANGE_EVENT = "airbnb-clone-search-state-change";

export const defaultSearchState: SearchState = {
  destination: "Cerca de Buenos Aires",
  checkIn: "2026-11-17",
  checkOut: "2026-11-22",
  adults: 2,
  children: 0,
};

const MONTH_LABELS_SHORT = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
let cachedSearchStateRaw: string | null | undefined;
let cachedSearchStateSnapshot: SearchState = defaultSearchState;

function parseIsoDateParts(value: string): { year: number; month: number; day: number } | null {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
    return null;
  }

  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return null;
  }

  return { year, month, day };
}

export function formatCompactSearchDate(dateValue: string): string {
  const parts = parseIsoDateParts(dateValue);

  if (!parts) {
    return "--";
  }

  return `${parts.day} ${MONTH_LABELS_SHORT[parts.month - 1]}`;
}

export function sanitizeSearchState(partial: Partial<SearchState>): SearchState {
  const adultsValue = Number(partial.adults);
  const childrenValue = Number(partial.children);

  return {
    destination: partial.destination?.trim() || defaultSearchState.destination,
    checkIn: partial.checkIn || defaultSearchState.checkIn,
    checkOut: partial.checkOut || defaultSearchState.checkOut,
    adults: Number.isFinite(adultsValue) ? Math.max(1, adultsValue) : defaultSearchState.adults,
    children: Number.isFinite(childrenValue) ? Math.max(0, childrenValue) : defaultSearchState.children,
  };
}

export function parseSearchStateFromQuery(searchParams: URLSearchParams): SearchState {
  return sanitizeSearchState({
    destination: searchParams.get("destination") || undefined,
    checkIn: searchParams.get("checkIn") || undefined,
    checkOut: searchParams.get("checkOut") || undefined,
    adults: searchParams.get("adults") ? Number(searchParams.get("adults")) : undefined,
    children: searchParams.get("children") ? Number(searchParams.get("children")) : undefined,
  });
}

export function createSearchQuery(searchState: SearchState): string {
  const params = new URLSearchParams();
  params.set("destination", searchState.destination);
  params.set("checkIn", searchState.checkIn);
  params.set("checkOut", searchState.checkOut);
  params.set("adults", String(searchState.adults));
  params.set("children", String(searchState.children));
  return params.toString();
}

export function formatSearchDates(checkIn: string, checkOut: string): string {
  const inParts = parseIsoDateParts(checkIn);
  const outParts = parseIsoDateParts(checkOut);

  if (!inParts || !outParts) {
    return "Sin fechas";
  }

  const monthLabel = MONTH_LABELS_SHORT[inParts.month - 1];
  return `${inParts.day}-${outParts.day} de ${monthLabel}`;
}

export function formatGuestSummary(adults: number, children: number): string {
  return `${adults} adultos · ${children} ninos`;
}

export function readSearchStateFromStorage(): SearchState | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawState = window.localStorage.getItem(SEARCH_STATE_STORAGE_KEY);

  if (!rawState) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawState) as Partial<SearchState>;
    return sanitizeSearchState(parsed);
  } catch {
    return null;
  }
}

export function subscribeToSearchState(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleStorageChange = (event: StorageEvent) => {
    if (event.key && event.key !== SEARCH_STATE_STORAGE_KEY) {
      return;
    }

    cachedSearchStateRaw = undefined;
    onStoreChange();
  };

  const handleCustomChange = () => {
    cachedSearchStateRaw = undefined;
    onStoreChange();
  };

  window.addEventListener("storage", handleStorageChange);
  window.addEventListener(SEARCH_STATE_CHANGE_EVENT, handleCustomChange);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
    window.removeEventListener(SEARCH_STATE_CHANGE_EVENT, handleCustomChange);
  };
}

export function getSearchStateSnapshot(): SearchState {
  if (typeof window === "undefined") {
    return defaultSearchState;
  }

  const rawState = window.localStorage.getItem(SEARCH_STATE_STORAGE_KEY);

  if (rawState === cachedSearchStateRaw) {
    return cachedSearchStateSnapshot;
  }

  cachedSearchStateRaw = rawState;

  if (!rawState) {
    cachedSearchStateSnapshot = defaultSearchState;
    return cachedSearchStateSnapshot;
  }

  try {
    cachedSearchStateSnapshot = sanitizeSearchState(JSON.parse(rawState) as Partial<SearchState>);
  } catch {
    cachedSearchStateSnapshot = defaultSearchState;
  }

  return cachedSearchStateSnapshot;
}

export function saveSearchStateToStorage(searchState: SearchState): void {
  if (typeof window === "undefined") {
    return;
  }

  const nextRawState = JSON.stringify(searchState);

  window.localStorage.setItem(SEARCH_STATE_STORAGE_KEY, nextRawState);
  cachedSearchStateRaw = nextRawState;
  cachedSearchStateSnapshot = searchState;
  window.dispatchEvent(new Event(SEARCH_STATE_CHANGE_EVENT));
}
