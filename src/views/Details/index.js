import React from 'react'
import Skeleton from 'react-skeleton-loader'
import GoogleTagManager from '@/components/GoogleTagManager'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BreadCrumbs from '@/components/BreadCrumbs'
import ImageMagnifier from '@/components/ImageMagnifier'
import {
  formatMoney,
  translateHtmlCharater,
  hanldePurchases,
  jugeLoginStatus,
  queryProps,
  flat
} from '@/utils/utils'
import {
  MINIMUM_AMOUNT,
  STOREID
} from "@/utils/constant"
import { FormattedMessage } from 'react-intl'
import { cloneDeep, findIndex, find } from 'lodash'
import {
  getDetails,
  getLoginDetails
} from '@/api/details'
import {
  miniPurchases,
  sitePurchase,
  sitePurchases,
  siteMiniPurchases
} from '@/api/cart'
import { getDict } from '@/api/dict'
import './index.css'

// todo
const STORE_CATE_ENUM = [
  {
    url: '/list/dogs',
    category: 'dogs',
    cateName: 'Prescription dogs',
    // lang: <FormattedMessage id="home.catogery3" />,
    lang: 'Dietas de Prescripción Veterinaria Perros',
  },
  {
    url: '/list/cats',
    category: 'cats',
    cateName: 'Prescription cats',
    // lang: <FormattedMessage id="home.catogery4" />,
    lang: 'Dietas de Prescripción Veterinaria Gatos',
  },
  {
    url: '/list/vcn',
    category: 'vcn',
    cateName: 'VD dogs',
    // lang: <FormattedMessage id="home.catogery1" />,
    lang: 'Dietas Veterinarias Perros'
  },
  {
    url: '/list/vd',
    category: 'vd',
    cateName: 'VD cats',
    // lang: <FormattedMessage id="home.catogery2" />,
    lang: 'Dietas Veterinarias Gatos'
  }
]

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
      currentUnitPrice: 0,
      imageMagnifierCfg: {
        show: false,
        config: {},
      },
      cartData: localStorage.getItem("rc-cart-data") ? JSON.parse(localStorage.getItem("rc-cart-data")) : [],
      loading: true,
      errMsg: "",
      checkOutErrMsg: "",
      addToCartLoading: false,
      tradePrice: "",
      specList: [],
      tabsValue: [],
      buyWay: 'Once'
    };
    this.hanldeAmountChange = this.hanldeAmountChange.bind(this);
    this.handleAmountInput = this.handleAmountInput.bind(this);
    this.handleChooseSize = this.handleChooseSize.bind(this);
    this.headerRef = React.createRef();

    this.specie = ''
    this.productRange = ''
    this.format = []
  }
  componentWillUnmount () {
    
  }
  componentDidMount () {
    this.setState(
      {
        id: this.props.match.params.id
      },
      () => this.queryDetails()
    );
  }
  matchGoods () {
    let { specList, details, currentUnitPrice, stock } = this.state
    let selectedArr = []
    let idArr = []
    let specText = ''
    specList.map(el => {
      if (el.chidren.filter(item => item.selected).length) {
        selectedArr.push(el.chidren.filter(item => item.selected)[0])
      }
    })
    selectedArr = selectedArr.sort((a, b) => a.specDetailId - b.specDetailId)
    selectedArr.map(el => {
      idArr.push(el.specDetailId)
      specText = specText + el.detailName + ' '
    })
    currentUnitPrice = details.marketPrice
    details.sizeList.map(item => {
      if (item.mockSpecDetailIds.join(',') === idArr.join(',')) {
        item.selected = true
        item.specText = specText
        currentUnitPrice = item.salePrice
        stock = item.stock
      } else {
        item.selected = false
      }
    })
    this.setState({ details, currentUnitPrice, stock }, () => {
      this.updateInstockStatus();
    })
  }
  async queryDetails () {
    const { id } = this.state;
    const tmpRequest = jugeLoginStatus() ? getLoginDetails : getDetails
    Promise.all([
      tmpRequest(id),
      queryProps()
    ])
      .then(resList => {
        const res = resList[0]
        if (res && res.context && res.context.goodsSpecDetails && resList[1]) {
          // 获取产品所属类别
          let tmpSpecie = find(res.context.storeCates, ele => ele.cateName.toLowerCase().includes('dog')) && 'Dog'
          if (!tmpSpecie) {
            tmpSpecie = find(res.context.storeCates, ele => ele.cateName.toLowerCase().includes('cat')) && 'Cat'
          }
          this.specie = tmpSpecie

          // 获取产品所属home页四个大类
          for (let item of res.context.storeCates) {
            const t = find(STORE_CATE_ENUM, ele => ele.cateName.toLowerCase() === item.cateName.toLowerCase())
            if (t) {
              this.productRange = t.lang
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
          let goodsSpecDetails = res.context.goodsSpecDetails;
          let goodsInfos = res.context.goodsInfos || [];

          sizeList = goodsInfos.map((g, idx) => {
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
                goodsDetailTab.tabName.push(key)
                goodsDetailTab.tabContent.push(translateHtmlCharater(tmpGoodsDetail[key]))
              }
            }
            this.setState({
              goodsDetailTab: goodsDetailTab
            })
          } catch (err) {
            getDict({
              type: 'goodsDetailTab',
              storeId: STOREID
            }).then(res => {
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
                { goodsCategory: [this.specie, this.productRange, this.format.join('&')].join('/') }),
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
          errMsg: <FormattedMessage id="details.errMsg2" />
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
      instockStatus: this.state.quantity <= this.state.stock,
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
  async hanldePurchasesForCheckout (data) {
    let param = data.map((ele) => {
      return {
        goodsInfoId: find(ele.sizeList, (s) => s.selected).goodsInfoId,
        goodsNum: ele.quantity,
        invalid: false,
      };
    });
    let res = await hanldePurchases(param);
    sessionStorage.setItem(
      "goodsMarketingMap",
      JSON.stringify(res.goodsMarketingMap)
    );
    sessionStorage.setItem(
      "rc-totalInfo",
      JSON.stringify({
        totalPrice: res.totalPrice,
        tradePrice: res.tradePrice,
        discountPrice: res.discountPrice,
      })
    );
    this.setState({
      tradePrice: res.tradePrice,
    });
  }
  async hanldePurchases () {
    const { sizeList } = this.state.details;
    const { cartData } = this.state;
    const currentSelectedSize = find(sizeList, (s) => s.selected);
    let res = await hanldePurchases([
      {
        goodsInfoId: currentSelectedSize.goodsInfoId,
        goodsNum: this.state.quantity,
        invalid: false,
      },
    ]);
    sessionStorage.setItem(
      "goodsMarketingMap",
      JSON.stringify(res.goodsMarketingMap)
    );
    sessionStorage.setItem(
      "rc-totalInfo",
      JSON.stringify({
        totalPrice: res.totalPrice,
        tradePrice: res.tradePrice,
        discountPrice: res.discountPrice,
      })
    );
    this.setState({
      tradePrice: res.tradePrice,
    });
  }
  handleAmountInput (e) {
    this.setState({ checkOutErrMsg: "" });
    const { quantityMinLimit } = this.state;
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
    if (this.state.loading) {
      return false
    }
    if (jugeLoginStatus()) {
      this.hanldeLoginAddToCart({ redirect });
    } else {
      this.hanldeUnloginAddToCart({ redirect, needLogin });
    }
  }
  async hanldeLoginAddToCart ({ redirect }) {
    const { quantity, cartData } = this.state;
    const { goodsId, sizeList } = this.state.details;
    const currentSelectedSize = find(sizeList, (s) => s.selected);
    try {
      await sitePurchase({
        goodsInfoId: currentSelectedSize.goodsInfoId,
        goodsNum: quantity,
        goodsCategory: [this.specie, this.productRange, this.format.join('&')].join('/')
      });
      this.headerRef.current.updateCartCache();
      this.headerRef.current.handleCartMouseOver();
      setTimeout(() => {
        this.headerRef.current.handleCartMouseOut();
      }, 1000);
      if (redirect) {
        // 获取购物车列表
        let siteMiniPurchasesRes = await siteMiniPurchases();
        siteMiniPurchasesRes = siteMiniPurchasesRes.context;
        // 获取总价
        let sitePurchasesRes = await sitePurchases({
          goodsInfoIds: siteMiniPurchasesRes.goodsList.map(
            (ele) => ele.goodsInfoId
          ),
        });
        sitePurchasesRes = sitePurchasesRes.context;
        if (sitePurchasesRes.tradePrice < MINIMUM_AMOUNT) {
          this.setState({
            checkOutErrMsg: <FormattedMessage id="cart.errorInfo3" />,
          });
          return false;
        }

        // 库存不够，不能下单
        if (find(cartData, (ele) => ele.buyCount > ele.stock)) {
          this.setState({
            errorShow: true,
            errorMsg: <FormattedMessage id="cart.errorInfo2" />,
          });
          return false;
        }

        // promotion相关
        sessionStorage.setItem(
          "goodsMarketingMap",
          JSON.stringify(sitePurchasesRes.goodsMarketingMap)
        );
        sessionStorage.setItem(
          "rc-totalInfo",
          JSON.stringify({
            totalPrice: sitePurchasesRes.totalPrice,
            tradePrice: sitePurchasesRes.tradePrice,
            discountPrice: sitePurchasesRes.discountPrice,
          })
        );

        localStorage.setItem('rc-cart-data-login', JSON.stringify(siteMiniPurchasesRes.goodsList))
        this.props.history.push('/prescription')
      }
    } catch (err) {
      console.log(err);
      this.setState({ errMsg: err.toString() })
    }
  }
  async hanldeUnloginAddToCart ({ redirect = false, needLogin = false }) {
    const { history } = this.props
    const { currentUnitPrice, quantity, cartData, instockStatus } = this.state;
    const { goodsId, sizeList } = this.state.details;
    const currentSelectedSize = find(sizeList, (s) => s.selected);
    let quantityNew = quantity;
    let tmpData = Object.assign(
      {},
      this.state.details,
      { quantity: quantityNew },
      { currentAmount: currentUnitPrice * quantityNew }
    );
    let cartDataCopy = cloneDeep(localStorage.getItem("rc-cart-data") ? JSON.parse(localStorage.getItem("rc-cart-data")) : []);

    if (!instockStatus || !quantityNew) {
      return;
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

    try {
      let res = await miniPurchases({
        goodsInfoDTOList: [
          {
            goodsInfoId: currentSelectedSize.goodsInfoId,
            goodsNum: quantityNew,
          },
        ],
      });
      let tmpObj = find(
        res.context.goodsList,
        (ele) => ele.goodsInfoId === currentSelectedSize.goodsInfoId
      );
      if (tmpObj) {
        if (quantityNew > tmpObj.stock) {
          quantityNew = tmpObj.stock;
          if (flag) {
            this.setState({
              quantity: quantityNew,
            });
          }
          tmpData = Object.assign(tmpData, { quantity: quantityNew });
        }
      }
    } catch (e) {
    } finally {
      this.setState({ addToCartLoading: false });
    }

    const idx = findIndex(
      cartDataCopy,
      (c) =>
        c.goodsId === goodsId &&
        currentSelectedSize.goodsInfoId ===
        find(c.sizeList, (s) => s.selected).goodsInfoId
    );
    tmpData = Object.assign(tmpData, {
      currentAmount: currentUnitPrice * quantityNew,
    });
    if (idx > -1) {
      cartDataCopy.splice(idx, 1, tmpData);
    } else {
      cartDataCopy.push(tmpData);
    }
    localStorage.setItem("rc-cart-data", JSON.stringify(cartDataCopy));
    this.setState({ cartData: cartDataCopy });
    this.headerRef.current.updateCartCache();
    if (redirect) {
      await this.hanldePurchasesForCheckout(cartDataCopy);
      if (this.state.tradePrice < MINIMUM_AMOUNT) {
        this.setState({
          checkOutErrMsg: <FormattedMessage id="cart.errorInfo3" />,
        });
        return false
      }
      if (needLogin) {
        history.push({ pathname: '/login', state: { redirectUrl: '/cart' } })
      } else {
        history.push('/prescription')
      }
    }
    this.headerRef.current.handleCartMouseOver();
    setTimeout(() => {
      this.headerRef.current.handleCartMouseOut();
    }, 1000);
  }
  changeTab (e, i) {
    this.setState({ activeTabIdx: i })
  }
  handleChange (e) {
    this.setState({
      buyWay: e.target.value
    }
    )
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
      cartData,
      errMsg,
      addToCartLoading,
      specList
    } = this.state;
    let event
    if (!this.state.initing) {
      event = {
        page: {
          type: 'Product',
          theme: [this.specie, this.productRange, this.format.join('&')].join('/')
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
                      <div
                        className={["rc-layout-container", "rc-six-column"].join(
                          " "
                        )}
                      >
                        <div className="rc-column rc-double-width carousel-column">
                          {this.state.loading ? (
                            <Skeleton
                              color="#f5f5f5"
                              width="100%"
                              height="100%"
                            />
                          ) : (
                              <div
                                className={[
                                  "rc-full-width",
                                  this.state.imageMagnifierCfg.show
                                    ? "show-image-magnifier"
                                    : "",
                                ].join(" ")}
                              >
                                <div
                                  className="d-flex justify-content-center ui-margin-top-1-md-down"
                                >
                                  {
                                    // this.state.imageMagnifierCfg.show ?

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
                                {/* <div className="d-flex justify-content-center">
                                <div className="rc-img--square rc-img--square-custom" style={{ backgroundImage: 'url(' + details.goodsImg + ')' }}></div>
                              </div> */}
                              </div>
                            )}
                        </div>
                        <div className="rc-column rc-triple-width product-column">
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
                                  <div className="product-pricing__card__head rc-margin-bottom--none d-flex align-items-center">
                                    <div className="rc-input product-pricing__card__head__title">
                                      <label>
                                        <FormattedMessage id="details.unitPrice" />
                                      </label>
                                    </div>

                                    <b className="product-pricing__card__head__price rc-padding-y--none js-price">
                                      <span>
                                        <span>
                                          <span className="sales">
                                            <span className="value">
                                              {formatMoney(currentUnitPrice)}
                                            </span>
                                          </span>
                                        </span>
                                      </span>
                                    </b>
                                  </div>
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
                                    <div>
                                      <FormattedMessage id="freeShipping" />
                                    </div>
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
                                            className={`btn-add-to-cart add-to-cart rc-btn rc-btn--one rc-full-width ${addToCartLoading ? 'ui-btn-loading' : ''} ${instockStatus && quantity ? '' : 'disabled'}`}
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
                                          <button
                                            className={`btn-add-to-cart add-to-cart rc-btn rc-btn--one rc-full-width ${addToCartLoading ? 'ui-btn-loading' : ''} ${instockStatus && quantity ? '' : 'disabled'}`}
                                            data-loc="addToCart"
                                            style={{ lineHeight: "30px" }}
                                            onClick={() =>
                                              this.hanldeAddToCart({
                                                redirect: true,
                                                needLogin: !jugeLoginStatus()
                                              })
                                            }
                                          >
                                            <i className="fa rc-icon rc-cart--xs rc-brand3 no-icon"></i>
                                            <FormattedMessage id="checkout" />
                                          </button>
                                        </div>
                                      </div>
                                      {/* {
                                        !jugeLoginStatus() && <div className="product-pricing__cta prices-add-to-cart-actions rc-margin-top--xs rc-padding-top--xs toggleVisibility">
                                          <div className="cart-and-ipay">
                                            <button
                                              className={`rc-styled-link color-999 ${addToCartLoading ? 'ui-btn-loading ui-btn-loading-border-red' : ''} ${instockStatus && quantity ? '' : 'disabled'}`}
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
                                      } */}
                                    </div>
                                  </div>
                                </div>
                                <div
                                  style={{
                                    display: this.state.checkOutErrMsg
                                      ? "block"
                                      : "none",
                                  }}
                                >
                                  <aside
                                    className="rc-alert rc-alert--error rc-alert--with-close"
                                    role="alert"
                                    style={{ padding: ".5rem" }}
                                  >
                                    <span style={{ paddingLeft: "0" }}>
                                      {this.state.checkOutErrMsg}
                                    </span>
                                  </aside>
                                </div>
                              </div>
                              <div className="product-pricing__warranty rc-text--center"></div>
                            </div>
                          </div>
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
                          <div className="rc-tabs" style={{ marginTop: '40px' }}>
                            {this.state.goodsDetailTab.tabContent.map((ele, i) => (
                              <div
                                id={`tab__panel-${i}`}
                                key={i}
                                className="rc-tabs__content__single clearfix benefits ingredients rc-showhide"
                                aria-expanded={this.state.activeTabIdx === i ? 'true' : 'false'}
                              >
                                <div className="block">
                                  <p
                                    className="content"
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
              <div
                className="sticky-addtocart"
                style={{ transform: "translateY(-80px)" }}
              >
                <div className="rc-max-width--xl rc-padding-x--md d-sm-flex text-center align-items-center fullHeight justify-content-center">
                  <button
                    className={[
                      "rc-btn",
                      "rc-btn--one",
                      "js-sticky-cta",
                      "rc-margin-right--xs--mobile",
                      "btn-add-to-cart",
                      addToCartLoading ? "ui-btn-loading" : "",
                      instockStatus && quantity ? "" : "disabled",
                    ].join(" ")}
                    onClick={() => this.hanldeAddToCart()}
                  >
                    <span className="fa rc-icon rc-cart--xs rc-brand3"></span>
                    <span className="default-txt">
                      <FormattedMessage id="details.addToCart" />
                    </span>
                  </button>
                  <button
                    className={`rc-btn rc-btn--one js-sticky-cta btn-add-to-cart ${addToCartLoading ? 'ui-btn-loading' : ''} ${instockStatus && quantity ? '' : 'disabled'}`}
                    onClick={() => this.hanldeAddToCart({ redirect: true, needLogin: !jugeLoginStatus() })}>
                    <span className="fa rc-icon rc-cart--xs rc-brand3 no-icon"></span>
                    <span className="default-txt">
                      <FormattedMessage id="checkout" />
                    </span>
                  </button>
                  {
                    !jugeLoginStatus() && <button
                      className={`rc-styled-link color-999 ${addToCartLoading ? 'ui-btn-loading' : ''} ${instockStatus && quantity ? '' : 'disabled'}`}
                      onClick={() => this.hanldeAddToCart({ redirect: true })}>
                      <FormattedMessage id="GuestCheckout" />
                    </button>
                  }
                </div>
              </div>
            </main>
          )}
        <Footer />
      </div>
    );
  }
}

export default Details
