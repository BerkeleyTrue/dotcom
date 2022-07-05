import { ComponentProps, PropsWithChildren, ReactNode, useEffect } from 'react';
import { Box, Flex, useBoolean, useBreakpointValue } from '@chakra-ui/react';

import Sidebar, { Variants } from './Sidebar';
import { Header } from './Header';
import { useRouter } from 'next/router';

type BoxWidth = ComponentProps<typeof Box>['width'];

const getContentWidth = (size: number | string): string =>
  `calc(100% - var(--chakra-sizes-${size}))`;

const headerSize = 12;
const sidebarWidth: BoxWidth = { base: '64', xl: '80', '2xl': '96' };
const contentWidth: BoxWidth = {
  sm: '100%',
  md: getContentWidth(sidebarWidth.base as string),
  xl: getContentWidth(sidebarWidth.base as string),
  '2xl': getContentWidth(sidebarWidth.base as string),
};

export function Layout({ children }: PropsWithChildren<{}>) {
  const router = useRouter();
  const [isSidebarOpen, setSidebar] = useBoolean(false);

  useEffect(() => {
    setSidebar.off();
  }, [setSidebar, router.pathname]);

  return (
    <Flex h='100vh' w='100vw'>
      <Sidebar
        isOpen={isSidebarOpen}
        sidebarWidth={sidebarWidth}
        onClose={setSidebar.toggle}
      />
      <Flex
        flexDir='column'
        flexGrow={1}
        h='100%'
        maxH='100vh'
        maxW={contentWidth}
        w='100%'
      >
        <Header h={headerSize} onButtonPress={setSidebar.toggle} />
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
