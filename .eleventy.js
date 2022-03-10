const _ = require('lodash/fp');
const dayjs = require('dayjs');

const markdownIt = require('markdown-it');
const markdownItClass = require('@toycode/markdown-it-class');
const markdownItPrism = require('markdown-it-prism');

// expose to pug
global.dayjs = dayjs;
global.filterTags = _.flow(
  _.castArray,
  _.remove(_.includes(_, ['all', 'nav', 'post', 'posts'])),
);
global._ = _;

module.exports = function (eleventyConfig) {
  const mapping = {
    a: ['text-blue-300', 'hover:underline'],
  };

  const md = markdownIt({ linkify: true, html: true });
  md.use(markdownItPrism).use(markdownItClass, mapping);

  eleventyConfig.addPassthroughCopy('./assets');

  eleventyConfig.setLibrary('md', md);

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
