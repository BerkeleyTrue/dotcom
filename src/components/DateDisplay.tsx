import { FC } from 'react';
import { VisuallyHidden, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';

interface Props {
  date: string;
}

export const DateDisplay: FC<Props> = ({ date }) => {
  return (
    <dl>
      <VisuallyHidden>
        <dt>Published On</dt>
      </VisuallyHidden>
      <dd>
        <time dateTime={date} />{' '}
        <Text fontSize='md' fontWeight='medium' lineHeight='6' color='cyan'>
          {dayjs(date).format('MMM D, YYYY')}
        </Text>
      </dd>
    </dl>
  );
};
