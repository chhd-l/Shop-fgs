import React from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import { FormattedMessage, injectIntl } from 'react-intl';
import { searchNextConfirmPanel } from '../modules/utils';
import { EMAIL_REGEXP } from '@/utils/constant';

@inject('paymentStore')
@injectIntl
@observer
class EmailForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        email: ''
      },
      isEdit: true,
      isValid: false
    };
  }
  componentDidMount() {
    // 根据上一个panel的状态决定是否本panel状态
    this.setState({
      isEdit: !this.props.paymentStore.emailPanelStatus.isPrepare
    });
  }
  handleClickEdit = () => {
    this.props.paymentStore.setStsToEdit({ key: 'email' });
  };
  handleClickConfirm = () => {
    this.confirmToNextPanel();
    this.setState({ isEdit: false });
    this.props.onChange(this.state.form);
  };
  confirmToNextPanel() {
    const { paymentStore } = this.props;
    // 下一个最近的未complete的panel
    const nextConfirmPanel = searchNextConfirmPanel({
      list: toJS(paymentStore.panelStatus),
      curKey: 'email'
    });

    paymentStore.setStsToCompleted({ key: 'email' });
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
    if (form.email && !EMAIL_REGEXP.test(form.email)) {
      tmpStatus = false;
    }
    this.setState({ isValid: tmpStatus });
  };
  render() {
    const { isEdit, form, isValid } = this.state;
    const { intl, paymentStore } = this.props;
    const { emailPanelStatus } = paymentStore;
    console.log(2323, toJS(paymentStore.emailPanelStatus));

    const titleForPrepare = (
      <>
        <h5 className={`mb-0`}>
          <i
            className={`rc-icon d-inline-block rc-email--xs rc-margin-right--xs rc-iconography`}
          />{' '}
          <FormattedMessage id="account.Email" />
        </h5>
      </>
    );

    const titleForEdit = (
      <>
        <h5 className={`mb-0 red`}>
          <i
            className={`rc-icon d-inline-block rc-email--xs rc-margin-right--xs rc-brand1`}
          />{' '}
          <FormattedMessage id="account.Email" />
        </h5>
      </>
    );

    const titleForCompleted = (
      <>
        <h5 className={`mb-0`}>
          <i
            className={`rc-icon d-inline-block rc-email--xs rc-margin-right--xs rc-iconography`}
          />{' '}
          <FormattedMessage id="account.Email" />
          <span className="iconfont font-weight-bold green ml-2">&#xe68c;</span>
        </h5>
        <p onClick={this.handleClickEdit} className="rc-styled-link mb-1">
          <FormattedMessage id="edit" />
        </p>
      </>
    );

    return (
      <div className="card-panel checkout--padding rc-bg-colour--brand3 rounded mb-3">
        <div className="bg-transparent d-flex justify-content-between align-items-center">
          {emailPanelStatus.isPrepare && titleForPrepare}
          {emailPanelStatus.isEdit && titleForEdit}
          {emailPanelStatus.isCompleted && titleForCompleted}
        </div>
        {emailPanelStatus.isEdit ? (
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

            <div className="d-flex justify-content-end mt-3">
              <button
                className="rc-btn rc-btn--one rc-btn--sm"
                onClick={this.handleClickConfirm}
                disabled={!isValid}
              >
                <FormattedMessage id="clinic.confirm" />
              </button>
            </div>
          </div>
        ) : (
          <div>{form.email}</div>
        )}
      </div>
    );
  }
}

export default EmailForm;
