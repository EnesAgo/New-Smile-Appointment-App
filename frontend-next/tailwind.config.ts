import type { Config } from 'tailwindcss'
// const { fontFamily } = require('tailwindcss/defaultTheme')

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/views/**/*.{js,ts,jsx,tsx}',

  ],
  theme: {
    extend: {
      fontFamily: {
        // ...fontFamily,
        'sans': ['Arial', 'Helvetica', 'sans-serif']
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
            'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        dark: '#15151B',
        alto: '#E0E0E0',
        sand: '#F5F5F5',
        'light-gray': '#D9D9D9',
        'blue-gray': '#b8bdc9'

      },
    },
  },
  plugins: [
    function ({ addVariant }: any) {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
    }
  ],
}
export default config