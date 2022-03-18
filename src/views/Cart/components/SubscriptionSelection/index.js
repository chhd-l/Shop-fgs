import React from 'react';
import { formatMoney } from '@/utils/utils';
import { FormattedMessage } from 'react-intl-phraseapp';
import ConfirmTooltip from '@/components/ConfirmTooltip';
import FrequencySelection from '@/components/FrequencySelection/index.tsx';
import { toJS } from 'mobx';

const SubscriptionSelection = function (props) {
  const { isGift, pitem, activeToolTipIndex, index, toolTipVisible, isLogin } =
    props;
  console.log(
    'toJSasasa',
    pitem?.sizeList?.filter((el) => el.selected)[0]?.promotions,
    pitem.form.frequencyId,
    toJS(pitem)
  );
  return (
    <div
      className="buyMethod rc-margin-bottom--xs cursor-pointer"
      style={{
        borderColor: parseInt(pitem.goodsInfoFlag) ? '#e2001a' : '#d7d7d7',
        maxWidth: `${isGift ? '22rem' : 'initial'}`
      }}
      onClick={props.chooseSubscription}
    >
      <div className="buyMethodInnerBox d-flex justify-content-between">
        <div className="radioBox mr-2">
          <span
            style={{
              color: '#333',
              marginTop: '5px'
            }}
            className="font-normal inline-block"
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
              display: `${isGift ? 'none' : 'initial'}`
            }}
            className="line-through"
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
          isLogin
            ? pitem.promotions
            : pitem?.sizeList?.filter((el) => el.selected)[0]?.promotions
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
