import { useRef, useState } from "react";
import {
  APIProvider,
  Map as GoogleMap,
  AdvancedMarker as Marker,
} from "@vis.gl/react-google-maps";
import type { Tables } from "../database.types";
import { PlaceDetail } from "./PlaceDetail";
import { Crosshair } from "lucide-react";

function Map({ places }: { places: Tables<"places">[] }) {
  const [selectedPlace, setSelectedPlace] = useState<Tables<"places"> | null>(
    null
  );

  const mapRef = useRef<google.maps.Map | null>(null);

  function handleMarkerClick(place: Tables<"places">) {
    setSelectedPlace(place);
  }

  function handleCloseModal() {
    setSelectedPlace(null);
  }

  function centerOnUser() {
    console.log("Centering map on user location");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          mapRef.current?.setCenter(pos);
        },
        () => {
          console.error("Error getting user location");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  return (
    <div className="h-full w-full">
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
          defaultCenter={{ lat: 48.1351, lng: 11.582 }}
          defaultZoom={8}
          fullscreenControl={false}
          mapTypeControl={false}
          zoomControl={true}
          streetViewControl={false}
          onTilesLoaded={(event) => {
            mapRef.current = event.map;
          }}
        >
          {places.map((place) => (
            <Marker
              key={place.id}
              position={{
                lat: place.latitude ?? 0,
                lng: place.longitude ?? 0,
              }}
              title={place.name}
              onClick={() => handleMarkerClick(place)}
            />
          ))}

          <button
            className="absolute bottom-4 left-4 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition pointer-events-auto"
            onClick={centerOnUser}
            aria-label="Center map on user location"
          >
            <Crosshair className="w-5 h-5 text-gray-800" />
          </button>
        </GoogleMap>
      </APIProvider>

      {selectedPlace && (
        <PlaceDetail place={selectedPlace} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default Map;
