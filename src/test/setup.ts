import "@testing-library/jest-dom";

// Mock environment variables
Object.defineProperty(import.meta, "env", {
  value: {
    VITE_SUPABASE_URL: "https://test-project.supabase.co",
    VITE_SUPABASE_ANON_KEY: "test-anon-key",
  },
  writable: true,
});
