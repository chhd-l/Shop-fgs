import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import Loading from '@/components/Loading';
import ValidationAddressModal from '@/components/validationAddressModal';
import { AddressForm } from '@/components/Address';
import HomeDeliveryOrPickUp from '@/components/HomeDeliveryOrPickUp';
import { validData } from '@/utils/utils';
import { getAddressBykeyWord, getDeliveryDateAndTimeSlot } from '@/api/address';
import {
  searchNextConfirmPanel,
  scrollPaymentPanelIntoView
} from '../modules/utils';
import AddressPreview from './Preview';
import AddressPanelContainer from './AddressPanelContainer';
import './VisitorAddress.css';

const localItemRoyal = window.__.localItemRoyal;
const sessionItemRoyal = window.__.sessionItemRoyal;
const isFromFelin = sessionItemRoyal.get('appointment-no');

/**
 * delivery/billing adress module - visitor
 */
@inject('checkoutStore', 'paymentStore')
// @injectIntl
@observer
class VisitorAddress extends React.Component {
  static defaultProps = {
    type: 'delivery',
    isDeliveryOrBilling: 'delivery',
    intlMessages: null,
    showDeliveryDateTimeSlot: false,
    initData: null,
    titleVisible: true,
    deliveryOrPickUp: 0,
    showConfirmBtn: true,
    isValidationModal: true, // 是否显示验证弹框
    updateFormValidStatus: () => {},
    updateValidationStaus: () => {},
    setPaymentToCompleted: () => {},
    calculateFreight: () => {},
    updateData: () => {}
  };
  constructor(props) {
    super(props);
    this.state = {
      defaultCity: '', // 默认地址中的城市
      confirmBtnDisabled: false,
      deliveryOrPickUpFlag: false,
      selectDeliveryOrPickUp: 0, // 0：pickup和delivery home都没有，1：home delivery，2：pickup
      pickupFormData: [], // pickup 表单数据
      pickupEditNumber: 0, // pickup 编辑次数，用来判断当前是否编辑过
      pickupAddress: [],

      visitorData: null,
      form: this.props.initData,
      unConfirmedForm: '', //未确认时 但验证成功时的表单数据
      validationAddress: {
        suggestionAddress: null,
        address1: null,
        address2: null,
        city: null,
        countryCode: null,
        postalCode: null,
        provinceCode: null
      },
      billingChecked: true,
      isValid: false,
      btnConfirmLoading: false,
      formAddressValid: false,
      visitorValidationLoading: false, // 地址校验loading
      visitorValidationModalVisible: false, // 地址校验查询开关
      selectVisitorValidationOption: 'suggestedAddress',
      visitorBtnLoading: false
    };
    this.confirmVisitorValidationAddress =
      this.confirmVisitorValidationAddress.bind(this);
  }
  componentDidMount() {
    this.validData({
      data: this.state.form,
      visitorValidationModalVisible: false,
      visitorBtnLoading: false
    });
    // 设置home delivery状态
    this.setRuDeliveryOrPickUp();
  }
  //props发生变化时触发
  componentWillReceiveProps(props) {
    // console.log(props);
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
  validData = async ({ data }) => {
    const { intl } = this.props;
    try {
      // 如果有返回运费数据，则计算运费折扣并显示
      if (data?.calculationStatus) {
        this.props.updateData(data);
      }
      if (!data?.formRule || (data?.formRule).length <= 0) {
        return;
      }
      await validData({ rule: data.formRule, data, intl }); // 数据验证
      this.setState({ isValid: true, unConfirmedForm: data }, () => {
        // console.log('--------- ★★★★★★ VisitorAddress 验证通过');
        this.props.updateFormValidStatus(this.state.isValid);
      });
      this.props.updateData(data);
    } catch (err) {
      // console.log(' err msg: ', err);
      this.setState({ isValid: false, visitorValidationLoading: false }, () => {
        this.props.updateFormValidStatus(this.state.isValid);
      });
    }
  };
  // 接收form表单输入
  updateDeliveryAddress = (data) => {
    this.setState(
      {
        visitorData: data
      },
      () => {
        this.validData({ data });
      }
    );
  };
  // 计算运费
  calculateFreight = (data) => {
    this.props.calculateFreight(data);
  };
  // 判断 delivery date和time slot是否过期
  deliveryDateStaleDateOrNot = async (data) => {
    let flag = true;

    let deliveryDate = data.deliveryDate; // deliveryDate 日期
    let timeSlot = data.timeSlot;

    // deliveryDate: 2021-06-11
    let nyrArr = deliveryDate.split('-');
    // 20210616
    let dldate = Number(nyrArr[0] + '' + nyrArr[1] + '' + nyrArr[2]);

    // 根据 address 取到 DuData返回的provinceId
    let dudata = await getAddressBykeyWord({ keyword: data.address1 });
    if (dudata?.context && dudata?.context?.addressList.length > 0) {
      let addls = dudata.context.addressList[0];
      // 再根据 provinceId 获取到 cutOffTime
      let vdres = await getDeliveryDateAndTimeSlot({
        cityNo: addls?.provinceId
      });
      let cutOffTime = vdres.context?.cutOffTime;
      let localTime = vdres.defaultLocalDateTime.split(' ');
      let lnyr = localTime[0].split('-');
      let today = lnyr[0] + '' + lnyr[1] + '' + lnyr[2];
      let lsfm = localTime[1].split(':');
      let todayHour = lsfm[0];
      let todayMinutes = lsfm[1];

      // 当天16点前下单，明天配送；过了16点，后天配送。
      // 判断当前时间段，如果是当天过了16点提示重新选择。

      // 已过期（俄罗斯时间）
      let errMsg = this.props.intlMessages['payment.reselectTimeSlot'];
      // 当天或者当天之前的时间算已过期时间
      if (today >= dldate) {
        console.log('666  ----->  今天或者更早');
        this.showErrMsg(errMsg);
        flag = false;
      } else {
        // 其他时间
        // 明天配送的情况（当前下单时间没有超过 16 点）
        // 如果选择的时间是明天，判断当前时间是否超过16点，并且判断选择的结束时间
        let nowTime = Number(todayHour + '' + todayMinutes);
        console.log('666  ----->  nowTime: ', nowTime);
        let ctt = cutOffTime.split(':');
        cutOffTime
          ? (cutOffTime = Number(ctt[0] + '' + ctt[1]))
          : (cutOffTime = 1600);
        if (dldate == today + 1 && nowTime > cutOffTime) {
          console.log('666  ----->  明天');
          this.showErrMsg(errMsg);
          flag = false;
        }
        // 后天配送的情况（当前下单时间超过 16 点）
      }
    } else {
      flag = false;
    }
    return flag;
  };
  // 游客确认 Delivery address
  handleClickConfirm = async () => {
    const { isValid, unConfirmedForm } = this.state;
    const { isValidationModal } = this.props;
    // console.log('666 游客确认 type： ', this.props.type);
    if (!isValid) {
      return false;
    }
    if (unConfirmedForm?.deliveryDate) {
      this.setState({ btnConfirmLoading: true });
      let yesOrNot = await this.deliveryDateStaleDateOrNot(unConfirmedForm);
      this.setState({ btnConfirmLoading: false });
      // 判断 deliveryDate 是否过期
      if (!yesOrNot) {
        return;
      }
    }
    // qhx 只有在确认后才赋值给form字段
    this.setState({ form: unConfirmedForm });
    // 地址验证 visitorValidationModalVisible - 控制是否查询数据
    if (isValidationModal) {
      this.setState({
        visitorValidationLoading: true
      });
      setTimeout(() => {
        this.setState({
          visitorValidationModalVisible: true
        });
        this.props.updateValidationStaus(false);
      }, 800);
    }
    // 是否地址验证
    const addressValidationFlag =
      localItemRoyal.get('rc-address-validation-flag') || null;
    if (this.props.type !== 'delivery' && addressValidationFlag) {
      throw new Error('This Error No Display');
    }
  };
  // 俄罗斯地址校验flag，控制按钮是否可用
  getFormAddressValidFlag = (flag) => {
    const { visitorData } = this.state;
    this.setState(
      {
        formAddressValid: flag
      },
      () => {
        if (flag) {
          this.updateDeliveryAddress(visitorData);
        }
      }
    );
  };
  handleClickEdit = () => {
    this.props.paymentStore.setStsToEdit({
      key: this.curPanelKey,
      hideOthers: true
    });
    // 设置home delivery状态
    this.setRuDeliveryOrPickUp();
  };

  // 选择地址
  chooseVisitorValidationAddress = (e) => {
    this.setState({
      selectVisitorValidationOption: e.target.value
    });
  };
  // 获取地址验证查询到的数据
  getVisitorValidationData = async (data) => {
    this.setState({
      visitorValidationLoading: false
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
  confirmVisitorValidationAddress() {
    const { form, selectVisitorValidationOption, validationAddress } =
      this.state;
    let oldForm = JSON.parse(JSON.stringify(form));
    this.setState({
      visitorBtnLoading: true
    });
    let theform = [];
    if (selectVisitorValidationOption == 'suggestedAddress') {
      form.address1 = validationAddress.address1;
      form.city = validationAddress.city;
      form.postCode = validationAddress.postalCode;

      form.province = validationAddress.provinceCode;
      form.provinceId = validationAddress.provinceId
        ? validationAddress.provinceId
        : form.provinceId;

      // 地址校验返回参数
      form.validationResult = validationAddress.validationResult;
      theform = Object.assign({}, form);
    } else {
      theform = JSON.parse(JSON.stringify(oldForm));
    }
    this.setState(
      {
        form: Object.assign({}, theform)
      },
      () => {
        // payment 时提交 billing address
        if (this.props.isDeliveryOrBilling == 'billing') {
          // billing
          this.props.setPaymentToCompleted(this.props.isDeliveryOrBilling);
        } else {
          // delivery  进入下一步
          this.showNextPanel();
        }
      }
    );
  }
  // 下一个最近的未complete的panel
  showNextPanel = () => {
    const { paymentStore } = this.props;
    const { form, billingChecked } = this.state;
    const isDeliveryAddr = this.curPanelKey === 'deliveryAddr';

    this.setState(
      {
        visitorValidationModalVisible: false,
        visitorBtnLoading: false
      },
      () => {
        this.props.updateValidationStaus(true);
        this.props.updateData(form);

        paymentStore.setStsToCompleted({ key: this.curPanelKey });
        if (isDeliveryAddr) {
          billingChecked &&
            paymentStore.setStsToCompleted({ key: 'billingAddr' });
          paymentStore.setDefaultCardDataFromAddr(form);
        }

        // 下一个最近的未complete的panel
        const nextConfirmPanel = searchNextConfirmPanel({
          list: toJS(paymentStore.panelStatus),
          curKey: this.curPanelKey
        });
        paymentStore.setStsToEdit({ key: nextConfirmPanel.key });
        if (isDeliveryAddr) {
          this.calculateFreight(this.state.form);
          setTimeout(() => {
            scrollPaymentPanelIntoView();
          });
        }
      }
    );
  };
  // 重置参数，在Payment确认地址时调用
  resetVisitorAddressState() {
    const { form } = this.state;
    // console.log('666 ------ 重置参数，在Payment确认地址时调用 form: ',form);
    this.setState({
      visitorValidationModalVisible: false,
      visitorBtnLoading: false
    });
    this.props.updateValidationStaus(true);
    this.props.updateData(form);
  }

  // ************ pick up 相关
  // 设置home delivery状态
  setRuDeliveryOrPickUp() {
    let deliveryOrPickUp = 0;
    let btndisabled = false;
    if (window.__.env.REACT_APP_COUNTRY === 'ru') {
      deliveryOrPickUp = 0; // both not
      btndisabled = true;
      this.setState({
        deliveryOrPickUpFlag: true
      });
    } else {
      deliveryOrPickUp = 1; // home delivery
      btndisabled = false;
    }
    this.setState({
      selectDeliveryOrPickUp: deliveryOrPickUp,
      confirmBtnDisabled: btndisabled
    });
  }
  // 修改按钮状态
  updateConfirmBtnDisabled = (flag) => {
    // console.log('666 flag: ', flag);
    this.setState({
      confirmBtnDisabled: flag
    });
  };
  // 更新 selectDeliveryOrPickUp
  updateDeliveryOrPickup = (num) => {
    this.setState(
      {
        selectDeliveryOrPickUp: num
      },
      () => {
        this.props.paymentUpdateDeliveryOrPickup(num);
      }
    );
  };
  // 更新 pickup编辑次数
  updatePickupEditNumber = (num) => {
    // console.log('666  更新 pickupEditNumber: ', num);
    this.setState({
      pickupEditNumber: num
    });
  };
  // 更新pickup数据
  updatePickupData = (data) => {
    this.setState({
      pickupFormData: data
    });
  };
  // 确认 pickup
  clickConfirmPickup = async () => {
    const { paymentStore } = this.props;
    const { form, pickupFormData, billingChecked } = this.state;
    this.setState({
      btnConfirmLoading: true
    });
    try {
      let receiveType = pickupFormData.receiveType;

      let tempAddress = Object.keys(form).reduce((pre, cur) => {
        return Object.assign(pre, { [cur]: '' });
      }, {});
      let pkaddr = pickupFormData?.pickup?.address;
      let deliveryAdd = Object.assign({}, tempAddress, {
        firstName: pickupFormData.firstName,
        lastName: pickupFormData.lastName,
        consigneeNumber: pickupFormData.phoneNumber,
        phoneNumber: pickupFormData.phoneNumber,
        consigneeName: pickupFormData.firstName + ' ' + pickupFormData.lastName,
        address1: pickupFormData.address1,
        deliveryAddress: pickupFormData.address1,
        city: pickupFormData.city,
        comment: pickupFormData.comment,
        pickupPrice: pickupFormData?.pickupPrice,
        pickupDescription: pickupFormData?.pickupDescription,
        paymentMethods: pickupFormData?.paymentMethods, // 支付方式
        pickupCode: pickupFormData?.pickupCode, // 快递公司code
        pickupName: pickupFormData?.pickupName, // 快递公司
        workTime: pickupFormData.workTime, // 快递公司上班时间
        receiveType: pickupFormData.receiveType, // HOME_DELIVERY , PICK_UP
        deliverWay: receiveType == 'HOME_DELIVERY' ? 1 : 2, // 1: HOMEDELIVERY , 2: PICKUP
        type: 'DELIVERY',
        country: form.country,
        countryId: form.countryId,
        minDeliveryTime: pickupFormData.minDeliveryTime,
        maxDeliveryTime: pickupFormData.maxDeliveryTime,
        province: pkaddr?.region,
        provinceIdStr: pkaddr?.regionFias,
        provinceCode: pkaddr?.regionIsoCode,
        cityIdStr: pkaddr?.cityFias,
        areaIdStr: pkaddr?.areaFias,
        settlementIdStr: pkaddr?.settlementFias,
        postalCode: pkaddr?.zip
      });

      this.setState(
        {
          pickupAddress: pickupFormData
        },
        () => {
          // console.log('666 ★★★  pickupFormData: ', this.state.pickupFormData);
          // console.log('666 ★★★  deliveryAdd: ', deliveryAdd);

          // pickup 相关信息传到 Payment
          deliveryAdd['pickup'] = pickupFormData.pickup;

          this.props.updateValidationStaus(true);
          this.props.updateData(deliveryAdd);
          this.calculateFreight(deliveryAdd);

          this.setState({
            selectDeliveryOrPickUp: 0,
            deliveryOrPickUpFlag: false
          });

          const isDeliveryAddr = this.curPanelKey === 'deliveryAddr';
          paymentStore.setStsToCompleted({ key: this.curPanelKey });
          if (isDeliveryAddr) {
            billingChecked &&
              paymentStore.setStsToCompleted({ key: 'billingAddr' });
            paymentStore.setDefaultCardDataFromAddr(form);
          }

          // 下一个最近的未complete的panel
          const nextConfirmPanel = searchNextConfirmPanel({
            list: toJS(paymentStore.panelStatus),
            curKey: this.curPanelKey
          });
          paymentStore.setStsToEdit({ key: nextConfirmPanel.key });
          if (isDeliveryAddr) {
            setTimeout(() => {
              scrollPaymentPanelIntoView();
            });
          }
        }
      );
    } catch (err) {
      this.setState({
        saveErrorMsg: err.message
      });
    } finally {
      this.setState({
        btnConfirmLoading: false
      });
    }
  };

  render() {
    const { panelStatus } = this;
    const { showConfirmBtn } = this.props;
    const {
      deliveryOrPickUpFlag,
      selectDeliveryOrPickUp,
      form,
      isValid,
      formAddressValid,
      visitorValidationLoading,
      visitorValidationModalVisible,
      selectVisitorValidationOption,
      confirmBtnDisabled,
      pickupFormData,
      pickupAddress,
      pickupEditNumber
    } = this.state;

    // console.log(234, form);

    const _editForm = (
      <AddressForm
        {...this.props}
        type="delivery"
        initData={form}
        isLogin={false}
        showDeliveryDateTimeSlot={this.props.showDeliveryDateTimeSlot}
        getFormAddressValidFlag={this.getFormAddressValidFlag}
        updateData={this.updateDeliveryAddress}
        calculateFreight={this.calculateFreight}
        // onSearchSelectionFocus={this.onSearchSelectionFocus}
        // onSearchSelectionChange={this.onSearchSelectionChange}
        // onSearchSelectionError={this.onSearchSelectionError}
        // {...this.props}
      />
    );
    return (
      <AddressPanelContainer
        panelStatus={panelStatus}
        titleVisible={this.props.titleVisible}
        titleId={`J-address-title-${this.props.id}`}
        isFromFelin={isFromFelin}
        isDeliverAddress={this.props.type === 'delivery'}
        handleClickEdit={this.handleClickEdit}
        previewJSX={
          <AddressPreview
            key={this.state.pickupAddress}
            form={
              pickupFormData?.receiveType == 'PICK_UP'
                ? pickupAddress || null
                : form
            }
            isLogin={false}
          />
        }
      >
        {!panelStatus.isPrepare ? (
          panelStatus.isEdit ? (
            <fieldset className="shipping-address-block rc-fieldset">
              {/* 俄罗斯 pickup */}
              {deliveryOrPickUpFlag && !panelStatus.isCompleted ? (
                <HomeDeliveryOrPickUp
                  {...this.props}
                  key={this.state.defaultCity}
                  isLogin={false}
                  defaultCity={this.state.defaultCity}
                  pageType="checkout"
                  updateDeliveryOrPickup={this.updateDeliveryOrPickup}
                  updatePickupEditNumber={this.updatePickupEditNumber}
                  updateConfirmBtnDisabled={this.updateConfirmBtnDisabled}
                  updateData={this.updatePickupData}
                  deliveryOrPickUp={selectDeliveryOrPickUp}
                  intlMessages={this.props.intlMessages}
                  cartData={this.props.cartData}
                  calculateFreight={this.calculateFreight}
                  pickupEditNumber={pickupEditNumber}
                  // onSearchSelectionFocus={this.onSearchSelectionFocus}
                  // onSearchSelectionChange={this.onSearchSelectionChange}
                  // onSearchSelectionError={this.onSearchSelectionError}
                />
              ) : null}

              {selectDeliveryOrPickUp == 1 && <>{_editForm}</>}

              {showConfirmBtn && (
                <div className="d-flex justify-content-end mb-2">
                  {pickupFormData?.receiveType == 'PICK_UP' ? (
                    <>
                      <button
                        className={`rc-btn rc-btn--one rc-btn--sm ${
                          this.state.btnConfirmLoading ? 'ui-btn-loading' : ''
                        }`}
                        disabled={confirmBtnDisabled}
                        onClick={this.clickConfirmPickup}
                      >
                        <FormattedMessage id="clinic.confirm3" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className={`rc-btn rc-btn--one rc-btn--sm visitor_address_confirm ${
                          this.state.btnConfirmLoading ? 'ui-btn-loading' : ''
                        }`}
                        disabled={isValid && formAddressValid ? false : true}
                        onClick={this.handleClickConfirm}
                      >
                        <FormattedMessage id="clinic.confirm3" />
                      </button>
                    </>
                  )}
                </div>
              )}
            </fieldset>
          ) : null
        ) : null}

        {visitorValidationLoading && <Loading positionFixed="true" />}
        {visitorValidationModalVisible && (
          <ValidationAddressModal
            btnLoading={this.state.visitorBtnLoading}
            address={form}
            updateValidationData={(res) => this.getVisitorValidationData(res)}
            selectValidationOption={selectVisitorValidationOption}
            handleChooseValidationAddress={(e) =>
              this.chooseVisitorValidationAddress(e)
            }
            hanldeClickConfirm={() => this.confirmVisitorValidationAddress()}
            validationModalVisible={visitorValidationModalVisible}
            close={() => {
              this.setState({
                visitorValidationModalVisible: false,
                visitorBtnLoading: false,
                visitorValidationLoading: false
              });
              this.props.updateValidationStaus(true);
            }}
          />
        )}
      </AddressPanelContainer>
    );
  }
}
export default VisitorAddress;
// export default injectIntl(VisitorAddress, { forwardRef: true });
