import { ReactNode } from 'react';
import {
  Flex,
  Stack,
  useBoolean,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';

import Sidebar, { Variants } from './Sidebar';
import { Header } from './Header';

const headerSize = 12;
const smVariant = { navigation: 'drawer', showButton: true };
const mdVariant = { navigation: 'sidebar', showButton: false };

interface Props {
  children: ReactNode;
}
export function Layout({ children }: Props) {
  const [isSidebarOpen, setSidebar] = useBoolean(false);
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });

  return (
    <Flex h="100vh" w="100vw">
      <Sidebar
        variant={variants.navigation as Variants}
        isOpen={isSidebarOpen}
        onClose={setSidebar.toggle}
      />
      <Stack flexGrow={1} h="100%">
        <Header
          h={headerSize}
          showButton={variants.showButton}
          onButtonPress={setSidebar.toggle}
        />
        <VStack h={`calc(100% - var(--chakra-sizes-${headerSize}))`}>
          {children}
        </VStack>
      </Stack>
    </Flex>
  );
}
