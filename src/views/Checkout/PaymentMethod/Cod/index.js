import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';

export default class Cod extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        checked: false
      }
    };
    this.onCheckboxChange = this.onCheckboxChange.bind(this);
  }
  componentDidMount() {
    this.updateFormValidStatus();
  }
  onCheckboxChange() {
    this.setState(
      (curState) => ({
        form: Object.assign(this.state.form, {
          checked: !curState.form.checked
        })
      }),
      () => {
        this.updateFormValidStatus();
      }
    );
  }
  updateFormValidStatus() {
    this.props.updateFormValidStatus(this.state.form.checked);
  }
  render() {
    const { form } = this.state;
    return (
      <div className="row mt-3">
        <div className="col-12">
          <div className="rc-input rc-input--inline w-100 mw-100">
            <input
              className="rc-input__checkbox"
              id={`id-payu-cod`}
              onChange={this.onCheckboxChange}
              type="checkbox"
              checked={form.checked}
              name="checked"
            />
            <label
              className="rc-input__label--inline text-break"
              htmlFor={`id-payu-cod`}
            >
              <FormattedMessage id="payment.codTip" />
              <span className="rc-text-colour--brand1">*</span>
            </label>
          </div>
        </div>
      </div>
    );
  }
}
