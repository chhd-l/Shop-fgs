import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import { FormattedMessage } from 'react-intl-phraseapp';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';
import { seoHoc } from '@/framework/common';
import './index.less';
import Canonical from '@/components/Canonical';

// 仅日本可需的静态页面
@seoHoc('Coupon Agreement Page')
class CouponAgreement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render(h) {
    const event = {
      page: {
        type: 'other',
        theme: 'Brand',
        path: this.props.location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: ''
      }
    };
    return (
      <div className="coupon-agreement-contanier">
        <GoogleTagManager
          key={this.props.location.key}
          additionalEvents={event}
        />
        <Canonical />
        <Header {...this.props} showMiniIcons={true} showUserIcon={true} />
        <main className="rc-content--fixed-header rc-bg-colour--brand3">
          <BannerTip />
          <div className="px-4 md:px-80 text-lg py-8 md:py-20">
            <h1 className="rc-gamma md:text-center text-2xl md:text-3xl font-medium mb-4 md:mb-10">
              マイ ロイヤルカナン ポイント・クーポン規約
            </h1>
            <p className="md:text-center text-sm md:text-base">
              2014年10月21日制定
            </p>
            <p className="md:text-center text-sm md:text-base">
              2019年7月1日改定
            </p>
            <h3 className="mt-6 md:mt-16 rc-delta text-base md:text-lg font-medium">
              前文
            </h3>
            <p>
              本利用規約は、ロイヤルカナンジャポン合同会社（以下「当社」といいます。）が管理・運営するマイ
              ロイヤルカナンの関連ウェブサイト（以下「本ウェブサイト」といいます。）へのアクセス及びその利用に関して適用されます。本ウェブサイトへのアクセス及び利用は、当社によって管理・運営されています。なお、マイ
              ロイヤルカナンをご利用いただいた場合、お客様は、本利用規約に同意していただいたものとみなされます。また、本利用規約へのご同意は、プライバシー規約へのご同意を含みます。
            </p>
            <h3 className="mt-6 md:mt-10 rc-delta text-base md:text-lg font-medium">
              第1条 用語の意味について
            </h3>
            <p className="mb-4">
              本ポイント等規約上、次の各用語は、以下の意味を有するものとします。
            </p>
            <p>
              •
              「ポイント」とは、金種の一つとして、本製品の購入代金、送料、消費税、代引き手数料等、本ウェブサイトで取り扱われるすべての明細を対象としてお支払い時にご利用いただける、マイロイヤルカナン専用のポイントです。
            </p>
            <p>
              •
              「クーポン」とは、一定の本製品交換可能金額又は値引率が定められており、本製品の購入代金の一部としてお支払い時にご利用いただける、マイロイヤルカナン専用のクーポンです。
            </p>
            <p>
              •
              「本製品」とは、マイロイヤルカナンにおいて販売されている当社取扱製品を意味します。
            </p>
            <h3 className="mt-6 md:mt-10 rc-delta text-base md:text-lg font-medium">
              第2条 ポイント及びクーポンの付与について
            </h3>
            <p>
              マイ
              ロイヤルカナンの会員であるお客様が本ウェブサイトで本製品をご購入された場合、その他当社が適当と判断した場合に、
              当社の定める数のポイント又はクーポンを付与するものとします。
            </p>
            <p className="mb-4">
              ポイント及びクーポンは、当社が定める時期に付与されます。したがって、ポイント及びクーポンが付与されるまでに、そのポイント及びクーポンが付与される基となる本製品の購入が取消又は変更された場合、ポイント及びクーポンの付与も取消又は変更されます。
            </p>
            <p>
              ポイント及びクーポン付与の可否や付与数、その他付与に関する最終的な判断は、当社が行うものとします。
            </p>
            <h3 className="mt-6 md:mt-10 rc-delta text-base md:text-lg font-medium">
              第3条 ポイント及びクーポンのご利用について
            </h3>
            <p className="mb-4">
              ポイント及びクーポンは、お客様が本ウェブサイトにおいて本製品をご購入する際にご利用いただけるものです。本ウェブサイト以外では、ポイント及びクーポンはご利用いただけません。
            </p>
            <p className="mb-4">
              付与された確定ポイントは、１ポイントを１円相当分として、本ウェブサイトで販売される本製品の請求代金（購入代金、送料、消費税、代引き手数料等の合計金額）のうち一部又は全部の支払方法としてご利用いただけます。
            </p>
            <p className="mb-4">
              当社は、ポイント及びクーポンのご利用の対象となる本製品やサービスを制限したり、ポイント及びクーポンのご利用に条件を付したりすることがありますので、ご了承ください。
            </p>
            <p className="mb-4">
              本ウェブサイトのアカウントは、電子メールアドレスと付随するパスワードが正確に入力された時点で、ご本人による利用と判断させていただきます。よって、ポイント及びクーポンが利用された場合、第三者による不正利用であった場合でも、本ウェブサイトのアカウントの電子メールアドレスに付随するパスワードが正確に入力されている限り、当社は利用されたポイント及びクーポンを返却せず、また、これらに関連して一切責任を負いません。
            </p>
            <p className="mb-4">
              ポイント及びクーポンを利用してご購入された本製品につきキャンセル又は返品があった場合、お支払いの際にご利用いただいたポイント及びクーポンは、当社が定める規則に従って一部又は全部が返却されます。返却されたポイント及びクーポンは、ポイント及びクーポンが利用された本ウェブサイトのアカウントに戻るものとします。
            </p>
            <p className="mb-4">
              ポイント及びクーポンをお支払いにご利用いただいた後に、ポイント及びクーポンのご利用だけを取り消すことはできません。
            </p>
            <p className="mb-4">
              当社は、1回の注文に使えるポイント及びクーポンの下限、上限、1ヶ月間に使えるポイント及びクーポンの上限など、ご利用に制限を設ける権利を有します。また、この制限は予告なく変更又は追加される場合がありますので、ご了承ください。
            </p>
            <p>
              なお、お客様は、いかなる場合であっても、ポイント及びクーポンを換金することはできません。また、お客様は、ポイント及びクーポンにつき、第三者に対する譲渡等の処分をすることはできません。
            </p>
            <h3 className="mt-6 md:mt-10 rc-delta text-base md:text-lg font-medium">
              第4条 ポイント及びクーポンの失効について
            </h3>
            <p>
              ポイントの有効期限は、マイ
              ロイヤルカナンでの最終注文日から6ヵ月です（月の同日、同日がなければ翌日）。クーポンには発行されたクーポン毎に有効期限が設定されています。お客様のアカウントが無効となった場合には、貯まったすべてのポイント及びクーポンが失効します。失効したポイント及びクーポンはご利用いただけませんので、ご了承ください。なお、当社は、失効したポイント及びクーポンについて何らの補償も行わず、一切の責任を負いません。
            </p>
            <h3 className="mt-6 md:mt-10 rc-delta text-base md:text-lg font-medium">
              第5条 ポイント及びクーポンの照会について
            </h3>
            <p className="mb-4">
              ポイント及びクーポンのご利用又は残高などの履歴は、ログイン後のマイページでご照会いただけます。マイページの情報の更新には多少時間がかかる場合がありますので、ご了承ください。
            </p>
            <p>
              ポイント及びクーポンの残高などに関してご不明な点がある場合は、マイロイヤルカナンカスタマーサポートにお問い合わせください。なお、ポイント残高等に関する最終的な判断は、当社が行うものとします。
            </p>
            <h3 className="mt-6 md:mt-10 rc-delta text-base md:text-lg font-medium">
              第6条 ポイント及びクーポンの無効処理について
            </h3>
            <p className="mb-4">
              ポイント及びクーポンが付与された後に、ご注文いただいた本製品の返品があった場合、当社は、すでに付与されたポイント及びクーポンをお客様のアカウントから差し引いたり、ポイント及びクーポン相当金額を返金額から差し引いたりすることができるものとします。この場合、不足があれば、当社は、当該不足分相当金額をお客様に対して請求できるものとします。
            </p>
            <p className="mb-4">
              また、当社は、以下に定める場合、お客様に付与された又はお客様が本製品のご購入の際に利用されたポイント及びクーポンについて、当該ポイント及びクーポンをお客様のアカウントから差し引いたり、ポイント及びクーポン相当金額をお客様に対して請求できるものとします。
            </p>
            <p>• お客様が違法又は不正行為をした場合</p>
            <p>
              •
              お客様が本ポイント等規約又は当社が定めるその他の規約等に違反した場合
            </p>
            <p>• お客様がマイロイヤルカナンの会員資格を失った場合</p>
            <p>• 当社の過誤によりポイント及びクーポンが付与された場合</p>
            <p>
              •
              その他、当社がポイント及びクーポンを無効にすることが適当と判断した場合
            </p>
            <p>
              なお、お客様が会員資格を失った場合、保有するポイント及びクーポンに関するすべての権利を失うものとします。また、当社は、無効になったポイント及びクーポンについて何らの補償も行わず、一切の責任を負いません。
            </p>
            <h3 className="mt-6 md:mt-10 rc-delta text-base md:text-lg font-medium">
              第7条 本ポイント等規約の変更又は廃止について
            </h3>
            <p className="mb-4">
              当社は、本ポイント等規約の全部又は一部を変更又は廃止することができます。その場合には、本ウェブサイトにおいて然るべく告知させていただきますので、定期的に本ウェブサイトへアクセスし、最新の本ポイント等規約の内容をご確認いただけますよう、お願い申し上げます。
            </p>
            <p className="mb-4">
              本ポイント等規約の変更は、本ウェブサイトでの公表時に有効となります。本ポイント等規約が変更された場合、ポイント及びクーポンに関する一切の事項は変更後の本ポイント等規約によります。
            </p>
            <p>
              なお、本ポイント等規約が変更又は廃止された場合でも、ポイント及びクーポンの換金、損害賠償等は一切行われませんので、ご了承ください。
            </p>
            <h3 className="mt-6 md:mt-10 rc-delta text-base md:text-lg font-medium">
              第8条 本ポイント等規約に定めのない事項について
            </h3>
            <p>
              本ポイント等規約に定めのない事項については、当社が定めるその他の規約等の定めに従うものとします。
            </p>
            <h3 className="mt-6 md:mt-10 rc-delta text-base md:text-lg font-medium">
              第9条 マイ ロイヤルカナン カスタマーサービス
            </h3>
            <p>
              本ポイント等規約に関してご不明な点がございましたら、以下にお問い合わせ下さい。
            </p>
            <p>
              電話番号：0120-253-912（受付時間：11時～16時※日曜・祝日・弊社指定定休日を除く）
            </p>
            <p className="mt-8">以上</p>
          </div>
          <Footer />
        </main>
      </div>
    );
  }
}

export default CouponAgreement;
