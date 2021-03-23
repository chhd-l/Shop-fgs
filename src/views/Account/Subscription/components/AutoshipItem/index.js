import React, { useState, useEffect } from 'react';
import autoshipIcon from '@/assets/images/autoship.png';
import Club_Logo from '@/assets/images/Logo_club.png';
import { getFormatDate, getFrequencyDict, getDeviceType } from '@/utils/utils';
import LazyLoad from 'react-lazyload';
import { getSubList } from '@/api/subscription';
import Skeleton from 'react-skeleton-loader';
import { injectIntl, FormattedMessage } from 'react-intl';
import { IMG_DEFAULT } from '@/utils/constant';
const localItemRoyal = window.__.localItemRoyal;
const AutoshipItem = ({ subItem, frequencyList }) => {
  const isMobile = getDeviceType() !== 'PC';
  return (
    <div
      className="card-container"
      style={{ marginTop: '0', marginBottom: '20px' }}
      key={subItem.subscribeId}
    >
      <div className="card rc-margin-y--none ml-0">
        <div className="card-header row rc-margin-x--none align-items-center pl-0 pr-0 pt-3 pb-3">
          <div className="col-12 col-md-4">
            <p
              style={{
                fontSize: '16px',
                fontWeight: '400',
                color: '#333',
                paddingLeft: '20px'
              }}
            >
              {subItem.subscribeId}
            </p>
          </div>
          <div className="col-4 col-md-2" />
          <div className="col-4 col-md-2" />
          <div className="col-4 col-md-2 pl-4" />
        </div>
      </div>
      <div className="row rc-margin-x--none row align-items-center pt-3 pb-3 1111">
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
              {/* <FormattedDate value={subItem.createTime.split(' ')[0]}/> */}
              {/* {subItem.createTime.split(' ')[0]} */}
            </p>
          </span>
        </div>
        <div className="col-4 col-md-2">{/* {subItem.frequency} */}</div>
        <div className="col-4 col-md-2">
          {subItem.subscribeStatus === '0' ||
          subItem.subscribeStatus === '1' ? (
            <div>
              <i className="greenCircle" />
              <FormattedMessage id="active" />
            </div>
          ) : (
            <div>
              <i className="yellowCircle" />
              <FormattedMessage id="inactive" />
            </div>
          )}
        </div>
        <div className="col-4 col-md-2">
          <button
            className="rc-btn rc-btn--two rc-btn--sm"
            onClick={() => {
              localItemRoyal.set('subDetail', subItem);
              this.props.history.push(
                `/account/subscription/order/detail/${subItem.subscribeId}`
              );
            }}
          >
            <FormattedMessage id="manage" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default AutoshipItem;
