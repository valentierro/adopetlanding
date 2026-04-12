import { trackAppStoreClick, trackPlayStoreClick } from '../analytics/gtag';
import { IOS_APP_STORE_URL, PLAY_STORE_URL } from '../constants/stores';

type Location = 'hero' | 'header' | 'cta_section' | 'footer' | 'apoie' | 'partner_redirect';

interface StoreBadgesProps {
  location: Location;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const heights: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'h-10',
  md: 'h-12',
  lg: 'h-14',
};

export function StoreBadges({ location, size = 'md', className = '' }: StoreBadgesProps) {
  const h = heights[size];

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-center gap-3 flex-wrap ${className}`}>
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackPlayStoreClick(location)}
        className="transition-all hover:scale-[1.03] active:scale-[0.98] hover:opacity-90"
      >
        <img
          src="/badges/google-play.png"
          alt="Disponível no Google Play"
          className={`${h} w-auto`}
          style={{ borderRadius: 8 }}
        />
      </a>
      <a
        href={IOS_APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackAppStoreClick(location)}
        className="transition-all hover:scale-[1.03] active:scale-[0.98] hover:opacity-90"
      >
        <img
          src="/badges/app-store.png"
          alt="Disponível na App Store"
          className={`${h} w-auto`}
          style={{ borderRadius: 8 }}
        />
      </a>
    </div>
  );
}
