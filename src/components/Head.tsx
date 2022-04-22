import NextHead from 'next/head';
import { ReactNode } from 'react';

interface Props {
  subTitle: string;
  children: ReactNode;
}
export const Head = ({ subTitle, children }: Props) => (
  <NextHead>
    <title>berks//{subTitle}</title>
    <link href="/images/favicon.ico" rel="shortcut icon" />
    {children}
  </NextHead>
);
