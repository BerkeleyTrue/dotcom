import NextLink from 'next/link';
import {
  Box,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerBody,
  DrawerContent,
  VStack,
  Text,
} from '@chakra-ui/react';
import { MouseEventHandler } from 'react';

export type Variants = 'drawer' | 'sidebar';

const sidebarStyles = {
  bg: 'darker.800',
};

interface ContentProps {
  onClick: MouseEventHandler;
}
const SidebarContent = ({ onClick }: ContentProps) => (
  <VStack>
    <Text fontSize={{ base: 'medium' }} mb="4">
      (= Berkeley true)
    </Text>
    <NextLink href="/" passHref>
      <Button onClick={onClick} w="100%">
        { '(->' } Home)
      </Button>
    </NextLink>
    <NextLink href="/catagories" passHref>
      <Button onClick={onClick} w="100%">
        { '(->>' } Catagories)
      </Button>
    </NextLink>
    <NextLink href="/about" passHref>
      <Button onClick={onClick} w="100%" textAlign='left'>
        { '(as->' } About)
      </Button>
    </NextLink>
  </VStack>
);

interface Props {
  onClose: () => void;
  isOpen: boolean;
  variant: Variants;
}
const Sidebar = ({ isOpen, variant, onClose }: Props) => {
  return variant === 'sidebar' ? (
    <Box
      p={5}
      w={{ base: '48', lg: '64', xl: '80', '2xl': '96' }}
      h="100%"
      {...sidebarStyles}
    >
      <SidebarContent onClick={onClose as MouseEventHandler} />
    </Box>
  ) : (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      {...sidebarStyles}
    >
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody pt="12">
            <SidebarContent onClick={onClose} />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default Sidebar;
