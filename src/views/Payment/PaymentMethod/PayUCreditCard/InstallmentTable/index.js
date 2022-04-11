import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';

export default class InstallmentTable extends React.Component {
  static defaultProps = {
    defaultValue: '',
    onChange: () => {}
  };
  constructor(props) {
    super(props);
    this.state = {
      form: { value: 0 }
    };
  }
  componentDidMount() {
    const defaultValue = this.props.defaultValue;
    if (defaultValue) {
      this.setState({
        form: Object.assign(this.state.form, { value: defaultValue })
      });
    }
    this.updateParentData();
  }
  installmentHandler = (e) => {
    this.setState(
      {
        form: Object.assign(this.state.form, { value: e.target.value })
      },
      () => {
        this.updateParentData();
      }
    );
  };
  updateParentData() {
    this.props.onChange(this.props.list[this.state.form.value]);
  }
  render() {
    const { list } = this.props;
    const { form } = this.state;
    return (
      <div id="installment-payment" className="border-none d-block w-100">
        <div
          className="rc-list__content rc-padding-left--none rc-padding-right--none"
          id="installment-payment-content"
          role="region"
        >
          <div className="rc-table">
            <div className="rc-scroll--x">
              <table className="rc-table__table border-none" data-js-table="">
                <thead className="rc-table__thead">
                  <tr className="rc-table__row">
                    <th className="rc-table__th rc-espilon"></th>
                    <th className="rc-table__th rc-espilon">
                      <FormattedMessage id="installMent.payment" />
                    </th>
                    <th className="rc-table__th rc-espilon">
                      <FormattedMessage id="installMent.rate" />
                    </th>
                    <th className="rc-table__th rc-espilon">
                      <FormattedMessage id="installMent.percent" />
                    </th>
                    <th className="rc-table__th rc-espilon">
                      <FormattedMessage id="installMent.total" />
                    </th>
                  </tr>
                </thead>
                <tbody className="rc-table__tbody">
                  {list.map((item, i) => (
                    <tr className="rc-table__row" key={i}>
                      <td className="rc-table__td">
                        <div className="rc-input rc-input--inline">
                          <input
                            className="rc-input__radio"
                            id={`id-radio-installment-${i}`}
                            checked={form.value + '' === i + ''}
                            type="radio"
                            // name="number_of_installments"
                            value={i}
                            onChange={this.installmentHandler}
                            name={`id-radio-installment-${i}`}
                          />
                          <label
                            className="rc-input__label--inline"
                            htmlFor={`id-radio-installment-${i}`}
                          />
                        </div>
                      </td>
                      <td className="rc-table__td">
                        {item.installmentNumber > 1 ? (
                          <FormattedMessage
                            id="installMent.xInstallMents"
                            values={{ num: item.installmentNumber }}
                          />
                        ) : (
                          <FormattedMessage id="installMent.oneShot" />
                        )}
                      </td>
                      <td className="rc-table__td">{item.installmentPrice}</td>
                      <td className="rc-table__td">{item.percent}</td>
                      <td className="rc-table__td">{item.totalPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
