const SCREENS = [
  { src: '/screens/home.png', label: 'Início' },
  { src: '/screens/feed.png', label: 'Feed' },
  { src: '/screens/mapa.jpeg', label: 'Mapa' },
  { src: '/screens/favoritos.png', label: 'Favoritos' },
  { src: '/screens/chat.jpeg', label: 'Chat' },
  { src: '/screens/meus_anuncios.png', label: 'Meus anúncios' },
  { src: '/screens/minhas_adocoes.jpeg', label: 'Minhas adoções' },
  { src: '/screens/perfil.jpeg', label: 'Perfil' },
];

const CARD_W = 160;
const GAP    = 60;
const OFFSET = SCREENS.length * CARD_W + (SCREENS.length - 1) * GAP;

export function AppScreens() {
  const items = [...SCREENS, ...SCREENS];

  return (
    <section className="py-20 md:py-28 overflow-hidden" style={{ background: '#04100E' }}>
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 mb-12 text-center">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold mb-4"
          style={{ background: 'rgba(15,186,158,0.1)', border: '1px solid rgba(15,186,158,0.2)', color: '#34D4B8' }}
        >
          O app na prática
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
          Feed, mapa, favoritos, chat
        </h2>
        <p className="text-lg" style={{ color: '#A8C5BF' }}>e mais — tudo em um lugar</p>
      </div>

      {/* Carousel */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right,#04100E,transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left,#04100E,transparent)' }} />

        <div
          className="flex items-end justify-start w-max carousel-track"
          style={{ gap: `${GAP}px`, animation: 'carousel-scroll 50s linear infinite' }}
        >
          {items.map(({ src, label }, i) => (
            <div
              key={`${label}-${i}`}
              className="flex-shrink-0 flex flex-col items-center group"
              style={{ width: CARD_W }}
            >
              <div
                className="rounded-2xl overflow-hidden w-full"
                style={{
                  aspectRatio: '9/19',
                  maxHeight: 320,
                  background: '#081A17',
                  border: '1px solid #163530',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
                  transition: 'border-color 0.3s',
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(15,186,158,0.4)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = '#163530')}
              >
                <img
                  src={src}
                  alt={`Tela do app: ${label}`}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              <p
                className="mt-3 text-xs font-medium text-center w-full transition-colors"
                style={{ color: '#7AA39B' }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .carousel-track:hover { animation-play-state: paused; }
        @keyframes carousel-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-${OFFSET}px); }
        }
      `}</style>
    </section>
  );
}
