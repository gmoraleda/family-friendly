import { Plus } from "lucide-react";
import { useState } from "react";
import Map from "./Map";
import { PlaceDetail } from "./PlaceDetail";
import { useNavigate } from "react-router-dom";
import type { Tables } from "../../database.types";
function Home() {
  const navigate = useNavigate();
  const [selectedPlace, setSelectedPlace] = useState<Tables<"places"> | null>(null);

  const handlePlaceSelect = (place: Tables<"places">) => {
    setSelectedPlace(place);
  };

  const handleCloseDetail = () => {
    setSelectedPlace(null);
  };

  return (
    <div className="relative h-full w-full">
      <div className="absolute top-0 left-0 right-0 z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <Header />
        </div>
      </div>

      <div className="absolute inset-0 z-0">
        <Map onPlaceSelect={handlePlaceSelect} />
      </div>

      {/* button to add a new place */}
      <div className="absolute bottom-0 left-0 p-4">
        <Plus
          className="w-12 h-12 rounded-full bg-red-500 text-white p-2 shadow-lg hover:bg-red-400 transition cursor-pointer"
          onClick={() => {
            // navigate to the new place page
            navigate("/places/new");
          }}
        />
      </div>

      {/* Place detail modal - rendered at the top level with highest z-index */}
      {selectedPlace && (
        <PlaceDetail place={selectedPlace} onClose={handleCloseDetail} />
      )}
    </div>
  );
}

function Header() {
  return (
    <div className="bg-gray-900/85 text-left p-8 md:p-16 lg:p-8">
      <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl leading-tight text-white font-bold tracking-tight">
        Discover Family-Friendly Places Near You
      </h1>
      <p className="mb-8 text-lg md:text-xl text-gray-400 font-medium hidden sm:block">
        Browse and filter thousands of verified family-friendly locations. From
        parks to restaurants, find the perfect spots for your family adventures.
      </p>
    </div>
  );
}
export default Home;
