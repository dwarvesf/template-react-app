import { composeBundles, createUrlBundle, createCacheBundle } from 'redux-bundler';

import cache from '@/utils/cache';
import extraArgs from './extra-args';
import routes from './routes';<% if (i18n) { %>
import localize from './localize';<% } %>

export default composeBundles(
  createCacheBundle({ cacheFn: cache.set }),
  createUrlBundle(),
  routes,
  extraArgs,<% if (i18n) { %>
  localize,<% } %>
);
