# Landing Page — Adopet

Landing de apresentação do app Adopet, com identidade visual alinhada ao app (teal, sage, Outfit).

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

## Variáveis de ambiente (Vite)

- **`VITE_PUBLIC_API_URL`**: origem da API **sem** path `/v1` (ex.: `https://api.appadopet.com.br`). O código monta as rotas como `{origem}/v1/public/...`. Em produção, o default no código é `https://api.appadopet.com.br`. A API precisa permitir CORS para o domínio da landing (`appadopet.com.br`).

O formulário de **cadastro de ONG/abrigo** chama `POST /v1/public/partnership-request` e, no backend, cria a conta de parceiro (sem aprovação manual); o e-mail de confirmação é exigido para publicar a instituição.

## Links

- **Google Play:** `https://play.google.com/store/apps/details?id=br.com.adopet.app`
- **App Store (iOS):** `https://apps.apple.com/br/app/adopet-adoção-responsável/id6761636088` — também em `src/constants/stores.ts`
- Atualize os links de Política de privacidade e Termos de uso no `Footer.tsx` quando tiver as URLs públicas.
