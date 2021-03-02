import React from 'react';
import { FormattedMessage } from 'react-intl';
import { inject, observer } from 'mobx-react';
import CardList from './list';
import { scrollPaymentPanelIntoView } from '../modules/utils';

@inject('paymentStore')
@observer
class AdyenCreditCard extends React.Component {
  static defaultProps = {
    subBuyWay: '', // once/frequence
    billingJSX: null,
    updateFormValidStatus: () => {}
  };
  constructor(props) {
    super(props);
    this.state = {
      adyenPayParam: null,
      errorMsg: ''
    };
    this.cardListRef = React.createRef();
  }
  updateSelectedCardInfo = (data) => {
    this.setState({ adyenPayParam: data });
    this.props.updateAdyenPayParam(data);
  };
  showErrorMsg = (msg) => {
    scrollPaymentPanelIntoView();
    this.setState({
      errorMsg: msg
    });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({ errorMsg: '' });
    }, 3000);
  };
  render() {
    const { subBuyWay, paymentStore } = this.props;
    const { errorMsg } = this.state;
    const _errJSX = (
      <div
        className={`js-errorAlertProfile-personalInfo rc-margin-bottom--xs ${
          errorMsg ? '' : 'hidden'
        }`}
      >
        <aside
          className="rc-alert rc-alert--error rc-alert--with-close errorAccount"
          role="alert"
        >
          <span className="pl-0">{errorMsg}</span>
          <button
            className="rc-btn rc-alert__close rc-icon rc-close-error--xs"
            onClick={(e) => {
              e.preventDefault();
              this.setState({ errorMsg: '' });
            }}
            aria-label="Close"
          >
            <span className="rc-screen-reader-text">
              <FormattedMessage id="close" />
            </span>
          </button>
        </aside>
      </div>
    );

    return (
      <>
        {_errJSX}
        <CardList
          ref={this.cardListRef}
          updateSelectedCardInfo={this.updateSelectedCardInfo}
          showErrorMsg={this.showErrorMsg}
          subBuyWay={subBuyWay}
          paymentStore={paymentStore}
          billingJSX={this.props.billingJSX}
          updateFormValidStatus={this.props.updateFormValidStatus}
        />
      </>
    );
  }
}

export default AdyenCreditCard;
