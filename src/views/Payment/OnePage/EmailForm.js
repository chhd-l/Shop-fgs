import React from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import { FormattedMessage, injectIntl } from 'react-intl';
import { searchNextConfirmPanel, isPrevReady } from '../modules/utils';
import { EMAIL_REGEXP } from '@/utils/constant';
import { checkoutDataLayerPushEvent } from '@/utils/GA';

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

    const titleForPrepare = (
      <>
        <h5 className={`mb-0 text-xl`}>
          <em
            className={`rc-icon d-inline-block rc-email--xs rc-margin-right--xs rc-iconography`}
          />{' '}
          <FormattedMessage id="account.Email" />
        </h5>
      </>
    );

    const titleForEdit = (
      <>
        <h5 className={`mb-0 red text-xl`}>
          <em
            className={`rc-icon d-inline-block rc-email--xs rc-margin-right--xs rc-brand1`}
          />{' '}
          <FormattedMessage id="account.Email" />
        </h5>
      </>
    );

    const titleForCompleted = (
      <>
        <h5 className={`mb-0 text-xl`}>
          <em
            className={`rc-icon d-inline-block rc-email--xs rc-margin-right--xs rc-iconography`}
          />{' '}
          <FormattedMessage id="account.Email" />
          <span className="iconfont font-weight-bold green ml-2">&#xe68c;</span>
        </h5>
        <p
          onClick={this.handleClickEdit}
          className="rc-styled-link mb-1"
          style={{ cursor: 'pointer' }}
        >
          <FormattedMessage id="edit" />
        </p>
      </>
    );

    const _title = emailPanelStatus.isPrepare
      ? titleForPrepare
      : emailPanelStatus.isEdit
      ? titleForEdit
      : emailPanelStatus.isCompleted
      ? titleForCompleted
      : null;

    return this.isLogin ? null : (
      <div
        className={`card-panel checkout--padding rc-bg-colour--brand3 rounded mb-3 border ${
          emailPanelStatus.isEdit ? 'border-333' : 'border-transparent'
        }`}
      >
        <div className="bg-transparent d-flex justify-content-between align-items-center">
          {_title}
        </div>
        {emailPanelStatus.isPrepare ? null : emailPanelStatus.isEdit ? (
          <div className="rc-margin-left--none rc-padding-left--none rc-margin-left--xs rc-padding-left--xs">
            <div className="d-flex align-items-center justify-content-between">
              <div
                className="flex-fill rc-input rc-input--full-width rc-margin-y--xs searchSelection"
                input-setup="true"
              >
                <input
                  type="text"
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
        ) : emailPanelStatus.isCompleted ? (
          <div>{this.props.currentEmailVal}</div>
        ) : null}
      </div>
    );
  }
}

export default EmailForm;
