const pluginTailwindCSS = require("eleventy-plugin-tailwindcss");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginTailwindCSS, {
    keepFolderStructure: false,
    watchEleventyWatchTargets: true,
    dest: 'assets',
  });
};
