import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { inject, observer } from 'mobx-react';
import { DivWrapper } from './style';
import cn from 'classnames';

@inject('paymentStoreNew')
@observer
class Progress extends React.Component {
  render() {
    const {
      paymentStoreNew: { panelStatus }
    } = this.props;
    return (
      <DivWrapper className="rc-padding--sm rc-padding-top--none mt-4 bg-white shadow-lg">
        <div
          className="checkout-steps rc-layout-container rc-margin-top--lg--mobile"
          data-loc="checkout-steps"
        >
          <div className="rc-column rc-padding-x--none--mobile rc-max-width--lg">
            <ul className="rc-list rc-list--inline rc-padding--none flex-wrap">
              {panelStatus
                .filter((p) => !p.isHide)
                .map((item, i) => (
                  <li
                    className={cn(`checkout-steps__item item_process mr-2`)}
                    data-step="payment"
                    key={i}
                  >
                    <span
                      className={cn('icon-step mr-1', {
                        active: i == 1,
                        complete: !i
                      })}
                    >
                      {i + 1}
                    </span>
                    <span>{item.key}</span>
                  </li>
                ))}
              {/* <li
                className={`checkout-steps__item item_process ${
                  props.type === 'payment' ? 'active' : ''
                }`}
                data-step="payment"
              >
                <span className="rc-header-with-icon">
                  <FormattedMessage id="choosePayment" />
                </span>
              </li>
              <li
                className={`checkout-steps__item item_process ${
                  props.type === 'confirmation' ? 'active' : ''
                }`}
                data-step="confirmation"
              >
                <span className="rc-header-with-icon">
                  <FormattedMessage id="confirmation" />
                </span>
              </li> */}
            </ul>
          </div>
        </div>
      </DivWrapper>
    );
  }
}

export default Progress;
