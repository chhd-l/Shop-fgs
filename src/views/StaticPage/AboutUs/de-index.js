import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import BreadCrumbs from '@/components/BreadCrumbs';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import { FormattedMessage, injectIntl } from 'react-intl';
import image1 from './images/image1.jpg';
import image2 from './images/image2.jpg';
import image3 from './images/image3.jpg';
import cat from './images/cat.jpg';
import dog from './images/dog.jpg';
import { inject, observer } from 'mobx-react';
import './index.css';
import { setSeoConfig } from '@/utils/utils';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import Faq from '../../Payment/Fr/faq';

const localItemRoyal = window.__.localItemRoyal;

@inject('checkoutStore', 'loginStore', 'clinicStore')
@inject('configStore')
@observer
@injectIntl
class about extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  componentDidMount() {
    setSeoConfig(
      {pageName:"About Us Page"}
    )
    // if (localItemRoyal.get('isRefresh')) {
    //   localItemRoyal.remove('isRefresh');
    //   window.location.reload();
    //   return false;
    // }
  }

  render(h) {
    const event = {
      page: {
        type: 'Content',
        theme: 'Brand'
      }
    };
    return (
      <div>
        <GoogleTagManager additionalEvents={event} />
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={this.props.location}
          history={this.props.history}
          match={this.props.match}
        />
        <main className="rc-content--fixed-header rc-bg-colour--brand3">
          <BannerTip/>
          {/* {process.env.REACT_APP_LANG == 'fr' ? null: <BannerTip />} */}
          <br/>
          <BreadCrumbs />
          <div className="storefront-page">
            <nav
              className="rc-progress rc-progress--breadcrumbs-stepped rc-max-width--xl rc-padding-x--sm rc-padding-y--xs rc-margin-top--xs "
              data-progress-setup="true">

            </nav>
          </div>
          <div className="rc-padding-x--sm rc-margin-bottom--xs rc-bg-colour--brand3 hero-panel"
               data-component="content-animation" id="hero-panel-3-about-us-page">
            <div className="rc-padding-y--md rc-md-down"></div>
            <div className="rc-layout-container rc-two-column rc-max-width--lg rc-content-h-middle ">
              <div className="rc-column rc-padding-bottom--none  rc-text--left">
                <div className="rc-full-width">
                  <div>
                    <h1 className="rc-alpha ">Gesundheit ist unsere Leidenschaft</h1>
                    <p>Im Mittelpunkt unserer Aufmerksamkeit stehen die besonderen Bedürfnisse von Katzen und Hunden.
                      Diese Liebe zum Detail eröffnet uns die Möglichkeit, eine präzise und effektive Ernährung
                      bereitzustellen, die ihre optimale Entwicklung unterstützt.</p>
                  </div>
                </div>
              </div>
              <div className="rc-column rc-padding-bottom--none  rc-text--left">
                <div className="rc-full-width">
                  <img className="lazyautosizes lazyloaded"
                       src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 6732 8984'%3E%3C/svg%3E"
                       data-srcset="https://cdn.royalcanin-weshare-online.io/0vksa2QBIYfdNSoCF_yf/v11/english-cocker-spaniel-adult-dermatology-emblematic?w=320&amp;auto=compress&amp;fm=jpg 320w,https://cdn.royalcanin-weshare-online.io/0vksa2QBIYfdNSoCF_yf/v11/english-cocker-spaniel-adult-dermatology-emblematic?w=360&amp;auto=compress&amp;fm=jpg 360w,https://cdn.royalcanin-weshare-online.io/0vksa2QBIYfdNSoCF_yf/v11/english-cocker-spaniel-adult-dermatology-emblematic?w=640&amp;auto=compress&amp;fm=jpg 640w,https://cdn.royalcanin-weshare-online.io/0vksa2QBIYfdNSoCF_yf/v11/english-cocker-spaniel-adult-dermatology-emblematic?w=720&amp;auto=compress&amp;fm=jpg 720w,https://cdn.royalcanin-weshare-online.io/0vksa2QBIYfdNSoCF_yf/v11/english-cocker-spaniel-adult-dermatology-emblematic?w=960&amp;auto=compress&amp;fm=jpg 960w,https://cdn.royalcanin-weshare-online.io/0vksa2QBIYfdNSoCF_yf/v11/english-cocker-spaniel-adult-dermatology-emblematic?w=1280&amp;auto=compress&amp;fm=jpg 1280w,https://cdn.royalcanin-weshare-online.io/0vksa2QBIYfdNSoCF_yf/v11/english-cocker-spaniel-adult-dermatology-emblematic?w=1440&amp;auto=compress&amp;fm=jpg 1440w"
                       data-sizes="auto" alt="Inline Image 9" sizes="519px"
                       srcSet="https://cdn.royalcanin-weshare-online.io/0vksa2QBIYfdNSoCF_yf/v11/english-cocker-spaniel-adult-dermatology-emblematic?w=320&amp;auto=compress&amp;fm=jpg 320w,https://cdn.royalcanin-weshare-online.io/0vksa2QBIYfdNSoCF_yf/v11/english-cocker-spaniel-adult-dermatology-emblematic?w=360&amp;auto=compress&amp;fm=jpg 360w,https://cdn.royalcanin-weshare-online.io/0vksa2QBIYfdNSoCF_yf/v11/english-cocker-spaniel-adult-dermatology-emblematic?w=640&amp;auto=compress&amp;fm=jpg 640w,https://cdn.royalcanin-weshare-online.io/0vksa2QBIYfdNSoCF_yf/v11/english-cocker-spaniel-adult-dermatology-emblematic?w=720&amp;auto=compress&amp;fm=jpg 720w,https://cdn.royalcanin-weshare-online.io/0vksa2QBIYfdNSoCF_yf/v11/english-cocker-spaniel-adult-dermatology-emblematic?w=960&amp;auto=compress&amp;fm=jpg 960w,https://cdn.royalcanin-weshare-online.io/0vksa2QBIYfdNSoCF_yf/v11/english-cocker-spaniel-adult-dermatology-emblematic?w=1280&amp;auto=compress&amp;fm=jpg 1280w,https://cdn.royalcanin-weshare-online.io/0vksa2QBIYfdNSoCF_yf/v11/english-cocker-spaniel-adult-dermatology-emblematic?w=1440&amp;auto=compress&amp;fm=jpg 1440w">
                  </img>
                </div>
              </div>
            </div>
            <div className="rc-hidden"></div>
          </div>
          <div
            className="rc-padding-x--sm rc-margin--none rc-bg-colour--brand3 rc-animation-001--base rc-animation-001--active"
            data-component="content-animation">
            <div className="rc-padding-y--md rc-md-down"></div>
            <div className="rc-layout-container rc-two-column rc-content-h-middle rc-max-width--xl ">
              <div className="rc-column rc-padding-y--none rc-single ">
                <div className="rc-padding-x--sm rc-margin-bottom--xs rc-bg-colour--brand3 rc-full-width"
                     data-component="content-animation" id="content-block-with-text-and-image-6-about-us-page">
                  <div className="rc-padding-y--md rc-md-down"></div>
                  <div
                    className="rc-layout-container rc-one-column rc-max-width--xl rc-content-h-middle rc-reverse-layout">
                    <div className="rc-column">
                      <div className="rc-full-width rc-text--left ">
                        <div>
                          <h2 className="rc-beta ">Unsere Werte</h2>
                          <p>Erfahren Sie mehr über die Ideen und Werte, die Royal Canin prägen.</p>
                          <a className="rc-btn rc-btn--two" data-component="cta-event-tracker"
                             data-track-category="About us / Button" data-track-custom="false"
                             data-track-custom-action="" data-track-custom-category="" data-track-custom-event=""
                             data-track-custom-label=""
                             data-track-label="Mehr erfahren / Unsere Werte / Gesundheit ist unsere Leidenschaft | Royal Canin DE - Royal Canin - DE"
                             href="https://www.royalcanin.com/de/about-us/our-values">
                            Mehr erfahren
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="rc-column rc-padding-bottom--none">
                      <div className="rc-full-width ">
                        <img className="lazyautosizes lazyloaded"
                             src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 3807 4614'%3E%3C/svg%3E"
                             data-srcset="https://cdn.royalcanin-weshare-online.io/8yEva2QBaxEApS7Ln_vw/v15/yorkshire-terrier-adult-brand-breed-health-management-emblematic?w=320&amp;h=568&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 320w,https://cdn.royalcanin-weshare-online.io/8yEva2QBaxEApS7Ln_vw/v15/yorkshire-terrier-adult-brand-breed-health-management-emblematic?w=360&amp;h=640&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 360w,https://cdn.royalcanin-weshare-online.io/8yEva2QBaxEApS7Ln_vw/v15/yorkshire-terrier-adult-brand-breed-health-management-emblematic?w=640&amp;h=1137&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 640w,https://cdn.royalcanin-weshare-online.io/8yEva2QBaxEApS7Ln_vw/v15/yorkshire-terrier-adult-brand-breed-health-management-emblematic?w=720&amp;h=1280&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 720w,https://cdn.royalcanin-weshare-online.io/8yEva2QBaxEApS7Ln_vw/v15/yorkshire-terrier-adult-brand-breed-health-management-emblematic?w=960&amp;h=1706&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 960w,https://cdn.royalcanin-weshare-online.io/8yEva2QBaxEApS7Ln_vw/v15/yorkshire-terrier-adult-brand-breed-health-management-emblematic?w=1280&amp;h=2275&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 1280w,https://cdn.royalcanin-weshare-online.io/8yEva2QBaxEApS7Ln_vw/v15/yorkshire-terrier-adult-brand-breed-health-management-emblematic?w=1440&amp;h=2560&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 1440w"
                             data-sizes="auto" alt="Ausgewachsene Deutsche Dogge in Schwarzweiß vor weißem Hintergrund"
                             sizes="271px"
                             srcSet="https://cdn.royalcanin-weshare-online.io/8yEva2QBaxEApS7Ln_vw/v15/yorkshire-terrier-adult-brand-breed-health-management-emblematic?w=320&amp;h=568&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 320w,https://cdn.royalcanin-weshare-online.io/8yEva2QBaxEApS7Ln_vw/v15/yorkshire-terrier-adult-brand-breed-health-management-emblematic?w=360&amp;h=640&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 360w,https://cdn.royalcanin-weshare-online.io/8yEva2QBaxEApS7Ln_vw/v15/yorkshire-terrier-adult-brand-breed-health-management-emblematic?w=640&amp;h=1137&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 640w,https://cdn.royalcanin-weshare-online.io/8yEva2QBaxEApS7Ln_vw/v15/yorkshire-terrier-adult-brand-breed-health-management-emblematic?w=720&amp;h=1280&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 720w,https://cdn.royalcanin-weshare-online.io/8yEva2QBaxEApS7Ln_vw/v15/yorkshire-terrier-adult-brand-breed-health-management-emblematic?w=960&amp;h=1706&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 960w,https://cdn.royalcanin-weshare-online.io/8yEva2QBaxEApS7Ln_vw/v15/yorkshire-terrier-adult-brand-breed-health-management-emblematic?w=1280&amp;h=2275&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 1280w,https://cdn.royalcanin-weshare-online.io/8yEva2QBaxEApS7Ln_vw/v15/yorkshire-terrier-adult-brand-breed-health-management-emblematic?w=1440&amp;h=2560&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 1440w">
                        </img>
                      </div>
                    </div>
                  </div>
                  <div className="rc-hidden rc-md-down"></div>
                </div>
              </div>
              <div className="rc-column rc-single ">
                <div className="rc-padding--sm rc-margin-bottom--xs rc-bg-colour--brand3 rc-full-width"
                     data-component="content-animation" id="content-block-with-text-and-image-5-about-us-page">
                  <div className="rc-padding-y--md rc-md-down"></div>
                  <div
                    className="rc-layout-container rc-one-column rc-max-width--xl rc-content-h-middle rc-reverse-layout">
                    <div className="rc-column">
                      <div className="rc-full-width rc-text--left ">
                        <div>
                          <h2 className="rc-beta ">Unsere Geschichte</h2>
                          <p>Erfahren Sie mehr darüber, wie wir diese Werte seit 50 Jahren täglich leben.</p>
                          <a className="rc-btn rc-btn--two" data-component="cta-event-tracker"
                             data-track-category="About us / Button" data-track-custom="false"
                             data-track-custom-action="" data-track-custom-category="" data-track-custom-event=""
                             data-track-custom-label=""
                             data-track-label="Mehr erfahren / Unsere Geschichte / Gesundheit ist unsere Leidenschaft | Royal Canin DE - Royal Canin - DE"
                             href="https://www.royalcanin.com/de/about-us/our-history">
                            Mehr erfahren
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="rc-column ">
                      <div className="rc-full-width ">
                        <img className="lazyautosizes lazyloaded"
                             src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 7360 4912'%3E%3C/svg%3E"
                             data-srcset="https://cdn.royalcanin-weshare-online.io/zmliI2UBG95Xk-RBt9xG/v7/english-setter-puppy-vet-vhn?w=320&amp;h=568&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 320w,https://cdn.royalcanin-weshare-online.io/zmliI2UBG95Xk-RBt9xG/v7/english-setter-puppy-vet-vhn?w=360&amp;h=640&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 360w,https://cdn.royalcanin-weshare-online.io/zmliI2UBG95Xk-RBt9xG/v7/english-setter-puppy-vet-vhn?w=640&amp;h=1137&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 640w,https://cdn.royalcanin-weshare-online.io/zmliI2UBG95Xk-RBt9xG/v7/english-setter-puppy-vet-vhn?w=720&amp;h=1280&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 720w,https://cdn.royalcanin-weshare-online.io/zmliI2UBG95Xk-RBt9xG/v7/english-setter-puppy-vet-vhn?w=960&amp;h=1706&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 960w,https://cdn.royalcanin-weshare-online.io/zmliI2UBG95Xk-RBt9xG/v7/english-setter-puppy-vet-vhn?w=1280&amp;h=2275&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 1280w,https://cdn.royalcanin-weshare-online.io/zmliI2UBG95Xk-RBt9xG/v7/english-setter-puppy-vet-vhn?w=1440&amp;h=2560&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 1440w"
                             data-sizes="auto"
                             alt="Ausgewachsene Britisch Kurzhaar in Schwarzweiß vor weißem Hintergrund" sizes="271px"
                             srcSet="https://cdn.royalcanin-weshare-online.io/zmliI2UBG95Xk-RBt9xG/v7/english-setter-puppy-vet-vhn?w=320&amp;h=568&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 320w,https://cdn.royalcanin-weshare-online.io/zmliI2UBG95Xk-RBt9xG/v7/english-setter-puppy-vet-vhn?w=360&amp;h=640&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 360w,https://cdn.royalcanin-weshare-online.io/zmliI2UBG95Xk-RBt9xG/v7/english-setter-puppy-vet-vhn?w=640&amp;h=1137&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 640w,https://cdn.royalcanin-weshare-online.io/zmliI2UBG95Xk-RBt9xG/v7/english-setter-puppy-vet-vhn?w=720&amp;h=1280&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 720w,https://cdn.royalcanin-weshare-online.io/zmliI2UBG95Xk-RBt9xG/v7/english-setter-puppy-vet-vhn?w=960&amp;h=1706&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 960w,https://cdn.royalcanin-weshare-online.io/zmliI2UBG95Xk-RBt9xG/v7/english-setter-puppy-vet-vhn?w=1280&amp;h=2275&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 1280w,https://cdn.royalcanin-weshare-online.io/zmliI2UBG95Xk-RBt9xG/v7/english-setter-puppy-vet-vhn?w=1440&amp;h=2560&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 1440w">
                        </img>
                      </div>
                    </div>
                  </div>
                  <div className="rc-padding-y--md rc-md-down"></div>
                </div>
              </div>
            </div>
            <div className="rc-padding-y--md rc-md-down rc-hidden"></div>
          </div>
          <div className="rc-padding--sm rc-margin-bottom--xs rc-bg-colour--brand3" data-component="content-animation">
            <div className="rc-padding-y--md rc-md-down"></div>
            <div className="rc-layout-container rc-two-column rc-content-h-middle rc-max-width--xl ">
              <div className="rc-column rc-single ">
                <div className="rc-padding--sm rc-margin-bottom--xs rc-bg-colour--brand3 rc-full-width"
                     data-component="content-animation" id="content-block-with-text-and-image-8-about-us-page">
                  <div className="rc-padding-y--md rc-md-down"></div>
                  <div
                    className="rc-layout-container rc-one-column rc-max-width--xl rc-content-h-middle rc-reverse-layout">
                    <div className="rc-column">
                      <div className="rc-full-width rc-text--left ">
                        <div>
                          <h2 className="rc-beta ">Für eine nachhaltige Zukunft</h2>
                          <p>Nachhaltigkeit ist zentraler Bestandteil der täglichen globalen Aktivitäten von Royal
                            Canin.</p>
                          <a className="rc-btn rc-btn--two" data-component="cta-event-tracker"
                             data-track-category="About us / Button" data-track-custom="false"
                             data-track-custom-action="" data-track-custom-category="" data-track-custom-event=""
                             data-track-custom-label=""
                             data-track-label="Mehr erfahren / Für eine nachhaltige Zukunft / Gesundheit ist unsere Leidenschaft | Royal Canin DE - Royal Canin - DE"
                             href="https://www.royalcanin.com/de/about-us/sustainability">
                            Mehr erfahren
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="rc-column ">
                      <div className="rc-full-width ">
                        <img className="lazyautosizes lazyloaded"
                             src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 6708 8956'%3E%3C/svg%3E"
                             data-srcset="https://cdn.royalcanin-weshare-online.io/Nvkva2QBIYfdNSoCg_--/v44/german-shepherd-puppy-brand-breed-emblematic?w=320&amp;h=568&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 320w,https://cdn.royalcanin-weshare-online.io/Nvkva2QBIYfdNSoCg_--/v44/german-shepherd-puppy-brand-breed-emblematic?w=360&amp;h=640&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 360w,https://cdn.royalcanin-weshare-online.io/Nvkva2QBIYfdNSoCg_--/v44/german-shepherd-puppy-brand-breed-emblematic?w=640&amp;h=1137&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 640w,https://cdn.royalcanin-weshare-online.io/Nvkva2QBIYfdNSoCg_--/v44/german-shepherd-puppy-brand-breed-emblematic?w=720&amp;h=1280&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 720w,https://cdn.royalcanin-weshare-online.io/Nvkva2QBIYfdNSoCg_--/v44/german-shepherd-puppy-brand-breed-emblematic?w=960&amp;h=1706&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 960w,https://cdn.royalcanin-weshare-online.io/Nvkva2QBIYfdNSoCg_--/v44/german-shepherd-puppy-brand-breed-emblematic?w=1280&amp;h=2275&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 1280w,https://cdn.royalcanin-weshare-online.io/Nvkva2QBIYfdNSoCg_--/v44/german-shepherd-puppy-brand-breed-emblematic?w=1440&amp;h=2560&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 1440w"
                             data-sizes="auto"
                             alt="Ausgewachsene Britisch Kurzhaar in Schwarzweiß vor weißem Hintergrund" sizes="271px"
                             srcSet="https://cdn.royalcanin-weshare-online.io/Nvkva2QBIYfdNSoCg_--/v44/german-shepherd-puppy-brand-breed-emblematic?w=320&amp;h=568&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 320w,https://cdn.royalcanin-weshare-online.io/Nvkva2QBIYfdNSoCg_--/v44/german-shepherd-puppy-brand-breed-emblematic?w=360&amp;h=640&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 360w,https://cdn.royalcanin-weshare-online.io/Nvkva2QBIYfdNSoCg_--/v44/german-shepherd-puppy-brand-breed-emblematic?w=640&amp;h=1137&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 640w,https://cdn.royalcanin-weshare-online.io/Nvkva2QBIYfdNSoCg_--/v44/german-shepherd-puppy-brand-breed-emblematic?w=720&amp;h=1280&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 720w,https://cdn.royalcanin-weshare-online.io/Nvkva2QBIYfdNSoCg_--/v44/german-shepherd-puppy-brand-breed-emblematic?w=960&amp;h=1706&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 960w,https://cdn.royalcanin-weshare-online.io/Nvkva2QBIYfdNSoCg_--/v44/german-shepherd-puppy-brand-breed-emblematic?w=1280&amp;h=2275&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 1280w,https://cdn.royalcanin-weshare-online.io/Nvkva2QBIYfdNSoCg_--/v44/german-shepherd-puppy-brand-breed-emblematic?w=1440&amp;h=2560&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 1440w">
                        </img>
                      </div>
                    </div>
                  </div>
                  <div className="rc-padding-y--md rc-md-down"></div>
                </div>
              </div>
              <div className="rc-column rc-single ">
                <div className="rc-padding--sm rc-margin-bottom--xs rc-bg-colour--brand3 rc-full-width"
                     data-component="content-animation" id="content-block-with-text-and-image-9-about-us-page">
                  <div className="rc-padding-y--md rc-md-down"></div>
                  <div
                    className="rc-layout-container rc-one-column rc-max-width--xl rc-content-h-middle rc-reverse-layout">
                    <div className="rc-column">
                      <div className="rc-full-width rc-text--left ">
                        <div>
                          <h2 className="rc-beta ">Der Qualität verpflichtet</h2>
                          <p>Ernährungsqualität und Produktsicherheit stehen im Mittelpunkt unseres weltweiten
                            Handelns.</p>
                          <a className="rc-btn rc-btn--two" data-component="cta-event-tracker"
                             data-track-category="About us / Button" data-track-custom="false"
                             data-track-custom-action="" data-track-custom-category="" data-track-custom-event=""
                             data-track-custom-label=""
                             data-track-label="Mehr erfahren / Der Qualität verpflichtet / Gesundheit ist unsere Leidenschaft | Royal Canin DE - Royal Canin - DE"
                             href="https://www.royalcanin.com/de/about-us/qualitat-und-futtermittelsicherheit">
                            Mehr erfahren
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="rc-column ">
                      <div className="rc-full-width ">
                        <img className="lazyautosizes lazyloaded"
                             src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 6732 4761'%3E%3C/svg%3E"
                             data-srcset="https://cdn.royalcanin-weshare-online.io/qPkwa2QBIYfdNSoCWv9p/v37/maine-coon-kitten-brand-birth-growth-breed-emblematic?w=320&amp;h=568&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 320w,https://cdn.royalcanin-weshare-online.io/qPkwa2QBIYfdNSoCWv9p/v37/maine-coon-kitten-brand-birth-growth-breed-emblematic?w=360&amp;h=640&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 360w,https://cdn.royalcanin-weshare-online.io/qPkwa2QBIYfdNSoCWv9p/v37/maine-coon-kitten-brand-birth-growth-breed-emblematic?w=640&amp;h=1137&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 640w,https://cdn.royalcanin-weshare-online.io/qPkwa2QBIYfdNSoCWv9p/v37/maine-coon-kitten-brand-birth-growth-breed-emblematic?w=720&amp;h=1280&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 720w,https://cdn.royalcanin-weshare-online.io/qPkwa2QBIYfdNSoCWv9p/v37/maine-coon-kitten-brand-birth-growth-breed-emblematic?w=960&amp;h=1706&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 960w,https://cdn.royalcanin-weshare-online.io/qPkwa2QBIYfdNSoCWv9p/v37/maine-coon-kitten-brand-birth-growth-breed-emblematic?w=1280&amp;h=2275&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 1280w,https://cdn.royalcanin-weshare-online.io/qPkwa2QBIYfdNSoCWv9p/v37/maine-coon-kitten-brand-birth-growth-breed-emblematic?w=1440&amp;h=2560&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 1440w"
                             data-sizes="auto" alt="Ausgewachsene Ragdoll-Katze in Schwarzweiß vor weißem Hintergrund"
                             sizes="271px"
                             srcSet="https://cdn.royalcanin-weshare-online.io/qPkwa2QBIYfdNSoCWv9p/v37/maine-coon-kitten-brand-birth-growth-breed-emblematic?w=320&amp;h=568&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 320w,https://cdn.royalcanin-weshare-online.io/qPkwa2QBIYfdNSoCWv9p/v37/maine-coon-kitten-brand-birth-growth-breed-emblematic?w=360&amp;h=640&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 360w,https://cdn.royalcanin-weshare-online.io/qPkwa2QBIYfdNSoCWv9p/v37/maine-coon-kitten-brand-birth-growth-breed-emblematic?w=640&amp;h=1137&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 640w,https://cdn.royalcanin-weshare-online.io/qPkwa2QBIYfdNSoCWv9p/v37/maine-coon-kitten-brand-birth-growth-breed-emblematic?w=720&amp;h=1280&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 720w,https://cdn.royalcanin-weshare-online.io/qPkwa2QBIYfdNSoCWv9p/v37/maine-coon-kitten-brand-birth-growth-breed-emblematic?w=960&amp;h=1706&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 960w,https://cdn.royalcanin-weshare-online.io/qPkwa2QBIYfdNSoCWv9p/v37/maine-coon-kitten-brand-birth-growth-breed-emblematic?w=1280&amp;h=2275&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 1280w,https://cdn.royalcanin-weshare-online.io/qPkwa2QBIYfdNSoCWv9p/v37/maine-coon-kitten-brand-birth-growth-breed-emblematic?w=1440&amp;h=2560&amp;fit=crop&amp;crop=entropy&amp;auto=compress&amp;fm=jpg 1440w">
                        </img>
                      </div>
                    </div>
                  </div>
                  <div className="rc-padding-y--md rc-md-down"></div>
                </div>
              </div>
            </div>
            <div className="rc-padding-y--md rc-md-down"></div>
          </div>
          <div
            className="rc-padding--sm rc-margin-bottom--xs rc-bg-colour--brand3 rc-full-width rc-animation-001--base rc-animation-001--active"
            data-component="content-animation" id="content-block-with-text-1-about-us-page">
            <div className="rc-padding-y--md rc-md-down"></div>
            <div className="rc-layout-container rc-one-column rc-max-width--md">
              <div className="rc-column">
                <div className="rc-full-width rc-text--center rc-padding-x--sm">
                  <div>
                    <h2 className="rc-beta ">Einzigartig bis ins kleinste Detail</h2>
                    <p>Wir handeln aus Überzeugung und mit Leidenschaft, denn wir glauben daran, dass Haustiere die Welt
                      besser machen..</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rc-padding-y--md rc-md-down"></div>
          </div>
          <div className="rc-bg-colour--brand3">
            <div className="rc-max-width--md">
              <div className="rc-video-wrapper">
                <iframe title=""
                        src="https://www.youtube.com/embed/cJ4LgiFpbcg?rel=0&amp;showinfo=0&amp;enablejsapi=1&amp;origin=https%3A%2F%2Fwww.royalcanin.com"
                        frameBorder="0" allowFullScreen=""></iframe>
              </div>
            </div>
          </div>
          <div
            className="rc-padding--sm rc-margin--none rc-bg-colour--brand3 rc-full-width rc-animation-001--base rc-animation-001--active"
            data-component="content-animation" id="content-block-with-text-3-about-us-page">
            <div className="rc-padding-y--md rc-md-down"></div>
            <div className="rc-layout-container rc-one-column rc-max-width--md">
              <div className="rc-column">
                <div className="rc-full-width rc-text--center rc-padding-x--sm">
                  <div>
                    <h2 className="rc-beta ">Entdecken Sie die exklusiven Vorteile von ROYAL CANIN</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="rc-padding-y--md rc-md-down"></div>
          </div>
          
        </main>
        <Footer />
      </div>
    );
  }
}

export default about;
