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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{place.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900 transition-colors"
          >
            ✕
          </button>
        </div>
        <p className="text-sm text-gray-700">
          {place.description || "No description available."}
        </p>
        <div className="mt-4">
          {place.category && (
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-4 py-1 rounded-full">
              {place.category}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
