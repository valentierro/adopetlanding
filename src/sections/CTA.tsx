import { StoreBadges } from '../components/StoreBadges';

export function CTA() {
  return (
    <section className="py-20 md:py-28 px-6 relative overflow-hidden" style={{ background: '#04100E' }}>
      {/* Teal glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%,rgba(15,186,158,0.13) 0%,transparent 60%)' }} />

      <div className="max-w-3xl mx-auto relative z-10">
        <div
          className="rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
          style={{
            background: '#081A17',
            border: '1px solid rgba(15,186,158,0.18)',
            boxShadow: '0 0 80px rgba(15,186,158,0.08), 0 32px 64px rgba(0,0,0,0.6)',
          }}
        >
          {/* Top glow line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px"
            style={{ background: 'linear-gradient(to right,transparent,rgba(15,186,158,0.6),transparent)' }} />

          {/* Decorative watermarks */}
          <img src="/icons/pin-adocao.png" alt="" aria-hidden
            className="absolute -bottom-6 -right-6 w-36 pointer-events-none select-none"
            style={{ opacity: 0.07, transform: 'rotate(-15deg)' }} />
          <img src="/icons/heart-paw.png" alt="" aria-hidden
            className="absolute -top-4 -left-4 w-28 pointer-events-none select-none"
            style={{ opacity: 0.06, transform: 'rotate(20deg)' }} />

          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold mb-6"
            style={{ background: 'rgba(15,186,158,0.1)', border: '1px solid rgba(15,186,158,0.2)', color: '#34D4B8' }}
          >
            <span className="w-2 h-2 rounded-full bg-adopet-primary animate-ping-slow" />
            Disponível no iOS e Android
          </div>

          <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-5">
            <span className="text-white">Seu novo melhor amigo</span>
            <br />
            <span className="text-grad-teal">pode estar a um toque</span>
            <br />
            <span className="text-white">de distância</span>
          </h2>

          <p className="text-lg mb-10 max-w-md mx-auto" style={{ color: '#C4DDD8' }}>
            Baixe o Adopet grátis: crie conta, anuncie ou busque pets para adoção sem pagar nada.
          </p>

          <StoreBadges location="cta_section" size="lg" className="mb-6" />

          <a
            href="#apoie"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all"
            style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#7AA39B' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#F4732A'; e.currentTarget.style.borderColor = 'rgba(244,115,42,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#7AA39B'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Apoie a Adopet
          </a>

          <p className="mt-5 text-xs" style={{ color: '#7AA39B' }}>
            Seus dados são tratados conforme a LGPD.
          </p>
        </div>
      </div>
    </section>
  );
}
