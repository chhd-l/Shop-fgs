import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import Loading from '@/components/Loading';
import ValidationAddressModal from '@/components/validationAddressModal';
import EditForm from './EditForm';
import { ADDRESS_RULE } from '@/utils/constant';
import { validData } from '@/utils/utils';
import {
  searchNextConfirmPanel,
  scrollPaymentPanelIntoView
} from '../modules/utils';
import { addressValidation } from '@/api/index';
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
    initData: null,
    titleVisible: true,
    showConfirmBtn: true,
    updateFormValidStatus: () => { }
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
      selectValidationOption: 'suggestedAddress'
    };
    this.confirmValidationAddress = this.confirmValidationAddress.bind(this);
  }
  componentDidMount() {
    this.validData({ data: this.state.form });
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
      await validData(ADDRESS_RULE, data);
      this.setState({ isValid: true, form: data }, () => {
        this.props.updateFormValidStatus(this.state.isValid);
      });
    } catch (err) {
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
      validationModalVisible: true,
      validationLoading: true
    });
  };
  // 不进行地址验证，进入下一步
  handleNextPanel = () => {
    const { paymentStore } = this.props;
    const { form, billingChecked } = this.state;
    const isDeliveryAddr = this.curPanelKey === 'deliveryAddr';

    this.props.updateData(form);

    paymentStore.setStsToCompleted({ key: this.curPanelKey });
    if (isDeliveryAddr) {
      billingChecked && paymentStore.setStsToCompleted({ key: 'billingAddr' });
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
          className={`rc-icon rc-indoors--xs rc-margin-right--xs ${redColor ? 'rc-brand1' : 'rc-iconography'
            }`}
        />{' '}
        <span>
          <FormattedMessage id="payment.deliveryTitle" />
        </span>
      </>
    ) : (
        <>
          <i
            className={`rc-icon rc-news--xs ${redColor ? 'rc-brand1' : 'rc-iconography'
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
  }
  // 确认选择地址,切换到下一个最近的未complete的panel
  confirmValidationAddress(e) {
    const { form, selectValidationOption, validationAddress } = this.state;
    if (selectValidationOption == 'suggestedAddress') {
      form.address1 = validationAddress.address1;
      form.address2 = validationAddress.address2;
      form.city = validationAddress.city;
      form.cityName = validationAddress.city;
      if (process.env.REACT_APP_LANG === 'en') {
        form.provinceName = validationAddress.provinceCode;
      }
    }
    this.setState({
      validationModalVisible: false
    });
    // 进入下一步
    this.showNextPanel();
  }
  // 下一个最近的未complete的panel
  showNextPanel=()=>{
    const { paymentStore } = this.props;
    const { billingChecked } = this.state;
    const isDeliveryAddr = this.curPanelKey === 'deliveryAddr';
    this.props.updateData(form);

    paymentStore.setStsToCompleted({ key: this.curPanelKey });
    if (isDeliveryAddr) {
      billingChecked && paymentStore.setStsToCompleted({ key: 'billingAddr' });
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

  render() {
    const { panelStatus } = this;

    const { showConfirmBtn } = this.props;
    const { form, isValid,
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
                    <FormattedMessage id="clinic.confirm" />
                  </button>
                </div>
              )}
            </fieldset>
          ) : panelStatus.isCompleted ? (
            <AddressPreview form={form} />
          ) : null
        ) : null}

        {validationLoading && <Loading positionFixed="true" />}
        {validationModalVisible && <ValidationAddressModal
          address={form}
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

      </>
    );
  }
}
export default VisitorAddress;
