import React, { useState, useEffect } from 'react';
import autoshipIcon from '@/assets/images/autoship.png';
import {
  getFrequencyDict,
  getDeviceType,
  getClubLogo,
  formatDate
} from '@/utils/utils';
import LazyLoad from 'react-lazyload';
import { getSubListForPet } from '@/api/subscription';
import { changeSubscriptionGoodsByPets } from '@/api/pet';
import Skeleton from 'react-skeleton-loader';
import { injectIntl, FormattedMessage } from 'react-intl-phraseapp';
import { IMG_DEFAULT } from '@/utils/constant';
import FrequencyMatch from '@/components/FrequencyMatch';
import './index.css';

const localItemRoyal = window.__.localItemRoyal;

const LinkedSubs = (props) => {
  let [subList, setSubList] = useState([]);
  let [btnLoading, setBtnLoading] = useState(false);
  let [isShowAll, setIsShowAll] = useState(false);
  const { loading, errorMsg } = props;
  const isMobile = getDeviceType() !== 'PC';
  const querySubList = () => {
    props.setState({ loading: true });
    // let param = {
    //   pageNum: 0,
    //   pageSize: 10,
    //   subscribeId: '',
    //   // subscribeStatus: form.subscribeStatus,
    //   customerAccount: localItemRoyal.get('rc-userinfo')
    //     ? localItemRoyal.get('rc-userinfo')['customerAccount']
    //     : ''
    // };
    getSubListForPet({
      petsId: props.petsId,
      subscriptionPlanType: props.petsType
    })
      .then((res) => {
        setSubList(res.context);
        props.setState({
          subList: res.context,
          loading: false
        });
      })
      .catch((err) => {
        props.setState({
          loading: false,
          errorMsg: err.message
        });
      });
  };

  useEffect(() => {
    querySubList();
  }, []);
  return (
    <div className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop linkedSubsBox">
      {subList.length ? (
        <div>
          <h4 className="rc-delta rc-margin--none pb-2">
            <FormattedMessage id="subscription" />
          </h4>
        </div>
      ) : null}
      <div className="order__listing">
        <div className="order-list-container">
          {loading ? (
            <div className="mt-4">
              <Skeleton color="#f5f5f5" width="100%" height="50%" count={4} />
            </div>
          ) : errorMsg ? (
            <div className="text-center mt-5">
              <span className="rc-icon rc-incompatible--xs rc-iconography"></span>
              {errorMsg}
            </div>
          ) : (
            <>
              {subList.map((subItem, i) => (
                <div
                  className="row rc-margin-x--none row align-items-center card-container"
                  style={{
                    padding: '1rem 0',
                    marginTop: '1rem',
                    display: i < 2 || isShowAll ? 'flex' : 'none'
                  }}
                  key={i}
                >
                  <div className="col-12 col-md-4 d-flex flex-wrap">
                    <div style={{ marginLeft: '1.25rem' }}>
                      <LazyLoad>
                        <img
                          style={{
                            width: '70px',
                            display: 'inline-block'
                          }}
                          key={subItem.spuId}
                          src={subItem.goodsPic || IMG_DEFAULT}
                          alt={subItem.goodsName}
                          title={subItem.goodsName}
                        />
                      </LazyLoad>
                      <span
                        style={{
                          display: 'inline-block',
                          verticalAlign: 'middle',
                          fontSize: '.75rem',
                          marginLeft: '.625rem',
                          width: isMobile ? 'auto' : '250px'
                        }}
                      >
                        <p
                          style={{
                            fontSize: '1rem',
                            fontWeight: '400',
                            color: '#333',
                            marginBottom: '5px'
                          }}
                        >
                          {subItem.goodsName}
                        </p>
                        <p>
                          {subItem.specText} - {subItem.subscribeNum}{' '}
                          <FormattedMessage id="units" />
                        </p>
                        <p>
                          <FormattedMessage id="subscription.frequencyDelivery" />
                          <FormattedMessage id="subscription.deliveryEvery" />{' '}
                          <FrequencyMatch currentId={subItem.periodTypeId} />
                        </p>
                      </span>
                    </div>
                  </div>
                  <div className="col-12 col-md-2 text-nowrap">
                    <LazyLoad>
                      <img
                        src={getClubLogo({
                          subscriptionType: subItem.subscriptionType
                        })}
                        style={{
                          width: '75px',
                          display: 'inline-block',
                          marginRight: '30px'
                        }}
                        alt="club logo"
                      />
                    </LazyLoad>
                    <LazyLoad>
                      <img
                        src={autoshipIcon}
                        style={{
                          width: '40px',
                          display: 'inline-block'
                        }}
                        alt="autoship icon"
                      />
                    </LazyLoad>
                    <span
                      style={{
                        display: 'inline-block',
                        verticalAlign: 'middle',
                        fontSize: '.75rem',
                        marginLeft: '.625rem'
                      }}
                    >
                      <p
                        style={{
                          width: isMobile ? '120px' : 'auto',
                          textOverflow: 'ellipsis',
                          overflow: 'hidden'
                        }}
                      >
                        <FormattedMessage id="autoShipStarted" />
                      </p>
                      <p style={{ color: '#666', fontSize: '1rem' }}>
                        {formatDate({ date: subItem.createTime })}
                      </p>
                    </span>
                  </div>
                  <div className="col-12 col-md-2"></div>
                  <div className="col-12 col-md-2"></div>
                  <div
                    className="col-12 col-md-2"
                    style={{ textAlign: 'center' }}
                  >
                    {!subItem.petsId ? (
                      <button
                        className={`rc-btn rc-btn--two rc-btn--sm text-plain ${
                          btnLoading ? 'ui-btn-loading' : ''
                        }`}
                        onClick={() => {
                          if (btnLoading) {
                            return;
                          }
                          let params = {
                            petsId: props.petsId,
                            addGoodsItems: [
                              {
                                skuId: subItem.skuId,
                                subscribeNum: subItem.subscribeNum,
                                goodsInfoFlag: subItem.goodsInfoFlag,
                                periodTypeId: subItem.periodTypeId,
                                subscribeId: subItem.subscribeId
                              }
                            ],
                            subscribeId: subItem.subscribeId
                          };
                          setBtnLoading(true);
                          changeSubscriptionGoodsByPets(params)
                            .then((res) => {
                              let currentSubList = subList.map((el, index) => {
                                if (index === i) {
                                  el.petsId = props.petsId;
                                }
                                return el;
                              });
                              console.log(currentSubList, 'currentSubList1');
                              setBtnLoading(false);
                              setSubList(currentSubList);
                            })
                            .catch((err) => {
                              setBtnLoading(false);
                            });
                        }}
                      >
                        <FormattedMessage id="Link" />
                      </button>
                    ) : (
                      <a
                        className={`rc-styled-link text-plain ${
                          btnLoading ? 'ui-btn-loading' : ''
                        }`}
                        onClick={() => {
                          if (btnLoading) {
                            return;
                          }
                          let params = {
                            petsId: props.petsId,
                            deleteGoodsItems: [
                              {
                                skuId: subItem.skuId,
                                subscribeNum: subItem.subscribeNum,
                                goodsInfoFlag: subItem.goodsInfoFlag,
                                periodTypeId: subItem.periodTypeId,
                                subscribeId: subItem.subscribeId
                              }
                            ],
                            subscribeId: subItem.subscribeId
                          };
                          setBtnLoading(true);
                          changeSubscriptionGoodsByPets(params)
                            .then((res) => {
                              let currentSubList = subList.map((el, index) => {
                                if (index === i) {
                                  el.petsId = null;
                                }
                                return el;
                              });
                              console.log(currentSubList, 'currentSubList2');
                              // subItem.petsId = null;
                              setBtnLoading(false);
                              setSubList(currentSubList);
                            })
                            .catch((err) => {
                              setBtnLoading(false);
                            });
                        }}
                      >
                        <FormattedMessage id="Unlink" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        {!isShowAll && subList.length > 2 ? (
          <p className="more" style={{ marginTop: '1rem' }}>
            <a
              className="rc-styled-link"
              onClick={() => {
                setIsShowAll(true);
              }}
            >
              <FormattedMessage id="subscription.see_more" />
            </a>
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default LinkedSubs;
