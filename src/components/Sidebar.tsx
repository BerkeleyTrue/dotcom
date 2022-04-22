import { MouseEventHandler } from 'react';
import NextLink from 'next/link';
import { FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';
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
  Flex,
  Link as CLink,
} from '@chakra-ui/react';
import { Avatar } from './Avatar';
import { List } from './Lisp/List';
import { Func } from './Lisp/Func';

export type Variants = 'drawer' | 'sidebar';

const sidebarStyles = {
  bg: 'darker.800',
};

interface ContentProps {
  onClick: MouseEventHandler;
}

const SidebarContent = ({ onClick }: ContentProps) => (
  <Flex h="100%" w="100%" flexFlow="column" justifyContent="space-between">
    <VStack>
      <Flex flexFlow="column" pb="6" alignItems="center">
        <Avatar />
        <Text fontSize={{ base: 'medium' }} mt="4">
          <List>
            <Func>Berkeley</Func>
            <Text as="span" color="purple.400">
              &nbsp;true
            </Text>
          </List>
        </Text>
      </Flex>
      <NextLink href="/" passHref>
        <Button onClick={onClick} w="100%" display="flex" justifyContent="left">
          <List>
            <Func>{'->'}</Func>&nbsp;Home
          </List>
        </Button>
      </NextLink>
      <NextLink href="/catagories" passHref>
        <Button onClick={onClick} w="100%" display="flex" justifyContent="left">
          <List>
            <Func>{'->>'}</Func>&nbsp;Catagories
          </List>
        </Button>
      </NextLink>
      <NextLink href="/tags" passHref>
        <Button onClick={onClick} w="100%" display="flex" justifyContent="left">
          <List>
            <Func>{'->>'}</Func>&nbsp;Tags
          </List>
        </Button>
      </NextLink>
      <NextLink href="/about" passHref>
        <Button onClick={onClick} w="100%" display="flex" justifyContent="left">
          <List>
            <Func>{'->'}</Func>&nbsp;About
          </List>
        </Button>
      </NextLink>
    </VStack>
    <VStack>
      <Flex justifyContent="space-between" w="100%" px="10">
        <CLink
          href="https://github.com/berkeleytrue"
          aria-label="A link to my github profile"
          target="_blank"
          rel="noreferrer"
          color="blue.300"
        >
          <FiGithub />
        </CLink>
        <CLink
          href="https://twitter.com/berkeleytrue"
          aria-label="A link to my twitter profile"
          target="_blank"
          rel="noreferrer"
          color="teal.300"
        >
          <FiTwitter />
        </CLink>
        <CLink
          href="https://linkedin.com/in/berkeleytrue"
          aria-label="A link to my linkedin profile"
          target="_blank"
          rel="noreferrer"
          color="blue.400"
        >
          <FiLinkedin />
        </CLink>
      </Flex>
      <Box>
        <CLink
          aria-label="A link to the open source repository for this site"
          href="https://github.com/berkeleytrue/dotcom"
          target="_blank"
          display="flex"
          justifyContent="center"
          alignItems="center"
          h="12"
          fontSize={{ base: 'xs', '2xl': 'lg' }}
          color="teal.200"
        >
          This site is open source {'>=>'}
        </CLink>
      </Box>
    </VStack>
  </Flex>
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
      w={{ base: '64', xl: '80', '2xl': '96' }}
      h="100%"
      {...sidebarStyles}
    >
      <SidebarContent onClick={onClose as MouseEventHandler} />
    </Box>
  ) : (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent {...sidebarStyles}>
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
