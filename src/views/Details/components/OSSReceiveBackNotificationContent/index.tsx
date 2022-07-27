import { stockNoticeModify, stockNoticeModifyUnLogin } from '@/api/cart';
import { queryStockNotice } from '@/api/subscription';
import { EMAIL_REGEXP } from '@/utils/constant';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import './style.less';
import { Details, Form, SelectedSpecItem, UserInfo } from './typing';
import { Button } from '@/components/Common';
import {
  GABackInStockNotifyMeClick,
  GABackToStockSubscription
} from '@/utils/GA/cart';

export type OssReceiveBackNotificationContentProps = {
  visible?: boolean;
  details: Details;
  form: Form;
  isLogin: boolean;
  quantity: number;
  userInfo: UserInfo;
  selectedSpecItem: SelectedSpecItem;
};
const OssReceiveBackNotificationContent = ({
  visible,
  details,
  quantity,
  isLogin,
  selectedSpecItem,
  userInfo,
  form
}: OssReceiveBackNotificationContentProps) => {
  const { goodsId } = details;
  const [email, setEmail] = useState<string>();
  const [isEdited, setIsEdited] = useState(false);
  useEffect(() => {
    if (!isLogin || !selectedSpecItem || selectedSpecItem?.stock !== 0) return;

    async function req() {
      setIsEdited(false);
      setEmail('');
      const params = {
        customerId: userInfo.customerId,
        goodsId,
        goodsInfoId: selectedSpecItem.goodsInfoId,
        fromAddress: '2'
      };
      const {
        context: { email, stockNotice }
      } = (await queryStockNotice(params)) as any;
      setIsEdited(stockNotice);
      setEmail(email);
    }
    req();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSpecItem?.goodsInfoId]);

  if (!visible) return null;
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
  };
  const handleSubmit = async () => {
    GABackInStockNotifyMeClick();
    GABackToStockSubscription(details, { ...form, quantity });
    if (!email || !EMAIL_REGEXP.test(email)) {
      return;
    }
    const detailName = details.goodsSpecs[0].chidren.find(
      (goods) => goods.selected
    )?.detailName;
    const goodsInfoId = selectedSpecItem.goodsInfoId;
    const params: any = {
      email,
      goodsId,
      stockNoticeGoodsInfoVOS: [
        {
          goodsInfoId,
          detailName
        }
      ],
      fromAddress: '2'
    };
    if (isLogin) {
      params.customerId = userInfo.customerId;
      await stockNoticeModify(params);
    } else {
      params.storeId = window.__.env.REACT_APP_STOREID;
      await stockNoticeModifyUnLogin(params);
    }
    setIsEdited(true);
  };
  return (
    <div className="p-6 mb-3 border-rc-ddd border-l border-r border-t border-b">
      <h2 className="text-base">
        {
          <FormattedMessage
            id={
              isEdited
                ? 'subscription.backToStockInfoActivated'
                : 'subscription.backToStockInfo'
            }
          />
        }
      </h2>
      <div className="mt-3 justify-between flex flex-col md:flex-row">
        {isEdited ? (
          <>
            <span className="rc-text-colour--success">
              {email}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 h-5 w-5 inline-block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>

            <button
              className="rc-btn rc-btn--two rc-btn--sm h-8 px-5 py-0 w-36 mt-4 md:mt-0"
              onClick={() => setIsEdited(false)}
            >
              <FormattedMessage id="modifyEmail" />
            </button>
          </>
        ) : (
          <>
            <span className="rc-input rc-input--inline rc-input--label my-0">
              <input
                className="rc-input__control p-0"
                id="id-text2"
                type="email"
                value={email}
                name="text"
                onChange={handleOnChange}
              />
              <label className="rc-input__label" htmlFor="id-text2">
                <span className="rc-input__label-text"></span>
              </label>
            </span>
            <Button
              type="primary"
              size="small"
              className="h-8 px-5 py-0 w-36 mt-4 md:mt-0"
              onClick={handleSubmit}
            >
              <FormattedMessage id="notifyMe" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default OssReceiveBackNotificationContent;
