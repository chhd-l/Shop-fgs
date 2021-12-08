import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import dateIcon from '../../images/date.png';
import { getDeviceType, getFormatDate, formatMoney } from '@/utils/utils';

const CompletedDelivery = ({ i, isActive, el, subDetail, intl }) => {
  const isMobile = getDeviceType() !== 'PC' || getDeviceType() === 'Pad';
  const isIndv = subDetail.subscriptionType
    ?.toLowerCase()
    .includes('individualization');
  return (
    <div className="card-container" key={i}>
      <div className="card rc-margin-y--none ml-0">
        <div
          className="2222 card-header row rc-margin-x--none align-items-center pl-0 pr-0"
          style={{
            background: '#f9f9f9',
            height: '75px'
          }}
        >
          {' '}
          {isActive ? (
            <div
              className={`${isMobile ? 'col-6' : 'col-md-3'}`}
              style={{ paddingLeft: '1.25rem' }}
            >
              <FormattedMessage id="prevShipmentOn" />:{' '}
              <span
                style={{
                  color: '#e2001a',
                  fontWeight: '400'
                }}
              >
                {getFormatDate({
                  date: el.tradeState.createTime.split(' ')[0],
                  intl
                })}
                {/* <FormattedDate value={el.tradeState.createTime.split(' ')[0]}/> */}
              </span>
            </div>
          ) : null}
          {isMobile ? null : <div className="col-12 col-md-3"></div>}
          {isMobile ? null : (
            <div className="col-12 col-md-3 pl-4">
              {[
                {
                  text: <FormattedMessage id="promotion" />,
                  price: el.tradePrice.discountsPrice
                }
              ]
                .filter((ele) => ele.subscriptionPrice > 0)
                .map((ele, i) => (
                  <React.Fragment key={i}>
                    {ele.text}:{' '}
                    <span
                      className="green"
                      style={{
                        fontWeight: '400'
                      }}
                    >
                      -{formatMoney(ele.subscriptionPrice)}
                    </span>
                    <br />
                  </React.Fragment>
                ))}
            </div>
          )}
          <div
            className="col-6 col-md-3"
            style={{
              padding: isMobile ? '0' : '0 .9375rem'
            }}
          >
            {isMobile ? (
              <>
                <div
                  style={{
                    textAlign: 'left'
                  }}
                >
                  {el.id ? (
                    <>
                      <em className="greenCircle" />
                      <span
                        className="ui-text-overflow-line1"
                        style={{
                          width: '120px',
                          display: 'block',
                          paddingLeft: '20px'
                        }}
                      >
                        {el.tradeState.orderStatus}
                      </span>
                      <Link
                        className="rc-icon rc-right rc-iconography"
                        style={{
                          position: 'absolute',
                          top: '-0.2rem',
                          right: '0'
                        }}
                        to={`/account/orders/detail/${el.id}`}
                      />
                    </>
                  ) : (
                    <>
                      <em className="yellowCircle" />
                      <span
                        style={{
                          paddingRight: '30px'
                        }}
                      >
                        <FormattedMessage id="skiped" />
                      </span>
                    </>
                  )}
                </div>
              </>
            ) : el.id ? (
              <>
                <LazyLoad>
                  <img
                    style={{
                      display: 'inline-block',
                      width: '1.25rem',
                      marginRight: '5px'
                    }}
                    src={dateIcon}
                    alt="date Icon"
                  />
                </LazyLoad>
                <Link
                  className="rc-styled-link"
                  to={`/account/orders/detail/${el.id}`}
                >
                  <FormattedMessage id="orderDetail" />
                </Link>
              </>
            ) : null}
          </div>
        </div>
      </div>
      {/* {subDetail.goodsInfo &&
  subDetail.goodsInfo.map((el, index) => ( */}
      <div
        className="row rc-margin-x--none row align-items-center 4"
        style={{
          padding: '1rem 0',
          borderBottom: '1px solid #d7d7d7'
        }}
      >
        {isMobile ? (
          <div className="col-8 col-md-6">
            {el.tradeItems &&
              el.tradeItems.map((tradeItem, index) => {
                if (index < 2) {
                  return (
                    <>
                      <LazyLoad style={{ margin: '0 .625rem' }}>
                        <img
                          style={{
                            width: '70px',
                            display: 'inline'
                          }}
                          src={tradeItem.pic}
                          alt={tradeItem.skuName}
                        />
                      </LazyLoad>
                      <div
                        className="v-center"
                        style={{
                          width: '95px',
                          verticalAlign: 'middle',
                          display: `${isIndv ? 'none' : 'inline-block'}`
                        }}
                      >
                        <h5
                          style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            overflowWrap: 'normal',
                            fontSize: '.875rem',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {tradeItem.skuName}
                        </h5>
                        <p
                          style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            marginBottom: '8px',
                            fontSize: '.875rem'
                          }}
                        >
                          {tradeItem.specDetails}
                          &nbsp;&nbsp;x {tradeItem.num}
                        </p>
                      </div>
                    </>
                  );
                }
              })}
          </div>
        ) : (
          <div className="col-4 col-md-7">
            <div
              className="rc-layout-container rc-five-column pt-0"
              style={{
                paddingRight: '60px'
              }}
            >
              <div className="rc-column flex-layout p-0 w-100">
                {el.tradeItems &&
                  el.tradeItems.map((tradeItem, index) => {
                    if (index < 2) {
                      return (
                        <>
                          <LazyLoad style={{ margin: '0 .625rem' }}>
                            <img
                              style={{
                                width: '70px'
                                // margin: '0 .625rem'
                              }}
                              src={tradeItem.pic}
                              alt={tradeItem.skuName}
                            />
                          </LazyLoad>
                          <div
                            style={{
                              width: isMobile ? '120px' : 'auto',
                              paddingTop: '30px',
                              overflow: 'hidden'
                            }}
                          >
                            {!isIndv ? (
                              <>
                                <h5
                                  title={tradeItem.skuName}
                                  style={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    overflowWrap: 'normal',
                                    fontSize: '.875rem',
                                    whiteSpace: 'nowrap'
                                  }}
                                >
                                  {tradeItem.skuName}
                                </h5>
                                <p
                                  style={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    marginBottom: '8px',
                                    fontSize: '.875rem'
                                  }}
                                >
                                  {tradeItem.specDetails} x {tradeItem.num}
                                </p>
                              </>
                            ) : null}
                          </div>
                        </>
                      );
                    }
                  })}
                {el.tradeItems && el.tradeItems.length > 2 && (
                  <div
                    style={{
                      width: '120px',
                      paddingTop: '30px',
                      marginLeft: '40px',
                      fontSize: '25px',
                      fontWeight: 400
                    }}
                  >
                    ...
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {isMobile ? null : (
          <div className="col-4 col-md-3">
            <div
              style={{
                textAlign: 'left',
                paddingLeft: '2rem'
              }}
            >
              {el.id ? (
                <>
                  <em className="greenCircle" />
                  <span>{el.tradeState.orderStatus}</span>
                </>
              ) : (
                <>
                  <em className="yellowCircle" />
                  <span>
                    <FormattedMessage id="skiped" />
                  </span>
                </>
              )}
            </div>
          </div>
        )}
        <div className="col-4 col-md-2" style={{ textAlign: 'center' }}>
          {formatMoney(el.tradePrice.totalPrice)}
        </div>
      </div>
      {/* ))} */}
    </div>
  );
};
export default CompletedDelivery;
