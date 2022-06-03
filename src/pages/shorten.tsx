import {NextPage} from 'next';
import {Fragment} from 'react';

import ShortenForm from '../containers/ShortenForm';
import LinkList from '../containers/LinkList';

export interface ShortenPageProps {
  hCaptchaSiteKey: string;
}

const ShortenPage: NextPage<ShortenPageProps> = ({hCaptchaSiteKey}) => (
  <Fragment>
    <ShortenForm hCaptchaSiteKey={hCaptchaSiteKey} />
    <LinkList />
  </Fragment>
);

export const getStaticProps = () => ({props: {hCaptchaSiteKey: process.env.HCAPTCHA_SITE_KEY}});

export default ShortenPage;
