import NextHead from 'next/head';

interface Props {
  subTitle: string;
}
export const Head = ({ subTitle }: Props) => (
  <NextHead>
    <title>
      berks//{subTitle}
    </title>
  </NextHead>
)
