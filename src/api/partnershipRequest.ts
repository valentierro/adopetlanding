/** Contrato alinhado a `POST /v1/public/partnership-request` (app + API). */

export type PartnershipRequestPayload = {
  tipo: 'ong' | 'comercial';
  nome: string;
  email: string;
  instituicao: string;
  telefone: string;
  mensagem?: string;
  cnpj?: string;
  anoFundacao?: string;
  cep?: string;
  endereco?: string;
  personType?: 'PF' | 'CNPJ';
  documentoComercial?: string;
  planoDesejado?: string;
};

function getApiV1Base(): string {
  const raw = import.meta.env.VITE_PUBLIC_API_URL?.trim() || 'https://api.appadopet.com.br';
  const noTrail = raw.replace(/\/$/, '');
  return noTrail.endsWith('/v1') ? noTrail : `${noTrail}/v1`;
}

export async function postPartnershipRequest(payload: PartnershipRequestPayload): Promise<{ ok: true }> {
  const res = await fetch(`${getApiV1Base()}/public/partnership-request`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  let body: unknown;
  try {
    body = text ? JSON.parse(text) : {};
  } catch {
    body = { message: text };
  }
  if (!res.ok) {
    let msg = res.statusText || 'Erro ao enviar';
    if (typeof body === 'object' && body !== null && 'message' in body) {
      const m = (body as { message: unknown }).message;
      msg = Array.isArray(m) ? m.join('. ') : String(m);
    }
    throw new Error(msg);
  }
  return body as { ok: true };
}
