import React from 'react';
import EditCartBtn from '../EditCartBtn';
import { render, act, screen, fireEvent } from '@testing-library/react';

describe('EditCartBtn Test', () => {
  test('EditCartBtn Test', async () => {
    render(<EditCartBtn />);
  });
});
