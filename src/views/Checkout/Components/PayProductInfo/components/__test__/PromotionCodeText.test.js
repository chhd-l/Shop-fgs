import React from 'react';
import PromotionCodeText from '../promotionCodeText';
import { render, act, screen, fireEvent } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
describe('PromotionCodeText Test', () => {
  test('PromotionCodeText Test', async () => {
    const el = { marketingName: '00.00' };
    render(
      <IntlProvider>
        <PromotionCodeText el={el} />
      </IntlProvider>
    );
    const promotionCodeText = screen.getByTestId('promotionCodeText');
  });
});
