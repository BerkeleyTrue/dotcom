const dayjs = require('dayjs');
const pluginTailwindCSS = require('eleventy-plugin-tailwindcss');

const markdownIt = require('markdown-it');
const markdownItClass = require('@toycode/markdown-it-class');

// expose to pug
global.dayjs = dayjs;


/**
 * Eleventy config
 * @param {import('@11ty/eleventy/src/UserConfig')} eleventyConfig
 */
module.exports = function (eleventyConfig) {
  const mapping = {
    h1: [
      'text-3xl',
      'font-extrabold',
      'leading-9',
      'tracking-tight',
      'text-gray-900',
      'sm_text-4xl',
      'sm_leading-10',
      'md_text-6xl',
      'md_leading-14',
    ],
    h2: ['tracking-wide', 'text-indigo-700', 'uppercase', 'text-lg', 'leading-6'],
    a: ['text-blue-300', 'hover:underline'],
  };

  const md = markdownIt({ linkify: true, html: true });
  md.use(markdownItClass, mapping);

  eleventyConfig.addPassthroughCopy('./assets');

  eleventyConfig.setLibrary('md', md);

  eleventyConfig.addPlugin(pluginTailwindCSS, {
    src: './src/css/**/*.css',
    keepFolderStructure: false,
    watchEleventyWatchTargets: true,
    dest: 'assets',
  });

  eleventyConfig.setBrowserSyncConfig({
    port: 3000,
    open: true,
    notify: true,
    ui: { port: 3001 },
  });

  return {
    dir: {
      input: './src',
      includes: 'includes',
      data: 'data',
    },
  };
};
