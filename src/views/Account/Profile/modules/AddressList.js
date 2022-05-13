import React from 'react';
import { inject, observer } from 'mobx-react';
import { injectIntl, FormattedMessage } from 'react-intl-phraseapp';
import Loading from '@/components/Loading';
import {
  getDictionary,
  matchNamefromDict,
  getDeviceType,
  getAddressPostalCodeAlertMessage,
  isCanVerifyBlacklistPostCode
} from '@/utils/utils';
import Skeleton from 'react-skeleton-loader';
import 'react-datepicker/dist/react-datepicker.css';
// import classNames from 'classnames';
import {
  saveAddress,
  editAddress,
  getAddressList,
  deleteAddress,
  setDefaltAddress
} from '@/api/address';
// import { queryCityNameById } from '@/api/address';
import AddressEditForm from '../ShippingAddressForm';
import ConfirmTooltip from '@/components/ConfirmTooltip';
import HomeDeliveryOrPickUp from '@/components/HomeDeliveryOrPickUp';
import { myAccountPushEvent, myAccountActionPushEvent } from '@/utils/GA';
import { AddressPreview } from '@/components/Address';
import './AddressList.less';

const isMobile = getDeviceType() !== 'PC' || getDeviceType() === 'Pad';
const sessionItemRoyal = window.__.sessionItemRoyal;

// 地址项
function CardItem(props) {
  const { data } = props;

  return (
    <div
      className={`${
        isMobile ? '' : 'd-flex'
      } rc-bg-colour--brand4 rounded p-4 pl-3 pr-3 h-100 card_item_border justify-content-between
      ${props.data.selected ? 'selected' : ''}
      ${!props.data.validFlag && isCanVerifyBlacklistPostCode ? 'forbid' : ''}
      `}
      onClick={props.handleClickCoverItem}
    >
      {/* <div className="font-weight-normal mt-4 pt-2 md:mt-0 md:pt-0">
        {data.type === 'DELIVERY' ? (
          <FormattedMessage id="deliveryAddress" />
        ) : (
          <FormattedMessage id="billingAddress" />
        )}
      </div> */}
      <div className={`${isMobile ? 'mb-3' : 'col-6'} d-flex flex-wrap`}>
        <AddressPreview
          nameCls="font-weight-normal word-break mb-1"
          data={{
            receiveType: props.receiveType,
            pickupName: data.pickupName,
            workTime: data.workTime,
            name: [data.firstName, data.lastName].join(' '),
            phone: data.consigneeNumber,
            countryName: props.countryName,
            address1: data.address1,
            address2: data.address2,
            city: data.city,
            area: data.area,
            province: data.province,
            county: data.county,
            postCode: data.postCode,
            pickupPriceVisible: false,
            consigneeName: data.consigneeName,
            firstNameKatakana: data.firstNameKatakana,
            lastNameKatakana: data.lastNameKatakana,
            consigneeNumber: data.consigneeNumber
          }}
        />
      </div>
      {props.operateBtnJSX}
    </div>
  );
}

@inject('checkoutStore', 'configStore')
@injectIntl
@observer
class AddressList extends React.Component {
  static defaultProps = {
    hideBillingAddr: false
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedId: '',
      saveAddressNumber: 0, // 保存地址次数
      isHomeDeliveryOpen: this.props.configStore?.isHomeDeliveryOpen,
      isPickupOpen: this.props.configStore?.isPickupOpen,
      addressAddOrEditFlag: '', // pickup标记
      pickupVisible: false,
      editFormVisible: false, // 显示homeDelivery编辑状态
      loading: false,
      listLoading: false,
      allAddressList: [],
      addressList: [],
      currentAddressList: [],
      curAddressId: '',

      foledMore: true, // 控制显示更多

      countryList: [],
      errorMsg: '',
      successMsg: '',

      showDeliveryOrPickUp: 0, // 控制没有地址时的展示，0：都没有，1：home delivery，2：pickup
      pickupFormData: {}, // pickup 表单数据
      defaultCity: '',
      confirmBtnDisabled: true,
      saveBtnLoading: false
    };

    this.handleClickCoverItem = this.handleClickCoverItem.bind(this);
    this.handleEditAddress = this.handleEditAddress.bind(this);
    this.handleClickDeleteBtn = this.handleClickDeleteBtn.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.handleClickAddBtn = this.handleClickAddBtn.bind(this);
    this.toggleSetDefault = this.toggleSetDefault.bind(this);
  }

  componentDidMount() {
    this.getAddressList();
    getDictionary({ type: 'country' }).then((res) => {
      this.setState({
        countryList: res
      });
    });
  }

  // 获取地址列表
  getAddressList = async ({ showLoading = false } = {}) => {
    try {
      const { hideBillingAddr, selectedId } = this.props;
      showLoading && this.setState({ listLoading: true });
      let res = await getAddressList();
      let addList = res.context;
      addList = res.context.filter((item) => {
        return item.type === 'DELIVERY' && item.receiveType !== 'PICK_UP';
      });
      // 不显示billing address
      let allList = res.context.filter((item) => {
        return item.type !== 'BILLING';
      });

      Array.from(allList, (a) => (a.selected = false));

      // 设置默认选中状态 邮编在黑名单则不能选择
      let defaultAddressItem = allList.filter((ele) => {
        return ele.isDefaltAddress === 1 && ele.validFlag;
      });
      if (defaultAddressItem?.length) {
        let tmpId = defaultAddressItem[0].deliveryAddressId;
        Array.from(
          allList,
          (ele) => (ele.selected = ele.deliveryAddressId === tmpId)
        );
      }

      let pkdata = res.context.filter(
        (item) => item?.receiveType === 'PICK_UP'
      );
      if (pkdata?.length) {
        pkdata = pkdata[0];
      }
      this.setState({
        allAddressList: allList,
        pickupFormData: pkdata,
        addressList: addList,
        listLoading: false
      });
    } catch (err) {
      this.showErrorMsg(err.message);
      this.setState({ listLoading: false });
    }
  };
  // 显示更多
  toggleFoldBtn = () => {
    this.setState((curState) => ({ foledMore: !curState.foledMore }));
  };
  // 显示错误信息
  showErrorMsg = (msg) => {
    this.setState({
      errorMsg: msg
    });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({
        errorMsg: ''
      });
    }, 4000);
  };
  // 改变地址模块状态
  changeEditFormVisible = (status) => {
    this.setState({
      editFormVisible: status,
      curAddressId: ''
    });
    // this.props.updateEditOperationPanelName(status ? 'My addresses' : '');
  };
  // 回到顶部
  scrollToTop = () => {
    window.scrollTo({
      top: 60,
      behavior: 'smooth'
    });
  };
  scrollToTitle = () => {
    let pstit = document.getElementById('profile-personal-info');
    if (pstit) {
      pstit.scrollIntoView({ behavior: 'smooth' });
    }
  };
  // 选择地址项并设置边框
  handleClickCoverItem(item) {
    const { allAddressList } = this.state;
    let dliveryId = item.deliveryAddressId;
    Array.from(allAddressList, (a) => (a.selected = false));
    allAddressList.forEach((e) => {
      if (e.deliveryAddressId == dliveryId) {
        e.selected = true;
      }
    });
    this.setState({
      allAddressList: allAddressList
    });
    this.setState({ curAddressId: dliveryId });
  }

  // 编辑地址
  handleEditAddress(item) {
    if (item.receiveType == 'PICK_UP') {
      this.setState({
        defaultCity: item.city,
        pickupVisible: true,
        editFormVisible: false
      });
      this.scrollToTitle();
    } else {
      // console.log('666 >>> item.receiveType: ', item.receiveType);
      this.changeEditFormVisible(true);
      this.setState({
        curAddressId: item.deliveryAddressId
      });
    }
    this.setState({
      addressAddOrEditFlag: 'edit'
    });
  }

  // 取消编辑或者新增地址
  cancelEditForm = () => {
    let pstit = document.getElementById('profile-personal-info');
    if (pstit) {
      pstit.scrollIntoView({ behavior: 'smooth' });
    }
    this.changeEditFormVisible(false);
  };
  // 获取保存地址返回的提示成功信息
  getSuccessMsg = (msg) => {
    this.setState({
      successMsg: msg
    });
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    setTimeout(() => {
      this.setState({
        successMsg: ''
      });
    }, 5000);
  };
  // 删除地址弹框
  deleteConfirmTooltipVisible = (el, status) => {
    let { allAddressList } = this.state;
    el.confirmTooltipVisible = status;
    this.setState({
      allAddressList
    });
  };

  // 删除地址
  handleClickDeleteBtn(data, e) {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.deleteConfirmTooltipVisible(data, true);
  }

  async deleteCard(el, e) {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    let { allAddressList } = this.state;
    el.confirmTooltipVisible = false;
    this.scrollToTop();
    this.setState({
      listLoading: true,
      allAddressList
    });
    await deleteAddress({ id: el.deliveryAddressId })
      .then(() => {
        this.getSuccessMsg(this.props.intl.messages.deleteSuccessFullly);
        this.getAddressList();
        myAccountActionPushEvent('Delete Address');
      })
      .catch((err) => {
        this.showErrorMsg(err.message);
        this.setState({
          listLoading: false
        });
      });
  }

  // 添加地址按钮
  addBtnJSX = (receiveType) => {
    return (
      <div
        className="rounded border h-100 d-flex align-items-center justify-content-center font-weight-bold pt-3 pb-3"
        onClick={this.handleClickAddBtn.bind(this, receiveType)}
        ref={(node) => {
          if (node) {
            node.style.setProperty('border-width', '.1rem', 'important');
            node.style.setProperty('border-style', 'dashed', 'important');
          }
        }}
      >
        <span className="rc-icon rc-plus--xs rc-iconography plus-icon mt-2 mr-1" />
        {receiveType === 'PICK_UP' ? (
          <FormattedMessage id="payment.addPickup" />
        ) : (
          <FormattedMessage id="addANewAddress" />
        )}
      </div>
    );
  };

  // 新增地址按钮
  handleClickAddBtn(receiveType) {
    if (receiveType == 'PICK_UP') {
      this.setState({
        pickupVisible: true,
        editFormVisible: false
      });
    } else {
      myAccountPushEvent('Addresses');
      this.changeEditFormVisible(true);
    }
    this.scrollToTitle();
    this.setState({
      addressAddOrEditFlag: 'add'
    });
  }

  // 设置默认地址
  async toggleSetDefault(item, e) {
    this.setState({ loading: true });
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    if (!item.isDefaltAddress) {
      await setDefaltAddress({ deliveryAddressId: item.deliveryAddressId });
      this.getAddressList({ showLoading: false });
    }
    this.setState({ loading: false });
  }

  // 标题
  addressTypePanel = (str) => {
    let fmsg = '';
    switch (str) {
      case 'homeDelivery':
        fmsg = 'payment.homeDelivery';
        break;
      case 'addANewAddress':
        fmsg = 'addANewAddress';
        break;
      case 'edit':
        fmsg = 'edit';
        break;
      case 'pickup':
        fmsg = 'payment.pickupDelivery';
        break;
      case 'addPickup':
        fmsg = 'payment.addPickup';
        break;
      case 'changePickup':
        fmsg = 'payment.changePickup';
        break;
    }
    return (
      <div
        id="address_list_title"
        className={`col-12 p-2 text-left address_title_pannel ${
          str == 'pickup' ? 'mt-3' : ''
        }`}
      >
        {<FormattedMessage id={fmsg} />}
      </div>
    );
  };
  // 显示更多地址
  showMoreAddressBtn = () => {
    const { foledMore } = this.state;
    return (
      <div
        className="text-center pt-2 pb-2 ui-cursor-pointer show_more_address"
        onClick={this.toggleFoldBtn}
      >
        <span className="font-weight-bold">
          {foledMore ? (
            <>
              <span class="d-inline-block rc-icon rc-down--xs rc-iconography mr-1"></span>
              <FormattedMessage id="moreAddress" />
            </>
          ) : (
            <>
              <span class="d-inline-block rc-icon rc-up--xs rc-iconography mr-1"></span>
              <FormattedMessage id="unfoldAddress" />
            </>
          )}
        </span>
      </div>
    );
  };
  // 地址项详细
  addressItemDetail = (item, i) => {
    const { countryList } = this.state;

    return (
      <CardItem
        {...this.props}
        data={item}
        receiveType={item.receiveType}
        operateBtnJSX={
          <div
            className={`${
              isMobile ? '' : 'col-6'
            } d-flex flex-column justify-content-between`}
          >
            {/* 设置默认地址按钮 */}
            <div className={`d-flex justify-content-end mb-3`}>
              <div className="align-items-center">
                <div className="rc-input rc-input--inline mr-0">
                  <input
                    disabled={!item.validFlag && item.receiveType != 'PICK_UP'} // 邮编黑名单禁止选择
                    type="radio"
                    id={item.deliveryAddressId}
                    className="rc-input__radio"
                    checked={
                      item.receiveType != 'PICK_UP'
                        ? item.isDefaltAddress === 1 && item.validFlag
                        : item.isDefaltAddress === 1
                    }
                    name="setDefaultAddress"
                    value={item.deliveryAddressId}
                    onChange={this.toggleSetDefault.bind(this, item)}
                  />
                  <label
                    className="rc-input__label--inline"
                    htmlFor={item.deliveryAddressId}
                  >
                    <FormattedMessage id="setMyaccountDefaultAddress" />
                  </label>
                </div>
              </div>
            </div>

            {/* 删除和编辑按钮 */}
            <div className="d-flex justify-content-end mb-0">
              <div
                className="d-flex align-items-center"
                style={{
                  flexFlow: 'wrap',
                  justifyContent:
                    isMobile && item.receiveType === 'PICK_UP'
                      ? 'center'
                      : 'flex-end'
                }}
              >
                {isMobile && item.receiveType === 'PICK_UP' ? (
                  <>
                    {/* 编辑按钮 */}
                    <button
                      className={`rc-btn rc-btn--sm rc-btn--two font-weight-bold ${
                        isMobile ? 'mb-3' : ''
                      }`}
                      onClick={this.handleEditAddress.bind(this, item)}
                      style={{ fontSize: '12px' }}
                    >
                      {item.receiveType === 'PICK_UP' ? (
                        <FormattedMessage id="payment.changePickup" />
                      ) : (
                        <FormattedMessage id="edit" />
                      )}
                    </button>

                    {/* 删除按钮 */}
                    <span
                      className={`d-flex position-relative p-2 ui-cursor-pointer-pure mr-2 delete_card_box`}
                    >
                      <span
                        className="rc-styled-link"
                        onClick={this.handleClickDeleteBtn.bind(this, item)}
                        // style={isPad? {position: 'absolute',top: '1.25rem',right: '1.5rem'}: {}}
                      >
                        <FormattedMessage id="delete" />
                      </span>
                      {/* 删除询问弹框 */}
                      <ConfirmTooltip
                        containerStyle={{ transform: 'translate(-89%, 105%)' }}
                        arrowStyle={{ left: '89%' }}
                        display={item.confirmTooltipVisible}
                        confirm={this.deleteCard.bind(this, item)}
                        updateChildDisplay={(status) =>
                          this.deleteConfirmTooltipVisible(item, status)
                        }
                        content={<FormattedMessage id="confirmDeleteAddress" />}
                      />
                    </span>
                  </>
                ) : (
                  <>
                    {/* 删除按钮 */}
                    <span
                      className={`d-flex position-relative p-2 ui-cursor-pointer-pure mr-2 delete_card_box mb-3}`}
                    >
                      <span
                        className="rc-styled-link"
                        onClick={this.handleClickDeleteBtn.bind(this, item)}
                        // style={isPad? {position: 'absolute',top: '1.25rem',right: '1.5rem'}: {}}
                      >
                        <FormattedMessage id="delete" />
                      </span>
                      {/* 删除询问弹框 */}
                      <ConfirmTooltip
                        containerStyle={{
                          transform: isMobile
                            ? 'translate(-38%, 105%)'
                            : 'translate(-89%, 108%)'
                        }}
                        arrowStyle={{ left: isMobile ? '30%' : '89%' }}
                        display={item.confirmTooltipVisible}
                        confirm={this.deleteCard.bind(this, item)}
                        updateChildDisplay={(status) =>
                          this.deleteConfirmTooltipVisible(item, status)
                        }
                        content={<FormattedMessage id="confirmDeleteAddress" />}
                      />
                    </span>

                    {/* 编辑按钮 */}
                    <button
                      className={`rc-btn rc-btn--sm rc-btn--two font-weight-bold`}
                      onClick={this.handleEditAddress.bind(this, item)}
                      style={{ fontSize: '12px' }}
                    >
                      {item.receiveType === 'PICK_UP' ? (
                        <FormattedMessage id="payment.changePickup" />
                      ) : (
                        <FormattedMessage id="edit" />
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>

            <div>
              {!item?.validFlag && isCanVerifyBlacklistPostCode ? (
                <p className="address-item-forbid">{item.alert}</p>
              ) : null}
            </div>
          </div>
        }
        handleClickCoverItem={
          isCanVerifyBlacklistPostCode
            ? !item.validFlag
              ? null
              : this.handleClickCoverItem.bind(this, item)
            : this.handleClickCoverItem.bind(this, item)
        }
        countryName={matchNamefromDict(countryList, item.countryId)}
      />
    );
  };

  // 增加编辑地址次数
  addSaveAddressNumber = () => {
    const { saveAddressNumber } = this.state;
    let san = saveAddressNumber;
    this.setState({
      saveAddressNumber: san++
    });
  };

  // ************ pick up 相关
  // 更新pickup数据
  updatePickupData = (data) => {
    this.setState({
      pickupFormData: data
    });
  };
  // 修改按钮状态
  updateConfirmBtnDisabled = (flag) => {
    this.setState({
      confirmBtnDisabled: flag
    });
  };
  // 取消新增或者编辑pickup
  handleCancelEditOrAddPickup = () => {
    // 清空城市
    this.setState(
      {
        addressAddOrEditFlag: '',
        defaultCity: '',
        pickupVisible: false
      },
      () => {
        let sobj = sessionItemRoyal.get('rc-homeDeliveryAndPickup') || null;
        sobj = JSON.parse(sobj);
        if (sobj?.cityData) {
          sobj.cityData = null;
          sessionItemRoyal.set(
            'rc-homeDeliveryAndPickup',
            JSON.stringify(sobj)
          );
        }
        this.scrollToTop();
      }
    );
  };
  // 更新 showDeliveryOrPickUp
  updateDeliveryOrPickup = (num) => {
    this.setState({
      showDeliveryOrPickUp: num
    });
  };
  // 确认 pickup
  clickConfirmPickup = async () => {
    const { countryList, allAddressList, pickupFormData } = this.state;
    this.setState({
      saveBtnLoading: true,
      loading: true
    });
    try {
      let receiveType = pickupFormData.receiveType;
      // 查询地址列表，筛选 pickup 地址
      let pkaddr = pickupFormData?.pickup?.address || null;
      let deliveryAdd = Object.assign(
        {},
        {
          firstName: pickupFormData.firstName,
          lastName: pickupFormData.lastName,
          consigneeNumber: pickupFormData.phoneNumber,
          consigneeName:
            pickupFormData.firstName + ' ' + pickupFormData.lastName,
          address1: pickupFormData.address1,
          deliveryAddress: pickupFormData.address1,
          city: pickupFormData.city,
          comment: pickupFormData.comment,
          pickupPrice: pickupFormData?.pickupPrice,
          pickupDescription: pickupFormData?.pickupDescription,
          pickupCode: pickupFormData?.pickupCode, // 快递公司code
          pickupName: pickupFormData?.pickupName, // 快递公司
          paymentMethods: pickupFormData?.paymentMethods, // 支付方式
          workTime: pickupFormData.workTime, // 快递公司上班时间
          receiveType: pickupFormData.receiveType, // HOME_DELIVERY , PICK_UP
          deliverWay: receiveType == 'HOME_DELIVERY' ? 1 : 2, // 1: HOMEDELIVERY , 2: PICKUP
          type: 'DELIVERY',
          country: countryList[0].value,
          countryId: countryList[0].id,
          // isDefaltAddress: pickupFormData?.isDefaltAddress,
          isDefaltAddress: pickupFormData.isDefaltAddress ? 1 : 0,
          minDeliveryTime: pickupFormData.minDeliveryTime,
          maxDeliveryTime: pickupFormData.maxDeliveryTime,
          province: pkaddr?.region || pickupFormData.province,
          provinceIdStr: pkaddr?.regionFias || pickupFormData.provinceIdStr,
          provinceCode: pickupFormData?.provinceCode,
          cityIdStr: pkaddr?.cityFias || pickupFormData.cityIdStr,
          areaIdStr: pkaddr?.areaFias || pickupFormData.areaIdStr,
          settlementIdStr:
            pkaddr?.settlementFias || pickupFormData.settlementIdStr,
          postalCode: pkaddr?.zip || pickupFormData.postCode
        }
      );

      let pickupAddress = allAddressList.filter(
        (e) => e.receiveType == 'PICK_UP'
      );
      // 判断是否存在有 pickup 地址
      const tmpPromise = pickupAddress.length ? editAddress : saveAddress;
      if (pickupAddress.length) {
        deliveryAdd.deliveryAddressId = pickupAddress[0].deliveryAddressId;
        deliveryAdd.customerId = pickupAddress[0].customerId;
      }

      let res = await tmpPromise(deliveryAdd);

      if (res.context?.deliveryAddressId) {
        this.scrollToTitle();
        this.getAddressList();
        this.handleCancelEditOrAddPickup();
      }
    } catch (err) {
      this.scrollToTitle();
      this.showErrorMsg(err.message);
    } finally {
      this.setState({
        saveBtnLoading: false,
        loading: false
      });
    }
  };

  render() {
    const {
      foledMore,
      addressAddOrEditFlag,
      pickupVisible,
      editFormVisible,
      addressList,
      allAddressList,
      listLoading,
      loading,
      errorMsg,
      showDeliveryOrPickUp,
      defaultCity,
      confirmBtnDisabled,
      saveBtnLoading,
      pickupFormData,
      isPickupOpen
    } = this.state;

    return (
      <div>
        {listLoading ? (
          <Skeleton color="#f5f5f5" width="100%" height="10%" count={4} />
        ) : (
          <div className="border">
            {loading ? <Loading positionAbsolute="true" /> : null}
            <div className="personalInfo" id="profile-personal-info">
              {/* 地址模块标题 */}
              <div className="profileSubFormTitle pl-3 pr-3 pt-3">
                <h5 className="mb-0 text-xl">
                  <img
                    className="account-info-icon align-middle mr-3 ml-1 inline-block"
                    src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/icons/addresses.svg`}
                    alt="icons addresses"
                  />
                  <FormattedMessage id="account.myAddresses" />
                </h5>
              </div>

              {/* 分割线 */}
              <hr className="account-info-hr-border-color my-4" />

              {/* 地址部分 */}
              <div className="pb-3 pl-3 pr-3">
                {/* 错误提示信息 */}
                <div
                  className={`js-errorAlertProfile-personalInfo rc-margin-bottom--xs ${
                    errorMsg ? '' : 'hidden'
                  }`}
                >
                  <aside
                    className="rc-alert rc-alert--error rc-alert--with-close errorAccount"
                    role="alert"
                  >
                    <span className="pl-0">{errorMsg}</span>
                    <button
                      className="rc-btn rc-alert__close rc-icon rc-close-error--xs"
                      onClick={() => {
                        this.setState({ errorMsg: '' });
                      }}
                      aria-label="Close"
                    >
                      <span className="rc-screen-reader-text">
                        <FormattedMessage id="close" />
                      </span>
                    </button>
                  </aside>
                </div>

                {/* 成功提示信息 */}
                <aside
                  className={`rc-alert rc-alert--success js-alert js-alert-success-profile-info rc-alert--with-close rc-margin-bottom--xs ${
                    this.state.successMsg ? '' : 'hidden'
                  }`}
                  role="alert"
                >
                  <p className="success-message-text rc-padding-left--sm--desktop rc-padding-left--lg--mobile rc-margin--none">
                    {this.state.successMsg}
                  </p>
                </aside>

                {!editFormVisible && !pickupVisible ? (
                  <>
                    {/* homeDelivery 地址列表 */}
                    {this.addressTypePanel('homeDelivery')}
                    <div className="address_list_panel">
                      <div className="row ml-0 mr-0">
                        {/* 地址列表 */}
                        {allAddressList
                          .filter((e) => e.receiveType != 'PICK_UP')
                          .map((item, i) => (
                            <div
                              className={`col-12 pt-2 pb-2 pl-2 pr-2 ${
                                foledMore && i > 1 ? 'address_item_none' : ''
                              }`}
                              key={item.deliveryAddressId}
                            >
                              {this.addressItemDetail(item, i)}
                            </div>
                          ))}

                        {/* 新增地址按钮 */}
                        <div className="col-12 p-2 rounded text-center p-2 ui-cursor-pointer">
                          {this.addBtnJSX('')}
                        </div>

                        {/* 更多地址 */}
                        {addressList.length > 2 && this.showMoreAddressBtn()}
                      </div>
                    </div>

                    {isPickupOpen ? (
                      <>
                        {/* pickup 地址 */}
                        {this.addressTypePanel('pickup')}
                        <div className="address_list_panel pickup_address_pannel">
                          <div className="row ml-0 mr-0">
                            {/* 地址列表 */}
                            {allAddressList
                              .filter((e) => e.receiveType == 'PICK_UP')
                              .map((item, i) =>
                                item ? (
                                  <div
                                    className={`col-12 pt-2 pb-2 pl-2 pr-2`}
                                    key={item.deliveryAddressId}
                                  >
                                    {this.addressItemDetail(item, i)}
                                  </div>
                                ) : null
                              )}
                            {!allAddressList.filter(
                              (e) => e.receiveType == 'PICK_UP'
                            ).length && (
                              <div className="col-12 p-2 rounded text-center p-2 ui-cursor-pointer">
                                {this.addBtnJSX('PICK_UP')}
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    ) : null}
                  </>
                ) : null}

                {/* 编辑homeDelivery地址 addANewAddress  */}
                {editFormVisible && (
                  <>
                    {addressAddOrEditFlag == 'add'
                      ? this.addressTypePanel('addANewAddress')
                      : null}

                    {addressAddOrEditFlag == 'edit'
                      ? this.addressTypePanel('edit')
                      : null}

                    <AddressEditForm
                      hideBillingAddr={this.props.hideBillingAddr}
                      addressId={this.state.curAddressId}
                      cancelEditForm={this.cancelEditForm}
                      refreshList={this.getAddressList}
                      upateSuccessMsg={this.getSuccessMsg}
                    />
                  </>
                )}

                {pickupVisible && (
                  <>
                    {addressAddOrEditFlag == 'add'
                      ? this.addressTypePanel('addPickup')
                      : null}

                    {addressAddOrEditFlag == 'edit'
                      ? this.addressTypePanel('changePickup')
                      : null}

                    <HomeDeliveryOrPickUp
                      key={defaultCity}
                      isLogin={true}
                      defaultCity={defaultCity}
                      pageType="onlyPickup"
                      updateConfirmBtnDisabled={this.updateConfirmBtnDisabled}
                      updateData={this.updatePickupData}
                      allAddressList={allAddressList}
                      updateDeliveryOrPickup={this.updateDeliveryOrPickup}
                      deliveryOrPickUp={showDeliveryOrPickUp}
                      intlMessages={this.props.intl.messages}
                    />

                    {/* 分割线 */}
                    <hr className="account-info-hr-border-color my-4" />

                    {/* 取消和保存按钮 */}
                    <div className="text-right">
                      <span
                        className="rc-styled-link mr-4 cancel_pickup_edit"
                        onClick={this.handleCancelEditOrAddPickup}
                      >
                        <FormattedMessage id="cancel" />
                      </span>
                      <button
                        className={`rc-btn rc-btn--one editAddress ${
                          saveBtnLoading ? 'ui-btn-loading' : ''
                        }`}
                        type="submit"
                        disabled={confirmBtnDisabled}
                        onClick={this.clickConfirmPickup}
                      >
                        <FormattedMessage id="save" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default AddressList;
