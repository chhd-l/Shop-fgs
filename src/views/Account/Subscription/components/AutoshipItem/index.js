import React, { useState, useEffect } from 'react';
import autoshipIcon from '@/assets/images/autoship.png';
import { getFormatDate, getDeviceType, getClubLogo } from '@/utils/utils';
import FrequencyMatch from '@/components/FrequencyMatch';
import LazyLoad from 'react-lazyload';
import { getSubList } from '@/api/subscription';
import Skeleton from 'react-skeleton-loader';
import { injectIntl, FormattedMessage } from 'react-intl-phraseapp';
import { IMG_DEFAULT } from '@/utils/constant';
import { filterOrderId } from '@/utils/utils';
const localItemRoyal = window.__.localItemRoyal;
const AutoshipItem = ({ subItem, history }) => {
  const isMobile = getDeviceType() !== 'PC';
  return (
    <div
      className="card-container autoshipBox"
      style={{ marginTop: '0', marginBottom: '1.25rem' }}
      key={subItem.subscribeId}
    >
      <div className="card rc-margin-y--none ml-0">
        <div className="card-header row rc-margin-x--none align-items-center pl-0 pr-0 pt-3 pb-3">
          <div className="col-12 col-md-4">
            <p
              style={{
                fontSize: '1rem',
                fontWeight: '400',
                color: '#333',
                paddingLeft: '1.25rem'
              }}
            >
              {filterOrderId({ orderNo: subItem.subscribeId })}
            </p>
          </div>
          <div className="col-4 col-md-2" />
          <div className="col-4 col-md-2" />
          <div className="col-4 col-md-2 pl-4" />
        </div>
      </div>
      <div className="row rc-margin-x--none row align-items-center pt-3 pb-3 1111">
        <div className="col-12 col-md-4 d-flex flex-wrap">
          {subItem.goodsInfo &&
            subItem.goodsInfo.map((item) => (
              <div style={{ margin: '.625rem 1.25rem' }}>
                {/* <LazyLoad> */}
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
                {/* </LazyLoad> */}
                <span
                  style={{
                    display: 'inline-block',
                    verticalAlign: 'middle',
                    fontSize: '.75rem',
                    marginLeft: '.625rem',
                    width: isMobile ? 'auto' : '200px'
                  }}
                >
                  <p
                    style={{
                      fontSize: '1rem',
                      fontWeight: '400',
                      color: '#333',
                      marginBottom: '5px',
                      maxWidth: isMobile ? '200px' : 'auto',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {item.goodsName}
                  </p>
                  <p>
                    {item.specText} - {item.subscribeNum}{' '}
                    <FormattedMessage id="units" />
                  </p>
                  <p>
                    <FormattedMessage id="subscription.frequency" />{' '}
                    <FrequencyMatch currentId={item.periodTypeId} />
                  </p>
                </span>
              </div>
            ))}
        </div>
        <div className="col-12 col-md-4 text-nowrap ml-3 mt-3 mb-3">
          {/* <LazyLoad> */}
          <img
            src={autoshipIcon}
            style={{
              width: '40px',
              display: 'inline-block'
            }}
            alt="auttoship icon"
          />
          {/* </LazyLoad> */}
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
              {/* <FormattedDate value={subItem.createTime.split(' ')[0]}/> */}
              {/* {subItem.createTime.split(' ')[0]} */}
            </p>
          </span>
        </div>
        {/* <div className="col-4 col-md-2">{subItem.frequency}</div> */}
        <div className="col-4 col-md-1 ml-3 status">
          {subItem.subscribeStatus === '0' ? (
            <div className="ui-text-overflow-line1">
              <em className="greenCircle" />
              <FormattedMessage id="active" />
            </div>
          ) : subItem.subscribeStatus === '1' ? (
            <div className="ui-text-overflow-line1">
              <em className="yellowCircle" />
              <FormattedMessage id="paused" />
            </div>
          ) : (
            <div className="ui-text-overflow-line1">
              <em className="yellowCircle" />
              <FormattedMessage id="inactive" />
            </div>
          )}
        </div>
        <div className="col-4 col-md-2 text-center ml-3">
          <button
            className="rc-btn rc-btn--two rc-btn--sm"
            style={{
              width: '130px',
              textOverflow: 'ellipsis',
              overflow: 'hidden'
            }}
            onClick={() => {
              localItemRoyal.set('subDetail', subItem);
              history.push(
                `/account/subscription/order/detail/${subItem.subscribeId}`
              );
            }}
          >
            {subItem.subscribeStatus === '0' ||
            subItem.subscribeStatus === '1' ? (
              <FormattedMessage id="manage" />
            ) : (
              <FormattedMessage id="subscription.viewDetails" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
export default AutoshipItem;
