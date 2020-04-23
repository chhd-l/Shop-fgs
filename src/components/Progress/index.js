import React from 'react'
import { FormattedMessage } from 'react-intl'
import './index.css'

function Progress (props) {
  return (
    <div class="rc-padding--sm rc-padding-top--none">
      <div
        class="checkout-steps rc-layout-container rc-margin-top--lg--mobile" data-loc="checkout-steps">
        <div class="rc-column rc-padding-x--none--mobile">
          <ul class="rc-list rc-list--inline rc-content-v-middle rc-padding--none">
            <li
              className={['checkout-steps__item', props.type === 'perscription' ? 'active' : ''].join(' ')}
              data-step="perscription">
              <span class="rc-header-with-icon">
                <i className={['rc-icon', 'rc-health', props.type === 'perscription' ? 'rc-brand1' : 'rc-iconography'].join(' ')}></i>
                <FormattedMessage id="prescription" />
              </span>
            </li>
            <li
              className={['checkout-steps__item', props.type === 'shipping' ? 'active' : ''].join(' ')}
              data-step="shipping">
              <span class="rc-header-with-icon">
                <hr />
                <i className={['rc-icon', 'rc-icon-less-scale', 'rc-delivery--sm', props.type === 'shipping' ? 'rc-brand1' : 'rc-iconography'].join(' ')}></i>
                <FormattedMessage id="delivery" />
              </span>
            </li>
            <li
              className={['checkout-steps__item', props.type === 'payment' ? 'active' : ''].join(' ')}
              data-step="payment"
            >
              <span class="rc-header-with-icon">
                <hr />
                <i className={['rc-icon', 'rc-icon-less-scale', 'rc-payment--sm', props.type === 'payment' ? 'rc-brand1' : 'rc-iconography'].join(' ')}></i>
                <FormattedMessage id="choosePayment" />
              </span>
            </li>
            <li
              className={['checkout-steps__item', props.type === 'confirmation' ? 'active' : ''].join(' ')}
              data-step="confirmation"
            >
              <span class="rc-header-with-icon">
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