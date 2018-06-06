import loadable from '@/utils/loadable';

const Home = loadable(() => import('@/pages/Home'));
const NotFound = loadable(() => import('@/pages/NotFound'));

export default () => {
  return [
    {
      name: 'Home',
      path: '',
      response() {
        return {
          body: Home,
        };
      },
    },
    {
      name: 'NotFound',
      path: '(.*)',
      response() {
        return {
          body: NotFound,
        };
      },
    },
  ];
};
