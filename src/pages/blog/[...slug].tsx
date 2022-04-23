import * as _ from 'lodash/fp';
import { Text } from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { formatSlug, getFileBySlug, getFiles } from '../../lib/mdx';

export const getStaticPaths: GetStaticPaths = () => {
  return _.flow(
    getFiles,
    _.map((file) => ({
      params: {
        slug: formatSlug(file).split('/'),
      },
    })),
    (paths) => ({
      paths,
      fallback: false,
    }),
  )('posts');
};

export const getStaticProps: GetStaticProps = ({ params }) => {
  const joinedSlug = _.join('/', params.slug);
  const post = getFileBySlug('posts', joinedSlug);
  return {
    props: {
      post,
    },
  };
};

const Post = ({ post }) => {
  return <Text>{ post.title }</Text>;
};

export default Post;
