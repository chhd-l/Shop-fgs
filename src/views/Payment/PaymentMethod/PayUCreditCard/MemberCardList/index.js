import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl-phraseapp';
import Skeleton from 'react-skeleton-loader';
import findIndex from 'lodash/findIndex';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
import {
  getPaymentMethod,
  deleteCard,
  addOrUpdatePaymentMethod,
  queryIsSupportInstallMents
} from '@/api/payment';
import {
  PAYMENT_METHOD_PAU_CHECKOUT_RULE,
  PAYMENT_METHOD_PAU_ACCOUNT_RULE
} from '@/utils/constant';
import { validData } from '@/utils/utils';
import LazyLoad from 'react-lazyload';
import { scrollPaymentPanelIntoView } from '@/views/Payment/modules/utils';
import InstallmentTable from '../InstallmentTable';
import CardItemCover from '../CardItemCover';
import getCardImg from '@/lib/get-card-img';
import cn from 'classnames';
import IMask from 'imask';

import './index.css';

let installMentTableDataCache = {};

@inject('loginStore', 'paymentStore', 'checkoutStore')
@observer
class MemberCardList extends React.Component {
  static defaultProps = {
    needReConfirmCVV: true,
    needEmail: true,
    needPhone: true,
    isSupportInstallMent: false,
    mustSaveForFutherPayments: false,
    defaultCardDataFromAddr: null,
    getSelectedValue: () => {},
    updateFormValidStatus: () => {},
    onInstallMentParamChange: () => {}
  };
  constructor(props) {
    super(props);
    this.state = {
      creditCardList: [],
      memberUnsavedCardList: [],
      isEdit: false,
      creditCardInfoForm: {
        cardNumber: '',
        cardMmyy: '',
        cardCvv: '',
        cardOwner: '',
        email: '',
        phoneNumber: '',
        identifyNumber: '111',
        isDefault: false,
        paymentToken: '',
        paymentTransactionId: '',
        paymentCustomerId: '',
        installmentChecked: false,
        // 订阅支付时，保存卡选项，默认勾选且不能取消；设置为默认卡选项，默认勾选
        savedCardChecked: this.props.mustSaveForFutherPayments || false,
        savedDefaultCardChecked: this.props.mustSaveForFutherPayments || false
      },
      isCreditCardCheck: {
        cardNumber: 'NOT_TEST', //NOT_TEST：未开始检测 FAIL：测试不成功 SUCCESS：测试成功
        cardMmyy: 'NOT_TEST',
        cardCvv: 'NOT_TEST',
        cardOwner: 'NOT_TEST'
      },
      listLoading: true,
      saveLoading: false,
      listErr: '',
      currentVendor: '1',
      prevEditCardNumber: '',
      isValid: false,
      selectedId: '',
      installMentTableData: [], // 分期详情table data
      installMentParam: null // 所选择的分期详情
    };
    this.handleClickCardItem = this.handleClickCardItem.bind(this);
    this.handleClickDeleteBtn = this.handleClickDeleteBtn.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.currentCvvChange = this.currentCvvChange.bind(this);
    this.onCheckboxChange = this.onCheckboxChange.bind(this);
    this.preSelectedId = '';
  }
  async componentDidMount() {
    this.getPaymentMethodList();
  }
  get creditCardListMerged() {
    const { memberUnsavedCardList, creditCardList, selectedId } = this.state;
    return memberUnsavedCardList.concat(creditCardList).map((c) =>
      Object.assign(c, {
        isValid: c.id === selectedId && (c.cardCvv || c.encrypted_cvv)
      })
    );
  }
  get userInfo() {
    return this.props.loginStore.userInfo;
  }
  get tradePrice() {
    return this.props.checkoutStore.tradePrice;
  }
  async getPaymentMethodList() {
    this.setState({ listLoading: true });
    try {
      let res = await getPaymentMethod();

      let tmpList = res.context || [];

      const defaultItem = tmpList.filter((t) => t.isDefault === 1)[0];
      const firstItem = tmpList[0];
      const tmpSelectedId =
        this.state.selectedId ||
        (defaultItem && defaultItem.id) ||
        (firstItem && firstItem.id) ||
        '';

      this.setState(
        {
          creditCardList: tmpList,
          selectedId: tmpSelectedId
        },
        () => {
          const { creditCardListMerged } = this;
          this.setState({ isEdit: !creditCardListMerged.length });
        }
      );
    } catch (err) {
      this.setState({ listErr: err.message });
    } finally {
      this.setState({
        listLoading: false
      });
      this.handleSelectedIdChange();
    }
  }
  showErrorMsg = (message) => {
    this.setState(
      {
        errorMsg: message
      },
      () => {
        scrollPaymentPanelIntoView();
      }
    );
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({
        errorMsg: ''
      });
    }, 5000);
  };
  currentCvvChange(el, e) {
    let { creditCardList } = this.state;
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    el.cardCvv = value;
    this.setState(
      {
        creditCardList
      },
      () => {
        this.handleSelectedIdChange({ isResetInstallData: false });
      }
    );
  }
  cardNumberFocus() {
    let { creditCardInfoForm } = this.state;
    this.setState({
      prevEditCardNumber: creditCardInfoForm.cardNumber,
      creditCardInfoForm: Object.assign(creditCardInfoForm, {
        cardNumber: ''
      })
    });
  }
  cardNumberBlur() {
    let { creditCardInfoForm } = this.state;
    if (!creditCardInfoForm.cardNumber) {
      this.setState({
        creditCardInfoForm: Object.assign(creditCardInfoForm, {
          cardNumber: this.state.prevEditCardNumber
        })
      });
    }
  }
  cardNumberChange = async (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    let cardNumber =
      value.replace(/\s*/g, '') || this.state.creditCardInfoForm.cardNumber;

    try {
      let res = await axios.post(
        'https://api.paymentsos.com/tokens',
        {
          token_type: 'credit_card',
          card_number: cardNumber,
          expiration_date: '08-23',
          credit_card_cvv: '888',
          holder_name: 'echo'
        },
        {
          headers: {
            public_key: window.__.env.REACT_APP_PaymentKEY_MEMBER,
            'x-payments-os-env': window.__.env.REACT_APP_PaymentENV,
            'Content-type': 'application/json',
            app_id: window.__.env.REACT_APP_PaymentAPPID_MEMBER,
            'api-version': '1.3.0'
          }
        }
      );
      console.log(res);
      this.setState({ currentVendor: res.data.vendor });
    } catch (e) {
      console.log(e);
    }
  };
  cardInfoInputChange = async (e) => {
    const target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const { creditCardInfoForm } = this.state;
    console.log(name + '   ' + value);
    if (name === 'cardNumber') {
      let beforeValue = value.substr(0, value.length - 1);
      let inputValue = value.substr(value.length - 1, 1);
      if (isNaN(inputValue)) {
        creditCardInfoForm[name] = beforeValue;
      } else {
        creditCardInfoForm[name] = value.replace(/\s*/g, '');
        //value = value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 '); //银行卡4位后自动加空格
        //creditCardInfoForm[name] = value;
      }
      // let element = document.getElementById('cardNumber');
      //   let maskOptions = [];
      //   let cardNumberReg = [{ mask: '0000 0000 0000 0000' }];
      //   maskOptions = {
      //     mask: cardNumberReg
      //   };
      //   IMask(element, maskOptions);
      //creditCardInfoForm[name] = value;
    } else if (name === 'cardMmyy') {
      let element = document.getElementById('cardMmyy');
      let maskOptions = [];
      let cardMmyyReg = [{ mask: '00/00' }];
      maskOptions = {
        mask: cardMmyyReg
      };
      IMask(element, maskOptions);
      creditCardInfoForm[name] = value;
    } else {
      creditCardInfoForm[name] = value;
    }
    if (['cardNumber', 'cardMmyy', 'cardCvv'].indexOf(name) === -1) {
      this.inputBlur(e);
    }
    this.setState({ creditCardInfoForm }, () => {
      this.validFormData();
    });
  };
  async validFormData() {
    const { mustSaveForFutherPayments, needEmail, needPhone, intl } =
      this.props;
    const {
      creditCardInfoForm: { savedCardChecked },
      isEdit
    } = this.state;
    let isValid = false;
    try {
      // 必须保存卡时，没有勾选保存卡按钮时，校验不通过
      if (isEdit && mustSaveForFutherPayments && !savedCardChecked) {
        throw new Error('must checked the saved card checkbox');
      }
      if (isEdit) {
        let rules = null;
        if (needEmail && needPhone) {
          rules = PAYMENT_METHOD_PAU_ACCOUNT_RULE;
        } else {
          rules = PAYMENT_METHOD_PAU_CHECKOUT_RULE;
        }
        await validData({
          rule: rules,
          data: this.state.creditCardInfoForm,
          intl
        });
      }

      this.setState({ isValid: true });
      isValid = true;
    } catch (err) {
      this.setState({ isValid: false });
      isValid = false;
    } finally {
      this.setState({ isValid }, () => {
        this.props.updateFormValidStatus(this.state.isValid);
      });
    }
  }
  inputBlur = (e) => {
    let validDom = Array.from(
      e.target.parentElement.parentElement.children
    ).filter((el) => {
      let i = findIndex(Array.from(el.classList), (classItem) => {
        return classItem === 'invalid-feedback';
      });
      return i > -1;
    })[0];
    if (validDom) {
      validDom.style.display = e.target.value ? 'none' : 'block';
    }
  };
  //给俄罗斯credit card表单重新写的方法
  inputBoxBlur = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    let result = '';
    let coverObj = {};
    let data = {};
    switch (key) {
      case 'cardNumber':
        if (value.length == 0) {
          result = 'NOT_TEST';
        } else {
          result = 'SUCCESS';
        }
        break;
      case 'cardMmyy':
        let splitArr = value.split('/');
        let arr = [];
        for (let i = 0; i < splitArr.length; i++) {
          arr.push(splitArr[i]);
        }
        if (arr.length == 1 && arr[0] === '') {
          result = 'NOT_TEST';
        } else if (
          arr.length == 2 &&
          arr[0].length == 2 &&
          arr[1].length == 2
        ) {
          result = 'SUCCESS';
        } else {
          result = 'FAIL';
        }
        break;
      case 'cardCvv':
        if (value.length === 0) {
          result = 'NOT_TEST';
        } else if (value.length >= 3 && value.length <= 4) {
          result = 'SUCCESS';
        } else {
          result = 'FAIL';
        }
        break;
      case 'cardOwner':
        if (value.length === 0) {
          result = 'NOT_TEST';
        } else {
          result = 'SUCCESS';
        }
        break;
    }
    coverObj[key] = result;
    data = Object.assign({}, this.state.isCreditCardCheck, coverObj);
    this.setState({ isCreditCardCheck: data });
  };
  async generateCardInfo() {
    try {
      const { creditCardInfoForm } = this.state;
      const res = await axios.post(
        'https://api.paymentsos.com/tokens',
        {
          token_type: 'credit_card',
          card_number: creditCardInfoForm.cardNumber,
          expiration_date: creditCardInfoForm.cardMmyy.replace(/\//, '-'),
          holder_name: creditCardInfoForm.cardOwner,
          credit_card_cvv: creditCardInfoForm.cardCvv
        },
        {
          headers: {
            public_key: window.__.env.REACT_APP_PaymentKEY_MEMBER,
            'x-payments-os-env': window.__.env.REACT_APP_PaymentENV,
            'Content-type': 'application/json',
            app_id: window.__.env.REACT_APP_PaymentAPPID_MEMBER,
            'api-version': '1.3.0'
          }
        }
      );
      const resData = res.data;
      if (!resData.vendor) {
        throw new Error(
          'Lo sentimos, los tipos de tarjeta de crédito actualmente admitidos son: VISA, American Express, MasterCard'
        );
      }
      return resData;
    } catch (err) {
      throw new Error(this.props.intl?.messages['payment.cardInfoErr']);
    }
  }
  // save card form， 保存卡
  handleSave = async (e) => {
    try {
      // 是否直接返回预览封面 true-返回列表 false-返回封面
      const {
        isSupportInstallMent,
        paymentStore: { setAddCardDirectToPayFlag }
      } = this.props;
      const { isValid, isEdit, creditCardInfoForm } = this.state;
      const isReturnToCardList = isEdit && isSupportInstallMent;
      e && e.preventDefault();

      // 没有校验通过 或者 不是新增操作，直接返回
      if (!isValid || !isEdit) {
        !isEdit &&
          this.props.onInstallMentParamChange(this.state.installMentParam);
        scrollPaymentPanelIntoView();
        return false;
      }
      this.setState({
        saveLoading: true
      });

      const resData = await this.generateCardInfo();

      if (creditCardInfoForm.savedCardChecked) {
        const addRes = await addOrUpdatePaymentMethod({
          storeId: window.__.env.REACT_APP_STOREID,
          customerId: this.userInfo ? this.userInfo.customerId : '',
          email: creditCardInfoForm.email,
          phone: creditCardInfoForm.phoneNumber,
          isDefault:
            window.__.env.REACT_APP_COUNTRY == 'ru'
              ? '1'
              : creditCardInfoForm.savedDefaultCardChecked
              ? '1'
              : '0',
          //isDefault: 1,
          paymentToken: resData?.token || '',
          paymentVendor: resData?.vendor || '',
          binNumber: resData?.bin_number || '',
          pspName: 'PAYU'
        });

        this.setState({
          isEdit: false
        });
        await this.getPaymentMethodList();
        const tmpSelectedId = addRes.context.id;
        let { creditCardList } = this.state;
        creditCardList.forEach((el) => {
          if (el.id === tmpSelectedId) {
            el.cardCvv = creditCardInfoForm.cardCvv;
          }
          // return el;
        });
        this.setState({
          creditCardList,
          selectedId: tmpSelectedId,
          saveLoading: false
        });
        setAddCardDirectToPayFlag(true);
      } else {
        const tmpSelectedId = new Date().getTime() + '';
        let { memberUnsavedCardList } = this.state;
        let tmpItem = Object.assign(resData, {
          id: tmpSelectedId,
          paymentVendor: resData.vendor,
          holderName: resData.holder_name,
          lastFourDigits: resData.last_4_digits,
          cardType: resData.card_type
        });
        memberUnsavedCardList.unshift(tmpItem);
        this.setState({
          memberUnsavedCardList,
          selectedId: tmpSelectedId,
          isEdit: false
        });
      }
      await this.handleSelectedIdChange();
      this.props.onInstallMentParamChange(this.state.installMentParam);
      scrollPaymentPanelIntoView();

      if (isReturnToCardList) {
        throw new Error();
      }
    } catch (e) {
      console.log(111, e);
      this.setState({
        saveLoading: false
      });
      this.showErrorMsg(e.message);
      throw new Error();
    } finally {
      this.setState({
        saveLoading: false
      });
    }
  };
  async deleteCard({ el, idx }) {
    try {
      let { creditCardList, memberUnsavedCardList } = this.state;
      el.confirmTooltipVisible = false;
      this.setState({
        creditCardList,
        memberUnsavedCardList
      });
      scrollPaymentPanelIntoView();
      if (el.paymentToken) {
        this.setState({
          listLoading: true
        });
        await deleteCard({ id: el.id });
      } else {
        memberUnsavedCardList.splice(idx, 1);
        this.setState({
          memberUnsavedCardList
        });
      }
      await this.getPaymentMethodList();
    } catch (err) {
      this.showErrorMsg(err.message);
      this.setState({
        listLoading: false
      });
    }
  }
  updateConfirmTooltipVisible(el, status) {
    let { creditCardList, memberUnsavedCardList } = this.state;
    el.confirmTooltipVisible = status;
    this.setState({
      creditCardList,
      memberUnsavedCardList
    });
  }
  handleClickAdd = () => {
    const { selectedId } = this.state;
    this.preSelectedId = selectedId;
    this.setState({ isEdit: true, selectedId: '' }, () => {
      this.handleSelectedIdChange();
      scrollPaymentPanelIntoView();
    });
  };
  handleClickCancel = () => {
    this.setState({ isEdit: false, selectedId: this.preSelectedId }, () => {
      this.handleSelectedIdChange();
      scrollPaymentPanelIntoView();
    });
  };
  handleSelectedIdChange = async ({ isResetInstallData = true } = {}) => {
    const { isSupportInstallMent } = this.props;
    const { selectedId, creditCardList, memberUnsavedCardList } = this.state;
    const s = memberUnsavedCardList
      .concat(creditCardList)
      .filter((c) => c.id === selectedId)[0];
    this.props.getSelectedValue(s || null);
    this.props.onVisitorPayosDataConfirm(s || null);
    this.props.updateFormValidStatus(
      s && (s.cardCvv || s.encrypted_cvv) ? true : false
    );
    // 切换卡时，重置分期信息
    if (isResetInstallData) {
      this.installmentTableChanger(null);
      this.setState({
        creditCardInfoForm: Object.assign(this.state.creditCardInfoForm, {
          installmentChecked: false
        })
      });
    }

    // 查询被选中的卡，是否支持分期
    // 该卡如果已经查询过，就不再查询了，直到下一次切换时再重新查询
    let installMentTableData = installMentTableDataCache[selectedId] || [];
    if (s && !s.hasQueryInstallMent && isSupportInstallMent) {
      this.setState({
        installMentTableData: []
      });
      const res = await queryIsSupportInstallMents({
        platformName: 'PAYU',
        pspItemCode: 'payu_tu',
        binNumber: s ? s.bin_number || s.binNumber : '', // 卡前6位
        payAmount: this.tradePrice,
        storeId: window.__.env.REACT_APP_STOREID
      });

      s.hasQueryInstallMent = true;
      installMentTableData =
        res?.context?.installments[0]?.installmentPrices || [];
      installMentTableDataCache[selectedId] = installMentTableData;

      this.setState({
        creditCardList,
        memberUnsavedCardList
      });
    }
    this.setState({
      installMentTableData
    });
  };
  handleClickCardItem(el) {
    if (el?.paddingFlag) return; // paddingFlag表示此卡正在pending，不能用于选择支付
    const { selectedId, creditCardList, memberUnsavedCardList } = this.state;
    if (el.id === selectedId) return;
    this.setState(
      {
        selectedId: el.id,
        creditCardList,
        memberUnsavedCardList
      },
      () => {
        this.handleSelectedIdChange();
      }
    );
  }
  handleClickDeleteBtn(el, e) {
    if (el.paddingFlag) return;
    e.preventDefault();
    e.stopPropagation();
    this.updateConfirmTooltipVisible(el, true);
  }
  onCheckboxChange(item) {
    const { key } = item;
    this.setState(
      (curState) => ({
        creditCardInfoForm: Object.assign(curState.creditCardInfoForm, {
          [key]: !curState.creditCardInfoForm[key]
        })
      }),
      () => {
        // 取消分期时，重置分期信息
        if (!this.state.creditCardInfoForm.installmentChecked) {
          this.installmentTableChanger(null);
        }
        // 切换是否分期时，会被重置按钮可点击状态
        if (key !== 'installmentChecked') {
          this.validFormData();
        }
      }
    );
  }
  hanldeClickReturnToCardList = () => {
    this.handleClickCancel();
  };
  installmentTableChanger = (data) => {
    this.setState({ installMentParam: data }, () => {
      this.props.onInstallMentParamChange(this.state.installMentParam);
    });
  };
  render() {
    const { creditCardListMerged } = this;
    const {
      needEmail,
      needPhone,
      isSupportInstallMent,
      paymentStore: { supportPaymentMethods },
      inited
    } = this.props;
    const {
      creditCardInfoForm,
      isEdit,
      errorMsg,
      listLoading,
      selectedId,
      installMentTableData
    } = this.state;

    // 卡列表显示控制
    const listVisible = creditCardListMerged.length && !isEdit;
    // 分期按钮显示控制
    const showInstallMentCheckout =
      isSupportInstallMent && installMentTableData.length > 0 && !isEdit;

    const CreditCardImg = supportPaymentMethods.length > 0 && (
      <span className="logo-payment-card-list logo-credit-card ml-0">
        {supportPaymentMethods.map((el, idx) => (
          <LazyLoad key={idx}>
            <img
              alt="logo payment card"
              key={idx}
              style={{ width: '50px' }}
              className="logo-payment-card mr-1"
              src={el.imgUrl}
            />
          </LazyLoad>
        ))}
      </span>
    );
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

    const _successTipJSX = (
      <aside
        className={`rc-alert rc-alert--success js-alert js-alert-success-profile-info rc-alert--with-close rc-margin-bottom--xs ${
          this.state.successMsg ? '' : 'hidden'
        }`}
        role="alert"
      >
        <p className="success-message-text rc-padding-left--sm--desktop rc-padding-left--lg--mobile rc-margin--none">
          {this.state.successMsg}
        </p>
      </aside>
    );

    const checkboxListForCardList = [
      {
        key: 'installmentChecked',
        id: 'id-payu-installment',
        langKey: 'payment.installment',
        value: creditCardInfoForm.installmentChecked,
        visible: showInstallMentCheckout,
        showInstallMentTable: creditCardInfoForm.installmentChecked
      }
    ].filter((c) => c.visible);

    let checkboxListForForm = [];
    if (window.__.env.REACT_APP_COUNTRY === 'ru') {
      checkboxListForForm = [
        {
          key: 'savedCardChecked',
          id: 'id-payu-saved-card-account',
          langKey: 'payment.saveCardToAccount',
          value: creditCardInfoForm.savedCardChecked,
          visible: true,
          disabled: this.props.mustSaveForFutherPayments
        }
        // 注释 俄罗斯绑卡和选择默认卡两个checkbox改为一个checkbox
        // {
        //   key: 'savedDefaultCardChecked',
        //   id: 'id-payu-saved-as-preferred',
        //   langKey: 'payment.saveThisPaymentMethodAsPreferred',
        //   value: creditCardInfoForm.savedDefaultCardChecked,
        //   visible: true
        // }
      ].filter((c) => c.visible);
    } else {
      checkboxListForForm = [
        {
          key: 'savedCardChecked',
          id: 'id-payu-saved-card-account',
          langKey: 'payment.saveCardToAccount',
          value: creditCardInfoForm.savedCardChecked,
          visible: true,
          disabled: this.props.mustSaveForFutherPayments
        },
        {
          key: 'savedDefaultCardChecked',
          id: 'id-payu-saved-as-preferred',
          langKey: 'payment.saveThisPaymentMethodAsPreferred',
          value: creditCardInfoForm.savedDefaultCardChecked,
          visible: true
        }
      ].filter((c) => c.visible);
    }

    const formListLabelColor = (commonStyle, type) => {
      return cn(
        commonStyle,
        {
          'text-black': this.state.isCreditCardCheck[type] === 'NOT_TEST'
        },
        {
          'text-red-500': this.state.isCreditCardCheck[type] === 'FAIL'
        },
        {
          'text-black': this.state.isCreditCardCheck[type] === 'SUCCESS'
        }
      );
    };

    const formListInputColor = (commonStyle, type) => {
      return cn(
        commonStyle,
        {
          'border border-gray-300':
            this.state.isCreditCardCheck[type] === 'NOT_TEST'
        },
        {
          'border-b-2 border-red-500':
            this.state.isCreditCardCheck[type] === 'FAIL'
        },
        {
          borderBottomLightGreen:
            this.state.isCreditCardCheck[type] === 'SUCCESS'
        }
      );
    };

    const formListInputIcon = (type) => {
      return (
        <>
          {this.state.isCreditCardCheck[type] === 'SUCCESS' ? (
            <div className={cn('font-bold text-md absolute top-3 right-3')}>
              <svg
                fill="#0ABF53"
                width="16px"
                height="16px"
                viewBox="0 0 16 16"
              >
                <path d="M6.50025408,13.5007781 C6.23625408,13.5007781 5.98125408,13.3967781 5.79325408,13.2077781 L2.79325408,10.2077781 C2.40225408,9.81677809 2.40225408,9.18477809 2.79325408,8.79377809 C3.18425408,8.40277809 3.81625408,8.40277809 4.20725408,8.79377809 L6.34525408,10.9307781 L11.6682541,2.94577809 C11.9742541,2.48677809 12.5942541,2.36077809 13.0552541,2.66877809 C13.5142541,2.97477809 13.6382541,3.59577809 13.3322541,4.05577809 L7.33225408,13.0557781 C7.16625408,13.3047781 6.89625408,13.4667781 6.59925408,13.4957781 C6.56525408,13.4997781 6.53325408,13.5007781 6.50025408,13.5007781"></path>
              </svg>
            </div>
          ) : null}
          {this.state.isCreditCardCheck[type] === 'FAIL' ? (
            <div className={cn('font-bold text-md absolute top-3 right-3')}>
              <svg
                width="16px"
                height="16px"
                viewBox="0 0 16 16"
                fill="#D10244"
              >
                <path d="M16,8 C16,9.44086038 15.6397848,10.7741935 14.9193548,12 C14.1989249,13.2258065 13.2258065,14.1989249 12,14.9193548 C10.7741935,15.6397848 9.44086038,16 8,16 C6.55913962,16 5.22580645,15.6397848 4,14.9193548 C2.77419355,14.1989249 1.8010751,13.2258065 1.08064516,12 C0.360215218,10.7741935 0,9.44086038 0,8 C0,6.55913962 0.360215218,5.22580645 1.08064516,4 C1.8010751,2.77419355 2.77419355,1.8010751 4,1.08064516 C5.22580645,0.360215218 6.55913962,0 8,0 C9.44086038,0 10.7741935,0.360215218 12,1.08064516 C13.2258065,1.8010751 14.1989249,2.77419355 14.9193548,4 C15.6397848,5.22580645 16,6.55913962 16,8 Z M8.01612903,10 C7.60308539,10 7.24982468,10.1467391 6.95634642,10.4402174 C6.66286816,10.7336957 6.51612903,11.0869564 6.51612903,11.5 C6.51612903,11.9130436 6.66286816,12.2663043 6.95634642,12.5597826 C7.24982468,12.8532609 7.60308539,13 8.01612903,13 C8.42917268,13 8.78243338,12.8532609 9.07591164,12.5597826 C9.3693899,12.2663043 9.51612903,11.9130436 9.51612903,11.5 C9.51612903,11.0869564 9.3693899,10.7336957 9.07591164,10.4402174 C8.78243338,10.1467391 8.42917268,10 8.01612903,10 Z M6.58064516,3.41935484 L6.83870968,7.80645161 C6.83870968,7.89247328 6.87634425,7.97311844 6.9516129,8.0483871 C7.02688156,8.12365575 7.11827973,8.16129032 7.22580645,8.16129032 L8.77419355,8.16129032 C8.88172027,8.16129032 8.97311844,8.12365575 9.0483871,8.0483871 C9.12365575,7.97311844 9.16129032,7.89247328 9.16129032,7.80645161 L9.41935484,3.41935484 C9.41935484,3.29032258 9.38172027,3.18817188 9.30645161,3.11290323 C9.23118296,3.03763457 9.13978478,3 9.03225806,3 L6.96774194,3 C6.86021522,3 6.76881704,3.03763457 6.69354839,3.11290323 C6.61827973,3.18817188 6.58064516,3.29032258 6.58064516,3.41935484 Z"></path>
              </svg>
            </div>
          ) : null}
        </>
      );
    };

    const formListInputError = (errMsg, type) => {
      return this.state.isCreditCardCheck[type] === 'FAIL' ? (
        <div className="text-red-500 my-1 whitespace-nowrap">{errMsg}</div>
      ) : null;
    };

    return (
      <div id="PaymentComp" className={`loginCardBox`}>
        {/* 等payu组件加载完成，才显示 */}
        {listLoading || !inited ? (
          <div className="mt-4">
            <Skeleton color="#f5f5f5" width="100%" height="50%" count={4} />
          </div>
        ) : this.state.listErr ? (
          <div className="text-center p-4">{this.state.listErr}</div>
        ) : listVisible ? (
          <>
            {_errJSX}
            {creditCardListMerged.map((el, idx) => {
              return (
                <>
                  <CardItemCover
                    el={el}
                    lastItem={idx === creditCardListMerged.length - 1}
                    selectedSts={el.id === selectedId}
                    canDelete={true}
                    needReConfirmCVV={this.props.needReConfirmCVV}
                    handleClickCardItem={this.handleClickCardItem.bind(
                      this,
                      el
                    )}
                    handleClickDeleteBtn={this.handleClickDeleteBtn.bind(
                      this,
                      el
                    )}
                    deleteCard={this.deleteCard.bind(this, { el, idx })}
                    currentCvvChange={this.currentCvvChange.bind(this, el)}
                    updateConfirmTooltipVisible={(status) => {
                      this.updateConfirmTooltipVisible(el, status);
                    }}
                  />
                </>
              );
            })}
            <div
              className="p-4 border text-center mt-2 rounded ui-cursor-pointer font-weight-normal"
              ref={(node) => {
                if (node) {
                  node.style.setProperty('border-width', '.1rem', 'important');
                  node.style.setProperty('border-style', 'dashed', 'important');
                }
              }}
              onClick={this.handleClickAdd}
            >
              <span className="rc-styled-link">
                <FormattedMessage id="addNewCreditCard" />
              </span>
            </div>
            {checkboxListForCardList.map((item, i) => (
              <div className="row mt-4" key={i}>
                <div className="col-12">
                  <div className="rc-input rc-input--inline w-100 mw-100">
                    <input
                      className="rc-input__checkbox"
                      id={`id-payu-${item.key}`}
                      name={`id-payu-${item.key}`}
                      onChange={this.onCheckboxChange.bind(this, item)}
                      type="checkbox"
                      checked={item.value}
                    />
                    <label
                      className="rc-input__label--inline text-break"
                      htmlFor={`id-payu-${item.key}`}
                    >
                      <FormattedMessage id={item.langKey} />
                    </label>
                  </div>
                </div>
                {item.showInstallMentTable ? (
                  <div className="col-12 mb-2">
                    <InstallmentTable
                      defaultValue={0}
                      list={installMentTableData}
                      onChange={this.installmentTableChanger}
                    />
                  </div>
                ) : null}
              </div>
            ))}
          </>
        ) : null}
        {/* edit form */}
        <div
          className={`credit-card-content ${isEdit && inited ? '' : 'hidden'}`}
          id="credit-card-content"
        >
          {window.__.env.REACT_APP_COUNTRY == 'ru' ? (
            <div className="credit-card-form">
              <div className="rc-margin-bottom--xs">
                <div className="content-asset">
                  {_errJSX}
                  {_successTipJSX}

                  <p className="m-0">{CreditCardImg}</p>
                </div>
                <div className="flex h-20 mb-2">
                  <div className="w-100">
                    <div className="form-group">
                      <label
                        className={formListLabelColor(
                          'form-control-label text-black text-xs font-normal',
                          'cardNumber'
                        )}
                        htmlFor="cardNumber"
                      >
                        <FormattedMessage id="payment.cardNumber" />
                        <span className="red">*</span>
                        <div className="ru-cardFrom cardFormBox mt-1">
                          <span className="w-full cardForm relative">
                            <div className="flex">
                              <div className="w-100">
                                <div className="core form-group required">
                                  <span
                                    className="rc-input rc-input--full-width"
                                    input-setup="true"
                                  >
                                    <input
                                      type="tel"
                                      className={formListInputColor(
                                        'form-control h-10 pl-3 py-0 border border-gray-300 rounded-md placeholder-gray-300',
                                        'cardNumber'
                                      )}
                                      id="cardNumber"
                                      autocomplete="off"
                                      value={creditCardInfoForm.cardNumber
                                        .replace(/\s/g, '')
                                        .replace(/(\d{4})(?=\d)/g, '$1 ')}
                                      onChange={this.cardInfoInputChange}
                                      onKeyUp={this.cardNumberChange}
                                      onBlur={this.inputBoxBlur}
                                      name="cardNumber"
                                      placeholder={
                                        this.props.intl?.messages.cardNumber
                                      }
                                    />
                                  </span>
                                  {formListInputError(
                                    'неверный номер карты.',
                                    'cardNumber'
                                  )}
                                </div>
                              </div>
                            </div>
                            <span className="cardImage absolute top-2 right-0">
                              <LazyLoad>
                                <img
                                  alt="Card image"
                                  src={getCardImg({
                                    supportPaymentMethods,
                                    currentVendor: this.state.currentVendor
                                  })}
                                  className="img"
                                />
                              </LazyLoad>
                            </span>
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-group row mb-0 w-100 mx-0 flex-nowrap h-20">
                  <label
                    className={formListLabelColor(
                      'form-control-label my-0 w-1/2 text-black text-xs font-normal',
                      'cardMmyy'
                    )}
                    htmlFor="cardNumber"
                  >
                    Дата окончания
                    <span className="red">*</span>
                    <div className="core form-group required mt-1">
                      <span
                        className="rc-input rc-input--full-width"
                        input-setup="true"
                      >
                        <input
                          type="tel"
                          autocomplete="off"
                          className={formListInputColor(
                            'rc-text-colour--iconography font-thin form-control phone border border-gray-300 rounded-md h-10 pl-3 py-0 placeholder-gray-300',
                            'cardMmyy'
                          )}
                          min-lenght="18"
                          max-length="18"
                          value={creditCardInfoForm.cardMmyy}
                          onChange={this.cardInfoInputChange}
                          onBlur={this.inputBoxBlur}
                          name="cardMmyy"
                          id="cardMmyy"
                          maxLength="5"
                          placeholder={'MM/YY'}
                        />
                        {formListInputIcon('cardMmyy')}
                      </span>
                      {formListInputError(
                        'Неверная дата окончания.',
                        'cardMmyy'
                      )}
                    </div>
                  </label>
                  <div className="w-5"></div>
                  <label
                    className={formListLabelColor(
                      'form-control-label my-0 w-1/2 text-black text-xs font-normal',
                      'cardCvv'
                    )}
                    htmlFor="cardNumber"
                  >
                    CVV
                    <span className="red">*</span>
                    <div className="core form-group required mt-1">
                      <span
                        className="rc-input rc-input--full-width relative"
                        input-setup="true"
                      >
                        <input
                          type="password"
                          autocomplete="off"
                          className={formListInputColor(
                            'rc-text-colour--iconography font-thin form-control phone  rounded-md h-10 pl-3 py-0 placeholder-gray-300',
                            'cardCvv'
                          )}
                          value={creditCardInfoForm.cardCvv}
                          onChange={this.cardInfoInputChange}
                          onBlur={this.inputBoxBlur}
                          name="cardCvv"
                          maxLength="4"
                          placeholder="CVV"
                        />
                        {formListInputIcon('cardCvv')}
                      </span>
                      {formListInputError(
                        'Неверный код безопасности.',
                        'cardCvv'
                      )}
                    </div>
                  </label>
                </div>
                <div className="flex overflow_visible">
                  <div className="w-100">
                    <label
                      className={formListLabelColor(
                        'form-control-label my-0 w-full text-black text-xs font-normal',
                        'cardOwner'
                      )}
                      htmlFor="cardNumber"
                    >
                      <FormattedMessage id="payment.cardOwner" />
                      <span className="red">*</span>
                      <div className="core form-group required mt-1">
                        <span
                          className="rc-input rc-input--full-width"
                          input-setup="true"
                        >
                          <input
                            type="text"
                            className={formListInputColor(
                              'rc-input__control form-control cardOwner border border-gray-300 rounded-md h-10 pl-3 py-0 placeholder-gray-300',
                              'cardOwner'
                            )}
                            autocomplete="off"
                            name="cardOwner"
                            value={creditCardInfoForm.cardOwner}
                            onChange={this.cardInfoInputChange}
                            onBlur={this.inputBoxBlur}
                            maxLength="40"
                            placeholder="SERGEY IVANOV"
                          />
                          {formListInputIcon('cardOwner')}
                        </span>
                        {formListInputError(
                          'поле необходимо заполнить.',
                          'cardOwner'
                        )}
                      </div>
                    </label>
                  </div>
                </div>
                <div className="row">
                  {needEmail ? (
                    <div className="col-sm-6">
                      <div className="form-group required">
                        <label className="form-control-label">
                          <FormattedMessage id="payment.email" />
                        </label>
                        <span
                          className="rc-input rc-input--full-width"
                          input-setup="true"
                        >
                          <input
                            type="email"
                            className="rc-input__control email"
                            id="email"
                            value={creditCardInfoForm.email}
                            onChange={this.cardInfoInputChange}
                            onBlur={this.inputBlur}
                            name="email"
                            maxLength="254"
                          />
                          <label className="rc-input__label" htmlFor="email" />
                        </span>
                        <div className="invalid-feedback">
                          <FormattedMessage id="payment.errorInfo2" />
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {needPhone ? (
                    <div className="col-sm-6">
                      <div className="form-group required">
                        <label
                          className="form-control-label"
                          htmlFor="phoneNumber"
                        >
                          <FormattedMessage id="payment.phoneNumber" />
                        </label>
                        <span
                          className="rc-input rc-input--full-width"
                          input-setup="true"
                          data-js-validate=""
                          data-js-warning-message="*Phone Number isn’t valid"
                        >
                          <input
                            type="text"
                            autocomplete="off"
                            className="rc-input__control input__phoneField shippingPhoneNumber"
                            min-lenght="18"
                            max-length="18"
                            data-phonelength="18"
                            // data-js-validate="(^(\+?7|8)?9\d{9}$)"
                            data-js-pattern="(^\d{10}$)"
                            data-range-error="The phone number should contain 10 digits"
                            value={creditCardInfoForm.phoneNumber}
                            onChange={this.cardInfoInputChange}
                            onBlur={this.inputBlur}
                            name="phoneNumber"
                            maxLength="2147483647"
                          />
                          <label
                            className="rc-input__label"
                            htmlFor="phoneNumber"
                          />
                        </span>
                        <div className="invalid-feedback">
                          <FormattedMessage id="payment.errorInfo2" />
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>

                {creditCardListMerged.length > 0 && (
                  <div className="row">
                    <div className="col-12 text-right">
                      <span
                        className="rc-styled-link"
                        onClick={this.hanldeClickReturnToCardList}
                      >
                        <FormattedMessage id="payment.returnToCardList" />
                      </span>
                    </div>
                  </div>
                )}

                {checkboxListForForm.map((item, i) => (
                  <div className="row" key={i}>
                    <div className="col-12">
                      <div className="rc-input rc-input--inline w-100 mw-100">
                        <input
                          className="rc-input__checkbox"
                          id={`id-payu-${item.key}`}
                          onChange={this.onCheckboxChange.bind(this, item)}
                          name={item.key}
                          // value={item.value}
                          type="checkbox"
                          checked={item.value}
                          disabled={item.disabled}
                        />
                        <label
                          className="rc-input__label--inline text-break"
                          htmlFor={`id-payu-${item.key}`}
                        >
                          <FormattedMessage id={item.langKey} />
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className={`credit-card-form`}>
              <div className="rc-margin-bottom--xs">
                <div className="content-asset">
                  {_errJSX}
                  {_successTipJSX}

                  <p className="m-0">{CreditCardImg}</p>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label
                        className="form-control-label"
                        htmlFor="cardNumber"
                      >
                        <FormattedMessage id="payment.cardNumber" />
                        <span className="red">*</span>
                        <div className="cardFormBox">
                          <span className="cardImage">
                            <LazyLoad>
                              <img
                                alt="Card image"
                                src={getCardImg({
                                  supportPaymentMethods,
                                  currentVendor: this.state.currentVendor
                                })}
                                className="img"
                              />
                            </LazyLoad>
                          </span>
                          <span className="cardForm">
                            <div className="row">
                              <div className="col-sm-5">
                                <div className="form-group required">
                                  <span
                                    className="rc-input rc-input--full-width"
                                    input-setup="true"
                                  >
                                    <input
                                      type="tel"
                                      className="rc-input__control form-control email"
                                      id="number"
                                      value={creditCardInfoForm.cardNumber}
                                      onChange={this.cardInfoInputChange}
                                      onKeyUp={this.cardNumberChange}
                                      // onFocus={(e) => {
                                      //   this.cardNumberFocus();
                                      // }}
                                      // onBlur={(e) => {
                                      //   this.cardNumberBlur();
                                      // }}
                                      name="cardNumber"
                                      maxLength="254"
                                      placeholder={
                                        this.props.intl?.messages.cardNumber
                                      }
                                    />
                                  </span>
                                  <div className="invalid-feedback ui-position-absolute">
                                    <FormattedMessage id="payment.errorInfo2" />
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-4">
                                <div className="form-group required">
                                  <span
                                    className="rc-input rc-input--full-width"
                                    input-setup="true"
                                    data-js-validate=""
                                    data-js-warning-message="*Phone Number isn’t valid"
                                  >
                                    <input
                                      type="tel"
                                      className="rc-input__control form-control phone"
                                      min-lenght="18"
                                      max-length="18"
                                      data-phonelength="18"
                                      data-js-validate="(^(\+?7|8)?9\d{9}$)"
                                      data-range-error="The phone number should contain 10 digits"
                                      value={creditCardInfoForm.cardMmyy}
                                      onChange={this.cardInfoInputChange}
                                      name="cardMmyy"
                                      id="cardMmyy"
                                      maxLength="5"
                                      placeholder={'MM/YY'}
                                    />
                                  </span>
                                  <div className="invalid-feedback ui-position-absolute">
                                    The field is required.
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-3">
                                <div className="form-group required">
                                  <span
                                    className="rc-input rc-input--full-width"
                                    input-setup="true"
                                    data-js-validate=""
                                    data-js-warning-message="*Phone Number isn’t valid"
                                  >
                                    <input
                                      type="password"
                                      autoComplete="new-password"
                                      className="rc-input__control form-control phone"
                                      data-phonelength="18"
                                      data-js-validate="(^(\+?7|8)?9\d{9}$)"
                                      data-range-error="The phone number should contain 10 digits"
                                      value={creditCardInfoForm.cardCvv}
                                      onChange={this.cardInfoInputChange}
                                      name="cardCvv"
                                      maxLength="4"
                                      placeholder="CVV"
                                    />
                                  </span>
                                  <div className="invalid-feedback ui-position-absolute">
                                    The field is required.
                                  </div>
                                </div>
                              </div>
                            </div>
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row overflow_visible">
                  <div className="col-sm-12">
                    <div className="form-group required">
                      <label className="form-control-label">
                        <FormattedMessage id="payment.cardOwner" />
                      </label>
                      <span
                        className="rc-input rc-input--full-width"
                        input-setup="true"
                      >
                        <input
                          type="text"
                          autocomplete="off"
                          className="rc-input__control form-control cardOwner"
                          name="cardOwner"
                          value={creditCardInfoForm.cardOwner}
                          onChange={this.cardInfoInputChange}
                          onBlur={this.inputBlur}
                          maxLength="40"
                        />
                        <label
                          className="rc-input__label"
                          htmlFor="cardOwner"
                        />
                      </span>
                      <div className="invalid-feedback">
                        <FormattedMessage id="payment.errorInfo2" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {needEmail ? (
                    <div className="col-sm-6">
                      <div className="form-group required">
                        <label className="form-control-label">
                          <FormattedMessage id="payment.email" />
                        </label>
                        <span
                          className="rc-input rc-input--full-width"
                          input-setup="true"
                        >
                          <input
                            type="email"
                            className="rc-input__control email"
                            id="email"
                            value={creditCardInfoForm.email}
                            onChange={this.cardInfoInputChange}
                            onBlur={this.inputBlur}
                            name="email"
                            maxLength="254"
                          />
                          <label className="rc-input__label" htmlFor="email" />
                        </span>
                        <div className="invalid-feedback">
                          <FormattedMessage id="payment.errorInfo2" />
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {needPhone ? (
                    <div className="col-sm-6">
                      <div className="form-group required">
                        <label
                          className="form-control-label"
                          htmlFor="phoneNumber"
                        >
                          <FormattedMessage id="payment.phoneNumber" />
                        </label>
                        <span
                          className="rc-input rc-input--full-width"
                          input-setup="true"
                          data-js-validate=""
                          data-js-warning-message="*Phone Number isn’t valid"
                        >
                          <input
                            type="text"
                            autocomplete="off"
                            className="rc-input__control input__phoneField shippingPhoneNumber"
                            min-lenght="18"
                            max-length="18"
                            data-phonelength="18"
                            // data-js-validate="(^(\+?7|8)?9\d{9}$)"
                            data-js-pattern="(^\d{10}$)"
                            data-range-error="The phone number should contain 10 digits"
                            value={creditCardInfoForm.phoneNumber}
                            onChange={this.cardInfoInputChange}
                            onBlur={this.inputBlur}
                            name="phoneNumber"
                            maxLength="2147483647"
                          />
                          <label
                            className="rc-input__label"
                            htmlFor="phoneNumber"
                          />
                        </span>
                        <div className="invalid-feedback">
                          <FormattedMessage id="payment.errorInfo2" />
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>

                {creditCardListMerged.length > 0 && (
                  <div className="row">
                    <div className="col-12 text-right">
                      <span
                        className="rc-styled-link"
                        onClick={this.hanldeClickReturnToCardList}
                      >
                        <FormattedMessage id="payment.returnToCardList" />
                      </span>
                    </div>
                  </div>
                )}

                {checkboxListForForm.map((item, i) => (
                  <div className="row" key={i}>
                    <div className="col-12">
                      <div className="rc-input rc-input--inline w-100 mw-100">
                        <input
                          className="rc-input__checkbox"
                          id={`id-payu-${item.key}`}
                          onChange={this.onCheckboxChange.bind(this, item)}
                          name={item.key}
                          // value={item.value}
                          type="checkbox"
                          checked={item.value}
                          disabled={item.disabled}
                        />
                        <label
                          className="rc-input__label--inline text-break"
                          htmlFor={`id-payu-${item.key}`}
                        >
                          <FormattedMessage id={item.langKey} />
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default MemberCardList;
// export default injectIntl(MemberCardList, { forwardRef: true });
