import * as _ from 'lodash/fp';
import { GetStaticProps } from 'next';
import { Badge, Flex, Heading, VStack, Text, Box } from '@chakra-ui/react';

import { Layout } from '../components/Layout';
import { Head } from '../components/Head';
import { getAllTags } from '../lib/tags';
import { TagCount } from '../types';
import { MainLink } from '../components/Links';

interface Props {
  tags: TagCount[];
}

export const getStaticProps: GetStaticProps<Props> = () => {
  const tags = getAllTags('posts');

  return { props: { tags } };
};

const Tags = ({ tags }: Props) => {
  return (
    <>
      <Head subTitle='tags' />
      <Layout>
        <VStack mt='16'>
          <Box as='header' mb='16'>
            <Heading as='h2' mb='4'>
              Tags
            </Heading>
            <Text>Not many, but enough</Text>
          </Box>
          <Flex>
            {tags.map(({ tag, count }) => (
              <MainLink key={tag} href={`/tags/${tag}`}>
                <Badge mx='1' p='2' borderRadius='xl' colorScheme='green'>
                  {tag} - {count}
                </Badge>
              </MainLink>
            ))}
          </Flex>
        </VStack>
      </Layout>
    </>
  );
};

export default Tags;
