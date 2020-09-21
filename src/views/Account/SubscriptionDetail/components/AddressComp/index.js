import React from 'react';
import Skeleton from 'react-skeleton-loader';
import { injectIntl, FormattedMessage } from 'react-intl';
import { find } from 'lodash';
import {
  getAddressList,
  saveAddress,
  editAddress,
  deleteAddress
} from '@/api/address';
import { queryCityNameById } from '@/api';
import { getDictionary, validData } from '@/utils/utils';
import { ADDRESS_RULE } from '@/utils/constant';
import AddressForm from './form';
import Loading from '@/components/Loading';
import ConfirmTooltip from '@/components/ConfirmTooltip';
import './index.less';

/**
 * address list(delivery/billing) - member
 */
class AddressList extends React.Component {
  static defaultProps = {
    visible: true,
    type: 'delivery'
  };
  constructor(props) {
    super(props);
    this.state = {
      deliveryAddress: {
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        rfc: '',
        country: process.env.REACT_APP_DEFAULT_COUNTRYID || '',
        city: '',
        postCode: '',
        phoneNumber: '',
        isDefalt: false
      },
      errMsg: '',
      loading: true,
      saveLoading: false,
      deleteLoading: false,
      addOrEdit: false,
      addressList: [],
      countryList: [],
      foledMore: true,
      successTipVisible: false,
      successTip: '',
      saveErrorMsg: '',
      selectedId: '',
      isBillSame: true,
      type: ''
    };
    this.timer = null;
  }
  async componentWillReceiveProps(props) {
    if (props.type !== this.state.type) {
      if (props.type === 'delivery') {
        this.setState({ selectedId: props.deliveryAddressId }, () => {
          this.queryAddressList();
        });
      } else {
        this.setState({ selectedId: props.billingAddressId }, () => {
          this.queryAddressList();
        });
      }
    }
    this.setState({ type: props.type });
  }
  async componentDidMount() {
    await getDictionary({ type: 'country' }).then((res) => {
      this.setState({
        countryList: res
      });
    });
    // this.queryAddressList();
    // if (this.props.type === 'delivery') {
    //   this.setState({ selectedId: this.props.deliveryAddressId }, () => {
    //     this.queryAddressList();
    //   })
    // } else {
    //   this.setState({ selectedId: this.props.billingAddressId }, () => {
    //     this.queryAddressList();
    //   })
    // }
  }
  async queryAddressList() {
    const { selectedId } = this.state;
    this.setState({ loading: true });
    try {
      let res = await getAddressList();
      let addressList = res.context.filter(
        (ele) => ele.type === this.props.type.toUpperCase()
      );
      let tmpId;
      const defaultAddressItem = find(
        addressList,
        (ele) => ele.isDefaltAddress === 1
      );
      if (
        selectedId &&
        find(addressList, (ele) => ele.deliveryAddressId === selectedId)
      ) {
        Array.from(
          addressList,
          (ele) => (ele.selected = ele.deliveryAddressId === selectedId)
        );
        console.log(1);
      } else if (defaultAddressItem) {
        console.log(2);
        Array.from(
          addressList,
          (ele) => (ele.selected = ele.isDefaltAddress === 1)
        );
        tmpId = defaultAddressItem.deliveryAddressId;
      } else if (addressList.length) {
        console.log(3);
        // Array.from(addressList, (ele, i) => (ele.selected = !i));
        // tmpId = addressList[0].deliveryAddressId;
      }
      console.log(4);
      let cityRes = await queryCityNameById({
        id: addressList.map((ele) => ele.cityId)
      });
      cityRes = cityRes.context.systemCityVO || [];
      Array.from(addressList, (ele) => {
        ele.cityName = cityRes.filter((c) => c.id === ele.cityId).length
          ? cityRes.filter((c) => c.id === ele.cityId)[0].cityName
          : ele.cityId;
      });
      this.setState({
        addressList: addressList,
        addOrEdit: !addressList.length,
        selectedId: tmpId
      });
    } catch (err) {
      this.setState({
        errMsg: err.toString()
      });
    } finally {
      this.setState({ loading: false });
    }
  }
  getDictValue(list, id) {
    if (list && list.length > 0) {
      let item = list.find((item) => {
        return item.id === id;
      });
      if (item) {
        return item.name;
      } else {
        return id;
      }
    } else {
      return id;
    }
  }
  selectAddress(idx) {
    let { addressList } = this.state;
    Array.from(addressList, (a) => (a.selected = false));
    addressList[idx].selected = true;
    this.setState({
      addressList: addressList,
      selectedId: addressList[idx].deliveryAddressId
    });
  }
  addOrEditAddress(idx = -1) {
    const { deliveryAddress, addressList } = this.state;
    this.currentOperateIdx = idx;
    let tmpDeliveryAddress = {
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      rfc: '',
      country: process.env.REACT_APP_DEFAULT_COUNTRYID || '',
      city: '',
      postCode: '',
      phoneNumber: '',
      isDefalt: false
    };
    this.setState({
      addOrEdit: true
    });
    if (idx > -1) {
      const tmp = addressList[idx];
      tmpDeliveryAddress = {
        firstName: tmp.firstName,
        lastName: tmp.lastName,
        address1: tmp.address1,
        address2: tmp.address2,
        rfc: tmp.rfc,
        country: tmp.countryId ? tmp.countryId.toString() : '',
        city: tmp.cityId ? tmp.cityId.toString() : '',
        cityName: tmp.cityName,
        postCode: tmp.postCode,
        phoneNumber: tmp.consigneeNumber,
        email: tmp.email,
        isDefalt: tmp.isDefaltAddress === 1 ? true : false
      };
    }
    this.setState({
      deliveryAddress: Object.assign({}, deliveryAddress, tmpDeliveryAddress)
    });
    this.scrollToTitle();
  }
  isDefalt() {
    let data = this.state.deliveryAddress;
    data.isDefalt = !data.isDefalt;
    this.setState({
      deliveryAddress: data
    });
  }
  updateDeliveryAddress(data) {
    this.setState({
      deliveryAddress: data,
      saveErrorMsg: ''
    });
  }
  scrollToTitle() {
    const widget = document.querySelector(`#J-address-title-${this.props.id}`);
    const headerWidget = document.querySelector('.rc-header__scrolled')
      ? document.querySelector('.rc-header__scrolled')
      : document.querySelector('.rc-header__nav');
    if (widget && headerWidget) {
      window.scrollTo({
        top:
          this.getElementToPageTop(widget) -
          950 -
          this.getElementToPageTop(headerWidget),
        behavior: 'smooth'
      });
    }
  }
  getElementToPageTop(el) {
    if (el.parentElement) {
      return this.getElementToPageTop(el.parentElement) + el.offsetTop;
    }
    return el.offsetTop;
  }
  handleClickCancel() {
    if (this.state.addressList.length) {
      this.setState({ addOrEdit: false, saveErrorMsg: '' });
      this.scrollToTitle();
    } else {
      this.props.cancel();
    }
  }
  async handleSave() {
    try {
      const { deliveryAddress, addressList } = this.state;
      const originData = addressList[this.currentOperateIdx];
      await validData(ADDRESS_RULE, deliveryAddress);
      let params = {
        address1: deliveryAddress.address1,
        address2: deliveryAddress.address2,
        firstName: deliveryAddress.firstName,
        lastName: deliveryAddress.lastName,
        countryId: +deliveryAddress.country,
        cityId: +deliveryAddress.city,
        consigneeName:
          deliveryAddress.firstName + ' ' + deliveryAddress.lastName,
        consigneeNumber: deliveryAddress.phoneNumber,
        customerId: originData ? originData.customerId : '',
        deliveryAddress:
          deliveryAddress.address1 + ' ' + deliveryAddress.address2,
        deliveryAddressId: originData ? originData.deliveryAddressId : '',
        isDefaltAddress: deliveryAddress.isDefalt ? 1 : 0,
        postCode: deliveryAddress.postCode,
        provinceId: 0,
        rfc: deliveryAddress.rfc,
        email: deliveryAddress.email,
        type: this.props.type.toUpperCase()
      };

      this.setState({ saveLoading: true });
      const tmpPromise =
        this.currentOperateIdx > -1 ? editAddress : saveAddress;
      let res = await tmpPromise(params);
      this.scrollToTitle();
      if (res.context.deliveryAddressId) {
        this.setState({
          selectedId: res.context.deliveryAddressId
        });
      }

      await this.queryAddressList();
      this.setState({
        addOrEdit: false,
        successTipVisible: true,
        successTip: this.props.intl.messages.saveSuccessfullly,
        selectedId: res.context.deliveryAddressId
      });
      this.props.save(res.context, false, this.queryAddressList.bind(this));
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.setState({
          successTipVisible: false
        });
      }, 2000);
      return res;
    } catch (err) {
      this.setState({
        saveErrorMsg: err.toString()
      });
      this.scrollToTitle();
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.setState({
          saveErrorMsg: ''
        });
      }, 5000);
    } finally {
      this.setState({ saveLoading: false });
    }
  }
  async deleteAddress(item) {
    console.log(item, 'item');
    let { addressList } = this.state;
    item.confirmTooltipVisible = false;
    if (item.canDelFlag === false) {
      this.showErrorMsg(this.props.intl.messages.deleteAddressTip);
      return;
    }
    this.setState({
      deleteLoading: true,
      addressList: addressList
    });
    await deleteAddress({ id: item.deliveryAddressId })
      .then((res) => {
        this.setState({ deleteLoading: false });
        if (res.code === 'K-000000') {
          this.setState({
            successTipVisible: true,
            successTip: this.props.intl.messages.deleteAddressSuccess
          });
          setTimeout(() => {
            this.setState({
              successTipVisible: false
            });
          }, 2000);
          // this.showErrorMsg(
          //   res.message || this.props.intl.messages.deleteAddressSuccess
          // );
          this.queryAddressList();
        } else {
          this.showErrorMsg(
            res.message || this.props.intl.messages.deleteAddressFailed
          );
        }
      })
      .catch((err) => {
        this.showErrorMsg(
          err.toString() || this.props.intl.messages.deleteAddressFailed
        );
        this.setState({ deleteLoading: false });
      });
  }
  showErrorMsg(msg) {
    this.setState({
      saveErrorMsg: msg
    });
    this.scrollToTitle();
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({
        saveErrorMsg: ''
      });
    }, 3000);
  }
  updateConfirmTooltipVisible(el, status) {
    let { addressList } = this.state;
    el.confirmTooltipVisible = status;
    this.setState({
      addressList: addressList
    });
  }
  render() {
    let {
      deliveryAddress,
      addOrEdit,
      loading,
      foledMore,
      addressList,
      isBillSame
    } = this.state;
    return (
      <div className={`${this.props.visible ? '' : 'hidden'} addressComp`}>
        <div
          id={`J-address-title-${this.props.id}`}
          className="card-header"
          style={{ overflow: 'hidden' }}
        >
          <h5
            className="pull-left"
            style={{
              marginBottom: '0 !important',
              height: '100%',
              lineHeight: '36px'
            }}
          >
            {this.props.type === 'delivery' ? (
              <FormattedMessage id="payment.deliveryTitle" />
            ) : (
              <FormattedMessage id="payment.billTitle" />
            )}
          </h5>
        </div>
        <div
          className={`js-errorAlertProfile-personalInfo rc-margin-bottom--xs ${
            this.state.saveErrorMsg ? '' : 'hidden'
          }`}
        >
          <aside
            className="rc-alert rc-alert--error rc-alert--with-close errorAccount"
            role="alert"
          >
            <span className="pl-0">{this.state.saveErrorMsg}</span>
            <button
              className="rc-btn rc-alert__close rc-icon rc-close-error--xs"
              aria-label="Close"
              onClick={() => {
                this.setState({ saveErrorMsg: '' });
              }}
            >
              <span className="rc-screen-reader-text">
                <FormattedMessage id="close" />
              </span>
            </button>
          </aside>
        </div>
        <aside
          className={`rc-alert rc-alert--success js-alert js-alert-success-profile-info rc-alert--with-close rc-margin-bottom--xs ${
            this.state.successTipVisible ? '' : 'hidden'
          }`}
          role="alert"
        >
          <p className="success-message-text rc-padding-left--sm--desktop rc-padding-left--lg--mobile rc-margin--none">
            {/* <FormattedMessage id="saveSuccessfullly" /> */}
            {this.state.successTip}
          </p>
        </aside>
        <div
          className={`rc-margin-bottom--sm ${
            !addOrEdit ? '' : 'checkout--padding'
          } ${loading ? 'pt-3 pb-3' : ''}`}
        >
          {loading ? (
            <Skeleton color="#f5f5f5" count={2} width="100%" />
          ) : this.state.errMsg ? (
            <span className="pt-2 pb-2">{this.state.errMsg}</span>
          ) : (
            <>
              {!addOrEdit ? (
                addressList.length ? (
                  <>
                    <div
                      className="d-flex align-items-center justify-content-between flex-wrap"
                      style={{ lineHeight: '40px' }}
                    >
                      <div
                        className={`rc-input rc-input--inline ${
                          this.props.type === 'delivery' ? '' : 'hidden'
                        }`}
                        onClick={() => {
                          isBillSame = !isBillSame;
                          console.log(isBillSame);
                          this.setState({ isBillSame });
                        }}
                      >
                        {isBillSame ? (
                          <input
                            type="checkbox"
                            className="rc-input__checkbox"
                            value={true}
                            key={1}
                            checked
                          />
                        ) : (
                          <input
                            type="checkbox"
                            className="rc-input__checkbox"
                            key={2}
                            value={false}
                          />
                        )}
                        <label className="rc-input__label--inline text-break billingSame">
                          <FormattedMessage id="biliingAddressSameAs" />
                        </label>
                      </div>
                      <p
                        className={`red rc-margin-top--xs ui-cursor-pointer inlineblock m-0 d-flex align-items-center ${
                          addOrEdit ? 'hidden' : ''
                        }`}
                        onClick={() => this.addOrEditAddress()}
                      >
                        <span className="rc-icon rc-plus--xs rc-brand1 address-btn-plus"></span>
                        <span>
                          <FormattedMessage id="newAddress" />
                        </span>
                      </p>
                    </div>
                    {addressList.map((item, i) => (
                      <div
                        className={`address-item ${
                          item.selected ? 'selected' : ''
                        }`}
                        key={item.deliveryAddressId}
                        onClick={() => this.selectAddress(i)}
                      >
                        <div className="row align-items-center pt-3 pb-3 ml-2 mr-2">
                          <div className="d-flex align-items-center justify-content-between col-2 col-md-1 address-name">
                            {item.selected ? (
                              <svg width="24" height="32">
                                <path
                                  d="M12 15c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4m0-15C5.383 0 0 5.109 0 11.388c0 5.227 7.216 16.08 9.744 19.47A2.793 2.793 0 0 0 12 32c.893 0 1.715-.416 2.256-1.142C16.784 27.468 24 16.615 24 11.388 24 5.109 18.617 0 12 0"
                                  fill="#E2001A"
                                  fillRule="evenodd"
                                ></path>
                              </svg>
                            ) : (
                              <svg width="24" height="32">
                                <path
                                  d="M12 15c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4m0-15C5.383 0 0 5.109 0 11.388c0 5.227 7.216 16.08 9.744 19.47A2.793 2.793 0 0 0 12 32c.893 0 1.715-.416 2.256-1.142C16.784 27.468 24 16.615 24 11.388 24 5.109 18.617 0 12 0"
                                  fill="#c4c4c4"
                                  fillRule="evenodd"
                                ></path>
                              </svg>
                            )}
                          </div>
                          <div className="col-10 col-md-9">
                            {[item.consigneeName, item.consigneeNumber].join(
                              ', '
                            )}
                            {item.isDefaltAddress === 1 ? (
                              <span className="icon-default rc-border-colour--brand1 rc-text-colour--brand1">
                                <FormattedMessage id="default" />
                              </span>
                            ) : null}
                            <br />
                            {[
                              this.getDictValue(
                                this.state.countryList,
                                item.countryId
                              ),
                              item.cityName,
                              item.address1
                            ].join(', ')}
                          </div>
                          <div className="col-12 col-md-2 mt-md-0 mt-1 text-right">
                            <a
                              className="addr-btn-edit pr-2"
                              onClick={() => this.addOrEditAddress(i)}
                            >
                              <FormattedMessage id="edit" />
                            </a>
                            <a
                              className="addr-btn-edit border-left pl-2"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                this.updateConfirmTooltipVisible(item, true);
                              }}
                            >
                              <FormattedMessage id="delete" />
                            </a>
                            <ConfirmTooltip
                              containerStyle={{
                                transform: 'translate(-73%, 111%)',
                                textAlign: 'left'
                              }}
                              arrowStyle={{ left: '89%' }}
                              display={item.confirmTooltipVisible}
                              confirm={() => this.deleteAddress(item)}
                              updateChildDisplay={(status) =>
                                this.updateConfirmTooltipVisible(item, status)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    {/* {
                            addressList.length > 1 && <div
                              className="text-center pt-2 pb-2 ui-cursor-pointer"
                              onClick={() => { this.setState({ foledMore: !foledMore }) }}>
                              <span>
                                {
                                  foledMore
                                    ? <>
                                      <FormattedMessage id="moreAddress" />&nbsp;
                                      <b className="addr-switch switch-on"></b>
                                    </>
                                    : <>
                                      <FormattedMessage id="unfoldAddress" />
                                      <b className="addr-switch switch-off"></b>
                                    </>
                                }
                              </span>
                            </div>
                          } */}
                  </>
                ) : (
                  <FormattedMessage id="order.noDataTip" />
                )
              ) : null}
              {!addOrEdit && (
                <div className="text-right" style={{ marginTop: '10px' }}>
                  {/* <button
                    class="rc-btn rc-btn--sm rc-btn--two"
                    onClick={() => this.props.cancel()}
                  >
                    Cancel
                  </button> */}
                  <a
                    className="rc-styled-link editPersonalInfoBtn"
                    onClick={() => {
                      this.props.cancel();
                      // this.scrollToPaymentComp();
                    }}
                  >
                    <FormattedMessage id="cancel" />
                  </a>
                  &nbsp;
                  <span>
                    <FormattedMessage id="or" />
                  </span>
                  &nbsp;
                  <button
                    class="rc-btn rc-btn--sm rc-btn--one"
                    onClick={() => {
                      this.props.save(
                        addressList.filter((el) => el.selected)[0],
                        isBillSame,
                        this.queryAddressList.bind(this)
                      );
                    }}
                  >
                    <FormattedMessage id="save" />
                  </button>
                </div>
              )}

              {/* add or edit address form */}
              <fieldset
                className={`shipping-address-block rc-fieldset position-relative ${
                  addOrEdit || loading ? '' : 'hidden'
                }`}
              >
                <AddressForm
                  data={deliveryAddress}
                  updateData={(data) => this.updateDeliveryAddress(data)}
                />
                {this.state.saveLoading ? (
                  <Loading positionAbsolute="true" />
                ) : null}
                <div className="rc-layout-container">
                  <div className="rc-column rc-padding-y--none rc-padding-left--none--md-down rc-padding-right--none--md-down d-flex flex-wrap justify-content-between align-items-center">
                    <div>
                      {this.props.type === 'delivery' ? (
                        <div
                          className="rc-input rc-input--inline w-100 mw-100"
                          onClick={() => this.isDefalt()}
                        >
                          {deliveryAddress.isDefalt ? (
                            <input
                              type="checkbox"
                              className="rc-input__checkbox"
                              value={deliveryAddress.isDefalt}
                              key={1}
                              checked
                            />
                          ) : (
                            <input
                              type="checkbox"
                              className="rc-input__checkbox"
                              key={2}
                              value={deliveryAddress.isDefalt}
                            />
                          )}
                          <label
                            className={`rc-input__label--inline text-break`}
                          >
                            <FormattedMessage id="setDefaultAddress" />
                          </label>
                        </div>
                      ) : null}
                    </div>
                    {
                      <>
                        <div className="rc-md-up">
                          <a
                            className="rc-styled-link"
                            onClick={() => this.handleClickCancel()}
                          >
                            <FormattedMessage id="cancel" />
                          </a>
                          &nbsp;
                          <FormattedMessage id="or" />
                          &nbsp;
                          <button
                            className="rc-btn rc-btn--one submitBtn"
                            name="contactPreference"
                            type="submit"
                            onClick={() => this.handleSave()}
                          >
                            <FormattedMessage id="save" />
                          </button>
                        </div>
                        <div className="rc-md-down rc-full-width text-right">
                          <a
                            className="rc-styled-link"
                            onClick={() => this.handleClickCancel()}
                          >
                            <FormattedMessage id="cancel" />
                          </a>
                          &nbsp;
                          <FormattedMessage id="or" />
                          &nbsp;
                          <button
                            className="rc-btn rc-btn--one submitBtn"
                            name="contactPreference"
                            type="submit"
                            onClick={() => this.handleSave()}
                          >
                            <FormattedMessage id="save" />
                          </button>
                        </div>
                      </>
                    }
                  </div>
                </div>
              </fieldset>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default injectIntl(AddressList, { forwardRef: true });
