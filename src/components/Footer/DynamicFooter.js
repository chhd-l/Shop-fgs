import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import LazyLoad from 'react-lazyload';
import { inject, observer } from 'mobx-react';
import { optimizeImage } from '@/utils/utils';

const DynamicFooter = ({ configStore, intl }) => {
  const [footHtml, setFooterHtml] = useState('');

  useEffect(() => {
    const marsFooterHtml = configStore.info?.marsFooter;
    let ret = configStore.info?.footer;
    //将自定义的纯marsfooter富文本插入到footer下方，注：包含script/link的情况，此方式无效，在src\components\RouteFilter\RouteFilterHook.js中处理此种情况
    if (marsFooterHtml) {
      ret += marsFooterHtml;
      //不是script marsfooter时，才visible cookieSettingBox
      if (!marsFooterHtml.includes('script')) {
        const cookieDomBox = document.querySelector('.cookieSettingBox');
        if (cookieDomBox) {
          cookieDomBox.style.visibility = 'visible';
        }
      }
    }
    setFooterHtml(ret);
  }, [configStore.info?.footer, configStore.info?.marsFooter]);

  useEffect(() => {
    const paymentLogosBox = document.querySelector('#J_footer_payment_box');

    // 查询 payment logos
    const getPaymentLogos = async () => {
      const logos = await configStore.queryPaymentMethodCfg();
      setTimeout(() => {
        ReactDOM.render(renderPayLogosHtml({ logos }), paymentLogosBox);
      });
    };

    if (footHtml && paymentLogosBox) {
      getPaymentLogos();
    }
  }, [footHtml]);

  const renderPayLogosHtml = ({ logos }) => {
    const { messages } = intl;
    return (
      <>
        {/* payment logos */}
        {logos?.length ? (
          <>
            <div className={`rc-espilon rc-text--inverse`}>
              {messages['footer.securePaymentMethods']}
            </div>
            <div className={`rc-text--inverse`}>
              <div
                className={`flex flex-wrap justify-content-start items-center`}
                style={{ fontSize: '0' }}
              >
                {logos.map((img, i) => (
                  <LazyLoad key={i} className={`mb-2 mr-2`}>
                    <img
                      src={optimizeImage({
                        originImageUrl: img.imgUrl,
                        width: 80
                      })}
                      alt={i}
                      style={{ maxWidth: '2.7rem', maxHeight: '2rem' }}
                    />
                  </LazyLoad>
                ))}
              </div>
            </div>
          </>
        ) : null}
      </>
    );
  };

  return footHtml ? (
    <div
      className="col-span-12 grid grid-cols-12"
      dangerouslySetInnerHTML={{
        __html: footHtml
      }}
    />
  ) : null;
};

export default inject('configStore')(observer(DynamicFooter));
