import { ReactNode } from 'react';
import { Text } from '@chakra-ui/react';

export const Func = ({ children }: { children: ReactNode }) => (
  <Text as="span" color="red.400">
    {children}
  </Text>
);
