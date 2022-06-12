import styled from 'styled-components';
import Image from 'next/image';

import backgroundImage from '../../../assets/images/background.jpg';

const Container = styled(Image)`
  max-height: 100vh;
  width: 100vw;

  object-fit: cover;

  opacity: 0.2;
  mix-blend-mode: color-burn;
  filter: grayscale(50%) blur(2px);

  @media screen and (min-height: ${backgroundImage.height}px) {
    max-height: 100vh;
    height: 100vh;
  }

  @media screen and(-webkit-min-device-pixel-ratio:0) {
    & {
      opacity: 0.15;
    }
  }
`;

const PageBackgroundImage = () => <Container src={backgroundImage} layout={'raw'} />;

export default PageBackgroundImage;
