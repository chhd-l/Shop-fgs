import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import TermsCommon from '../Terms/common';

@inject('paymentStore')
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
  componentWillReceiveProps(nextProps) {
    this.checkRequiredItem(nextProps.listData);
  }
  get panelStatus() {
    return this.props.paymentStore.panelStatus.confirmation;
  }
  //是否consent必填项勾选
  isConsentRequiredChecked() {
    let isAllChecked = this.state.requiredList.every((item) => item.isChecked);
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
      this.setState({ isValid: false });
    }
  };
  validData = () => {
    this.setState({
      isValid: this.state.terms.filter((n) => !n.isRead).length === 0
    });
  };
  clickPay = () => {
    if (!this.state.isValid) {
      return false;
    }
    this.props.clickPay();
  };
  render() {
    return (
      <>
        <div class="card-panel checkout--padding rc-bg-colour--brand3 rounded">
          <div className="card-header bg-transparent pt-0 pb-0">
            <h5
              className={`pull-left mb-0 ${
                this.panelStatus.isEdit ? 'red' : ''
              }`}
            >
              <em className="iconfont font-weight-bold">&#xe68c;</em>{' '}
              <FormattedMessage id="confirmation" />
            </h5>
          </div>
          {!this.panelStatus.isPrepare && (
            <div className="pt-3">
              {/* 条款 */}
              <TermsCommon
                id={'confirmation'}
                listData={this.props.listData}
                checkRequiredItem={this.checkRequiredItem}
              />

              <div className="next-step-button">
                <div className="rc-text--right">
                  <button
                    className={`rc-btn rc-btn--one submit-payment`}
                    type="submit"
                    name="submit"
                    value="submit-shipping"
                    disabled={!this.state.isValid}
                    onClick={this.clickPay}
                  >
                    <FormattedMessage id="payment.further" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default Confirmation;
