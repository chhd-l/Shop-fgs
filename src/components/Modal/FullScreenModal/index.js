import React, { createContext } from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import ModalA from './A';
import ModalB from './B';
import ModalC from './C';
import ModalD from './D';

const FullScreenModalContext = createContext();

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
      sum += productList[i].buyCount;
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
      fullScreenModalD
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
          <ModalA FullScreenModalContext={FullScreenModalContext} />
        </FullScreenModalContext.Provider>

        <FullScreenModalContext.Provider value={propsObj}>
          <ModalB FullScreenModalContext={FullScreenModalContext} />
        </FullScreenModalContext.Provider>

        <FullScreenModalContext.Provider value={propsObj}>
          <ModalC FullScreenModalContext={FullScreenModalContext} />
        </FullScreenModalContext.Provider>

        <FullScreenModalContext.Provider value={propsObj}>
          <ModalD FullScreenModalContext={FullScreenModalContext} />
        </FullScreenModalContext.Provider>
      </>
    );
  }
  render() {
    return this.Consent();
  }
}
