import React from 'react';
import Skeleton from 'react-skeleton-loader';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BreadCrumbs from '@/components/BreadCrumbs';
import ImageMagnifier from '@/components/ImageMagnifier';
import LoginButton from '@/components/LoginButton';
import ConfirmTooltip from '@/components/ConfirmTooltip';
import Reviews from './components/Reviews';
import RelatedProduct from './components/RelatedProduct';
import Rate from '@/components/Rate';
import PetModal from '@/components/PetModal';
import { formatMoney, translateHtmlCharater, queryProps } from '@/utils/utils';
import { STORE_CATE_ENUM } from '@/utils/constant';
import { FormattedMessage, injectIntl } from 'react-intl';
import { cloneDeep, findIndex, find } from 'lodash';
import { getDetails, getLoginDetails } from '@/api/details';
import { sitePurchase } from '@/api/cart';
import { getDict } from '@/api/dict';
import './index.css';
import HeroCarousel from './components/HeroCarousel';
import { getProductPetConfig } from '@/api/payment';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

function Advantage() {
  return (
    {
      en: (
        <div className="rc-bg-colour--brand4">
          <div className="reassurance-banner rc-max-width--xl rc-padding-x--sm rc-margin-bottom--sm">
            <div className="rc-layout-container rc-four-column rc-text--center rc-content-h-middle">
              <div className="rc-column rc-padding-y--xs">
                <div className="reassurance-banner__item rc-text--left">
                  <span className="rc-header-with-icon rc-header-with-icon--gamma">
                    <span className="rc-icon rc-vet--sm rc-brand1 rc-iconography"></span>
                    The Royal Canin Pet Advisor Live app to answer all your pet
                    questions
                  </span>
                </div>
              </div>
              <div className="rc-column rc-padding-y--xs">
                <div className="reassurance-banner__item rc-text--left">
                  <span className="rc-header-with-icon rc-header-with-icon--gamma">
                    <span className="rc-icon rc-delivery--sm rc-brand1 rc-iconography"></span>
                    Free shipping and 5% off every autoship order
                  </span>
                </div>
              </div>
              <div className="rc-column rc-padding-y--xs">
                <div className="reassurance-banner__item rc-text--left">
                  <span className="rc-header-with-icon rc-header-with-icon--gamma">
                    <span className="rc-icon rc-low-maintenance--sm rc-brand1 rc-iconography"></span>
                    Welcome box with pet essentials
                  </span>
                </div>
              </div>
              <div className="rc-column rc-padding-y--xs">
                <div className="reassurance-banner__item rc-text--left">
                  <span className="rc-header-with-icon rc-header-with-icon--gamma">
                    <span className="rc-icon rc-food--sm rc-brand1 rc-iconography"></span>
                    Personalized product recommendations
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }[process.env.REACT_APP_LANG] || null
  );
}
@inject('checkoutStore', 'loginStore', 'headerCartStore')
@injectIntl
@observer
class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initing: true,
      details: {
        id: '',
        goodsName: '',
        goodsImg:
          'https://wanmi-b2b.oss-cn-shanghai.aliyuncs.com/202004142026536251.jpg',
        goodsDescription: '',
        sizeList: [],
        images: [],
        goodsCategory: '',
        goodsSpecDetails: [],
        goodsSpecs: []
      },
      activeTabIdx: 0,
      goodsDetailTab: {
        tabName: [],
        tabContent: []
      },
      quantity: 1,
      stock: 0,
      instockStatus: true,
      quantityMinLimit: 1,
      quantityMaxLimit: 30,
      currentUnitPrice: 0,
      currentLinePrice: 0,
      currentSubscriptionPrice: 0,
      imageMagnifierCfg: {
        show: false
        // config: {},
      },
      loading: true,
      errMsg: '',
      checkOutErrMsg: '',
      addToCartLoading: false,
      tradePrice: '',
      specList: [],
      tabsValue: [],
      petModalVisible: false,
      isAdd: 0,
      productRate: 0,
      replyNum: 0,
      goodsId: null,
      minMarketPrice: 0,
      minSubscriptionPrice: 0,
      toolTipVisible: false,
      relatedProduct: []
    };
    this.hanldeAmountChange = this.hanldeAmountChange.bind(this);
    this.handleAmountInput = this.handleAmountInput.bind(this);
    this.handleChooseSize = this.handleChooseSize.bind(this);
    this.headerRef = React.createRef();

    this.specie = '';
    this.productRange = [];
    this.format = [];
  }
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  componentDidMount() {
    // if (localItemRoyal.get('isRefresh')) {
    //   localItemRoyal.remove('isRefresh');
    //   window.location.reload();
    //   return false;
    // }
    this.setState({ id: this.props.match.params.id }, () =>
      this.queryDetails()
    );
  }
  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  get checkoutStore() {
    return this.props.checkoutStore;
  }
  matchGoods() {
    let {
      specList,
      details,
      currentUnitPrice,
      currentLinePrice,
      currentSubscriptionPrice,
      stock
    } = this.state;
    let selectedArr = [];
    let idArr = [];
    let baseSpecId = details.baseSpec;
    specList.map((el) => {
      if (el.chidren.filter((item) => item.selected).length) {
        selectedArr.push(el.chidren.filter((item) => item.selected)[0]);
      }
    });
    selectedArr = selectedArr.sort((a, b) => a.specDetailId - b.specDetailId);
    idArr = selectedArr.map((el) => el.specDetailId);
    currentUnitPrice = details.marketPrice;

    details.sizeList.map((item, i) => {
      item.basePrice = 0;
      details.goodsSpecDetails.map((el) => {
        if (
          el.specId === baseSpecId &&
          item.mockSpecDetailIds.includes(el.specDetailId)
        ) {
          item.baseSpecLabel = el.detailName;
        }
      });
      let specTextArr = [];
      for (let specItem of specList) {
        for (let specDetailItem of specItem.chidren) {
          if (
            item.mockSpecIds.includes(specDetailItem.specId) &&
            item.mockSpecDetailIds.includes(specDetailItem.specDetailId)
          ) {
            specTextArr.push(specDetailItem.detailName);
          }
          // console.log(item.mo)
          if (
            item.mockSpecIds.includes(baseSpecId) &&
            item.mockSpecDetailIds.includes(specDetailItem.specDetailId)
          ) {
            console.log(
              specDetailItem.detailName,
              'specDetailItem.detailName',
              i
            );
            item.baseSpecLabel = specDetailItem.detailName;
          }
        }
      }
      item.specText = specTextArr.join(' ');
      if (item.mockSpecDetailIds.sort().join(',') === idArr.join(',')) {
        item.selected = true;
        currentUnitPrice = item.salePrice;
        currentLinePrice = item.linePrice;
        currentSubscriptionPrice = item.subscriptionPrice;
        stock = item.stock;
      } else {
        item.selected = false;
      }
    });
    console.log(details, 'details');
    this.setState(
      {
        details,
        currentUnitPrice,
        currentLinePrice,
        currentSubscriptionPrice,
        stock
      },
      () => {
        this.updateInstockStatus();
      }
    );
  }
  async queryDetails() {
    const { id } = this.state;
    const tmpRequest = this.isLogin ? getLoginDetails : getDetails;
    Promise.all([tmpRequest(id)])
      .then((resList) => {
        const res = resList[0];
        if (res && res.context) {
          this.setState({
            productRate: res.context.avgEvaluate
          });
        }
        if (res && res.context && res.context.goods) {
          console.log(202, this);
          this.setState({
            productRate: res.context.goods.avgEvaluate,
            replyNum: res.context.goods.goodsEvaluateNum,
            goodsId: res.context.goods.goodsId,
            minMarketPrice: res.context.goods.minMarketPrice,
            minSubscriptionPrice: res.context.goods.minSubscriptionPrice
          });
        } else {
          this.setState({
            errMsg: <FormattedMessage id="details.errMsg" />
          });
        }
        if (res && res.context && res.context.goodsSpecDetails) {
          // 获取产品所属类别
          let tmpSpecie =
            find(res.context.storeCates, (ele) =>
              ele.cateName.toLowerCase().includes('dog')
            ) && 'Dog';
          if (!tmpSpecie) {
            tmpSpecie =
              find(res.context.storeCates, (ele) =>
                ele.cateName.toLowerCase().includes('cat')
              ) && 'Cat';
          }
          this.specie = tmpSpecie;

          // 获取产品所属home页四个大类
          for (let item of res.context.storeCates) {
            const t = find(STORE_CATE_ENUM, (ele) =>
              ele.cateName.includes(item.cateName)
            );
            if (t) {
              this.productRange.push(t.text);
            }
          }
          // 获取产品Dry/Wet属性
          let tmpFormat = [];
          queryProps().then((propsRes) => {
            for (let item of res.context.goodsPropDetailRels) {
              const t = find(
                propsRes || [],
                (ele) => ele.propId == item.propId
              );
              // 区分cat or dog(de)
              if (t && t.propName.includes('Spezies')) {
                const t3 = find(
                  t.goodsPropDetails,
                  (ele) => ele.detailId == item.detailId
                );
                if (t3) {
                  this.specie =
                    { Hund: 'Dog', Katze: 'Cat' }[t3.detailName] || '';
                }
              }
              if (
                t &&
                (t.propName.includes('Seco') ||
                  t.propName.includes('Technologie'))
              ) {
                const t2 = find(
                  t.goodsPropDetails,
                  (ele) => ele.detailId == item.detailId
                );
                if (t2) {
                  tmpFormat.push(
                    { Seco: 'Dry', Húmedo: 'Wet', Nass: 'Wet', Trocken: 'Dry' }[
                      t2.detailName
                    ] || ''
                  );
                }
              }
            }
            this.format = tmpFormat;
          });

          let specList = res.context.goodsSpecs;
          let specDetailList = res.context.goodsSpecDetails;
          specList.map((sItem) => {
            sItem.chidren = specDetailList.filter((sdItem, i) => {
              return sdItem.specId === sItem.specId;
            });
            sItem.chidren[0].selected = true;
          });
          console.log(specList, 'specList');
          // this.setState({ specList });
          let sizeList = [];
          let goodsInfos = res.context.goodsInfos || [];

          sizeList = goodsInfos.map((g) => {
            // const targetInfo = find(goodsInfos, info => info.mockSpecDetailIds.includes(g.specDetailId))
            // console.log(targetInfo, 'target')
            // if (targetInfo) {
            g = Object.assign({}, g, { selected: false });
            // }
            return g;
          });

          // const selectedSize = find(sizeList, s => s.selected)

          const { goodsDetailTab } = this.state;
          try {
            let tmpGoodsDetail = res.context.goods.goodsDetail;
            if (tmpGoodsDetail) {
              tmpGoodsDetail = JSON.parse(tmpGoodsDetail);
              for (let key in tmpGoodsDetail) {
                if (tmpGoodsDetail[key]) {
                  goodsDetailTab.tabName.push(key);
                  goodsDetailTab.tabContent.push(tmpGoodsDetail[key]);
                  // goodsDetailTab.tabContent.push(translateHtmlCharater(tmpGoodsDetail[key]))
                }
              }
            }
            this.setState({
              goodsDetailTab: goodsDetailTab
            });
          } catch (err) {
            getDict({
              type: 'goodsDetailTab',
              storeId: process.env.REACT_APP_STOREID
            }).then((res) => {
              goodsDetailTab.tabName = res.context.sysDictionaryVOS.map(
                (ele) => ele.name
              );
              this.setState({
                goodsDetailTab: goodsDetailTab
              });
            });
          }
          let images = [];
          if (res.context.goodsInfos.every((el) => !el.goodsInfoImg)) {
            if (res.context.images.length) {
              images = res.context.images;
            }
          } else {
            images = res.context.goodsInfos.filter((el) => el.goodsInfoImg);
          }
          this.setState(
            {
              details: Object.assign(
                {},
                this.state.details,
                res.context.goods,
                {
                  sizeList,
                  goodsInfos: res.context.goodsInfos,
                  goodsSpecDetails: res.context.goodsSpecDetails,
                  goodsSpecs: res.context.goodsSpecs
                },
                {
                  goodsCategory: [
                    this.specie,
                    this.productRange.join('&'),
                    this.format.join('&')
                  ].join('/')
                }
              ),
              images: images,
              // images: res.context.images.concat(res.context.goodsInfos),
              // images: res.context.goodsInfos.every(el => !el.goodsInfoImg)?res.context.images: res.context.goodsInfos,
              specList
            },
            () => {
              this.matchGoods();
            }
          );
        } else {
          // 没有规格的情况
          this.setState({
            errMsg: <FormattedMessage id="details.errMsg" />
          });
        }
      })
      .catch((e) => {
        console.log(e);
        console.table(e);
        this.setState({
          errMsg: e.message ? (
            e.message.toString()
          ) : (
            <FormattedMessage id="details.errMsg2" />
          )
        });
      })
      .finally(() => {
        this.setState({
          loading: false,
          initing: false
        });
      });
  }
  updateInstockStatus() {
    this.setState({
      instockStatus: this.state.quantity <= this.state.stock
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
      if (quantity >= 30) {
        res = 30;
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
  handleAmountInput(e) {
    this.setState({ checkOutErrMsg: '' });
    const { quantityMinLimit, quantityMaxLimit } = this.state;
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
      if (tmp > quantityMaxLimit) {
        tmp = quantityMaxLimit;
      }
      this.setState({ quantity: tmp }, () => this.updateInstockStatus());
    }
  }
  handleChooseSize(sId, sdId) {
    let { specList } = this.state;
    specList
      .filter((item) => item.specId === sId)[0]
      .chidren.map((item) => {
        if (item.specDetailId === sdId) {
          item.selected = true;
        } else {
          item.selected = false;
        }
      });
    console.log(specList, 'sss');
    this.setState({ specList }, () => {
      this.matchGoods();
    });
    // this.setState
    // console.log(sItem, 'sItem')
    // this.setState({ checkOutErrMsg: "" });
    // const { sizeList } = this.state.details;
    // let list = cloneDeep(sizeList);
    // let ret = list.map((elem, indx) => {
    //   if (indx === index) {
    //     elem = Object.assign({}, elem, { selected: true });
    //   } else {
    //     elem = Object.assign({}, elem, { selected: false });
    //   }
    //   return elem;
    // });
    // this.setState(
    //   {
    //     currentUnitPrice: data.salePrice,
    //     details: Object.assign({}, this.state.details, { sizeList: ret }),
    //     stock: data.stock || 0,
    //   },
    //   () => this.updateInstockStatus()
    // );
  }
  async hanldeAddToCart({ redirect = false, needLogin = false } = {}) {
    if (
      !(!this.state.initing && this.state.instockStatus && this.state.quantity)
    )
      return;
    this.setState({ checkOutErrMsg: '' });
    if (this.state.loading) {
      return false;
    }
    if (this.isLogin) {
      this.hanldeLoginAddToCart({ redirect });
    } else {
      await this.hanldeUnloginAddToCart({ redirect, needLogin });
    }
  }
  async hanldeLoginAddToCart({ redirect }) {
    this.setState({ addToCartLoading: true });
    const { quantity } = this.state;
    const { sizeList } = this.state.details;
    const currentSelectedSize = find(sizeList, (s) => s.selected);
    try {
      await sitePurchase({
        goodsInfoId: currentSelectedSize.goodsInfoId,
        goodsNum: quantity,
        goodsCategory: [
          this.specie,
          this.productRange,
          this.format.join('&')
        ].join('/')
      });
      await this.checkoutStore.updateLoginCart();
      this.props.headerCartStore.show();
      setTimeout(() => {
        this.props.headerCartStore.hide();
      }, 1000);
      this.setState({ addToCartLoading: false });
      if (redirect) {
        if (
          this.checkoutStore.tradePrice < process.env.REACT_APP_MINIMUM_AMOUNT
        ) {
          this.setState({
            checkOutErrMsg: (
              <FormattedMessage
                id="cart.errorInfo3"
                values={{
                  val: formatMoney(process.env.REACT_APP_MINIMUM_AMOUNT)
                }}
              />
            )
          });
          return false;
        }

        // 存在下架商品，不能下单
        if (this.props.checkoutStore.offShelvesProNames.length) {
          this.setState({
            checkOutErrMsg: (
              <FormattedMessage
                id="cart.errorInfo4"
                values={{
                  val: this.props.checkoutStore.offShelvesProNames.join('/')
                }}
              />
            )
          });
          return false;
        }

        // 库存不够，不能下单
        if (this.props.checkoutStore.outOfstockProNames.length) {
          this.setState({
            checkOutErrMsg: (
              <FormattedMessage
                id="cart.errorInfo2"
                values={{
                  val: this.props.checkoutStore.outOfstockProNames.join('/')
                }}
              />
            )
          });
          return false;
        }
        // this.openPetModal()
        let autoAuditFlag = false;
        let res = await getProductPetConfig({
          goodsInfos: this.props.checkoutStore.loginCartData
        });
        let handledData = this.props.checkoutStore.loginCartData.map(
          (el, i) => {
            el.auditCatFlag = res.context.goodsInfos[i]['auditCatFlag'];
            el.prescriberFlag = res.context.goodsInfos[i]['prescriberFlag'];
            return el;
          }
        );
        this.props.checkoutStore.setLoginCartData(handledData);
        let AuditData = handledData.filter((el) => el.auditCatFlag);
        this.props.checkoutStore.setAuditData(AuditData);
        autoAuditFlag = res.context.autoAuditFlag;
        this.props.checkoutStore.setAutoAuditFlag(autoAuditFlag);
        this.props.checkoutStore.setPetFlag(res.context.petFlag);
        this.props.history.push('/prescription');
      }
    } catch (err) {
      console.log(err);
      this.setState({ errMsg: err.message.toString() });
    }
  }
  async hanldeUnloginAddToCart({ redirect = false, needLogin = false }) {
    this.setState({ checkOutErrMsg: '' });
    if (this.state.loading) {
      throw new Error();
    }
    const { history } = this.props;
    const { currentUnitPrice, quantity, instockStatus } = this.state;
    const { goodsId, sizeList } = this.state.details;
    const currentSelectedSize = find(sizeList, (s) => s.selected);
    let quantityNew = quantity;
    let tmpData = Object.assign({}, this.state.details, {
      quantity: quantityNew
    });
    let cartDataCopy = cloneDeep(
      toJS(this.checkoutStore.cartData).filter((el) => el)
    );

    if (!instockStatus || !quantityNew) {
      throw new Error();
    }
    this.setState({ addToCartLoading: true });
    let flag = true;
    if (cartDataCopy && cartDataCopy.length) {
      const historyItem = find(
        cartDataCopy,
        (c) =>
          c.goodsId === goodsId &&
          currentSelectedSize.goodsInfoId ===
            c.sizeList.filter((s) => s.selected)[0].goodsInfoId
      );
      if (historyItem) {
        flag = false;
        quantityNew += historyItem.quantity;
        if (quantityNew > 30) {
          this.setState({
            checkOutErrMsg: <FormattedMessage id="cart.errorMaxInfo" />
          });
          this.setState({ addToCartLoading: false });
          return;
        }
        tmpData = Object.assign(tmpData, { quantity: quantityNew });
      }
    }

    // 超过库存时，修改产品数量为最大值替换
    // let res = await miniPurchases({
    //   goodsInfoDTOList: [
    //     {
    //       goodsInfoId: currentSelectedSize.goodsInfoId,
    //       goodsNum: quantityNew
    //     }
    //   ]
    // });
    // let tmpObj = find(
    //   res.context.goodsList,
    //   (ele) => ele.goodsInfoId === currentSelectedSize.goodsInfoId
    // );
    // if (tmpObj) {
    //   if (quantityNew > tmpObj.stock) {
    //     quantityNew = tmpObj.stock;
    //     if (flag) {
    //       this.setState({
    //         quantity: quantityNew
    //       });
    //     }
    //     tmpData = Object.assign(tmpData, { quantity: quantityNew });
    //   }
    // }

    const idx = findIndex(
      cartDataCopy,
      (c) =>
        c.goodsId === goodsId &&
        currentSelectedSize.goodsInfoId ===
          find(c.sizeList, (s) => s.selected).goodsInfoId
    );
    tmpData = Object.assign(tmpData, {
      currentAmount: currentUnitPrice * quantityNew,
      selected: true
    });
    if (idx > -1) {
      cartDataCopy.splice(idx, 1, tmpData);
    } else {
      if (cartDataCopy.length >= 30) {
        this.setState({
          checkOutErrMsg: <FormattedMessage id="cart.errorMaxCate" />
        });
        return;
      }
      cartDataCopy.push(tmpData);
    }
    await this.props.checkoutStore.updateUnloginCart(cartDataCopy);
    this.setState({ addToCartLoading: false });
    if (redirect) {
      if (
        this.checkoutStore.tradePrice < process.env.REACT_APP_MINIMUM_AMOUNT
      ) {
        this.setState({
          checkOutErrMsg: (
            <FormattedMessage
              id="cart.errorInfo3"
              values={{
                val: formatMoney(process.env.REACT_APP_MINIMUM_AMOUNT)
              }}
            />
          )
        });
        throw new Error();
      }
      if (this.props.checkoutStore.offShelvesProNames.length) {
        this.setState({
          checkOutErrMsg: (
            <FormattedMessage
              id="cart.errorInfo4"
              values={{
                val: this.props.checkoutStore.offShelvesProNames.join('/')
              }}
            />
          )
        });
        throw new Error();
      }
      if (this.checkoutStore.outOfstockProNames.length) {
        this.setState({
          checkOutErrMsg: (
            <FormattedMessage
              id="cart.errorInfo2"
              values={{ val: this.checkoutStore.outOfstockProNames.join('/') }}
            />
          )
        });
        throw new Error();
      }
      if (needLogin) {
        // history.push({ pathname: '/login', state: { redirectUrl: '/cart' } })
      } else {
        let autoAuditFlag = false;
        if (this.isLogin) {
          let res = await getProductPetConfig({
            goodsInfos: this.props.checkoutStore.loginCartData
          });
          let handledData = this.props.checkoutStore.loginCartData.map(
            (el, i) => {
              el.auditCatFlag = res.context.goodsInfos[i]['auditCatFlag'];
              el.prescriberFlag = res.context.goodsInfos[i]['prescriberFlag'];
              return el;
            }
          );
          this.props.checkoutStore.setLoginCartData(handledData);
          let AuditData = handledData.filter((el) => el.auditCatFlag);
          this.props.checkoutStore.setAuditData(AuditData);
          autoAuditFlag = res.context.autoAuditFlag;
        } else {
          let paramData = this.props.checkoutStore.cartData.map((el) => {
            el.goodsInfoId = el.sizeList.filter(
              (item) => item.selected
            )[0].goodsInfoId;
            return el;
          });
          let res = await getProductPetConfig({ goodsInfos: paramData });
          let handledData = paramData.map((el, i) => {
            el.auditCatFlag = res.context.goodsInfos[i]['auditCatFlag'];
            el.prescriberFlag = res.context.goodsInfos[i]['prescriberFlag'];
            return el;
          });
          this.props.checkoutStore.setCartData(handledData);
          let AuditData = handledData.filter((el) => el.auditCatFlag);
          this.props.checkoutStore.setAuditData(AuditData);
          autoAuditFlag = res.context.autoAuditFlag;
          this.props.checkoutStore.setPetFlag(res.context.petFlag);
        }
        this.props.checkoutStore.setAutoAuditFlag(autoAuditFlag);
        history.push('/prescription');
      }
    }
    this.props.headerCartStore.show();
    setTimeout(() => {
      this.props.headerCartStore.hide();
    }, 1000);
  }
  changeTab(e, i) {
    this.setState({ activeTabIdx: i });
  }
  openPetModal() {
    this.setState({
      petModalVisible: true
    });
  }
  closePetModal() {
    if (this.state.isAdd === 2) {
      this.setState({
        isAdd: 0
      });
    }
    this.setState({
      petModalVisible: false
    });
  }
  petComfirm() {
    this.props.history.push('/prescription');
  }
  openNew() {
    this.setState({
      isAdd: 1
    });
    this.openPetModal();
  }
  closeNew() {
    this.setState({
      isAdd: 2
    });
    this.openPetModal();
  }
  handleAClick() {
    if (this.state.replyNum > 0) {
      let el = document.getElementById('review-container');
      let length = this.getElementToPageTop(el);
      window.scrollTo({
        top: length - 80,
        behavior: 'smooth'
      });
    }
  }
  getElementToPageTop(el) {
    if (el.parentElement) {
      return this.getElementToPageTop(el.parentElement) + el.offsetTop;
    }
    return el.offsetTop;
  }
  formatUnit(baseSpecLabel) {
    let res = baseSpecLabel.slice(String(parseFloat(baseSpecLabel)).length);
    if (isNaN(parseFloat(res))) {
      return res;
    } else {
      return this.formatUnit(res);
    }
  }
  render() {
    const createMarkup = (text) => ({ __html: text });
    const {
      details,
      images,
      quantity,
      stock,
      quantityMinLimit,
      instockStatus,
      currentUnitPrice,
      currentLinePrice,
      currentSubscriptionPrice,
      errMsg,
      addToCartLoading,
      specList,
      initing
    } = this.state;
    let selectedSpecItem = details.sizeList.filter((el) => el.selected)[0];
    if (selectedSpecItem) {
      console.log(
        selectedSpecItem,
        'selectedSpecItem',
        String(parseFloat(selectedSpecItem.baseSpecLabel)).length
      );
    }
    let event;
    let eEvents;
    if (!this.state.initing) {
      event = {
        page: {
          type: 'Product',
          theme: this.specie
        }
      };
      eEvents = {
        event: `${process.env.REACT_APP_GTM_SITE_ID}eComProductView`,
        action: 'detail',
        ecommerce: {
          currencyCode: process.env.REACT_APP_GA_CURRENCY_CODE,
          detail: {
            products: [
              {
                id: '',
                name: details.goodsName,
                price: currentUnitPrice,
                brand: 'Royal Canin',
                category: this.specie,
                quantity: selectedSpecItem.buyCount,
                variant: selectedSpecItem.specText,
                club: 'no',
                sku: selectedSpecItem.goodsInfoId
              }
            ]
          }
        }
      };
    }

    return (
      <div>
        {event ? (
          <GoogleTagManager
            additionalEvents={event}
            ecommerceEvents={eEvents}
          />
        ) : null}
        <Header
          ref={this.headerRef}
          showMiniIcons={true}
          showUserIcon={true}
          location={this.props.location}
          history={this.props.history}
          match={this.props.match}
        />
        {errMsg ? (
          <main className="rc-content--fixed-header">
            <div className="product-detail product-wrapper rc-bg-colour--brand3">
              <div
                className="rc-max-width--xl d-flex"
                style={{ margin: '50px 0' }}
              >
                <div className="ui-font-nothing text-center">
                  <i className="rc-icon rc-incompatible--sm rc-iconography"></i>
                  {errMsg}
                </div>
              </div>
            </div>
          </main>
        ) : (
          <main className="rc-content--fixed-header ">
            <div className="product-detail product-wrapper rc-bg-colour--brand3">
              <div className="rc-max-width--xl mb-4">
                <BreadCrumbs />
                <div className="rc-padding--sm--desktop">
                  <div className="rc-content-h-top">
                    <div className="rc-layout-container rc-six-column">
                      <div className="rc-column rc-double-width carousel-column imageBox">
                        {this.state.loading ? (
                          <Skeleton
                            color="#f5f5f5"
                            width="100%"
                            height="100%"
                          />
                        ) : (
                          <div
                            className={`rc-full-width ${
                              this.state.imageMagnifierCfg.show
                                ? 'show-image-magnifier'
                                : ''
                            }`}
                          >
                            <div className="d-flex justify-content-center ui-margin-top-1-md-down">
                              {
                                <div className="details-img-container">
                                  <ImageMagnifier
                                    sizeList={details.sizeList}
                                    video={details.goodsVideo}
                                    images={images}
                                    minImg={details.goodsImg}
                                    maxImg={details.goodsImg}
                                    config={this.state.imageMagnifierCfg.config}
                                  />
                                </div>
                              }
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="rc-column product-column">
                        {this.state.loading ? (
                          <div>
                            <Skeleton color="#f5f5f5" width="100%" count={7} />
                          </div>
                        ) : (
                          <div className="wrap-short-des">
                            <h1
                              className="rc-gamma ui-text-overflow-line2 text-break mb-0"
                              title={details.goodsName}
                            >
                              {details.goodsName}
                            </h1>
                            <div className="rc-card__price flex-inline">
                              <div className="display-inline">
                                <Rate
                                  def={this.state.productRate}
                                  disabled={true}
                                  marginSize="sRate"
                                />
                              </div>
                              <a
                                href="javascript:;"
                                className="comments rc-margin-left--xs rc-text-colour--text"
                                onClick={this.handleAClick.bind(this)}
                              >
                                {this.state.replyNum}{' '}
                                <FormattedMessage id="reviews" />
                              </a>
                            </div>
                            <h3 className="text-break mb-1 mt-2">
                              {details.goodsSubtitle}
                            </h3>
                            <div
                              className="description"
                              dangerouslySetInnerHTML={createMarkup(
                                details.goodsDescription
                              )}
                            />
                            {selectedSpecItem && (
                              <div
                                className="description"
                                dangerouslySetInnerHTML={createMarkup(
                                  selectedSpecItem.description
                                )}
                              />
                            )}

                            {find(details.sizeList, (s) => s.selected) &&
                            find(details.sizeList, (s) => s.selected)
                              .goodsPromotion ? (
                              <>
                                <br />
                                <div>
                                  <FormattedMessage id="promotion" />:{' '}
                                  <span className="bg-primary text-white pl-2 pr-2">
                                    {
                                      find(details.sizeList, (s) => s.selected)
                                        .goodsPromotion
                                    }
                                  </span>
                                </div>
                              </>
                            ) : null}
                          </div>
                        )}
                      </div>
                      {/* <!-- buybox --> */}
                      <div className="rc-column rc-triple-width buybox-column">
                        <div className="product-pricing v2 rc-full-width hide-cta">
                          <div className="product-pricing__inner">
                            <div className="product-pricing__cards d-flex flex-column flex-sm-column">
                              <div
                                className="product-pricing__card singlepruchase selected"
                                data-buybox="singlepruchase"
                                style={{ paddingTop: '12px' }}
                              >
                                {!initing && (
                                  <>
                                    {currentLinePrice &&
                                    currentLinePrice > 0 ? (
                                      <div className="product-pricing__card__head d-flex align-items-center">
                                        <div className="rc-input product-pricing__card__head__title">
                                          <FormattedMessage id="listPrice" />
                                        </div>
                                        <b
                                          className="product-pricing__card__head__price  rc-padding-y--none text-line-through"
                                          style={{
                                            fontWeight: '200',
                                            fontSize: '20px',
                                            color: 'rgba(102,102,102,.7)'
                                          }}
                                        >
                                          {formatMoney(currentLinePrice)}
                                        </b>
                                      </div>
                                    ) : null}
                                    <div className="product-pricing__card__head d-flex align-items-center flex-wrap justify-content-between">
                                      <div>
                                        <FormattedMessage id="price" />
                                      </div>
                                      <div
                                        className="text-right"
                                        style={{ flex: 1 }}
                                      >
                                        <b className="product-pricing__card__head__price red  rc-padding-y--none">
                                          {formatMoney(currentUnitPrice)}
                                        </b>
                                        &nbsp;&nbsp;
                                        {details.baseSpec &&
                                        selectedSpecItem ? (
                                          <b
                                            style={{
                                              fontWeight: '200',
                                              color: 'rgba(102,102,102,.7)'
                                            }}
                                          >
                                            (
                                            {formatMoney(
                                              (
                                                currentUnitPrice /
                                                parseFloat(
                                                  selectedSpecItem.baseSpecLabel
                                                )
                                              ).toFixed(2)
                                            )}
                                            /
                                            {selectedSpecItem.baseSpecLabel &&
                                              this.formatUnit(
                                                selectedSpecItem.baseSpecLabel
                                              )}
                                            )
                                          </b>
                                        ) : null}
                                      </div>
                                    </div>
                                  </>
                                )}
                                {find(details.sizeList, (s) => s.selected) &&
                                find(details.sizeList, (s) => s.selected)
                                  .subscriptionStatus &&
                                currentSubscriptionPrice > 0 ? (
                                  <>
                                    {!initing && (
                                      <div className="product-pricing__card__head d-flex align-items-center flex-wrap justify-content-between">
                                        <div>
                                          <FormattedMessage id="autoship" />
                                          <span
                                            className="info-tooltip delivery-method-tooltip"
                                            onMouseEnter={() => {
                                              this.setState({
                                                toolTipVisible: true
                                              });
                                            }}
                                            onMouseLeave={() => {
                                              this.setState({
                                                toolTipVisible: false
                                              });
                                            }}
                                          >
                                            i
                                          </span>
                                          <ConfirmTooltip
                                            arrowStyle={{ left: '65%' }}
                                            display={this.state.toolTipVisible}
                                            cancelBtnVisible={false}
                                            confirmBtnVisible={false}
                                            updateChildDisplay={(status) =>
                                              this.setState({
                                                toolTipVisible: status
                                              })
                                            }
                                            content={
                                              <FormattedMessage id="subscription.promotionTip2" />
                                            }
                                          />
                                        </div>
                                        <div
                                          className="text-right"
                                          style={{ flex: 1 }}
                                        >
                                          <b className="product-pricing__card__head__price  red rc-padding-y--none">
                                            {formatMoney(
                                              currentSubscriptionPrice || 0
                                            )}
                                          </b>
                                          &nbsp;&nbsp;
                                          {details.baseSpec &&
                                          selectedSpecItem &&
                                          currentSubscriptionPrice ? (
                                            <b
                                              style={{
                                                fontWeight: '200',
                                                color: 'rgba(102,102,102,.7)'
                                              }}
                                            >
                                              (
                                              {formatMoney(
                                                (
                                                  currentSubscriptionPrice /
                                                  parseFloat(
                                                    selectedSpecItem.baseSpecLabel
                                                  )
                                                ).toFixed(2)
                                              )}
                                              /
                                              {selectedSpecItem.baseSpecLabel &&
                                                this.formatUnit(
                                                  selectedSpecItem.baseSpecLabel
                                                )}
                                              )
                                            </b>
                                          ) : null}
                                        </div>
                                      </div>
                                    )}
                                  </>
                                ) : null}
                                <div className="product-pricing__card__head d-flex align-items-center rc-margin-top--xs">
                                  {process.env.REACT_APP_LANG == 'de' ? (
                                    <div
                                      className="rc-input product-pricing__card__head__title taxLogo"
                                      style={{ color: 'rgb(102,102,102)' }}
                                    >
                                      <FormattedMessage
                                        id="taxLogo"
                                        values={{
                                          val: (
                                            <a href="https://shopstg.royalcanin.com/FAQ-Shipping">
                                              Versandkosten
                                            </a>
                                          )
                                        }}
                                      />
                                    </div>
                                  ) : (
                                    <div
                                      className="rc-input product-pricing__card__head__title"
                                      style={{ color: 'rgb(102,102,102)' }}
                                    >
                                      <FormattedMessage
                                        id="taxLogo"
                                        defaultMessage={' '}
                                      />
                                    </div>
                                  )}
                                </div>
                                {/* {details &&
                                    find(details.sizeList, (s) => s.selected) &&
                                    find(details.sizeList, (s) => s.selected)
                                      .marketingLabels[0] &&
                                    find(details.sizeList, (s) => s.selected)
                                      .marketingLabels[0].marketingDesc ? (
                                      <div className="product-pricing__card__head rc-margin-bottom--none d-flex align-items-center">
                                        <div className="rc-input product-pricing__card__head__title red d-flex justify-content-between">
                                          <span>
                                            <FormattedMessage id="promotion" />{" "}
                                          </span>
                                          <span>25% OFF</span>
                                        </div>
                                      </div>
                                    ) : null} */}
                                <div className="product-pricing__card__body rc-margin-top--xs">
                                  <div className="toggleVisibility">
                                    <div className="product-selectors rc-padding-top--xs">
                                      {specList.map((sItem, i) => (
                                        <div id="choose-select" key={i}>
                                          <div className="rc-margin-bottom--xs">
                                            {/* <FormattedMessage id="details.theSize" /> */}
                                            {sItem.specName}:
                                          </div>

                                          <div data-attr="size">
                                            <div
                                              className="rc-swatch __select-size"
                                              id="id-single-select-size"
                                            >
                                              {sItem.chidren.map(
                                                (sdItem, i) => (
                                                  <div
                                                    key={i}
                                                    className={`rc-swatch__item ${
                                                      sdItem.selected
                                                        ? 'selected'
                                                        : ''
                                                    }`}
                                                    onClick={() =>
                                                      this.handleChooseSize(
                                                        sItem.specId,
                                                        sdItem.specDetailId
                                                      )
                                                    }
                                                  >
                                                    <span>
                                                      {sdItem.detailName}
                                                    </span>
                                                  </div>
                                                )
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      ))}

                                      <div
                                        className="quantity-width start-lines"
                                        data-attr="size"
                                      >
                                        <div className="quantity d-flex justify-content-between align-items-center">
                                          <span>
                                            <FormattedMessage id="amount" />:
                                          </span>
                                          <input
                                            type="hidden"
                                            id="invalid-quantity"
                                            value="Пожалуйста, введите правильный номер."
                                          />
                                          <div className="rc-quantity text-right d-flex justify-content-end">
                                            <span
                                              className="rc-icon rc-minus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-minus"
                                              onClick={() =>
                                                this.hanldeAmountChange('minus')
                                              }
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
                                              onClick={() =>
                                                this.hanldeAmountChange('plus')
                                              }
                                            ></span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      className="availability  product-availability"
                                      style={{
                                        display: details.sizeList.filter(
                                          (el) => el.selected
                                        ).length
                                          ? 'block'
                                          : 'none'
                                      }}
                                    >
                                      <div className="align-left flex">
                                        <div className="stock__wrapper">
                                          <div className="stock">
                                            <label
                                              className={[
                                                'availability',
                                                instockStatus
                                                  ? 'instock'
                                                  : 'outofstock'
                                              ].join(' ')}
                                            >
                                              <span className="title-select">
                                                <FormattedMessage id="details.availability" />{' '}
                                                :
                                              </span>
                                            </label>
                                            <span
                                              className="availability-msg"
                                              data-ready-to-order="true"
                                            >
                                              <div
                                                className={[
                                                  instockStatus
                                                    ? ''
                                                    : 'out-stock'
                                                ].join(' ')}
                                              >
                                                {instockStatus ? (
                                                  <FormattedMessage id="details.inStock" />
                                                ) : (
                                                  <FormattedMessage id="details.outStock" />
                                                )}
                                              </div>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="product-pricing__cta prices-add-to-cart-actions rc-margin-top--xs rc-padding-top--xs toggleVisibility">
                                      <div
                                        className="cart-and-ipay"
                                        id="cartAndIpay1"
                                      >
                                        <button
                                          className={`add-to-cart rc-btn rc-btn--one rc-full-width ${
                                            addToCartLoading
                                              ? 'ui-btn-loading'
                                              : ''
                                          } ${
                                            !initing &&
                                            instockStatus &&
                                            quantity
                                              ? ''
                                              : 'rc-btn-solid-disabled'
                                          }`}
                                          data-loc="addToCart"
                                          style={{ lineHeight: '30px' }}
                                          onClick={() => this.hanldeAddToCart()}
                                        >
                                          <i className="fa rc-icon rc-cart--xs rc-brand3"></i>
                                          <FormattedMessage id="details.addToCart" />
                                        </button>
                                      </div>
                                    </div>
                                    <div className="product-pricing__cta prices-add-to-cart-actions rc-margin-top--xs rc-padding-top--xs toggleVisibility">
                                      <div
                                        className="cart-and-ipay"
                                        id="cartAndIpay2"
                                      >
                                        {this.isLogin ? (
                                          <button
                                            className={`add-to-cart rc-btn rc-btn--one rc-full-width ${
                                              addToCartLoading
                                                ? 'ui-btn-loading'
                                                : ''
                                            } ${
                                              !initing &&
                                              instockStatus &&
                                              quantity
                                                ? ''
                                                : 'rc-btn-solid-disabled'
                                            }`}
                                            data-loc="addToCart"
                                            style={{ lineHeight: '30px' }}
                                            onClick={() =>
                                              this.hanldeAddToCart({
                                                redirect: true,
                                                needLogin: false
                                              })
                                            }
                                          >
                                            <i className="fa rc-icon rc-cart--xs rc-brand3 no-icon"></i>
                                            <FormattedMessage id="checkout" />
                                          </button>
                                        ) : (
                                          <LoginButton
                                            beforeLoginCallback={async () => {
                                              try {
                                                await this.hanldeUnloginAddToCart(
                                                  {
                                                    redirect: true,
                                                    needLogin: true
                                                  }
                                                );
                                                sessionItemRoyal.set(
                                                  'okta-redirectUrl',
                                                  '/cart'
                                                );
                                              } catch (err) {
                                                throw new Error();
                                              }
                                            }}
                                            btnClass={`add-to-cart rc-btn rc-btn--one rc-full-width ${
                                              addToCartLoading
                                                ? 'ui-btn-loading'
                                                : ''
                                            } ${
                                              !initing &&
                                              instockStatus &&
                                              quantity
                                                ? ''
                                                : 'rc-btn-solid-disabled'
                                            }`}
                                            history={this.props.history}
                                          >
                                            <FormattedMessage id="checkout" />
                                          </LoginButton>
                                        )}
                                      </div>
                                    </div>
                                    {!this.isLogin && (
                                      <div className="product-pricing__cta prices-add-to-cart-actions rc-margin-top--xs rc-padding-top--xs toggleVisibility">
                                        <div
                                          className="cart-and-ipay"
                                          id="cartAndIpay3"
                                        >
                                          <button
                                            className={`rc-styled-link color-999 ${
                                              addToCartLoading
                                                ? 'ui-btn-loading ui-btn-loading-border-red'
                                                : ''
                                            } ${
                                              !initing &&
                                              instockStatus &&
                                              quantity
                                                ? ''
                                                : 'rc-btn-disabled'
                                            }`}
                                            data-loc="addToCart"
                                            onClick={() =>
                                              this.hanldeAddToCart({
                                                redirect: true
                                              })
                                            }
                                          >
                                            <FormattedMessage id="GuestCheckout" />
                                          </button>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div
                                className={`text-break ${
                                  this.state.checkOutErrMsg ? '' : 'hidden'
                                }`}
                              >
                                <aside
                                  className="rc-alert rc-alert--error rc-alert--with-close"
                                  role="alert"
                                  style={{ padding: '.5rem' }}
                                >
                                  <span className="pl-0">
                                    {this.state.checkOutErrMsg}
                                  </span>
                                </aside>
                              </div>
                            </div>
                            <div className="product-pricing__warranty rc-text--center"></div>
                          </div>
                        </div>
                        {/* 未登录的时候,只有这种显示了订阅信息的商品底部才显示Subscription is possible only after registration这句话 */}
                        {!this.isLogin &&
                        find(details.sizeList, (s) => s.selected) &&
                        find(details.sizeList, (s) => s.selected)
                          .subscriptionStatus &&
                        currentSubscriptionPrice > 0 ? (
                          <div className="text-center">
                            <FormattedMessage id="unLoginSubscriptionTips" />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Advantage />
            {this.state.goodsDetailTab.tabName.length ? (
              <div className="rc-max-width--xl rc-padding-x--sm">
                <div className="rc-match-heights rc-content-h-middle rc-reverse-layout">
                  <div>
                    <div className="rc-border-bottom rc-border-colour--interface">
                      <nav className="rc-fade--x">
                        <ul
                          className="rc-scroll--x rc-list rc-list--inline rc-list--align rc-list--blank"
                          role="tablist"
                        >
                          {this.state.goodsDetailTab.tabName.map(
                            (ele, index) => (
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
                                  onClick={(e) => this.changeTab(e, index)}
                                >
                                  {ele}
                                </button>
                              </li>
                            )
                          )}
                        </ul>
                      </nav>
                    </div>
                    <div
                      className="rc-tabs tabs-detail"
                      style={{ marginTop: '40px' }}
                    >
                      {this.state.goodsDetailTab.tabContent.map((ele, i) => (
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
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            <div id="review-container">
              <Reviews id={this.state.goodsId} isLogin={this.isLogin} />
            </div>
            <div>
              <div
                style={{
                  textAlign: 'center',
                  color: 'rgb(236, 0, 26)',
                  height: '50px',
                  lineHeight: '50px',
                  fontSize: '1.4rem',
                  marginBottom: '1rem'
                }}
              >
                Recommanded for you
              </div>
              <HeroCarousel
                history={this.props.history}
                goodsId={this.state.goodsId}
                key={this.state.goodsId}
              />
              {/* <RelatedProduct goodsId={this.state.goodsId} key={this.state.goodsId}/> */}
            </div>
            <div
              className="sticky-addtocart"
              style={{ transform: 'translateY(-80px)' }}
            >
              <div className="rc-max-width--xl rc-padding-x--md d-sm-flex text-center align-items-center fullHeight justify-content-center">
                <button
                  className={`rc-btn rc-btn--one js-sticky-cta rc-margin-right--xs--mobile ${
                    addToCartLoading ? 'ui-btn-loading' : ''
                  } ${
                    !initing && instockStatus && quantity
                      ? ''
                      : 'rc-btn-solid-disabled'
                  }`}
                  onClick={() => this.hanldeAddToCart()}
                >
                  <span className="fa rc-icon rc-cart--xs rc-brand3"></span>
                  <span className="default-txt">
                    <FormattedMessage id="details.addToCart" />
                  </span>
                </button>
                {this.isLogin ? (
                  <button
                    className={`rc-btn rc-btn--one js-sticky-cta ${
                      addToCartLoading ? 'ui-btn-loading' : ''
                    } ${
                      !initing && instockStatus && quantity
                        ? ''
                        : 'rc-btn-solid-disabled'
                    }`}
                    onClick={() =>
                      this.hanldeAddToCart({ redirect: true, needLogin: false })
                    }
                  >
                    <span className="fa rc-icon rc-cart--xs rc-brand3 no-icon"></span>
                    <span className="default-txt">
                      <FormattedMessage id="checkout" />
                    </span>
                  </button>
                ) : (
                  <LoginButton
                    beforeLoginCallback={async () => {
                      try {
                        await this.hanldeUnloginAddToCart({
                          redirect: true,
                          needLogin: true
                        });
                        sessionItemRoyal.set('okta-redirectUrl', '/cart');
                      } catch (err) {
                        throw new Error();
                      }
                    }}
                    btnClass={`rc-btn rc-btn--one js-sticky-cta ${
                      addToCartLoading ? 'ui-btn-loading' : ''
                    } ${
                      !initing && instockStatus && quantity
                        ? ''
                        : 'rc-btn-solid-disabled'
                    }`}
                    history={this.props.history}
                  >
                    <span className="fa rc-icon rc-cart--xs rc-brand3 no-icon"></span>
                    <span className="default-txt">
                      <FormattedMessage id="checkout" />
                    </span>
                  </LoginButton>
                )}
                {!this.isLogin && (
                  <button
                    className={`rc-styled-link color-999 ${
                      addToCartLoading ? 'ui-btn-loading' : ''
                    } ${
                      !initing && instockStatus && quantity
                        ? ''
                        : 'rc-btn-disabled'
                    }`}
                    onClick={() => this.hanldeAddToCart({ redirect: true })}
                  >
                    <FormattedMessage id="GuestCheckout" />
                  </button>
                )}
              </div>
            </div>
          </main>
        )}
        <Footer />

        {/* <PetModal visible={this.state.petModalVisible}
          isAdd={this.state.isAdd}
          productList={this.state.productList}
          openNew={() => this.openNew()}
          closeNew={() => this.closeNew()}
          confirm={() => this.petComfirm()}
          close={() => this.closePetModal()} /> */}
      </div>
    );
  }
}

export default Details;
