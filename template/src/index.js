import React from 'react';
import ReactDOM from 'react-dom';

import './styles';
import App from './App';
import { setupRouter } from './router';

const makeRender = () => ({ router }) => {
  ReactDOM.render(<App router={router} />, document.getElementById('app'));
};

const router = setupRouter();
router.respond(makeRender());
