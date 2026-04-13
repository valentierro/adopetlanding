import { useEffect, useState } from 'react';

function getTokenFromPath(): string {
  const match = window.location.pathname.match(/^\/responder\/([^/]+)/);
  return match ? decodeURIComponent(match[1]) : '';
}

function apiV1Base(): string {
  const raw = import.meta.env.VITE_PUBLIC_API_URL?.trim() || 'https://api.appadopet.com.br';
  const noTrail = raw.replace(/\/$/, '');
  return noTrail.endsWith('/v1') ? noTrail : `${noTrail}/v1`;
}

type SessionMessage = { from: 'adopter' | 'facilitator' | 'guardian' | 'system'; content: string; createdAt: string };

type SessionState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; petName: string; guardianLabel: string; messages: SessionMessage[] };

const FROM_LABEL: Record<SessionMessage['from'], string> = {
  adopter: 'Interessado',
  facilitator: 'Quem anuncia',
  guardian: 'Responsável',
  system: 'Sistema',
};

export function GuardianResponderPage() {
  const [session, setSession] = useState<SessionState>({ status: 'loading' });
  const [reply, setReply] = useState('');
  const [sending, setSending] = useState(false);
  const [sentOk, setSentOk] = useState(false);

  useEffect(() => {
    const token = getTokenFromPath();
    if (!token || token.length < 16) {
      setSession({ status: 'error', message: 'Link inválido.' });
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${apiV1Base()}/public/guardian-inquiry/${encodeURIComponent(token)}`, {
          method: 'GET',
          headers: { Accept: 'application/json' },
        });
        if (cancelled) return;
        if (res.status === 404) {
          setSession({ status: 'error', message: 'Link inválido ou expirado.' });
          return;
        }
        if (res.status === 410) {
          const body = await res.json().catch(() => null);
          const msg =
            typeof body?.message === 'string'
              ? body.message
              : 'Este link expirou ou não está mais ativo. Peça um novo contato pelo Adopet.';
          setSession({ status: 'error', message: msg });
          return;
        }
        if (!res.ok) {
          setSession({ status: 'error', message: 'Não foi possível carregar a conversa. Tente de novo mais tarde.' });
          return;
        }
        const data = (await res.json()) as { petName?: string; guardianLabel?: string; messages?: SessionMessage[] };
        setSession({
          status: 'ready',
          petName: data.petName ?? 'Pet',
          guardianLabel: data.guardianLabel ?? 'Responsável',
          messages: Array.isArray(data.messages) ? data.messages : [],
        });
      } catch {
        if (!cancelled) {
          setSession({ status: 'error', message: 'Falha de rede. Verifique sua conexão.' });
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getTokenFromPath();
    const text = reply.trim();
    if (!text || sending || session.status !== 'ready') return;
    setSending(true);
    try {
      const res = await fetch(`${apiV1Base()}/public/guardian-inquiry/${encodeURIComponent(token)}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ content: text }),
      });
      if (res.ok) {
        setSentOk(true);
        setReply('');
        setSession((prev) => {
          if (prev.status !== 'ready') return prev;
          return {
            status: 'ready',
            petName: prev.petName,
            guardianLabel: prev.guardianLabel,
            messages: [
              ...prev.messages,
              { from: 'guardian', content: text, createdAt: new Date().toISOString() },
            ],
          };
        });
        return;
      }
      if (res.status === 410) {
        const body = await res.json().catch(() => null);
        alert(
          typeof body?.message === 'string'
            ? body.message
            : 'Este link não aceita mais respostas.',
        );
        return;
      }
      const errBody = await res.json().catch(() => null);
      alert(typeof errBody?.message === 'string' ? errBody.message : 'Não foi possível enviar. Tente novamente.');
    } catch {
      alert('Falha de rede. Tente novamente.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-adopet-background">
      <nav className="bg-adopet-background/95 backdrop-blur-sm border-b border-adopet-header/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center">
          <a href="https://appadopet.com.br/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Adopet" className="h-10 w-auto" />
          </a>
        </div>
      </nav>

      <main className="max-w-lg mx-auto px-6 py-10">
        <div className="rounded-2xl bg-white shadow-xl border border-adopet-header/20 p-8">
          <h1 className="text-xl md:text-2xl font-display font-bold text-adopet-text-primary mb-2">
            Mensagem sobre adoção
          </h1>
          {session.status === 'loading' ? (
            <p className="text-adopet-text-secondary">Carregando…</p>
          ) : session.status === 'error' ? (
            <p className="text-adopet-text-secondary">{session.message}</p>
          ) : (
            <>
              <p className="text-adopet-text-secondary mb-6">
                Olá, <strong className="text-adopet-text-primary">{session.guardianLabel}</strong>. Abaixo o histórico
                recente sobre <strong className="text-adopet-text-primary">{session.petName}</strong>. Sua resposta será
                vista por quem conversa no Adopet sobre este pet.
              </p>
              <div className="max-h-72 overflow-y-auto space-y-3 mb-6 border border-adopet-header/15 rounded-xl p-3 bg-adopet-background/40">
                {session.messages.length === 0 ? (
                  <p className="text-sm text-adopet-text-secondary">Nenhuma mensagem ainda.</p>
                ) : (
                  session.messages.map((m, i) => (
                    <div key={`${m.createdAt}-${i}`} className="text-sm border-b border-adopet-header/10 pb-2 last:border-0">
                      <span className="font-semibold text-adopet-primary">{FROM_LABEL[m.from]}</span>
                      <span className="text-adopet-text-secondary text-xs ml-2">
                        {new Date(m.createdAt).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}
                      </span>
                      <p className="text-adopet-text-primary mt-1 whitespace-pre-wrap">{m.content}</p>
                    </div>
                  ))
                )}
              </div>
              {sentOk ? (
                <p className="text-sm text-green-700 mb-4">Mensagem enviada. Você pode enviar outra abaixo, se quiser.</p>
              ) : null}
              <form onSubmit={handleSubmit} className="space-y-3">
                <label htmlFor="guardian-reply" className="block text-sm font-medium text-adopet-text-primary">
                  Sua resposta
                </label>
                <textarea
                  id="guardian-reply"
                  value={reply}
                  onChange={(ev) => setReply(ev.target.value)}
                  rows={4}
                  maxLength={4000}
                  className="w-full rounded-xl border border-adopet-header/25 px-4 py-3 text-adopet-text-primary bg-white focus:outline-none focus:ring-2 focus:ring-adopet-primary/40"
                  placeholder="Escreva sua mensagem…"
                  disabled={sending}
                />
                <button
                  type="submit"
                  disabled={sending || !reply.trim()}
                  className="w-full inline-flex items-center justify-center px-6 py-3 rounded-xl bg-adopet-primary text-white font-semibold shadow-md hover:bg-adopet-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? 'Enviando…' : 'Enviar'}
                </button>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
