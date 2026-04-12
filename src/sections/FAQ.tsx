import { useState } from 'react';

const ITEMS = [
  {
    pergunta: 'O Adopet é grátis?',
    resposta: 'Sim. Criar conta, anunciar pets para adoção e usar o app para adotar é 100% gratuito. Não cobramos nada de tutores nem de quem quer adotar.',
  },
  {
    pergunta: 'Preciso pagar para anunciar um pet para adoção?',
    resposta: 'Não. Qualquer pessoa pode publicar anúncios de pets para adoção sem custo. O app é gratuito para quem doa e para quem adota.',
  },
  {
    pergunta: 'Como entro em contato com o tutor ou com o adotante?',
    resposta: 'Dentro do app há um chat. Quando você se interessar por um pet (ou por um adotante), basta iniciar a conversa por lá para combinar a adoção.',
  },
  {
    pergunta: 'Quem pode ser parceiro Adopet?',
    resposta: 'Clínicas veterinárias, pet shops e ONGs. Parceiros têm página no app, podem oferecer cupons e mais visibilidade. Há planos para estabelecimentos comerciais; ONGs e instituições têm condições especiais.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-28 px-6" style={{ background: '#04100E' }}>
      <div className="max-w-2xl mx-auto">
        <div className="h-px mb-20" style={{ background: 'linear-gradient(to right,transparent,rgba(15,186,158,0.25),transparent)' }} />

        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold mb-4"
            style={{ background: 'rgba(15,186,158,0.1)', border: '1px solid rgba(15,186,158,0.2)', color: '#34D4B8' }}
          >
            Perguntas frequentes
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
            Tire suas dúvidas
          </h2>
        </div>

        <ul className="space-y-3">
          {ITEMS.map((item, i) => (
            <li key={item.pergunta}>
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left rounded-xl px-6 py-5 flex items-start justify-between gap-4 group transition-all duration-200"
                style={{
                  background: open === i ? '#0C2220' : '#081A17',
                  border: `1px solid ${open === i ? 'rgba(15,186,158,0.25)' : '#163530'}`,
                }}
              >
                <span className="font-semibold text-white">
                  {item.pergunta}
                </span>
                <svg
                  className="w-5 h-5 shrink-0 mt-0.5 transition-transform duration-200"
                  style={{
                    transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)',
                    color: open === i ? '#0FBA9E' : '#7AA39B',
                  }}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {open === i && (
                <div
                  className="px-6 pb-5 pt-3 rounded-b-xl -mt-1"
                  style={{ background: '#0C2220', border: '1px solid rgba(15,186,158,0.25)', borderTop: 'none' }}
                >
                  <p className="text-sm leading-relaxed" style={{ color: '#C4DDD8' }}>
                    {item.resposta}
                  </p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
