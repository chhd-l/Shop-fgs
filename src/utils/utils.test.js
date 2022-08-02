import { flat } from './utils';

jest.mock('@/api', () => {
  return {
    getSeoConfig: () => {},
    queryHeaderNavigations: () => {}
  };
});

test.only('flat', () => {
  expect(flat([''])).not.toBe('');
  expect(flat([[123]])).not.toBe('');
});
