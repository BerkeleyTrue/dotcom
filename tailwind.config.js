module.exports = {
  mode: 'jit',
  purge: [
    '_includes/**/*.pug',
    '_site/**/*.html',
  ],
  darkMode: true, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  seperator: '--',
}
