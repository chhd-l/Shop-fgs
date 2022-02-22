import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import { formatMoney } from '@/utils/utils';
import { inject, observer } from 'mobx-react';
import TermsCommon from '../Terms/common';
import { PanelContainer } from '../Common';

const sessionItemRoyal = window.__.sessionItemRoyal;

@inject('paymentStore')
@injectIntl
@observer
class Confirmation extends React.Component {
  static defaultProps = {
    paymentTypeVal: ''
  };
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
    let requiredList = list?.filter((item) => item.isRequired);
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
    const { tradePrice } = this.props;
    const { isValid } = this.state;

    return (
      <>
        <PanelContainer
          panelStatus={panelStatus}
          containerConf={{
            id: 'J_checkout_panel_confirmation'
          }}
          titleConf={{
            icon: {
              defaultIcon: (
                <em
                  className="iconfont font-weight-bold ml-1"
                  style={{ marginRight: '.7rem' }}
                >
                  &#xe68c;
                </em>
              ),
              highlighIcon: (
                <em
                  className="iconfont font-weight-bold ml-1"
                  style={{ marginRight: '.7rem' }}
                >
                  &#xe68c;
                </em>
              )
            },
            text: {
              title: <FormattedMessage id="confirmation" />
            }
          }}
        >
          <div className={`pt-3 ${!panelStatus.isPrepare ? '' : 'hidden'}`}>
            {/* 条款 */}
            <TermsCommon
              id={'confirmation'}
              listData={this.props.listData}
              updateValidStatus={(val) => {
                this.setState({ isValid: val });
              }}
            />
            {/* <ConsentAdditionalText textPosition="bottom" /> */}

            {/*feline change appointment 下单提示*/}
            {sessionItemRoyal.get('isChangeAppoint') && (
              <div className="text-rc-red ml-6">
                <FormattedMessage id="appointment.changeApptCheckout.tip" />
              </div>
            )}

            <div className="text-right">
              <button
                className={`rc-btn rc-btn--one submit-payment`}
                type="submit"
                name="submit"
                value="submit-shipping"
                disabled={!isValid}
                onClick={this.clickPay}
              >
                <FormattedMessage
                  id={
                    this.props.paymentTypeVal == 'cod'
                      ? 'payment.further2'
                      : 'payment.further'
                  }
                />{' '}
                {formatMoney(tradePrice)}
              </button>
            </div>

            {this.props.intl.messages.securePaymentProcessing && (
              <div className="rc-text--right">
                {}
                <p className="rc-meta d-flex d-md-block align-items-center rc-margin-bottom--none ">
                  <span className="rc-icon rc-lock--xs rc-iconography--xs" />
                  <span className="rc-margin-left--xs">
                    <FormattedMessage id="securePaymentProcessing" />
                  </span>
                </p>
              </div>
            )}
          </div>
        </PanelContainer>
      </>
    );
  }
}

export default Confirmation;
