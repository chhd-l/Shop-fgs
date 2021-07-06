import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import Loading from '@/components/Loading';
import ValidationAddressModal from '@/components/validationAddressModal';
import EditForm from '@/components/Form';
import PickUp from '@/components/PickUp';
import { validData, transTime } from '@/utils/utils';
import {
  getAddressBykeyWord,
  addressValidation,
  getDeliveryDateAndTimeSlot
} from '@/api/index';
import {
  searchNextConfirmPanel,
  scrollPaymentPanelIntoView
} from '../modules/utils';
import AddressPreview from './Preview';
import './VisitorAddress.css';

const localItemRoyal = window.__.localItemRoyal;

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
      isDeliveryOrPickUp: false, // 用来标记是否是 pick up
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
    this.confirmVisitorValidationAddress = this.confirmVisitorValidationAddress.bind(
      this
    );
  }
  componentDidMount() {
    this.validData({
      data: this.state.form,
      visitorValidationModalVisible: false,
      visitorBtnLoading: false
    });
    // console.log('★ ----------------- VisitorAddress');
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
    console.log('83--------- ★★★★★★ VisitorAddress validData: ', data);
    try {
      // 如果有返回运费数据，则计算运费折扣并显示
      if (data?.calculationStatus) {
        this.props.updateData(data);
      }
      if (!data?.formRule || (data?.formRule).length <= 0) {
        return;
      }
      await validData(data.formRule, data); // 数据验证
      this.setState({ isValid: true, unConfirmedForm: data }, () => {
        console.log('--------- ★★★★★★ VisitorAddress 验证通过');
        this.props.updateFormValidStatus(this.state.isValid);
      });
      this.props.updateData(data);
    } catch (err) {
      console.log(' err msg: ', err);
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
    const { isValid, validationAddress, unConfirmedForm } = this.state;
    const { isValidationModal } = this.props;
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
    this.setState({ form: unConfirmedForm }); //qhx 只有在确认后才赋值给form字段
    // console.log('★ ----- 游客确认 isValidationModal:', isValidationModal);
    // console.log('★ ----- 游客确认 validationAddress:', validationAddress);
    // console.log('★ ----- 游客确认 form:', this.state.unConfirmedForm);
    // 地址验证
    // visitorValidationModalVisible - 控制是否查询数据
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
  };
  titleJSX = ({ redColor = false } = {}) => {
    return this.props.type === 'delivery' ? (
      <>
        <em
          className={`rc-icon rc-indoors--xs rc-margin-right--xs ${
            redColor ? 'rc-brand1' : 'rc-iconography'
          }`}
        />{' '}
        <span>
          <FormattedMessage id="payment.deliveryTitle" />
        </span>
      </>
    ) : (
      <>
        <em
          className={`rc-icon rc-news--xs ${
            redColor ? 'rc-brand1' : 'rc-iconography'
          }`}
        />{' '}
        <span>
          <FormattedMessage id="payment.billTitle" />
        </span>
      </>
    );
  };
  titleJSXForPrepare = () => {
    return (
      <>
        <h5 className={`mb-0`}>{this.titleJSX()}</h5>
      </>
    );
  };
  titleJSXForEdit = () => {
    return (
      <>
        <h5 className={`mb-0 red`}>{this.titleJSX({ redColor: true })}</h5>
      </>
    );
  };
  titleJSXForCompeleted = () => {
    return (
      <>
        <h5 className={`mb-0`}>
          {this.titleJSX()}
          <span className="iconfont font-weight-bold green ml-2">&#xe68c;</span>
        </h5>
        <p onClick={this.handleClickEdit} className="rc-styled-link mb-1">
          <FormattedMessage id="edit" />
        </p>
      </>
    );
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
    const {
      form,
      selectVisitorValidationOption,
      validationAddress
    } = this.state;
    let oldForm = JSON.parse(JSON.stringify(form));
    this.setState({
      visitorBtnLoading: true
    });
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
    } else {
      this.setState({
        form: JSON.parse(JSON.stringify(oldForm))
      });
    }
    // payment 时提交 billing address
    if (this.props.isDeliveryOrBilling == 'billing') {
      // billing
      this.props.setPaymentToCompleted(this.props.isDeliveryOrBilling);
    } else {
      // delivery  进入下一步
      this.showNextPanel();
    }
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
          this.props.calculateFreight(this.state.form);
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
    console.log('------ 重置参数，在Payment确认地址时调用');
    this.setState({
      visitorValidationModalVisible: false,
      visitorBtnLoading: false
    });
    this.props.updateValidationStaus(true);
    this.props.updateData(form);
  }

  render() {
    const { panelStatus } = this;

    const { showConfirmBtn } = this.props;
    const {
      isDeliveryOrPickUp,
      form,
      isValid,
      formAddressValid,
      visitorValidationLoading,
      visitorValidationModalVisible,
      selectVisitorValidationOption
    } = this.state;

    // console.log(234, form);

    const _editForm = (
      <EditForm
        type="delivery"
        initData={form}
        isLogin={false}
        showDeliveryDateTimeSlot={this.props.showDeliveryDateTimeSlot}
        getFormAddressValidFlag={this.getFormAddressValidFlag}
        updateData={this.updateDeliveryAddress}
        calculateFreight={this.calculateFreight}
      />
    );
    const _title = panelStatus.isPrepare
      ? this.titleJSXForPrepare()
      : panelStatus.isEdit
      ? this.titleJSXForEdit()
      : panelStatus.isCompleted
      ? this.titleJSXForCompeleted()
      : null;

    return (
      <>
        {this.props.titleVisible && (
          <div className="bg-transparent d-flex justify-content-between align-items-center">
            {_title}
          </div>
        )}
        {!panelStatus.isPrepare ? (
          panelStatus.isEdit ? (
            <fieldset className="shipping-address-block rc-fieldset">
              {_editForm}

              {showConfirmBtn && (
                <div className="d-flex justify-content-end mb-2">
                  <button
                    className={`rc-btn rc-btn--one rc-btn--sm ${
                      this.state.btnConfirmLoading ? 'ui-btn-loading' : ''
                    }`}
                    onClick={this.handleClickConfirm}
                    disabled={isValid && formAddressValid ? false : true}
                  >
                    <FormattedMessage id="clinic.confirm3" />
                  </button>
                </div>
              )}
            </fieldset>
          ) : panelStatus.isCompleted ? (
            <AddressPreview form={form} isLogin={false} />
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
      </>
    );
  }
}
export default VisitorAddress;
