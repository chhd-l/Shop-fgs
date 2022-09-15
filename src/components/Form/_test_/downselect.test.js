/*
 * @Author: mingyi.tang@effem.com mingyi.tang@effem.com
 * @Date: 2022-08-08 11:01:36
 * @LastEditors: mingyi.tang@effem.com mingyi.tang@effem.com
 * @LastEditTime: 2022-08-08 17:07:41
 * @FilePath: \shop-front\src\components\Form\_test_\input.test.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RCDownselect from '../Downselect/index';

import { IntlProvider } from 'react-intl';
// import locals from 'qmkit/lang/files/en-US';

describe('Form Input Component Test', () => {
  test('input component should act properly', async () => {
    const wrapper = render(
      <>
        <RCDownselect type="text" tips="error" placeholder="one two" />
      </>
    );
    const downSelect = screen.getByTestId('downSelect');
    expect(downSelect).toBeInTheDocument();
    fireEvent.blur(downSelect, 'Javascript');
    await userEvent.type(downSelect, 'Javascript');
  });
});
