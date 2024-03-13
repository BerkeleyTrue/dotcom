import { PropsWithChildren } from 'react';
import NextLink from 'next/link';
import { Link as CLink } from '@chakra-ui/react';

interface Props {
  href: string;
}
export const MainLink = ({ children, href }: PropsWithChildren<Props>) => (
  <NextLink href={href} passHref>
    <CLink>{children}</CLink>
  </NextLink>
);

export { CLink, NextLink };
