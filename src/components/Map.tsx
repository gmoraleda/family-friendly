import { useRef } from "react";
import { APIProvider, Map as GoogleMap } from "@vis.gl/react-google-maps";
import type { Tables } from "../../database.types";
import type { MapComponentProps } from "../types/map";
import PlaceMarkers from "./PlaceMarkers";
import LocationButton from "./LocationButton";
import { usePlaces } from "../hooks/usePlaces";
import { useGeolocation } from "../hooks/useGeolocation";
import { MAP_CONFIG } from "../config/mapConfig";

function Map({ onPlaceSelect }: MapComponentProps) {
  const mapRef = useRef<google.maps.Map | null>(null);
  const centerOnUser = useGeolocation(mapRef);
  const places = usePlaces();

  const handlePlaceSelect = (place: Tables<"places">) => {
    onPlaceSelect?.(place); // Notify parent component
  };

  return (
    <div className="h-full w-full">
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
          {...MAP_CONFIG}
          onTilesLoaded={(event) => (mapRef.current = event.map)}
        >
          {/* Render all place markers */}
          <PlaceMarkers places={places} onPlaceSelect={handlePlaceSelect} />

          {/* Location button for centering on user */}
          <LocationButton onCenterOnUser={centerOnUser} />
        </GoogleMap>
      </APIProvider>
    </div>
  );
}

export default Map;
