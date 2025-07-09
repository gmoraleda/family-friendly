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
    <div className="flex flex-col h-screen">
      <Places places={places} />
      <Header />
      <Map />
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
  return <h1 className="text-2xl font-bold">Family Friendly Map</h1>;
}

export default App;
