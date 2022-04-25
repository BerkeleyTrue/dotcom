import _ from 'lodash/fp';
import bluebird from 'bluebird';
import dayjs from 'dayjs';
import { load, dump } from 'js-yaml';

import { visit } from 'unist-util-visit';
import { VFile } from 'vfile';
import { read, write } from 'to-vfile';
import { remark } from 'remark';
import remarkFrontmatter from 'remark-frontmatter';

import { FrontMatter } from '../src/types';

const files = _.drop(2, process.argv);

const mdParser = remark()
  .data('settings', { listItemIndent: 'one' })
  .use(remarkFrontmatter, ['yaml'])
  .use(() => (tree) => {
    visit(tree, 'yaml', (node) => {
      const frontmatter = load(node.value) as FrontMatter;
      frontmatter.lastEdit = dayjs().toISOString();

      if (!frontmatter.date) {
        frontmatter.date = frontmatter.lastEdit;
      }

      node.value = dump(frontmatter);
    });
  });

const main = async (files: string[]) => {
  bluebird.Promise.resolve(files)
    .map((file) => read(file))
    .map((vfile) => mdParser.process(vfile))
    .each((vfile) => write(vfile));
};

main(files);
