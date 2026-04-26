import { PartnerOngSignup } from './PartnerOngSignup';

export function Partners() {
  return (
    <section id="parceiros" className="py-20 md:py-28 px-6 bg-adopet-header/60 scroll-mt-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-adopet-text-primary mb-4">
          Parceiros Adopet
        </h2>
        <p className="text-lg text-adopet-text-secondary mb-4 max-w-2xl mx-auto">
          Clínicas veterinárias, pet shops e ONGs fazem parte do Adopet: aparecem na página de parceiros, oferecem
          cupons de desconto e dão mais visibilidade aos pets em adoção.
        </p>
        <p className="text-sm text-adopet-text-secondary/90 max-w-2xl mx-auto mb-10">
          <strong className="text-adopet-text-primary">ONGs e abrigos</strong> podem se cadastrar abaixo: a conta é
          criada na hora (sem aprovação do admin). Depois, confirme o e-mail para a instituição aparecer publicamente no
          app.
        </p>
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

        <PartnerOngSignup />
      </div>
    </section>
  );
}
