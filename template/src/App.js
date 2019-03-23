import React from 'react';
import { connect } from 'redux-bundler-react';
import navHelper from 'internal-nav-helper';<% if (cljs) { %>
import { MyComponent } from 'shadow-cljs/app.core';<% } %>

const navItems = [
  { url: '/', label: 'Home' },
  { url: '/about', label: 'About' },
  { url: '/xyz', label: 'xyz' },
];

const App = ({ doUpdateUrl, pathname, route: Page }) => {
  return (
    <main onClick={navHelper(doUpdateUrl)}>
      <nav className="p-3 mb-4">
        <ul className="list-reset text-center">
          {navItems.map(item => {
            return (
              <li key={item.url} className="inline-block">
                <a
                  href={item.url}
                  className={`no-underline inline-block mr-1 p-2 text-blue hover:text-blue-darker ${
                    item.url === pathname ? 'bg-blue-lighter' : ''
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <% if (cljs) { %><MyComponent className="py-8 text-center" /><% } %>
      <Page />
    </main>
  );
};

export default connect(
  'selectRoute',
  'selectPathname',
  'doUpdateUrl',
  App,
);
