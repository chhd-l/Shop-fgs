import React from 'react';
import autoshipIcon from '@/assets/images/autoship.png';
import {
  getDeviceType,
  isCanVerifyBlacklistPostCode,
  formatDate,
  optimizeImage
} from '@/utils/utils';
import FrequencyMatch from '@/components/FrequencyMatch';
import { FormattedMessage } from 'react-intl-phraseapp';
import { IMG_DEFAULT } from '@/utils/constant';
import { filterOrderId } from '@/utils/utils';

const localItemRoyal = window.__.localItemRoyal;

const AutoshipItem = ({ subItem, history }) => {
  const isMobile = getDeviceType() !== 'PC';

  return (
    <div
      className="card-container autoshipBox AutoshipItem-wrap mt-0 mb-5 border border-d7d7d7 rounded"
      key={subItem.subscribeId}
    >
      <div className="card rc-margin-y--none ml-0 border-0">
        <div className="card-header row rc-margin-x--none align-items-center px-0 py-3 bg-rc-f6">
          <div className="col-12 col-md-4">
            <p className="text-base font-normal pl-5 font-333">
              {filterOrderId({ orderNo: subItem.subscribeId })}
            </p>
          </div>
          {subItem?.postCodeValidResponse
            ?.validFlag ? null : isCanVerifyBlacklistPostCode ? (
            <div className="col-12 col-md-8 pl-4 order-hint text-left md:text-right text-rc-red font-333">
              <span>{subItem.postCodeValidResponse.alert}</span>
            </div>
          ) : null}
        </div>
      </div>
      <div className="grid grid-cols-12 rc-margin-x--none row align-items-center pt-3 pb-3 1111">
        <div className="col-span-12 md:col-span-5 d-flex flex-wrap">
          {(subItem.goodsInfo || []).map((item, i) => (
            <div
              className="flex"
              style={{ margin: '.625rem .01rem .625rem .01rem', width: '100%' }}
              key={i}
            >
              <img
                style={{
                  width: '70px',
                  display: 'inline-block'
                }}
                key={item.spuId}
                src={
                  optimizeImage({ originImageUrl: item.goodsPic }) ||
                  IMG_DEFAULT
                }
                alt={item.goodsName}
                title={item.goodsName}
              />
              <span
                className="text-xs inline-block align-middle ml-2.5 md:w3/5 lg:w-85/100 xl:w-full"
                style={{
                  width: isMobile ? 'auto' : 'calc(100% - 6.7rem)'
                }}
              >
                <p
                  className="text-base font-normal font-333 truncate"
                  style={{
                    marginBottom: '5px',
                    maxWidth: isMobile ? '200px' : 'auto'
                  }}
                >
                  {item.goodsName}
                </p>
                <p>
                  {item.specText} - {item.subscribeNum}{' '}
                  <FormattedMessage id="units" />
                </p>
                <p>
                  <FormattedMessage id="subscription.frequencyDelivery" />
                  <FormattedMessage id="subscription.deliveryEvery" />{' '}
                  <FrequencyMatch currentId={item.periodTypeId} />
                </p>
              </span>
            </div>
          ))}
        </div>
        <div className="col-span-12 md:col-span-3 text-nowrap ml-3 mt-3 mb-3">
          <img
            src={autoshipIcon}
            style={{
              width: '40px',
              display: 'inline-block'
            }}
            alt="auttoship icon"
          />
          <span
            className="ml-2.5 align-middle text-base inline-block"
            style={{ width: 'calc(100% - 50px)' }}
          >
            <p
              className="truncate"
              style={{
                width: isMobile ? '80%' : 'calc(100% - 10px)'
              }}
            >
              <FormattedMessage id="autoShipStarted2" />
            </p>
            <p style={{ color: '#666', fontSize: '1rem' }}>
              {formatDate({ date: subItem.createTime })}
            </p>
          </span>
        </div>
        <div
          className="col-span-4 md:col-span-2 ml-3 status"
          style={{ position: 'relative', paddingLeft: '0.9375rem' }}
        >
          {subItem.subscribeStatus === '0' ? (
            <div className="ui-text-overflow-line1 subscription_status_active w-full lg:w-4/5 xl:w-full">
              <em className="greenCircle" />
              <FormattedMessage id="active" />
            </div>
          ) : subItem.subscribeStatus === '1' ? (
            <div className="ui-text-overflow-line1 subscription_status_paused w-full lg:w-4/5 xl:w-full">
              <em className="yellowCircle" />
              <FormattedMessage id="paused" />
            </div>
          ) : (
            <div className="ui-text-overflow-line1 subscription_status_inactive w-full lg:w-4/5 xl:w-full">
              <em className="yellowCircle" />
              <FormattedMessage id="inactive" />
            </div>
          )}
        </div>
        <div className="col-span-4 md:col-span-2 text-center">
          <button
            className="rc-btn rc-btn--two rc-btn--sm truncate md:w-11/12"
            // style={{ width: '130px' }}
            onClick={() => {
              localItemRoyal.set('subDetail', subItem);
              history.push(
                `/account/subscription/order/detail/${subItem.subscribeId}`
              );
            }}
            // style={{
            //   width: '90%'
            // }}
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
