import type { Tables } from "../database.types";

export function PlaceDetail({
  place,
  onClose,
}: {
  place: Tables<"places">;
  onClose: () => void;
}) {
  if (!place) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{place.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>
        <p className="text-sm text-gray-700">Created: {place.created_at}</p>
        <p className="text-sm text-gray-700">
          Location: {place.latitude}, {place.longitude}
        </p>
      </div>
    </div>
  );
}
