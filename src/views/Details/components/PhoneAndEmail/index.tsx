import React, { useEffect, useState } from 'react';
import { getDeviceType, optimizeImage } from '@/utils/utils';
import Skeleton from '@/components/NormalSkeleton';
import { FormattedMessage } from 'react-intl-phraseapp';
import { inject, observer } from 'mobx-react';

const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';
interface Props {
  loading: boolean;
  details: any;
  configStore: any;
}
const Fr = window.__.env.REACT_APP_COUNTRY === 'fr';
const Ru = window.__.env.REACT_APP_COUNTRY === 'ru';
const Tr = window.__.env.REACT_APP_COUNTRY === 'tr';
const Se = window.__.env.REACT_APP_COUNTRY === 'se';
const PhoneAndEmail = ({ loading, details, configStore }: Props) => {
  const [contactUs, setContactUs] = useState('');
  const [contactPhoneNumber, setContactPhoneNumber] = useState('');
  useEffect(() => {
    let contactUs = `mailto:${configStore.storeContactEmail}`;
    let contactPhoneNumber = `tel:${configStore.storeContactPhoneNumber}`;
    if (Fr) {
      contactUs = 'https://www.royalcanin.com/fr/contact-us';
    } else if (Tr) {
      contactUs = 'https://www.royalcanin.com/tr/contact-us'; //邮箱以后不要再代码里面修改了 可以直接在storePortal配置的哦
      contactPhoneNumber = 'https://www.royalcanin.com/tr/contact-us';
    } else if (Ru) {
      contactUs = 'mailto:contact.ru@royalcanin.com';
    } else if (Se) {
      contactUs = 'https://www.royalcanin.com/se/contact-us';
    }
    setContactUs(contactUs);
    setContactPhoneNumber(contactPhoneNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="split-line rc-bg-colour--brand4" />
      <div className="good-contact d-flex justify-content-center">
        {!isMobile ? (
          loading ? (
            <div className="good-contact-img mr-5">
              <Skeleton height="8%" />
            </div>
          ) : details.goodsImg ? (
            <div className="good-contact-img mr-5">
              <img
                className="w-100"
                src={optimizeImage({
                  originImageUrl: details.goodsImg,
                  width: 500
                })}
                alt="goods details image"
              />
            </div>
          ) : null
        ) : null}
        <div className="good-contact-dec">
          <div
            style={{ fontSize: '1.25rem' }}
            className="rc-gamma ui-text-overflow-line2 text-break mb-0 rc-margin-bottom--xs"
          >
            <FormattedMessage id="detail.question" />
          </div>
          <p>
            <FormattedMessage id="detail.answer" />
          </p>
          <div className="good-contact-link d-flex">
            <a href={contactPhoneNumber} className="good-contact-tel d-flex">
              <div>
                <p>
                  <FormattedMessage id="detail.telephone" />
                </p>
                {!Tr && (
                  <>
                    {' '}
                    <span>{configStore.storeContactPhoneNumber}</span>
                    <p>{configStore.contactTimePeriod}</p>
                  </>
                )}
              </div>
              <span className="rc-icon rc-contact rc-iconography rc-brand1" />
            </a>
            <a className="good-contact-email d-flex" href={contactUs}>
              <FormattedMessage id="detail.email" />
              <span className="rc-icon rc-email rc-iconography rc-brand1" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default inject('configStore')(observer(PhoneAndEmail));
