import React from 'react';
import '@/assets/css/global.css'
import Router from './router'
// import en_US from '@/lang/en_US'
import es_ES from '@/lang/en_US'
import { IntlProvider } from 'react-intl';

function App () {
  return (
    <IntlProvider locale="en" messages={es_ES}>
      <Router />
    </IntlProvider>
  );
}

export default App;
