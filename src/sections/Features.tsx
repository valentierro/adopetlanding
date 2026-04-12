const features = [
  {
    color: '#0FBA9E',
    bg: 'rgba(15,186,158,0.12)',
    title: 'Feed de adoção',
    desc: 'Cães e gatos de todo o Brasil com fotos, história, temperamento e necessidades.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h7" />
      </svg>
    ),
  },
  {
    color: '#34D4B8',
    bg: 'rgba(52,212,184,0.12)',
    title: 'Mapa',
    desc: 'Veja pets próximos a você e encontre o novo amigo ideal na sua região.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    color: '#F4732A',
    bg: 'rgba(244,115,42,0.12)',
    title: 'Favoritos e buscas',
    desc: 'Salve os que combinam com você e não perca aquele que conquistou seu coração.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    color: '#F99060',
    bg: 'rgba(249,144,96,0.12)',
    title: 'Chat direto',
    desc: 'Converse com o tutor ou instituição para combinar a adoção com segurança.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    color: '#0FBA9E',
    bg: 'rgba(15,186,158,0.12)',
    title: 'Anúncios verificados',
    desc: 'Selo de verificação para mais transparência e confiança na adoção.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    color: '#F4732A',
    bg: 'rgba(244,115,42,0.12)',
    title: 'Parceiros Adopet',
    desc: 'Clínicas, pet shops e ONGs com cupons e informações para você e seu pet.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    color: '#7C5CBF',
    bg: 'rgba(124,92,191,0.12)',
    title: 'Score de compatibilidade',
    desc: 'O Adopet cruza seu perfil com os dados dos pets e gera um score de compatibilidade — facilitando a escolha do companheiro ideal.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    color: '#34D4B8',
    bg: 'rgba(52,212,184,0.12)',
    title: 'Portal do parceiro',
    desc: 'ONGs e abrigos gerenciam anúncios, fazem cadastros em massa de pets e controlam membros da equipe — tudo em um painel dedicado.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
  },
];

import { FloatingPaw } from '../components/Decorations';

export function Features() {
  return (
    <section id="como-funciona" className="py-20 md:py-28 px-6 relative overflow-hidden" style={{ background: '#04100E' }}>
      {/* Scattered paws background */}
      <FloatingPaw x="1%"  y="10%" size={36} opacity={0.04} rotation={-25} color="#0FBA9E" />
      <FloatingPaw x="96%" y="25%" size={28} opacity={0.04} rotation={20}  color="#34D4B8" />
      <FloatingPaw x="3%"  y="75%" size={44} opacity={0.03} rotation={15}  color="#0FBA9E" />
      <FloatingPaw x="94%" y="80%" size={32} opacity={0.04} rotation={-10} color="#34D4B8" />
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Divider */}
        <div className="h-px mb-20" style={{ background: 'linear-gradient(to right,transparent,rgba(15,186,158,0.25),transparent)' }} />

        <div className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold mb-4"
            style={{ background: 'rgba(15,186,158,0.1)', border: '1px solid rgba(15,186,158,0.2)', color: '#34D4B8' }}
          >
            Funcionalidades
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Tudo que você precisa{' '}
            <span className="text-grad-teal">para adotar</span>
          </h2>
          <p className="max-w-xl mx-auto" style={{ color: '#A8C5BF' }}>
            O Adopet reúne em um só app as ferramentas para uma adoção consciente e segura.
            Cadastro, anúncios e adoção são gratuitos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl p-6 md:p-7 transition-all duration-300 cursor-default"
              style={{ background: '#081A17', border: '1px solid #163530' }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = f.color + '33';
                el.style.boxShadow = `0 0 40px ${f.color}14, 0 8px 32px rgba(0,0,0,0.5)`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = '#163530';
                el.style.boxShadow = '';
              }}
            >
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5"
                style={{ background: f.bg, color: f.color }}
              >
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#A8C5BF' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

