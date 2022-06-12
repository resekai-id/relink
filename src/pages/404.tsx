import {NextPage} from 'next';
import {useEffect, useState} from 'react';

import notFoundSubjects, {NotFoundSubject} from '../constants/client/404';

import NotFoundHero from '../components/NotFoundHero';

const NotFoundPage: NextPage = () => {
  const [notFoundSubject, setNotFoundSubject] = useState<
    NotFoundSubject | Partial<NotFoundSubject>
  >({});

  useEffect(
    () => setNotFoundSubject(notFoundSubjects[Math.floor(Math.random() * notFoundSubjects.length)]),
    []
  );

  return <NotFoundHero subject={notFoundSubject} />;
};

export default NotFoundPage;
