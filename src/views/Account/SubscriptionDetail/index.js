import React from 'react';
import './index.less';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import Skeleton from 'react-skeleton-loader';
import { inject, observer } from 'mobx-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BreadCrumbs from '@/components/BreadCrumbs';
import SideMenu from '@/components/SideMenu';
import visaImg from '@/assets/images/credit-cards/visa.svg';
import PaymentComp from './components/PaymentComp';
import AddressComp from './components/AddressComp/index.js';
import { funcUrl } from '@/lib/url-utils';
import SubDetailHeader from './components/SubDetailHeader';
import SubGoodsInfos from './components/SubGoodsInfos';
import UserPaymentInfo from './components/UserPaymentInfo';
import RemainingsList from './components/RemainingsList';
import DeliveryList from './components/DeliveryList';
import Loading from '@/components/Loading';
import { getRation } from '@/utils/utils';
import GiftList from './components/GiftList';
import { getDeviceType, setSeoConfig } from '@/utils/utils';
import { Link } from 'react-router-dom';
import {
  updateDetail,
  getSubDetail,
  skipNextSub,
  cancelAllSub,
  orderNowSub,
  updateNextDeliveryTime,
  checkSubscriptionAddressPickPoint
} from '@/api/subscription';
import Modal from '@/components/Modal';
import 'react-datepicker/dist/react-datepicker.css';
import { Helmet } from 'react-helmet';
import GoogleTagManager from '@/components/GoogleTagManager';
import OngoingOrder from './components/OngoingOrder';
import TempolineAPIError from './components/TempolineAPIError';
import { format } from 'date-fns';

const localItemRoyal = window.__.localItemRoyal;
const pageLink = window.location.href;
const isMobile = getDeviceType() !== 'PC' || getDeviceType() === 'Pad';

@inject('configStore')
@injectIntl
@observer
class SubscriptionDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      triggerShowAddNewPet: false,
      petType: '',
      errMsgPage: '',
      productListLoading: false,
      loadingPage: false,
      triggerShowChangeProduct: {
        goodsInfo: [],
        firstShow: false,
        isShowModal: false,
        showBox: false // 只有一个商品的情况下都需要添加被动更换商品
      },
      seoConfig: {
        title: 'Royal canin',
        metaKeywords: 'Royal canin',
        metaDescription: 'Royal canin'
      },
      isGift: false,
      remainingsList: [],
      remainingsVisible: false,
      //订阅购物车参数
      lastPromotionInputValue: '', //上一次输入的促销码
      subDetail: {},
      loading: false,
      subId: 0,
      selectedTime: 'Every 4 weeks',
      nextOrderTime: '2020-18-06',
      payment: {
        name: 'George Guo',
        card: '00000008',
        type: 'CREDIT',
        cardImg: visaImg
      },
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
      modalShow: false,
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
        },
        {
          title: this.props.intl.messages.modalChangeDateTitle,
          content: this.props.intl.messages.modalChangeDateContent,
          type: 'changeDate'
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
      tabName: [],
      activeTabIdx: 0,
      noStartYearOption: [],
      completedYearOption: [],
      noStartYear: {
        value: ''
      },
      completedYear: {
        value: ''
      },
      isActive: false,
      isNotInactive: false,
      isDataChange: false,
      petName: '', //订阅单的petName
      showTempolineError: false
    };
  }

  paymentSave = (el) => {
    const { subDetail } = this.state;
    const param = {
      subscribeId: subDetail.subscribeId,
      paymentId: el.id,
      goodsItems: subDetail.goodsInfo?.map((el) => {
        return {
          skuId: el.skuId,
          subscribeNum: el.subscribeNum,
          subscribeGoodsId: el.subscribeGoodsId
        };
      }),
      changeField: 'paymentMethod'
    };
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
  };

  cancelEdit = () => {
    this.setState({ type: 'main' });
  };
  // 返回某个地方
  scrollToWhere = (str) => {
    let pstit = document.getElementById(str);
    if (pstit) {
      pstit.scrollIntoView({ behavior: 'smooth' });
    }
  };

  addressSave = (el, isBillSame, fn) => {
    const { subDetail } = this.state;
    // console.log(el, isBillSame);
    this.scrollToWhere('page-top');
    // this.scrollToWhere('sub-user-paymentinfo-title');
    console.log('this.state.addressType:', this.state.addressType);
    if (this.state.addressType === 'delivery') {
      // checkSubscriptionAddressPickPoint({
      //   subscribeId: subDetail.subscribeId,
      //   goodsItems: subDetail.goodsInfo?.map((el) => {
      //     return {
      //       skuId: el.skuId,
      //       subscribeNum: el.subscribeNum,
      //       subscribeGoodsId: el.subscribeGoodsId,
      //       subscribeId: el.subscribeId
      //     };
      //   }),
      //   paymentId: subDetail.paymentId,
      //   deliveryAddressId: el.deliveryAddressId
      // })
      //   .then()
      //   .catch((err) => {
      //     this.setState({ showTempolineError: err.message });
      //     return;
      //   });
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
      title = this.props.intl.messages['subscription.shippingAddress'];
      //如果勾选了同步发票地址,两个地址以逗号隔开传给后台
      if (param.billingAddressId) {
        title =
          title + ',' + this.props.intl.messages['subscription.BillingAddress'];
      }
      //增加返回changeField字段
      Object.assign(param, {
        changeField: title
      });
      // console.log(param);
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
        subscribeId: this.state.subDetail.subscribeId,
        billingAddressId: el.deliveryAddressId,
        goodsItems: this.state.subDetail.goodsInfo.map((el) => {
          return {
            skuId: el.skuId,
            subscribeNum: el.subscribeNum,
            subscribeGoodsId: el.subscribeGoodsId
          };
        })
      };
      //增加返回changeField字段
      Object.assign(param, {
        changeField: this.props.intl.messages['subscription.BillingAddress']
      });
      // console.log(param);
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
  };

  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }

  async componentDidMount() {
    setSeoConfig({
      goodsId: '',
      categoryId: '',
      pageName: 'Subscription Page'
    }).then((res) => {
      this.setState({ seoConfig: res });
    });
    this.setState({
      subId: this.props.match.params.subscriptionNumber
    });
    this.initPage();
  }

  initPage = () => {
    let { search } = this.props.history.location;
    search = search && decodeURIComponent(search);
    let needBindPet =
      funcUrl({ name: 'needBindPet' }) ||
      this.props.location.state?.needBindPet;
    this.getDetail(() => {
      // 邮件展示需要绑定宠物
      needBindPet && this.setState({ triggerShowAddNewPet: true });
      let goodsInfo = [...this.state.subDetail.goodsInfo];
      let isIndv = this.state.subDetail.subscriptionType == 'Individualization';
      // 非激活状态就不展示
      // 如果一进来就需要被动更换商品,删除以前所有商品  2个以上不用推荐  不是创建的时候就展示，需要第一次换粮邮件时才展示
      !isIndv &&
        goodsInfo?.length == 1 &&
        this.state.subDetail.petsLifeStageFlag == 1 &&
        this.state.isNotInactive &&
        this.setState({
          triggerShowChangeProduct: {
            firstShow: true,
            showBox: true,
            show: true,
            goodsInfo,
            isShowModal: false
          }
        });
    });
  };

  changeTab = (e, i) => {
    this.setState({ activeTabIdx: i });
  };

  onDateChange(date, goodsInfo) {
    let { subDetail } = this.state;
    subDetail.nextDeliveryTime = format(date, 'yyyy-MM-dd');
    let param = {
      subscribeId: subDetail.subscribeId,
      nextDeliveryTime: subDetail.nextDeliveryTime,
      goodsItems: goodsInfo,
      changeField: 'Next Delivery Time'
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

  getMinDate = (nextDeliveryTime) => {
    return new Date(this.state.minDate.getTime() + 1 * 24 * 60 * 60 * 1000);
  };

  getMaxDate(nextDeliveryTime) {
    return new Date(
      new Date(nextDeliveryTime).getTime() + 14 * 24 * 60 * 60 * 1000
    );
  }

  getGoodsRations = async (subDetail, isIndv) => {
    let petsId = subDetail.petsInfo?.petsId;

    return subDetail.petsInfo;
  };

  getDetail = async (fn) => {
    try {
      this.setState({ loading: true });
      let res = await getSubDetail(this.props.match.params.subscriptionNumber);
      let subDetail = res.context || {};
      let noStartYear = {};
      let completedYear = {};
      let noStartYearOption = [];
      let completedYearOption = [];
      let petsType = '';
      let isIndv = subDetail.subscriptionType == 'Individualization';
      subDetail.goodsInfo =
        subDetail.goodsInfo?.map((item) => {
          if (isIndv) {
            // item.spuName = `${item.petsName}'s personalized subscription`;
            item.spuName = (
              <FormattedMessage
                id="subscription.personalized"
                values={{ val1: item.petsName }}
              />
            );

            // item.specDetails = item.num / 1000 + 'kg';
            item.num = 1;
            // item.goodsName = `${subDetail?.petsInfo?.petsName}'s personalized subscription`;
            item.goodsName = (
              <FormattedMessage
                id="subscription.personalized"
                values={{ val1: subDetail?.petsInfo?.petsName }}
              />
            );
          }
          return item;
        }) || []; //防止商品被删报错
      let isCat =
        subDetail.goodsInfo?.every((el) => el.goodsCategory?.match(/cat/i)) &&
        'Cat';
      let isDog =
        subDetail.goodsInfo?.every((el) => el.goodsCategory?.match(/dog/i)) &&
        'Dog';
      petsType = isCat || isDog || 'CatAndDog';

      let completeOption = new Set(
        (subDetail.completedTradeList || []).map((el) => {
          return el.tradeState.createTime.split('-')[0];
        })
      );
      let noStartOption = new Set(
        (subDetail.noStartTradeList || []).map((el) => {
          return el.tradeItems[0].nextDeliveryTime.split('-')[0];
        })
      );
      subDetail.noStartTradeList?.forEach((el) => {
        el.tradeItems.forEach((item) => {
          item.num = isIndv ? 1 : item.num;
        });
      });
      let petsId = subDetail.petsInfo?.petsId;
      if (petsId) {
        if (isIndv) {
          subDetail.goodsInfo.map((item) => {
            item.petsRation = Math.round(item.subscribeNum / 30) + 'g/jour';
            // return item;
          });
        } else {
          let spuNoList = subDetail.goodsInfo?.map((el) => el.spuNo);
          // get rations
          let rationsParams = { petsId, spuNoList };
          let rations = [];
          try {
            // 不能删除trycatch 该接口有问题会影响后续流程
            let rationRes = await getRation(rationsParams);
            rations = rationRes?.context?.rationResponseItems;
            subDetail.goodsInfo?.forEach((el) => {
              rations?.forEach((ration) => {
                if (el.spuNo == ration.mainItem) {
                  el.petsRation = `${Math.round(ration.weight)}${
                    ration.weightUnit
                  }/${this.props.intl.messages['day-unit']}`;
                }
              });
            });
            // return subDetail.goodsInfo;
          } catch (err) {
            console.log(err);
          }
        }
      }
      completeOption.forEach((el) => {
        completedYearOption.push({ name: el, value: el });
      });
      completedYear = {
        value: (completedYearOption[0] && completedYearOption[0]['value']) || ''
      };

      noStartOption.forEach((el) => {
        noStartYearOption.push({ name: el, value: el });
      });
      let tabName = [];
      if (noStartYearOption.length > 0) {
        tabName.push(this.props.intl.messages.noStart);
      }
      if (completedYearOption.length > 0) {
        tabName.push(this.props.intl.messages.completed);
      }
      noStartYear = {
        value: noStartYearOption[0] && noStartYearOption[0]['value'],
        name: noStartYearOption[0] && noStartYearOption[0]['value']
      };
      let isGift =
        subDetail.goodsInfo &&
        subDetail.goodsInfo[0]?.subscriptionPlanId &&
        subDetail.subscriptionPlanFullFlag === 0; //subscriptionPlanFullFlag判断food dispenser是否在有效期
      let now = new Date(res.defaultLocalDateTime);
      now.setDate(now.getDate() + 4);
      this.setState(
        {
          petType: petsType,
          isGift: isGift,
          subDetail: subDetail,
          petName: subDetail?.petsInfo?.petsName,
          currentCardInfo: subDetail.payPaymentInfo,
          currentDeliveryAddress: subDetail.consignee,
          currentBillingAddress: subDetail.invoice,
          noStartYearOption,
          completedYearOption,
          noStartYear,
          completedYear,
          isActive: subDetail.subscribeStatus === '0',
          tabName,
          isNotInactive:
            subDetail.subscribeStatus === '0' ||
            subDetail.subscribeStatus === '1' //subscribeStatus为2的时候不能操作按钮
        },
        () => {
          if (!this.state.subDetail.petsLifeStageFlag) {
            this.setState({
              triggerShowChangeProduct: Object.assign(
                {},
                this.state.triggerShowChangeProduct,
                {
                  // isShowModal: false,
                  showBox: false // 只有一个商品的情况下都需要添加被动更换商品
                }
              )
            });
          }
          fn && fn(subDetail);
        }
      );
    } catch (err) {
      console.log(22222, err);
      this.showErrMsg(err.message || err);
    } finally {
      this.setState({ loading: false });
    }
  };

  matchCityName(dict, cityId) {
    return dict.filter((c) => c.id === cityId).length
      ? dict.filter((c) => c.id === cityId)[0].cityName
      : cityId;
  }

  hanldeClickSubmit = () => {
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
    } else if (modalType === 'changeDate') {
      this.onDateChange(
        this.state.currentChangeDate,
        this.state.currentChangeItem
      );
    }
  };

  closeRemainings = () => {
    this.setState({ remainingsVisible: false });
  };

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
        typeof fn == 'function' && fn();
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

  async handleSaveChange(subDetail) {
    if (!this.state.isDataChange) {
      return false;
    }
    if (this.state.isGift) {
      //food dispensor 不能修改，不能暂停
      this.props.history.push('/account/subscription');
      return;
    }
    try {
      let param = {
        subscribeId: subDetail.subscribeId,
        subscribeStatus: subDetail.subscribeStatus,
        changeField: 'productNumberOrFrequency'
      };
      Object.assign(param, {
        goodsItems: subDetail.goodsInfo?.map((el) => {
          return {
            skuId: el.skuId,
            subscribeNum: el.subscribeNum,
            subscribeGoodsId: el.subscribeGoodsId,
            periodTypeId: el.periodTypeId
          };
        })
      });
      // await checkSubscriptionAddressPickPoint({
      //   subscribeId: subDetail.subscribeId,
      //   goodsItems: subDetail.goodsInfo?.map((el) => {
      //     return {
      //       skuId: el.skuId,
      //       subscribeNum: el.subscribeNum,
      //       subscribeGoodsId: el.subscribeGoodsId,
      //       subscribeId: el.subscribeId
      //     };
      //   }),
      //   paymentId: subDetail.paymentId,
      //   deliveryAddressId: subDetail.deliveryAddressId
      // });
      await this.doUpdateDetail(param);
      await this.getDetail();
      this.showErrMsg(this.props.intl.messages.saveSuccessfullly, 'success');
      this.setState({
        isDataChange: false
      });
    } catch (err) {
      this.showErrMsg(err.message);
      // this.setState({ showTempolineError: err.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const event = {
      page: {
        type: 'Account',
        theme: '',
        path: location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: ''
      }
    };
    let {
      type,
      currentCardInfo,
      currentDeliveryAddress,
      currentBillingAddress,
      addressType,
      loading,
      subDetail,
      triggerShowAddNewPet,
      errMsgPage,
      currentModalObj,
      productListLoading,
      petType,
      noStartYearOption,
      completedYearOption,
      isDataChange,
      tabName,
      activeTabIdx,
      completedYear,
      isGift,
      remainingsList,
      noStartYear,
      modalList,
      modalShow,
      loadingPage,
      remainingsVisible,
      submitLoading,
      triggerShowChangeProduct,
      seoConfig,
      petName
    } = this.state;
    let isShowClub =
      subDetail.subscriptionType?.toLowerCase().includes('club') ||
      subDetail.subscriptionType?.toLowerCase().includes('individualization'); //indv的展示和club类似
    // && window.__.env.REACT_APP_COUNTRY != 'ru'; //ru的club展示不绑定宠物，和普通订阅一样
    return (
      <div className="subscriptionDetail">
        <div>
          <GoogleTagManager additionalEvents={event} />
          <Helmet>
            <link rel="canonical" href={pageLink} />
            <title>{seoConfig.title}</title>
            <meta name="description" content={seoConfig.metaDescription} />
            <meta name="keywords" content={seoConfig.metaKeywords} />
          </Helmet>
          <Header {...this.props} showMiniIcons={true} showUserIcon={true} />
          <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
            <BreadCrumbs />
            <Modal
              key="1"
              visible={modalShow}
              confirmLoading={submitLoading}
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
                {loadingPage ? <Loading positionFixed="true" /> : null}

                {isMobile ? (
                  <div className="col-12 rc-md-down">
                    <Link to="/account/subscription">
                      <span className="red">&lt;</span>
                      <span className="rc-styled-link rc-progress__breadcrumb ml-2 mt-1">
                        <FormattedMessage id="subscription" />
                      </span>
                    </Link>
                  </div>
                ) : (
                  <SideMenu type="Subscription" />
                )}
                <div
                  className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop"
                  style={{ display: type === 'PaymentComp' ? 'block' : 'none' }}
                >
                  {currentCardInfo && (
                    <PaymentComp
                      needEmail={+window.__.env.REACT_APP_PAYU_EMAIL}
                      needPhone={+window.__.env.REACT_APP_PAYU_PHONE}
                      history={this.props.history}
                      paymentId={currentCardInfo.id}
                      type={type}
                      save={(el) => this.paymentSave(el)}
                      cancel={this.cancelEdit}
                    />
                  )}
                </div>

                {/* <div
                  className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop subscription_address_list"
                  style={{ display: type === 'AddressComp' ? 'block' : 'none' }}
                >
                  <AddressComp
                    customerAccount={subDetail?.customerAccount}
                    tradeItems={subDetail?.noStartTradeList}
                    type={addressType}
                    deliveryAddressId={subDetail.deliveryAddressId}
                    billingAddressId={subDetail.billingAddressId}
                    save={(el, isBillSame, fn) =>
                      this.addressSave(el, isBillSame, fn)
                    }
                    cancel={this.cancelEdit}
                  />
                </div> */}

                <div
                  className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop subscription_detail_info"
                  style={{
                    display:
                      type === 'main' || type === 'AddressComp'
                        ? 'block'
                        : 'none'
                  }}
                >
                  <SubDetailHeader
                    triggerShowChangeProduct={triggerShowChangeProduct}
                    getDetail={this.getDetail}
                    productListLoading={productListLoading}
                    petType={petType}
                    isShowClub={isShowClub}
                    setState={this.setState.bind(this)}
                    subDetail={subDetail}
                    initPage={this.initPage}
                    history={this.props.history}
                    triggerShowAddNewPet={triggerShowAddNewPet}
                  />
                  {/* <hr className="rc-margin-top---none" /> */}
                  <div className="content-asset">
                    {loading && (
                      <div className="mt-4">
                        <Skeleton
                          color="#f5f5f5"
                          width="100%"
                          height="50%"
                          count={4}
                        />
                      </div>
                    )}
                    <div className={`${loading ? 'hidden' : ''} `}>
                      {/* 商品详情 */}
                      <>
                        <SubGoodsInfos
                          {...this.props}
                          getDetail={this.getDetail}
                          handleSaveChange={this.handleSaveChange.bind(this)}
                          modalList={modalList}
                          triggerShowChangeProduct={triggerShowChangeProduct}
                          isDataChange={isDataChange}
                          isShowClub={isShowClub}
                          isGift={isGift}
                          onDateChange={this.onDateChange}
                          productListLoading={productListLoading}
                          errMsgPage={errMsgPage}
                          setState={this.setState.bind(this)}
                          getMinDate={this.getMinDate}
                          showErrMsg={this.showErrMsg.bind(this)}
                          subDetail={subDetail}
                        />
                      </>

                      {/*tempoline api error message tip*/}
                      <TempolineAPIError
                        showError={this.state.showTempolineError}
                        closeError={() => {
                          this.setState({ showTempolineError: false });
                        }}
                      />

                      {/* Ongoing Order */}
                      {subDetail.onGoingTradeList &&
                      subDetail.onGoingTradeList.length > 0 ? (
                        <>
                          <h4 className="h4">
                            {petName ? (
                              <FormattedMessage
                                id="subscription.ongoingOrderForPet"
                                values={{ val: petName }}
                              />
                            ) : (
                              <FormattedMessage id="subscription.noPetOngoingOrder" />
                            )}
                          </h4>
                          <div className="rc-max-width--xl">
                            <OngoingOrder
                              {...this.props}
                              subDetail={subDetail}
                            />
                          </div>
                        </>
                      ) : null}

                      {/* 历史订单 */}
                      <>
                        <h4 className="h4">
                          <FormattedMessage id="myAutoshipOrder" />
                        </h4>
                        <div className="rc-max-width--xl">
                          <DeliveryList
                            {...this.props}
                            modalList={modalList}
                            getMinDate={this.getMinDate}
                            completedYearOption={completedYearOption}
                            setState={this.setState.bind(this)}
                            changeTab={this.changeTab}
                            noStartYear={noStartYear}
                            tabName={tabName}
                            noStartYearOption={noStartYearOption}
                            subDetail={subDetail}
                            isGift={isGift}
                            completedYear={completedYear}
                            activeTabIdx={activeTabIdx}
                          />
                          <GiftList
                            {...this.props}
                            modalList={modalList}
                            setState={this.setState.bind(this)}
                            activeTabIdx={this.activeTabIdx}
                            tabName={this.tabName}
                            changeTab={this.changeTab}
                            subDetail={subDetail}
                            noStartYear={noStartYear}
                            isGift={isGift}
                          />
                        </div>
                      </>

                      {/* 用户信息、地址列表 */}
                      <>
                        <h4 className="h4" id="sub-user-paymentinfo-title">
                          <FormattedMessage id="transactionInfo" />
                        </h4>
                        {/* 订阅详情用户数据 */}
                        {type === 'main' ? (
                          <UserPaymentInfo
                            currentCardInfo={currentCardInfo}
                            currentBillingAddress={currentBillingAddress}
                            subDetail={subDetail}
                            setState={this.setState.bind(this)}
                            currentDeliveryAddress={currentDeliveryAddress}
                          />
                        ) : null}

                        {/* 地址列表 */}
                        {type === 'AddressComp' ? (
                          <AddressComp
                            customerAccount={subDetail?.customerAccount}
                            tradeItems={subDetail?.noStartTradeList}
                            type={addressType}
                            deliveryAddressId={subDetail.deliveryAddressId}
                            billingAddressId={subDetail.billingAddressId}
                            save={(el, isBillSame, fn) =>
                              this.addressSave(el, isBillSame, fn)
                            }
                            cancel={this.cancelEdit}
                          />
                        ) : null}
                      </>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rc-md-up">
              <Modal
                headerVisible={false}
                // footerVisible={false}
                visible={remainingsVisible}
                cancelBtnIsLink={true}
                modalTitle={''}
                close={this.closeRemainings}
                hanldeClickConfirm={() => this.hanldeClickSubmit()}
              >
                <RemainingsList remainingsList={remainingsList} />
              </Modal>
            </div>
            <div
              className="sub-des-mobile-modal rc-md-down"
              style={{
                display: remainingsVisible ? 'block' : 'none'
              }}
            >
              <RemainingsList remainingsList={remainingsList} />
              <a className="rc-styled-link" onClick={this.closeRemainings}>
                cancel
              </a>
              <span style={{ padding: '0 1rem' }}>or</span>
              <button
                className="rc-btn rc-btn--one"
                onClick={this.hanldeClickSubmit}
              >
                confoirm
              </button>
            </div>
            <Footer />
          </main>
        </div>
      </div>
    );
  }
}

export default SubscriptionDetail;
