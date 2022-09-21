import React from 'react';
import ResetFailure from '../../ResetPassword/index';
import { render, act, screen, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
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
      // console.log('kkk', kkk)
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

jest.mock('@/components/Footer', () => {
  return () => <div>Footer</div>;
});

const propsData = {
  history: {
    push: jest.fn()
  }
};

describe('Register Index Test', () => {
  test('Register test1 nl', async () => {
    const history = createMemoryHistory();
    window.__.env.REACT_APP_COUNTRY = 'ru';
    const { debug } = await render(
      // <Provider>
      <Router history={{ ...history }}>
        <ResetFailure {...propsData} />
      </Router>
      // </Provider>
    );
    debug();
  });
});
