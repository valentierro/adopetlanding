import { FloatingPaw, FloatingHeart } from '../components/Decorations';
import { StoreBadges } from '../components/StoreBadges';

export function Hero() {

  return (
    <header
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-20 overflow-hidden"
      style={{ background: '#04100E' }}
    >
      {/* Teal glow top-center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(15,186,158,0.22) 0%, transparent 65%)' }} />
      {/* Orange glow bottom-right */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 100% 100%, rgba(244,115,42,0.12) 0%, transparent 60%)' }} />
      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '64px 64px' }} />

      {/* Floating decorative elements */}
      <FloatingPaw  x="5%"   y="12%"  size={40} opacity={0.06} rotation={-20} color="#0FBA9E" />
      <FloatingPaw  x="88%"  y="8%"   size={28} opacity={0.05} rotation={25}  color="#0FBA9E" />
      <FloatingPaw  x="92%"  y="55%"  size={48} opacity={0.04} rotation={15}  color="#34D4B8" />
      <FloatingPaw  x="2%"   y="65%"  size={32} opacity={0.05} rotation={-35} color="#34D4B8" />
      <FloatingPaw  x="78%"  y="80%"  size={24} opacity={0.04} rotation={10}  color="#0FBA9E" />
      <FloatingHeart x="14%"  y="28%"  size={22} opacity={0.07} rotation={12}  color="#F4732A" />
      <FloatingHeart x="82%"  y="35%"  size={18} opacity={0.06} rotation={-8}  color="#F4732A" />
      <FloatingHeart x="7%"   y="82%"  size={26} opacity={0.05} rotation={20}  color="#F4732A" />
      <FloatingHeart x="95%"  y="75%"  size={16} opacity={0.05} rotation={-15} color="#F99060" />
      {/* heart-paw watermark — large, bottom right */}
      <img
        src="/icons/heart-paw.png"
        alt=""
        aria-hidden
        className="absolute bottom-12 right-0 w-64 md:w-80 pointer-events-none select-none hidden md:block"
        style={{ opacity: 0.055, transform: 'rotate(12deg)' }}
      />
      {/* pin-adocao floating top right */}
      <img
        src="/icons/pin-adocao.png"
        alt=""
        aria-hidden
        className="absolute top-28 right-10 w-16 pointer-events-none select-none animate-float hidden md:block"
        style={{ opacity: 0.12 }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">

        {/* Pill badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-8 animate-fade-in"
          style={{ background: 'rgba(15,186,158,0.1)', border: '1px solid rgba(15,186,158,0.25)', color: '#34D4B8' }}
        >
          <span className="w-2 h-2 rounded-full bg-adopet-primary animate-ping-slow" />
          100% gratuito — cadastro, anúncio e adoção
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-6 animate-fade-in" style={{ animationDelay: '80ms' }}>
          <img src="/logo.png" alt="Adopet" className="h-16 md:h-20 w-auto drop-shadow-lg" />
        </div>

        {/* H1 */}
        <h1
          className="text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight leading-[1.05] mb-6 animate-fade-in"
          style={{ animationDelay: '150ms' }}
        >
          <span className="text-white">Adoção responsável</span>
          <br />
          <span className="text-grad-teal">na palma da mão</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in"
          style={{ animationDelay: '220ms', color: '#C4DDD8' }}
        >
          Conectamos quem quer adotar um pet com tutores e instituições que buscam um lar responsável.
          Feed, mapa, chat e parceiros —{' '}
          <strong className="text-white font-semibold">tudo em um app.</strong>
        </p>

        {/* CTA buttons */}
        <div
          className="flex flex-col items-center gap-4 mb-6 animate-fade-in"
          style={{ animationDelay: '300ms' }}
        >
          <StoreBadges location="hero" size="lg" />

          <a
            href="#parceiros"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-base transition-all hover:scale-[1.02]"
            style={{ border: '1px solid rgba(244,115,42,0.45)', color: '#F4732A' }}
          >
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Sou ONG ou abrigo — solicitar parceria
          </a>
        </div>

        {/* Links row */}
        <div
          className="flex flex-wrap items-center justify-center gap-6 text-sm animate-fade-in"
          style={{ animationDelay: '380ms' }}
        >
          <a href="#como-funciona" className="flex items-center gap-1.5 transition-colors" style={{ color: '#7AA39B' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#0FBA9E')}
            onMouseLeave={e => (e.currentTarget.style.color = '#7AA39B')}
          >
            Ver como funciona
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
          <span style={{ color: '#163530' }}>•</span>
          <span style={{ color: '#7AA39B' }}>Seus dados são tratados conforme a LGPD</span>
        </div>
      </div>

      {/* Stats row */}
      <div
        className="relative z-10 mt-20 w-full max-w-lg mx-auto grid grid-cols-3 gap-4 animate-fade-in"
        style={{ animationDelay: '460ms' }}
      >
        {[
          { value: '100%', label: 'Gratuito' },
          { value: 'iOS & Android', label: 'Disponível' },
          { value: 'LGPD', label: 'Compliant' },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl p-4 text-center"
            style={{ background: '#081A17', border: '1px solid #163530' }}
          >
            <p className="text-base font-bold text-grad-teal">{s.value}</p>
            <p className="text-xs mt-0.5" style={{ color: '#7AA39B' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top,#04100E,transparent)' }} />
    </header>
  );
}
