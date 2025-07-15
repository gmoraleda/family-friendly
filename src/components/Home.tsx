// Home page component - main landing page for the family-friendly places app
// Combines map view, header, navigation, and place detail modal

import Map from "./Map";
import { Header } from "./Header";
import AddPlaceButton from "./AddPlaceButton";
import { PlaceDetail } from "./PlaceDetail";
import { usePlaceSelection } from "../hooks/usePlaceSelection";

function Home() {
  const { selectedPlace, handlePlaceSelect, handlePlaceDeselect } =
    usePlaceSelection();

  return (
    <div className="relative h-full w-full">
      {/* Header section with app title and description */}
      <div className="absolute top-0 left-0 right-0 z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <Header />
        </div>
      </div>

      {/* Main map view */}
      <div className="absolute inset-0 z-0">
        <Map onPlaceSelect={handlePlaceSelect} />
      </div>

      {/* Add new place button */}
      <AddPlaceButton />

      {/* Place detail modal - rendered at the top level with highest z-index */}
      {selectedPlace && (
        <PlaceDetail place={selectedPlace} onClose={handlePlaceDeselect} />
      )}
    </div>
  );
}

export default Home;
