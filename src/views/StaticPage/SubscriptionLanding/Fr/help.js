import React, { Component } from 'react';
import LazyLoad from 'react-lazyload';
import { inject, observer } from 'mobx-react';
import { DistributeHubLinkOrATag } from '@/components/DistributeLink';
// import { Helmet } from 'react-helmet'; // 父组件引用导致了seo没显示上去，先注释

@inject('configStore')
class Help extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mailAddress: ''
    };
  }
  componentDidMount() {
    const mailAddress = 'mailto:' + this.props.configStore.storeContactEmail;
    this.setState({ mailAddress });
  }
  render() {
    return (
      <div className="rc-layout-container rc-three-column rc-match-heights rc-padding-bottom--lg rc-max-width--lg">
        <div className="rc-column rc-padding--none">
          <article className="rc-full-width rc-column rc-padding-left--none--desktop">
            <div className="rc-border-all rc-border-colour--interface fullHeight contact_options__card">
              <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight">
                <div className="rc-column rc-double-width rc-padding-top--md--mobile text-center md:text-left rc-padding-right--none--desktop">
                  <div>
                    <b style={{ color: '#00A4A6' }}>Par téléphone</b>
                    <p>
                      De 8h30 à 12h30 et de 14h à 17h du lundi au vendredi
                      (appel non surtaxé)
                    </p>
                    <div className="rc-margin-top--xs">
                      <a
                        className="rc-numeric nowrap"
                        style={{ color: '#00A4A6' }}
                        href={`tel:${this.props.configStore.storeContactPhoneNumber}`}
                      >
                        {this.props.configStore.storeContactPhoneNumber}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="rc-column rc-content-v-middle rc-padding-top--sm--mobile">
                  <LazyLoad>
                    <img
                      className="align-self-center widthAuto lazyloaded"
                      alt="customer service image"
                      src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/customer-service@2x.png`}
                    />
                  </LazyLoad>
                </div>
              </div>
            </div>
          </article>
        </div>
        <div className="rc-column rc-padding--none">
          <article className="rc-full-width rc-column rc-padding-left--none--desktop">
            <div className="rc-border-all rc-border-colour--interface fullHeight contact_options__card">
              <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight">
                <div className="rc-column rc-double-width rc-padding-top--md--mobile text-center md:text-left rc-padding-right--none--desktop">
                  <div>
                    <b style={{ color: '#0087BD' }}>Par mail</b>
                    <p>Nous vous répondons sous deux jours ouvrés.</p>
                    <div className="rc-margin-top--xs">
                      <a
                        href={this.state.mailAddress}
                        className="rc-numeric nowrap"
                        style={{ color: '#0087BD' }}
                      >
                        Envoyer un email
                      </a>
                    </div>
                  </div>
                </div>
                <div className="rc-column rc-content-v-middle rc-padding-top--sm--mobile">
                  <LazyLoad>
                    <img
                      className="align-self-center widthAuto lazyloaded"
                      alt="email us icon"
                      src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/Emailus_icon_100@2x .webp`}
                    />
                  </LazyLoad>
                </div>
              </div>
            </div>
          </article>
        </div>
        <div className="rc-column rc-padding--none">
          <article className="rc-full-width rc-column rc-padding-left--none--desktop">
            <div className="rc-border-all rc-border-colour--interface fullHeight contact_options__card">
              <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight">
                <div className="rc-column rc-double-width rc-padding-top--md--mobile text-center md:text-left rc-padding-right--none--desktop">
                  <div>
                    <strong>Des questions?</strong>
                    <p>
                      {`Vous pouvez également consulter notre rubrique `}
                      <DistributeHubLinkOrATag
                        style={{
                          color: 'rgb(236,0,26)',
                          backgroundColor: 'rgb(255,255,255)',
                          padding: '0 3px'
                        }}
                        to="/faq"
                        href="/about-us/faqs"
                      >
                        FAQ
                      </DistributeHubLinkOrATag>
                      qui vous apportera de nombreuses réponses
                    </p>
                  </div>
                </div>
                <div className="rc-column rc-content-v-middle rc-padding-top--sm--mobile">
                  <LazyLoad>
                    <img
                      className="align-self-center widthAuto lazyloaded"
                      alt="faq icon"
                      src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/FAQ_icon_100@2x.png`}
                    />
                  </LazyLoad>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }
}
export default Help;
