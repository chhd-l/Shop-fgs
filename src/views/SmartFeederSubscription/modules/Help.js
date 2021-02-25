import React from 'react';
import { FormattedMessage } from 'react-intl';
import { inject, observer } from 'mobx-react';
import LazyLoad from 'react-lazyload';
import callImg from '@/assets/images/customer-service@2x.jpg';
import helpImg from '@/assets/images/slider-img-help.jpg';
import emailImg from '@/assets/images/emailus_icon@1x.jpg';

@inject('configStore')
@observer
class Help extends React.Component {
  static defaultProps = {
    needReverse: true,
    contentText: {
      title: '',
      des: '',
      emailTitle: '',
      emailDes: '',
      emailLink: '',
      email: '',
      phoneTitle: '',
      phoneDes: '',
      phone: ''
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      seoConfig: {
        title: '',
        metaKeywords: '',
        metaDescription: ''
      },
      tel: '',
      mailAddress: '',
      showModal: false
    };
  }
  render(h) {
    const {
      title,
      des,
      email,
      phone,
      emailTitle,
      emailLink,
      emailDes,
      phoneTitle,
      phoneDes
    } = this.props.contentText;
    return (
      <div className="experience-region experience-main">
        <div className="experience-component experience-layouts-1column">
          <div className="row rc-margin-x--none">
            <div className="rc-full-width">
              <div className="experience-component experience-assets-contactUsBlock">
                <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
                  <div
                    className={`text-center ${
                      true ? '' : 'rc-margin-y--sm rc-margin-top--lg--mobile'
                    }`}
                  >
                    <h1 className="rc-beta">
                      {title ? (
                        title
                      ) : (
                        <FormattedMessage id="recommendation.thirdTitle" />
                      )}

                      {/* Our pet experts are here to help you   */}
                    </h1>
                    <div className="rc-large-body inherit-fontsize children-nomargin">
                      <p style={{ maxWidth: '680px' }}>
                        {des ? (
                          des
                        ) : (
                          <FormattedMessage id="smartFeederSubscription.helpSubTitle" />
                        )}

                        {/* We’re ready to help you with any further questions you
                        might have
                        <br />
                        about the Smart Feeder Subscription. */}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`rc-layout-container rc-five-column rc-match-heights ${
                      this.props.needReverse ? 'rc-reverse-layout-mobile' : ''
                    } text-md-left food_dispenser-help`}
                  >
                    <div className="rc-column rc-double-width rc-padding--none">
                      <article className="rc-full-width rc-column rc-margin-top--md--mobile">
                        <div className="rc-border-all rc-border-colour--interface fullHeight">
                          <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight rc-padding-top--md--mobile">
                            <div className="rc-column rc-double-width rc-padding-top--md--mobile">
                              <div className="w-100">
                                <b style={{ color: '#00BCA3' }}>
                                  {phoneTitle ? (
                                    phoneTitle
                                  ) : (
                                    <FormattedMessage id="help.byTelephone" />
                                  )}
                                </b>
                                <p>
                                  {phoneDes
                                    ? phoneDes
                                    : this.props.configStore.contactTimePeriod}
                                </p>
                                <div className="rc-margin-top--xs">
                                  <p
                                    style={{ color: '#00BCA3' }}
                                    className="rc-numeric rc-md-up"
                                  >
                                    <a
                                      href={
                                        phone
                                          ? phone
                                          : this.props.configStore
                                              .storeContactPhoneNumber
                                      }
                                      style={{ color: '#00BCA3' }}
                                    >
                                      {/* <FormattedMessage id="help.tel" /> */}
                                      {phone
                                        ? phone
                                        : this.props.configStore
                                            .storeContactPhoneNumber}
                                    </a>
                                  </p>
                                </div>
                                <div className="rc-margin-top--xs">
                                  <p
                                    style={{ color: '#00BCA3' }}
                                    className="rc-alpha rc-border--none rc-md-down"
                                    onClick={this.mobileDial}
                                  >
                                    {
                                      this.props.configStore
                                        .storeContactPhoneNumber
                                    }
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="rc-column rc-content-v-middle">
                              <LazyLoad>
                                <img
                                  className="align-self-center widthAuto"
                                  src={callImg}
                                  alt="By telephone"
                                  title="By telephone"
                                />
                              </LazyLoad>
                            </div>
                          </div>
                        </div>
                      </article>
                      <article className="rc-full-width rc-column">
                        <div className="rc-border-all rc-border-colour--interface fullHeight">
                          <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight rc-padding-top--md--mobile">
                            <div className="rc-column rc-double-width rc-padding-top--md--mobile">
                              <div className="w-100">
                                <b>
                                  <font style={{ verticalAlign: 'inherit' }}>
                                    <a
                                      href={
                                        emailLink
                                          ? emailLink
                                          : this.state.mailAddress
                                      }
                                      style={{
                                        verticalAlign: 'inherit',
                                        color: '#0087BD'
                                      }}
                                    >
                                      {emailTitle ? (
                                        emailTitle
                                      ) : (
                                        <FormattedMessage id="help.byEmail" />
                                      )}
                                    </a>
                                  </font>
                                </b>
                                <p>
                                  <span style={{ color: 'rgb(0, 0, 0)' }}>
                                    <font
                                      style={{
                                        verticalAlign: 'inherit'
                                      }}
                                    >
                                      <font
                                        style={{
                                          verticalAlign: 'inherit'
                                        }}
                                      >
                                        {emailDes ? (
                                          emailDes
                                        ) : (
                                          <FormattedMessage id="help.tip3" />
                                        )}
                                      </font>
                                    </font>
                                  </span>
                                </p>
                                <div className="rc-margin-top--xs">
                                  <p
                                    className="rc-numeric text-nowrap"
                                    style={{
                                      color: 'rgb(0, 135, 189)'
                                    }}
                                  >
                                    <a
                                      href={this.state.mailAddress}
                                      style={{
                                        fontSize: '16px',
                                        borderBottom: '1px solid transparent'
                                      }}
                                      className="rc-styled-link"
                                    >
                                      {email ? (
                                        email
                                      ) : (
                                        <FormattedMessage id="help.email" />
                                      )}
                                    </a>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="rc-column rc-content-v-middle">
                              <LazyLoad>
                                <img
                                  className="align-self-center widthAuto"
                                  src={emailImg}
                                  alt="By email"
                                  title="By email"
                                />
                              </LazyLoad>
                            </div>
                          </div>
                        </div>
                      </article>
                    </div>
                    <div className="rc-column rc-triple-width">
                      <div
                        className="background-cover"
                        style={{
                          backgroundImage: `url(${require('@/assets/images/slider-img-help.jpg?sw=802&amp;sh=336&amp;sm=cut&amp;sfrm=png')})`
                        }}
                      >
                        <picture className="rc-card__image">
                          <LazyLoad>
                            <img src={helpImg} alt=" " title=" " />
                          </LazyLoad>
                        </picture>
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
  }
}
export default Help;
