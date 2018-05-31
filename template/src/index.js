import React from 'react';
import ReactDOM from 'react-dom';

import './styles';
import App from './App';<% if(routing) { %>
import { setupRouter } from './router';

const makeRender = () => ({ router }) => {
  ReactDOM.render(<App router={router} />, document.getElementById('app'));
};

const router = setupRouter();
router.respond(makeRender());
<% } else { %>
const render = Component => {
  ReactDOM.render(<Component />, document.getElementById('app'));
};

render(App);
<% } %>
