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
import { myAccountActionPushEvent } from '@/utils/GA';
import SubDetailHeader from './components/SubDetailHeader';
import SubGoodsInfos from './components/SubGoodsInfos';
import NextDelivery from './components/DeliveryList/NextDelivery';
import CompletedDelivery from './components/DeliveryList/CompletedDelivery';

import Loading from '@/components/Loading';
import { filterOrderId, getRation, getClubLogo } from '@/utils/utils';

import {
  getDictionary,
  dynamicLoadCss,
  getDeviceType,
  getFrequencyDict,
  getFormatDate,
  datePickerConfig,
  formatMoney,
  setSeoConfig,
  getZoneTime
} from '@/utils/utils';
import { getDetailsBySpuNo } from '@/api/details';
import GoodsDetailTabs from '@/components/GoodsDetailTabs';
import DatePicker from 'react-datepicker';
import skipIcon from './images/skip.png';
import deliveryIcon from './images/deliveryAddress.png';
import billingIcon from './images/billingAddress.png';
import paymentIcon from './images/payment.png';
import { Link } from 'react-router-dom';
import { CREDIT_CARD_IMG_ENUM } from '@/utils/constant';
import {
  updateDetail,
  changeSubscriptionDetailPets,
  getAddressDetail,
  getSubDetail,
  skipNextSub,
  cancelAllSub,
  orderNowSub,
  getPromotionPrice,
  updateNextDeliveryTime,
  startSubscription,
  pauseSubscription,
  changeSubscriptionGoods,
  findPetProductForClub
} from '@/api/subscription';
import { getRemainings } from '@/api/dispenser';
import { queryCityNameById } from '@/api';
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
      mainProductDetails: {}, //推荐主商品的详情数据
      dogBreedList: [],
      catBreedList: [],
      petsType: '',
      errMsgPage: '',
      errorMsgAddPet: '',
      errMsgDetail: '',
      errorMsgSureChange: '',
      productDetail: {},
      changeNowLoading: false,
      productListLoading: false,
      currentGoodsItems: [],
      goodsDetails: {}, //for GoodsDetailTabs
      stock: 0,
      currentSubscriptionPrice: null,
      quantityMinLimit: 1,
      foodFllType: '',
      quantity: 1,
      loadingPage: false,
      // addGoodsItemquantity: 1,
      //订阅购物车参数
      subTotal: 0,
      subShipping: 0,
      addNewPetLoading: false,
      addNewPetVisible: false,
      changeRecommendationVisible: false,
      editRecommendationVisible: true, // 只有一个商品的情况下都需要添加被动更换商品
      recommendationVisibleLoading: true,
      produtctDetailVisible: false,
      changeProductVisible: false,
      petList: [],
      form: {
        buyWay: 1, //0 - once/ 1 - frequency
        frequencyVal: '',
        frequencyName: '',
        frequencyId: -1
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
      frequencyList: [],
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
      isDataChange: false,
      details: {},
      images: [],
      specList: [],
      barcode: ''
    };
  }
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  productDetailsInit = (res, cb) => {
    let { configStore } = this.props;
    const goodsRes = res && res.context && res.context.goods;
    let frequencyDictRes = this.frequencyListOptions.filter((el) => {
      if (goodsRes.promotions && goodsRes.promotions.includes('club')) {
        return el.goodsInfoFlag === 2;
      } else {
        return el.goodsInfoFlag === 1;
      }
    });
    let defaultSubscriptionFrequencyId =
      goodsRes.promotions && goodsRes.promotions.includes('club')
        ? configStore.info.storeVO.defaultSubscriptionClubFrequencyId
        : configStore.info.storeVO.defaultSubscriptionFrequencyId;
    this.setState({
      form: Object.assign(this.state.form, {
        frequencyId:
          goodsRes.defaultFrequencyId ||
          defaultSubscriptionFrequencyId ||
          (frequencyDictRes[0] && frequencyDictRes[0].id) ||
          ''
      })
    });
    let petType = 'Cat';
    let foodType = 'Dry';
    if (res && res.context?.goodsAttributesValueRelList) {
      res.context.goodsAttributesValueRelList.forEach((item, idx) => {
        if (item.goodsAttributeName == 'Lifestages') {
          petType =
            item.goodsAttributeValue.split('_') &&
            item.goodsAttributeValue.split('_')[1];
        }
        if (item.goodsAttributeName == 'Technology') {
          foodType = item.goodsAttributeValue;
        }
      });
    }
    let sizeList = [];
    let goodsInfos = res.context.goodsInfos || [];
    if (res && res.context && res.context.goodsSpecDetails) {
      let specList = res.context.goodsSpecs;
      let foodFllType = `${foodType} ${petType} Food`;

      let specDetailList = res.context.goodsSpecDetails;
      specList.map((sItem, index) => {
        sItem.chidren = specDetailList.filter((sdItem, i) => {
          if (index === 0) {
            let filterproducts = goodsInfos.filter((goodEl) =>
              goodEl.mockSpecDetailIds.includes(sdItem.specDetailId)
            );
            sdItem.goodsInfoUnit = filterproducts?.[0]?.goodsInfoUnit;
            sdItem.isEmpty = filterproducts.every((item) => item.stock === 0);
            sdItem.isClub = filterproducts.every(
              (item) =>
                // item.promotions=='club'&&
                item.subscriptionStatus === 1 && item.subscriptionPrice > 0
            );
            console.info('sdItem.isEmpty', sdItem.isEmpty);

            // filterproduct.goodsInfoWeight = parseFloat(sdItem.detailName)
          }
          return sdItem.specId === sItem.specId;
        });
        let defaultSelcetdSku = -1;
        if (defaultSelcetdSku > -1) {
          // 默认选择该sku
          if (
            !sItem.chidren[defaultSelcetdSku].isEmpty &&
            sItem.chidren[defaultSelcetdSku]?.isClub
          ) {
            // 如果是sku进来的，需要默认当前sku被选择
            sItem.chidren[defaultSelcetdSku].selected = true;
          }
        } else {
          if (
            process.env.REACT_APP_COUNTRY === 'DE' &&
            sItem.chidren.length > 1 &&
            !sItem.chidren[1].isEmpty &&
            sItem.chidren[1].isClub
          ) {
            sItem.chidren[1].selected = true;
          } else if (
            sItem.chidren.length > 1 &&
            !sItem.chidren[1].isEmpty &&
            sItem.chidren[1].isClub
          ) {
            sItem.chidren[1].selected = true;
          } else {
            for (let i = 0; i < sItem.chidren.length; i++) {
              if (sItem.chidren[i].isEmpty || !sItem.chidren[i].isClub) {
              } else {
                sItem.chidren[i].selected = true;
                break;
              }
            }
          }
        }

        return sItem;
      });
      // this.setState({ specList });
      sizeList = goodsInfos.map((g, i) => {
        // g = Object.assign({}, g, { selected: false });
        g = Object.assign({}, g, {
          selected: i === 0
        });
        if (g.selected && !g.subscriptionStatus) {
          let { form } = this.state;
          form.buyWay = 0;
          this.setState({ form });
        }
        return g;
      });

      const goodSize = specList.map((item) =>
        item.chidren.find((good) => good.selected)
      )?.[0]?.detailName;
      const goodsInfoBarcode =
        goodsInfos.find((item) => item.packSize === goodSize)
          ?.goodsInfoBarcode || goodsInfos?.[0]?.goodsInfoBarcode;
      const barcode = goodsInfoBarcode ? goodsInfoBarcode : '12'; //暂时临时填充一个code,因为没有值，按钮将不会显示，后期也许产品会干掉没有code的时候不展示吧==

      let images = [];
      images = res.context.goodsInfos;
      this.setState(
        {
          foodFllType,
          goodsDetails: res.context,
          details: Object.assign({}, this.state.details, res.context.goods, {
            promotions: res.context.goods?.promotions?.toLowerCase(),
            sizeList,
            goodsInfos: res.context.goodsInfos,
            goodsSpecDetails: res.context.goodsSpecDetails,
            goodsSpecs: res.context.goodsSpecs,
            goodsAttributesValueRelList: res.context.goodsAttributesValueRelList
          }),
          images,
          specList,
          barcode
        },
        () => {
          console.info('detiasdsdsdsd', this.state.details);
          this.matchGoods();
          //Product Detail Page view 埋点start
          // this.hubGA
          //   ? this.hubGAProductDetailPageView(
          //       res.context.goodsAttributesValueRelList,
          //       this.state.details
          //     )
          //   : this.GAProductDetailPageView(this.state.details);
          //Product Detail Page view 埋点end
        }
      );
    } else {
      let sizeList = [];
      let foodFllType = `${foodType} ${petType} Food`;
      let goodsInfos = res.context.goodsInfos || [];
      sizeList = goodsInfos.map((g, i) => {
        g = Object.assign({}, g, {
          selected: i === 0
        });
        if (g.selected && !g.subscriptionStatus) {
          let { form } = this.state;
          form.buyWay = 0;
          this.setState({ form });
        }
        return g;
      });

      let images = [];
      images = res.context.goodsInfos;
      this.setState(
        {
          foodFllType,
          details: Object.assign({}, this.state.details, res.context.goods, {
            promotions: res.context.goods?.promotions?.toLowerCase(),
            sizeList,
            goodsInfos: res.context.goodsInfos,
            goodsSpecDetails: res.context.goodsSpecDetails,
            goodsSpecs: res.context.goodsSpecs,
            goodsAttributesValueRelList: res.context.goodsAttributesValueRelList
          }),
          images
        },
        () => {
          this.bundleMatchGoods();
          //Product Detail Page view 埋点start
          // this.hubGA
          //   ? this.hubGAProductDetailPageView(
          //       res.context.goodsAttributesValueRelList,
          //       this.state.details
          //     )
          //   : this.GAProductDetailPageView(this.state.details);
          //Product Detail Page view 埋点end
        }
      );
      // 没有规格的情况
      // this.setState({
      //   errMsg: <FormattedMessage id="details.errMsg" />
      // });
    }
    cb && cb(res);
  };
  async queryProductDetails({ id, cb, mainProductDetails }) {
    // let res = goodsDetailTabJSON;
    if (mainProductDetails) {
      this.productDetailsInit(mainProductDetails, cb);
      return;
    }
    if (!id) {
      cb && cb();
      return;
    }
    this.setState({ productListLoading: true });
    // getDetailsBySpuNo('MKT00006')
    getDetailsBySpuNo(id)
      .then((res) => {
        this.productDetailsInit(res, cb);
      })
      .catch((e) => {
        console.log(e);
        this.showErrMsgs(
          e.message || <FormattedMessage id="details.errMsg2" />,
          'errMsgDetail'
        );
      })
      .finally(() => {
        this.setState({
          recommendationVisibleLoading: false,
          productListLoading: false
        });
      });
  }

  handleChooseSize(sId, sdId, isSelected) {
    if (isSelected) {
      return;
    }
    let { specList, images } = this.state;
    specList
      .filter((item) => item.specId === sId)[0]
      .chidren.map((item) => {
        if (item.specDetailId === sdId) {
          item.selected = true;
        } else {
          item.selected = false;
        }
        return item;
      });
    const goodSize = specList.map((item) =>
      item.chidren.find((good) => good.specDetailId === sdId)
    )?.[0]?.detailName;
    const barcode = images.find((item) => item.packSize === goodSize)
      ?.goodsInfoBarcode;
    this.setState(
      {
        specList,
        barcode
      },
      () => {
        this.matchGoods();
      }
    );
  }
  updateInstockStatus() {
    this.setState({
      instockStatus: this.state.quantity <= this.state.stock
    });
  }
  matchGoods() {
    let {
      specList,
      details,
      currentUnitPrice,
      currentLinePrice,
      currentSubscriptionPrice,
      currentSubscriptionStatus,
      stock
    } = this.state;
    let selectedArr = [];
    let idArr = [];
    specList.map((el) => {
      if (el.chidren.filter((item) => item.selected).length) {
        selectedArr.push(el.chidren.filter((item) => item.selected)[0]);
      }
      return el;
    });
    selectedArr = selectedArr.sort((a, b) => a.specDetailId - b.specDetailId);
    idArr = selectedArr.map((el) => el.specDetailId);
    //marketprice需要取sku的（goodsinfo是sku），不然有时候spu（goods里面）会没值
    currentUnitPrice = details?.goodsInfos?.[0]?.marketPrice;
    details.sizeList?.map((item, i) => {
      let specTextArr = [];
      for (let specItem of specList) {
        for (let specDetailItem of specItem.chidren) {
          if (
            item.mockSpecIds.includes(specDetailItem.specId) &&
            item.mockSpecDetailIds.includes(specDetailItem.specDetailId)
          ) {
            specTextArr.push(specDetailItem.detailName);
          }
        }
      }
      item.specText = specTextArr.join(' ');
      if (unique(item.mockSpecDetailIds).sort().join(',') === idArr.join(',')) {
        item.selected = true;
        currentUnitPrice = item.salePrice;
        currentLinePrice = item.linePrice;
        currentSubscriptionPrice = item.subscriptionPrice;
        currentSubscriptionStatus = item.subscriptionStatus; //subscriptionStatus 是否订阅商品
        stock = item.stock;
      } else {
        item.selected = false;
      }

      return item;
    });
    this.setState(
      {
        details,
        currentUnitPrice,
        currentLinePrice,
        currentSubscriptionPrice,
        currentSubscriptionStatus,
        stock
      },
      () => {
        this.updateInstockStatus();
        // setTimeout(() => this.setGoogleProductStructuredDataMarkup());
      }
    );
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

  bundleMatchGoods() {
    let {
      details,
      currentUnitPrice,
      currentSubscriptionPrice,
      currentSubscriptionStatus,
      stock
    } = this.state;

    currentUnitPrice = details.goodsInfos[0].salePrice;
    currentSubscriptionPrice = details.goodsInfos[0].subscriptionPrice;
    currentSubscriptionStatus = details.goodsInfos[0].subscriptionStatus;
    stock = details.goodsInfos[0].stock;
    details.sizeList[0].selected = true;
    this.setState(
      {
        details,
        currentUnitPrice,
        currentSubscriptionPrice,
        currentSubscriptionStatus,
        stock
      },
      () => {
        this.updateInstockStatus();
        // setTimeout(() => this.setGoogleProductStructuredDataMarkup());
      }
    );
  }

  async componentDidMount() {
    this.getBreedList();
    getDictionary({ type: 'country' }).then((res) => {
      this.setState({
        countryList: res
      });
    });
    await getFrequencyDict().then((res) => {
      this.setState({
        frequencyList: res
      });
    });
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
      if (!this.state.isNotInactive || goodsInfo?.length > 1) {
        // 非激活状态就不展示
        // 如果一进来就需要被动更换商品,删除以前所有商品  2个以上不用推荐
        this.setState({ editRecommendationVisible: false });
      }
      // 邮件展示需要绑定宠物
      needBindPet && this.setState({ triggerShowAddNewPet: true });
      this.state.editRecommendationVisible &&
        this.state.isNotInactive &&
        this.showChangeProduct(goodsInfo, true);
    });
  };
  get frequencyListOptions() {
    return this.state.frequencyList.map((ele) => {
      ele && delete ele.value;
      return {
        value: ele.id,
        ...ele
      };
    });
  }
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

  hanldeAmountChange(type) {
    this.setState({ checkOutErrMsg: '' });
    if (!type) return;
    const { quantity } = this.state;
    let res;
    if (type === 'minus') {
      if (quantity <= 1) {
        res = 1;
      } else {
        res = quantity - 1;
      }
    } else {
      res = (quantity || 0) + 1;
      if (quantity >= process.env.REACT_APP_LIMITED_NUM) {
        res = process.env.REACT_APP_LIMITED_NUM;
      }
    }
    this.setState(
      {
        quantity: res
      },
      () => {
        this.updateInstockStatus();
      }
    );
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
  handleSelectedItemChange = (data) => {
    const { form } = this.state;
    form.frequencyVal = data.value;
    form.frequencyName = data.name;
    form.frequencyId = data.id;
    this.setState({ form }, () => {
      // this.props.updateSelectedData(this.state.form);
    });
  };
  closeAddNewPet = () => {
    this.setState({ addNewPetVisible: false });
  };
  showAddNewPet = () => {
    this.getPetList();
  };
  recommendationModal = () => {
    const {
      details,
      specList,
      quantity,
      quantityMinLimit,
      stock,
      form,
      currentSubscriptionPrice,
      errorMsgSureChange
    } = this.state;
    let selected = false;
    if (
      specList?.length == 0 &&
      details?.subscriptionStatus &&
      details?.promotions == 'club'
    ) {
      // 兼容bundle商品
      selected = true;
    }
    specList.forEach((el) => {
      if (!selected) {
        selected = el?.chidren.find((item) => item.selected)?.goodsId;
      }
    });
    console.info(selected, 'dskjdhsjdhsjhk');
    return (
      <React.Fragment>
        {this.showErrorDom(errorMsgSureChange)}
        <div className="d-flex for-pc-bettwen">
          <div className="d-flex for-mobile-colum for-mobile-100">
            <div className="d-flex rc-margin-right--xs">
              <img
                src={details.goodsImg}
                style={{ height: '4rem' }}
                alt={details.goodsName}
              />
              <div className="rc-margin-left--xs" style={{ maxWidth: '200px' }}>
                <div>{details.goodsName}</div>
                {/* <div>{details.goodsSubtitle}</div> */}
              </div>
            </div>
            <div className="line-item-quantity text-lg-center rc-margin-right--xs rc-margin-left--xs">
              <div className="text-left ml-1 font_size12 pad_b_5">
                <FormattedMessage id="amount" />:
              </div>
              <div className="d-flex rc-align-children--space-between">
                <div className="Quantity">
                  <div className="quantity d-flex justify-content-between align-items-center">
                    <input
                      type="hidden"
                      id="invalid-quantity"
                      value="Пожалуйста, введите правильный номер."
                    />
                    <div className="rc-quantity text-right d-flex justify-content-end">
                      <span
                        className="rc-icon rc-minus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-minus"
                        onClick={() => this.hanldeAmountChange('minus')}
                      />
                      <input
                        className="rc-quantity__input"
                        id="quantity"
                        name="quantity"
                        value={quantity}
                        min={quantityMinLimit}
                        max={stock}
                        onChange={this.handleAmountInput}
                        maxLength="5"
                      />
                      <span
                        className="rc-icon rc-plus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-plus"
                        onClick={() => this.hanldeAmountChange('plus')}
                      />
                    </div>
                  </div>
                </div>

                {/* <div className="rc-quantity d-flex">
                  <span
                    className=" rc-icon rc-minus--xs rc-iconography rc-quantity__btn js-qty-minus"
                    style={{ transform: 'scale(0.8)' }}
                    // onClick={() => this.subQuantity(pitem)}
                  ></span>
                  <input
                    className="rc-quantity__input"
                    value="1"
                    min="1"
                    max="10"
                    disabled
                    // onChange={(e) =>
                    //   this.handleAmountChange(e.target.value, pitem)
                    // }
                  />
                  <span
                    className="rc-icon rc-plus--xs rc-iconography rc-quantity__btn js-qty-plus"
                    style={{ transform: 'scale(0.8)' }}
                    // onClick={() => this.addQuantity(pitem)}
                  ></span>
                </div> */}
                <strong className="rc-md-down">
                  ={formatMoney(currentSubscriptionPrice * quantity)}
                </strong>
              </div>
            </div>
            <div
              className="cart-and-ipay rc-margin-right--xs rc-margin-left--xs"
              style={{ float: 'left' }}
            >
              <div className="specAndQuantity rc-margin-bottom--xs ">
                <div className="spec">
                  {specList.map((sItem, i) => (
                    <div id="choose-select" key={i} style={{ width: '300px' }}>
                      <div
                        className="rc-margin-bottom--xs"
                        style={{ textAlign: 'left' }}
                      >
                        {sItem.specName}:
                      </div>
                      <div data-attr="size">
                        <div
                          className="rc-swatch __select-size"
                          id="id-single-select-size"
                        >
                          {sItem.chidren.map((sdItem, i) => (
                            <div
                              key={i}
                              className={`rc-swatch__item ${
                                sdItem.selected ? 'selected' : ''
                              } ${
                                sdItem.isEmpty || !sdItem.isClub
                                  ? 'outOfStock'
                                  : ''
                              }`}
                              onClick={() => {
                                if (sdItem.isEmpty || !sdItem.isClub) {
                                  return false;
                                } else {
                                  this.handleChooseSize(
                                    sItem.specId,
                                    sdItem.specDetailId,
                                    sdItem.selected
                                  );
                                }
                              }}
                            >
                              <span
                                style={{
                                  backgroundColor:
                                    sdItem.isEmpty || !sdItem.isClub
                                      ? '#ccc'
                                      : '#fff',
                                  cursor: sdItem.isEmpty
                                    ? 'not-allowed'
                                    : 'pointer'
                                }}
                              >
                                {/* {parseFloat(sdItem.detailName)}{' '} */}
                                {sdItem.detailName}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="frequency rc-margin-right--xs rc-margin-left--xs">
              <div style={{ marginBottom: '4px' }}>
                <FormattedMessage id="subscription.frequency" />:
              </div>
              <div
                className={!isMobile && 'subscriptionDetail-choose-frequency'}
              >
                <Selection
                  customContainerStyle={{
                    display: 'inline-block',
                    marginLeft: isMobile ? '50px' : '0px',
                    height: isMobile ? '70px' : 'auto'
                  }}
                  selectedItemChange={this.handleSelectedItemChange}
                  optionList={this.frequencyListOptions.filter((el) => {
                    if (
                      this.state.details.promotions &&
                      this.state.details.promotions.includes('club')
                    ) {
                      return el.goodsInfoFlag === 2;
                    } else {
                      return el.goodsInfoFlag === 1;
                    }
                  })}
                  selectedItemData={{
                    value: form.frequencyId
                  }}
                  key={form.frequencyId}
                />
              </div>
            </p>
          </div>
          <strong className="rc-md-up" style={{ marginTop: '20px' }}>
            ={formatMoney(currentSubscriptionPrice * quantity)}
          </strong>
        </div>
        <div className="d-flex  for-mobile-colum for-pc-bettwen rc-button-link-group">
          <span
            className={`text-plain rc-styled-link ${
              this.state.productListLoading ? 'ui-btn-loading' : ''
            }`}
            onClick={() => {
              this.showChangeProduct([...this.state.subDetail.goodsInfo]);
            }}
          >
            <FormattedMessage id="subscription.seeOtherRecommendation" />
          </span>
          <div className="for-mobile-colum d-flex">
            <button
              onClick={() => this.showProdutctDetail(0)}
              className="rc-btn rc-btn--two rc-btn--sm"
            >
              <FormattedMessage id="subscription.productDetails" />
            </button>
            {this.state.isNotInactive && (
              <button
                onClick={() => this.changePets(selected)}
                className={`rc-btn rc-btn--one rc-btn--sm ${
                  selected ? '' : 'rc-btn-solid-disabled'
                }
                ${this.state.changeNowLoading ? 'ui-btn-loading' : ''}`}
              >
                <FormattedMessage id="subscription.changeNow" />
              </button>
            )}
          </div>
        </div>
      </React.Fragment>
    );
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
      // let cityRes = await queryCityNameById({
      //   id: [subDetail.consignee.cityId, subDetail.invoice.cityId]
      // });
      // cityRes = cityRes.context.systemCityVO || [];
      // subDetail.consignee.cityName = this.matchCityName(
      //   cityRes,
      //   subDetail.consignee.cityId
      // );
      // subDetail.invoice.cityName = this.matchCityName(
      //   cityRes,
      //   subDetail.invoice.cityId
      // );
      this.setState(
        {
          petsType,
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
      // throw new Error(err);
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
  handleSkipNext = (e, el) => {
    e.preventDefault();
    this.setState({
      modalType: 'skipNext',
      modalShow: true,
      currentModalObj: this.state.modalList.filter(
        (el) => el.type === 'skipNext'
      )[0],
      skipNextGoods: el.tradeItems?.map((el) => {
        return {
          skuId: el.skuId
        };
      })
    });
  };
  getModalBox = () => {
    let { remainingsList } = this.state;
    return (
      <div>
        <p className="red">
          By cancelling your subscription, you will have to pay the remaining
          balance of the dispensers market price of 120 euros.
        </p>
        <p>
          If you unsubscribe now, the balance you will pay is &lt;X euros
          calculated automatically depending on the refill &gt;.
        </p>
        <div>Remaining Tab</div>
        <ul className="subdes-modal-ul-wrap">
          <li
            className="d-flex"
            style={{
              background: '#F6F6F6',
              lineHeight: '2rem',
              borderBottom: '1px solid #E4E4E4',
              padding: '0 1rem'
            }}
          >
            <span className="width50">Unsubcribe before</span>
            <span className="width50" style={{ paddingLeft: '0.5rem' }}>
              Remaining price
            </span>
          </li>
          {remainingsList?.map((item) => (
            <li
              key={item.id}
              className="d-flex"
              style={{
                lineHeight: '2rem',
                borderBottom: '1px solid #E4E4E4',
                padding: '0 1rem'
              }}
            >
              <span className="width50">
                {item.deliveryTimes}
                <FormattedMessage id="smartFeederSubscription.times" />
              </span>
              <span className="width50" style={{ paddingLeft: '0.5rem' }}>
                {formatMoney(item.remainingPrice)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  getGiftList = () => {
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
      isGift
    } = this.state;
    return (
      <div
        className="rc-match-heights rc-content-h-middle rc-reverse-layout"
        // style={{display:`${isGift?'none':'block'}`}}
      >
        <div>
          <div
            className="rc-border-bottom rc-border-colour--interface"
            style={{ width: '100%', display: 'inline-block' }}
          >
            <nav className="rc-fade--x">
              <ul
                className="rc-scroll--x rc-list rc-list--inline rc-list--align rc-list--blank"
                role="tablist"
              >
                {this.state.tabName?.map((ele, index) => (
                  <li key={index}>
                    <button
                      className="rc-tab rc-btn rounded-0 border-top-0 border-right-0 border-left-0"
                      data-toggle={`tab__panel-${index}`}
                      aria-selected={
                        this.state.activeTabIdx === index ? 'true' : 'false'
                      }
                      role="tab"
                      onClick={(e) => this.changeTab(e, index)}
                    >
                      {ele}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="rc-tabs tabs-detail">
            {this.state.activeTabIdx === 0 &&
              subDetail.noStartTradeList &&
              subDetail.noStartTradeList
                .filter(
                  (el) =>
                    noStartYear &&
                    el.tradeItems[0].nextDeliveryTime.split('-')[0] ===
                      noStartYear.value
                )
                ?.map((el) => (
                  <>
                    <div className="card-container" style={{ borderBottom: 0 }}>
                      <div className="card rc-margin-y--none ml-0">
                        <div
                          className="3333 card-header row rc-margin-x--none align-items-center pl-0 pr-0"
                          style={{
                            background: '#f9f9f9',
                            height: '60px',
                            padding: 0
                          }}
                        >
                          <div className="col-3">
                            <FormattedMessage id="subscriptionDetail.deliveryDate" />
                          </div>
                          <div className="col-6">
                            <FormattedMessage id="subscriptionDetail.product" />
                          </div>
                        </div>
                      </div>
                      {el.tradeItems &&
                        el.tradeItems?.map((tradeItem, index) => (
                          <div
                            className="row rc-margin-x--none row align-items-center 1"
                            style={{
                              padding: '1rem 0',
                              borderBottom: '1px solid #d7d7d7'
                            }}
                            key={index}
                          >
                            <div className={`col-3`}>
                              {/* <div className={`${isMobile ? 'none' : 'col-3'}`}> */}
                              <p
                                style={{
                                  marginBottom: '0',
                                  fontWeight: '400'
                                }}
                              >
                                Shipment on
                                <br />
                                <span
                                  style={{
                                    color: 'rgb(226, 0, 26)',
                                    fontWeight: '400'
                                  }}
                                >
                                  {getFormatDate(
                                    el.tradeItems[0].nextDeliveryTime.split(
                                      ' '
                                    )[0]
                                  )}
                                </span>
                              </p>
                            </div>
                            <div
                              className={`${
                                isMobile ? 'col-6' : 'col-5'
                              } col-md-5`}
                            >
                              <div
                                className="rc-layout-container rc-five-column"
                                style={{
                                  paddingRight: isMobile ? '0' : '60px',
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
                                  <LazyLoad>
                                    <img
                                      style={{
                                        width: '70px',
                                        margin: '0 .625rem'
                                      }}
                                      src={tradeItem.pic}
                                      alt={tradeItem.skuName}
                                    />
                                  </LazyLoad>
                                  <div
                                    style={{
                                      width: '200px',
                                      paddingTop: '30px'
                                    }}
                                  >
                                    <h5
                                      className="text-nowrap"
                                      style={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        overflowWrap: 'normal',
                                        fontSize: '.875rem',
                                        width: isMobile ? '95px' : 'auto'
                                      }}
                                    >
                                      {tradeItem.skuName}
                                    </h5>
                                    <p
                                      style={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        marginBottom: '8px',
                                        fontSize: '.875rem'
                                      }}
                                    >
                                      {tradeItem.specDetails}{' '}
                                      {isMobile ? `x ${tradeItem.num}` : null}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className={`${
                                isMobile ? 'col-3' : 'col-4'
                              } col-md-4`}
                            >
                              <p
                                style={{
                                  textAlign: 'right',
                                  paddingRight: '.625rem',
                                  marginBottom: '0'
                                }}
                              >
                                <div
                                  className={`${isMobile ? 'col-3' : ''}`}
                                  style={{
                                    padding: isMobile ? '0 0 0 .625rem' : '0'
                                  }}
                                >
                                  {/* <div
                                    className="rc-layout-container rc-five-column"
                                    style={{
                                      paddingRight: isMobile ? '0' : '60px',
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
                                      <LazyLoad>
                                        <img
                                          style={{
                                            width: '70px',
                                            margin: '0 .625rem'
                                          }}
                                          src={
                                            tradeItem
                                              .subscriptionPlanGiftList[0]
                                              ?.goodsInfoImg || smartFeeder
                                          }
                                          alt={
                                            tradeItem
                                              .subscriptionPlanGiftList[0]
                                              ?.goodsInfoName
                                          }
                                        />
                                      </LazyLoad>
                                      <div
                                        style={{
                                          width: '200px',
                                          paddingTop: '30px'
                                        }}
                                      >
                                        <h5
                                          className="text-nowrap"
                                          style={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            overflowWrap: 'normal',
                                            fontSize: '.875rem',
                                            width: isMobile ? '95px' : 'auto'
                                          }}
                                        >
                                          {
                                            tradeItem
                                              .subscriptionPlanGiftList[0]
                                              ?.goodsInfoName
                                          }
                                        </h5>
                                        <p
                                          style={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            marginBottom: '8px',
                                            fontSize: '.875rem'
                                          }}
                                        >
                                          x 1
                                        </p>
                                      </div>
                                    </div>
                                  </div> */}
                                  {isNotInactive ? (
                                    <>
                                      <LazyLoad>
                                        <img
                                          style={{
                                            display: 'inline-block',
                                            width: '1.25rem',
                                            marginRight: '5px'
                                          }}
                                          alt="skip icon"
                                          src={skipIcon}
                                        />
                                      </LazyLoad>
                                      <a
                                        className={`rc-styled-link ${
                                          isGift || !isActive
                                            ? 'disabled color-light-gray'
                                            : ''
                                        }`}
                                        href="#/"
                                        onClick={(e) =>
                                          this.handleSkipNext(e, el)
                                        }
                                      >
                                        <FormattedMessage id="skip" />
                                      </a>
                                    </>
                                  ) : null}
                                </div>
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </>
                ))}
          </div>
        </div>
      </div>
    );
  };

  handleGiftSubCancel = async (e, subDetail) => {
    e.preventDefault();
    let {
      packageId,
      subscriptionPlanId: planId,
      goodsInfoId
    } = subDetail.noStartTradeList[0]?.tradeItems[0];
    let params = {
      planId,
      storeId: process.env.REACT_APP_STOREID
    };
    try {
      let res = await getRemainings(params);
      myAccountActionPushEvent('Cancel Subscription');
      let remainingsList = res.context;
      this.setState({
        remainingsList,
        modalType: 'cancelAll',
        remainingsVisible: true
      });
    } catch (err) {
      this.showErrMsg(err.message);
    } finally {
      this.setState({ loading: false });
    }
    // this.setState({
    //   modalType: 'cancelAll',
    //   modalShow: true,
    //   currentModalObj: this.state.modalList.filter(
    //     (el) => el.type === 'cancelAll'
    //   )[0]
    // });
  };
  handleCancel(e) {
    e.preventDefault();
    this.setState({
      modalType: 'cancelAll',
      modalShow: true,
      currentModalObj: this.state.modalList.filter(
        (el) => el.type === 'cancelAll'
      )[0]
    });
  }
  showChangeRecommendation = () => {
    this.closeProdutctDetail();
    this.setState({ changeRecommendationVisible: true });
  };
  closeAndShowChangeProduct = () => {
    this.closeProdutctDetail();
    this.showChangeProduct();
  };
  closeRecommendation = () => {
    this.setState({ changeRecommendationVisible: false });
  };
  showErrMsgs(msg, errorMsgKey = 'errorMsg') {
    // 特殊处理需要关闭changeRecommendationVisible展示errpage
    // if(this.state.changeRecommendationVisible){
    //   this.setState({
    //     changeRecommendationVisible: false
    //   })
    // }
    this.setState({
      [errorMsgKey]: msg
    });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({
        [errorMsgKey]: ''
      });
    }, 3000);
  }
  closeChangePets = () => {
    this.initMainProduct(); // 需要重置顶部推荐框
    this.closeRecommendation();
    // this.closeEditRecommendation();
  };
  initMainProduct = () => {
    let mainProductDetails = this.state.mainProductDetails;
    this.queryProductDetails({ mainProductDetails });
  };
  changeSubscriptionGoods = () => {
    try {
      const { quantity, form, details } = this.state;
      const { sizeList } = details;
      let currentSelectedSize = sizeList[0];
      if (details?.goodsSpecDetails) {
        currentSelectedSize = find(sizeList, (s) => s.selected);
      }
      let buyWay = parseInt(form.buyWay);
      let goodsInfoFlag =
        buyWay && details.promotions?.includes('club') ? 2 : buyWay;
      let subscribeId = this.state.subDetail.subscribeId;

      let addGoodsItems = {
        skuId: currentSelectedSize.goodsInfoId,
        subscribeNum: quantity,
        goodsInfoFlag: 2,
        periodTypeId: form.frequencyId
        // productFinderFlag: currentSelectedSize.productFinderFlag
      };
      // let currentGoodsItem = this.state.currentGoodsItems[0] || {};
      let deleteGoodsItems = this.state.currentGoodsItems.map((el) => {
        return {
          // subscribeNum: currentGoodsItem.subscribeNum,
          // periodTypeId: currentGoodsItem.periodTypeId,
          // goodsInfoFlag: currentGoodsItem.goodsInfoFlag,
          subscribeId,
          skuId: el.goodsInfoVO?.goodsInfoId
        };
      });
      let isTheSamePro = deleteGoodsItems.find(
        (el) => el?.skuId == currentSelectedSize?.goodsInfoId
      );
      if (isTheSamePro?.skuId) {
        //替换的skuid一致，不能正常提交
        this.showErrMsgs(
          this.props.intl.messages['subscription.thesameProd'],
          'errorMsgSureChange'
        );
        this.setState({ changeNowLoading: false });
        return;
      }
      if (buyWay) {
        addGoodsItems.periodTypeId = form.frequencyId;
      }
      let params = {
        subscribeId,
        addGoodsItems: [addGoodsItems],
        deleteGoodsItems
      };
      changeSubscriptionGoods(params)
        .then((res) => {
          this.setState({ changeNowLoading: false });
          this.getDetail();
          this.closeRecommendation();
          this.closeEditRecommendation();
        })
        .catch((err) => {
          this.setState({ changeNowLoading: false });
          this.showErrMsgs(err && err.message, 'errorMsgSureChange');
        });
    } catch (err) {
      this.showErrMsgs(err && err.message, 'errorMsgSureChange');
      this.setState({ changeNowLoading: false });
    }
  };
  changePets = (selected) => {
    if (!selected) {
      return;
    }
    this.setState({ changeNowLoading: true });
    this.changeSubscriptionGoods();
  };
  closeEditRecommendation = () => {
    this.setState({ editRecommendationVisible: false });
  };
  showProdutctDetail = (id) => {
    this.queryProductDetails({
      id,
      cb: () => {
        this.closeChangeProduct();
        this.closeRecommendation();
        this.setState({ produtctDetailVisible: true });
      }
    });
  };
  closeProdutctDetail = () => {
    this.setState({ produtctDetailVisible: false });
  };
  closeChangeProduct = () => {
    this.setState({ changeProductVisible: false });
  };
  queryProductList = async (els, cb) => {
    try {
      this.setState({ productListLoading: true });
      if (els) {
        this.setState({ currentGoodsItems: [...els] });
      }
      if (this.state.productDetail?.mainProduct) {
        cb && cb();
        return;
      }
      let { petsId } = this.state.subDetail;
      let res = await findPetProductForClub({ petsId, apiTree: 'club_V2' });
      let mainProduct = res.context.mainProduct;
      let otherProducts = res.context.otherProducts;
      if (mainProduct) {
        let theSameProduct = this.state.currentGoodsItems.find(
          (el) => mainProduct?.spuCode == el?.spuNo
        );
        if (theSameProduct?.spuNo) {
          // 如果主商品有同样的spu，需要直接不展示所有推荐商品
          this.setState({ productDetail: {} }, () => {
            cb && cb();
          });
          return;
        }
        let currentSpus = this.state.currentGoodsItems?.map((el) => el.spuNo);
        let newOtherProducts =
          otherProducts?.filter((item) => !currentSpus.includes(item.spuNo)) ||
          [];
        otherProducts = [...newOtherProducts];
        let productArr = [mainProduct, ...otherProducts];
        let spuNoList = productArr?.map((el) => el.spuCode);
        let rationsParams = { petsId, spuNoList };
        let rationRes = await getRation(rationsParams);
        let rations = rationRes?.context?.rationResponseItems;
        rations?.forEach((ration) => {
          if (mainProduct.spuCode == ration.mainItem) {
            mainProduct.petsRation = `${ration.weight}${ration.weightUnit}/${this.props.intl.messages['day-unit']}`;
          }
          otherProducts?.map((el) => {
            if (el.spuCode == ration.mainItem) {
              el.petsRation = `${ration.weight}${ration.weightUnit}/${this.props.intl.messages['day-unit']}`;
            }
          });
        });
      }
      this.setState(
        {
          productDetail: {
            otherProducts,
            mainProduct
          }
        },
        () => {
          cb && cb();
        }
      );
    } catch (err) {
      this.showErrMsgs(err && err.message, 'errMsgPage');
    } finally {
      this.setState({ productListLoading: false });
    }
  };
  doSthShow = () => {
    this.closeProdutctDetail();
    this.closeRecommendation();
    this.setState({ changeProductVisible: true }); //清空details
  };
  showChangeProduct = async (els, isNoModal) => {
    if (!els) {
      this.doSthShow();
      return;
    }
    if (!isNoModal) {
      this.queryProductList(els, () => {
        this.doSthShow();
      });
    } else {
      this.queryProductList(els, () => {
        // 查详情
        let id = this.state.productDetail.mainProduct?.spuCode;
        if (id) {
          this.queryProductDetails({
            id,
            cb: (res) => {
              // 保存mainproduct推荐的商品详情
              this.setState({ mainProductDetails: res });
            }
          });
        } else {
          // 没有推荐商品的时候直接隐藏被动更换商品
          this.setState({ editRecommendationVisible: false });
        }
      });
    }
  };
  showErrorDom = (errorMsg) => {
    return errorMsg ? (
      <div className="rc-padding-bottom--xs cart-error-messaging cart-error">
        <aside
          className="rc-alert rc-alert--error rc-alert--with-close text-break"
          role="alert"
        >
          <span className="pl-0">{errorMsg}</span>
        </aside>
      </div>
    ) : null;
  };
  getDetailModalInner = () => {
    const createMarkup = (text) => ({ __html: text });
    const { details, foodFllType } = this.state;
    console.info('details', details);
    // console.info('detailsdetailsdetails', props.details);
    return (
      <div className="margin12 product_detail rc-padding-x--md">
        <div>
          <img
            className="m-auto"
            style={{ maxWidth: '100px' }}
            src={getClubLogo()}
            alt="club icon"
          />
          <div className="rc-layout-container rc-five-column">
            <div className="rc-column  rc-header__center d-flex">
              {/* <LazyLoad> */}
              <img
                src={details.goodsImg}
                style={{ maxHeight: '12rem' }}
                alt={details.goodsName}
              />
              {/* </LazyLoad> */}
            </div>
            <div className="rc-column rc-double-width">
              <div className="title rc-card__title rc-gamma ui-text-overflow-line2 text-break mb-1 TitleFitScreen rc-margin-top--md">
                {details.goodsName}
              </div>
              {/* <div className="sub_title">{details.goodsSubtitle}</div> */}
              <div>
                <div className="block">
                  <p
                    className="content rc-scroll--x"
                    style={{ marginBottom: '4rem' }}
                  >
                    {details.goodsSubtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.goodsDetails?.goods?.goodsId && (
          <GoodsDetailTabs detailRes={this.state.goodsDetails} />
        )}
      </div>
    );
  };
  productDailyRation = (rations) =>
    rations && (
      <div
        style={{
          textAlign: 'center',
          background: '#f9f9f9',
          color: '#000',
          maxWidth: '400px',
          margin: '0 auto'
        }}
        className="text-center rc-padding--xs"
      >
        <div style={{ fontSize: '12px' }} className="rc-padding-bottom--xs">
          <FormattedMessage id="subscription.dailyRation" />
        </div>
        <div style={{ fontSize: '1rem' }}>{rations}</div>
      </div>
    );
  ProductRecommendations = () => {
    const { productDetail, errMsgDetail } = this.state;
    return (
      <>
        {this.showErrorDom(errMsgDetail)}
        {!!productDetail.mainProduct && (
          <>
            <div className="p-f-result-box">
              <img
                className="m-auto"
                style={{ maxWidth: '200px' }}
                src={getClubLogo()}
                alt="club icon"
              />
              <h4 className="red text-center mb-3 mt-3">
                <FormattedMessage id="subscription.productRecommendation" />
              </h4>
              <p className=" text-center">
                <FormattedMessage id="subscription.productRecommendationTip" />
              </p>
            </div>
            <div className="p-f-result-box">
              <div className="border rounded row pt-3 pb-3">
                <div className="col-12 col-md-6">
                  {/* LazyLoad在弹窗有点问题，显示不出来图片 */}
                  {/* <LazyLoad style={{ height: '100%', width: '100%' }}> */}
                  <img
                    src={
                      productDetail.mainProduct?.goodsImg ||
                      productDetail.mainProduct?.goodsInfos.sort(
                        (a, b) => a.marketPrice - b.marketPrice
                      )[0].goodsInfoImg
                    }
                    className="p-img"
                    alt={productDetail.mainProduct?.goodsName}
                  />
                  {/* </LazyLoad> */}
                </div>
                <div className="col-12 col-md-6 d-flex flex-column justify-content-center">
                  <header className="rc-text--center">
                    <h3
                      className="rc-card__title rc-gamma ui-text-overflow-line2 text-break mb-1 TitleFitScreen"
                      title={productDetail.mainProduct?.goodsName}
                    >
                      {productDetail.mainProduct?.goodsName}
                    </h3>
                  </header>
                  <div
                    className="ui-text-overflow-line1 text-break sub-hover text-center SubTitleScreen"
                    title={productDetail.mainProduct?.subTitle}
                  >
                    {productDetail.mainProduct?.subTitle}
                  </div>
                  {this.productDailyRation(
                    productDetail.mainProduct?.petsRation
                  )}
                  <div className="text-center mt-2 card--product-contaner-price">
                    {productDetail.mainProduct?.toPrice ? (
                      <FormattedMessage
                        id="pirceRange"
                        values={{
                          fromPrice: (
                            <span className="contaner-price__value">
                              {formatMoney(
                                productDetail.mainProduct?.fromPrice
                              )}
                            </span>
                          ),
                          toPrice: (
                            <span className="contaner-price__value">
                              {formatMoney(productDetail.mainProduct?.toPrice)}
                            </span>
                          )
                        }}
                      />
                    ) : (
                      <span className="contaner-price__value">
                        {formatMoney(productDetail.mainProduct?.fromPrice)}
                      </span>
                    )}
                  </div>
                  <div
                    className="d-flex justify-content-center mt-3 testtest"
                    // onClick={() => {
                    //   this.GAProductClick(productDetail.mainProduct, 0);
                    // }}
                  >
                    <span
                      onClick={() => {
                        this.showProdutctDetail(
                          productDetail.mainProduct?.spuCode
                        );
                      }}
                      className={`rc-btn rc-btn--one rc-btn--sm ${
                        this.state.productListLoading ? 'ui-btn-loading' : ''
                      } `}
                    >
                      <FormattedMessage id="seeTheProduct" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {!!productDetail.otherProducts && (
          <>
            <p className="text-center rc-margin-top--xs">
              <FormattedMessage id="productFinder.otherProductsToConsider" />
            </p>
            <div className="rc-scroll--x pb-4 rc-padding-x--xl">
              <div className="d-flex">
                {productDetail?.otherProducts?.map((ele, i) => (
                  <div
                    className={`border rounded pt-3 pb-3 pl-2 pr-2 pl-md-0 pr-md-0 ${
                      i ? 'ml-2' : ''
                    }`}
                    key={ele.id}
                    style={{ flex: 1 }}
                  >
                    <div className="mb-3 p-f-product-img">
                      {/* <LazyLoad style={{ height: '100%', width: '100%' }}> */}
                      <img
                        src={
                          ele.goodsImg ||
                          ele.goodsInfos.sort(
                            (a, b) => a.marketPrice - b.marketPrice
                          )[0].goodsInfoImg
                        }
                        style={{ maxHeight: '12rem', margin: '0 auto' }}
                        className="p-img"
                        alt={ele.goodsName}
                      />
                      {/* </LazyLoad> */}
                    </div>
                    <div className="d-flex flex-column justify-content-center">
                      <header className="rc-text--center">
                        <h3
                          className="rc-card__title rc-gamma ui-text-overflow-line2 text-break mb-1 TitleFitScreen p-f-product-title"
                          title={ele.goodsName}
                        >
                          {ele.goodsName}
                        </h3>
                      </header>
                      <div
                        className="ui-text-overflow-line1 text-break sub-hover text-center SubTitleScreen"
                        title={ele.subTitle}
                      >
                        {ele.subTitle}
                      </div>
                      {this.productDailyRation(ele?.petsRation)}
                      <div className="text-center mt-2 card--product-contaner-price">
                        {ele?.toPrice ? (
                          <FormattedMessage
                            id="pirceRange"
                            values={{
                              fromPrice: (
                                <span className="contaner-price__value">
                                  {formatMoney(ele?.fromPrice)}
                                </span>
                              ),
                              toPrice: (
                                <span className="contaner-price__value">
                                  {formatMoney(ele?.toPrice)}
                                </span>
                              )
                            }}
                          />
                        ) : (
                          <span className="contaner-price__value">
                            {formatMoney(ele?.fromPrice)}
                          </span>
                        )}
                      </div>
                      <div
                        className="d-flex justify-content-center mt-3"
                        // onClick={()=>{
                        //   this.GAProductClick(ele, i+1)
                        // }}
                      >
                        {/* <Link
                        to={`/details/${ele.goodsInfos[0].goodsInfoId}`}
                        className="rc-btn rc-btn--one rc-btn--sm"
                      > */}
                        <span
                          onClick={() => {
                            this.showProdutctDetail(ele.spuCode);
                          }}
                          className={`rc-btn rc-btn--one rc-btn--sm ${
                            this.state.productListLoading
                              ? 'ui-btn-loading'
                              : ''
                          }`}
                        >
                          <FormattedMessage id="seeTheProduct" />
                        </span>
                        {/* </Link> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        <p className="details-infos d-flex">
          <span className="rc-icon rc-incompatible--xs rc-iconography"></span>
          <FormattedMessage id="recommendProductTip" />
        </p>
      </>
    );
  };
  changeProductModal = () => {
    const { productDetail, currentGoodsItems, subDetail } = this.state;
    const currentGoodsItem = currentGoodsItems[0] || {};
    return (
      <div
        className={`change-product-modal ${
          productDetail?.mainProduct ? 'has-data' : ''
        }`}
      >
        <Modal
          headerVisible={true}
          footerVisible={false}
          visible={this.state.changeProductVisible}
          modalTitle={''}
          close={() => {
            this.initMainProduct(); // 需要重置顶部推荐框
            this.closeChangeProduct();
          }}
        >
          {productDetail?.mainProduct ? (
            this.ProductRecommendations()
          ) : (
            <div className="text-center  rc-padding-left--lg--desktop rc-padding-right--lg--desktop">
              <img
                className="m-auto"
                style={{ maxWidth: '100px' }}
                src={getClubLogo()}
                alt="club icon"
              />
              <p className="text-center red" style={{ fontSize: '1.5rem' }}>
                <FormattedMessage id="switchProductTip1" />{' '}
                {subDetail.petsInfo?.petsName}{' '}
                {process.env.REACT_APP_COUNTRY != 'TR' && (
                  <FormattedMessage id="switchProductTip2" />
                )}
                {process.env.REACT_APP_COUNTRY != 'TR' && ' '}
                {process.env.REACT_APP_COUNTRY != 'TR' &&
                  (subDetail.petsInfo?.petsSex ? (
                    <FormattedMessage id="switchProductTip.his" />
                  ) : (
                    <FormattedMessage id="switchProductTip.her" />
                  ))}
                {process.env.REACT_APP_COUNTRY != 'TR' && ' '}
                <FormattedMessage id="switchProductTip3" />!
              </p>
              <div className="d-flex align-items-center justify-content-center rc-padding-left--lg--desktop rc-padding-right--lg--desktop">
                <img src={currentGoodsItem.goodsPic} style={{ width: '40%' }} />
                <div>
                  <div className="red" style={{ fontSize: '1.5rem' }}>
                    {currentGoodsItem.goodsName}
                  </div>
                  {/* <div>{currentGoodsItem.goodsSubtitle}</div> */}
                  <div>{currentGoodsItem.specText}</div>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    );
  };

  pauseOrStart = async (subDetail) => {
    let subscribeStatus = '0';
    let subscribeStatusText = 'Restart Subscription';
    let action = startSubscription;
    let isActive = this.state.isActive;
    let param = {
      subscribeId: subDetail.subscribeId
    };
    //subscribeStatus 暂停传1 重启0
    if (subDetail.subscribeStatus === '0') {
      subscribeStatus = '1';
      subscribeStatusText = 'Pause Subscription';
      action = pauseSubscription;
    }
    param.subscribeStatus = subscribeStatus;
    this.setState({ loadingPage: true });
    try {
      let res = await action(param);
      // this.setState({ isActive: !isActive, subscribeStatus });
      subscribeStatusText && myAccountActionPushEvent(subscribeStatusText);
      await this.getDetail();
    } catch (err) {
      this.showErrMsg(err.message);
    } finally {
      this.setState({ loadingPage: false });
    }
  };
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
  showEditRecommendation = () => {
    this.setState({ editRecommendationVisible: true });
  };
  statusText = () => {
    let { subDetail, isNotInactive } = this.state;
    return;
  };
  handleAmountInput = (e) => {
    const { quantityMinLimit } = this.state;
    const val = e.target.value;
    if (val === '') {
      this.setState({ quantity: val });
    } else {
      let tmp = parseInt(val);
      if (isNaN(tmp)) {
        tmp = 1;
      }
      if (tmp < quantityMinLimit) {
        tmp = quantityMinLimit;
      }
      if (tmp > process.env.REACT_APP_LIMITED_NUM) {
        tmp = process.env.REACT_APP_LIMITED_NUM;
      }
      this.setState({ quantity: tmp }, () => this.updateInstockStatus());
    }
  };

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
    // 获取本地存储的需要显示的地址字段
    const localAddressForm = this.props.configStore?.localAddressForm;
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
    let minDeliveryTime = null;
    let maxDeliveryTime = null;
    if (subDetail?.noStartTradeList) {
      let snsl = subDetail.noStartTradeList[0];
      minDeliveryTime = snsl.minDeliveryTime;
      maxDeliveryTime = snsl.maxDeliveryTime;
    }
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
                      save={(el) => {
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
                    customerAccount={subDetail?.customerAccount}
                    tradeItems={subDetail?.noStartTradeList}
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
                  <SubDetailHeader
                    isClub={isClub}
                    setState={this.setState.bind(this)}
                    editRecommendationVisible={
                      this.state.editRecommendationVisible
                    }
                    recommendationVisibleLoading={
                      this.state.recommendationVisibleLoading
                    }
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
                        isActive={isActive}
                        isDataChange={this.state.isDataChange}
                        isClub={isClub}
                        isGift={this.state.isGift}
                        onDateChange={this.onDateChange}
                        productListLoading={this.state.productListLoading}
                        showChangeProduct={this.showChangeProduct}
                        errMsgPage={this.state.errMsgPage}
                        isNotInactive={this.state.isNotInactive}
                        minDate={this.state.minDate}
                        setState={this.setState.bind(this)}
                        frequencyListOptions={this.frequencyListOptions}
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
                        {isGift && this.getGiftList()}
                      </div>

                      <h4 className="h4">
                        <FormattedMessage id="transactionInfo" />
                      </h4>
                      <div className="row text-left text-break editCard ml-0 mr-0">
                        <div
                          className="col-12 col-md-4 mb-2"
                          style={{ padding: '5px', paddingLeft: '0' }}
                        >
                          <div
                            className="h-100 border border-d7d7d7"
                            style={{
                              padding: '1.25rem'
                            }}
                          >
                            <div className="align-items-center">
                              {/* <em className="rc-icon rc-delivery--sm rc-brand1 ml-1 mr-1 mt-1" /> */}
                              <LazyLoad>
                                <img
                                  alt="delivery Icon"
                                  src={deliveryIcon}
                                  style={{
                                    width: '30px',
                                    marginRight: '1.125rem',
                                    display: 'inline-block'
                                  }}
                                />
                              </LazyLoad>
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
                              {/* 姓名 */}
                              <p className="mb-0 sd_mb_name">
                                <span
                                  className="medium"
                                  style={{
                                    fontSize: '1.125rem',
                                    color: '#333',
                                    margin: '25px 0 .625rem'
                                  }}
                                >
                                  {currentDeliveryAddress?.consigneeName}
                                </span>
                              </p>
                              {/* 电话 */}
                              <p className="mb-0 sd_mb_tel">
                                {currentDeliveryAddress?.consigneeNumber}
                              </p>

                              {/* 国家 */}
                              {process.env.REACT_APP_COUNTRY == 'US' ||
                              process.env.REACT_APP_COUNTRY == 'RU' ? null : (
                                <p className="mb-0 sd_mb_country">
                                  {this.state.countryList.length &&
                                  this.state.countryList.filter(
                                    (el) =>
                                      el.id === currentDeliveryAddress.countryId
                                  ).length
                                    ? this.state.countryList.filter(
                                        (el) =>
                                          el.id ===
                                          currentDeliveryAddress.countryId
                                      )[0].valueEn
                                    : currentDeliveryAddress.countryId}
                                  ,
                                </p>
                              )}
                              {/* 地址 */}
                              <p className="mb-0 sd_mb_address1">
                                {currentDeliveryAddress?.address1}
                              </p>
                              {localAddressForm &&
                                localAddressForm['address2'] &&
                                currentDeliveryAddress?.address2 && (
                                  <p className="mb-0 sd_mb_address2">
                                    {currentDeliveryAddress?.address2}
                                  </p>
                                )}

                              <p className="mb-0 sd_mb_cpp">
                                {/* 城市 */}
                                {localAddressForm &&
                                  localAddressForm['city'] &&
                                  currentDeliveryAddress?.city + ', '}

                                {/* 区域 */}
                                {localAddressForm['region'] &&
                                  currentDeliveryAddress.area + ', '}

                                {/* 省份 / State */}
                                {localAddressForm &&
                                  localAddressForm['state'] &&
                                  currentDeliveryAddress?.province + ' '}

                                {/* 邮编 */}
                                {localAddressForm &&
                                  localAddressForm['postCode'] &&
                                  currentDeliveryAddress?.postCode}
                              </p>

                              {maxDeliveryTime &&
                                minDeliveryTime &
                                (
                                  <>
                                    {minDeliveryTime && (
                                      <>
                                        {minDeliveryTime == maxDeliveryTime ? (
                                          <FormattedMessage
                                            id="payment.deliveryDate2"
                                            values={{
                                              val: minDeliveryTime
                                            }}
                                          />
                                        ) : (
                                          <FormattedMessage
                                            id="payment.deliveryDate"
                                            values={{
                                              min: minDeliveryTime,
                                              max: maxDeliveryTime
                                            }}
                                          />
                                        )}
                                      </>
                                    )}
                                  </>
                                )}
                            </div>
                          </div>
                        </div>
                        {/* 不是美国或者不隐藏支付checkout billing addr时，才显示billing addr */}
                        {process.env.REACT_APP_COUNTRY !== 'US' &&
                        !Boolean(
                          +process.env.REACT_APP_HIDE_CHECKOUT_BILLING_ADDR
                        ) ? (
                          <div
                            className={`col-12 col-md-4 mb-2`}
                            style={{ padding: '5px' }}
                          >
                            <div
                              className="h-100 border border-d7d7d7"
                              style={{
                                padding: '1.25rem'
                              }}
                            >
                              <div className="align-items-center">
                                <LazyLoad>
                                  <img
                                    alt="billing Icon"
                                    src={billingIcon}
                                    style={{
                                      width: '30px',
                                      marginRight: '1.125rem',
                                      display: 'inline-block'
                                    }}
                                  />
                                </LazyLoad>
                                <span>
                                  <FormattedMessage id="billing2" />
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
                                  </a>
                                )}
                              </div>
                              <div className="ml-1">
                                <p className="mb-0">
                                  <span
                                    className="medium"
                                    style={{
                                      fontSize: '1.125rem',
                                      color: '#333',
                                      margin: '25px 0 .625rem'
                                    }}
                                  >
                                    {currentBillingAddress.consigneeName}
                                  </span>
                                </p>
                                <p className="mb-0">
                                  {currentBillingAddress.consigneeNumber}
                                </p>
                                <p className="mb-0">
                                  {process.env.REACT_APP_COUNTRY ==
                                  'US' ? null : (
                                    <>
                                      {this.state.countryList.length &&
                                      this.state.countryList.filter(
                                        (el) =>
                                          el.id ===
                                          currentBillingAddress.countryId
                                      ).length
                                        ? this.state.countryList.filter(
                                            (el) =>
                                              el.id ===
                                              currentBillingAddress.countryId
                                          )[0].valueEn
                                        : currentBillingAddress.countryId}
                                      ,
                                    </>
                                  )}
                                  {/* 省份 / State */}
                                  {currentBillingAddress?.province &&
                                  currentBillingAddress?.province != null
                                    ? currentBillingAddress.province + ', '
                                    : null}
                                  {currentBillingAddress.city}
                                </p>
                                <p className="mb-0">
                                  {currentBillingAddress.address1}
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : null}
                        {currentCardInfo ? (
                          <div
                            className="col-12 col-md-4 mb-2"
                            style={{ padding: '5px', paddingRight: '0' }}
                          >
                            <div
                              className="h-100 border border-d7d7d7"
                              style={{
                                padding: '1.25rem'
                              }}
                            >
                              <div className="align-items-center">
                                <LazyLoad style={{ display: 'inline' }}>
                                  <img
                                    src="paymentIcon"
                                    src={paymentIcon}
                                    style={{
                                      width: '30px',
                                      marginRight: '1.125rem',
                                      display: 'inline-block'
                                    }}
                                  />
                                </LazyLoad>
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
                                {currentCardInfo.lastFourDigits ? (
                                  <>
                                    <p className="mb-0">
                                      <span
                                        className="medium"
                                        style={{
                                          fontSize: '1.125rem',
                                          fontWeight: '400',
                                          color: '#333',
                                          margin: '25px 0 .625rem',
                                          verticalAlign: 'middle'
                                        }}
                                      >
                                        **** **** ****
                                        {currentCardInfo.lastFourDigits}
                                      </span>
                                    </p>

                                    <LazyLoad
                                      style={{
                                        width: '20%',
                                        marginRight: '.2rem'
                                      }}
                                    >
                                      <img
                                        alt="card background"
                                        className="d-inline-block"
                                        src={
                                          CREDIT_CARD_IMG_ENUM[
                                            currentCardInfo.paymentVendor.toUpperCase()
                                          ] ||
                                          'https://js.paymentsos.com/v2/iframe/latest/static/media/unknown.c04f6db7.svg'
                                        }
                                      />
                                    </LazyLoad>
                                  </>
                                ) : null}

                                <p className="mb-0">
                                  {currentCardInfo.holderName}
                                </p>
                                {/* <p className="mb-0">{currentCardInfo.phone}</p> */}
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </div>
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
                modalText={this.getModalBox()}
              ></Modal>
            </div>
            <div
              className="sub-des-mobile-modal rc-md-down"
              style={{
                display: remainingsVisible ? 'block' : 'none'
              }}
            >
              {this.getModalBox()}
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
          {this.changeProductModal()}

          <div className="choose-product-modal-wrap">
            <Modal
              headerVisible={true}
              footerVisible={false}
              visible={this.state.changeRecommendationVisible}
              modalTitle=""
              close={this.closeChangePets}
            >
              <h4 className="red text-center mb-3 mt-3">
                <FormattedMessage id="subscription.productRecommendation" />
              </h4>
              <p className="text-center">
                <FormattedMessage id="subscription.chooseOption" />
              </p>
              <div
                style={{ padding: '.9375rem' }}
                className="rc-outline-light rc-padding-y--sm"
              >
                {/* <div className="rc-outline-light rc-padding-y--sm rc-padding-x--sm rc-margin-x--sm"> */}
                {this.recommendationModal()}
              </div>
            </Modal>
          </div>
          <div className="product-detail-modal">
            <Modal
              headerVisible={true}
              footerVisible={true}
              visible={this.state.produtctDetailVisible}
              cancelBtnText={
                <FormattedMessage id="subscription.seeOtherRecommendation" />
              }
              confirmBtnText={
                <FormattedMessage id="subscription.chooseThisProduct" />
              }
              modalTitle={''}
              cancel={this.closeAndShowChangeProduct}
              hanldeClickConfirm={this.showChangeRecommendation}
              close={() => {
                this.initMainProduct(); // 需要重置顶部推荐框
                this.closeProdutctDetail();
              }}
            >
              {this.getDetailModalInner()}
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default SubscriptionDetail;
