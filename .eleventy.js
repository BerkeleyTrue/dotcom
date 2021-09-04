const dayjs = require('dayjs');
const pluginTailwindCSS = require("eleventy-plugin-tailwindcss");

// expose to pug
global.dayjs = dayjs;

/**
 * Eleventy config
 * @param {import('@11ty/eleventy/src/UserConfig')} eleventyConfig
 */
module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginTailwindCSS, {
    src: './src/css/**/*.css',
    keepFolderStructure: false,
    watchEleventyWatchTargets: true,
    dest: 'assets',
  });
  eleventyConfig.setBrowserSyncConfig({
    port:3000,
    open: true,
    notify: true,
    ui: { port:3001 },

  });
};
