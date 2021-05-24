import React from 'react';
import './index.less';
import { FormattedMessage, injectIntl, FormattedDate } from 'react-intl';
import Skeleton from 'react-skeleton-loader';
import { inject, observer } from 'mobx-react';
import find from 'lodash/find';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BreadCrumbs from '@/components/BreadCrumbs';
import SideMenu from '@/components/SideMenu';
import visaImg from '@/assets/images/credit-cards/visa.svg';
import PaymentComp from './components/PaymentComp';
import AddressComp from './components/AddressComp/index.js';
import Selection from '@/components/Selection';
import smartFeeder from '@/assets/images/smart_feeder.png';
import { unique, getParaByName } from '@/utils/utils';
import SubDetailHeader from './components/SubDetailHeader';
import SubGoodsInfos from './components/SubGoodsInfos';
import UserPaymentInfo from './components/UserPaymentInfo';
import RemainingsList from './components/RemainingsList';
import NextDelivery from './components/DeliveryList/NextDelivery';
import CompletedDelivery from './components/DeliveryList/CompletedDelivery';
import Loading from '@/components/Loading';
import { getRation, getFrequencyDictgetClubLogo } from '@/utils/utils';
import GiftList from './components/GiftList';
import {
  getDictionary,
  getDeviceType,
  getFrequencyDict,
  getFormatDate,
  formatMoney,
  setSeoConfig
} from '@/utils/utils';
import DatePicker from 'react-datepicker';
import skipIcon from './images/skip.png';
import { Link } from 'react-router-dom';
import {
  updateDetail,
  getSubDetail,
  skipNextSub,
  cancelAllSub,
  orderNowSub,
  updateNextDeliveryTime
} from '@/api/subscription';
import Modal from '@/components/Modal';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import LazyLoad from 'react-lazyload';
import { Helmet } from 'react-helmet';
import GoogleTagManager from '@/components/GoogleTagManager';
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
      dogBreedList: [],
      catBreedList: [],
      petType: '',
      errMsgPage: '',
      errorMsgAddPet: '',
      productListLoading: false,
      loadingPage: false,
      // addGoodsItemquantity: 1,
      //订阅购物车参数
      subTotal: 0,
      subShipping: 0,
      addNewPetLoading: false,
      addNewPetVisible: false,
      changeRecommendationVisible: false,
      petList: [],
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
      subTradeTotal: 0,
      //订阅购物车参数
      promotionInputValue: '', //输入的促销码
      lastPromotionInputValue: '', //上一次输入的促销码
      subDetail: {},
      loading: false,
      subId: 0,
      selectedTime: 'Every 4 weeks',
      nextOrderTime: '2020-18-06',
      productName: 'Glycobalance Feline',
      productPrice: '$46.54',
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
      maxDate: new Date(),
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
      isDataChange: false
    };
  }
  paymentSave = (el) => {
    const { subDetail } = this.state;
    let param = {
      subscribeId: subDetail.subscribeId,
      paymentId: el.id,
      goodsItems: subDetail.goodsInfo?.map((el) => {
        return {
          skuId: el.skuId,
          subscribeNum: el.subscribeNum,
          subscribeGoodsId: el.subscribeGoodsId
        };
      })
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
  addressSave = (el, isBillSame, fn) => {
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
        changeField: this.props.intl.messages['subscription.BillingAddress']
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
  };
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }

  getBreedName = (petsType, petsBreed) => {
    let name =
      petsType?.toLowerCase() === 'dog'
        ? this.state.dogBreedList.length &&
          this.state.dogBreedList.filter(
            (item) => item.valueEn == petsBreed
          )?.[0]?.name
        : this.state.catBreedList.length &&
          this.state.catBreedList.filter(
            (item) => item.valueEn == petsBreed
          )?.[0]?.name;
    return name || this.props.intl.messages['Mixed Breed'];
  };

  async componentDidMount() {
    this.getBreedList();
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
      getParaByName(search, 'needBindPet') ||
      this.props.location.state?.needBindPet;
    this.getDetail(() => {
      // 需要在异步的setstate之后执行
      let goodsInfo = [...this.state.subDetail.goodsInfo];
      // 邮件展示需要绑定宠物
      needBindPet && this.setState({ triggerShowAddNewPet: true });
      // 非激活状态就不展示
      // 如果一进来就需要被动更换商品,删除以前所有商品  2个以上不用推荐
      goodsInfo?.length == 1 &&
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
  changeTab(e, i) {
    this.setState({ activeTabIdx: i });
  }
  onDateChange(date, goodsInfo) {
    let { subDetail } = this.state;
    subDetail.nextDeliveryTime = format(date, 'yyyy-MM-dd');
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
    let time = new Date(nextDeliveryTime);
    return new Date(this.state.minDate.getTime() + 1 * 24 * 60 * 60 * 1000);
  };
  getMaxDate(nextDeliveryTime) {
    return new Date(
      new Date(nextDeliveryTime).getTime() + 14 * 24 * 60 * 60 * 1000
    );
  }

  closeAddNewPet = () => {
    this.setState({ addNewPetVisible: false });
  };
  showAddNewPet = () => {
    this.getPetList();
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
      let petsId = subDetail.petsInfo?.petsId;
      if (petsId) {
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
                el.petsRation = `${ration.weight}${ration.weightUnit}/${this.props.intl.messages['day-unit']}`;
              }
            });
          });
        } catch (err) {
          console.log(err, 'err1111');
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
        subDetail.goodsInfo[0]?.subscriptionPlanId &&
        subDetail.subscriptionPlanFullFlag === 0; //subscriptionPlanFullFlag判断food dispenser是否在有效期
      let now = new Date(res.defaultLocalDateTime);
      now.setDate(now.getDate() + 4);
      this.setState(
        {
          petType: petsType,
          isGift: isGift,
          subDetail: subDetail,
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
          fn && fn();
        }
      );
    } catch (err) {
      console.log(22222, err);
      this.showErrMsg(err.message);
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
  async handleSaveChange(subDetail) {
    if (!this.state.isDataChange) {
      return false;
    }
    try {
      let param = {
        subscribeId: subDetail.subscribeId
      };
      if (this.state.isGift) {
        //food dispensor 不能修改，不能暂停
        return;
      }
      Object.assign(
        param,
        {
          goodsItems: subDetail.goodsInfo?.map((el) => {
            return {
              skuId: el.skuId,
              subscribeNum: el.subscribeNum,
              subscribeGoodsId: el.subscribeGoodsId,
              periodTypeId: el.periodTypeId
            };
          })
        },
        {
          changeField: this.props.intl.messages['produtctNumber']
        }
      );

      Object.assign(param, {
        subscribeStatus: subDetail.subscribeStatus
      });
      await this.doUpdateDetail(param);
      if (this.state.isGift) {
        this.props.history.push('/account/subscription');
        return;
      }
      await this.getDetail();
      this.showErrMsg(this.props.intl.messages.saveSuccessfullly, 'success');
      this.setState({
        isDataChange: false
      });
    } catch (err) {
      this.showErrMsg(err.message);
    } finally {
      this.setState({ loading: false });
    }
  }

  getBreedList = () => {
    getDictionary({ type: 'catBreed' }).then((res) => {
      this.setState({
        catBreedList: res
      });
    });
    getDictionary({ type: 'dogBreed' }).then((res) => {
      this.setState({
        dogBreedList: res
      });
    });
  };
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
      subDetail,
      currentModalObj,
      noStartYearOption,
      completedYearOption,
      noStartYear,
      completedYear,
      isActive,
      isNotInactive,
      isGift,
      remainingsVisible
    } = this.state;
    console.log(noStartYearOption, noStartYear, 'noStartYearOption----');
    let isClub =
      subDetail.subscriptionType?.toLowerCase().includes('club') &&
      process.env.REACT_APP_COUNTRY != 'RU'; //ru的club展示不绑定宠物，和普通订阅一样
    return (
      <div className="subscriptionDetail">
        <div>
          <GoogleTagManager additionalEvents={event} />
          <Helmet>
            <link rel="canonical" href={pageLink} />
            <title>{this.state.seoConfig.title}</title>
            <meta
              name="description"
              content={this.state.seoConfig.metaDescription}
            />
            <meta name="keywords" content={this.state.seoConfig.metaKeywords} />
          </Helmet>
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
                {this.state.loadingPage ? (
                  <Loading positionFixed="true" />
                ) : null}
                {/* <SideMenu type="Subscription" /> */}
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
                      needEmail={+process.env.REACT_APP_PAYU_EMAIL}
                      needPhone={+process.env.REACT_APP_PAYU_PHONE}
                      history={this.props.history}
                      paymentId={currentCardInfo.id}
                      type={type}
                      save={(el) => this.paymentSave(el)}
                      cancel={this.cancelEdit}
                    />
                  )}
                </div>
                <div
                  className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop"
                  style={{ display: type === 'AddressComp' ? 'block' : 'none' }}
                >
                  <AddressComp
                    customerAccount={subDetail?.customerAccount}
                    tradeItems={subDetail?.noStartTradeList}
                    type={addressType}
                    deliveryAddressId={subDetail.deliveryAddressId}
                    billingAddressId={subDetail.billingAddressId}
                    save={() => this.addressSave(el, isBillSame, fn)}
                    cancel={this.cancelEdit}
                  />
                </div>
                <div
                  className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop subscriptionDetail"
                  style={{ display: type === 'main' ? 'block' : 'none' }}
                >
                  <SubDetailHeader
                    triggerShowChangeProduct={
                      this.state.triggerShowChangeProduct
                    }
                    getDetail={this.getDetail}
                    isNotInactive={this.state.isNotInactive}
                    productListLoading={this.state.productListLoading}
                    petType={this.state.petType}
                    isClub={isClub}
                    setState={this.setState.bind(this)}
                    isActive={this.state.isActive}
                    isNotInactive={this.state.isNotInactive}
                    subDetail={this.state.subDetail}
                    getBreedName={this.getBreedName}
                    initPage={this.initPage}
                    history={this.props.history}
                    triggerShowAddNewPet={this.state.triggerShowAddNewPet}
                  />
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
                      <SubGoodsInfos
                        getDetail={this.getDetail}
                        modalList={this.state.modalList}
                        triggerShowChangeProduct={
                          this.state.triggerShowChangeProduct
                        }
                        isActive={isActive}
                        isDataChange={this.state.isDataChange}
                        isClub={isClub}
                        isGift={this.state.isGift}
                        onDateChange={this.onDateChange}
                        productListLoading={this.state.productListLoading}
                        errMsgPage={this.state.errMsgPage}
                        isNotInactive={this.state.isNotInactive}
                        minDate={this.state.minDate}
                        setState={this.setState.bind(this)}
                        getMinDate={this.getMinDate}
                        showErrMsg={this.showErrMsg.bind(this)}
                        subDetail={this.state.subDetail}
                      />
                      <h4 className="h4">
                        <FormattedMessage id="myAutoshipOrder" />
                      </h4>
                      <div className="rc-max-width--xl">
                        <div
                          style={{ display: `${isGift ? 'none' : 'initial'}` }}
                          className="rc-match-heights rc-content-h-middle rc-reverse-layout"
                        >
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
                                  width: isMobile ? 'auto' : '230px',
                                  borderBottom: '1px solid #aaa',
                                  textAlign: 'left'
                                }}
                              >
                                {this.state.activeTabIdx === 0 ? (
                                  <Selection
                                    optionList={noStartYearOption}
                                    selectedItemData={noStartYear}
                                    selectedItemChange={(el) => {
                                      if (this.state.activeTabIdx === 0) {
                                        this.setState({ noStartYear: el });
                                      } else {
                                        this.setState({ completedYear: el });
                                      }
                                    }}
                                    type="freqency"
                                    key={
                                      (noStartYear && noStartYear.value) || ''
                                    }
                                  />
                                ) : (
                                  <Selection
                                    optionList={completedYearOption}
                                    selectedItemData={completedYear}
                                    selectedItemChange={(el) => {
                                      if (this.state.activeTabIdx === 0) {
                                        this.setState({ noStartYear: el });
                                      } else {
                                        this.setState({ completedYear: el });
                                      }
                                    }}
                                    type="freqency"
                                    key={
                                      (completedYear && completedYear.value) ||
                                      ''
                                    }
                                  />
                                )}
                              </span>
                            </div>
                            <div
                              className="rc-tabs tabs-detail"
                              style={{ marginTop: '40px' }}
                            >
                              {this.state.activeTabIdx === 0 &&
                                subDetail.noStartTradeList &&
                                subDetail.noStartTradeList
                                  .filter(
                                    (el) =>
                                      noStartYear &&
                                      el.tradeItems[0].nextDeliveryTime.split(
                                        '-'
                                      )[0] === noStartYear.value
                                  )
                                  .map((el) => (
                                    <NextDelivery
                                      promotionInputValue={
                                        this.state.promotionInputValue
                                      }
                                      modalList={this.state.modalList}
                                      setState={this.setState.bind(this)}
                                      minDate={this.state.minDate}
                                      getMinDate={this.getMinDate}
                                      isNotInactive={this.state.isNotInactive}
                                      el={el}
                                      isActive={this.state.isActive}
                                    />
                                  ))}
                              {this.state.activeTabIdx === 1 &&
                                subDetail.completedTradeList &&
                                subDetail.completedTradeList
                                  .filter(
                                    (el) =>
                                      completedYear &&
                                      el.tradeState.createTime.split('-')[0] ===
                                        completedYear.value
                                  )
                                  .map((el, i) => (
                                    <CompletedDelivery
                                      el={el}
                                      isActive={this.state.isActive}
                                      i={i}
                                    />
                                  ))}
                            </div>
                          </div>
                        </div>

                        <GiftList
                          modalList={this.state.modalList}
                          setState={this.setState.bind(this)}
                          activeTabIdx={this.activeTabIdx}
                          tabName={this.tabName}
                          changeTab={this.changeTab}
                          subDetail={this.state.subDetail}
                          noStartYear={this.state.noStartYear}
                          isNotInactive={this.state.isNotInactive}
                          isGift={this.state.isGift}
                        />
                      </div>

                      <h4 className="h4">
                        <FormattedMessage id="transactionInfo" />
                      </h4>
                      <UserPaymentInfo
                        currentCardInfo={currentCardInfo}
                        currentBillingAddress={currentBillingAddress}
                        subDetail={subDetail}
                        setState={this.setState.bind(this)}
                        currentDeliveryAddress={currentDeliveryAddress}
                      />
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
                <RemainingsList remainingsList={this.state.remainingsList} />
              </Modal>
            </div>
            <div
              className="sub-des-mobile-modal rc-md-down"
              style={{
                display: remainingsVisible ? 'block' : 'none'
              }}
            >
              <RemainingsList remainingsList={this.state.remainingsList} />
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
