import React from 'react';
import { inject, observer } from 'mobx-react';
import { FormattedMessage, injectIntl } from 'react-intl';

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
      isEdit: true
    };
  }
  componentDidMount() {}
  handleClickEdit = () => {
    this.setState({ isEdit: true });
  };
  handleInputChange = (e) => {
    let { form } = this.state;
    const target = e.target;
    form[target.name] = target.value;
    this.setState({ form }, () => {
      this.props.onChange(this.state.form);
    });
  };
  render() {
    const { isEdit, form } = this.state;
    const { intl } = this.props;

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

    return (
      <div className="card-panel checkout--padding rc-bg-colour--brand3 rounded mb-3">
        <div className="bg-transparent d-flex justify-content-between align-items-center">
          {titleForPrepare}
        </div>
        {isEdit ? (
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
          </div>
        ) : (
          <div>{form.email}</div>
        )}
      </div>
    );
  }
}

export default EmailForm;
