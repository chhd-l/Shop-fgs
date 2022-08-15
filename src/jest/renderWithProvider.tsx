import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import en_US from '@/lang/en_US';
import { Provider } from 'mobx-react';
import { IntlProvider } from 'react-intl';
const renderWithProvider = (
  ui: React.ReactElement,
  {
    stores,
    ...options
  }: Omit<RenderOptions, 'queries'> & {
    stores?: any;
  }
) => {
  const renderProvider: React.ComponentType = ({ children }) => {
    return (
      <Provider {...stores}>
        <IntlProvider locale="en" messages={en_US} defaultLocale={'en'}>
          {children}
        </IntlProvider>
      </Provider>
    );
  };
  return render(ui, { wrapper: renderProvider, ...options });
};
export default renderWithProvider;
