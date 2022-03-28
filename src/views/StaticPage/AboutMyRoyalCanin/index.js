import React, { Component, useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Loading from '@/components/Loading';
import { seoHoc } from '@/framework/common';
import './index.less';
import { Helmet } from 'react-helmet';

import ScreenHot1 from './images/Screenshot.png';

const pageLink = window.location.href;

function MyRoyalCanin(props) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div>
      <Helmet>
        <link rel="canonical" href={pageLink} />
      </Helmet>
      <div className="myRoyalCanin">
        {/* {isLoading ? <Loading bgColor={'#fff'} /> : null} */}
        <Header {...props} showMiniIcons={true} showUserIcon={true} />
        <div
          className="rc-content--fixed-header w-full"
          style={{ background: '#fff' }}
        >
          <div className="md:w-920 md:h-409 md:m-auto md:flex md:justify-between md:mt-20 md:pb-20 md:box-content">
            <div className="md:flex md:flex-wrap md:flex-col md:justify-between">
              <h1 className="PingFangSC redColor text-22 leading-7 md:text-30 w-288 h-56 md:w-392 md:h-80 md:leading-10 font-bold">
                マイ ロイヤルカナンについて
              </h1>

              <p
                className="md:w-440 md:h-238 md:text-18 md:leading-9"
                style={{ color: '#666666' }}
              >
                「マイロイヤルカナン」は、個々の犬
                と猫で異なる栄養要求にこたえる、ロイ
                ヤルカナンのきめ細やかなドッグフー
                ド、キャットフードをお届けするロイヤ
                ルカナンの公式通販サイトです。ロイヤ
                ルカナンの総合栄養食の全製品をご購入
                いただける他、公式通販サイトだけの限
                定犬種・猫種専用フードも取り扱っています。
              </p>
              <button
                className="redBg hidden md:block md:w-244 md:h-48 md:leading-10 md:text-center md:rounded-3xl hover:underline"
                style={{ color: '#fff' }}
              >
                公式限定フードはこちら
              </button>
            </div>
            <img src={ScreenHot1} alt="" className="md:w-440 md:h-369" />
          </div>
          <div className="throughLine"></div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default injectIntl(seoHoc('MyRoyalCanin Page')(MyRoyalCanin));
