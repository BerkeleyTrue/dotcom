import * as _ from 'lodash/fp';
import { Box, Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps } from 'next';

import { formatSlug, getFileBySlug, getFiles } from '../../lib/mdx';
import { Layout } from '../../components/Layout';
import { Head } from '../../components/Head';
import { MainLink } from '../../components/Links';
import { MDX } from '../../components/MDX';
import { DateDisplay } from '../../components/DateDisplay';

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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const joinedSlug = _.join('/', params.slug);
  const post = await getFileBySlug('posts', joinedSlug);

  return {
    props: {
      ...post.frontmatter,
      source: post.source,
    },
  };
};

interface Props {
  title: string;
  date: string;
  summary: string;
  tags: string[];
  source: string;
}
const Post = ({ title, date, summary, tags, source }: Props) => {
  return (
    <>
      <Head subTitle={title}>
        <meta name='description' content={`Berkeley talks: ${summary}`} />
      </Head>
      <Layout>
        <Box
          maxW={{ base: '3xl', lg: '5xl' }}
          px={{ base: '5', xl: '0' }}
          mx='auto'
        >
          <VStack align='stretch'>
            <Flex
              flexDirection='column'
              as='header'
              pt='6'
              pb={{ xl: 6 }}
              alignItems='center'
            >
              <DateDisplay date={date} />
              <Heading
                pt='4'
                fontSize={{ base: '4xl', md: '5xl' }}
                fontWeight='extrabold'
                lineHeight={{ base: '10', md: '9' }}
                letterSpacing='tight'
              >
                {title}
              </Heading>
            </Flex>

            <VStack align='stretch'>
              <Box pt='10' pb='8'>
                <Box>
                  <MDX source={source} />
                </Box>
              </Box>
              <Box>
                <Text
                  fontSize='sm'
                  fontWeight='bold'
                  lineHeight='5'
                  my='6'
                  ml='8'
                  whiteSpace='pre'
                >
                  Happy Coding,
                </Text>
                <Text
                  fontSize='sm'
                  fontWeight='bold'
                  lineHeight='5'
                  my='6'
                  ml='8'
                  whiteSpace='pre'
                >
                  {'=<<Berkeley>>='}
                </Text>
              </Box>
            </VStack>
            <Box as='footer' mb='12'>
              {!_.isEmpty(tags) && (
                <Box fontSize='sm' fontWeight='medium' lineHeight='5'>
                  <Box py={{ base: '4', xl: '8' }}>
                    <Text
                      as='h2'
                      fontSize='xs'
                      letterSpacing='wide'
                      color='blue'
                      textTransform='uppercase'
                    >
                      Tags
                    </Text>
                    <HStack>
                      {tags.map((tag) => (
                        <MainLink href={`/tags/${tag}`} key={tag}>
                          {tag}
                        </MainLink>
                      ))}
                    </HStack>
                  </Box>
                </Box>
              )}
            </Box>
          </VStack>
        </Box>
      </Layout>
    </>
  );
};

export default Post;
