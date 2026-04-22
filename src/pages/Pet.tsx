/**
 * Página pública /pet/:id — preview de deep link do app Adopet.
 *
 * Funcionalidades:
 * - Busca dados do pet em GET /public/pets/:id
 * - Exibe foto, nome, raça, idade, cidade
 * - Auto-redirect: em mobile (iOS/Android), tenta abrir o app em 1,5s
 * - Botões de fallback: abrir no app / baixar na Play/App Store
 * - OG meta tags dinâmicas via document.head (best-effort para crawlers que
 *   executam JS — ex.: Telegram, Twitter Summary Card)
 */
import { useEffect, useState, useRef } from 'react';
import { IOS_APP_STORE_URL, PLAY_STORE_URL } from '../constants/stores';

const API_BASE = 'https://api.adopet.com.br';

type PublicPet = {
  id: string;
  name: string;
  species: string;
  breed: string | null;
  age: number;
  sex: string;
  size: string;
  city: string | null;
  vaccinated: boolean;
  neutered: boolean;
  description: string | null;
  photoUrls: string[];
};

function getPetIdFromPath(): string | null {
  const match = window.location.pathname.match(/^\/pet\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

function isMobile(): boolean {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

function speciesEmoji(species: string): string {
  return species.toUpperCase() === 'CAT' ? '🐱' : '🐶';
}

function ageLabel(age: number): string {
  return age === 1 ? '1 ano' : `${age} anos`;
}

function sexLabel(sex: string): string {
  return sex.toUpperCase() === 'FEMALE' ? 'Fêmea' : 'Macho';
}

function sizeLabel(size: string): string {
  const map: Record<string, string> = {
    small: 'Pequeno',
    medium: 'Médio',
    large: 'Grande',
    xlarge: 'Extra grande',
  };
  return map[size.toLowerCase()] ?? size;
}

/** Injeta/atualiza uma meta tag no <head> */
function setMeta(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function injectOgTags(pet: PublicPet, petId: string) {
  const title = `${pet.name} – adoção no Adopet`;
  const desc = [
    `${speciesEmoji(pet.species)} ${pet.breed ?? (pet.species === 'CAT' ? 'Gato' : 'Cachorro')}`,
    ageLabel(pet.age),
    sexLabel(pet.sex),
    pet.city,
  ]
    .filter(Boolean)
    .join(' · ');

  document.title = title;
  setMeta('og:title', title);
  setMeta('og:description', desc);
  setMeta('og:type', 'website');
  setMeta('og:url', `https://appadopet.com.br/pet/${petId}`);
  setMeta('og:site_name', 'Adopet');
  if (pet.photoUrls.length > 0) {
    setMeta('og:image', pet.photoUrls[0]);
    setMeta('og:image:width', '800');
    setMeta('og:image:height', '800');
  }
}

/* ─── Skeleton ─── */
function PetSkeleton() {
  return (
    <div className="rounded-2xl bg-white shadow-xl border border-adopet-header/20 overflow-hidden animate-pulse">
      <div className="bg-adopet-surface h-64 w-full" />
      <div className="p-8 space-y-4">
        <div className="h-7 bg-adopet-surface rounded-lg w-2/3" />
        <div className="h-4 bg-adopet-surface rounded w-1/2" />
        <div className="h-4 bg-adopet-surface rounded w-1/3" />
        <div className="h-12 bg-adopet-surface rounded-2xl mt-6" />
        <div className="h-12 bg-adopet-surface rounded-2xl" />
      </div>
    </div>
  );
}

/* ─── Erro ─── */
function NotFoundCard({ petId }: { petId: string }) {
  const deepLink = `adopet://pet/${petId}`;
  return (
    <div className="rounded-2xl bg-white shadow-xl border border-adopet-header/20 p-10 text-center">
      <div className="text-5xl mb-4">🐾</div>
      <h1 className="text-2xl font-display font-bold text-adopet-text-primary mb-3">
        Pet não encontrado
      </h1>
      <p className="text-adopet-text-secondary mb-8">
        Este anúncio pode ter sido encerrado ou o pet já foi adotado. Explore outros pets no app!
      </p>
      <div className="flex flex-col gap-4">
        <a
          href={deepLink}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-adopet-primary text-white font-semibold text-lg shadow-lg hover:bg-adopet-primary-dark transition-colors"
        >
          Abrir o Adopet
        </a>
        <StoreButtons />
      </div>
    </div>
  );
}

/* ─── Botões de loja ─── */
function StoreButtons() {
  return (
    <>
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
    </>
  );
}

/* ─── Card com dados do pet ─── */
function PetCard({ pet, deepLink }: { pet: PublicPet; deepLink: string }) {
  const photo = pet.photoUrls[0];
  const [imgError, setImgError] = useState(false);

  return (
    <div className="rounded-2xl bg-white shadow-xl border border-adopet-header/20 overflow-hidden">
      {/* foto */}
      {photo && !imgError ? (
        <div className="relative h-72 overflow-hidden">
          <img
            src={photo}
            alt={`${pet.name} – pet para adoção`}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
          {/* scrim inferior */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          {/* badge espécie */}
          <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-semibold">
            {speciesEmoji(pet.species)} {pet.species === 'CAT' ? 'Gato' : 'Cachorro'}
          </div>
        </div>
      ) : (
        <div className="h-40 bg-adopet-surface flex items-center justify-center">
          <span className="text-6xl">{speciesEmoji(pet.species)}</span>
        </div>
      )}

      <div className="p-6 space-y-4">
        {/* nome */}
        <div>
          <h1 className="text-2xl font-display font-bold text-adopet-text-primary leading-tight">
            {pet.name}
          </h1>
          {pet.breed && (
            <p className="text-adopet-text-secondary text-sm mt-0.5">{pet.breed}</p>
          )}
        </div>

        {/* chips de info */}
        <div className="flex flex-wrap gap-2">
          {[
            ageLabel(pet.age),
            sexLabel(pet.sex),
            sizeLabel(pet.size),
            pet.city,
          ]
            .filter(Boolean)
            .map((chip) => (
              <span
                key={chip}
                className="px-3 py-1 rounded-full bg-adopet-background text-adopet-text-secondary text-xs font-semibold"
              >
                {chip}
              </span>
            ))}
        </div>

        {/* vacina/castrado */}
        <div className="flex gap-3">
          {pet.vaccinated && (
            <span className="text-xs text-adopet-primary font-semibold flex items-center gap-1">
              ✅ Vacinado
            </span>
          )}
          {pet.neutered && (
            <span className="text-xs text-adopet-primary font-semibold flex items-center gap-1">
              ✅ Castrado
            </span>
          )}
        </div>

        {/* descrição */}
        {pet.description && (
          <p className="text-adopet-text-secondary text-sm leading-relaxed line-clamp-3">
            {pet.description}
          </p>
        )}

        {/* CTAs */}
        <div className="flex flex-col gap-3 pt-2">
          <a
            href={deepLink}
            className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-adopet-primary text-white font-semibold text-base shadow-lg hover:bg-adopet-primary-dark transition-colors"
          >
            <span>🐾</span>
            Adotar {pet.name} no app
          </a>
          <StoreButtons />
        </div>

        <p className="text-center text-xs text-adopet-text-secondary pt-1">
          Não tem o app? Baixe grátis na Google Play ou na App Store.
        </p>
      </div>
    </div>
  );
}

/* ─── Componente principal ─── */
export function PetPage() {
  const petId = getPetIdFromPath();
  const deepLink = petId ? `adopet://pet/${petId}` : null;

  const [pet, setPet] = useState<PublicPet | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const redirectedRef = useRef(false);

  // Busca dados do pet
  useEffect(() => {
    if (!petId) {
      setLoading(false);
      setNotFound(true);
      return;
    }
    fetch(`${API_BASE}/public/pets/${petId}`)
      .then((r) => {
        if (!r.ok) throw new Error('not found');
        return r.json() as Promise<PublicPet>;
      })
      .then((data) => {
        setPet(data);
        injectOgTags(data, petId);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [petId]);

  // Auto-redirect para o app em mobile (1,5s após carregar os dados)
  useEffect(() => {
    if (!deepLink || !isMobile() || redirectedRef.current) return;
    if (loading) return;

    redirectedRef.current = true;
    const timer = setTimeout(() => {
      window.location.href = deepLink;
    }, 1500);
    return () => clearTimeout(timer);
  }, [deepLink, loading]);

  return (
    <div className="min-h-screen bg-adopet-background">
      {/* navbar */}
      <nav className="bg-adopet-background/95 backdrop-blur-sm border-b border-adopet-header/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center">
          <a href="https://appadopet.com.br/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Adopet" className="h-10 w-auto" />
          </a>
        </div>
      </nav>

      {/* banner auto-redirect */}
      {isMobile() && !loading && !notFound && (
        <div className="bg-adopet-primary text-white text-center text-sm py-2 px-4">
          Abrindo no app Adopet automaticamente…
        </div>
      )}

      <main className="max-w-lg mx-auto px-6 py-10">
        {loading ? (
          <PetSkeleton />
        ) : notFound || !pet ? (
          <NotFoundCard petId={petId ?? ''} />
        ) : (
          <PetCard pet={pet} deepLink={deepLink!} />
        )}
      </main>
    </div>
  );
}
