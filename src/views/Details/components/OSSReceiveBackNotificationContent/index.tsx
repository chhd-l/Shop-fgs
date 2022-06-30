/**
 * purpose: As a PO, I can click on the OOS SKU Then the notify bloc displays
 * oss means out of stuck
 */
import { stockNoticeModify } from '@/api/cart';
import { queryStockNotice } from '@/api/subscription';
import { EMAIL_REGEXP } from '@/utils/constant';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import './style.less';
export type OssReceiveBackNotificationContentProps = {
  visible?: boolean;
  details: any;
  userInfo: any;
  selectedSpecItem: any;
};
const OssReceiveBackNotificationContent = ({
  visible,
  details,
  selectedSpecItem,
  userInfo
}: OssReceiveBackNotificationContentProps) => {
  const { customerId } = userInfo;
  const { goodsId } = details;
  const [email, setEmail] = useState<string>();
  const [isEdited, setIsEdited] = useState(false);
  useEffect(() => {
    if (!visible || !selectedSpecItem || selectedSpecItem?.stock !== 0) return;

    async function req() {
      setIsEdited(false);
      setEmail('');
      const params = {
        customerId,
        goodsId,
        goodsInfoId: selectedSpecItem.goodsInfoId,
        fromAddress: '1'
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
    if (!email || !EMAIL_REGEXP.test(email)) {
      return;
    }

    // filter goodsInfoIds out of stock
    // const goodsInfoIds = goodsInfos
    //   .filter((goodsInfo: any) => goodsInfo.stock === 0)
    //   .map((goodsInfo: any) => goodsInfo.goodsInfoId);

    const params = {
      email,
      customerId,
      goodsId,
      goodsInfoId: [selectedSpecItem.goodsInfoId],
      fromAddress: '2'
    };
    await stockNoticeModify(params);
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
            <span className="rc-text-colour--success">{email}</span>
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
            <button
              className="rc-btn rc-btn--one rc-btn--sm h-8 px-5 py-0 w-36 mt-4 md:mt-0"
              onClick={handleSubmit}
            >
              <FormattedMessage id="notifyMe" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default OssReceiveBackNotificationContent;
