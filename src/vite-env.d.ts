/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base da API (ex.: https://adopet-api-six.vercel.app) — sem barra final */
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** gtag.js (Google Analytics 4) — carregado em index.html */
interface Window {
  gtag?: (command: string, ...args: unknown[]) => void;
  dataLayer?: unknown[];
}
