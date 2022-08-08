import CartFRBreeder from '../index.jsx';
import { render } from '@testing-library/react';
console.info(' jest.mock', jest.mock);
// jest.mock('../Cart', () => () => <div></div>);
describe('CartFRBreeder', () => {
  it('render test', async () => {
    const wrapper = render(<CartFRBreeder />);
  });
});
