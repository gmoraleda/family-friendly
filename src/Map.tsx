import { useEffect, useRef, useState } from "react";
import {
  APIProvider,
  ControlPosition,
  Map as GoogleMap,
  MapControl,
  AdvancedMarker as Marker,
  useAdvancedMarkerRef,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import type { Tables } from "../database.types";
import { PlaceDetail } from "./PlaceDetail";
import { Crosshair } from "lucide-react";

function Map({ places }: { places: Tables<"places">[] }) {
  const [selectedPlace, setSelectedPlace] = useState<Tables<"places"> | null>(
    null
  );

  const [selectedAutocompletionPlace, setSelectedAutocompletionPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [markerRef, marker] = useAdvancedMarkerRef();

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
          mapRef.current?.setZoom(12);
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
          defaultZoom={10}
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
          <Marker ref={markerRef} position={null} style={{}} />{" "}
        </GoogleMap>
        <MapControl position={ControlPosition.BOTTOM_CENTER}>
          <div className="py-16 flex w-[32rem] max-w-full">
            <div className="autocomplete-control bg-white p-4 rounded shadow text-base w-full">
              <PlaceAutocomplete
                onPlaceSelect={setSelectedAutocompletionPlace}
              />
            </div>
          </div>
        </MapControl>
        <MapHandler place={selectedAutocompletionPlace} marker={marker} />
      </APIProvider>

      {selectedPlace && (
        <PlaceDetail place={selectedPlace} onClose={handleCloseModal} />
      )}
    </div>
  );
}

interface MapHandlerProps {
  place: google.maps.places.PlaceResult | null;
  marker: google.maps.marker.AdvancedMarkerElement | null;
}

const MapHandler = ({ place, marker }: MapHandlerProps) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !place || !marker) return;

    if (place.geometry?.viewport) {
      map.fitBounds(place.geometry?.viewport);
    }
    marker.position = place.geometry?.location;
  }, [map, place, marker]);

  return null;
};

interface PlaceAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

const PlaceAutocomplete = ({ onPlaceSelect }: PlaceAutocompleteProps) => {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ["geometry", "name", "formatted_address"],
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      const place = placeAutocomplete.getPlace();
      setInputValue(place.name || "");
      onPlaceSelect(place);
    });
  }, [onPlaceSelect, placeAutocomplete]);

  const handleClear = () => {
    setInputValue("");
    onPlaceSelect(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="autocomplete-container relative flex items-center">
      <input
        ref={inputRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search for a place..."
        className="w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors p-2 text-base"
      />
      {inputValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-2 text-gray-400 hover:text-gray-700"
          aria-label="Clear"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Map;
