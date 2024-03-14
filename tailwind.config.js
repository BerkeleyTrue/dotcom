/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./templates/*.html"],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "--tw-prose-headings": "--ctp-text",
            color: theme("colors.text"),
            a: {
              color: theme("colors.sky"),
              "&:hover": {
                color: theme("colors.blue"),
              },
            },
            "*": {
              color: theme("colors.text"),
            },
            code: {
              color: theme("colors.rosewater"),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@catppuccin/tailwindcss")({
      defaultFlavour: "frappe",
    }),
  ],
}
