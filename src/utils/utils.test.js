import { flat } from './flat';

// jest.mock("@/api",()=>{
//     return {
//         __esModule: true,
//         getSeoConfig: ()=>{},
//         queryHeaderNavigations:()=>{}
//     }
// })

test('flat', () => {
  expect(flat([''])).not.toBe('');
  expect(flat([[123]])).not.toBe('');
});
