// Search control component for the map interface
// Provides a styled autocomplete input positioned at the bottom center of the map

import PlaceAutocomplete from "./PlaceAutocomplete";

interface SearchControlProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

export function SearchControl({ onPlaceSelect }: SearchControlProps) {
  return (
    <div className="py-8 flex max-w-full w-screen justify-center">
      <div className="autocomplete-control bg-white p-4 shadow text-base rounded-full w-full max-w-md">
        <PlaceAutocomplete onPlaceSelect={onPlaceSelect} />
      </div>
    </div>
  );
}

export default SearchControl;
