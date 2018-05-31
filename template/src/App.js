import React from 'react';
import { hot } from 'react-hot-loader';
<% if(routing) { %>
import { CuriProvider } from '@curi/react';

const App = ({ router }) => {
  return (
    <CuriProvider router={router}>
      {({ response, router }) => {
        return (
          <main>
            <response.body
              params={response.params}
              location={response.location}
              router={router}
            />
          </main>
        );
      }}
    </CuriProvider>
  );
};
<% } else { %>
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <p className="App-intro text-xl">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
    </div>
  );
};
<% } %>
export default hot(module)(App);
