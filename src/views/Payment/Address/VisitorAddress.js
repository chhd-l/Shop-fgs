import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import EditForm from './EditForm';
import { ADDRESS_RULE } from '@/utils/constant';
import { find } from 'lodash';
import { getDictionary, validData } from '@/utils/utils';
import { searchNextConfirmPanel } from '../modules/utils';
import SameAsCheckbox from './SameAsCheckbox';

/**
 * delivery/billing adress module - visitor
 */
@inject('paymentStore')
@injectIntl
@observer
class VisitorAddress extends React.Component {
  static defaultProps = {
    type: 'delivery',
    isOnepageCheckout: false,
    updateSameAsCheckBoxVal: () => {}
  };
  constructor(props) {
    super(props);
    this.state = {
      isValid: false,
      form: null,
      countryList: [],
      billingChecked: true
    };
  }
  componentDidMount() {
    getDictionary({ type: 'country' }).then((res) => {
      this.setState({
        countryList: res
      });
    });
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
  handleEditFormChange = async (data) => {
    if (this.props.isOnepageCheckout) {
      try {
        await validData(ADDRESS_RULE, data);
        this.setState({ isValid: true, form: data });
      } catch (err) {
        this.setState({ isValid: false });
        console.log(err);
      }
    } else {
      this.props.updateData(data);
    }
  };
  handleClickConfirm = () => {
    if (!this.state.isValid) {
      return false;
    }
    this.props.updateData(this.state.form);

    const { paymentStore } = this.props;
    paymentStore.setStsToCompleted({ key: this.curPanelKey });
    if (this.state.billingChecked) {
      paymentStore.setStsToCompleted({ key: 'billingAddr' });
    }

    // 下一个最近的未complete的panel
    const nextConfirmPanel = searchNextConfirmPanel({
      list: toJS(paymentStore.panelStatus),
      curKey: this.curPanelKey
    });
    paymentStore.setStsToEdit({ key: nextConfirmPanel.key });
  };
  handleClickEdit = () => {
    this.props.paymentStore.setStsToEdit({ key: this.curPanelKey });
  };
  matchNamefromDict = (dictList, id) => {
    return find(dictList, (ele) => ele.id == id)
      ? find(dictList, (ele) => ele.id == id).name
      : id;
  };
  updateSameAsCheckBoxVal = (val) => {
    // todo
    // 切换时，当delivery已完成时，需更改 billing module的isPrepared = false, isEdit = true
    if (!val && this.panelStatus.isCompleted) {
      this.props.paymentStore.setStsToEdit({ key: 'billingAddr' });
    }
    this.setState({ billingChecked: val });
    this.props.updateSameAsCheckBoxVal(val);
  };
  _titleJSX = ({ redColor = false } = {}) => {
    return this.props.type === 'delivery' ? (
      <>
        <i
          className={`rc-icon rc-home--xs ${
            redColor ? 'rc-brand1' : 'rc-iconography'
          }`}
        />{' '}
        <FormattedMessage id="payment.deliveryTitle" />
      </>
    ) : (
      <>
        <i
          className={`rc-icon rc-news--xs ${
            redColor ? 'rc-brand1' : 'rc-iconography'
          }`}
        />{' '}
        <FormattedMessage id="payment.billTitle" />
      </>
    );
  };
  _titleJSXForPrepare = () => {
    return (
      <>
        <h5 className={`pull-left`}>{this._titleJSX()}</h5>
      </>
    );
  };
  _titleJSXForEdit = () => {
    return (
      <>
        <h5 className={`pull-left red`}>
          {this._titleJSX({ redColor: true })}
        </h5>
      </>
    );
  };
  _titleJSXForCompeleted = () => {
    return (
      <>
        <h5 className={`pull-left`}>
          {this._titleJSX()}
          <span className="iconfont font-weight-bold green ml-2">&#xe68c;</span>
        </h5>
        <p
          onClick={this.handleClickEdit}
          className="rc-styled-link rc-margin-top--xs pull-right m-0"
        >
          <FormattedMessage id="edit" />
        </p>
      </>
    );
  };
  render() {
    const { form } = this.state;
    const _editForm = (
      <EditForm type="delivery" updateData={this.handleEditFormChange} />
    );
    const _sameAsCheckbox = this.props.type === 'delivery' && (
      <SameAsCheckbox updateSameAsCheckBoxVal={this.updateSameAsCheckBoxVal} />
    );
    return (
      <>
        <div className="card-header bg-transparent">
          {this.panelStatus.isPrepare && this._titleJSXForPrepare()}
          {this.panelStatus.isEdit && this._titleJSXForEdit()}
          {this.panelStatus.isCompleted && this._titleJSXForCompeleted()}
        </div>

        {this.props.isOnepageCheckout && !this.panelStatus.isPrepare ? (
          <>
            {this.panelStatus.isEdit ? (
              <fieldset className="shipping-address-block rc-fieldset">
                {_editForm}
                <div className="d-flex justify-content-end mb-2">
                  <button
                    className="rc-btn rc-btn--one rc-btn--sm"
                    onClick={this.handleClickConfirm}
                    disabled={!this.state.isValid}
                  >
                    <FormattedMessage id="clinic.confirm" />
                  </button>
                </div>
              </fieldset>
            ) : (
              <div>
                <span className="medium">
                  {form.firstName + ' ' + form.lastName}
                </span>
                <br />
                {form.postCode}, {form.phoneNumber}
                <br />
                {this.matchNamefromDict(
                  this.state.countryList,
                  form.country
                )}{' '}
                {form.cityName}
                <br />
                {form.address1}
                <br />
                {form.address2}
                {form.address2 ? <br /> : null}
                {form.rfc}
              </div>
            )}
            {_sameAsCheckbox}
          </>
        ) : null}
        {!this.props.isOnepageCheckout && (
          <>
            {_editForm}
            {_sameAsCheckbox}
          </>
        )}
      </>
    );
  }
}
export default VisitorAddress;
