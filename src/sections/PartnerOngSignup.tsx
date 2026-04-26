import { useCallback, useState } from 'react';
import { postPartnershipRequest } from '../api/partnershipRequest';
import { formatPhoneInput, getPhoneDigits } from '../utils/phoneMask';
import { fetchCep } from '../utils/viaCep';

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

const fieldClass =
  'w-full px-4 py-3 rounded-xl border border-adopet-primary/20 bg-adopet-card text-adopet-text-primary text-sm placeholder:text-adopet-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-adopet-primary/30';

export function PartnerOngSignup() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState('');
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
      setError('CEP não encontrado. Verifique e tente novamente.');
    }
  }, [cep]);

  const resetForm = () => {
    setSuccess(false);
    setNome('');
    setEmail('');
    setEmailSubmitted('');
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
  };

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
      setError('Preencha o endereço completo (rua, número, cidade e UF) para exibir a instituição no mapa do app.');
      return;
    }

    const endParts = [rua.trim(), numero.trim(), complemento.trim(), bairro.trim(), cidade.trim(), uf.trim()].filter(
      Boolean,
    );

    setSubmitting(true);
    try {
      await postPartnershipRequest({
        tipo: 'ong',
        nome: nomeTrim,
        email: emailTrim,
        instituicao: instTrim,
        telefone: telDigits,
        ...(msgTrim ? { mensagem: msgTrim } : {}),
        ...(cnpj.trim() ? { cnpj: cnpj.replace(/\D/g, '') } : {}),
        ...(anoFundacao.trim() ? { anoFundacao: anoFundacao.trim() } : {}),
        ...(cep.trim() ? { cep: cep.replace(/\D/g, '') } : {}),
        ...(endParts.length ? { endereco: endParts.join(', ') } : {}),
      });
      setEmailSubmitted(emailTrim);
      setSuccess(true);
      const el = document.getElementById('cadastro-ong');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível concluir o cadastro. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div
        id="cadastro-ong"
        className="mt-14 max-w-xl mx-auto text-left rounded-2xl border border-adopet-primary/20 bg-adopet-card/90 p-8 shadow-lg"
      >
        <div className="flex items-start gap-3 mb-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-adopet-primary/15 text-adopet-primary">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <div>
            <h3 className="text-xl font-bold text-adopet-text-primary font-display">Conta da ONG criada</h3>
            <p className="text-sm text-adopet-text-secondary mt-1">
              Seu cadastro foi registrado — não é necessária aprovação manual da equipe.
            </p>
          </div>
        </div>
        <p className="text-adopet-text-secondary text-sm leading-relaxed mb-4">
          Enviamos um e-mail para <strong className="text-adopet-text-primary">{emailSubmitted}</strong>.{' '}
          <strong>Abra a caixa de entrada (e a pasta de spam)</strong> e clique no link para{' '}
          <strong>confirmar seu e-mail</strong>. Só após a confirmação a instituição passa a aparecer na lista pública
          de parceiros do app. No mesmo e-mail, ou em outra mensagem nossa, você encontra o passo a passo para{' '}
          <strong>definir sua senha</strong> e acessar o app e o portal do parceiro.
        </p>
        <p className="text-sm text-adopet-text-secondary">
          Dúvidas?{' '}
          <a href="mailto:parcerias@appadopet.com.br" className="text-adopet-primary font-medium hover:underline">
            parcerias@appadopet.com.br
          </a>
        </p>
        <button
          type="button"
          onClick={resetForm}
          className="mt-6 w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-adopet-primary/30 text-adopet-primary font-semibold text-sm hover:bg-adopet-primary/10 transition-colors"
        >
          Cadastrar outra instituição
        </button>
      </div>
    );
  }

  return (
    <div id="cadastro-ong" className="mt-14 max-w-xl mx-auto text-left">
      <h3 className="text-lg font-bold text-adopet-text-primary font-display mb-2">Cadastre sua ONG ou abrigo</h3>
      <p className="text-sm text-adopet-text-secondary leading-relaxed mb-6">
        Ao enviar o formulário, <strong className="text-adopet-text-primary">sua conta de parceiro é criada na hora</strong>{' '}
        (sem aprovação do admin). Em seguida você recebe um e-mail para <strong>ativar a conta</strong> — confirme o
        endereço de e-mail para a instituição figurar publicamente no app.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error ? (
          <div
            role="alert"
            className="rounded-xl px-4 py-3 text-sm font-medium bg-red-50 text-red-900 border border-red-200/80"
          >
            {error}
          </div>
        ) : null}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="ong-nome" className="block text-sm font-medium text-adopet-text-primary mb-1">
              Seu nome <span className="text-adopet-orange">*</span>
            </label>
            <input
              id="ong-nome"
              className={fieldClass}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              autoComplete="name"
              maxLength={200}
              required
            />
          </div>
          <div>
            <label htmlFor="ong-email" className="block text-sm font-medium text-adopet-text-primary mb-1">
              E-mail <span className="text-adopet-orange">*</span>
            </label>
            <input
              id="ong-email"
              type="email"
              className={fieldClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              placeholder="contato@ong.org.br"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="ong-inst" className="block text-sm font-medium text-adopet-text-primary mb-1">
            Nome da instituição <span className="text-adopet-orange">*</span>
          </label>
          <input
            id="ong-inst"
            className={fieldClass}
            value={instituicao}
            onChange={(e) => setInstituicao(e.target.value)}
            maxLength={300}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="ong-cnpj" className="block text-sm font-medium text-adopet-text-primary mb-1">
              CNPJ
            </label>
            <input
              id="ong-cnpj"
              className={fieldClass}
              value={cnpj}
              onChange={(e) => setCnpj(formatCnpjInput(e.target.value))}
              inputMode="numeric"
              maxLength={18}
            />
          </div>
          <div>
            <label htmlFor="ong-tel" className="block text-sm font-medium text-adopet-text-primary mb-1">
              Telefone (com DDD) <span className="text-adopet-orange">*</span>
            </label>
            <input
              id="ong-tel"
              type="tel"
              className={fieldClass}
              value={telefone}
              onChange={(e) => setTelefone(formatPhoneInput(e.target.value))}
              autoComplete="tel"
              maxLength={16}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="ong-ano" className="block text-sm font-medium text-adopet-text-primary mb-1">
            Ano de fundação
          </label>
          <input
            id="ong-ano"
            className={fieldClass}
            value={anoFundacao}
            onChange={(e) => setAnoFundacao(e.target.value.replace(/\D/g, '').slice(0, 4))}
            inputMode="numeric"
            maxLength={4}
            placeholder="2010"
          />
        </div>

        <div>
          <label htmlFor="ong-cep" className="block text-sm font-medium text-adopet-text-primary mb-1">
            CEP
          </label>
          <p className="text-xs text-adopet-text-secondary mb-1.5">Use a busca para preencher rua e cidade. O endereço aparece no mapa do app.</p>
          <div className="flex gap-2">
            <input
              id="ong-cep"
              className={fieldClass + ' flex-1'}
              value={cep}
              onChange={(e) => setCep(formatCepInput(e.target.value))}
              onBlur={() => void buscarCep()}
              inputMode="numeric"
              maxLength={9}
            />
            <button
              type="button"
              onClick={() => void buscarCep()}
              disabled={loadingCep || cep.replace(/\D/g, '').length !== 8}
              className="shrink-0 px-4 rounded-xl bg-adopet-primary text-white text-sm font-semibold hover:bg-adopet-primary-dark disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loadingCep ? '...' : 'Buscar'}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="ong-rua" className="block text-sm font-medium text-adopet-text-primary mb-1">
            Rua / logradouro <span className="text-adopet-orange">*</span>
          </label>
          <input id="ong-rua" className={fieldClass} value={rua} onChange={(e) => setRua(e.target.value)} required />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="ong-num" className="block text-sm font-medium text-adopet-text-primary mb-1">
              Número <span className="text-adopet-orange">*</span>
            </label>
            <input
              id="ong-num"
              className={fieldClass}
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              inputMode="numeric"
              required
            />
          </div>
          <div>
            <label htmlFor="ong-comp" className="block text-sm font-medium text-adopet-text-primary mb-1">
              Complemento
            </label>
            <input id="ong-comp" className={fieldClass} value={complemento} onChange={(e) => setComplemento(e.target.value)} />
          </div>
        </div>

        <div>
          <label htmlFor="ong-bairro" className="block text-sm font-medium text-adopet-text-primary mb-1">
            Bairro
          </label>
          <input id="ong-bairro" className={fieldClass} value={bairro} onChange={(e) => setBairro(e.target.value)} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="ong-cid" className="block text-sm font-medium text-adopet-text-primary mb-1">
              Cidade <span className="text-adopet-orange">*</span>
            </label>
            <input id="ong-cid" className={fieldClass} value={cidade} onChange={(e) => setCidade(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="ong-uf" className="block text-sm font-medium text-adopet-text-primary mb-1">
              UF <span className="text-adopet-orange">*</span>
            </label>
            <input
              id="ong-uf"
              className={fieldClass}
              value={uf}
              onChange={(e) => setUf(e.target.value.toUpperCase().slice(0, 2))}
              maxLength={2}
              placeholder="SP"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="ong-msg" className="block text-sm font-medium text-adopet-text-primary mb-1">
            Mensagem (opcional)
          </label>
          <textarea
            id="ong-msg"
            className={fieldClass + ' min-h-[100px] resize-y'}
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            maxLength={2000}
            rows={4}
            placeholder="Conte um pouco sobre a instituição…"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3.5 rounded-xl font-bold text-white bg-adopet-orange hover:bg-adopet-orange/95 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {submitting ? 'Criando conta…' : 'Criar conta da ONG no Adopet'}
        </button>

        <p className="text-xs text-center text-adopet-text-secondary">
          Parceria comercial (clínica, pet shop)? Use o app em “Seja parceiro” ou escreva para{' '}
          <a href="mailto:parcerias@appadopet.com.br" className="text-adopet-primary font-medium hover:underline">
            parcerias@appadopet.com.br
          </a>
          .
        </p>
      </form>
    </div>
  );
}
