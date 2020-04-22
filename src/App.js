import React from 'react';
import '@/assets/css/global.css'
import Router from './router'
import en_US from '@/lang/en_US'
import { IntlProvider } from 'react-intl';

function App () {
  return (
    <IntlProvider locale="en" messages={en_US}>
      <Router />
    </IntlProvider>
  );
}

export default App;
