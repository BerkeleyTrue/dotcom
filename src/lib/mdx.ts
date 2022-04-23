import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import * as _ from 'lodash/fp';

import { getAllFilesRecursively } from './utils/files';

const root = process.cwd();

export function formatSlug(slug: string) {
  return slug.replace(/\.(mdx|md)/, '');
}
export function sortDateDesc(a: string, b: string) {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
}

export interface FrontMatter {
  data: string;
  description: string;
  excerpt: string;
  slug: string;
  date: string;
  lastEdit: string;
}

export async function getAllFilesFrontMatter(
  folder: string,
): Promise<FrontMatter[]> {
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
    _.map(([fileName, matter]) => [
      fileName,
      {
        ...matter.data,
        content: matter.content,
        excerpt: _.flow(
          _.get('content'),
          _.split('\n'),
          _.take(4),
          _.join('\n'),
        )(matter),
      },
    ]),
    // remove drafts
    _.remove(([, { draft }]) => draft),
    // add slug and data
    _.map(
      ([fileName, frontmatter]): FrontMatter => ({
        ...frontmatter,
        slug: formatSlug(fileName),
        date: frontmatter.date
          ? new Date(frontmatter.date).toISOString()
          : null,
        lastEdit: frontmatter.lastEdit
          ? new Date(frontmatter.date).toISOString()
          : null,
      }),
    ),
    _.sortBy((a: FrontMatter) => a.date),
  )(files);
}
