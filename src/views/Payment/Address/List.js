import React from 'react';
import Skeleton from 'react-skeleton-loader';
import { injectIntl, FormattedMessage } from 'react-intl';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import find from 'lodash/find';
import { getAddressList, saveAddress, editAddress } from '@/api/address';
import { queryCityNameById } from '@/api';
import { getDictionary, validData, matchNamefromDict } from '@/utils/utils';
import { searchNextConfirmPanel, isPrevReady } from '../modules/utils';
import { ADDRESS_RULE } from '@/utils/constant';
import EditForm from './EditForm';
import Loading from '@/components/Loading';
import './list.less';

/**
 * address list(delivery/billing) - member
 */
@inject('paymentStore')
// @injectIntl
@observer
class AddressList extends React.Component {
  static defaultProps = {
    visible: true,
    type: 'delivery',
    showOperateBtn: true,
    updateFormValidStatus: () => {},
    updateData: () => {}
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
        isDefalt: false,
        email: ''
      },
      errMsg: '',
      loading: true,
      saveLoading: false,
      addOrEdit: false,
      addressList: [],
      countryList: [],
      foledMore: true,
      successTipVisible: false,
      saveErrorMsg: '',
      selectedId: '',
      isValid: false
    };
    this.addOrEditAddress = this.addOrEditAddress.bind(this);
    this.timer = null;
  }
  async componentDidMount() {
    getDictionary({ type: 'country' }).then((res) => {
      this.setState({
        countryList: res
      });
    });
    this.queryAddressList();
  }
  get panelStatus() {
    const tmpKey =
      this.props.type === 'delivery'
        ? 'deliveryAddrPanelStatus'
        : 'billingAddrPanelStatus';
    return this.props.paymentStore[tmpKey];
  }
  get curPanelKey() {
    return this.props.type === 'delivery' ? 'deliveryAddr' : 'billingAddr';
  }
  async queryAddressList() {
    const { selectedId } = this.state;
    this.setState({ loading: true });
    try {
      let res = await getAddressList();
      let addressList = res.context.filter(
        (ele) => ele.type === this.props.type.toUpperCase()
      );
      const defaultAddressItem = find(
        addressList,
        (ele) => ele.isDefaltAddress === 1
      );
      let tmpId =
        selectedId ||
        (defaultAddressItem && defaultAddressItem.deliveryAddressId) ||
        (addressList.length && addressList[0].deliveryAddressId) ||
        '';

      Array.from(
        addressList,
        (ele) => (ele.selected = ele.deliveryAddressId === tmpId)
      );

      let cityRes = [];
      if (addressList.length) {
        cityRes = await queryCityNameById({
          id: addressList.map((ele) => ele.cityId)
        });
        cityRes = cityRes.context.systemCityVO || [];
      }

      Array.from(addressList, (ele) => {
        ele.cityName = cityRes.filter((c) => c.id === ele.cityId).length
          ? cityRes.filter((c) => c.id === ele.cityId)[0].cityName
          : ele.cityId;
        return ele;
      });
      this.setState(
        {
          addressList,
          addOrEdit: !addressList.length,
          selectedId: tmpId
        },
        () => {
          const { updateData } = this.props;
          const { selectedId } = this.state;
          const tmpObj = find(
            this.state.addressList,
            (ele) => ele.deliveryAddressId === selectedId
          );
          updateData(tmpObj);
          this.confirmToNextPanel();
        }
      );
    } catch (err) {
      this.setState({
        errMsg: err.message
      });
    } finally {
      this.setState({ loading: false });
    }
  }
  confirmToNextPanel() {
    if (this.curPanelKey !== 'deliveryAddr') {
      return false;
    }
    const { selectedId } = this.state;
    const data = find(
      this.state.addressList,
      (ele) => ele.deliveryAddressId === selectedId
    );
    const { paymentStore } = this.props;
    if (this.curPanelKey === 'deliveryAddr') {
      paymentStore.setStsToCompleted({ key: 'billingAddr' });
    }

    // 下一个最近的未complete的panel
    const nextConfirmPanel = searchNextConfirmPanel({
      list: toJS(paymentStore.panelStatus),
      curKey: this.curPanelKey
    });

    if (data) {
      paymentStore.setStsToCompleted({ key: this.curPanelKey });

      let isReadyPrev = isPrevReady({
        list: toJS(paymentStore.panelStatus),
        curKey: this.curPanelKey
      });

      isReadyPrev && paymentStore.setStsToEdit({ key: nextConfirmPanel.key });
    } else {
      // 没有地址的情况
      paymentStore.setStsToPrepare({ key: nextConfirmPanel.key });
    }
  }
  selectAddress(e, idx) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    let { addressList } = this.state;
    Array.from(addressList, (a) => (a.selected = false));
    addressList[idx].selected = true;
    this.setState(
      {
        addressList: addressList,
        selectedId: addressList[idx].deliveryAddressId
      },
      () => {
        this.props.updateData(
          find(
            this.state.addressList,
            (ele) => ele.deliveryAddressId === this.state.selectedId
          )
        );
      }
    );
  }
  addOrEditAddress(idx = -1) {
    const { type } = this.props;
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
        isDefalt: tmp.isDefaltAddress === 1 ? true : false,
        email: tmp.email
      };
    }

    this.setState(
      {
        deliveryAddress: Object.assign({}, deliveryAddress, tmpDeliveryAddress)
      },
      () => {
        this.setState({
          addOrEdit: true
        });
        this.props.paymentStore.setStsToEdit({
          key: this.curPanelKey,
          hideOthers: type === 'delivery' ? true : false
        });

        this.updateDeliveryAddress(this.state.deliveryAddress);
      }
    );
    if (type === 'delivery') {
      this.scrollToTitle();
    }
  }
  handleDefaultChange = () => {
    let data = this.state.deliveryAddress;
    data.isDefalt = !data.isDefalt;
    this.setState({
      deliveryAddress: data
    });
  };
  updateDeliveryAddress = async (data) => {
    try {
      await validData(ADDRESS_RULE, data);
      this.setState({ isValid: true, saveErrorMsg: '' }, () => {
        this.props.updateFormValidStatus(this.state.isValid);
      });
    } catch (err) {
      this.setState({ isValid: false }, () => {
        this.props.updateFormValidStatus(this.state.isValid);
      });
    } finally {
      this.setState({ deliveryAddress: data });
    }
  };
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
  handleClickCancel = () => {
    this.confirmToNextPanel();
    this.setState({ addOrEdit: false, saveErrorMsg: '' });
    this.scrollToTitle();
  };
  async handleSavePromise() {
    try {
      this.setState({ saveLoading: true });
      const { deliveryAddress, addressList } = this.state;
      const originData = addressList[this.currentOperateIdx];
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
      const tmpPromise =
        this.currentOperateIdx > -1 ? editAddress : saveAddress;
      let res = await tmpPromise(params);
      if (res.context.deliveryAddressId) {
        this.setState({
          selectedId: res.context.deliveryAddressId
        });
      }
      await this.queryAddressList();
      this.showSuccessMsg();
      this.setState({
        addOrEdit: false,
        saveLoading: false
      });
    } catch (err) {
      this.setState({
        saveLoading: false,
        addOrEdit: true
      });
      throw new Error(err.message);
    }
  }
  handleSave = async () => {
    const { isValid, addOrEdit } = this.state;
    if (!isValid || !addOrEdit) {
      return false;
    }
    try {
      await this.handleSavePromise();
    } catch (err) {
      this.showErrMsg(err.message);
      this.setState({ saveLoading: false });
      this.scrollToTitle();
    }
  };
  showErrMsg(msg) {
    this.setState({
      saveErrorMsg: msg
    });
    this.scrollToTitle();
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({
        saveErrorMsg: ''
      });
    }, 5000);
  }
  showSuccessMsg() {
    this.setState({
      successTipVisible: true
    });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({
        successTipVisible: false
      });
    }, 2000);
  }
  toggleFoldBtn = () => {
    this.setState((curState) => ({ foledMore: !curState.foledMore }));
  };
  render() {
    const { showOperateBtn } = this.props;
    const {
      deliveryAddress,
      addOrEdit,
      loading,
      foledMore,
      addressList,
      saveErrorMsg,
      successTipVisible
    } = this.state;

    const _list = addressList.map((item, i) => (
      <div
        className={`rounded address-item ${
          item.selected ? 'selected' : 'border'
        } ${foledMore && !item.selected ? 'hidden' : ''} ${
          !item.selected && i !== addressList.length - 1
            ? 'border-bottom-0'
            : ''
        }`}
        key={item.deliveryAddressId}
        onClick={(e) => this.selectAddress(e, i)}
      >
        <div className="row align-items-center pt-3 pb-3 ml-2 mr-2">
          <div className="d-flex align-items-center justify-content-center col-2 col-md-1 address-name pl-0 pr-0">
            {item.selected ? (
              <svg width="24" height="32">
                <path
                  d="M12 15c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4m0-15C5.383 0 0 5.109 0 11.388c0 5.227 7.216 16.08 9.744 19.47A2.793 2.793 0 0 0 12 32c.893 0 1.715-.416 2.256-1.142C16.784 27.468 24 16.615 24 11.388 24 5.109 18.617 0 12 0"
                  fill="#E2001A"
                  fillRule="evenodd"
                />
              </svg>
            ) : (
              <svg width="24" height="32">
                <path
                  d="M12 15c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4m0-15C5.383 0 0 5.109 0 11.388c0 5.227 7.216 16.08 9.744 19.47A2.793 2.793 0 0 0 12 32c.893 0 1.715-.416 2.256-1.142C16.784 27.468 24 16.615 24 11.388 24 5.109 18.617 0 12 0"
                  fill="#c4c4c4"
                  fillRule="evenodd"
                />
              </svg>
            )}
            {/* <span style={{ flex: 1, marginLeft: '8%', lineHeight: 1.2 }}>{item.consigneeName}</span> */}
          </div>
          <div className="col-10 col-md-9 text-break">
            {[item.consigneeName, item.consigneeNumber].join(', ')}
            {item.isDefaltAddress === 1 ? (
              <span className="icon-default rc-border-colour--brand1 rc-text-colour--brand1">
                <FormattedMessage id="default" />
              </span>
            ) : null}
            <br />
            {[
              matchNamefromDict(this.state.countryList, item.countryId),
              item.cityName,
              item.address1
            ].join(', ')}
          </div>
          <div className="col-12 col-md-2 mt-md-0 mt-1 text-right">
            <span
              className="addr-btn-edit border-left pl-2"
              onClick={this.addOrEditAddress.bind(this, i)}
            >
              <FormattedMessage id="edit" />
            </span>
          </div>
        </div>
      </div>
    ));
    const _foldBtn = (
      <div
        className="text-center pt-2 pb-2 ui-cursor-pointer"
        onClick={this.toggleFoldBtn}
      >
        <span>
          {foledMore ? (
            <>
              <FormattedMessage id="moreAddress" />
              &nbsp;
              <b className="addr-switch switch-on" />
            </>
          ) : (
            <>
              <FormattedMessage id="unfoldAddress" />
              <b className="addr-switch switch-off" />
            </>
          )}
        </span>
      </div>
    );
    const _defaultCheckBox = (
      <div className="rc-input rc-input--inline w-100 mw-100">
        {
          <input
            id="addr-default-checkbox"
            type="checkbox"
            className="rc-input__checkbox"
            onChange={this.handleDefaultChange}
            value={deliveryAddress.isDefalt}
            checked={deliveryAddress.isDefalt}
          />
        }
        <label
          className={`rc-input__label--inline text-break`}
          htmlFor="addr-default-checkbox"
        >
          <FormattedMessage id="setDefaultAddress" />
        </label>
      </div>
    );
    const _title = (
      <div
        id={`J-address-title-${this.props.id}`}
        className="bg-transparent d-flex justify-content-between align-items-center flex-wrap"
      >
        <h5
          className="mb-0 text-nowrap"
          style={{ opacity: this.props.type === 'billing' ? 0 : 1 }}
        >
          <i className="rc-icon rc-indoors--xs rc-iconography" />{' '}
          <FormattedMessage id="payment.deliveryTitle" />
        </h5>
        <p
          className={`red rc-margin-top--xs ui-cursor-pointer inlineblock m-0 align-items-center text-nowrap ${
            addOrEdit ? 'hidden' : ''
          }`}
          onClick={this.addOrEditAddress}
        >
          <span className="rc-icon rc-plus--xs rc-brand1 address-btn-plus" />
          <span>
            <FormattedMessage id="newAddress" />
          </span>
        </p>
      </div>
    );
    const _form = (
      <fieldset
        className={`shipping-address-block rc-fieldset position-relative ${
          addOrEdit || loading ? '' : 'hidden'
        }`}
      >
        {addOrEdit && (
          <EditForm
            isLogin={true}
            initData={deliveryAddress}
            updateData={this.updateDeliveryAddress}
          />
        )}

        {this.state.saveLoading ? (
          <Loading positionAbsolute="true" customStyle={{ zIndex: 9 }} />
        ) : null}
        <div className="rc-layout-container ml-1 mr-1">
          <div className="rc-column rc-padding-y--none rc-padding-left--none--md-down rc-padding-right--none--md-down d-flex flex-wrap justify-content-between align-items-center pl-0 pr-0">
            <div>
              {this.props.type === 'delivery' ? _defaultCheckBox : null}
            </div>
            {showOperateBtn ? (
              addressList.length ? (
                <>
                  <div className="rc-md-up">
                    <span
                      className="rc-styled-link"
                      onClick={this.handleClickCancel}
                    >
                      <FormattedMessage id="cancel" />
                    </span>{' '}
                    <FormattedMessage id="or" />{' '}
                    <button
                      className="rc-btn rc-btn--one submitBtn"
                      name="contactPreference"
                      type="submit"
                      onClick={this.handleSave}
                      disabled={!this.state.isValid}
                    >
                      <FormattedMessage id="save" />
                    </button>
                  </div>
                  <div className="rc-md-down rc-full-width text-right">
                    <span
                      className="rc-styled-link"
                      onClick={this.handleClickCancel}
                    >
                      <FormattedMessage id="cancel" />
                    </span>{' '}
                    <FormattedMessage id="or" />{' '}
                    <button
                      className="rc-btn rc-btn--one submitBtn"
                      name="contactPreference"
                      type="submit"
                      onClick={this.handleSave}
                      disabled={!this.state.isValid}
                    >
                      <FormattedMessage id="save" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="rc-md-up">
                    <button
                      className="rc-btn rc-btn--one submitBtn"
                      name="contactPreference"
                      type="submit"
                      onClick={this.handleSave}
                      disabled={!this.state.isValid}
                    >
                      <FormattedMessage id="clinic.confirm" />
                    </button>
                  </div>
                  <div className="rc-md-down rc-full-width text-right">
                    <button
                      className="rc-btn rc-btn--one submitBtn"
                      name="contactPreference"
                      type="submit"
                      onClick={this.handleSave}
                      disabled={!this.state.isValid}
                    >
                      <FormattedMessage id="clinic.confirm" />
                    </button>
                  </div>
                </>
              )
            ) : null}
          </div>
        </div>
      </fieldset>
    );

    return (
      <>
        {this.props.children}
        <div
          className={`mt-1 ${
            this.props.visible ? '' : 'hidden'
          } payment-addressList`}
        >
          {_title}
          <div
            className={`js-errorAlertProfile-personalInfo rc-margin-bottom--xs ${
              saveErrorMsg ? '' : 'hidden'
            }`}
          >
            <aside
              className="rc-alert rc-alert--error rc-alert--with-close errorAccount"
              role="alert"
            >
              <span className="pl-0">{saveErrorMsg}</span>
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
              successTipVisible ? '' : 'hidden'
            }`}
            role="alert"
          >
            <span className="pl-0">
              <FormattedMessage id="saveSuccessfullly" />
            </span>
          </aside>

          <div
            className={`${!addOrEdit ? 'addr-container' : ''} ${
              loading ? 'pt-3 pb-3' : ''
            }`}
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
                      {_list}
                      {addressList.length > 1 && _foldBtn}
                    </>
                  ) : (
                    <FormattedMessage id="order.noDataTip" />
                  )
                ) : null}
                {/* add or edit address form */}
                {this.panelStatus.isEdit ? <>{_form}</> : null}
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default AddressList;
