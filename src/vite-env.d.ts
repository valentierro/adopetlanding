/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Origem da API (como no app): ex. https://api.appadopet.com.br — o código acrescenta /v1 nas rotas. */
  readonly VITE_PUBLIC_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
