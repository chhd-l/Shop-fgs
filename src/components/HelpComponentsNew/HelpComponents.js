import React from 'react';
import callImgNew from './img/phoneicon@4x.png';
import emailImgNew from './img/emailicon@4x.png';
import faqImgNew from './img/FAQicon@4x.png';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import LazyLoad from 'react-lazyload';
import './index.css';
import { DistributeHubLinkOrATag } from '@/components/DistributeLink';
import { Link } from 'react-router-dom';
import { getDeviceType } from '../../utils/utils';
const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';
const ru = window.__.env.REACT_APP_COUNTRY == 'ru';
const tr = window.__.env.REACT_APP_COUNTRY == 'tr';

const defaultFirst = {
  content: ''
};
const defaultList = {
  phone: {
    title: <FormattedMessage id="ClubLP.Help.call.title" />,
    desc: <FormattedMessage id="ClubLP.Help.call.content" />,
    btnText: <FormattedMessage id="ClubLP.Help.call.number" />
  },
  email: {
    title: <FormattedMessage id="ClubLP.Help.email.title" />,
    desc: <FormattedMessage id="ClubLP.Help.email.content" />,
    btnText: <FormattedMessage id="ClubLP.Help.email.title" />
  },
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
const defaultLast = {
  title: '',
  fline: '',
  sline: '',
  tline: ''
};

const HelpComponentsNew = (props) => {
  const { list = defaultList } = props;
  const { lastText = defaultLast } = props;
  const { firstText = defaultFirst } = props;
  return (
    <div className="experience-component experience-layouts-1column">
      <div className="row rc-margin-x--none">
        <div className="rc-full-width">
          <div className="experience-component experience-layouts-cardcarousel">
            <div className="rc-margin-bottom--md rc-margin-bottom--xl--mobile text-center">
              <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile value-proposition">
                <p style={{ marginBottom: isMobile ? '60px' : '80px' }}>
                  {firstText.content}
                </p>
                <div>
                  <h4 className="rc-beta text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile">
                    <FormattedMessage id="ClubLP.Help.title" />
                  </h4>
                </div>
                <p style={{ marginBottom: 0 }}>
                  <span>
                    <FormattedMessage id="ClubLP.Help.subtitle1" />
                  </span>
                </p>
                <p>
                  <FormattedMessage id="ClubLP.Help.subtitle2" />
                </p>
                <div className="experience-component experience-layouts-1to2columnRatio">
                  <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
                    <div className=" rc-layout-container rc-five-column rc-match-heights rc-reverse-layout-mobile text-center md:text-left">
                      <div className="rc-padding--none flex justify-content-center margin-auto mobilehelp">
                        <article className="rc-full-width rc-column rc-margin-top--md--mobile">
                          <div className="rc-border-all rc-border-colour--interface fullHeight">
                            <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight rc-padding-top--md--mobile">
                              <div className="rc-column rc-double-width rc-padding-top--md--mobile">
                                <div className="w-100">
                                  <b style={{ color: '#E2001A' }}>
                                    {list.phone.title}
                                    {/*<FormattedMessage id="ClubLP.Help.call.title" />*/}
                                  </b>
                                  <p>
                                    {list.phone.desc}
                                    {/*<FormattedMessage id="ClubLP.Help.call.content" />*/}
                                  </p>
                                  <div className="rc-margin-top--xs">
                                    <p
                                      style={{ color: '#00BCA3' }}
                                      className="rc-numeric rc-md-up"
                                    >
                                      <a style={{ color: '#E2001A' }}>
                                        {list.phone.btnText}
                                        {/*<FormattedMessage id="ClubLP.Help.call.number" />*/}
                                      </a>
                                    </p>
                                  </div>
                                  <div className="rc-margin-top--xs">
                                    <p
                                      style={{ color: '#E2001A' }}
                                      className="rc-alpha rc-border--none rc-md-down"
                                    >
                                      {/*<FormattedMessage id="ClubLP.Help.call.mobile.number" />*/}
                                      {list.phone.btnText}
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
                                    alt={props.intl.formatMessage({
                                      id: 'club.wheretohelp.alt1'
                                    })}
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
                                  <b style={{ color: '#E2001A' }}>
                                    {list.email.title}
                                    {/*<FormattedMessage id="ClubLP.Help.email.title" />*/}
                                  </b>
                                  <p>
                                    {list.email.desc}
                                    {/*<FormattedMessage id="ClubLP.Help.email.content" />*/}
                                  </p>
                                  {tr || ru ? (
                                    <DistributeHubLinkOrATag
                                      href={'/contact-us'}
                                      ariaLabel="Links to contact us"
                                    >
                                      <b
                                        style={{ textDecoration: 'underline' }}
                                      >
                                        {list.email.btnText}
                                        {/*<FormattedMessage id="ClubLP.Help.email.address" />*/}
                                      </b>
                                    </DistributeHubLinkOrATag>
                                  ) : (
                                    // <Link to="/help">
                                    //   <b
                                    //     style={{ textDecoration: 'underline' }}
                                    //   >
                                    //     {list.email.btnText}
                                    //     {/*<FormattedMessage id="ClubLP.Help.email.title" />*/}
                                    //   </b>
                                    // </Link>
                                    <a
                                      href="https://www.royalcanin.com/fr/contact-us"
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
                                  )}
                                </div>
                              </div>
                              <div className="rc-column rc-content-v-middle">
                                <LazyLoad style={{ flexDirection: 'column' }}>
                                  <img
                                    className="align-self-center "
                                    style={{ width: '25vw' }}
                                    src={emailImgNew}
                                    alt={props.intl.formatMessage({
                                      id: 'club.wheretohelp.alt2'
                                    })}
                                    title="By email"
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
                                  <p>
                                    {list.faq.desc}
                                    {/*<FormattedMessage*/}
                                    {/*  id="ClubLP.Help.faq.content"*/}
                                    {/*  values={{*/}
                                    {/*    val: ru ? (*/}
                                    {/*      <DistributeHubLinkOrATag*/}
                                    {/*        href={'/about-us/faqs'}*/}
                                    {/*        ariaLabel="Links to faq"*/}
                                    {/*      >*/}
                                    {/*        <a*/}
                                    {/*          style={{*/}
                                    {/*            textDecoration: 'underline'*/}
                                    {/*          }}*/}
                                    {/*        >*/}
                                    {/*          часто задаваемые вопросы:*/}
                                    {/*        </a>*/}
                                    {/*      </DistributeHubLinkOrATag>*/}
                                    {/*    ) : tr ? (*/}
                                    {/*      <DistributeHubLinkOrATag*/}
                                    {/*        href={'/about-us/faqs'}*/}
                                    {/*        ariaLabel="Links to faq"*/}
                                    {/*      >*/}
                                    {/*        <a*/}
                                    {/*          style={{*/}
                                    {/*            textDecoration: 'underline'*/}
                                    {/*          }}*/}
                                    {/*        >*/}
                                    {/*          Sıkça Sorulan Sorular*/}
                                    {/*        </a>*/}
                                    {/*      </DistributeHubLinkOrATag>*/}
                                    {/*    ) : (*/}
                                    {/*      <DistributeHubLinkOrATag*/}
                                    {/*        href={'/about-us/faqs'}*/}
                                    {/*        ariaLabel="Links to faq"*/}
                                    {/*      >*/}
                                    {/*        <a*/}
                                    {/*          style={{*/}
                                    {/*            textDecoration: 'underline'*/}
                                    {/*          }}*/}
                                    {/*        >*/}
                                    {/*          FAQ pour*/}
                                    {/*        </a>*/}
                                    {/*      </DistributeHubLinkOrATag>*/}
                                    {/*    )*/}
                                    {/*  }}*/}
                                    {/*/>*/}
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
                                    alt={props.intl.formatMessage({
                                      id: 'club.wheretohelp.alt3'
                                    })}
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
                <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile value-proposition">
                  <div>
                    <h4 className="rc-beta text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile">
                      {/*<FormattedMessage id="ClubLP.Help.title" />*/}
                      {lastText.title}
                    </h4>
                  </div>
                  <p style={{ marginBottom: 0 }}>
                    <span>
                      {/*<FormattedMessage id="ClubLP.Help.subtitle1" />*/}
                      {lastText.fline}
                    </span>
                  </p>
                  <p style={{ marginBottom: 0 }}>
                    {/*<FormattedMessage id="ClubLP.Help.subtitle2" />*/}
                    {lastText.sline}
                  </p>
                  <p style={{ marginBottom: 0 }}>
                    {/*<FormattedMessage id="ClubLP.Help.subtitle2" />*/}
                    {lastText.tline}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default injectIntl(HelpComponentsNew);
