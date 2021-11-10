import React, { useEffect, useState, createContext } from 'react';
import { FormattedMessage, injectIntl, FormattedDate } from 'react-intl';
import { IMG_DEFAULT } from '@/utils/constant';
import ButtonBoxGift from './ButtonBoxGift';
import ButtonBox from './ButtonBox';
import ChangeSelection from './ChangeSelection';
import DailyRation from '../DailyRation';
import ShowErrorDom from '../ShowErrorDom';
export const SubGoodsInfosContext = createContext();
import { getDeviceType, formatMoney } from '@/utils/utils';
const SubGoodsInfos = ({
  triggerShowChangeProduct,
  getDetail,
  isDataChange,
  handleSaveChange,
  modalList,
  showErrMsg,
  subDetail,
  onDateChange,
  isGift,
  productListLoading,
  errMsgPage,
  setState,
  getMinDate,
  isShowClub
}) => {
  const isNotInactive =
    subDetail.subscribeStatus === '0' || subDetail.subscribeStatus === '1';
  const isActive = subDetail.subscribeStatus === '0';
  const isIndv = subDetail.subscriptionType == 'Individualization';
  const isMobile = getDeviceType() !== 'PC' || getDeviceType() === 'Pad';
  //订阅数量更改
  const onQtyChange = async () => {
    try {
      setState({ isDataChange: true });
    } catch (err) {
      showErrMsg(err.message);
    }
  };
  const minusQuantity = (el) => {
    // 非激活状态需要暂停操作
    if (subDetail.subscribeStatus !== '0') {
      return;
    }
    if (el.subscribeNum > 1) {
      el.subscribeNum = el.subscribeNum - 1;
      setState({
        subDetail,
        isDataChange: true
      });
    } else {
      showErrMsg(<FormattedMessage id="cart.errorInfo" />);
    }
  };
  const plusQuantity = (el) => {
    // 非激活状态需要暂停操作
    if (subDetail.subscribeStatus !== '0') {
      return;
    }
    if (el.subscribeNum < window.__.env.REACT_APP_LIMITED_NUM) {
      el.subscribeNum = el.subscribeNum + 1;
      setState({
        subDetail,
        isDataChange: true
      });
    } else {
      showErrMsg(
        <FormattedMessage
          id="cart.errorMaxInfo"
          values={{
            val: process.env.REACT_APP_LIMITED_NUM
          }}
        />
      );
    }
  };
  const changeQuantity = (e, el, index) => {
    if (subDetail.subscribeStatus !== '0' || isIndv) {
      return;
    }
    setState({
      errorShow: false
    });
    const val = e.target.value;
    if (val === '') {
      el.subscribeNum = 1;
    } else {
      let tmp = parseInt(val);
      let errMsg = '';
      if (isNaN(tmp) || tmp < 1) {
        tmp = 1;
        errMsg = <FormattedMessage id="cart.errorInfo" />;
      }
      if (tmp > window.__.env.REACT_APP_LIMITED_NUM) {
        tmp = window.__.env.REACT_APP_LIMITED_NUM;
        errMsg = (
          <FormattedMessage
            id="cart.errorMaxInfo"
            values={{
              val: window.__.env.REACT_APP_LIMITED_NUM
            }}
          />
        );
      }
      if (errMsg) {
        showErrMsg(errMsg);
      }
      el.subscribeNum = tmp;
    }
    //数量变更后
    subDetail.goodsInfo[index].subscribeNum = el.subscribeNum;
    onQtyChange();
  };
  const propsObj = {
    subDetail,
    isGift,
    isActive,
    getMinDate,
    modalList,
    setState,
    handleSaveChange,
    onDateChange,
    isDataChange,
    productListLoading,
    getDetail,
    showErrMsg,
    isIndv
  };
  return (
    // true?null:
    <SubGoodsInfosContext.Provider value={propsObj}>
      <div>
        <div
          className="mobileGoodsBox"
          style={{ display: isMobile ? 'block' : 'none' }}
        >
          {subDetail.goodsInfo &&
            subDetail.goodsInfo.map((el, index) => (
              <div
                className="goodsItem rc-card-content"
                style={{
                  border: '1px solid #d7d7d7',
                  padding: '.75rem'
                }}
              >
                <div style={{ display: 'flex' }}>
                  <div className="for-mobile-colum">
                    {/* <LazyLoad> */}
                    <img
                      src={el.goodsPic || IMG_DEFAULT}
                      style={{ width: '100px' }}
                      alt={el.goodsName}
                    />
                    {/* </LazyLoad> */}
                    {isShowClub &&
                      !!subDetail.petsId &&
                      !isIndv &&
                      subDetail?.goodsInfo.length == 1 && (
                        <span
                          className={`rc-styled-link ${
                            productListLoading ? 'ui-btn-loading' : ''
                          }`}
                          // onClick={() => showChangeProduct([el])}
                          onClick={() => {
                            setState({
                              triggerShowChangeProduct: Object.assign(
                                {},
                                triggerShowChangeProduct,
                                {
                                  show: true,
                                  firstShow: !triggerShowChangeProduct.firstShow,
                                  goodsInfo: [el],
                                  isShowModal: true
                                }
                              )
                            });
                          }}
                        >
                          <FormattedMessage id="subscriptionDetail.changeProduct" />
                        </span>
                      )}
                  </div>
                  <div
                    className="v-center"
                    style={{ flex: '1', paddingLeft: '.625rem' }}
                  >
                    <h3
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        overflowWrap: 'normal',
                        color: '#e2001a'
                      }}
                    >
                      {el.goodsName}
                    </h3>
                    <p
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        marginBottom: '8px'
                      }}
                    >
                      {!isIndv && el.specText}
                    </p>
                    {isShowClub && !!subDetail.petsId && (
                      <DailyRation rations={el.petsRation} />
                    )}
                  </div>
                </div>
                <div style={{ marginTop: '.9375rem' }}>
                  <div>
                    <span style={{ display: isIndv ? 'none' : 'inline-block' }}>
                      <span
                        className={`rc-icon rc-minus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-minus ${
                          isActive && !isGift && !isIndv ? '' : 'disabled'
                        }`}
                        style={{ marginLeft: '-8px' }}
                        onClick={() => {
                          minusQuantity(el);
                        }}
                      />
                      <input
                        className="rc-quantity__input 111"
                        id="quantity"
                        name="quantity"
                        min="1"
                        max="899"
                        maxLength="5"
                        onChange={(e) => {
                          changeQuantity(e, el, index);
                        }}
                        value={el.subscribeNum}
                      />
                      <span
                        className={`rc-icon rc-plus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-plus  ${
                          isActive && !isGift && !isIndv ? '' : 'disabled'
                        }`}
                        onClick={() => {
                          plusQuantity(el);
                        }}
                      />
                      <span
                        style={{
                          display: 'inline-block',
                          fontSize: '1.375rem',
                          lineHeight: '40px',
                          verticalAlign: 'middle'
                        }}
                      >
                        =
                      </span>
                    </span>
                    <span
                      className="price"
                      style={{
                        display: 'inline-block',
                        fontSize: '1.25rem',
                        fontWeight: '400',
                        verticalAlign: 'middle',
                        marginLeft: '8px',
                        height: '25px'
                      }}
                    >
                      {formatMoney(el.subscribePrice * el.subscribeNum)}
                    </span>
                    {!isIndv && (
                      <span
                        className="price"
                        style={{
                          display: 'inline-block',
                          // fontSize: '1.25rem',
                          fontWeight: '400',
                          textDecoration: 'line-through',
                          verticalAlign: 'middle',
                          marginLeft: '8px',
                          height: '.6875rem',
                          color: '#aaa',
                          fontSize: '.875rem'
                        }}
                      >
                        {formatMoney(el.originalPrice * el.subscribeNum)}
                      </span>
                    )}
                  </div>
                </div>
                <div
                // className="col-4 col-md-5"
                // style={{ paddingLeft: '60px' }}
                >
                  <ChangeSelection el={el} />
                </div>
                {isGift && subDetail.subscribeStatus != 2 ? (
                  <ButtonBoxGift />
                ) : null}
              </div>
            ))}
        </div>
        <ShowErrorDom errorMsg={errMsgPage} />
        <div
          className="card-container"
          style={{
            marginTop: '0',
            display: isMobile ? 'none' : 'block',
            borderBottom: 'none'
          }}
        >
          {subDetail.goodsInfo &&
            subDetail.goodsInfo.map((el, index) => (
              <div
                className="rc-margin-x--none"
                style={{
                  padding: '1rem 0 1.5rem 0',
                  borderBottom: '1px solid #d7d7d7'
                }}
              >
                <div className=" row align-items-center">
                  <div className="col-4 col-md-6">
                    <div
                      className="rc-layout-container rc-five-column direction-column "
                      style={{
                        height: '160px',
                        paddingRight: '60px',
                        paddingTop: '0',
                        alignItems: 'center'
                      }}
                    >
                      <div
                        className="rc-column flex-layout"
                        style={{
                          width: '80%',
                          padding: 0,
                          alignItems: 'center'
                        }}
                      >
                        <div className="img-container mr-3">
                          {/* <LazyLoad> */}
                          <img
                            style={{maxHeight:'100%'}}
                            src={el.goodsPic || IMG_DEFAULT}
                            alt={el.goodsName}
                          />
                          {/* </LazyLoad> */}
                        </div>
                        <div
                          className="v-center"
                          style={{
                            width: '300px'
                          }}
                        >
                          <h5
                            style={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              overflowWrap: 'normal',
                              color: '#e2001a'
                            }}
                          >
                            {el.goodsName}
                          </h5>
                          <p
                            style={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              marginBottom: '8px'
                            }}
                          >
                            {!isIndv && el.specText}
                          </p>
                          <div>
                            <div style={{whiteSpace:'nowrap'}}>
                              <span
                                style={{
                                  display: isIndv ? 'none' : 'inline-block'
                                }}
                              >
                                <span
                                  className={`rc-icon rc-minus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-minus ${
                                    isActive && !isGift && !isIndv
                                      ? ''
                                      : 'disabled'
                                  }`}
                                  style={{ marginLeft: '-8px' }}
                                  onClick={() => {
                                    minusQuantity(el);
                                  }}
                                />
                                <input
                                  className="rc-quantity__input"
                                  id="quantity"
                                  name="quantity"
                                  min="1"
                                  max="899"
                                  maxLength="5"
                                  onChange={(e) => {
                                    changeQuantity(e, el, index);
                                  }}
                                  value={el.subscribeNum}
                                />
                                <span
                                  className={`rc-icon rc-plus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-plus ${
                                    isActive && !isGift && !isIndv
                                      ? ''
                                      : 'disabled'
                                  }`}
                                  onClick={() => {
                                    plusQuantity(el);
                                  }}
                                />
                                <span
                                  style={{
                                    display: 'inline-block',
                                    fontSize: '1.375rem',
                                    lineHeight: '40px',
                                    verticalAlign: 'middle'
                                  }}
                                >
                                  =
                                </span>
                              </span>
                              <span
                                className="price"
                                style={{
                                  display: 'inline-block',
                                  fontSize: '1.25rem',
                                  fontWeight: '400',
                                  verticalAlign: 'middle',
                                  marginLeft: '8px',
                                  height: '25px'
                                }}
                              >
                                {formatMoney(
                                  el.subscribePrice * el.subscribeNum
                                )}
                              </span>
                              {!isIndv && (
                                <span
                                  className="price"
                                  style={{
                                    display: 'inline-block',
                                    // fontSize: '1.25rem',
                                    fontWeight: '400',
                                    textDecoration: 'line-through',
                                    verticalAlign: 'middle',
                                    marginLeft: '8px',
                                    height: '.6875rem',
                                    color: '#aaa',
                                    fontSize: '.875rem'
                                  }}
                                >
                                  {formatMoney(
                                    el.originalPrice * el.subscribeNum
                                  )}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      {isShowClub && !!el.petsId && isNotInactive && (
                        <div
                          style={{
                            position: 'relative',
                            paddingLeft: '26px',
                            width: '75%'
                          }}
                        >
                          <span
                            style={{
                              width: 'auto',
                              paddingTop: '6px'
                            }}
                            className={`text-plain rc-styled-link ui-text-overflow-md-line1 `}
                            // onClick={() => showChangeProduct([el])}
                          >
                            {/* indv不会展示该按钮 */}
                            {!isIndv && subDetail?.goodsInfo.length == 1 ? (
                              <span
                                className={`${
                                  productListLoading ? 'ui-btn-loading' : ''
                                }`}
                                onClick={() => {
                                  setState({
                                    triggerShowChangeProduct: Object.assign(
                                      {},
                                      triggerShowChangeProduct,
                                      {
                                        show: true,
                                        firstShow: !triggerShowChangeProduct.firstShow,
                                        goodsInfo: [el],
                                        isShowModal: true
                                      }
                                    )
                                  });
                                }}
                              >
                                <FormattedMessage id="subscriptionDetail.changeProduct" />
                              </span>
                            ) : null}
                          </span>
                          <div
                            style={{
                              position: 'absolute',
                              left: '45%',
                              top: -4,
                              whiteSpace: 'nowrap'
                            }}
                          >
                            <DailyRation rations={el.petsRation} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-4 col-md-1" />
                  <div className="col-4 col-md-5" style={{ padding: 0 }}>
                    <ChangeSelection el={el} />
                  </div>
                </div>
                {isGift && subDetail.subscribeStatus != 2 ? (
                  <ButtonBoxGift />
                ) : null}
              </div>
            ))}
        </div>
        {!isGift && <ButtonBox />}
      </div>
    </SubGoodsInfosContext.Provider>
  );
};
export default SubGoodsInfos;
