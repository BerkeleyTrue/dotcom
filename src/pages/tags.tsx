import * as _ from 'lodash/fp';
import { Text } from '@chakra-ui/react';
import { Layout } from '../components/Layout';
import { Head } from '../components/Head';

const Tags = () => {
  return (
    <Layout>
      <Head subTitle="tags" />
      <Text>{'<==tags==>'}</Text>
    </Layout>
  );
};

export default Tags;
