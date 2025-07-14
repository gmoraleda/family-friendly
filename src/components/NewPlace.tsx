// This component provides a map-based interface for users to suggest new places
// Users can search for locations and add comments explaining why the place should be added

import { useState } from "react";
import {
  APIProvider,
  ControlPosition,
  Map as GoogleMap,
  MapControl,
  AdvancedMarker as Marker,
  Pin,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";

import SearchControl from "./SearchControl";
import MapHandler from "./MapHandler";
import SuggestionModal from "./SuggestionModal";
import { useSuggestionManager } from "../hooks/useSuggestionManager";
import { MAP_CONFIG, MARKER_CONFIG } from "../config/mapConfig";

export function NewPlace() {
  const [place, setPlace] = useState<google.maps.places.PlaceResult | null>(
    null
  );
  const [markerRef, marker] = useAdvancedMarkerRef();

  const {
    suggestion,
    isLoading,
    error,
    updateComment,
    saveSuggestion,
    clearError,
  } = useSuggestionManager(place);

  const handleCancelSuggestion = () => {
    setPlace(null);
  };

  return (
    <div className="h-full w-full">
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap mapId={import.meta.env.VITE_GOOGLE_MAP_ID} {...MAP_CONFIG}>
          {/* Map marker for selected place */}
          <Marker ref={markerRef} position={null}>
            <Pin {...MARKER_CONFIG} />
          </Marker>

          {/* Search control positioned at bottom center */}
          <MapControl position={ControlPosition.BOTTOM_CENTER}>
            <SearchControl onPlaceSelect={setPlace} />
          </MapControl>

          {/* Handler to update marker position when place changes */}
          <MapHandler place={place} marker={marker} />
        </GoogleMap>
      </APIProvider>

      {/* Show suggestion modal when a place is selected */}
      {place && (
        <SuggestionModal
          place={place}
          suggestion={suggestion}
          isLoading={isLoading}
          error={error}
          onCommentChange={updateComment}
          onSave={saveSuggestion}
          onCancel={handleCancelSuggestion}
          onClearError={clearError}
        />
      )}
    </div>
  );
}

export default NewPlace;
