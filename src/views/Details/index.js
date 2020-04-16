import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BreadCrumbs from '@/components/BreadCrumbs'
import InterestedIn from '@/components/InterestedIn'
import './index.css'

class Details extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      details: {
        pid: '',
        name: '',
        imgSrc: '',
        imgSrcSet: '',
        description: '',
        price: 0,
        reference: 0
      },
      amount: 1,
      amountMaxLimit: 10,
      amountMinLimit: 1
    }
    this.changeAmount = this.changeAmount.bind(this)
    this.handleAmountChange = this.handleAmountChange.bind(this)
  }
  componentDidMount () {
    this.setState({
      pid: Object.assign({}, this.state.details, { pid: this.props.match.params.id })
    }, () => this.getDetails())
  }
  getDetails () {
    const { pid } = this.state
    let res = {
      pid,
      name: 'Miniddd adult',
      imgSrc: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png',
      imgSrcSet: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=300&amp;sfrm=png 2x',
      description: 'Mini Edalt: dry food for dogs aged 10 months to 8 years',
      price: 945
    }
    setTimeout(() => {
      this.setState({
        details: Object.assign({}, res)
      })
    }, 1000)
  }
  changeAmount (type) {
    if (!type) return
    const { amount, amountMaxLimit } = this.state
    let res
    if (type === 'minus') {
      if (amount <= 1) {
        res = 1
      } else {
        res = amount - 1
      }
    } else {
      if (amount >= amountMaxLimit) {
        res = amountMaxLimit
      } else {
        res = amount + 1
      }
    }
    this.setState({
      amount: res
    })
  }
  handleAmountChange (e) {
    const val = e.target.value
    if (val === '') {
      this.setState({ amount: val })
    } else {
      const { amountMaxLimit, amountMinLimit } = this.state
      let tmp = parseInt(val)
      if (isNaN(tmp)) {
        tmp = 1
      }
      if (tmp > amountMaxLimit) {
        tmp = amountMaxLimit
      } else if (tmp < amountMinLimit) {
        tmp = amountMinLimit
      }
      this.setState({ amount: tmp })
    }
  }
  render () {
    const { details, amount, amountMaxLimit, amountMinLimit } = this.state
    return (
      <div>
        <Header />
        <main className="rc-content--fixed-header">
          <div className="product-detail product-wrapper rc-bg-colour--brand3">
            <div className="rc-max-width--xl">
              <BreadCrumbs data={[{ name: 'Dog', href: './doglist.html' }, { name: 'Mini adult', href: '' }]} />
              <div className="rc-padding--sm--desktop">
                <div className="rc-content-h-top">
                  <div className="rc-layout-container rc-six-column">
                    {/* <!-- carousel --> */}
                    <div className="rc-column rc-double-width carousel-column">
                      <div className="rc-full-width">
                        <div data-js-carousel="" className="rc-carousel rc-carousel__gallery-thumbnails">
                          <div className="rc-carousel__img">
                            <img className="w-100 loaded tns-complete"
                              src={details.imgSrc}
                              srcSet={details.imgSrcSet}
                              alt={details.name}
                              title={details.name} />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- product details --> */}
                    <div className="rc-column rc-triple-width product-column">
                      <div className="wrap-short-des">
                        <h1 className="rc-gamma wrap-short-des--heading">
                          {details.name}
                        </h1>
                        <label>
                          Reference: <span className="sku-value">{details.reference}</span>
                        </label>
                        <h3>
                          <div className="rating-stars hidden-lg-down">
                            <div className="product-number-rating clearfix">

                              <div className="ratings pull-left">
                              </div>
                            </div>
                          </div>
                        </h3>
                        <div className="description">
                          {details.description}
                          {/* <ul>
                            <li>Helps maintain optimal weight.</li>
                            <li>High palatability: even for fastidious dogs</li>
                            <li>Supports healthy skin and coat</li>
                            <li>Promotes dental health, takes into account the miniature size of the jaws</li>
                            <li>100% complete and balanced nutrition. </li>
                          </ul> */}
                        </div>
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
                                  <input className="rc-input__radio form-check-input" id="buybox-singlepurchase"
                                    value="singlepurchase" type="radio" name="selectedBuybox" checked />
                                  <label className="rc-input__label--inline" htmlFor="buybox-singlepurchase">One-time purchase</label>
                                </div>

                                <b className="product-pricing__card__head__price rc-padding-y--none js-price">
                                  <span>
                                    <span>
                                      <span className="sales">
                                        <span className="value" content="3369.00">3 369 ₽</span>
                                      </span>
                                    </span>
                                  </span>
                                </b>
                              </div>
                              <div className="product-pricing__card__body rc-margin-top--xs">
                                <div>Free shipping from $ 12</div>
                                <div className="toggleVisibility">
                                  <div className="product-selectors rc-padding-top--xs">
                                    <div id="choose-select">
                                      <div className="rc-margin-bottom--xs">The size:</div>
                                      <div data-attr="size">
                                        <div>
                                          <div className="rc-swatch __select-size" id="id-single-select-size">
                                            <div className="rc-swatch__item"
                                              data-url="https://www.shop.royal-canin.ru/on/demandware.store/Sites-RU-Site/ru_RU/Product-Variation?dwvar_3001__RU_size=2.00&amp;pid=3001_RU&amp;quantity=1"
                                              data-attr-value="2.00"
                                              value="https://www.shop.royal-canin.ru/on/demandware.store/Sites-RU-Site/ru_RU/Product-Variation?dwvar_3001__RU_size=2.00&amp;pid=3001_RU&amp;quantity=1">
                                              <span>
                                                2.00<i>kg</i>
                                              </span>
                                            </div>
                                            <div className="rc-swatch__item"
                                              data-url="https://www.shop.royal-canin.ru/on/demandware.store/Sites-RU-Site/ru_RU/Product-Variation?dwvar_3001__RU_size=4.00&amp;pid=3001_RU&amp;quantity=1"
                                              data-attr-value="4.00"
                                              value="https://www.shop.royal-canin.ru/on/demandware.store/Sites-RU-Site/ru_RU/Product-Variation?dwvar_3001__RU_size=&amp;pid=3001_RU&amp;quantity=1">
                                              <span>
                                                4.00<i>kg</i>
                                              </span>
                                            </div>
                                            <div className="rc-swatch__item"
                                              data-url="https://www.shop.royal-canin.ru/on/demandware.store/Sites-RU-Site/ru_RU/Product-Variation?dwvar_3001__RU_size=8.00&amp;pid=3001_RU&amp;quantity=1"
                                              data-attr-value="8.00"
                                              value="https://www.shop.royal-canin.ru/on/demandware.store/Sites-RU-Site/ru_RU/Product-Variation?dwvar_3001__RU_size=8.00&amp;pid=3001_RU&amp;quantity=1">
                                              <span>
                                                8.00<i>kg</i>
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div class="quantity-width start-lines" data-attr="size">
                                      <div class="quantity d-flex justify-content-between align-items-center">
                                        <span>Amount:</span>
                                        <input type="hidden" id="invalid-quantity" value="Пожалуйста, введите правильный номер." />
                                        <div class="rc-quantity text-right d-flex justify-content-end">
                                          <span class="rc-icon rc-minus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-minus" onClick={() => this.changeAmount('minus')}></span>
                                          <input class="rc-quantity__input" id="quantity" name="quantity" type="number" value={amount} min={amountMinLimit} max={amountMaxLimit} onChange={this.handleAmountChange} maxlength="2" />
                                          <span class="rc-icon rc-plus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-plus" onClick={() => this.changeAmount('plus')}></span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="availability  product-availability" data-ready-to-order="false"
                                    data-available="true">
                                    <div className="align-left flex">
                                      <div className="stock__wrapper">
                                        <div className="stock">
                                          <label className="availability instock ">
                                          {/* <label className="availability outofstock"> */}
                                            <span className="title-select">
                                              Availability:
                                            </span>
                                          </label>
                                          <span className="availability-msg" data-ready-to-order="true">
                                            In stock
                                            {/* <div className="out-stock">In stock</div> */}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="product-pricing__cta prices-add-to-cart-actions rc-margin-top--xs rc-padding-top--xs toggleVisibility">
                                    <div className="cart-and-ipay">
                                      <input type="hidden" className="add-to-cart-url"
                                        value="/on/demandware.store/Sites-RU-Site/ru_RU/Cart-AddProduct" />
                                      <button className="add-to-cart rc-btn rc-btn--one rc-full-width" data-loc="addToCart"
                                        data-pid="3001_RU">
                                        <i className="fa rc-icon rc-cart--xs rc-brand3"></i>
                                    Add to Cart
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
              <div className="rc-match-heights rc-content-h-middle rc-reverse-layout rc-padding-bottom--lg">
                <div className="rc-border-bottom rc-border-colour--interface ">
                  <nav className="rc-fade--x" data-toggle-group="">
                    <ul className="rc-scroll--x rc-list rc-list--inline rc-list--align rc-list--blank" role="tablist">
                      <li>
                        <button className="rc-tab rc-btn" data-toggle="tab__panel-1--single-b3c23a4b-28f7-442d-a45f-0d62fc6a951a"
                          role="tab">Description</button>
                      </li>
                      <li>
                        <button className="rc-tab rc-btn" data-toggle="tab__panel-2--single-b3c23a4b-28f7-442d-a45f-0d62fc6a951a"
                          role="tab">Beneficial features</button>
                      </li>
                      <li>
                        <button className="rc-tab rc-btn" data-toggle="tab__panel-3--single-b3c23a4b-28f7-442d-a45f-0d62fc6a951a"
                          role="tab">Ingredients</button>
                      </li>
                      <li>
                        <button className="rc-tab rc-btn" data-toggle="tab__panel-4--single-b3c23a4b-28f7-442d-a45f-0d62fc6a951a"
                          role="tab">Feeding recommendations</button>
                      </li>
                    </ul>
                  </nav>
                </div>
                {/* <!-- tabs --> */}
                <div className="rc-tabs" style={{ marginTop: '40px' }}>
                  <div id="tab__panel-1--single-b3c23a4b-28f7-442d-a45f-0d62fc6a951a"
                    className="rc-tabs__content__single clearfix">
                    <div className="block">
                      <p className="content"><span>
                        L-carnitine stimulates the metabolism of fats in the body.
                        It satisfies the high energy needs of small dogs thanks to
                        a precisely calculated energy intensity of the diet (3737 kcal / kg) and a balanced protein
                        content (26%).
                    </span></p>
                    </div>
                  </div>
                  <div id="tab__panel-2--single-b3c23a4b-28f7-442d-a45f-0d62fc6a951a" className="clearfix benefit flex">
                    <div className="rc-card-grid rc-match-heights rc-card-grid--fixed rc-two-column">
                      <div className="rc-grid">
                        <div className="block-with-icon">
                          <span className="rc-icon rc-rate-fill rc-iconography"></span>
                          <div className="block-with-icon__content">
                            <h5 className="block-with-icon__title">Adapted energy</h5>
                            <p>Helps maintain ideal weight through optimal calorie intake that meets the energy needs of small
                          dogs. The formula also contains L-carnitine.</p>
                          </div>
                        </div>
                      </div>
                      <div className="rc-grid">
                        <div className="block-with-icon">
                          <span className="rc-icon rc-rate-fill rc-iconography"></span>
                          <div className="block-with-icon__content">
                            <h5 className="block-with-icon__title">Improved palatability</h5>
                            <p>Exceptional palatability of the feed will satisfy even the most finicky dogs of small size.</p>
                          </div>
                        </div>
                      </div>
                      <div className="rc-grid">
                        <div className="block-with-icon">
                          <span className="rc-icon rc-rate-fill rc-iconography"></span>
                          <div className="block-with-icon__content">
                            <h5 className="block-with-icon__title">Skin and Wool Health</h5>
                            <p>The formula contains nutrients that help maintain healthy skin. Enriched with EPA-DHA fatty
                          acids.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="tab__panel-3--single-b3c23a4b-28f7-442d-a45f-0d62fc6a951a"
                    className="rc-tabs__content__single clearfix benefits ingredients">
                    <div className="block">
                      <p className="content"><span>
                        Full-feed dry food for adult dogs of small sizes (weighing from 1 to 10 kg) aged 10 months and older
                        MINI Adult (Mini Edalt).
                        INGREDIENTS: rice, dehydrated animal proteins (poultry), cereal flour, vegetable protein isolate *,
                        wheat, animal fats, animal protein hydrolyzate (flavoring additives), vegetable fiber, minerals,
                        fish oil, soybean oil, yeast and fermentation by-products, fructooligosaccharides.
                        All product information is presented directly on the packaging.
                    </span></p>
                    </div>
                  </div>
                  <div id="tab__panel-4--single-b3c23a4b-28f7-442d-a45f-0d62fc6a951a"
                    className="rc-tabs__content__single clearfix benefits ingredients">
                    <div className="block">
                      <div className="rc-table">
                        <div className="rc-scroll--x">
                          <table className="rc-table__table" data-js-table="">
                            <thead className="rc-table__thead">
                              <tr className="rc-table__row">
                                <th className="rc-table__th rc-espilon text-color-brand4">
                                  Adult dog weight</th>
                                <th className="rc-table__th rc-espilon text-color-brand4">
                                  Normal</th>
                              </tr>
                            </thead>
                            <tbody className="rc-table__tbody">
                              <tr className="rc-table__row">
                                <td className="rc-table__td rc-bg-colour--brand4">activity</td>
                                <td className="rc-table__td">Increased</td>
                              </tr>
                              <tr className="rc-table__row">
                                <td className="rc-table__td rc-bg-colour--brand4">activity</td>
                                <td className="rc-table__td"></td>
                              </tr>
                              <tr className="rc-table__row">
                                <td className="rc-table__td rc-bg-colour--brand4">
                                  2 kg</td>
                                <td className="rc-table__td">
                                  40 g</td>
                                <td className="rc-table__td rc-bg-colour--brand4">
                                  47 g</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <InterestedIn />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
}

export default Details