import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Assistest from '../index';

import {
  withRouter,
  Route,
  Router,
  useHistory,
  MemoryRouter,
  Routes,
  Switch
} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { IntlProvider } from 'react-intl';

describe('Test', () => {
  test('assisTest', async () => {
    const history = createMemoryHistory();
    console.log(history);
    const location = {
      pathname: '/'
    };
    render(
      <IntlProvider>
        <Router history={history}>
          <Assistest location={location} />
          {/* <Switch>
          <Route exact path="/chiens-guides-aveugles" component={Assistest} />
        </Switch> */}
          {/* <Route exact path="/chiens-guides-aveugles" component={} /> */}
        </Router>
      </IntlProvider>
    );
    const consentTest = screen.getByTestId('assisTest');
    expect(consentTest).toBeInTheDocument();
    // fireEvent(consentTest, new MouseEvent('hover', {}));

    // userEvent.hover(consentTest);
    // await userEvent.hover(consentTest, {'Javascript'});
    // fireEvent.mo(screen.getByTestId('inputTest'), {
    //   target: { value: '111@qq.com' }
    // });
    // fireEvent.change(screen.getByTestId('inputTest'), {
    //   target: { value: '111.com' }
    // });
    // await userEvent.type(screen.getByTestId('inputTest'), 'Javascript');
    // const saveBtn = screen.getByTestId('inputTest');
    // expect(saveBtn).toBeInTheDocument();
  });
});
