import { createElement } from 'react';
import { ReduxBundlerProvider, useConnect } from 'redux-bundler-hook';

export { ReduxBundlerProvider as Provider, useConnect };
export * from 'redux-bundler-async-resources-hooks';

export const connect = (...args) => {
  const Comp = args.slice(-1)[0];
  const selectors = args.length > 1 ? args.slice(0, -1) : [];
  const Connect = props => {
    return createElement(Comp, { ...props, ...useConnect(...selectors) });
  };
  Connect.displayName = Comp.displayName || Comp.name;
  return Connect;
};

export const Connect = ({ children, to = [] }) => {
  return children(useConnect(...to));
};
