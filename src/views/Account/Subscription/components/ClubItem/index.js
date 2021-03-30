import React, { useState, useEffect } from 'react';
import autoshipIcon from '@/assets/images/autoship.png';
import Club_Logo from '@/assets/images/Logo_club.png';
import { getFormatDate, getFrequencyDict, getDeviceType } from '@/utils/utils';
import LazyLoad from 'react-lazyload';
import { getSubList } from '@/api/subscription';
import { IMG_DEFAULT } from '@/utils/constant';
import { Link } from 'react-router-dom';
import Skeleton from 'react-skeleton-loader';
import { injectIntl, FormattedMessage } from 'react-intl';
const localItemRoyal = window.__.localItemRoyal;
const ClubItem = ({ subItem, idx, frequencyList }) => {
  const isMobile = getDeviceType() !== 'PC';
  return (
    <div
      className="row rc-margin-x--none row align-items-center card-container"
      style={{
        padding: '1rem 0',
        marginTop: '1rem'
        // display: idx < 2 || isShowAll ? 'flex' : 'none'
      }}
      key={subItem.subscribeId}
    >
      <div className="col-4 col-md-4 d-flex flex-wrap">
        {subItem.goodsInfo &&
          subItem.goodsInfo.map((item) => (
            <div style={{ marginLeft: '1.25rem' }}>
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
                  {item.goodsName}
                </p>
                <p>
                  {item.specText} - {item.subscribeNum}{' '}
                  <FormattedMessage id="units" />
                </p>
                <p>
                  <FormattedMessage id="subscription.frequency" />:{' '}
                  {frequencyList.filter((el) => el.id === item.periodTypeId)[0]
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
      <div className="col-4 col-md-2" style={{ textAlign: 'center' }}>
        <Link to={`/account/subscription/order/detail/${subItem.subscribeId}`}>
          <FormattedMessage id="Manage" />
        </Link>
      </div>
    </div>
  );
};
export default ClubItem;
