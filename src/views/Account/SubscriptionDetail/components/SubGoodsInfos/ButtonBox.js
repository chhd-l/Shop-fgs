import React, { useEffect, useState } from 'react';
import { FormattedMessage, injectIntl, FormattedDate } from 'react-intl';
import LazyLoad from 'react-lazyload';
import cancelIcon from '../../images/cancel.png';

import { getDeviceType } from '@/utils/utils';
const ButtonBox = ({ subDetail, isNotInactive, isDataChange }) => {
  const isMobile = getDeviceType() !== 'PC' || getDeviceType() === 'Pad';
  return (
    <div
      className="footerGroupButton"
      style={{ display: isNotInactive ? 'block' : 'none' }}
    >
      <p style={{ textAlign: isMobile ? 'center' : 'right' }}>
        <div
          className="pause-btn"
          style={{ display: 'inline-block', marginBottom: '10px' }}
        >
          {subDetail.subscribeStatus === '0' ? (
            <em
              className="iconfont"
              style={{
                fontSize: '1.25rem',
                color: 'rgb(242,148,35)',
                position: 'relative',
                top: '2px'
              }}
            >
              &#xe62f;
            </em>
          ) : (
            <em
              className="iconfont"
              style={{
                fontSize: '1.5rem',
                color: 'rgb(58,180,29)',
                position: 'relative',
                top: '4px'
              }}
            >
              &#xe6c2;
            </em>
          )}
          <a
            style={{
              paddingRight: '0.5rem',
              paddingLeft: '4px'
            }}
            className={`rc-styled-link`}
            onClick={() => this.pauseOrStart(subDetail)}
          >
            {subDetail.subscribeStatus === '0' ? (
              <FormattedMessage id="subscription.pause" />
            ) : (
              <FormattedMessage id="subscription.restart" />
            )}
          </a>
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <div style={{ display: 'inline-block', marginBottom: '10px' }}>
          <LazyLoad>
            <img
              style={{
                display: 'inline-block',
                width: '1.25rem',
                marginRight: '5px'
              }}
              alt="cancle icon"
              src={cancelIcon}
            />
          </LazyLoad>
          <a
            className="rc-styled-link"
            href="#/"
            onClick={(e) => {
              this.handleCancel(e);
            }}
          >
            <FormattedMessage id="subscription.cancelAll" />
          </a>
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button
          className={`rc-btn rc-btn--one ${
            isDataChange ? '' : 'rc-btn-solid-disabled'
          }`}
          onClick={() => this.handleSaveChange(subDetail)}
        >
          <FormattedMessage id="saveChange" />
        </button>
      </p>
    </div>
  );
};
export default ButtonBox;
