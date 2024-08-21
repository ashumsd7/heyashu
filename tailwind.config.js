/** @type {import('tailwindcss').Config} */

const { color } = require("framer-motion");

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
            color: theme("colors.gray.800"),
            h1: {
              fontSize: "24px",
              marginBottom: "1.2rem", // 19.2px
              marginTop: "32px",
              fontWeight: theme("fontWeight.bold"),
              lineHeight: theme("lineHeight.tight"),
              "@screen sm": {
                fontSize: theme("fontSize.2xl"), // 24px
                marginBottom: "1rem", // 16px
                marginTop: "24px",
              },
              "@screen md": {
                fontSize: theme("fontSize.3xl"), // 30px
              },
              "@screen lg": {
                fontSize: theme("fontSize.4xl"), // 36px
              },
              "@screen xl": {
                fontSize: "32px",
                marginBottom: "1.2rem", // 19.2px
                marginTop: "32px",
              },
            },
            h2: {
              fontSize: "24px", // 30px
              marginBottom: theme("spacing.4"),
              marginTop: theme("spacing.8"),
              fontWeight: theme("fontWeight.semibold"),
              lineHeight: theme("lineHeight.tight"),
              "@screen sm": {
                fontSize: "24px", // 24px
              },
              "@screen md": {
                fontSize: "24px", // 24px
              },
              "@screen lg": {
                fontSize: "24px", // 30px
              },
              "@screen xl": {
                fontSize: "24px",
              },
            },
            h3: {
              fontSize: "22px", // 24px
              marginBottom: theme("spacing.3"),
              marginTop: theme("spacing.10"),
              fontWeight: theme("fontWeight.bold"),
              lineHeight: theme("lineHeight.tight"),
              "@screen sm": {
                fontSize: "22px", // 20px
              },
              "@screen md": {
                fontSize: "22px",// 20px
              },
              "@screen lg": {
                fontSize: "22px", // 24px
              },
              "@screen xl": {
                fontSize: "22px",
              },
            },
            p: {
              fontSize: "20px",
              marginBottom: theme("spacing.5"),
              marginTop: theme("spacing.2"),
              lineHeight: theme("lineHeight.relaxed"),
              "@screen sm": {
                fontSize: "18px",
              },
              "@screen md": {
                fontSize: "20px",
              },
            },
            a: {
              color: theme("colors.blue.600"),
              textDecoration: "underline",
              "&:hover": {
                color: theme("colors.blue.800"),
              },
            },
            img: {
              marginBottom: "56px",
              borderRadius: theme("borderRadius.md"),
              maxWidth: "100%",
              "@screen sm": {
                marginBottom: "40px",
              },
            },
            ul: {
              listStyleType: "disc",
              paddingLeft: theme("spacing.6"),
              marginBottom: theme("spacing.5"),
              fontSize: "20px",
            },
            ol: {
              listStyleType: "decimal",
              paddingLeft: theme("spacing.6"),
              // marginBottom: theme("spacing.5"),
              fontSize: "20px",
            },
            li: {
              // marginBottom: theme("spacing.1"),
              lineHeight: theme("lineHeight.relaxed"),
              fontSize: "20px",
            },
            blockquote: {
              paddingLeft: theme("spacing.6"),
              fontStyle: "italic",
              color: theme("colors.gray.600"),
              borderLeft: `4px solid ${theme("colors.gray.300")}`,
              marginBottom: theme("spacing.5"),
               fontSize: "20px",
            },
            code: {
              backgroundColor: theme("colors.gray.200"),
              borderRadius: theme("borderRadius.sm"),
              padding: theme("spacing.1"),
              color: theme("colors.pink.600"),
            },
            pre: {
              backgroundColor: theme("colors.gray.100"),
              padding: theme("spacing.4"),
              borderRadius: theme("borderRadius.md"),
              overflowX: "auto",
            },
            small: {
              fontSize: theme("fontSize.sm"),
              color: theme("colors.gray.600"),
            },
            span: {
              display: "inline-block",
              margin: theme("spacing.1"),
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
