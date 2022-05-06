import React, { useState, useEffect } from 'react';
import autoshipIcon from '@/assets/images/autoship.png';
import {
  filterOrderId,
  getDeviceType,
  isCanVerifyBlacklistPostCode,
  formatDate,
  optimizeImage
} from '@/utils/utils';
import FrequencyMatch from '@/components/FrequencyMatch';
// import { getSubList } from '@/api/subscription';
import { IMG_DEFAULT } from '@/utils/constant';
import { getClubLogo } from '@/utils/utils';
import { Link } from 'react-router-dom';
import Skeleton from 'react-skeleton-loader';
import { FormattedMessage } from 'react-intl-phraseapp';

const localItemRoyal = window.__.localItemRoyal;

const IndvItem = ({ subItem, history, intl }) => {
  const isMobile = getDeviceType() !== 'PC';
  console.log(subItem, 'subItem------');
  return (
    <div
      className="row rc-margin-x--none row align-items-center card-container pb-3 clubBox ClubItem-wrap border border-d7d7d7 rounded"
      style={{ marginTop: '0', marginBottom: '1.25rem' }}
      key={subItem.subscribeId}
    >
      <div className="card rc-margin-y--none ml-0 border-0">
        <div className="card-header row rc-margin-x--none align-items-center pl-0 pr-0 pt-3 pb-3 bg-rc-f6">
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
          {/*<div className="col-4 col-md-2" />*/}
          {/*<div className="col-4 col-md-2" />*/}
          {subItem?.postCodeValidResponse
            ?.validFlag ? null : isCanVerifyBlacklistPostCode ? (
            <div className="col-12 col-md-8 order-hint text-left md:text-right text-rc-red">
              <span>{subItem.postCodeValidResponse.alert}</span>
            </div>
          ) : null}
        </div>
      </div>
      <div className="col-12 col-md-4 d-flex flex-wrap">
        {(subItem.goodsInfo || []).map((item, i) => (
          <div className="flex" style={{ margin: '.625rem 1.25rem' }} key={i}>
            {/* <LazyLoad> */}
            <img
              style={{
                width: '70px',
                display: 'inline-block'
              }}
              key={item.spuId}
              src={
                optimizeImage({ originImageUrl: item.goodsPic }) || IMG_DEFAULT
              }
              alt={`${item.petsName}'s personalized subscription`}
              title={`${item.petsName}'s personalized subscription`}
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
                  marginBottom: '5px'
                }}
              >
                <FormattedMessage
                  id="subscription.personalized"
                  values={{
                    val1: item.petsName
                  }}
                />
                {/*{`${item.petsName}'s personalized subscription`}*/}
              </p>
              <p>
                {item.specText} - 1 <FormattedMessage id="units" />
              </p>
              {/* <p>
                  {window.__.env.REACT_APP_COUNTRY == 'fr'
                    ? (item.subscribeNum / 1000).toString().replace('.', ',')
                    : item.subscribeNum / 1000 + 'kg'}{' '}
                  - 1 <FormattedMessage id="units" />
                </p> */}
              <p>
                {/* 30 daily rations Delivered every month */}
                <FormattedMessage id="subscription.frequencyDelivery" />
                <FormattedMessage id="subscription.deliveryEvery" />
                <FrequencyMatch currentId={item.periodTypeId} />
                {/* 30 days */}
                {/* <FrequencyMatch currentId={item.periodTypeId} /> */}
              </p>
            </span>
          </div>
        ))}
      </div>
      <div className="col-12 col-md-4 text-nowrap ml-3 mt-3 mb-3">
        {/* <LazyLoad> */}
        <img
          src={getClubLogo({ subscriptionType: 'Individualization' })}
          style={{
            width: '75px',
            display: 'inline-block',
            marginRight: '30px'
          }}
          alt="indv logo"
        />
        {/* </LazyLoad> */}
        {/* <LazyLoad> */}
        <img
          src={autoshipIcon}
          style={{
            width: '40px',
            display: 'inline-block'
          }}
          alt="autoship icon"
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
            {/*Subscription started*/}
            {/*date d'inscription au CLUB*/}
            <FormattedMessage id="autoShipStarted2" />
          </p>
          <p style={{ color: '#666', fontSize: '1rem' }}>
            {formatDate({ date: subItem.createTime })}
          </p>
        </span>
      </div>
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
      <div className="col-2 col-md-2 ml-3" style={{ textAlign: 'center' }}>
        {/* <Link to={`/account/subscription/order/detail/${subItem.subscribeId}`}>
          <FormattedMessage id="Manage" />
        </Link> */}
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
  );
};
export default IndvItem;
