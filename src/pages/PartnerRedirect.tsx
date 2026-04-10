import { useEffect, useRef } from 'react';

import { ANDROID_PACKAGE, IOS_APP_STORE_URL, PLAY_STORE_URL } from '../constants/stores';

const SCHEME = 'adopet';

type PartnerRedirectProps = {
  path: 'partner-success' | 'partner-cancel';
};

function getOpenAppUrl(path: string): string {
  const deepLink = `${SCHEME}://${path}`;
  const isAndroid = /Android/i.test(navigator.userAgent);
  if (isAndroid) {
    return `intent://${path}#Intent;scheme=${SCHEME};package=${ANDROID_PACKAGE};end`;
  }
  return deepLink;
}

/**
 * Página usada como success_url/cancel_url do Stripe Checkout.
 * Redireciona para o app (adopet:// ou intent no Android).
 */
export function PartnerRedirectPage({ path }: PartnerRedirectProps) {
  const didRedirect = useRef(false);
  const openAppUrl = getOpenAppUrl(path);

  useEffect(() => {
    if (didRedirect.current) return;
    didRedirect.current = true;
    window.location.href = openAppUrl;
  }, [openAppUrl]);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        fontFamily: 'Outfit, sans-serif',
        backgroundColor: '#f8fafc',
        color: '#334155',
        maxWidth: 360,
        margin: '0 auto',
      }}
    >
      <p style={{ marginBottom: 12, textAlign: 'center' }}>
        Redirecionando para o app Adopet…
      </p>
      <a
        href={openAppUrl}
        style={{
          display: 'inline-block',
          color: '#0d9488',
          fontWeight: 600,
          textDecoration: 'none',
          marginBottom: 24,
        }}
      >
        Toque aqui para abrir o app
      </a>
      <p style={{ fontSize: 14, color: '#64748b', textAlign: 'center', marginBottom: 16 }}>
        Se aparecer &quot;endereço inválido&quot;, use o app instalado da loja (não use Expo Go para testar).
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <a
          href={PLAY_STORE_URL}
          style={{
            fontSize: 14,
            color: '#64748b',
            textDecoration: 'underline',
          }}
        >
          Abrir na Google Play
        </a>
        <a
          href={IOS_APP_STORE_URL}
          style={{
            fontSize: 14,
            color: '#64748b',
            textDecoration: 'underline',
          }}
        >
          Abrir na App Store
        </a>
      </div>
    </div>
  );
}
