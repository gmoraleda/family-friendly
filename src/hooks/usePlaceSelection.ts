// Custom hook for managing place selection state
// Handles the selected place state and provides methods to select and deselect places

import { useState } from "react";
import type { PlaceSelectionHookResult } from "../types/home";
import type { Tables } from "../../database.types";

export function usePlaceSelection(): PlaceSelectionHookResult {
  const [selectedPlace, setSelectedPlace] = useState<Tables<"places"> | null>(
    null
  );

  const handlePlaceSelect = (place: Tables<"places">) => {
    setSelectedPlace(place);
  };

  const handlePlaceDeselect = () => {
    setSelectedPlace(null);
  };

  const clearSelection = () => {
    setSelectedPlace(null);
  };

  return {
    selectedPlace,
    handlePlaceSelect,
    handlePlaceDeselect,
    clearSelection,
    isPlaceSelected: selectedPlace !== null,
  };
}

export default usePlaceSelection;
