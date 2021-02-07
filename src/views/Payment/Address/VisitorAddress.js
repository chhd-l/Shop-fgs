import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import EditForm from './EditForm';
import { ADDRESS_RULE } from '@/utils/constant';
import { validData } from '@/utils/utils';
import {
  searchNextConfirmPanel,
  scrollPaymentPanelIntoView
} from '../modules/utils';
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
    updateFormValidStatus: () => {}
  };
  constructor(props) {
    super(props);
    this.state = {
      isValid: false,
      form: this.props.initData,
      billingChecked: true
    };
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
  handleClickConfirm = () => {
    const { paymentStore } = this.props;
    const { isValid, form, billingChecked } = this.state;
    const isDeliveryAddr = this.curPanelKey === 'deliveryAddr';
    if (!isValid) {
      return false;
    }
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
  render() {
    const { panelStatus } = this;

    const { showConfirmBtn } = this.props;
    const { form, isValid } = this.state;

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
          <>
            {panelStatus.isEdit ? (
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
            ) : form ? (
              <AddressPreview form={form} />
            ) : null}
          </>
        ) : null}
      </>
    );
  }
}
export default VisitorAddress;
