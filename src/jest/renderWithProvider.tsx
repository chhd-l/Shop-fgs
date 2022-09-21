import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import oktaConfig from '../oktaConfig';
import { render, RenderOptions } from '@testing-library/react';
import en_US from '@/lang/en_US';
import { Provider } from 'mobx-react';
import { IntlProvider } from 'react-intl';
import Security from './Provider/Security';
jest.mock('react-intl-phraseapp', () => {
  return {
    injectIntl: () => { }
  };
});
const renderWithProvider = (
  ui: React.ReactElement,
  {
    stores,
    ...options
  }: Omit<RenderOptions, 'queries'> & {
    stores?: any;
  }
) => {
  const renderProvider: React.ComponentType = ({ children }: any) => {
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
