import React from "react"

export default class OrderFilters extends React.Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <div className="row align-items-center" style={{fontSize: '.9em'}}>
        <div className="col-12 col-md-5 row align-items-center">
          <div className="col-md-4">Order Search</div>
          <div className="col-md-8">
            <span class="rc-input rc-input--inline rc-full-width">
              <input class="rc-input__control" id="id-text8" type="text" name="text" disabled="" />
              <label class="rc-input__label" for="id-text8">
                <span class="rc-input__label-text">Please input order number</span>
              </label>
            </span>
          </div>
        </div>
        <div className="col-12 col-md-7 row align-items-center">
          <div className="col-md-3">Deal Date Period</div>
          <div className="col-12 col-md-4">
            <span className="rc-input rc-input--inline rc-full-width rc-icon rc-calendar--xs rc-interactive rc-iconography--xs" input-setup="true">
              <input
                className="rc-input__date rc-js-custom rc-input__control"
                id="startdate"
                data-js-dateformat="DD/MM/YYYY"
                name="birthdate"
                type="date" />
              <label className="rc-input__label" htmlFor="startdate"></label>
            </span>
          </div>
          <div className="col-md-1 text-center">—</div>
          <div className="col-12 col-md-4">
            <span className="rc-input rc-input--inline rc-full-width rc-icon rc-calendar--xs rc-interactive rc-iconography--xs" input-setup="true">
              <input
                className="rc-input__date rc-js-custom rc-input__control"
                id="enddate"
                data-js-dateformat="DD/MM/YYYY"
                name="birthdate"
                type="date" />
              <label className="rc-input__label" htmlFor="enddate"></label>
            </span>
          </div>
        </div>
      </div>
    )
  }
}