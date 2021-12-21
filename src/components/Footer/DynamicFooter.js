import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { fetchFooterConfig } from '@/api';
import getCountryCodeFromHref from '@/lib/get-country-code-from-href';
import LazyLoad from 'react-lazyload';
import { inject, observer } from 'mobx-react';

const DynamicFooter = ({ configStore, intl }) => {
  const [footHtml, setFooterHtml] = useState('');

  useEffect(() => {
    const getData = async () => {
      const param = getCountryCodeFromHref();
      const res = await fetchFooterConfig(param?.countryCode);
      setFooterHtml(res?.context?.footer || '');
    };
    getData();
  }, []);

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
                className={`flex flex-wrap justify-content-start`}
                style={{ fontSize: '0' }}
              >
                {logos.map((img, i) => (
                  <LazyLoad
                    key={i}
                    className={`mb-2 ${(i + 1) % 4 == 0 ? '' : 'mr-2'}`}
                  >
                    <img src={img.imgUrl} alt={i} style={{ width: '2.7rem' }} />
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
