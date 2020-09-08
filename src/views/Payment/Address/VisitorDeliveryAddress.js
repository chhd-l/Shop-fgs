import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { inject, observer } from 'mobx-react';
import EditForm from './EditForm';
import { ADDRESS_RULE } from '@/utils/constant';
import { find } from 'lodash';
import { getDictionary } from '@/utils/utils';
import SameAsCheckbox from './SameAsCheckbox';

/**
 * delivery adress module - visitor
 */
@inject('paymentStore')
@injectIntl
@observer
class VisitorDeliveryAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: false,
      form: null,
      isEdit: true,
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
  handleEditFormChange = async (data) => {
    try {
      await this.validInputsData(data);
      this.setState({ isValid: true, form: data });
    } catch (err) {
      console.log(err);
    }
  };
  handleClickConfirm = () => {
    if (!this.state.isValid) {
      return false;
    }
    this.setState({ isEdit: false });
    this.props.updateData(this.state.form);
    this.props.paymentStore.updateCurrentProgressIndex(
      this.state.billingChecked ? 3 : 2
    );
  };
  async validInputsData(data) {
    for (let key in data) {
      const val = data[key];
      const targetRule = find(ADDRESS_RULE, (ele) => ele.key === key);
      if (targetRule) {
        if (targetRule.require && !val) {
          throw new Error(this.props.intl.messages.CompleteRequiredItems);
        }
        if (targetRule.regExp && !targetRule.regExp.test(val)) {
          throw new Error(
            key === 'email'
              ? this.props.intl.messages.EnterCorrectEmail
              : this.props.intl.messages.EnterCorrectPostCode
          );
        }
      }
    }
  }
  matchNamefromDict = (dictList, id) => {
    return find(dictList, (ele) => ele.id == id)
      ? find(dictList, (ele) => ele.id == id).name
      : id;
  };

  render() {
    const { isEdit, form } = this.state;
    return (
      <>
        <div className="card-header bg-transparent">
          <h5 className={`pull-left ${isEdit ? 'red' : ''}`}>
            <i
              className={`rc-icon rc-home--xs ${
                isEdit ? 'rc-brand1' : 'rc-iconography'
              }`}
            ></i>{' '}
            <FormattedMessage id="payment.deliveryTitle" />
            {!isEdit && (
              <span className="iconfont font-weight-bold green ml-2">
                &#xe68c;
              </span>
            )}
          </h5>
          {!isEdit && (
            <p
              onClick={() => {
                this.setState({ isEdit: true });
              }}
              className="rc-styled-link rc-margin-top--xs pull-right m-0"
            >
              <FormattedMessage id="edit" />
            </p>
          )}
        </div>
        {this.props.paymentStore.currentProgressIndex > 0 ? (
          <>
            {isEdit ? (
              <fieldset className="shipping-address-block rc-fieldset">
                <EditForm
                  type="delivery"
                  updateData={this.handleEditFormChange}
                />
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
            <SameAsCheckbox
              updateSameAsCheckBoxVal={(val) => {
                this.setState({ billingChecked: val });
                this.props.updateSameAsCheckBoxVal(val);
              }}
            />
          </>
        ) : null}
      </>
    );
  }
}
export default VisitorDeliveryAddress;
