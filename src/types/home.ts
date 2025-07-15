// Type definitions for the Home component and related functionality

import type { Tables } from "../../database.types";

export interface HomeState {
  selectedPlace: Tables<"places"> | null;
}

export interface PlaceSelectionHookResult {
  selectedPlace: Tables<"places"> | null;
  handlePlaceSelect: (place: Tables<"places">) => void;
  handlePlaceDeselect: () => void;
  clearSelection: () => void;
  isPlaceSelected: boolean;
}

export interface HeaderProps {
  className?: string;
}

export interface AddPlaceButtonProps {
  className?: string;
}
