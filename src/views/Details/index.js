import React from 'react'
import Skeleton from 'react-skeleton-loader'
import GoogleTagManager from '@/components/GoogleTagManager'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BreadCrumbs from '@/components/BreadCrumbs'
import ImageMagnifier from '@/components/ImageMagnifier'
import { formatMoney, translateHtmlCharater, hanldePurchases } from "@/utils/utils"
import { MINIMUM_AMOUNT } from "@/utils/constant"
import { FormattedMessage } from 'react-intl'
import { createHashHistory } from 'history'
import './index.css'
import { cloneDeep, findIndex, find } from 'lodash'
import { getDetails } from '@/api/details'
import { miniPurchases } from '@/api/cart'

class Details extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      details: {
        id: '',
        goodsName: '',
        goodsImg: 'https://wanmi-b2b.oss-cn-shanghai.aliyuncs.com/202004142026536251.jpg',
        goodsDescription: '',
        sizeList: [],
        images: [],
      },
      goodsDetail1: '',
      goodsDetail2: [],
      goodsDetail3: '',
      goodsDetail4: '',
      quantity: 1,
      stock: 0,
      instockStatus: true,
      quantityMinLimit: 1,
      currentUnitPrice: 0,
      showOnlyoneTab: false,
      showDescriptionTab: true,
      showGoodsDetail4: true,
      imageMagnifierCfg: {
        show: false,
        config: {}
      },
      cartData: localStorage.getItem('rc-cart-data') ? JSON.parse(localStorage.getItem('rc-cart-data')) : [],
      loading: true,
      errMsg: '',
      checkOutErrMsg: '',
      addToCartLoading: false,
      tradePrice: ''
    }
    this.hanldeAmountChange = this.hanldeAmountChange.bind(this)
    this.handleAmountInput = this.handleAmountInput.bind(this)
    this.handleChooseSize = this.handleChooseSize.bind(this)
    this.hanldeAddToCart = this.hanldeAddToCart.bind(this)
    this.hanldeImgMouseEnter = this.hanldeImgMouseEnter.bind(this)
    this.headerRef = React.createRef();
  }
  // componentWillMount() {
  //   console.log(1)
  //   console.log(localStorage.getItem("isRefresh"))
  //   if (localStorage.getItem("isRefresh")) {
  //     localStorage.removeItem("isRefresh");
  //     window.location.reload();
  //     return false
  //   }
  // }
  componentWillUnmount () {
    console.log(2)
    localStorage.setItem("isRefresh", true);
  }
  componentDidMount () {
    console.log(1)
    console.log(localStorage.getItem("isRefresh"))
    if (localStorage.getItem("isRefresh")) {
      localStorage.removeItem("isRefresh");
      window.location.reload();
      return false
    }
    this.setState({
      id: this.props.match.params.id
    }, () => this.queryDetails())
  }
  async queryDetails () {
    const { id } = this.state
    try {
      const res = await getDetails(id)
      this.setState({ loading: false })
      if (res && res.context && res.context.goodsSpecDetails) {
        let sizeList = []
        let goodsSpecDetails = res.context.goodsSpecDetails
        let goodsInfos = res.context.goodsInfos || []

        sizeList = goodsSpecDetails.map((g, idx) => {
          const targetInfo = find(goodsInfos, info => info.mockSpecDetailIds.includes(g.specDetailId))
          if (targetInfo) {
            g = Object.assign({}, g, targetInfo, { selected: idx ? false : true })
          }
          return g
        })

        const selectedSize = find(sizeList, s => s.selected)

        const goodsDetailList = this.handleDetailsHtml(res.context.goods.goodsDetail)
        goodsDetailList.map((item, i) => {
          this.setState({
            [`goodsDetail${i + 1}`]: item
          })
          return item
        })

        this.setState({
          details: Object.assign(
            {},
            this.state.details,
            res.context.goods,
            { sizeList }
          ),
          images: res.context.images,
          stock: selectedSize.stock,
          currentUnitPrice: selectedSize.salePrice,
          showOnlyoneTab: goodsDetailList.length === 1,
          showDescriptionTab: goodsDetailList.length === 1
        }, () => {
          this.updateInstockStatus()
          // this.hanldePurchases()
        })
      } else {
        // 没有规格的情况
        this.setState({
          errMsg: <FormattedMessage id="details.errMsg" />
        })
      }
    } catch (e) {
      console.log(e)
      console.table(e);
      this.setState({
        errMsg: <FormattedMessage id="details.errMsg2" />
      })
    }
  }
  handleDetailsHtml (details) {
    let res = []
    let fragment = document.createDocumentFragment();
    let div = document.createElement('div');
    div.innerHTML = details;
    fragment.appendChild(div);
    try {
      if (fragment.querySelector('.rc_proudct')) {
        res.push(translateHtmlCharater(fragment.querySelector('.rc_proudct_html_tab1').innerHTML))

        let tmpRes = []
        let tmpLiList = fragment.querySelector('.rc_proudct_html_tab2').querySelectorAll('li')
        Array.from(tmpLiList).map(item => {
          let tmpPList = []
          Array.from(item.querySelectorAll('p')).map(n => {
            tmpPList.push(translateHtmlCharater(n.innerHTML))
          })
          tmpRes.push(tmpPList)
        })
        res.push(tmpRes)

        res.push(translateHtmlCharater(fragment.querySelector('.rc_proudct_html_tab3').innerHTML))
        const tab4Element = fragment.querySelector('.rc_proudct_html_tab4')
        if (tab4Element) {
          res.push(tab4Element.innerHTML)
        } else {
          this.setState({ showGoodsDetail4: false })
        }
      } else {
        res.push(details)
      }
    } catch (e) {
      res = []
      res.push(details)
    }
    return res
  }
  updateInstockStatus () {
    this.setState({
      instockStatus: this.state.quantity <= this.state.stock
    })
  }
  hanldeAmountChange (type) {
    this.setState({ checkOutErrMsg: '' })
    if (!type) return
    const { quantity } = this.state
    let res
    if (type === 'minus') {
      if (quantity <= 1) {
        res = 1
      } else {
        res = quantity - 1
      }
    } else {
      res = (quantity || 0) + 1
    }
    this.setState({
      quantity: res
    }, () => {
      this.updateInstockStatus()
      // this.hanldePurchases()
    })
  }
  async hanldePurchasesForCheckout (data) {
    let param = data.map(ele => {
      return {
        goodsInfoId: find(ele.sizeList, s => s.selected).goodsInfoId,
        goodsNum: ele.quantity,
        invalid: false
      }
    })
    let res = await hanldePurchases(param)
    // let latestGoodsInfos = res.goodsInfos
    sessionStorage.setItem('goodsMarketingMap', JSON.stringify(res.goodsMarketingMap))
    sessionStorage.setItem('rc-totalInfo', JSON.stringify({
      totalPrice: res.totalPrice,
      tradePrice: res.tradePrice,
      discountPrice: res.discountPrice
    }))
    this.setState({
      tradePrice: res.tradePrice
    })
  }
  async hanldePurchases () {
    const { sizeList } = this.state.details
    const { cartData } = this.state
    const currentSelectedSize = find(sizeList, s => s.selected)
    // let preNum = cartData.reduce((total, item) => total + item.quantity, 0)
    let res = await hanldePurchases([{
      goodsInfoId: currentSelectedSize.goodsInfoId,
      goodsNum: this.state.quantity,
      invalid: false
    }])
    // let latestGoodsInfos = res.goodsInfos
    sessionStorage.setItem('goodsMarketingMap', JSON.stringify(res.goodsMarketingMap))
    sessionStorage.setItem('rc-totalInfo', JSON.stringify({
      totalPrice: res.totalPrice,
      tradePrice: res.tradePrice,
      discountPrice: res.discountPrice
    }))
    this.setState({
      tradePrice: res.tradePrice
    })
  }
  handleAmountInput (e) {
    this.setState({ checkOutErrMsg: '' })
    const { quantityMinLimit } = this.state
    const val = e.target.value
    if (val === '') {
      this.setState({ quantity: val })
    } else {
      let tmp = parseInt(val)
      if (isNaN(tmp)) {
        tmp = 1
      }
      if (tmp < quantityMinLimit) {
        tmp = quantityMinLimit
      }
      this.setState({ quantity: tmp }, () => this.updateInstockStatus())
    }
  }
  handleChooseSize (data, index) {
    this.setState({ checkOutErrMsg: '' })
    const { sizeList } = this.state.details
    let list = cloneDeep(sizeList)
    let ret = list.map((elem, indx) => {
      if (indx === index) {
        elem = Object.assign({}, elem, { selected: true })
      } else {
        elem = Object.assign({}, elem, { selected: false })
      }
      return elem
    })
    this.setState({
      currentUnitPrice: data.salePrice,
      details: Object.assign({}, this.state.details, { sizeList: ret }),
      stock: data.stock || 0
    }, () => this.updateInstockStatus())
  }
  async hanldeAddToCart ({ redirect = false }) {
    const { currentUnitPrice, quantity, cartData, instockStatus } = this.state
    const { goodsId, sizeList } = this.state.details
    const currentSelectedSize = find(sizeList, s => s.selected)
    let quantityNew = quantity
    let tmpData = Object.assign({}, this.state.details, { quantity: quantityNew }, { currentAmount: currentUnitPrice * quantityNew })
    let cartDataCopy = cloneDeep(cartData)

    if (!instockStatus || !quantityNew) {
      return
    }

    this.setState({ addToCartLoading: true })
    // this.hanldePurchases()
    let flag = true
    if (cartDataCopy && cartDataCopy.length) {
      const historyItem = find(cartDataCopy, c => c.goodsId === goodsId && currentSelectedSize.goodsInfoId === find(c.sizeList, s => s.selected).goodsInfoId)
      if (historyItem) {
        flag = false
        quantityNew += historyItem.quantity
        tmpData = Object.assign(tmpData, { quantity: quantityNew })
      }
    }

    try {
      let res = await miniPurchases({ goodsInfoDTOList: [{ goodsInfoId: currentSelectedSize.goodsInfoId, goodsNum: quantityNew }] })
      let tmpObj = find(res.context.goodsList, ele => ele.goodsInfoId === currentSelectedSize.goodsInfoId)
      if (tmpObj) {
        if (quantityNew > tmpObj.stock) {
          quantityNew = tmpObj.stock
          if (flag) {
            this.setState({
              quantity: quantityNew
            })
          }
          tmpData = Object.assign(tmpData, { quantity: quantityNew })
        }
      }
    } catch (e) {

    } finally {
      this.setState({ addToCartLoading: false })
    }

    const idx = findIndex(cartDataCopy, c => c.goodsId === goodsId && currentSelectedSize.goodsInfoId === find(c.sizeList, s => s.selected).goodsInfoId)
    tmpData = Object.assign(tmpData, { currentAmount: currentUnitPrice * quantityNew })
    if (idx > -1) {
      cartDataCopy.splice(idx, 1, tmpData)
    } else {
      cartDataCopy.push(tmpData)
    }
    localStorage.setItem('rc-cart-data', JSON.stringify(cartDataCopy))
    this.setState({ cartData: cartDataCopy })
    if (redirect) {
      await this.hanldePurchasesForCheckout(cartDataCopy)
      setTimeout(() => {
        if (this.state.tradePrice < MINIMUM_AMOUNT) {
          this.setState({ checkOutErrMsg: <FormattedMessage id="cart.errorInfo3" /> })
        } else {
          createHashHistory().push('/prescription')
        }
      })
    }
    this.headerRef.current.handleMouseOver()
    setTimeout(() => {
      this.headerRef.current.handleMouseOut()
    }, 1000)
  }
  hanldeImgMouseEnter () {
    if (document.querySelector('#J-details-img')) {
      this.setState({
        imageMagnifierCfg: Object.assign(this.state.imageMagnifierCfg, {
          show: true,
          config: {
            width: document.querySelector('#J-details-img').offsetWidth,
            height: document.querySelector('#J-details-img').offsetHeight,
            scale: 2
          }
        })
      })
    }
  }
  render () {
    const createMarkup = text => ({ __html: text });
    const { details, images, quantity, stock, quantityMinLimit, instockStatus, currentUnitPrice, cartData, errMsg, addToCartLoading } = this.state
    console.log(details, 'detail')
    const event = {
      "page": {
        "type": "Product",
        "hitTimestamp": new Date().toISOString(),
        "theme": "Cat or Dog"
      }
    }
    return (
      <div>
        <GoogleTagManager additionalEvents={event} />
        <Header ref={this.headerRef} cartData={cartData} showMiniIcons={true} location={this.props.location} />
        {
          errMsg
            ? <main className="rc-content--fixed-header">
              <div className="product-detail product-wrapper rc-bg-colour--brand3">
                <div className="rc-max-width--xl d-flex" style={{ margin: '50px 0' }}>
                  <div className="ui-font-nothing text-center">
                    <i className="rc-icon rc-incompatible--sm rc-iconography"></i>
                    {errMsg}
                  </div>
                </div>
              </div>
            </main>
            : <main className="rc-content--fixed-header">
              <div className="product-detail product-wrapper rc-bg-colour--brand3">
                <div className="rc-max-width--xl">
                  <BreadCrumbs />
                  <div className="rc-padding--sm--desktop">
                    <div className="rc-content-h-top">
                      <div className={['rc-layout-container', 'rc-six-column'].join(' ')}>
                        <div className="rc-column rc-double-width carousel-column">
                          {this.state.loading
                            ? <Skeleton color="#f5f5f5" width="100%" height="100%" />
                            : <div className={['rc-full-width', this.state.imageMagnifierCfg.show ? 'show-image-magnifier' : ''].join(' ')}>
                              <div className="d-flex justify-content-center ui-margin-top-1-md-down" onMouseEnter={() => this.hanldeImgMouseEnter(details.goodsImg)}>
                                {
                                  // this.state.imageMagnifierCfg.show ?
                                  
                                    <div className="details-img-container">
                                      <ImageMagnifier images={images} minImg={details.goodsImg} maxImg={details.goodsImg} config={this.state.imageMagnifierCfg.config} />
                                    </div> 
                                    
                                }
                              </div>
                              {/* <div className="d-flex justify-content-center">
                                <div className="rc-img--square rc-img--square-custom" style={{ backgroundImage: 'url(' + details.goodsImg + ')' }}></div>
                              </div> */}
                            </div>}
                        </div>
                        <div className="rc-column rc-triple-width product-column">
                          {this.state.loading
                            ? <div><Skeleton color="#f5f5f5" width="100%" count={7} /></div>
                            : <div className="wrap-short-des">
                              <h1 className="rc-gamma">
                                {details.goodsName}
                              </h1>
                              <h3>{details.goodsSubtitle}</h3>
                              <h3>
                                <div className="rating-stars hidden-lg-down">
                                  <div className="product-number-rating clearfix">
                                    <div className="ratings pull-left">
                                    </div>
                                  </div>
                                </div>
                              </h3>
                              <div className="description" dangerouslySetInnerHTML={createMarkup(details.goodsDescription)}></div>
                            </div>
                          }

                        </div>
                        {/* <!-- buybox --> */}
                        <div className="rc-column rc-triple-width buybox-column">
                          <div className="product-pricing v2 rc-full-width hide-cta">
                            <div className="product-pricing__inner">
                              <div className="product-pricing__cards d-flex flex-column flex-sm-column">
                                <div className="product-pricing__card singlepruchase selected" data-buybox="singlepruchase">
                                  <div className="product-pricing__card__head rc-margin-bottom--none d-flex align-items-center">
                                    <div className="rc-input product-pricing__card__head__title">
                                      <label><FormattedMessage id="details.unitPrice" /></label>
                                    </div>

                                    <b className="product-pricing__card__head__price rc-padding-y--none js-price">
                                      <span>
                                        <span>
                                          <span className="sales">
                                            <span className="value">{formatMoney(currentUnitPrice)}</span>
                                          </span>
                                        </span>
                                      </span>
                                    </b>
                                  </div>
                                  {
                                    details && find(details.sizeList, s => s.selected) && find(details.sizeList, s => s.selected).marketingLabels[0] && find(details.sizeList, s => s.selected).marketingLabels[0].marketingDesc
                                      ? <div className="product-pricing__card__head rc-margin-bottom--none d-flex align-items-center">
                                        <div className="rc-input product-pricing__card__head__title red d-flex justify-content-between">
                                          <span><FormattedMessage id="promotion" /> </span>
                                          <span>25% OFF</span>
                                        </div>
                                      </div>
                                      : null
                                  }
                                  <div className="product-pricing__card__body rc-margin-top--xs">
                                    <div><FormattedMessage id="freeShipping" /></div>
                                    <div className="toggleVisibility">
                                      <div className="product-selectors rc-padding-top--xs">
                                        <div id="choose-select">
                                          <div className="rc-margin-bottom--xs">
                                            
                                            {/* <FormattedMessage id="details.theSize" /> */}
                                            :</div>
                                          <div data-attr="size">
                                            <div>
                                              <div className="rc-swatch __select-size" id="id-single-select-size">
                                                {details.sizeList.map((item, i) => (
                                                  <div className={['rc-swatch__item', item.selected ? 'selected' : ''].join(' ')} key={i} onClick={() => this.handleChooseSize(item, i)}>
                                                    <span>
                                                      {item.detailName}
                                                    </span>
                                                  </div>
                                                ))}
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="quantity-width start-lines" data-attr="size">
                                          <div className="quantity d-flex justify-content-between align-items-center">
                                            <span><FormattedMessage id="amount" />:</span>
                                            <input type="hidden" id="invalid-quantity" value="Пожалуйста, введите правильный номер." />
                                            <div className="rc-quantity text-right d-flex justify-content-end">
                                              <span className="rc-icon rc-minus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-minus" onClick={() => this.hanldeAmountChange('minus')}></span>
                                              <input className="rc-quantity__input" id="quantity" name="quantity" type="number" value={quantity} min={quantityMinLimit} max={stock} onChange={this.handleAmountInput} maxLength="5" />
                                              <span className="rc-icon rc-plus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-plus" onClick={() => this.hanldeAmountChange('plus')}></span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="availability  product-availability">
                                        <div className="align-left flex">
                                          <div className="stock__wrapper">
                                            <div className="stock">
                                              <label className={['availability', instockStatus ? 'instock' : 'outofstock'].join(' ')} >
                                                <span className="title-select"><FormattedMessage id="details.availability" /> :</span>
                                              </label>
                                              <span className="availability-msg" data-ready-to-order="true">
                                                <div
                                                  className={[instockStatus ? '' : 'out-stock'].join(' ')}>
                                                  {instockStatus ? <FormattedMessage id="details.inStock" /> : <FormattedMessage id="details.outStock" />}
                                                </div>
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="product-pricing__cta prices-add-to-cart-actions rc-margin-top--xs rc-padding-top--xs toggleVisibility">
                                        <div className="cart-and-ipay">
                                          <button
                                            className={['btn-add-to-cart', 'add-to-cart', 'rc-btn', 'rc-btn--one', 'rc-full-width', addToCartLoading ? 'ui-btn-loading' : '', (instockStatus && quantity) ? '' : 'disabled'].join(' ')}
                                            data-loc="addToCart"
                                            style={{ lineHeight: '30px' }}
                                            onClick={this.hanldeAddToCart}>
                                            <i className="fa rc-icon rc-cart--xs rc-brand3"></i>
                                            <FormattedMessage id="details.addToCart" />
                                          </button>
                                        </div>
                                      </div>
                                      <div className="product-pricing__cta prices-add-to-cart-actions rc-margin-top--xs rc-padding-top--xs toggleVisibility">
                                        <div className="cart-and-ipay">
                                          <button
                                            className={['btn-add-to-cart', 'add-to-cart', 'rc-btn', 'rc-btn--one', 'rc-full-width', addToCartLoading ? 'ui-btn-loading' : '', instockStatus && quantity ? '' : 'disabled'].join(' ')}
                                            data-loc="addToCart"
                                            style={{ lineHeight: '30px' }}
                                            onClick={() => this.hanldeAddToCart({ redirect: true })}>
                                            <i className="fa rc-icon rc-cart--xs rc-brand3 no-icon"></i>
                                            <FormattedMessage id="checkout" />
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div style={{ display: this.state.checkOutErrMsg ? 'block' : 'none' }}>
                                  <aside className="rc-alert rc-alert--error rc-alert--with-close" role="alert" style={{ padding: '.5rem' }}>
                                    <span style={{ paddingLeft: '0' }}>{this.state.checkOutErrMsg}</span>
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

                <div className="rc-max-width--xl rc-padding-x--sm">
                  <div className="rc-match-heights rc-content-h-middle rc-reverse-layout rc-padding-bottom--lg">

                    <div style={{ display: this.state.showOnlyoneTab ? 'none' : 'block' }}>
                      <div className="rc-border-bottom rc-border-colour--interface">
                        <nav className="rc-fade--x" data-toggle-group="">
                          <ul className="rc-scroll--x rc-list rc-list--inline rc-list--align rc-list--blank" role="tablist">
                            {/* <li>
                        <button
                          className="rc-tab rc-btn"
                          data-toggle="tab__panel-1"
                          role="tab">
                          <FormattedMessage id="details.description" />
                        </button>
                      </li> */}
                            <li>
                              <button
                                className="rc-tab rc-btn"
                                data-toggle="tab__panel-2"
                                role="tab">
                                <FormattedMessage id="details.beneficialFeatures" />
                              </button>
                            </li>
                            <li>
                              <button
                                className="rc-tab rc-btn"
                                data-toggle="tab__panel-3"
                                role="tab">
                                <FormattedMessage id="details.ingredients" />
                              </button>
                            </li>
                            <li style={{ display: this.state.showGoodsDetail4 ? 'block' : 'none' }}>
                              <button
                                className="rc-tab rc-btn"
                                data-toggle="tab__panel-4"
                                role="tab">
                                <FormattedMessage id="details.feedingRecommendations" />
                              </button>
                            </li>
                          </ul>
                        </nav>
                      </div>
                      <div className="rc-tabs" style={{ marginTop: '40px' }}>
                        {/* <div id="tab__panel-1"
                    className="rc-tabs__content__single clearfix">
                    <div className="block">
                      <p className="content" dangerouslySetInnerHTML={createMarkup(this.state.goodsDetail1)}></p>
                    </div>
                  </div> */}
                        <div
                          id="tab__panel-2"
                          className="clearfix benefit flex">
                          <div className="d-flex flex-wrap">
                            {this.state.goodsDetail2.map((item, idx) => (
                              <div className="col-12 col-md-6" key={idx}>
                                <div className="block-with-icon">
                                  <span className="rc-icon rc-rate-fill rc-iconography"></span>
                                  <div className="block-with-icon__content">
                                    <h5 className="block-with-icon__title">{item.length && item[0]}</h5>
                                    <p>{item.length && item.length > 1 && item[1]}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div id="tab__panel-3"
                          className="rc-tabs__content__single clearfix benefits ingredients">
                          <div className="block">
                            <p className="content" dangerouslySetInnerHTML={createMarkup(this.state.goodsDetail3)}></p>
                          </div>
                        </div>
                        <div id="tab__panel-4"
                          className="rc-tabs__content__single clearfix benefits ingredients">
                          <div className="block">
                            <div className="rc-table">
                              <div className="rc-scroll--x">
                                <table className="rc-table__table" data-js-table="" dangerouslySetInnerHTML={createMarkup(this.state.goodsDetail4)}></table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: !this.state.showDescriptionTab ? 'none' : 'block' }}>
                      <div className="rc-border-bottom rc-border-colour--interface ">
                        <nav className="rc-fade--x" data-toggle-group="">
                          <ul className="rc-scroll--x rc-list rc-list--inline rc-list--align rc-list--blank" role="tablist">
                            <li>
                              <button
                                className="rc-tab rc-btn"
                                data-toggle="tab__panel-1-1"
                                role="tab">
                                <FormattedMessage id="details.description" />
                              </button>
                            </li>
                          </ul>
                        </nav>
                      </div>
                      <div className="rc-tabs" style={{ marginTop: '40px' }}>
                        <div id="tab__panel-1-1"
                          className="rc-tabs__content__single clearfix">
                          <div className="block">
                            <p className="content" dangerouslySetInnerHTML={createMarkup(this.state.goodsDetail1)}></p>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div className="sticky-addtocart" style={{ transform: 'translateY(-80px)' }}>
                <div className="rc-max-width--xl rc-padding-x--md d-sm-flex text-center align-items-center fullHeight justify-content-center">
                  <button
                    className={['rc-btn', 'rc-btn--one', 'js-sticky-cta', 'rc-margin-right--xs--mobile', 'btn-add-to-cart', addToCartLoading ? 'ui-btn-loading' : '', instockStatus && quantity ? '' : 'disabled'].join(' ')}
                    onClick={this.hanldeAddToCart}>
                    <span className="fa rc-icon rc-cart--xs rc-brand3"></span>
                    <span className="default-txt"><FormattedMessage id="details.addToCart" /></span>
                  </button>
                  <button
                    className={['rc-btn', 'rc-btn--one', 'js-sticky-cta', 'btn-add-to-cart', addToCartLoading ? 'ui-btn-loading' : '', instockStatus && quantity ? '' : 'disabled'].join(' ')}
                    onClick={() => this.hanldeAddToCart({ redirect: true })}>
                    <span className="fa rc-icon rc-cart--xs rc-brand3 no-icon"></span>
                    <span className="default-txt"><FormattedMessage id="checkout" /></span>
                  </button>
                </div>
              </div>
            </main >
        }
        <Footer />
      </div >
    )
  }
}

export default Details