import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import * as _ from 'lodash/fp';
import { bundleMDX } from 'mdx-bundler';
import rehypePrismPlus from 'rehype-prism-plus';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

import { getAllFilesRecursively } from './utils/files';

import { createRemarkPlugins } from './remark';
import { FrontMatter } from '../types';

const root = process.cwd();
process.env.ESBUILD_BINARY_PATH = path.join(
  root,
  'node_modules',
  'esbuild',
  'bin',
  'esbuild',
);

export const formatSlug = _.replace(/\.(mdx|md)/, '');

export const formatFrontmatterData = ([
  fileName,
  frontmatter,
]): FrontMatter => ({
  ...frontmatter,
  slug: formatSlug(fileName),
  date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
  lastEdit: frontmatter.lastEdit
    ? new Date(frontmatter.date).toISOString()
    : null,
});

export const getFiles = (type: string): string[] => {
  const prefixPaths = path.join(root, 'data', type);

  const files = getAllFilesRecursively(prefixPaths);

  // Only want to return blog/path and ignore root, replace is needed to work on Windows
  return files.map((file) =>
    file.slice(prefixPaths.length + 1).replace(/\\/g, '/'),
  );
};

export const getFileBySlug = async (
  type: string,
  slug: string,
): Promise<{ source: string; frontmatter: FrontMatter }> => {
  const mdxPath = path.join(root, 'data', type, `${slug}.mdx`);
  const mdPath = path.join(root, 'data', type, `${slug}.md`);
  const source = fs.existsSync(mdxPath)
    ? fs.readFileSync(mdxPath, 'utf8')
    : fs.readFileSync(mdPath, 'utf8');

  const toc = [];
  const { code, matter } = await bundleMDX<FrontMatter>({
    source,
    // mdx imports can be automatically source from the components directory
    cwd: path.join(root, 'src/components'),
    mdxOptions(options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        ...createRemarkPlugins({ exportRef: toc }),
      ];

      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        [rehypePrismPlus, { ignoreMissing: true }],
        rehypeAutolinkHeadings,
      ];

      return options;
    },
    esbuildOptions: (options) => {
      options.loader = {
        ...options.loader,
        '.js': 'jsx',
      };
      return options;
    },
  });

  return {
    source: code,
    // toc,
    frontmatter: formatFrontmatterData([mdxPath, matter.data]),
  };
};

export function getAllFilesFrontMatter(folder: string): FrontMatter[] {
  const prefixPaths = path.join(root, 'data', folder);

  const files = getAllFilesRecursively(prefixPaths);

  return _.flow(
    // Replace is needed to work on Windows
    _.map((file: string) => [
      file,
      file.slice(prefixPaths.length + 1).replace(/\\/g, '/'),
    ]),
    // remove non mdx? files
    _.remove(
      ([, fileName]) =>
        path.extname(fileName) !== '.md' && path.extname(fileName) !== '.mdx',
    ),
    // get source
    _.map(([file, fileName]): [string, Buffer] => [
      fileName,
      fs.readFileSync(file),
    ]),
    // get frontmatter data
    _.map(([fileName, source]): [string, { [key: string]: any }] => [
      fileName,
      matter(source),
    ]),
    _.map(([fileName, matter]) => [fileName, matter.data]),
    // remove drafts
    _.remove(([, { draft }]) => draft),
    // add slug and data
    _.map(formatFrontmatterData),
    _.sortBy((a: FrontMatter) => a.date),
    _.reverse,
  )(files);
}
