import React from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import { searchNextConfirmPanel, isPrevReady } from '../modules/utils';
import { EMAIL_REGEXP } from '@/utils/constant';
import { checkoutDataLayerPushEvent } from '@/utils/GA';
import { PanelContainer } from '../Common';

const sessionItemRoyal = window.__.sessionItemRoyal;

@inject('paymentStore', 'loginStore')
@injectIntl
@observer
class EmailForm extends React.Component {
  static defaultProps = {
    currentEmailVal: ''
  };
  constructor(props) {
    super(props);
    this.state = {
      form: {
        email: ''
      },
      isValid: false
    };
  }
  // 游客才显示Email panel -> 置为edit状态
  // 会员不显示Email panel -> 置为complete状态
  componentDidMount() {
    const { paymentStore } = this.props;
    const nextConfirmPanel = searchNextConfirmPanel({
      list: toJS(paymentStore.panelStatus),
      curKey: this.curKey
    });
    const isReadyPrev = isPrevReady({
      list: toJS(paymentStore.panelStatus),
      curKey: this.curKey
    });
    if (this.isLogin) {
      paymentStore.setStsToCompleted({ key: this.curKey, isFirstLoad: true });
      isReadyPrev && paymentStore.setStsToEdit({ key: nextConfirmPanel.key });
    } else {
      checkoutDataLayerPushEvent({ name: 'Email', options: 'Guest checkout' });
      isReadyPrev && paymentStore.setStsToEdit({ key: this.curKey });
    }
  }
  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  get curKey() {
    return 'email';
  }
  handleClickEdit = () => {
    this.props.paymentStore.setStsToEdit({
      key: this.curKey,
      hideOthers: true
    });
    this.setState({
      form: Object.assign(this.state.form, {
        email: this.props.currentEmailVal
      })
    });
  };
  handleClickConfirm = () => {
    const { form } = this.state;
    this.props.onChange(form);
    this.props.paymentStore.setDefaultCardDataFromAddr(form);
    this.confirmToNextPanel();
  };
  confirmToNextPanel() {
    const { paymentStore } = this.props;
    // 下一个最近的未complete的panel
    const nextConfirmPanel = searchNextConfirmPanel({
      list: toJS(paymentStore.panelStatus),
      curKey: this.curKey
    });

    paymentStore.setStsToCompleted({ key: this.curKey });
    paymentStore.setStsToEdit({ key: nextConfirmPanel.key });
  }
  handleInputChange = (e) => {
    let { form } = this.state;
    const target = e.target;
    form[target.name] = target.value;
    this.setState({ form }, () => {
      this.validData();
    });
  };
  validData = () => {
    const { form } = this.state;
    let tmpStatus = true;
    if (!EMAIL_REGEXP.test(form.email)) {
      tmpStatus = false;
    }
    this.setState({ isValid: tmpStatus });
  };
  render() {
    const { form, isValid } = this.state;
    const { intl, paymentStore } = this.props;
    const { emailPanelStatus } = paymentStore;

    return this.isLogin ? null : (
      <>
        <PanelContainer
          panelStatus={emailPanelStatus}
          titleConf={{
            icon: {
              defaultIcon: (
                <em
                  className={`rc-icon d-inline-block rc-email--xs rc-margin-right--xs rc-iconography`}
                />
              ),
              highlighIcon: (
                <em
                  className={`rc-icon d-inline-block rc-email--xs rc-margin-right--xs rc-brand1`}
                />
              )
            },
            text: {
              title: <FormattedMessage id="account.Email" />
            },
            onEdit: sessionItemRoyal.get('appointment-no')
              ? null
              : this.handleClickEdit
          }}
          previewJSX={<div>{this.props.currentEmailVal}</div>}
        >
          {emailPanelStatus.isEdit ? (
            <div className="rc-margin-left--none rc-padding-left--none rc-margin-left--xs rc-padding-left--xs">
              <div className="d-flex align-items-center justify-content-between">
                <div
                  className="flex-fill rc-input rc-input--full-width rc-margin-y--xs searchSelection"
                  input-setup="true"
                >
                  <input
                    type="text"
                    autocomplete="off"
                    placeholder={`${intl.messages.mailAddress}*`}
                    className="form-control"
                    value={form.email}
                    name="email"
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-end mt-3 rc_btn_email_form">
                <button
                  className="rc-btn rc-btn--one rc-btn--sm"
                  onClick={this.handleClickConfirm}
                  disabled={!isValid}
                >
                  <FormattedMessage id="clinic.confirm2" />
                </button>
              </div>
            </div>
          ) : null}
        </PanelContainer>
      </>
    );
  }
}

export default EmailForm;
