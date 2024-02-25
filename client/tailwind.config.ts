import type { Config } from 'tailwindcss';
const formsPlugin = require('@tailwindcss/forms');
const headlessuiPlugin = require('@headlessui/tailwindcss');
const variables = require('@mertasan/tailwindcss-variables');


const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        sm: ['8px', { lineHeight: '12px' }],
        md: ['14px', { lineHeight: '21px' }],
        lg: ['32px', { lineHeight: '20px' }],
        xl: ['48px', { lineHeight: '32px' }],
      },
      colors: {
        "brandColor": `var(--colors-brandColor)`,
        "brandHoverColor": `var(--colors-brandHoverColor)`,
        "darkColor": `var(--colors-darkColor)`,
        "mediumDarkColor": `var(--colors-mediumDarkColor)`,
        "grayColor": `var(--colors-grayColor)`,
        "lightGrayColor": `var(--colors-lightGrayColor)`,
        "white": `var(--colors-white)`,
      },
      dropShadow: {
        glow: [
          "0 0px 20px rgba(255,255, 255, 0.35)",
          "0 0px 65px rgba(255, 255,255, 0.2)"
        ]
      },
    },
    variables: {
      DEFAULT: {
        colors: {
          'brandColor': '#AB69FF',
          'lightBrandColor': '#A100FF',
          'brandHoverColor': '#6500D8',
          'darkColor': '#141414',
          // 'darkColor': '#26212D',
          'mediumDarkColor': '#32283E',
          'grayColor': '#C5BFCD',
          'lightGrayColor': '#EBE9ED',
          'white': '#ffffff',
        },
      },
    },
  },
  plugins: [formsPlugin, headlessuiPlugin, variables],
}
export default config
