import React from 'react';
import './index.less';
import { FormattedMessage, injectIntl } from 'react-intl';
import Skeleton from 'react-skeleton-loader';
import { inject, observer } from 'mobx-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BreadCrumbs from '@/components/BreadCrumbs';
import SideMenu from '@/components/SideMenu';
import visaImg from '@/assets/images/credit-cards/visa.svg';
import PaymentComp from './components/PaymentComp';
import AddressComp from './components/AddressComp';
import Selection from '@/components/Selection';
import { getDictionary, dynamicLoadCss } from '@/utils/utils';
import DatePicker from 'react-datepicker';
import subscriptionIcon from './images/subscription.png';
import pauseIcon from './images/pause.png';
import cancelIcon from './images/cancel.png';
import skipIcon from './images/skip.png';
import dateIcon from './images/date.png';
import deliveryIcon from './images/deliveryAddress.png';
import billingIcon from './images/billingAddress.png';
import paymentIcon from './images/payment.png';
import { Link } from 'react-router-dom';
import {
  ORDER_STATUS_ENUM,
  CREDIT_CARD_IMG_ENUM
  // CREDIT_CARD_IMGURL_ENUM
} from '@/utils/constant';
import {
  updateDetail,
  getAddressDetail,
  getSubDetail,
  skipNextSub,
  cancelAllSub,
  orderNowSub,
  getPromotionPrice,
  updateNextDeliveryTime
} from '@/api/subscription';
import { queryCityNameById } from '@/api';
import Modal from '@/components/Modal';
import { formatMoney } from '@/utils/utils';
import resolve from 'resolve';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { setSeoConfig } from '@/utils/utils';

const localItemRoyal = window.__.localItemRoyal;

@inject('checkoutStore', 'loginStore')
@injectIntl
class SubscriptionDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //订阅购物车参数
      subTotal: 0,
      subDiscount: 0,
      subShipping: 0,
      promotionDiscount: 0,
      promotionDesc: '',
      subTradeTotal: 0,
      //订阅购物车参数
      discount: [], //促销码的折扣信息汇总
      promotionInputValue: '', //输入的促销码
      isClickApply: false, //是否点击apply按钮
      lastPromotionInputValue: '', //上一次输入的促销码
      isShowValidCode: false, //是否显示无效promotionCode
      subDetail: {},
      loading: false,
      subId: 0,
      selectedTime: 'Every 4 weeks',
      nextOrderTime: '2020-18-06',
      productName: 'Glycobalance Feline',
      productPrice: '$46.54',
      productUrl:
        'https://wanmi-b2b.oss-cn-shanghai.aliyuncs.com/202004291741049919.png',
      totalMoney: 10,
      shipping: 'FREE',
      totalRealPay: 0,
      shippingAddress: {
        name: 'George Guo',
        address: 'TESTST',
        code: '2929292',
        addressType: 'SNSN,CO 27272'
      },
      billingAddress: {
        name: 'George Guo',
        address: 'TESTST',
        code: '2929292',
        addressType: 'SNSN,CO 27272'
      },
      payment: {
        name: 'George Guo',
        card: '00000008',
        type: 'CREDIT',
        cardImg: visaImg
      },
      isChangeQuatity: false,
      type: 'main',
      currentCardInfo: {
        id: 'PM202007100416145447',
        customerId: 'ff808081725658a001725a83be530084',
        cardNumber: '4772910000000007',
        cardType: 'CREDIT',
        cardMmyy: '12/20',
        cardCvv: '888',
        cardOwner: 'zhuyuqi22',
        email: '396838319@qq.com',
        vendor: 'VISA',
        phoneNumber: '13080534977',
        createTime: '2020-07-10 04:16:15.000',
        updateTime: null,
        isDefault: 0,
        delFlag: 0
      },
      currentDeliveryAddress: {
        cityId: 1,
        countryId: 6
      },
      currentBillingAddress: {
        cityId: 1,
        countryId: 6
      },
      addressType: '',
      countryList: [],
      frequencyList: [],
      orderOptions: [],
      modalShow: false,
      currentGoodsInfo: [],
      modalList: [
        {
          title: this.props.intl.messages.modalSkipTitle,
          content: this.props.intl.messages.modalSkipContent,
          type: 'skipNext'
        },
        {
          title: this.props.intl.messages.modalCancelAllTitle,
          content: this.props.intl.messages.modalCancelAllContent,
          type: 'cancelAll'
        },
        {
          title: this.props.intl.messages.modalOrderNowTitle,
          content: this.props.intl.messages.modalOrderNowContent,
          type: 'orderNow'
        }
      ],
      currentModalObj: {
        title: this.props.intl.messages.modalSkipTitle,
        content: this.props.intl.messages.modalSkipContent,
        type: 'skipNext'
      },
      modalType: '',
      errorShow: false,
      errorMsg: '',
      successTipVisible: false,
      minDate: new Date(),
      todaydate: new Date(),
      tabName: ['No start', 'Completed'],
      activeTabIdx: 0,
      isMobile: false,
      noStartYearOption: [],
      completedYearOption: [],
      noStartYear: {
        value: ''
      },
      completedYear: {
        value: ''
      },
      isActive: false
    };
  }
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }

  async componentDidMount() {
    if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(
      navigator.userAgent)) {
        this.setState({isMobile: true})
      }
    getDictionary({ type: 'country' }).then((res) => {
      this.setState({
        countryList: res
      });
    });
    await Promise.all([
      getDictionary({ type: 'Frequency_week' }),
      getDictionary({ type: 'Frequency_month' })
    ]).then((dictList) => {
      this.setState(
        {
          frequencyList: [...dictList[0], ...dictList[1]]
        },
        () => {
          // this.props.updateSelectedData(this.state.form);
        }
      );
    });
    setSeoConfig({
      goodsId: '',
      categoryId: '',
      pageName: 'Subscription Page'
    });
    // if (localItemRoyal.get('isRefresh')) {
    //   localItemRoyal.remove('isRefresh');
    //   window.location.reload();
    //   return false;
    // }

    await this.getDetail();

    await this.doGetPromotionPrice();

    this.setState({
      subId: this.props.match.params.subscriptionNumber
    });
  }
  get frequencyListOptions() {
    return this.state.frequencyList.map((ele) => {
      delete ele.value;
      return {
        value: ele.valueEn,
        ...ele
      };
    });
  }
  changeTab(e, i) {
    this.setState({ activeTabIdx: i });
  }
  onDateChange(date, goodsInfo) {
    let { subDetail } = this.state;
    subDetail.nextDeliveryTime = moment(date).format('YYYY-MM-DD');
    let param = {
      subscribeId: subDetail.subscribeId,
      nextDeliveryTime: subDetail.nextDeliveryTime,
      goodsItems: goodsInfo
    };
    this.setState({ loading: true });
    updateNextDeliveryTime(param)
      .then((res) => {
        this.getDetail(
          this.showErrMsg.bind(
            this,
            this.props.intl.messages.saveSuccessfullly,
            'success'
          )
        );
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
    // updateDetail(param)
    //   .then((res) => {
    //     // this.setState({ loading: false });
    //     // window.location.reload();
    //     this.getDetail(
    //       this.showErrMsg.bind(
    //         this,
    //         this.props.intl.messages.saveSuccessfullly,
    //         'success'
    //       )
    //     );
    //   })
    //   .catch((err) => {
    //     this.setState({ loading: false });
    //   });
  }
  //订阅数量更改
  async onQtyChange() {
    try {
      // this.showErrMsg(this.props.intl.messages.saveSuccessfullly, 'success', () => this.getDetail());
      //await this.doUpdateDetail(param)
      await this.doGetPromotionPrice(this.state.lastPromotionInputValue);
      //await this.getDetail()
    } catch (err) {
      this.showErrMsg(err.message);
    }
  }
  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  async doUpdateDetail(param) {
    try {
      this.setState({ loading: true });
      await updateDetail(param);
    } catch (err) {
      throw new Error(err.message);
    } finally {
      this.setState({ loading: false });
    }
  }
  async getDetail(fn) {
    try {
      this.setState({ loading: true });
      const res = await getSubDetail(
        this.props.match.params.subscriptionNumber
      )
      let subDetail = res.context;
      let noStartYear = {}
      let completedYear = {}
      let noStartYearOption = []
      let completedYearOption = []
      let completeOption = new Set(subDetail.completedTradeList.map(el => {
        return el.tradeState.createTime.split('-')[0]
      }))
      let noStartOption = new Set(subDetail.noStartTradeList.map(el => {
        return el.tradeItems[0].nextDeliveryTime.split('-')[0]
      }))
      completeOption.forEach(el => {
        completedYearOption.push({name: el, value: el})
      })
      completedYear = { value: completedYearOption[0]['value'] }
      noStartOption.forEach(el => {
        noStartYearOption.push({name: el, value: el})
      })
      noStartYear = { value: noStartYearOption[0]['value'], name: noStartYearOption[0]['value'] }

      subDetail.goodsInfo = subDetail.goodsInfo.map((el) => {
        let filterData =
          this.frequencyListOptions.filter(
            (item) => item.id === el.periodTypeId
          )[0] || this.frequencyListOptions[0];
        el.periodTypeValue = filterData.valueEn;
        return el;
      });
      let orderOptions = (subDetail.trades || []).map((el) => {
        let orderStatus =
          ORDER_STATUS_ENUM[el.tradeState.flowState] || el.tradeState.flowState;
        return { value: el.id, name: el.id + ' ' + orderStatus };
      });

      let now = new Date(res.defaultLocalDateTime);
      now.setDate(now.getDate() + 4);
      let cityRes = await queryCityNameById({
        id: [subDetail.consignee.cityId, subDetail.invoice.cityId]
      });
      cityRes = cityRes.context.systemCityVO || [];
      subDetail.consignee.cityName = this.matchCityName(
        cityRes,
        subDetail.consignee.cityId
      );
      subDetail.invoice.cityName = this.matchCityName(
        cityRes,
        subDetail.invoice.cityId
      );
      let tempCardInfo;
      if (subDetail.paymentInfo) {
        const adyenPaymentMethod = subDetail.paymentInfo.adyenPaymentMethod;
        const payuPaymentMethod = subDetail.paymentInfo.payuPaymentMethod;
        if (adyenPaymentMethod) {
          tempCardInfo = {
            paymentMethod: {
              vendor: adyenPaymentMethod.name,
              last_4_digits: adyenPaymentMethod.lastFour,
              holder_name: adyenPaymentMethod.holderName
            },
            phoneNumber: adyenPaymentMethod.phoneNumber
          };
        } else if (payuPaymentMethod) {
          tempCardInfo = {
            paymentMethod: {
              vendor: payuPaymentMethod.vendor,
              last_4_digits: payuPaymentMethod.last_4_digits,
              holder_name: payuPaymentMethod.holder_name
            },
            phoneNumber: subDetail.paymentInfo.phoneNumber
          };
        }
        if (subDetail.paymentInfo.paymentType === 'ADYEN') {
          dynamicLoadCss(
            'https://checkoutshopper-live.adyen.com/checkoutshopper/sdk/3.6.0/adyen.css'
          );
        }
      }
      this.setState(
        {
          subDetail: subDetail,
          currentCardInfo: tempCardInfo,
          currentDeliveryAddress: subDetail.consignee,
          currentBillingAddress: subDetail.invoice,
          orderOptions: orderOptions,
          minDate: now,
          noStartYearOption,
          completedYearOption,
          noStartYear,
          completedYear,
          isActive: subDetail.subscribeStatus === '0'
        },
        () => {
          fn && fn();
        }
      );
    } catch (err) {
      this.showErrMsg(err.message);
      // throw new Error(err);
    } finally {
      this.setState({ loading: false });
    }
  }
  matchCityName(dict, cityId) {
    return dict.filter((c) => c.id === cityId).length
      ? dict.filter((c) => c.id === cityId)[0].cityName
      : cityId;
  }
  async doGetPromotionPrice(promotionCode = '') {
    try {
      //计算Tota
      let goodsInfo = this.state.subDetail.goodsInfo;
      let subTotal = 0;
      for (let goods of goodsInfo) {
        subTotal += Number(goods.originalPrice) * goods.subscribeNum;
      }
      //拼装goodsInfoList参数
      let goodsInfoList = this.state.subDetail.goodsInfo.map((ele) => {
        return {
          goodsInfoId: ele.skuId,
          buyCount: ele.subscribeNum
        };
      });
      //根据参数查询促销的金额与订单运费
      const res = await getPromotionPrice({
        totalPrice: subTotal,
        goodsInfoList,
        promotionCode,
        isAutoSub: true
      });
      //拼装订阅购物车参数
      if (res.code === 'K-000000' && !res.context.promotionFlag) {
        //只有promotionFlag为false的时候表示prootionCode生效
        let subTradeTotal = subTotal + Number(res.context.deliveryPrice);
        // -Number(res.context.discountsPrice);
        //Number(res.context.promotionDiscount);
        this.setState({
          // loading: false,
          subDiscount: res.context.discountsPrice,
          subShipping: res.context.deliveryPrice,
          promotionDiscount: res.context.promotionDiscount,
          promotionDesc: res.context.promotionDesc,
          subTradeTotal,
          subTotal
        });
      }
      return new Promise((resolve) => {
        resolve(res);
      });
    } catch (err) {
      this.showErrMsg(err.message);
      // throw new Error(err);
    } finally {
      this.setState({ loading: false });
    }
  }
  hanldeClickSubmit() {
    let { modalType, subDetail } = this.state;
    this.setState({ loading: true, modalShow: false });
    if (modalType === 'skipNext') {
      skipNextSub({
        subscribeId: subDetail.subscribeId,
        changeField: this.props.intl.messages['subscription.skip'],
        goodsList: this.state.skipNextGoods
      })
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
          this.setState({
            loading: false
          });
          this.showErrMsg(err.message);
        });
    } else if (modalType === 'cancelAll') {
      cancelAllSub({ subscribeId: subDetail.subscribeId })
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
          this.setState({
            loading: false
          });
          this.showErrMsg(err.message);
        });
    } else if (modalType === 'orderNow') {
      orderNowSub({ subscribeId: subDetail.subscribeId })
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
          this.setState({
            loading: false
          });
          this.showErrMsg(err.message);
        });
    }
  }
  showErrMsg(msg, type, fn) {
    if (type === 'success') {
      this.setState({
        successTipVisible: true
      });
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.setState({
          successTipVisible: false
        });
        fn && fn();
      }, 1000);
    } else {
      this.setState({
        errorShow: true,
        errorMsg: msg
      });
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.setState({
          errorShow: false
        });
        fn && fn();
      }, 3000);
    }
  }
  handlerChange(e) {
    let promotionInputValue = e.target.value;
    this.setState({
      promotionInputValue
    });
  }
  render() {
    const data = this.state;
    const { checkoutStore } = this.props;
    let {
      isChangeQuatity,
      discount,
      type,
      currentCardInfo,
      currentDeliveryAddress,
      currentBillingAddress,
      addressType,
      subDetail,
      currentModalObj,
      todaydate,
      isMobile,
      noStartYearOption,
      completedYearOption,
      noStartYear,
      completedYear,
      isActive
    } = this.state;
    console.log(noStartYear, 'hahaha')
    return (
      <div className="subscriptionDetail">
        <div>
          <Header
            showMiniIcons={true}
            showUserIcon={true}
            location={this.props.location}
            history={this.props.history}
            match={this.props.match}
          />

          <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
            <BreadCrumbs />
            <Modal
              key="1"
              visible={this.state.modalShow}
              confirmLoading={this.state.submitLoading}
              modalTitle={currentModalObj.title}
              confirmBtnText={<FormattedMessage id="yes" />}
              cancelBtnVisible={<FormattedMessage id="cancel" />}
              close={() => {
                this.setState({ modalShow: false });
              }}
              hanldeClickConfirm={() => this.hanldeClickSubmit()}
            >
              <span>{currentModalObj.content}</span>
            </Modal>
            <div className="rc-padding--sm rc-max-width--xl pb-1">
              <div className="rc-layout-container rc-five-column">
                {/* {this.state.loading ? <Loading positionFixed="true" /> : null} */}
                <SideMenu type="Subscription" />
                <div
                  className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop"
                  style={{ display: type === 'PaymentComp' ? 'block' : 'none' }}
                >
                  {currentCardInfo && (
                    <PaymentComp
                      history={this.props.history}
                      paymentId={currentCardInfo.id}
                      type={type}
                      save={(el) => {
                        console.log(el);
                        let param = {
                          subscribeId: subDetail.subscribeId,
                          paymentId: el.id,
                          goodsItems: subDetail.goodsInfo.map((el) => {
                            return {
                              skuId: el.skuId,
                              subscribeNum: el.subscribeNum,
                              subscribeGoodsId: el.subscribeGoodsId
                            };
                          })
                        };
                        console.log(param);
                        this.setState({ loading: true });
                        updateDetail(param)
                          .then((res) => {
                            this.getDetail(
                              this.showErrMsg.bind(
                                this,
                                this.props.intl.messages.saveSuccessfullly,
                                'success'
                              )
                            );
                          })
                          .catch((err) => {
                            this.setState({ loading: false });
                          });
                        this.setState({ type: 'main', currentCardInfo: el });
                      }}
                      cancel={() => this.setState({ type: 'main' })}
                    />
                  )}
                </div>
                <div
                  className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop"
                  style={{ display: type === 'AddressComp' ? 'block' : 'none' }}
                >
                  <AddressComp
                    type={addressType}
                    deliveryAddressId={subDetail.deliveryAddressId}
                    billingAddressId={subDetail.billingAddressId}
                    save={(el, isBillSame, fn) => {
                      console.log(el, isBillSame);
                      if (addressType === 'delivery') {
                        let param = {
                          subscribeId: subDetail.subscribeId,
                          deliveryAddressId: el.deliveryAddressId,
                          goodsItems: subDetail.goodsInfo.map((el) => {
                            return {
                              skuId: el.skuId,
                              subscribeNum: el.subscribeNum,
                              subscribeGoodsId: el.subscribeGoodsId
                            };
                          })
                        };
                        if (isBillSame) {
                          param.billingAddressId = el.deliveryAddressId;
                        }
                        //订阅寄送地址和发票地址更改,在更新接口里面加上changeField参数为deliveryAddressId和billingAddressId的title
                        let title = '';
                        //寄送地址
                        title = this.props.intl.messages[
                          'subscription.shippingAddress'
                        ];
                        //如果勾选了同步发票地址,两个地址以逗号隔开传给后台
                        if (param.billingAddressId) {
                          title =
                            title +
                            ',' +
                            this.props.intl.messages[
                              'subscription.BillingAddress'
                            ];
                        }
                        //增加返回changeField字段
                        Object.assign(param, {
                          changeField: title
                        });
                        console.log(param);
                        this.setState({ loading: true });
                        updateDetail(param)
                          .then((res) => {
                            fn && fn();
                            this.getDetail(
                              this.showErrMsg.bind(
                                this,
                                this.props.intl.messages.saveSuccessfullly,
                                'success'
                              )
                            );
                          })
                          .catch((err) => {
                            this.setState({ loading: false });
                          });
                        this.setState({
                          type: 'main',
                          currentDeliveryAddress: el
                        });
                      } else {
                        let param = {
                          subscribeId: subDetail.subscribeId,
                          billingAddressId: el.deliveryAddressId,
                          goodsItems: subDetail.goodsInfo.map((el) => {
                            return {
                              skuId: el.skuId,
                              subscribeNum: el.subscribeNum,
                              subscribeGoodsId: el.subscribeGoodsId
                            };
                          })
                        };
                        //增加返回changeField字段
                        Object.assign(param, {
                          changeField: this.props.intl.messages[
                            'subscription.BillingAddress'
                          ]
                        });
                        console.log(param);
                        this.setState({ loading: true });
                        updateDetail(param)
                          .then((res) => {
                            this.getDetail(
                              this.showErrMsg.bind(
                                this,
                                this.props.intl.messages.saveSuccessfullly,
                                'success'
                              )
                            );
                          })
                          .catch((err) => {
                            this.setState({ loading: false });
                          });
                        this.setState({
                          type: 'main',
                          currentBillingAddress: el
                        });
                      }
                    }}
                    cancel={() => this.setState({ type: 'main' })}
                  />
                </div>
                <div
                  className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop subscriptionDetail"
                  style={{ display: type === 'main' ? 'block' : 'none' }}
                >
                  <div className="d-flex justify-content-between align-items-center flex-wrap rc-margin-bottom--xs">
                    <h4 className="rc-delta font-weight-normal mb-2" style={{color: '#666'}}>
                      {/* <FormattedMessage id="subscription" /> */}
                      {/* {subDetail.subscribeId && (
                        <img
                          style={{ width: '20px', display: 'inline-block' }}
                          src={subscriptionIcon}
                        />
                      )} */}
                      {subDetail.subscribeId
                        ? (<span>{`${subDetail.subscribeId}`}</span>)
                        : null}
                      {subDetail.subscribeId?(isActive?(
                        <span style={{background: '#E0F3D4',
                          color: '#47B700',
                          fontSize: '14px',
                          padding: '0 5px',
                          marginLeft: '10px'}}>Active</span>
                      ): (
                        <span style={{background: '#FCEBD4',
                          color: '#ED8A00',
                          fontSize: '14px',
                          padding: '0 5px',
                          marginLeft: '10px'}}>Inactive</span>
                      )): null}
                      
                    </h4>
                  </div>
                  {/* <hr className="rc-margin-top---none" /> */}
                  <div className="content-asset">
                    {this.state.loading && (
                      <div className="mt-4">
                        <Skeleton
                          color="#f5f5f5"
                          width="100%"
                          height="50%"
                          count={4}
                        />
                      </div>
                    )}
                    <div className={`${this.state.loading ? 'hidden' : ''} `}>
                      <div className="mobileGoodsBox" style={{display: isMobile?'block': 'none'}}>
                        {
                          subDetail.goodsInfo &&
                          subDetail.goodsInfo.map((el, index) => (
                            <div className="goodsItem rc-card-content" style={{border: '1px solid #d7d7d7', padding: '12px'}}>
                              <div style={{display: 'flex'}}>
                              <img src={el.goodsPic} style={{width: '100px'}}/>
                              <div className="v-center" style={{flex: '1'}}>
                              <h3
                                style={{
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  overflowWrap: 'normal',
                                  color: '#e2001a'
                                }}
                              >
                                {el.goodsName}
                              </h3>
                              {/* <p
                                style={{
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  marginBottom: '8px'
                                }}
                              >
                                Dog food
                              </p> */}
                              <p
                                style={{
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  marginBottom: '8px'
                                }}
                              >
                                {el.specText}
                              </p>
                              </div>
                              </div>
                              <div style={{marginTop: '15px'}}>
                                        <div>
                                          <span
                                            className="rc-icon rc-minus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-minus"
                                            style={{ marginLeft: '-8px' }}
                                            onClick={() => {
                                              if (el.subscribeNum > 1) {
                                                el.subscribeNum =
                                                  el.subscribeNum - 1;
                                                this.doGetPromotionPrice();
                                                this.setState({ subDetail });
                                              } else {
                                                this.showErrMsg(
                                                  <FormattedMessage id="cart.errorInfo" />
                                                );
                                              }
                                            }}
                                          ></span>
                                          <input
                                            className="rc-quantity__input"
                                            id="quantity"
                                            name="quantity"
                                            min="1"
                                            max="899"
                                            maxLength="5"
                                            onChange={(e) => {
                                              this.setState({
                                                errorShow: false
                                              });
                                              const val = e.target.value;
                                              let {
                                                currentGoodsInfo
                                              } = this.state;
                                              if (val === '') {
                                                el.subscribeNum = 1;
                                                this.setState({
                                                  currentGoodsInfo
                                                });
                                              } else {
                                                let tmp = parseInt(val);
                                                if (isNaN(tmp)) {
                                                  tmp = 1;
                                                  this.showErrMsg(
                                                    <FormattedMessage id="cart.errorInfo" />
                                                  );
                                                }
                                                if (tmp < 1) {
                                                  tmp = 1;
                                                  this.showErrMsg(
                                                    <FormattedMessage id="cart.errorInfo" />
                                                  );
                                                }
                                                if (tmp > 30) {
                                                  tmp = 30;
                                                  this.showErrMsg(
                                                    <FormattedMessage id="cart.errorMaxInfo" />
                                                  );
                                                }
                                                el.subscribeNum = tmp;
                                                this.setState({
                                                  currentGoodsInfo
                                                });
                                                // this.updateBackendCart({ goodsInfoId: item.goodsInfoId, goodsNum: item.buyCount, verifyStock: false })
                                              }
                                              //数量变更后
                                              subDetail.goodsInfo[
                                                index
                                              ].subscribeNum =
                                                el.subscribeNum;
                                              this.onQtyChange();
                                            }}
                                            value={el.subscribeNum}
                                          />
                                          <span
                                            className="rc-icon rc-plus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-plus"
                                            onClick={() => {
                                              if (el.subscribeNum < 30) {
                                                el.subscribeNum =
                                                  el.subscribeNum + 1;
                                                this.doGetPromotionPrice();
                                                this.setState({ subDetail });
                                              } else {
                                                this.showErrMsg(
                                                  <FormattedMessage id="cart.errorMaxInfo" />
                                                );
                                              }
                                            }}
                                          ></span>
                                          <span
                                            style={{
                                              display: 'inline-block',
                                              fontSize: '22px',
                                              lineHeight: '40px',
                                              verticalAlign: 'middle'
                                            }}
                                          >
                                            =
                                          </span>
                                          <span
                                            class="price"
                                            style={{
                                              display: 'inline-block',
                                              fontSize: '20px',
                                              fontWeight: '400',
                                              textDecoration: 'line-through',
                                              verticalAlign: 'middle',
                                              marginLeft: '8px'
                                            }}
                                          >
                                            {formatMoney(el.originalPrice)}
                                          </span>
                                          <span
                                            class="price"
                                            style={{
                                              display: 'inline-block',
                                              fontSize: '20px',
                                              fontWeight: '400',
                                              verticalAlign: 'middle',
                                              marginLeft: '8px'
                                            }}
                                          >
                                            {formatMoney(el.subscribePrice)}
                                          </span>
                                        </div>
                                      </div>
                                      <div
                                // className="col-4 col-md-5"
                                // style={{ paddingLeft: '60px' }}
                              >
                                <div className="rc-card-content">
                                  <b
                                    style={{
                                      display: 'inline-block',
                                      width: '200px'
                                    }}
                                  >
                                    <FormattedMessage id="subscription.frequency"></FormattedMessage>
                                    :
                                  </b>
                                  <h1
                                    className="rc-card__meta order-Id text-left"
                                    style={{
                                      marginTop: '10px',
                                      display: 'inline-block',
                                      marginLeft: '10px'
                                    }}
                                  >
                                    <Selection
                                      optionList={this.frequencyListOptions}
                                      selectedItemChange={(el) => {
                                        console.log(el);
                                        el.periodTypeId = el.id;
                                        el.periodTypeValue = el.valueEn;
                                      }}
                                      selectedItemData={{
                                        value: el.periodTypeValue
                                      }}
                                      customStyleType="select-one"
                                      key={index + '_' + el.periodTypeValue}
                                    />
                                  </h1>
                                </div>
                                <div className="rc-card-content">
                                  <b
                                    style={{
                                      display: 'inline-block',
                                      width: '200px'
                                    }}
                                  >
                                    {/* Shipping Method: */}
                                    Autoship starts at:
                                  </b>
                                  <h1
                                    className="rc-card__meta order-Id text-left"
                                    style={{
                                      marginTop: '10px',
                                      display: 'inline-block',
                                      marginLeft: '10px'
                                    }}
                                  >
                                    {el.createTime.split(' ')[0]}
                                  </h1>
                                </div>
                                <div className="rc-card-content">
                                  <b
                                    style={{
                                      display: 'inline-block',
                                      width: '200px'
                                    }}
                                  >
                                    <img
                                      src={dateIcon}
                                      style={{
                                        display: 'inline-block',
                                        width: '20px',
                                        verticalAlign: 'middle',
                                        marginRight: '8px'
                                      }}
                                    />
                                    <FormattedMessage id="Next shipment"></FormattedMessage>
                                    :
                                  </b>
                                  <h1
                                    className="rc-card__meta order-Id"
                                    style={{
                                      marginTop: '10px',
                                      display: 'inline-block',
                                      marginLeft: '10px'
                                    }}
                                  >
                                    <DatePicker
                                      className="receiveDate"
                                      placeholder="Select Date"
                                      dateFormat="yyyy-MM-dd"
                                      minDate={this.state.minDate}
                                      selected={
                                        el.nextDeliveryTime
                                          ? new Date(el.nextDeliveryTime)
                                          : new Date()
                                      }
                                      disabled={true}
                                      onChange={(date) =>
                                        this.onDateChange(date)
                                      }
                                    />
                                  </h1>
                                </div>
                              </div>
                            </div>
                          ))
                        }
                      </div>
                      <div
                        className="card-container"
                        style={{ marginTop: '0', display: isMobile?'none': 'block'}}
                      >
                        {subDetail.goodsInfo &&
                          subDetail.goodsInfo.map((el, index) => (
                            <div
                              className="row rc-margin-x--none row align-items-center"
                              style={{
                                padding: '1rem 0',
                                borderBottom: '1px solid #d7d7d7'
                              }}
                            >
                              <div className="col-4 col-md-6">
                                <div
                                  className="rc-layout-container rc-five-column"
                                  style={{
                                    height: '160px',
                                    paddingRight: '60px',
                                    paddingTop: '0'
                                  }}
                                >
                                  <div
                                    className="rc-column flex-layout"
                                    style={{ width: '80%', padding: 0 }}
                                  >
                                    <div className="img-container">
                                      <img src={el.goodsPic} alt="" />
                                    </div>
                                    <div
                                      className="v-center"
                                      style={{
                                        width: '300px'
                                      }}
                                    >
                                      <h5
                                        style={{
                                          overflow: 'hidden',
                                          textOverflow: 'ellipsis',
                                          overflowWrap: 'normal',
                                          color: '#e2001a'
                                        }}
                                      >
                                        {el.goodsName}
                                      </h5>
                                      {/* <p
                                        style={{
                                          overflow: 'hidden',
                                          textOverflow: 'ellipsis',
                                          marginBottom: '8px'
                                        }}
                                      >
                                        Dog food
                                      </p> */}
                                      <p
                                        style={{
                                          overflow: 'hidden',
                                          textOverflow: 'ellipsis',
                                          marginBottom: '8px'
                                        }}
                                      >
                                        {el.specText}
                                      </p>
                                      <div>
                                        <div>
                                          <span
                                            className={`rc-icon rc-minus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-minus ${isActive?'': 'disabled'}`}
                                            style={{ marginLeft: '-8px' }}
                                            onClick={() => {
                                              if (el.subscribeNum > 1) {
                                                el.subscribeNum =
                                                  el.subscribeNum - 1;
                                                this.doGetPromotionPrice();
                                                this.setState({ subDetail });
                                              } else {
                                                this.showErrMsg(
                                                  <FormattedMessage id="cart.errorInfo" />
                                                );
                                              }
                                            }}
                                          ></span>
                                          <input
                                            className="rc-quantity__input"
                                            id="quantity"
                                            name="quantity"
                                            min="1"
                                            max="899"
                                            maxLength="5"
                                            onChange={(e) => {
                                              this.setState({
                                                errorShow: false
                                              });
                                              const val = e.target.value;
                                              let {
                                                currentGoodsInfo
                                              } = this.state;
                                              if (val === '') {
                                                el.subscribeNum = 1;
                                                this.setState({
                                                  currentGoodsInfo
                                                });
                                              } else {
                                                let tmp = parseInt(val);
                                                if (isNaN(tmp)) {
                                                  tmp = 1;
                                                  this.showErrMsg(
                                                    <FormattedMessage id="cart.errorInfo" />
                                                  );
                                                }
                                                if (tmp < 1) {
                                                  tmp = 1;
                                                  this.showErrMsg(
                                                    <FormattedMessage id="cart.errorInfo" />
                                                  );
                                                }
                                                if (tmp > 30) {
                                                  tmp = 30;
                                                  this.showErrMsg(
                                                    <FormattedMessage id="cart.errorMaxInfo" />
                                                  );
                                                }
                                                el.subscribeNum = tmp;
                                                this.setState({
                                                  currentGoodsInfo
                                                });
                                                // this.updateBackendCart({ goodsInfoId: item.goodsInfoId, goodsNum: item.buyCount, verifyStock: false })
                                              }
                                              //数量变更后
                                              subDetail.goodsInfo[
                                                index
                                              ].subscribeNum =
                                                el.subscribeNum;
                                              this.onQtyChange();
                                            }}
                                            value={el.subscribeNum}
                                          />
                                          <span
                                            className={`rc-icon rc-plus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-plus ${isActive?'': 'disabled'}`}
                                            onClick={() => {
                                              if (el.subscribeNum < 30) {
                                                el.subscribeNum =
                                                  el.subscribeNum + 1;
                                                this.doGetPromotionPrice();
                                                this.setState({ subDetail });
                                              } else {
                                                this.showErrMsg(
                                                  <FormattedMessage id="cart.errorMaxInfo" />
                                                );
                                              }
                                            }}
                                          ></span>
                                          <span
                                            style={{
                                              display: 'inline-block',
                                              fontSize: '22px',
                                              lineHeight: '40px',
                                              verticalAlign: 'middle'
                                            }}
                                          >
                                            =
                                          </span>
                                          <span
                                            class="price"
                                            style={{
                                              display: 'inline-block',
                                              fontSize: '20px',
                                              fontWeight: '400',
                                              textDecoration: 'line-through',
                                              verticalAlign: 'middle',
                                              marginLeft: '8px'
                                            }}
                                          >
                                            {formatMoney(el.originalPrice)}
                                          </span>
                                          <span
                                            class="price"
                                            style={{
                                              display: 'inline-block',
                                              fontSize: '20px',
                                              fontWeight: '400',
                                              verticalAlign: 'middle',
                                              marginLeft: '8px'
                                            }}
                                          >
                                            {formatMoney(el.subscribePrice)}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-4 col-md-1"></div>
                              <div
                                className="col-4 col-md-5"
                                style={{ paddingLeft: '60px' }}
                              >
                                <div className="rc-card-content">
                                  <b
                                    style={{
                                      display: 'inline-block',
                                      width: '200px'
                                    }}
                                  >
                                    <FormattedMessage id="subscription.frequency"></FormattedMessage>
                                    :
                                  </b>
                                  <h1
                                    className="rc-card__meta order-Id text-left"
                                    style={{
                                      marginTop: '10px',
                                      display: 'inline-block',
                                      marginLeft: '10px'
                                    }}
                                  >
                                    <Selection
                                      optionList={this.frequencyListOptions}
                                      selectedItemChange={(el) => {
                                        console.log(el);
                                        el.periodTypeId = el.id;
                                        el.periodTypeValue = el.valueEn;
                                      }}
                                      selectedItemData={{
                                        value: el.periodTypeValue
                                      }}
                                      customStyleType="select-one"
                                      key={index + '_' + el.periodTypeValue}
                                      disabled={!isActive}
                                    />
                                  </h1>
                                </div>
                                <div className="rc-card-content">
                                  <b
                                    style={{
                                      display: 'inline-block',
                                      width: '200px'
                                    }}
                                  >
                                    {/* Shipping Method: */}
                                    Autoship starts at:
                                  </b>
                                  <h1
                                    className="rc-card__meta order-Id text-left"
                                    style={{
                                      marginTop: '10px',
                                      display: 'inline-block',
                                      marginLeft: '10px'
                                    }}
                                  >
                                    {el.createTime.split(' ')[0]}
                                  </h1>
                                </div>
                                <div className="rc-card-content">
                                  <b
                                    style={{
                                      display: 'inline-block',
                                      width: '200px'
                                    }}
                                  >
                                    <img
                                      src={dateIcon}
                                      style={{
                                        display: 'inline-block',
                                        width: '20px',
                                        verticalAlign: 'middle',
                                        marginRight: '8px'
                                      }}
                                    />
                                    <FormattedMessage id="Next shipment"></FormattedMessage>
                                    :
                                  </b>
                                  <h1
                                    className="rc-card__meta order-Id"
                                    style={{
                                      marginTop: '10px',
                                      display: 'inline-block',
                                      marginLeft: '10px'
                                    }}
                                  >
                                    <DatePicker
                                      className="receiveDate"
                                      placeholder="Select Date"
                                      dateFormat="yyyy-MM-dd"
                                      minDate={this.state.minDate}
                                      selected={
                                        el.nextDeliveryTime
                                          ? new Date(el.nextDeliveryTime)
                                          : new Date()
                                      }
                                      disabled={true}
                                      onChange={(date) =>
                                        this.onDateChange(date)
                                      }
                                    />
                                  </h1>
                                </div>
                              </div>
                            </div>
                          ))}

                        <div
                          className="row rc-margin-x--none row align-items-center"
                          style={{ padding: '1rem 0' }}
                        >
                          <div className="col-4 col-md-6">
                            {/* <div
                              className="footer"
                              style={{
                                marginTop: '10px',
                                padding: '0 40px',
                                display:
                                  subDetail.subscribeStatus === '0'
                                    ? 'block'
                                    : 'none'
                              }}
                            >
                              <span
                                className="rc-input rc-input--inline rc-input--label"
                                style={{
                                  width: '180px',
                                  verticalAlign: 'middle'
                                }}
                              >
                                <input
                                  className="rc-input__control"
                                  id="id-text2"
                                  type="text"
                                  name="text"
                                  placeholder={
                                    this.props.intl.messages.promotionCode
                                  }
                                  value={this.state.promotionInputValue}
                                  onChange={(e) => this.handlerChange(e)}
                                />
                                <label
                                  className="rc-input__label"
                                  for="id-text2"
                                ></label>
                              </span>
                              <button
                                className={[
                                  'rc-btn',
                                  'rc-btn--sm',
                                  'rc-btn--two',
                                  this.state.isClickApply &&
                                    'ui-btn-loading ui-btn-loading-border-red'
                                ].join(' ')}
                                style={{ marginTop: '10px' }}
                                onClick={async () => {
                                  let result = {};
                                  if (!this.state.promotionInputValue) return;
                                  this.setState({
                                    isClickApply: true,
                                    isShowValidCode: false,
                                    lastPromotionInputValue: this.state
                                      .promotionInputValue
                                  });
                                  //会员
                                  result = await this.doGetPromotionPrice(
                                    this.state.promotionInputValue
                                  );
                                  if (
                                    result.code === 'K-000000' &&
                                    !result.context.promotionFlag
                                  ) {
                                    //表示输入apply promotionCode成功,promotionFlag为true表示无效代码
                                    discount.splice(0, 1, 1); //(起始位置,替换个数,插入元素)
                                    this.setState({
                                      discount,
                                      promotionDesc:
                                        result.context.promotionDesc
                                    });
                                  } else {
                                    this.setState({
                                      isShowValidCode: true
                                    });
                                  }
                                  this.setState({
                                    isClickApply: false,
                                    promotionInputValue: '',
                                    loading: false
                                  });
                                }}
                              >
                                Apply
                              </button>
                            </div> */}
                          </div>
                          <div className="col-4 col-md-1"></div>
                          <div
                            className="col-4 col-md-5"
                            style={{ paddingLeft: '60px' }}
                          >
                            <div>
                              <div className="flex-layout">
                                <label
                                  className=""
                                  style={{ minWidth: '230px' }}
                                >
                                  <FormattedMessage id="subscription.total"></FormattedMessage>
                                </label>
                                <div className="text-right">
                                  <b>{formatMoney(this.state.subTotal)}</b>
                                </div>
                              </div>
                              {this.state.subDiscount ? (
                                <div className="flex-layout">
                                  <label
                                    className="saveDiscount  red-text"
                                    style={{ minWidth: '230px' }}
                                  >
                                    {this.state.promotionDesc}:
                                  </label>
                                  <div className="text-right red-text">
                                    <b>
                                      -{formatMoney(this.state.subDiscount)}
                                    </b>
                                  </div>
                                </div>
                              ) : null}
                              {!this.state.isShowValidCode &&
                                discount.map((el) => (
                                  <div className="flex-layout">
                                    <label className="saveDiscount  red-text">
                                      {this.state.promotionDesc}
                                    </label>
                                    <div
                                      className="text-right red-text"
                                      style={{ position: 'relative' }}
                                    >
                                      <b>
                                        -
                                        {formatMoney(
                                          this.state.promotionDiscount
                                        )}
                                      </b>
                                      <span
                                        style={{
                                          position: 'absolute',
                                          right: '-18px',
                                          fontSize: '22px',
                                          bottom: '5px',
                                          cursor: 'pointer'
                                        }}
                                        onClick={() => {
                                          discount.pop();
                                          this.setState({
                                            discount: discount
                                          });
                                        }}
                                      >
                                        x
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              <div className="flex-layout">
                                <label
                                  className=""
                                  style={{ minWidth: '230px' }}
                                >
                                  <FormattedMessage id="subscription.shipping"></FormattedMessage>
                                </label>
                                <div className="text-right red-text">
                                  <b>{formatMoney(this.state.subShipping)}</b>
                                </div>
                              </div>
                              <div className="flex-layout">
                                <label className="saveDiscount">
                                  <b
                                    style={{ fontSize: '20px', color: '#333' }}
                                  >
                                    Total
                                  </b>
                                  <span style={{ fontSize: '12px' }}>
                                    (VAT included)
                                  </span>
                                </label>
                                <div className="text-right">
                                  <b>{formatMoney(this.state.subTradeTotal)}</b>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="footerGroupButton" style={{display: isActive? 'block': 'none'}}>
                        <p>
                          {/* <div className="col-12 col-md-2"> */}
                          <img
                            style={{
                              display: 'inline-block',
                              width: '20px',
                              marginRight: '5px'
                            }}
                            src={cancelIcon}
                          />
                          <a
                            class="rc-styled-link"
                            href="#/"
                            onClick={(e) => {
                              e.preventDefault();
                              this.setState({
                                modalType: 'cancelAll',
                                modalShow: true,
                                currentModalObj: this.state.modalList.filter(
                                  (el) => el.type === 'cancelAll'
                                )[0]
                              });
                            }}
                          >
                            <FormattedMessage id="subscription.cancelAll" />
                          </a>
                          {/* </div> */}
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <button
                            class="rc-btn rc-btn--one"
                            onClick={async () => {
                              try {
                                // subDetail.goodsInfo = this.state.currentGoodsInfo;
                                let param = {
                                  subscribeId: subDetail.subscribeId,
                                  goodsItems: subDetail.goodsInfo.map((el) => {
                                    return {
                                      skuId: el.skuId,
                                      subscribeNum: el.subscribeNum,
                                      subscribeGoodsId: el.subscribeGoodsId,
                                      periodTypeId: el.periodTypeId
                                    };
                                  })
                                };
                                Object.assign(param, {
                                  changeField: this.props.intl.messages[
                                    'produtctNumber'
                                  ]
                                });
                                await this.doUpdateDetail(param);
                                await this.getDetail();
                                this.showErrMsg(
                                  this.props.intl.messages.saveSuccessfullly,
                                  'success'
                                );
                                this.setState({
                                  isChangeQuatity: false,
                                });
                              } catch (err) {
                                this.showErrMsg(err.message);
                              } finally {
                                this.setState({ loading: false });
                              }
                            }}
                          >
                            Save Changes
                          </button>
                        </p>
                      </div>

                      <h4 className="h4">
                        Transaction information
                      </h4>
                      <div className="row text-left text-break editCard ml-0 mr-0">
                        <div
                          className="col-12 col-md-4 mb-2"
                          style={{ padding: '5px', paddingLeft: '0' }}
                        >
                          <div
                            style={{
                              border: '1px solid #d7d7d7',
                              padding: '20px',
                              height: '225px'
                            }}
                          >
                            <div className="align-items-center">
                              {/* <i className="rc-icon rc-delivery--sm rc-brand1 ml-1 mr-1 mt-1" /> */}
                              <img
                                src={deliveryIcon}
                                style={{
                                  width: '30px',
                                  marginRight: '18px',
                                  display: 'inline-block'
                                }}
                              />
                              <span>
                                <FormattedMessage id="delivery2" />
                              </span>
                              {subDetail.subscribeStatus === '0' && (
                                <a
                                  className="rc-styled-link red-text"
                                  style={{ float: 'right', marginTop: '5px' }}
                                  onClick={() => {
                                    window.scrollTo(0, 0);
                                    this.setState({
                                      type: 'AddressComp',
                                      addressType: 'delivery'
                                    });
                                  }}
                                >
                                  <FormattedMessage id="edit" />{' '}
                                  {/* <FormattedMessage id="address" /> */}
                                </a>
                              )}
                            </div>
                            <div className="ml-1">
                              <span
                                className="medium"
                                style={{
                                  fontSize: '18px',
                                  fontWeight: '400',
                                  color: '#333',
                                  margin: '25px 0 10px'
                                }}
                              >
                                {currentDeliveryAddress.consigneeName}
                              </span>
                              <br />
                              {currentDeliveryAddress.consigneeNumber}
                              <br />
                              {this.state.countryList.length &&
                              this.state.countryList.filter(
                                (el) =>
                                  el.id === currentDeliveryAddress.countryId
                              ).length
                                ? this.state.countryList.filter(
                                    (el) =>
                                      el.id === currentDeliveryAddress.countryId
                                  )[0].valueEn
                                : currentDeliveryAddress.countryId}
                              , {currentDeliveryAddress.cityName}
                              <br />
                              {currentDeliveryAddress.address1}
                              <br />
                            </div>
                          </div>
                        </div>
                        <div
                          className="col-12 col-md-4 mb-2"
                          style={{ padding: '5px' }}
                        >
                          <div
                            style={{
                              border: '1px solid #d7d7d7',
                              padding: '20px',
                              height: '225px'
                            }}
                          >
                            <div className="align-items-center">
                              <img
                                src={billingIcon}
                                style={{
                                  width: '30px',
                                  marginRight: '18px',
                                  display: 'inline-block'
                                }}
                              />
                              <span>
                                <FormattedMessage id="billing" />
                              </span>
                              {subDetail.subscribeStatus === '0' && (
                                <a
                                  className="rc-styled-link red-text"
                                  style={{ float: 'right', marginTop: '5px' }}
                                  onClick={() => {
                                    window.scrollTo(0, 0);
                                    this.setState({
                                      type: 'AddressComp',
                                      addressType: 'billing'
                                    });
                                  }}
                                >
                                  <FormattedMessage id="edit" />{' '}
                                  {/* <FormattedMessage id="address" /> */}
                                </a>
                              )}
                            </div>
                            <div className="ml-1">
                              <span
                                className="medium"
                                style={{
                                  fontSize: '18px',
                                  fontWeight: '400',
                                  color: '#333',
                                  margin: '25px 0 10px'
                                }}
                              >
                                {currentBillingAddress.consigneeName}
                              </span>
                              <br />
                              {currentBillingAddress.consigneeNumber}
                              <br />
                              {this.state.countryList.length &&
                              this.state.countryList.filter(
                                (el) =>
                                  el.id === currentBillingAddress.countryId
                              ).length
                                ? this.state.countryList.filter(
                                    (el) =>
                                      el.id === currentBillingAddress.countryId
                                  )[0].valueEn
                                : currentBillingAddress.countryId}
                              , {currentBillingAddress.cityName}
                              <br />
                              {currentBillingAddress.address1}
                              <br />
                            </div>
                          </div>
                        </div>
                        {currentCardInfo && (
                          <div
                            className="col-12 col-md-4 mb-2"
                            style={{ padding: '5px', paddingRight: '0' }}
                          >
                            <div
                              style={{
                                border: '1px solid #d7d7d7',
                                padding: '20px',
                                height: '225px'
                              }}
                            >
                              <div className="align-items-center">
                                <img
                                  src={paymentIcon}
                                  style={{
                                    width: '30px',
                                    marginRight: '18px',
                                    display: 'inline-block'
                                  }}
                                />
                                <span>
                                  <FormattedMessage id="payment.payment" />
                                </span>
                                {subDetail.subscribeStatus === '0' && (
                                  <a
                                    className="rc-styled-link red-text"
                                    style={{ float: 'right', marginTop: '5px' }}
                                    onClick={() => {
                                      window.scrollTo(0, 0);
                                      this.setState({ type: 'PaymentComp' });
                                    }}
                                  >
                                    <FormattedMessage id="edit" />{' '}
                                    {/* <FormattedMessage id="card" /> */}
                                  </a>
                                )}
                              </div>
                              <div className="ml-1">
                                {currentCardInfo.paymentMethod &&
                                currentCardInfo.paymentMethod.last_4_digits ? (
                                  <>
                                    <span
                                      className="medium"
                                      style={{
                                        fontSize: '18px',
                                        fontWeight: '400',
                                        color: '#333',
                                        margin: '25px 0 10px',
                                        verticalAlign: 'middle'
                                      }}
                                    >
                                      **** **** ****
                                      {
                                        currentCardInfo.paymentMethod
                                          .last_4_digits
                                      }
                                    </span>
                                    <img
                                      alt=""
                                      className="d-inline-block mr-1"
                                      style={{
                                        width: '20%',
                                        marginLeft: '10px'
                                      }}
                                      src={
                                        CREDIT_CARD_IMG_ENUM[
                                          currentCardInfo.paymentMethod
                                            ? currentCardInfo.paymentMethod
                                                .vendor
                                            : currentCardInfo.vendor
                                        ]
                                      }
                                    />
                                  </>
                                ) : null}

                                {currentCardInfo.paymentMethod
                                  ? currentCardInfo.paymentMethod.holder_name
                                  : ''}
                                <br />
                                {currentCardInfo.phoneNumber}
                                <br />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <h4 class="h4">
                        My Autoship Order
                      </h4>

                      <div className="rc-max-width--xl">
                        <div className="rc-match-heights rc-content-h-middle rc-reverse-layout">
                          <div>
                            <div
                              className="rc-border-bottom rc-border-colour--interface"
                              style={{ width: '70%', display: 'inline-block' }}
                            >
                              <nav className="rc-fade--x">
                                <ul
                                  className="rc-scroll--x rc-list rc-list--inline rc-list--align rc-list--blank"
                                  role="tablist"
                                >
                                  {this.state.tabName.map((ele, index) => (
                                    <li key={index}>
                                      <button
                                        className="rc-tab rc-btn rounded-0 border-top-0 border-right-0 border-left-0"
                                        data-toggle={`tab__panel-${index}`}
                                        aria-selected={
                                          this.state.activeTabIdx === index
                                            ? 'true'
                                            : 'false'
                                        }
                                        role="tab"
                                        onClick={(e) =>
                                          this.changeTab(e, index)
                                        }
                                      >
                                        {ele}
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              </nav>
                            </div>
                            <div
                              style={{
                                width: '30%',
                                display: 'inline-block',
                                textAlign: 'right',
                                verticalAlign: 'middle'
                              }}
                            >
                              <span
                                style={{
                                  display: 'inline-block',
                                  width: isMobile?'auto': '230px',
                                  borderBottom: '1px solid #aaa',
                                  textAlign: 'left'
                                }}
                              >
                                {
                                  this.state.activeTabIdx === 0 && noStartYearOption.length && completedYearOption.length?(
                                  <Selection
                                    optionList={noStartYearOption}
                                    selectedItemData={noStartYear}
                                    selectedItemChange={(el) => {
                                      console.log(el,'hahaha')
                                    if(this.state.activeTabIdx === 0) {
                                      this.setState({noStartYear: el})
                                    }else {
                                      this.setState({completedYear: el})
                                    }
                                  }}
                                  customStyleType="select-one"
                                  type="freqency"
                                  key={noStartYear.value}
                                />
                                  ): (
                                    <Selection
                                  optionList={completedYearOption}
                                  selectedItemData={completedYear}
                                  selectedItemChange={(el) => {
                                    if(this.state.activeTabIdx === 0) {
                                      this.setState({noStartYear: el})
                                    }else {
                                      this.setState({completedYear: el})
                                    }
                                  }}
                                  customStyleType="select-one"
                                  type="freqency"
                                  key={completedYear.value}
                                />
                                  )
                                }
                                
                              </span>
                            </div>
                            <div
                              className="rc-tabs tabs-detail"
                              style={{ marginTop: '40px' }}
                            >
                              {this.state.activeTabIdx === 0 &&
                                subDetail.noStartTradeList &&
                                subDetail.noStartTradeList.filter(el => el.tradeItems[0].nextDeliveryTime.split('-')[0] === noStartYear.value).map((el) => (
                                  <>
                                    <div className="card-container">
                                      <div className="card rc-margin-y--none ml-0">
                                        <div
                                          className="card-header row rc-margin-x--none align-items-center pl-0 pr-0"
                                          style={{
                                            background: '#f9f9f9',
                                            height: '60px',
                                            padding: 0
                                          }}
                                        >
                                          <div
                                          className={`${isMobile?'col-9': 'col-md-3'}`}
                                            style={{ paddingLeft: '20px' }}
                                          >
                                            shipment on:
                                            <span
                                              style={{
                                                color: '#e2001a',
                                                fontWeight: '400',
                                                marginLeft: '5px'
                                              }}
                                            >
                                              <DatePicker
                                                className="receiveDate subs-receiveDate"
                                                placeholder="Select Date"
                                                dateFormat="yyyy-MM-dd"
                                                minDate={this.state.minDate}
                                                selected={
                                                  el.tradeItems
                                                    ? new Date(
                                                        el.tradeItems[0].nextDeliveryTime
                                                      )
                                                    : new Date()
                                                }
                                                onChange={(date) =>
                                                  this.onDateChange(
                                                    date,
                                                    el.tradeItems.map((el) => {
                                                      return {
                                                        skuId: el.skuId
                                                      };
                                                    })
                                                  )
                                                }
                                                disabled={true}
                                              />
                                            </span>
                                          </div>
                                          <div className={`${isMobile?'col-0': 'col-md-5'}`}></div>
                                          <div className={`changeDate ${isMobile?'col-0': 'col-md-3 pl-4'}`} style={{textAlign: 'right', paddingRight: '20px'}}>
                                            {
                                              isActive? (
                                                <>
                                                <img src={dateIcon} style={{width: '20px', display: 'inline'}}/>
                                          <span
                                              style={{
                                                color: '#666',
                                                fontWeight: '400',
                                                marginLeft: '5px',
                                                borderBottom: '1px solid #666',
                                                cursor: 'pointer'
                                              }}
                                            >
                                              <DatePicker
                                                className="receiveDate subs-receiveDate"
                                                placeholder="Select Date"
                                                dateFormat="yyyy-MM-dd"
                                                minDate={this.state.minDate}
                                                selected={
                                                  el.tradeItems
                                                    ? new Date(
                                                        el.tradeItems[0].nextDeliveryTime
                                                      )
                                                    : new Date()
                                                }
                                                onChange={(date) =>
                                                  this.onDateChange(
                                                    date,
                                                    el.tradeItems.map((el) => {
                                                      return {
                                                        skuId: el.skuId
                                                      };
                                                    })
                                                  )
                                                }
                                              />
                                            </span>
                                                </>
                                              ): null
                                            }
                                            
                                          </div>
                                          <div className={`${isMobile?'col-3': 'col-md-1'}`} style={{padding: 0}}>
                                            {
                                              isActive?(
                                                <>
                                                <img
                                              style={{
                                                display: 'inline-block',
                                                width: '20px',
                                                marginRight: '5px'
                                              }}
                                              src={skipIcon}
                                            />
                                            <a
                                              class="rc-styled-link"
                                              href="#/"
                                              onClick={(e) => {
                                                e.preventDefault();
                                                this.setState({
                                                  modalType: 'skipNext',
                                                  modalShow: true,
                                                  currentModalObj: this.state.modalList.filter(
                                                    (el) =>
                                                      el.type === 'skipNext'
                                                  )[0],
                                                  skipNextGoods: el.tradeItems.map(
                                                    (el) => {
                                                      return {
                                                        skuId: el.skuId
                                                      };
                                                    }
                                                  )
                                                });
                                              }}
                                            >
                                              Skip
                                            </a>
                                                </>
                                              ): null
                                            }
                                            
                                          </div>
                                        </div>
                                      </div>
                                      {el.tradeItems &&
                                        el.tradeItems.map(
                                          (tradeItem, index) => (
                                            <div
                                              className="row rc-margin-x--none row align-items-center"
                                              style={{
                                                padding: '1rem 0',
                                                borderBottom:
                                                  '1px solid #d7d7d7'
                                              }}
                                            >
                                              <div className={`${isMobile?'col-8': 'col-4'} col-md-4`}>
                                                <div
                                                  className="rc-layout-container rc-five-column"
                                                  style={{
                                                    paddingRight: isMobile?'0': '60px',
                                                    paddingTop: '0'
                                                  }}
                                                >
                                                  <div
                                                    className="rc-column flex-layout"
                                                    style={{
                                                      width: '80%',
                                                      padding: 0
                                                    }}
                                                  >
                                                    <img
                                                      style={{
                                                        width: '70px',
                                                        margin: '0 10px'
                                                      }}
                                                      src={tradeItem.pic}
                                                      alt=""
                                                    />
                                                    <div
                                                      style={{
                                                        width: '200px',
                                                        paddingTop: '30px'
                                                      }}
                                                    >
                                                      <h5
                                                        style={{
                                                          overflow: 'hidden',
                                                          textOverflow:
                                                            'ellipsis',
                                                          overflowWrap:
                                                            'normal',
                                                          fontSize: '14px'
                                                        }}
                                                      >
                                                        {tradeItem.skuName}
                                                      </h5>
                                                      <p
                                                        style={{
                                                          overflow: 'hidden',
                                                          textOverflow:
                                                            'ellipsis',
                                                          marginBottom: '8px',
                                                          fontSize: '14px'
                                                        }}
                                                      >
                                                        {tradeItem.specDetails} {isMobile?`x ${tradeItem.num}`: null}
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className={`${isMobile?'none': 'col-4'} col-md-4`}>
                                                <p
                                                  style={{
                                                    textAlign: 'center',
                                                    marginBottom: '0',
                                                    fontWeight: '400'
                                                  }}
                                                >
                                                  x {tradeItem.num}
                                                </p>
                                              </div>
                                              <div className="col-4 col-md-4">
                                                <p
                                                  style={{
                                                    textAlign: 'right',
                                                    paddingRight: '10px',
                                                    marginBottom: '0'
                                                  }}
                                                >
                                                  {formatMoney(
                                                    tradeItem.subscriptionPrice
                                                  )}
                                                </p>
                                              </div>
                                            </div>
                                          )
                                        )}
                                      <div
                                        className="row rc-margin-x--none row align-items-center"
                                        style={{
                                          padding: '1rem 0',
                                          borderBottom: '1px solid #d7d7d7'
                                        }}
                                      >
                                        <div className={`${isMobile?'col-12': 'col-md-6'}`}>
                                          <div
                                            className="footer"
                                            style={{
                                              marginTop: '10px',
                                              marginBottom: '10px',
                                              padding: '0 40px',
                                              display:
                                                subDetail.subscribeStatus ===
                                                '0'
                                                  ? 'block'
                                                  : 'none'
                                            }}
                                          >
                                            <span
                                              className="rc-input rc-input--inline rc-input--label"
                                              style={{
                                                width: '170px',
                                                verticalAlign: 'middle'
                                              }}
                                            >
                                              <input
                                                className="rc-input__control"
                                                id="id-text2"
                                                type="text"
                                                name="text"
                                                placeholder={
                                                  this.props.intl.messages
                                                    .promotionCode
                                                }
                                                value={
                                                  this.state.promotionInputValue
                                                }
                                                onChange={(e) =>
                                                  this.handlerChange(e)
                                                }
                                              />
                                              <label
                                                className="rc-input__label"
                                                for="id-text2"
                                              ></label>
                                            </span>
                                            <button
                                              className={[
                                                'rc-btn',
                                                'rc-btn--sm',
                                                'rc-btn--two',
                                                this.state.isClickApply &&
                                                  'ui-btn-loading ui-btn-loading-border-red'
                                              ].join(' ')}
                                              style={{ marginTop: '10px' }}
                                              onClick={async () => {
                                                let result = {};
                                                if (
                                                  !this.state
                                                    .promotionInputValue
                                                )
                                                  return;
                                                this.setState({
                                                  isClickApply: true,
                                                  isShowValidCode: false,
                                                  lastPromotionInputValue: this
                                                    .state.promotionInputValue
                                                });
                                                //会员
                                                result = await this.doGetPromotionPrice(
                                                  this.state.promotionInputValue
                                                );
                                                if (
                                                  result.code === 'K-000000' &&
                                                  !result.context.promotionFlag
                                                ) {
                                                  //表示输入apply promotionCode成功,promotionFlag为true表示无效代码
                                                  discount.splice(0, 1, 1); //(起始位置,替换个数,插入元素)
                                                  this.setState({
                                                    discount,
                                                    promotionDesc:
                                                      result.context
                                                        .promotionDesc
                                                  });
                                                } else {
                                                  this.setState({
                                                    isShowValidCode: true
                                                  });
                                                }
                                                this.setState({
                                                  isClickApply: false,
                                                  promotionInputValue: '',
                                                  loading: false
                                                });
                                              }}
                                            >
                                              Apply
                                            </button>
                                          </div>
                                        </div>
                                        <div className={`${isMobile?'col-12': 'col-md-6'}`}>
                                          <div style={{ paddingLeft: isMobile?'40px': '200px', paddingRight: isMobile?'40px': 0 }}>
                                            <div className="flex-layout">
                                              <label
                                                className=""
                                                style={{ minWidth: isMobile?'210px': '230px' }}
                                              >
                                                <FormattedMessage id="subscription.total"></FormattedMessage>
                                              </label>
                                              <div className="text-right">
                                                <b>
                                                  {formatMoney(
                                                    el.tradePrice.goodsPrice
                                                  )}
                                                </b>
                                              </div>
                                            </div>
                                            {this.state.subDiscount ? (
                                              <div className="flex-layout">
                                                <label
                                                  className="saveDiscount  red-text"
                                                  style={{ minWidth: isMobile?'210px': '230px' }}
                                                >
                                                  {this.state.promotionDesc}:
                                                </label>
                                                <div className="text-right red-text">
                                                  <b>
                                                    -
                                                    {formatMoney(
                                                      this.state.subDiscount
                                                    )}
                                                  </b>
                                                </div>
                                              </div>
                                            ) : null}
                                            {!this.state.isShowValidCode &&
                                              discount.map((el) => (
                                                <div className="flex-layout">
                                                  <label className="saveDiscount  red-text">
                                                    {this.state.promotionDesc}
                                                  </label>
                                                  <div
                                                    className="text-right red-text"
                                                    style={{
                                                      position: 'relative'
                                                    }}
                                                  >
                                                    <b>
                                                      -
                                                      {formatMoney(
                                                        this.state
                                                          .promotionDiscount
                                                      )}
                                                    </b>
                                                    <span
                                                      style={{
                                                        position: 'absolute',
                                                        right: '-18px',
                                                        fontSize: '22px',
                                                        bottom: '5px',
                                                        cursor: 'pointer'
                                                      }}
                                                      onClick={() => {
                                                        discount.pop();
                                                        this.setState({
                                                          discount: discount
                                                        });
                                                      }}
                                                    >
                                                      x
                                                    </span>
                                                  </div>
                                                </div>
                                              ))}
                                            <div className="flex-layout">
                                              <label
                                                className=""
                                                style={{ minWidth: isMobile?'210px': '230px' }}
                                              >
                                                <FormattedMessage id="subscription.shipping"></FormattedMessage>
                                              </label>
                                              <div className="text-right red-text">
                                                <b>
                                                  {formatMoney(
                                                    el.tradePrice.deliveryPrice
                                                  )}
                                                </b>
                                              </div>
                                            </div>
                                            <div className="flex-layout">
                                              <label className="saveDiscount">
                                                <b
                                                  style={{
                                                    fontSize: '20px',
                                                    color: '#333'
                                                  }}
                                                >
                                                  Total
                                                </b>
                                                <span
                                                  style={{ fontSize: '12px' }}
                                                >
                                                  (VAT included)
                                                </span>
                                              </label>
                                              <div className="text-right">
                                                <b>
                                                  {formatMoney(
                                                    el.tradePrice.totalPrice
                                                  )}
                                                </b>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                ))}
                              {this.state.activeTabIdx === 1 &&
                                subDetail.completedTradeList &&
                                subDetail.completedTradeList.filter(el => el.tradeState.createTime.split('-')[0] === completedYear.value).map((el) => (
                                  <div className="card-container">
                                    <div className="card rc-margin-y--none ml-0">
                                      <div
                                        className="card-header row rc-margin-x--none align-items-center pl-0 pr-0"
                                        style={{
                                          background: '#f9f9f9',
                                          height: '75px'
                                        }}
                                      >
                                        <div
                                          className={`${isMobile?'col-5': 'col-md-3'}`}
                                          style={{ paddingLeft: '20px' }}
                                        >
                                          shipment on:{' '}
                                          <span
                                            style={{
                                              color: '#e2001a',
                                              fontWeight: '400'
                                            }}
                                          >
                                            {
                                              el.tradeState.createTime.split(
                                                ' '
                                              )[0]
                                            }
                                          </span>
                                        </div>
                                        {
                                          isMobile? null: (
                                            <div className="col-12 col-md-4"></div>
                                          )
                                        }
                                        {
                                          isMobile?(
                                            null
                                          ): (
                                            <div className="col-12 col-md-3 pl-4">
                                              Promotion:{' '}
                                              <span
                                                style={{
                                                  color: '#e2001a',
                                                  fontWeight: '400'
                                                }}
                                              >
                                                -{formatMoney(el.tradePrice.discountsPrice)}
                                              </span>
                                            </div>    
                                          )
                                        }
                                        <div className="col-7 col-md-2" style={{padding: isMobile? '0': '0 15px'}}>
                                          {
                                            isMobile? (
                                              <>
                                              <div style={{ textAlign: 'right' }}>
                                                {el.id? (
                                                  <>
                                                  <i className="greenCircle"></i>
                                                  <span>{ORDER_STATUS_ENUM[el.tradeState.flowState] || el.tradeState.flowState}</span>
                                                  <span className="rc-icon rc-right rc-iconography" onClick={(e) => {
                                                    e.preventDefault();
                                                    const { history } = this.props;
                                                    history.push(
                                                      `/account/orders-detail/${el.id}`
                                                    );
                                                  }}></span>
                                                  </>  
                                                ): (
                                                  <>
                                                  <i className="yellowCircle"></i>
                                                  <span>Skiped</span>
                                                  </>
                                                )}
                                              </div>
                                              </>
                                            ): (el.id?(
                                              <>
                                                <img
                                                  style={{
                                                    display: 'inline-block',
                                                    width: '20px',
                                                    marginRight: '5px'
                                                  }}
                                                  src={dateIcon}
                                                />
                                                <a
                                                  class="rc-styled-link"
                                                  href="#/"
                                                  onClick={(e) => {
                                                    e.preventDefault();
                                                    const { history } = this.props;
                                                    history.push(
                                                      `/account/orders-detail/${el.id}`
                                                    );
                                                  }}
                                                >
                                                  {/* <FormattedMessage id="subscription.skip" /> */}
                                                  Order detail
                                                </a>
                                              </>
                                            ): null
                                            )
                                          }
                                        </div>
                                      </div>
                                    </div>
                                    {/* {subDetail.goodsInfo &&
                                    subDetail.goodsInfo.map((el, index) => ( */}
                                    <div
                                      className="row rc-margin-x--none row align-items-center"
                                      style={{
                                        padding: '1rem 0',
                                        borderBottom: '1px solid #d7d7d7'
                                      }}
                                    >
                                      {
                                        isMobile?(
                                          <div className="col-8 col-md-6">
                                            {el.tradeItems &&
                                              el.tradeItems.map(
                                                (tradeItem, index) => {
                                                  if (index < 2) {
                                                    return (
                                                      <>
                                                        <img
                                                          style={{
                                                            width: '70px',
                                                            margin: '0 10px',
                                                            display: 'inline'
                                                          }}
                                                          src={tradeItem.pic}
                                                          alt=""
                                                        />
                                                        <div
                                                         className="v-center"
                                                          style={{
                                                            width: '120px',
                                                            verticalAlign: 'middle',
                                                            display: 'inline-block'
                                                          }}
                                                        >
                                                          <h5
                                                            style={{
                                                              overflow:
                                                                'hidden',
                                                              textOverflow:
                                                                'ellipsis',
                                                              overflowWrap:
                                                                'normal',
                                                              fontSize: '14px',
                                                              whiteSpace:
                                                                'nowrap'
                                                            }}
                                                          >
                                                            {tradeItem.skuName}
                                                          </h5>
                                                          <p
                                                            style={{
                                                              overflow:
                                                                'hidden',
                                                              textOverflow:
                                                                'ellipsis',
                                                              marginBottom:
                                                                '8px',
                                                              fontSize: '14px'
                                                            }}
                                                          >
                                                            {
                                                              tradeItem.specDetails
                                                            }
                                                            &nbsp;&nbsp;x {tradeItem.num}
                                                          </p>
                                                        </div>
                                                      </>
                                                    );
                                                  }
                                                }
                                              )}
                                          </div>
                                        ):(
                                          <div className="col-4 col-md-7">
                                        <div
                                          className="rc-layout-container rc-five-column"
                                          style={{
                                            paddingRight: '60px',
                                            paddingTop: '0'
                                          }}
                                        >
                                          <div
                                            className="rc-column flex-layout"
                                            style={{
                                              width: '100%',
                                              padding: 0
                                            }}
                                          >
                                            {el.tradeItems &&
                                              el.tradeItems.map(
                                                (tradeItem, index) => {
                                                  if (index < 2) {
                                                    return (
                                                      <>
                                                        <img
                                                          style={{
                                                            width: '70px',
                                                            margin: '0 10px'
                                                          }}
                                                          src={tradeItem.pic}
                                                          alt=""
                                                        />
                                                        <div
                                                          style={{
                                                            width: '120px',
                                                            paddingTop: '30px'
                                                          }}
                                                        >
                                                          <h5
                                                            style={{
                                                              overflow:
                                                                'hidden',
                                                              textOverflow:
                                                                'ellipsis',
                                                              overflowWrap:
                                                                'normal',
                                                              fontSize: '14px',
                                                              whiteSpace:
                                                                'nowrap'
                                                            }}
                                                          >
                                                            {tradeItem.skuName}
                                                          </h5>
                                                          <p
                                                            style={{
                                                              overflow:
                                                                'hidden',
                                                              textOverflow:
                                                                'ellipsis',
                                                              marginBottom:
                                                                '8px',
                                                              fontSize: '14px'
                                                            }}
                                                          >
                                                            {
                                                              tradeItem.specDetails
                                                            } x {tradeItem.num}
                                                          </p>
                                                        </div>
                                                      </>
                                                    );
                                                  }
                                                }
                                              )}
                                            {el.tradeItems &&
                                              el.tradeItems.length > 2 && (
                                                <div
                                                  style={{
                                                    width: '120px',
                                                    paddingTop: '30px',
                                                    marginLeft: '40px',
                                                    fontSize: '25px',
                                                    fontWeight: 400
                                                  }}
                                                >
                                                  ...
                                                </div>
                                              )}
                                          </div>
                                        </div>
                                      </div>
                                        )
                                      }
                                      {
                                        isMobile?(
                                          null
                                        ): (
                                          <div className="col-4 col-md-3">
                                            <div style={{ textAlign: 'center' }}>
                                              {
                                                el.id?(
                                                  <>
                                                  <i className="greenCircle"></i>
                                                  <span>{ORDER_STATUS_ENUM[el.tradeState.flowState] || el.tradeState.flowState}</span>
                                                  </>
                                                ): (
                                                  <>
                                                  <i className="yellowCircle"></i>
                                                  <span>Skiped</span>
                                                  </>
                                                )
                                              }
                                            </div>
                                          </div>
                                        )
                                      }
                                      <div
                                        className="col-4 col-md-2"
                                        style={{ textAlign: 'center' }}
                                      >
                                        {formatMoney(el.tradePrice.totalPrice)}
                                      </div>
                                    </div>
                                    {/* ))} */}
                                  </div>
                                ))}
                              {/* {this.state.goodsDetailTab.tabContent.map((ele, i) => (
                                  <div
                                    id={`tab__panel-${i}`}
                                    key={i}
                                    className="rc-tabs__content__single clearfix benefits ingredients rc-showhide"
                                    aria-expanded={
                                      this.state.activeTabIdx === i ? 'true' : 'false'
                                    }
                                  >
                                    <div className="block">
                                      <p
                                        className="content rc-scroll--x"
                                        dangerouslySetInnerHTML={createMarkup(ele)}
                                      />
                                    </div>
                                  </div>
                                ))} */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    );
  }
}

export default SubscriptionDetail;
