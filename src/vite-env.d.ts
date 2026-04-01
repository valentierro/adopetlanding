/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base da API (ex.: https://adopet-api-six.vercel.app) — sem barra final */
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
