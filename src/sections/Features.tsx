const features = [
  {
    icon: '🐾',
    title: 'Feed de adoção',
    description: 'Cães e gatos de todo o Brasil com fotos, história, temperamento e necessidades.',
  },
  {
    icon: '📍',
    title: 'Mapa',
    description: 'Veja pets próximos a você e encontre o novo amigo ideal na sua região.',
  },
  {
    icon: '❤️',
    title: 'Favoritos e buscas',
    description: 'Salve os que combinam com você e não perca aquele que conquistou seu coração.',
  },
  {
    icon: '💬',
    title: 'Chat direto',
    description: 'Converse com o tutor ou instituição para combinar a adoção com segurança.',
  },
  {
    icon: '✓',
    title: 'Anúncios verificados',
    description: 'Selo de verificação para mais transparência e confiança na adoção.',
  },
  {
    icon: '🏪',
    title: 'Parceiros Adopet',
    description: 'Clínicas, pet shops e ONGs com cupons e informações para você e seu pet.',
  },
];

export function Features() {
  return (
    <section id="como-funciona" className="py-20 md:py-28 px-6 bg-adopet-surface">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-adopet-text-primary mb-4">
            Tudo que você precisa para adotar
          </h2>
          <p className="text-lg text-adopet-text-secondary max-w-2xl mx-auto">
            O Adopet reúne em um só app as ferramentas para uma adoção consciente e segura. Tudo gratuito: cadastro, anúncios e adoção.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="bg-adopet-card rounded-2xl p-6 md:p-8 shadow-sm border border-adopet-header/50 hover:shadow-md hover:border-adopet-primary/20 transition-all duration-300"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-adopet-text-primary mb-2">
                {feature.title}
              </h3>
              <p className="text-adopet-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
