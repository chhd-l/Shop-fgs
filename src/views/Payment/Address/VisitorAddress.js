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
@inject('paymentStore')
// @injectIntl
@observer
class VisitorAddress extends React.Component {
  static defaultProps = {
    type: 'delivery',
    isDeliveryOrBilling: 'delivery',
    initData: null,
    titleVisible: true,
    showConfirmBtn: true,
    updateFormValidStatus: () => {}
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
      validationLoading: false, // 地址校验loading
      validationModalVisible: false, // 地址校验查询开关
      selectValidationOption: 'suggestedAddress',
      btnLoading: false
    };
    this.confirmValidationAddress = this.confirmValidationAddress.bind(this);
  }
  componentDidMount() {
    this.validData({
      data: this.state.form,
      validationModalVisible: false
    });
    console.log(
      ' 61   VisitorAddress validationModalVisible: ',
      this.state.validationModalVisible
    );
  }
  //props发生变化时触发
  componentWillReceiveProps(props) {
    console.log(props);
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
      if (process.env.REACT_APP_LANG == 'ru' && data?.DaData != null) {
        let dda = data.DaData;
        // 计算运费
        let ddres = await shippingCalculation({
          sourceRegionFias: '0c5b2444-70a0-4932-980c-b4dc0d3f02b5',
          sourceAreaFias: null,
          sourceCityFias: '0c5b2444-70a0-4932-980c-b4dc0d3f02b5',
          sourceSettlementFias: null,
          sourcePostalCode: null,
          regionFias: dda.provinceId,
          areaFias: dda.areaId,
          cityFias: dda.cityId,
          settlementFias: dda.settlementId,
          postalCode: dda.postCode,
          weight: '1',
          insuranceSum: 0,
          codSum: 0,
          dimensions: {
            height: '1',
            width: '1',
            depth: '1'
          }
        });
        data.calculation = ddres?.context?.tariffs[0];
        console.log('---------- ★★★★★★ 计算运费： ', data.calculation);
        if (!data.calculation) {
          return;
        }
      }
      if (!data?.formRule || (data?.formRule).length <= 0) {
        return;
      }
      await validData(data.formRule, data); // 数据验证
      this.setState({ isValid: true, form: data }, () => {
        this.props.updateFormValidStatus(this.state.isValid);
      });
    } catch (err) {
      console.error(' err msg: ', err);
      this.setState({ isValid: false, validationLoading: false }, () => {
        this.props.updateFormValidStatus(this.state.isValid);
      });
    }
  };
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
    // validationModalVisible - 控制是否查询数据
    this.setState({
      validationLoading: true
    });
    setTimeout(() => {
      this.setState({
        validationModalVisible: true
      });
    }, 800);

    console.log(
      '------------------ 游客确认 VisitorAddress Delivery address:  ',
      this.state.validationModalVisible
    );
    if (this.props.type !== 'delivery') {
      throw new Error('VisitorAddress Delivery address ');
    }
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
        <i
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
        <i
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
    const { form, selectValidationOption, validationAddress } = this.state;
    let oldForm = JSON.parse(JSON.stringify(form));
    this.setState({
      btnLoading: true
    });
    if (selectValidationOption == 'suggestedAddress') {
      form.address1 = validationAddress.address1;
      form.address2 = validationAddress.address2;
      form.city = validationAddress.city;

      form.province = validationAddress.provinceCode;
      form.provinceId =
        validationAddress.provinceId && validationAddress.provinceId != null
          ? validationAddress.provinceId
          : form.provinceId;
    } else {
      this.setState({
        form: JSON.parse(JSON.stringify(oldForm))
      });
    }

    // payment 时提交 billing address
    if (this.props.isDeliveryOrBilling == 'billing') {
      // billing
      this.props.setPaymentToCompleted();
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
        validationModalVisible: false,
        btnLoading: false
      },
      () => {
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

  render() {
    const { panelStatus } = this;

    const { showConfirmBtn } = this.props;
    const {
      form,
      isValid,
      validationLoading,
      validationModalVisible,
      selectValidationOption
    } = this.state;

    const _editForm = (
      <EditForm
        type="delivery"
        initData={form}
        isLogin={false}
        updateData={this.handleEditFormChange}
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
                    disabled={!isValid}
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

        {validationLoading && <Loading positionFixed="true" />}
        {validationModalVisible && (
          <ValidationAddressModal
            btnLoading={this.state.btnLoading}
            address={form}
            updateValidationData={(res) => this.getValidationData(res)}
            selectValidationOption={selectValidationOption}
            handleChooseValidationAddress={(e) =>
              this.chooseValidationAddress(e)
            }
            hanldeClickConfirm={() => this.confirmValidationAddress()}
            validationModalVisible={validationModalVisible}
            close={() => {
              this.setState({
                validationModalVisible: false,
                validationLoading: false
              });
            }}
          />
        )}
      </>
    );
  }
}
export default VisitorAddress;
