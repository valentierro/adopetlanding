import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { postPartnershipRequest } from '../api/partnershipRequest';

type Props = {
  open: boolean;
  onClose: () => void;
};

function digitsOnly(s: string): string {
  return s.replace(/\D/g, '');
}

export function PartnershipRequestModal({ open, onClose }: Props) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [instituicao, setInstituicao] = useState('');
  const [telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [anoFundacao, setAnoFundacao] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const reset = useCallback(() => {
    setNome('');
    setEmail('');
    setInstituicao('');
    setTelefone('');
    setMensagem('');
    setCnpj('');
    setAnoFundacao('');
    setCep('');
    setEndereco('');
    setError(null);
    setSuccess(false);
  }, []);

  useEffect(() => {
    if (!open) {
      reset();
      return;
    }
    const t = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLInputElement>('input[type="text"], input:not([type])')?.focus();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const nomeT = nome.trim();
    const emailT = email.trim();
    const instT = instituicao.trim();
    const telT = telefone.trim();
    const telDigits = digitsOnly(telT);
    if (!nomeT) {
      setError('Preencha seu nome.');
      return;
    }
    if (!emailT) {
      setError('Preencha seu e-mail.');
      return;
    }
    if (!instT) {
      setError('Preencha o nome da ONG ou abrigo.');
      return;
    }
    if (telDigits.length < 10) {
      setError('Informe um telefone válido (DDD + número).');
      return;
    }
    setSubmitting(true);
    try {
      await postPartnershipRequest({
        tipo: 'ong',
        nome: nomeT,
        email: emailT,
        instituicao: instT,
        telefone: telT,
        mensagem: mensagem.trim() || undefined,
        cnpj: cnpj.trim() || undefined,
        anoFundacao: anoFundacao.trim() || undefined,
        cep: cep.trim() || undefined,
        endereco: endereco.trim() || undefined,
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
        <div className="sticky top-0 flex items-center justify-between gap-3 px-5 py-4 border-b border-adopet-surface bg-adopet-card rounded-t-2xl">
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
              Sua solicitação foi registrada e a equipe Adopet vai analisar. O retorno será enviado para o e-mail que você
              informou.
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
              Mesmo processo do app: sua ONG entra na fila de análise e você recebe resposta por e-mail.
            </p>
            {error && (
              <div className="rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm px-3 py-2" role="alert">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="lp-pr-nome" className="block text-sm font-medium text-adopet-text-primary mb-1">
                Seu nome
              </label>
              <input
                id="lp-pr-nome"
                type="text"
                autoComplete="name"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full rounded-xl border border-adopet-surface bg-white px-3 py-2.5 text-adopet-text-primary focus:outline-none focus:ring-2 focus:ring-adopet-primary/40"
                maxLength={200}
                required
              />
            </div>
            <div>
              <label htmlFor="lp-pr-email" className="block text-sm font-medium text-adopet-text-primary mb-1">
                E-mail
              </label>
              <input
                id="lp-pr-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-adopet-surface bg-white px-3 py-2.5 text-adopet-text-primary focus:outline-none focus:ring-2 focus:ring-adopet-primary/40"
                required
              />
            </div>
            <div>
              <label htmlFor="lp-pr-inst" className="block text-sm font-medium text-adopet-text-primary mb-1">
                Nome da ONG ou abrigo
              </label>
              <input
                id="lp-pr-inst"
                type="text"
                value={instituicao}
                onChange={(e) => setInstituicao(e.target.value)}
                className="w-full rounded-xl border border-adopet-surface bg-white px-3 py-2.5 text-adopet-text-primary focus:outline-none focus:ring-2 focus:ring-adopet-primary/40"
                maxLength={300}
                required
              />
            </div>
            <div>
              <label htmlFor="lp-pr-tel" className="block text-sm font-medium text-adopet-text-primary mb-1">
                WhatsApp / telefone
              </label>
              <input
                id="lp-pr-tel"
                type="tel"
                autoComplete="tel"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                className="w-full rounded-xl border border-adopet-surface bg-white px-3 py-2.5 text-adopet-text-primary focus:outline-none focus:ring-2 focus:ring-adopet-primary/40"
                maxLength={30}
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="lp-pr-cnpj" className="block text-sm font-medium text-adopet-text-primary mb-1">
                  CNPJ (opcional)
                </label>
                <input
                  id="lp-pr-cnpj"
                  type="text"
                  value={cnpj}
                  onChange={(e) => setCnpj(e.target.value)}
                  className="w-full rounded-xl border border-adopet-surface bg-white px-3 py-2.5 text-adopet-text-primary focus:outline-none focus:ring-2 focus:ring-adopet-primary/40"
                  maxLength={20}
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
                  value={anoFundacao}
                  onChange={(e) => setAnoFundacao(e.target.value)}
                  className="w-full rounded-xl border border-adopet-surface bg-white px-3 py-2.5 text-adopet-text-primary focus:outline-none focus:ring-2 focus:ring-adopet-primary/40"
                  maxLength={10}
                />
              </div>
            </div>
            <div>
              <label htmlFor="lp-pr-cep" className="block text-sm font-medium text-adopet-text-primary mb-1">
                CEP (opcional)
              </label>
              <input
                id="lp-pr-cep"
                type="text"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                className="w-full rounded-xl border border-adopet-surface bg-white px-3 py-2.5 text-adopet-text-primary focus:outline-none focus:ring-2 focus:ring-adopet-primary/40"
                maxLength={10}
              />
            </div>
            <div>
              <label htmlFor="lp-pr-end" className="block text-sm font-medium text-adopet-text-primary mb-1">
                Endereço (opcional)
              </label>
              <input
                id="lp-pr-end"
                type="text"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                className="w-full rounded-xl border border-adopet-surface bg-white px-3 py-2.5 text-adopet-text-primary focus:outline-none focus:ring-2 focus:ring-adopet-primary/40"
                maxLength={500}
                placeholder="Rua, número, bairro, cidade — UF"
              />
            </div>
            <div>
              <label htmlFor="lp-pr-msg" className="block text-sm font-medium text-adopet-text-primary mb-1">
                Mensagem (opcional)
              </label>
              <textarea
                id="lp-pr-msg"
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                rows={3}
                className="w-full rounded-xl border border-adopet-surface bg-white px-3 py-2.5 text-adopet-text-primary focus:outline-none focus:ring-2 focus:ring-adopet-primary/40 resize-y min-h-[88px]"
                maxLength={2000}
                placeholder="Conte um pouco sobre a instituição e o interesse em parceria..."
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-adopet-primary text-white font-semibold py-3 hover:bg-adopet-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? 'Enviando…' : 'Enviar solicitação'}
            </button>
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
