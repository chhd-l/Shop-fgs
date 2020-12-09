import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import EditForm from './EditForm';
import { ADDRESS_RULE } from '@/utils/constant';
import { getDictionary, validData } from '@/utils/utils';
import { searchNextConfirmPanel } from '../modules/utils';
import SameAsCheckbox from './SameAsCheckbox';
import './VisitorAddress.css';

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
    updateSameAsCheckBoxVal: () => {},
    initData: null,
    titleVisible: true
  };
  constructor(props) {
    super(props);
    this.state = {
      isValid: false,
      form: this.props.initData,
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
      this.setState({ form: data });
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
    if (this.curPanelKey === 'deliveryAddr' && this.state.billingChecked) {
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
    return dictList.filter((ele) => ele.id + '' === id).length
      ? dictList.filter((ele) => ele.id + '' === id)[0].name
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
  titleJSX = ({ redColor = false } = {}) => {
    return this.props.type === 'delivery' ? (
      <>
        <i
          className={`qhx 11 rc-icon rc-health--xs ${
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
    const { isOnepageCheckout } = this.props;
    const { form, isValid } = this.state;
    const _editForm = (
      <EditForm
        type="delivery"
        initData={form}
        isLogin={false}
        isOnepageCheckout={isOnepageCheckout}
        updateData={this.handleEditFormChange}
      />
    );
    const _sameAsCheckbox = this.props.type === 'delivery' && (
      <SameAsCheckbox updateSameAsCheckBoxVal={this.updateSameAsCheckBoxVal} />
    );
    return (
      <>
        {this.props.titleVisible && (
          <div className="bg-transparent d-flex justify-content-between align-items-center">
            {this.panelStatus.isPrepare && this.titleJSXForPrepare()}
            {this.panelStatus.isEdit && this.titleJSXForEdit()}
            {this.panelStatus.isCompleted && this.titleJSXForCompeleted()}
          </div>
        )}

        {isOnepageCheckout && !this.panelStatus.isPrepare ? (
          <>
            {this.panelStatus.isEdit ? (
              <fieldset className="shipping-address-block rc-fieldset">
                {_editForm}
                <div className="d-flex justify-content-end mb-2">
                  <button
                    className="rc-btn rc-btn--one rc-btn--sm"
                    onClick={this.handleClickConfirm}
                    disabled={!isValid}
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
            {/* {_sameAsCheckbox} */}
          </>
        ) : null}
        {!isOnepageCheckout && (
          <>
            {_editForm}
            {/* {_sameAsCheckbox} */}
          </>
        )}
      </>
    );
  }
}
export default VisitorAddress;
