import React from 'react';
import { formatDate, optimizeImage } from '@/utils/utils';

const GiftList = ({
  modalList,
  setState,
  activeTabIdx,
  tabName,
  subDetail,
  noStartYear,
  isGift,
  changeTab
}) => {
  const isNotInactive = subDetail.subscribeStatus !== 'INACTIVE';
  const isActive = subDetail.subscribeStatus === 'ACTIVE';
  const handleSkipNext = (e, el) => {
    e.preventDefault();
    setState({
      modalType: 'skipNext',
      modalShow: true,
      currentModalObj: modalList.filter((el) => el.type === 'skipNext')[0],
      skipNextGoods: el.tradeItems?.map((el) => {
        return {
          skuId: el.skuId
        };
      })
    });
  };
  return isGift ? (
    <div className="rc-match-heights rc-content-h-middle rc-reverse-layout">
      <div>
        <div
          className="rc-border-bottom rc-border-colour--interface"
          style={{ width: '100%', display: 'inline-block' }}
        >
          <nav className="rc-fade--x">
            <ul
              className="rc-scroll--x rc-list rc-list--inline rc-list--align rc-list--blank"
              role="tablist"
            >
              {tabName?.map((ele, index) => (
                <li key={index}>
                  <button
                    className="rc-tab rc-btn rounded-0 border-top-0 border-right-0 border-left-0"
                    data-toggle={`tab__panel-${index}`}
                    aria-selected={activeTabIdx === index ? 'true' : 'false'}
                    role="tab"
                    onClick={(e) => changeTab(e, index)}
                  >
                    {ele}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="rc-tabs tabs-detail">
          {activeTabIdx === 0 &&
            subDetail.noStartTradeList &&
            subDetail.noStartTradeList
              .filter(
                (el) =>
                  noStartYear &&
                  el.tradeItems[0].nextDeliveryTime.split('-')[0] ===
                    noStartYear.value
              )
              ?.map((el) => (
                <>
                  <div className="card-container" style={{ borderBottom: 0 }}>
                    <div className="card rc-margin-y--none ml-0 border-0">
                      <div
                        className="3333 card-header row rc-margin-x--none align-items-center pl-0 pr-0"
                        style={{
                          background: '#f9f9f9',
                          height: '60px',
                          padding: 0
                        }}
                      >
                        <div className="col-3">
                          <FormattedMessage id="subscriptionDetail.deliveryDate" />
                        </div>
                        <div className="col-6">
                          <FormattedMessage id="subscriptionDetail.product" />
                        </div>
                      </div>
                    </div>
                    {el.tradeItems &&
                      el.tradeItems?.map((tradeItem, index) => (
                        <div
                          className="row rc-margin-x--none row align-items-center 1"
                          style={{
                            padding: '1rem 0',
                            borderBottom: '1px solid #d7d7d7'
                          }}
                          key={index}
                        >
                          <div className={`col-3`}>
                            {/* <div className={`${isMobile ? 'none' : 'col-3'}`}> */}
                            <p
                              style={{
                                marginBottom: '0',
                                fontWeight: '400'
                              }}
                            >
                              Shipment on
                              <br />
                              <span
                                style={{
                                  color: 'rgb(226, 0, 26)',
                                  fontWeight: '400'
                                }}
                              >
                                {formatDate({
                                  date: el.tradeItems[0].nextDeliveryTime
                                })}
                              </span>
                            </p>
                          </div>
                          <div
                            className={`${
                              isMobile ? 'col-6' : 'col-5'
                            } col-md-5`}
                          >
                            <div
                              className="rc-layout-container rc-five-column"
                              style={{
                                paddingRight: isMobile ? '0' : '60px',
                                paddingTop: '0'
                              }}
                            >
                              <div
                                className="rc-column mr-3 flex flex-row"
                                style={{
                                  width: '80%',
                                  padding: 0
                                }}
                              >
                                <LazyLoad>
                                  <img
                                    style={{
                                      width: '70px',
                                      margin: '0 .625rem'
                                    }}
                                    src={optimizeImage({
                                      originImageUrl: tradeItem.pic
                                    })}
                                    alt={tradeItem.skuName}
                                  />
                                </LazyLoad>
                                <div
                                  style={{
                                    width: '200px',
                                    paddingTop: '30px'
                                  }}
                                >
                                  <h5
                                    className="text-nowrap"
                                    style={{
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      overflowWrap: 'normal',
                                      fontSize: '.875rem',
                                      width: isMobile ? '95px' : 'auto'
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
                                    {tradeItem.specDetails}{' '}
                                    {isMobile ? `x ${tradeItem.num}` : null}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className={`${
                              isMobile ? 'col-3' : 'col-4'
                            } col-md-4`}
                          >
                            <p
                              style={{
                                textAlign: 'right',
                                paddingRight: '.625rem',
                                marginBottom: '0'
                              }}
                            >
                              <div
                                className={`${isMobile ? 'col-3' : ''}`}
                                style={{
                                  padding: isMobile ? '0 0 0 .625rem' : '0'
                                }}
                              >
                                {isNotInactive ? (
                                  <>
                                    <LazyLoad>
                                      <img
                                        style={{
                                          display: 'inline-block',
                                          width: '1.25rem',
                                          marginRight: '5px'
                                        }}
                                        alt="skip icon"
                                        src={skipIcon}
                                      />
                                    </LazyLoad>
                                    <a
                                      className={`rc-styled-link ${
                                        isGift || !isActive
                                          ? 'disabled color-light-gray'
                                          : ''
                                      }`}
                                      href="#/"
                                      onClick={(e) => handleSkipNext(e, el)}
                                    >
                                      <FormattedMessage id="skip" />
                                    </a>
                                  </>
                                ) : null}
                              </div>
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </>
              ))}
        </div>
      </div>
    </div>
  ) : null;
};
export default GiftList;
