import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import Loading from '@/components/Loading';
import ValidationAddressModal from '@/components/validationAddressModal';
import EditForm from '@/components/Form';
// import EditForm from './EditForm';
import { validData } from '@/utils/utils';
import {
  searchNextConfirmPanel,
  scrollPaymentPanelIntoView
} from '../modules/utils';
import { shippingCalculation } from '@/api/cart';
import AddressPreview from './Preview';
import './VisitorAddress.css';

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
    initData: null,
    titleVisible: true,
    showConfirmBtn: true,
    isValidationModal: true, // 是否显示验证弹框
    updateFormValidStatus: () => {},
    updateValidationStaus: () => {},
    setPaymentToCompleted: () => {}
  };
  constructor(props) {
    super(props);
    this.state = {
      isValid: false,
      form: this.props.initData,
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
      visitorValidationLoading: false, // 地址校验loading
      visitorValidationModalVisible: false, // 地址校验查询开关
      selectVisitorValidationOption: 'suggestedAddress',
      russiaAddressValidFlag: false, // 俄罗斯地址校验标记
      btnLoading: false
    };
    this.confirmVisitorValidationAddress = this.confirmVisitorValidationAddress.bind(
      this
    );
  }
  componentDidMount() {
    this.validData({
      data: this.state.form,
      visitorValidationModalVisible: false,
      btnLoading: false
    });
    console.log('★ ----------------- VisitorAddress');
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
    try {
      if (!data?.formRule || (data?.formRule).length <= 0) {
        return;
      }
      await validData(data.formRule, data); // 数据验证
      this.setState({ isValid: true, form: data }, () => {
        this.props.updateFormValidStatus(this.state.isValid);
      });
      this.props.updateData(data);
    } catch (err) {
      console.error(' err msg: ', err);
      this.setState({ isValid: false, visitorValidationLoading: false }, () => {
        this.props.updateFormValidStatus(this.state.isValid);
      });
    }
  };
  // 接收form表单输入
  handleEditFormChange = (data) => {
    this.validData({ data });
  };
  // 游客确认 Delivery address
  handleClickConfirm = () => {
    const { isValid } = this.state;

    if (!isValid) {
      return false;
    }
    // 地址验证
    // visitorValidationModalVisible - 控制是否查询数据
    this.setState({
      visitorValidationLoading: true
    });
    if (this.props.isValidationModal) {
      console.log('★ ----------------- VisitorAddress 地址校验');
      setTimeout(() => {
        this.setState({
          visitorValidationModalVisible: true
        });
        this.props.updateValidationStaus(false);
      }, 800);
    }

    if (this.props.type !== 'delivery') {
      throw new Error('This Error No Display');
    }
  };
  // 俄罗斯地址校验flag，控制按钮是否可用
  getRussiaAddressValidFlag = (flag) => {
    this.setState({
      russiaAddressValidFlag: flag
    });
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
      btnLoading: true
    });
    if (selectVisitorValidationOption == 'suggestedAddress') {
      form.address1 = validationAddress.address1;
      form.city = validationAddress.city;
      form.postCode = validationAddress.postalCode;

      form.province = validationAddress.provinceCode;
      form.provinceId =
        validationAddress.provinceId && validationAddress.provinceId != null
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
        btnLoading: false
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
    this.setState({
      visitorValidationModalVisible: false,
      btnLoading: false
    });
    this.props.updateValidationStaus(false);
    this.props.updateData(form);
  }

  render() {
    const { panelStatus } = this;

    const { showConfirmBtn } = this.props;
    const {
      form,
      isValid,
      visitorValidationLoading,
      visitorValidationModalVisible,
      selectVisitorValidationOption
    } = this.state;

    const _editForm = (
      <EditForm
        type="delivery"
        initData={form}
        isLogin={false}
        updateData={this.handleEditFormChange}
        getRussiaAddressValidFlag={this.getRussiaAddressValidFlag}
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
                    className="rc-btn rc-btn--one rc-btn--sm"
                    onClick={this.handleClickConfirm}
                    disabled={!isValid && !this.state.russiaAddressValidFlag}
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
            btnLoading={this.state.btnLoading}
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
