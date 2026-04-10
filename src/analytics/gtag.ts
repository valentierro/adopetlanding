/**
 * Eventos GA4 (gtag já está em index.html — G-376BM0RC44).
 * Aparecem em Relatórios → Engajamento → Eventos; parâmetros em Explorar.
 */

export type PlayStoreClickLocation =
  | 'hero'
  | 'header'
  | 'cta_section'
  | 'footer'
  | 'apoie'
  | 'partner_redirect';

export type PartnershipCtaLocation =
  | 'hero'
  | 'header_mobile'
  | 'header_desktop'
  | 'partners_section';

function gtagEvent(name: string, params?: Record<string, string>) {
  if (typeof window === 'undefined') return;
  const g = window.gtag;
  if (typeof g === 'function') {
    g('event', name, params);
  }
}

/** Clique em link para a Google Play (instalação). */
export function trackPlayStoreClick(location: PlayStoreClickLocation): void {
  gtagEvent('play_store_click', { location });
}

/** Clique em link para a App Store (instalação iOS). */
export function trackAppStoreClick(location: PlayStoreClickLocation): void {
  gtagEvent('app_store_click', { location });
}

/** Clique para abrir o modal de solicitação de parceria ONG. */
export function trackPartnershipCtaClick(location: PartnershipCtaLocation | string): void {
  gtagEvent('partnership_cta_click', { location: String(location) });
}
