import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Progress from '@/components/Progress'
import "./index.css";
import visaImg from "@/assets/images/credit-cards/visa.svg";
import amexImg from "@/assets/images/credit-cards/amex.svg";
import mastercardImg from "@/assets/images/credit-cards/mastercard.svg";
import discoverImg from "@/assets/images/credit-cards/discover.svg";
import paypalImg from "@/assets/images/credit-cards/paypal.png";

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      payMethod: "",
      billingChecked: true,
      isCompleteCredit: false,
      isReadPrivacyPolicyInit: true,
      isEighteenInit: true,
      isReadPrivacyPolicy: false,
      isEighteen: false,
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
      creditCardImgUrl: [visaImg, amexImg, mastercardImg, discoverImg],
      deliveryAddress: {
        firstName: "",
        lastName: "",
        address1: "",
        address2: "",
        country: "Russia",
        city: "1st Worker",
        postCode: "",
        phoneNumber: "",
      },
      billingAddress: {
        firstName: "",
        lastName: "",
        address1: "",
        address2: "",
        country: "Russia",
        city: "1st Worker",
        postCode: "",
        phoneNumber: "",
      },
      creditCardInfo: {
        cardNumber: "",
        cardDate: "",
        cardCVV: "",
        cardOwner: "",
        email: "",
        phoneNumber: "",
      },
      commentOnDelivery: "",
      currentProduct: null,
      loading: true,
      modalShow: false,
    };
  }

  ChoosePayment() {
    const { deliveryAddress, billingAddress, billingChecked } = this.state;
    if (billingChecked) {
      localStorage.setItem(
        "deliveryInfo",
        JSON.stringify({ deliveryAddress, billingAddress: deliveryAddress })
      );
    } else {
      localStorage.setItem(
        "deliveryInfo",
        JSON.stringify({ deliveryAddress, billingAddress })
      );
    }

    const { history } = this.props;
    history.push("/payment/payment");
  }
  payMethodChange(e) {
    this.setState({ payMethod: e.target.value });
  }
  goConfirmation() {
    const { history } = this.props;
    history.push("/confirmation");
  }
  goDelivery(e) {
    e.preventDefault();
    const { history } = this.props;
    history.push("/payment/shipping");
  }
  goCart(e) {
    e.preventDefault();
    const { history } = this.props;
    history.push("/cart");
  }
  deliveryInputChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const { deliveryAddress } = this.state;
    deliveryAddress[name] = value;
    this.inputBlur(e);
    this.setState({ deliveryAddress: deliveryAddress });
  }
  cardInfoInputChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const { creditCardInfo } = this.state;
    creditCardInfo[name] = value;
    this.inputBlur(e);
    this.setState({ creditCardInfo: creditCardInfo });
  }
  inputBlur(e) {
    let validDom = Array.from(
      e.target.parentElement.parentElement.children
    ).filter((el) => {
      let i = Array.from(el.classList).findIndex((classItem) => {
        return classItem === "invalid-feedback";
      });
      return i > -1;
    })[0];
    if (validDom) {
      validDom.style.display = e.target.value ? "none" : "block";
    }
  }
  billingInputChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const { billingAddress } = this.state;
    billingAddress[name] = value;
    this.inputBlur(e);
    this.setState({ billingAddress: billingAddress });
  }
  commentChange(e) {
    this.setState({ commentOnDelivery: e.target.value });
  }
  billingCheckedChange() {
    let { billingChecked } = this.state;
    this.setState({ billingChecked: !billingChecked });
  }

  componentDidMount() {
    let deliveryInfoStr = localStorage.getItem("deliveryInfo");
    if (deliveryInfoStr) {
      let deliveryInfo = JSON.parse(deliveryInfoStr);
      this.setState({
        deliveryAddress: deliveryInfo.deliveryAddress,
        billingAddress: deliveryInfo.billingAddress,
      });
    }
    this.setState({
      type: this.props.match.params.type,
    });
  }
  render() {
    const { deliveryAddress, billingAddress, creditCardInfo } = this.state;
    const CreditCardImg = (
      <span class="logo-payment-card-list">
        {this.state.creditCardImgUrl.map((el) => (
          <img class="logo-payment-card" src={el} />
        ))}
      </span>
    );
    return (
      <div>
        <Header />
        <main class="rc-content--fixed-header rc-bg-colour--brand3">
          <div
            id="checkout-main"
            class="rc-bg-colour--brand3 rc-bottom-spacing data-checkout-stage rc-max-width--lg"
            data-checkout-stage="payment"
          >
            <Progress type={this.state.type} />
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
                      <h4 className="pull-left">Selected clinic</h4>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          let history = this.props
                          history.push('/prescription')
                        }}
                        class=" rc-styled-link rc-margin-top--xs pull-right"
                      >
                        Edit
                      </a>
                    </div>
                    <div class="rc-border-all rc-border-colour--interface checkout--padding rc-margin-bottom--sm">
                    121 Animal Hospital
                    </div>
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
                                First Name
                              </label>
                              <span
                                class="rc-input rc-input--inline rc-full-width rc-input--full-width"
                                input-setup="true"
                              >
                                <input
                                  class="rc-input__control shippingFirstName"
                                  id="shippingFirstName"
                                  type="text"
                                  value={deliveryAddress.firstName}
                                  onChange={(e) => this.deliveryInputChange(e)}
                                  onBlur={(e) => this.inputBlur(e)}
                                  name="firstName"
                                  maxlength="50"
                                />
                                <label
                                  class="rc-input__label"
                                  for="id-text1"
                                ></label>
                              </span>
                              <div class="invalid-feedback">
                                *First name must be filled
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
                                Last Name
                              </label>
                              <span
                                class="rc-input rc-input--inline rc-full-width rc-input--full-width"
                                input-setup="true"
                              >
                                <input
                                  class="rc-input__control shippingLastName"
                                  id="shippingLastName"
                                  type="text"
                                  value={deliveryAddress.lastName}
                                  onChange={(e) => this.deliveryInputChange(e)}
                                  onBlur={(e) => this.inputBlur(e)}
                                  name="lastName"
                                  maxlength="50"
                                />
                                <label
                                  class="rc-input__label"
                                  for="id-text1"
                                ></label>
                              </span>
                              <div class="invalid-feedback">
                                *Last name must be filled
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
                                Address 1
                              </label>
                              <span
                                class="rc-input rc-input--inline rc-full-width rc-input--full-width"
                                input-setup="true"
                              >
                                <input
                                  class="rc-input__control shippingLastName"
                                  id="shippingLastName"
                                  type="text"
                                  value={deliveryAddress.address1}
                                  onChange={(e) => this.deliveryInputChange(e)}
                                  onBlur={(e) => this.inputBlur(e)}
                                  name="address1"
                                  maxlength="50"
                                />
                                <label
                                  class="rc-input__label"
                                  for="id-text1"
                                ></label>
                              </span>
                              <div class="invalid-feedback">
                                *Address 1 must be filled
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="rc-layout-container">
                          <div class="rc-column rc-padding-y--none">
                            <div class="form-group dwfrm_shipping_shippingAddress_addressFields_lastName">
                              <label
                                class="form-control-label"
                                for="shippingLastName"
                              >
                                Address 2
                              </label>
                              <span
                                class="rc-input rc-input--inline rc-full-width rc-input--full-width"
                                input-setup="true"
                              >
                                <input
                                  class="rc-input__control shippingLastName"
                                  id="shippingLastName"
                                  type="text"
                                  value={deliveryAddress.address2}
                                  onChange={(e) => this.deliveryInputChange(e)}
                                  onBlur={(e) => this.inputBlur(e)}
                                  name="address2"
                                  maxlength="50"
                                />
                                <label
                                  class="rc-input__label"
                                  for="id-text1"
                                ></label>
                              </span>
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
                                <select
                                  data-js-select=""
                                  id="shippingCountry"
                                  value={deliveryAddress.country}
                                  onChange={(e) => this.deliveryInputChange(e)}
                                  onBlur={(e) => this.inputBlur(e)}
                                  name="country"
                                  placeholder="please cho"
                                >
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
                              <select
                                data-js-select=""
                                id="shippingCountry"
                                value={deliveryAddress.city}
                                onChange={(e) => this.deliveryInputChange(e)}
                                onBlur={(e) => this.inputBlur(e)}
                                name="city"
                              >
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
                              Post Code
                            </label>
                            <span
                              class="rc-input rc-input--inline rc-input--label rc-full-width rc-input--full-width"
                              input-setup="true"
                              data-js-validate=""
                              data-js-warning-message="*Post Code isn’t valid"
                            >
                              <input
                                class="rc-input__control shippingZipCode"
                                id="shippingZipCode"
                                type="tel"
                                required
                                value={deliveryAddress.postCode}
                                onChange={(e) => this.deliveryInputChange(e)}
                                onBlur={(e) => this.inputBlur(e)}
                                name="postCode"
                                maxlength="6"
                                minlength="6"
                                data-js-pattern="(^\d{6}(-\d{4})?$)|(^[abceghjklmnprstvxyABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Za-z]{1} *\d{1}[A-Za-z]{1}\d{1}$)"
                              />
                              <label
                                class="rc-input__label"
                                for="id-text1"
                              ></label>
                            </span>
                            <div class="invalid-feedback">
                              *Post code must be filled
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
                              data-js-validate=""
                              data-js-warning-message="*Phone Number isn’t valid"
                            >
                              <input
                                class="rc-input__control input__phoneField shippingPhoneNumber"
                                id="shippingPhoneNumber"
                                type="tel"
                                value={deliveryAddress.phoneNumber}
                                onChange={(e) => this.deliveryInputChange(e)}
                                onBlur={(e) => this.inputBlur(e)}
                                data-js-pattern="(^(\+?7|8)?9\d{9}$)"
                                name="phoneNumber"
                                maxlength="20"
                                minlength="18"
                                // inputmode="text"
                              />
                              <label
                                class="rc-input__label"
                                for="shippingPhoneNumber"
                              ></label>
                            </span>
                            <div class="invalid-feedback">
                              *Phone number must be filled
                            </div>
                            <span>Example: +7 (923) 456 78 90</span>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                    <div class="card-header rc-margin-bottom--xs">
                      <h4>Billing address</h4>
                      <div className="billingCheckbox rc-margin-top--xs">
                        <input
                          class="form-check-input"
                          id="id-checkbox-billing"
                          value="Cat"
                          type="checkbox"
                          onChange={() => this.billingCheckedChange()}
                          checked={this.state.billingChecked}
                        />
                        <label
                          class="rc-input__label--inline"
                          for="id-checkbox-billing"
                        >
                          Use delivery address
                        </label>
                      </div>
                    </div>
                    <div
                      class="rc-border-all rc-border-colour--interface checkout--padding rc-margin-bottom--sm"
                      style={{
                        display: this.state.billingChecked ? "none" : "block",
                      }}
                    >
                      <fieldset class="shipping-address-block rc-fieldset">
                        <div class="rc-layout-container">
                          <div class="rc-column rc-padding-y--none">
                            <div class="form-group required dwfrm_shipping_shippingAddress_addressFields_firstName">
                              <label
                                class="form-control-label"
                                for="shippingFirstName"
                              >
                                First Name
                              </label>
                              <span
                                class="rc-input rc-input--inline rc-full-width rc-input--full-width"
                                input-setup="true"
                              >
                                <input
                                  class="rc-input__control shippingFirstName"
                                  id="shippingFirstName"
                                  type="text"
                                  value={billingAddress.firstName}
                                  onChange={(e) => this.billingInputChange(e)}
                                  onBlur={(e) => this.inputBlur(e)}
                                  name="firstName"
                                  maxlength="50"
                                />
                                <label
                                  class="rc-input__label"
                                  for="id-text1"
                                ></label>
                              </span>
                              <div class="invalid-feedback">
                                *First name must be filled
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
                                Last Name
                              </label>
                              <span
                                class="rc-input rc-input--inline rc-full-width rc-input--full-width"
                                input-setup="true"
                              >
                                <input
                                  class="rc-input__control shippingLastName"
                                  id="shippingLastName"
                                  type="text"
                                  value={billingAddress.lastName}
                                  onChange={(e) => this.billingInputChange(e)}
                                  onBlur={(e) => this.inputBlur(e)}
                                  name="lastName"
                                  maxlength="50"
                                />
                                <label
                                  class="rc-input__label"
                                  for="id-text1"
                                ></label>
                              </span>
                              <div class="invalid-feedback">
                                *Last name must be filled
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
                                Address 1
                              </label>
                              <span
                                class="rc-input rc-input--inline rc-full-width rc-input--full-width"
                                input-setup="true"
                              >
                                <input
                                  class="rc-input__control shippingLastName"
                                  id="shippingLastName"
                                  type="text"
                                  value={billingAddress.address1}
                                  onChange={(e) => this.billingInputChange(e)}
                                  onBlur={(e) => this.inputBlur(e)}
                                  name="address1"
                                  maxlength="50"
                                />
                                <label
                                  class="rc-input__label"
                                  for="id-text1"
                                ></label>
                              </span>
                              <div class="invalid-feedback">
                                *Address 1 must be filled
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="rc-layout-container">
                          <div class="rc-column rc-padding-y--none">
                            <div class="form-group dwfrm_shipping_shippingAddress_addressFields_lastName">
                              <label
                                class="form-control-label"
                                for="shippingLastName"
                              >
                                Address 2
                              </label>
                              <span
                                class="rc-input rc-input--inline rc-full-width rc-input--full-width"
                                input-setup="true"
                              >
                                <input
                                  class="rc-input__control shippingLastName"
                                  id="shippingLastName"
                                  type="text"
                                  value={billingAddress.address2}
                                  onChange={(e) => this.billingInputChange(e)}
                                  onBlur={(e) => this.inputBlur(e)}
                                  name="address2"
                                  maxlength="50"
                                />
                                <label
                                  class="rc-input__label"
                                  for="id-text1"
                                ></label>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div class="rc-layout-container">
                          <div class="rc-column rc-padding-y--none">
                            <div class="form-group required dwfrm_shipping_shippingAddress_addressFields_country">
                              <label
                                class="form-control-label"
                                for="shippingCountry"
                                value={billingAddress.country}
                                onChange={(e) => this.billingInputChange(e)}
                                onBlur={(e) => this.inputBlur(e)}
                                name="country"
                              >
                                Country
                              </label>
                              <span class="rc-select rc-full-width rc-input--full-width rc-select-processed">
                                <select data-js-select="">
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
                              <select
                                data-js-select=""
                                id="shippingCountry"
                                value={billingAddress.city}
                                onChange={(e) => this.billingInputChange(e)}
                                onBlur={(e) => this.inputBlur(e)}
                                name="city"
                              >
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
                              Post Code
                            </label>
                            <span
                              class="rc-input rc-input--inline rc-input--label rc-full-width rc-input--full-width"
                              input-setup="true"
                              data-js-validate=""
                              data-js-warning-message="*Post Code isn’t valid"
                            >
                              <input
                                class="rc-input__control shippingZipCode"
                                id="shippingZipCode"
                                type="tel"
                                value={billingAddress.postCode}
                                onChange={(e) => this.billingInputChange(e)}
                                onBlur={(e) => this.inputBlur(e)}
                                name="postCode"
                                maxlength="6"
                                minlength="6"
                                data-js-pattern="(^\d{6}(-\d{4})?$)|(^[abceghjklmnprstvxyABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Za-z]{1} *\d{1}[A-Za-z]{1}\d{1}$)"
                              />
                              <label
                                class="rc-input__label"
                                for="id-text1"
                              ></label>
                            </span>
                            <div class="invalid-feedback">
                              *Post code must be filled
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
                              data-js-validate=""
                              data-js-warning-message="*Phone Number isn’t valid"
                            >
                              <input
                                class="rc-input__control input__phoneField shippingPhoneNumber"
                                id="shippingPhoneNumber"
                                type="tel"
                                value={billingAddress.phoneNumber}
                                onChange={(e) => this.billingInputChange(e)}
                                onBlur={(e) => this.inputBlur(e)}
                                name="phoneNumber"
                                data-js-pattern="(^(\+?7|8)?9\d{9}$)"
                                maxlength="20"
                                minlength="18"
                                // inputmode="text"
                              />
                              <label
                                class="rc-input__label"
                                for="shippingPhoneNumber"
                              ></label>
                            </span>
                            <div class="invalid-feedback">
                              *Phone number must be filled
                            </div>
                            <span>Example: +7 (923) 456 78 90</span>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                    <fieldset class="shipping-method-block rc-fieldset">
                      <div class="card-header rc-margin-bottom--xs">
                        <h4>How to deliver :</h4>
                      </div>
                      <div>
                        <div class="leading-lines shipping-method-list rc-border-all rc-border-colour--interface checkout--padding rc-margin-bottom--sm">
                          <div class="row deliveryMethod">
                            <div class="col-8">
                              <span class="display-name pull-left">
                                Normal Delivery
                              </span>
                              <span class="text-muted arrival-time">
                                (1-4 days)
                              </span>
                            </div>
                            <div class="col-4">
                              <span class="shipping-method-pricing">
                                <span class="shipping-cost">For Free</span>
                                <span
                                  class=" info-tooltip delivery-method-tooltip"
                                  title="Top"
                                  data-tooltip-placement="top"
                                  data-tooltip="top-tooltip"
                                >
                                  i
                                </span>
                                <div id="top-tooltip" class="rc-tooltip">
                                  For any consumer making order in the website,
                                  no matter the amount, he or she is able to be
                                  provided free delivery service.
                                </div>
                              </span>
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
                        class="rc-input nomaxwidth rc-border-all rc-border-colour--interface"
                        input-setup="true"
                      >
                        <textarea
                          class="rc-input__textarea noborder"
                          maxlength="1000"
                          name="dwfrm_shipping_shippingAddress_deliveryComment"
                          id="delivery-comment"
                          value={this.state.commentOnDelivery}
                          onChange={(e) => this.commentChange(e)}
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
                      class="rc-btn rc-btn--one pull-right rc-margin-bottom--sm"
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
                      <a
                        href="#"
                        onClick={(e) => this.goDelivery(e)}
                        class=" rc-styled-link rc-margin-top--xs pull-right"
                      >
                        Edit
                      </a>
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
                        <div class="rc-border-all rc-border-colour--interface checkout--padding">
                          <div class="summary-details shipping rc-margin-bottom--xs">
                            <div class="address-summary row">
                              <div class="col-md-6">
                                <div className="center">Delivery Address</div>
                                <div className="row">
                                  <div className="col-md-6">
                                    <div>First Name</div>
                                    <div>Last Name</div>
                                    <div>Address 1</div>
                                    <div>Address 2</div>
                                    <div>Country</div>
                                    <div>City</div>
                                    <div>Post Code</div>
                                    <div>Phone Number</div>
                                    <div>Normal Delivery</div>
                                  </div>
                                  <div className="col-md-6">
                                    <div>&nbsp;{deliveryAddress.firstName}</div>
                                    <div>&nbsp;{deliveryAddress.lastName}</div>
                                    <div>&nbsp;{deliveryAddress.address1}</div>
                                    <div>&nbsp;{deliveryAddress.address2}</div>
                                    <div>&nbsp;{deliveryAddress.country}</div>
                                    <div>&nbsp;{deliveryAddress.city}</div>
                                    <div>&nbsp;{deliveryAddress.postCode}</div>
                                    <div>
                                      &nbsp;{deliveryAddress.phoneNumber}
                                    </div>
                                    <div>For free</div>
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-6 address-summary-left">
                                <div className="center">Billing Address</div>
                                <div className="row">
                                  <div className="col-md-6">
                                    <div>First Name</div>
                                    <div>Last Name</div>
                                    <div>Address 1</div>
                                    <div>Address 2</div>
                                    <div>Country</div>
                                    <div>City</div>
                                    <div>Post Code</div>
                                    <div>Phone Number</div>
                                  </div>
                                  <div className="col-md-6">
                                    <div>&nbsp;{billingAddress.firstName}</div>
                                    <div>&nbsp;{billingAddress.lastName}</div>
                                    <div>&nbsp;{billingAddress.address1}</div>
                                    <div>&nbsp;{billingAddress.address2}</div>
                                    <div>&nbsp;{billingAddress.country}</div>
                                    <div>&nbsp;{billingAddress.city}</div>
                                    <div>&nbsp;{billingAddress.postCode}</div>
                                    <div>
                                      &nbsp;{billingAddress.phoneNumber}
                                    </div>
                                  </div>
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
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card payment-form">
                    <div class="card-body rc-padding--none">
                      <form
                        method="POST"
                        data-address-mode="new"
                        name="dwfrm_billing"
                        id="dwfrm_billing"
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
                            <div className="form-group">
                              <div class="rc-input rc-input--inline">
                                <input
                                  class="rc-input__radio"
                                  id="id-radio-creditCard"
                                  value="creditCard"
                                  type="radio"
                                  name="pay-method"
                                  onChange={(e) => this.payMethodChange(e)}
                                  checked={
                                    this.state.payMethod === "creditCard"
                                  }
                                />
                                <label
                                  class="rc-input__label--inline"
                                  for="id-radio-creditCard"
                                >
                                  Credit card
                                  {CreditCardImg}
                                </label>
                              </div>
                              <div class="rc-input rc-input--inline">
                                <input
                                  class="rc-input__radio"
                                  id="id-radio-payPal"
                                  value="payPal"
                                  type="radio"
                                  name="pay-method"
                                  onChange={(e) => this.payMethodChange(e)}
                                  checked={this.state.payMethod === "payPal"}
                                />
                                <label
                                  class="rc-input__label--inline"
                                  for="id-radio-payPal"
                                >
                                  <span class="logo-payment-card-list">
                                    <img
                                      class="logo-payment-card"
                                      style={{ height: "18px", width: "70px" }}
                                      src={paypalImg}
                                    />
                                  </span>
                                </label>
                              </div>
                            </div>
                            <div
                              class="rc-list__accordion-item"
                              data-method-id="CREDIT_CARD"
                              style={{
                                display:
                                  this.state.payMethod == "creditCard"
                                    ? "block"
                                    : "none",
                              }}
                            >
                              <div class="rc-border-all rc-border-colour--interface checkout--padding">
                                <div
                                  class="credit-card-content"
                                  id="credit-card-content"
                                  style={{
                                    display: !this.state.isCompleteCredit
                                      ? "block"
                                      : "none",
                                  }}
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
                                              {CreditCardImg}
                                              <div className="cardFormBox">
                                                <span class="cardImage">
                                                  <img
                                                    alt="Card"
                                                    src="https://js.paymentsos.com/v2/iframe/latest/static/media/unknown.c04f6db7.svg"
                                                  />
                                                </span>
                                                <span className="cardForm">
                                                  <div class="row">
                                                    <div class="col-sm-5">
                                                      <div class="form-group required">
                                                        <span
                                                          class="rc-input rc-input--full-width"
                                                          input-setup="true"
                                                        >
                                                          <input
                                                            type="text"
                                                            class="rc-input__control form-control email"
                                                            id="email"
                                                            value={
                                                              creditCardInfo.cardNumber
                                                            }
                                                            onChange={(e) =>
                                                              this.cardInfoInputChange(
                                                                e
                                                              )
                                                            }
                                                            onBlur={(e) =>
                                                              this.inputBlur(e)
                                                            }
                                                            name="cardNumber"
                                                            maxlength="254"
                                                            placeholder="Card Number"
                                                          />
                                                        </span>
                                                        <div class="invalid-feedback">
                                                          This field is
                                                          required.
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <div class="col-sm-4">
                                                      <div class="form-group required">
                                                        <span
                                                          class="rc-input rc-input--full-width"
                                                          input-setup="true"
                                                          data-js-validate=""
                                                          data-js-warning-message="*Phone Number isn’t valid"
                                                        >
                                                          <input
                                                            type="tel"
                                                            class="rc-input__control form-control phone"
                                                            min-lenght="18"
                                                            max-length="18"
                                                            data-phonelength="18"
                                                            data-js-validate="(^(\+?7|8)?9\d{9}$)"
                                                            data-range-error="The phone number should contain 10 digits"
                                                            value={
                                                              creditCardInfo.cardDate
                                                            }
                                                            onChange={(e) =>
                                                              this.cardInfoInputChange(
                                                                e
                                                              )
                                                            }
                                                            onBlur={(e) =>
                                                              this.inputBlur(e)
                                                            }
                                                            name="cardDate"
                                                            maxlength="2147483647"
                                                            placeholder="MM/YY"
                                                          />
                                                        </span>
                                                        <div class="invalid-feedback">
                                                          The field is required.
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <div class="col-sm-3">
                                                      <div class="form-group required">
                                                        <span
                                                          class="rc-input rc-input--full-width"
                                                          input-setup="true"
                                                          data-js-validate=""
                                                          data-js-warning-message="*Phone Number isn’t valid"
                                                        >
                                                          <input
                                                            type="tel"
                                                            class="rc-input__control form-control phone"
                                                            min-lenght="18"
                                                            max-length="18"
                                                            data-phonelength="18"
                                                            data-js-validate="(^(\+?7|8)?9\d{9}$)"
                                                            data-range-error="The phone number should contain 10 digits"
                                                            value={
                                                              creditCardInfo.cardCVV
                                                            }
                                                            onChange={(e) =>
                                                              this.cardInfoInputChange(
                                                                e
                                                              )
                                                            }
                                                            onBlur={(e) =>
                                                              this.inputBlur(e)
                                                            }
                                                            name="cardCVV"
                                                            maxlength="2147483647"
                                                            placeholder="CVV"
                                                            // inputmode="text"
                                                          />
                                                        </span>
                                                        <div class="invalid-feedback">
                                                          The field is required.
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </span>
                                              </div>
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="row overflow_visible">
                                        <div class="col-sm-12">
                                          <div class="form-group required">
                                            <label class="form-control-label">
                                              Cardowner
                                            </label>
                                            <span
                                              class="rc-input rc-input--full-width"
                                              input-setup="true"
                                            >
                                              <input
                                                type="text"
                                                class="rc-input__control form-control cardOwner"
                                                name="cardOwner"
                                                value={creditCardInfo.cardOwner}
                                                onChange={(e) =>
                                                  this.cardInfoInputChange(e)
                                                }
                                                onBlur={(e) =>
                                                  this.inputBlur(e)
                                                }
                                                maxlength="40"
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
                                          <div class="form-group required">
                                            <label class="form-control-label">
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
                                                value={creditCardInfo.email}
                                                onChange={(e) =>
                                                  this.cardInfoInputChange(e)
                                                }
                                                onBlur={(e) =>
                                                  this.inputBlur(e)
                                                }
                                                name="email"
                                                maxlength="254"
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
                                          <div class="form-group required">
                                            <label
                                              class="form-control-label"
                                              for="phoneNumber"
                                            >
                                              Phone number
                                            </label>
                                            <span
                                              class="rc-input rc-input--full-width"
                                              input-setup="true"
                                              data-js-validate=""
                                              data-js-warning-message="*Phone Number isn’t valid"
                                            >
                                              <input
                                                type="tel"
                                                class="rc-input__control form-control phone"
                                                min-lenght="18"
                                                max-length="18"
                                                data-phonelength="18"
                                                data-js-validate="(^(\+?7|8)?9\d{9}$)"
                                                data-range-error="The phone number should contain 10 digits"
                                                value={
                                                  creditCardInfo.phoneNumber
                                                }
                                                onChange={(e) =>
                                                  this.cardInfoInputChange(e)
                                                }
                                                onBlur={(e) =>
                                                  this.inputBlur(e)
                                                }
                                                name="phoneNumber"
                                                maxlength="2147483647"

                                                // inputmode="text"
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
                                            type="button"
                                            onClick={() => {
                                              this.setState({
                                                isCompleteCredit: true,
                                              });
                                            }}
                                          >
                                            Confirm Card
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="creditCompleteInfoBox"
                                  style={{
                                    display: !this.state.isCompleteCredit
                                      ? "none"
                                      : "block",
                                  }}
                                >
                                  <p>
                                    <span
                                      className="pull-right"
                                      onClick={() => {
                                        this.setState({
                                          isCompleteCredit: false,
                                        });
                                      }}
                                    >
                                      Edit date
                                    </span>
                                  </p>
                                  <div class="row">
                                    <div class="col-sm-5">
                                      <img src={visaImg} alt="" />
                                    </div>
                                    <div class="col-sm-7">
                                      <div className="row creditCompleteInfo">
                                        <div className="col-sm-6">
                                          <p>Name</p>
                                          <p>Card number</p>
                                          <p>DEBIT</p>
                                        </div>
                                        <div className="col-sm-6">
                                          <p>
                                            &nbsp;{creditCardInfo.cardOwner}
                                          </p>
                                          <p>
                                            &nbsp;{creditCardInfo.cardNumber}
                                          </p>
                                          <p>&nbsp;{creditCardInfo.cardCVV}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* </dd> */}
                            </div>
                          </dl>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div class="footerCheckbox">
                    <input
                      class="form-check-input"
                      id="id-checkbox-cat-2"
                      value=""
                      type="checkbox"
                      name="checkbox-2"
                      onChange={() => {
                        this.setState({isReadPrivacyPolicy: !this.state.isReadPrivacyPolicy, isReadPrivacyPolicyInit: false})
                      }}
                      checked={this.state.isReadPrivacyPolicy}
                    />
                    <label
                      class="rc-input__label--inline"
                    >
                      I have read the User Agreement and the Privacy Policy and
                      give my consent to the processing ot personal data,
                      including cross-border transfer
                      <div class="warning" style={{display: this.state.isReadPrivacyPolicy || this.state.isReadPrivacyPolicyInit?'none': 'block'}}>You need to familiarize yourself with the User Agreement and the Privacy Policy and give your consent to the processing of personal data, including cross-border transfer.</div>
                    </label>
                  </div>
                  <div className="footerCheckbox">
                    <input
                      class="form-check-input"
                      id="id-checkbox-cat-2"
                      value="Cat"
                      type="checkbox"
                      name="checkbox-2"
                      onChange={() => {
                        this.setState({isEighteen: !this.state.isEighteen, isEighteenInit: false})
                      }}
                      checked={this.state.isEighteen}
                    />
                    <label
                      class="rc-input__label--inline"
                    >
                      I confirm that I am 18 years old
                      <div class="warning" style={{display: this.state.isEighteen || this.state.isEighteenInit?'none': 'block'}}>You must be 18 years or more to register on the site.</div>
                    </label>
                  </div>
                  <div class="place_order-btn card">
                    <div class="next-step-button">
                      <div class="rc-text--right">
                        <button
                          class="rc-btn rc-btn--one submit-payment"
                          type="submit"
                          name="submit"
                          value="submit-shipping"
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
                  href="#"
                  onClick={(e) => this.goCart(e)}
                  class="product-summary__cartlink rc-styled-link"
                >
                  Edit
                </a>
                <div class="product-summary__inner">
                  <div class="product-summary__recap">
                    <div class="product-summary__itemnbr checkout--padding rc-bg-colour--brand4">
                      1 item total product
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
                                        {/* $ 2616 */}
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
                                <span class="sub-total">$ 2616</span>
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
                        <span>Total cost</span>
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
