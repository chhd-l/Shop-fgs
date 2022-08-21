import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import oktaConfig from '../oktaConfig';
import { render, RenderOptions } from '@testing-library/react';
import en_US from '@/lang/en_US';
import { Provider } from 'mobx-react';
import { IntlProvider } from 'react-intl';
import Security from './Provider/Security';
import { toRelativeUrl } from '@okta/okta-auth-js';
import { TestOktaAuthProvider } from './Provider';

const renderWithProvider = (
  ui: React.ReactElement,
  {
    stores,
    ...options
  }: Omit<RenderOptions, 'queries'> & {
    stores?: any;
  }
) => {
  const history = createMemoryHistory();

  const renderProvider: React.ComponentType = ({ children }) => {
    return (
      <Provider {...stores}>
        <IntlProvider locale="en" messages={en_US} defaultLocale={'en'}>
          <Security>
            <MemoryRouter>{children}</MemoryRouter>
          </Security>
        </IntlProvider>
      </Provider>
    );
  };
  return render(ui, { wrapper: renderProvider, ...options });
};
export default renderWithProvider;
