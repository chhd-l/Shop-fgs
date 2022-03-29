import React, { Component, useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Loading from '@/components/Loading';
import { seoHoc } from '@/framework/common';
import './index.less';
import { Helmet } from 'react-helmet';

import hootbg from './images/hootbg.png';
import hootbg2 from './images/hootbg2.png';
import Bitmap1 from './images/Bitmap1.png';
import Bitmap2 from './images/Bitmap2.png';

const pageLink = window.location.href;

function AboutSubscription(props) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div>
      <Helmet>
        <link rel="canonical" href={pageLink} />
      </Helmet>
      <div className="aboutSubscription">
        {/* {isLoading ? <Loading bgColor={'#fff'} /> : null} */}
        <Header {...props} showMiniIcons={true} showUserIcon={true} />
        <div
          className="rc-content--fixed-header w-full "
          style={{ background: '#fff' }}
        >
          {/* 1 */}
          <div className="redborder md:w-1160  m-auto  pt-10 pb-10 pl-4 pr-4 md:p-0 md:pt-20 md:pb-16 box-content">
            {/* pc */}
            <div className="hidden md:block">
              <img src={hootbg} alt="" className="md:w-1160 md:h-439" />
            </div>
            {/* 移动 */}
            <div className="block md:hidden">
              <h1 className="PingFangSC redColor text-30 leading-9 font-semibold text-center">
                便利な定期購入
              </h1>
              <p
                className="PingFangSC mt-2 text-18 leading-8 text-center"
                style={{ color: '#666666' }}
              >
                必要なタイミングに自動的にお届け
                <br />
                します
              </p>
              <div>
                <img src={hootbg} alt="" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default injectIntl(seoHoc('AboutSubscription Page')(AboutSubscription));
