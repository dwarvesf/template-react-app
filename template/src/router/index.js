import Browser from '@hickory/browser';
import curi from '@curi/core';
import createActiveAddon from '@curi/route-active';

import getRoutes from './routes';

const history = Browser();

export const setupRouter = () => {
  return curi(history, getRoutes(), {
    route: [createActiveAddon()],
  });
};
