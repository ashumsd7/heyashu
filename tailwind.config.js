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
            color: theme('colors.gray.700'),
            h1: {
              color: theme('colors.gray.800'),
            },
            h3: {
              color: theme('colors.gray.800'),
            },
            strong: {
              color: theme('colors.gray.800'),
            },
            a: {
              color: theme('colors.green.500'),
              '&:hover': {
                color: theme('colors.green.600')
              },
            },
          },
        },
      })
    }
  },
  plugins: [require("@tailwindcss/typography")]
};
