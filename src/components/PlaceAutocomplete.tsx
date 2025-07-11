import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useRef, useState } from "react";

interface PlaceAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

function PlaceAutocomplete({ onPlaceSelect }: PlaceAutocompleteProps) {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const placesLib = useMapsLibrary("places");

  useEffect(() => {
    if (!placesLib || !inputRef.current) return;
    const options = {
      fields: ["geometry", "name", "formatted_address", "place_id"],
    };
    setPlaceAutocomplete(new placesLib.Autocomplete(inputRef.current, options));
  }, [placesLib]);

  useEffect(() => {
    if (!placeAutocomplete) return;
    placeAutocomplete.addListener("place_changed", () => {
      const place = placeAutocomplete.getPlace();
      setInputValue(place.name || "");
      onPlaceSelect(place);
    });
  }, [placeAutocomplete, onPlaceSelect]);

  const handleClear = () => {
    setInputValue("");
    onPlaceSelect(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="autocomplete-container relative flex items-center">
      <input
        ref={inputRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search for a place..."
        className="w-full rounded-full focus:outline-none focus:ring-1 focus:ring-gray-500 transition-colors p-2 text-base"
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
}
export default PlaceAutocomplete;
