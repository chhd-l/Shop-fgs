import React, { Component, useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Loading from '@/components/Loading';
import { seoHoc } from '@/framework/common';
import './index.less';
import { Helmet } from 'react-helmet';

const pageLink = window.location.href;
const legalNotice = '';
function LegalNotice(props) {
  const [isLoading, setIsLoading] = useState(false);
  const p = 'rc-description-black rc-description-black md:leading-26';
  return (
    <div>
      <Helmet>
        <link rel="canonical" href={pageLink} />
      </Helmet>
      <div className="legalNotice">
        {/* {isLoading ? <Loading bgColor={'#fff'} /> : null} */}
        <Header {...props} showMiniIcons={true} showUserIcon={true} />
        <div
          className="rc-content--fixed-header w-full "
          style={{ background: 'fff' }}
        >
          <div className="text-rc-title-red md:text-30 text-center">
            特定商取引に関する法律に基づく表記
          </div>
          <div className="text-left md:text-18 mx-340">
            <p className="text-rc-title-red rc-description-black md:leading-26">
              1 マイ ロイヤルカナン　サイト運営会社
            </p>
            <p className={p}>ロイヤルカナン ジャポン 合同会社</p>
            <p className={p}> 東京都港区港南1-2-70　品川シーズンテラス ７階</p>
            <p className={p}>
              ※製品の販売に関しては下記販売委託事業者がおこないます
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default injectIntl(seoHoc('LegalNotice Page')(LegalNotice));
