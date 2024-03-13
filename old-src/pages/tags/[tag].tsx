import * as _ from 'lodash/fp';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Box, Heading, VStack, Text, HStack } from '@chakra-ui/react';
import { ParsedUrlQuery } from 'querystring';

import { Head } from '../../components/Head';
import { Layout } from '../../components/Layout';
import { DateDisplay } from '../../components/DateDisplay';
import { MainLink } from '../../components/Links';
import { getAllTags } from '../../lib/tags';
import { getAllFilesFrontMatter } from '../../lib/mdx';
import { FrontMatter } from '../../types';

interface Params extends ParsedUrlQuery {
  tag: string;
}

interface Props {
  tag: string;
  fms: FrontMatter[];
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
  const files = getAllFilesFrontMatter('posts');

  const fms = _.flow(
    _.filter(({ tags }: FrontMatter) => _.find(_.isEqual(tag), tags)),
  )(files as FrontMatter[]);

  return { props: { tag, fms } };
};

export const Tag = ({ tag, fms = [] }: Props) => {
  return (
    <Layout>
      <Head subTitle={tag} />
      <VStack mt='16'>
        <Box as='header' mb='16'>
          <Heading as='h2' mb='4'>
            Posts for {tag}
          </Heading>
          <Text>Not many, but enough</Text>
        </Box>
        {fms.map(({ title, slug, date }) => (
          <MainLink href={`/posts/${slug}`} key={title}>
            <HStack>
              <Text>{title}</Text>
              <Text>{'=<<'}</Text>
              <DateDisplay date={date} />
            </HStack>
          </MainLink>
        ))}
      </VStack>
    </Layout>
  );
};
export default Tag;
