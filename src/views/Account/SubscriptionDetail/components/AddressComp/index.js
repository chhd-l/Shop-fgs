import React from 'react';
import Skeleton from 'react-skeleton-loader';
import { injectIntl, FormattedMessage } from 'react-intl';
import find from 'lodash/find';
import {
  getAddressList,
  saveAddress,
  editAddress,
  deleteAddress,
  setDefaltAddress
} from '@/api/address';
import { getDictionary, validData, matchNamefromDict } from '@/utils/utils';
// import { ADDRESS_RULE } from '@/utils/constant';
import EditForm from '@/components/Form';
import Loading from '@/components/Loading';
import ValidationAddressModal from '@/components/validationAddressModal';
import classNames from 'classnames';
import './index.less';

function CardItem(props) {
  const { data } = props;
  return (
    <div
      className={`rc-bg-colour--brand4 rounded p-2 pl-3 pr-3 ui-cursor-pointer-pure h-100 address-item ${
        data.selected ? 'selected' : ''
      }`}
      onClick={props.handleClick}
    >
      <div
        className="position-absolute d-flex align-items-center"
        style={{ right: '4%', top: '7%', zIndex: 9 }}
      >
        {props.operateBtnJSX}
      </div>

      <div className="font-weight-normal mt-4 pt-2 mt-md-0 pt-md-0">
        {data.type === 'DELIVERY' ? (
          <FormattedMessage id="deliveryAddress" />
        ) : (
          <FormattedMessage id="billingAddress" />
        )}
      </div>
      <div>
        <div className="ccard-phone-title word-break">
          <div className="address-name">
            <span>{data.firstName + ' ' + data.lastName}</span>
          </div>
        </div>
        <p className="mb-0">{data.address1}</p>
        {process.env.REACT_APP_LANG == 'en' ? null : (
          <>
            <p className="mb-0">{props.countryName}</p>
          </>
        )}
        <p className="mb-0">{data.city}</p>
        {data.province && data.province != null ? (
          <p className="mb-0">{data.province}</p>
        ) : null}
        {/* <p className="mb-0">{data.consigneeNumber}</p> */}
      </div>
    </div>
  );
}
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
        countryId: process.env.REACT_APP_DEFAULT_COUNTRYID || '',
        country: '',
        city: '',
        cityId: '',
        provinceNo: '',
        provinceId: '',
        province: '',
        postCode: '',
        phoneNumber: '',
        isDefalt: false
      },
      errMsg: '',
      loading: true,
      isValid: false,
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
      type: '',
      validationLoading: false, // 地址校验loading
      validationModalVisible: false, // 地址校验查询开关
      selectValidationOption: 'suggestedAddress',
      itemIdx: ''
    };
    this.timer = null;
    this.confirmValidationAddress = this.confirmValidationAddress.bind(this);
  }
  async UNSAFE_componentWillReceiveProps(props) {
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
        countryList: res,
        validationModalVisible: false
      });
    });
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
      } else if (defaultAddressItem) {
        Array.from(
          addressList,
          (ele) => (ele.selected = ele.isDefaltAddress === 1)
        );
        tmpId = defaultAddressItem.deliveryAddressId;
      } else if (addressList.length) {
        // Array.from(addressList, (ele, i) => (ele.selected = !i));
        // tmpId = addressList[0].deliveryAddressId;
      }
      this.setState({
        addressList: addressList,
        addOrEdit: !addressList.length,
        selectedId: tmpId
      });
    } catch (err) {
      this.setState({
        errMsg: err.message.toString()
      });
    } finally {
      this.setState({ loading: false });
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

  // 新增或者编辑地址 edit or add
  addOrEditAddress(idx = -1) {
    const { deliveryAddress, addressList } = this.state;
    this.currentOperateIdx = idx;
    let tmpDeliveryAddress = {
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      rfc: '',
      countryId: process.env.REACT_APP_DEFAULT_COUNTRYID || '',
      country: '',
      city: '',
      cityId: '',
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
        countryId: tmp.countryId,
        country: tmp?.country,
        cityId: tmp.cityId,
        city: tmp.city,
        cityName: tmp.cityName,
        postCode: tmp.postCode,
        phoneNumber: tmp.consigneeNumber,
        email: tmp.email,
        isDefalt: tmp.isDefaltAddress === 1 ? true : false
      };
      if (process.env.REACT_APP_LANG == 'en') {
        tmpDeliveryAddress.province = tmp.province;
        tmpDeliveryAddress.provinceId = tmp.provinceId;
      }
      this.setState(
        {
          deliveryAddress: Object.assign(
            {},
            deliveryAddress,
            tmpDeliveryAddress
          )
        },
        () => {
          this.setState({
            addOrEdit: true
          });
        }
      );
    } else {
      this.setState({
        deliveryAddress: {
          firstName: '',
          lastName: '',
          address1: '',
          address2: '',
          rfc: '',
          countryId: process.env.REACT_APP_DEFAULT_COUNTRYID || '',
          country: '',
          city: '',
          cityId: 0,
          postCode: '',
          phoneNumber: '',
          isDefalt: false
        }
      });
    }
    this.scrollToTitle();
  }

  isDefalt() {
    let data = this.state.deliveryAddress;
    data.isDefalt = !data.isDefalt;
    this.setState({
      deliveryAddress: data
    });
  }
  // 表单验证
  validFormData = async () => {
    const { deliveryAddress } = this.state;
    try {
      if (
        !deliveryAddress?.formRule ||
        (deliveryAddress?.formRule).length <= 0
      ) {
        return;
      }
      await validData(deliveryAddress.formRule, deliveryAddress); // 数据验证
      // await validData(ADDRESS_RULE, deliveryAddress);
      this.setState({ isValid: true });
    } catch (err) {
      this.setState({ isValid: false });
    }
  };
  updateDeliveryAddress(data) {
    this.setState(
      {
        deliveryAddress: data,
        saveErrorMsg: ''
      },
      () => {
        this.validFormData();
      }
    );
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
    if (this.state.addOrEdit) {
      this.setState({
        addOrEdit: false,
        saveErrorMsg: ''
      });
      this.scrollToTitle();
    } else {
      this.props.cancel();
    }
  }

  // 保存数据
  handleSave() {
    // 地址验证
    this.setState({
      validationLoading: true
    });
    setTimeout(() => {
      this.setState({
        validationModalVisible: true
      });
    }, 800);
  }
  // 选择地址
  chooseValidationAddress = (e) => {
    this.setState({
      selectValidationOption: e.target.value
    });
  };
  // 获取地址验证查询到的数据
  getValidationData = async (data) => {
    this.setState({
      validationLoading: false
    });
    if (data && data != null) {
      // 获取并设置地址校验返回的数据
      this.setState({
        validationAddress: data
      });
    } else {
      // 不校验地址，进入下一步
      this.showNextPanel();
    }
  };
  // 确认选择地址,切换到下一个最近的未complete的panel
  confirmValidationAddress() {
    const {
      deliveryAddress,
      selectValidationOption,
      validationAddress
    } = this.state;
    let oldDeliveryAddress = JSON.parse(JSON.stringify(deliveryAddress));
    if (selectValidationOption == 'suggestedAddress') {
      deliveryAddress.address1 = validationAddress.address1;
      deliveryAddress.city = validationAddress.city;
      deliveryAddress.postCode = validationAddress.postalCode;

      deliveryAddress.province = validationAddress.provinceCode;
      deliveryAddress.provinceId =
        validationAddress.provinceId && validationAddress.provinceId != null
          ? validationAddress.provinceId
          : deliveryAddress.provinceId;

      // 地址校验返回参数
      deliveryAddress.validationResult = validationAddress.validationResult;
    } else {
      this.setState({
        deliveryAddress: JSON.parse(JSON.stringify(oldDeliveryAddress))
      });
    }
    this.showNextPanel();
  }
  // 下一步
  async showNextPanel() {
    try {
      const { deliveryAddress, addressList } = this.state;
      const originData = addressList[this.currentOperateIdx];

      // await validData(deliveryAddress.formRule, deliveryAddress); // 数据验证
      // await validData(ADDRESS_RULE, deliveryAddress);

      this.setState({
        validationModalVisible: false,
        validationLoading: false
      });

      let params = {
        address1: deliveryAddress.address1,
        address2: deliveryAddress.address2,
        firstName: deliveryAddress.firstName,
        lastName: deliveryAddress.lastName,
        countryId: +deliveryAddress.countryId,
        country: +deliveryAddress.country,
        cityId: deliveryAddress.cityId,
        city: deliveryAddress.city,
        cityName: deliveryAddress.cityName,
        consigneeName:
          deliveryAddress.firstName + ' ' + deliveryAddress.lastName,
        consigneeNumber: deliveryAddress.phoneNumber,
        customerId: originData ? originData.customerId : '',
        deliveryAddress:
          deliveryAddress.address1 + ' ' + deliveryAddress.address2,
        deliveryAddressId: originData ? originData.deliveryAddressId : '',
        isDefaltAddress: deliveryAddress.isDefalt ? 1 : 0,
        postCode: deliveryAddress.postCode,
        rfc: deliveryAddress.rfc,
        email: deliveryAddress.email,
        type: this.props.type.toUpperCase()
      };

      params.province = deliveryAddress.province;
      params.provinceId = deliveryAddress.provinceId;
      params.isValidated = deliveryAddress.validationResult;

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
        saveErrorMsg: err.message.toString()
      });
      this.scrollToTitle();
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.setState({
          saveErrorMsg: ''
        });
      }, 5000);
    } finally {
      this.setState({
        saveLoading: false,
        validationModalVisible: false,
        validationLoading: false
      });
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
      })
      .catch((err) => {
        this.showErrorMsg(
          err.message.toString() || this.props.intl.messages.deleteAddressFailed
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
  addBtnJSX = ({ fromPage }) => {
    return (
      <div
        className="rounded p-4 border h-100 d-flex align-items-center justify-content-center"
        onClick={() => this.addOrEditAddress()}
        ref={(node) => {
          if (node) {
            node.style.setProperty('border-width', '.1rem', 'important');
            node.style.setProperty('border-style', 'dashed', 'important');
          }
        }}
      >
        <span className="rc-icon rc-plus--xs rc-iconography plus-icon mt-1" />
        <FormattedMessage id="addANewAddress" />
      </div>
    );
  };
  async toggleSetDefault(item, e) {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    if (!item.isDefaltAddress) {
      await setDefaltAddress({ deliveryAddressId: item.deliveryAddressId });
      this.queryAddressList();
    }
  }
  getAddressList = async ({ showLoading = false } = {}) => {
    showLoading && this.setState({ listLoading: true });
    try {
      let res = await getAddressList();
      let addressList = res.context;

      // console.log('----------------------- ★ AddressComp addressList: ',addressList);

      // let cityRes = await queryCityNameById({
      //   id: addressList.map((ele) => ele.cityId)
      // });
      // cityRes = cityRes.context.systemCityVO || [];
      // Array.from(addressList, (ele) => {
      //   ele.cityName = cityRes.filter((c) => c.id === ele.cityId).length
      //     ? cityRes.filter((c) => c.id === ele.cityId)[0].cityName
      //     : ele.cityId;
      //   return ele;
      // });
      this.setState({
        addressList,
        listLoading: false
      });
    } catch (err) {
      this.setState({ listLoading: false });
    }
  };
  updateConfirmTooltipVisible = (el, status) => {
    let { addressList } = this.state;
    el.confirmTooltipVisible = status;
    this.setState({
      addressList
    });
  };
  handleClickDeleteBtn(data, e) {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.updateConfirmTooltipVisible(data, true);
  }
  render() {
    let {
      deliveryAddress,
      addOrEdit,
      loading,
      isValid,
      addressList,
      isBillSame,
      countryList,
      validationLoading,
      validationModalVisible,
      selectValidationOption
    } = this.state;
    return (
      <div className={`${this.props.visible ? '' : 'hidden'} addressComp`}>
        <div
          id={`J-address-title-${this.props.id}`}
          className="card-header"
          style={{ overflow: 'hidden' }}
        >
          <h5
            className="pull-left ui-cursor-pointer"
            style={{
              marginBottom: '0 !important',
              height: '100%',
              lineHeight: '36px'
            }}
            onClick={() => this.handleClickCancel()}
          >
            <span>&larr; </span>
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
                        style={{ maxWidth: '450px' }}
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
                    </div>
                    <div
                      className={classNames({
                        // hidden: !listVisible || editFormVisible
                      })}
                    >
                      <div className={classNames('row', 'ml-0', 'mr-0')}>
                        {addressList.map((item, i) => (
                          <div
                            className="col-12 col-md-6 p-2"
                            key={item.deliveryAddressId}
                          >
                            <CardItem
                              data={item}
                              operateBtnJSX={
                                <>
                                  {item.isDefaltAddress === 1 ? (
                                    <div
                                      className="red"
                                      onClick={this.toggleSetDefault.bind(
                                        this,
                                        item
                                      )}
                                    >
                                      <span className="iconfont mr-1">
                                        &#xe68c;
                                      </span>
                                      <span className="rc-styled-link red border-danger">
                                        <FormattedMessage id="default" />
                                      </span>
                                    </div>
                                  ) : (
                                    <div
                                      className="ui-cursor-pointer"
                                      onClick={this.toggleSetDefault.bind(
                                        this,
                                        item
                                      )}
                                    >
                                      <span className="rc-styled-link">
                                        <FormattedMessage id="setAsDefault" />
                                      </span>
                                    </div>
                                  )}
                                  <span className="position-relative p-2 ui-cursor-pointer-pure  pdl-1">
                                    <span
                                      className="rc-styled-link"
                                      onClick={() => this.addOrEditAddress(i)}
                                    >
                                      <FormattedMessage id="edit" />
                                    </span>
                                  </span>
                                </>
                              }
                              handleClick={() => this.selectAddress(i)}
                              countryName={matchNamefromDict(
                                countryList,
                                item.countryId
                              )}
                            />
                          </div>
                        ))}
                        <div className="col-12 col-md-6 p-2 rounded text-center p-2 ui-cursor-pointer">
                          {this.addBtnJSX({ fromPage: 'list' })}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <FormattedMessage id="order.noDataTip" />
                )
              ) : null}
              {!addOrEdit && (
                <div className="text-right" style={{ marginTop: '.625rem' }}>
                  {/* <button
                    className="rc-btn rc-btn--sm rc-btn--two"
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
                  &nbsp;&nbsp;
                  <span>
                    <FormattedMessage id="or" />
                  </span>
                  &nbsp;&nbsp;
                  <button
                    className="rc-btn rc-btn--sm rc-btn--one"
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
                {addOrEdit && (
                  <EditForm
                    initData={deliveryAddress}
                    isLogin={true}
                    updateData={(data) => this.updateDeliveryAddress(data)}
                  />
                )}

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
                            onClick={() =>
                              this.deleteAddress(
                                addressList[this.currentOperateIdx]
                              )
                            }
                          >
                            <FormattedMessage id="delete" />
                          </a>
                          &nbsp;
                          <FormattedMessage id="or" />
                          &nbsp;
                          <button
                            className="rc-btn rc-btn--one submitBtn"
                            name="contactPreference"
                            type="submit"
                            disabled={!isValid}
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

        {validationLoading && <Loading positionFixed="true" />}
        {validationModalVisible && (
          <ValidationAddressModal
            address={deliveryAddress}
            updateValidationData={(res) => this.getValidationData(res)}
            selectValidationOption={selectValidationOption}
            handleChooseValidationAddress={(e) =>
              this.chooseValidationAddress(e)
            }
            hanldeClickConfirm={() => this.confirmValidationAddress()}
            validationModalVisible={validationModalVisible}
            close={() => {
              this.setState({
                saveLoading: false,
                validationModalVisible: false,
                validationLoading: false
              });
            }}
          />
        )}
      </div>
    );
  }
}

export default injectIntl(AddressList, { forwardRef: true });
