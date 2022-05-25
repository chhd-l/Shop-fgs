import React, { createContext } from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import ModalA from './A';
import ModalB from './B';
import ModalC from './C';
import ModalD from './D';
import ModalTC from './TC';
import ModalPM from './PersonalizedMarketing';
import ModalOptEmail from './OptEmail';

export const FullScreenModalContext = createContext();

@inject('paymentStore', 'checkoutStore', 'loginStore', 'configStore')
@observer
export default class FullScreenModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: []
    };
  }
  get isLogin() {
    return this.props.loginStore.isLogin;
  }

  isSubscription(el) {
    return el.goodsInfoFlag;
  }
  calTotalNum = () => {
    let sum = 0;
    let productList = toJS(this.state.productList);
    for (let i = 0; i < productList.length; i++) {
      if (this.isLogin) {
        sum += productList[i].buyCount;
      } else {
        sum += productList[i].quantity;
      }
    }
    return sum + '.00';
  };
  componentDidMount() {
    let productList = [];
    if (this.isLogin) {
      productList = this.props.checkoutStore.loginCartData;
    } else {
      productList = this.props.checkoutStore.cartData.filter(
        (ele) => ele.selected
      );
    }
    this.setState({ productList });
  }
  close = (modal) => {
    const { setTrConsentModal } = this.props.paymentStore;
    setTrConsentModal(modal, false);
  };
  Consent() {
    const {
      fullScreenModalA,
      fullScreenModalB,
      fullScreenModalC,
      fullScreenModalD,
      fullScreenModalOptEmail,
      fullScreenModalPM,
      fullScreenModalTC
    } = this.props.paymentStore;

    let productList = toJS(this.state.productList);
    let propsObj = {
      productList,
      close: this.close,
      calTotalNum: this.calTotalNum
    };
    return (
      <>
        <FullScreenModalContext.Provider value={propsObj}>
          <ModalA />
        </FullScreenModalContext.Provider>

        <FullScreenModalContext.Provider value={propsObj}>
          <ModalB />
        </FullScreenModalContext.Provider>

        <FullScreenModalContext.Provider value={propsObj}>
          <ModalC />
        </FullScreenModalContext.Provider>

        <FullScreenModalContext.Provider value={propsObj}>
          <ModalD />
        </FullScreenModalContext.Provider>

        <FullScreenModalContext.Provider value={propsObj}>
          <ModalTC />
        </FullScreenModalContext.Provider>

        <FullScreenModalContext.Provider value={propsObj}>
          <ModalPM />
        </FullScreenModalContext.Provider>

        <FullScreenModalContext.Provider value={propsObj}>
          <ModalOptEmail />
        </FullScreenModalContext.Provider>
      </>
    );
  }
  render() {
    return this.Consent();
  }
}
