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
import UserPaymentInfo from './components/UserPaymentInfo';
import GoodsDetails from './components/ChangeProduct/GoodsDetails';
import ChooseSKU from './components/ChangeProduct/ChooseSKU';
import RecommendationList from './components/ChangeProduct/RecommendationList';

import NextDelivery from './components/DeliveryList/NextDelivery';
import CompletedDelivery from './components/DeliveryList/CompletedDelivery';
import Loading from '@/components/Loading';
import { getRation, getClubLogo } from '@/utils/utils';

import {
  getDictionary,
  getDeviceType,
  getFrequencyDict,
  getFormatDate,
  formatMoney,
  setSeoConfig
} from '@/utils/utils';
import { getDetailsBySpuNo } from '@/api/details';
import DatePicker from 'react-datepicker';
import skipIcon from './images/skip.png';
import { Link } from 'react-router-dom';
import {
  updateDetail,
  getSubDetail,
  skipNextSub,
  cancelAllSub,
  orderNowSub,
  updateNextDeliveryTime,
  startSubscription,
  pauseSubscription,
  findPetProductForClub
} from '@/api/subscription';
import { getRemainings } from '@/api/dispenser';
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
      mainProductDetails: null, //推荐主商品的详情数据
      dogBreedList: [],
      catBreedList: [],
      petType: '',
      errMsgPage: '',
      errorMsgAddPet: '',
      errMsgDetail: '',
      productDetail: {},
      productListLoading: false,
      currentGoodsItems: [],
      goodsDetails: {}, //for GoodsDetailTabs
      stock: 0,
      currentSubscriptionPrice: null,
      foodFllType: '',
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
  productDetailsInit = (res, cb) => {
    let { configStore } = this.props;
    let goodsRes = (res && res.context && res.context.goods) || { context: {} };
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
      let specList = res.context.goodsSpecs || [];
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
    this.setState({
      details,
      currentUnitPrice,
      currentLinePrice,
      currentSubscriptionPrice,
      currentSubscriptionStatus,
      stock
    });
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
    this.setState({
      details,
      currentUnitPrice,
      currentSubscriptionPrice,
      currentSubscriptionStatus,
      stock
    });
  }

  async componentDidMount() {
    this.getBreedList();

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
  savedChangeSubscriptionGoods = () => {
    this.getDetail();
    this.closeRecommendation();
    this.closeEditRecommendation();
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
              if (res) {
                this.setState({ mainProductDetails: res });
              }
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
            <RecommendationList
              showProdutctDetail={this.showProdutctDetail}
              productDetail={this.state.productDetail}
              errMsgDetail={this.state.errMsgDetail}
              productListLoading={this.state.productListLoading}
            />
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
                    savedChangeSubscriptionGoods={
                      this.savedChangeSubscriptionGoods
                    }
                    matchGoods={this.matchGoods}
                    showChangeProduct={this.showChangeProduct}
                    details={this.state.details}
                    showProdutctDetail={this.showProdutctDetail}
                    specList={this.state.specList}
                    stock={this.state.stock}
                    isNotInactive={this.state.isNotInactive}
                    form={this.state.form}
                    images={this.state.images}
                    productListLoading={this.state.productListLoading}
                    currentGoodsItems={this.state.currentGoodsItems}
                    currentSubscriptionPrice={
                      this.state.currentSubscriptionPrice
                    }
                    petType={this.state.petType}
                    frequencyListOptions={this.frequencyListOptions}
                    handleSelectedItemChange={this.handleSelectedItemChange}
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
                        pauseOrStart={this.pauseOrStart}
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
                <ChooseSKU
                  savedChangeSubscriptionGoods={
                    this.savedChangeSubscriptionGoods
                  }
                  showChangeProduct={this.showChangeProduct}
                  showProdutctDetail={this.showProdutctDetail}
                  matchGoods={this.matchGoods}
                  setState={this.setState.bind(this)}
                  frequencyListOptions={this.frequencyListOptions}
                  handleSelectedItemChange={this.state.handleSelectedItemChange}
                  details={this.state.details}
                  specList={this.state.specList}
                  stock={this.state.stock}
                  isNotInactive={this.state.isNotInactive}
                  form={this.state.form}
                  images={this.state.images}
                  productListLoading={this.state.productListLoading}
                  currentGoodsItems={this.state.currentGoodsItems}
                  subDetail={this.state.subDetail}
                  currentSubscriptionPrice={this.state.currentSubscriptionPrice}
                />
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
              <GoodsDetails
                details={this.state.details}
                foodFllType={this.state.foodFllType}
                goodsDetails={this.state.goodsDetails}
              />
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default SubscriptionDetail;
