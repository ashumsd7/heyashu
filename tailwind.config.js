/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx, md}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx,md}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx,md}",
  ],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            p: {
              margin: 0,
              padding: 0,
              fontSize: 16,
              lineHeight: '24px',
              fontWeight: 400,
            },
            img: {
              padding: 0,
              margin: 0,
            },
            video: {
              padding: 0,
              margin: 0,
            },
            h1: {
              fontSize: 36,
              lineHeight: '48px',
              margin: 0,
              fontWeight: 700,
              color: '#110F15',
            },
            h2: {
              fontSize: 24,
              lineHeight: '32px',
              margin: 0,
              padding:0,
              fontWeight: 700,
              color: '#110F15',
            },
            h3: {
              fontSize: 18,
              lineHeight: '24px',
              margin: 0,
              color: '#110F15',
              fontWeight: 700,
            },
            '[class~="body-large"]': {
              fontSize: 18,
              lineHeight: '28px',
              fontWeight: 400,
              margin: 0,
              color: '#181818',
            },
            '[class~="body"]': {
              fontSize: 16,
              lineHeight: '24px',
              fontWeight: 400,
              margin: 0,
            },
            '[class~="body-small"]': {
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: 400,
              margin: 0,
            },
            '[class~="link"]': {
              fontSize: '16px',
              lineHeight: '24px',
              fontWeight: 500,
              margin: 0,
              textDecoration:'underline',
              cursor:'pointer'
            },
            '[class~="caps"]': {
              fontSize: 14,
              lineHeight: '20px',
              fontWeight: 700,
              margin: 0,
              textTransform: 'uppercase',
            },
            '[class~="caps-small"]': {
              fontSize: 12,
              lineHeight: '20px',
              fontWeight: 500,
              margin: 0,
              textTransform: 'uppercase',
            },

            '[class~="button"]': {
              fontSize: 16,
              lineHeight: '24px',
              fontWeight: 500,
              margin: 0,
            },

            // NOT USED
         
            '[class~="body-faded"]': {
              fontSize: 16,
              lineHeight: '24px',
              fontWeight: 400,
              margin: 0,
              color: '#110F15',
            },
            '[class~="body-faded-3"]': {
              fontSize: 16,
              lineHeight: '24px',
              fontWeight: 400,
              margin: 0,
              color: '#3C4858',
            },
            '[class~="body-faded-4"]': {
              fontSize: 16,
              lineHeight: '24px',
              fontWeight: 400,
              margin: 0,
              color: '#5A6679',
            },
           

            '[class~="link-large"]': {
              fontSize: 18,
              lineHeight: '28px',
              fontWeight: 500,
            },
           
            
          
           
           
            '[class~="caps-chip"]': {
              fontSize: 14,
              lineHeight: '20px',
              fontWeight: 700,
              margin: 0,

              textTransform: 'uppercase',
            },
            '[class~="caption"]': {
              fontSize: 12,
              lineHeight: '20px',
              fontWeight: 400,
              margin: 0,
            },
            button: {
              fontSize: 16,
              lineHeight: '24px',
              fontWeight: 500,
              margin: 0,
            },
           
            '[class~="button-faded-3"]': {
              fontSize: 16,
              lineHeight: '24px',
              fontWeight: 500,
              margin: 0,
              color: '#3C4858',
            },
          },
        },
      }),
    }
  },
  plugins: [require("@tailwindcss/typography")]
};
