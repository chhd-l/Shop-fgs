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
import Bitmap3 from './images/Bitmap3.png';

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
          <div className="md:w-cs-1160  m-auto  pt-10 pb-10 pl-4 pr-4 md:p-0 md:pt-20 md:pb-16 box-content">
            {/* pc */}
            <div className="hidden md:block md:mb-20">
              <img src={hootbg} alt="" className="md:w-cs-1160 md:h-cs-439" />
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
              <div className="flex justify-center mt-3 mb-10 md:mb-0">
                <img src={hootbg2} alt="" />
              </div>
            </div>
            <p
              className="text-16 leading-6 md:w-cs-680 m-auto mb-4 md:mb-6 md:text-20 md:leading-7 text-center"
              style={{ color: '#666' }}
            >
              愛犬・愛猫の健康維持のために大切なフードを、毎回の購入の手間なく必要なタイミングに自動的にお届けするサービスです。　買い忘れの心配なく、安心して続けていただけます。
            </p>
            <div className="md:flex justify-evenly">
              <div className="md:w-cs-320 mb-4 md:mb-0">
                <h1 className="DINPro redColor text-22 leading-7 mb-2 md:mb-4 md:text-40 md:leading-56 font-semibold text-center">
                  Point 1
                </h1>
                <p
                  className="text-16 leading-6 PingFangSC md:leading-7 md:text-20 text-center"
                  style={{ color: '#666' }}
                >
                  配送頻度は、３週間から８週間まで１週間単位で設定いただけます
                </p>
              </div>
              <div className="md:w-cs-320 mb-4 md:mb-0">
                <h1 className="DINPro redColor text-22 leading-7 mb-2 md:mb-4 md:text-40 md:leading-56 font-semibold text-center">
                  Point 2
                </h1>
                <p
                  className="text-16 leading-6 PingFangSC md:leading-7 md:text-20 text-center"
                  style={{ color: '#666' }}
                >
                  お届け回数は、３回から設定いただけます
                </p>
              </div>
              <div className="md:w-cs-320 mb-4 md:mb-0">
                <h1 className="DINPro redColor text-22 leading-7 mb-2 md:mb-4 md:text-40 md:leading-56 font-semibold text-center">
                  Point 3
                </h1>
                <p
                  className="text-16 leading-6 PingFangSC md:leading-7 md:text-20 text-center"
                  style={{ color: '#666' }}
                >
                  配送頻度、お届け回数、お届け時間帯は、マイページの「購入履歴・定期購入履歴」の「履歴を確認する」ボタンからいつでも変更できます
                </p>
              </div>
            </div>
            <p
              className="PingFangSC text-16 leading-6 md:mt-10 md:leading-7 md:text-20 text-center"
              style={{ color: '#666' }}
            >
              必要なくなった場合は、マイページの「購入履歴・定期購入履歴」の「履歴を確認する」ボタンからいつでもキャンセル可能です。
              5,500円（税込）以上のご注文で配送料無料です。
            </p>
          </div>
          <div className="throughLine"></div>
          {/* 2 */}
          <div className="md:w-cs-920  m-auto  pt-10 pb-10 pl-4 pr-4 md:p-0 md:pt-20 md:pb-16 box-content">
            <h1 className="PingFangSC redColor text-28 leading-8 md:text-30 md:leading-9 font-semibold text-center ">
              定期購入ご注文方法
            </h1>
            <p
              className="PingFangSC text-16 leading-7 md:text-18 md:leading-9 mt-4 mb-6 md:mt-10 md:mb-4"
              style={{ color: '#666' }}
            >
              １）購入したい製品の詳細ページで「定期購入をする」ボタンをクリックしてください。
            </p>
            <img src={Bitmap1} alt="" className="md:w-cs-920 md:h-cs-450" />
            {/* pc */}
            <p
              className="hidden md:block PingFangSC text-16 leading-7 md:text-18 md:leading-9 mt-6 md:mt-10 mb-4"
              style={{ color: '#666' }}
            >
              ２）定期購入のショッピングカート画面で、「配送頻度」と「お届け回数」を選んでください。
              <br />
              ※お届け回数は、最低３回からお申込みいただけます。
            </p>
            {/* 手机 */}
            <p
              className="block md:hidden PingFangSC text-16 leading-7 md:text-18 md:leading-9 mt-6 md:mt-10 mb-4"
              style={{ color: '#666' }}
            >
              ２）定期購入のショッピングカート画面で、「配送頻度」と「お届け回数」を選んでください。
              ※お届け回数は、最低３回からお申込みいただけます。
            </p>
            <img src={Bitmap2} alt="" className="md:w-cs-920 md:h-cs-450" />
            <p
              className="PingFangSC text-16 leading-7 md:text-18 md:leading-9  mt-6 md:mt-10 md:mb-4"
              style={{ color: '#666' }}
            >
              ３）「レジへ進む」ボタンをクリックし、画面にしたがって購入完了まで進んでいただければ定期購入のご注文が完了します。
            </p>
          </div>
          <div className="throughLine"></div>
          <div className="md:hidden md:w-cs-920  m-auto  pt-10 pb-10 pl-4 pr-4 md:p-0 md:pt-20 md:pb-16 box-content">
            <h1 className="PingFangSC redColor text-22 leading-7 md:text-30 md:leading-10 font-semibold text-center mb-4 md:mb-6">
              会員ステージと保有ポイントの確認方法
            </h1>
            <p
              className="PingFangSC text-16 leading-6 md:text-20 md:leading-7 text-center"
              style={{ color: '#666' }}
            >
              現在の会員ステージと保有ポイントは、ログイン後のマイページでご確認いただけます。会員ステージは、毎月15日午前3時に集計して決定します。
            </p>
            <img src={Bitmap3} alt="" className="md:w-cs-920 md:h-cs-450" />
          </div>
          <div className="throughLine md:hidden"></div>
          <div className="md:w-cs-920  m-auto  pt-10 pb-10 pl-4 pr-4 md:p-0 md:pt-20 md:pb-16 box-content">
            <h1 className="PingFangSC redColor text-22 leading-7 md:text-30 md:leading-10 font-semibold text-center mb-4 md:mb-6">
              定期購入についてのご利用ガイド
            </h1>
            <p
              className="PingFangSC text-16 leading-6 md:text-20 md:leading-7 text-center"
              style={{ color: '#666' }}
            >
              定期購入についてのよくあるお問合せはコチラ
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default injectIntl(seoHoc('AboutSubscription Page')(AboutSubscription));
