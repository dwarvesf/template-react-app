import React, { Component } from 'react';<% if (i18n) { %>
import { Translate } from 'react-localize-redux';<% } %>

import logo from './logo.svg';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1><% if (i18n) { %>
          <h2 className="App-title">
            <Translate id="greeting" />
          </h2><% } %>
        </header>
        <p className="App-intro text-xl">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default Home;
