import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { postPartnershipRequest } from '../api/partnershipRequest';
import { formatPhoneInput, getPhoneDigits } from '../utils/phoneMask';
import { fetchCep } from '../utils/viaCep';

type Props = {
  open: boolean;
  onClose: () => void;
};

function formatCnpjInput(raw: string): string {
  const d = raw.replace(/\D/g, '').slice(0, 14);
  if (d.length <= 2) return d;
  if (d.length <= 5) return `${d.slice(0, 2)}.${d.slice(2)}`;
  if (d.length <= 8) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`;
  if (d.length <= 12) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`;
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`;
}

function formatCepInput(raw: string): string {
  return raw.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2').slice(0, 9);
}

const inputClass =
  'w-full rounded-xl border border-adopet-surface bg-white px-3 py-2.5 text-adopet-text-primary focus:outline-none focus:ring-2 focus:ring-adopet-primary/40';

export function PartnershipRequestModal({ open, onClose }: Props) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [instituicao, setInstituicao] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [anoFundacao, setAnoFundacao] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [loadingCep, setLoadingCep] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const reset = useCallback(() => {
    setNome('');
    setEmail('');
    setInstituicao('');
    setCnpj('');
    setTelefone('');
    setAnoFundacao('');
    setCep('');
    setRua('');
    setNumero('');
    setComplemento('');
    setBairro('');
    setCidade('');
    setUf('');
    setMensagem('');
    setError(null);
    setSuccess(false);
    setLoadingCep(false);
  }, []);

  useEffect(() => {
    if (!open) {
      reset();
      return;
    }
    const t = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLInputElement>('input[id="lp-pr-nome"]')?.focus();
    }, 100);
    return () => window.clearTimeout(t);
  }, [open, reset]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const buscarCep = useCallback(async () => {
    const digits = cep.replace(/\D/g, '');
    if (digits.length !== 8) return;
    setLoadingCep(true);
    const data = await fetchCep(cep);
    setLoadingCep(false);
    if (data) {
      setError(null);
      setRua(data.logradouro ?? '');
      setBairro(data.bairro ?? '');
      setCidade(data.localidade ?? '');
      setUf((data.uf ?? '').toUpperCase().slice(0, 2));
    } else {
      setError('CEP não encontrado. Verifique o CEP e tente novamente.');
    }
  }, [cep]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const nomeTrim = nome.trim();
    const emailTrim = email.trim();
    const instTrim = instituicao.trim();
    const msgTrim = mensagem.trim();
    const telDigits = getPhoneDigits(telefone);

    if (!nomeTrim) {
      setError('Preencha seu nome.');
      return;
    }
    if (!emailTrim) {
      setError('Preencha seu e-mail.');
      return;
    }
    if (!instTrim) {
      setError('Preencha o nome da instituição.');
      return;
    }
    if (telDigits.length < 10 || telDigits.length > 11) {
      setError('Preencha o telefone de contato com DDD (10 ou 11 dígitos).');
      return;
    }
    if (!rua.trim() || !numero.trim() || !cidade.trim() || !uf.trim() || uf.trim().length < 2) {
      setError(
        'Preencha o endereço completo da instituição (rua, número, cidade e UF) para que possamos exibir a localização no mapa do app.',
      );
      return;
    }

    const endParts = [rua.trim(), numero.trim(), complemento.trim(), bairro.trim(), cidade.trim(), uf.trim()].filter(Boolean);

    setSubmitting(true);
    try {
      await postPartnershipRequest({
        tipo: 'ong',
        nome: nomeTrim,
        email: emailTrim,
        instituicao: instTrim,
        telefone: telDigits,
        ...(msgTrim ? { mensagem: msgTrim } : {}),
        ...(cnpj.trim() ? { cnpj: cnpj.trim() } : {}),
        ...(anoFundacao.trim() ? { anoFundacao: anoFundacao.trim() } : {}),
        ...(cep.trim() ? { cep: cep.trim() } : {}),
        ...(endParts.length ? { endereco: endParts.join(', ') } : {}),
      });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível enviar. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-6"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-stone-900/50 backdrop-blur-sm" aria-hidden />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-adopet-card shadow-xl border border-adopet-primary/15"
      >
        <div className="sticky top-0 flex items-center justify-between gap-3 px-5 py-4 border-b border-adopet-surface bg-adopet-card rounded-t-2xl z-10">
          <h2 id={titleId} className="text-lg font-display font-bold text-adopet-text-primary">
            {success ? 'Solicitação enviada' : 'Solicitar parceria (ONG / abrigo)'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-adopet-text-secondary hover:bg-adopet-surface hover:text-adopet-text-primary transition-colors"
            aria-label="Fechar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {success ? (
          <div className="px-5 py-6 space-y-4 text-adopet-text-secondary">
            <p>
              Sua solicitação de parceria (ONG ou abrigo) foi enviada e será analisada pela equipe Adopet. O retorno será
              enviado por e-mail no endereço que você informou.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-xl bg-adopet-primary text-white font-semibold py-3 hover:bg-adopet-primary-dark transition-colors"
            >
              Fechar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-5 py-5 space-y-4">
            <p className="text-sm text-adopet-text-secondary">
              Preencha os dados abaixo. Nossa equipe entrará em contato.
            </p>
            {error && (
              <div className="rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm px-3 py-2" role="alert">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="lp-pr-nome" className="block text-sm font-medium text-adopet-text-primary mb-1">
                Seu nome *
              </label>
              <input
                id="lp-pr-nome"
                type="text"
                autoComplete="name"
                placeholder="Ex: Maria Silva"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className={inputClass}
                maxLength={200}
              />
            </div>
            <div>
              <label htmlFor="lp-pr-email" className="block text-sm font-medium text-adopet-text-primary mb-1">
                E-mail *
              </label>
              <input
                id="lp-pr-email"
                type="email"
                autoComplete="email"
                placeholder="contato@empresa.com.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="lp-pr-inst" className="block text-sm font-medium text-adopet-text-primary mb-1">
                Nome da instituição *
              </label>
              <input
                id="lp-pr-inst"
                type="text"
                placeholder="Ex: ONG ou abrigo Amor de Patas"
                value={instituicao}
                onChange={(e) => setInstituicao(e.target.value)}
                className={inputClass}
                maxLength={300}
              />
            </div>
            <div>
              <label htmlFor="lp-pr-cnpj" className="block text-sm font-medium text-adopet-text-primary mb-1">
                CNPJ (opcional)
              </label>
              <input
                id="lp-pr-cnpj"
                type="text"
                inputMode="numeric"
                placeholder="00.000.000/0001-00"
                value={cnpj}
                onChange={(e) => setCnpj(formatCnpjInput(e.target.value))}
                className={inputClass}
                maxLength={18}
              />
            </div>
            <div>
              <label htmlFor="lp-pr-tel" className="block text-sm font-medium text-adopet-text-primary mb-1">
                Telefone de contato *
              </label>
              <input
                id="lp-pr-tel"
                type="tel"
                autoComplete="tel"
                placeholder="(11) 98765-4321"
                value={telefone}
                onChange={(e) => setTelefone(formatPhoneInput(e.target.value))}
                className={inputClass}
                maxLength={16}
              />
            </div>
            <div>
              <label htmlFor="lp-pr-ano" className="block text-sm font-medium text-adopet-text-primary mb-1">
                Ano de fundação (opcional)
              </label>
              <input
                id="lp-pr-ano"
                type="text"
                inputMode="numeric"
                placeholder="Ex: 2010"
                value={anoFundacao}
                onChange={(e) => setAnoFundacao(e.target.value.replace(/\D/g, '').slice(0, 4))}
                className={inputClass}
                maxLength={4}
              />
            </div>
            <div>
              <label htmlFor="lp-pr-cep" className="block text-sm font-medium text-adopet-text-primary mb-1">
                CEP (opcional – busca endereço)
              </label>
              <p className="text-xs text-adopet-text-secondary mb-2">
                Endereço obrigatório para exibir a ONG ou o abrigo no mapa do app.
              </p>
              <div className="flex gap-2">
                <input
                  id="lp-pr-cep"
                  type="text"
                  inputMode="numeric"
                  placeholder="00000-000"
                  value={cep}
                  onChange={(e) => setCep(formatCepInput(e.target.value))}
                  onBlur={() => void buscarCep()}
                  className={`${inputClass} flex-1`}
                  maxLength={9}
                />
                <button
                  type="button"
                  onClick={() => void buscarCep()}
                  disabled={loadingCep || cep.replace(/\D/g, '').length !== 8}
                  className="shrink-0 px-4 rounded-xl bg-adopet-primary text-white font-semibold hover:bg-adopet-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Buscar CEP"
                >
                  {loadingCep ? '…' : (
                    <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="lp-pr-rua" className="block text-sm font-medium text-adopet-text-primary mb-1">
                Endereço completo * — Rua / Logradouro
              </label>
              <input
                id="lp-pr-rua"
                type="text"
                placeholder="Rua, avenida..."
                value={rua}
                onChange={(e) => setRua(e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="lp-pr-num" className="block text-sm font-medium text-adopet-text-primary mb-1">
                  Número *
                </label>
                <input
                  id="lp-pr-num"
                  type="text"
                  inputMode="numeric"
                  placeholder="123"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="lp-pr-comp" className="block text-sm font-medium text-adopet-text-primary mb-1">
                  Complemento
                </label>
                <input
                  id="lp-pr-comp"
                  type="text"
                  placeholder="Sala 1"
                  value={complemento}
                  onChange={(e) => setComplemento(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label htmlFor="lp-pr-bairro" className="block text-sm font-medium text-adopet-text-primary mb-1">
                Bairro
              </label>
              <input
                id="lp-pr-bairro"
                type="text"
                placeholder="Bairro"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="lp-pr-cidade" className="block text-sm font-medium text-adopet-text-primary mb-1">
                  Cidade *
                </label>
                <input
                  id="lp-pr-cidade"
                  type="text"
                  placeholder="Cidade"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="lp-pr-uf" className="block text-sm font-medium text-adopet-text-primary mb-1">
                  UF *
                </label>
                <input
                  id="lp-pr-uf"
                  type="text"
                  placeholder="SP"
                  value={uf}
                  onChange={(e) => setUf(e.target.value.toUpperCase().slice(0, 2))}
                  className={inputClass}
                  maxLength={2}
                />
              </div>
            </div>
            <div>
              <label htmlFor="lp-pr-msg" className="block text-sm font-medium text-adopet-text-primary mb-1">
                Mensagem (opcional)
              </label>
              <textarea
                id="lp-pr-msg"
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                rows={4}
                className={`${inputClass} resize-y min-h-[100px]`}
                maxLength={2000}
                placeholder="Conte um pouco sobre sua instituição e interesse em parceria..."
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-adopet-primary text-white font-semibold py-3 hover:bg-adopet-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? 'Enviando...' : 'Enviar solicitação'}
            </button>
            <p className="text-xs text-adopet-text-secondary text-center">
              Sua solicitação será enviada para nossa equipe. Entraremos em contato em breve pelo e-mail informado.
            </p>
            <p className="text-xs text-adopet-text-secondary text-center">
              Parceria comercial (clínica, pet shop)? Use o app Adopet em{' '}
              <span className="whitespace-nowrap">“Seja parceiro”</span> ou escreva para{' '}
              <a href="mailto:parcerias@appadopet.com.br" className="text-adopet-primary font-medium underline">
                parcerias@appadopet.com.br
              </a>
              .
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
