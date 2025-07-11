import { useEffect, useState } from "react";
import { getPlaces } from "../services/database_service";
import type { Tables } from "../../database.types";

export function usePlaces() {
  const [places, setPlaces] = useState<Tables<"places">[]>([]);

  useEffect(() => {
    async function fetchPlaces() {
      try {
        const data = await getPlaces();
        setPlaces(data);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    }

    fetchPlaces();
  }, []);

  return places;
}
