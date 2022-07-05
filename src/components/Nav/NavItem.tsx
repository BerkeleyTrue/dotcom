import { ComponentProps, PropsWithChildren, ReactNode } from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';
import NextLink from 'next/link';
import { O } from 'ts-toolbelt';

import { List } from '../Lisp/List';
import { Func } from '../Lisp/Func';

type NavItemProps = PropsWithChildren<
  O.Merge<{ href: string; icon?: ReactNode }, ButtonProps>
>;

export const NavItem = ({ icon, children, href, ...rest }: NavItemProps) => {
  return (
    <NextLink href='/' passHref>
      <Button
        bg='darker.800'
        color='gray.400'
        display='flex'
        fontWeight='semibold'
        justifyContent='left'
        transition='.15s ease'
        pl='16'
        w='100%'
        _hover={{ bg: 'gray.900', color: 'gray.200' }}
        {...rest}
      >
        <List>
          <Func>{'=<<'}</Func>&nbsp;{children}
        </List>
      </Button>
    </NextLink>
  );
};
