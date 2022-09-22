import React from 'react';
import ResetFailure from '../index';
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

const propsData = {
  history: {
    push: jest.fn()
  }
};

describe('ResetFailure Index Test', () => {
  test('ResetFailure test1 nl', async () => {
    const history = createMemoryHistory();
    const { debug } = await render(
      <Router history={{ ...history }}>
        <ResetFailure {...propsData} />
      </Router>
    );

    const button1 = document.getElementById('button1');
    fireEvent.click(button1);
    const button2 = document.getElementById('button2');
    fireEvent.click(button2);

    debug();
  });
});
