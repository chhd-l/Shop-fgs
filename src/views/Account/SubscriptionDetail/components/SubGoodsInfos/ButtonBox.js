import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
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
      style={{ display: isNotInactive ? 'inline-block' : 'none' }}
    >
      <p
        className="flex justify-center md:justify-end items-center flex-wrap"
        style={{ textAlign: isMobile ? 'left' : 'right' }}
      >
        <div
          className="pause-btn flex items-center"
          style={{ marginBottom: '10px' }}
        >
          {subDetail.subscribeStatus === '0' ? (
            <em
              className="iconfont iconzanting font-bold"
              style={{
                fontSize: '1.25rem',
                color: 'rgb(242,148,35)'
              }}
            />
          ) : (
            <em
              className="iconfont iconplay1 font-bold"
              style={{
                fontSize: '1.5rem',
                color: 'rgb(58,180,29)'
              }}
            />
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
        <div className="flex items-center" style={{ marginBottom: '10px' }}>
          <span className="iconfont iconchahao text-rc-red font-bold text-lg mr-1" />
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
