import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BreadCrumbs from '@/components/BreadCrumbs'
import ImageMagnifier from '@/components/ImageMagnifier'
import { formatMoney } from "@/utils/utils.js";
import { FormattedMessage } from 'react-intl'
import { createHashHistory } from 'history'
import './index.css'
import { cloneDeep } from 'lodash'
import { getDetails } from '@/api/details'

class Details extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      details: {
        id: '',
        goodsName: '',
        goodsImg: 'https://wanmi-b2b.oss-cn-shanghai.aliyuncs.com/202004232138238027.PNG',
        goodsDescription: '',
        goodsDetail: '',
        sizeList: []
      },
      quantity: 1,
      stock: 0,
      instockStatus: true,
      quantityMinLimit: 1,
      currentUnitPrice: 0,
      showImageMagnifier: false,
      config: {},
      cartData: localStorage.getItem('rc-cart-data') ? JSON.parse(localStorage.getItem('rc-cart-data')) : [],
      loading: true
    }
    this.changeAmount = this.changeAmount.bind(this)
    this.handleAmountChange = this.handleAmountChange.bind(this)
    this.handleChooseSize = this.handleChooseSize.bind(this)
    this.hanldeAddToCart = this.hanldeAddToCart.bind(this)
    this.hanldeImgMouseEnter = this.hanldeImgMouseEnter.bind(this)
    this.headerRef = React.createRef();
  }
  componentDidMount () {
    this.setState({
      id: this.props.match.params.id
    }, () => this.queryDetails())
  }
  async queryDetails () {
    const { id } = this.state
    const res = await getDetails(id)
    this.setState({ loading: false })
    if (res && res.context && res.context.goodsSpecDetails) {
      let sizeList = []
      let goodsSpecDetails = res.context.goodsSpecDetails
      let goodsInfos = res.context.goodsInfos || []

      sizeList = goodsSpecDetails.map((g, idx) => {
        const targetInfo = goodsInfos.find(info => info.mockSpecDetailIds.includes(g.specDetailId))
        if (targetInfo) {
          g = Object.assign({}, g, targetInfo, { selected: idx ? false : true })
        }
        return g
      })

      const selectedSize = sizeList.find(s => s.selected)
      this.setState({
        details: Object.assign({},
          this.state.details,
          res.context.goods,
          { sizeList },
          { goodsInfoId: res.context.goodsInfos[0].goodsInfoId }
        ),
        stock: selectedSize.stock,
        currentUnitPrice: selectedSize.salePrice
      }, () => this.updateInstockStatus())
    }
  }
  updateInstockStatus () {
    this.setState({
      instockStatus: this.state.quantity <= this.state.stock
    })
  }
  changeAmount (type) {
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
      res = quantity + 1
    }
    this.setState({
      quantity: res
    }, () => { this.updateInstockStatus() })
  }
  handleAmountChange (e) {
    const val = e.target.value
    if (val === '') {
      this.setState({ quantity: val })
    } else {
      let tmp = parseInt(val)
      if (isNaN(tmp)) {
        tmp = 1
      }
      this.setState({ quantity: tmp }, () => this.updateInstockStatus())
    }
  }
  handleChooseSize (data, index) {
    const { sizeList } = this.state.details
    let list = cloneDeep(sizeList)
    let ret = list.map((elem, indx) => {
      if (indx === index) {
        elem = { ...elem, selected: true }
      } else {
        elem = { ...elem, selected: false }
      }
      return elem
    })
    this.setState({
      currentUnitPrice: data.salePrice,
      details: Object.assign({}, this.state.details, { sizeList: ret }),
      stock: data.stock || 0
    }, () => this.updateInstockStatus())
  }
  hanldeAddToCart ({ redirect = false }) {
    const { currentUnitPrice, quantity, cartData } = this.state
    const { id, sizeList } = this.state.details
    const tmpData = Object.assign({}, this.state.details, { quantity }, { currentAmount: currentUnitPrice * quantity })
    let newCartData

    if (cartData) {
      newCartData = cloneDeep(cartData)
      let targetData = newCartData.find(c => c.id === id)
      if (targetData && (sizeList.findIndex(l => l.selected) === targetData.sizeList.findIndex(s => s.selected))) {
        targetData.quantity += quantity
        targetData.currentAmount += quantity * currentUnitPrice
      } else {
        newCartData.push(tmpData)
      }
    } else {
      newCartData = []
      newCartData.push(tmpData)
    }

    localStorage.setItem('rc-cart-data', JSON.stringify(newCartData))
    this.setState({
      cartData: newCartData
    })
    if (redirect) {
      createHashHistory().push('/prescription')
    }
    this.headerRef.current.handleMouseOver()
    setTimeout(() => {
      this.headerRef.current.handleMouseOut()
    }, 1000)
  }
  hanldeImgMouseEnter () {
    if (document.querySelector('#J-details-img')) {
      this.setState({
        showImageMagnifier: true,
        config: {
          width: document.querySelector('#J-details-img').offsetWidth,
          height: document.querySelector('#J-details-img').offsetHeight,
          scale: 2
        }
      })
    }
  }
  render () {
    const createMarkup = text => ({ __html: text });
    const { details, quantity, stock, quantityMinLimit, instockStatus, currentUnitPrice, cartData } = this.state
    return (
      <div>
        <Header ref={this.headerRef} cartData={cartData} showMiniIcons={true} />
        <main className="rc-content--fixed-header">
          <div className="product-detail product-wrapper rc-bg-colour--brand3">
            <div className="rc-max-width--xl">
              <BreadCrumbs />
              <div className="rc-padding--sm--desktop">
                <div className="rc-content-h-top">
                  <div className={['rc-layout-container', 'rc-six-column', this.state.loading ? 'skt-loading' : ''].join(' ')}>
                    <div className="rc-column rc-double-width carousel-column skeleton">
                      <div className={['rc-full-width', this.state.showImageMagnifier ? 'show-image-magnifier' : ''].join(' ')}>
                        <div data-js-carousel data-image-gallery="true" data-move-carousel-up='md'
                          data-move-carousel-to='#new-carousel-container'>
                          <div className="rc-carousel rc-carousel__gallery-image" data-zoom-container="product-description-carousel"
                            data-zoom-factor="3">
                            <div onMouseEnter={() => this.hanldeImgMouseEnter(details.goodsImg)}>
                              {this.state.showImageMagnifier ?
                                <div className="details-img-container">
                                  <ImageMagnifier minImg={details.goodsImg} maxImg={details.goodsImg} config={this.state.config} />
                                </div> : <div>
                                  <picture className="d-flex">
                                    {/* <source
                                      srcSet={item.source1}
                                      media="(min-width: 1500px)" />
                                    <source
                                      srcSet={item.source2}
                                      media="(min-width: 1000px)" />
                                    <source
                                      srcSet={item.source3}
                                      media="(min-width: 500px)" /> */}
                                    <img
                                      id="J-details-img"
                                      src={details.goodsImg}
                                      alt="Product alt text" />
                                  </picture>
                                </div>}
                            </div>
                          </div>
                          <div className="rc-carousel__gallery-thumbnails-wrapper">
                            <div className="rc-carousel rc-carousel__gallery-thumbnails">
                              <div className="rc-carousel__gallery-thumbnail">
                                <figure className="rc-img--square"
                                  style={{ backgroundImage: 'url(' + details.goodsImg + ')' }}>
                                </figure>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- product details --> */}
                    <div className="rc-column rc-triple-width product-column skeleton">
                      <div className="wrap-short-des">
                        <h1 className="rc-gamma wrap-short-des--heading">
                          {details.goodsName}
                        </h1>
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
                                        <span className="value">$ {formatMoney(currentUnitPrice)}</span>
                                      </span>
                                    </span>
                                  </span>
                                </b>
                              </div>
                              <div className="product-pricing__card__body rc-margin-top--xs">
                                <div><FormattedMessage id="freeShipping" /></div>
                                <div className="toggleVisibility">
                                  <div className="product-selectors rc-padding-top--xs">
                                    <div id="choose-select">
                                      <div className="rc-margin-bottom--xs"><FormattedMessage id="details.theSize" />:</div>
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
                                          <span className="rc-icon rc-minus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-minus" onClick={() => this.changeAmount('minus')}></span>
                                          <input className="rc-quantity__input" id="quantity" name="quantity" type="number" value={quantity} min={quantityMinLimit} max={stock} onChange={this.handleAmountChange} maxLength="5" />
                                          <span className="rc-icon rc-plus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-plus" onClick={() => this.changeAmount('plus')}></span>
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
                                      <button className="add-to-cart rc-btn rc-btn--one rc-full-width" data-loc="addToCart" onClick={this.hanldeAddToCart}>
                                        <i className="fa rc-icon rc-cart--xs rc-brand3"></i>
                                        <FormattedMessage id="details.addToCart" />
                                      </button>
                                    </div>
                                  </div>
                                  <div className="product-pricing__cta prices-add-to-cart-actions rc-margin-top--xs rc-padding-top--xs toggleVisibility">
                                    <div className="cart-and-ipay">
                                      <button className="add-to-cart rc-btn rc-btn--one rc-full-width" data-loc="addToCart" onClick={() => this.hanldeAddToCart({ redirect: true })}>
                                        <i className="fa rc-icon rc-cart--xs rc-brand3 no-icon"></i>
                                        <FormattedMessage id="checkout" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
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
              <div
                className="rc-match-heights rc-content-h-middle rc-reverse-layout rc-padding-bottom--lg"
                dangerouslySetInnerHTML={createMarkup(details.goodsDetail)}>
              </div>
            </div>
          </div>
          <div className="sticky-addtocart" style={{ transform: 'translateY(-80px)' }}>
            <div className="rc-max-width--xl rc-padding-x--md d-sm-flex text-center align-items-center fullHeight justify-content-center">
              <button className="rc-btn rc-btn--one js-sticky-cta rc-margin-right--xs--mobile" onClick={this.hanldeAddToCart}>
                <span className="fa rc-icon rc-cart--xs rc-brand3"></span>
                <span className="default-txt"><FormattedMessage id="details.addToCart" /></span>
              </button>
              <button className="rc-btn rc-btn--one js-sticky-cta" onClick={() => this.hanldeAddToCart({ redirect: true })}>
                <span className="fa rc-icon rc-cart--xs rc-brand3 no-icon"></span>
                <span className="default-txt"><FormattedMessage id="checkout" /></span>
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
}

export default Details