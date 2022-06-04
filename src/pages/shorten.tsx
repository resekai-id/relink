import {NextPage} from 'next';
import {Fragment} from 'react';

// import ShortenForm from '../containers/ShortenForm';

export interface ShortenPageProps {
  hCaptchaSiteKey: string;
}

const ShortenPage: NextPage<ShortenPageProps> = ({hCaptchaSiteKey}) => (
  <Fragment>{/* <ShortenForm hCaptchaSiteKey={hCaptchaSiteKey} /> */}</Fragment>
);

export const getStaticProps = () => ({props: {hCaptchaSiteKey: process.env.HCAPTCHA_SITE_KEY}});

export default ShortenPage;
