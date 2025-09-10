/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_PROJECT_ID: string;
  readonly VITE_SUPABASE_PUBLISHABLE_KEY: string;
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_REACT_APP_ADD_URL: string;
  readonly VITE_REACT_APP_SUBTRACT_URL: string;
  readonly VITE_REACT_APP_GET_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
