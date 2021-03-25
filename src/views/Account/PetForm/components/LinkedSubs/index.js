import React, { useState, useEffect } from 'react';
import autoshipIcon from '@/assets/images/autoship.png';
import Club_Logo from '@/assets/images/Logo_club.png';
import { getFormatDate, getFrequencyDict, getDeviceType } from '@/utils/utils';
import LazyLoad from 'react-lazyload';
import { getSubList } from '@/api/subscription';
import Skeleton from 'react-skeleton-loader';
import { injectIntl, FormattedMessage } from 'react-intl';
import { IMG_DEFAULT } from '@/utils/constant';
import './index.css';

const localItemRoyal = window.__.localItemRoyal;

const LinkedSubs = (props) => {
  let [subList, setSubList] = useState([]);
  let [frequencyList, setFrequencyList] = useState([]);
  let [isShowAll, setIsShowAll] = useState(false);
  const { loading, errorMsg } = props;
  const isMobile = getDeviceType() !== 'PC';
  const querySubList = () => {
    props.setState({ loading: true });
    let param = {
      pageNum: 0,
      pageSize: 10,
      subscribeId: '',
      // subscribeStatus: form.subscribeStatus,
      customerAccount: localItemRoyal.get('rc-userinfo')
        ? localItemRoyal.get('rc-userinfo')['customerAccount']
        : ''
    };
    getSubList(param)
      .then((res) => {
        setSubList(res.context.subscriptionResponses);
        props.setState({
          loading: false
        });
      })
      .catch((err) => {
        console.log(err);
        props.setState({
          loading: false,
          errorMsg: err
        });
      });
  };

  useEffect(() => {
    getFrequencyDict().then((res) => {
      setFrequencyList(
        res.map((el) => {
          return {
            id: el.id,
            name: el.name,
            value: el.name
          };
        })
      );
    });
    querySubList();
  }, []);
  return (
    <div className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop">
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
                  key={subItem.subscribeId}
                >
                  <div className="col-4 col-md-4 d-flex flex-wrap">
                    {subItem.goodsInfo &&
                      subItem.goodsInfo.map((item) => (
                        <div style={{ marginLeft: '20px' }}>
                          <LazyLoad>
                            <img
                              style={{
                                width: '70px',
                                display: 'inline-block'
                              }}
                              key={item.spuId}
                              src={item.goodsPic || IMG_DEFAULT}
                              alt={item.goodsName}
                              title={item.goodsName}
                            />
                          </LazyLoad>
                          <span
                            style={{
                              display: 'inline-block',
                              verticalAlign: 'middle',
                              fontSize: '12px',
                              marginLeft: '10px',
                              width: isMobile ? 'auto' : '250px'
                            }}
                          >
                            <p
                              style={{
                                fontSize: '16px',
                                fontWeight: '400',
                                color: '#333',
                                marginBottom: '5px'
                              }}
                            >
                              {item.goodsName}
                            </p>
                            <p>
                              {item.specText} - {item.subscribeNum}{' '}
                              <FormattedMessage id="units" />
                            </p>
                            <p>
                              <FormattedMessage id="subscription.frequency" />:{' '}
                              {frequencyList.filter(
                                (el) => el.id === item.periodTypeId
                              )[0]
                                ? frequencyList.filter(
                                    (el) => el.id === item.periodTypeId
                                  )[0].value
                                : ''}
                            </p>
                          </span>
                        </div>
                      ))}
                  </div>
                  <div className="col-4 col-md-2 text-nowrap">
                    <LazyLoad>
                      <img
                        src={Club_Logo}
                        style={{
                          width: '75px',
                          display: 'inline-block',
                          marginRight: '30px'
                        }}
                        alt=""
                      />
                    </LazyLoad>
                    <LazyLoad>
                      <img
                        src={autoshipIcon}
                        style={{
                          width: '40px',
                          display: 'inline-block'
                        }}
                        alt=""
                      />
                    </LazyLoad>
                    <span
                      style={{
                        display: 'inline-block',
                        verticalAlign: 'middle',
                        fontSize: '12px',
                        marginLeft: '10px'
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
                      <p style={{ color: '#666', fontSize: '16px' }}>
                        {getFormatDate(subItem.createTime.split(' ')[0])}
                      </p>
                    </span>
                  </div>
                  <div className="col-4 col-md-2"></div>
                  <div className="col-4 col-md-2"></div>
                  <div
                    className="col-4 col-md-2"
                    style={{ textAlign: 'center' }}
                  >
                    {i % 2 === 0 ? (
                      <button
                        className="rc-btn rc-btn--two rc-btn--sm"
                        onClick={() => {}}
                      >
                        <FormattedMessage id="Link" />
                      </button>
                    ) : (
                      <a className="rc-styled-link" href="#/">
                        Unlink
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        {!isShowAll ? (
          <p className="more" style={{ marginTop: '1rem' }}>
            <a
              className="rc-styled-link"
              onClick={() => {
                setIsShowAll(true);
              }}
            >
              See other Subscription
            </a>
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default LinkedSubs;
