import React, { useEffect, useState } from 'react';
import { FormattedMessage, injectIntl, FormattedDate } from 'react-intl';

const ButtonBoxGift = ({ subDetail, isDataChange }) => {
  return (
    <div className="rc-layout-container rc-two-column subdeatial-button-mobile">
      <div
        className="rc-column subdeatial-button-mobile-save rc-md-down"
        style={{ textAlign: 'right' }}
      >
        <button
          className={`rc-btn rc-btn--one ${
            isDataChange ? '' : 'rc-btn-solid-disabled'
          } ${
            isDataChange && this.state.productListLoading
              ? 'ui-btn-loading'
              : ''
          } `}
          style={{
            marginTop: isMobile ? '.625rem' : '0',
            marginRight: '1rem'
          }}
          onClick={() => this.handleSaveChange(subDetail)}
        >
          <FormattedMessage id="saveChange" />
        </button>
      </div>

      <div className="rc-column d-flex">
        <div className="subdeatial-button-mobile-pad pause-btn">
          {subDetail.subscribeStatus === 0 ? (
            <em
              className="iconfont"
              style={{
                fontSize: '1.5rem',
                color: 'rgb(242,148,35)',
                position: 'relative',
                top: '4px'
              }}
            >
              &#xe6c2;
            </em>
          ) : (
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
          )}
          <span
            style={{
              position: 'relative',
              top: '-0.3rem',
              paddingRight: '0.5rem',
              paddingLeft: '0.5rem'
            }}
            className={`rc-styled-link
                ${this.state.isGift ? 'disabled' : ''}
                `}
          >
            {subDetail.subscribeStatus === '0' ? (
              <FormattedMessage id="subscription.pause" />
            ) : (
              <FormattedMessage id="subscription.restart" />
            )}
          </span>
        </div>
        <div>
          <em
            className="iconfont"
            style={{
              fontSize: '2rem',
              color: '#E1001A',
              paddingRight: '0.5rem',
              paddingLeft: '0.5rem'
            }}
          >
            &#xe619;
          </em>
          <a
            style={{ position: 'relative', top: '-0.3rem' }}
            className="rc-styled-link"
            onClick={(e) => this.handleGiftSubCancel(e, subDetail)}
          >
            <FormattedMessage id="subscription.cancelAll" />
          </a>
        </div>
      </div>
      <div
        className="rc-column subdeatial-button-mobile-save rc-md-up"
        style={{ textAlign: 'right' }}
      >
        <button
          className={`rc-btn rc-btn--one ${
            isDataChange ? '' : 'rc-btn-solid-disabled'
          }  ${
            isDataChange && this.state.productListLoading
              ? 'ui-btn-loading'
              : ''
          }`}
          style={{
            marginTop: isMobile ? '.625rem' : '0',
            marginRight: '1rem'
          }}
          onClick={() => this.handleSaveChange(subDetail)}
        >
          <FormattedMessage id="saveChange" />
        </button>
      </div>
    </div>
  );
};
export default ButtonBoxGift;
