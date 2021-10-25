import React from 'react';
import ConfirmTooltip from '@/components/ConfirmTooltip';
import { CREDIT_CARD_IMG_ENUM } from '@/utils/constant';
import { FormattedMessage } from 'react-intl';
import LazyLoad from 'react-lazyload';

export default class CardItemCover extends React.Component {
  static defaultProps = {
    canEdit: false,
    canDelete: false,
    selectedSts: false,
    needReConfirmCVV: false,
    lastItem: false,
    handleClickCardItem: () => {},
    deleteCard: () => {},
    currentCvvChange: () => {},
    handleClickEditBtn: () => {},
    handleClickDeleteBtn: () => {},
    updateConfirmTooltipVisible: () => {}
  };
  render() {
    const {
      el,
      needReConfirmCVV,
      selectedSts,
      lastItem,
      handleClickCardItem,
      handleClickEditBtn,
      handleClickDeleteBtn,
      updateConfirmTooltipVisible,
      deleteCard,
      currentCvvChange,
      canEdit,
      canDelete
    } = this.props;
    return (
      // paddingFlag表示此卡正在pending，不能用于选择支付
      <div
        className={`rounded pl-2 pr-2 creditCompleteInfoBox position-relative ${
          el?.paddingFlag
            ? 'ui-cursor-not-allowed disabled'
            : 'ui-cursor-pointer border'
        }  ${selectedSts ? 'active border-blue' : ''} ${
          !selectedSts && !lastItem ? 'border-bottom-0' : ''
        }`}
        onClick={handleClickCardItem}
        title={`${el?.paddingFlag ? 'pending' : ''}`}
      >
        {el.isValid && (
          <span
            className="position-absolute iconfont font-weight-bold green"
            style={{
              right: '3%',
              bottom: '4%'
            }}
          >
            &#xe68c;
          </span>
        )}

        <div className="pt-3 pb-3">
          {canEdit && (
            <div
              className="position-absolute ui-cursor-pointer-pure"
              style={{
                right: '3%',
                top: '2%'
              }}
              onClick={handleClickEditBtn}
            >
              <span
                className={`position-relative pl-2 font-weight-normal`}
                style={{ color: '#444' }}
              >
                <FormattedMessage id="edit" />
              </span>
            </div>
          )}
          {canDelete && (
            <div
              className="position-absolute"
              style={{ right: '1%', top: '2%', zIndex: 50 }}
            >
              <span className="pull-right position-relative pl-2 ui-cursor-pointer-pure">
                <span onClick={handleClickDeleteBtn}>
                  <FormattedMessage id="delete" />
                </span>
                <ConfirmTooltip
                  containerStyle={{
                    transform: 'translate(-89%, 105%)'
                  }}
                  arrowStyle={{ left: '89%' }}
                  display={el.confirmTooltipVisible}
                  confirm={deleteCard}
                  updateChildDisplay={updateConfirmTooltipVisible}
                />
              </span>
            </div>
          )}
          <div className="row">
            <div className="col-6 col-sm-3 d-flex flex-column justify-content-center">
              <LazyLoad>
                <img
                  className="PayCardImgFitScreen"
                  src={
                    CREDIT_CARD_IMG_ENUM[el?.paymentVendor?.toUpperCase()] ||
                    'https://js.paymentsos.com/v2/iframe/latest/static/media/unknown.c04f6db7.svg'
                  }
                  alt="card background"
                />
              </LazyLoad>
            </div>
            <div className="col-12 col-sm-9 flex-column justify-content-around d-flex">
              <div className="row ui-margin-top-1-md-down PayCardBoxMargin">
                <div className={`col-12 color-999 mb-1`}>
                  <div className="row align-items-center">
                    <div className="col-4" style={{ fontSize: '.875rem' }}>
                      <FormattedMessage id="name2" />
                    </div>
                    <div className={`col-6 creditCompleteInfo`}>
                      {el.holderName}
                    </div>
                  </div>
                </div>
                {/* 只有保存过的卡，切换时才需要重新输入cvv */}
                {needReConfirmCVV && el.paymentToken && selectedSts && (
                  <div className={`col-12 color-999 mb-1`}>
                    <div className="row align-items-center">
                      <div className={`col-4`} style={{ fontSize: '.875rem' }}>
                        <FormattedMessage id="CVV" />
                      </div>
                      <div
                        className={`col-4 color-999 text-left creditCompleteInfo`}
                      >
                        <input
                          onChange={currentCvvChange}
                          type="password"
                          autoComplete="new-password"
                          maxLength="4"
                          className="w-100"
                          autoComplete="new-password"
                          value={el.cardCvv}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="row ui-margin-top-1-md-down PayCardBoxMargin">
                <div className="col-6 color-999">
                  <span style={{ fontSize: '.875rem' }}>
                    <FormattedMessage id="payment.cardNumber2" />
                  </span>
                  <br />
                  <span className="creditCompleteInfo fontFitSCreen">
                    xxxx xxxx xxxx {el.lastFourDigits}
                  </span>
                </div>
                <div className="col-6 border-left color-999">
                  <span style={{ fontSize: '.875rem' }}>
                    <FormattedMessage id="payment.cardType" />
                  </span>
                  <br />
                  <span className="creditCompleteInfo fontFitSCreen">
                    {el.cardType}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
