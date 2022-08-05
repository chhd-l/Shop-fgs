import { flat } from '@/utils/utils';

jest.mock('@/store', () => {
  return {};
});

it('flat', () => {
  expect(flat([''])).not.toBe('');
  expect(flat([[12345]])).not.toBe('');
});
