import React, { useState, useEffect } from 'react';
import { formatMoney } from '@/utils/utils';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import ConfirmTooltip from '@/components/ConfirmTooltip';
import FrequencySelection from '@/components/FrequencySelection';

const ClubSelection = function (props) {
  useEffect(() => {}, []);
  const { isGift, pitem, activeToolTipIndex, index, toolTipVisible, isLogin } =
    props;
  return (
    <div
      className="buyMethod rc-margin-bottom--xs ClubSelection cursor-pointer"
      style={{
        borderColor: parseInt(pitem.goodsInfoFlag) ? '#e2001a' : '#d7d7d7',
        maxWidth: `${isGift ? '22rem' : 'initial'}`
      }}
      onClick={props.chooseSubscription}
    >
      <div className="buyMethodInnerBox d-flex justify-content-between align-items-center flex-wrap">
        <div className="radioBox mr-2">
          <span
            style={{
              color: '#333',
              marginTop: '5px',
              whiteSpace: 'nowrap'
            }}
            className="font-normal inline-block"
          >
            <span
              className="iconfont iconbiaoqian red mr-2 font-semibold"
              style={{ fontSize: '1.2em', color: '#ec001a' }}
            />
            {isGift ? (
              'Food Dispenser Subscription'
            ) : (
              <FormattedMessage id="Club subscription" />
            )}
            {/* {!isGift && (
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
            )} */}
            <ConfirmTooltip
              arrowStyle={{ left: '79%' }}
              display={toolTipVisible && index === activeToolTipIndex}
              cancelBtnVisible={false}
              confirmBtnVisible={false}
              updateChildDisplay={(status) =>
                this.setState({
                  toolTipVisible: status
                })
              }
              content={<FormattedMessage id="subscription.promotionTip2" />}
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
        frequencyType={pitem.promotions}
        currentFrequencyId={pitem.form.frequencyId}
        handleConfirm={(data) => {
          props.changeFrequency(pitem, data);
        }}
        className="bg-rc-f9 px-3 py-2"
        childrenGridCls={[
          'col-span-4 md:col-span-6',
          'col-span-8 md:col-span-6'
        ]}
      />
    </div>
  );
};

export default ClubSelection;
