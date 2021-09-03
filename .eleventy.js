const pluginTailwindCSS = require("eleventy-plugin-tailwindcss");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginTailwindCSS, {
    src: './src/css/**/*.css',
    keepFolderStructure: false,
    watchEleventyWatchTargets: true,
    dest: 'assets',
  });
};
