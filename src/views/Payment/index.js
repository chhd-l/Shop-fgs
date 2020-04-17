import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InterestedIn from "@/components/InterestedIn";
import "./index.css";

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      productList: [
        {
          id: "3003_RU",
          name: "Miniddd adult",
          url:
            "https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png",
          img:
            "https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=300&amp;sfrm=png 2x",
          description:
            "Mini Edalt: dry food for dogs aged 10 months to 8 years. MINI Adult is specially designed for dogs of small breeds (weighing from 4 to 10 kg). In the nutrition of dogs of small breeds, not only the adapted croquet size is important. They need more energy than large dogs, their growth period is shorter and their growth is more intense. As a rule, they live longer than large dogs, and are more picky in their diet.<ul><li>dsdsds</li></ul>",
          reference: 2323,
          sizeList: [
            {
              label: "2.00",
              price: 100,
              originalPrice: 120,
              unit: "kg",
              selected: true,
            },
            {
              label: "4.00",
              price: 300,
              originalPrice: 320,
              unit: "kg",
              selected: false,
            },
            {
              label: "6.00",
              price: 500,
              originalPrice: 530,
              unit: "kg",
              selected: false,
            },
          ],
          quantity: 1,
        },
      ],
      currentProduct: null,
      loading: true,
      modalShow: false,
    };
  }
  changeCache() {
    localStorage.setItem(
      "rc-cart-data",
      JSON.stringify(this.state.productList)
    );
  }
  addQuantity(item) {
    item.quantity++;
    this.setState({
      productList: this.state.productList,
    });
    this.changeCache();
  }
  subQuantity(item) {
    if (item.quantity > 1) {
      item.quantity--;
      this.setState({
        productList: this.state.productList,
      });
    }
    this.changeCache();
  }
  closeModal() {
    this.setState({
      currentProduct: null,
      modalShow: false,
    });
  }
  deleteProduct() {
    let { currentProduct, productList } = this.state;
    this.state.productList = productList.filter(
      (el) => el.id !== currentProduct.id
    );
    this.changeCache();
    this.closeModal();
  }
  changeSize(pItem, sizeItem) {
    pItem.sizeList.map((el) => (el.selected = false));
    sizeItem.selected = true;
    this.setState({
      productList: this.state.productList,
    });
    this.changeCache();
  }
  ChoosePayment() {
    const { history } = this.props;
    history.push("/payment/payment");
  }
  goConfirmation() {
    const { history } = this.props;
    history.push("/confirmation");
  }
  goDelivery() {
    const { history } = this.props;
    history.push("/payment/shipping");
  }
  goCart() {
    const { history } = this.props;
    history.push("/cart");
  }
  loadScript(src, callback) {
    var script = document.createElement('script'),
    head = document.getElementsByTagName('head')[0];
    script.type = 'text/javascript';
    script.charset = 'UTF-8';
    script.src = src;
    if (script.addEventListener) {
      script.addEventListener('load', function () {
        callback();
      }, false);
    } else if (script.attachEvent) {
      script.attachEvent('onreadystatechange', function () {
        var target = window.event.srcElement;
        if (target.readyState == 'loaded') {
          callback();
        }
      });
    }
    head.appendChild(script);
  }
  componentDidMount() {
    let productList = JSON.parse(localStorage.getItem("rc-cart-data"));
    this.setState({
      type: this.props.match.params.type,
    });
    this.loadScript('/royal/royal-canin.js', function() {
      console.log('haha')
    })
  }
  render() {
    return (
      <div>
        <Header />
        <main class="rc-content--fixed-header rc-bg-colour--brand3">
          <div
            id="checkout-main"
            class="rc-bg-colour--brand3 rc-bottom-spacing data-checkout-stage rc-max-width--lg"
            data-checkout-stage="payment"
          >
            <div class="rc-padding--sm rc-padding-top--none">
              <div
                class="checkout-steps rc-layout-container rc-margin-top--lg--mobile"
                data-loc="checkout-steps"
              >
                <div class="rc-column rc-padding-x--none--mobile">
                  <ul class="rc-list rc-list--inline rc-content-v-middle rc-padding--none">
                    <li
                      className={`checkout-steps__item ${
                        this.state.type == "shipping" ? "active" : ""
                      }`}
                      data-step="shipping"
                    >
                      <span class="rc-header-with-icon">
                        <i class="icon icon-delivery"></i>
                        Delivery
                      </span>
                    </li>
                    <li
                      className={`checkout-steps__item ${
                        this.state.type == "payment" ? "active" : ""
                      }`}
                      data-step="payment"
                    >
                      <span class="rc-header-with-icon">
                        <hr />
                        <i class="icon icon-payment"></i>
                        Choose payment
                      </span>
                    </li>
                    <li
                      className={`checkout-steps__item ${
                        this.state.type == "confirmation" ? "active" : ""
                      }`}
                      data-step="confirmation"
                    >
                      <span class="rc-header-with-icon">
                        <hr />
                        <i class="icon icon-validation"></i>
                        the confirmation
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="rc-layout-container rc-three-column rc-max-width--xl">
              <div class="rc-column rc-double-width shipping__address">
                <div
                  class="shipping-form"
                  style={{
                    display: this.state.type == "shipping" ? "block" : "none",
                  }}
                >
                  <div class="card">
                    <div class="card-header rc-margin-bottom--xs">
                      <h4>Delivery address</h4>
                    </div>
                    <div class="rc-border-all rc-border-colour--interface checkout--padding rc-margin-bottom--sm">
                      <fieldset class="shipping-address-block rc-fieldset">
                        <div class="rc-layout-container">
                          <div class="rc-column rc-padding-y--none">
                            <div class="form-group required dwfrm_shipping_shippingAddress_addressFields_firstName">
                              <label
                                class="form-control-label"
                                for="shippingFirstName"
                              >
                                Name
                              </label>
                              <span
                                class="rc-input rc-input--inline rc-full-width rc-input--full-width"
                                input-setup="true"
                              >
                                <input
                                  class="rc-input__control shippingFirstName"
                                  id="shippingFirstName"
                                  data-loc="shippingFirstName"
                                  type="text"
                                  value=""
                                  name="dwfrm_shipping_shippingAddress_addressFields_firstName"
                                  required=""
                                  aria-required="true"
                                  maxlength="50"
                                />
                                <label
                                  class="rc-input__label"
                                  for="id-text1"
                                ></label>
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
                              <label
                                class="form-control-label"
                                for="shippingLastName"
                              >
                                Surname
                              </label>
                              <span
                                class="rc-input rc-input--inline rc-full-width rc-input--full-width"
                                input-setup="true"
                              >
                                <input
                                  class="rc-input__control shippingLastName"
                                  id="shippingLastName"
                                  data-loc="shippingLastName"
                                  type="text"
                                  value=""
                                  name="dwfrm_shipping_shippingAddress_addressFields_lastName"
                                  required=""
                                  aria-required="true"
                                  maxlength="50"
                                />
                                <label
                                  class="rc-input__label"
                                  for="id-text1"
                                ></label>
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
                              <label
                                class="form-control-label"
                                for="shippingLastName"
                              >
                                Address
                              </label>
                              <span
                                class="rc-input rc-input--inline rc-full-width rc-input--full-width"
                                input-setup="true"
                              >
                                <input
                                  class="rc-input__control shippingLastName"
                                  id="shippingLastName"
                                  data-loc="shippingLastName"
                                  type="text"
                                  value=""
                                  name="dwfrm_shipping_shippingAddress_addressFields_lastName"
                                  required=""
                                  aria-required="true"
                                  maxlength="50"
                                />
                                <label
                                  class="rc-input__label"
                                  for="id-text1"
                                ></label>
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
                              <label
                                class="form-control-label"
                                for="shippingLastName"
                              >
                                Complement Address
                              </label>
                              <span
                                class="rc-input rc-input--inline rc-full-width rc-input--full-width"
                                input-setup="true"
                              >
                                <input
                                  class="rc-input__control shippingLastName"
                                  id="shippingLastName"
                                  data-loc="shippingLastName"
                                  type="text"
                                  value=""
                                  name="dwfrm_shipping_shippingAddress_addressFields_lastName"
                                  required=""
                                  aria-required="true"
                                  maxlength="50"
                                />
                                <label
                                  class="rc-input__label"
                                  for="id-text1"
                                ></label>
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
                              <label
                                class="form-control-label"
                                for="shippingCountry"
                              >
                                Country
                              </label>
                              <span class="rc-select rc-full-width rc-input--full-width rc-select-processed">
                                <select data-js-select="" id="shippingCountry">
                                  <option>Russia</option>
                                </select>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div class="rc-layout-container">
                          <div class="form-group rc-column rc-padding-y--none required dwfrm_shipping_shippingAddress_addressFields_city">
                            <label
                              class="form-control-label"
                              for="shippingAddressCity"
                            >
                              City
                            </label>
                            <span class="rc-select rc-full-width rc-input--full-width rc-select-processed">
                              <select data-js-select="" id="shippingCountry">
                                <option>1st Worker</option>
                                <option>Ababurovo</option>
                                <option>Akinshino</option>
                              </select>
                            </span>
                          </div>
                        </div>
                        <div class="rc-layout-container">
                          <div class="form-group rc-column rc-padding-y--none required dwfrm_shipping_shippingAddress_addressFields_postalCode">
                            <label
                              class="form-control-label"
                              for="shippingZipCode"
                            >
                              Index
                            </label>
                            <span
                              class="rc-input rc-input--inline rc-input--label rc-full-width rc-input--full-width"
                              input-setup="true"
                            >
                              <input
                                class="rc-input__control shippingZipCode"
                                id="shippingZipCode"
                                data-loc="shippingZipCode"
                                type="text"
                                name="dwfrm_shipping_shippingAddress_addressFields_postalCode"
                                required=""
                                aria-required="true"
                                value=""
                                maxlength="6"
                                minlength="6"
                                pattern="(^\d{6}(-\d{4})?$)|(^[abceghjklmnprstvxyABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Za-z]{1} *\d{1}[A-Za-z]{1}\d{1}$)"
                              />
                              <label
                                class="rc-input__label"
                                for="id-text1"
                              ></label>
                            </span>
                            <div class="invalid-feedback">
                              Это поле обязательно для заполнения.
                            </div>
                            <div>Example: 123456</div>
                          </div>
                          <div class="form-group rc-column rc-padding-y--none required dwfrm_shipping_shippingAddress_addressFields_phone">
                            <label
                              class="form-control-label"
                              for="shippingPhoneNumber"
                            >
                              Phone number
                            </label>
                            <span
                              class="rc-input rc-input--inline rc-input--label rc-full-width rc-input--full-width"
                              input-setup="true"
                            >
                              <input
                                class="rc-input__control input__phoneField shippingPhoneNumber"
                                id="shippingPhoneNumber"
                                data-loc="shippingPhoneNumber"
                                type="text"
                                data-inputmask="'mask': '+7 (999) 999-99-99'"
                                name="dwfrm_shipping_shippingAddress_addressFields_phone"
                                required=""
                                aria-required="true"
                                value=""
                                maxlength="20"
                                minlength="18"
                                inputmode="text"
                              />
                              <label
                                class="rc-input__label"
                                for="shippingPhoneNumber"
                              ></label>
                            </span>
                            <div class="invalid-feedback">
                              Пожалуйста, введите действующий номер телефона
                            </div>
                            <span>Example: +7 (923) 456 78 90</span>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                    <div class="card-header rc-margin-bottom--xs">
                      <h4>Billing address</h4>
                    </div>
                    <div class="rc-border-all rc-border-colour--interface checkout--padding rc-margin-bottom--sm">
                      <fieldset class="shipping-address-block rc-fieldset">
                        <div class="rc-layout-container">
                          <div class="rc-column rc-padding-y--none">
                            <div class="form-group required dwfrm_shipping_shippingAddress_addressFields_firstName">
                              <label
                                class="form-control-label"
                                for="shippingFirstName"
                              >
                                Name
                              </label>
                              <span
                                class="rc-input rc-input--inline rc-full-width rc-input--full-width"
                                input-setup="true"
                              >
                                <input
                                  class="rc-input__control shippingFirstName"
                                  id="shippingFirstName"
                                  data-loc="shippingFirstName"
                                  type="text"
                                  value=""
                                  name="dwfrm_shipping_shippingAddress_addressFields_firstName"
                                  required=""
                                  aria-required="true"
                                  maxlength="50"
                                />
                                <label
                                  class="rc-input__label"
                                  for="id-text1"
                                ></label>
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
                              <label
                                class="form-control-label"
                                for="shippingLastName"
                              >
                                Surname
                              </label>
                              <span
                                class="rc-input rc-input--inline rc-full-width rc-input--full-width"
                                input-setup="true"
                              >
                                <input
                                  class="rc-input__control shippingLastName"
                                  id="shippingLastName"
                                  data-loc="shippingLastName"
                                  type="text"
                                  value=""
                                  name="dwfrm_shipping_shippingAddress_addressFields_lastName"
                                  required=""
                                  aria-required="true"
                                  maxlength="50"
                                />
                                <label
                                  class="rc-input__label"
                                  for="id-text1"
                                ></label>
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
                              <label
                                class="form-control-label"
                                for="shippingLastName"
                              >
                                Address
                              </label>
                              <span
                                class="rc-input rc-input--inline rc-full-width rc-input--full-width"
                                input-setup="true"
                              >
                                <input
                                  class="rc-input__control shippingLastName"
                                  id="shippingLastName"
                                  data-loc="shippingLastName"
                                  type="text"
                                  value=""
                                  name="dwfrm_shipping_shippingAddress_addressFields_lastName"
                                  required=""
                                  aria-required="true"
                                  maxlength="50"
                                />
                                <label
                                  class="rc-input__label"
                                  for="id-text1"
                                ></label>
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
                              <label
                                class="form-control-label"
                                for="shippingLastName"
                              >
                                Complement Address
                              </label>
                              <span
                                class="rc-input rc-input--inline rc-full-width rc-input--full-width"
                                input-setup="true"
                              >
                                <input
                                  class="rc-input__control shippingLastName"
                                  id="shippingLastName"
                                  data-loc="shippingLastName"
                                  type="text"
                                  value=""
                                  name="dwfrm_shipping_shippingAddress_addressFields_lastName"
                                  required=""
                                  aria-required="true"
                                  maxlength="50"
                                />
                                <label
                                  class="rc-input__label"
                                  for="id-text1"
                                ></label>
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
                              <label
                                class="form-control-label"
                                for="shippingCountry"
                              >
                                Country
                              </label>
                              <span class="rc-select rc-full-width rc-input--full-width rc-select-processed">
                                <select data-js-select="" id="shippingCountry">
                                  <option>Russia</option>
                                </select>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div class="rc-layout-container">
                          <div class="form-group rc-column rc-padding-y--none required dwfrm_shipping_shippingAddress_addressFields_city">
                            <label
                              class="form-control-label"
                              for="shippingAddressCity"
                            >
                              City
                            </label>
                            <span class="rc-select rc-full-width rc-input--full-width rc-select-processed">
                              <select data-js-select="" id="shippingCountry">
                                <option>1st Worker</option>
                                <option>Ababurovo</option>
                                <option>Akinshino</option>
                              </select>
                            </span>
                          </div>
                        </div>
                        <div class="rc-layout-container">
                          <div class="form-group rc-column rc-padding-y--none required dwfrm_shipping_shippingAddress_addressFields_postalCode">
                            <label
                              class="form-control-label"
                              for="shippingZipCode"
                            >
                              Index
                            </label>
                            <span
                              class="rc-input rc-input--inline rc-input--label rc-full-width rc-input--full-width"
                              input-setup="true"
                            >
                              <input
                                class="rc-input__control shippingZipCode"
                                id="shippingZipCode"
                                data-loc="shippingZipCode"
                                type="text"
                                name="dwfrm_shipping_shippingAddress_addressFields_postalCode"
                                required=""
                                aria-required="true"
                                value=""
                                maxlength="6"
                                minlength="6"
                                pattern="(^\d{6}(-\d{4})?$)|(^[abceghjklmnprstvxyABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Za-z]{1} *\d{1}[A-Za-z]{1}\d{1}$)"
                              />
                              <label
                                class="rc-input__label"
                                for="id-text1"
                              ></label>
                            </span>
                            <div class="invalid-feedback">
                              Это поле обязательно для заполнения.
                            </div>
                            <div>Example: 123456</div>
                          </div>
                          <div class="form-group rc-column rc-padding-y--none required dwfrm_shipping_shippingAddress_addressFields_phone">
                            <label
                              class="form-control-label"
                              for="shippingPhoneNumber"
                            >
                              Phone number
                            </label>
                            <span
                              class="rc-input rc-input--inline rc-input--label rc-full-width rc-input--full-width"
                              input-setup="true"
                            >
                              <input
                                class="rc-input__control input__phoneField shippingPhoneNumber"
                                id="shippingPhoneNumber"
                                data-loc="shippingPhoneNumber"
                                type="text"
                                data-inputmask="'mask': '+7 (999) 999-99-99'"
                                name="dwfrm_shipping_shippingAddress_addressFields_phone"
                                required=""
                                aria-required="true"
                                value=""
                                maxlength="20"
                                minlength="18"
                                inputmode="text"
                              />
                              <label
                                class="rc-input__label"
                                for="shippingPhoneNumber"
                              ></label>
                            </span>
                            <div class="invalid-feedback">
                              Пожалуйста, введите действующий номер телефона
                            </div>
                            <span>Example: +7 (923) 456 78 90</span>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                    <fieldset class="shipping-method-block rc-fieldset">
                      <div class="card-header rc-margin-bottom--xs">
                        <h4>How to deliver :</h4>
                        <div class="js-shipping-methods-list">
                          <div class="leading-lines shipping-method-list rc-border-all rc-border-colour--interface checkout--padding rc-margin-bottom--sm">
                            <div class="row rc-padding-y--xs">
                              <div class="col-8">
                                <div class="form-check">
                                  <span class="display-name">
                                    Normal Delivery
                                  </span>
                                  <span class="text-muted arrival-time">
                                    (1-4 days)
                                  </span>
                                </div>
                              </div>
                              <div class="col-4">
                                <span class="shipping-method-pricing">
                                  <span class="shipping-cost">For Free</span>
                                  <span
                                    class="info-tooltip delivery-method-tooltip"
                                    data-tooltip="top-tooltip"
                                    data-tooltip-placement="top"
                                    data-tooltip-init="true"
                                    tabindex="0"
                                  >
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
                        <h4>Comment on delivery</h4>
                      </div>
                      <span
                        class="rc-input nomaxwidth rc-margin-bottom--sm rc-border-all rc-border-colour--interface"
                        input-setup="true"
                      >
                        <textarea
                          class="rc-input__textarea noborder"
                          maxlength="1000"
                          name="dwfrm_shipping_shippingAddress_deliveryComment"
                          id="delivery-comment"
                          data-loc="shippingDeliveryComment"
                          value=""
                        ></textarea>
                        <label
                          class="rc-input__label"
                          for="delivery-comment"
                        ></label>
                      </span>
                    </div>
                  </div>
                  <p>
                    <button
                      class="rc-btn rc-btn--one"
                      onClick={() => this.ChoosePayment()}
                    >
                      Choose a payment
                    </button>
                  </p>
                </div>
                <div
                  style={{
                    display: this.state.type == "payment" ? "block" : "none",
                  }}
                >
                  <div class="card shipping-summary">
                    <div class="card-header rc-margin-bottom--xs rc-padding-right--none clearfix">
                      <h4 class="pull-left">Address and Shipping Method</h4>
                      <span class="edit-button rc-styled-link rc-margin-top--xs pull-right" onClick={() => this.goDelivery()}>
                        Edit
                      </span>
                    </div>
                    <div class="card-body rc-padding--none">
                      <p class="shipping-addr-label multi-shipping padding-y--sm">
                        Addresses and shipping methods are indicated under your
                        goods.
                      </p>
                      <div
                        class="single-shipping"
                        data-shipment-summary="8b50610f77571c1ac58b609278"
                      >
                        <div
                          class="rc-border-all rc-border-colour--interface checkout--padding"
                          data-loc="placeOrderBillingSummary"
                        >
                          <div class="summary-details shipping rc-margin-bottom--xs">
                            <div
                              class="address-summary row"
                              data-loc="confirmOrderCustomerInfo"
                            >
                              <div class="col-md-6">
                                <div>
                                  <span class="firstName">minya</span>
                                  <span class="lastName">tang</span>
                                </div>
                                <div class="country">Russia</div>
                                <div class="districtCode">Moscow</div>
                                <div class="stateCode">Other</div>
                                <div>
                                  <span class="city">1st Worker</span>
                                  <span class="postalCode">123456</span>
                                </div>
                              </div>
                              <div class="col-md-6 address-summary-left">
                                <div class="address1">1-1</div>
                                <div>
                                  <span class="houselabel">House</span>
                                  <span class="house">1</span>
                                </div>
                                <div>
                                  <span class="housinglabel">
                                    Building / Building
                                  </span>
                                  <span class="housing">1</span>
                                  <span class="housingdash">-</span>
                                  <span class="entrancelabel">Entrance</span>
                                  <span class="entrance">1</span>
                                  <span class="entrancedash">-</span>
                                  <span class="appartmentlabel">Apartment</span>
                                  <span class="appartment">1</span>
                                </div>
                                <div class="shipping-phone">
                                  +7 (923) 456-78-90
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            class="rc-margin-bottom--xs delivery-comment"
                            style={{ display: "none" }}
                          >
                            <b>Delivery comment:</b> <span>null</span>
                          </div>
                          <div class="row summary-details leading-lines">
                            <div class="col-6 start-lines">
                              <div class="shipping-method">
                                <span class="shipping-method-title">
                                  Moscow region and Moscow beyond the MKAD
                                </span>
                                <span class="shipping-method-arrival-time">
                                  (1-4 days)
                                </span>
                              </div>
                            </div>
                            <div class="col-6">
                              <div class="pricing shipping-method-price">
                                500 ₽
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card payment-form">
                    <div class="card-body rc-padding--none">
                      <form
                        autocomplete="on"
                        method="POST"
                        data-address-mode="new"
                        name="dwfrm_billing"
                        id="dwfrm_billing"
                        novalidate=""
                      >
                        <div class="card-header with-tooltip-icon rc-margin-top--sm">
                          <h4>Payment Information</h4>
                        </div>
                        <div class="billing-payment">
                          <dl
                            class="billing-nav payment-information"
                            data-toggle-group=""
                            data-toggle-effect="rc-expand--vertical"
                            role="presentation"
                            data-payment-method-id="false"
                            data-is-new-payment="true"
                          >
                            <div class="rc-input rc-input--inline">
                                  <input
                                    class="rc-input__radio"
                                    id="id-radio-creditCard"
                                    value="creditCard"
                                    type="radio"
                                    name="radio-1"
                                  />
                                  <label
                                    class="rc-input__label--inline"
                                    for="id-radio-creditCard"
                                  >
                                    Credit card
                                  </label>
                                </div>
                            <div
                              class="rc-list__accordion-item"
                              data-method-id="CREDIT_CARD"
                            >
                              <dt role="heading">
                                
                              </dt>
                              <dd
                                class="rc-list__content rc-padding--none rc-expand--vertical"
                                id="accordion-content-CREDIT_CARD"
                                aria-labelledby="accordion-header-CREDIT_CARD"
                                role="region"
                                aria-expanded="true"
                                aria-hidden="false"
                                style={{ maxHeight: "none" }}
                              >
                                <div class="rc-border-all rc-border-colour--interface checkout--padding">
                                  <div
                                    class="credit-card-content"
                                    id="credit-card-content"
                                  >
                                    <div class="credit-card-form ">
                                      <div class="rc-margin-bottom--xs">
                                        <div class="content-asset">
                                          <p>We accept credit cards.</p>
                                        </div>
                                        <div class="row">
                                          <div class="col-sm-12">
                                            <div class="form-group">
                                              <label
                                                class="form-control-label"
                                                for="cardNumber"
                                              >
                                                Card number*
                                                <span class="logo-payment-card-list">
                                                  <img
                                                    class="logo-payment-card"
                                                    src="https://www.shop.royal-canin.ru/on/demandware.static/-/Sites/default/dwc6f3441f/visa-dark.svg"
                                                  />
                                                  <img
                                                    class="logo-payment-card"
                                                    src="https://www.shop.royal-canin.ru/on/demandware.static/-/Sites/default/dwaea8f072/amex-dark.svg"
                                                  />
                                                  <img
                                                    class="logo-payment-card"
                                                    src="https://www.shop.royal-canin.ru/on/demandware.static/-/Sites/default/dwdf81f151/mastercard-dark.svg"
                                                  />
                                                  <img
                                                    class="logo-payment-card"
                                                    src="https://www.shop.royal-canin.ru/on/demandware.static/-/Sites/default/dw55e4c2d2/discover-dark.svg"
                                                  />
                                                </span>
                                              </label>
                                              <div
                                                id="card-secure-fields"
                                                class="rc-padding-left--none"
                                              >
                                                <iframe
                                                  id="zoozIframe"
                                                  frameborder="0"
                                                  src="https://js.paymentsos.com/v2/iframe/latest/index.html#%7B%22po%22%3A%22https%3A%2F%2Fwww.shop.royal-canin.ru%22%2C%22pk%22%3A%227f25aba4-13e4-4f74-8f69-9f291b0d8d41%22%2C%22e%22%3A%22live%22%2C%22s%22%3A%7B%22base%22%3A%7B%22color%22%3A%22%23666%22%2C%22fontWeight%22%3A%22300%22%2C%22fontFamily%22%3A%22%5C%22RC%20TYPE%5C%22%2CRoboto%2CAvenir%2CHelvetica%2CArial%2Csans-serif%22%2C%22secureFields%22%3A%7B%22position%22%3A%22absolute%22%2C%22top%22%3A0%2C%22width%22%3A%22calc(100%25%20-%2045px)%22%7D%2C%22pan%22%3A%7B%22width%22%3A%2254%25%22%7D%2C%22expirationDate%22%3A%7B%22width%22%3A%2228%25%22%7D%2C%22cvv%22%3A%7B%22width%22%3A%2218%25%22%7D%7D%7D%2C%22ici%22%3Atrue%2C%22esn%22%3Atrue%2C%22elv%22%3Atrue%2C%22cnp%22%3A%22Card%20Number%22%2C%22edp%22%3A%22MM%20%2F%20YY%22%2C%22d%22%3Atrue%2C%22f%22%3Atrue%2C%22au%22%3Anull%2C%22snp%22%3Anull%2C%22st%22%3Anull%2C%22zai%22%3Anull%7D"
                                                  width="500"
                                                  height="50"
                                                ></iframe>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div class="row overflow_visible">
                                          <div class="col-sm-12">
                                            <div class="form-group required dwfrm_billing_creditCardFields_cardOwner">
                                              <label
                                                class="form-control-label"
                                                for="cardOwner"
                                              >
                                                cardowner
                                              </label>
                                              <span
                                                class="rc-input rc-input--full-width"
                                                input-setup="true"
                                              >
                                                <input
                                                  type="text"
                                                  class="rc-input__control form-control cardOwner"
                                                  id="cardOwner"
                                                  name="dwfrm_billing_creditCardFields_cardOwner"
                                                  required=""
                                                  aria-required="true"
                                                  value=""
                                                  maxlength="40"
                                                  autocomplete="cc-name"
                                                />
                                                <label
                                                  class="rc-input__label"
                                                  for="cardOwner"
                                                ></label>
                                              </span>
                                              <div class="invalid-feedback">
                                                This field is required.
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div class="row">
                                          <div class="col-sm-6">
                                            <div class="form-group required dwfrm_billing_contactInfoFields_email">
                                              <label
                                                class="form-control-label"
                                                for="email"
                                              >
                                                Email
                                              </label>
                                              <span
                                                class="rc-input rc-input--full-width"
                                                input-setup="true"
                                              >
                                                <input
                                                  type="text"
                                                  class="rc-input__control form-control email"
                                                  id="email"
                                                  data-loc="paymentEmail"
                                                  value=""
                                                  name="dwfrm_billing_contactInfoFields_email"
                                                  required=""
                                                  aria-required="true"
                                                  maxlength="254"
                                                  autocomplete="email"
                                                />
                                                <label
                                                  class="rc-input__label"
                                                  for="email"
                                                ></label>
                                              </span>
                                              <div class="invalid-feedback">
                                                This field is required.
                                              </div>
                                            </div>
                                          </div>
                                          <div class="col-sm-6">
                                            <div class="form-group required dwfrm_billing_contactInfoFields_phone">
                                              <label
                                                class="form-control-label"
                                                for="phoneNumber"
                                              >
                                                Phone number
                                              </label>
                                              <span
                                                class="rc-input rc-input--full-width"
                                                input-setup="true"
                                              >
                                                <input
                                                  type="tel"
                                                  class="rc-input__control form-control phone"
                                                  id="phoneNumber"
                                                  data-inputmask="'mask': '+7 (999) 999-99-99'"
                                                  data-loc="paymentPhoneNumber"
                                                  value=""
                                                  min-lenght="18"
                                                  max-length="18"
                                                  data-phonelength="18"
                                                  data-range-error="The phone number should contain 10 digits"
                                                  name="dwfrm_billing_contactInfoFields_phone"
                                                  required=""
                                                  aria-required="true"
                                                  maxlength="2147483647"
                                                  autocomplete="tel"
                                                  inputmode="text"
                                                />
                                                <label
                                                  class="rc-input__label"
                                                  for="phoneNumber"
                                                ></label>
                                              </span>
                                              <div class="invalid-feedback">
                                                This field is required.
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div class="row">
                                          <div class="col-sm-12 rc-margin-y--xs rc-text--center">
                                            <button
                                              class="rc-btn rc-btn--two card-confirm"
                                              id="card-confirm"
                                              data-loc="paymentCardConfirmation"
                                              type="button"
                                            >
                                              Confirm Card
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </dd>
                            </div>
                            <div class="rc-input rc-input--inline">
                              <input
                                class="rc-input__radio"
                                id="id-radio-payPal"
                                value="payPal"
                                type="radio"
                                name="radio-1"
                              />
                              <label
                                class="rc-input__label--inline"
                                for="id-radio-payPal"
                              >
                                PayPal
                              </label>
                            </div>
                          </dl>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div
                    id="capture_traditionalRegistration_form_item_ageIndicator"
                    class="miaa_check form-check required capture_form_item capture_form_item_ageIndicator form-group"
                  >
                    <div
                      id="capture_traditionalRegistration_form_item_inner_ageIndicator"
                      class="capture_checkbox capture_form_item_inner_ageIndicator form-check"
                    >
                      <label
                        for="capture_traditionalRegistration_ageIndicator"
                        class="form-check-label"
                      >
                        <input
                          id="capture_traditionalRegistration_ageIndicator"
                          type="checkbox"
                          class="capture_ageIndicator capture_required capture_input_checkbox form-check-input"
                          name="ageIndicator"
                        />
                        I have read the User Agreement and the Privacy Policy
                        and give my consent to the processing ot personal data,
                        including cross-border transfer
                      </label>
                    </div>
                  </div>
                  <div
                    id="capture_traditionalRegistration_form_item_ageIndicator"
                    class="miaa_check form-check required capture_form_item capture_form_item_ageIndicator form-group"
                  >
                    <div
                      id="capture_traditionalRegistration_form_item_inner_ageIndicator"
                      class="capture_checkbox capture_form_item_inner_ageIndicator form-check"
                    >
                      <label
                        for="capture_traditionalRegistration_ageIndicator"
                        class="form-check-label"
                      >
                        <input
                          id="capture_traditionalRegistration_ageIndicator"
                          type="checkbox"
                          class="capture_ageIndicator capture_required capture_input_checkbox form-check-input"
                          name="ageIndicator"
                        />
                        I confirm that I am 18 years old
                      </label>
                    </div>
                  </div>
                  <div class="place_order-btn card">
                    <div class="next-step-button">
                      <div class="rc-text--right">
                        <button
                          class="rc-btn rc-btn--one submit-payment"
                          type="submit"
                          name="submit"
                          value="submit-shipping"
                          data-loc="shippingSubmit"
                          onClick={() => this.goConfirmation()}
                        >
                          Further
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="product-summary rc-column">
                <h5 class="product-summary__title rc-margin-bottom--xs">
                  Your order
                </h5>
                <a
                  onClick={() => this.goCart()}
                  class="product-summary__cartlink rc-styled-link"
                >
                  Edit
                </a>
                <div class="product-summary__inner">
                  <div
                    class="product-summary__recap"
                    data-loc="confirmOrderSummary"
                  >
                    <div class="product-summary__itemnbr checkout--padding rc-bg-colour--brand4">
                      1 total product
                    </div>
                    <div class="product-summary__recap__content">
                      <div class="rc-border-colour--interface rc-border-left rc-border-right checkout--padding">
                        <div class="product-summary__products">
                          <div
                            class="product-summary__products__item uuid-3ab64fd26c17b64c44e4ba1a7e"
                            data-product-line-item="3ab64fd26c17b64c44e4ba1a7e"
                          >
                            <div class="product-line-item">
                              <div class="product-line-item-details d-flex flex-row">
                                <div class="item-image">
                                  <img
                                    class="product-image"
                                    src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw2aa045b9/products/RU/packshot_2016_FHN_DRY_Sterilised_37_4.png?sw=250&amp;sh=380&amp;sm=fit"
                                    alt="Sterilised 37"
                                    title="Sterilised 37"
                                  />
                                </div>
                                <div class="wrap-item-title">
                                  <div class="item-title">
                                    <div class="line-item-name capitalize">
                                      <span class="light">sterilised 37</span>
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
                                      <b class="pricing line-item-total-price-amount item-total-3ab64fd26c17b64c44e4ba1a7e light">
                                        ₽ 2 616
                                      </b>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="item-options"></div>
                            </div>
                          </div>
                        </div>
                        <div class="product-summary__fees order-total-summary">
                          <div class="row leading-lines subtotal-item">
                            <div class="col-8 start-lines">
                              <p class="order-receipt-label">
                                <span>Total</span>
                              </p>
                            </div>
                            <div class="col-4 end-lines">
                              <p class="text-right">
                                <span class="sub-total">₽ 2 616</span>
                              </p>
                            </div>
                          </div>
                          <div class="row leading-lines order-discount hide-order-discount">
                            <div class="col-7 start-lines">
                              <p class="order-receipt-label">
                                <span>Скидка на заказ</span>
                              </p>
                            </div>
                            <div class="col-5 end-lines">
                              <p class="text-right">
                                <span class="order-discount-total"> - 0 ₽</span>
                              </p>
                            </div>
                          </div>
                          <div class="row leading-lines shipping-item">
                            <div class="col-7 start-lines">
                              <p class="order-receipt-label order-shipping-cost">
                                <span>Delivery</span>
                              </p>
                            </div>
                            <div class="col-5 end-lines">
                              <p class="text-right">
                                <span class="shipping-total-cost">-</span>
                              </p>
                            </div>
                          </div>
                          <div class="row leading-lines shipping-discount hide-shipping-discount">
                            <div class="col-7 start-lines">
                              <p class="order-receipt-label">
                                <span>Скидка на доставку</span>
                              </p>
                            </div>
                            <div class="col-5 end-lines">
                              <p class="text-right">
                                <span class="shipping-discount-total">
                                  - N/A
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="product-summary__total grand-total row leading-lines rc-bg-colour--brand4 checkout--padding">
                      <div class="col-6 start-lines order-receipt-label">
                        <span>total cost</span>
                      </div>
                      <div class="col-6 end-lines text-right">
                        <span class="grand-total-sum">-</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default Payment;
