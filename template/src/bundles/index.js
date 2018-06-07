import { composeBundles, createUrlBundle, createCacheBundle } from 'redux-bundler';

import routes from './routes';
import extraArgs from './extra-args';
import cache from '@/utils/cache';

export default composeBundles(
  createUrlBundle(),
  routes,
  createCacheBundle(cache.set),
  extraArgs,
);
