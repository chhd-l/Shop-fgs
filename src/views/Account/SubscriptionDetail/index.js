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
import clubIcon from '@/assets/images/club-icon.png';
import productDetail from './productDetail.json';
import { unique } from '@/utils/utils';
import { myAccountActionPushEvent } from '@/utils/GA';
import Female from '@/assets/images/female.png';
import Male from '@/assets/images/male.png';
import Cat from '@/assets/images/cat.png';
import Dog from '@/assets/images/dog.png';
import { IMG_DEFAULT } from '@/utils/constant';
import Banner_Cat from './../PetForm/images/banner_Cat.jpg';

import {
  getDictionary,
  dynamicLoadCss,
  getDeviceType,
  getFrequencyDict,
  getFormatDate,
  datePickerConfig,
  formatMoney,
  setSeoConfig
} from '@/utils/utils';
import { getDetailsBySpuNo } from '@/api/details';
import { getPetList } from '@/api/pet';
import foodPic2 from '../../SmartFeederSubscription/img/step2_food.png';
import GoodsDetailTabs from '@/components/GoodsDetailTabs';
// import ModalFr from '@/components/Recommendation_FR';
import DatePicker from 'react-datepicker';
import cancelIcon from './images/cancel.png';
import skipIcon from './images/skip.png';
import dateIcon from './images/date.png';
import deliveryIcon from './images/deliveryAddress.png';
import billingIcon from './images/billingAddress.png';
import paymentIcon from './images/payment.png';
import { Link } from 'react-router-dom';
import { CREDIT_CARD_IMG_ENUM } from '@/utils/constant';
import {
  updateDetail,
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
import goodsDetailTabJSON from './goodsDetailTab.json';
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

const sessionItemRoyal = window.__.sessionItemRoyal;
const storeInfo = JSON.parse(sessionItemRoyal.get('storeContentInfo'));
// 税额开关 0: 开, 1: 关
const customTaxSettingOpenFlag = storeInfo?.customTaxSettingOpenFlag;
// 买入价格开关 0：含税，1：不含税
const enterPriceType =
  storeInfo?.systemTaxSetting?.configVOList &&
  storeInfo?.systemTaxSetting?.configVOList[1]?.context;
@inject('checkoutStore', 'loginStore')
@injectIntl
class SubscriptionDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stock: 0,
      currentSubscriptionPrice: null,
      quantityMinLimit: 1,
      foodFllType: '',
      quantity: 1,
      //订阅购物车参数
      subTotal: 0,
      subShipping: 0,
      addNewPetVisible: false,
      changeRecommendationVisible: false,
      editRecommendationVisible: false,
      produtctDetailVisible: false,
      promotionDiscount: 0,
      promotionDesc: '',
      changeProductVisible: false,
      petList: [],
      form: {
        buyWay: 1, //0 - once/ 1 - frequency
        frequencyVal: '',
        frequencyName: '',
        frequencyId: -1
      },
      seoConfig: {
        title: '',
        metaKeywords: '',
        metaDescription: ''
      },
      isGift: false,
      remainingsList: [],
      remainingsVisible: false,
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
      todaydate: new Date(),
      tabName: [
        this.props.intl.messages.noStart,
        this.props.intl.messages.completed
      ],
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
  async queryProductDetails(id) {
    let res = goodsDetailTabJSON;
    // getDetailsBySpuNo(id)
    //   .then((res) => {
    const goodsRes = res && res.context && res.context.goods;
    this.setState({
      form: Object.assign(this.state.form, {
        frequencyId:
          goodsRes.defaultFrequencyId ||
          configStore.defaultSubscriptionFrequencyId ||
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
            console.info('sdItem.isEmpty', sdItem.isEmpty);

            // filterproduct.goodsInfoWeight = parseFloat(sdItem.detailName)
          }
          return sdItem.specId === sItem.specId;
        });
        let defaultSelcetdSku = -1;
        if (defaultSelcetdSku > -1) {
          // 默认选择该sku
          if (!sItem.chidren[defaultSelcetdSku].isEmpty) {
            // 如果是sku进来的，需要默认当前sku被选择
            sItem.chidren[defaultSelcetdSku].selected = true;
          }
        } else {
          if (
            process.env.REACT_APP_LANG === 'de' &&
            sItem.chidren.length > 1 &&
            !sItem.chidren[1].isEmpty
          ) {
            sItem.chidren[1].selected = true;
          } else if (sItem.chidren.length > 1 && !sItem.chidren[1].isEmpty) {
            sItem.chidren[1].selected = true;
          } else {
            for (let i = 0; i < sItem.chidren.length; i++) {
              if (sItem.chidren[i].isEmpty) {
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
    // })
    // .catch((e) => {
    //   console.log(e);
    //   this.setState({
    //     errMsg: e.message || <FormattedMessage id="details.errMsg2" />
    //   });
    // })
    // .finally(() => {
    //   this.setState({
    //     loading: false,
    //     initing: false
    //   });
    // });
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

    details.sizeList.map((item, i) => {
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
  PetsInfo = (petsInfo, petsId) => (
    <React.Fragment>
      <img
        style={{ marginLeft: '1rem', marginRight: '1rem' }}
        className="pet-img text-center rc-margin-y--sm"
        src={
          (petsInfo?.petsImg && petsInfo.petsImg.includes('https')
            ? petsInfo.petsImg
            : null) || (petsInfo?.petsType === 'cat' ? Cat : Dog)
        }
      />
      <div className="rc-md-down">{this.statusText()}</div>
      <Link
        className="rc-md-down rc-margin-y--sm"
        to={`/account/pets/petForm/${petsId}`}
      >
        <div
          className="rc-styled-link"
          // onClick={this.showEditRecommendation}
        >
          Edit pet profile
        </div>
      </Link>
      <div className="d-flex align-items-center">
        <div className="rc-padding-right--md">
          <h4 className="rc-md-up" style={{ color: '#e2001a', margin: 0 }}>
            CLUB for {petsInfo?.petsName}
          </h4>
          <div>
            Date of birth:<strong> {petsInfo?.birthOfPets}</strong>
          </div>
        </div>
        <div className="rc-padding-right--md">
          <Link className="rc-md-up" to={`/account/pets/petForm/${petsId}`}>
            <div
              className="rc-styled-link"
              // onClick={this.showEditRecommendation}
            >
              Edit pet profile
            </div>
          </Link>
          <div>
            Breed:<strong>{petsInfo?.petsBreed}</strong>{' '}
          </div>
        </div>
        <div className="rc-padding-right--md">
          <div className="rc-md-up" style={{ color: '#fff' }}>
            {' '}
            &nbsp:;
          </div>
          <div>
            Sterilized: <strong> {petsInfo?.sterilized ? 'yes' : 'no'}</strong>
          </div>
        </div>
        <div className="rc-md-up">
          <div style={{ color: '#fff' }}> &nbsp:;</div>
          <span>{this.statusText()}</span>
        </div>
      </div>
    </React.Fragment>
  );
  DailyRation = () => {
    return (
      <span
        style={{
          background: '#F5F5F5',
          padding: '6px',
          marginTop: '10px',
          display: 'inline-block'
        }}
      >
        Daily ration: 57g/day
      </span>
    );
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
      ele && delete ele.value;
      return {
        value: ele.id,
        ...ele
      };
    });
  }

  get userInfo() {
    return this.props.loginStore.userInfo;
  }
  getPetList = async () => {
    if (!this.userInfo.customerAccount) {
      // this.showErrorMsg(this.props.intl.messages.getConsumerAccountFailed);
      this.setState({
        loading: false
      });
      return false;
    }
    await getPetList({
      customerId: this.userInfo.customerId,
      consumerAccount: this.userInfo.customerAccount
    })
      .then((res) => {
        let petList = res.context.context || [];
        this.setState({
          loading: false,
          petList,
          addNewPetVisible: true //展示petList
        });
      })
      .catch((err) => {
        this.setState({
          loading: false
        });
        // this.showErrorMsg(
        //   err.message || this.props.intl.messages.getDataFailed
        // );
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
  //订阅数量更改
  async onQtyChange() {
    try {
      await this.doGetPromotionPrice(this.state.lastPromotionInputValue);
      this.setState({ isDataChange: true });
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
  getMinDate(nextDeliveryTime) {
    let time = new Date(nextDeliveryTime);
    // if (
    //   time.getTime() - 14 * 24 * 60 * 60 * 1000 >
    //   this.state.minDate.getTime() + 24 * 60 * 60 * 1000
    // ) {
    //   return new Date(time.getTime() - 14 * 24 * 60 * 60 * 1000);
    // } else {
    //   return new Date(this.state.minDate.getTime() + 24 * 60 * 60 * 1000);
    // }
    return new Date(this.state.minDate.getTime() + 1 * 24 * 60 * 60 * 1000);
  }
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
      currentSubscriptionPrice
    } = this.state;
    return (
      <React.Fragment>
        <div className="d-flex for-pc-bettwen">
          <div className="d-flex for-mobile-colum for-mobile-100">
            <div className="d-flex rc-margin-right--xs">
              <img
                src={details.goodsImg}
                style={{ height: '4rem' }}
                alt={details.goodsName}
              />
              <div>
                <div>{details.goodsName}</div>
                <div>type</div>
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
                      ></span>
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
                      ></span>
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
                    <div id="choose-select" key={i}>
                      <div className="rc-margin-bottom--xs">
                        <FormattedMessage id={sItem.specName} />:
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
                              } ${sdItem.isEmpty ? 'outOfStock' : ''}`}
                              onClick={() => {
                                if (sdItem.isEmpty) {
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
                                  backgroundColor: sdItem.isEmpty
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
                <div style={{ display: 'none' }} className="Quantity">
                  <span className="amount">
                    <FormattedMessage id="amount" />:
                  </span>
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
                      ></span>
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
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="frequency rc-margin-right--xs rc-margin-left--xs">
              <span>
                <FormattedMessage id="subscription.frequency" />:
              </span>
              {/* <FormattedMessage id="smartFeederSubscription.selectYourFrequency" /> */}
              <div>
                <Selection
                  customContainerStyle={{
                    display: 'inline-block',
                    marginLeft: isMobile ? '50px' : '1.5rem',
                    height: isMobile ? '70px' : 'auto'
                  }}
                  selectedItemChange={this.handleSelectedItemChange}
                  optionList={this.frequencyListOptions}
                  selectedItemData={{
                    value: form.frequencyId
                  }}
                  key={form.frequencyId}
                />
                {/* <Selection
                  optionList={this.frequencyListOptions}
                  selectedItemChange={(el) => {
                    if (el.periodTypeId !== data.id) {
                      el.periodTypeId = data.id;
                      // el.periodTypeValue = data.valueEn;
                      this.setState({ isDataChange: true });
                    }
                  }}
                  selectedItemData={{
                    value: 5744
                  }}
                  customContainerStyle={{}}
                  // selectedItemChange={(data) => handleSelectedItemChange(data)}
                  customStyleType="select-one"
                /> */}
              </div>
            </p>
          </div>
          <strong className="rc-md-up">
            ={formatMoney(currentSubscriptionPrice * quantity)}
          </strong>
        </div>
        <div className="d-flex  for-mobile-colum for-pc-bettwen rc-button-link-group">
          <span className="rc-styled-link" onClick={this.showChangeProduct}>
            See other recommendation
          </span>
          <div className="for-mobile-colum d-flex">
            <button
              onClick={this.showProdutctDetail}
              className="rc-btn rc-btn--two rc-btn--sm"
            >
              Product details
            </button>
            <button
              onClick={this.changePets}
              className="rc-btn rc-btn--one rc-btn--sm"
            >
              Change now
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  };
  addNewCatModal = () => {
    return (
      <div className="add-new-cat-modal">
        <Modal
          headerVisible={true}
          footerVisible={false}
          visible={this.state.addNewPetVisible}
          modalTitle={'Link a pet profile to your CLUB subscription'}
          close={this.closeAddNewPet}
          // hanldeClickConfirm={() => this.hanldeClickSubmit()}
          // modalText={this.getModalBox()}
        >
          <div className="rc-padding-x--md">
            <div className="pets-list-wrap">
              {this.state.petList.map((el) => (
                <div
                  onClick={(e) => {
                    this.linkPets(el.petsId);
                  }}
                  className=" border-solid d-flex pets-list-item align-items-center"
                >
                  <div style={{ position: 'relative' }}>
                    <img
                      alt={el.petsName}
                      src={
                        (el.petsImg && el.petsImg.includes('https')
                          ? el.petsImg
                          : null) || (el.petsType === 'cat' ? Cat : Dog)
                      }
                      className="pet-img"
                    />
                    <img
                      style={{
                        width: '1.25rem',
                        position: 'absolute',
                        bottom: 0,
                        right: 0
                      }}
                      src={!el.petsSex ? Male : Female}
                      alt="pet-sex-icon"
                    />
                  </div>
                  <div style={{ paddingLeft: '1rem' }}>
                    <div style={{ color: '#e2001a' }}>{el.petsName}</div>
                    <div>{el.birthOfPets}</div>
                  </div>
                </div>
              ))}
              <div
                style={{ paddingLeft: '2rem' }}
                className="border-dot height100 align-items-center d-flex"
              >
                <div>
                  <Link to="/account/pets/petForm">
                    + <strong>a new cat</strong>
                  </Link>
                </div>
                <img
                  style={{ paddingLeft: '2rem' }}
                  className="pet-icon"
                  src={Banner_Cat}
                />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  };
  async getDetail(fn) {
    try {
      this.setState({ loading: true });
      let res = await getSubDetail(this.props.match.params.subscriptionNumber);
      let subDetail = res.context;
      let noStartYear = {};
      let completedYear = {};
      let noStartYearOption = [];
      let completedYearOption = [];
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
      completeOption.forEach((el) => {
        completedYearOption.push({ name: el, value: el });
      });
      completedYear = {
        value: (completedYearOption[0] && completedYearOption[0]['value']) || ''
      };
      noStartOption.forEach((el) => {
        noStartYearOption.push({ name: el, value: el });
      });
      noStartYear = {
        value: noStartYearOption[0] && noStartYearOption[0]['value'],
        name: noStartYearOption[0] && noStartYearOption[0]['value']
      };

      subDetail.goodsInfo = (subDetail.goodsInfo || []).map((el) => {
        let filterData =
          this.frequencyListOptions.filter(
            (item) => item.id === el.periodTypeId
          )[0] || this.frequencyListOptions[0];
        // el.periodTypeValue = filterData.valueEn;
        return el;
      });
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
  }
  matchCityName(dict, cityId) {
    return dict.filter((c) => c.id === cityId).length
      ? dict.filter((c) => c.id === cityId)[0].cityName
      : cityId;
  }
  async doGetPromotionPrice(promotionCode = '') {
    const { currentDeliveryAddress } = this.state;
    try {
      //计算Tota
      let goodsInfo = this.state.subDetail.goodsInfo;
      let subTotal = 0;
      for (let goods of goodsInfo) {
        subTotal += Number(goods.originalPrice) * goods.subscribeNum;
      }
      //拼装goodsInfoList参数
      let goodsInfoList = this.state.subDetail.goodsInfo?.map((ele) => {
        return {
          goodsInfoId: ele.skuId,
          buyCount: ele.subscribeNum
        };
      });
      // console.log('--------------- ★★★★ currentDeliveryAddress: ',this.state.currentDeliveryAddress);
      //根据参数查询促销的金额与订单运费
      const res = await getPromotionPrice({
        totalPrice: subTotal,
        goodsInfoList,
        promotionCode,
        isAutoSub: true,
        deliveryAddressId: currentDeliveryAddress.deliveryAddressId
      });
      //拼装订阅购物车参数
      if (!res.context.promotionFlag) {
        //只有promotionFlag为false的时候表示prootionCode生效
        let subTradeTotal = subTotal + Number(res.context.deliveryPrice);
        // -Number(res.context.discountsPrice);
        //Number(res.context.promotionDiscount);
        this.setState({
          // loading: false,
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
                          <div className="col-3">Delivery date</div>
                          <div className="col-6">Product</div>
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
                                      alt="trade-item"
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
  handlerChange(e) {
    let promotionInputValue = e.target.value;
    this.setState({
      promotionInputValue
    });
  }
  getButtonBoxGift = (subDetail) => {
    return (
      <div className="rc-layout-container rc-two-column subdeatial-button-mobile">
        <div
          className="rc-column subdeatial-button-mobile-save rc-md-down"
          style={{ textAlign: 'right' }}
        >
          <button
            className={`rc-btn rc-btn--one ${
              this.state.isDataChange ? '' : 'rc-btn-solid-disabled'
            }`}
            style={{
              marginTop: isMobile ? '.625rem' : '0',
              marginRight: '1rem'
            }}
            onClick={() => this.handleSaveChange(subDetail)}
          >
            <FormattedMessage id="saveChange" />
          </button>
        </div>

        <div className="rc-column d-flex">
          <div className="subdeatial-button-mobile-pad pause-btn">
            <em
              className="iconfont"
              style={{
                fontSize: '2rem',
                color: '#FBE8CD',
                paddingLeft: '1rem'
              }}
            >
              &#xe62f;
            </em>
            <span
              style={{
                position: 'relative',
                top: '-0.3rem',
                paddingRight: '0.5rem',
                paddingLeft: '0.5rem'
              }}
              className={`rc-styled-link ${
                this.state.isGift ? 'disabled' : ''
              }`}
            >
              {subDetail.subscribeStatus === '0' ? (
                <FormattedMessage id="subscription.pause" />
              ) : (
                <FormattedMessage id="subscription.restart" />
              )}
            </span>
          </div>
          <div>
            <em
              className="iconfont"
              style={{
                fontSize: '2rem',
                color: '#E1001A',
                paddingRight: '0.5rem',
                paddingLeft: '0.5rem'
              }}
            >
              &#xe619;
            </em>
            {/* <LazyLoad>
              <img
                style={{
                  display: 'inline-block',
                  width: '1.25rem',
                  marginRight: '5px'
                }}
                src={cancelIcon}
              />
            </LazyLoad> */}
            <a
              style={{ position: 'relative', top: '-0.3rem' }}
              className="rc-styled-link"
              onClick={(e) => this.handleGiftSubCancel(e, subDetail)}
            >
              <FormattedMessage id="subscription.cancelAll" />
            </a>
          </div>
        </div>
        <div
          className="rc-column subdeatial-button-mobile-save rc-md-up"
          style={{ textAlign: 'right' }}
        >
          <button
            className={`rc-btn rc-btn--one ${
              this.state.isDataChange ? '' : 'rc-btn-solid-disabled'
            }`}
            style={{
              marginTop: isMobile ? '.625rem' : '0',
              marginRight: '1rem'
            }}
            onClick={() => this.handleSaveChange(subDetail)}
          >
            <FormattedMessage id="saveChange" />
          </button>
        </div>
      </div>
    );
  };
  getButtonBox = (subDetail) => {
    let { isNotInactive } = this.state;
    return (
      <div
        className="footerGroupButton"
        style={{ display: isNotInactive ? 'block' : 'none' }}
      >
        <p style={{ textAlign: isMobile ? 'center' : 'right' }}>
          <div
            className="pause-btn"
            style={{ display: isMobile ? 'block' : 'inline-block' }}
          >
            <em
              className="iconfont"
              style={{
                fontSize: '1.25rem',
                color: 'rgb(242,148,35)',
                position: 'relative',
                top: '2px'
              }}
            >
              &#xe62f;
            </em>
            <a
              style={{
                paddingRight: '0.5rem',
                paddingLeft: '4px'
              }}
              className="rc-styled-link"
              onClick={() => this.pauseOrStart(subDetail)}
            >
              {subDetail.subscribeStatus === '0' ? (
                <FormattedMessage id="subscription.pause" />
              ) : (
                <FormattedMessage id="subscription.restart" />
              )}
            </a>
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <div style={{ display: isMobile ? 'block' : 'inline-block' }}>
            <LazyLoad>
              <img
                style={{
                  display: 'inline-block',
                  width: '1.25rem',
                  marginRight: '5px'
                }}
                src={cancelIcon}
              />
            </LazyLoad>
            <a
              className="rc-styled-link"
              href="#/"
              onClick={(e) => {
                this.handleCancel(e);
              }}
            >
              <FormattedMessage id="subscription.cancelAll" />
            </a>
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button
            className={`rc-btn rc-btn--one ${
              this.state.isDataChange ? '' : 'rc-btn-solid-disabled'
            }`}
            style={{ marginTop: isMobile ? '.625rem' : '0' }}
            onClick={() => this.handleSaveChange(subDetail)}
          >
            <FormattedMessage id="saveChange" />
          </button>
        </p>
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
  closeChangePets = () => {
    this.closeRecommendation();
    this.closeEditRecommendation();
  };
  changeSubscriptionGoods = async () => {
    const { quantity, form, details } = this.state;
    const { sizeList } = details;
    let currentSelectedSize = sizeList[0];

    if (details.goodsSpecDetails) {
      currentSelectedSize = find(sizeList, (s) => s.selected);
    }
    let buyWay = parseInt(form.buyWay);
    let goodsInfoFlag =
      buyWay && details.promotions?.includes('club') ? 2 : buyWay;
    let addGoodsItems = {
      skuId: currentSelectedSize.goodsInfoId,
      goodsNum: quantity,
      goodsInfoFlag
      // productFinderFlag: currentSelectedSize.productFinderFlag
    };
    if (buyWay) {
      addGoodsItems.periodTypeId = form.frequencyId;
    }
    let params = {
      subscribeId: this.state.subDetail.subscribeId,
      addGoodsItems
    };
    changeSubscriptionGoods(params).then((res) => {});
  };
  changePets = async () => {
    await this.changeSubscriptionGoods();
    this.closeRecommendation();
    this.closeEditRecommendation();
  };
  closeEditRecommendation = () => {
    this.setState({ editRecommendationVisible: false });
  };
  showProdutctDetail = async (id) => {
    await this.queryProductDetails(id);
    this.closeChangeProduct();
    this.closeRecommendation();
    this.setState({ produtctDetailVisible: true });
  };
  closeProdutctDetail = () => {
    this.setState({ produtctDetailVisible: false });
  };
  closeChangeProduct = () => {
    this.setState({ changeProductVisible: false });
  };
  showChangeProduct = async () => {
    let { petsId } = this.state.subDetail;
    try {
      // let res = await findPetProductForClub({ petsId, apiTree: 'club_V2' });
      // console.info(res, 'res');
      this.closeProdutctDetail();
      this.closeRecommendation();
      this.setState({ changeProductVisible: true });
    } catch (err) {}
  };
  getDetailModalInner = () => {
    const createMarkup = (text) => ({ __html: text });
    const { details, foodFllType } = this.state;
    console.info('details', details);
    // console.info('detailsdetailsdetails', props.details);
    return (
      <div className="margin12 product_detail rc-padding-x--md">
        <div>
          <div className="rc-layout-container rc-five-column">
            <div className="rc-column  rc-header__center d-flex">
              <LazyLoad>
                <img src={foodPic2} />
              </LazyLoad>
            </div>
            <div className="rc-column rc-double-width">
              <div className="title">{details.goodsInfoName}</div>
              <div className="sub_title">{foodFllType}</div>
              <div>
                <div className="block">
                  <p
                    className="content rc-scroll--x"
                    style={{ marginBottom: '4rem' }}
                  >
                    {details.goodsSubtitle}
                  </p>
                </div>
                {/* Royal Canin Jack Russell Terrier Adult dry dog food is designed
                to meet the nutritional needs of purebred Jack Russell Terriers
                10 months and older Royal Canin knows what makes your Jack
                Russell Terrier magnificent is in the details. Small but mighty,
                the Jack Russell is an energetic dog that requires a ton of
                activity. They can benefit from the right diet to help maintain
                muscle mass, protect their skin and coat, and help with dental
                care, especially as your good-looking little pal becomes older. */}
              </div>
            </div>
          </div>
        </div>
        <GoodsDetailTabs detailRes={details} />
        {/* <Details goodsDetailTab={goodsDetailTab} details={props.details} /> */}
      </div>
    );
  };
  changeProductModal = () => {
    return (
      <div className="change-product-modal">
        <Modal
          headerVisible={true}
          footerVisible={false}
          visible={this.state.changeProductVisible}
          modalTitle={''}
          close={this.closeChangeProduct}
        >
          <div className="p-f-result-box">
            <img className="m-auto" src={clubIcon} />
            <h4 className="red text-center mb-3 mt-3">
              Your product recommendation
            </h4>
            <p className=" text-center">
              Based on your pet's profile,we recommend the below products to
              meet your pets'needs. Please comfirm the product change to update
              your subscription
            </p>
          </div>

          <div className="p-f-result-box">
            <div className="border rounded row pt-3 pb-3">
              <div className="col-12 col-md-6">
                <LazyLoad style={{ height: '100%', width: '100%' }}>
                  <img
                    src={
                      productDetail.mainProduct.goodsImg ||
                      productDetail.mainProduct.goodsInfos.sort(
                        (a, b) => a.marketPrice - b.marketPrice
                      )[0].goodsInfoImg
                    }
                    className="p-img"
                    alt="product-image"
                  />
                </LazyLoad>
              </div>
              <div className="col-12 col-md-6 d-flex flex-column justify-content-center">
                <header className="rc-text--center">
                  <h3
                    className="rc-card__title rc-gamma ui-text-overflow-line2 text-break mb-1 TitleFitScreen"
                    title={productDetail.mainProduct.goodsName}
                  >
                    {productDetail.mainProduct.goodsName}
                  </h3>
                </header>
                <div
                  className="ui-text-overflow-line1 text-break sub-hover text-center SubTitleScreen"
                  title={productDetail.mainProduct.subTitle}
                >
                  {productDetail.mainProduct.subTitle}
                </div>
                <div className="ui-text-overflow-line1 text-break sub-hover text-center SubTitleScreen">
                  your daily ration
                </div>
                <div className="text-center mt-2">
                  {productDetail.mainProduct.toPrice ? (
                    <span className="mr-1" style={{ fontSize: '.8em' }}>
                      <FormattedMessage id="startFrom" />
                    </span>
                  ) : null}
                  {formatMoney(productDetail.mainProduct.fromPrice)}
                  {productDetail.mainProduct.toPrice ? (
                    <>
                      <span className="ml-1 mr-1" style={{ fontSize: '.8em' }}>
                        <FormattedMessage id="startEnd" />
                      </span>
                      {formatMoney(productDetail.mainProduct.toPrice)}
                    </>
                  ) : null}
                  {/* {formatMoney(
                          Math.min.apply(
                            null,
                            productDetail.mainProduct.goodsInfos.map(
                              (g) => g.marketPrice || 0
                            )
                          )
                        )} */}
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
                        productDetail.mainProduct.spuCode
                      );
                    }}
                    className="rc-btn rc-btn--one rc-btn--sm"
                  >
                    <FormattedMessage id="seeTheProduct" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center">other products to consider</p>
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
                    <LazyLoad style={{ height: '100%', width: '100%' }}>
                      <img
                        src={
                          ele.goodsImg ||
                          ele.goodsInfos.sort(
                            (a, b) => a.marketPrice - b.marketPrice
                          )[0].goodsInfoImg
                        }
                        className="p-img"
                        alt="product-image"
                      />
                    </LazyLoad>
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
                    <div className="ui-text-overflow-line1 text-break sub-hover text-center SubTitleScreen">
                      your daily ration
                    </div>
                    <div className="text-center mt-2">
                      {productDetail.mainProduct.toPrice ? (
                        <span className="mr-1" style={{ fontSize: '.8em' }}>
                          <FormattedMessage id="startFrom" />
                        </span>
                      ) : null}
                      {formatMoney(productDetail.mainProduct.fromPrice)}
                      {productDetail.mainProduct.toPrice ? (
                        <>
                          <span
                            className="ml-1 mr-1"
                            style={{ fontSize: '.8em' }}
                          >
                            <FormattedMessage id="startEnd" />
                          </span>
                          {formatMoney(productDetail.mainProduct.toPrice)}
                        </>
                      ) : null}
                      {/* {formatMoney(
                Math.min.apply(
                  null,
                  ele.goodsInfos.map((g) => g.marketPrice || 0)
                )
              )} */}
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
                        onClick={this.showProdutctDetail}
                        className="rc-btn rc-btn--one rc-btn--sm"
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
          <p className="details-infos d-flex">
            <span className="rc-icon rc-incompatible--xs rc-iconography"></span>
            The recommendations provided here are for infomational purpose
            only.Ie should not be cosidered as guarantee for what may be best
            for your individual pet. Quantity,Size and Frequency will be set up
            in the CLUB management page
          </p>
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
    try {
      let res = await action(param);
      // this.setState({ isActive: !isActive, subscribeStatus });
      subscribeStatusText && myAccountActionPushEvent(subscribeStatusText);
      await this.getDetail();
    } catch (err) {
      this.showErrMsg(err.message);
    } finally {
      this.setState({ loading: false });
    }
  };
  linkPets = async (petsId) => {
    let { subscribeId } = this.state.subDetail;
    try {
      let param = {
        subscribeId,
        petsId
      };
      await this.doUpdateDetail(param);
      await this.getDetail();
      this.closeAddNewPet();
    } catch (err) {
      this.showErrMsg(err.message);
    } finally {
      this.setState({ loading: false });
    }
  };
  async handleSaveChange(subDetail) {
    if (!this.state.isDataChange) {
      return false;
    }
    try {
      // subDetail.goodsInfo = this.state.currentGoodsInfo;
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
        isChangeQuatity: false,
        isDataChange: false
      });
    } catch (err) {
      this.showErrMsg(err.message);
    } finally {
      this.setState({ loading: false });
    }
  }
  showEditRecommendation = () => {
    // this.queryProductDetails()
    this.setState({ editRecommendationVisible: true });
  };
  statusText = () => {
    let { subDetail, isNotInactive } = this.state;
    return subDetail.subscribeId ? (
      isNotInactive ? (
        <span
          style={{
            background: '#E0F3D4',
            color: '#47B700',
            fontSize: '.875rem',
            padding: '0 5px',
            marginLeft: '.625rem'
          }}
        >
          <FormattedMessage id="active" />
        </span>
      ) : (
        <span
          style={{
            background: '#FCEBD4',
            color: '#ED8A00',
            fontSize: '.875rem',
            padding: '0 5px'
            // marginLeft: '.625rem'
          }}
        >
          <FormattedMessage id="inactive" />
        </span>
      )
    ) : null;
  };
  ClubTitle = () => {
    let { petsId, petsInfo } = this.state.subDetail;
    return (
      <>
        <img src={clubIcon} alt="clubIcon" />
        <div className="d-flex align-items-center add-pet-btn-wrap">
          {petsId ? (
            this.PetsInfo(petsInfo, petsId)
          ) : (
            <React.Fragment>
              <div
                className="pet-img add-pet-btn text-center"
                onClick={this.showAddNewPet}
              ></div>
              <div>
                For a better experience we recommend linking a pet profile to
                your Club subscription
                <div>
                  <span className="rc-styled-link" onClick={this.showAddNewPet}>
                    Link a profile
                  </span>
                  <span className="mobile-block">{this.statusText()}</span>
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
      </>
    );
  };
  render() {
    console.info('frequencyListOptions', this.frequencyListOptions);
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
      noStartYearOption,
      completedYearOption,
      noStartYear,
      completedYear,
      isActive,
      isNotInactive,
      isGift,
      remainingsVisible
    } = this.state;
    // let isClub = true;
    let isClub = subDetail.subscriptionType?.toLowerCase().includes('club');
    // console.log(noStartYear, currentCardInfo, 'hahaha');
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
                {/* {this.state.loading ? <Loading positionFixed="true" /> : null} */}
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
                        console.log(el);
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
                  <div className="d-flex align-items-center align-items-center flex-wrap rc-margin-bottom--xs center-for-h5">
                    {/* <div className="d-flex justify-content-between align-items-center flex-wrap rc-margin-bottom--xs"> */}
                    {this.state.editRecommendationVisible && (
                      <div className="recommendatio-wrap  rc-margin-bottom--sm rc-padding--sm">
                        <p className="recommendatio-wrap-title">
                          New product recommendation
                        </p>
                        <div className="rc-outline-light rc-padding--sm recommendatio-wrap-content">
                          {this.recommendationModal()}
                        </div>
                      </div>
                    )}
                    {isClub ? (
                      this.ClubTitle()
                    ) : (
                      <h4
                        className="rc-delta font-weight-normal mb-2"
                        style={{ color: '#666' }}
                      >
                        {subDetail.subscribeId ? (
                          <span>{`${subDetail.subscribeId}`}</span>
                        ) : null}
                        {this.statusText()}
                      </h4>
                    )}
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
                      <div
                        className="mobileGoodsBox"
                        style={{ display: isMobile ? 'block' : 'none' }}
                      >
                        {subDetail.goodsInfo &&
                          subDetail.goodsInfo.map((el, index) => (
                            <div
                              className="goodsItem rc-card-content"
                              style={{
                                border: '1px solid #d7d7d7',
                                padding: '.75rem'
                              }}
                            >
                              <div style={{ display: 'flex' }}>
                                <div className="for-mobile-colum">
                                  <LazyLoad>
                                    <img
                                      src={el.goodsPic || IMG_DEFAULT}
                                      style={{ width: '100px' }}
                                      alt={el.goodsName}
                                    />
                                  </LazyLoad>
                                  {isClub && (
                                    <span
                                      className="rc-styled-link"
                                      onClick={this.showChangeProduct}
                                    >
                                      change product
                                    </span>
                                  )}
                                </div>
                                <div
                                  className="v-center"
                                  style={{ flex: '1', paddingLeft: '.625rem' }}
                                >
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
                                  {this.DailyRation()}
                                </div>
                              </div>
                              <div style={{ marginTop: '.9375rem' }}>
                                <div>
                                  <span
                                    className="rc-icon rc-minus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-minus"
                                    style={{ marginLeft: '-8px' }}
                                    onClick={() => {
                                      if (el.subscribeNum > 1) {
                                        el.subscribeNum = el.subscribeNum - 1;
                                        this.doGetPromotionPrice();
                                        this.setState({
                                          subDetail,
                                          isDataChange: true
                                        });
                                      } else {
                                        this.showErrMsg(
                                          <FormattedMessage id="cart.errorInfo" />
                                        );
                                      }
                                    }}
                                  ></span>
                                  <input
                                    className="rc-quantity__input 111"
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
                                      let { currentGoodsInfo } = this.state;
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
                                        if (
                                          tmp >
                                          process.env.REACT_APP_LIMITED_NUM
                                        ) {
                                          tmp =
                                            process.env.REACT_APP_LIMITED_NUM;
                                          this.showErrMsg(
                                            <FormattedMessage
                                              id="cart.errorMaxInfo"
                                              values={{
                                                val:
                                                  process.env
                                                    .REACT_APP_LIMITED_NUM
                                              }}
                                            />
                                          );
                                        }
                                        el.subscribeNum = tmp;
                                        this.setState({
                                          currentGoodsInfo
                                        });
                                        // this.updateBackendCart({ goodsInfoId: item.goodsInfoId, goodsNum: item.buyCount, verifyStock: false })
                                      }
                                      //数量变更后
                                      subDetail.goodsInfo[index].subscribeNum =
                                        el.subscribeNum;
                                      this.onQtyChange();
                                    }}
                                    value={el.subscribeNum}
                                  />
                                  <span
                                    className="rc-icon rc-plus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-plus"
                                    onClick={() => {
                                      if (
                                        el.subscribeNum <
                                        process.env.REACT_APP_LIMITED_NUM
                                      ) {
                                        el.subscribeNum = el.subscribeNum + 1;
                                        this.doGetPromotionPrice();
                                        this.setState({
                                          subDetail,
                                          isDataChange: true
                                        });
                                      } else {
                                        this.showErrMsg(
                                          <FormattedMessage
                                            id="cart.errorMaxInfo"
                                            values={{
                                              val:
                                                process.env
                                                  .REACT_APP_LIMITED_NUM
                                            }}
                                          />
                                        );
                                      }
                                    }}
                                  ></span>
                                  <span
                                    style={{
                                      display: 'inline-block',
                                      fontSize: '1.375rem',
                                      lineHeight: '40px',
                                      verticalAlign: 'middle'
                                    }}
                                  >
                                    =
                                  </span>
                                  <span
                                    className="price"
                                    style={{
                                      display: 'inline-block',
                                      fontSize: '1.25rem',
                                      fontWeight: '400',
                                      verticalAlign: 'middle',
                                      marginLeft: '8px',
                                      height: '25px'
                                    }}
                                  >
                                    {formatMoney(
                                      el.subscribePrice * el.subscribeNum
                                    )}
                                  </span>
                                  <span
                                    className="price"
                                    style={{
                                      display: 'inline-block',
                                      fontSize: '1.25rem',
                                      fontWeight: '400',
                                      textDecoration: 'line-through',
                                      verticalAlign: 'middle',
                                      marginLeft: '8px',
                                      height: '.6875rem',
                                      color: '#aaa',
                                      fontSize: '.875rem'
                                    }}
                                  >
                                    {formatMoney(
                                      el.originalPrice * el.subscribeNum
                                    )}
                                  </span>
                                </div>
                              </div>
                              <div
                              // className="col-4 col-md-5"
                              // style={{ paddingLeft: '60px' }}
                              >
                                <div className="rc-card-content">
                                  <strong
                                    style={{
                                      display: 'inline-block',
                                      width: '50%'
                                    }}
                                  >
                                    <FormattedMessage id="subscription.frequency"></FormattedMessage>
                                    :
                                  </strong>
                                  <div
                                    className="rc-card__meta order-Id text-left"
                                    style={{
                                      fontSize: '1.25rem',
                                      marginTop: '.625rem',
                                      display: 'inline-block',
                                      marginLeft: '.625rem'
                                    }}
                                  >
                                    <Selection
                                      optionList={this.frequencyListOptions}
                                      selectedItemChange={(data) => {
                                        if (el.periodTypeId !== data.id) {
                                          el.periodTypeId = data.id;
                                          // el.periodTypeValue = data.valueEn;
                                          this.setState({ isDataChange: true });
                                        }
                                      }}
                                      selectedItemData={{
                                        value: el.periodTypeId
                                      }}
                                      key={index + '_' + el.periodTypeId}
                                    />
                                  </div>
                                </div>
                                <div className="rc-card-content">
                                  <strong
                                    style={{
                                      display: 'inline-block',
                                      width: '50%'
                                    }}
                                  >
                                    {/* Shipping Method: */}
                                    <FormattedMessage id="autoShipStarted" />
                                  </strong>
                                  <div
                                    className="rc-card__meta order-Id text-left"
                                    style={{
                                      marginTop: '.625rem',
                                      display: 'inline-block',
                                      marginLeft: '.625rem',
                                      fontSize: '1.25rem'
                                    }}
                                  >
                                    {getFormatDate(el.createTime.split(' ')[0])}
                                  </div>
                                </div>
                                <div className="rc-card-content">
                                  <strong
                                    style={{
                                      display: 'inline-block',
                                      width: '50%'
                                    }}
                                  >
                                    <LazyLoad>
                                      <img
                                        src={dateIcon}
                                        style={{
                                          display: 'inline-block',
                                          width: '1.25rem',
                                          verticalAlign: 'middle',
                                          marginRight: '8px'
                                        }}
                                      />
                                    </LazyLoad>
                                    <FormattedMessage id="nextShipment"></FormattedMessage>
                                    :
                                  </strong>
                                  <div
                                    className="rc-card__meta order-Id"
                                    style={{
                                      marginTop: '.625rem',
                                      display: 'inline-block',
                                      marginLeft: '.625rem',
                                      fontSize: '1.25rem'
                                    }}
                                  >
                                    <DatePicker
                                      className="receiveDate"
                                      placeholder="Select Date"
                                      dateFormat={datePickerConfig.format}
                                      locale={datePickerConfig.locale}
                                      // maxDate={this.getMaxDate(el.nextDeliveryTime)}
                                      minDate={
                                        this.getMinDate(el.nextDeliveryTime) ||
                                        this.state.minDate
                                      }
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
                                  </div>
                                </div>
                              </div>
                              {isGift && subDetail.subscribeStatus != 2
                                ? this.getButtonBoxGift(subDetail)
                                : null}
                            </div>
                          ))}
                      </div>
                      <div
                        className="card-container"
                        style={{
                          marginTop: '0',
                          display: isMobile ? 'none' : 'block',
                          borderBottom: 'none'
                        }}
                      >
                        {subDetail.goodsInfo &&
                          subDetail.goodsInfo.map((el, index) => (
                            <div
                              className="rc-margin-x--none"
                              style={{
                                padding: '1rem 0',
                                borderBottom: '1px solid #d7d7d7'
                              }}
                            >
                              <div className=" row align-items-center">
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
                                        <LazyLoad>
                                          <img
                                            src={el.goodsPic || IMG_DEFAULT}
                                            alt={el.goodsName}
                                          />
                                        </LazyLoad>
                                        {isClub && (
                                          <span
                                            className="rc-styled-link"
                                            onClick={this.showChangeProduct}
                                          >
                                            change product
                                          </span>
                                        )}
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
                                              className={`rc-icon rc-minus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-minus ${
                                                isActive && !isGift
                                                  ? ''
                                                  : 'disabled'
                                              }`}
                                              style={{ marginLeft: '-8px' }}
                                              onClick={() => {
                                                if (el.subscribeNum > 1) {
                                                  el.subscribeNum =
                                                    el.subscribeNum - 1;
                                                  this.doGetPromotionPrice();
                                                  this.setState({
                                                    subDetail,
                                                    isDataChange: true
                                                  });
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
                                                  if (
                                                    tmp >
                                                    process.env
                                                      .REACT_APP_LIMITED_NUM
                                                  ) {
                                                    tmp =
                                                      process.env
                                                        .REACT_APP_LIMITED_NUM;
                                                    this.showErrMsg(
                                                      <FormattedMessage
                                                        id="cart.errorMaxInfo"
                                                        values={{
                                                          val:
                                                            process.env
                                                              .REACT_APP_LIMITED_NUM
                                                        }}
                                                      />
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
                                              className={`rc-icon rc-plus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-plus ${
                                                isActive && !isGift
                                                  ? ''
                                                  : 'disabled'
                                              }`}
                                              onClick={() => {
                                                if (
                                                  el.subscribeNum <
                                                  process.env
                                                    .REACT_APP_LIMITED_NUM
                                                ) {
                                                  el.subscribeNum =
                                                    el.subscribeNum + 1;
                                                  this.doGetPromotionPrice();
                                                  this.setState({
                                                    subDetail,
                                                    isDataChange: true
                                                  });
                                                } else {
                                                  this.showErrMsg(
                                                    <FormattedMessage
                                                      id="cart.errorMaxInfo"
                                                      values={{
                                                        val:
                                                          process.env
                                                            .REACT_APP_LIMITED_NUM
                                                      }}
                                                    />
                                                  );
                                                }
                                              }}
                                            ></span>
                                            <span
                                              style={{
                                                display: 'inline-block',
                                                fontSize: '1.375rem',
                                                lineHeight: '40px',
                                                verticalAlign: 'middle'
                                              }}
                                            >
                                              =
                                            </span>
                                            <span
                                              className="price"
                                              style={{
                                                display: 'inline-block',
                                                fontSize: '1.25rem',
                                                fontWeight: '400',
                                                verticalAlign: 'middle',
                                                marginLeft: '8px',
                                                height: '25px'
                                              }}
                                            >
                                              {formatMoney(
                                                el.subscribePrice *
                                                  el.subscribeNum
                                              )}
                                            </span>
                                            <span
                                              className="price"
                                              style={{
                                                display: 'inline-block',
                                                fontSize: '1.25rem',
                                                fontWeight: '400',
                                                textDecoration: 'line-through',
                                                verticalAlign: 'middle',
                                                marginLeft: '8px',
                                                height: '.6875rem',
                                                color: '#aaa',
                                                fontSize: '.875rem'
                                              }}
                                            >
                                              {formatMoney(
                                                el.originalPrice *
                                                  el.subscribeNum
                                              )}
                                            </span>
                                          </div>
                                        </div>
                                        {this.DailyRation()}
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
                                    <strong
                                      style={{
                                        display: 'inline-block',
                                        width: '50%'
                                      }}
                                    >
                                      <FormattedMessage id="subscription.frequency"></FormattedMessage>
                                      :
                                    </strong>
                                    <div
                                      className="rc-card__meta order-Id text-left"
                                      style={{
                                        marginTop: '.625rem',
                                        display: 'inline-block',
                                        marginLeft: '.625rem',
                                        fontSize: '1.25rem'
                                      }}
                                    >
                                      <Selection
                                        optionList={this.frequencyListOptions}
                                        selectedItemChange={(data) => {
                                          if (el.periodTypeId !== data.id) {
                                            el.periodTypeId = data.id;
                                            // el.periodTypeValue = data.valueEn;
                                            this.setState({
                                              isDataChange: true
                                            });
                                          }
                                        }}
                                        selectedItemData={{
                                          value: el.periodTypeId
                                        }}
                                        key={index + '_' + el.periodTypeId}
                                        disabled={!isActive || isGift}
                                      />
                                    </div>
                                  </div>
                                  <div className="rc-card-content">
                                    <strong
                                      style={{
                                        display: 'inline-block',
                                        width: '50%'
                                      }}
                                    >
                                      {/* Shipping Method: */}
                                      <FormattedMessage id="autoShipStarted" />
                                    </strong>
                                    <div
                                      className="rc-card__meta order-Id text-left"
                                      style={{
                                        marginTop: '.625rem',
                                        display: 'inline-block',
                                        marginLeft: '.625rem',
                                        fontSize: '1.25rem'
                                      }}
                                    >
                                      {getFormatDate(
                                        el.createTime.split(' ')[0]
                                      )}
                                      {/* <FormattedDate value={el.createTime.split(' ')[0]}/> */}
                                    </div>
                                  </div>
                                  <div className="rc-card-content">
                                    <strong
                                      style={{
                                        display: 'inline-block',
                                        width: '50%'
                                      }}
                                    >
                                      <LazyLoad>
                                        <img
                                          src={dateIcon}
                                          style={{
                                            display: 'inline-block',
                                            width: '1.25rem',
                                            verticalAlign: 'middle',
                                            marginRight: '8px'
                                          }}
                                        />
                                      </LazyLoad>
                                      <FormattedMessage id="nextShipment"></FormattedMessage>
                                      :
                                    </strong>
                                    <div
                                      className="rc-card__meta order-Id"
                                      style={{
                                        marginTop: '.625rem',
                                        display: 'inline-block',
                                        marginLeft: '.625rem',
                                        fontSize: '1.25rem'
                                      }}
                                    >
                                      <DatePicker
                                        className="receiveDate"
                                        placeholder="Select Date"
                                        dateFormat={datePickerConfig.format}
                                        locale={datePickerConfig.locale}
                                        // maxDate={this.getMaxDate(el.nextDeliveryTime)}
                                        minDate={
                                          this.getMinDate(
                                            el.nextDeliveryTime
                                          ) || this.state.minDate
                                        }
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
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {isGift && subDetail.subscribeStatus != 2
                                ? this.getButtonBoxGift(subDetail)
                                : null}
                            </div>
                          ))}
                      </div>
                      {!isGift && this.getButtonBox(subDetail)}
                      <h4 className="h4">
                        <FormattedMessage id="transactionInfo" />
                      </h4>
                      <div className="row text-left text-break editCard ml-0 mr-0">
                        <div
                          className="col-12 col-md-4 mb-2"
                          style={{ padding: '5px', paddingLeft: '0' }}
                        >
                          <div
                            style={{
                              border: '1px solid #d7d7d7',
                              padding: '1.25rem',
                              height: '225px'
                            }}
                          >
                            <div className="align-items-center">
                              {/* <em className="rc-icon rc-delivery--sm rc-brand1 ml-1 mr-1 mt-1" /> */}
                              <LazyLoad>
                                <img
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
                              <p className="mb-0">
                                <span
                                  className="medium"
                                  style={{
                                    fontSize: '1.125rem',
                                    color: '#333',
                                    margin: '25px 0 .625rem'
                                  }}
                                >
                                  {currentDeliveryAddress.consigneeName}
                                </span>
                              </p>
                              <p className="mb-0">
                                {currentDeliveryAddress.consigneeNumber}
                              </p>
                              <p className="mb-0">
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
                                ,{/* 省份 / State */}
                                {currentDeliveryAddress?.province &&
                                currentDeliveryAddress?.province != null
                                  ? currentDeliveryAddress.province + ', '
                                  : null}
                                {currentDeliveryAddress.city}
                              </p>
                              <p className="mb-0">
                                {currentDeliveryAddress.address1}
                              </p>
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
                              padding: '1.25rem',
                              height: '225px'
                            }}
                          >
                            <div className="align-items-center">
                              <LazyLoad>
                                <img
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
                                {this.state.countryList.length &&
                                this.state.countryList.filter(
                                  (el) =>
                                    el.id === currentBillingAddress.countryId
                                ).length
                                  ? this.state.countryList.filter(
                                      (el) =>
                                        el.id ===
                                        currentBillingAddress.countryId
                                    )[0].valueEn
                                  : currentBillingAddress.countryId}
                                ,{/* 省份 / State */}
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
                        {currentCardInfo ? (
                          <div
                            className="col-12 col-md-4 mb-2"
                            style={{ padding: '5px', paddingRight: '0' }}
                          >
                            <div
                              style={{
                                border: '1px solid #d7d7d7',
                                padding: '1.25rem',
                                height: '225px'
                              }}
                            >
                              <div className="align-items-center">
                                <LazyLoad style={{ display: 'inline' }}>
                                  <img
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
                                        alt="card-background"
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
                                <p className="mb-0">{currentCardInfo.phone}</p>
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </div>
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
                                {this.state.activeTabIdx === 0 &&
                                noStartYearOption.length &&
                                completedYearOption.length ? (
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
                                    <>
                                      <div className="card-container">
                                        <div className="card rc-margin-y--none ml-0">
                                          <div
                                            className="1111 card-header row rc-margin-x--none align-items-center pl-0 pr-0"
                                            style={{
                                              background: '#f9f9f9',
                                              height: '60px',
                                              padding: 0
                                            }}
                                          >
                                            <div
                                              className={`${
                                                isMobile ? 'col-4' : 'col-md-3'
                                              }`}
                                              style={{
                                                padding: isMobile
                                                  ? '0 0 0 .625rem'
                                                  : '0 .9375rem 0 1.25rem'
                                              }}
                                            >
                                              <FormattedMessage id="shipmentOn" />
                                              :
                                              <br />
                                              <span
                                                style={{
                                                  color: '#e2001a',
                                                  fontWeight: '400'
                                                }}
                                              >
                                                {getFormatDate(
                                                  el.tradeItems[0].nextDeliveryTime.split(
                                                    ' '
                                                  )[0]
                                                )}
                                                {/* <FormattedDate value={el.tradeItems[0].nextDeliveryTime.split(' ')[0]}/> */}
                                                {/* {
                                                  el.tradeItems[0].nextDeliveryTime.split(' ')[0]
                                                } */}
                                              </span>
                                            </div>
                                            <div
                                              className={`${
                                                isMobile ? 'col-0' : 'col-md-5'
                                              }`}
                                            ></div>
                                            <div
                                              className={`changeDate ${
                                                isMobile
                                                  ? 'col-5'
                                                  : 'col-md-3 pl-4'
                                              }`}
                                              style={{
                                                textAlign: 'right',
                                                padding: isMobile
                                                  ? '0'
                                                  : '0 1.25rem 0 .9375rem'
                                              }}
                                            >
                                              {isActive ? (
                                                <>
                                                  <LazyLoad>
                                                    <img
                                                      src={dateIcon}
                                                      style={{
                                                        width: '1.25rem',
                                                        display: 'inline'
                                                      }}
                                                    />
                                                  </LazyLoad>
                                                  <span
                                                    style={{
                                                      color: '#666',
                                                      fontWeight: '400',
                                                      marginLeft: '5px',
                                                      borderBottom:
                                                        '1px solid #666',
                                                      cursor: 'pointer'
                                                    }}
                                                  >
                                                    <DatePicker
                                                      className="receiveDate subs-receiveDate"
                                                      placeholder="Select Date"
                                                      dateFormat={
                                                        datePickerConfig.format
                                                      }
                                                      locale={
                                                        datePickerConfig.locale
                                                      }
                                                      // maxDate={this.getMaxDate(el.tradeItems[0].nextDeliveryTime)}
                                                      minDate={
                                                        this.getMinDate(
                                                          el.tradeItems[0]
                                                            .nextDeliveryTime
                                                        ) || this.state.minDate
                                                      }
                                                      selected={
                                                        el.tradeItems
                                                          ? new Date(
                                                              el.tradeItems[0].nextDeliveryTime
                                                            )
                                                          : new Date()
                                                      }
                                                      onChange={(date) => {
                                                        this.setState({
                                                          modalType:
                                                            'changeDate',
                                                          modalShow: true,
                                                          currentModalObj: this.state.modalList.filter(
                                                            (el) =>
                                                              el.type ===
                                                              'changeDate'
                                                          )[0],
                                                          currentChangeDate: date,
                                                          currentChangeItem: el.tradeItems.map(
                                                            (el) => {
                                                              return {
                                                                skuId: el.skuId
                                                              };
                                                            }
                                                          )
                                                        });
                                                      }}
                                                    />
                                                  </span>
                                                </>
                                              ) : null}
                                            </div>
                                            <div
                                              className={`${
                                                isMobile ? 'col-3' : 'col-md-1'
                                              }`}
                                              style={{
                                                padding: isMobile
                                                  ? '0 0 0 .625rem'
                                                  : '0'
                                              }}
                                            >
                                              {isActive ? (
                                                <>
                                                  <LazyLoad>
                                                    <img
                                                      style={{
                                                        display: 'inline-block',
                                                        width: '1.25rem',
                                                        marginRight: '5px'
                                                      }}
                                                      src={skipIcon}
                                                    />
                                                  </LazyLoad>
                                                  <a
                                                    className="rc-styled-link"
                                                    href="#/"
                                                    onClick={(e) => {
                                                      e.preventDefault();
                                                      this.setState({
                                                        modalType: 'skipNext',
                                                        modalShow: true,
                                                        currentModalObj: this.state.modalList.filter(
                                                          (el) =>
                                                            el.type ===
                                                            'skipNext'
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
                                                    <FormattedMessage id="skip" />
                                                  </a>
                                                </>
                                              ) : null}
                                            </div>
                                          </div>
                                        </div>
                                        {el.tradeItems &&
                                          el.tradeItems.map(
                                            (tradeItem, index) => (
                                              <div
                                                className="row rc-margin-x--none row align-items-center 2"
                                                style={{
                                                  padding: '1rem 0',
                                                  borderBottom:
                                                    '1px solid #d7d7d7'
                                                }}
                                                key={index}
                                              >
                                                <div
                                                  className={`${
                                                    isMobile ? 'col-6' : 'col-4'
                                                  } col-md-4`}
                                                >
                                                  <div
                                                    className="rc-layout-container rc-five-column"
                                                    style={{
                                                      paddingRight: isMobile
                                                        ? '0'
                                                        : '60px',
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
                                                          alt="trade-item"
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
                                                            textOverflow:
                                                              'ellipsis',
                                                            overflowWrap:
                                                              'normal',
                                                            fontSize: '.875rem',
                                                            width: isMobile
                                                              ? '95px'
                                                              : 'auto'
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
                                                            fontSize: '.875rem'
                                                          }}
                                                        >
                                                          {
                                                            tradeItem.specDetails
                                                          }{' '}
                                                          {isMobile
                                                            ? `x ${tradeItem.num}`
                                                            : null}
                                                        </p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div
                                                  className={`${
                                                    isMobile ? 'none' : 'col-4'
                                                  } col-md-4`}
                                                >
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
                                                <div
                                                  className={`${
                                                    isMobile ? 'col-6' : 'col-4'
                                                  } col-md-4`}
                                                >
                                                  <p
                                                    style={{
                                                      textAlign: 'right',
                                                      paddingRight: '.625rem',
                                                      marginBottom: '0'
                                                    }}
                                                  >
                                                    <span className="red">
                                                      {formatMoney(
                                                        tradeItem.price
                                                      )}
                                                    </span>
                                                    <span
                                                      style={{
                                                        fontSize: '.75rem',
                                                        textDecoration:
                                                          'line-through',
                                                        marginLeft: '5px'
                                                      }}
                                                    >
                                                      {formatMoney(
                                                        tradeItem.originalPrice
                                                      )}
                                                    </span>
                                                  </p>
                                                </div>
                                              </div>
                                            )
                                          )}
                                        <div
                                          className="row rc-margin-x--none row align-items-center 3"
                                          style={{
                                            padding: '1rem 0'
                                            // borderBottom: '1px solid #d7d7d7'
                                          }}
                                        >
                                          <div className={`col-12 col-md-6`}>
                                            <div
                                              className="footer"
                                              style={{
                                                marginTop: '.625rem',
                                                marginBottom: '.625rem',
                                                padding: '0 40px',
                                                display: 'none'
                                                // display:
                                                //   subDetail.subscribeStatus ===
                                                //   '0'
                                                //     ? 'block'
                                                //     : 'none'
                                              }}
                                            >
                                              <span
                                                className="rc-input rc-input--inline rc-input--label"
                                                style={{
                                                  width: isMobile
                                                    ? '50%'
                                                    : '170px',
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
                                                    this.state
                                                      .promotionInputValue
                                                  }
                                                  onChange={(e) =>
                                                    this.handlerChange(e)
                                                  }
                                                />
                                                <label
                                                  className="rc-input__label"
                                                  htmlFor="id-text2"
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
                                                style={{ marginTop: '.625rem' }}
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
                                                    this.state
                                                      .promotionInputValue
                                                  );
                                                  if (
                                                    !result.context
                                                      .promotionFlag
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
                                                <FormattedMessage id="apply" />
                                              </button>
                                            </div>
                                          </div>
                                          <div className={`col-12 col-md-6`}>
                                            <div className="text-right">
                                              <div className="row">
                                                <div className="col-1 col-md-3" />
                                                <label className="col-5 text-left">
                                                  <FormattedMessage id="subscription.total" />
                                                </label>
                                                <div className="col-5 col-md-3 text-right">
                                                  <strong>
                                                    {formatMoney(
                                                      el.tradePrice.goodsPrice
                                                    )}
                                                  </strong>
                                                </div>
                                              </div>
                                              {el.tradePrice
                                                .subscriptionDiscountPrice ? (
                                                <div className="row">
                                                  <div className="col-1 col-md-3" />
                                                  <label className="green col-5 text-left">
                                                    <FormattedMessage id="promotion" />
                                                    :
                                                  </label>
                                                  <div className="col-5 col-md-3 text-right green">
                                                    <strong>
                                                      -
                                                      {formatMoney(
                                                        el.tradePrice
                                                          .subscriptionDiscountPrice
                                                      )}
                                                    </strong>
                                                  </div>
                                                </div>
                                              ) : null}
                                              {el.tradePrice
                                                .promotionDiscountPrice
                                                ? el.tradePrice.promotionVOList?.map(
                                                    (el) => (
                                                      <div className="row">
                                                        <div className="col-1 col-md-3" />
                                                        <label className="green col-5 text-left">
                                                          {el.marketingName}:
                                                        </label>
                                                        <div className="col-5 col-md-3 text-right green">
                                                          <strong>
                                                            -
                                                            {formatMoney(
                                                              el.discountPrice
                                                            )}
                                                          </strong>
                                                        </div>
                                                      </div>
                                                    )
                                                  )
                                                : null}
                                              {!this.state.isShowValidCode &&
                                                discount.map((el, i) => (
                                                  <div className="row" key={i}>
                                                    <div className="col-1 col-md-3" />
                                                    <label
                                                      className="red-text col-5"
                                                      style={{
                                                        flex: isMobile
                                                          ? '1'
                                                          : 'inherit'
                                                      }}
                                                    >
                                                      {this.state.promotionDesc}
                                                    </label>
                                                    <div
                                                      className="text-right red-text col-5 col-md-3"
                                                      style={{
                                                        position: 'relative',
                                                        flex: isMobile
                                                          ? '1'
                                                          : 'inherit'
                                                      }}
                                                    >
                                                      <strong>
                                                        -
                                                        {formatMoney(
                                                          this.state
                                                            .promotionDiscount
                                                        )}
                                                      </strong>
                                                      <span
                                                        style={{
                                                          position: 'absolute',
                                                          right: '-1.125rem',
                                                          fontSize: '1.375rem',
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
                                              <div className="row">
                                                <div className="col-1 col-md-3" />
                                                <label className="col-5 text-left">
                                                  <FormattedMessage id="subscription.shipping" />
                                                </label>
                                                <div className="text-right red-text col-5 col-md-3">
                                                  <strong>
                                                    {formatMoney(
                                                      el.tradePrice
                                                        .deliveryPrice
                                                    )}
                                                  </strong>
                                                </div>
                                              </div>

                                              {/* 税额 */}
                                              {customTaxSettingOpenFlag == 0 &&
                                              enterPriceType == 1 ? (
                                                <div className="row">
                                                  <div className="col-1 col-md-3" />
                                                  <label className="col-5 text-left">
                                                    <FormattedMessage id="estimatedTax" />
                                                  </label>
                                                  <div className="text-right red-text col-5 col-md-3">
                                                    <strong>
                                                      {formatMoney(
                                                        el.tradePrice
                                                          .taxFeePrice
                                                      )}
                                                    </strong>
                                                  </div>
                                                </div>
                                              ) : null}
                                              <div className="row">
                                                <div className="col-1 col-md-3" />
                                                <label className="col-5 text-left">
                                                  <strong
                                                    style={{
                                                      fontSize: '1.25rem',
                                                      color: '#333'
                                                    }}
                                                  >
                                                    <FormattedMessage id="order.total" />
                                                  </strong>{' '}
                                                  <span
                                                    style={{
                                                      fontSize: '.75rem'
                                                    }}
                                                  >
                                                    <FormattedMessage
                                                      id="order.iVAIncluido"
                                                      defaultMessage=" "
                                                    />
                                                  </span>
                                                </label>
                                                <div className="text-right col-5 col-md-3">
                                                  <strong>
                                                    {formatMoney(
                                                      el.tradePrice.totalPrice
                                                    )}
                                                  </strong>
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
                                subDetail.completedTradeList
                                  .filter(
                                    (el) =>
                                      completedYear &&
                                      el.tradeState.createTime.split('-')[0] ===
                                        completedYear.value
                                  )
                                  .map((el, i) => (
                                    <div className="card-container" key={i}>
                                      <div className="card rc-margin-y--none ml-0">
                                        <div
                                          className="2222 card-header row rc-margin-x--none align-items-center pl-0 pr-0"
                                          style={{
                                            background: '#f9f9f9',
                                            height: '75px'
                                          }}
                                        >
                                          <div
                                            className={`${
                                              isMobile ? 'col-5' : 'col-md-3'
                                            }`}
                                            style={{ paddingLeft: '1.25rem' }}
                                          >
                                            <FormattedMessage id="shipmentOn" />
                                            :{' '}
                                            <span
                                              style={{
                                                color: '#e2001a',
                                                fontWeight: '400'
                                              }}
                                            >
                                              {getFormatDate(
                                                el.tradeState.createTime.split(
                                                  ' '
                                                )[0]
                                              )}
                                              {/* <FormattedDate value={el.tradeState.createTime.split(' ')[0]}/> */}
                                            </span>
                                          </div>
                                          {isMobile ? null : (
                                            <div className="col-12 col-md-3"></div>
                                          )}
                                          {isMobile ? null : (
                                            <div className="col-12 col-md-3 pl-4">
                                              {[
                                                {
                                                  text: (
                                                    <FormattedMessage id="promotion" />
                                                  ),
                                                  price:
                                                    el.tradePrice.discountsPrice
                                                }
                                              ]
                                                .filter((ele) => ele.price > 0)
                                                .map((ele, i) => (
                                                  <React.Fragment key={i}>
                                                    {ele.text}:{' '}
                                                    <span
                                                      className="green"
                                                      style={{
                                                        fontWeight: '400'
                                                      }}
                                                    >
                                                      -{formatMoney(ele.price)}
                                                    </span>
                                                    <br />
                                                  </React.Fragment>
                                                ))}
                                            </div>
                                          )}
                                          <div
                                            className="col-7 col-md-3"
                                            style={{
                                              padding: isMobile
                                                ? '0'
                                                : '0 .9375rem'
                                            }}
                                          >
                                            {isMobile ? (
                                              <>
                                                <div
                                                  style={{ textAlign: 'right' }}
                                                >
                                                  {el.id ? (
                                                    <>
                                                      <em className="greenCircle" />
                                                      <span>
                                                        {
                                                          el.tradeState
                                                            .orderStatus
                                                        }
                                                      </span>
                                                      <Link
                                                        className="rc-icon rc-right rc-iconography"
                                                        to={`/account/orders/detail/${el.id}`}
                                                      />
                                                    </>
                                                  ) : (
                                                    <>
                                                      <em className="yellowCircle" />
                                                      <span
                                                        style={{
                                                          paddingRight: '30px'
                                                        }}
                                                      >
                                                        <FormattedMessage id="skiped" />
                                                      </span>
                                                    </>
                                                  )}
                                                </div>
                                              </>
                                            ) : el.id ? (
                                              <>
                                                <LazyLoad>
                                                  <img
                                                    style={{
                                                      display: 'inline-block',
                                                      width: '1.25rem',
                                                      marginRight: '5px'
                                                    }}
                                                    src={dateIcon}
                                                  />
                                                </LazyLoad>
                                                <Link
                                                  className="rc-styled-link"
                                                  to={`/account/orders/detail/${el.id}`}
                                                >
                                                  <FormattedMessage id="orderDetail" />
                                                </Link>
                                              </>
                                            ) : null}
                                          </div>
                                        </div>
                                      </div>
                                      {/* {subDetail.goodsInfo &&
                                    subDetail.goodsInfo.map((el, index) => ( */}
                                      <div
                                        className="row rc-margin-x--none row align-items-center 4"
                                        style={{
                                          padding: '1rem 0',
                                          borderBottom: '1px solid #d7d7d7'
                                        }}
                                      >
                                        {isMobile ? (
                                          <div className="col-8 col-md-6">
                                            {el.tradeItems &&
                                              el.tradeItems.map(
                                                (tradeItem, index) => {
                                                  if (index < 2) {
                                                    return (
                                                      <>
                                                        <LazyLoad>
                                                          <img
                                                            style={{
                                                              width: '70px',
                                                              margin:
                                                                '0 .625rem',
                                                              display: 'inline'
                                                            }}
                                                            src={tradeItem.pic}
                                                            alt="trade-item"
                                                          />
                                                        </LazyLoad>
                                                        <div
                                                          className="v-center"
                                                          style={{
                                                            width: '95px',
                                                            verticalAlign:
                                                              'middle',
                                                            display:
                                                              'inline-block'
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
                                                              fontSize:
                                                                '.875rem',
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
                                                              fontSize:
                                                                '.875rem'
                                                            }}
                                                          >
                                                            {
                                                              tradeItem.specDetails
                                                            }
                                                            &nbsp;&nbsp;x{' '}
                                                            {tradeItem.num}
                                                          </p>
                                                        </div>
                                                      </>
                                                    );
                                                  }
                                                }
                                              )}
                                          </div>
                                        ) : (
                                          <div className="col-4 col-md-7">
                                            <div
                                              className="rc-layout-container rc-five-column pt-0"
                                              style={{
                                                paddingRight: '60px'
                                              }}
                                            >
                                              <div className="rc-column flex-layout p-0 w-100">
                                                {el.tradeItems &&
                                                  el.tradeItems.map(
                                                    (tradeItem, index) => {
                                                      if (index < 2) {
                                                        return (
                                                          <>
                                                            <LazyLoad>
                                                              <img
                                                                style={{
                                                                  width: '70px',
                                                                  margin:
                                                                    '0 .625rem'
                                                                }}
                                                                src={
                                                                  tradeItem.pic
                                                                }
                                                                alt="trade-item"
                                                              />
                                                            </LazyLoad>
                                                            <div
                                                              style={{
                                                                width: isMobile
                                                                  ? '120px'
                                                                  : 'auto',
                                                                paddingTop:
                                                                  '30px'
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
                                                                  fontSize:
                                                                    '.875rem',
                                                                  whiteSpace:
                                                                    'nowrap'
                                                                }}
                                                              >
                                                                {
                                                                  tradeItem.skuName
                                                                }
                                                              </h5>
                                                              <p
                                                                style={{
                                                                  overflow:
                                                                    'hidden',
                                                                  textOverflow:
                                                                    'ellipsis',
                                                                  marginBottom:
                                                                    '8px',
                                                                  fontSize:
                                                                    '.875rem'
                                                                }}
                                                              >
                                                                {
                                                                  tradeItem.specDetails
                                                                }{' '}
                                                                x{' '}
                                                                {tradeItem.num}
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
                                        )}
                                        {isMobile ? null : (
                                          <div className="col-4 col-md-3">
                                            <div
                                              style={{ textAlign: 'center' }}
                                            >
                                              {el.id ? (
                                                <>
                                                  <em className="greenCircle" />
                                                  <span>
                                                    {el.tradeState.orderStatus}
                                                  </span>
                                                </>
                                              ) : (
                                                <>
                                                  <em className="yellowCircle" />
                                                  <span>
                                                    <FormattedMessage id="skiped" />
                                                  </span>
                                                </>
                                              )}
                                            </div>
                                          </div>
                                        )}
                                        <div
                                          className="col-4 col-md-2"
                                          style={{ textAlign: 'center' }}
                                        >
                                          {formatMoney(
                                            el.tradePrice.totalPrice
                                          )}
                                        </div>
                                      </div>
                                      {/* ))} */}
                                    </div>
                                  ))}
                            </div>
                          </div>
                        </div>
                        {isGift && this.getGiftList()}
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
          {this.addNewCatModal()}
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
                Your product recommendation
              </h4>
              <p className="text-center">Please choose your options</p>
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
              cancelBtnText="See other recommendation"
              confirmBtnText="Choose this product"
              modalTitle={''}
              cancel={this.closeAndShowChangeProduct}
              hanldeClickConfirm={this.showChangeRecommendation}
              close={this.closeProdutctDetail}
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
