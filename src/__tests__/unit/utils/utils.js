import { flat } from '@/utils/utils';

jest.mock('@/store', () => {
  return {};
});

it('flat', () => {
  expect(flat([''])).not.toBe('');
  expect(flat([[123]])).not.toBe('');
});
