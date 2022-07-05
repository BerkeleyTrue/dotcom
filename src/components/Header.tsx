import NextLink from 'next/link';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Button, Container, Flex } from '@chakra-ui/react';

interface Props {
  onButtonPress: () => any;
  h: string | number;
}

export const Header = ({ onButtonPress, h }: Props) => {
  return (
    <Box h={h} bg='darker.700'>
      <Container px={{ base: '4', md: '1' }} h='100%'>
        <Flex h='100%' alignItems='center'>
          <HamburgerIcon
            onClick={onButtonPress}
            mr='4'
            display={{ base: 'unset', md: 'none' }}
          />
          <NextLink href='/' passHref>
            <Button h='100%' bg='darker.700'>
              Home
            </Button>
          </NextLink>
        </Flex>
      </Container>
    </Box>
  );
};
