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
      loading: false,
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
      modalVisible: false,
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
      this.setState({ isValid: false }, () => {
        this.props.updateFormValidStatus(this.state.isValid);
      });
    }
  };
  handleEditFormChange = (data) => {
    this.validData({ data });
  };
  // 游客确认 Delivery address
  handleClickConfirm = () => {
    const { paymentStore } = this.props;
    const { isValid, form, billingChecked } = this.state;
    const isDeliveryAddr = this.curPanelKey === 'deliveryAddr';

    if (!isValid) {
      return false;
    }
    this.setState({
      loading: true
    });

    if (process.env.REACT_APP_LANG == 'en') {
      // 地址验证
      this.toAddressValidation();
    } else {
      this.setState({
        modalVisible: false
      });

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
  // 地址验证
  toAddressValidation = async () => {
    const { form } = this.state;
    try {
      let data = {
        city: form.cityName,
        countryId: Number(form.country),
        deliveryAddress: form.address1,
        postCode: form.postCode,
        province: form.provinceName,
        storeId: Number(process.env.REACT_APP_STOREID),
      };

      let res = await addressValidation(data);
      if (res.context.suggestionAddress) {
        this.setState({
          validationAddress: res.context.suggestionAddress,
          loading: false
        });
      }
      this.setState({
        modalVisible: true
      });
    } catch (err) {
      console.log(err);
    }
  };
  // 选择地址
  chooseValidationAddress = (e) => {
    this.setState({
      selectValidationOption: e.target.value
    });
  };
  // 确认选择地址,切换到下一个最近的未complete的panel
  confirmValidationAddress(e) {
    const { paymentStore } = this.props;
    const { form, selectValidationOption, validationAddress, billingChecked } = this.state;
    const isDeliveryAddr = this.curPanelKey === 'deliveryAddr';

    if (selectValidationOption == 'suggestedAddress') {
      form.address1 = validationAddress.address1;
      form.address2 = validationAddress.address2;
      form.city = validationAddress.city;
      form.cityName = validationAddress.city;
      form.provinceName = validationAddress.provinceCode;
    }

    this.setState({
      modalVisible: false
    });

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
    const { loading, form, isValid, validationAddress, modalVisible, selectValidationOption } = this.state;

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

        {loading ?
          <Loading positionFixed="true" /> :
          <ValidationAddressModal
            modalVisible={modalVisible}
            address={form}
            validationAddress={validationAddress}
            selectValidationOption={selectValidationOption}
            handleChooseValidationAddress={(e) => this.chooseValidationAddress(e)}
            hanldeClickConfirm={() => this.confirmValidationAddress()}
            close={() => {
              this.setState({
                modalVisible: false
              });
            }}
          />
        }

      </>
    );
  }
}
export default VisitorAddress;
