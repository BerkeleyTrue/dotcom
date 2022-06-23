import { PropsWithChildren, ReactNode } from 'react';
import { Box, Flex, useBoolean, useBreakpointValue } from '@chakra-ui/react';

import Sidebar, { Variants } from './Sidebar';
import { Header } from './Header';

const headerSize = 12;
const smVariant = { navigation: 'drawer', showButton: true };
const mdVariant = { navigation: 'sidebar', showButton: false };

export function Layout({ children }: PropsWithChildren<{}>) {
  const [isSidebarOpen, setSidebar] = useBoolean(false);
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });

  return (
    <Flex h='100vh' w='100vw'>
      <Sidebar
        variant={variants.navigation as Variants}
        isOpen={isSidebarOpen}
        onClose={setSidebar.toggle}
      />
      <Flex flexGrow={1} h='100%' maxH='100vh' w='100%' flexDir='column'>
        <Header
          h={headerSize}
          showButton={variants.showButton}
          onButtonPress={setSidebar.toggle}
        />
        <Flex
          h={`calc(100% - var(--chakra-sizes-${headerSize}))`}
          w='100%'
          px='4'
          overflowX='hidden'
          overflowY='auto'
        >
          <Box mx='auto' w='100%' maxW='container.xl'>
            {children}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}
