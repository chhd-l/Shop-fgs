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
  const contentTitleStyle =
    'PingFangSC redColor font-medium text-16 leading-6 mb-3 md:mb-4 md:text-18 md:leading-7';
  const contentsubStyle =
    'PingFangSC grayColor text-16 leading-6 md:text-18 md:leading-7';
  const mar = 'mb-6 md:mb-10';
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
          <div className="md:w-cs-920  m-auto  pt-10 pb-10 pl-4 pr-4 md:p-0 md:pt-20 md:pb-16 box-content">
            {/* pc */}
            <h1 className="hidden md:block PingFangSC redColor font-semibold text-22 leading-7 mb-6 md:mb-28 md:text-30 md:leading-8 md:text-center">
              特定商取引に関する法律に基づく表記
            </h1>
            {/* 手机 */}
            <h1 className="block md:hidden PingFangSC redColor font-semibold text-22 leading-7 mb-6 md:mb-28 md:text-30 md:leading-8 md:text-center">
              マイ ロイヤルカナン 特定商取引法に基づく表示
            </h1>
            {/* 内容 */}
            <div>
              {/* 1 */}
              <div className={`${mar}`}>
                <h2 className={contentTitleStyle}>
                  1 マイ ロイヤルカナン　サイト運営会社
                </h2>
                <p className={contentsubStyle}>
                  ロイヤルカナン ジャポン 合同会社
                  <br />
                  東京都港区港南1-2-70　品川シーズンテラス ７階
                  <br />
                  ※製品の販売に関しては下記販売委託事業者がおこないます
                </p>
              </div>
              {/* 2 */}
              <div className={`${mar}`}>
                <h2 className={contentTitleStyle}>2 販売委託事業者</h2>
                <p className={contentsubStyle}>
                  新東亜交易株式会社
                  <br />
                  東京都千代田区丸の内1-6-1
                  <br />
                  電話番号：03-3286-0497
                  <br />
                  販売責任者氏名：長谷　陽造
                </p>
              </div>
              {/* 3 */}
              <div className={`${mar}`}>
                <h2 className={contentTitleStyle}>
                  3 マイ ロイヤルカナン　カスタマーサービス
                </h2>
                <p className={contentsubStyle}>
                  電話番号：0120-253-912（通話料無料）
                  <br />
                  受付時間：月曜～土曜　11:00～16:00
                  <br />
                  ※日曜・祝日・弊社指定定休日を除く
                </p>
              </div>
              {/* 4 */}
              <div className={`${mar}`}>
                <h2 className={contentTitleStyle}>4 販売価格</h2>
                <p className={contentsubStyle}>
                  製品ごとに販売価格を別途表示いたします。表示価格には消費税が含まれております。
                </p>
              </div>
              {/* 5 */}
              <div className={`${mar}`}>
                <h2 className={`${contentTitleStyle}`}>
                  5 配送料と手数料について
                </h2>
                <h3 className="PingFangSC redColor text-16 leading-6 mb-1 md:text-18 md:leading-7">
                  配送料
                </h3>
                <p className={`${contentsubStyle}`} style={{ color: '#666' }}>
                  1回のご購入金額の合計が5,500円（税込）を超える場合、配送料は無料とさせていただきます。
                  <br />
                  その他の場合、全国一律配送1回につき500円（税込）の配送料をお客様にご負担いただきます。
                </p>
                <h3 className="PingFangSC redColor text-16 leading-6 mb-1 mt-4 md:mt-6 md:text-18 md:leading-7">
                  手数料
                </h3>
                <p
                  className="PingFangSC text-16 leading-6 mb-3 md:text-18 md:leading-7 md:mb-8"
                  style={{ color: '#666' }}
                >
                  代金引換を支払方法として選択された場合、代引手数料としてご注文1件につき以下の手数料（税込）をお客様にご負担いただきます。
                </p>
                <ul
                  className="PingFangSC text-16 leading-6 ml-3 mb-4 md:text-18 md:ml-5 md:leading-7 md:mb-8"
                  style={{ color: '#666' }}
                >
                  <li className="list-disc">収納代金が10,000円未満 330円</li>
                  <li className="list-disc">
                    収納代金が10,000円以上、30,000円未満 440円
                  </li>
                  <li className="list-disc">
                    収納代金が30,000円以上、100,000円未満 660円
                  </li>
                  <li className="list-disc">
                    収納代金が100,000円以上、300,000円未満 1,100円
                  </li>
                </ul>
                <p
                  className="PingFangSC text-16 leading-6 mb-3 md:text-18 md:leading-7 md:mb-8"
                  style={{ color: '#666' }}
                >
                  コンビニ決済を支払方法として選択された場合、ご注文1件につき以下の手数料（税込）をお客様にご負担いただきます。
                </p>
                <ul
                  className="PingFangSC text-16 leading-6 ml-3 md:ml-5 md:text-18 md:leading-7"
                  style={{ color: '#666' }}
                >
                  <li className="list-disc">収納代金が2,000円未満 121円</li>
                  <li className="list-disc">
                    収納代金が2,000円以上、3,000円未満 167円
                  </li>
                  <li className="list-disc">
                    収納代金が3,000円以上、10,000円未満 185円
                  </li>
                  <li className="list-disc">
                    収納代金が10,000円以上、50,000円未満 259円
                  </li>
                  <li className="list-disc">
                    収納代金が50,000円以上、100,000円未満 537円
                  </li>
                  <li className="list-disc">
                    収納代金が100,000円以上、150,000円未満 595円
                  </li>
                  <li className="list-disc">
                    収納代金が150,000円以上、300,000円未満 595円
                  </li>
                </ul>
              </div>
              {/* 6 */}
              <div className={`${mar}`}>
                <h2 className={contentTitleStyle}>6 支払方法</h2>
                <p className={contentsubStyle}>
                  以下のお支払方法をお選びいただけます。
                  <br />
                  クレジットカード決済
                  <br />
                  コンビニ決済
                  <br />
                  代金引換
                </p>
              </div>
              {/* 7 */}
              <div className={`${mar}`}>
                <h2 className={contentTitleStyle}>7 支払期限</h2>
                <p className={contentsubStyle}>
                  クレジットカード決済：製品の発送段階において請求されます。
                  <br />
                  コンビニ決済：ご注文が完了するとお支払番号が発行されます。お支払番号の発行日を含めて5日以内にご指定のコンビニエンスストアでお支払いください。お支払後に製品が確保され、発送されます。お支払の確認の電子メールが、お支払完了後に送付されます。
                  <br />
                  代金引換：製品をお渡しする際に配送業者にお支払いください。
                </p>
              </div>
              {/* 8 */}
              <div className={`${mar}`}>
                <h2 className={contentTitleStyle}>8 製品の引渡時期</h2>
                <p className={contentsubStyle}>
                  ご注文を確認した後、通常48時間以内にご注文の製品を発送させていただきますが、諸事情により配達が遅れる場合がございますので、あらかじめご了承ください。
                </p>
              </div>
              {/* 9 */}
              <div className={`${mar}`}>
                <h2 className={`${contentTitleStyle}`}>
                  9 返品、交換、返金方法
                </h2>
                <p
                  className={`${contentsubStyle} mb-4 md:mb-6`}
                  style={{ color: '#666' }}
                >
                  お申込みいただいた製品と届いた製品が異なっていた場合、製品が汚れている、又は破損している場合は、製品配達完了後8日以内に限り、返品及び交換を承ります。​
                  <br />
                  お客様都合による返品は、下記の１）と２）の場合を除いて承ることができませんので、あらかじめご了承ください。下記１）と2）の場合の返品については、未開封であり、製品配達完了後8日以内に限って承ります（なお、お客様都合による交換は承っておりません）。​
                </p>
                <p
                  className={`${contentsubStyle} mb-4 md:mb-6`}
                  style={{ color: '#666' }}
                >
                  １）獣医師に療法食を処方された場合​
                  <br />
                  ２）ペットが亡くなった場合​
                </p>
                <p className={`${contentsubStyle}`} style={{ color: '#666' }}>
                  返品及び交換をご要望のお客様は、必ず事前に、マイ
                  ロイヤルカナン
                  カスタマーサポートまでご連絡をお願い申し上げます。事前のご連絡なしに製品が返送された場合には、返品・交換をお断りする場合がございますので、あらかじめご了承ください。​
                  <br />
                  また、いかなる理由であれ度重なる返品が行われ、当社が問題であると判断した場合、マイ
                  ロイヤルカナンでのご利用を事前の告知なく無期限に停止させていただくことがございます。​
                  <br />
                  おいしさ満足保証での返品をご希望の方は、製品パッケージをご確認ください。
                </p>
              </div>
              {/* 10 */}
              <div className={`${mar}`}>
                <h2 className={contentTitleStyle}>返品の場合の返金方法</h2>
                <p className={contentsubStyle}>
                  お客様から返送された製品を受領後、返金処理を開始いたします。
                  <br />
                  返金処理期間として、通常7～14営業日をいただいております。
                  <br />
                  返金額に利息は付きません。
                  <br />
                  お客様都合による返品の場合、返金するのは製品の購入代金（消費税を含みます。）のみとし、配送料や手数料は返金の対象にはなりません。また、返品の際の配送料や返金の際に掛かる振込手数料及び消費税についてもお客様にご負担いただきます。
                  <br />
                  お申込みいただいた製品と届いた製品が異なっていた場合、製品が汚れている、又は破損している場合による返品は、製品の購入代金及び諸費用（配送料、代引き手数料、コンビニ払い手数料及び消費税を含みます。）を全額返金させていただきます。返金の際に掛かる振込手数料及び消費税についてもロイヤルカナンが負担させていただきます。
                </p>
              </div>
              {/* 11 */}
              <div>
                <h2 className={contentTitleStyle}>お支払方法ごとの返金方法</h2>
                <p className={contentsubStyle}>
                  クレジットカード決済をご利用の場合、支払方法として指定されたクレジットカードへ返金させていただきます。返金処理期間として、通常7～14営業日をいただいておりますが、クレジットカード会社の対応により、更に時間がかかる場合もあり、返金が翌月になる場合もございます。詳細につきましては、クレジットカード会社へ直接お問い合わせください。
                  <br />
                  クレジットカード決済以外のお支払方法をご利用の場合、返金は銀行振込で行います。
                  <br />
                  ポイント又はクーポンをご利用の場合、ポイント又はクーポン残高にお戻しする方法により返金いたします。
                  <br />
                  ポイント又はクーポンと他のお支払方法を併用された場合、ポイント又はクーポン分は、上記のポイント又はクーポン残高にお戻しする方法により返金し、残額が生じた場合は、クレジットカードへの返金処理か、銀行振込によって返金いたします。
                  <br />
                  購入時にポイントが付与される製品（ポイント対象製品）を返品した場合、購入時に付与されたポイントは、ポイント残高から差し引かれます。
                  <br />
                  購入時に付与されたポイントを返品までの間に使用された場合等、ポイントの残高が不足するときは、返金額から不足分のポイント相当額が差し引かれます。
                  <br />
                  以上
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default injectIntl(seoHoc('LegalNotice Page')(LegalNotice));
