module.exports = {
  content: ['src/**/*.pug', 'src/**/*.md', '.eleventy.js'],
  darkMode: true, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
  separator: '_',
  theme: {
    fontFamily: {
      sans: ['Fira Code', 'ui-sans-serif', 'system-ui'],

      serif: ['Fira Code', 'ui-serif', 'Georgia'],

      mono: ['Fira Code', 'ui-monospace', 'SFMono-Regular'],
    },
  },
};
