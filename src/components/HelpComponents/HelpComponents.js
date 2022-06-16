import React from 'react';
import emailImg from '@/assets/images/emailus_icon@1x.jpg';
import callImg from '@/assets/images/customer-service@2x.jpg';
import helpImg from '@/assets/images/slider-img-help.jpg';
import pictofaq from './img/pictofaq.png';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import LazyLoad from 'react-lazyload';
import './index.css';
import { DistributeHubLinkOrATag } from '@/components/DistributeLink';
import { Link } from 'react-router-dom';

const HelpComponents = (props) => {
  const ru = window.__.env.REACT_APP_COUNTRY == 'ru';
  const tr = window.__.env.REACT_APP_COUNTRY == 'tr';
  return (
    <div className="experience-component experience-layouts-1column">
      <div className="row rc-margin-x--none">
        <div className="rc-full-width">
          <div className="experience-component experience-layouts-cardcarousel">
            <div className="rc-margin-bottom--md rc-margin-bottom--xl--mobile text-center">
              <h3 className="rc-beta">
                <FormattedMessage id="club.wheretohelp" />
              </h3>
              <p>
                <span>
                  <FormattedMessage id="club.wheretohelp.subtitile" />
                </span>
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
                                <b style={{ color: '#00BCA3' }}>
                                  <FormattedMessage id="club.wheretohelp.card.callus.title" />
                                </b>
                                <p>
                                  {/*  {*/}
                                  {/*  this.props.configStore*/}
                                  {/*    .contactTimePeriod*/}
                                  {/*}*/}
                                  <FormattedMessage id="club.wheretohelp.card.callus.description" />
                                </p>
                                <div className="rc-margin-top--xs">
                                  <p
                                    style={{ color: '#00BCA3' }}
                                    className="rc-numeric rc-md-up"
                                  >
                                    {/*<a*/}
                                    {/*  href={this.state.tel}*/}
                                    {/*  style={{ color: '#00BCA3' }}*/}
                                    {/*>*/}
                                    {/*  /!* <FormattedMessage id="help.tel" /> *!/*/}
                                    {/*  {*/}
                                    {/*    this.props.configStore*/}
                                    {/*      .storeContactPhoneNumber*/}
                                    {/*  }*/}
                                    {/*</a>*/}
                                    <a style={{ color: '#00BCA3' }}>
                                      {/* <FormattedMessage id="help.tel" /> */}
                                      <FormattedMessage id="club.wheretohelp.card.callus.number" />
                                    </a>
                                  </p>
                                </div>
                                <div className="rc-margin-top--xs">
                                  {/*<p*/}
                                  {/*  style={{ color: '#00BCA3' }}*/}
                                  {/*  className="rc-alpha rc-border--none rc-md-down"*/}
                                  {/*  onClick={this.mobileDial}*/}
                                  {/*>*/}
                                  {/*  {*/}
                                  {/*    this.props.configStore*/}
                                  {/*      .storeContactPhoneNumber*/}
                                  {/*  }*/}
                                  {/*</p>*/}
                                  <p
                                    style={{ color: '#00BCA3' }}
                                    className="rc-alpha rc-border--none rc-md-down"
                                  >
                                    <FormattedMessage id="club.wheretohelp.card.callus.number" />
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="rc-column rc-content-v-middle">
                              <LazyLoad>
                                <img
                                  className="align-self-center widthAuto"
                                  src={callImg}
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
                                <b style={{ color: '#46aacf' }}>
                                  <FormattedMessage id="club.wheretohelp.card.email.title" />
                                </b>
                                <p>
                                  {/*  {*/}
                                  {/*  this.props.configStore*/}
                                  {/*    .contactTimePeriod*/}
                                  {/*}*/}
                                  <FormattedMessage id="club.wheretohelp.card.email.description" />
                                </p>
                                {tr || ru ? (
                                  <DistributeHubLinkOrATag
                                    href={'/contact-us'}
                                    ariaLabel="Links to contact us"
                                  >
                                    <p style={{ textDecoration: 'underline' }}>
                                      <FormattedMessage id="club.wheretohelp.card.email.send" />
                                    </p>
                                  </DistributeHubLinkOrATag>
                                ) : (
                                  <Link to="/help">
                                    <p style={{ textDecoration: 'underline' }}>
                                      <FormattedMessage id="club.wheretohelp.card.email.send" />
                                    </p>
                                  </Link>
                                )}

                                <div className="rc-margin-top--xs">
                                  <p
                                    style={{ color: '#00BCA3' }}
                                    className="rc-numeric rc-md-up"
                                  >
                                    {/*<a*/}
                                    {/*  href={this.state.tel}*/}
                                    {/*  style={{ color: '#00BCA3' }}*/}
                                    {/*>*/}
                                    {/*  /!* <FormattedMessage id="help.tel" /> *!/*/}
                                    {/*  {*/}
                                    {/*    this.props.configStore*/}
                                    {/*      .storeContactPhoneNumber*/}
                                    {/*  }*/}
                                    {/*</a>*/}
                                    <a style={{ color: '#00BCA3' }}>
                                      {/* <FormattedMessage id="help.tel" /> */}
                                    </a>
                                  </p>
                                </div>
                                <div className="rc-margin-top--xs">
                                  {/*<p*/}
                                  {/*  style={{ color: '#00BCA3' }}*/}
                                  {/*  className="rc-alpha rc-border--none rc-md-down"*/}
                                  {/*  onClick={this.mobileDial}*/}
                                  {/*>*/}
                                  {/*  {*/}
                                  {/*    this.props.configStore*/}
                                  {/*      .storeContactPhoneNumber*/}
                                  {/*  }*/}
                                  {/*</p>*/}
                                  <p
                                    style={{ color: '#00BCA3' }}
                                    className="rc-alpha rc-border--none rc-md-down"
                                  ></p>
                                </div>
                              </div>
                            </div>
                            <div className="rc-column rc-content-v-middle">
                              <LazyLoad>
                                <img
                                  className="align-self-center widthAuto"
                                  src={emailImg}
                                  alt={props.intl.formatMessage({
                                    id: 'club.wheretohelp.alt2'
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
                              <div className="w-100">
                                {ru ? (
                                  <p>
                                    <FormattedMessage
                                      id="club.wheretohelp.card.faq"
                                      values={{
                                        val: (
                                          <DistributeHubLinkOrATag
                                            href={'/about-us/faq'}
                                            ariaLabel="Links to faq"
                                          >
                                            <a
                                              style={{
                                                textDecoration: 'underline'
                                              }}
                                            >
                                              часто задаваемые вопросы
                                            </a>
                                          </DistributeHubLinkOrATag>
                                        )
                                      }}
                                    />
                                  </p>
                                ) : tr ? (
                                  <p>
                                    <FormattedMessage
                                      id="club.wheretohelp.card.faq"
                                      values={{
                                        val: (
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
                                        )
                                      }}
                                    />
                                  </p>
                                ) : (
                                  <Link to="/faq">
                                    <p style={{ textDecoration: 'underline' }}>
                                      {/*  {*/}
                                      {/*  this.props.configStore*/}
                                      {/*    .contactTimePeriod*/}
                                      {/*}*/}
                                      <FormattedMessage id="club.wheretohelp.card.faq" />
                                    </p>
                                  </Link>
                                )}
                                <div className="rc-margin-top--xs">
                                  <p
                                    style={{ color: '#00BCA3' }}
                                    className="rc-numeric rc-md-up"
                                  >
                                    {/*<a*/}
                                    {/*  href={this.state.tel}*/}
                                    {/*  style={{ color: '#00BCA3' }}*/}
                                    {/*>*/}
                                    {/*  /!* <FormattedMessage id="help.tel" /> *!/*/}
                                    {/*  {*/}
                                    {/*    this.props.configStore*/}
                                    {/*      .storeContactPhoneNumber*/}
                                    {/*  }*/}
                                    {/*</a>*/}
                                    <a style={{ color: '#00BCA3' }}>
                                      {/* <FormattedMessage id="help.tel" /> */}
                                    </a>
                                  </p>
                                </div>
                                <div className="rc-margin-top--xs">
                                  {/*<p*/}
                                  {/*  style={{ color: '#00BCA3' }}*/}
                                  {/*  className="rc-alpha rc-border--none rc-md-down"*/}
                                  {/*  onClick={this.mobileDial}*/}
                                  {/*>*/}
                                  {/*  {*/}
                                  {/*    this.props.configStore*/}
                                  {/*      .storeContactPhoneNumber*/}
                                  {/*  }*/}
                                  {/*</p>*/}
                                  <p
                                    style={{ color: '#00BCA3' }}
                                    className="rc-alpha rc-border--none rc-md-down"
                                  ></p>
                                </div>
                              </div>
                            </div>
                            <div className="rc-column rc-content-v-middle">
                              <LazyLoad>
                                <img
                                  className="align-self-center widthAuto"
                                  src={pictofaq}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default injectIntl(HelpComponents);
