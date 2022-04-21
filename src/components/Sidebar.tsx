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
import { MouseEventHandler, ReactNode } from 'react';
import { Avatar } from './Avatar';

export type Variants = 'drawer' | 'sidebar';

const sidebarStyles = {
  bg: 'darker.800',
};

const List = ({ children }: { children: ReactNode }) => (
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

const Func = ({ children }: { children: ReactNode }) => (
  <Text as="span" color="red.400">
    {children}
  </Text>
);

interface ContentProps {
  onClick: MouseEventHandler;
}
const SidebarContent = ({ onClick }: ContentProps) => (
  <VStack>
    <Avatar />
    <Text fontSize={{ base: 'medium' }} mb="4">
      <List>
        <Func>Berkeley</Func>
        <Text as="span" color="purple.400">
          &nbsp;true
        </Text>
      </List>
    </Text>
    <NextLink href="/" passHref>
      <Button onClick={onClick} w="100%" display="flex" justifyContent="left">
        <List>
          <Func>{'->'}</Func>&nbsp;Home
        </List>
      </Button>
    </NextLink>
    <NextLink href="/catagories" passHref>
      <Button onClick={onClick} w="100%" display="flex" justifyContent="left">
        <List><Func>{'->>'}</Func>&nbsp;Catagories</List>
      </Button>
    </NextLink>
    <NextLink href="/tags" passHref>
      <Button onClick={onClick} w="100%" display="flex" justifyContent="left">
        <List><Func>{'->>'}</Func>&nbsp;Tags</List>
      </Button>
    </NextLink>
    <NextLink href="/about" passHref>
      <Button onClick={onClick} w="100%" display="flex" justifyContent="left">
        <List><Func>{'->'}</Func>&nbsp;About</List>
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
