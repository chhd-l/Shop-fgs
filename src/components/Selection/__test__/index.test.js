import React from 'react';
import Selection from '../index';
import { render, act, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import stores from '@/store';
import { Provider } from 'mobx-react';

jest.mock('react-intl', () => {
  return {
    FormattedMessage: ({ id, values }) => {
      let kkk = null;
      if (values && values?.val && values?.val?.props) {
        kkk = (
          <div
            data-testid={values?.val?.props['data-testid'] ?? ''}
            onClick={values?.val.props.onClick}
          ></div>
        );
      }
      return (
        <span>
          {id}
          {kkk}
        </span>
      );
    },
    injectIntl: (e) => e,
    intl: (e) => e,
    createIntlCache: (e) => e,
    createIntl: (e) => e
  };
});

// jest.mock('@/api/login', () => {
//   const originalModule = jest.requireActual('@/api/login');
//   return {
//     __esModule: true,
//     ...originalModule,
//     forgetPassworSendEmail: jest.fn(
//       ({ customerAccount }) =>
//         new Promise((resolve, reject) => {
//           if (customerAccount === 'dsada@dsad.com') {
//             return resolve({
//               code: 'K-000000',
//               message: '操作に成功しました'
//             });
//           } else {
//             reject({
//               code: 'K-000001',
//               message: '操作に成功しました'
//             });
//           }
//         })
//     )
//   };
// });
const propsData = {
  selectedItemData: { value: 'ssss' },
  selectedItemChange: jest.fn(),
  choicesInput: true,
  optionList: [
    {
      name: 'aaa',
      value: 'ssss',
      name2: 'aaa',
      isEmpty: true,
      disabled: false
    },
    {
      name: 'bbb',
      value: 'ssss',
      name2: 'bbb',
      isEmpty: false,
      disabled: false
    }
  ],
  placeholder: 'hhhhhh',
  customInnerStyle: {
    color: '#fff !important',
    background: '#fff'
  },
  emptyFirstItem: true,
  match: { url: '' },
  location: { key: 'sdsad' },
  history: {
    push: jest.fn()
  },
  intl: {
    messages: {
      'register.welcomeToRoyalCanin': 'sdhdhd',
      systemError: 'systemError'
    }
  },
  selectedItemChange: jest.fn(),
  comfirmModal: 'dsada',
  slotTimeChanged: true
};

describe('Selection Index Test', () => {
  window.dataLayer = [];
  window.__.env.REACT_APP_COUNTRY === 'ru';
  test('Selection test1', async () => {
    const history = createMemoryHistory();
    // window.__.env.REACT_APP_COUNTRY = 'nl';

    const { debug, container } = await render(
      <Provider {...stores}>
        <Router history={{ ...history }}>
          <Selection {...propsData} />
        </Router>
      </Provider>
    );
    debug();
    const new_password = screen.getByTestId('new-password');
    await userEvent.click(new_password);
    await userEvent.type(new_password, 'aaa');
    const aaa = screen.getByTestId('aaa');
    await userEvent.click(aaa);
    // const bbb = screen.getByTestId('bbb');
  });

  test('Selection test2', async () => {
    const history = createMemoryHistory();
    // window.__.env.REACT_APP_COUNTRY = 'nl';
    const data = {
      ...propsData,
      slotTimeChanged: false,
      comfirmModal: false
    };
    const { debug, container } = await render(
      <Provider {...stores}>
        <Router history={{ ...history }}>
          <Selection {...data} />
        </Router>
      </Provider>
    );
    debug();
    const new_password = screen.getByTestId('new-password');
    await userEvent.click(new_password);
    await userEvent.type(new_password, 'aaa');
    const aaa = screen.getByTestId('aaa');
    await userEvent.click(aaa);
    // const bbb = screen.getByTestId('bbb');
  });

  test('Selection test1', async () => {
    const history = createMemoryHistory();
    // window.__.env.REACT_APP_COUNTRY = 'nl';
    const data = {
      ...propsData,
      optionList: [
        {
          name: 'sdada',
          value: 'ssss',
          name2: null,
          isEmpty: false
        },
        {
          name: 'sdada',
          value: 'ssss',
          name2: null,
          isEmpty: false
        }
      ],
      choicesInput: false
    };
    const { debug, container } = await render(
      <Provider {...stores}>
        <Router history={{ ...history }}>
          <Selection {...data} />
        </Router>
      </Provider>
    );

    const select_options_item = screen.getByTestId('select_options_item');
    await userEvent.click(select_options_item);
  });
});
