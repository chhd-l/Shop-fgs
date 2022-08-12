import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { inject, observer } from 'mobx-react';
import { isMobile } from '@/utils/utils';
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
      <DivWrapper className="mt-1 md:mt-4 bg-white shadow-lg">
        <div
          className="checkout-steps rc-layout-container"
          data-loc="checkout-steps"
        >
          <div className="rc-column rc-max-width--lg p-3">
            <p
              style={{ color: '#767676' }}
              className="text-2xl mb-2 hidden md:block"
            >
              <FormattedMessage id="checkout.progressTitle" />
            </p>
            <ul className="rc-list rc-list--inline rc-padding--none flex flex-wrap">
              {panelStatus
                .filter(
                  (p) => !p.isHide && !['clinic', 'billingAddr'].includes(p.key)
                )
                .map((item, i) => {
                  const active = item.status?.isEdit;
                  return (
                    <li
                      className={cn(
                        `checkout-steps__item item_process mr-2 md:mr-4`
                      )}
                      data-step="payment"
                      key={i}
                    >
                      {/* className说明: complete - 已完成的步骤; active - 正在编辑的步骤 */}
                      <span
                        className={cn('icon-step mr-1', {
                          active: active,
                          complete: item.status?.isCompleted
                        })}
                      >
                        {i + 1}
                      </span>
                      {/* mobile: active时，才显示文字；pc: 永远显示文字 */}
                      {!isMobile || active ? (
                        <span>
                          <FormattedMessage id={`checkout.${item.key}`} />
                        </span>
                      ) : null}
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </DivWrapper>
    );
  }
}

export default Progress;
