import React from 'react';
import { getDeviceType } from '@/utils/utils';
import { FormattedMessage } from 'react-intl-phraseapp';
import { optimizeImage } from '@/utils/utils';

import './tab.less';

const icon1 = `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/xicon1.png`;
const icon2 = `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/xicon2.png`;
const icon3 = `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/xicon3.png`;
const icon4 = `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/xicon4.png`;
const icon5 = `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/xicon5.png`;
const icon6 = `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/xicon6.png`;
const clubDesc = `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/club-desc@2x.png`;
const clubRuDesc = `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/club-ru-desc@2x.png`;
const clubLogo = `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/club-icon-big.png`;
const Ru = window.__.env.REACT_APP_COUNTRY === 'ru';
const clubDescImg = Ru ? clubRuDesc : clubDesc;

export default function SubscriptionTab() {
  const scrollToTop = () => {
    window && window.scrollTo(0, 0);
  };
  const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';

  return (
    <div className="new-subscription-tab">
      <div className="rc-max-width--xl rc-padding-x--sm">
        <div className="text-center rc-beta">
          <img
            src={optimizeImage({ originImageUrl: clubLogo, width: 200 })}
            alt="clubDesc"
            style={{ display: 'inline-block' }}
          />
        </div>
        <div className="text-center rc-beta rc-margin-bottom--md">
          <p className="main-title">
            <FormattedMessage
              id="ClubLP.SubscriptionTab.title"
              values={{ val: <br /> }}
            />
          </p>
        </div>
        <div className="subscription-desc rc-margin-bottom--md">
          <article className="rc-beta text-center">
            {isMobile ? (
              <>
                <div style={{ margin: '10px 0' }}>
                  <img
                    src={optimizeImage({
                      originImageUrl: clubDescImg,
                      width: 350
                    })}
                    alt="clubDesc"
                    className={Ru && 'm-auto'}
                  />
                </div>
                <p className="sub-title">
                  <FormattedMessage
                    id={
                      Ru
                        ? 'ClubLP.SubscriptionTab.subtext'
                        : 'ClubLP.SubscriptionTab.subtitle1'
                    }
                  />
                </p>
              </>
            ) : (
              <>
                <p className="sub-title ">
                  <FormattedMessage
                    id={
                      Ru
                        ? 'ClubLP.SubscriptionTab.subtext'
                        : 'ClubLP.SubscriptionTab.subtitle1'
                    }
                  />
                </p>
                <div style={{ margin: Ru ? '6px 0 0' : '10px 0' }}>
                  <img
                    src={optimizeImage({
                      originImageUrl: clubDescImg,
                      width: 350
                    })}
                    alt="clubDesc"
                    style={{ height: Ru ? 290 : null }}
                  />
                </div>
              </>
            )}
            {!Ru && (
              <p className="sub-desc">
                <FormattedMessage
                  id="ClubLP.SubscriptionTab.subtext"
                  values={{ val: <br /> }}
                />
              </p>
            )}
          </article>
          <article className="rc-beta">
            <p className="text-center sub-title">
              <FormattedMessage id="ClubLP.SubscriptionTab.subtitle2" />
            </p>
            <dl>
              <dt>
                <img
                  src={optimizeImage({ originImageUrl: icon1 })}
                  alt="subscriptionIcon1"
                />
              </dt>
              <dd>
                <FormattedMessage id="ClubLP.SubscriptionTab.icontext1" />
              </dd>
            </dl>
            <dl>
              <dt>
                <img
                  src={optimizeImage({ originImageUrl: icon2 })}
                  alt="subscriptionIcon2"
                />
              </dt>
              <dd>
                <FormattedMessage id="ClubLP.SubscriptionTab.icontext2" />
              </dd>
            </dl>
            <dl>
              <dt>
                <img
                  src={optimizeImage({ originImageUrl: icon3 })}
                  alt="subscriptionIcon3"
                />
              </dt>
              <dd>
                <FormattedMessage id="ClubLP.SubscriptionTab.icontext3" />
              </dd>
            </dl>
          </article>
          <article className="rc-beta">
            <p className="text-center sub-title">
              <FormattedMessage id="ClubLP.SubscriptionTab.subtitle3" />
            </p>
            <dl>
              <dt>
                <img
                  src={optimizeImage({ originImageUrl: icon4 })}
                  alt="subscriptionIcon4"
                />
              </dt>
              <dd>
                <FormattedMessage id="ClubLP.SubscriptionTab.icontext4" />
              </dd>
            </dl>
            <dl>
              <dt>
                <img
                  src={optimizeImage({ originImageUrl: icon5 })}
                  alt="subscriptionIcon5"
                />
              </dt>
              <dd>
                <FormattedMessage id="ClubLP.SubscriptionTab.icontext5" />
              </dd>
            </dl>
            <dl>
              <dt>
                <img
                  src={optimizeImage({ originImageUrl: icon6 })}
                  alt="subscriptionIcon6"
                />
              </dt>
              <dd>
                <FormattedMessage id="ClubLP.SubscriptionTab.icontext6" />
              </dd>
            </dl>
          </article>
        </div>
        <div className="text-center rc-margin-bottom--none">
          <span
            className="ui-cursor-pointer"
            onClick={scrollToTop}
            style={{ fontSize: '1rem', lineHeight: '1.33em' }}
          >
            <span
              style={{
                display: 'inline-block',
                verticalAlign: 'middle',
                fontWeight: 500,
                color: '#444',
                borderBottom: '1px solid rgba(68,68,68,.3)'
              }}
            >
              <FormattedMessage id="footer.toTheTop" />
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              style={{
                color: '#767676',
                display: 'inline',
                marginLeft: 5,
                display: 'inline-block',
                verticalAlign: 'middle'
              }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
