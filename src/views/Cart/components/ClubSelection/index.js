import React from 'react';
import { formatMoney } from '@/utils/utils';
import { FormattedMessage, injectIntl } from 'react-intl';
import ConfirmTooltip from '@/components/ConfirmTooltip';
import Selection from '@/components/Selection';

const ClubSelection = function (props) {
  console.log(props, 'props');
  const {
    isGift,
    pitem,
    activeToolTipIndex,
    index,
    toolTipVisible,
    isLogin
  } = props;
  return (
    <div
      className="buyMethod rc-margin-bottom--xs ClubSelection"
      style={{
        borderColor: parseInt(pitem.goodsInfoFlag) ? '#e2001a' : '#d7d7d7',
        cursor: 'pointer',
        maxWidth: `${isGift ? '22rem' : 'initial'}`
      }}
      onClick={props.chooseSubscription}
    >
      <div className="buyMethodInnerBox d-flex justify-content-between align-items-center">
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
              className="iconfont red mr-2"
              style={{ fontSize: '1.2em', fontWeight: '600', color: '#ec001a' }}
            >
              &#xe602;
            </span>
            {isGift ? (
              'Food Dispenser Subscription'
            ) : (
              <FormattedMessage id="CLUB subscription" />
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
              arrowStyle={{ left: '65%' }}
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
        <div className="price">
          <div
            style={{
              fontSize: '15px',
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
      <div className="freqency d-flex align-items-center mt-2 pl-3 pr-3 pb-2 pt-2">
        <span>
          <FormattedMessage id="subscription.frequency" />:
        </span>
        <Selection
          customCls="flex-grow-1"
          selectedItemChange={(data) => props.changeFrequency(pitem, data)}
          optionList={props.computedList}
          selectedItemData={{
            value: pitem.form.frequencyId
          }}
        />
      </div>
    </div>
  );
};

export default ClubSelection;
