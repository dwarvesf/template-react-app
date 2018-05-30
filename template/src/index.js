import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';

const render = Component => {
  ReactDOM.render(<Component />, document.getElementById('root'));
};

render(App);
