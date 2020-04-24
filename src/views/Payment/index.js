import React from "react";
import { FormattedMessage } from 'react-intl'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Progress from "@/components/Progress";
import PayProductInfo from "@/components/PayProductInfo";
import "./index.css";
import visaImg from "@/assets/images/credit-cards/visa.svg";
import amexImg from "@/assets/images/credit-cards/amex.svg";
import mastercardImg from "@/assets/images/credit-cards/mastercard.svg";
import discoverImg from "@/assets/images/credit-cards/discover.svg";
import paypalImg from "@/assets/images/credit-cards/paypal.png";
import { postVisitorRegisterAndLogin, batchAdd, confirmAndCommit } from "@/api/payment";

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      payMethod: "",
      billingChecked: true,
      isCompleteCredit: false,
      showPayMethodError: false,
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
        country: "Mexico",
        city: "Monterey",
        postCode: "",
        phoneNumber: "",
      },
      billingAddress: {
        firstName: "",
        lastName: "",
        address1: "",
        address2: "",
        country: "Mexico",
        city: "Monterey",
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
    this.confirmCardInfo = this.confirmCardInfo.bind(this)
  }
  confirmCardInfo () {
    this.setState({
      isCompleteCredit: true,
    });
  }
  ChoosePayment () {
    const {
      deliveryAddress,
      billingAddress,
      billingChecked,
      commentOnDelivery,
    } = this.state;
    const param = {
      billingChecked,
      deliveryAddress,
      commentOnDelivery
    }
    if (billingChecked) {
      param.billingAddress = deliveryAddress
    } else {
      param.billingAddress = billingAddress
    }
    localStorage.setItem("deliveryInfo", JSON.stringify(param));

    const { history } = this.props;
    history.push("/payment/payment");
  }
  payMethodChange (e) {
    this.setState({ payMethod: e.target.value, showPayMethodError: false });
  }
  async goConfirmation () {
    const { history } = this.props;
    let { isEighteen,
      isReadPrivacyPolicy,
      deliveryAddress,
      billingAddress,
      commentOnDelivery,
      billingChecked,
      payMethod } = this.state;
    if (!payMethod) {
      this.setState({ showPayMethodError: true });
    }
    if (isEighteen && isReadPrivacyPolicy) {
      let param = { useDeliveryAddress: billingChecked, ...deliveryAddress, ...{ city: 1, country: 1, phoneNumber: '18883733998' } }
      param.billAddress1 = billingAddress.address1
      param.billAddress2 = billingAddress.address2
      param.billCity = 1
      param.billCountry = 1
      param.billFirstName = billingAddress.firstName
      param.billLastName = billingAddress.lastName
      param.billPhoneNumber = '18883733998' || billingAddress.phoneNumber
      param.billPostCode = billingAddress.postCode

      let res = await postVisitorRegisterAndLogin(param)
      if (res.context && res.context.token) {
        sessionStorage.setItem('rc-token', res.context.token)
        let batchAddRes = await batchAdd({
          "goodsInfos": [
            {
              "buyCount": 1,
              "goodsInfoId": "8a9bc76c6bd699cb016c187b187009d0",
              "verifyStock": false
            },
            {
              "buyCount": 1,
              "goodsInfoId": "8a9bc76c65ea68480165f00b93340038",
              "verifyStock": false
            }
          ]
        }
        )
        let res3 = confirmAndCommit({
          "clinicsId": sessionStorage.getItem('rc-clinics-id') || sessionStorage.getItem('rc-clinics-id2'),
          "remark": commentOnDelivery,
          "storeId": 123456861,
          "tradeItems": [
            {
              "num": 1,
              "skuId": "8a9bc76c65ea68480165f00b93340038"
            }
          ],
          "tradeMarketingList": []
        }
        )
        history.push('/confirmation')
      }
    } else {
      this.setState({ isEighteenInit: false, isReadPrivacyPolicyInit: false });
    }
  }
  goDelivery (e) {
    e.preventDefault();
    const { history } = this.props;
    history.push("/payment/shipping");
  }
  goCart (e) {
    e.preventDefault();
    const { history } = this.props;
    history.push("/cart");
  }
  deliveryInputChange (e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const { deliveryAddress } = this.state;
    deliveryAddress[name] = value;
    this.inputBlur(e);
    this.setState({ deliveryAddress: deliveryAddress });
  }
  cardInfoInputChange (e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const { creditCardInfo } = this.state;
    creditCardInfo[name] = value;
    this.inputBlur(e);
    this.setState({ creditCardInfo: creditCardInfo });
  }
  inputBlur (e) {
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
  billingInputChange (e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const { billingAddress } = this.state;
    billingAddress[name] = value;
    this.inputBlur(e);
    this.setState({ billingAddress: billingAddress });
  }
  commentChange (e) {
    this.setState({ commentOnDelivery: e.target.value });
  }
  billingCheckedChange () {
    let { billingChecked } = this.state;
    this.setState({ billingChecked: !billingChecked });
  }
  componentDidMount () {
    let deliveryInfoStr = localStorage.getItem("deliveryInfo");
    if (deliveryInfoStr) {
      let deliveryInfo = JSON.parse(deliveryInfoStr);
      this.setState({
        deliveryAddress: deliveryInfo.deliveryAddress,
        billingAddress: deliveryInfo.billingAddress,
        commentOnDelivery: deliveryInfo.commentOnDelivery,
        billingChecked: deliveryInfo.billingChecked
      });
    }
    this.setState({
      type: this.props.match.params.type,
    });
  }

  render () {
    const {
      deliveryAddress,
      billingAddress,
      creditCardInfo,
      productList,
      totalCount,
    } = this.state;
    const CreditCardImg = (
      <span className="logo-payment-card-list logo-credit-card">
        {this.state.creditCardImgUrl.map((el, idx) => (
          <img key={idx} className="logo-payment-card" src={el} />
        ))}
      </span>
    );
    return (
      <div>
        <Header />
        <main className="rc-content--fixed-header rc-bg-colour--brand3">
          <div
            id="checkout-main"
            className="rc-bg-colour--brand3 rc-bottom-spacing data-checkout-stage rc-max-width--lg"
            data-checkout-stage="payment"
          >
            <Progress type={this.state.type} />
            <div className="rc-layout-container rc-three-column rc-max-width--xl">
              <div className="rc-column rc-double-width shipping__address">
                <div
                  className="shipping-form"
                  style={{
                    display: this.state.type == "shipping" ? "block" : "none",
                  }}
                >
                  <div className="card">
                    <div className="card-header">
                      <h5 className="pull-left"><FormattedMessage id="payment.clinicTitle" /></h5>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          let { history } = this.props;
                          history.push("/prescription");
                        }}
                        className=" rc-styled-link rc-margin-top--xs pull-right"
                      >
                        <FormattedMessage id="edit" />
                      </a>
                    </div>
                    <div className="rc-border-all rc-border-colour--interface checkout--padding rc-margin-bottom--sm">
                      {sessionStorage.getItem('rc-clinics-name') || sessionStorage.getItem('rc-clinics-name2')}
                    </div>
                    <div className="card-header">
                      <h5><FormattedMessage id="payment.deliveryTitle" /></h5>
                    </div>
                    <div className="rc-border-all rc-border-colour--interface checkout--padding rc-margin-bottom--sm">
                      <fieldset className="shipping-address-block rc-fieldset">
                        <div className="rc-layout-container">
                          <div className="rc-column rc-padding-y--none rc-padding-left--none--md-down rc-padding-right--none--md-down">
                            <div className="form-group required dwfrm_shipping_shippingAddress_addressFields_firstName">
                              <label
                                className="form-control-label"
                                htmlFor="shippingFirstName"
                              >
                                <FormattedMessage id="payment.firstName" />
                              </label>
                              <span
                                className="rc-input rc-input--inline rc-full-width rc-input--full-width"
                                input-setup="true"
                              >
                                <input
                                  className="rc-input__control shippingFirstName"
                                  id="shippingFirstName"
                                  type="text"
                                  value={deliveryAddress.firstName}
                                  onChange={(e) => this.deliveryInputChange(e)}
                                  onBlur={(e) => this.inputBlur(e)}
                                  name="firstName"
                                  maxLength="50"
                                />
                                <label
                                  className="rc-input__label"
                                  htmlFor="id-text1"
                                ></label>
                              </span>
                              <div className="invalid-feedback">
                                <FormattedMessage
                                  id="payment.errorInfo"
                                  values={{ val: <FormattedMessage id="payment.firstName" /> }} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="rc-layout-container">
                          <div className="rc-column rc-padding-y--none rc-padding-left--none--md-down rc-padding-right--none--md-down">
                            <div className="form-group required dwfrm_shipping_shippingAddress_addressFields_lastName">
                              <label
                                className="form-control-label"
                                htmlFor="shippingLastName"
                              >
                                <FormattedMessage id="payment.lastName" />
                              </label>
                              <span
                                className="rc-input rc-input--inline rc-full-width rc-input--full-width"
                                input-setup="true"
                              >
                                <input
                                  className="rc-input__control shippingLastName"
                                  id="shippingLastName"
                                  type="text"
                                  value={deliveryAddress.lastName}
                                  onChange={(e) => this.deliveryInputChange(e)}
                                  onBlur={(e) => this.inputBlur(e)}
                                  name="lastName"
                                  maxLength="50"
                                />
                                <label
                                  className="rc-input__label"
                                  htmlFor="id-text1"></label>
                              </span>
                              <div className="invalid-feedback">
                                <FormattedMessage
                                  id="payment.errorInfo"
                                  values={{ val: <FormattedMessage id="payment.lastName" /> }} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="rc-layout-container">
                          <div className="rc-column rc-padding-y--none rc-padding-left--none--md-down rc-padding-right--none--md-down">
                            <div className="form-group required dwfrm_shipping_shippingAddress_addressFields_lastName">
                              <label
                                className="form-control-label"
                                htmlFor="shippingLastName"
                              >
                                <FormattedMessage id="payment.address1" />
                              </label>
                              <span
                                className="rc-input rc-input--inline rc-full-width rc-input--full-width"
                                input-setup="true"
                              >
                                <input
                                  className="rc-input__control shippingLastName"
                                  id="shippingLastName"
                                  type="text"
                                  value={deliveryAddress.address1}
                                  onChange={(e) => this.deliveryInputChange(e)}
                                  onBlur={(e) => this.inputBlur(e)}
                                  name="address1"
                                  maxLength="50"
                                />
                                <label
                                  className="rc-input__label"
                                  htmlFor="id-text1"
                                ></label>
                              </span>
                              <div className="invalid-feedback">
                                <FormattedMessage
                                  id="payment.errorInfo"
                                  values={{ val: <FormattedMessage id="payment.address1" /> }} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="rc-layout-container">
                          <div className="rc-column rc-padding-y--none rc-padding-left--none--md-down rc-padding-right--none--md-down">
                            <div className="form-group dwfrm_shipping_shippingAddress_addressFields_lastName">
                              <label
                                className="form-control-label"
                                htmlFor="shippingLastName"
                              >
                                <FormattedMessage id="payment.address2" />
                              </label>
                              <span
                                className="rc-input rc-input--inline rc-full-width rc-input--full-width"
                                input-setup="true"
                              >
                                <input
                                  className="rc-input__control shippingLastName"
                                  id="shippingLastName"
                                  type="text"
                                  value={deliveryAddress.address2}
                                  onChange={(e) => this.deliveryInputChange(e)}
                                  onBlur={(e) => this.inputBlur(e)}
                                  name="address2"
                                  maxLength="50"
                                />
                                <label
                                  className="rc-input__label"
                                  htmlFor="id-text1"
                                ></label>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="rc-layout-container">
                          <div className="rc-column rc-padding-y--none rc-padding-left--none--md-down rc-padding-right--none--md-down">
                            <div className="form-group required dwfrm_shipping_shippingAddress_addressFields_country">
                              <label
                                className="form-control-label"
                                htmlFor="shippingCountry"
                              >
                                <FormattedMessage id="payment.country" />
                              </label>
                              <span className="rc-select rc-full-width rc-input--full-width rc-select-processed">
                                <select
                                  data-js-select=""
                                  id="shippingCountry"
                                  value={deliveryAddress.country}
                                  onChange={(e) => this.deliveryInputChange(e)}
                                  onBlur={(e) => this.inputBlur(e)}
                                  name="country"
                                >
                                  <option>Mexico</option>
                                </select>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="rc-layout-container">
                          <div className="form-group rc-column rc-padding-y--none rc-padding-left--none--md-down rc-padding-right--none--md-down required dwfrm_shipping_shippingAddress_addressFields_city">
                            <label
                              className="form-control-label"
                              htmlFor="shippingAddressCity"
                            >
                              <FormattedMessage id="payment.city" />
                            </label>
                            <span className="rc-select rc-full-width rc-input--full-width rc-select-processed">
                              <select
                                data-js-select=""
                                id="shippingCountry"
                                value={deliveryAddress.city}
                                onChange={(e) => this.deliveryInputChange(e)}
                                onBlur={(e) => this.inputBlur(e)}
                                name="city"
                              >
                                <option>Monterey</option>
                                <option>Mexico City</option>
                              </select>
                            </span>
                          </div>
                        </div>
                        <div className="rc-layout-container">
                          <div className="form-group rc-column rc-padding-y--none rc-padding-left--none--md-down rc-padding-right--none--md-down required dwfrm_shipping_shippingAddress_addressFields_postalCode">
                            <label
                              className="form-control-label"
                              htmlFor="shippingZipCode"
                            >
                              <FormattedMessage id="payment.postCode" />
                            </label>
                            <span
                              className="rc-input rc-input--inline rc-input--label rc-full-width rc-input--full-width"
                              input-setup="true"
                              data-js-validate=""
                              data-js-warning-message="*Post Code isn’t valid"
                            >
                              <input
                                className="rc-input__control shippingZipCode"
                                id="shippingZipCode"
                                type="tel"
                                required
                                value={deliveryAddress.postCode}
                                onChange={(e) => this.deliveryInputChange(e)}
                                onBlur={(e) => this.inputBlur(e)}
                                name="postCode"
                                maxLength="6"
                                minLength="6"
                                data-js-pattern="(^\d{6}(-\d{4})?$)|(^[abceghjklmnprstvxyABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Za-z]{1} *\d{1}[A-Za-z]{1}\d{1}$)"
                              />
                              <label
                                className="rc-input__label"
                                htmlFor="id-text1"
                              ></label>
                            </span>
                            <div className="invalid-feedback">
                              <FormattedMessage
                                id="payment.errorInfo"
                                values={{ val: <FormattedMessage id="payment.postCode" /> }} />
                            </div>
                            <div className="ui-lighter"><FormattedMessage id="example" />: 123456</div>
                          </div>
                          <div className="form-group rc-column rc-padding-y--none rc-padding-left--none--md-down rc-padding-right--none--md-down required dwfrm_shipping_shippingAddress_addressFields_phone">
                            <label
                              className="form-control-label"
                              htmlFor="shippingPhoneNumber"
                            >
                              <FormattedMessage id="payment.phoneNumber" />
                            </label>
                            <span
                              className="rc-input rc-input--inline rc-input--label rc-full-width rc-input--full-width"
                              input-setup="true"
                              data-js-validate=""
                              data-js-warning-message="*Phone Number isn’t valid"
                            >
                              <input
                                className="rc-input__control input__phoneField shippingPhoneNumber"
                                id="shippingPhoneNumber"
                                type="tel"
                                value={deliveryAddress.phoneNumber}
                                onChange={(e) => this.deliveryInputChange(e)}
                                onBlur={(e) => this.inputBlur(e)}
                                data-js-pattern="(^(\+?7|8)?9\d{9}$)"
                                name="phoneNumber"
                                maxLength="20"
                                minLength="18"
                              />
                              <label
                                className="rc-input__label"
                                htmlFor="shippingPhoneNumber"
                              ></label>
                            </span>
                            <div className="invalid-feedback">
                              <FormattedMessage
                                id="payment.errorInfo"
                                values={{ val: <FormattedMessage id="payment.phoneNumber" /> }} />
                            </div>
                            <span className="ui-lighter"><FormattedMessage id="example" />: +7 (923) 456 78 90</span>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                    <div className="card-header">
                      <h5><FormattedMessage id="payment.billTitle" /></h5>
                      <div className="billingCheckbox rc-margin-top--xs">
                        <input
                          className="form-check-input"
                          id="id-checkbox-billing"
                          value="Cat"
                          type="checkbox"
                          onChange={() => this.billingCheckedChange()}
                          checked={this.state.billingChecked}
                        />
                        <label
                          className="rc-input__label--inline"
                          htmlFor="id-checkbox-billing"
                        >
                          <FormattedMessage id="payment.useDeliveryAddress" />
                        </label>
                      </div>
                    </div>
                    <div
                      className="rc-border-all rc-border-colour--interface checkout--padding rc-margin-bottom--sm"
                      style={{
                        display: this.state.billingChecked ? "none" : "block",
                      }}
                    >
                      <fieldset className="shipping-address-block rc-fieldset">
                        <div className="rc-layout-container">
                          <div className="rc-column rc-padding-y--none">
                            <div className="form-group required dwfrm_shipping_shippingAddress_addressFields_firstName">
                              <label
                                className="form-control-label"
                                htmlFor="shippingFirstName"
                              >
                                <FormattedMessage id="payment.firstName" />
                              </label>
                              <span
                                className="rc-input rc-input--inline rc-full-width rc-input--full-width"
                                input-setup="true"
                              >
                                <input
                                  className="rc-input__control shippingFirstName"
                                  id="shippingFirstName"
                                  type="text"
                                  value={billingAddress.firstName}
                                  onChange={(e) => this.billingInputChange(e)}
                                  onBlur={(e) => this.inputBlur(e)}
                                  name="firstName"
                                  maxLength="50"
                                />
                                <label
                                  className="rc-input__label"
                                  htmlFor="id-text1"
                                ></label>
                              </span>
                              <div className="invalid-feedback">
                                <FormattedMessage
                                  id="payment.errorInfo"
                                  values={{ val: <FormattedMessage id="payment.firstName" /> }} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="rc-layout-container">
                          <div className="rc-column rc-padding-y--none">
                            <div className="form-group required dwfrm_shipping_shippingAddress_addressFields_lastName">
                              <label
                                className="form-control-label"
                                htmlFor="shippingLastName"
                              >
                                <FormattedMessage id="payment.lastName" />
                              </label>
                              <span
                                className="rc-input rc-input--inline rc-full-width rc-input--full-width"
                                input-setup="true"
                              >
                                <input
                                  className="rc-input__control shippingLastName"
                                  id="shippingLastName"
                                  type="text"
                                  value={billingAddress.lastName}
                                  onChange={(e) => this.billingInputChange(e)}
                                  onBlur={(e) => this.inputBlur(e)}
                                  name="lastName"
                                  maxLength="50"
                                />
                                <label
                                  className="rc-input__label"
                                  htmlFor="id-text1"
                                ></label>
                              </span>
                              <div className="invalid-feedback">
                                <FormattedMessage
                                  id="payment.errorInfo"
                                  values={{ val: <FormattedMessage id="payment.lastName" /> }} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="rc-layout-container">
                          <div className="rc-column rc-padding-y--none">
                            <div className="form-group required dwfrm_shipping_shippingAddress_addressFields_lastName">
                              <label
                                className="form-control-label"
                                htmlFor="shippingLastName"
                              >
                                <FormattedMessage id="payment.address1" />
                              </label>
                              <span
                                className="rc-input rc-input--inline rc-full-width rc-input--full-width"
                                input-setup="true"
                              >
                                <input
                                  className="rc-input__control shippingLastName"
                                  id="shippingLastName"
                                  type="text"
                                  value={billingAddress.address1}
                                  onChange={(e) => this.billingInputChange(e)}
                                  onBlur={(e) => this.inputBlur(e)}
                                  name="address1"
                                  maxLength="50"
                                />
                                <label
                                  className="rc-input__label"
                                  htmlFor="id-text1"
                                ></label>
                              </span>
                              <div className="invalid-feedback">
                                <FormattedMessage
                                  id="payment.errorInfo"
                                  values={{ val: <FormattedMessage id="payment.address1" /> }} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="rc-layout-container">
                          <div className="rc-column rc-padding-y--none">
                            <div className="form-group dwfrm_shipping_shippingAddress_addressFields_lastName">
                              <label
                                className="form-control-label"
                                htmlFor="shippingLastName"
                              >
                                <FormattedMessage id="payment.address2" />
                              </label>
                              <span
                                className="rc-input rc-input--inline rc-full-width rc-input--full-width"
                                input-setup="true"
                              >
                                <input
                                  className="rc-input__control shippingLastName"
                                  id="shippingLastName"
                                  type="text"
                                  value={billingAddress.address2}
                                  onChange={(e) => this.billingInputChange(e)}
                                  onBlur={(e) => this.inputBlur(e)}
                                  name="address2"
                                  maxLength="50"
                                />
                                <label
                                  className="rc-input__label"
                                  htmlFor="id-text1"
                                ></label>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="rc-layout-container">
                          <div className="rc-column rc-padding-y--none">
                            <div className="form-group required dwfrm_shipping_shippingAddress_addressFields_country">
                              <label
                                className="form-control-label"
                                htmlFor="shippingCountry"
                                value={billingAddress.country}
                                onChange={(e) => this.billingInputChange(e)}
                                onBlur={(e) => this.inputBlur(e)}
                                name="country"
                              >
                                <FormattedMessage id="payment.country" />
                              </label>
                              <span className="rc-select rc-full-width rc-input--full-width rc-select-processed">
                                <select data-js-select="">
                                  <option>Mexico</option>
                                </select>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="rc-layout-container">
                          <div className="form-group rc-column rc-padding-y--none required dwfrm_shipping_shippingAddress_addressFields_city">
                            <label
                              className="form-control-label"
                              htmlFor="shippingAddressCity"
                            >
                              <FormattedMessage id="payment.city" />
                            </label>
                            <span className="rc-select rc-full-width rc-input--full-width rc-select-processed">
                              <select
                                data-js-select=""
                                id="shippingCountry"
                                value={billingAddress.city}
                                onChange={(e) => this.billingInputChange(e)}
                                onBlur={(e) => this.inputBlur(e)}
                                name="city"
                              >
                                <option>Monterey</option>
                                <option>Mexico City</option>
                              </select>
                            </span>
                          </div>
                        </div>
                        <div className="rc-layout-container">
                          <div className="form-group rc-column rc-padding-y--none required dwfrm_shipping_shippingAddress_addressFields_postalCode">
                            <label
                              className="form-control-label"
                              htmlFor="shippingZipCode"
                            >
                              <FormattedMessage id="payment.postCode" />
                            </label>
                            <span
                              className="rc-input rc-input--inline rc-input--label rc-full-width rc-input--full-width"
                              input-setup="true"
                              data-js-validate=""
                              data-js-warning-message="*Post Code isn’t valid"
                            >
                              <input
                                className="rc-input__control shippingZipCode"
                                id="shippingZipCode"
                                type="tel"
                                value={billingAddress.postCode}
                                onChange={(e) => this.billingInputChange(e)}
                                onBlur={(e) => this.inputBlur(e)}
                                name="postCode"
                                maxLength="6"
                                minLength="6"
                                data-js-pattern="(^\d{6}(-\d{4})?$)|(^[abceghjklmnprstvxyABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Za-z]{1} *\d{1}[A-Za-z]{1}\d{1}$)"
                              />
                              <label
                                className="rc-input__label"
                                htmlFor="id-text1"
                              ></label>
                            </span>
                            <div className="invalid-feedback">
                              <FormattedMessage
                                id="payment.errorInfo"
                                values={{ val: <FormattedMessage id="payment.postCode" /> }} />
                            </div>
                            <div className="ui-lighter"><FormattedMessage id="example" />: 123456</div>
                          </div>
                          <div className="form-group rc-column rc-padding-y--none required dwfrm_shipping_shippingAddress_addressFields_phone">
                            <label
                              className="form-control-label"
                              htmlFor="shippingPhoneNumber"
                            >
                              <FormattedMessage id="payment.phoneNumber" />
                            </label>
                            <span
                              className="rc-input rc-input--inline rc-input--label rc-full-width rc-input--full-width"
                              input-setup="true"
                              data-js-validate=""
                              data-js-warning-message="*Phone Number isn’t valid"
                            >
                              <input
                                className="rc-input__control input__phoneField shippingPhoneNumber"
                                id="shippingPhoneNumber"
                                type="tel"
                                value={billingAddress.phoneNumber}
                                onChange={(e) => this.billingInputChange(e)}
                                onBlur={(e) => this.inputBlur(e)}
                                name="phoneNumber"
                                data-js-pattern="(^(\+?7|8)?9\d{9}$)"
                                maxLength="20"
                                minLength="18"
                              />
                              <label
                                className="rc-input__label"
                                htmlFor="shippingPhoneNumber"
                              ></label>
                            </span>
                            <div className="invalid-feedback">
                              <FormattedMessage
                                id="payment.errorInfo"
                                values={{ val: <FormattedMessage id="payment.phoneNumber" /> }} />
                            </div>
                            <span className="ui-lighter"><FormattedMessage id="example" />: +7 (923) 456 78 90</span>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                    <fieldset className="shipping-method-block rc-fieldset">
                      <div className="card-header">
                        <h5><FormattedMessage id="payment.howToDelivery" /> :</h5>
                      </div>
                      <div>
                        <div className="leading-lines shipping-method-list rc-border-all rc-border-colour--interface checkout--padding rc-margin-bottom--sm">
                          <div className="row deliveryMethod">
                            <div className="col-8">
                              <span className="display-name pull-left">
                                <FormattedMessage id="payment.normalDelivery2" />
                              </span>
                              <span className="text-muted arrival-time">
                                <FormattedMessage id="payment.normalDelivery3" />
                              </span>
                            </div>
                            <div className="col-4">
                              <span className="shipping-method-pricing" style={{ whiteSpace: 'nowrap' }}>
                                <span className="shipping-cost">For Free</span>
                                <span
                                  className=" info-tooltip delivery-method-tooltip"
                                  title="Top"
                                  data-tooltip-placement="top"
                                  data-tooltip="top-tooltip"
                                >
                                  i
                                </span>
                                <div id="top-tooltip" className="rc-tooltip">
                                  <FormattedMessage id="payment.forFreeTip" />
                                </div>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                    <div className="card">
                      <div className="card-header">
                        <h5><FormattedMessage id="payment.commentOnDelivery" /></h5>
                      </div>
                      <span
                        className="rc-input nomaxwidth rc-border-all rc-border-colour--interface"
                        input-setup="true"
                      >
                        <textarea
                          className="rc-input__textarea noborder"
                          maxLength="1000"
                          name="dwfrm_shipping_shippingAddress_deliveryComment"
                          id="delivery-comment"
                          value={this.state.commentOnDelivery}
                          onChange={(e) => this.commentChange(e)}
                        ></textarea>
                        <label
                          className="rc-input__label"
                          htmlFor="delivery-comment"
                        ></label>
                      </span>
                    </div>
                  </div>
                  <div className="place_order-btn card">
                    <div className="next-step-button">
                      <div className="rc-text--right">
                        <button
                          className="rc-btn rc-btn--one submit-payment"
                          type="submit"
                          name="submit"
                          value="submit-shipping"
                          onClick={() => this.ChoosePayment()}
                        >
                          <FormattedMessage id="payment.choosePayment" />
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* <p>
                    <button
                      className="rc-btn rc-btn--one pull-right rc-margin-bottom--sm"
                      onClick={() => this.ChoosePayment()}
                    >
                      Choose a payment
                    </button>
                  </p> */}
                </div>
                <div
                  style={{
                    display: this.state.type == "payment" ? "block" : "none",
                  }}
                >
                  <div className="card shipping-summary">
                    <div className="card-header rc-padding-right--none clearfix">
                      <h5 className="pull-left">Address and Shipping Method</h5>
                      <a
                        href="#"
                        onClick={(e) => this.goDelivery(e)}
                        className=" rc-styled-link rc-margin-top--xs pull-right"
                      >
                        Edit
                      </a>
                    </div>
                    <div className="card-body rc-padding--none">
                      <p className="shipping-addr-label multi-shipping padding-y--sm">
                        Addresses and shipping methods are indicated under your
                        goods.
                      </p>
                      <div
                        className="single-shipping"
                        data-shipment-summary="8b50610f77571c1ac58b609278"
                      >
                        <div className="rc-border-all rc-border-colour--interface checkout--padding">
                          <div className="summary-details shipping rc-margin-bottom--xs">
                            <div className="address-summary row">
                              <div className="col-md-12 deliveryAddress">
                                <h5 className="center"><FormattedMessage id="payment.deliveryTitle" /></h5>
                                <div className="row">
                                  <div className="col-md-6"><FormattedMessage id="payment.firstName" /></div>
                                  <div className="col-md-6">
                                    &nbsp;{deliveryAddress.firstName}
                                  </div>
                                  <div className="col-md-6"><FormattedMessage id="payment.lastName" /></div>
                                  <div className="col-md-6">
                                    &nbsp;{deliveryAddress.lastName}
                                  </div>
                                  <div className="col-md-6"><FormattedMessage id="payment.address1" /></div>
                                  <div className="col-md-6">
                                    &nbsp;{deliveryAddress.address1}
                                  </div>
                                  <div className="col-md-6"><FormattedMessage id="payment.address2" /></div>
                                  <div className="col-md-6">
                                    &nbsp;{deliveryAddress.address2}
                                  </div>
                                  <div className="col-md-6"><FormattedMessage id="payment.country" /></div>
                                  <div className="col-md-6">
                                    &nbsp;{deliveryAddress.country}
                                  </div>
                                  <div className="col-md-6"><FormattedMessage id="payment.city" /></div>
                                  <div className="col-md-6">
                                    &nbsp;{deliveryAddress.city}
                                  </div>
                                  <div className="col-md-6"><FormattedMessage id="payment.postCode" /></div>
                                  <div className="col-md-6">
                                    &nbsp;{deliveryAddress.postCode}
                                  </div>
                                  <div className="col-md-6"><FormattedMessage id="payment.phoneNumber" /></div>
                                  <div className="col-md-6">
                                    &nbsp;{deliveryAddress.phoneNumber}
                                  </div>
                                  <div className="col-md-6">
                                    <FormattedMessage id="payment.normalDelivery2" />
                                  </div>
                                  <div className="col-md-6"><FormattedMessage id="payment.forFree" /></div>
                                  <div className="col-md-6">
                                    <FormattedMessage id="payment.commentOnDelivery" />
                                  </div>
                                  <div className="col-md-6">
                                    &nbsp;{this.state.commentOnDelivery}
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-12 address-summary-left">
                                <h5 className="center"><FormattedMessage id="payment.billTitle" /></h5>
                                <div className="row">
                                  <div className="col-md-6"><FormattedMessage id="payment.firstName" /></div>
                                  <div className="col-md-6">
                                    &nbsp;{billingAddress.firstName}
                                  </div>
                                  <div className="col-md-6"><FormattedMessage id="payment.lastName" /></div>
                                  <div className="col-md-6">
                                    &nbsp;{billingAddress.lastName}
                                  </div>
                                  <div className="col-md-6"><FormattedMessage id="payment.address1" /></div>
                                  <div className="col-md-6">
                                    &nbsp;{billingAddress.address1}
                                  </div>
                                  <div className="col-md-6"><FormattedMessage id="payment.address2" /></div>
                                  <div className="col-md-6">
                                    &nbsp;{billingAddress.address2}
                                  </div>
                                  <div className="col-md-6"><FormattedMessage id="payment.country" /></div>
                                  <div className="col-md-6">
                                    &nbsp;{billingAddress.country}
                                  </div>
                                  <div className="col-md-6"><FormattedMessage id="payment.city" /></div>
                                  <div className="col-md-6">
                                    &nbsp;{billingAddress.city}
                                  </div>
                                  <div className="col-md-6"><FormattedMessage id="payment.postCode" /></div>
                                  <div className="col-md-6">
                                    &nbsp;{billingAddress.postCode}
                                  </div>
                                  <div className="col-md-6"><FormattedMessage id="payment.phoneNumber" /></div>
                                  <div className="col-md-6">
                                    &nbsp;{billingAddress.phoneNumber}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="rc-margin-bottom--xs delivery-comment"
                            style={{ display: "none" }}
                          >
                            <b>Delivery comment:</b> <span>null</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card payment-form">
                    <div className="card-body rc-padding--none">
                      <form
                        method="POST"
                        data-address-mode="new"
                        name="dwfrm_billing"
                        id="dwfrm_billing"
                      >
                        <div className="card-header with-tooltip-icon rc-margin-top--sm">
                          <h5><FormattedMessage id="payment.paymentInformation" /></h5>
                        </div>
                        <div className="billing-payment">
                          <div className="form-group rc-border-all rc-border-colour--interface checkout--padding">
                            <div className="row">
                              <div className="col-md-12">
                                <div className="rc-input rc-input--inline">
                                  <input
                                    className="rc-input__radio"
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
                                    className="rc-input__label--inline"
                                    htmlFor="id-radio-creditCard"
                                  >
                                    Credit card
                                    {CreditCardImg}
                                  </label>
                                </div>
                              </div>
                              <div className="col-md-6" style={{ display: 'none' }}>
                                <div className="rc-input rc-input--inline">
                                  <input
                                    className="rc-input__radio"
                                    id="id-radio-payPal"
                                    value="payPal"
                                    type="radio"
                                    name="pay-method"
                                    onChange={(e) => this.payMethodChange(e)}
                                    checked={this.state.payMethod === "payPal"}
                                  />
                                  <label
                                    className="rc-input__label--inline"
                                    htmlFor="id-radio-payPal"
                                  >
                                    <span className="logo-payment-card-list">
                                      <img
                                        className="logo-payment-card"
                                        style={{
                                          height: "18px",
                                          width: "70px",
                                        }}
                                        src={paypalImg}
                                      />
                                    </span>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              {this.state.showPayMethodError ?
                                <div className="ui-warning" style={{ paddingLeft: '20px' }}>
                                  Payment method is required.
                              </div>
                                : null}
                            </div>
                          </div>
                          <div
                            className="rc-list__accordion-item"
                            data-method-id="CREDIT_CARD"
                            style={{
                              display:
                                this.state.payMethod == "creditCard"
                                  ? "block"
                                  : "none",
                            }}
                          >
                            <div className="rc-border-all rc-border-colour--interface checkout--padding">
                              <div
                                className="credit-card-content"
                                id="credit-card-content"
                                style={{
                                  display: !this.state.isCompleteCredit
                                    ? "block"
                                    : "none",
                                }}
                              >
                                <div className="credit-card-form ">
                                  <div className="rc-margin-bottom--xs">
                                    <div className="content-asset">
                                      <p>We accept credit cards.</p>
                                    </div>
                                    <div className="row">
                                      <div className="col-sm-12">
                                        <div className="form-group">
                                          <label
                                            className="form-control-label"
                                            htmlFor="cardNumber"
                                          >
                                            Card number*
                                            {CreditCardImg}
                                            <div className="cardFormBox ui-border-bottom-none-md-down">
                                              <span className="cardImage">
                                                <img
                                                  alt="Card"
                                                  src="https://js.paymentsos.com/v2/iframe/latest/static/media/unknown.c04f6db7.svg"
                                                />
                                              </span>
                                              <span className="cardForm">
                                                <div className="row">
                                                  <div className="col-sm-5">
                                                    <div className="form-group required">
                                                      <span
                                                        className="rc-input rc-input--full-width"
                                                        input-setup="true"
                                                      >
                                                        <input
                                                          type="text"
                                                          className="rc-input__control form-control email"
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
                                                          maxLength="254"
                                                          placeholder="Card Number"
                                                        />
                                                      </span>
                                                      <div className="invalid-feedback ui-position-absolute">
                                                        <FormattedMessage id="payment.errorInfo2" />
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="col-sm-4">
                                                    <div className="form-group required">
                                                      <span
                                                        className="rc-input rc-input--full-width"
                                                        input-setup="true"
                                                        data-js-validate=""
                                                        data-js-warning-message="*Phone Number isn’t valid"
                                                      >
                                                        <input
                                                          type="tel"
                                                          className="rc-input__control form-control phone"
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
                                                          maxLength="2147483647"
                                                          placeholder="MM/YY"
                                                        />
                                                      </span>
                                                      <div className="invalid-feedback ui-position-absolute">
                                                        The field is required.
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="col-sm-3">
                                                    <div className="form-group required">
                                                      <span
                                                        className="rc-input rc-input--full-width"
                                                        input-setup="true"
                                                        data-js-validate=""
                                                        data-js-warning-message="*Phone Number isn’t valid"
                                                      >
                                                        <input
                                                          type="tel"
                                                          className="rc-input__control form-control phone"
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
                                                          maxLength="2147483647"
                                                          placeholder="CVV"
                                                        />
                                                      </span>
                                                      <div className="invalid-feedback ui-position-absolute">
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
                                    <div className="row overflow_visible">
                                      <div className="col-sm-12">
                                        <div className="form-group required">
                                          <label className="form-control-label">
                                            Cardowner
                                          </label>
                                          <span
                                            className="rc-input rc-input--full-width"
                                            input-setup="true"
                                          >
                                            <input
                                              type="text"
                                              className="rc-input__control form-control cardOwner"
                                              name="cardOwner"
                                              value={creditCardInfo.cardOwner}
                                              onChange={(e) =>
                                                this.cardInfoInputChange(e)
                                              }
                                              onBlur={(e) => this.inputBlur(e)}
                                              maxLength="40"
                                            />
                                            <label
                                              className="rc-input__label"
                                              htmlFor="cardOwner"
                                            ></label>
                                          </span>
                                          <div className="invalid-feedback">
                                            <FormattedMessage id="payment.errorInfo2" />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-sm-6">
                                        <div className="form-group required">
                                          <label className="form-control-label">
                                            Email
                                          </label>
                                          <span
                                            className="rc-input rc-input--full-width"
                                            input-setup="true"
                                          >
                                            <input
                                              type="text"
                                              className="rc-input__control form-control email"
                                              id="email"
                                              value={creditCardInfo.email}
                                              onChange={(e) =>
                                                this.cardInfoInputChange(e)
                                              }
                                              onBlur={(e) => this.inputBlur(e)}
                                              name="email"
                                              maxLength="254"
                                            />
                                            <label
                                              className="rc-input__label"
                                              htmlFor="email"
                                            ></label>
                                          </span>
                                          <div className="invalid-feedback">
                                            <FormattedMessage id="payment.errorInfo2" />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-sm-6">
                                        <div className="form-group required">
                                          <label
                                            className="form-control-label"
                                            htmlFor="phoneNumber"
                                          >
                                            <FormattedMessage id="payment.phoneNumber" />
                                          </label>
                                          <span
                                            className="rc-input rc-input--full-width"
                                            input-setup="true"
                                            data-js-validate=""
                                            data-js-warning-message="*Phone Number isn’t valid"
                                          >
                                            <input
                                              type="tel"
                                              className="rc-input__control form-control phone"
                                              min-lenght="18"
                                              max-length="18"
                                              data-phonelength="18"
                                              data-js-validate="(^(\+?7|8)?9\d{9}$)"
                                              data-range-error="The phone number should contain 10 digits"
                                              value={creditCardInfo.phoneNumber}
                                              onChange={(e) =>
                                                this.cardInfoInputChange(e)
                                              }
                                              onBlur={(e) => this.inputBlur(e)}
                                              name="phoneNumber"
                                              maxLength="2147483647"
                                            />
                                            <label
                                              className="rc-input__label"
                                              htmlFor="phoneNumber"
                                            ></label>
                                          </span>
                                          <div className="invalid-feedback">
                                            <FormattedMessage id="payment.errorInfo2" />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-sm-12 rc-margin-y--xs rc-text--center">
                                        <button
                                          className="rc-btn rc-btn--two card-confirm"
                                          id="card-confirm"
                                          type="button"
                                          onClick={() => this.confirmCardInfo()}
                                        >
                                          <FormattedMessage id="payment.confirmCard" />
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
                                    <FormattedMessage id="edit" />
                                  </span>
                                </p>
                                <div className="row">
                                  <div className="col-sm-5">
                                    <img src={visaImg} alt="" />
                                  </div>
                                  <div className="col-sm-7">
                                    <div className="row creditCompleteInfo ui-margin-top-1-md-down">
                                      <div className="col-6">
                                        <p><FormattedMessage id="name" /></p>
                                        <p><FormattedMessage id="payment.cardNumber" /></p>
                                        <p><FormattedMessage id="payment.DEBIT" /></p>
                                      </div>
                                      <div className="col-6">
                                        <p>&nbsp;{creditCardInfo.cardOwner}</p>
                                        <p>&nbsp;{creditCardInfo.cardNumber}</p>
                                        <p>&nbsp;{creditCardInfo.cardCVV}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="footerCheckbox rc-margin-top--sm">
                    <input
                      className="form-check-input"
                      id="id-checkbox-cat-2"
                      value=""
                      type="checkbox"
                      name="checkbox-2"
                      onChange={() => {
                        this.setState({
                          isReadPrivacyPolicy: !this.state.isReadPrivacyPolicy,
                          isReadPrivacyPolicyInit: false,
                        });
                      }}
                      checked={this.state.isReadPrivacyPolicy}
                    />
                    <label htmlFor="id-checkbox-cat-2" className="rc-input__label--inline">
                      <FormattedMessage id="payment.confirmInfo3" />
                      <div
                        className="warning"
                        style={{
                          display:
                            this.state.isReadPrivacyPolicy ||
                              this.state.isReadPrivacyPolicyInit
                              ? "none"
                              : "block",
                        }}
                      >
                        <FormattedMessage id="payment.confirmInfo4" />
                      </div>
                    </label>
                  </div>
                  <div className="footerCheckbox">
                    <input
                      className="form-check-input"
                      id="id-checkbox-cat-1"
                      value="Cat"
                      type="checkbox"
                      name="checkbox-2"
                      onChange={() => {
                        this.setState({
                          isEighteen: !this.state.isEighteen,
                          isEighteenInit: false,
                        });
                      }}
                      checked={this.state.isEighteen}
                    />
                    <label htmlFor="id-checkbox-cat-1" className="rc-input__label--inline">
                      <FormattedMessage id="payment.confirmInfo1" />
                      <div
                        className="warning"
                        style={{
                          display:
                            this.state.isEighteen || this.state.isEighteenInit
                              ? "none"
                              : "block",
                        }}
                      >
                        <FormattedMessage id="payment.confirmInfo2" />
                      </div>
                    </label>
                  </div>
                  <div className="place_order-btn card">
                    <div className="next-step-button">
                      <div className="rc-text--right">
                        <button
                          className="rc-btn rc-btn--one submit-payment"
                          type="submit"
                          name="submit"
                          value="submit-shipping"
                          onClick={() => this.goConfirmation()}
                        >
                          <FormattedMessage id="payment.further" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="product-summary rc-column">
                <h5 className="product-summary__title rc-margin-bottom--xs">
                  <FormattedMessage id="payment.yourOrder" />
                </h5>
                <a
                  href="#"
                  onClick={(e) => this.goCart(e)}
                  className="product-summary__cartlink rc-styled-link"
                >
                  <FormattedMessage id="edit" />
                </a>
                <PayProductInfo />
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
