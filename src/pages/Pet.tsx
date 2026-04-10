/**
 * Página pública /pet/:id — usada pelo link de compartilhamento do app.
 * Não depende de API; só exibe CTA para abrir no app ou baixar.
 */
import { IOS_APP_STORE_URL, PLAY_STORE_URL } from '../constants/stores';

function getPetIdFromPath(): string | null {
  const match = window.location.pathname.match(/^\/pet\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

export function PetPage() {
  const petId = getPetIdFromPath();
  const appDeepLink = petId ? `adopet://pet/${petId}` : null;

  return (
    <div className="min-h-screen bg-adopet-background">
      <nav className="bg-adopet-background/95 backdrop-blur-sm border-b border-adopet-header/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center">
          <a
            href="https://appadopet.com.br/"
            className="flex items-center gap-2"
          >
            <img src="/logo.png" alt="Adopet" className="h-10 w-auto" />
          </a>
        </div>
      </nav>

      <main className="max-w-lg mx-auto px-6 py-16 text-center">
        <div className="rounded-2xl bg-white shadow-xl border border-adopet-header/20 p-10">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-adopet-text-primary mb-3">
            Um pet te espera no Adopet
          </h1>
          <p className="text-adopet-text-secondary mb-8">
            Quem compartilhou esse link quer que você veja um anúncio de adoção no app. Abra no Adopet ou baixe grátis.
          </p>

          <div className="flex flex-col gap-4">
            {appDeepLink && (
              <a
                href={appDeepLink}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-adopet-primary text-white font-semibold text-lg shadow-lg hover:bg-adopet-primary-dark transition-colors"
              >
                Abrir no app
              </a>
            )}
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-adopet-orange text-white font-semibold text-lg shadow-lg hover:bg-adopet-orange-light transition-colors"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.627L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.302-8.635-8.634z" />
              </svg>
              Baixar grátis na Google Play
            </a>
            <a
              href={IOS_APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#1a1a1a] text-white font-semibold text-lg shadow-lg hover:bg-black transition-colors"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Baixar grátis na App Store
            </a>
          </div>

          <p className="mt-8 text-sm text-adopet-text-secondary">
            Não tem o app? Escolha a Google Play ou a App Store para instalar.
          </p>
        </div>
      </main>
    </div>
  );
}
