// this components renders a list of places

import { usePlaces } from "../hooks/usePlaces";
import type { Tables } from "../../database.types";
import { Link } from "react-router-dom";
// import { PlaceCard } from "./PlaceCard";

export function Places() {
  const places = usePlaces();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Family Friendly Places</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 w-full max-w-6xl">
        {places.map((place: Tables<"places">) => (
          <Link
            key={place.id}
            to={`/places/${place.id}`}
            className="no-underline"
          >
            <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition">
              <h2 className="text-xl font-semibold">{place.name}</h2>
              <p className="text-gray-600">{place.description}</p>
              <p className="text-gray-500 text-sm">
                {place.latitude}, {place.longitude}
              </p>
              <p className="text-gray-500 text-sm">
                Category: {place.category || "Uncategorized"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default Places;
