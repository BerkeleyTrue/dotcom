import { ComponentProps, MouseEventHandler } from 'react';
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
import { NavItem } from './Nav/NavItem';

export type Variants = 'drawer' | 'sidebar';

const sidebarStyles = {
  bg: 'darker.800',
};

interface ContentProps {
  onClick: MouseEventHandler;
}

const SidebarContent = ({ onClick }: ContentProps) => (
  <Flex h='100%' w='100%' flexFlow='column' justifyContent='space-between'>
    <VStack>
      <Flex flexFlow='column' pb='6' alignItems='center'>
        <Avatar />
        <Text fontSize={{ base: 'medium' }} mt='4'>
          <List>
            <Func>Berkeley</Func>
            <Text as='span' color='purple.400'>
              &nbsp;true
            </Text>
          </List>
        </Text>
      </Flex>
      <NavItem href='/'>Home</NavItem>
      <NavItem href='/tags'>Tags</NavItem>
      <NavItem href='/about'>About</NavItem>
    </VStack>
    <VStack>
      <Flex justifyContent='space-between' w='100%' px='10'>
        <CLink
          href='https://github.com/berkeleytrue'
          aria-label='A link to my github profile'
          target='_blank'
          rel='noreferrer'
          color='blue.300'
        >
          <FiGithub />
        </CLink>
        <CLink
          href='https://twitter.com/berkeleytrue'
          aria-label='A link to my twitter profile'
          target='_blank'
          rel='noreferrer'
          color='teal.300'
        >
          <FiTwitter />
        </CLink>
        <CLink
          href='https://linkedin.com/in/berkeleytrue'
          aria-label='A link to my linkedin profile'
          target='_blank'
          rel='noreferrer'
          color='blue.400'
        >
          <FiLinkedin />
        </CLink>
      </Flex>
      <Box>
        <CLink
          aria-label='A link to the open source repository for this site'
          href='https://github.com/berkeleytrue/dotcom'
          target='_blank'
          display='flex'
          justifyContent='center'
          alignItems='center'
          h='12'
          fontSize={{ base: 'xs', '2xl': 'lg' }}
          color='teal.200'
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
  sidebarWidth: ComponentProps<typeof Box>['width'];
}
const Sidebar = ({ isOpen, onClose, sidebarWidth }: Props) => {
  return (
    <>
      <Box
        p={5}
        w={sidebarWidth}
        h='100%'
        {...sidebarStyles}
        display={{ base: 'none', md: 'unset' }}
      >
        <SidebarContent onClick={onClose as MouseEventHandler} />
      </Box>
      <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent {...sidebarStyles}>
            <DrawerCloseButton />
            <DrawerBody pt='12'>
              <SidebarContent onClick={onClose} />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default Sidebar;
