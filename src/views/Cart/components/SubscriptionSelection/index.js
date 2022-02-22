import React from 'react';
import { formatMoney } from '@/utils/utils';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import ConfirmTooltip from '@/components/ConfirmTooltip';
import FrequencySelection from '@/components/FrequencySelection/index.tsx';
import { toJS } from 'mobx';

const SubscriptionSelection = function (props) {
  const { isGift, pitem, activeToolTipIndex, index, toolTipVisible, isLogin } =
    props;
  return (
    <div
      className="buyMethod rc-margin-bottom--xs"
      style={{
        borderColor: parseInt(pitem.goodsInfoFlag) ? '#e2001a' : '#d7d7d7',
        cursor: 'pointer',
        maxWidth: `${isGift ? '22rem' : 'initial'}`
      }}
      onClick={props.chooseSubscription}
    >
      <div className="buyMethodInnerBox d-flex justify-content-between">
        <div className="radioBox mr-2">
          <span
            style={{
              fontWeight: '400',
              color: '#333',
              display: 'inline-block',
              marginTop: '5px'
            }}
          >
            <span
              className="iconfont iconrefresh red mr-2"
              style={{ fontSize: '1.2em' }}
            />
            {isGift ? (
              'Food Dispenser Subscription'
            ) : (
              <FormattedMessage id="autoship" />
            )}
            {!isGift && (
              <span
                className="info-tooltip delivery-method-tooltip"
                onMouseEnter={() => {
                  props.setState({
                    toolTipVisible: true,
                    activeToolTipIndex: index
                  });
                }}
                onMouseLeave={() => {
                  props.setState({
                    toolTipVisible: false
                  });
                }}
              >
                i
              </span>
            )}
            <ConfirmTooltip
              arrowStyle={{ left: '79%' }}
              display={toolTipVisible && index === activeToolTipIndex}
              cancelBtnVisible={false}
              confirmBtnVisible={false}
              updateChildDisplay={(status) =>
                props.setState({
                  toolTipVisible: status
                })
              }
              content={<FormattedMessage id="subscription.promotionTip2" />}
            />
          </span>
          <br />
          <span
            style={{
              display: `${isGift ? 'none' : 'initial'}`
            }}
          >
            <FormattedMessage
              id="saveExtraMoney"
              values={{
                val: (
                  <span className="product-pricing__card__head__price red rc-padding-y--none medium">
                    {!isLogin
                      ? formatMoney(
                          pitem.quantity *
                            pitem.sizeList.filter((el) => el.selected)[0]
                              .salePrice -
                            pitem.quantity *
                              pitem.sizeList.filter((el) => el.selected)[0]
                                .subscriptionPrice
                        )
                      : formatMoney(
                          pitem.buyCount * pitem.salePrice -
                            pitem.buyCount * pitem.subscriptionPrice
                        )}
                  </span>
                )
              }}
            />
          </span>
        </div>
        <div className="price text-nowrap">
          <div
            style={{
              fontSize: '.9375rem',
              textDecoration: 'line-through',
              display: `${isGift ? 'none' : 'initial'}`
            }}
          >
            {!isLogin
              ? formatMoney(
                  pitem.quantity *
                    pitem.sizeList.filter((el) => el.selected)[0].salePrice
                )
              : formatMoney(pitem.buyCount * pitem.salePrice)}
          </div>
          <div style={{ color: '#ec001a' }}>
            {!isLogin
              ? formatMoney(
                  pitem.quantity *
                    pitem.sizeList.filter((el) => el.selected)[0]
                      .subscriptionPrice
                )
              : formatMoney(
                  isGift
                    ? pitem.buyCount * pitem.settingPrice
                    : pitem.buyCount * pitem.subscriptionPrice
                )}
          </div>
        </div>
      </div>
      <FrequencySelection
        frequencyType={
          pitem?.sizeList?.filter((el) => el.selected)[0]?.promotions
        }
        currentFrequencyId={pitem.form.frequencyId}
        handleConfirm={(data) => {
          props.changeFrequency(pitem, data);
        }}
        className="d-flex align-items-center mt-2 pl-3 pr-3 pb-2 pt-2 text-left col-12 col-md-12 "
      />
    </div>
  );
};

export default SubscriptionSelection;
