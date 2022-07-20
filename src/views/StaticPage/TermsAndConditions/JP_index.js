import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import { inject, observer } from 'mobx-react';
import { seoHoc } from '@/framework/common';
import BreadCrumbs from '@/components/BreadCrumbs';
import BannerTip from '@/components/BannerTip';
import './index.css';
import { Canonical } from '@/components/Common';

const localItemRoyal = window.__.localItemRoyal;

@injectIntl
@inject('configStore')
@seoHoc('general terms conditions page')
@observer
class TermsConditionsJP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tel: '',
      mailAddress: ''
    };
  }

  componentWillUnmount() {}
  async componentDidMount() {
    const tel = 'tel:' + this.props.configStore.storeContactPhoneNumber;
    const mailAddress = 'mailto:' + this.props.configStore.storeContactEmail;

    this.setState({ tel, mailAddress });
  }
  render(h) {
    const event = {
      page: {
        type: 'other',
        theme: '',
        path: location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: ''
      }
    };
    return (
      <div>
        <GoogleTagManager
          key={this.props.location.key}
          additionalEvents={event}
        />
        <Canonical />
        <Header {...this.props} showMiniIcons={true} showUserIcon={true} />

        <main className="rc-content--fixed-header rc-bg-colour--brand3">
          <BannerTip />
          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="rc-max-width--lg rc-padding-y--sm rc-padding-x--md">
                  <div class="text-center rc-margin-y--md">
                    <h2 className="rc-beta rc-margin-bottom--sm">
                      <b>マイ ロイヤルカナン 利用規約</b>
                    </h2>
                    <p className="rc-intro">
                      <b>2015年10月8日　制定</b>
                    </p>
                    <p className="rc-intro">
                      <b>2020年7月16日　改定</b>
                    </p>
                    <p className="rc-intro">
                      <b>2022年6月29日　改定</b>
                    </p>
                  </div>
                  <div className="terms-margin">
                    <h3 className="rc-espilon">
                      <b>前文</b>
                    </h3>
                    <p className="rc-intro">
                      <b>
                        本利用規約は、マースインコーポレイテッド（The Mars,
                        Incorporated）の系列企業であるロイヤルカナン
                        ジャポン合同会社（以下「当社」といいます。）が管理・運営するマイ
                        ロイヤルカナン（以下「本ウェブサイト」といいます。）へのアクセス及びその利用に関して適用されます。本利用規約は、本ウェブサイトへのアクセス及びその利用に固有の条件を定めたものであり、定めのない事項に関しては、「The
                        Mars,
                        Incorporatedおよび系列企業が運営するウェブサイトの利用規約」（以下「マースウェブサイト利用規約」といいます。）及び「マースのプライバシーに関する声明」（以下「マースプライバシー規約」といいます。）が適用されます。
                        <br />
                        本ウェブサイトをご利用いただいくことによって、お客様は、本利用規約に加えて、マースウェブサイト利用規約及びマースプライバシー規約にご同意いただいたものとみなされます。
                      </b>
                    </p>
                  </div>
                  <div className="terms-margin">
                    <h3 className="rc-espilon">
                      <b>1. マースウェブサイト利用規約</b>
                    </h3>
                    <p className="rc-intro">
                      <b>
                        以下のマースウェブサイト利用規約は、お客様が本ウェブサイトにアクセスし、ご利用される場合に適用されますので、よくお読みになり、ご理解いただきますようお願い申し上げます。
                        <br />
                        本利用規約にマースウェブサイト利用規約と異なる定めがある場合には、本利用規約が優先して適用されます。
                        <br />
                        <a
                          href="https://www.mars.com/legal-japan"
                          target="_blank"
                        >
                          https://www.mars.com/legal-japan
                        </a>
                      </b>
                    </p>
                  </div>
                  <div className="terms-margin">
                    <h3 className="rc-espilon">
                      <b>2. 用語の意味について</b>
                    </h3>
                    <p className="rc-intro">
                      <b>
                        本利用規約上、次の各用語は、以下の意味を有するものとします。
                        <br />
                        「サービス提供者」とは、本ウェブサイトにおける本製品の販売業者、配送業者等、マイ
                        ロイヤルカナンの会員であるお客様に各種サービスを提供する者を意味します。
                        <br />
                        「消費者」とは、事業者に該当しない、自然人であるペットオーナーを意味します。
                        <br />
                        「本規約等」とは、本利用規約、マースウェブサイト利用規約、マースプライバシー規約、ポイント・クーポン規約等、マースインコーポレイテッド（The
                        Mars,
                        Incorporated）及びその関連企業（当社を含みます。）が定める規約等のうち、本ウェブサイトのアクセス及び利用に関するものの総称を意味します。
                        <br />
                        「本製品」とは、本ウェブサイトにおいて販売されている当社の取扱製品を意味します。
                      </b>
                    </p>
                  </div>
                  <div className="terms-margin">
                    <h3 className="rc-espilon">
                      <b>3. 本ウェブサイトの利用方針について</b>
                    </h3>
                    <p className="rc-intro">
                      <b>
                        本ウェブサイトにおける本製品の販売業者は、新東亜交易株式会社（以下「新東亜」といいます。）となります。お客様と新東亜との間の売買契約の成立の詳細に関しては、「6.
                        販売業者である新東亜とお客様との本製品の取引について」をご確認ください。
                        <br />
                        なお、本ウェブサイトは、消費者が本製品を購入することを前提として、構築・運営されております。そのため、お客様が消費者に当たらない場合は、本ウェブサイトでの本製品の購入をご遠慮いただくようお願い申し上げます。当社は、消費者以外による本ウェブサイトの利用を拒否する権限を有しますので、ご了承ください。
                        <br />
                        なお、海外への販売・発送は行いませんので、その点もご了承ください。
                      </b>
                    </p>
                  </div>
                  <div className="terms-margin">
                    <h3 className="rc-espilon">
                      <b>
                        4. マイ
                        ロイヤルカナンへの入会・会員登録手続、退会について
                      </b>
                    </h3>
                    <p className="rc-intro">
                      <b>
                        お客様には、本ウェブサイトにおける本製品の購入など、本ウェブサイト上の各種サービスをご利用いただくにあたり、マイ
                        ロイヤルカナン（以下「本会」ともいいます。）に入会していただく必要があります。
                        <br />
                        本会の会員登録手続の際には、入力上の注意をよく読み、所定の欄に必要事項を正確に入力してください。
                        <br />
                        お客様は、所定の会員登録手続完了後、本会の会員としての資格を有することとなります。なお、過去に、本会の会員資格が取り消された方や、その他当社が相応しくないと判断した方からの入会申込については、お断りする場合がありますので、ご了承ください。
                        <br />
                        登録された情報に変更が生じた場合は、速やかに変更登録をお願いいたします。変更登録がなされなかったことにより生じた損害等について、当社は一切責任を負いません。変更登録前にすでに手続がなされた取引（お客様が本ウェブサイトにおいて行う本製品の購入、プレゼント応募等の各種行為を含みます。）は、変更登録前の情報に基づいて行われますので、ご了承ください。
                        <br />
                        お客様が本会からの退会を希望する場合には、お客様ご本人が本ウェブサイトにログインし、「マイページ」から退会手続を行っていただくようお願い申し上げます。所定の退会手続の終了後に、退会となります。
                      </b>
                    </p>
                  </div>
                  <div className="terms-margin">
                    <h3 className="rc-espilon">
                      <b>5. マースプライバシー規約について</b>
                    </h3>
                    <p className="rc-intro">
                      <b>
                        マースプライバシー規約は、お客様が本ウェブサイトにアクセスし、ご利用される場合に適用されますので、よくお読みになり、ご理解いただきますようお願い申し上げます。
                        <br />
                        <a
                          target="_blank"
                          href="https://www.mars.com/privacy-policy-japanese"
                        >
                          https://www.mars.com/privacy-policy-japanese
                        </a>
                      </b>
                    </p>
                  </div>
                  <div className="terms-margin">
                    <h3 className="rc-espilon">
                      <b>
                        6. 販売業者である新東亜とお客様との本製品の取引について
                      </b>
                    </h3>
                    <p className="rc-intro">
                      <b>
                        本ウェブサイトにおいて本製品を注文される場合には、当該製品の購入に関する指示に従って、注文書の全ての関連項目をご記入いただく必要がございます。お客様には、注文書を送信することにより、新東亜に対して売買契約の申込みをおこなっていただきます。お客様の注文は、お客様に当該製品の発送完了メールが送信されたときに確定され、その時点において、新東亜を販売業者とした、お客様と新東亜との間の売買契約が成立することになります。
                        <br />
                        お客様から注文書が送信された後、注文書記載の情報（注文いただいた本製品、ご購入代金、支払方法等）を要約した「ご注文受付のお知らせ」が、電子メールにてお客様に送信されますが、「ご注文受付のお知らせ」は売買契約の承諾通知ではございませんので、ご了承ください。
                        <br />
                        本製品の所有権は、お客様と新東亜との間の売買契約が成立した時点で、お客様へと移転します。但し、ご指定いただいた配送先に到着する前に、配送業者の故意又は過失により本製品が品質劣化、損傷、滅失した場合、お客様は、当該品質劣化、損傷、滅失について責任を負いません。
                        <br />
                        なお、当社の都合により、お客様の注文の処理をお断りさせていただく場合がございます。この場合、電子メールで理由を示し、注文の処理が行われなかったことをお客様にご連絡させていただきます。
                        また、本ウェブサイトに表示された本製品が注文提出の際にすでに在庫切れですぐに製品の入庫が出来ない場合は、注文の受領から14日以内に、注文された本製品の取扱いができないことをお客様に電子メールにてご連絡させていただきます。このような在庫切れの本製品に対して注文書を受理後、代金が支払われてしまった場合には、在庫切れ製品の代金を全額払い戻しいたしますので、マイ
                        ロイヤルカナン
                        カスタマーサービスまでお電話でご連絡ください。なお、本ウェブサイト上「在庫」と表示されている場合でも、倉庫情報との連動のタイミングにより不正確になってしまうことが稀にあることをご容赦ください。
                      </b>
                    </p>
                  </div>
                  <div className="terms-margin">
                    <h3 className="rc-espilon">
                      <b>
                        7. 本ウェブサイトの仕様変更、一時停止、廃止等について
                      </b>
                    </h3>
                    <p className="rc-intro">
                      <b>
                        当社は、本ウェブサイトの枠組み、データベースシステム及びソフトウェア等について、お客様に事前に通知することなく、当社の判断により自由にその仕様を変更することができます。また、当社は、本ウェブサイトの点検、修理、改良、その他お客様の利益を保護するために当社が適当と判断した場合、お客様に事前に通知することなく、本ウェブサイト上のサービスを一時停止又は廃止する等の措置をとることができます。
                      </b>
                    </p>
                  </div>
                  <div className="terms-margin">
                    <h3 className="rc-espilon">
                      <b>8. サービスの変更、廃止について</b>
                    </h3>
                    <p className="rc-intro">
                      <b>
                        当社は、本会の会員であるお客様向けの各種サービス（ポイント及びクーポンの付与を含みます。）の全部又は一部について、当社の判断により変更又は廃止できるものとします。その場合には、本ウェブサイトにおいて然るべく告知させていただきますので、定期的に本ウェブサイトへアクセスし、最新の内容をご確認いただけますよう、お願い申し上げます。
                        なお、各種サービスが変更又は廃止された場合でも、損害賠償等は一切行われませんので、ご了承ください。
                      </b>
                    </p>
                  </div>
                  <div className="terms-margin">
                    <h3 className="rc-espilon">
                      <b>9. 免責事項について</b>
                    </h3>
                    <p className="rc-intro">
                      <b>
                        お客様が本会の会員として当社のサーバを通して行うサービス提供者との取引は、会員であるお客様とサービス提供者との直接取引となります。当社は、当該取引について当社がサービス提供者となる場合を除き、取引の当事者とはならず、取引に関する責任を負いません。
                        <br />
                        当社は、本ウェブサイトの運営、又は本ウェブサイトに掲載されている情報、コンテンツ、ソフトウェア等に関し、明示的であるか黙示的であるかにかかわらず、いかなる種類の表明も保証もいたしません。当社は、会員のお客様及びサービス提供者に対し、情報提供やアドバイス等を適宜行うことがありますが、それにより責任を負うものではありません。
                        <br />
                        当社は、本ウェブサイト上のウェブページ、サーバ、ドメイン等から送られるメール及びコンテンツに、コンピュータ・ウィルス等の有害なものが含まれていないことを保証いたしません。当社は、本ウェブサイトの利用に関してお客様に生じ得る一切の損害、損失又は不利益（新東亜等の第三者の行為に起因又は関連するもの、及び本ウェブサイトの内容・仕様変更、通信回線やコンピュータなどの障害によるシステムの遅滞・一時停止・廃止・データの消失、データへの不正アクセスによるものを含みますが、これらに限られません。）について、当社の故意又は重過失によるものでない限り、一切の責任を負いません。
                        <br />
                        お客様は、ご自身の責任により、本ウェブサイトをご利用されることについて、明示的に同意されたものとみなされます。当社は、お客様が本規約等に違反したことによって生じた損害について一切の責任を負いません。
                      </b>
                    </p>
                  </div>
                  <div className="terms-margin">
                    <h3 className="rc-espilon">
                      <b>10. ユーザID及びパスワードの管理について</b>
                    </h3>
                    <p className="rc-intro">
                      <b>
                        ユーザID及びパスワードは、会員のお客様ご本人が責任をもって管理してください。パスワードは、他人に知られることがないよう定期的に変更する等のご対応をお願いします。当社は、入力されたユーザID及びパスワードが登録されたものと一致することを所定の方法により確認した場合、会員による利用があったものとみなします。それらが盗用、不正使用その他の事情により会員のお客様以外の者が利用している場合であっても、当社は、それにより生じた損害について一切の責任を負いません。
                      </b>
                    </p>
                  </div>
                  <div className="terms-margin">
                    <h3 className="rc-espilon">
                      <b>11. 禁止事項について</b>
                    </h3>
                    <p className="rc-intro">
                      <b>
                        当社は、お客様が本会の会員となった場合、以下に定める行為を行うことを禁止します。
                        <ul className="pl-5">
                          <li className="list-disc">
                            法令又は本規約等に違反すること
                          </li>
                          <li className="list-disc">
                            当社、サービス提供者その他の第三者の権利、利益、名誉等を損ねること
                          </li>
                          <li className="list-disc">
                            青少年の心身に悪影響を及ぼす恐れがある行為、その他公序良俗に反する行為を行うこと
                          </li>
                          <li className="list-disc">
                            他の利用者その他の第三者に迷惑となる行為や不快感を抱かせる行為を行うこと
                          </li>
                          <li className="list-disc">
                            虚偽の情報を入力すること
                          </li>
                          <li className="list-disc">
                            有害なコンピュータプログラム、メール等を送信又は書き込むこと
                          </li>
                          <li className="list-disc">
                            当社のサーバその他のコンピュータに不正にアクセスすること
                          </li>
                          <li className="list-disc">
                            ユーザID及びパスワードを第三者に貸与・譲渡すること又は第三者と共用すること
                          </li>
                        </ul>
                      </b>
                    </p>
                  </div>
                  <div className="terms-margin">
                    <h3 className="rc-espilon">
                      <b>12. 会員としての地位・権利の譲渡について</b>
                    </h3>
                    <p className="rc-intro">
                      <b>
                        お客様は、本会の会員としての地位及び本ウェブサイト上の各種サービスの利用により当社に対して取得した一切の権利について、譲渡、貸与、担保差入その他の形態を問わず、処分することはできません。
                      </b>
                    </p>
                  </div>
                  <div className="terms-margin">
                    <h3 className="rc-espilon">
                      <b>13. 会員の利用停止・会員資格取消について</b>
                    </h3>
                    <p className="rc-intro">
                      <b>
                        当社は、以下に定める事由に該当すると判断した場合、事前に通知することなく、当該お客様による本ウェブサイト上の各種サービスの利用停止や、当該お客様の会員資格の取消しを行うことができるものとします。これにより当該お客様に何らかの損害が生じたとしても、当社は一切責任を負わないものとします。
                        <ul className="pl-5">
                          <li className="list-disc">
                            お客様に法令や本規約等に違反する行為があった場合
                          </li>
                          <li className="list-disc">
                            お客様にサービス利用に関して不正行為があった場合
                          </li>
                          <li className="list-disc">
                            一定回数以上のパスワードの入力ミス等、セキュリティを確保するために必要な場合
                          </li>
                          <li className="list-disc">
                            当社の定める一定期間内に一定回数以上のログインを行わなかった場合
                          </li>
                          <li className="list-disc">
                            その他当社が適当と判断した場合
                          </li>
                        </ul>
                      </b>
                    </p>
                  </div>
                  <div className="terms-margin">
                    <h3 className="rc-espilon">
                      <b>14. 本利用規約の変更について</b>
                    </h3>
                    <p className="rc-intro">
                      <b>
                        当社は、本利用規約の全部又は一部を変更することができます。本利用規約の変更は、変更の内容及び変更の効力発生時期を本ウェブサイト上で公表し又はその他適当な方法で周知いたします。お客様が、指定された効力発生日以後に本ウェブサイトを利用した場合には、法令上その効力を否定される場合を除き、変更後の本利用規約に同意したものとみなされます。そのため、定期的に本ウェブサイトへアクセスし、最新の本利用規約の内容をご確認いただけますよう、お願い申し上げます。
                      </b>
                    </p>
                  </div>
                  <div className="terms-margin">
                    <h3 className="rc-espilon">
                      <b>15. 準拠法及び合意管轄について</b>
                    </h3>
                    <p className="rc-intro">
                      <b>
                        本利用規約には、日本法が適用されます。また、本利用規約に起因又は関連して生ずる紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
                      </b>
                    </p>
                  </div>
                  <div className="terms-margin">
                    <h3 className="rc-espilon">
                      <b>16. マイ ロイヤルカナン カスタマーサービス</b>
                    </h3>
                    <p className="rc-intro">
                      <b>
                        本ウェブサイトの機能や注文等に関してご不明な点がございましたら、以下にお問い合わせ下さい。
                        <br />
                        <a
                          target="_blank"
                          href="https://shop.royalcanin.jp/contact_us"
                        >
                          https://shop.royalcanin.jp/contact_us
                        </a>
                      </b>
                    </p>
                  </div>
                  <div className="terms-margin">
                    <p className="rc-intro">
                      <b>以上</b>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </div>
    );
  }
}

export default TermsConditionsJP;
