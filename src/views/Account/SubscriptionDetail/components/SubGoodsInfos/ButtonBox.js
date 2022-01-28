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
    setState,
    productListLoading,
    isShowClub,
    triggerShowChangeProduct
  } = SubGoodsInfosValue;
  const isIndv = subDetail.subscriptionType == 'Individualization';
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
        className="flex justify-center md:justify-end items-center flex-wrap flex-col md:flex-row"
        style={{ textAlign: isMobile ? 'left' : 'right' }}
      >
        {/* indv不会展示该按钮 */}
        {isShowClub && !isIndv && subDetail?.goodsInfo?.length == 1 ? (
          <div className=" flex items-center">
            <span
              style={{
                width: 'auto',
                paddingTop: '6px'
              }}
              className={`text-plain rc-styled-link ui-text-overflow-md-line1  ${
                productListLoading ? 'ui-btn-loading' : ''
              }`}
              onClick={() => {
                if (!!subDetail.petsId) {
                  setState({
                    triggerShowChangeProduct: Object.assign(
                      {},
                      triggerShowChangeProduct,
                      {
                        firstShow: !triggerShowChangeProduct.firstShow,
                        goodsInfo: subDetail?.goodsInfo,
                        isShowModal: true
                      }
                    )
                  });
                } else {
                  setState({ triggerShowAddNewPet: true });
                }
              }}
            >
              <em
                className="iconfont iconrefresh font-bold"
                style={{
                  fontSize: '1.1rem',
                  color: 'rgb(58,180,29)',
                  marginRight: '4px'
                }}
              />
              <span
              // className={`${productListLoading ? 'ui-btn-loading' : ''}`}
              >
                <FormattedMessage id="subscriptionDetail.changeProduct" />
              </span>
            </span>
          </div>
        ) : null}
        <br className="rc-md-up" />
        <div className="pause-btn flex items-center mx-4  mt-2">
          {subDetail.subscribeStatus === '0' ? (
            <em
              className="iconfont iconzanting font-bold pb-2 md:pb-1"
              style={{
                fontSize: '1.25rem',
                color: 'rgb(242,148,35)'
              }}
            />
          ) : (
            <em
              className="iconfont iconplay1 font-bold pb-2 md:pb-1"
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
        <div className="flex items-center  mt-2">
          <span className="iconfont iconchahao text-rc-red font-bold text-lg mr-1 pb-2 md:pb-1" />
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
        <button
          className={`rc-btn rc-btn--one  mx-4  mt-2 ${
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
