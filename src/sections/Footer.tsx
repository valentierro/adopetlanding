import { StoreBadges } from '../components/StoreBadges';

export function Footer() {
  return (
    <footer className="px-6 pb-8" style={{ background: '#04100E' }}>
      <div className="max-w-6xl mx-auto">
        <div className="h-px mb-10" style={{ background: 'linear-gradient(to right,transparent,#163530,transparent)' }} />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
          <a href="#" className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
            <img src="/logo.png" alt="Adopet" className="h-9 w-auto" />
            <span className="font-bold" style={{ color: '#A8C5BF' }}>Adopet</span>
          </a>

          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
            {[
              { href: '#apoie', label: 'Apoie a Adopet' },
              { href: '#privacidade', label: 'Privacidade' },
              { href: '#termos', label: 'Termos' },
            ].map(({ href, label }) => (
              <a
                key={label}
                href={href}
                className="transition-colors"
                style={{ color: '#7AA39B' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#0FBA9E')}
                onMouseLeave={e => (e.currentTarget.style.color = '#7AA39B')}
              >
                {label}
              </a>
            ))}
          </nav>

          <StoreBadges location="footer" size="sm" />
        </div>

        <div className="text-center text-xs space-y-1" style={{ color: '#4B6E68' }}>
          <p>© {new Date().getFullYear()} Adopet. Adoção responsável na palma da mão.</p>
          <p>VALENTIN DOS SANTOS LTDA (VSQuality) — CNPJ 38.225.533/0001-44</p>
        </div>
      </div>
    </footer>
  );
}
