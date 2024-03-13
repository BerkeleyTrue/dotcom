import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { Layout } from '../components/Layout';
import { Head } from '../components/Head';
import { GetStaticProps } from 'next';
import { getFileBySlug } from '../lib/mdx';
import { MDX } from '../components/MDX';

interface Props {
  source: string;
  title?: string;
}
export const getStaticProps: GetStaticProps<Props> = async () => {
  const { source, frontmatter } = await getFileBySlug('copy', 'about');
  return {
    props: { source, ...frontmatter },
  };
};
const About = ({ source, title = 'About Me' }: Props) => {
  return (
    <Layout>
      <Head subTitle="about" />
      <VStack py="16" px="16" align="stretch">
        <Box as="header" textAlign="center">
          <Heading fontSize="5xl">{title}</Heading>
        </Box>
        <Box>
          <MDX source={source} />
        </Box>
      </VStack>
    </Layout>
  );
};

export default About;
