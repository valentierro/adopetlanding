import { AdoptionPin, PartnerPin, FloatingPaw, FloatingHeart } from '../components/Decorations';

const audiences = [
  {
    pin: <AdoptionPin size={52} />,
    title: 'Quem quer adotar',
    accent: '#0FBA9E',
    accentBg: 'rgba(15,186,158,0.1)',
    topGrad: 'linear-gradient(90deg,#0FBA9E,#34D4B8)',
    items: [
      'Feed de pets disponíveis para adoção',
      'Perfis completos: fotos, história e temperamento',
      'Mapa para ver animais próximos',
      'Favoritos e conversa direta com o tutor',
      'Parceiros com cupons para o novo amigo',
    ],
  },
  {
    pin: <AdoptionPin size={52} />,
    title: 'Quem quer colocar para adoção',
    accent: '#34D4B8',
    accentBg: 'rgba(52,212,184,0.1)',
    topGrad: 'linear-gradient(90deg,#34D4B8,#0FBA9E)',
    items: [
      'Anúncio simples com fotos e descrição',
      'Controle de adoções e conversas',
      'Visibilidade para seu pet',
      'Conexão com adotantes responsáveis',
    ],
  },
  {
    pin: <PartnerPin size={52} />,
    title: 'Clínicas, lojas e ONGs',
    accent: '#F4732A',
    accentBg: 'rgba(244,115,42,0.1)',
    topGrad: 'linear-gradient(90deg,#F4732A,#F99060)',
    items: [
      'Página de parceiros no app',
      'Cupons de desconto para usuários',
      'Destaque e mais visibilidade',
      'Planos para clínicas e pet shops',
    ],
  },
];

export function ForWho() {
  return (
    <section className="py-20 md:py-28 px-6 relative overflow-hidden" style={{ background: '#04100E' }}>
      <FloatingPaw   x="0%"  y="15%" size={30} opacity={0.04} rotation={20}  color="#0FBA9E" />
      <FloatingPaw   x="97%" y="60%" size={38} opacity={0.04} rotation={-15} color="#34D4B8" />
      <FloatingHeart x="95%" y="20%" size={20} opacity={0.05} rotation={10}  color="#F4732A" />
      <FloatingHeart x="2%"  y="75%" size={24} opacity={0.05} rotation={-20} color="#F4732A" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="h-px mb-20" style={{ background: 'linear-gradient(to right,transparent,rgba(244,115,42,0.25),transparent)' }} />

        <div className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold mb-4"
            style={{ background: 'rgba(244,115,42,0.1)', border: '1px solid rgba(244,115,42,0.2)', color: '#F99060' }}
          >
            Para todo mundo que ama pets
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Um app para <span className="text-grad-orange">todos</span>
          </h2>
          <p className="max-w-xl mx-auto" style={{ color: '#A8C5BF' }}>
            Seja para adotar, para encontrar um lar ou para divulgar seu negócio — o Adopet conecta.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {audiences.map((b) => (
            <div
              key={b.title}
              className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
              style={{ background: '#081A17', border: '1px solid #163530', boxShadow: '0 4px 24px rgba(0,0,0,0.5)' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.boxShadow = '0 16px 48px rgba(0,0,0,0.7)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(0,0,0,0.5)')}
            >
              {/* Gradient top stripe */}
              <div className="h-1" style={{ background: b.topGrad }} />

              <div className="p-7">
                {/* Pin icon + title */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="shrink-0 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300">
                    {b.pin}
                  </div>
                  <h3 className="text-lg font-bold text-white leading-tight">{b.title}</h3>
                </div>

                {/* Items */}
                <ul className="space-y-3 mb-7">
                  {b.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm" style={{ color: '#C4DDD8' }}>
                      <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: b.accent }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <span
                  className="inline-flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all"
                  style={{ color: b.accent }}
                >
                  Saiba mais
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
