const CONTATO_EMAIL = 'contato@appadopet.com.br';

export function Contato() {
  return (
    <section className="py-12 md:py-16 px-6" style={{ background: '#04100E' }}>
      <div className="max-w-2xl mx-auto text-center">
        <div className="h-px mb-16" style={{ background: 'linear-gradient(to right,transparent,rgba(15,186,158,0.2),transparent)' }} />
        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
          Fale conosco
        </h2>
        <p className="mb-6" style={{ color: '#A8C5BF' }}>
          Dúvidas, sugestões ou exercício de direitos (LGPD)?
        </p>
        <a
          href={`mailto:${CONTATO_EMAIL}`}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-[1.02]"
          style={{ background: 'rgba(15,186,158,0.1)', border: '1px solid rgba(15,186,158,0.25)', color: '#34D4B8' }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          {CONTATO_EMAIL}
        </a>
      </div>
    </section>
  );
}
