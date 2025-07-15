// Add new place floating action button
// Provides a prominent button for users to navigate to the new place creation page

import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { AddPlaceButtonProps } from "../types/home";

export function AddPlaceButton({ className = "" }: AddPlaceButtonProps) {
  const navigate = useNavigate();

  const handleAddPlace = () => {
    navigate("/places/new");
  };

  return (
    <div className={`absolute bottom-0 left-0 p-4 ${className}`}>
      <Plus
        className="w-12 h-12 rounded-full bg-red-500 text-white p-2 shadow-lg hover:bg-red-400 transition cursor-pointer"
        onClick={handleAddPlace}
        aria-label="Add new place"
      />
    </div>
  );
}

export default AddPlaceButton;
