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
  separator: '_',
  theme: {
      fontFamily: {
       'sans': ['Fira\ Code', 'ui-sans-serif', 'system-ui'],

       'serif': ['Fira\ Code', 'ui-serif', 'Georgia'],

       'mono': ['Fira\ Code', 'ui-monospace', 'SFMono-Regular'],
      }

}
}
