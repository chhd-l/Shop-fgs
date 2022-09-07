import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CyberPaymentFormNew from '../index';

jest.mock('mobx-react', () => {
  return {
    inject: (e) => {
      return (e) => e;
    },
    observer: (e) => e
  };
});

jest.mock('react-intl-phraseapp', () => {
  return {
    FormattedMessage: ({ id }) => <div>{id}</div>
  };
});

jest.mock('@/components/Selection', () => {
  return ({ selectedItemChange }) => {
    const onClick = () => selectedItemChange({});
    return (
      <div id="Selection" onClick={onClick}>
        Selection
      </div>
    );
  };
});

jest.mock('jwt-decode', () => {
  return () => {
    return {
      data: {}
    };
  };
});

jest.mock('@/utils/utils', () => {
  return {
    loadJS: ({ callback }) => {
      callback();
    },
    dynamicLoadCss: () => {}
  };
});

jest.mock('@/api/payment', () => {
  return {
    usGuestPaymentInfo: () => Promise.resolve({ context: {} }),
    usPaymentInfo: () => Promise.resolve({ context: {} }),
    usPayCardSubscription: () => Promise.resolve({ context: {} }),
    usGuestPayCardSubscription: () => Promise.resolve({ context: {} }),
    cyberClient: () => Promise.resolve({ context: {} })
  };
});

const propsData = {
  loginStore: {
    isLogin: true
  },
  curPayWayInfo: {
    id: 1
  },
  form: {
    cardNumber: '1111111111666666',
    securityCode: '333',
    cardholderName: true,
    expirationMonth: true,
    expirationYear: true
  },
  handleInputChange: () => {},
  handleSelectedItemChange: () => {},
  errMsgObj: {
    cardholderName: 'cardholderName'
  },
  cyberFormTitle: {
    cardHolderName: 'cardHolderName',
    EXPMonth: 'EXPMonth'
  },
  paymentStore: {
    currentCardTypeInfo: {}
  },
  securityCodeTipsJSX: <div>securityCodeTipsJSX</div>,
  CyberSaveCardCheckboxJSX: <div>CyberSaveCardCheckboxJSX</div>,
  backToSavedPaymentsJSX: <div>backToSavedPaymentsJSX</div>,
  setCyberLoading: () => {}
};

class Flex {
  microform = () => {
    return {
      createField: () => {
        return {
          load: () => {},
          on: (_, callback) => {
            callback({
              empty: true,
              valid: true
            });
            callback({
              empty: false,
              valid: false
            });
          }
        };
      },
      createToken: (_, callback) => {
        callback(true, {});
        callback(false, 'dfdsf');
      }
    };
  };
}

class WrapComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.ref.usGuestPaymentInfoEvent({});
    this.ref.usPaymentInfoEvent({});
    this.ref.flexresponse = '111';
    this.ref.queryCyberCardTypeEvent({});
    this.ref.queryGuestCyberCardTypeEvent({});
  }

  setRef = (ref) => {
    this.ref = ref;
  };

  render() {
    return <CyberPaymentFormNew ref={this.setRef} {...this.props} />;
  }
}

test('CyberPaymentFormNew1', async () => {
  window.Flex = Flex;

  await render(<WrapComponent {...propsData} />);

  const select = document.getElementById('Selection');
  fireEvent.click(select);
});

test('CyberPaymentFormNew2', async () => {
  window.Flex = Flex;

  await render(
    <CyberPaymentFormNew {...propsData} loginStore={{ isLogin: false }} />
  );

  await render(
    <CyberPaymentFormNew {...propsData} curPayWayInfo={{ id: false }} />
  );

  await render(
    <CyberPaymentFormNew
      {...propsData}
      form={{
        cardNumber: '11',
        securityCode: '333',
        cardholderName: true,
        expirationMonth: 1,
        expirationYear: true
      }}
    />
  );
});
