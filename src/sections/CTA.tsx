export function CTA() {
  return (
    <section className="py-20 md:py-28 px-6 bg-adopet-primary">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
          Seu novo melhor amigo pode estar a um toque de distância
        </h2>
        <p className="text-lg text-white/90 mb-10">
          Baixe o Adopet grátis: crie conta, anuncie ou busque pets para adoção sem pagar nada.
        </p>
        <a
          href="https://play.google.com/store/apps/details?id=br.com.adopet.app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-2xl bg-white text-adopet-primary font-semibold text-lg shadow-xl hover:bg-adopet-background transition-colors hover:scale-[1.02] active:scale-[0.98]"
        >
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.627L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.302-8.635-8.634z" />
          </svg>
          Baixar grátis na Google Play
        </a>
      </div>
    </section>
  );
}
