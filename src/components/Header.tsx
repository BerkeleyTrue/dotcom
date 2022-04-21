import NextLink from 'next/link';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Button, Container, Flex } from '@chakra-ui/react';

interface Props {
  showButton: boolean;
  onButtonPress: () => any;
  h: string | number;
}

export const Header = ({ showButton, onButtonPress, h }: Props) => {
  return (
    <Box h={h} bg="darker.700">
      <Container px={{ base: '4', md: '1' }} h="100%">
        <Flex h="100%" alignItems="center">
          {showButton && <HamburgerIcon onClick={onButtonPress} mr="4" />}
          <NextLink href="/" passHref>
            <Button h="100%">Home</Button>
          </NextLink>
        </Flex>
      </Container>
    </Box>
  );
};
