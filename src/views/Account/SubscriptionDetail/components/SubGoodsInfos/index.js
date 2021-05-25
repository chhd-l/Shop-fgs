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
  isNotInactive,
  isActive,
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
  isClub
}) => {
  const isMobile = getDeviceType() !== 'PC' || getDeviceType() === 'Pad';
  //订阅数量更改
  const onQtyChange = async () => {
    try {
      setState({ isDataChange: true });
    } catch (err) {
      showErrMsg(err.message);
    }
  };
  const minusOrPlusQuantity = (el, isPlus) => {
    // 非激活状态需要暂停操作
    if (subDetail.subscribeStatus !== '0') {
      return;
    }
    if (
      el.subscribeNum > 1 ||
      el.subscribeNum < process.env.REACT_APP_LIMITED_NUM
    ) {
      isPlus ? el.subscribeNum++ : el.subscribeNum--;
      setState({
        subDetail,
        isDataChange: true
      });
    } else {
      let errMsg = isPlus ? (
        <FormattedMessage
          id="cart.errorMaxInfo"
          values={{
            val: process.env.REACT_APP_LIMITED_NUM
          }}
        />
      ) : (
        <FormattedMessage id="cart.errorInfo" />
      );

      showErrMsg(errMsg);
    }
  };
  const changeQuantity = () => {
    if (subDetail.subscribeStatus !== '0') {
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
      if (tmp > process.env.REACT_APP_LIMITED_NUM) {
        tmp = process.env.REACT_APP_LIMITED_NUM;
        errMsg = (
          <FormattedMessage
            id="cart.errorMaxInfo"
            values={{
              val: process.env.REACT_APP_LIMITED_NUM
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
    isNotInactive,
    getMinDate,
    modalList,
    setState,
    handleSaveChange,
    onDateChange,
    isActive,
    isDataChange,
    productListLoading,
    getDetail,
    showErrMsg
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
                    {isClub && !!subDetail.petsId && (
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
                      {el.specText}
                    </p>
                    ..........
                    {isClub && !!subDetail.petsId && (
                      <DailyRation rations={el.petsRation} />
                    )}
                  </div>
                </div>
                <div style={{ marginTop: '.9375rem' }}>
                  <div>
                    <span
                      className="rc-icon rc-minus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-minus"
                      style={{ marginLeft: '-8px' }}
                      onClick={() => {
                        minusOrPlusQuantity(el, false);
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
                        changeQuantity();
                      }}
                      value={el.subscribeNum}
                    />
                    <span
                      className="rc-icon rc-plus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-plus"
                      onClick={() => {
                        minusOrPlusQuantity(el, true);
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
                    <span
                      className="price"
                      style={{
                        display: 'inline-block',
                        fontSize: '1.25rem',
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
                  </div>
                </div>
                <div
                // className="col-4 col-md-5"
                // style={{ paddingLeft: '60px' }}
                >
                  <ChangeSelection el={el} />
                </div>
                {isGift && subDetail.subscribeStatus != 2 ? (
                  <ButtonBoxGift
                    subDetail={subDetail}
                    isDataChange={isDataChange}
                  />
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
                  padding: '1rem 0',
                  borderBottom: '1px solid #d7d7d7'
                }}
              >
                <div className=" row align-items-center">
                  <div className="col-4 col-md-6">
                    <div
                      className="rc-layout-container rc-five-column"
                      style={{
                        height: '160px',
                        paddingRight: '60px',
                        paddingTop: '0'
                      }}
                    >
                      <div
                        className="rc-column flex-layout"
                        style={{ width: '80%', padding: 0 }}
                      >
                        <div className="img-container">
                          {/* <LazyLoad> */}
                          <img
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
                            {el.specText}
                          </p>
                          <div>
                            <div>
                              <span
                                className={`rc-icon rc-minus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-minus ${
                                  isActive && !isGift ? '' : 'disabled'
                                }`}
                                style={{ marginLeft: '-8px' }}
                                onClick={() => {
                                  minusOrPlusQuantity(el, false);
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
                                  changeQuantity(e);
                                }}
                                value={el.subscribeNum}
                              />
                              <span
                                className={`rc-icon rc-plus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-plus ${
                                  isActive && !isGift ? '' : 'disabled'
                                }`}
                                onClick={() => {
                                  minusOrPlusQuantity(el, true);
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
                              <span
                                className="price"
                                style={{
                                  display: 'inline-block',
                                  fontSize: '1.25rem',
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
                            </div>
                          </div>
                        </div>
                      </div>
                      {isClub && !!subDetail.petsId && isNotInactive && (
                        <div
                          style={{
                            position: 'relative',
                            paddingLeft: '26px'
                          }}
                        >
                          <span
                            style={{
                              width: '100px',
                              paddingTop: '10px'
                            }}
                            className={`text-plain rc-styled-link ui-text-overflow-md-line1 ${
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
                            // onClick={() => showChangeProduct([el])}
                          >
                            <FormattedMessage id="subscriptionDetail.changeProduct" />
                          </span>
                          <div
                            style={{
                              position: 'absolute',
                              left: '126px',
                              whiteSpace: 'nowrap',
                              top: 0
                            }}
                          >
                            <DailyRation rations={el.petsRation} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-4 col-md-1" />
                  <div
                    className="col-4 col-md-5"
                    style={{ paddingLeft: '60px' }}
                  >
                    <ChangeSelection el={el} />
                  </div>
                </div>
                {isGift && subDetail.subscribeStatus != 2 ? (
                  <ButtonBoxGift
                    subDetail={subDetail}
                    isDataChange={isDataChange}
                  />
                ) : null}
              </div>
            ))}
        </div>
        {!isGift && (
          <ButtonBox
            subDetail={subDetail}
            isDataChange={isDataChange}
            isNotInactive={isNotInactive}
          />
        )}
      </div>
    </SubGoodsInfosContext.Provider>
  );
};
export default SubGoodsInfos;
