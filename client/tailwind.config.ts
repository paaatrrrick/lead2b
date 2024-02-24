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
        "darkColor": `var(--colors-darkColor)`,
        "mediumDarkColor": `var(--colors-mediumDarkColor)`,
        "grayColor": `var(--colors-grayColor)`,
        "lightGrayColor": `var(--colors-lightGrayColor)`,
        "white": `var(--colors-white)`,
      }
    },
    variables: {
      DEFAULT: {
        colors: {
          'brandColor': '#6500E5',
          'brandHoverColor': '#6500F0',
          'darkColor': '#26212D',
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
