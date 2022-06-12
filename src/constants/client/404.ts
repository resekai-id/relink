import trump404Image from '../../assets/images/404/Trump.png';
import jamesCharles404Image from '../../assets/images/404/JamesCharles.png';
import kimK404Image from '../../assets/images/404/KimK.png';

export type NotFoundSubject = typeof notFoundSubjects[number];

const notFoundSubjects = [
  {
    label: 'Trump',
    image: trump404Image,
    video: 'https://youtu.be/wDYNVH0U3cs',
  },
  {
    label: 'James Charles',
    image: jamesCharles404Image,
    video: 'https://youtu.be/2hDsBRhHxNA',
  },
  {
    label: 'Kim K',
    image: kimK404Image,
    video: 'https://youtu.be/_w6pihyDK3U',
  },
];

export default notFoundSubjects;
