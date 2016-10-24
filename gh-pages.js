/* eslint-disable no-process-exit */
const path = require('path');
const ghpages = require('gh-pages');

console.log('\nstarting gh-pages push\n');
ghpages.publish(
  path.join(__dirname, 'public'),
  function(err) {
    if (err) {
      console.error(err);
      throw err;
    }
    console.log('\ngh-pages push completed\n');
    process.exit(0);
  }
);
