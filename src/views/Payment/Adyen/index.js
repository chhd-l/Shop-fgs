import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import { dynamicLoadCss } from '@/utils/utils';
import { isPrevReady } from '../modules/utils';
import CardList from './list';
import TermsCommon from '../Terms/common';

@inject('loginStore', 'paymentStore')
@injectIntl
@observer
class AdyenCreditCard extends React.Component {
  static defaultProps = {
    subBuyWay: '' // once/fre
  };
  constructor(props) {
    super(props);
    this.state = {
      requiredList: [],
      adyenPayParam: null,
      isValid: false,
      errorMsg: ''
    };
  }
  componentDidMount() {
    dynamicLoadCss(
      'https://checkoutshopper-live.adyen.com/checkoutshopper/sdk/3.6.0/adyen.css'
    );
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.checkRequiredItem(nextProps.listData);
  }
  //是否consent必填项勾选
  isConsentRequiredChecked() {
    let isAllChecked = this.state.requiredList.every((item) => item.isChecked);
    if (!isAllChecked) {
      throw new Error(this.props.intl.messages.CompleteRequiredItems);
    }
  }
  checkRequiredItem = (list) => {
    let requiredList = list.filter((item) => item.isRequired);
    this.setState({
      requiredList
    });
  };
  updateSelectedCardInfo = (data) => {
    const { paymentStore, isOnepageCheckout } = this.props;
    this.setState({ adyenPayParam: data, isValid: !!data });
    this.props.updateAdyenPayParam(data);
    data && paymentStore.updateHasConfimedPaymentVal('adyenCard');

    // init时，paymentTypeVal还没返回，todo
    if (
      !isOnepageCheckout
      // &&
      // this.props.paymentTypeVal !== 'adyenCard'
    ) {
      return false;
    }

    const isReadyPrev = isPrevReady({
      list: toJS(paymentStore.panelStatus),
      curKey: 'paymentMethod'
    });

    if (data) {
      paymentStore.setStsToCompleted({ key: 'paymentMethod' });
      isReadyPrev && paymentStore.setStsToEdit({ key: 'confirmation' });
    } else {
      // 删除卡的时候
      paymentStore.setStsToEdit({ key: 'paymentMethod' });
      paymentStore.setStsToPrepare({ key: 'confirmation' });
    }
  };
  showErrorMsg = (msg) => {
    this.setState({
      errorMsg: msg
    });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({ errorMsg: '' });
    }, 3000);
  };
  clickPay = async () => {
    if (!this.state.isValid) {
      return false;
    }

    // 登录
    // 1 验证是否选了卡
    // 2 验证同意条款勾选情况
    // 3 验证通过，进行支付

    // 非登录
    // 1 使用adyen的submit进行验证
    // 2 验证同意条框勾选情况
    // 3 验证通过，进行支付
    try {
      await this.isConsentRequiredChecked();
      this.props.updateAdyenPayParam(this.state.adyenPayParam);
      this.props.clickPay({ type: 'adyenCard' });
    } catch (err) {
      this.props.showErrorMsg(err.message);
    }
  };
  render() {
    const { isOnepageCheckout, listData, subBuyWay } = this.props;
    const { isValid, errorMsg } = this.state;
    const _errJSX = (
      <div
        className={`js-errorAlertProfile-personalInfo rc-margin-bottom--xs ${
          errorMsg ? '' : 'hidden'
        }`}
      >
        <aside
          className="rc-alert rc-alert--error rc-alert--with-close errorAccount"
          role="alert"
        >
          <span className="pl-0">{errorMsg}</span>
          <button
            className="rc-btn rc-alert__close rc-icon rc-close-error--xs"
            onClick={(e) => {
              e.preventDefault();
              this.setState({ errorMsg: '' });
            }}
            aria-label="Close"
          >
            <span className="rc-screen-reader-text">
              <FormattedMessage id="close" />
            </span>
          </button>
        </aside>
      </div>
    );

    return (
      <>
        <div className="checkout--padding ml-custom mr-custom pt-3 pb-3 border rounded">
          {_errJSX}
          <CardList
            isOnepageCheckout={isOnepageCheckout}
            updateSelectedCardInfo={this.updateSelectedCardInfo}
            showErrorMsg={this.showErrorMsg}
            subBuyWay={subBuyWay}
          />
        </div>

        {!isOnepageCheckout && (
          <>
            <div className="pb-3" />
            <div className="ml-custom mr-custom">
              <TermsCommon
                id={'adyenCreditCard'}
                listData={listData}
                checkRequiredItem={this.checkRequiredItem}
              />
            </div>
            <div className="place_order-btn card rc-bg-colour--brand4 pt-4">
              <div className="next-step-button">
                <div className="rc-text--right">
                  <button
                    className={`rc-btn rc-btn--one submit-payment`}
                    type="submit"
                    name="submit"
                    value="submit-shipping"
                    disabled={!isValid}
                    onClick={this.clickPay}
                  >
                    <FormattedMessage id="payment.further" />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}

export default AdyenCreditCard;
