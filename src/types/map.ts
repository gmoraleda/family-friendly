// Type definitions for map-related components and functionality

import type { Tables } from "../../database.types";

export interface MapPosition {
  lat: number;
  lng: number;
}

export interface MapRef {
  current: google.maps.Map | null;
}

export interface PlaceMarkersProps {
  places: Tables<"places">[];
  onPlaceSelect: (place: Tables<"places">) => void;
}

export interface LocationButtonProps {
  onCenterOnUser: () => void;
  className?: string;
}

export interface MapComponentProps {
  onPlaceSelect?: (place: Tables<"places">) => void;
}

export interface GeolocationHookResult {
  (): void;
}

export interface PlacesHookResult {
  (): Tables<"places">[];
}
