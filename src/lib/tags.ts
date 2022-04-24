import * as _ from 'lodash/fp';

import { getAllFilesFrontMatter } from './mdx';
import { FrontMatter, TagCount } from '../types';

export const getAllTags = (type: string): TagCount[] => {
  const files = getAllFilesFrontMatter(type);

  return _.flow(
    _.remove({ draft: true }),
    _.map('tags'),
    _.filter(Boolean),
    _.flatten,
    _.groupBy(_.identity),
    _.toPairs,
    _.map(([tag, tags]) => ({ tag, count: _.size(tags) })),
  )(files as (FrontMatter & { draft: boolean })[]);
};
