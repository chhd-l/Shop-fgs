import React, { Component, useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Loading from '@/components/Loading';
import { seoHoc } from '@/framework/common';
import './index.less';
import { Helmet } from 'react-helmet';

import ScreenHot1 from './images/Screenshot.png';
import ScreenHot2 from './images/Screenshot2.png';
import Bitmap1 from './images/Bitmap1.png';
import Bitmap2 from './images/Bitmap2.png';
import Bitmap3 from './images/Bitmap3.png';
import Bitmap4 from './images/Bitmap4.png';
import Bitmap5 from './images/Bitmap5.png';
const pageLink = window.location.href;

function AboutMyRoyalCanin(props) {
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
          {/* 1 */}
          <div className="md:w-920 md:h-431 md:m-auto md:flex md:justify-between md:mt-20 md:pb-20 box-content">
            <div className="md:h-431">
              <h1 className="PingFangSC redColor text-22 leading-7 m-auto mb-4  md:text-30 w-288 h-56 md:w-392 md:h-80 md:leading-10 font-semibold mt-6 md:mt-auto">
                マイ ロイヤルカナンについて
              </h1>
              <p
                className="PingFangSC m-auto mb-4 md:mb-14 w-288 h-234 md:w-440 md:h-238 text-16 md:text-18 leading-7 md:leading-9"
                style={{ color: '#666666' }}
              >
                「マイ
                ロイヤルカナン」は、個々の犬と猫で異なる栄養要求にこたえる、ロイヤルカナンのきめ細やかなドッグフード、キャットフードをお届けするロイヤルカナンの公式通販サイトです。ロイヤルカナンの総合栄養食の全製品をご購入いただける他、公式通販サイトだけの限定犬種・猫種専用フードも取り扱っています。
              </p>
              <button
                className="redBg hidden md:block md:w-244 md:h-48 md:leading-10 md:text-center md:rounded-3xl hover:underline"
                style={{ color: '#fff' }}
              >
                公式限定フードはこちら
              </button>
            </div>
            <img
              src={ScreenHot1}
              alt=""
              className="w-302 h-253 m-auto mb-10 md:mb-auto md:w-440 md:h-369"
            />
          </div>
          <div className="throughLine"></div>
          {/* 2 */}
          <div className="md:w-960 md:h-334 m-auto box-content pt-10 pb-10 md:pt-20 md:pb-20 md:flex md:justify-between">
            <img
              src={ScreenHot2}
              alt=""
              className="w-186 h-143 m-auto md:w-479 md:h-334"
            />
            <div className="md:w-440 md:h-full">
              <h1 className="redColor PingFangSC w-288 h-84 m-auto leading-7 font-semibold text-22 md:w-440 md:h-64 md:text-26 md:leading-8 md:mt-12 mb-4">
                最短で “当日出荷”、税込5500円以上のご注文で全国どこでも送料無料
              </h1>
              <p
                className="PingFangSC w-288 m-auto text-16 leading-6 md:w-440 md:leading-7 md:text-18"
                style={{ color: '#666666' }}
              >
                ご注文後、スピーディーにフードをお届けするのもマイ
                ロイヤルカナンの特長です。15:00までにお支払い手続きを完了いただいた場合、当日出荷いたします（日曜日・祝祭日・年末年始を除く）。また、5,500円（税込）以上ご注文いただいた場合には、全国どこでも（離島などを含む）送料無料でお届けします。
              </p>
            </div>
          </div>
          <div className="throughLine"></div>
          {/* 3 */}
          <div className="md:w-920 md:h-328 m-auto  md:flex md:justify-between pt-10 pb-10 pl-4 pr-4 md:pt-20 md:pb-20 box-content">
            <div className="top">
              <div>
                <img
                  src={Bitmap1}
                  alt=""
                  className="w-53 h-53 md:w-110 md:h-110 m-auto mb-4 md:mb-5"
                />
              </div>
              <h1 className="PingFangSC redColor w-288 leading-7 text-22 md:w-440 md:h-40 mb-4 md:text-30 md:leading-10 font-semibold">
                便利な定期購入サービス
              </h1>
              <p
                className="PingFangSC  leading-7 text-16 md:w-440 md:text-18"
                style={{ color: '#666666' }}
              >
                愛犬・愛猫の健康維持のために大切なフードを、必要なタイミングに自動的にお届けします。
              </p>
              <p
                className="PingFangSC md:w-440 mb-4 text-16 md:text-18 leading-7"
                style={{ color: '#666666' }}
              >
                買い忘れの心配なく、安心して続けていただけます。
              </p>
              <a
                href="javasrcipt:;"
                className="DINPro d7bottom-border text-14 leading-6 w-85/100 md:w-73/100 font-medium md:text-16"
                style={{ color: '#444444', display: 'inline' }}
              >
                定期購入サービスについて詳しくはこちら。
              </a>
            </div>
            <div className="d7bottom-border mt-8 mb-7 md:hidden"></div>
            <div className="bottom">
              <div>
                <img
                  src={Bitmap2}
                  alt=""
                  className="w-63 h-53 md:w-106 md:h-88 m-auto mb-4 md:mb-10"
                />
              </div>
              <h1 className="PingFangSC redColor tetx-22 leading-7 md:w-440 md:h-40  mb-3 md:mb-4 md:text-30 md:leading-10 font-semibold">
                お得なポイントプログラム
              </h1>
              <p
                className="PingFangSC text-16 leading-6 md:w-440 md:text-18 md:leading-7"
                style={{ color: '#666666' }}
              >
                ご購入の度にマイ ロイヤルカナンで使用できるポイントが、1ポイント
                = 1円人して貯まります。
              </p>
              <p
                className="PingFangSC text-16 leading-6 md:w-440 mb-4 md:text-18 md:leading-7"
                style={{ color: '#666666' }}
              >
                定期購入とステージアップで、税抜製品価格の最大10%が還元されます。
              </p>
              <a
                href="javasrcipt:;"
                className="DINPro d7bottom-border md:w-73/100 md:font-medium md:text-16 md:leading-6 "
                style={{ color: '#444444', display: 'inline' }}
              >
                ポイントプログラムについて詳しくはこちら。
              </a>
            </div>
          </div>
          <div className="throughLine"></div>
          {/* 4 */}
          <div className="md:w-680 md:h-556 m-auto  pt-10 pb-10 pl-4 pr-4 md:p-0 md:pt-20 md:pb-20 box-content">
            <h1 className="PingFangSC redColor text-22 leading-7 font-semibold text-left md:text-30 md:leading-10 md:text-center mb-2 md:mb-4">
              幅広くお選びいただけるお支払い方法
            </h1>
            <p
              className="PingFangSC text-16 leading-6 md:text-18 md:leading-9 md:text-center"
              style={{ color: '#666666' }}
            >
              お支払い方法は、クレジットカード、代金引換、コンビニ決済（先払い方式）から
              <br />
              お選びいただけます。お客様のご都合に合わせてお選びください。
              <br />
              ※定期購入はクレジットカード、代金引換のみになります。
            </p>
            <div>
              <img
                src={Bitmap3}
                alt=""
                className="w-288 h-74 md:w-440 md:h-114 m-auto mt-4 md:mb-20"
              />
            </div>
            <div className="d7bottom-border m-auto mt-8 mb-7 md:hidden"></div>
            <h1 className="PingFangSC redColor text-22 font-semibold text-left leading-7 md:text-30 md:leading-10 md:text-center mb-4">
              実績豊かなヤマト運輸が丁寧にお届け
            </h1>
            <p
              className="PingFangSC text-16 leading-6 md:text-18 md:leading-9 md:text-center"
              style={{ color: '#666666' }}
            >
              「お客様の大切な愛犬・愛猫のフードを確かにお手元に届けたい。」マイ
              ロイヤル
              <br />
              カナンの思いを経験・実績豊富なヤマト運輸を通じてお届けいたします。
            </p>
            <div>
              <img
                src={Bitmap4}
                alt=""
                className="w-full h-20 md:w-680 md:h-48 mt-4"
              />
            </div>
          </div>
          <div className="throughLine"></div>
          {/* 5 */}
          <div className="flex flex-wrap md:justify-between md:w-920 md:h-340 m-auto  pt-10 pb-10 pl-4 pr-4 md:p-0 md:pt-20 md:pb-20 box-content">
            <div className="left w-full md:w-440 order-2 md:order-1">
              <h1 className="PingFangSC redColor font-semibold text-22 leading-7 mb-4 mt-4 md:mt-0 md:text-30 md:leading-10">
                おいしさ満足保証」返金制度
              </h1>
              <p
                className="PingFangSC text-16 leading-6 mb-4 md:w-440 md:mb-7 md:text-18 md:leading-7"
                style={{ color: '#666666' }}
              >
                ロイヤルカナン製品は、犬や猫がしっかりとフードを食べてくれるように、粒（キブル）の表面に独自の製法で配合したフレーバーを使用した高嗜好性のフードですが、犬や猫はその生活環境や、いままで食べてきたフードの影響などから、フードの切り替えに敏感に反応してしまうこともまれに起こります。ロイヤルカナンは、愛犬・愛猫が美味しくフードを食べて満足していただけるよう、初回1袋に限り返金サービスを提供しています（※一部対象外の製品があります）。
              </p>
              <a
                href="javasrcipt:;"
                className="DINPro d7bottom-border text-14 leading-6 w-85/100 md:w-73/100 font-medium md:text-16"
                style={{ color: '#444444', display: 'inline' }}
              >
                おいしさ満足保証返金制度について詳しくはこちら。
              </a>
            </div>
            <div className="right w-full md:pt-20 md:w-440 order-1 md:order-2">
              <img src={Bitmap5} alt="" className="md:w-440 md:h-190" />
            </div>
          </div>
          <div className="throughLine hidden md:block"></div>
          {/* 6 */}
          <div className="hidden md:block md:w-520 md:h-174 m-auto  pt-10 pb-10 pl-4 pr-4 md:p-0 md:pt-20 md:pb-20 box-content">
            <h1 className="PingFangSC redColor font-semibold text-22 text-center leading-7 mb-4 mt-4 md:mt-0 md:text-30 md:leading-10">
              愛犬・愛猫の健康管理に役立つ情報をご提供
            </h1>
            <p
              className="PingFangSC text-16 leading-6 text-center mb-4  md:mb-7 md:text-18 md:leading-7"
              style={{ color: '#666666' }}
            >
              キャンペーンなどのお得な情報や、愛犬・愛猫の健康管理に役
              <br />
              立つ情報をニュースレターで配信しています。
              <br />
              ください。
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default injectIntl(seoHoc('AboutMyRoyalCanin Page')(AboutMyRoyalCanin));
