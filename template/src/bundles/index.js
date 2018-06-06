import { composeBundles, createCacheBundle } from 'redux-bundler';

import routes from './routes';
import extraArgs from './extra-args';
import cache from '@/utils/cache';

export default composeBundles(routes, createCacheBundle(cache.set), extraArgs);
