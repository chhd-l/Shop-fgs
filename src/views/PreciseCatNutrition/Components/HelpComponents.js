import React from 'react';
import callImgNew from '../images/phone icon@2x.png';
import emailImgNew from '../images/email icon@2x.png';
import faqImgNew from '../images/FAQ icon@2x.png';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import LazyLoad from 'react-lazyload';
import '../index.less';
import { DistributeHubLinkOrATag } from '@/components/DistributeLink';
import { Link } from 'react-router-dom';
import { getDeviceType } from '../../../utils/utils';
const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';

const ru = window.__.env.REACT_APP_COUNTRY == 'ru';
const tr = window.__.env.REACT_APP_COUNTRY == 'tr';
const defaultList = {
  faq: {
    desc: (
      <FormattedMessage
        id="ClubLP.Help.faq.content"
        values={{
          val: ru ? (
            <DistributeHubLinkOrATag
              href={'/about-us/faq'}
              ariaLabel="Links to faq"
            >
              <a
                style={{
                  textDecoration: 'underline'
                }}
              >
                часто задаваемые вопросы:
              </a>
            </DistributeHubLinkOrATag>
          ) : tr ? (
            <DistributeHubLinkOrATag
              href={'/about-us/faqs'}
              ariaLabel="Links to faq"
            >
              <a
                style={{
                  textDecoration: 'underline'
                }}
              >
                Sıkça Sorulan Sorular
              </a>
            </DistributeHubLinkOrATag>
          ) : (
            <DistributeHubLinkOrATag
              href={'/about-us/faqs'}
              ariaLabel="Links to faq"
            >
              <a style={{ color: '#E2001A' }}>FAQ</a>
            </DistributeHubLinkOrATag>
          )
        }}
      />
    )
  }
};
const HelpComponents = (props) => {
  const { list = defaultList } = props;
  return (
    <div className="experience-component experience-layouts-1column">
      <div className="row rc-margin-x--none">
        <div className="rc-full-width">
          <div className="experience-component experience-layouts-cardcarousel">
            <div className="rc-margin-bottom--md rc-margin-bottom--xl--mobile text-center">
              <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile value-proposition">
                <div>
                  <h2
                    className="font-weight-normal rc-beta text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile"
                    style={{ fontSize: 28 }}
                  >
                    <FormattedMessage id="PreciseCatNutrition.Help.title" />
                  </h2>
                </div>
                <p style={{ marginBottom: 0 }}>
                  <span>
                    <FormattedMessage id="PreciseCatNutrition.Help.text1" />
                  </span>
                  {isMobile ? null : <br />}
                  <FormattedMessage id="PreciseCatNutrition.Help.text2" />
                </p>
                {/*<p>*/}
                {/*  /!*<FormattedMessage id="ClubLP.Help.subtitle2" />*!/*/}
                {/*</p>*/}
                <div className="experience-component experience-layouts-1to2columnRatio">
                  <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile value-proposition">
                    <div className=" rc-layout-container rc-five-column rc-match-heights rc-reverse-layout-mobile text-center md:text-left">
                      <div className="rc-padding--none flex justify-content-center margin-auto mobileHelp">
                        <article className="rc-full-width rc-column rc-margin-top--md--mobile">
                          <div className="rc-border-all rc-border-colour--interface fullHeight">
                            <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight rc-padding-top--md--mobile">
                              <div className="rc-column rc-double-width rc-padding-top--md--mobile">
                                <div className="w-100">
                                  <b
                                    style={{
                                      color: '#E2001A',
                                      fontWeight: 600
                                    }}
                                  >
                                    <FormattedMessage id="ClubLP.Help.call.title" />
                                  </b>
                                  <p style={{ marginBottom: 0 }}>
                                    {/*Monday to Friday from 8:30amto 7pm and on*/}
                                    {/*Saturdays from9am to 1pm*/}
                                    <FormattedMessage id="ClubLP.Help.call.content" />
                                  </p>
                                  <div>
                                    <p
                                      style={{ color: '#00BCA3' }}
                                      className="rc-numeric rc-md-up"
                                    >
                                      <a
                                        style={{
                                          color: '#E2001A',
                                          fontWeight: 500
                                        }}
                                      >
                                        <FormattedMessage id="ClubLP.Help.call.number" />
                                        {/*0800 415 161*/}
                                      </a>
                                    </p>
                                  </div>
                                  <div className="rc-margin-top--xs">
                                    <p
                                      style={{
                                        color: '#E2001A',
                                        marginBottom: 0
                                      }}
                                      className="rc-alpha rc-border--none rc-md-down"
                                    >
                                      {/*0800 415 161*/}
                                      <FormattedMessage id="ClubLP.Help.call.mobile.number" />
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="rc-column rc-content-v-middle">
                                <LazyLoad style={{ flexDirection: 'column' }}>
                                  <img
                                    className="align-self-center "
                                    style={{ width: '25vw' }}
                                    src={callImgNew}
                                    title="By telephone"
                                  />
                                </LazyLoad>
                              </div>
                            </div>
                          </div>
                        </article>
                        <article className="rc-full-width rc-column rc-margin-top--md--mobile">
                          <div className="rc-border-all rc-border-colour--interface fullHeight">
                            <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight rc-padding-top--md--mobile">
                              <div className="rc-column rc-double-width rc-padding-top--md--mobile">
                                <div className="w-100 ">
                                  <b
                                    className={'helpComponents-b'}
                                    style={{ fontWeight: 600 }}
                                  >
                                    {/*Email us*/}
                                    <FormattedMessage id="ClubLP.Help.email.title" />
                                  </b>
                                  <p style={{ marginBottom: 0 }}>
                                    {/*We'll do our best to get back to you as fast*/}
                                    {/*as possible and within 12 hours*/}
                                    <FormattedMessage id="ClubLP.Help.email.content" />
                                  </p>
                                  <a
                                    href={
                                      'mailto:serviceclients.france@royalcanin.com'
                                    }
                                    ariaLabel="Links to contact us"
                                  >
                                    <p
                                      style={{
                                        textDecoration: 'underline',
                                        fontWeight: 400,
                                        marginBottom: 0
                                      }}
                                    >
                                      <FormattedMessage id="ClubLP.Help.email.address" />
                                    </p>
                                  </a>
                                </div>
                              </div>
                              <div className="rc-column rc-content-v-middle">
                                <LazyLoad style={{ flexDirection: 'column' }}>
                                  <img
                                    className="align-self-center "
                                    style={{ width: '25vw' }}
                                    src={emailImgNew}
                                    title="By telephone"
                                  />
                                </LazyLoad>
                              </div>
                            </div>
                          </div>
                        </article>
                        <article className="rc-full-width rc-column rc-margin-top--md--mobile">
                          <div className="rc-border-all rc-border-colour--interface fullHeight">
                            <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight rc-padding-top--md--mobile">
                              <div className="rc-column rc-double-width rc-padding-top--md--mobile">
                                <div className="w-100">
                                  <p style={{ marginBottom: 0 }}>
                                    {list.faq.desc}
                                  </p>
                                  <div className="rc-margin-top--xs">
                                    <p
                                      style={{ color: '#00BCA3' }}
                                      className="rc-numeric rc-md-up"
                                    >
                                      <a style={{ color: '#00BCA3' }}>
                                        {/* <FormattedMessage id="help.tel" /> */}
                                      </a>
                                    </p>
                                  </div>
                                  <div className="rc-margin-top--xs">
                                    <p
                                      style={{ color: '#00BCA3' }}
                                      className="rc-alpha rc-border--none rc-md-down"
                                    ></p>
                                  </div>
                                </div>
                              </div>
                              <div className="rc-column rc-content-v-middle">
                                <LazyLoad style={{ flexDirection: 'column' }}>
                                  <img
                                    className="align-self-center "
                                    style={{ width: '25vw' }}
                                    src={faqImgNew}
                                    title="By telephone"
                                  />
                                </LazyLoad>
                              </div>
                            </div>
                          </div>
                        </article>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpComponents;
