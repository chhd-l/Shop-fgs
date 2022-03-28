import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import HeroCarousel from '@/components/HeroCarousel';
import Logo from '@/components/Logo';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { seoHoc } from '@/framework/common';
import LazyLoad from 'react-lazyload';

import './index.css';

import icon1 from './images/jp_icon1.png';
import icon2 from './images/jp_icon2.png';
import icon3 from './images/jp_icon3.png';
import icon4 from './images/jp_icon4.png';
import icon5 from './images/jp_icon5.png';
import cateimg from './images/us_autoship.png';

const pageLink = window.location.href;

@seoHoc('Subscription Page')
class JPLandingPage extends React.Component {
  render() {
    const event = {
      page: {
        type: 'Content',
        theme: ''
      }
    };

    return (
      <div className="subscriptionLanding">
        <Helmet>
          <link rel="canonical" href={pageLink} />
        </Helmet>
        <GoogleTagManager
          key={this.props.location.key}
          additionalEvents={event}
        />
        <Header {...this.props} showMiniIcons={true} showUserIcon={true} />
        <main className="rc-content--fixed-header rc-bg-colour--brand3">
          <BannerTip />

          <div className="rc-full-width">
            <div className="experience-component experience-layouts-herocarousel">
              <HeroCarousel history={history} />
            </div>
          </div>

          <div className="experience-component experience-assets-divider">
            <div
              className="rc-border-bottom rc-border-colour--brand4"
              style={{ borderBottomWidth: '4px' }}
            ></div>
          </div>

          <section className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="rc-max-width--lg rc-padding-y--sm">
                  <div class="text-center rc-margin-y--md rc-padding-x--sm">
                    <h2 className="rc-beta text-center rc-margin-bottom--xs">
                      <b>愛犬・愛猫に最適なフードをさがす</b>
                    </h2>
                    <p class="rc-intro text-center">
                      <b>
                        犬と猫が必要とする栄養バランスは、品種、年齢、身体の大きさ、ライフスタイル、健康状態によって異なります。ロイヤルカナンのきめ細やかなラインアップの中から、愛犬・愛猫にぴったりなフードを見つけてください。
                      </b>
                      ​
                    </p>
                  </div>
                  <div className="row custom-gutter rc-margin-bottom--sm">
                    <div className="col-12 col-md-3">
                      <Link className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link">
                        <picture className="category-cards__card__img">
                          <source srcSet={cateimg} />
                          <LazyLoad height={300}>
                            <img
                              src={cateimg}
                              alt=""
                              title=""
                              style={{ width: '144px' }}
                            />
                          </LazyLoad>
                        </picture>
                        <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                          <h3 className="rc-intro rc-margin--none">
                            <b>キャットフードをさがす</b>
                          </h3>
                        </div>
                      </Link>
                    </div>
                    <div className="col-12 col-md-3">
                      <Link className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link">
                        <picture className="category-cards__card__img">
                          <source srcSet={cateimg} />
                          <LazyLoad height={300}>
                            <img
                              src={cateimg}
                              alt=""
                              title=""
                              style={{ width: '144px' }}
                            />
                          </LazyLoad>
                        </picture>
                        <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                          <h3 className="rc-intro rc-margin--none">
                            <b>キャットフードをさがす</b>
                          </h3>
                        </div>
                      </Link>
                    </div>
                    <div className="col-12 col-md-3">
                      <Link className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link">
                        <picture className="category-cards__card__img">
                          <source srcSet={cateimg} />
                          <LazyLoad height={300}>
                            <img
                              src={cateimg}
                              alt=""
                              title=""
                              style={{ width: '144px' }}
                            />
                          </LazyLoad>
                        </picture>
                        <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                          <h3 className="rc-intro rc-margin--none">
                            <b>キャットフードをさがす</b>
                          </h3>
                        </div>
                      </Link>
                    </div>
                    <div className="col-12 col-md-3">
                      <Link className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link">
                        <picture className="category-cards__card__img">
                          <source srcSet={cateimg} />
                          <LazyLoad height={300}>
                            <img
                              src={cateimg}
                              alt=""
                              title=""
                              style={{ width: '144px' }}
                            />
                          </LazyLoad>
                        </picture>
                        <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                          <h3 className="rc-intro rc-margin--none">
                            <b>キャットフードをさがす</b>
                          </h3>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="experience-component experience-assets-divider">
            <div
              className="rc-border-bottom rc-border-colour--brand4"
              style={{ borderBottomWidth: '4px' }}
            ></div>
          </div>

          <section className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="rc-max-width--lg rc-padding-y--sm">
                  <div class="rc-max-width--md text-center rc-margin-y--md rc-padding-x--sm">
                    <div className="rc-margin-bottom--xs">
                      <Logo />
                    </div>
                    <h3 class="rc-large-body text-center">
                      <b>安心のロイヤルカナン公式通販サイト​</b>
                    </h3>
                  </div>
                  <div className="jp-benefits rc-margin-bottom--sm">
                    <dl>
                      <dt>
                        <img src={icon1} width="100" />
                      </dt>
                      <dd>
                        15時までのお支払いで当日出荷​（日・祝日・年末年始を除く）
                      </dd>
                    </dl>
                    <dl>
                      <dt>
                        <img src={icon2} width="100" />
                      </dt>
                      <dd>5,500円（税込）以上で送料無料日本全国どこでも​</dd>
                    </dl>
                    <dl>
                      <dt>
                        <img src={icon3} width="100" />
                      </dt>
                      <dd>
                        ポイントプログラム定期購入とステージアップで最大10％還元​​
                      </dd>
                    </dl>
                    <dl>
                      <dt>
                        <img src={icon4} width="100" />
                      </dt>
                      <dd>
                        便利な定期購入設定した周期で定期的にフードをお届け​
                      </dd>
                    </dl>
                    <dl>
                      <dt>
                        <img src={icon5} width="100" />
                      </dt>
                      <dd>おいしさ満足保証返金制度き対象製品はこちら</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default JPLandingPage;
