import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createSuggestion } from "../services/database_service";
import type { TablesInsert } from "../../database.types";

export function useSuggestionManager(
  place: google.maps.places.PlaceResult | null
) {
  const [suggestion, setSuggestion] =
    useState<TablesInsert<"suggestions"> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Update suggestion whenever place changes
  useEffect(() => {
    if (place && place.place_id) {
      setSuggestion((prevSuggestion) => ({
        google_place_id: place.place_id!,
        comment: prevSuggestion?.comment || "", // Keep existing comment if any
      }));
    } else {
      setSuggestion(null);
    }
  }, [place]);

  const updateComment = (comment: string) => {
    if (suggestion) {
      setSuggestion({
        ...suggestion,
        comment,
      });
    }
  };

  const saveSuggestion = async () => {
    if (suggestion) {
      setIsLoading(true);
      setError(null);
      try {
        await createSuggestion(suggestion);
        navigate("/");
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to save suggestion";
        setError(errorMessage);
        console.error("Error saving suggestion:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    }
  };

  return {
    suggestion,
    isLoading,
    error,
    updateComment,
    saveSuggestion,
    clearError: () => setError(null),
  };
}
