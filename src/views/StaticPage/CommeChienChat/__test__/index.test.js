import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CommeChienChat from '../index';

jest.mock('@/components/Header', () => {
  return () => <div>Header</div>;
});

jest.mock('@/components/Footer', () => {
  return () => <div>Footer</div>;
});

jest.mock('@/components/Common', () => {
  return {
    Canonical: () => <div>Canonical</div>
  };
});

test('CommeChienChat', async () => {
  await render(<CommeChienChat />);

  const btn_scrollToView = screen.getByTestId('scrollToView');

  fireEvent.click(btn_scrollToView);

  window.innerWidth = 640;

  fireEvent.click(btn_scrollToView);
});
