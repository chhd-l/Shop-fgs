import React from 'react'
import Header from '../components/Header/index'
import Footer from '../components/Footer/index'
import MegaMenu from '../components/MegaMenu/index'
import '../assets/css/checkout.css'

function Buy () {
  return (
    <div>
      <Header />
      <MegaMenu />
      <main class="rc-content--fixed-header rc-bg-colour--brand3">
        <div id="checkout-main" class="rc-bg-colour--brand3 rc-bottom-spacing data-checkout-stage rc-max-width--lg">
          <div class="rc-padding--sm rc-padding-top--none">
            {/* <!-- progress --> */}
            <div class="checkout-steps rc-layout-container rc-margin-top--lg--mobile" data-loc="checkout-steps">
              <div class="rc-column rc-padding-x--none--mobile">
                <ul class="rc-list rc-list--inline rc-content-v-middle rc-padding--none">
                  <li class="checkout-steps__item active" data-step="shipping">
                    <span class="rc-header-with-icon"><i class="icon icon-delivery"></i>
                  Delivery
                </span>
                  </li>
                  <li class="checkout-steps__item" data-step="payment">
                    <span class="rc-header-with-icon">
                      <hr /><i class="icon icon-payment"></i>
                  Choose payment
                </span>
                  </li>
                  <li class="checkout-steps__item" data-step="confirmation">
                    <span class="rc-header-with-icon">
                      <hr /><i class="icon icon-validation"></i>
                  the confirmation
                </span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="rc-layout-container rc-three-column rc-max-width--xl">
              <div class="rc-column rc-double-width shipping__address">
                <div class="shipping-form">
                  <div class="card">
                    <div class="card-header rc-margin-bottom--xs">
                      <h4>Delivery address</h4>
                    </div>
                    <div class="container single-shipping">
                      <div class="tab-content">
                        <div class="card-body rc-padding--none" id="shipping-address" role="tabpanel">
                          <form novalidate="" autoComplete="on" method="POST" action="" class="address"
                            name="dwfrm_shipping" id="dwfrm_shipping">
                            <div class="rc-border-all rc-border-colour--interface checkout--padding rc-margin-bottom--sm">
                              <fieldset class="guest-customer-details-block">
                                <div class="rc-layout-container">
                                  <div class="rc-column rc-padding-y--none">
                                    <div class="form-group required">
                                      <label class="form-control-label" htmlFor="email">
                                        E-mail
                                  </label>
                                      <span class="rc-input rc-input--inline rc-full-width rc-input--full-width"
                                        input-setup="true">
                                        <input type="email" class="rc-input__control" id="email" data-loc="guestEmail"
                                          name="dwfrm_profile_customer_email" required="" aria-required="true" value=""
                                          maxlength="50" pattern="^[\w.%+-]+@[\w.-]+\.[\w]{2,6}$" />
                                        <label class="rc-input__label" htmlFor="id-text1"></label>
                                      </span>
                                      <div class="invalid-feedback"></div>
                                    </div>
                                  </div>
                                </div>
                              </fieldset>
                            </div>
                            <div class="rc-border-all rc-border-colour--interface checkout--padding rc-margin-bottom--sm">
                              <fieldset class="shipping-address-block rc-fieldset">
                                <div class="rc-layout-container">
                                  <div class="rc-column rc-padding-y--none">
                                    <div class="form-group required dwfrm_shipping_shippingAddress_addressFields_firstName">
                                      <label class="form-control-label" htmlFor="shippingFirstName">
                                        Name
                                  </label>
                                      <span class="rc-input rc-input--inline rc-full-width rc-input--full-width"
                                        input-setup="true">
                                        <input class="rc-input__control shippingFirstName" id="shippingFirstName"
                                          data-loc="shippingFirstName" type="text" value=""
                                          name="dwfrm_shipping_shippingAddress_addressFields_firstName" required=""
                                          aria-required="true" maxlength="50" />
                                        <label class="rc-input__label" htmlFor="id-text1"></label>
                                      </span>
                                      <div class="invalid-feedback">
                                        This field is required.
                                  </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="rc-layout-container">
                                  <div class="rc-column rc-padding-y--none">
                                    <div class="form-group required dwfrm_shipping_shippingAddress_addressFields_lastName">
                                      <label class="form-control-label" htmlFor="shippingLastName">
                                        Surname
                                  </label>
                                      <span class="rc-input rc-input--inline rc-full-width rc-input--full-width"
                                        input-setup="true">
                                        <input class="rc-input__control shippingLastName" id="shippingLastName"
                                          data-loc="shippingLastName" type="text" value=""
                                          name="dwfrm_shipping_shippingAddress_addressFields_lastName" required=""
                                          aria-required="true" maxlength="50" />
                                        <label class="rc-input__label" htmlFor="id-text1"></label>
                                      </span>
                                      <div class="invalid-feedback">
                                        This field is required.
                                  </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="rc-layout-container">
                                  <div class="rc-column rc-padding-y--none">
                                    <div class="form-group required dwfrm_shipping_shippingAddress_addressFields_country">
                                      <label class="form-control-label" htmlFor="shippingCountry">
                                        Country
                                  </label>
                                      <span class="rc-select rc-full-width rc-input--full-width rc-select-processed">
                                        <select data-js-select="" id="shippingCountry">
                                          <option>Russia</option>
                                        </select>
                                      </span>
                                    </div>
                                  </div>
                                  <div
                                    class="form-group rc-column rc-padding-y--none required dwfrm_shipping_shippingAddress_addressFields_districts_districtCode">
                                    <label class="form-control-label" htmlFor="shippingRegion">
                                      Region
                                </label>
                                    <span class="rc-select rc-full-width rc-input--full-width rc-select-processed">
                                      <select data-js-select="" id="shippingCountry">
                                        <option>Moscow</option>
                                        <option>Moscow region</option>
                                      </select>
                                    </span>
                                    <div class="invalid-feedback">
                                      This field is required.
                                </div>
                                  </div>
                                </div>
                                <div class="rc-layout-container">
                                  <div
                                    class="form-group rc-column rc-padding-y--none required dwfrm_shipping_shippingAddress_addressFields_city">
                                    <label class="form-control-label" htmlFor="shippingAddressCity">
                                      Town
                                </label>
                                    <span class="rc-select rc-full-width rc-input--full-width rc-select-processed">
                                      <select data-js-select="" id="shippingCountry">
                                        <option>1st Worker</option>
                                        <option>Ababurovo</option>
                                        <option>Akinshino</option>
                                      </select>
                                    </span>
                                  </div>
                                  <div
                                    class="form-group rc-column rc-padding-y--none dwfrm_shipping_shippingAddress_addressFields_states_stateCode">
                                    <label class="form-control-label" htmlFor="shippingState">District</label>
                                    <span class="rc-select rc-full-width rc-input--full-width rc-select-processed">
                                      <select data-js-select="" id="shippingCountry">
                                        <option>Other</option>
                                      </select>
                                    </span>
                                  </div>
                                </div>
                                <div class="rc-layout-container">
                                  <div class="rc-column rc-padding-y--none">
                                    <div class="form-group required dwfrm_shipping_shippingAddress_addressFields_address1">
                                      <label class="form-control-label" htmlFor="shippingAddressOne">Street</label>
                                      <span class="rc-input rc-input--inline rc-full-width rc-input--full-width"
                                        input-setup="true">
                                        <input class="rc-input__control shippingAddressOne" id="shippingAddressOne"
                                          type="text" name="dwfrm_shipping_shippingAddress_addressFields_address1"
                                          required="" aria-required="true" value="" maxlength="50" />
                                        <label class="rc-input__label" htmlFor="id-text1"></label>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div class="rc-layout-container">
                                  <div
                                    class="form-group rc-column rc-padding-y--none required dwfrm_shipping_shippingAddress_addressFields_house">
                                    <label class="form-control-label" htmlFor="shippingHouse">
                                      House
                                </label>
                                    <span class="rc-input rc-input--inline rc-full-width rc-input--full-width"
                                      input-setup="true">
                                      <input class="rc-input__control shippingHouse" id="shippingHouse"
                                        data-loc="shippingHouse" type="text"
                                        name="dwfrm_shipping_shippingAddress_addressFields_house" required=""
                                        aria-required="true" value="" maxlength="50" />
                                      <label class="rc-input__label" htmlFor="id-text1"></label>
                                    </span>
                                    <div class="invalid-feedback">Это поле обязательно для заполнения.</div>
                                  </div>
                                  <div
                                    class="form-group rc-column rc-padding-y--none dwfrm_shipping_shippingAddress_addressFields_housing">
                                    <label class="form-control-label" htmlFor="shippingHousing">
                                      Case / Building
                                </label>
                                    <span class="rc-input rc-input--inline rc-full-width rc-input--full-width"
                                      input-setup="true">
                                      <input class="rc-input__control shippingHousing" id="shippingHousing" type="text"
                                        name="dwfrm_shipping_shippingAddress_addressFields_housing" value="" maxlength="50" />
                                      <label class="rc-input__label" htmlFor="id-text1"></label>
                                    </span>
                                    <div class="invalid-feedback">Это поле обязательно для заполнения.</div>
                                  </div>
                                </div>
                                <div class="rc-layout-container">
                                  <div
                                    class="form-group rc-column rc-padding-y--none dwfrm_shipping_shippingAddress_addressFields_entrance">
                                    <label class="form-control-label" htmlFor="shippingEntrance">
                                      Porch
                                </label>
                                    <span class="rc-input rc-input--inline rc-full-width rc-input--full-width"
                                      input-setup="true">
                                      <input class="rc-input__control shippingEntrance" id="shippingEntrance" type="text"
                                        name="dwfrm_shipping_shippingAddress_addressFields_entrance" value=""
                                        maxlength="50" />
                                      <label class="rc-input__label" htmlFor="id-text1"></label>
                                    </span>
                                    <div class="invalid-feedback">Это поле обязательно для заполнения.</div>
                                  </div>
                                  <div
                                    class="form-group rc-column rc-padding-y--none dwfrm_shipping_shippingAddress_addressFields_appartment">
                                    <label class="form-control-label" htmlFor="shippingAppartment">
                                      Apartment
                                </label>
                                    <span class="rc-input rc-input--inline rc-full-width rc-input--full-width"
                                      input-setup="true">
                                      <input class="rc-input__control shippingAppartment" id="shippingAppartment"
                                        type="text" name="dwfrm_shipping_shippingAddress_addressFields_appartment" value=""
                                        maxlength="50" />
                                      <label class="rc-input__label" htmlFor="id-text1"></label>
                                    </span>
                                    <div class="invalid-feedback">Это поле обязательно для заполнения.</div>
                                  </div>
                                </div>
                                <div class="rc-layout-container">
                                  <div
                                    class="form-group rc-column rc-padding-y--none required dwfrm_shipping_shippingAddress_addressFields_postalCode">
                                    <label class="form-control-label" htmlFor="shippingZipCode">
                                      Index
                                </label>
                                    <span
                                      class="rc-input rc-input--inline rc-input--label rc-full-width rc-input--full-width"
                                      input-setup="true">
                                      <input class="rc-input__control shippingZipCode" id="shippingZipCode"
                                        data-loc="shippingZipCode" type="text"
                                        name="dwfrm_shipping_shippingAddress_addressFields_postalCode" required=""
                                        aria-required="true" value="" maxlength="6" minlength="6"
                                        pattern="(^\d{6}(-\d{4})?$)|(^[abceghjklmnprstvxyABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Za-z]{1} *\d{1}[A-Za-z]{1}\d{1}$)" />
                                      <label class="rc-input__label" htmlFor="id-text1"></label>
                                    </span>
                                    <div class="invalid-feedback">Это поле обязательно для заполнения.</div>
                                    <div>
                                      Example: 123456
                                </div>
                                    <a class="rc-styled-link" href="https://www.pochta.ru/post-index" target="_blank"
                                      aria-describedby="newTabText" title="Will open in a new tab" alt="Get zip code">
                                      Get zip code
                                </a>
                                  </div>
                                  <div
                                    class="form-group rc-column rc-padding-y--none required dwfrm_shipping_shippingAddress_addressFields_phone">
                                    <label class="form-control-label" htmlFor="shippingPhoneNumber">
                                      Phone number
                                </label>
                                    <span
                                      class="rc-input rc-input--inline rc-input--label rc-full-width rc-input--full-width"
                                      input-setup="true">
                                      <input class="rc-input__control input__phoneField shippingPhoneNumber"
                                        id="shippingPhoneNumber" data-loc="shippingPhoneNumber" type="text"
                                        data-inputmask="'mask': '+7 (999) 999-99-99'"
                                        name="dwfrm_shipping_shippingAddress_addressFields_phone" required=""
                                        aria-required="true" value="" maxlength="20" minlength="18" inputmode="text" />
                                      <label class="rc-input__label" htmlFor="shippingPhoneNumber">
                                      </label>
                                    </span>
                                    <div class="invalid-feedback">Пожалуйста, введите действующий номер телефона</div>
                                    <span>
                                      Example: +7 (923) 456 78 90
                                </span>
                                  </div>
                                </div>
                              </fieldset>
                            </div>
                            <fieldset class="shipping-method-block rc-fieldset">
                              <div class="card-header rc-margin-bottom--xs">
                                <h4>Delivery method:</h4>
                                <div class="js-shipping-methods-list">
                                  <div
                                    class="leading-lines shipping-method-list rc-border-all rc-border-colour--interface checkout--padding rc-margin-bottom--sm">
                                    <div class="row rc-padding-y--xs">
                                      <div class="col-6">
                                        <div class="form-check">
                                          <input id="shippingMethod-shippingMoscow"
                                            name="dwfrm_shipping_shippingAddress_shippingMethodID" type="radio"
                                            class="form-check-input clearfix input__radio xxx2x  radio"
                                            value="shippingMoscow" data-pickup="null" checked="" />
                                          <label class="form-check-label label__input  shipping-method-option"
                                            htmlFor="shippingMethod-shippingMoscow">
                                            <span class="display-name">
                                              Moscow inside the Moscow Ring Road
                                        </span>
                                            <span class="text-muted arrival-time">
                                              (1-2 days)
                                        </span>
                                          </label>
                                        </div>
                                      </div>
                                      <div class="col-6">
                                        <span class="shipping-method-pricing">
                                          <span class="shipping-cost">
                                            300 ₽
                                      </span>
                                          <span class="info-tooltip delivery-method-tooltip" data-tooltip="top-tooltip"
                                            data-tooltip-placement="top" data-tooltip-init="true" tabindex="0">
                                            i
                                      </span>

                                        </span>
                                      </div>
                                    </div>
                                    <div class="row rc-padding-y--xs">
                                      <div class="col-6">
                                        <div class="form-check">
                                          <input id="shippingMethod-shippingMoscowArea"
                                            name="dwfrm_shipping_shippingAddress_shippingMethodID" type="radio"
                                            value="shippingMoscowArea" class="form-check-input input__radio yyy2y  radio" />
                                          <label class="form-check-label label__input  shipping-method-option"
                                            htmlFor="shippingMethod-shippingMoscowArea">
                                            <span class="display-name">
                                              Moscow region and Moscow beyond the
                                              MKAD
                                        </span>
                                            <span class="text-muted arrival-time">
                                              (1-4 days)
                                        </span>
                                          </label>
                                        </div>
                                      </div>
                                      <div class="col-6">
                                        <span class="shipping-method-pricing">
                                          <span class="shipping-cost">
                                            500 ₽
                                      </span>
                                          <span class="info-tooltip delivery-method-tooltip" data-tooltip="top-tooltip"
                                            data-tooltip-placement="top" data-tooltip-init="true" tabindex="0">
                                            i
                                      </span>

                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </fieldset>
                            <div class="card">
                              <div class="card-header rc-margin-bottom--xs">
                                <h4>
                                  Delivery comment
                            </h4>
                              </div>
                              <span
                                class="rc-input nomaxwidth rc-margin-bottom--sm rc-border-all rc-border-colour--interface"
                                input-setup="true">
                                <textarea class="rc-input__textarea noborder" maxlength="1000"
                                  name="dwfrm_shipping_shippingAddress_deliveryComment" id="delivery-comment"
                                  data-loc="shippingDeliveryComment" value=""></textarea>
                                <label class="rc-input__label" htmlFor="delivery-comment"></label>
                              </span>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="place_order-btn card">
                  <div class="next-step-button">
                    <div class="rc-text--right">
                      <button class="rc-btn rc-btn--one submit-shipping" type="submit" name="submit" value="submit-shipping"
                        data-loc="shippingSubmit">
                        Choose payment
                  </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="product-summary rc-column">
                <h5 class="product-summary__title rc-margin-bottom--xs">Your order</h5>
                <a href="/ru/cart" class="product-summary__cartlink rc-styled-link">Edit</a>
                <div class="product-summary__inner">
                  <div class="product-summary__recap" data-loc="confirmOrderSummary">
                    <div class="product-summary__itemnbr checkout--padding rc-bg-colour--brand4">1 total product</div>
                    <div class="product-summary__recap__content">
                      <div class="rc-border-colour--interface rc-border-left rc-border-right checkout--padding">
                        <div class="product-summary__products">
                          <div class="product-summary__products__item uuid-3ab64fd26c17b64c44e4ba1a7e"
                            data-product-line-item="3ab64fd26c17b64c44e4ba1a7e">
                            <div class="product-line-item">
                              <div class="product-line-item-details d-flex flex-row">
                                <div class="item-image">
                                  <img class="product-image"
                                    src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw2aa045b9/products/RU/packshot_2016_FHN_DRY_Sterilised_37_4.png?sw=250&amp;sh=380&amp;sm=fit"
                                    alt="Sterilised 37" title="Sterilised 37" />
                                </div>
                                <div class="wrap-item-title">
                                  <div class="item-title">
                                    <div class="line-item-name capitalize">
                                      <span class="light">
                                        sterilised 37
                                  </span>
                                    </div>
                                  </div>
                                  <div class="line-item-total-price justify-content-start pull-left">
                                    <div class="item-attributes">
                                      <p class="line-item-attributes">
                                        4.00kg - 1 item
                                  </p>
                                    </div>
                                  </div>
                                  <div class="line-item-total-price justify-content-end pull-right">
                                    <div class="item-total-3ab64fd26c17b64c44e4ba1a7e price relative">
                                      <div class="strike-through non-adjusted-price">
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
                              <div class="item-options">
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="product-summary__fees order-total-summary">
                          <div class="row leading-lines subtotal-item">
                            <div class="col-8 start-lines">
                              <p class="order-receipt-label"><span>
                                Total
                            </span></p>
                            </div>
                            <div class="col-4 end-lines">
                              <p class="text-right"><span class="sub-total">
                                ₽ 2 616
                            </span></p>
                            </div>
                          </div>
                          <div class="row leading-lines order-discount hide-order-discount">
                            <div class="col-7 start-lines">
                              <p class="order-receipt-label"><span>Скидка на заказ</span></p>
                            </div>
                            <div class="col-5 end-lines">
                              <p class="text-right"><span class="order-discount-total"> - 0 ₽</span></p>
                            </div>
                          </div>
                          <div class="row leading-lines shipping-item">
                            <div class="col-7 start-lines">
                              <p class="order-receipt-label order-shipping-cost">
                                <span>
                                  Delivery
                            </span>
                              </p>
                            </div>
                            <div class="col-5 end-lines">
                              <p class="text-right"><span class="shipping-total-cost">
                                -
                            </span></p>
                            </div>
                          </div>
                          <div class="row leading-lines shipping-discount hide-shipping-discount">
                            <div class="col-7 start-lines">
                              <p class="order-receipt-label"><span>Скидка на доставку</span></p>
                            </div>
                            <div class="col-5 end-lines">
                              <p class="text-right"><span class="shipping-discount-total">- N/A</span></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="product-summary__total grand-total row leading-lines rc-bg-colour--brand4 checkout--padding">
                      <div class="col-6 start-lines order-receipt-label">
                        <span>total cost</span>
                      </div>
                      <div class="col-6 end-lines text-right">
                        <span class="grand-total-sum">-</span>
                      </div>
                    </div>
                  </div>
                  <div class="product-summary__coupon">
                    <div class="promo-group">
                      <div class="rc-hidden">
                        <p class="optional-promo">Введите промокод</p>
                      </div>
                      <div class="rc-full-width">
                        <form action="" class="promo-code-form" method="GET" name="promo-code-form">
                          <div class="form-group">
                            <div class="d-flex wrap-shipping">
                              <div class="shipping-code">
                                <input type="text" class="form-control coupon-code-field" id="couponCode" name="couponCode"
                                  placeholder="Promotional code" />
                                <div class="coupon-error">
                                  <span class="coupon-missing-error">Не введен код купона</span>
                                  <span class="coupon-error-message"></span>
                                </div>
                              </div>
                              <div class="promo-code-submit">
                                <button type="submit"
                                  class="rc-btn btn-primary btn-block promo-code-btn rc-padding--none ins-background-color-c13">
                                  <span class="rc-padding-x--xs">
                                    Confirm
                              </span>
                                  <div class="ins-additional-text-c13">
                                    promotional code
                              </div>
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div class="coupons-and-promos rc-full-width">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main >
      <Footer />
    </div >
  )
}

export default Buy