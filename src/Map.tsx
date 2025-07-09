import { useState } from "react";
import {
  APIProvider,
  Map as GoogleMap,
  AdvancedMarker as Marker,
} from "@vis.gl/react-google-maps";
import type { Tables } from "../database.types";
import { PlaceDetail } from "./PlaceDetail";
import mapStyles from "./mapStyles";

function Map({ places }: { places: Tables<"places">[] }) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [selectedPlace, setSelectedPlace] = useState<Tables<"places"> | null>(
    null
  );

  if (!apiKey) {
    console.error("Google Maps API key is not set.");
    return <div>Error: Google Maps API key is missing.</div>;
  }

  function handleMarkerClick(place: Tables<"places">) {
    console.log("Marker clicked:", place);
    setSelectedPlace(place);
  }

  function handleCloseModal() {
    setSelectedPlace(null);
  }

  const defaultCenter = {
    lat: 48.1351,
    lng: 11.582,
  };

  return (
    <>
      <APIProvider apiKey={apiKey}>
        <GoogleMap
          id="MAIN_MAP"
          style={{ width: "100vw", height: "100vh" }}
          defaultCenter={defaultCenter}
          defaultZoom={8}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          styles={mapStyles}
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
        </GoogleMap>
      </APIProvider>

      {selectedPlace && (
        <PlaceDetail place={selectedPlace} onClose={handleCloseModal} />
      )}
    </>
  );
}

export default Map;
