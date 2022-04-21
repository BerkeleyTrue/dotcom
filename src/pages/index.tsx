import * as _ from 'lodash/fp';
import { Text } from '@chakra-ui/react';
import { Layout } from '../components/Layout';
import { Head } from '../components/Head';

const Index = () => {
  return (
    <>
      <Head subTitle="home" />
      <Layout>
        <Text>{'<==HOME==>'}</Text>
      </Layout>
    </>
  );
};

export default Index;
