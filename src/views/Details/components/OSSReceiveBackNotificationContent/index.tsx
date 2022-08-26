import { stockNoticeModify, stockNoticeModifyUnLogin } from '@/api/cart';
import { queryStockNotice } from '@/api/subscription';
import { EMAIL_REGEXP } from '@/utils/constant';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import './style.less';
import { Details, Form, SelectedSpecItem, UserInfo } from './typing';
import { Button } from '@/components/Common';
import Consent, { List } from '@/components/Consent';
import {
  GABackInStockNotifyMeClick,
  GABackToStockSubscription
} from '@/utils/GA/cart';
import cn from 'classnames';

export type OssReceiveBackNotificationContentProps = {
  visible?: boolean;
  details: Details;
  form?: Form;
  isLogin: boolean;
  quantity?: number;
  userInfo: UserInfo;
  selectedSpecItem: SelectedSpecItem;
  notifyMeConsent?: any;
  className?:string;
  pageType?:string;
  defalutGoodsId?:string;
};
const OssReceiveBackNotificationContent = ({
  visible,
  details,
  quantity,
  isLogin,
  selectedSpecItem,
  userInfo,
  form,
  notifyMeConsent,
  className,
  pageType,
  defalutGoodsId
}: OssReceiveBackNotificationContentProps) => {
  const { goodsId='' } = details;
  const [email, setEmail] = useState<string>(userInfo?.email || '');
  const [isEdited, setIsEdited] = useState(false);
  const [correctEmail, setCorrectEmail] = useState(userInfo?.email?true:false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [list, setList] = useState<List[]>([]);
  useEffect(() => {
    if (notifyMeConsent?.length) {
      setList(notifyMeConsent);
    }
  }, [notifyMeConsent]);
  useEffect(() => {
    const consentCheckedStatus = list.every((item: any) => item.isChecked)
    setConsentChecked(consentCheckedStatus)
  }, [list])

  useEffect(() => {
    if (!isLogin || !selectedSpecItem || selectedSpecItem?.stock !== 0) return;

    async function req() {
      const params = {
        customerId: userInfo.customerId,
        goodsId:goodsId || defalutGoodsId,
        goodsInfoId: selectedSpecItem?.goodsInfoId,
        fromAddress: '2'
      };
      const {context} = (await queryStockNotice(params)) as any;
      setIsEdited(context?.stockNotice);
      context?.email && setEmail(email);
    }
    req();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSpecItem?.goodsInfoId]);
  if (!visible) return null;
  const sendList = (list: List[]) => {
    setList([...list]);
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const emailTest = EMAIL_REGEXP.test(value);
    setCorrectEmail(emailTest)
    setEmail(value);
  };
  const handleSubmit = async () => {
    if (pageType === 'pdp') {
      GABackInStockNotifyMeClick();
      GABackToStockSubscription(details, { ...form, quantity });
    }
    if (!email || !EMAIL_REGEXP.test(email)) {
      return;
    }
    if (!isLogin) {
      const consentCheckedStatus = list!.every((item: any) => item.isChecked);
      if (!consentCheckedStatus) {
        return;
      }
    }
    const detailName = details.goodsSpecs[0].chidren.find(
      (goods: any) => goods.selected
    )?.detailName;
    const goodsInfoId = selectedSpecItem.goodsInfoId;
    const params: any = {
      email,
      goodsId:goodsId|| defalutGoodsId,
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
      params.requiredList = list!.map((item: any) => {
        return {
          id: item.id,
          selectedFlag: true
        };
      });
      await stockNoticeModifyUnLogin(params);
    }
    setIsEdited(true);
  };

  const Ru = window.__.env.REACT_APP_COUNTRY === 'ru';
  const btnStatus = Ru ? consentChecked && correctEmail : correctEmail;
  return (
    <div className={`p-4 ${className}`}>
      <h2 className="text-base md:mr-2">
        {
          <FormattedMessage
            id={
              isEdited
                ? '<Back to stock> notification is activated for'
                : 'Receive "back in stock" notification'
            }
          />
        }
      </h2>
      <div className="mt-3 flex flex-col md:flex-row md:items-end w-full md:w-auto">
        {isEdited ? (
          <>
            <span className=" rc-text-colour--success mr-2 text-base">
              {email}
               <span className='iconfont iconchenggong font-bold icon-unsuscribe inline-block p-2 text-green'/>
            </span>

            <Button
              size="small"
              className='mt-2'
              onClick={() => setIsEdited(false)}
            >
              <FormattedMessage id="Modify e-mail" />
            </Button>
          </>
        ) : (
          <>
          <div className={cn('relative mb-0',{
            'rc-input--success':correctEmail
          })}>
              <input
                className="rc-input py-2 w-full md:w-60 border-b-2 mr-2"
                id="id-text2"
                type="email"
                value={email}
                name="text"
                onChange={handleOnChange}
              />
            {correctEmail&& <span className='absolute right-0 bottom-0 iconfont iconchenggong font-bold icon-unsuscribe inline-block p-2 text-green'/>} 
            </div>
            <Button
            className='mt-2'
              size="small"
              type="primary"
              disabled={!btnStatus}
              onClick={handleSubmit}
            >
              <FormattedMessage id="Notify me" />
            </Button>
          </>
        )}
      </div>
      {list?.length > 0 && (
        <div className="mt-3 ml-5">
          <Consent list={list} sendList={sendList} pageType="pdp page" />
        </div>
      )}
    </div>
  );
};

export default OssReceiveBackNotificationContent;
