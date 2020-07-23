import React from 'react'
import Skeleton from 'react-skeleton-loader'
import { inject, observer } from 'mobx-react'
import GoogleTagManager from '@/components/GoogleTagManager'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BreadCrumbs from '@/components/BreadCrumbs'
import ImageMagnifier from '@/components/ImageMagnifier'
import LoginButton from '@/components/LoginButton'
import Reviews from './components/Reviews'
import Rate from '@/components/Rate'
import PetModal from '@/components/PetModal'
import {
  formatMoney,
  translateHtmlCharater,
  queryProps
} from '@/utils/utils'
import {
  STORE_CATE_ENUM,
  SUBSCRIPTION_DISCOUNT_RATE
} from "@/utils/constant"
import { FormattedMessage, injectIntl } from 'react-intl'
import { cloneDeep, findIndex, find } from 'lodash'
import { getDetails, getLoginDetails } from '@/api/details'
import { sitePurchase } from '@/api/cart'
import { getDict } from '@/api/dict'
import './index.css'

@inject("checkoutStore", "loginStore")
@injectIntl
@observer
class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initing: true,
      details: {
        id: "",
        goodsName: "",
        goodsImg:
          "https://wanmi-b2b.oss-cn-shanghai.aliyuncs.com/202004142026536251.jpg",
        goodsDescription: "",
        sizeList: [],
        images: [],
        goodsCategory: ''
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
      currentSubscriptionPrice: 0,
      imageMagnifierCfg: {
        show: false,
        config: {},
      },
      loading: true,
      errMsg: "",
      checkOutErrMsg: "",
      addToCartLoading: false,
      tradePrice: "",
      specList: [],
      tabsValue: [],
      petModalVisible: false,
      isAdd: 0,
      productRate: 0,
      replyNum: 0,
      goodsId: null,
      minMarketPrice: 0,
      minSubscriptionPrice: 0
    };
    this.hanldeAmountChange = this.hanldeAmountChange.bind(this);
    this.handleAmountInput = this.handleAmountInput.bind(this);
    this.handleChooseSize = this.handleChooseSize.bind(this);
    this.headerRef = React.createRef();

    this.specie = ''
    this.productRange = []
    this.format = []
  }
  componentWillUnmount () {
    localStorage.setItem("isRefresh", true);
  }
  componentDidMount () {
    if (localStorage.getItem("isRefresh")) {
      localStorage.removeItem("isRefresh");
      window.location.reload();
      return false;
    }
    this.setState(
      { id: this.props.match.params.id },
      () => this.queryDetails()
    );
  }
  get isLogin () {
    return this.props.loginStore.isLogin
  }
  get checkoutStore () {
    return this.props.checkoutStore
  }

  matchGoods () {
    let { specList, details, currentUnitPrice, currentSubscriptionPrice, stock } = this.state
    let selectedArr = []
    let idArr = []
    specList.map(el => {
      if (el.chidren.filter(item => item.selected).length) {
        selectedArr.push(el.chidren.filter(item => item.selected)[0])
      }
    })
    selectedArr = selectedArr.sort((a, b) => a.specDetailId - b.specDetailId)
    idArr = selectedArr.map(el => el.specDetailId)
    currentUnitPrice = details.marketPrice
    details.sizeList.map(item => {
      let specTextArr = []
      for (let specItem of specList) {
        for (let specDetailItem of specItem.chidren) {
          if (item.mockSpecIds.includes(specDetailItem.specId) && item.mockSpecDetailIds.includes(specDetailItem.specDetailId)) {
            specTextArr.push(specDetailItem.detailName)
          }
        }
      }
      item.specText = specTextArr.join(' ')
      if (item.mockSpecDetailIds.join(',') === idArr.join(',')) {
        item.selected = true
        currentUnitPrice = item.salePrice
        currentSubscriptionPrice = item.subscriptionPrice
        stock = item.stock
      } else {
        item.selected = false
      }
    })
    this.setState({ details, currentUnitPrice, currentSubscriptionPrice, stock }, () => {
      this.updateInstockStatus();
    })
  }
  async queryDetails () {
    const { id } = this.state;
    const tmpRequest = this.isLogin ? getLoginDetails : getDetails
    Promise.all([
      tmpRequest(id),
      queryProps()
    ])
      .then(resList => {
        const res = resList[0]
        if (res && res.context) {
          this.setState({
            productRate: res.context.avgEvaluate
          })
        }
        if (res && res.context && res.context.goods) {
          this.setState({
            productRate: res.context.goods.avgEvaluate,
            replyNum: res.context.goods.goodsEvaluateNum,
            goodsId: res.context.goods.goodsId,
            minMarketPrice: res.context.goods.minMarketPrice,
            minSubscriptionPrice: res.context.goods.minSubscriptionPrice,
          })
        }
        if (res && res.context && res.context.goodsSpecDetails && resList[1]) {
          // 获取产品所属类别
          let tmpSpecie = find(res.context.storeCates, ele => ele.cateName.toLowerCase().includes('dog')) && 'Dog'
          if (!tmpSpecie) {
            tmpSpecie = find(res.context.storeCates, ele => ele.cateName.toLowerCase().includes('cat')) && 'Cat'
          }
          this.specie = tmpSpecie

          // 获取产品所属home页四个大类
          for (let item of res.context.storeCates) {
            const t = find(STORE_CATE_ENUM, ele => ele.cateName.includes(item.cateName))
            if (t) {
              this.productRange.push(t.text[this.props.intl && this.props.intl.locale || 'en'])
            }
          }

          // 获取产品Dry/Wet属性
          let tmpFormat = []
          for (let item of res.context.goodsPropDetailRels) {
            const t = find(resList[1], ele => ele.propId == item.propId)
            if (t && t.propName.includes('Seco')) {
              const t2 = find(t.goodsPropDetails, ele => ele.detailId == item.detailId)
              if (t2) {
                tmpFormat.push({ 'Seco': 'Dry', 'Húmedo': 'Wet' }[t2.detailName] || '')
              }
            }
          }
          this.format = tmpFormat


          let specList = res.context.goodsSpecs;
          let specDetailList = res.context.goodsSpecDetails;
          specList.map((sItem) => {
            sItem.chidren = specDetailList.filter(
              (sdItem, i) => {
                // console.log(sdItem, i, 'sdItem')
                // if(i === 0) {
                //   sdItem.selected = true
                // }
                // if (sItem.chidren && sItem.chidren.length === 1) {
                //   sdItem.selected = true
                // } else {
                //   sdItem.selected = false
                // }
                // if(sItem.chidren && sItem.chidren)
                return sdItem.specId === sItem.specId
              }
            )
            sItem.chidren[0].selected = true
          });

          // this.setState({ specList });
          let sizeList = [];
          let goodsInfos = res.context.goodsInfos || [];

          sizeList = goodsInfos.map(g => {
            // const targetInfo = find(goodsInfos, info => info.mockSpecDetailIds.includes(g.specDetailId))
            // console.log(targetInfo, 'target')
            // if (targetInfo) {
            g = Object.assign({}, g, { selected: false });
            // }
            return g;
          });

          // const selectedSize = find(sizeList, s => s.selected)

          const { goodsDetailTab } = this.state
          try {
            let tmpGoodsDetail = res.context.goods.goodsDetail
            if (tmpGoodsDetail) {
              tmpGoodsDetail = JSON.parse(tmpGoodsDetail)
              for (let key in tmpGoodsDetail) {
                if (tmpGoodsDetail[key]) {
                  goodsDetailTab.tabName.push(key)
                  goodsDetailTab.tabContent.push(tmpGoodsDetail[key])
                  // goodsDetailTab.tabContent.push(translateHtmlCharater(tmpGoodsDetail[key]))
                }
              }
            }
            this.setState({
              goodsDetailTab: goodsDetailTab
            })
          } catch (err) {
            getDict({ type: 'goodsDetailTab', storeId: process.env.REACT_APP_STOREID })
              .then(res => {
                goodsDetailTab.tabName = res.context.sysDictionaryVOS.map(ele => ele.name)
                this.setState({
                  goodsDetailTab: goodsDetailTab
                })
              })
          }
          this.setState(
            {
              details: Object.assign({},
                this.state.details,
                res.context.goods,
                { sizeList },
                { goodsCategory: [this.specie, this.productRange.join('&'), this.format.join('&')].join('/') }),
              images: res.context.images.concat(res.context.goodsInfos),
              specList
            },
            () => {
              this.matchGoods()
            }
          );
        } else {
          // 没有规格的情况
          this.setState({
            errMsg: <FormattedMessage id="details.errMsg" />
          });
        }
      })
      .catch(e => {
        console.log(e);
        console.table(e);
        this.setState({
          errMsg: e ? e.toString() : <FormattedMessage id="details.errMsg2" />
        });
      })
      .finally(() => {
        this.setState({
          loading: false,
          initing: false
        })
      })
  }
  updateInstockStatus () {
    this.setState({
      instockStatus: this.state.quantity <= this.state.stock
    });
  }
  hanldeAmountChange (type) {
    this.setState({ checkOutErrMsg: "" });
    if (!type) return;
    const { quantity } = this.state;
    let res;
    if (type === "minus") {
      if (quantity <= 1) {
        res = 1;
      } else {
        res = quantity - 1;
      }
    } else {
      res = (quantity || 0) + 1;
      if (quantity >= 30) {
        res = 30
      }
    }
    this.setState(
      {
        quantity: res,
      },
      () => {
        this.updateInstockStatus();
      }
    );
  }
  handleAmountInput (e) {
    this.setState({ checkOutErrMsg: "" });
    const { quantityMinLimit, quantityMaxLimit } = this.state;
    const val = e.target.value;
    if (val === "") {
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
        tmp = quantityMaxLimit
      }
      this.setState({ quantity: tmp }, () => this.updateInstockStatus());
    }
  }
  handleChooseSize (sId, sdId) {
    let { specList } = this.state
    specList.filter(item => item.specId === sId)[0].chidren.map(item => {
      if (item.specDetailId === sdId) {
        item.selected = true
      } else {
        item.selected = false
      }
    })
    console.log(specList, 'sss')
    this.setState({ specList }, () => {
      this.matchGoods()
    })
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
  async hanldeAddToCart ({ redirect = false, needLogin = false } = {}) {
    this.setState({ checkOutErrMsg: "" });
    if (this.state.loading) {
      return false
    }
    if (this.isLogin) {
      this.hanldeLoginAddToCart({ redirect });
    } else {
      await this.hanldeUnloginAddToCart({ redirect, needLogin });
    }
  }
  async hanldeLoginAddToCart ({ redirect }) {
    this.setState({ addToCartLoading: true });
    const { quantity } = this.state;
    const { sizeList } = this.state.details;
    const currentSelectedSize = find(sizeList, (s) => s.selected);
    try {
      await sitePurchase({
        goodsInfoId: currentSelectedSize.goodsInfoId,
        goodsNum: quantity,
        goodsCategory: [this.specie, this.productRange, this.format.join('&')].join('/')
      });
      await this.checkoutStore.updateLoginCart()
      this.headerRef.current && this.headerRef.current.handleCartMouseOver();
      setTimeout(() => {
        this.headerRef.current && this.headerRef.current.handleCartMouseOut();
      }, 1000);
      this.setState({ addToCartLoading: false });
      if (redirect) {
        if (this.checkoutStore.tradePrice < process.env.REACT_APP_MINIMUM_AMOUNT) {
          this.setState({
            checkOutErrMsg: <FormattedMessage id="cart.errorInfo3" value={{ val: process.env.REACT_APP_MINIMUM_AMOUNT }} />
          })
          return false
        }

        // 库存不够，不能下单
        if (this.props.checkoutStore.outOfstockProNames.length) {
          this.setState({
            checkOutErrMsg: <FormattedMessage id="cart.errorInfo2"
              values={{ val: this.props.checkoutStore.outOfstockProNames.join('/') }} />
          })
          return false
        }
        // this.openPetModal()
        this.props.history.push('/prescription')
      }
    } catch (err) {
      console.log(err);
      this.setState({ errMsg: err.toString() })
    }
  }
  async hanldeUnloginAddToCart ({ redirect = false, needLogin = false }) {
    this.setState({ checkOutErrMsg: "" });
    if (this.state.loading) {
      return false
    }
    const { history } = this.props
    const { currentUnitPrice, quantity, instockStatus } = this.state;
    const { goodsId, sizeList } = this.state.details;
    const currentSelectedSize = find(sizeList, (s) => s.selected);
    let quantityNew = quantity;
    let tmpData = Object.assign(
      {},
      this.state.details,
      { quantity: quantityNew },
      // { currentAmount: currentUnitPrice * quantityNew }
    );
    let cartDataCopy = cloneDeep(this.props.checkoutStore.cartData);

    if (!instockStatus || !quantityNew) {
      return false
    }

    this.setState({ addToCartLoading: true });
    let flag = true;
    if (cartDataCopy && cartDataCopy.length) {
      const historyItem = find(
        cartDataCopy,
        (c) =>
          c.goodsId === goodsId &&
          currentSelectedSize.goodsInfoId ===
          find(c.sizeList, (s) => s.selected).goodsInfoId
      );
      if (historyItem) {
        flag = false;
        quantityNew += historyItem.quantity;
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
        return
      }
      cartDataCopy.push(tmpData);
    }
    await this.props.checkoutStore.updateUnloginCart(cartDataCopy)
    this.setState({ addToCartLoading: false });
    if (redirect) {
      if (this.checkoutStore.tradePrice < process.env.REACT_APP_MINIMUM_AMOUNT) {
        this.setState({
          checkOutErrMsg: <FormattedMessage id="cart.errorInfo3" value={{ val: process.env.REACT_APP_MINIMUM_AMOUNT }} />
        });
        return false
      }
      if (this.checkoutStore.outOfstockProNames.length) {
        this.setState({
          checkOutErrMsg: <FormattedMessage id="cart.errorInfo2"
            values={{ val: this.checkoutStore.outOfstockProNames.join('/') }} />
        })
        return false
      }
      if (needLogin) {
        // history.push({ pathname: '/login', state: { redirectUrl: '/cart' } })
      } else {
        history.push('/prescription')
      }
    }
    // todo 改为mobx
    this.headerRef.current.handleCartMouseOver();
    setTimeout(() => {
      this.headerRef.current.handleCartMouseOut();
    }, 1000);
  }
  changeTab (e, i) {
    this.setState({ activeTabIdx: i })
  }
  openPetModal () {
    this.setState({
      petModalVisible: true
    })
  }
  closePetModal () {
    if (this.state.isAdd === 2) {
      this.setState({
        isAdd: 0
      })
    }
    this.setState({
      petModalVisible: false
    })
  }
  petComfirm () {
    this.props.history.push('/prescription')
  }
  openNew () {
    this.setState({
      isAdd: 1
    })
    this.openPetModal()
  }
  closeNew () {
    this.setState({
      isAdd: 2
    })
    this.openPetModal()
  }
  render () {
    const createMarkup = (text) => ({ __html: text });
    const {
      details,
      images,
      quantity,
      stock,
      quantityMinLimit,
      instockStatus,
      currentUnitPrice,
      currentSubscriptionPrice,
      errMsg,
      addToCartLoading,
      specList,
      initing
    } = this.state;
    let event
    if (!this.state.initing) {
      event = {
        page: {
          type: 'Product',
          theme: this.specie
        }
      }
    }
    return (
      <div>
        {event ? <GoogleTagManager additionalEvents={event} /> : null}
        <Header
          ref={this.headerRef}
          showMiniIcons={true}
          showUserIcon={true}
          location={this.props.location}
          history={this.props.history}
        />
        {errMsg ? (
          <main className="rc-content--fixed-header">
            <div className="product-detail product-wrapper rc-bg-colour--brand3">
              <div
                className="rc-max-width--xl d-flex"
                style={{ margin: "50px 0" }}
              >
                <div className="ui-font-nothing text-center">
                  <i className="rc-icon rc-incompatible--sm rc-iconography"></i>
                  {errMsg}
                </div>
              </div>
            </div>
          </main>
        ) : (
            <main className="rc-content--fixed-header">
              <div className="product-detail product-wrapper rc-bg-colour--brand3">
                <div className="rc-max-width--xl">
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
                              <div className={`rc-full-width ${this.state.imageMagnifierCfg.show ? "show-image-magnifier" : ""}`}>
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
                                  className="rc-gamma ui-text-overflow-line2 text-break"
                                  title={details.goodsName}>
                                  {details.goodsName}
                                </h1>
                                <div className="rc-card__price flex-inline">
                                  <div className="display-inline" >
                                    <Rate def={this.state.productRate} disabled={true} /></div>
                                  <a href="#review-container" className='comments rc-margin-left--xs rc-text-colour--text'>{this.state.replyNum} <FormattedMessage id="reviews" /></a>
                                </div>
                                <h3 className="text-break">{details.goodsSubtitle}</h3>
                                <h3 className="text-break">
                                  <div className="rating-stars hidden-lg-down">
                                    <div className="product-number-rating clearfix">
                                      <div className="ratings pull-left"></div>
                                    </div>
                                  </div>
                                </h3>
                                <div
                                  className="description"
                                  dangerouslySetInnerHTML={createMarkup(
                                    details.goodsDescription
                                  )}
                                ></div>
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
                                >
                                  <div className="product-pricing__card__head d-flex align-items-center">
                                    {
                                      !initing && <>
                                        <div className="rc-input product-pricing__card__head__title">
                                          <FormattedMessage id="details.unitPrice" />
                                        </div>
                                        <b className="product-pricing__card__head__price red rc-padding-y--none">
                                          {formatMoney(currentUnitPrice)}
                                        </b>
                                      </>
                                    }
                                  </div>
                                  {
                                    find(details.sizeList, s => s.selected) && find(details.sizeList, s => s.selected).subscriptionStatus
                                      ? <>
                                        {
                                          !initing && <div className="product-pricing__card__head d-flex align-items-center">
                                            <span className="rc-icon rc-refresh--xs rc-brand1 position-absolute" style={{ transform: 'translate(-100%, 8%)' }}></span>
                                            <div className="rc-input product-pricing__card__head__title">
                                              <FormattedMessage id="details.Subscription" />
                                              <span className="red" style={{ fontSize: '.8em' }}>
                                                {' '}
                                            (<FormattedMessage id="save" />{' '}{SUBSCRIPTION_DISCOUNT_RATE})
                                          </span>
                                            </div>
                                            <b className="product-pricing__card__head__price red rc-padding-y--none">
                                              {formatMoney(currentSubscriptionPrice || 0)}
                                            </b>
                                          </div>
                                        }
                                        <span className="red" style={{ fontSize: '.9em' }}>
                                          <FormattedMessage id="subscription.promotionTip2" />
                                        </span>
                                      </>
                                      : null
                                  }
                                  {details &&
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
                                    ) : null}
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
                                                {/* {details.sizeList.map(
                                                  (item, i) => (

                                                  )
                                                )} */}
                                                {sItem.chidren.map((sdItem, i) => (
                                                  <div
                                                    key={i}
                                                    className={`rc-swatch__item ${sdItem.selected ? 'selected' : ''}`}
                                                    // item.selected
                                                    //   ? "selected"
                                                    //   : ""
                                                    onClick={() =>
                                                      this.handleChooseSize(sItem.specId, sdItem.specDetailId)
                                                    }
                                                  >
                                                    <span>
                                                      {sdItem.detailName}
                                                    </span>
                                                  </div>
                                                ))}
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
                                                  this.hanldeAmountChange("minus")
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
                                                  this.hanldeAmountChange("plus")
                                                }
                                              ></span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="availability  product-availability" style={{ display: details.sizeList.filter(el => el.selected).length ? 'block' : 'none' }}>
                                        <div className="align-left flex">
                                          <div className="stock__wrapper">
                                            <div className="stock">
                                              <label
                                                className={[
                                                  "availability",
                                                  instockStatus
                                                    ? "instock"
                                                    : "outofstock",
                                                ].join(" ")}
                                              >
                                                <span className="title-select">
                                                  <FormattedMessage id="details.availability" />{" "}
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
                                                      ? ""
                                                      : "out-stock",
                                                  ].join(" ")}
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
                                        <div className="cart-and-ipay">
                                          <button
                                            className={`add-to-cart rc-btn rc-btn--one rc-full-width ${addToCartLoading ? 'ui-btn-loading' : ''} ${!initing && instockStatus && quantity ? '' : 'rc-btn-solid-disabled'}`}
                                            data-loc="addToCart"
                                            style={{ lineHeight: "30px" }}
                                            onClick={() => this.hanldeAddToCart()}
                                          >
                                            <i className="fa rc-icon rc-cart--xs rc-brand3"></i>
                                            <FormattedMessage id="details.addToCart" />
                                          </button>
                                        </div>
                                      </div>
                                      <div className="product-pricing__cta prices-add-to-cart-actions rc-margin-top--xs rc-padding-top--xs toggleVisibility">
                                        <div className="cart-and-ipay">
                                          {
                                            this.isLogin
                                              ? <button
                                                className={`add-to-cart rc-btn rc-btn--one rc-full-width ${addToCartLoading ? 'ui-btn-loading' : ''} ${!initing && instockStatus && quantity ? '' : 'rc-btn-solid-disabled'}`}
                                                data-loc="addToCart"
                                                style={{ lineHeight: "30px" }}
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
                                              : <LoginButton
                                                beforeLoginCallback={async () =>
                                                  this.hanldeUnloginAddToCart({
                                                    redirect: true,
                                                    needLogin: true
                                                  })
                                                }
                                                btnClass={`add-to-cart rc-btn rc-btn--one rc-full-width ${addToCartLoading ? 'ui-btn-loading' : ''} ${!initing && instockStatus && quantity ? '' : 'rc-btn-solid-disabled'}`}
                                                history={this.props.history}>
                                                <FormattedMessage id="checkout" />
                                              </LoginButton>
                                          }
                                        </div>
                                      </div>
                                      {
                                        !this.isLogin && <div className="product-pricing__cta prices-add-to-cart-actions rc-margin-top--xs rc-padding-top--xs toggleVisibility">
                                          <div className="cart-and-ipay">
                                            <button
                                              className={`rc-styled-link color-999 ${addToCartLoading ? 'ui-btn-loading ui-btn-loading-border-red' : ''} ${!initing && instockStatus && quantity ? '' : 'rc-btn-disabled'}`}
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
                                      }
                                    </div>
                                  </div>
                                </div>
                                <div className={`text-break ${this.state.checkOutErrMsg ? '' : 'hidden'}`}>
                                  <aside
                                    className="rc-alert rc-alert--error rc-alert--with-close"
                                    role="alert"
                                    style={{ padding: ".5rem" }}
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
                              .subscriptionStatus ? (
                              <div style={{ textAlign: 'center' }}>
                                <FormattedMessage id="unLoginSubscriptionTips" />
                              </div>
                            ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {
                  this.state.goodsDetailTab.tabName.length
                    ? <div className="rc-max-width--xl rc-padding-x--sm">
                      <div className="rc-match-heights rc-content-h-middle rc-reverse-layout rc-padding-bottom--lg">
                        <div>
                          <div className="rc-border-bottom rc-border-colour--interface">
                            <nav className="rc-fade--x">
                              <ul className="rc-scroll--x rc-list rc-list--inline rc-list--align rc-list--blank" role="tablist">
                                {this.state.goodsDetailTab.tabName.map((ele, index) => (
                                  <li key={index}>
                                    <button
                                      className="rc-tab rc-btn rounded-0 border-top-0 border-right-0 border-left-0"
                                      data-toggle={`tab__panel-${index}`}
                                      aria-selected={this.state.activeTabIdx === index ? 'true' : 'false'}
                                      role="tab"
                                      onClick={e => this.changeTab(e, index)}>
                                      {ele}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </nav>
                          </div>
                          <div className="rc-tabs tabs-detail" style={{ marginTop: '40px' }}>
                            {this.state.goodsDetailTab.tabContent.map((ele, i) => (
                              <div
                                id={`tab__panel-${i}`}
                                key={i}
                                className="rc-tabs__content__single clearfix benefits ingredients rc-showhide"
                                aria-expanded={this.state.activeTabIdx === i ? 'true' : 'false'}
                              >
                                <div className="block">
                                  <p
                                    className="content rc-scroll--x"
                                    dangerouslySetInnerHTML={createMarkup(ele)} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    : null
                }
              </div>


              <div id="review-container">
                <Reviews id={this.state.goodsId} isLogin={this.isLogin} />
              </div>
              <div
                className="sticky-addtocart"
                style={{ transform: "translateY(-80px)" }}
              >
                <div className="rc-max-width--xl rc-padding-x--md d-sm-flex text-center align-items-center fullHeight justify-content-center">
                  <button
                    className={`rc-btn rc-btn--one js-sticky-cta rc-margin-right--xs--mobile ${addToCartLoading ? "ui-btn-loading" : ""} ${!initing && instockStatus && quantity ? "" : "rc-btn-solid-disabled"}`}
                    onClick={() => this.hanldeAddToCart()}
                  >
                    <span className="fa rc-icon rc-cart--xs rc-brand3"></span>
                    <span className="default-txt">
                      <FormattedMessage id="details.addToCart" />
                    </span>
                  </button>
                  {
                    this.isLogin
                      ? <button
                        className={`rc-btn rc-btn--one js-sticky-cta ${addToCartLoading ? 'ui-btn-loading' : ''} ${!initing && instockStatus && quantity ? '' : 'rc-btn-solid-disabled'}`}
                        onClick={() => this.hanldeAddToCart({ redirect: true, needLogin: false })}>
                        <span className="fa rc-icon rc-cart--xs rc-brand3 no-icon"></span>
                        <span className="default-txt">
                          <FormattedMessage id="checkout" />
                        </span>
                      </button>
                      : <LoginButton
                        beforeLoginCallback={async () =>
                          this.hanldeUnloginAddToCart({
                            redirect: true,
                            needLogin: true
                          })
                        }
                        btnClass={`rc-btn rc-btn--one js-sticky-cta ${addToCartLoading ? 'ui-btn-loading' : ''} ${!initing && instockStatus && quantity ? '' : 'rc-btn-solid-disabled'}`}
                        history={this.props.history}
                      >
                        <span className="fa rc-icon rc-cart--xs rc-brand3 no-icon"></span>
                        <span className="default-txt">
                          <FormattedMessage id="checkout" />
                        </span>
                      </LoginButton>
                  }
                  {
                    !this.isLogin && <button
                      className={`rc-styled-link color-999 ${addToCartLoading ? 'ui-btn-loading' : ''} ${!initing && instockStatus && quantity ? '' : 'rc-btn-disabled'}`}
                      onClick={() => this.hanldeAddToCart({ redirect: true })}>
                      <FormattedMessage id="GuestCheckout" />
                    </button>
                  }
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

export default Details
