import React from 'react';
import Header from '@/components/Header'
import Footer from '@/components/Footer'
// import MegaMenu from '../../components/MegaMenu/index'
// import BreadCrumbs from '../../components/BreadCrumbs/index'
// import Filters from '../../components/Filters/index'
import './index.css'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      results: 33,
      productList: [
        // 占位用，不能删
        {
          pid: '3003_RU',
          name: 'Mini adult',
          href: '#',
          imgSrc: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png',
          imgSrcSet: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=300&amp;sfrm=png 2x',
          description: 'Mini Edalt: dry food for dogs aged 10 months to 8 years',
          price: 945
        }
      ],
      loading: true
    }
  }
  componentDidMount () {
    this.getProductList()
  }
  getProductList () {
    let res = [
      {
        pid: '3003_RU',
        name: 'Mini adult',
        href: '#',
        imgSrc: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png',
        imgSrcSet: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=300&amp;sfrm=png 2x',
        description: 'Mini Edalt: dry food for dogs aged 10 months to 8 years',
        price: 945
      },
      {
        pid: '3001_RU',
        name: 'Mini adult',
        href: '#',
        imgSrc: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png',
        imgSrcSet: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=300&amp;sfrm=png 2x',
        description: 'Mini Edalt: dry food for dogs aged 10 months to 8 years',
        price: 33
      },
      {
        pid: '3005_RU',
        name: 'Mini adult',
        href: '#',
        imgSrc: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png',
        imgSrcSet: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=300&amp;sfrm=png 2x',
        description: 'Mini Edalt: dry food for dogs aged 10 months to 8 years',
        price: 44
      },
      {
        pid: '3065_RU',
        name: 'Mini adult',
        href: '#',
        imgSrc: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png',
        imgSrcSet: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=300&amp;sfrm=png 2x',
        description: 'Mini Edalt: dry food for dogs aged 10 months to 8 years',
        price: 66
      },
      {
        pid: '3075_RU',
        name: 'Mini adult',
        href: '#',
        imgSrc: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png',
        imgSrcSet: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=300&amp;sfrm=png 2x',
        description: 'Mini Edalt: dry food for dogs aged 10 months to 8 years',
        price: 66
      }
    ]
    setTimeout(() => {
      this.setState({
        productList: res,
        loading: false
      })
    }, 1000)
  }
  render () {
    const { results, productList, loading } = this.state
    return (
      <div>
        <Header />
        <main class="rc-content--fixed-header">
          <div class="rc-bg-colour--brand3 rc-max-width--xl rc-padding--sm rc-bottom-spacing">
            <div class="rc-layout-container rc-one-column">
              <div class="rc-column">
                <a href="./boilerplate.html" title="Continue shopping">
                  <span class="rc-header-with-icon rc-header-with-icon--gamma"><span
                      class="rc-icon rc-left rc-iconography"></span>
                    Continue shopping
                  </span>
                </a>
              </div>
            </div>
            <div class="rc-layout-container rc-three-column cart cart-page">
              <div class="rc-column rc-double-width">
                <div class="cart-error-messaging cart-error"></div>
                <div class="rc-padding-bottom--xs">
                  <h5 class="rc-espilon rc-border-bottom rc-border-colour--interface rc-padding-bottom--xs">
                    Your basket
                  </h5>
                </div>
                <div id="product-cards-container">
                  <div class="rc-border-all rc-border-colour--interface product-info  uuid-3ab64fd26c17b64c44e4ba1a7e">
                    <div class="">
                      <div class="d-flex">
                        <div class="product-info__img w-100">
                          <img class="product-image"
                            src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw2aa045b9/products/RU/packshot_2016_FHN_DRY_Sterilised_37_4.png?sw=250&amp;sh=380&amp;sm=fit"
                            alt="Sterilised 37" title="Sterilised 37"/>
                        </div>
                        <div class="product-info__desc w-100 relative">
                          <div class="line-item-header rc-margin-top--xs rc-padding-right--sm">
                            <a href="/ru/Sterilised%2037-2537_RU.html">
                              <h4 class="rc-gamma rc-margin--none">Sterilised 37</h4>
                            </a>
                          </div>
                          <div class="cart-product-error-msg"></div>
                          <span class="remove-product-btn js-remove-product rc-icon rc-close--sm rc-iconography"></span>
                          <div
                            class="product-edit rc-margin-top--sm--mobile rc-margin-bottom--xs rc-padding--none rc-margin-top--xs d-flex flex-column flex-sm-row justify-content-between">
                            <div class="product-quickview product-null product-wrapper product-detail" data-pid="null">
                              <div class="detail-panel">
                                <section class="attributes">
                                  <div data-attr="size" class="swatch">
                                    <div class="cart-and-ipay">
                                      <div class="rc-swatch __select-size" id="id-single-select-size">
                                        <div class="rc-swatch__item">
                                          <span>
                                            0.40kg
                                            <i></i>
                                          </span>
                                        </div>
                                        <div class="rc-swatch__item">
                                          <span>
                                            2.00kg
                                            <i></i>
                                          </span>
                                        </div>
                                        <div class="rc-swatch__item">
                                          <span>
                                            4.00kg
                                            <i></i>
                                          </span>
                                        </div>
                                        <div class="rc-swatch__item">
                                          <span>
                                            10.00kg
                                            <i></i>
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </section>
                              </div>
                            </div>
                            <div class="rc-md-up">
                              <div class="product-card-footer product-card-price d-flex">
                                <div
                                  class="line-item-quantity text-lg-center rc-margin-right--xs rc-padding-right--xs mr-auto">
                                  <div class="rc-quantity d-flex">
                                    <span
                                      class=" rc-icon rc-minus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-minus"></span>
                                    <input class="rc-quantity__input" disabled="" id="quantity" name="quantity" type="number"
                                      value="1" min="1" max="10"/>
                                    <span class=" rc-icon rc-plus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-plus"
                                      data-quantity-error-msg="Вы не можете заказать больше 10"></span>
                                  </div>
                                </div>
                                <div class="line-item-total-price d-flex justify-content-center">
                                  <p
                                    class="line-item-price-info line-item-total-price-amount rc-margin-bottom--none rc-margin-right--xs flex-grow-1 text-right">
                                    =
                                  </p>
                                  <div class="item-total-3ab64fd26c17b64c44e4ba1a7e price">
                                    <div class="strike-through
                                  non-adjusted-price">
                                      null
                                    </div>
                                    <b
                                      class="pricing line-item-total-price-amount item-total-3ab64fd26c17b64c44e4ba1a7e light">
                                      ₽ 2 616
                                    </b>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="rc-column totals cart__total">
                <div class="rc-padding-bottom--xs">
                  <h5 class="rc-espilon rc-border-bottom rc-border-colour--interface rc-padding-bottom--xs">Total</h5>
                </div>
                <div class="group-order rc-border-all rc-border-colour--interface cart__total__content">
                  <div class="row">
                    <div class="col-12 total-items medium">
                      <span id="items-number">
                        1
                      </span>
                      in the basket
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-8">
                      Total
                    </div>
                    <div class="col-4 no-padding-left">
                      <p class="text-right sub-total">
                        ₽ 2 616
                      </p>
                    </div>
                  </div>
                  <div class="row order-discount hide-order-discount">
                    <div class="col-8">
                      <p>
                        Order discount</p>
                    </div>
                    <div class="col-4">
                      <p class="text-right order-discount-total">- 0 ₽</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-8">
                      <p>
                        Delivery
                      </p>
                    </div>
                    <div class="col-4">
                      <p class="text-right shipping-cost">
                        300 ₽
                      </p>
                    </div>
                  </div>
                  <div class="row shipping-discount ">
                    <div class="col-8">
                      <p>
                        Shipping discount
                      </p>
                    </div>
                    <div class="col-4">
                      <p class="text-right shipping-discount-total">
                        - 300 ₽
                      </p>
                    </div>
                  </div>
                  <div class="group-total">
                    <div class="row">
                      <div class="col-7 medium">
                        <strong>
                          total cost
                        </strong>
                      </div>
                      <div class="col-5">
                        <p class="text-right grand-total-sum medium">
                          ₽ 2 616
                        </p>
                      </div>
                    </div>
                    <div class="row checkout-proccess">
                      <div class="col-lg-12 checkout-continue">
                        <div class="rc-padding-y--xs rc-column rc-bg-colour--brand4">
                          <miaaoauth data-oauthlogintargetendpoint="2"
                            class="rc-btn rc-btn--one rc-btn--sm btn-block checkout-btn cart__checkout-btn "
                            aria-pressed="true">
                            Checkout
                          </miaaoauth>
                        </div>
                        <div class="js-dynamicGuestButtonBlock rc-padding-top--none text-center rc-bg-colour--brand4"
                          data-action="/on/demandware.store/Sites-RU-Site/ru_RU/Cart-GetGuestCheckoutButton">
                          <a href="https://www.shop.royal-canin.ru/ru/checkout" class="rc-styled-link rc-margin-top--xs"
                            data-loc="miniCartGuestBtn">
                            Continue without registration
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="rc-bottom-spacing rc-text-align-center">
              <h2 class="title rc-margin-bottom--md rc-beta rc-text--center">You might also be interested in</h2>
              <div class="rc-card-grid rc-match-heights rc-card-grid--fixed rc-four-column rc-padding-bottom--lg">
                <div class="rc-grid">
                  <div class="rc-card">
                    <div>
                      <a href="/ru/Mini%20Adult%20%28%D0%B2%20%D1%81%D0%BE%D1%83%D1%81%D0%B5%29-1096_RU.html">
                        <article class="rc-card--product rc-text--center rc-padding-y--xs rc-column rc-padding-x--none">
                          <picture class="rc-card__image">
                            <div class="rc-padding-bottom--xs">
                              <img class=""
                                src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw0247f661/products/RU/packshot_2017_SHN_DOG_WET_MINI_ADULT_Pouch_2018_1.jpg?sw=150&amp;sfrm=png"
                                srcset="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw0247f661/products/RU/packshot_2017_SHN_DOG_WET_MINI_ADULT_Pouch_2018_1.jpg?sw=150&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw0247f661/products/RU/packshot_2017_SHN_DOG_WET_MINI_ADULT_Pouch_2018_1.jpg?sw=300&amp;sfrm=png 2x"
                                alt="Mini Adult (in sauce)" title="Mini Adult (in sauce)"/>
                            </div>
                          </picture>
                          <div class="rc-card__body">
                            <div class="height-product-tile">
                              <header class="rc-text--center">
                                <h3 class="rc-card__title rc-gamma">
                                  Mini Adult (in sauce)
                                </h3>
                              </header>
                              <div class="Product-Key-words rc-text--center"></div>
                              <div class="rc-card__meta rc-margin-bottom--xs rc-text--center">
                                Mini edalt: wet food for dogs aged 10 months to 8
                                years
                              </div>
                            </div>
                            <span class="rc-card__price rc-text--center rc-margin--none">
                              <span>
                                <span>
                                  <span class="sales">
                                    <span class="value" content="672.00">
                                      672 ₽
                                    </span>
                                  </span>
                                </span>
                              </span>
                            </span>
                          </div>
                        </article>
                      </a>
                    </div>
                  </div>
                </div>
                <div class="rc-grid">
                  <div class="rc-card">
                    <div>
                      <a href="/ru/Mini%20Adult%20%28%D0%B2%20%D1%81%D0%BE%D1%83%D1%81%D0%B5%29-1096_RU.html">
                        <article class="rc-card--product rc-text--center rc-padding-y--xs rc-column rc-padding-x--none">
                          <picture class="rc-card__image">
                            <div class="rc-padding-bottom--xs">
                              <img class=""
                                src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw0247f661/products/RU/packshot_2017_SHN_DOG_WET_MINI_ADULT_Pouch_2018_1.jpg?sw=150&amp;sfrm=png"
                                srcset="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw0247f661/products/RU/packshot_2017_SHN_DOG_WET_MINI_ADULT_Pouch_2018_1.jpg?sw=150&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw0247f661/products/RU/packshot_2017_SHN_DOG_WET_MINI_ADULT_Pouch_2018_1.jpg?sw=300&amp;sfrm=png 2x"
                                alt="Mini Adult (in sauce)" title="Mini Adult (in sauce)"/>
                            </div>
                          </picture>
                          <div class="rc-card__body">
                            <div class="height-product-tile">
                              <header class="rc-text--center">
                                <h3 class="rc-card__title rc-gamma">
                                  Mini Adult (in sauce)
                                </h3>
                              </header>
                              <div class="Product-Key-words rc-text--center"></div>
                              <div class="rc-card__meta rc-margin-bottom--xs rc-text--center">
                                Mini edalt: wet food for dogs aged 10 months to 8
                                years
                              </div>
                            </div>
                            <span class="rc-card__price rc-text--center rc-margin--none">
                              <span>
                                <span>
                                  <span class="sales">
                                    <span class="value" content="672.00">
                                      672 ₽
                                    </span>
                                  </span>
                                </span>
                              </span>
                            </span>
                          </div>
                        </article>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </main>

        <Footer />
      </div >
    );
  }
}

export default Cart;
