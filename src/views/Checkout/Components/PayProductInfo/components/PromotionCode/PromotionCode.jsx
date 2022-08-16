import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import { Button } from '@/components/Common';
import { reaction } from 'mobx';
import { inject, observer } from 'mobx-react';
import { formatMoney } from '@/utils/utils';
import cn from 'classnames';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

@inject('checkoutStore', 'loginStore', 'paymentStoreNew')
@injectIntl
@observer
class PromotionCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      discount: [], //促销码的折扣信息汇总
      promotionInputValue: this.props.checkoutStore.promotionCode || '', //输入的促销码
      lastPromotionInputValue: '', //上一次输入的促销码
      isClickApply: false, //是否点击apply按钮
      // 1.show not valid promotion code's error message 2.show the message of delete one applied promotion code
      promotionCodeMsg: {
        errorMsg: '',
        normalMsg: ''
      },
      deletingLoading: false
    };
    this.applyButtton = React.createRef();
  }
  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  get promotionVOList() {
    return this.props.checkoutStore.promotionVOList;
  }
  async componentDidMount() {
    //监听Point组件选择积分的时候触发删除coupon
    reaction(
      () => this.props.checkoutStore.selectDiscountWay,
      () => {
        if (this.props.checkoutStore.promotionCode) {
          this.handleClickDeletePromotion();
        }
      }
    );

    this.applyButtton.current.click();
  }
  handleClickPromotionApply = async (falseCodeAndReRequest) => {
    const {
      intl: { formatMessage },
      paymentStoreNew: { subForm, setWelcomeBoxValue, setIsStudentPurchase }
    } = this.props;
    let { discount } = this.state;
    try {
      let result = {};
      if (!this.state.promotionInputValue && !falseCodeAndReRequest) return;
      this.setState({
        isClickApply: !falseCodeAndReRequest,
        lastPromotionInputValue: this.state.promotionInputValue
      });
      // 确认 promotionCode 后使用之前的参数查询一遍 purchase 接口
      let purchasesPara =
        localItemRoyal.get('rc-payment-purchases-param') || {};
      purchasesPara.promotionCode = this.state.promotionInputValue;
      purchasesPara.purchaseFlag = false; // 购物车: true，checkout: false
      purchasesPara.address1 = this.props.deliveryAddress?.address1;
      let tmpParam = Object.assign(purchasesPara, {
        ...this.props,
        isThrowValidPromotionCodeErr: true,
        isThrowInterfaceErr: true,
        promotionCode: this.state.promotionInputValue //以现在promotionCode为主
      });
      if (!this.isLogin) {
        purchasesPara.guestEmail = this.props.guestEmail;

        tmpParam = Object.assign(tmpParam, {
          transactionId: sessionItemRoyal.get('guest-uuid')
        });
        //游客
        result = await this.props.checkoutStore.updateUnloginCart(tmpParam);
      } else {
        purchasesPara.subscriptionFlag = subForm?.buyWay === 'frequency';
        //会员
        result = await this.props.checkoutStore.updateLoginCart(tmpParam);
      }

      //表示输入apply promotionCode成功
      const applyPromotionCodeSuccess =
        !result?.context?.promotionFlag || result?.context?.couponCodeFlag;
      if (applyPromotionCodeSuccess) {
        discount.splice(0, 1, 1); //(起始位置,替换个数,插入元素)
        this.setState({ discount });
        this.props.sendPromotionCode(this.state.promotionInputValue);
        setIsStudentPurchase(result?.context?.promotionSubType === 8);
        if (result?.context?.promotionSubType === 8) {
          setWelcomeBoxValue('no');
        }
      } else {
        discount.pop();
        this.setState({ discount });
        this.props.sendPromotionCode('');
        setIsStudentPurchase(false);
      }
      this.setState(
        {
          isClickApply: false,
          promotionInputValue: localItemRoyal.get('rc-promotionCode')
        },
        () => {
          result.code === 'K-000000' && this.handleClickPromotionApply(true);
        }
      );

      //this.props.paymentStoreNew.serCurPayWayVal('');
      if (window.__.env.REACT_APP_COUNTRY == 'jp') {
        this.props.confirmCalculateServiceFeeAndLoyaltyPoints();
      }
      // promotion code不成功时，throw前端错误提示
      if (!applyPromotionCodeSuccess) {
        throw new Error(formatMessage({ id: 'validPromotionCode' }));
      }
    } catch (err) {
      // catch错误信息，包括:
      // 1. 前端主动throw的
      // 2. catch接口的
      this.props.sendPromotionCode('');
      setIsStudentPurchase(false);
      this.showPromotionCodeMsg({ msg: err.message });
      this.setState({
        isClickApply: false
      });
    }
  };
  handleClickDeletePromotion = async () => {
    try {
      const {
        checkoutStore,
        intl: { formatMessage },
        paymentStoreNew: { subForm, setIsStudentPurchase }
      } = this.props;
      const { discount, promotionInputValue: currentCode } = this.state;
      this.setState({ deletingLoading: true });
      let result = {};
      await checkoutStore.removePromotionCode();
      await checkoutStore.removeCouponCode();
      // 删除掉之后 promotionCode 后再使用之前的参数查询一遍 purchase接口
      let purchasesPara =
        localItemRoyal.get('rc-payment-purchases-param') || {};
      purchasesPara.promotionCode = '';
      const param = Object.assign({}, purchasesPara, {
        isThrowInterfaceErr: true
      });
      if (!this.isLogin) {
        // 游客
        result = await checkoutStore.updateUnloginCart(param);
      } else {
        purchasesPara.subscriptionFlag = subForm.buyWay === 'frequency';
        // 会员
        result = await checkoutStore.updateLoginCart(param);
      }
      discount.pop();
      this.props.sendPromotionCode('');
      this.setState({
        discount: [],
        lastPromotionInputValue: '',
        promotionInputValue: '',
        deletingLoading: false
      });
      setIsStudentPurchase(false);
      if (window.__.env.REACT_APP_COUNTRY == 'jp') {
        this.props.confirmCalculateServiceFeeAndLoyaltyPoints();
      }
      this.showPromotionCodeMsg({
        msg: formatMessage(
          { id: 'promotion.codeXIsDeleted' },
          { code: currentCode }
        ),
        type: 'normal'
      });
    } catch (err) {
      console.log(err);
      this.showPromotionCodeMsg({ msg: err.message });
    }
  };
  showPromotionCodeMsg = ({ msg, type = 'error' }) => {
    if (type === 'error') {
      this.setState({
        promotionCodeMsg: { errorMsg: msg }
      });
    } else if (type === 'normal') {
      this.setState({
        promotionCodeMsg: { normalMsg: msg }
      });
    }

    setTimeout(() => {
      this.setState({
        promotionCodeMsg: { errorMsg: '', normalMsg: '' }
      });
    }, 5000);
  };
  handlerChange = (e) => {
    let promotionInputValue = e.target.value;
    this.setState(
      {
        promotionInputValue
      },
      () => {
        this.props.sendPromotionCode(this.state.promotionInputValue);
      }
    );
  };
  render() {
    const { promotionCodeMsg, deletingLoading } = this.state;
    const {
      checkoutStore: { couponCodeFitFlag },
      intl: { formatMessage }
    } = this.props;
    return (
      <>
        {/* 支付新增promotionCode(选填) */}
        <div className="px-5 border-top border-bottom">
          <div className="mb-3 d-flex justify-content-between items-center">
            <span
              className="rc-input rc-input--inline rc-input--label mr-0"
              style={{ width: '150px' }}
            >
              <FormattedMessage id="promotionCode">
                {(txt) => (
                  <input
                    className="rc-input__control"
                    id="id-promotionCode"
                    type="text"
                    autoComplete="off"
                    name="text"
                    placeholder={txt}
                    value={this.state.promotionInputValue}
                    onChange={this.handlerChange}
                  />
                )}
              </FormattedMessage>

              <label className="rc-input__label" htmlFor="id-promotionCode" />
            </span>
            <div className="promo-code-submit">
              <Button
                ref={this.applyButtton}
                id="promotionApply"
                data-testid="PromotionApplyBtn"
                loading={this.state.isClickApply}
                disabled={sessionItemRoyal.get('recommend_product')}
                style={{ marginTop: '5px', float: 'right' }}
                onClick={() => this.handleClickPromotionApply(false)}
              >
                <FormattedMessage id="apply" />
              </Button>
            </div>
          </div>
          {/* 使用promotion code接口报错message提示，5s消失 */}
          {promotionCodeMsg.normalMsg ? (
            <div className="mb-3" style={{ fontSize: '.875rem' }}>
              {promotionCodeMsg.normalMsg}
            </div>
          ) : null}
          {promotionCodeMsg.errorMsg ? (
            <div className="mb-3 text-rc-red" style={{ fontSize: '.875rem' }}>
              {promotionCodeMsg.errorMsg}
            </div>
          ) : null}
          {this.state.discount.length === this.promotionVOList.length &&
            this.state.discount.map((el, i) => {
              const code = this.promotionVOList[i].promotionCode.toUpperCase();
              const tip = formatMessage(
                { id: 'promotion.totalMoneySavedThanksToThePromotionCode' },
                {
                  code,
                  price: formatMoney(this.promotionVOList[i].discountPrice)
                }
              );
              const nonAppliqué = formatMessage({ id: 'Non appliqué' });
              return (
                <div className="flex" key={i}>
                  <span className="iconfont green mr-1 text-lg iconchenggong font-bold" />
                  <span title={tip} className="ui-text-overflow-line1">
                    {tip}
                  </span>
                  {!couponCodeFitFlag && (
                    <span
                      title={nonAppliqué}
                      className="text-rc-red ui-text-overflow-line1"
                    >
                      {nonAppliqué}
                    </span>
                  )}
                  <button
                    className={cn(
                      deletingLoading
                        ? 'ui-btn-loading ui-btn-loading-border-red mb-4'
                        : 'rc-icon rc-close--sm rc-iconography'
                    )}
                    disabled={deletingLoading}
                    style={{
                      fontSize: '1.125rem',
                      marginLeft: '.625rem',
                      lineHeight: '1.25rem',
                      cursor: 'pointer'
                    }}
                    onClick={this.handleClickDeletePromotion}
                  />
                </div>
              );
            })}
        </div>
        {/* 支付新增promotionCode(选填) end */}
      </>
    );
  }
}

export default PromotionCode;
