import fs from 'fs';
import path from 'path';
import * as _ from 'lodash/fp';

const walkDir = (fullPath: string): string | string[] => {
  return fs.statSync(fullPath).isFile()
    ? fullPath
    : getAllFilesRecursively(fullPath);
};

const pathJoinPrefix = (prefix: string) => (extraPath: string) =>
  path.join(prefix, extraPath);

export const getAllFilesRecursively = (folder: string): string[] =>
  _.flow(
    fs.readdirSync, // string[]
    _.map(_.flow(pathJoinPrefix(folder), walkDir)),
    _.flatten,
  )(folder);
