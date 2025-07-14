// Type definitions for the NewPlace component and related functionality

export interface PlaceResult extends google.maps.places.PlaceResult {
  place_id: string;
}

export interface SuggestionState {
  google_place_id: string;
  comment: string;
}

export interface SuggestionManagerResult {
  suggestion: SuggestionState | null;
  isLoading: boolean;
  error: string | null;
  updateComment: (comment: string) => void;
  saveSuggestion: () => Promise<void>;
  clearError: () => void;
}

export interface MapConfig {
  defaultCenter: { lat: number; lng: number };
  defaultZoom: number;
  fullscreenControl: boolean;
  mapTypeControl: boolean;
  zoomControl: boolean;
  rotateControl: boolean;
  scaleControl: boolean;
  streetViewControl: boolean;
}

export interface MarkerConfig {
  background: string;
  borderColor: string;
  glyphColor: string;
}
