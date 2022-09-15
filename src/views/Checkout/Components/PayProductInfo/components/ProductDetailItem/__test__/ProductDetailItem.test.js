import React from 'react';
import ProductDetailItem from '../ProductDetailItem';
import { render, act, screen, fireEvent } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
describe('ProductDetailItem Test', () => {
  test('ProductDetailItem Test', async () => {
    const el = {
      goodsInfoFlag: 2,
      goodsName: '',
      goods: {
        goodsName: ''
      },
      appointStartTime: ''
    };
    render(
      <IntlProvider>
        <ProductDetailItem
          el={Object.assign({}, el, {
            displayGoodsName: (
              <FormattedMessage id="subscription.personalized" />
            )
          })}
          customContentDetail={null}
        />
      </IntlProvider>
    );
  });
});
