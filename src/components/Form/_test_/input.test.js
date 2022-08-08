/*
 * @Author: mingyi.tang@effem.com mingyi.tang@effem.com
 * @Date: 2022-08-08 11:01:36
 * @LastEditors: mingyi.tang@effem.com mingyi.tang@effem.com
 * @LastEditTime: 2022-08-08 16:44:58
 * @FilePath: \shop-front\src\components\Form\_test_\input.test.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RCInput from '../Input/index';

import { IntlProvider } from 'react-intl';
// import locals from 'qmkit/lang/files/en-US';

describe('Form Input Component Test', () => {
  test('input component should act properly', async () => {
    const wrapper = render(
      //   <IntlProvider locale="en" messages={locals}>
      //     <RCInput type="email" tips="error" placeholder="one two" />
      //   </IntlProvider>
      <>
        <RCInput type="email" tips="error" placeholder="one two" />
      </>
    );
    // expect(screen.getByText(email)).toBeInTheDocument();

    // const button = screen.getByTestId('icon');
    // userEvent.click(button);
    const input = screen.getByTestId('inputTest');
    expect(input).toBeInTheDocument();

    fireEvent.change(screen.getByTestId('inputTest'), {
      target: { value: '111@qq.com' }
    });
    fireEvent.change(screen.getByTestId('inputTest'), {
      target: { value: '111.com' }
    });
    await userEvent.type(screen.getByTestId('inputTest'), 'Javascript');
    // const closeBtn = screen.getByLabelText('Close');
    // userEvent.click(closeBtn);
    const saveBtn = screen.getByTestId('inputTest');
    expect(saveBtn).toBeInTheDocument();
    // userEvent.click(saveBtn);
    // expect(input).toHaveValue('');

    // userEvent.type(input, email);

    // await waitFor(() => userEvent.click(saveBtn));

    // userEvent.clear(input);
    // userEvent.type(input, 'aa1@bb.cc');

    // await waitFor(() => userEvent.click(saveBtn));
  });
  test('input component should act properly1', async () => {
    const wrapper = render(
      //   <IntlProvider locale="en" messages={locals}>
      //     <RCInput type="email" tips="error" placeholder="one two" />
      //   </IntlProvider>
      <>
        <RCInput type="text" tips="error" placeholder="one two" />
      </>
    );
    // expect(screen.getByText(email)).toBeInTheDocument();

    // const button = screen.getByTestId('icon');
    // userEvent.click(button);
    const input = screen.getByTestId('inputTest');
    expect(input).toBeInTheDocument();

    fireEvent.change(screen.getByTestId('inputTest'), {
      target: { value: '111@qq.com' }
    });
    fireEvent.change(screen.getByTestId('inputTest'), {
      target: { value: '111.com' }
    });
    await userEvent.type(screen.getByTestId('inputTest'), 'Javascript');
    // const closeBtn = screen.getByLabelText('Close');
    // userEvent.click(closeBtn);
    const saveBtn = screen.getByTestId('inputTest');
    expect(saveBtn).toBeInTheDocument();
    // userEvent.click(saveBtn);
    // expect(input).toHaveValue('');

    // userEvent.type(input, email);

    // await waitFor(() => userEvent.click(saveBtn));

    // userEvent.clear(input);
    // userEvent.type(input, 'aa1@bb.cc');

    // await waitFor(() => userEvent.click(saveBtn));
  });
  test('input component should act properly1', async () => {
    const wrapper = render(
      //   <IntlProvider locale="en" messages={locals}>
      //     <RCInput type="email" tips="error" placeholder="one two" />
      //   </IntlProvider>
      <>
        <RCInput type="" tips="error" placeholder="one two" />
      </>
    );
    // expect(screen.getByText(email)).toBeInTheDocument();

    // const button = screen.getByTestId('icon');
    // userEvent.click(button);
    const input = screen.getByTestId('inputTest');
    expect(input).toBeInTheDocument();

    fireEvent.change(screen.getByTestId('inputTest'), {
      target: { value: '111@qq.com' }
    });
    fireEvent.change(screen.getByTestId('inputTest'), {
      target: { value: '111.com' }
    });
    await userEvent.type(screen.getByTestId('inputTest'), 'Javascript');
    // const closeBtn = screen.getByLabelText('Close');
    // userEvent.click(closeBtn);
    const saveBtn = screen.getByTestId('inputTest');
    expect(saveBtn).toBeInTheDocument();
    // userEvent.click(saveBtn);
    // expect(input).toHaveValue('');

    // userEvent.type(input, email);

    // await waitFor(() => userEvent.click(saveBtn));

    // userEvent.clear(input);
    // userEvent.type(input, 'aa1@bb.cc');

    // await waitFor(() => userEvent.click(saveBtn));
  });
  test('input component should act properly1', async () => {
    const wrapper = render(
      //   <IntlProvider locale="en" messages={locals}>
      //     <RCInput type="email" tips="error" placeholder="one two" />
      //   </IntlProvider>
      <>
        <RCInput type="phone" tips="error" placeholder="one two" />
      </>
    );
    // expect(screen.getByText(email)).toBeInTheDocument();

    // const button = screen.getByTestId('icon');
    // userEvent.click(button);
    const input = screen.getByTestId('inputTest');
    expect(input).toBeInTheDocument();

    fireEvent.change(screen.getByTestId('inputTest'), {
      target: { value: '111@qq.com' }
    });
    fireEvent.change(screen.getByTestId('inputTest'), {
      target: { value: '111.com' }
    });
    await userEvent.type(screen.getByTestId('inputTest'), 'Javascript');
    // const closeBtn = screen.getByLabelText('Close');
    // userEvent.click(closeBtn);
    const saveBtn = screen.getByTestId('inputTest');
    expect(saveBtn).toBeInTheDocument();
    // userEvent.click(saveBtn);
    // expect(input).toHaveValue('');

    // userEvent.type(input, email);

    // await waitFor(() => userEvent.click(saveBtn));

    // userEvent.clear(input);
    // userEvent.type(input, 'aa1@bb.cc');

    // await waitFor(() => userEvent.click(saveBtn));
  });
});
