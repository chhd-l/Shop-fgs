import React from 'react';
import { formatMoney } from '@/utils/utils';
import { FormattedMessage } from 'react-intl-phraseapp';
import FrequencySelection from '@/components/FrequencySelection';
import { Popover } from '@/components/Common';

const SubscriptionSelection = function (props) {
  const { isGift, pitem, activeToolTipIndex, index, toolTipVisible, isLogin } =
    props;

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
        {formatMoney(pitem.buyCount * pitem.salePrice)}
      </div>

      <div style={{ color: '#ec001a' }}>
        {!isLogin
          ? formatMoney(pitem.buyCount * pitem.subscriptionPrice)
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
              {formatMoney(
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
            ? formatMoney(pitem.buyCount * pitem.subscriptionPrice)
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
            className="inline-block font15 font-thin text-xl leading-4"
          >
            <span className="iconfont iconrefresh text-rc-red mr-1 text-lg font-bold" />
            {isGift ? (
              'Food Dispenser Subscription'
            ) : (
              <FormattedMessage id="autoship" />
            )}
            {!isGift && (
              <Popover
                display={toolTipVisible && index === activeToolTipIndex}
                cancelBtnVisible={false}
                confirmBtnVisible={false}
                updateChildDisplay={(status) =>
                  props.setState({
                    toolTipVisible: status
                  })
                }
                content={<FormattedMessage id="subscription.promotionTip2" />}
              >
                <span
                  className="info-tooltip delivery-method-tooltip position-relative"
                  onMouseEnter={() => {
                    props.setState({
                      toolTipVisible: !toolTipVisible,
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
              </Popover>
            )}
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
