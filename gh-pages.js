/* eslint-disable no-process-exit */
const path = require('path');
const ghpages = require('gh-pages');
const debugFactory = require('debug');

const log = debugFactory('berkeleytrue:gh-pages');

log('starting gh-pages push');
ghpages.publish(
  path.join(__dirname, 'public'),
  function(err) {
    if (err) { throw err; }
    log('gh-pages push completed');
    process.exit(0);
  }
);
