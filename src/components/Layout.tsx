import { ReactNode } from 'react';
import {
  Box,
  HStack,
  Stack,
  useBoolean,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';

import Sidebar, { Variants } from './Sidebar';

const headerSize = 16;
const smVariant = { navigation: 'drawer', showButton: true };
const mdVariant = { navigation: 'sidebar', showButton: false };

interface Props {
  children: ReactNode;
}
export function Layout({ children }: Props) {
  const [isSidebarOpen, setSidebar] = useBoolean(false);
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });

  return (
    <HStack h="100vh" w="100vw">
      <Sidebar
        variant={variants.navigation as Variants}
        isOpen={isSidebarOpen}
        onClose={setSidebar.toggle}
      />
      <Stack flexGrow={1} h="100%">
        <Box h={headerSize}>
          Header
          {/* <Header */}
          {/*   showSidebarButton={variants?.navigationButton} */}
          {/*   onShowSidebar={toggleSidebar} */}
          {/* /> */}
        </Box>
        <VStack h={ `calc(100% - var(--chakra-sizes-${headerSize}))` }>{children}</VStack>
      </Stack>
    </HStack>
  );
}
