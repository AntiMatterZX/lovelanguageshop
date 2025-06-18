import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        beauty: {
          pink: '#ec4899',
          purple: '#a855f7',
          rose: '#f43f5e',
          gold: '#fbbf24',
        }
      },
      fontFamily: {
        'beauty': ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'beauty': '0 20px 25px -5px rgba(236, 72, 153, 0.1), 0 10px 10px -5px rgba(236, 72, 153, 0.04)',
        'beauty-lg': '0 25px 50px -12px rgba(236, 72, 153, 0.25)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config 