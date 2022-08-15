import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ConsentToolTip from '../index';

import { IntlProvider } from 'react-intl';

describe('Test', () => {
  test('consenttoolTest', async () => {
    const wrapper = render(<ConsentToolTip />);
    const consentTest = screen.getByTestId('consentTest');
    fireEvent.mouseEnter(consentTest);
    fireEvent.mouseLeave(consentTest);
  });
});
