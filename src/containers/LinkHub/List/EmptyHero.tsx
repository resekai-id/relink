import styled from 'styled-components';
import Image from 'next/image';

import EmptyDecorationImage from '../../../assets/images/SpiralDecoration.png';

import ThreeText, {ThreeTextType} from '../../../components/ThreeText';

const EmptyDecoration = styled(Image)`
  width: 10em;
  height: auto;
`;

const Container = styled.div`
  user-select: none;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5em;

  flex: none;
  flex-grow: 1;
`;

const LinkListEmptyHero = () => (
  <Container>
    <EmptyDecoration src={EmptyDecorationImage} layout={'raw'} priority={true} />
    <ThreeText
      type={ThreeTextType.Secondary}
      title="Your shortened links will appear here."
      body="so. shorten a link, why don’t ya?"
      punchline="I still remember my first time like it was-"
    />
  </Container>
);

export default LinkListEmptyHero;
