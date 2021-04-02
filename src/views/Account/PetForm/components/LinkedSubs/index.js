import React, { useState, useEffect } from 'react';
import autoshipIcon from '@/assets/images/autoship.png';
import Club_Logo from '@/assets/images/Logo_club.png';
import { getFormatDate, getFrequencyDict, getDeviceType } from '@/utils/utils';
import LazyLoad from 'react-lazyload';
import {
  getSubList,
  getSubListForPet,
  changeSubscriptionGoods
} from '@/api/subscription';
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
    // let param = {
    //   pageNum: 0,
    //   pageSize: 10,
    //   subscribeId: '',
    //   // subscribeStatus: form.subscribeStatus,
    //   customerAccount: localItemRoyal.get('rc-userinfo')
    //     ? localItemRoyal.get('rc-userinfo')['customerAccount']
    //     : ''
    // };
    getSubListForPet({ petsId: props.petsId })
      .then((res) => {
        setSubList(res.context);
        props.setState({
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
                          <FormattedMessage id="subscription.frequency" />:{' '}
                          {frequencyList.filter(
                            (el) => el.id === subItem.periodTypeId
                          )[0]
                            ? frequencyList.filter(
                                (el) => el.id === subItem.periodTypeId
                              )[0].value
                            : ''}
                        </p>
                      </span>
                    </div>
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
                        alt="club-logo"
                      />
                    </LazyLoad>
                    <LazyLoad>
                      <img
                        src={autoshipIcon}
                        style={{
                          width: '40px',
                          display: 'inline-block'
                        }}
                        alt="autoship-icon"
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
                    {!subItem.petsId ? (
                      <button
                        className="rc-btn rc-btn--two rc-btn--sm"
                        onClick={() => {
                          let params = {
                            petsId: props.petsId,
                            addGoodsItems: {
                              skuId: subItem.skuId,
                              goodsNum: subItem.subscribeNum,
                              goodsInfoFlag: subItem.goodsInfoFlag,
                              periodTypeId: subItem.periodTypeId
                            }
                          };
                          changeSubscriptionGoods(params).then((res) => {});
                        }}
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
        {!isShowAll && subList.length ? (
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
