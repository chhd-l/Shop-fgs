import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { injectIntl } from 'react-intl-phraseapp';
import { inject, observer } from 'mobx-react';
import LazyLoad from 'react-lazyload';
import hero from './images/hero.png';
import Bracelet from './images/Bracelet.png';
import eatingFood from './images/eating-food.png';
import dog from './images/dog.png';
import enjoyTraining from './images/enjoy-training.png';
import poster from './images/poster.png';
import group1 from './images/group1.png';
import group2 from './images/group2.png';
import group3 from './images/group3.png';
import packshotWf from './images/packshot-wf.png';
import {
  getLandingPage,
  landingPageViews,
  registerLandingPage,
  getOpenConsentByCategory,
  userBindConsent
} from '@/api/whistlefit';
import { GAWhistleFitButtonClick } from '@/utils/GA';
import './index.less';
import { EMAIL_REGEXP } from '@/utils/constant';
import { getDeviceType } from '@/utils/utils';
import HeroCarousel from './components/carousel/index2';
import { seoHoc } from '@/framework/common';
import Canonical from '@/components/Canonical';
//import HeroCarousel from '@/components/HeroCarousel';

const PAGE_NUM = '121313';
const isMobile = getDeviceType() !== 'PC' || getDeviceType() === 'Pad';

@inject('checkoutStore', 'loginStore', 'clinicStore')
@inject('configStore')
@observer
@seoHoc('Whistlefit')
@injectIntl
class Whistlefit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.userInfo?.email || '',
      isCheckedArr: [false, false],
      landingPageId: '',
      isSaveSuccess: false,
      isRegisterLoading: false,
      consentList: [],
      requiredList: [],
      optionalList: [],
      list1: [
        {
          img: enjoyTraining,
          alt: 'enjoyTraining',
          title1:
            'Equilibrez son activité pour améliorer son bien-être général',
          title2:
            "Concentrez-vous sur la quantité exacte d'exercice et de sommeil dont votre animal a besoin. Fixez des objectifs de remise en forme."
        },
        {
          img: eatingFood,
          alt: 'eatingFood',
          title1:
            'Adaptez sa nutrition en fonction de l’évolution de ses besoins',
          title2:
            'Obtenez des recommandations sur les quantités précises de nourriture. Maintenez facilement son poids de forme.'
        },
        {
          img: dog,
          alt: 'dog',
          title1: 'Surveillez son bien-être, interprétez son comportement',
          title2:
            'Recevez des alertes concernant des comportements excessifs (grattements, lèchements, sommeil etc.).Suivez quotidiennement le niveau de bien-être de votre chien.'
        }
      ],
      list2: [
        {
          img: group1,
          alt: 'group1',
          title1: 'Un dispositif intelligent qui collecte la donnée',
          title2:
            'Whistle Fit recueille les données autour de l’activité et du comportement de votre chien.'
        },
        {
          img: group2,
          alt: 'group2',
          title1: 'L’application Whistle pour interpréter les données',
          title2:
            ' Obtenez des rapports de mesures personnalisés grâce à l’application Whistle.'
        },
        {
          img: group3,
          alt: 'group3',
          title1: 'Des alertes santé pour réagir plus vite',
          title2:
            'Recevez des alertes santé dès que votre chien montre des changements de comportement'
        }
      ]
    };
  }
  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  get userInfo() {
    return this.props.loginStore.userInfo;
  }
  componentDidMount() {
    const { history } = this.props;
    getLandingPage(PAGE_NUM).then((res) => {
      if (!res.context.status) {
        history.push('/404');
      } else {
        const landingPageId = res.context.id;
        this.setState({ landingPageId });
      }
    });
    landingPageViews({
      number: PAGE_NUM,
      storeId: window.__.env.REACT_APP_STOREID
    });
    getOpenConsentByCategory({
      storeId: window.__.env.REACT_APP_STOREID,
      category: 'LandingPage',
      userId: ''
    }).then((res) => {
      let consentList = [
        ...res.context.requiredList,
        ...res.context.optionalList
      ];
      let requiredList = res.context.requiredList.map((item, index) => {
        return { id: item.id, selectedFlag: true };
      });
      let optionalList = res.context.optionalList.map((item, index) => {
        return { id: item.id, selectedFlag: true };
      });

      this.setState({ consentList, requiredList, optionalList });
    });
  }
  createMarkup = (consentTitle) => {
    return { __html: consentTitle };
  };
  changeEmail = (e) => {
    this.setState({ email: e.target.value, isSaveSuccess: false });
  };
  //滚动到输入email的位置
  scrollToInputEmail = (position, label) => {
    GAWhistleFitButtonClick(position, label);
    let anchorElement = document.getElementById('scrollPlace');
    if (position == 1) {
      let top = 0;
      if (isMobile) {
        top = 4030;
      } else {
        top = 4134;
      }
      window.scrollTo({
        top,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo({
        top: anchorElement.offsetTop,
        behavior: 'smooth'
      });
    }
  };
  register = async () => {
    this.setState({ isRegisterLoading: true });
    try {
      GAWhistleFitButtonClick(5, 'Je suis intéressé et veux être informé !');
      if (this.isLogin) {
        await userBindConsent(
          {
            storeId: window.__.env.REACT_APP_STOREID,
            optionalList: this.state.optionalList,
            requiredList: this.state.requiredList
          },
          this.userInfo.customerId
        );
      }
      await registerLandingPage({
        type: this.isLogin ? 'Member' : 'Guest', //guest member
        email: this.state.email,
        customerId: this.isLogin ? this.userInfo.customerId : '',
        storeId: window.__.env.REACT_APP_STOREID,
        landingPageId: this.state.landingPageId,
        account: this.isLogin ? this.userInfo.customerAccount : '',
        name: this.isLogin ? this.userInfo.customerName : '',
        optionalList: this.state.optionalList,
        requiredList: this.state.requiredList
      });
      this.setState({ isSaveSuccess: true });
    } catch (err) {
      console.log(err.message);
    } finally {
      this.setState({ isRegisterLoading: false });
    }
  };
  render(h) {
    const event = {
      page: {
        type: 'Whistle Fit landingPage',
        theme: 'Brand',
        path: location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: ''
      }
    };

    return (
      <div>
        <GoogleTagManager
          key={this.props.location.key}
          additionalEvents={event}
        />
        <Canonical />
        <Header showMiniIcons={true} showUserIcon={true} {...this.props} />
        <main
          className="smartCollar rc-content--fixed-header rc-bg-colour--brand3"
          style={{ fontFamily: 'din-pro' }}
        >
          <div className="experience-region experience-main">
            <div className="experience-component experience-layouts-1column">
              <div className="row rc-margin-x--none">
                <div className="rc-full-width">
                  <div className="experience-component experience-assets-contentBlock">
                    <div className="w-full px-0 md:px-36">
                      <div className="flex flex-col md:flex-row">
                        <LazyLoad className="w-full md:w-1/2">
                          <img src={hero} alt="hero" />
                        </LazyLoad>
                        <div className="w-full md:w-1/2 flex flex-col justify-center ml-0 md:ml-5 items-center md:items-start">
                          <div
                            className="text-center md:text-left text-21 md:text-32  mt-5 md:mt-0 mb-5 md:mb-5 md:ml-0 md:mr-0 font-normal md:leading-14"
                            style={{ color: '#E2001A' }}
                          >
                            Whistle Fit, le collier intelligent pour prendre
                            soin de la santé de votre chien
                          </div>
                          <div className="text-center md:text-left text-14 md:text-24 mt-0 mb-6 ml-5 md:ml-0 mr-5 md:mr-0 font-normal md:leading-14">
                            Faites partie des premiers à être informés de la
                            disponibilité du produit
                          </div>
                          <div className="md:mb-0">
                            <button
                              className="rc-btn rc-btn--one text-14 md:text-16"
                              onClick={() =>
                                this.scrollToInputEmail(
                                  1,
                                  'Je veux être informé '
                                )
                              }
                            >
                              Je veux être informé
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isMobile ? (
            <div className="experience-component experience-layouts-1column">
              <div className="row rc-margin-x--none">
                <div className="rc-full-width">
                  <div className="experience-component experience-assets-contentBlock">
                    <div className="h-2 bg-gray-100 my-8" />
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-contentBlock">
                  <div className="w-full px-0 md:px-36">
                    <div>
                      <div
                        className="px-4 md:px-48 text-18 md:text-38 text-center mt-0 md:p-6 my-6 md:my-12 font-normal md:leading-12"
                        style={{ color: '#E2001A' }}
                      >
                        Surveillez le bien-être de votre chien et identifiez
                        plus tôt les éventuels problèmes
                      </div>
                      <div className="flex flex-col md:flex-row items-start md:items-center">
                        <div className="w-full md:w-2/3  text-16 md:text-24 px-4 md:px-0 md:leading-17.5">
                          Whistle Fit est un dispositif intelligent et
                          non-invasif qui s’attache au collier de votre chien et
                          qui traque son activité et son comportement afin de
                          vous offrir une fenêtre unique sur le bien-être et la
                          santé de votre animal.
                        </div>
                        <LazyLoad className="w-full md:w-1/3 flex justify-center my-6 md:my-0">
                          <img
                            src={Bracelet}
                            alt="Bracelet"
                            className="w-36 md:w-48 ml-0"
                          />
                        </LazyLoad>
                      </div>
                      {/* <div className="w-full px-4 md:px-48 font-normal text-center text-18 md:text-32 my-4 md:my-12 leading-17.5 md:leading-normal">
                        Votre chien ne peut pas vous dire s'il est en bonne
                        santé, mais Whistle Fit peut vous aider à le découvrir !
                      </div>
                      <div className="w-full flex justify-between flex-wrap mt-8 md:mt-0">
                        {this.state.list1.map((item, index) => {
                          return (
                            <div
                              className="px-10 md:px-0 pr-0 md:pr-10 w-full md:w-1/3 flex flex-row  md:flex-col items-start md:items-center"
                              key={index}
                            >
                              <LazyLoad className="w-10 md:w-16 mr-10 md:mr-0 mt-1 md:mt-0">
                                <img src={item.img} alt={item.alt} />
                              </LazyLoad>
                              <div className="w-2/3 md:w-auto">
                                <div className="w-100 md:w-72 text-left text-16 md:text-28 leading-normal font-normal mt-0 md:mt-6 mb-0 md:mb-6">
                                  {item.title1}
                                </div>
                                <div className="w-100 md:w-72 text-left text-14 md:text-xl font-normal mt-2 md:mt-6 mb-6 md:leading-normal">
                                  {item.title2}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div> */}
                      <div className="experience-component experience-assets-youtubeVideo">
                        <div className="rc-max-width--md rc-padding-x--lg">
                          <div className="rc-video-wrapper dog-video">
                            <video
                              controls
                              src="https://fgs-cdn.azureedge.net/cdn/img/whistlefit.mp4"
                              title="making a better world for pets"
                              poster={poster}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="w-full flex justify-center my-8 md:my-10">
                        <button
                          className="rc-btn rc-btn--one text-14 md:text-16"
                          onClick={() =>
                            this.scrollToInputEmail(2, 'Je veux être informé ')
                          }
                        >
                          Je veux être informé
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-contentBlock">
                  <div className="h-2 bg-gray-100" />
                </div>
              </div>
            </div>
          </div>
          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-contentBlock">
                  <div className="w-full px-0 md:px-36">
                    <div
                      className="w-full pt-4 md:pt-0 px-4 md:px-48 font-normal text-center text-18 md:text-38 my-4 md:my-12 leading-tight md:leading-normal"
                      style={{ color: '#E2001A' }}
                    >
                      Whistle Fit, comment ça marche ?
                    </div>
                    <div className="w-full flex justify-between flex-wrap mt-6 md:mt-0">
                      {this.state.list2.map((item, index) => {
                        return (
                          <div
                            className={`mb-5 md:mb-0 px-5 md:px-0 ${
                              index == 1 ? 'pl-10 md:pl-5' : ''
                            } w-full md:w-1/3 flex md:flex-col items-center`}
                            key={index}
                          >
                            <LazyLoad
                              className={`w-1/2 md:w-64 ${
                                index == 1 && isMobile
                                  ? 'order-3 md:order-1'
                                  : 'order-1 md:order-3'
                              }`}
                            >
                              <img src={item.img} alt={item.alt} />
                            </LazyLoad>
                            <div className="w-5 md:w-0 order-2" />
                            <div
                              className={`w-1/2 md:h-80 md:w-auto ${
                                index == 1 && isMobile
                                  ? 'order-1 md:order-3'
                                  : 'order-3 md:order-1'
                              }`}
                            >
                              <div className="h4 w-100 md:w-72 text-left text-16 md:text-30 font-normal mt-0 md:mt-6 mb-0 md:mb-6 leading-normal">
                                {item.title1}
                              </div>
                              <div className="w-100 md:w-72 text-left text-14 md:text-xl font-normal mt-3 md:mt-6 mb-6 md:leading-normal">
                                {item.title2}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="w-full flex justify-center my-8 md:my-10">
                      <button
                        className="rc-btn rc-btn--one text-14 md:text-16"
                        onClick={() =>
                          this.scrollToInputEmail(3, 'Je veux être informé ')
                        }
                      >
                        Je veux être informé
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-contentBlock">
                  <div className="h-2 bg-gray-100" />
                </div>
              </div>
            </div>
          </div>
          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-contentBlock">
                  <div className="w-100 px-0 md:px-36">
                    <div
                      className="pt-1 md:pt-0 px-4 md:px-0 text-center tracking-normal md:tracking-tighter text-18 md:text-38 mt-6 mb-3 md:mb-10 leading-tight md:leading-normal font-normal"
                      style={{ color: '#E2001A' }}
                    >
                      Ils ont adoré !
                    </div>
                    <div className="experience-component experience-layouts-herocarousel">
                      <HeroCarousel history={history} />
                    </div>
                    <div className="pb-4 md:pb-0 w-full flex justify-center mt-5 md:mt-10 mb-5 md:mb-10">
                      <button
                        className="rc-btn rc-btn--one text-14 md:text-16"
                        onClick={() =>
                          this.scrollToInputEmail(4, 'Je veux être informé ')
                        }
                      >
                        Je veux être informé
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-contentBlock">
                  <div className="h-2 bg-gray-100" />
                </div>
              </div>
            </div>
          </div>
          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-contentBlock">
                  <div className="w-full px-0 md:px-36">
                    <div className="flex justify-center">
                      <div
                        className="pt-1 md:pt-0  w-full px-4 md:px-44 text-center  text-18 md:text-38 my-6 md:my-12 leading-tight md:leading-12 font-normal"
                        style={{ color: '#E2001A' }}
                      >
                        Whistle Fit et Royal Canin vous aident à mieux
                        comprendre et répondre aux besoins uniques de votre
                        animal
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-start md:items-start mb-10 md:mb-24">
                      <LazyLoad className="w-100 md:w-1/2 flex justify-center">
                        <img
                          src={packshotWf}
                          alt="Bracelet"
                          className="w-2/3 md:w-100 md:w-96 mr-0 md:mr-16 mt-0 md:nt-10"
                        />
                      </LazyLoad>
                      <div className="w-full md:w-1/2 text-16 md:text-24 px-4 md:px-0 leading-17.5 mt-0">
                        Chez Royal Canin, nous avons passé plus de 50 ans à
                        soutenir la santé des animaux de compagnie grâce à nos
                        solutions nutritionnelles innovantes et à nos conseils
                        d'experts en matière de santé. Associé à notre
                        connaissance approfondie des chats et des chiens, la
                        technologie intelligente Whistle Fit vous permet de
                        mieux comprendre les besoins en constante évolution de
                        votre animal pour y répondre de la manière la plus
                        <span id="scrollPlace"> adaptée</span>.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-contentBlock">
                  <div className="h-2 bg-gray-100" />
                </div>
              </div>
            </div>
          </div>
          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-contentBlock">
                  <div className="w-full px-0 md:px-36">
                    <div className="flex justify-center">
                      <div
                        className="pt-3 md:pt-0 w-full md:w-2/3 px-4 md:px-0 text-center  text-18 md:text-4xl mt-6 md:mt-12 mb-3 leading-tight md:leading-normal font-normal"
                        style={{ color: '#E2001A' }}
                      >
                        Whistle Fit vous intéresse ? Faites-le nous savoir.
                        Complétez le formulaire pour être informé en premier de
                        la disponibilité du produit.
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <span className="w-80 rc-input rc-input--inline rc-input--label">
                        <input
                          id="id-email"
                          className={`text-16 w-80 border-bottom  ${
                            this.state.isSaveSuccess
                              ? 'text-green border-green border-b-2'
                              : 'border-gray-300'
                          } pb-2`}
                          type="text"
                          name="email"
                          placeholder="Adresse e-mail"
                          value={this.state.email}
                          onChange={this.changeEmail}
                        />
                        <div
                          className={`text-green font-normal mt-2 ${
                            this.state.isSaveSuccess ? '' : 'hidden'
                          }`}
                        >
                          Merci de votre intérêt pour Whistle Fit ! Votre e-mail
                          a été enregistré avec succès pour les mises à jour.
                        </div>
                      </span>
                    </div>
                    <div
                      className={`w-full flex justify-center mt-5 md:mt-10 mb-5 md:mb-10 ${
                        this.state.isSaveSuccess ? 'hidden' : ''
                      }`}
                    >
                      <button
                        className={`rc-btn rc-btn--one text-14 md:text-sm ${
                          this.state.isRegisterLoading ? 'ui-btn-loading' : ''
                        }`}
                        onClick={this.register}
                        disabled={
                          !(
                            // !this.state.isCheckedArr.includes(false) &&
                            EMAIL_REGEXP.test(this.state.email)
                          )
                        }
                        style={{
                          backgroundColor: '#e20001',
                          borderColor: '#e20001'
                        }}
                      >
                        Je suis intéressé et veux être informé !
                      </button>
                    </div>
                    <div
                      className={`${
                        this.state.isSaveSuccess ? 'h-10' : 'hidden'
                      }`}
                    />
                    <div className="whistlefit flex flex-col items-center mb-10 px-4 md:px-4">
                      {this.state.consentList.map((item, index) => {
                        return (
                          <div className="flex" key={index}>
                            <span className="red mr-1">*</span>
                            <div className="max-w-xl rc-input">
                              {/* <input
                        className="rc-input__checkbox"
                        id={`id-checkbox-cat-${index}`}
                        checked={this.state.isCheckedArr[index]}
                        type="checkbox"
                        name={`checkbox-${index}`}
                        onChange={() => this.changeConsentArr(index)}
                      /> */}
                              <label
                                className="text-sm italic rc-input__label--inline"
                                htmlFor={`id-checkbox-cat-${index}`}
                                dangerouslySetInnerHTML={this.createMarkup(
                                  item.consentTitle
                                )}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default Whistlefit;
