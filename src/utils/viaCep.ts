/** Mesmo fluxo do app (`solicitar-parceria` + ViaCEP). */

export type ViaCepResponse = {
  cep?: string;
  logradouro?: string;
  complemento?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  erro?: boolean;
};

export async function fetchCep(cep: string): Promise<ViaCepResponse | null> {
  const digits = cep.replace(/\D/g, '');
  if (digits.length !== 8) return null;
  try {
    const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
    const data = (await res.json()) as ViaCepResponse;
    return data?.erro ? null : data;
  } catch {
    return null;
  }
}
