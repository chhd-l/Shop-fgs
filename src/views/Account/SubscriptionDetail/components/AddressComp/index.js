import React from 'react';
import Skeleton from 'react-skeleton-loader';
import { injectIntl, FormattedMessage } from 'react-intl';
import { inject, observer } from 'mobx-react';
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

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

function CardItem(props) {
  const { data, localAddressForm } = props;
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
        {/* 姓名 */}
        <div className="ccard-phone-title word-break">
          <div className="address-name">
            <span>{data.firstName + ' ' + data.lastName}</span>
          </div>
        </div>
        {/* 地址 */}
        {localAddressForm?.address1 && data?.address1 && (
          <p className="mb-0 ac_mb_address1">{data?.address1}</p>
        )}

        {window.__.env.REACT_APP_COUNTRY == 'us' ? null : (
          <>
            <p className="mb-0">{props.countryName}</p>
          </>
        )}
        <p className="mb-0 ac_mb_cpp">
          {/* 城市 */}
          {localAddressForm?.city && data?.city + ', '}

          {/* 区域 */}
          {localAddressForm?.region && data.area + ', '}

          {/* 省份 / State */}
          {localAddressForm?.state && data?.province + ' '}

          {/* 邮编 */}
          {localAddressForm?.postCode && data?.postCode}
        </p>
      </div>
    </div>
  );
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
    tradeItems: null,
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
      itemIdx: '',
      ruShippingDTO: {
        regionFias: '',
        areaFias: '',
        cityFias: '',
        settlementFias: '',
        postalCode: ''
      } // 俄罗斯计算运费DuData对象，purchases接口用
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
    this.setState({
      wrongAddressMsg: JSON.parse(localItemRoyal.get('rc-wrongAddressMsg'))
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
        this.getSubAddressErrMsg(defaultAddressItem);
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
  // 选择地址
  selectAddress(idx) {
    let { addressList } = this.state;
    Array.from(addressList, (a) => (a.selected = false));
    let alist = addressList[idx];
    alist.selected = true;
    let subAddressErrMsg = this.getSubAddressErrMsg(alist);
    if (!subAddressErrMsg) {
      this.setState({
        addressList: addressList,
        selectedId: alist.deliveryAddressId
      });
    }
  }
  // 判断地址完整性
  getSubAddressErrMsg = (data) => {
    console.log(data);
    let { wrongAddressMsg } = this.state;
    const laddf = this.props.configStore.localAddressForm;
    let dfarr = laddf.settings;
    dfarr = dfarr.filter(
      (item) => item.enableFlag == 1 && item.requiredFlag == 1
    );
    let errMsgArr = [];
    dfarr.forEach((v, i) => {
      let akey = v.fieldKey;
      // state 对应数据库字段 province
      v.fieldKey == 'state' ? (akey = 'province') : v.fieldKey;
      // region 对应数据库字段 area
      v.fieldKey == 'region' ? (akey = 'area') : v.fieldKey;
      // phoneNumber 对应数据库字段 consigneeNumber
      v.fieldKey == 'phoneNumber' ? (akey = 'consigneeNumber') : v.fieldKey;

      let fky = wrongAddressMsg[akey];
      // 判断city和cityId 是否均为空
      if (v.fieldKey == 'city') {
        data.city || data.cityId ? (akey = '') : akey;
      }
      // 判断country和countryId 是否均为空
      if (v.fieldKey == 'country') {
        data.country || data.countryId ? (akey = '') : akey;
      }
      if (akey) data[akey] ? '' : errMsgArr.push(fky);
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
    data.street ? '' : errArr.push(streets);
    data.postCode ? '' : errArr.push(postCode);
    data.house ? '' : errArr.push(house);
    data.city ? '' : errArr.push(city);
    data.province ? '' : errArr.push(province);
    data.settlement ? '' : errArr.push(settlement);
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
    if (idx > -1) {
      const tmp = addressList[idx];
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
        isDefalt: tmp.isDefaltAddress === 1 ? true : false
      };

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
  // 计算税额、运费、运费折扣
  calculateFreight = async (data) => {
    // console.log(
    //   '310 ★★ -- SubscriptionDetail 计算税额、运费、运费折扣: ',
    //   data
    // );
    const { ruShippingDTO } = this.state;
    let param = {};

    var dudata = data?.DuData;
    if (dudata) {
      ruShippingDTO.regionFias = dudata?.provinceId;
      ruShippingDTO.areaFias = dudata?.areaId;
      ruShippingDTO.cityFias = dudata?.cityId;
      ruShippingDTO.settlementFias = dudata?.settlementId;
      ruShippingDTO.postalCode = dudata?.postCode;
      this.setState({
        ruShippingDTO
      });
      // 把查询运费折扣相关参数存到本地
      localItemRoyal.set('rc-calculation-param', data);
    }
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
      address1: data?.address1,
      ruShippingDTO: ruShippingDTO
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
      await this.props.checkoutStore.updateLoginCart(param);
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
    str == 'cancel' ? this.props.cancel() : this.scrollToTitle();
  };

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

      // await validData(deliveryAddress.formRule, deliveryAddress); // 数据验证
      // await validData(ADDRESS_RULE, deliveryAddress);

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
      // let params = {
      //   address1: deliveryAddress.address1,
      //   address2: deliveryAddress.address2,
      //   area: deliveryAddress.area,
      //   areaId: deliveryAddress.areaId,
      //   firstName: deliveryAddress.firstName,
      //   lastName: deliveryAddress.lastName,
      //   countryId: deliveryAddress.countryId,
      //   country: deliveryAddress.country,
      //   cityId: deliveryAddress.cityId,
      //   city: deliveryAddress.city,
      //   cityName: deliveryAddress.cityName,
      //   consigneeName: deliveryAddress.firstName + ' ' + deliveryAddress.lastName,
      //   consigneeNumber: deliveryAddress.phoneNumber,
      //   customerId: originData ? originData.customerId : '',
      //   deliveryAddress: deliveryAddress.address1 + ' ' + deliveryAddress.address2,
      //   deliveryAddressId: originData ? originData.deliveryAddressId : '',
      //   isDefaltAddress: deliveryAddress.isDefalt ? 1 : 0,
      //   postCode: deliveryAddress.postCode,
      //   rfc: deliveryAddress.rfc,
      //   email: deliveryAddress.email,
      //   comment: deliveryAddress?.comment,

      //   region: deliveryAddress.province, // DuData相关参数
      //   area: deliveryAddress.area,
      //   settlement: deliveryAddress.settlement,
      //   street: deliveryAddress.street,
      //   house: deliveryAddress.house,
      //   housing: deliveryAddress.housing,
      //   entrance: deliveryAddress.entrance,
      //   apartment: deliveryAddress.apartment,

      //   type: this.props.type.toUpperCase()
      // };

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
      // return res;
    } catch (err) {
      console.log(672, err);
      this.setState({
        saveErrorMsg: err.message.toString()
      });
      this.scrollToTitle();
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
  async deleteAddress(item) {
    // console.log(item, 'item');
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
    console.log(722, '-------- err msg: ', msg);
    this.setState({
      saveErrorMsg: msg
    });
    this.scrollToTitle();
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({
        saveErrorMsg: '',
        successTipVisible: false
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
  render() {
    let {
      deliveryAddress,
      addOrEdit,
      loading,
      isValid,
      formAddressValid,
      addressList,
      isBillSame,
      countryList,
      validationLoading,
      validationModalVisible,
      selectValidationOption,
      btnSubSaveFlag
    } = this.state;

    // 获取本地存储的需要显示的地址字段
    const localAddressForm = this.props.configStore.localAddressForm;
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
          } subscription-detail-address-comp`}
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
                    {window.__.env.REACT_APP_COUNTRY !== 'ru' ? (
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
                            // console.log(isBillSame);
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
                              localAddressForm={localAddressForm}
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
                    disabled={btnSubSaveFlag}
                    onClick={() => {
                      console.info(
                        '....',
                        addressList.filter((el) => el.selected)[0]
                      );
                      //debugger;
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
                    type={this.props.type}
                    isLogin={true}
                    updateData={(data) => this.updateDeliveryAddress(data)}
                    calculateFreight={(data) => this.calculateFreight(data)}
                    getFormAddressValidFlag={this.getFormAddressValidFlag}
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
                        <div className="rc-md-down ">
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
                        </div>
                        <div className="rc-md-up rc-full-width text-right">
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
