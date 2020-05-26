import React from "react"
import { FormattedMessage } from 'react-intl'

export default class OrderFilters extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        orderNumber: '',
        startdate: '',
        enddate: ''
      }
    }
  }
  handleInputChange (e) {
    const target = e.target
    const { form } = this.state
    form[target.name] = target.value
    this.setState({ form: form })
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.props.updateFilterData(this.state.form)
    }, 500)
  }
  handleDateBlur (e) {
    const target = e.target
    const { form } = this.state
    form[target.name] = target.value
    this.setState({ form: form })
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.props.updateFilterData(this.state.form)
    }, 500)
  }
  render () {
    const { form } = this.state
    return (
      <div className="row align-items-center" style={{ fontSize: '.9em' }}>
        <div className="col-12 col-md-5 row align-items-center">
          <div className="col-md-4">
            <FormattedMessage id="order.orderNumber" />
          </div>
          <div className="col-md-8">
            <span class="rc-input rc-input--inline rc-full-width">
              <input
                class="rc-input__control"
                id="id-text8"
                type="text"
                name="orderNumber"
                maxLength="20"
                value={form.orderNumber}
                onChange={e => this.handleInputChange(e)} />
              <label class="rc-input__label" htmlFor="id-text8">
                <span class="rc-input__label-text">
                  <FormattedMessage id="order.inputOrderNumberTip" />
                </span>
              </label>
            </span>
          </div>
        </div>
        <div className="col-12 col-md-7 row align-items-center">
          <div className="col-md-3">
            <FormattedMessage id="order.dealDatePeriod" />
          </div>
          <div className="col-12 col-md-4">
            <span className="rc-input rc-input--inline rc-full-width rc-icon rc-calendar--xs rc-interactive rc-iconography--xs" input-setup="true">
              <input
                className="rc-input__date rc-input__control"
                id="startdate"
                data-js-dateformat="YYYY/MM/DD"
                name="startdate"
                value={form.startdate}
                onBlur={e => this.handleDateBlur(e)}
                type="date" />
              <label className="rc-input__label" htmlFor="startdate"></label>
            </span>
          </div>
          <div className="col-md-1 text-center">—</div>
          <div className="col-12 col-md-4">
            <span className="rc-input rc-input--inline rc-full-width rc-icon rc-calendar--xs rc-interactive rc-iconography--xs" input-setup="true">
              <input
                className="rc-input__date rc-input__control"
                id="enddate"
                data-js-dateformat="YYYY/MM/DD"
                name="enddate"
                value={form.enddate}
                onBlur={e => this.handleDateBlur(e)}
                type="date" />
              <label className="rc-input__label" htmlFor="enddate"></label>
            </span>
          </div>
        </div>
      </div>
    )
  }
}