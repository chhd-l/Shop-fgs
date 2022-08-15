import React from 'react';
import ProductDetailItem from '../ProductDetailItem';
import { render, act, screen, fireEvent } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
describe('ProductDetailItem Test', () => {
  test('ProductDetailItem Test', async () => {
    render(
      <IntlProvider>
        <ProductDetailItem />
      </IntlProvider>
    );
  });
});
