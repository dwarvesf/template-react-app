import React from 'react';
import { getNavHelper } from 'internal-nav-helper';
import { useConnect } from '@/lib/redux-bundler-react';

const navItems = [
  { url: '/', label: 'Home' },
  { url: '/about', label: 'About' },
  { url: '/xyz', label: 'xyz' },
];

const App = () => {
  const { doUpdateUrl, pathname, routeComponent: Page } = useConnect(
    'selectRouteComponent',
    'selectPathname',
    'doUpdateUrl',
  );

  return (
    <main onClick={getNavHelper(doUpdateUrl)}>
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
      <Page />
    </main>
  );
};

export default App
