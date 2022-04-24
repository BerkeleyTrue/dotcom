import * as _ from 'lodash/fp';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Box, Heading, VStack, Text } from '@chakra-ui/react';
import { ParsedUrlQuery } from 'querystring';

import { Head } from '../../components/Head';
import { Layout } from '../../components/Layout';
import { getAllTags } from '../../lib/tags';

interface Params extends ParsedUrlQuery {
  tag: string;
}

interface Props {
  tag: string;
}

export const getStaticPaths: GetStaticPaths = () => {
  const paths = _.flow(
    getAllTags,
    _.map('tag'),
    _.map((tag) => `/tags/${tag}`),
  )('posts');

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, Params> = ({
  params: { tag },
}) => {
  return { props: { tag } };
};

export const Tag = ({ tag }: Props) => {
  return (
    <Layout>
      <Head subTitle={tag} />
        <VStack mt="16">
          <Box as="header" mb="16">
            <Heading as="h2" mb="4">
              Posts for {tag}
            </Heading>
            <Text>Not many, but enough</Text>
          </Box>
        </VStack>
    </Layout>
  );
};
export default Tag;
