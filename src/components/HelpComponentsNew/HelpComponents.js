import React from 'react';
import callImgNew from './img/phoneicon@4x.png';
import emailImgNew from './img/emailicon@4x.png';
import faqImgNew from './img/FAQicon@4x.png';
import { FormattedMessage, injectIntl } from 'react-intl';
import LazyLoad from 'react-lazyload';
import './index.css';
import DistributeHubLinkOrATag from '@/components/DistributeHubLinkOrATag';
import { Link } from 'react-router-dom';

const HelpComponentsNew = (props) => {
  const RU = process.env.REACT_APP_COUNTRY == 'RU';
  const TR = process.env.REACT_APP_COUNTRY == 'TR';
  return (
    <div className="experience-component experience-layouts-1column">
      <div className="row rc-margin-x--none">
        <div className="rc-full-width">
          <div className="experience-component experience-layouts-cardcarousel">
            <div className="rc-margin-bottom--md rc-margin-bottom--xl--mobile text-center">
              <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile value-proposition">
                <div>
                  <h4 className="rc-beta text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile">
                    We're here to help
                  </h4>
                </div>
                <p>
                  <span>
                    Our team is available to answer your questions and ensure
                    you have the best possible experience.
                  </span>
                </p>
                <p>
                  <span>You can reach us through the following options:</span>
                </p>
                <div className="experience-component experience-layouts-1to2columnRatio">
                  <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
                    <div className=" rc-layout-container rc-five-column rc-match-heights rc-reverse-layout-mobile text-center text-md-left">
                      <div className="rc-padding--none flex justify-content-center margin-auto mobilehelp">
                        <article className="rc-full-width rc-column rc-margin-top--md--mobile">
                          <div className="rc-border-all rc-border-colour--interface fullHeight">
                            <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight rc-padding-top--md--mobile">
                              <div className="rc-column rc-double-width rc-padding-top--md--mobile">
                                <div className="w-100">
                                  <b style={{ color: '#E2001A' }}>Call us</b>
                                  <p>
                                    {/*  {*/}
                                    {/*  this.props.configStore*/}
                                    {/*    .contactTimePeriod*/}
                                    {/*}*/}
                                    Our Pet Experts are happy to help you
                                    everyday from 9 am to 6 pm
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
                                      <a style={{ color: '#E2001A' }}>
                                        {/* <FormattedMessage id="help.tel" /> */}
                                        O874 657 890
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
                                      mobile 123 030
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="rc-column rc-content-v-middle">
                                <LazyLoad>
                                  <img
                                    className="align-self-center widthAuto"
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
                                  <b style={{ color: '#E2001A' }}>Email us</b>
                                  <p>
                                    {/*  {*/}
                                    {/*  this.props.configStore*/}
                                    {/*    .contactTimePeriod*/}
                                    {/*}*/}
                                    We'll do our best to get back to you as fast
                                    as possible and within 12 hours
                                  </p>
                                  {TR || RU ? (
                                    <DistributeHubLinkOrATag
                                      href={'/contact-us'}
                                      ariaLabel="Links to contact us"
                                    >
                                      <p
                                        style={{ textDecoration: 'underline' }}
                                      >
                                        Send us an Email
                                      </p>
                                    </DistributeHubLinkOrATag>
                                  ) : (
                                    <Link to="/help/contact">
                                      <p
                                        style={{ textDecoration: 'underline' }}
                                      >
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
                                    src={emailImgNew}
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
                                  <p>
                                    You can check our FAQ section to see if your
                                    question has already been answered
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default injectIntl(HelpComponentsNew);
