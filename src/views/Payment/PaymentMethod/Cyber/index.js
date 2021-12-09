import React from 'react';
import CyberPaymentForm from '@/components/CyberPaymentForm';
import CyberCardList from './list';
import { cyberFormTitle, cyberCardTypeToValue } from '@/utils/constant/cyber';
import { inject, observer } from 'mobx-react';
import { ADDRESS_RULE } from './constant/utils';
import { validData } from '@/utils/utils';
import CyberSaveCardCheckbox from '@/views/Payment/Address/CyberSaveCardCheckbox';
import { getPaymentMethod } from '@/api/payment';
import { injectIntl } from 'react-intl-phraseapp';
@inject('loginStore', 'paymentStore')
@observer
class CyberPayment extends React.Component {
  static defaultProps = {
    renderBillingJSX: () => {},
    renderSecurityCodeTipsJSX: () => {},
    showErrorMsg: () => {},
    payConfirmBtn: () => {},
    saveBillingLoading: '',
    validForBilling: '',
    isCurrentBuyWaySubscription: '',
    updateSelectedCardInfo: () => {},
    reInputCVVBtn: () => {},
    isShowCyberBindCardBtn: '',
    sendCyberPaymentForm: () => {},
    cyberCardType: '001',
    cyberBtnLoading: false,
    cyberPaymentForm: {}
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if (
      nextProps.cyberCardType &&
      nextProps.cyberCardType !== this.state.cardTypeVal &&
      //必须要以下五个值都有值的时候更新cardTypeVal
      nextProps.cyberPaymentForm.cardNumber &&
      nextProps.cyberPaymentForm.cardholderName &&
      nextProps.cyberPaymentForm.expirationMonth &&
      nextProps.cyberPaymentForm.expirationYear &&
      nextProps.cyberPaymentForm.securityCode
    ) {
      this.setState(
        {
          cardTypeVal: cyberCardTypeToValue[nextProps.cyberCardType]
        },
        () => {
          this.onCardTypeValChange();
        }
      );
    }
  }
  onCardTypeValChange() {
    const { paymentStore } = this.props;
    paymentStore.setCurrentCardTypeInfo(
      paymentStore.supportPaymentMethods.filter(
        (s) => s.cardType === this.state.cardTypeVal
      )[0] || null
    );
  }
  constructor(props) {
    super(props);
    this.state = {
      isShowCardList: false,
      cardTypeVal: 'Visa',
      //cyber参数
      cyberPaymentForm: {
        cardholderName: '', //Didier Valansot
        cardNumber: '', //4111111111111111
        expirationMonth: '',
        expirationYear: '',
        securityCode: '', //000
        firstName: '',
        lastName: '',
        address1: '',
        address2: '', //非必填
        country: '',
        state: '', //Alabama
        city: '',
        zipCode: '',
        email: '',
        isSaveCard: true
      },
      cyberErrMsgObj: {},
      cardListLength: 0
    };
    this.cyberCardRef = React.createRef();
    this.cyberCardListRef = React.createRef();
  }
  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  //切换卡
  handleCardTypeChange = (e) => {
    //切换卡时，清空变量start
    let cyberPaymentForm = this.state.cyberPaymentForm;
    cyberPaymentForm = Object.assign({}, cyberPaymentForm, {
      cardholderName: '',
      cardNumber: '',
      expirationMonth: '',
      expirationYear: '',
      securityCode: ''
    });
    //切换卡时，清空变量end
    this.setState({
      cyberPaymentForm
    });
    this.setState({ cardTypeVal: e.target.value }, () => {
      this.onCardTypeValChange();
    });
  };
  //在mobx存储当前选择的卡类型
  onCardTypeValChange() {
    const { paymentStore } = this.props;
    paymentStore.setCurrentCardTypeInfo(
      paymentStore.supportPaymentMethods.filter(
        (s) => s.cardType === this.state.cardTypeVal
      )[0] || null
    );
  }
  //input输入事件
  handleCyberInputChange = (e) => {
    const target = e.target;
    const { cyberPaymentForm } = this.state;
    const name = target.name;
    let value = '';
    value = target.value;
    if (name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
    }
    cyberPaymentForm[name] = value;
    this.setState({ cyberPaymentForm });
    this.props.sendCyberPaymentForm(cyberPaymentForm);
    this.inputBlur(e);
  };
  //失去焦点
  inputBlur = async (e) => {
    const { intl } = this.props;
    const { cyberErrMsgObj } = this.state;
    const target = e.target;
    const targetRule = ADDRESS_RULE.filter((e) => e.key === target.name);
    const value = target.value;
    try {
      await validData({
        rule: targetRule,
        data: { [target.name]: value },
        intl
      });
      this.setState({
        cyberErrMsgObj: Object.assign({}, cyberErrMsgObj, {
          [target.name]: ''
        })
      });
    } catch (err) {
      this.setState({
        cyberErrMsgObj: Object.assign({}, cyberErrMsgObj, {
          [target.name]: err.message
        })
      });
    }
  };
  //select事件
  handleCyberSelectedItemChange = (name, item) => {
    let cyberErrMsgObj = this.state.cyberErrMsgObj;
    const { cyberPaymentForm } = this.state;
    cyberPaymentForm[name] = item.value;

    let obj = Object.assign({}, cyberErrMsgObj, { [name]: '' }); //选择了值，就清空没填提示

    this.setState({ cyberPaymentForm, cyberErrMsgObj: obj });
    this.props.sendCyberPaymentForm(cyberPaymentForm);
  };
  //checkbox
  CyberSaveCardCheckboxJSX = () => {
    const {
      cyberPaymentForm: { isSaveCard }
    } = this.state;

    const moduleJsx = this.isLogin ? (
      <CyberSaveCardCheckbox
        isChecked={isSaveCard}
        changeCyberPaymentFormIsSaveCard={this.changeCyberPaymentFormIsSaveCard}
      />
    ) : null;
    return moduleJsx;
  };
  //是否保存卡
  changeCyberPaymentFormIsSaveCard = (isSaveCard) => {
    isSaveCard = !isSaveCard;
    let cyberPaymentForm = this.state.cyberPaymentForm;
    cyberPaymentForm = Object.assign({}, cyberPaymentForm, { isSaveCard });
    this.setState({
      cyberPaymentForm
    });
  };
  //回到绑卡列表
  renderBackToSavedPaymentsJSX = () => {
    return (
      <div
        className={[
          'backToSavedPayments',
          'text-right',
          this.isLogin && this.state.cardListLength > 0 ? '' : 'rc-hidden'
        ].join(' ')}
      >
        <a
          class="rc-styled-link"
          href="javascript:;"
          onClick={this.showCyberList}
        >
          Back to Saved Payments
        </a>
      </div>
    );
  };
  //显示绑卡列表
  showCyberList = () => {
    this.setState({
      isShowCardList: true
    });
  };
  //显示输入卡表单
  showCyberForm = () => {
    this.setState({
      isShowCardList: false
    });
  };
  //是否有绑卡
  setCardListToEmpty = () => {
    this.setState({
      cardListLength: 0
    });
  };
  //查询绑卡列表
  queryList = async () => {
    try {
      let res = await getPaymentMethod();
      let cardList = res.context;
      this.setState({ cardListLength: cardList.length });
      if (cardList.length > 0) {
        this.setState({ isShowCardList: true });
      }
    } catch (err) {
      console.warn(err);
    }
  };
  render() {
    const { isShowCardList } = this.state;
    const {
      paymentStore: { supportPaymentMethods }
    } = this.props;

    //验证cyber表单输入情况
    const validForCyberPayment = () => {
      let isValidForCyberPayment = false;
      let errMsgObj = {};
      let isCheckSaveCard = this.state.cyberPaymentForm.isSaveCard;
      ADDRESS_RULE.forEach((item) => {
        if (
          Object.keys(this.state.cyberPaymentForm).indexOf(item.key) &&
          !this.state.cyberPaymentForm[item.key] &&
          item.require
        ) {
          errMsgObj[item.key] = true;
        }
      });
      if (Object.keys(errMsgObj).length > 0) {
        isValidForCyberPayment = false;
      } else if (this.props.isCurrentBuyWaySubscription) {
        //订阅商品
        isValidForCyberPayment = isCheckSaveCard ? true : false;
      } else {
        isValidForCyberPayment = true;
      }
      return !isValidForCyberPayment;
    };

    return (
      <>
        {!isShowCardList ? (
          <>
            {/* from表单*/}
            {supportPaymentMethods.length > 1 &&
              supportPaymentMethods.map((item, i) => (
                <div className={`rc-input rc-input--inline`} key={i}>
                  <input
                    className="rc-input__radio"
                    id={`payment-info-${item.id}`}
                    value={item.cardType}
                    type="radio"
                    name="payment-info"
                    onChange={this.handleCardTypeChange}
                    checked={this.state.cardTypeVal === item.cardType}
                  />
                  <label
                    className="rc-input__label--inline"
                    htmlFor={`payment-info-${item.id}`}
                  >
                    <img
                      src={item.imgUrl}
                      title={item.cardType}
                      style={{ width: '40px' }}
                      alt="card type image"
                    />
                  </label>
                </div>
              ))}
            <CyberPaymentForm
              cardTypeVal={this.state.cardTypeVal}
              cyberFormTitle={cyberFormTitle}
              ref={this.cyberCardRef}
              form={this.state.cyberPaymentForm}
              errMsgObj={this.state.cyberErrMsgObj}
              handleInputChange={this.handleCyberInputChange}
              handleSelectedItemChange={this.handleCyberSelectedItemChange}
              inputBlur={this.inputBlur}
              CyberSaveCardCheckboxJSX={this.CyberSaveCardCheckboxJSX()}
              billingJSX={this.props.renderBillingJSX({
                type: 'cyber'
              })}
              securityCodeTipsJSX={this.props.renderSecurityCodeTipsJSX()}
              backToSavedPaymentsJSX={this.renderBackToSavedPaymentsJSX()}
              showErrorMsg={this.props.showErrorMsg}
            />
            {this.props.payConfirmBtn({
              disabled: validForCyberPayment() || this.props.validForBilling,
              loading:
                this.props.saveBillingLoading || this.props.cyberBtnLoading
            })}
          </>
        ) : (
          <>
            {/* 卡列表 */}
            <CyberCardList
              ref={this.cyberCardListRef}
              updateSelectedCardInfo={this.props.updateSelectedCardInfo}
              showCyberForm={this.showCyberForm}
              setCardListToEmpty={this.setCardListToEmpty}
              billingJSX={this.props.renderBillingJSX({
                type: 'cyber'
              })}
              showErrorMsg={this.props.showErrorMsg}
            />
            {this.props.reInputCVVBtn({
              disabled: this.props.billingChecked
                ? !this.props.isShowCyberBindCardBtn
                : this.props.isShowCyberBindCardBtn &&
                  this.props.validBillingAddress
                ? false
                : true,
              loading: this.props.saveBillingLoading
            })}
          </>
        )}
      </>
    );
  }
  componentDidMount() {
    if (this.isLogin) {
      this.queryList();
    }
  }
}

export default CyberPayment;
// export default injectIntl(CyberPayment, { forwardRef: true });
