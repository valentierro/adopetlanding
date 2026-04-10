# Adopet — Landing Page

Landing de apresentação do app [Adopet](https://github.com/valentierro/adopet), com identidade visual alinhada ao app (teal, sage, Outfit).

**Repositório:** [github.com/valentierro/adopetlanding](https://github.com/valentierro/adopetlanding)

## Desenvolvimento

```bash
pnpm install
pnpm dev
```

Abre em [http://localhost:5173](http://localhost:5173).

## Build

```bash
pnpm build
```

Saída em `dist/`. Pode ser implantada na Vercel, Netlify ou qualquer host estático.

## Deploy na Vercel

1. Conecte este repositório no [Vercel](https://vercel.com).
2. Build command: `pnpm build`
3. Output directory: `dist`
4. Instale as dependências com pnpm (Vercel detecta automaticamente).
5. **Variável de ambiente:** `VITE_API_URL` — URL base da API (ex.: `https://adopet-api-six.vercel.app`), sem barra no final. Se omitida, o código usa esse default. A API precisa permitir CORS para o domínio da landing (`appadopet.com.br` já está na lista em `apps/api` do monorepo Adopet).

### Solicitação de parceria (ONG) na landing

O botão na seção **Parceiros** abre um modal que chama `POST /v1/public/partnership-request` — o mesmo fluxo do app (registro em `PartnershipRequest`, e-mail para `parcerias@appadopet.com.br`, notificação admin).

## Links

- **App na Google Play:** [play.google.com/store/apps/details?id=br.com.adopet.app](https://play.google.com/store/apps/details?id=br.com.adopet.app)
- **App na App Store (iOS):** [apps.apple.com/br/app/adopet-adoção-responsável/id6761636088](https://apps.apple.com/br/app/adopet-adoção-responsável/id6761636088) — fonte única em `src/constants/stores.ts`
- Atualize os links de Política de privacidade e Termos de uso no `src/sections/Footer.tsx` quando tiver as URLs públicas.
