import React, { Component, useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Loading from '@/components/Loading';
import { seoHoc } from '@/framework/common';
import './index.less';
import { Helmet } from 'react-helmet';
import Group1 from './images/Group1.png';

const pageLink = window.location.href;

function AboutLoyaltyProgram(props) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div>
      <Helmet>
        <link rel="canonical" href={pageLink} />
      </Helmet>
      <div className="aboutLoyaltyProgram">
        {/* {isLoading ? <Loading bgColor={'#fff'} /> : null} */}
        <Header {...props} showMiniIcons={true} showUserIcon={true} />
        <div
          className="rc-content--fixed-header w-full pl-18 pr-17 flex flex-col flex-align-items"
          style={{ background: '#fff' }}
        >
          <div className="m-auto hidden md:block">
            <div className="mt-24 ">
              <p className=" h-34 PingFangSC text-primary text-30 text-center font-normal leading-34">
                ポイントプログラム
              </p>
              <p className=" h-64 PingFangSC text-primary-gray text-center text-18 font-normal leading-32 mt-16">
                定期購入とステージアップで最大10%ポイント還元
              </p>
            </div>
            <div className="mt-13.65">
              <img src={Group1} alt="" />
            </div>
          </div>
          <div className="m-auto block md:hidden">
            <div className="mt-24">
              <h1 className=" h-34 PingFangSC text-primary text-center text-30 font-normal leading-34">
                ポイントプログラム
              </h1>
              <p className=" h-64 PingFangSC text-primary-gray text-center text-18 font-normal leading-32 mt-16">
                定期購入とステージアップで最大10%ポイント還元
              </p>
            </div>
            <div className="mt-13.65">
              <img src={Group1} alt="" />
            </div>
          </div>
          <div className="h-672 PingFangSC text-primary-gray text-center text-16 font-normal leading-24 mt-24.35 m-auto ">
            <p className="w-284">
              マイ
              ロイヤルカナンのポイントプログラムは、1ポイント＝1円としてマイ
              ロイヤルカナンで使用できるポイントがご購入の度に貯まる、お得なプログラムです。ポイントの付与率は、マイ
              ロイヤルカナンでの直近6ヵ月間の製品購入累計金額＊によって決まる、３つのステージ（ブロンズ、シルバー、ゴールド）によって異なります。
              <br />
              ご購入いただいた税抜製品価格＊＊に対し、ブロンズ会員の方は3％、シルバー会員の方は５％、ゴールド会員の方は8%のポイントが付与されます。また、定期購入をお申込みいただくとプラス2％が追加で付与され、ブロンズ会員で定期購入お申込みの方は5%、シルバー会員で定期購入お申込みの方は7％、ゴールド会員で定期購入お申込みの方は10％のポイントが付与されます。＊＊＊
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default injectIntl(
  seoHoc('AboutLoyaltyProgram Page')(AboutLoyaltyProgram)
);
