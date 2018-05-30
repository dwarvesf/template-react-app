import React from 'react';
import ReactDOM from 'react-dom';

import './styles';
import App from './App';

const render = Component => {
  ReactDOM.render(<Component />, document.getElementById('app'));
};

render(App);
