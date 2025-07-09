import Map from "./Map";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import type { Database, Tables } from "../database.types";

const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function App() {
  const [places, setPlaces] = useState<Tables<"places">[]>([]);
  useEffect(() => {
    getPlaces();
  }, []);

  async function getPlaces() {
    const { data, error } = await supabase.from("places").select();
    if (error) {
      console.error("Error fetching places:", error);
    } else {
      setPlaces(data || []);
    }
  }

  return (
    <div className="relative min-h-screen">
      {/* Map in the background */}
      <div className="absolute inset-0 z-0">
        <Map />
      </div>

      {/* Content over the map */}
      <div className="relative z-10 flex flex-col min-h-screen pointer-events-none">
        <Header />
        <div className="flex-1">{/* Optional content here */}</div>
        <footer className="bg-gray-800 text-white text-center py-4">
          <p className="text-sm">
            {new Date().getFullYear()} Family Friendly. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}

function Places({ places }: { places: Tables<"places">[] }) {
  return (
    <ul>
      {places.map((place) => (
        <li key={place.name}>{place.name}</li>
      ))}
    </ul>
  );
}

function Header() {
  return (
    <div className="bg-gray-900 text-left p-8 md:p-16 lg:p-16 opacity-80">
      <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl leading-tight text-white font-bold tracking-tight">
        Discover Family-Friendly Places Near You
      </h1>
      <p className="mb-8 text-lg md:text-xl text-gray-400 font-medium">
        Browse and filter thousands of verified family-friendly locations. From
        parks to restaurants, find the perfect spots for your family adventures.
      </p>
    </div>
  );
}

export default App;
