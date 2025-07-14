// Location button component for centering the map on user's current location
// Provides a floating action button with location icon

import { Crosshair } from "lucide-react";
import type { LocationButtonProps } from "../types/map";

export function LocationButton({
  onCenterOnUser,
  className = "",
}: LocationButtonProps) {
  return (
    <button
      className={`absolute bottom-18 right-2.5 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition pointer-events-auto cursor-pointer ${className}`}
      onClick={onCenterOnUser}
      aria-label="Center map on user location"
    >
      <Crosshair className="w-6 h-6 text-gray-500" />
    </button>
  );
}

export default LocationButton;
