/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        adopet: {
          // Dark teal-black backgrounds (aligned with brand green)
          bg:        '#04100E',
          'bg-card': '#081A17',
          'bg-card2':'#0C2220',
          border:    '#163530',
          'border-light': '#1F4A44',
          // Brand teal (logo paw/text color)
          primary:       '#0FBA9E',
          'primary-dark':'#0DA08A',
          'primary-light':'#34D4B8',
          // Brand orange/coral (logo heart color)
          orange:        '#F4732A',
          'orange-light':'#F99060',
          // Purple accent
          purple: '#7C5CBF',
          // Legacy aliases (pages / modal still reference these)
          background: '#04100E',
          surface:    '#081A17',
          header:     '#163530',
          card:       '#081A17',
          accent:     '#7C5CBF',
          'primary-legacy': '#0FBA9E',
          'orange-legacy':  '#F4732A',
          'text-primary':   '#FFFFFF',
          'text-secondary': '#A8C5BF',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in':    'fadeIn 0.7s ease-out forwards',
        float:        'float 6s ease-in-out infinite',
        'ping-slow':  'ping 2.5s cubic-bezier(0,0,0.2,1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow-teal':   '0 0 40px rgba(15,186,158,0.25)',
        'glow-orange': '0 0 40px rgba(244,115,42,0.25)',
        'card-dark':   '0 4px 24px rgba(0,0,0,0.5)',
        'card-hover':  '0 12px 48px rgba(0,0,0,0.7)',
      },
    },
  },
  plugins: [],
};
