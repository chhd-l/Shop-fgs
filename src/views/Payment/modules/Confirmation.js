import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { formatMoney } from '@/utils/utils';
import { inject, observer } from 'mobx-react';
import TermsCommon from '../Terms/common';

@inject('paymentStore')
@injectIntl
@observer
class Confirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requiredList: [],
      isValid: false
    };
  }
  componentDidMount() {
    this.validData();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.checkRequiredItem(nextProps.listData);
  }
  get panelStatus() {
    return this.props.paymentStore.confirmationPanelStatus;
  }
  //是否consent必填项勾选
  isConsentRequiredChecked() {
    const { requiredList } = this.state;
    let isAllChecked =
      !requiredList.length || requiredList.every((item) => item.isChecked);
    if (!isAllChecked) {
      throw new Error(this.props.intl.messages.CompleteRequiredItems);
    }
  }
  checkRequiredItem = async (list) => {
    let requiredList = list.filter((item) => item.isRequired);
    this.setState({
      requiredList
    });
    try {
      await this.isConsentRequiredChecked();
      this.setState({ isValid: true });
    } catch (err) {
      //console.log(err);
      this.setState({ isValid: false });
    }
  };
  validData = async () => {
    try {
      await this.isConsentRequiredChecked();
      this.setState({
        isValid: true
      });
    } catch (err) {
      console.log(err);
      this.setState({
        isValid: false
      });
    }
  };
  clickPay = () => {
    if (!this.state.isValid) {
      return false;
    }
    this.props.clickPay();
  };
  render() {
    const { panelStatus } = this;
    const { checkoutStore } = this.props;
    const { tradePrice } = checkoutStore;
    const { isValid } = this.state;
    const titleJSXForPrepare = (
      <h5 className={`mb-0`}>
        <em
          className="iconfont font-weight-bold ml-1"
          style={{ marginRight: '.7rem' }}
        >
          &#xe68c;
        </em>{' '}
        <FormattedMessage id="confirmation" />
      </h5>
    );
    const titleJSXForEdit = (
      <h5 className={`mb-0 red`}>
        <em
          className="iconfont font-weight-bold ml-1"
          style={{ marginRight: '.7rem' }}
        >
          &#xe68c;
        </em>{' '}
        <FormattedMessage id="confirmation" />
      </h5>
    );
    const _title = panelStatus.isPrepare
      ? titleJSXForPrepare
      : panelStatus.isEdit
      ? titleJSXForEdit
      : null;
    return (
      <>
        <div
          id="J_checkout_panel_confirmation"
          className={`card-panel checkout--padding rc-bg-colour--brand3 rounded border ${
            panelStatus.isEdit ? 'border-333' : 'border-transparent'
          }`}
        >
          <div className="bg-transparent d-flex justify-content-between align-items-center">
            {_title}
          </div>
          <div className={`pt-3 ${!panelStatus.isPrepare ? '' : 'hidden'}`}>
            {/* 条款 */}
            <TermsCommon
              id={'confirmation'}
              listData={this.props.listData}
              updateValidStatus={(val) => {
                this.setState({ isValid: val });
              }}
            />

            <div className="text-right">
              <button
                className={`rc-btn rc-btn--one submit-payment`}
                type="submit"
                name="submit"
                value="submit-shipping"
                disabled={!isValid}
                onClick={this.clickPay}
              >
                <FormattedMessage id="payment.further" />{' '}
                {formatMoney(tradePrice)}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Confirmation;
