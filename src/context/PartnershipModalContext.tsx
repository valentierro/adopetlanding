import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { PartnershipRequestModal } from '../components/PartnershipRequestModal';
import { trackPartnershipCtaClick } from '../analytics/gtag';

type Ctx = {
  openPartnershipModal: (source?: string) => void;
};

const PartnershipModalContext = createContext<Ctx | null>(null);

export function PartnershipModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openPartnershipModal = useCallback((source?: string) => {
    trackPartnershipCtaClick(source ?? 'unknown');
    setOpen(true);
  }, []);
  const value = useMemo(() => ({ openPartnershipModal }), [openPartnershipModal]);

  return (
    <PartnershipModalContext.Provider value={value}>
      {children}
      <PartnershipRequestModal open={open} onClose={() => setOpen(false)} />
    </PartnershipModalContext.Provider>
  );
}

export function usePartnershipModal(): Ctx {
  const ctx = useContext(PartnershipModalContext);
  if (!ctx) {
    throw new Error('usePartnershipModal must be used within PartnershipModalProvider');
  }
  return ctx;
}
