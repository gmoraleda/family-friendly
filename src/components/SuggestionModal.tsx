import type { TablesInsert } from "../../database.types";

interface SuggestionModalProps {
  place: google.maps.places.PlaceResult;
  suggestion: TablesInsert<"suggestions"> | null;
  isLoading?: boolean;
  error?: string | null;
  onCommentChange: (comment: string) => void;
  onSave: () => void;
  onCancel: () => void;
  onClearError?: () => void;
}

export function SuggestionModal({
  place,
  suggestion,
  isLoading = false,
  error = null,
  onCommentChange,
  onSave,
  onCancel,
  onClearError,
}: SuggestionModalProps) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-8">
      <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg">
        <h2 className="text-xl font-semibold mb-4">{place.name}</h2>
        <p className="text-sm text-gray-700 mb-4">
          {place.formatted_address || "No address available."}
        </p>
        <textarea
          name="comment"
          value={suggestion?.comment || ""}
          onChange={(e) => onCommentChange(e.target.value)}
          placeholder="Why should we add this place?"
          className="w-full p-2 border rounded mb-4 min-h-[100px] resize-y"
          disabled={isLoading}
        />

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700 text-sm">{error}</p>
            {onClearError && (
              <button
                type="button"
                onClick={onClearError}
                className="text-red-600 text-xs underline mt-1"
              >
                Dismiss
              </button>
            )}
          </div>
        )}

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onSave}
            disabled={!place || !suggestion?.comment || isLoading}
            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              "Send suggestion"
            )}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition-colors disabled:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuggestionModal;
