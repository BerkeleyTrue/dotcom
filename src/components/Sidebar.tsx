import {
  Box,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  VStack,
} from '@chakra-ui/react';
import { MouseEventHandler } from 'react';

export type Variants = 'drawer' | 'sidebar';
interface Props {
  onClose: () => void;
  isOpen: boolean;
  variant: Variants;
}

interface ContentProps {
  onClick: MouseEventHandler;
}

const sidebarStyles = {
  bg: 'darker.800',
};
const SidebarContent = ({ onClick }: ContentProps) => (
  <VStack>
    <Button onClick={onClick} w="100%">
      Home
    </Button>
    <Button onClick={onClick} w="100%">
      About
    </Button>
    <Button onClick={onClick} w="100%">
      Contact
    </Button>
  </VStack>
);

const Sidebar = ({ isOpen, variant, onClose }: Props) => {
  return variant === 'sidebar' ? (
    <Box p={5} w="200px" h="100%" {...sidebarStyles}>
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
          <DrawerHeader>Chakra-UI</DrawerHeader>
          <DrawerBody>
            <SidebarContent onClick={onClose} />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default Sidebar;
