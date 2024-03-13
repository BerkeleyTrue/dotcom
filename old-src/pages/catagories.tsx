import * as _ from 'lodash/fp';
import { Text } from '@chakra-ui/react';
import { Layout } from '../components/Layout';
import { Head } from '../components/Head';

const Catagories = () => {
  return (
    <>
      <Head subTitle="catagories" />
      <Layout>
        <Text>{'(->> '} Catagories)</Text>
      </Layout>
    </>
  );
};

export default Catagories;
