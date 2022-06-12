import {FC, useState} from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';

import type {NotFoundHeroProps} from '.';

const Container = styled.div`
  min-height: 18.75em;
  max-width: 100vw;

  margin-left: -0.375em;

  width: 21.37em;
`;

const NotFoundImage: FC<NotFoundHeroProps> = ({subject}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Container>
      {subject.image && subject.label && (
        <Image
          src={subject.image}
          alt={`${subject.label} is saying you're lost.`}
          layout="responsive"
          onLoadingComplete={() => setIsImageLoaded(true)}
          style={{display: isImageLoaded ? 'initial' : 'none'}}
        />
      )}
      {!isImageLoaded && (
        <Skeleton
          height={subject.image?.height ? `${subject.image.height}px` : '18.75em'}
          borderRadius={'0.5em'}
          style={{
            display: isImageLoaded ? 'none' : 'intial',
            marginLeft: '0.375em',
            position: 'absolute',
            top: '0',
            transition: 'all 0.2s ease-in-out',
          }}
        />
      )}
    </Container>
  );
};

export default NotFoundImage;
