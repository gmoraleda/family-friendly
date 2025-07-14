// This function handles the database operations for the places
import { createClient } from "@supabase/supabase-js";
import type { Tables, TablesInsert } from "../../database.types";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export async function addPlace(place: Tables<"places">) {
  const { data, error } = await supabase
    .from("places")
    .insert([place])
    .select();

  if (error) {
    console.error("Error adding place:", error);
    throw error;
  }

  return data;
}
export async function getPlaces() {
  const { data, error } = await supabase.from("places").select();

  if (error) {
    console.error("Error fetching places:", error);
    throw error;
  }

  return data || [];
}
export async function getPlaceById(id: string) {
  const { data, error } = await supabase
    .from("places")
    .select()
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching place by ID:", error);
    throw error;
  }

  return data;
}

export async function createSuggestion(
  suggestion: TablesInsert<"suggestions">
) {
  const { data, error } = await supabase
    .from("suggestions")
    .insert([suggestion]);

  if (error) {
    console.error("Error creating suggestion:", error);
    throw error;
  }

  return data;
}
