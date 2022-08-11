import {FC, useState} from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';

import type {NotFoundHeroProps} from '.';

const Container = styled.div`
  max-width: min(21.37em, 100%);
  width: 100%;
  height: 18.75em;

  margin-left: -0.375em;
`;

const NotFoundImage: FC<NotFoundHeroProps> = ({subject}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Container>
      {subject.image && subject.label ? (
        <Image
          src={subject.image}
          alt={`${subject.label} is saying you're lost - 404.`}
          layout="responsive"
          onLoadingComplete={() => setIsImageLoaded(true)}
          style={{display: isImageLoaded ? 'initial' : 'none'}}
          priority={true}
        />
      ) : (
        <Skeleton
          width={subject.image?.width ? `${subject.image.width}px` : 'min(21.37em, 100%)'}
          height={subject.image?.height ? `${subject.image.height}px` : '18.75em'}
          borderRadius={'0.5em'}
          style={{
            ...(isImageLoaded ? {display: 'none'} : {}),

            transition: 'all 0.2s ease-in-out',
            marginLeft: '0.375em',
          }}
        />
      )}
    </Container>
  );
};

export default NotFoundImage;
