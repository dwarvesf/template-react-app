import React from 'react';
import { hot } from 'react-hot-loader';
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

export default hot(module)(App);
