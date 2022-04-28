import React from 'react';
import { formatMoney } from '@/utils/utils';
import { FormattedMessage } from 'react-intl-phraseapp';
import ConfirmTooltip from '@/components/ConfirmTooltip';
import FrequencySelection from '@/components/FrequencySelection';
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

  // 价格有关的内容
  let priceContent = (
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
                pitem.sizeList.filter((el) => el.selected)[0].subscriptionPrice
            )
          : formatMoney(
              isGift
                ? pitem.buyCount * pitem.settingPrice
                : pitem.buyCount * pitem.subscriptionPrice
            )}
      </div>
    </div>
  );
  let saveExtraMoney = (
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
                      pitem.sizeList.filter((el) => el.selected)[0].salePrice -
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
  );
  // 如果是日本 没有折扣 不显示折扣价
  if (
    window.__.env.REACT_APP_COUNTRY === 'jp' &&
    pitem.salePrice === pitem.subscriptionPrice
  ) {
    priceContent = (
      <div className="price text-nowrap flex flex-col justify-end">
        <div>
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
    );
    saveExtraMoney = null;
  }

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
              marginTop: '5px',
              whiteSpace: 'nowrap'
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
          {saveExtraMoney}
        </div>
        {priceContent}
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
        className="bg-rc-f9 px-3 py-2"
        childrenGridCls={[
          'col-span-4 md:col-span-7',
          'col-span-8 md:col-span-5'
        ]}
      />
    </div>
  );
};

export default SubscriptionSelection;
