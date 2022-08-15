import React from 'react';
import ProductCatogeryItemBox from '../ProductCatogeryItemBox';
import { render, act, screen, fireEvent } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
describe('ProductCatogeryItemBox Test', () => {
  test('ProductCatogeryItemBox Test', async () => {
    render(
      <IntlProvider>
        <ProductCatogeryItemBox />
      </IntlProvider>
    );
  });
});
