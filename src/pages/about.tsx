import { Text } from '@chakra-ui/react';
import { Layout } from '../components/Layout';
import { Head } from '../components/Head';

const About = () => {
  return (
    <Layout>
      <Head subTitle="about" />
      <Text>{'(as->'} About)</Text>
    </Layout>
  );
};

export default About;
