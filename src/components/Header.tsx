import { StoreBadges } from './StoreBadges';

export function Header() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(4,16,14,0.88)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(15,186,158,0.12)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <img src="/logo.png" alt="Adopet" className="h-9 w-auto" />
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* ONG button — mobile */}
          <a
            href="#parceiros"
            className="sm:hidden p-2 rounded-xl transition-colors"
            style={{ border: '1px solid rgba(244,115,42,0.35)', color: '#F4732A' }}
            aria-label="Parceria ONG/Abrigo"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </a>

          {/* ONG button — desktop */}
          <a
            href="#parceiros"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-colors"
            style={{ border: '1px solid rgba(244,115,42,0.35)', color: '#F4732A' }}
          >
            Parceria ONG/Abrigo
          </a>

          <a
            href="#como-funciona"
            className="hidden sm:inline text-sm font-medium transition-colors"
            style={{ color: '#A8C5BF' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#0FBA9E')}
            onMouseLeave={e => (e.currentTarget.style.color = '#A8C5BF')}
          >
            Como funciona
          </a>

          <div className="hidden sm:flex items-center gap-2">
            <StoreBadges location="header" size="sm" className="!flex-row !gap-2" />
          </div>
        </div>
      </div>
    </nav>
  );
}
