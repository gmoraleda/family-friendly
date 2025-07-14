// Component for rendering place markers on the map
// Handles the display of all place markers with click interactions

import { AdvancedMarker as Marker } from "@vis.gl/react-google-maps";
import type { PlaceMarkersProps } from "../types/map";

export function PlaceMarkers({ places, onPlaceSelect }: PlaceMarkersProps) {
  return (
    <>
      {places.map((place) => (
        <Marker
          key={place.id}
          position={{
            lat: place.latitude ?? 0,
            lng: place.longitude ?? 0,
          }}
          title={place.name}
          onClick={() => onPlaceSelect(place)}
        />
      ))}
    </>
  );
}

export default PlaceMarkers;
