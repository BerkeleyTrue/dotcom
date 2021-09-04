const dayjs = require('dayjs');
const pluginTailwindCSS = require("eleventy-plugin-tailwindcss");

// expose to pug
global.dayjs = dayjs;

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginTailwindCSS, {
    src: './src/css/**/*.css',
    keepFolderStructure: false,
    watchEleventyWatchTargets: true,
    dest: 'assets',
  });
};
