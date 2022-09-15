import React from 'react';
import ProductCatogeryTitle from '../ProductCatogeryTitle';
import { render, act, screen, fireEvent } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
describe('ProductCatogeryTitle Test', () => {
  test('ProductCatogeryTitle Test', async () => {
    render(
      <IntlProvider>
        <ProductCatogeryTitle />
      </IntlProvider>
    );
  });
});
