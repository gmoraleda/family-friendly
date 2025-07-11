import { useRef, useState } from "react";
import {
  APIProvider,
  ControlPosition,
  Map as GoogleMap,
  MapControl,
  AdvancedMarker as Marker,
  Pin,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import type { Tables } from "../../database.types";
import { PlaceDetail } from "./PlaceDetail";
import { Crosshair } from "lucide-react";
import MapHandler from "./MapHandler";
import PlaceAutocomplete from "./PlaceAutocomplete";
import { usePlaces } from "../hooks/usePlaces";
import { useGeolocation } from "../hooks/useGeolocation";

function Map() {
  const [selectedPlace, setSelectedPlace] = useState<Tables<"places"> | null>(
    null
  );
  const [selectedAutocompletePlace, setSelectedAutocompletePlace] =
    useState<google.maps.places.PlaceResult | null>(null);

  const [markerRef, marker] = useAdvancedMarkerRef();
  const mapRef = useRef<google.maps.Map | null>(null);
  const centerOnUser = useGeolocation(mapRef);
  const places = usePlaces();

  return (
    <div className="h-full w-full">
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
          defaultCenter={{ lat: 48.1351, lng: 11.582 }}
          defaultZoom={10}
          fullscreenControl={false}
          mapTypeControl={false}
          zoomControl
          streetViewControl={false}
          onTilesLoaded={(event) => (mapRef.current = event.map)}
        >
          {places.map((place) => (
            <Marker
              key={place.id}
              position={{
                lat: place.latitude ?? 0,
                lng: place.longitude ?? 0,
              }}
              title={place.name}
              onClick={() => setSelectedPlace(place)}
            />
          ))}

          <button
            className="absolute bottom-4 left-4 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition pointer-events-auto"
            onClick={centerOnUser}
            aria-label="Center map on user location"
          >
            <Crosshair className="w-5 h-5 text-gray-800" />
          </button>

          <Marker ref={markerRef} position={null}>
            <Pin
              background="#0f9d58"
              borderColor="#006425"
              glyphColor="#60d98f"
            />
          </Marker>

          <MapControl position={ControlPosition.BOTTOM_CENTER}>
            <div className="py-16 flex max-w-full w-screen justify-center">
              <div className="autocomplete-control bg-white p-4 shadow text-base rounded-full w-full max-w-md">
                <PlaceAutocomplete
                  onPlaceSelect={setSelectedAutocompletePlace}
                />
              </div>
            </div>
          </MapControl>

          <MapHandler place={selectedAutocompletePlace} marker={marker} />
        </GoogleMap>
      </APIProvider>

      {selectedPlace && (
        <PlaceDetail
          place={selectedPlace}
          onClose={() => setSelectedPlace(null)}
        />
      )}
    </div>
  );
}

export default Map;
