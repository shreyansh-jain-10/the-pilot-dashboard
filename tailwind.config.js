/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          0: 'var(--bg-0)',
          1: 'var(--bg-1)',
          2: 'var(--bg-2)',
          3: 'var(--bg-3)',
        },
        border: {
          subtle: 'var(--border-subtle)',
          strong: 'var(--border-strong)',
        },
        textc: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
        },
        acc: {
          iris: 'var(--acc-iris)',
          cyan: 'var(--acc-cyan)',
          lime: 'var(--acc-lime)',
        },
        intent: {
          success: 'var(--success)',
          warning: 'var(--warning)',
          danger: 'var(--danger)',
        },
      },
      boxShadow: {
        'elev-2': '0 0 0 1px var(--border-subtle) inset, 0 10px 30px rgba(126,107,255,0.14), 0 4px 20px rgba(0,0,0,0.55)',
        'glow-accent': '0 0 40px rgba(0,229,255,0.12), 0 0 24px rgba(126,107,255,0.18)',
      },
      borderRadius: {
        'machine-card': '20px',
        'machine-pill': '999px',
      },
      fontFamily: {
        inter: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        spaceg: ['"Space Grotesk"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        bebas: ['"Bebas Neue"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        plexmono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
}


