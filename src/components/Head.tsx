import NextHead from 'next/head';

interface Props {
  subTitle: string;
}
export const Head = ({ subTitle }: Props) => (
  <NextHead>
    <title>

      berks//{subTitle}
    </title>
      <link href='/images/favicon.ico' rel='shortcut icon' />
  </NextHead>
)
