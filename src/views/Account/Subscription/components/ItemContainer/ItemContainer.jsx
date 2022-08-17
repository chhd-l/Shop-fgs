import React from 'react';
import cn from 'classnames';
import LazyLoad from 'react-lazyload';
import {
  formatDate,
  optimizeImage,
  filterOrderId,
  getDeviceType,
  isCanVerifyBlacklistPostCode
} from '@/utils/utils';
import FrequencyMatch from '@/components/FrequencyMatch';
import { IMG_DEFAULT } from '@/utils/constant';
import { FormattedMessage } from 'react-intl-phraseapp';
import { Button } from '@/components/Common';
import { useHistory } from 'react-router-dom';
import autoshipIcon from '@/assets/images/autoship.png';

const localItemRoyal = window.__.localItemRoyal;
const isMobile = getDeviceType() !== 'PC';

const ItemContainer = ({ subItem, className }) => {
  const isShowSpecLogo = Boolean(subItem.itemSpecLogoConf);

  const history = useHistory();

  return (
    <div
      data-auto-testid="Subscriptions-card-list"
      className={cn(
        'card-container autoshipBox AutoshipItem-wrap mt-0 mb-5 border border-d7d7d7 rounded',
        className
      )}
    >
      <div className="card rc-margin-y--none ml-0 border-0">
        <div className="card-header row rc-margin-x--none align-items-center px-0 py-3 bg-rc-f6">
          <div className="col-12 col-md-4 p-0">
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
      <div className="grid grid-cols-12 rc-margin-x--none align-items-center py-3">
        <div
          className={cn(
            'col-span-12 d-flex flex-wrap mx-2',
            isShowSpecLogo ? 'md:col-span-4' : 'md:col-span-5'
          )}
        >
          {(subItem.goodsInfo || []).map((item, i) => (
            <div
              className="flex"
              style={{
                margin: '.625rem 0',
                width: '100%'
              }}
              key={i}
            >
              <LazyLoad>
                <img
                  style={{
                    width: '70px',
                    display: 'inline-block'
                  }}
                  src={
                    optimizeImage({ originImageUrl: item.goodsPic }) ||
                    IMG_DEFAULT
                  }
                  alt={item.goodsName}
                  title={item.goodsName}
                />
              </LazyLoad>
              <span
                className="text-xs inline-block align-middle ml-2.5"
                style={{
                  width: 'calc(100% - 70px)'
                }}
              >
                <p
                  className="text-base font-normal font-333 truncate"
                  style={{
                    marginBottom: '5px',
                    maxWidth: 'auto'
                  }}
                >
                  {item.displayGoodsName}
                </p>
                <p>
                  {item.specText} - {item.displaySubscribeNum}{' '}
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
        <div
          className={cn(
            'col-span-12 text-nowrap mx-2 my-3',
            isShowSpecLogo ? 'md:col-span-4' : 'md:col-span-3'
          )}
        >
          {subItem.itemSpecLogoConf ? (
            <LazyLoad>
              <img
                src={subItem.itemSpecLogoConf.src}
                style={{
                  width: '75px',
                  display: 'inline-block',
                  marginRight: '30px'
                }}
                alt={subItem.itemSpecLogoConf.alt}
              />
            </LazyLoad>
          ) : null}

          <img
            src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/icons/Autoship.svg`}
            style={{
              width: '40px',
              display: 'inline-block'
            }}
            alt="autoship icon"
          />
          <span
            className="ml-2.5 align-middle text-base inline-block"
            style={{
              width: `calc(100% - ${
                subItem.itemSpecLogoConf ? 75 + 30 + 40 : 40
              }px)`
            }}
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
        <div className="col-span-6 md:col-span-2 mx-2 status">
          <StatusMark status={subItem.subscribeStatus} />
        </div>
        <div
          className={`col-span-6 md:col-span-2 text-center ${
            subItem.goodsInfo?.length ? 'visible' : 'invisible'
          }`}
        >
          <Button
            data-auto-testid="Subscriptions-card-list-Manage"
            size="small"
            className="truncate md:w-11/12"
            onClick={() => {
              localItemRoyal.set('subDetail', subItem);
              history.push(
                `/account/subscription/order/detail/${subItem.subscribeId}`
              );
            }}
          >
            <FormattedMessage
              id={
                subItem.subscribeStatus === '0' ||
                subItem.subscribeStatus === '1'
                  ? 'manage'
                  : 'subscription.viewDetails'
              }
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ItemContainer;

const StatusMark = ({ status }) => {
  switch (status) {
    case '0':
      return (
        <div className="ui-text-overflow-line1 subscription_status_active w-full lg:w-4/5 xl:w-full">
          <em className="greenCircle" />
          <FormattedMessage id="active" />
        </div>
      );
    case '1':
      return (
        <div className="ui-text-overflow-line1 subscription_status_paused w-full lg:w-4/5 xl:w-full">
          <em className="yellowCircle" />
          <FormattedMessage id="paused" />
        </div>
      );
    default:
      return (
        <div className="ui-text-overflow-line1 subscription_status_inactive w-full lg:w-4/5 xl:w-full">
          <em className="yellowCircle" />
          <FormattedMessage id="inactive" />
        </div>
      );
  }
};
