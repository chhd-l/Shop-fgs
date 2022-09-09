import React from 'react';
import RouteFilterHook from '../RouteFilterHook';
import stores from '@/store';
import renderWithProvider from '@/jest/renderWithProvider';
jest.mock('react-intl-phraseapp', () => {
  return {
    injectIntl: () => {},
    FormattedMessage: () => <div>phraseapp</div>
  };
});
const hh = {
  htmlStr: '',
  callback: () => {}
};
jest.mock('@/utils/utils', () => {
  return {
    renderScriptOrLinkHtmlStr: ({ htmlStr = '', callback = () => {} }) => {
      return '11';
    }
  };
});

const configStore = {
  info: {
    cookieBannerConfigInfo: '',
    marsFooter: {
      marsFooterHtml: 1
    }
  }
};
describe('RouteFilterHook Test', () => {
  test('RouteFilterHook Test1', async () => {
    // stores.checkoutStore.setEarnedPoint(100);
    renderWithProvider(<RouteFilterHook configStore={configStore} />, {
      stores
    });
  });
});
