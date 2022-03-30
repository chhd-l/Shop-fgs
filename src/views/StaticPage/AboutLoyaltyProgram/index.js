import React, { Component, useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Loading from '@/components/Loading';
import { seoHoc } from '@/framework/common';
import './index.less';
import { Helmet } from 'react-helmet';
import Group1 from './images/Group1.png';
import Bitmap1 from "./images/Bitmap1.png";
import Bitmap2 from "./images/Bitmap2.png";
import BitmapCopy from "./images/BitmapCopy.png";
import ThroughLine from "./components/index";



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
          className="rc-content--fixed-header w-full flex flex-col flex-align-items"
          style={{ background: '#fff' }}
        >
          {/* 电脑端 */}
<<<<<<< HEAD
          <div className='m-auto mx-18 hidden md:block'>
=======
          <div className="h-285 m-auto hidden md:block">
>>>>>>> 3e31978dbbaa8f815ee6f592a89cb0ef1c5dffa3
            <div className="mt-24 PingFangSC text-center font-normal">
              <p className="w-285 m-auto h-34  text-primary text-30   leading-34">
                ポイントプログラム
              </p>
              <p className="w-285 m-auto h-64  text-primary-gray  text-18  leading-32 mt-16">
                定期購入とステージアップで最大10%ポイント還元
              </p>
            </div>
            <div className="mt-13.65">
              <img src={Group1} alt="" />
            </div>
          </div>
<<<<<<< HEAD
          <div className='m-auto mx-18 block md:hidden'>
            <div className="mt-24 PingFangSC text-center font-normal">
              <h1 className="w-285 m-auto h-34  text-primary text-30  leading-34">
              ポイントプログラム
=======
          <div className="h-285 m-auto block md:hidden">
            <div className="mt-24 PingFangSC text-center font-normal">
              <h1 className="w-285 m-auto h-34  text-primary text-30   leading-34">
                ポイントプログラム
>>>>>>> 3e31978dbbaa8f815ee6f592a89cb0ef1c5dffa3
              </h1>
              <p className="w-285 m-auto h-64  text-primary-gray  text-18  leading-32 mt-16">
                定期購入とステージアップで最大10%ポイント還元
              </p>
              <img src={Group1} alt="" className="mt-13.65"/>
            </div>
          </div>
<<<<<<< HEAD
          <div className='PingFangSC mx-18 text-primary-gray text-center text-16 font-normal mt-24.35 leading-24  m-auto'>
            <p className='w-284 m-auto mb-8'>マイ ロイヤルカナンのポイントプログラムは、1ポイント＝1円としてマイ ロイヤルカナンで使用できるポイントがご購入の度に貯まる、お得なプログラムです。ポイントの付与率は、マイ ロイヤルカナンでの直近6ヵ月間の製品購入累計金額<span className='text-primary-star'>＊</span>によって決まる、３つのステージ（ブロンズ、シルバー、ゴールド）によって異なります。<br/>
            <br/>
            ご購入いただいた税抜製品価格<span className='text-primary-star'>＊＊</span>に対し、ブロンズ会員の方は3％、シルバー会員の方は５％、ゴールド会員の方は8%のポイントが付与されます。また、定期購入をお申込みいただくとプラス2％が追加で付与され、ブロンズ会員で定期購入お申込みの方は5%、シルバー会員で定期購入お申込みの方は7％、ゴールド会員で定期購入お申込みの方は10％のポイントが付与されます。<span className='text-primary-star'>＊＊＊</span><br/>
            <br/>
            マイ ロイヤルカナン ポイントプログラムでは、愛犬・愛猫の真の健康を実現していくために、今後、愛犬・愛猫の健康管理をコンセプトとした特典やプロモーションを実施していく予定です。
            </p>
            <a href='f' className='w-240 font-medium text-black underline ml-22 mr-22'>定期購入について詳しくはこちら</a>
            <img src={Bitmap1} alt="" className='w-284 m-auto mt-16'></img>
            <p className='w-284 m-auto font-normal text-18 leading-26 text-left mt-16'>
            <span className='text-primary-star'>＊</span>お届け日基準。また、返品金額は対象外です。<br/>
            <span className='text-primary-star'>＊＊</span>送料・手数料は含みません。また、クーポン・ポイント使用分はポイント付与対象から除きます。<br/>
            <span className='text-primary-star'>＊＊＊</span>ポイントが付与されるタイミングは、代金引換の場合着荷日、クレジットカードもしくはコンビニ払いの場合出荷完了時になります。<br/>
            </p>
          </div>
          <ThroughLine className="mt-40"/>
          <div className='mx-18  m-auto PingFangSC font-normal mt-40'>
            <p className='text-22 w-284 m-auto leading-28 text-primary text-center'>会員ステージと保有ポイントの確認方法</p>
            <p className='text-16 w-284 m-auto leading-24 text-primary-gray mt-16 text-left'>現在の会員ステージと保有ポイントは、ログイン後のマイページでご確認いただけます。会員ステージは、毎月15日午前3時に集計して決定します。</p>
            <img src={Bitmap2} alt="" className='mt-16 m-auto w-284'></img>
          </div>
          <ThroughLine className="mt-40"/>
          <div className='mx-18  m-auto PingFangSC font-normal mt-40 mb-40'>
            <p className='text-22 w-284 m-auto leading-28 text-primary text-center'>ポイントの使用方法</p>
            <p className='text-16 w-284 m-auto leading-24 text-primary-gray mt-16 text-left'>ポイントの使用最小単位は100ポイントです。ポイントを使用される場合は、お支払い方法の画面で使用するポイントをご入力ください。入力したポイントが、支払合計金額から差し引かれます。なお、クーポンとの併用はできませんのでご了承ください。ポイントの有効期限はマイ ロイヤルカナンでの最終注文から6ヵ月です<span className='text-primary-star'>＊</span>。<br/><br/><span className='text-primary-star'>＊</span>月の同日、同日がなければ翌日となります。</p>
            <img src={BitmapCopy} alt="" className='mt-16 m-auto w-284'></img>
=======
          <div className="h-1241 PingFangSC text-primary-gray text-center text-16 font-normal leading-24 mt-24.35 m-auto ">
            <p className="w-284">
              マイ
              ロイヤルカナンのポイントプログラムは、1ポイント＝1円としてマイ
              ロイヤルカナンで使用できるポイントがご購入の度に貯まる、お得なプログラムです。ポイントの付与率は、マイ
              ロイヤルカナンでの直近6ヵ月間の製品購入累計金額
              <span className="text-primary-star">＊</span>
              によって決まる、３つのステージ（ブロンズ、シルバー、ゴールド）によって異なります。
              <br />
              <br />
              ご購入いただいた税抜製品価格
              <span className="text-primary-star">＊＊</span>
              に対し、ブロンズ会員の方は3％、シルバー会員の方は５％、ゴールド会員の方は8%のポイントが付与されます。また、定期購入をお申込みいただくとプラス2％が追加で付与され、ブロンズ会員で定期購入お申込みの方は5%、シルバー会員で定期購入お申込みの方は7％、ゴールド会員で定期購入お申込みの方は10％のポイントが付与されます。
              <span className="text-primary-star">＊＊＊</span>
              <br />
              <br />
              マイ ロイヤルカナン
              ポイントプログラムでは、愛犬・愛猫の真の健康を実現していくために、今後、愛犬・愛猫の健康管理をコンセプトとした特典やプロモーションを実施していく予定です。
            </p>
            <a
              href="f"
              className="w-240 font-medium text-black underline mt-8 ml-22 mr-22"
            >
              定期購入について詳しくはこちら
            </a>
>>>>>>> 3e31978dbbaa8f815ee6f592a89cb0ef1c5dffa3
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
