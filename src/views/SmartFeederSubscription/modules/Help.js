import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { inject, observer } from 'mobx-react';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';
import PhoneModal from '../../StaticPage/Help/components/phoneModal.js';
import callImg from '@/assets/images/customer-service@2x.jpg';
import helpImg from '@/assets/images/slider-img-help.jpg';
import emailImg from '@/assets/images/emailus_icon@1x.jpg';
const sessionItemRoyal = window.__.sessionItemRoyal;
import { DistributeHubLinkOrATag } from '@/components/DistributeLink';

@inject('configStore')
@observer
class Help extends React.Component {
  static defaultProps = {
    needReverse: true,
    isEmailUnderLine: false,
    isRecommendationPage: false,
    contentText: {
      title: '',
      des: '',
      emailTitle: '',
      emailDes: '',
      emailLink: '',
      email: '',
      phoneTitle: '',
      phoneDes1: '',
      phoneDes2: '',
      phone: ''
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      seoConfig: {
        title: 'Royal canin',
        metaKeywords: 'Royal canin',
        metaDescription: 'Royal canin'
      },
      tel: '',
      mailAddress: '',
      showModal: false
    };
  }
  saveCurrentScrollTop = () => {
    let curScrollTop = document.documentElement.scrollTop;
    sessionItemRoyal.set('recommendation-scroll', curScrollTop);
  };
  mobileDial = () => {
    this.setState({ showModal: true });
  };
  cancelModal = () => {
    this.setState({ showModal: false });
  };
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
      phoneDes1,
      phoneDes2
    } = this.props.contentText;
    const phoneDes = phoneDes1 + phoneDes2;
    console.info('phoneDes', phoneDes);
    const { isRecommendationPage } = this.props;
    let isEmailUnderLine = this.props.isEmailUnderLine;
    return (
      <div className="experience-region experience-main">
        {this.state.showModal ? (
          <PhoneModal cancelModal={this.cancelModal} />
        ) : null}
        <div className="experience-component experience-layouts-1column">
          <div className="row rc-margin-x--none">
            <div className="rc-full-width">
              <div className="experience-component experience-assets-contactUsBlock">
                <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
                  <div
                    className={`text-center ${
                      isRecommendationPage
                        ? 'rc-margin-y--sm rc-margin-top--lg--mobile rc-column'
                        : ''
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
                      <p
                        className="text-center"
                        style={{
                          marginBottom: isRecommendationPage ? '1rem' : '0'
                        }}
                      >
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
                    } md:text-left food_dispenser-help`}
                  >
                    <div className="rc-column rc-double-width rc-padding--none">
                      <article className="rc-full-width rc-column rc-margin-top--md--mobile">
                        <div className="rc-border-all rc-border-colour--interface fullHeight">
                          <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight rc-padding-top--md--mobile">
                            <div className="rc-column rc-double-width rc-padding-top--md--mobile">
                              <div className="w-100">
                                <b
                                  style={{
                                    color: isRecommendationPage
                                      ? '#00A4A6'
                                      : '#00BCA3'
                                  }}
                                >
                                  {phoneTitle ? (
                                    phoneTitle
                                  ) : (
                                    <FormattedMessage id="help.byTelephone" />
                                  )}
                                </b>
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html: phoneDes
                                      ? phoneDes
                                      : this.props.configStore.contactTimePeriod
                                  }}
                                ></p>
                                <div className="rc-margin-top--xs">
                                  <a
                                    className="rc-numeric rc-md-up"
                                    href={
                                      phone
                                        ? `tel:${phone}`
                                        : this.props.configStore
                                            .storeContactPhoneNumber
                                    }
                                    style={{
                                      color: isRecommendationPage
                                        ? '#00A4A6'
                                        : '#00BCA3'
                                    }}
                                  >
                                    {/* <FormattedMessage id="help.tel" /> */}
                                    {phone
                                      ? phone
                                      : this.props.configStore
                                          .storeContactPhoneNumber}
                                  </a>
                                </div>
                                <div className="rc-margin-top--xs">
                                  {isRecommendationPage ? (
                                    <p
                                      style={{
                                        color: isRecommendationPage
                                          ? '#00A4A6'
                                          : '#00BCA3'
                                      }}
                                      className="rc-numeric rc-md-down"
                                    >
                                      <a
                                        href={
                                          'tel:' +
                                          (phone
                                            ? phone
                                            : this.props.configStore
                                                .storeContactPhoneNumber)
                                        }
                                        style={{
                                          color: isRecommendationPage
                                            ? '#00A4A6'
                                            : '#00BCA3'
                                        }}
                                      >
                                        {/* <FormattedMessage id="help.tel" /> */}
                                        {phone
                                          ? phone
                                          : this.props.configStore
                                              .storeContactPhoneNumber}
                                      </a>
                                    </p>
                                  ) : (
                                    <p
                                      style={{
                                        color: isRecommendationPage
                                          ? '#00A4A6'
                                          : '#00BCA3'
                                      }}
                                      className="rc-alpha rc-border--none rc-md-down"
                                      onClick={this.mobileDial}
                                    >
                                      {phone
                                        ? phone
                                        : this.props.configStore
                                            .storeContactPhoneNumber}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="rc-column rc-content-v-middle">
                              <img
                                className="align-self-center widthAuto"
                                src={callImg}
                                alt="By telephone"
                                title="By telephone"
                              />
                            </div>
                          </div>
                        </div>
                      </article>
                      <article className="rc-full-width rc-column">
                        <div className="rc-border-all rc-border-colour--interface fullHeight">
                          <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight rc-padding-top--md--mobile">
                            <div className="rc-column rc-double-width rc-padding-top--md--mobile">
                              <div className="w-100">
                                <strong>
                                  {/* <FormattedMessage id="help.byEmail" /> */}
                                  {isRecommendationPage ? (
                                    <span
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
                                    </span>
                                  ) : (
                                    <Link
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
                                    </Link>
                                  )}
                                </strong>
                                <p>
                                  <span style={{ color: 'rgb(102, 102, 102)' }}>
                                    {emailDes ? (
                                      emailDes
                                    ) : (
                                      <FormattedMessage id="help.tip3" />
                                    )}
                                  </span>
                                </p>
                                <div className="rc-margin-top--xs">
                                  {/* <p
                                    className="rc-numeric text-nowrap"
                                    style={{
                                      color: 'rgb(0, 135, 189)'
                                    }}
                                  > */}
                                  {isRecommendationPage ? (
                                    <DistributeHubLinkOrATag
                                      href={emailLink}
                                      to={emailLink}
                                      onClick={() => {
                                        this.saveCurrentScrollTop;
                                        this.props.GAforEmail &&
                                          this.props.GAforEmail();
                                      }}
                                      className="rc-styled-link"
                                    >
                                      {email ? (
                                        email
                                      ) : (
                                        <FormattedMessage id="help.email" />
                                      )}
                                    </DistributeHubLinkOrATag>
                                  ) : (
                                    // <Link
                                    //   to={emailLink}
                                    //   // style={{
                                    //   //   fontSize: '1rem',
                                    //   //   borderBottom: '1px solid transparent'
                                    //   // }}
                                    //   onClick={this.saveCurrentScrollTop}
                                    //   className="rc-styled-link"
                                    // >
                                    //   {email ? (
                                    //     email
                                    //   ) : (
                                    //     <FormattedMessage id="help.email" />
                                    //   )}
                                    // </Link>
                                    <a
                                      href={this.state.mailAddress}
                                      style={{
                                        fontSize: '1rem',
                                        borderBottom: '1px solid transparent',
                                        textDecoration: isEmailUnderLine
                                          ? 'underline'
                                          : 'none'
                                      }}
                                      className="rc-styled-link 1111"
                                    >
                                      {email ? (
                                        email
                                      ) : (
                                        <FormattedMessage id="help.email" />
                                      )}
                                    </a>
                                  )}
                                  {/* </p> */}
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
                            <img src={helpImg} alt="help icon" title=" " />
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
