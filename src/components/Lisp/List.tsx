import { ReactNode } from "react";
import { Text } from '@chakra-ui/react';

export const List = ({ children }: { children: ReactNode }) => (
  <>
    <Text as="span" color="cyan.400">
      (
    </Text>
    {children}
    <Text as="span" color="cyan.400">
      )
    </Text>
  </>
);
