import { FloatingPaw, FloatingHeart } from '../components/Decorations';

export function Partners() {

  return (
    <section className="py-20 md:py-28 px-6 relative overflow-hidden" style={{ background: '#04100E' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%,rgba(244,115,42,0.07) 0%,transparent 60%)' }} />
      <FloatingPaw   x="3%"  y="10%" size={34} opacity={0.04} rotation={-20} color="#0FBA9E" />
      <FloatingPaw   x="94%" y="70%" size={28} opacity={0.04} rotation={15}  color="#34D4B8" />
      <FloatingHeart x="92%" y="12%" size={22} opacity={0.05} rotation={-8}  color="#F4732A" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="h-px mb-20" style={{ background: 'linear-gradient(to right,transparent,rgba(15,186,158,0.25),transparent)' }} />

        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold mb-4"
            style={{ background: 'rgba(244,115,42,0.1)', border: '1px solid rgba(244,115,42,0.25)', color: '#F99060' }}
          >
            Parceiros Adopet
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-5">
            Faça parte do <span className="text-grad-teal">Adopet</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: '#C4DDD8' }}>
            Clínicas veterinárias, pet shops e ONGs fazem parte do Adopet: aparecem na página de parceiros,
            oferecem cupons de desconto e dão mais visibilidade aos pets em adoção.
          </p>
        </div>

        {/* Visual partner icons row — using real assets */}
        <div className="flex flex-wrap justify-center items-end gap-10 mb-10">
          <div className="flex flex-col items-center gap-2 group">
            <img src="/icons/heart-paw.png" alt="ONGs e abrigos"
              className="w-16 h-16 object-contain transition-transform group-hover:scale-110 duration-300" />
            <span className="text-xs font-semibold" style={{ color: '#0FBA9E' }}>ONGs e abrigos</span>
          </div>
          <div className="flex flex-col items-center gap-2 group">
            <img src="/icons/pin-parceiro.png" alt="Clínicas e pet shops"
              className="w-16 h-16 object-contain transition-transform group-hover:scale-110 duration-300" />
            <span className="text-xs font-semibold" style={{ color: '#F4732A' }}>Clínicas e pet shops</span>
          </div>
          <div className="flex flex-col items-center gap-2 group opacity-75">
            <img src="/icons/pin-adocao.png" alt="Tutores"
              className="w-14 h-14 object-contain transition-transform group-hover:scale-110 duration-300" />
            <span className="text-xs font-semibold" style={{ color: '#34D4B8' }}>Tutores</span>
          </div>
        </div>

        {/* Tag badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[
            { label: '🏥 Clínicas veterinárias', color: '#0FBA9E', bg: 'rgba(15,186,158,0.1)', border: 'rgba(15,186,158,0.2)' },
            { label: '🛒 Pet shops',              color: '#34D4B8', bg: 'rgba(52,212,184,0.1)', border: 'rgba(52,212,184,0.2)' },
            { label: '🐾 ONGs e abrigos',         color: '#F4732A', bg: 'rgba(244,115,42,0.1)', border: 'rgba(244,115,42,0.2)' },
          ].map(({ label, color, bg, border }) => (
            <span
              key={label}
              className="px-5 py-2.5 rounded-full text-sm font-semibold"
              style={{ background: bg, border: `1px solid ${border}`, color }}
            >
              {label}
            </span>
          ))}
        </div>

        {/* CTA card */}
        <div
          className="rounded-2xl p-8 md:p-10 text-center"
          style={{
            background: '#081A17',
            border: '1px solid rgba(244,115,42,0.18)',
            boxShadow: '0 0 60px rgba(244,115,42,0.06), 0 8px 32px rgba(0,0,0,0.5)',
          }}
        >
          <div className="w-px h-8 mx-auto mb-6" style={{ background: 'linear-gradient(to bottom,rgba(244,115,42,0.5),transparent)' }} />
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
            Pronto para aparecer no Adopet?
          </h3>
          <p className="mb-7 max-w-md mx-auto" style={{ color: '#A8C5BF' }}>
            O mesmo fluxo do aplicativo: analisamos e respondemos por e-mail em até 48h.
          </p>
          <a
            href="#parceiros"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg text-white transition-all hover:scale-[1.03] active:scale-[0.98]"
            style={{ background: 'linear-gradient(135deg,#F4732A,#F99060)', boxShadow: '0 0 40px rgba(244,115,42,0.35)' }}
          >
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Sou ONG ou abrigo — solicitar parceria
          </a>
        </div>
      </div>
    </section>
  );
}
