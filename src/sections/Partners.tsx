import { usePartnershipModal } from '../context/PartnershipModalContext';

export function Partners() {
  const { openPartnershipModal } = usePartnershipModal();

  return (
    <section className="py-20 md:py-28 px-6 bg-adopet-header/60">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-adopet-text-primary mb-4">
          Parceiros Adopet
        </h2>
        <p className="text-lg text-adopet-text-secondary mb-10">
          Clínicas veterinárias, pet shops e ONGs fazem parte do Adopet: aparecem na página de parceiros, oferecem cupons de desconto e dão mais visibilidade aos pets em adoção.
        </p>
        <div className="mb-10">
          <button
            type="button"
            onClick={() => openPartnershipModal('partners_section')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-adopet-primary text-white font-semibold hover:bg-adopet-primary-dark transition-colors shadow-md"
          >
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
            Sou ONG ou abrigo — solicitar parceria
          </button>
          <p className="mt-3 text-sm text-adopet-text-secondary">
            O mesmo fluxo do aplicativo: analisamos e respondemos por e-mail.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-adopet-text-secondary">
          <span className="px-4 py-2 rounded-full bg-adopet-card/80 border border-adopet-primary/20 font-medium">
            Clínicas veterinárias
          </span>
          <span className="px-4 py-2 rounded-full bg-adopet-card/80 border border-adopet-orange/30 font-medium text-adopet-text-primary">
            Pet shops
          </span>
          <span className="px-4 py-2 rounded-full bg-adopet-card/80 border border-adopet-primary/20 font-medium">
            ONGs e abrigos
          </span>
        </div>
      </div>
    </section>
  );
}
