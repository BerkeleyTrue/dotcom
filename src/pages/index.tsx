import * as _ from 'lodash/fp';
import dayjs from 'dayjs';
import { ReactNode } from 'react';
import {
  Box,
  StackDivider,
  Text,
  VStack,
  Stack,
  VisuallyHidden,
  Link as CLink,
  useBreakpointValue,
  SimpleGrid,
  Heading,
} from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import NextLink from 'next/link';

import { Layout } from '../components/Layout';
import { Head } from '../components/Head';
import { getAllFilesFrontMatter } from '../lib/mdx';

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllFilesFrontMatter('posts');
  const numOfPosts = _.size(posts);
  return {
    props: { posts, numOfPosts },
  };
};

interface Props {
  posts: [];
  numOfPosts: number;
}
const Index = ({ posts }: Props) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const renderContent = (content: ReactNode) =>
    isMobile ? (
      <Stack direction="column" spacing="2">
        {content}
      </Stack>
    ) : (
      <SimpleGrid columns={4}>{content}</SimpleGrid>
    );

  return (
    <>
      <Head subTitle="home">
        <meta
          name="description"
          content="Berkeley's blog about about coding, bikes, and crypto."
        />
      </Head>
      <Layout>
        <Box mb="auto" mt="12">
          <VStack
            pt="6"
            pb="8"
            spacing={{ base: '6', md: '5' }}
            alignItems="flex-start"
          >
            <Heading
              fontSize={{ base: '8xl', md: '7xl' }}
              fontWeight="extrabold"
              lineHeight="9"
              letterSpacing="tight"
            >
              Welcome
            </Heading>
            <Text fontWeight="lg" lineHeight="7" color="cyan">
              Doing tech, one line of code at a time. Happy Coding.
            </Text>
          </VStack>
          <VStack divider={<StackDivider borderColor="teal.300" />}>
            {posts.map(({ title, slug, date, summary }) => (
              <Box key={slug} py="12" w="100%">
                <article>
                  {renderContent(
                    <>
                      <dl>
                        <VisuallyHidden>
                          <dt>Published On</dt>
                        </VisuallyHidden>
                        <dd>
                          <time dateTime={date} />{' '}
                          <Text
                            fontSize="md"
                            fontWeight="medium"
                            lineHeight="6"
                            color="cyan"
                          >
                            {dayjs(date).format('MMM D, YYYY')}
                          </Text>
                        </dd>
                      </dl>
                      <VStack spacing="5" alignItems="flex-start">
                        <VStack spacing="6" alignItems="flex-start">
                          <NextLink href={`/posts/${slug}`} passHref>
                            <CLink>
                              <Text
                                h="12"
                                fontSize="2xl"
                                fontWeight="bold"
                                lineHeight="8"
                                letterSpacing="tight"
                                color="purple"
                              >
                                {title}
                              </Text>
                            </CLink>
                          </NextLink>
                          <Text>{summary}</Text>
                        </VStack>

                        <NextLink href={`/posts/${slug}`} passHref>
                          <CLink aria-label={`Read ${title}`}>
                            <Text
                              _hover={{ color: 'dracula.100' }}
                              alignItems="center"
                              color="dracula"
                              display="flex"
                              fontWeight="medium"
                              h="12"
                              lineHeight="6"
                            >
                              Read More {'->'}
                            </Text>
                          </CLink>
                        </NextLink>
                      </VStack>
                    </>,
                  )}
                </article>
              </Box>
            ))}
          </VStack>
        </Box>
      </Layout>
    </>
  );
};

export default Index;
