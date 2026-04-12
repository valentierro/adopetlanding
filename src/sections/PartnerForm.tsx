import { useCallback, useState } from 'react';
import { postPartnershipRequest } from '../api/partnershipRequest';
import { formatPhoneInput, getPhoneDigits } from '../utils/phoneMask';
import { fetchCep } from '../utils/viaCep';
import { FloatingPaw, FloatingHeart } from '../components/Decorations';

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

const fieldStyle = {
  background: '#0C2220',
  border: '1px solid #1F4A44',
  color: '#E8F5F2',
  borderRadius: '12px',
};

const fieldFocusStyle = {
  outline: 'none',
  borderColor: '#0FBA9E',
  boxShadow: '0 0 0 3px rgba(15,186,158,0.15)',
};

function Field({
  id, label, required, hint, children,
}: {
  id?: string; label: string; required?: boolean; hint?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold mb-1" style={{ color: '#C4DDD8' }}>
        {label}{required && <span style={{ color: '#F4732A' }}> *</span>}
      </label>
      {hint && <p className="text-xs mb-1.5" style={{ color: '#7AA39B' }}>{hint}</p>}
      {children}
    </div>
  );
}

function TextInput({
  id, type = 'text', placeholder, value, onChange, onBlur, inputMode, maxLength, autoComplete,
}: {
  id: string; type?: string; placeholder?: string; value: string;
  onChange: (v: string) => void; onBlur?: () => void;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
  maxLength?: number; autoComplete?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      onBlur={() => { setFocused(false); onBlur?.(); }}
      onFocus={() => setFocused(true)}
      inputMode={inputMode}
      maxLength={maxLength}
      autoComplete={autoComplete}
      className="w-full px-4 py-3 text-sm"
      style={{ ...fieldStyle, ...(focused ? fieldFocusStyle : {}), transition: 'border-color 0.15s,box-shadow 0.15s' }}
    />
  );
}

export function PartnerForm() {
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

    if (!nomeTrim) { setError('Preencha seu nome.'); return; }
    if (!emailTrim) { setError('Preencha seu e-mail.'); return; }
    if (!instTrim) { setError('Preencha o nome da instituição.'); return; }
    if (telDigits.length < 10 || telDigits.length > 11) {
      setError('Preencha o telefone de contato com DDD (10 ou 11 dígitos).');
      return;
    }
    if (!rua.trim() || !numero.trim() || !cidade.trim() || !uf.trim() || uf.trim().length < 2) {
      setError('Preencha o endereço completo (rua, número, cidade e UF) para exibir a localização no mapa do app.');
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
      window.scrollTo({ top: document.getElementById('parceiros')?.offsetTop ?? 0, behavior: 'smooth' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível enviar. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="parceiros" className="py-20 md:py-28 px-6 relative overflow-hidden" style={{ background: '#04100E' }}>
      {/* Orange glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%,rgba(244,115,42,0.07) 0%,transparent 60%)' }} />
      <FloatingPaw x="4%"  y="8%"  size={32} opacity={0.04} rotation={-20} color="#F4732A" />
      <FloatingPaw x="93%" y="65%" size={28} opacity={0.04} rotation={15}  color="#0FBA9E" />
      <FloatingHeart x="91%" y="10%" size={20} opacity={0.05} rotation={-8}  color="#F4732A" />
      <FloatingHeart x="6%"  y="70%" size={18} opacity={0.05} rotation={12}  color="#F99060" />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Divider */}
        <div className="h-px mb-20" style={{ background: 'linear-gradient(to right,transparent,rgba(244,115,42,0.25),transparent)' }} />

        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold mb-4"
            style={{ background: 'rgba(244,115,42,0.1)', border: '1px solid rgba(244,115,42,0.25)', color: '#F99060' }}
          >
            <img src="/icons/heart-paw.png" alt="" aria-hidden className="w-5 h-5 object-contain" />
            Parceria para ONGs e abrigos
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Faça parte do <span className="text-grad-teal">Adopet</span>
          </h2>
          <p className="text-lg leading-relaxed max-w-lg mx-auto" style={{ color: '#C4DDD8' }}>
            Apareça no mapa do app, ofereça cupons de desconto e dê mais visibilidade aos pets que precisam de um lar.
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-3xl overflow-hidden relative"
          style={{
            background: '#081A17',
            border: '1px solid rgba(244,115,42,0.18)',
            boxShadow: '0 0 60px rgba(244,115,42,0.06), 0 24px 48px rgba(0,0,0,0.5)',
          }}
        >
          {/* Top accent line */}
          <div className="h-px w-full" style={{ background: 'linear-gradient(to right,transparent,rgba(244,115,42,0.5),transparent)' }} />

          {/* Watermark */}
          <img src="/icons/pin-parceiro.png" alt="" aria-hidden
            className="absolute -bottom-8 -right-8 w-40 pointer-events-none select-none"
            style={{ opacity: 0.06, transform: 'rotate(-10deg)' }} />

          {success ? (
            <div className="px-8 py-16 text-center relative z-10">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: 'rgba(15,186,158,0.1)', border: '2px solid rgba(15,186,158,0.3)' }}>
                <svg className="w-10 h-10" fill="none" stroke="#0FBA9E" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Solicitação enviada!</h3>
              <p className="mb-8 max-w-sm mx-auto" style={{ color: '#A8C5BF' }}>
                Nossa equipe analisará sua solicitação e entrará em contato pelo e-mail informado em até 48h.
              </p>
              <button
                type="button"
                onClick={() => { setSuccess(false); setNome(''); setEmail(''); setInstituicao(''); setCnpj(''); setTelefone(''); setAnoFundacao(''); setCep(''); setRua(''); setNumero(''); setComplemento(''); setBairro(''); setCidade(''); setUf(''); setMensagem(''); }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02]"
                style={{ background: 'rgba(15,186,158,0.1)', border: '1px solid rgba(15,186,158,0.3)', color: '#34D4B8' }}
              >
                Enviar outra solicitação
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="px-6 md:px-10 py-10 space-y-5 relative z-10">
              <p className="text-sm" style={{ color: '#7AA39B' }}>
                Preencha os dados abaixo. Nossa equipe entrará em contato em até 48h pelo e-mail informado.
              </p>

              {error && (
                <div
                  role="alert"
                  className="rounded-xl px-4 py-3 text-sm font-medium"
                  style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)', color: '#FCA5A5' }}
                >
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field id="pf-nome" label="Seu nome" required>
                  <TextInput id="pf-nome" placeholder="Maria Silva" value={nome} onChange={setNome} autoComplete="name" maxLength={200} />
                </Field>
                <Field id="pf-email" label="E-mail" required>
                  <TextInput id="pf-email" type="email" placeholder="contato@ong.org.br" value={email} onChange={setEmail} autoComplete="email" />
                </Field>
              </div>

              <Field id="pf-inst" label="Nome da instituição" required>
                <TextInput id="pf-inst" placeholder="ONG Amor de Patas" value={instituicao} onChange={setInstituicao} maxLength={300} />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field id="pf-cnpj" label="CNPJ">
                  <TextInput id="pf-cnpj" placeholder="00.000.000/0001-00" value={cnpj}
                    onChange={v => setCnpj(formatCnpjInput(v))} inputMode="numeric" maxLength={18} />
                </Field>
                <Field id="pf-tel" label="Telefone de contato" required>
                  <TextInput id="pf-tel" type="tel" placeholder="(11) 98765-4321" value={telefone}
                    onChange={v => setTelefone(formatPhoneInput(v))} autoComplete="tel" maxLength={16} />
                </Field>
              </div>

              <Field id="pf-ano" label="Ano de fundação">
                <TextInput id="pf-ano" placeholder="2010" value={anoFundacao}
                  onChange={v => setAnoFundacao(v.replace(/\D/g, '').slice(0, 4))} inputMode="numeric" maxLength={4} />
              </Field>

              {/* CEP row */}
              <Field id="pf-cep" label="CEP" hint="Busque o CEP para preencher o endereço automaticamente. Endereço obrigatório para exibição no mapa do app.">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <TextInput id="pf-cep" placeholder="00000-000" value={cep}
                      onChange={v => setCep(formatCepInput(v))}
                      onBlur={() => void buscarCep()} inputMode="numeric" maxLength={9} />
                  </div>
                  <button
                    type="button"
                    onClick={() => void buscarCep()}
                    disabled={loadingCep || cep.replace(/\D/g, '').length !== 8}
                    className="shrink-0 px-4 rounded-xl font-semibold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.03]"
                    style={{ background: 'linear-gradient(135deg,#0FBA9E,#34D4B8)' }}
                    aria-label="Buscar CEP"
                  >
                    {loadingCep
                      ? <span className="text-xs px-1">...</span>
                      : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    }
                  </button>
                </div>
              </Field>

              <Field id="pf-rua" label="Rua / Logradouro" required>
                <TextInput id="pf-rua" placeholder="Rua, avenida..." value={rua} onChange={setRua} />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field id="pf-num" label="Número" required>
                  <TextInput id="pf-num" placeholder="123" value={numero} onChange={setNumero} inputMode="numeric" />
                </Field>
                <Field id="pf-comp" label="Complemento">
                  <TextInput id="pf-comp" placeholder="Sala 1" value={complemento} onChange={setComplemento} />
                </Field>
              </div>

              <Field id="pf-bairro" label="Bairro">
                <TextInput id="pf-bairro" placeholder="Bairro" value={bairro} onChange={setBairro} />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field id="pf-cidade" label="Cidade" required>
                  <TextInput id="pf-cidade" placeholder="Cidade" value={cidade} onChange={setCidade} />
                </Field>
                <Field id="pf-uf" label="UF" required>
                  <TextInput id="pf-uf" placeholder="SP" value={uf}
                    onChange={v => setUf(v.toUpperCase().slice(0, 2))} maxLength={2} />
                </Field>
              </div>

              <Field id="pf-msg" label="Mensagem">
                <MsgArea id="pf-msg" value={mensagem} onChange={setMensagem} />
              </Field>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-xl font-bold text-white text-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{ background: 'linear-gradient(135deg,#F4732A,#F99060)', boxShadow: '0 0 40px rgba(244,115,42,0.3)' }}
              >
                {submitting ? 'Enviando...' : 'Enviar solicitação de parceria'}
              </button>

              <p className="text-xs text-center" style={{ color: '#7AA39B' }}>
                Parceria comercial (clínica, pet shop)? Acesse o app Adopet em "Seja parceiro" ou escreva para{' '}
                <a href="mailto:parcerias@appadopet.com.br" style={{ color: '#0FBA9E' }}>
                  parcerias@appadopet.com.br
                </a>
                .
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function MsgArea({ id, value, onChange }: { id: string; value: string; onChange: (v: string) => void }) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      id={id}
      value={value}
      onChange={e => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      rows={4}
      maxLength={2000}
      placeholder="Conte um pouco sobre sua instituição e interesse na parceria..."
      className="w-full px-4 py-3 text-sm resize-y min-h-[100px]"
      style={{
        background: '#0C2220',
        border: focused ? '1px solid #0FBA9E' : '1px solid #1F4A44',
        boxShadow: focused ? '0 0 0 3px rgba(15,186,158,0.15)' : 'none',
        color: '#E8F5F2',
        borderRadius: '12px',
        transition: 'border-color 0.15s,box-shadow 0.15s',
        outline: 'none',
      }}
    />
  );
}
