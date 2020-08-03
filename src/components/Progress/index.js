import React from 'react'
import { FormattedMessage } from 'react-intl'
import './index.css'

function Progress (props) {
  return (
    <div className="rc-padding--sm rc-padding-top--none">
      <div
        className="checkout-steps rc-layout-container rc-margin-top--lg--mobile" data-loc="checkout-steps">
        <div className="rc-column rc-padding-x--none--mobile">
          <ul className="rc-list rc-list--inline rc-content-v-middle rc-padding--none flex-wrap justify-content-start-md-down">
            <li
              className={`checkout-steps__item item_process ${props.type === 'perscription' ? 'active' : ''}`}
              data-step="perscription">
              <span className="rc-header-with-icon">
                <i className={['rc-icon', 'rc-health', props.type === 'perscription' ? 'rc-brand1' : 'rc-iconography'].join(' ')}></i>
                <FormattedMessage id="prescription" />
              </span>
            </li>
            <li
              className={`checkout-steps__item item_process ${props.type === 'payment' ? 'active' : ''}`}
              data-step="payment"
            >
              <span className="rc-header-with-icon">
                <hr />
                <i className={['rc-icon', 'rc-icon-less-scale', 'rc-payment--sm', props.type === 'payment' ? 'rc-brand1' : 'rc-iconography'].join(' ')}></i>
                <FormattedMessage id="choosePayment" />
              </span>
            </li>
            <li
              className={`checkout-steps__item item_process ${props.type === 'confirmation' ? 'active' : ''}`}
              data-step="confirmation"
            >
              <span className="rc-header-with-icon">
                <hr />
                <i className={['rc-icon', 'rc-icon-less-scale', 'rc-confirmation--sm', props.type === 'confirmation' ? 'rc-brand1' : 'rc-iconography'].join(' ')}></i>
                <FormattedMessage id="confirmation" />
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Progress