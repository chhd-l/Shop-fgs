import React from 'react';
import Skeleton from 'react-skeleton-loader';
import { injectIntl, FormattedMessage } from 'react-intl-phraseapp';
import { inject, observer } from 'mobx-react';
import find from 'lodash/find';
import {
  getAddressList,
  saveAddress,
  editAddress,
  setDefaltAddress
} from '@/api/address';
import {
  getDictionary,
  validData,
  matchNamefromDict,
  getDeviceType,
  isCanVerifyBlacklistPostCode
} from '@/utils/utils';
import { AddressForm } from '@/components/Address';
import Loading from '@/components/Loading';
import ValidationAddressModal from '@/components/validationAddressModal';
import HomeDeliveryOrPickUp from '@/components/HomeDeliveryOrPickUp';
import { AddressPreview } from '@/components/Address';
import './index.less';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;
const isMobile = getDeviceType() !== 'PC' || getDeviceType() === 'Pad';

function CardItem(props) {
  const { data } = props;

  // PICK_UP 不需要邮编校验
  if (props.receiveType == 'PICK_UP') {
    return (
      <div
        className={`${
          isMobile ? 'p-3' : 'd-flex  pt-4 pb-4 pl-2 pr-2'
        } rc-bg-colour--brand4 rounded ui-cursor-pointer-pure h-100 address-item card_item_border ${
          data.selected ? 'selected' : ''
        }`}
        style={{ wordBreak: 'break-word' }}
        onClick={props.handleClick}
      >
        <div className={`${isMobile ? 'mb-3' : 'col-6'} d-flex flex-wrap`}>
          {props.receiveType == 'PICK_UP' ? (
            <>
              {/* 自提点 */}
              <div className="rc-full-width font-weight-bold mb-1 mp_mb_pickupName">
                {data.pickupName}
              </div>
              {/* 地址 */}
              <div className="rc-full-width mb-0 mp_mb_address1">
                {data.address1}
              </div>
              {/* 营业时间 */}
              <div className="rc-full-width mb-0 mp_mb_workTime">
                {data.workTime}
              </div>
            </>
          ) : (
            <>
              <AddressPreview
                nameCls="font-weight-bold word-break mb-1"
                data={{
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
                  consigneeName: data?.consigneeName,
                  firstNameKatakana: data?.firstNameKatakana,
                  lastNameKatakana: data?.lastNameKatakana,
                  consigneeNumber: data?.consigneeNumber
                }}
              />
            </>
          )}
        </div>
        {props.operateBtnJSX}
      </div>
    );
  } else {
    return (
      <div
        className={`${
          isMobile ? 'p-3' : 'd-flex  pt-4 pb-4 pl-2 pr-2'
        } rc-bg-colour--brand4 rounded ui-cursor-pointer-pure h-100 address-item card_item_border ${
          data.selected ? 'selected' : ''
        } ${!data?.validFlag && isCanVerifyBlacklistPostCode ? 'forbid' : ''}`}
        style={{ wordBreak: 'break-word' }}
        onClick={props.handleClick}
      >
        <div className={`${isMobile ? 'mb-3' : 'col-6'} d-flex flex-wrap`}>
          {props.receiveType == 'PICK_UP' ? (
            <>
              {/* 自提点 */}
              <div className="rc-full-width font-weight-bold mb-1 mp_mb_pickupName">
                {data.pickupName}
              </div>
              {/* 地址 */}
              <div className="rc-full-width mb-0 mp_mb_address1">
                {data.address1}
              </div>
              {/* 营业时间 */}
              <div className="rc-full-width mb-0 mp_mb_workTime">
                {data.workTime}
              </div>
            </>
          ) : (
            <>
              <AddressPreview
                nameCls="font-weight-bold word-break mb-1"
                data={{
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
                  consigneeName: data?.consigneeName,
                  firstNameKatakana: data?.firstNameKatakana,
                  lastNameKatakana: data?.lastNameKatakana,
                  consigneeNumber: data?.consigneeNumber
                }}
              />

              <div className="rc-full-width mb-0 ac_mb_cpp">
                {!data?.validFlag && isCanVerifyBlacklistPostCode ? (
                  <div className="address-item-forbid">{data.alert}</div>
                ) : null}
              </div>
            </>
          )}
        </div>
        {props.operateBtnJSX}
      </div>
    );
  }
}
@inject('checkoutStore', 'configStore')
@observer
/**
 * address list(delivery/billing) - member
 */
class AddressList extends React.Component {
  static defaultProps = {
    visible: true,
    customerAccount: '',
    deliveryAddressId: '',
    tradeItems: null,
    type: 'delivery'
  };
  constructor(props) {
    super(props);
    this.state = {
      isHomeDeliveryOpen: this.props.configStore?.isHomeDeliveryOpen,
      addOrEditPickup: false,
      isPickupOpen: this.props.configStore?.isPickupOpen,
      pickupFormData: {}, // pickup 表单数据
      defaultCity: '',
      addressAddOrEditFlag: '', // pickup标记
      editFormVisible: false, // 显示homeDelivery编辑状态
      confirmBtnDisabled: true,
      saveBtnLoading: false,
      showDeliveryOrPickUp: 0, // 控制没有地址时的展示，0：都没有，1：home delivery，2：pickup
      deliveryAddress: {
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        rfc: '',
        countryId: window.__.env.REACT_APP_DEFAULT_COUNTRYID || '',
        country: '',
        city: '',
        cityId: '',
        provinceNo: '',
        provinceId: '',
        province: '',
        postCode: '',
        phoneNumber: '',
        deliveryDate: '',
        timeSlot: '',
        isDefalt: false
      },
      wrongAddressMsg: null,
      btnSubSaveFlag: false,
      formAddressValid: false,
      errMsg: '',
      loading: true,
      isValid: false,
      saveLoading: false,
      deleteLoading: false,
      addOrEdit: false,
      addressList: [],
      countryList: [],
      foledMore: true, // 控制显示更多
      curAddressId: '',
      successTipVisible: false,
      successTip: '',
      saveErrorMsg: '',
      selectedId: '',
      isBillSame: true,
      type: '',
      validationLoading: false, // 地址校验loading
      validationModalVisible: false, // 地址校验查询开关
      selectValidationOption: 'suggestedAddress',
      itemIdx: '',
      shippingFeeAddress: {
        provinceIdStr: '',
        areaIdStr: '',
        cityIdStr: '',
        settlementIdStr: '',
        postalCode: '',
        address1: ''
      } // 俄罗斯计算运费DuData对象，purchases接口用
    };
    this.timer = null;
    this.confirmValidationAddress = this.confirmValidationAddress.bind(this);
    this.addOrEditPickupAddress = this.addOrEditPickupAddress.bind(this);
    this.addOrEditAddress = this.addOrEditAddress.bind(this);
    this.setSubscriptionAddress = this.setSubscriptionAddress.bind(this);
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
    this.setState({
      wrongAddressMsg: JSON.parse(localItemRoyal.get('rc-wrongAddressMsg'))
    });
    // 查询地址列表
    await this.queryAddressList();
  }
  async queryAddressList() {
    const { deliveryAddressId, billingAddressId, type } = this.props;

    const { selectedId } = this.state;
    this.setState({ loading: true });
    try {
      let res = await getAddressList();
      let addressList = res.context.filter((ele) => {
        return (
          ele.type === type.toUpperCase()
          // ele.type === 'DELIVERY'
        );
      });

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
        this.getSubAddressErrMsg(defaultAddressItem);
      }

      // 设置选中的地址
      Array.from(addressList, (a) => (a.selected = false));
      let addressIdStr = '';
      if (type === 'billing') {
        addressIdStr = billingAddressId;
      }
      if (type === 'delivery') {
        addressIdStr = deliveryAddressId;
      }
      addressList.forEach((e) => {
        if (e.deliveryAddressId == addressIdStr) {
          e.selected = true;
        }
      });

      let pickupAddress = find(addressList, (e) => {
        return e.receiveType == 'PICK_UP';
      });
      this.setState({
        defaultCity: pickupAddress ? pickupAddress.city : '',
        addressList: addressList,
        addOrEdit: !addressList.length,
        selectedId: addressIdStr
      });
    } catch (err) {
      this.setState({
        errMsg: err.message.toString()
      });
    } finally {
      this.setState({ loading: false });
    }
  }
  // 选择地址项并设置边框
  async selectAddress(item) {
    let { addressList } = this.state;
    Array.from(addressList, (a) => (a.selected = false));
    let dliveryId = item.deliveryAddressId;
    // 设置选中的地址
    addressList.forEach((e) => {
      if (e.deliveryAddressId == dliveryId) {
        e.selected = true;
      }
    });
    // 判断地址是否完整
    let subAddressErrMsg = this.getSubAddressErrMsg(item);
    if (!subAddressErrMsg) {
      this.setState({
        addressList: addressList,
        selectedId: dliveryId,
        curAddressId: dliveryId
      });
    }
  }
  // 判断地址完整性
  getSubAddressErrMsg = (data) => {
    const {
      configStore: { localAddressForm }
    } = this.props;
    let { wrongAddressMsg } = this.state;
    let dfarr = localAddressForm.settings;
    dfarr = dfarr.filter(
      (item) => item.enableFlag == 1 && item.requiredFlag == 1
    );
    let errMsgArr = [];
    dfarr.forEach((v, i) => {
      let akey = v.fieldKey;
      // state 对应数据库字段 province
      akey = v.fieldKey == 'state' ? 'province' : v.fieldKey;
      // region 对应数据库字段 area
      akey = v.fieldKey == 'region' ? 'area' : v.fieldKey;
      // phoneNumber 对应数据库字段 consigneeNumber
      akey = v.fieldKey == 'phoneNumber' ? 'consigneeNumber' : v.fieldKey;

      let fky = wrongAddressMsg[akey];
      // 判断city和cityId 是否均为空
      if (v.fieldKey == 'city') {
        akey = data.city || data.cityId ? '' : akey;
      }
      // 判断country和countryId 是否均为空
      if (v.fieldKey == 'country') {
        akey = data.country || data.countryId ? '' : akey;
      }
      if (akey && !data[akey]) errMsgArr.push(fky);
    });
    errMsgArr = errMsgArr.join(', ');
    // 如果地址字段有缺失，提示错误信息
    if (errMsgArr.length) {
      this.showErrorMsg(wrongAddressMsg['title'] + errMsgArr);
      this.setState({
        btnSubSaveFlag: true
      });
      return true;
    } else {
      clearTimeout(this.timer);
      this.setState({
        saveErrorMsg: '',
        btnSubSaveFlag: false
      });
    }
    return false;
  };
  // 处理DuData地址信息，拼装errMsg
  getDuDataAddressErrMsg = (data) => {
    const { wrongAddressMsg } = this.state;
    let errArr = [];
    let streets = wrongAddressMsg['streets'],
      postCode = wrongAddressMsg['postCode'],
      house = wrongAddressMsg['house'],
      city = wrongAddressMsg['city'],
      province = wrongAddressMsg['province'],
      settlement = wrongAddressMsg['settlement'];
    !data.street && errArr.push(streets);
    !data.postCode && errArr.push(postCode);
    !data.house && errArr.push(house);
    !data.city && errArr.push(city);
    !data.province && errArr.push(province);
    !data.settlement && errArr.push(settlement);
    return errArr.join(',');
  };
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
      countryId: window.__.env.REACT_APP_DEFAULT_COUNTRYID || '',
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
    // console.log('666 >>> idx: ', idx);
    // 编辑地址
    if (idx > -1) {
      let homeDeliveryAddress = addressList.filter(
        (e) => e.receiveType !== 'PICK_UP'
      );
      const tmp = homeDeliveryAddress[idx];

      tmpDeliveryAddress = {
        firstName: tmp.firstName,
        lastName: tmp.lastName,
        address1: tmp.address1,
        address2: tmp.address2,
        areaId: tmp.areaId,
        area: tmp.area,
        rfc: tmp.rfc,
        countryId: tmp.countryId,
        country: tmp?.country,
        county: tmp?.county,
        cityId: tmp.cityId,
        city: tmp.city,
        cityName: tmp.cityName,
        province: tmp.province || null,
        provinceId: tmp.provinceId || null,
        postCode: tmp.postCode,
        phoneNumber: tmp.consigneeNumber,
        email: tmp.email,
        deliveryDate: tmp.deliveryDate || null,
        deliveryDateId: tmp.deliveryDate || null,
        timeSlot: tmp.timeSlot || null,
        timeSlotId: tmp.timeSlot || null,
        isDefalt: tmp.isDefaltAddress === 1 ? true : false,
        firstNameKatakana: tmp.firstNameKatakana, //日本
        lastNameKatakana: tmp.lastNameKatakana
      };

      if (isCanVerifyBlacklistPostCode) {
        tmpDeliveryAddress.alert = tmp?.alert || '';
        tmpDeliveryAddress.validFlag = tmp?.validFlag;
      }
      this.setState(
        {
          deliveryAddress: Object.assign(
            {},
            deliveryAddress,
            tmpDeliveryAddress
          ),
          addressAddOrEditFlag: 'edit'
        },
        () => {
          this.setState({
            addOrEdit: true
          });
        }
      );
    } else {
      // 新增时删除属性
      if (isCanVerifyBlacklistPostCode) {
        delete deliveryAddress.validFlag;
        delete deliveryAddress.alert;
      }
      this.setState({
        deliveryAddress: {
          firstName: '',
          lastName: '',
          address1: '',
          address2: '',
          rfc: '',
          countryId: window.__.env.REACT_APP_DEFAULT_COUNTRYID || '',
          country: '',
          city: '',
          cityId: 0,
          postCode: '',
          phoneNumber: '',
          deliveryDate: null,
          deliveryDateId: null,
          timeSlot: null,
          timeSlotId: null,
          isDefalt: false
        },
        addressAddOrEditFlag: 'add'
      });
    }

    this.scrollToPayInfoTitle();
  }
  // 是否设为默认地址
  isDefalt() {
    let data = this.state.deliveryAddress;
    data.isDefalt = !data.isDefalt;
    this.setState({
      deliveryAddress: data
    });
  }
  // 表单验证
  validFormData = async () => {
    const { intl } = this.props;
    const { deliveryAddress } = this.state;
    try {
      if (
        !deliveryAddress?.formRule ||
        (deliveryAddress?.formRule).length <= 0
      ) {
        return;
      }
      await validData({
        rule: deliveryAddress.formRule,
        data: deliveryAddress,
        intl
      }); // 数据验证
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
  // 计算税额、运费、运费折扣
  calculateFreight = async (data) => {
    const { shippingFeeAddress } = this.state;
    let param = {};

    if (data?.DuData) {
      let dudata = data?.DuData;
      shippingFeeAddress.provinceIdStr = dudata?.provinceId;
      shippingFeeAddress.areaIdStr = dudata?.areaId;
      shippingFeeAddress.cityIdStr = dudata?.cityId;
      shippingFeeAddress.settlementIdStr = dudata?.settlementId;
      shippingFeeAddress.postalCode = dudata?.postCode;
      shippingFeeAddress.address1 = data?.address1;
    } else {
      shippingFeeAddress.provinceIdStr = data.provinceIdStr;
      shippingFeeAddress.areaIdStr = data.areaIdStr;
      shippingFeeAddress.cityIdStr = data.cityIdStr;
      shippingFeeAddress.settlementIdStr = data.settlementIdStr;
      shippingFeeAddress.postalCode = data.postalCode;
      shippingFeeAddress.address1 = data.address1;
    }
    this.setState({
      shippingFeeAddress
    });
    // 把查询运费折扣相关参数存到本地
    localItemRoyal.set('rc-calculation-param', data);

    let stateNo = data?.stateNo || '';
    param = {
      promotionCode: '',
      purchaseFlag: false, // 购物车: true，checkout: false
      subscriptionFlag: true,
      taxFeeData: {
        country: window.__.env.REACT_APP_GA_COUNTRY, // 国家简写 / data.countryName
        region: stateNo, // 省份简写
        city: data?.city,
        street: data?.address1,
        postalCode: data?.postCode,
        customerAccount: this.props.customerAccount
      },
      shippingFeeAddress: shippingFeeAddress
    };
    if (this.props.tradeItems) {
      let tradeItems = this.props.tradeItems;
      tradeItems = tradeItems[0].tradeItems;
      let gids = [];
      tradeItems.forEach((item) => {
        // console.log(item.skuId);
        gids.push(item.skuId);
      });
      param.goodsInfoIds = gids;
    }
    try {
      // 获取税额
      await this.props.checkoutStore.updateLoginCart(
        Object.assign(param, { intl: this.props.intl })
      );
    } catch (err) {
      console.warn(err);
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
  // 返回当前模块的标题
  scrollToPayInfoTitle = () => {
    let pstit = document.getElementById('sub-user-paymentinfo-title');
    if (pstit) {
      pstit.scrollIntoView({ behavior: 'smooth' });
    }
  };
  // 返回上一级
  handleClickCancel() {
    const { addOrEdit, addressList } = this.state;
    if (addOrEdit) {
      this.setState({
        saveErrorMsg: ''
      });
      if (addressList.length) {
        this.handToTitleOrCancel('toTitle');
      } else {
        this.handToTitleOrCancel('cancel');
      }
    } else {
      if (addressList.length) {
        this.handToTitleOrCancel('cancel');
      } else {
        this.handToTitleOrCancel('toTitle');
      }
    }
  }
  handToTitleOrCancel = (str) => {
    const { addressList } = this.state;
    if (addressList.length) {
      this.setState({
        addOrEdit: false
      });
    } else {
      this.setState({
        addOrEdit: true
      });
    }
    str == 'cancel' ? this.props.cancel() : this.scrollToPayInfoTitle();
  };
  // 保存数据
  handleSave(str) {
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
  // 确认选择地址
  confirmValidationAddress() {
    const { deliveryAddress, selectValidationOption, validationAddress } =
      this.state;
    let oldDeliveryAddress = JSON.parse(JSON.stringify(deliveryAddress));
    let theform = [];
    if (selectValidationOption == 'suggestedAddress') {
      deliveryAddress.address1 = validationAddress.address1;
      deliveryAddress.city = validationAddress.city;
      deliveryAddress.postCode = validationAddress.postalCode;

      deliveryAddress.province = validationAddress.provinceCode;
      deliveryAddress.provinceId = validationAddress.provinceId
        ? validationAddress.provinceId
        : deliveryAddress.provinceId;

      // 地址校验返回参数
      deliveryAddress.validationResult = validationAddress.validationResult;
      theform = Object.assign({}, deliveryAddress);
    } else {
      theform = JSON.parse(JSON.stringify(oldDeliveryAddress));
    }
    this.setState(
      {
        deliveryAddress: Object.assign({}, theform)
      },
      () => {
        this.showNextPanel();
      }
    );
  }
  // 下一步
  async showNextPanel() {
    try {
      const { deliveryAddress, addressList } = this.state;
      const originData = addressList[this.currentOperateIdx];

      this.setState({
        validationModalVisible: false,
        validationLoading: false
      });
      let params = Object.assign({}, deliveryAddress, {
        region: deliveryAddress.province, // DuData相关参数
        consigneeName:
          deliveryAddress.firstName + ' ' + deliveryAddress.lastName,
        consigneeNumber: deliveryAddress.phoneNumber,
        customerId: originData ? originData.customerId : '',
        deliveryAddress:
          deliveryAddress.address1 + ' ' + deliveryAddress.address2,
        deliveryAddressId: originData ? originData.deliveryAddressId : '',
        isDefaltAddress: deliveryAddress.isDefalt ? 1 : 0,
        province: deliveryAddress.province,
        provinceId: deliveryAddress.provinceId,
        isValidated: deliveryAddress.validationResult,
        type: this.props.type.toUpperCase()
      });

      if (window.__.env.REACT_APP_COUNTRY === 'jp') {
        params.area = deliveryAddress.region; //日本需求store portal用的是region字段，shop新增地址用area字段
      }

      this.setState({ saveLoading: true });
      const tmpPromise =
        this.currentOperateIdx > -1 ? editAddress : saveAddress;
      let res = await tmpPromise(params);
      this.scrollToPayInfoTitle();
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
      // return res;
    } catch (err) {
      console.log(672, err);
      this.setState({
        saveErrorMsg: err.message.toString()
      });
      this.scrollToPayInfoTitle();
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.setState({
          saveErrorMsg: '',
          successTipVisible: false
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
  // 显示错误提示信息
  showErrorMsg(msg) {
    this.setState({
      saveErrorMsg: msg
    });
    this.scrollToPayInfoTitle();
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({
        saveErrorMsg: '',
        successTipVisible: false
      });
    }, 3000);
  }
  // 俄罗斯地址校验flag，控制按钮是否可用
  getFormAddressValidFlag = (flag) => {
    // console.log('AddressComp: ',flag);
    this.setState(
      {
        formAddressValid: flag
      },
      () => {
        if (flag) {
          this.validFormData();
        }
      }
    );
  };
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
  // 添加地址按钮
  addBtnJSX = (receiveType) => {
    return (
      <>
        {receiveType === 'PICK_UP' ? (
          <div
            className="rounded border h-100 d-flex align-items-center justify-content-center font-weight-bold pt-3 pb-3"
            onClick={this.addOrEditPickupAddress.bind()}
            ref={(node) => {
              if (node) {
                node.style.setProperty('border-width', '.1rem', 'important');
                node.style.setProperty('border-style', 'dashed', 'important');
              }
            }}
          >
            <span className="rc-icon rc-plus--xs rc-iconography plus-icon mt-2 mr-1" />
            <FormattedMessage id="payment.addPickup" />
          </div>
        ) : (
          <div
            className="rounded border h-100 d-flex align-items-center justify-content-center font-weight-bold pt-3 pb-3"
            onClick={this.addOrEditAddress.bind(this, -1)}
            ref={(node) => {
              if (node) {
                node.style.setProperty('border-width', '.1rem', 'important');
                node.style.setProperty('border-style', 'dashed', 'important');
              }
            }}
          >
            <span className="rc-icon rc-plus--xs rc-iconography plus-icon mt-2 mr-1" />
            <FormattedMessage id="addANewAddress" />
          </div>
        )}
      </>
    );
  };
  // 显示更多
  toggleFoldBtn = () => {
    this.setState((curState) => ({ foledMore: !curState.foledMore }));
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

  // ************ pick up 相关

  // 新增或者编辑pickup address
  addOrEditPickupAddress = () => {
    this.updateConfirmBtnDisabled(true);
    this.setState({
      addOrEditPickup: true,
      deliveryOrPickUpFlag: true,
      showDeliveryOrPickUp: 0, // 0：都没有，1：home delivery，2：pickup
      choiseHomeDeliveryOrPickUp: 0 // 0：都没有，1：home delivery，2：pickup
    });
  };
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
        addOrEditPickup: false
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
    const { countryList, addressList, pickupFormData } = this.state;
    this.setState({
      saveBtnLoading: true,
      saveLoading: true
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

      let pickupAddress = addressList.filter((e) => e.receiveType == 'PICK_UP');
      // 判断是否存在有 pickup 地址
      const tmpPromise = pickupAddress.length ? editAddress : saveAddress;
      if (pickupAddress.length) {
        deliveryAdd.deliveryAddressId = pickupAddress[0].deliveryAddressId;
        deliveryAdd.customerId = pickupAddress[0].customerId;
      }

      let res = await tmpPromise(deliveryAdd);
      if (res.context?.deliveryAddressId) {
        this.scrollToPayInfoTitle();
        this.handleCancelEditOrAddPickup();
        pickupAddress.length
          ? this.props.save(
              res.context,
              false,
              this.queryAddressList.bind(this)
            )
          : await this.queryAddressList();
      }
    } catch (err) {
      this.scrollToPayInfoTitle();
      this.showErrorMsg(err.message);
    } finally {
      this.setState({
        saveBtnLoading: false,
        saveLoading: false
      });
    }
  };

  // 设置订阅地址
  setSubscriptionAddress = async (item) => {
    const { addressList, isBillSame } = this.state;
    // 判断地址是否完整
    let subAddressErrMsg = this.getSubAddressErrMsg(item);
    if (subAddressErrMsg) {
      return;
    }
    await this.selectAddress(item);
    this.props.save(
      addressList.filter((el) => el.selected)[0],
      isBillSame,
      this.queryAddressList.bind(this)
    );
  };
  // 地址项详细
  addressItemDetail = (item, i) => {
    const {
      deliveryAddressId,
      configStore: { localAddressForm }
    } = this.props;
    const { countryList } = this.state;
    return (
      <CardItem
        data={item}
        localAddressForm={localAddressForm}
        receiveType={item.receiveType}
        currentAddressId={deliveryAddressId}
        operateBtnJSX={
          <div
            className={`${
              isMobile ? '' : 'col-6'
            } d-flex flex-column justify-content-between`}
          >
            {/* 选择按钮 */}
            {item.deliveryAddressId === deliveryAddressId ? (
              <div
                className={`d-flex mb-3 ${
                  isMobile ? 'justify-content-center' : 'justify-content-end'
                }`}
              />
            ) : (
              <div
                className={`d-flex mb-3 ${
                  isMobile ? 'justify-content-center' : 'justify-content-end'
                }`}
                onClick={this.setSubscriptionAddress.bind(this, item)}
              >
                <span className="select_this_address border-bottom-2">
                  <FormattedMessage id="selectThisAddress" />
                </span>
              </div>
            )}

            {/* 编辑按钮 */}
            <div
              className={`d-flex justify-content-end mb-0 ${
                isMobile ? 'justify-content-center' : 'justify-content-end'
              }`}
            >
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
                {item.receiveType === 'PICK_UP' ? (
                  <button
                    className="rc-btn rc-btn--sm rc-btn--two font-weight-bold"
                    onClick={this.addOrEditPickupAddress.bind()}
                    style={{ fontSize: '12px' }}
                  >
                    <FormattedMessage id="payment.changePickup" />
                  </button>
                ) : (
                  <button
                    className="rc-btn rc-btn--sm rc-btn--two font-weight-bold"
                    onClick={this.addOrEditAddress.bind(this, i)}
                    style={{ fontSize: '12px' }}
                  >
                    <FormattedMessage id="edit" />
                  </button>
                )}
              </div>
            </div>
          </div>
        }
        handleClick={
          item.receiveType == 'PICK_UP'
            ? () => this.selectAddress(item)
            : !!item.validFlag
            ? () => this.selectAddress(item)
            : null
        }
        countryName={matchNamefromDict(countryList, item.countryId)}
      />
    );
  };
  render() {
    let {
      deliveryAddress,
      addOrEdit,
      loading,
      isValid,
      formAddressValid,
      addressList,
      isBillSame,
      validationLoading,
      validationModalVisible,
      selectValidationOption,
      btnSubSaveFlag,
      isPickupOpen,
      addOrEditPickup,
      addressAddOrEditFlag,
      defaultCity,
      showDeliveryOrPickUp,
      foledMore,
      editFormVisible,
      saveBtnLoading,
      confirmBtnDisabled
    } = this.state;

    return (
      <div
        className={`${
          this.props.visible ? '' : 'hidden'
        } addressComp subscription_address_box`}
      >
        <>
          {/* <div
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
        </div> */}
        </>

        {/* 提示错误信息 */}
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

        {/* 提示成功信息 */}
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

        {/* 地址列表 */}
        <div
          className={`rc-margin-bottom--sm ${
            !addOrEdit ? '' : 'checkout--padding'
          } ${loading ? 'pt-3 pb-3' : ''} subscription_address_list ${
            isMobile ? 'p-2' : 'p-3'
          }`}
        >
          <div
            id={`J-address-title-${this.props.id}`}
            className="card-header"
            style={{
              paddingLeft: '5px',
              paddingTop: '5px',
              overflow: 'hidden',
              border: 'none'
            }}
          >
            <h5
              className="pull-left ui-cursor-pointer"
              style={{
                marginBottom: '0',
                height: '100%',
                lineHeight: '30px'
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

          {loading ? (
            <Skeleton color="#f5f5f5" count={2} width="100%" />
          ) : this.state.errMsg ? (
            <span className="pt-2 pb-2">{this.state.errMsg}</span>
          ) : (
            <>
              {!addOrEdit ? (
                addressList.length ? (
                  <>
                    {window.__.env.REACT_APP_COUNTRY !== 'ru' &&
                    window.__.env.REACT_APP_COUNTRY !== 'jp' ? (
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
                    ) : null}

                    {!editFormVisible && !addOrEditPickup ? (
                      <>
                        {/* homeDelivery 地址列表 */}
                        {this.addressTypePanel('homeDelivery')}
                        <div className="address_list_panel address_list_panel_homedelivery">
                          <div className="row ml-0 mr-0">
                            {/* 地址列表 */}
                            {addressList
                              .filter((e) => e.receiveType != 'PICK_UP')
                              .map((item, i) => (
                                <div
                                  className={`col-12 pt-2 pb-2 pl-2 pr-2 ${
                                    foledMore && i > 1
                                      ? 'address_item_none'
                                      : ''
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
                            {addressList.filter(
                              (e) => e.receiveType !== 'PICK_UP'
                            ).length > 2 && this.showMoreAddressBtn()}
                          </div>
                        </div>

                        {isPickupOpen ? (
                          <>
                            {/* pickup 地址 */}
                            {this.addressTypePanel('pickup')}
                            <div className="address_list_panel pickup_address_pannel">
                              <div className="row ml-0 mr-0">
                                {/* 地址列表 */}
                                {addressList
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
                                {!addressList.filter(
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

                    {/* pickup 地址 */}
                    {addOrEditPickup && isPickupOpen ? (
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
                          updateConfirmBtnDisabled={
                            this.updateConfirmBtnDisabled
                          }
                          updateData={this.updatePickupData}
                          addressList={addressList}
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
                    ) : null}
                  </>
                ) : (
                  <FormattedMessage id="order.noDataTip" />
                )
              ) : null}

              {/* {!addOrEdit && (
                <div className="text-right" style={{ marginTop: '.625rem' }}>
                  <a
                    className="rc-styled-link editPersonalInfoBtn"
                    onClick={() => {
                      this.props.cancel();
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
                    disabled={btnSubSaveFlag}
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
              )} */}

              {/* 新增或者编辑 address form */}
              <fieldset
                className={`shipping-address-block rc-fieldset position-relative ${
                  addOrEdit || loading ? '' : 'hidden'
                }`}
              >
                {addOrEdit && (
                  <>
                    {addressAddOrEditFlag == 'add'
                      ? this.addressTypePanel('addANewAddress')
                      : null}

                    {addressAddOrEditFlag == 'edit'
                      ? this.addressTypePanel('edit')
                      : null}
                    <div className="p-2">
                      <AddressForm
                        key={deliveryAddress?.isDefalt}
                        initData={deliveryAddress}
                        type={this.props.type}
                        isLogin={true}
                        updateData={(data) => this.updateDeliveryAddress(data)}
                        calculateFreight={(data) => this.calculateFreight(data)}
                        getFormAddressValidFlag={this.getFormAddressValidFlag}
                      />
                    </div>
                  </>
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
                              name="isDefalt"
                            />
                          ) : (
                            <input
                              type="checkbox"
                              className="rc-input__checkbox"
                              key={2}
                              value={deliveryAddress.isDefalt}
                              name="isDefalt"
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
                        {/* <div className="rc-md-down ">
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
                            disabled={
                              isValid && formAddressValid ? false : true
                            }
                            onClick={() => this.handleSave()}
                          >
                            <FormattedMessage id="save" />
                          </button>
                        </div> */}

                        {/* <div className="rc-md-up rc-full-width text-right"> */}
                        <div className="rc-full-width text-right">
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
                            disabled={
                              isValid && formAddressValid ? false : true
                            }
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
