import {
  APIProvider,
  Map as GoogleMap,
  Marker,
} from "@vis.gl/react-google-maps";
import type { Tables } from "../database.types";

function Map({ places }: { places: Tables<"places">[] }) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    console.error("Google Maps API key is not set.");
    return <div>Error: Google Maps API key is missing.</div>;
  }

  return (
    <APIProvider apiKey={apiKey}>
      <GoogleMap
        style={{ width: "100vw", height: "100vh" }}
        defaultCenter={{ lat: 22.54992, lng: 0 }}
        defaultZoom={3}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      >
        {places.map((place) => (
          <Marker
            key={place.name}
            position={{
              lat: place.latitude ?? 0,
              lng: place.longitude ?? 0,
            }}
            title={place.name}
          />
        ))}
      </GoogleMap>
    </APIProvider>
  );
}

export default Map;
