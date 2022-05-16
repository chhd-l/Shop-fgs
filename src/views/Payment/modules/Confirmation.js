import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import { formatMoney } from '@/utils/utils';
import { inject, observer } from 'mobx-react';
import TermsCommon from '../Terms/common';
import { PanelContainer } from '../Common';

const sessionItemRoyal = window.__.sessionItemRoyal;

function JpConfirmationText() {
  return (
    <>
      <p>
        <span className="border-b border-gray-600">
          ご注文のキャンセルについて
        </span>
      </p>
      <p>
        ご注文後30分間、マイページで注文をキャンセルいただくことが可能です。
      </p>
      <p>
        出荷準備に入ったご注文をキャンセルすることはできませんので、今一度ご注文内容をご確認お願いいたします。
      </p>
      <p>
        定期購入の今後の出荷予定の変更やキャンセルは、マイページの定期購入履歴から行ってください。
      </p>
      <p className="mt-2">
        <span className="border-b border-gray-600">返品・交換について</span>
      </p>
      <p>
        返品・交換については、こちら[リンク: FAQ
        返品・交換について]をご確認ください。
      </p>
      <p className="mt-2">
        <span className="border-b border-gray-600">定期購入について</span>
      </p>
      <p className="mb-4">
        定期購入の製品は、お客様からのキャンセルがない限り、設定いただいた周期でご注文が自動的に生成されます。発送はご注文生成後、1営業日以内となります。
      </p>
    </>
  );
}

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
    const {
      tradePrice,
      paymentStore: { curPayWayInfo }
    } = this.props;
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
            {window.__.env.REACT_APP_COUNTRY === 'jp' ? (
              <JpConfirmationText />
            ) : null}
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
                    curPayWayInfo?.code === 'cod'
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
