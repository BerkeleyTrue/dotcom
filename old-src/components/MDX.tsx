import React, { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import {
  Accordion,
  Alert,
  AlertDialog,
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Breadcrumb,
  Button,
  ButtonGroup,
  Code,
  Checkbox,
  CheckboxGroup,
  CloseButton,
  Collapse,
  ControlBox,
  CircularProgress,
  Divider,
  Drawer,
  Editable,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  FormErrorMessage,
  Grid,
  Heading,
  Icon,
  IconButton,
  Image,
  Input,
  InputAddon,
  InputGroup,
  Kbd,
  Link,
  List,
  Stack,
  SimpleGrid,
  Menu,
  Modal,
  NumberInput,
  Portal,
  Popover,
  Progress,
  Radio,
  RadioGroup,
  Select,
  Skeleton,
  Slider,
  Spinner,
  Stat,
  Switch,
  Tabs,
  Tag,
  Text,
  Textarea,
  Tooltip,
  VisuallyHidden,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';

const components = {
  h1: (props: {}) => (
    <Heading
      as="h1"
      fontFamily="heading"
      fontWeight="bold"
      fontSize={{ base: '4xl', md: '5xl' }}
      mb={{ base: 8, md: 10 }}
      {...props}
    />
  ),
  h2: (props: {}) => (
    <Heading
      as="h2"
      fontFamily="heading"
      fontWeight="bold"
      fontSize={{ base: '2xl', md: '3xl' }}
      mt={{ base: 12, md: 14 }}
      mb={{ base: 6, md: 8 }}
      {...props}
    />
  ),
  h3: (props: {}) => (
    <Heading
      as="h3"
      fontFamily="heading"
      fontWeight="semibold"
      fontSize={{ base: 'xl', md: '2xl' }}
      mt={{ base: 8, md: 10 }}
      mb={{ base: 3, md: 4 }}
      {...props}
    />
  ),
  h4: (props: {}) => (
    <Heading
      as="h4"
      fontFamily="heading"
      fontWeight="semibold"
      fontSize={{ base: 'md', md: 'lg' }}
      mt={{ base: 6, md: 8 }}
      mb="2"
      {...props}
    />
  ),
  p: (props: {}) => (
    <Text
      as="p"
      {...props}
      fontFamily="heading"
      fontWeight="semibold"
      fontSize="md"
      lineHeight="6"
      my="6"
    />
  ),
  a: (props: {}) => (
    <Link
      as="a"
      fontWeight="500"
      transitionProperty="common"
      transitionDuration="fast"
      transitionTimingFunction="ease-out"
      cursor="pointer"
      textDecoration="none"
      outline="none"
      color="cyan"
      _hover={{
        textDecoration: 'underline',
      }}
      _focus={{
        boxShadow: 'outline',
      }}
      {...props}
    />
  ),
  ul: (props: {}) => (
    <UnorderedList
      paddingStart="6"
      listStyleType="disc"
      {...props}/>
  ),
  li: (props: {}) => (
    <ListItem
      paddingStart="1"
      my="3"
      {...props}/>
  ),
  pre: (props: {}) => (
    <Box as="pre" bg="dark.800" {...props}/>
  ),
  Accordion,
  Alert,
  AlertDialog,
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Breadcrumb,
  Button,
  ButtonGroup,
  Code,
  Checkbox,
  CheckboxGroup,
  CloseButton,
  Collapse,
  ControlBox,
  CircularProgress,
  Divider,
  Drawer,
  Editable,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  FormErrorMessage,
  Grid,
  Heading,
  Icon,
  IconButton,
  Image,
  Input,
  InputAddon,
  InputGroup,
  Kbd,
  Link,
  List,
  Stack,
  SimpleGrid,
  Menu,
  Modal,
  NumberInput,
  Portal,
  Popover,
  Progress,
  Radio,
  RadioGroup,
  Select,
  Skeleton,
  Slider,
  Spinner,
  Stat,
  Switch,
  Tabs,
  Tag,
  Text,
  Textarea,
  Tooltip,
  VisuallyHidden,
};

export const MDX = ({ source }: { source: string }) => {
  const Content = useMemo(() => getMDXComponent(source), [source]);
  return <Content components={components} />;
};
