import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'redux-bundler-react';<% if (i18n) { %>
import { LocalizeProvider } from 'react-localize-redux';<% } %>

import './styles';
import App from './App';
import getStore from './bundles';
import cache from './utils/cache';<% if (pwa) { %>
import registerSW from './registerSW';<% } %>

<% if (cljs) { %>if (process.env.NODE_ENV !== 'production') {
  require('shadow-cljs/shadow.cljs.devtools.client.browser');
}<% } %>

const render = ({ store }) => {
  let app = <App />;<% if (i18n) { %>
  app = <LocalizeProvider store={store}>{app}</LocalizeProvider>;<% } %>
  ReactDOM.render(
    <Provider store={store}>
      {app}
    </Provider>,
    document.getElementById('app'),
  );
};

// this is entirely optional, but here we here we try to pull starting data
// from our local cache. We're using a util called money-clip here that
// will only return if the version number is a match and it's not
// older than the specified maxAge.
cache.getAll().then(initialData => {
  if (initialData) {
    console.log('starting with locally cache data:', initialData);
  }
  const renderApp = () => render({ store: getStore(initialData) });<% if (cljs) { %>
  // exporting re-rendering function for live-reload cljs
  window.renderApp = renderApp;<% } %>
  renderApp();
});

<% if (pwa) { %>if (process.env.NODE_ENV === 'production') {
  registerSW();
}<% } %>
