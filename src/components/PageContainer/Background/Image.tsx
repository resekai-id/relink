import styled from 'styled-components';
import Image from 'next/image';

import backgroundImage from '../../../assets/images/background.jpg';

const BackgroundImageContainer = styled(Image)`
  max-height: 100vh;
  width: 100vw;

  object-fit: cover;

  opacity: 0.15;
  mix-blend-mode: color-burn;
`;

const BackgroundImage = () => <BackgroundImageContainer src={backgroundImage} layout={'raw'} />;

export default BackgroundImage;
