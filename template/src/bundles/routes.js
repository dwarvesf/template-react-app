import { createRouteBundle, createSelector } from 'redux-bundler';
import loadable from '@/utils/loadable';

const bundle = createRouteBundle({
  '/': {
    name: 'Home',
    C: loadable(() => import('@/pages/Home')),
  },
  '/about': {
    name: 'About',
    C: loadable(() => import('@/pages/About')),
  },

  '*': {
    name:'NotFound',
    C: loadable(() => import('@/pages/NotFound')),
  },
});

bundle.selectRouteName = createSelector(
  'selectRoute',
  route => route.name,
);

bundle.selectRouteComponent = createSelector(
  'selectRoute',
  route => {
    return route.C || (() => null);
  },
);

export default bundle;
