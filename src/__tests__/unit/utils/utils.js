// global.window = Object.create(window);

//   Object.defineProperty(window, "__", {
//     value: {
//       sessionItemRoyal: ''
//     },
//   });
import { flat } from '@/utils/utils';

test('flat', () => {
  expect(flat([''])).not.toBe('');
  expect(flat([[123]])).not.toBe('');
});
