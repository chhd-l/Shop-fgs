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
import ValidationAddressModal from '@/components/validationAddressModal';
import AddressPreview from './Preview';
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
    titleVisible: true,
    updateFormValidStatus: () => { },
    updateData: () => { }
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
        countryName: '',
        city: '',
        cityName: '',
        provinceNo: '',
        provinceName: '',
        province: '',
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
      isValid: false,
      validationLoading: false, // 地址校验loading
      validationModalVisible: false, // 地址校验查询开关
      selectValidationOption: 'suggestedAddress'
    };
    this.addOrEditAddress = this.addOrEditAddress.bind(this);
    this.timer = null;
    this.confirmValidationAddress = this.confirmValidationAddress.bind(this);
  }
  async componentDidMount() {
    getDictionary({ type: 'country' }).then((res) => {
      this.setState({
        countryList: res
      });
    });
    this.queryAddressList({ init: true });
  }
  get isDeliverAddress() {
    return this.props.type === 'delivery';
  }
  get panelStatus() {
    const tmpKey = this.isDeliverAddress
      ? 'deliveryAddrPanelStatus'
      : 'billingAddrPanelStatus';
    return this.props.paymentStore[tmpKey];
  }
  get curPanelKey() {
    return this.isDeliverAddress ? 'deliveryAddr' : 'billingAddr';
  }
  async queryAddressList({ init = false } = {}) {
    try {
      const { selectedId } = this.state;
      this.setState({ loading: true });
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
          // this.updateSelectedData();
          // this.confirmToNextPanel({ init });
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
  updateSelectedData() {
    const { selectedId, addressList } = this.state;
    const tmpObj = find(addressList, (ele) => ele.deliveryAddressId === selectedId) || null;
    this.props.updateData(tmpObj);
    this.isDeliverAddress && this.props.paymentStore.setDefaultCardDataFromAddr(tmpObj);
  }
  confirmToNextPanel({ init = false } = {}) {
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
      paymentStore.setStsToCompleted({
        key: this.curPanelKey,
        isFirstLoad: init
      });

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
        this.updateSelectedData();
      }
    );
  }
  addOrEditAddress(idx = -1) {
    const { type } = this.props;
    const { deliveryAddress, addressList } = this.state;
    this.currentOperateIdx = idx;

    let tmpDeliveryAddress = {};

    if (process.env.REACT_APP_LANG === 'en') {
      tmpDeliveryAddress = {
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        rfc: '',
        country: process.env.REACT_APP_DEFAULT_COUNTRYID || '',
        countryName: '',
        city: '',
        cityName: '',
        provinceNo: '',
        provinceName: '',
        province: '',
        postCode: '',
        phoneNumber: '',
        isDefalt: false
      };
    } else {
      tmpDeliveryAddress = {
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        rfc: '',
        country: process.env.REACT_APP_DEFAULT_COUNTRYID || '',
        countryName: '',
        city: '',
        cityName: '',
        postCode: '',
        phoneNumber: '',
        isDefalt: false
      };
    }

    if (idx > -1) {
      const tmp = addressList[idx];
      console.log('--------------------- ★★★ List add Or EditAddress data: ', tmp);
      if (process.env.REACT_APP_LANG === 'en') {
        tmpDeliveryAddress = {
          firstName: tmp.firstName,
          lastName: tmp.lastName,
          address1: tmp.address1,
          address2: tmp.address2,
          rfc: tmp.rfc,
          country: tmp.countryId ? tmp.countryId.toString() : '',
          countryName: tmp.countryName,
          city: tmp.cityId ? tmp.cityId : tmp.city,
          cityName: tmp.city,
          provinceNo: tmp.provinceNo,
          provinceName: tmp.province,
          province: tmp.provinceId,
          postCode: tmp.postCode,
          phoneNumber: tmp.consigneeNumber,
          isDefalt: tmp.isDefaltAddress === 1 ? true : false,
          email: tmp.email
        };
      } else {
        tmpDeliveryAddress = {
          firstName: tmp.firstName,
          lastName: tmp.lastName,
          address1: tmp.address1,
          address2: tmp.address2,
          rfc: tmp.rfc,
          country: tmp.countryId ? tmp.countryId.toString() : '',
          countryName: tmp.countryName,
          city: tmp.cityId ? tmp.cityId : tmp.city,
          cityName: tmp.city,
          postCode: tmp.postCode,
          phoneNumber: tmp.consigneeNumber,
          isDefalt: tmp.isDefaltAddress === 1 ? true : false,
          email: tmp.email
        };
      }
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
          hideOthers: this.isDeliverAddress ? true : false
        });

        this.updateDeliveryAddress(this.state.deliveryAddress);
      }
    );
    if (this.isDeliverAddress) {
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
    console.log('--------------------- List 数据验证 data: ', data);
    try {
      await validData(ADDRESS_RULE, data); // 数据验证
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
    this.setState({ addOrEdit: false, saveErrorMsg: '' });
    this.scrollToTitle();
  };
  // 保存地址
  async handleSavePromise() {
    try {
      this.setState({ saveLoading: true });
      const { deliveryAddress, addressList } = this.state;
      const originData = addressList[this.currentOperateIdx];
      // 手动输入的城市 id 设为 null
      let params = {};
      if (process.env.REACT_APP_LANG === 'en') {
        params = {
          address1: deliveryAddress.address1,
          address2: deliveryAddress.address2,
          firstName: deliveryAddress.firstName,
          lastName: deliveryAddress.lastName,
          countryId: deliveryAddress.country,
          cityId: deliveryAddress.cityName == deliveryAddress.city ? null : deliveryAddress.city,
          city: deliveryAddress.cityName,
          provinceId: deliveryAddress.province,
          province: deliveryAddress.provinceName,
          provinceNo: deliveryAddress.provinceNo,
          consigneeName: deliveryAddress.firstName + ' ' + deliveryAddress.lastName,
          consigneeNumber: deliveryAddress.phoneNumber,
          customerId: originData ? originData.customerId : '',
          deliveryAddress: deliveryAddress.address1 + ' ' + deliveryAddress.address2,
          deliveryAddressId: originData ? originData.deliveryAddressId : '',
          isDefaltAddress: deliveryAddress.isDefalt ? 1 : 0,
          postCode: deliveryAddress.postCode,
          rfc: deliveryAddress.rfc,
          email: deliveryAddress.email,
          type: this.props.type.toUpperCase()
        };
      } else {
        params = {
          address1: deliveryAddress.address1,
          address2: deliveryAddress.address2,
          firstName: deliveryAddress.firstName,
          lastName: deliveryAddress.lastName,
          countryId: deliveryAddress.country,
          cityId: deliveryAddress.cityName == deliveryAddress.city ? null : deliveryAddress.city,
          city: deliveryAddress.cityName,
          consigneeName: deliveryAddress.firstName + ' ' + deliveryAddress.lastName,
          consigneeNumber: deliveryAddress.phoneNumber,
          customerId: originData ? originData.customerId : '',
          deliveryAddress: deliveryAddress.address1 + ' ' + deliveryAddress.address2,
          deliveryAddressId: originData ? originData.deliveryAddressId : '',
          isDefaltAddress: deliveryAddress.isDefalt ? 1 : 0,
          postCode: deliveryAddress.postCode,
          rfc: deliveryAddress.rfc,
          email: deliveryAddress.email,
          type: this.props.type.toUpperCase()
        };
      }
      const tmpPromise =
        this.currentOperateIdx > -1 ? editAddress : saveAddress;
      let res = await tmpPromise(params);
      if (res.context.deliveryAddressId) {
        this.setState({
          selectedId: res.context.deliveryAddressId
        });
      }
      this.isDeliverAddress && this.scrollToTitle();
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
  /**
   * 1 新增/编辑地址
   * 2 确认地址信息，并返回到封面
   */
  handleSave = () => {
    const { isValid, addOrEdit } = this.state;
    if (!isValid || !addOrEdit) {
      return false;
    }
    // 地址验证
    this.setState({
      validationModalVisible: true,
      validationLoading: true
    });
  };
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
      // 下一步
      this.showNextPanel();
    }
  }
  // 下一步
  showNextPanel = async() => {
    this.setState({
      validationModalVisible: false
    });
    // 不校验地址，进入下一步
    await this.handleSavePromise();
    this.clickConfirmAddressPanel();
  }
  // 点击地址验证确认按钮
  confirmValidationAddress = () => {
    const {
      deliveryAddress,
      selectValidationOption,
      validationAddress
    } = this.state;

    if (selectValidationOption == 'suggestedAddress') {
      deliveryAddress.address1 = validationAddress.address1;
      deliveryAddress.address2 = validationAddress.address2;
      deliveryAddress.city = validationAddress.city;
      deliveryAddress.cityName = validationAddress.city;
      deliveryAddress.provinceName = validationAddress.provinceCode;
    }
    // 下一步
    this.showNextPanel();
  };

  /**
   * 确认地址列表信息，并展示封面
   */
  clickConfirmAddressPanel = () => {
    this.updateSelectedData();
    this.confirmToNextPanel();
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
  titleJSXForPrepare() {
    const { titleVisible } = this.props;
    return (
      <h5 className={`mb-0 text-nowrap`}>
        {titleVisible ? (
          <>
            <i className="rc-icon rc-indoors--xs rc-iconography" />{' '}
            <FormattedMessage id="payment.deliveryTitle" />
          </>
        ) : null}
      </h5>
    );
  }
  titleJSXForEdit() {
    const { titleVisible } = this.props;
    const { addOrEdit } = this.state;
    return (
      <>
        <h5 className={`mb-0 text-nowrap red`}>
          {titleVisible ? (
            <>
              <i className="rc-icon rc-indoors--xs rc-brand1" />{' '}
              <FormattedMessage id="payment.deliveryTitle" />
            </>
          ) : null}
        </h5>
        <p
          className={`red rc-margin-top--xs ui-cursor-pointer inlineblock m-0 align-items-center text-nowrap ${addOrEdit ? 'hidden' : ''
            }`}
          onClick={this.addOrEditAddress.bind(this, -1)}
        >
          <span className="rc-icon rc-plus--xs rc-brand1 address-btn-plus" />
          <span>
            <FormattedMessage id="newAddress" />
          </span>
        </p>
      </>
    );
  }
  titleJSXForCompeleted() {
    const { titleVisible } = this.props;
    return (
      <>
        <h5 className={`mb-0 text-nowrap`}>
          {titleVisible ? (
            <>
              <i className="rc-icon rc-indoors--xs rc-iconography" />{' '}
              <FormattedMessage id="payment.deliveryTitle" />
              <span className="iconfont font-weight-bold green ml-2">
                &#xe68c;
              </span>
            </>
          ) : null}
        </h5>{' '}
        <p onClick={this.handleClickEdit} className="rc-styled-link mb-1">
          <FormattedMessage id="edit" />
        </p>
      </>
    );
  }
  handleClickEdit = () => {
    this.props.paymentStore.setStsToEdit({
      key: this.curPanelKey,
      hideOthers: true
    });
  };

  render() {
    const { panelStatus } = this;
    const { showOperateBtn } = this.props;
    const {
      deliveryAddress,
      addOrEdit,
      loading,
      foledMore,
      addressList,
      saveErrorMsg,
      successTipVisible,
      selectedId,
      validationLoading,
      validationModalVisible,
      selectValidationOption
    } = this.state;
    const _list = addressList.map((item, i) => (
      <div
        className={`rounded address-item ${item.selected ? 'selected' : 'border'
          } ${foledMore && !item.selected ? 'hidden' : ''} ${!item.selected && i !== addressList.length - 1
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
          <div
            className="col-10 col-md-9 pl-1 pr-1"
            style={{ wordBreak: 'keep-all' }}
          >
            <span>{[item.consigneeName, item.consigneeNumber].join(', ')}</span>
            {item.isDefaltAddress === 1 ? (
              <span className="icon-default rc-border-colour--brand1 rc-text-colour--brand1">
                <FormattedMessage id="default" />
              </span>
            ) : null}
            <br />
            <span>
              {process.env.REACT_APP_LANG == 'en' ? (
                [
                  matchNamefromDict(this.state.countryList, item.countryId),
                  item.province,
                  item.city,
                  item.address1
                ].join(', ')
              ) : (
                  [
                    matchNamefromDict(this.state.countryList, item.countryId),
                    item.city,
                    item.address1
                  ].join(', ')
                )}
            </span>
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
        {panelStatus.isPrepare
          ? this.titleJSXForPrepare()
          : panelStatus.isEdit
            ? this.titleJSXForEdit()
            : panelStatus.isCompleted
              ? this.titleJSXForCompeleted()
              : null}
      </div>
    );
    const _form = (
      <fieldset
        className={`shipping-address-block rc-fieldset position-relative ${addOrEdit || loading ? '' : 'hidden'
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
            <div>{this.isDeliverAddress ? _defaultCheckBox : null}</div>
            {showOperateBtn ? (
              <>
                <div className="rc-md-up">
                  {addressList.length > 0 && (
                    <>
                      <span
                        className="rc-styled-link"
                        onClick={this.handleClickCancel}
                      >
                        <FormattedMessage id="cancel" />
                      </span>{' '}
                      <FormattedMessage id="or" />{' '}
                    </>
                  )}

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
                  {addressList.length > 0 && (
                    <>
                      <span
                        className="rc-styled-link"
                        onClick={this.handleClickCancel}
                      >
                        <FormattedMessage id="cancel" />
                      </span>{' '}
                      <FormattedMessage id="or" />{' '}
                    </>
                  )}

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
            ) : null}
          </div>
        </div>
      </fieldset>
    );

    return (
      <>
        {this.props.children}
        <div
          className={`mt-1 ${this.props.visible ? '' : 'hidden'
            } payment-addressList`}
        >
          {_title}
          <div
            className={`js-errorAlertProfile-personalInfo rc-margin-bottom--xs ${saveErrorMsg ? '' : 'hidden'
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
            className={`rc-alert rc-alert--success js-alert js-alert-success-profile-info rc-alert--with-close rc-margin-bottom--xs ${successTipVisible ? '' : 'hidden'
              }`}
            role="alert"
          >
            <span className="pl-0">
              <FormattedMessage id="saveSuccessfullly" />
            </span>
          </aside>

          <div
            className={`${!addOrEdit ? 'addr-container' : ''} ${loading ? 'pt-3 pb-3' : ''
              }`}
          >
            {loading ? (
              <Skeleton color="#f5f5f5" count={2} width="100%" />
            ) : this.state.errMsg ? (
              <span className="pt-2 pb-2">{this.state.errMsg}</span>
            ) : (
                  <>
                    {panelStatus.isEdit ? (
                      <>
                        {!addOrEdit ? (
                          addressList.length ? (
                            <>
                              <div className="addr-container-scroll">{_list}</div>
                              {addressList.length > 1 && _foldBtn}
                              {/* 该按钮，只用来确认地址列表 */}
                              {this.isDeliverAddress && (
                                <div className="d-flex justify-content-end mt-3">
                                  <button
                                    className={`rc-btn rc-btn--one`}
                                    onClick={this.clickConfirmAddressPanel}
                                  >
                                    <FormattedMessage id="yes" />
                                  </button>
                                </div>
                              )}
                            </>
                          ) : (
                              <FormattedMessage id="order.noDataTip" />
                            )
                        ) : null}
                        {_form}
                      </>
                    ) : panelStatus.isCompleted ? (
                      <AddressPreview
                        form={
                          addressList.filter(
                            (a) => a.deliveryAddressId === selectedId
                          )[0] || null
                        }
                      />
                    ) : null}
                  </>
                )}
          </div>

          {validationLoading && <Loading positionFixed="true" />}
          {validationModalVisible && <ValidationAddressModal
            address={deliveryAddress}
            updateValidationData={(res) => this.getValidationData(res)}
            selectValidationOption={selectValidationOption}
            handleChooseValidationAddress={(e) =>
              this.chooseValidationAddress(e)
            }
            hanldeClickConfirm={() => this.confirmValidationAddress()}
            close={() => {
              this.setState({
                validationModalVisible: false
              });
            }}
          />}

        </div>
      </>
    );
  }
}

export default AddressList;
