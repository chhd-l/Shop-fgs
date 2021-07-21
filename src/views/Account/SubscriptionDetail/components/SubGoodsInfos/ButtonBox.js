import React, { useEffect, useState, useContext } from 'react';
import { FormattedMessage, injectIntl, FormattedDate } from 'react-intl';
import cancelIcon from '../../images/cancel.png';
import { SubGoodsInfosContext } from './index';
import { myAccountActionPushEvent } from '@/utils/GA';
import { getDeviceType } from '@/utils/utils';
import { startSubscription, pauseSubscription } from '@/api/subscription';
const ButtonBox = () => {
  const isMobile = getDeviceType() !== 'PC' || getDeviceType() === 'Pad';
  const SubGoodsInfosValue = useContext(SubGoodsInfosContext);
  const {
    subDetail,
    handleSaveChange,
    isDataChange,
    getDetail,
    modalList,
    setState
  } = SubGoodsInfosValue;
  const isNotInactive =
    subDetail.subscribeStatus === '0' || subDetail.subscribeStatus === '1';
  const pauseOrStart = async (subDetail) => {
    let subscribeStatus = '0';
    let subscribeStatusText = 'Restart Subscription';
    let action = startSubscription;
    let param = {
      subscribeId: subDetail.subscribeId
    };
    //subscribeStatus 暂停传1 重启0
    if (subDetail.subscribeStatus === '0') {
      subscribeStatus = '1';
      subscribeStatusText = 'Pause Subscription';
      action = pauseSubscription;
    }
    param.subscribeStatus = subscribeStatus;
    setState({ loadingPage: true });
    try {
      let res = await action(param);
      subscribeStatusText && myAccountActionPushEvent(subscribeStatusText);
      await getDetail();
    } catch (err) {
      showErrMsg(err.message);
    } finally {
      setState({ loadingPage: false });
    }
  };
  const handleCancel = (e) => {
    e.preventDefault();
    setState({
      modalType: 'cancelAll',
      modalShow: true,
      currentModalObj: modalList.filter((el) => el.type === 'cancelAll')[0]
    });
  };
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
            onClick={() => pauseOrStart(subDetail)}
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
          <img
            style={{
              display: 'inline-block',
              width: '1.25rem',
              marginRight: '5px'
            }}
            alt="cancle icon"
            src={cancelIcon}
          />
          <a
            className="rc-styled-link"
            href="#/"
            onClick={(e) => {
              handleCancel(e);
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
          onClick={() => handleSaveChange(subDetail)}
        >
          <FormattedMessage id="saveChange" />
        </button>
      </p>
    </div>
  );
};
export default ButtonBox;
