import React from 'react';
import Register from '../index';
import { render, act, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import stores from '@/store';
import { Provider } from 'mobx-react';
import { IntlProvider } from 'react-intl';
import en_US from '@/lang/en_US';

// jest.mock('react-router', () => {
//   return {
//     withRouter: (e) => e
//   };
// });

jest.mock('react-intl', () => {
  return {
    FormattedMessage: ({ id }) => <span>{id}</span>,
    injectIntl: (e) => e,
    intl: (e) => e
  };
});

// jest.mock('../webapi', () => {
//   const originalModule = jest.requireActual('../webapi');
//   return {
//     __esModule: true,
//     ...originalModule,
//     redirectionUrlDelByUrl: jest.fn(
//       ({ code, redirectionUrl, status, url }) =>
//         new Promise((resolve) =>
//           resolve({
//             res: {
//               code: 'K-000000',
//               defaultLocalDateTime: '2022-08-30 11:34:42.385',
//               message: 'operate successfully '
//             }
//           })
//         )
//     )
//   };
// });

// jest.mock('@/store', () => {
//   return {
//     checkoutStore: {
//       cartData: [
//         {
//           goodsInfoId: '',
//           goodsNum: '',
//           goodsInfoFlag: '',
//           periodTypeId: '',
//           invalid: false,
//           recommendationInfos: [],
//           recommendationId: '',
//           recommendationName: '',
//           goodsCategory: '',
//           petsId: '',
//           questionParams: '',
//           prefixFn: '',
//           sizeList: [{ selected: true }]
//         }
//       ],
//       removeCartData: jest.fn()
//     },
//     clinicStore: {},
//     paymentStore: {}
//   };
// });

describe('Register Index Test', () => {
  test('Register test1', async () => {
    const history = createMemoryHistory();

    await act(async () => {
      const { debug } = render(
        <Provider {...stores}>
          {/* <IntlProvider
            locale="en"
            messages={en_US}
            defaultLocale={'en'}
          > */}
          <Router history={{ ...history }}>
            <Register
              match={{ url: '' }}
              location={{ key: 'sdsad' }}
              intl={{
                messages: {
                  'register.welcomeToRoyalCanin': 'sdhdhd'
                }
              }}
            />
          </Router>
          {/* </IntlProvider> */}
        </Provider>
      );
      // debug();
      // const searchInput = screen.getByTestId('searchUrl');
      // await userEvent.type(searchInput, '2');
      // const searchBtn = screen.getByTestId('searchBtn');
      // await userEvent.click(searchBtn);
      // const switchBtn = screen.getAllByRole('switch')[0];
      // await userEvent.click(switchBtn);
      // await userEvent.click(switchBtn);
      // const iconDelete = screen.getAllByTestId('iconDelete')[0];
      // await userEvent.click(iconDelete);
      // const Confirm = screen.getByText('Confirm');
      // await userEvent.click(Confirm);
    });
  });
});
