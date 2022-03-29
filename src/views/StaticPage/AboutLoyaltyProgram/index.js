import React, { Component, useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Loading from '@/components/Loading';
import { seoHoc } from '@/framework/common';
import './index.less';
import { Helmet } from 'react-helmet';
import Group1 from "./images/Group1.png"

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
          {/* 电脑端 */}
          <div className='h-285 m-auto hidden md:block'>
            <div className="mt-24 PingFangSC text-center font-normal">
              <p className="w-285 m-auto h-34  text-primary text-30   leading-34">
              ポイントプログラム
              </p>
              <p
                className="w-285 m-auto h-64  text-primary-gray  text-18  leading-32 mt-16"
              >
               定期購入とステージアップで最大10%ポイント還元
              </p>
            </div>
            <div className='mt-13.65'>
            <img src={Group1} alt="" />
            </div>
          </div>
          <div className='h-285 m-auto block md:hidden'>
            <div className="mt-24 PingFangSC text-center font-normal">
              <h1 className="w-285 m-auto h-34  text-primary text-30   leading-34">
              ポイントプログラム
              </h1>
              <p
                className="w-285 m-auto h-64  text-primary-gray  text-18  leading-32 mt-16"
              >
               定期購入とステージアップで最大10%ポイント還元
              </p>
            </div>
            <div className='mt-13.65'>
            <img src={Group1} alt="" />
            </div>
          </div>
          <div className='h-1241 PingFangSC text-primary-gray text-center text-16 font-normal leading-24 mt-24.35 m-auto '>
            <p className='w-284'>マイ ロイヤルカナンのポイントプログラムは、1ポイント＝1円としてマイ ロイヤルカナンで使用できるポイントがご購入の度に貯まる、お得なプログラムです。ポイントの付与率は、マイ ロイヤルカナンでの直近6ヵ月間の製品購入累計金額<span className='text-primary-star'>＊</span>によって決まる、３つのステージ（ブロンズ、シルバー、ゴールド）によって異なります。<br/>
            <br/>
            ご購入いただいた税抜製品価格<span className='text-primary-star'>＊＊</span>に対し、ブロンズ会員の方は3％、シルバー会員の方は５％、ゴールド会員の方は8%のポイントが付与されます。また、定期購入をお申込みいただくとプラス2％が追加で付与され、ブロンズ会員で定期購入お申込みの方は5%、シルバー会員で定期購入お申込みの方は7％、ゴールド会員で定期購入お申込みの方は10％のポイントが付与されます。<span className='text-primary-star'>＊＊＊</span><br/>
            <br/>
            マイ ロイヤルカナン ポイントプログラムでは、愛犬・愛猫の真の健康を実現していくために、今後、愛犬・愛猫の健康管理をコンセプトとした特典やプロモーションを実施していく予定です。
            </p>
            <a href='f' className='w-240 font-medium text-black underline mt-8 ml-22 mr-22'>定期購入について詳しくはこちら</a>
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
