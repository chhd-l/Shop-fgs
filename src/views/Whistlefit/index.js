import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import BreadCrumbs from '@/components/BreadCrumbs';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import Carousel from './components/carousel';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import { inject, observer } from 'mobx-react';
import { setSeoConfig } from '@/utils/utils';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { Helmet } from 'react-helmet';
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
  getOpenConsentByCategory
} from '@/api/whistlefit';
import { GAWhistleFitButtonClick } from '@/utils/GA.js';
import './index.less';
import { EMAIL_REGEXP } from '@/utils/constant';

const localItemRoyal = window.__.localItemRoyal;
const pageLink = window.location.href;
const PAGE_NUM = '121313';

@inject('checkoutStore', 'loginStore', 'clinicStore')
@inject('configStore')
@observer
@injectIntl
class Whistlefit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seoConfig: {
        title: 'Royal canin',
        metaKeywords: 'Royal canin',
        metaDescription: 'Royal canin'
      },
      email: this.userInfo?.email || '',
      isCheckedArr: [false, false],
      landingPageId: '',
      isSaveSuccess: false,
      isRegisterLoading: false,
      consentList: []
      //intl: this.props.intl.messages
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
    setSeoConfig({ pageName: 'Whistlefit' }).then((res) => {
      this.setState({ seoConfig: res });
    });
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
      this.setState({ consentList });
    });
  }
  createMarkup = (consentTitle) => {
    return { __html: consentTitle };
  };
  changeEmail = (e) => {
    this.setState({ email: e.target.value, isSaveSuccess: false });
  };
  changeConsentArr = (index) => {
    console.log(123, this.state.isCheckedArr);
    let arr = [...this.state.isCheckedArr];
    arr[index] = !arr[index];
    console.log(arr);
    this.setState({ isCheckedArr: arr });
  };
  //滚动到输入email的位置
  scrollToInputEmail = (position, label) => {
    GAWhistleFitButtonClick(position, label);
    let bridge = document.querySelector('#email');
    let body = document.body;
    let height = 0;
    do {
      height += bridge.offsetTop;
      bridge = bridge.offsetParent;
    } while (bridge !== body);
    window.scrollTo({
      top: height,
      behavior: 'smooth'
    });
  };
  register = async () => {
    this.setState({ isRegisterLoading: true });
    try {
      this.scrollToInputEmail(5, 'Je suis intéressé, veux être informé !');
      await registerLandingPage({
        type: this.isLogin ? 'Member' : 'Guest', //guest member
        email: this.state.email,
        customerId: this.isLogin ? this.userInfo.customerId : '',
        storeId: window.__.env.REACT_APP_STOREID,
        landingPageId: this.state.landingPageId,
        account: this.isLogin ? this.userInfo.customerAccount : '',
        name: this.isLogin ? this.userInfo.customerName : ''
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
    //const { history, match, location } = this.props;
    const { seoConfig } = this.state;

    return (
      <div>
        <GoogleTagManager additionalEvents={event} />
        <Helmet>
          <link rel="canonical" href={pageLink} />
          <title>{seoConfig.title}</title>
          <meta name="description" content={seoConfig.metaDescription} />
          <meta name="keywords" content={seoConfig.metaKeywords} />
        </Helmet>
        <Header showMiniIcons={true} showUserIcon={true} {...this.props} />
        <main className="smartCollar rc-content--fixed-header rc-bg-colour--brand3">
          <div className="w-full px-0 md:px-36">
            <div className="flex flex-col md:flex-row">
              <LazyLoad className="w-full md:w-1/2">
                <img src={hero} alt="hero" />
              </LazyLoad>
              <div className="w-full md:w-1/2 flex flex-col justify-center ml-0 md:ml-5 items-center md:items-start">
                <div
                  className="tracking-normal md:tracking-tighter text-2xl md:text-4xl text-center md:text-left leading-tight md:leading-normal mt-5 md:mt-0 mb-5 md:mb-5 ml-5 md:ml-0 mr-5 font-normal"
                  style={{ color: '#E2001A' }}
                >
                  Whistle Fit, le collier intelligent pour prendre soin de la
                  santé de votre chien
                </div>
                <div
                  className="tracking-normal md:tracking-tighter text-xl md:text-3xl text-center md:text-left leading-tight md:leading-normal mt-5 md:mt-0 mb-5 md:mb-10 ml-5 md:ml-0 mr-5 font-normal"
                  style={{ color: '#E2001A' }}
                >
                  Faites partie des premiers à être informés de la disponibilité
                  du produit
                </div>
                <div className="mb-5 md:mb-0">
                  <button
                    className="rc-btn rc-btn--one text-xs md:text-sm"
                    onClick={() =>
                      this.scrollToInputEmail(1, 'Je veux être informé ')
                    }
                  >
                    Je veux être informé
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full px-0 md:px-36">
            <div>
              <div
                className="px-4 md:px-48 text-center tracking-normal md:tracking-tighter text-2xl md:text-4xl my-6 md:my-12 leading-tight md:leading-normal font-normal"
                style={{ color: '#E2001A' }}
              >
                Surveillez le bien-être de votre chien et identifiez plus tôt
                les éventuels problèmes
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center">
                <div className="w-full md:w-2/3 text-lg px-4 md:px-0">
                  Whistle Fit est un dispositif intelligent et non-invasif qui
                  s’attache au collier de votre chien et qui traque son activité
                  et son comportement afin de vous offrir une fenêtre unique sur
                  le bien-être et la santé de votre animal.
                </div>
                <LazyLoad className="w-full md:w-1/3 flex justify-center">
                  <img src={Bracelet} alt="Bracelet" className="w-48 ml-0" />
                </LazyLoad>
              </div>
              <div className="w-full px-4 md:px-48 font-normal text-center text-2xl md:text-3xl my-4 md:my-12 leading-tight md:leading-normal">
                Votre chien ne peut pas vous dire s'il est en bonne santé, mais
                Whistle Fit peut vous aider à le découvrir !
              </div>
              <div className="w-full flex justify-between flex-wrap mt-6 md:mt-0">
                <div className="px-10 md:px-0 w-full md:w-auto flex flex-row  md:flex-col items-start md:items-center">
                  <LazyLoad className="w-16 mr-10 md:mr-0">
                    <img src={enjoyTraining} alt="enjoyTraining" />
                  </LazyLoad>
                  <div className="w-2/3 md:w-auto">
                    <div className="h4 w-100 md:w-72 text-center text-xl md:text-2xl font-bold mt-3 md:mt-6 mb-0 md:mb-6">
                      Equilibrez son activité pour améliorer son bien-être
                      général
                    </div>
                    <div className="h4 w-100 md:w-72 text-center text-lg md:text-xl font-normal mt-3 md:mt-6 mb-6">
                      Concentrez-vous sur la quantité exacte d'exercice et de
                      sommeil dont votre animal a besoin. Fixez des objectifs de
                      remise en forme.
                    </div>
                  </div>
                </div>
                <div className="px-10 md:px-0 w-full md:w-auto flex flex-row  md:flex-col items-start md:items-center">
                  <LazyLoad className="w-16 mr-10 md:mr-0">
                    <img src={eatingFood} alt="eatingFood" />
                  </LazyLoad>
                  <div className="w-2/3 md:w-auto">
                    <div className="h4 w-100 md:w-72 text-center text-xl md:text-2xl font-bold mt-3 md:mt-6 mb-0 md:mb-6">
                      Adaptez sa nutrition en fonction de l’évolution de ses
                      besoins
                    </div>
                    <div className="h4 w-100 md:w-72 text-center text-lg md:text-xl font-normal mt-3 md:mt-6 mb-6">
                      Obtenez des recommandations sur les quantités précises de
                      nourriture. Maintenez facilement son poids de forme.
                    </div>
                  </div>
                </div>
                <div className="px-10 md:px-0 w-full md:w-auto flex flex-row  md:flex-col items-start md:items-center">
                  <LazyLoad className="w-16 mr-10 md:mr-0">
                    <img src={dog} alt="dog" />
                  </LazyLoad>
                  <div className="w-2/3 md:w-auto">
                    <div className="h4 w-100 md:w-72 text-center text-xl md:text-2xl font-bold mt-3 md:mt-6 mb-0 md:mb-6">
                      Surveillez son bien-être, interprétez son comportement
                    </div>
                    <div className="h4 w-100 md:w-72 text-center text-lg md:text-xl font-normal mt-3 md:mt-6 mb-6">
                      Recevez des alertes concernant des comportements excessifs
                      (grattements, lèchements, sommeil etc.). Suivez
                      quotidiennement le niveau de bien-être de votre chien.
                    </div>
                  </div>
                </div>
              </div>
              <div className="experience-component experience-assets-youtubeVideo">
                <div className="rc-max-width--md rc-padding-x--lg">
                  <div className="rc-video-wrapper dog-video">
                    <iframe
                      allowfullscreen=""
                      frameborder="0"
                      id="video-dog"
                      className="optanon-category-4 "
                      src="https://fgs-cdn.azureedge.net/cdn/img/whistlefit.mp4"
                      title="making a better world for pets"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-center my-10">
                <button
                  className="rc-btn rc-btn--one text-xs md:text-sm"
                  onClick={() =>
                    this.scrollToInputEmail(2, 'Je veux être informé ')
                  }
                >
                  Je veux être informé
                </button>
              </div>
            </div>
          </div>
          <div className="h-2 bg-gray-100"></div>
          <div className="w-full px-0 md:px-36">
            <div
              className="w-full px-4 md:px-48 font-normal text-center text-2xl md:text-3xl my-4 md:my-12 leading-tight md:leading-normal"
              style={{ color: '#E2001A' }}
            >
              Whistle Fit, comment ça marche ?
            </div>
            <div className="w-full flex justify-between flex-wrap mt-6 md:mt-0">
              <div className="px-10 md:px-0 w-full md:w-auto flex md:flex-col items-center">
                <LazyLoad className="w-1/2 md:w-64 mr-5 md:mr-0">
                  <img src={group1} alt="group1" />
                </LazyLoad>
                <div className="w-1/2 md:w-auto">
                  <div className="h4 w-100 md:w-72 text-center text-xl md:text-2xl font-bold mt-3 md:mt-6 mb-6">
                    Un dispositif intelligent qui collecte la donnée
                  </div>
                  <div className="h4 w-100 md:w-72 text-center text-lg md:text-xl font-normal mt-3 md:mt-6 mb-6">
                    Whistle Fit recueille les données autour de l’activité et du
                    comportement de votre chien.
                  </div>
                </div>
              </div>
              <div className="px-10 md:px-0 w-full md:w-auto flex md:flex-col items-center">
                <LazyLoad className="w-1/2 md:w-64 mr-5 md:mr-0 order-2 md:order-1">
                  <img src={group2} alt="group2" />
                </LazyLoad>
                <div className="w-1/2 md:w-auto order-1 md:order-2">
                  <div className="h4 w-100 md:w-72 text-center text-xl md:text-2xl font-bold mt-3 md:mt-6 mb-6">
                    L’application Whistle pour interpréter les données
                  </div>
                  <div className="h4 w-100 md:w-72 text-center text-lg md:text-xl font-normal mt-3 md:mt-6 mb-6">
                    Obtenez des rapports de mesures personnalisés grâce à
                    l’application Whistle.
                  </div>
                </div>
              </div>
              <div className="px-10 md:px-0 w-full md:w-auto flex md:flex-col items-center">
                <LazyLoad className="w-1/2 md:w-64 mr-5 md:mr-0">
                  <img src={group3} alt="group3" />
                </LazyLoad>
                <div className="w-1/2 md:w-auto">
                  <div className="h4 w-100 md:w-72 text-center text-xl md:text-2xl font-bold mt-3 md:mt-6 mb-6">
                    Des alertes santé pour réagir plus vite
                  </div>
                  <div className="h4 w-100 md:w-72 text-center text-lg md:text-xl font-normal mt-3 md:mt-6 mb-6">
                    Recevez des alertes santé dès que votre chien montre des
                    changements de comportement
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center my-10">
              <button
                className="rc-btn rc-btn--one text-xs md:text-sm"
                onClick={() =>
                  this.scrollToInputEmail(3, 'Je veux être informé ')
                }
              >
                Je veux être informé
              </button>
            </div>
          </div>
          <div className="h-2 bg-gray-100"></div>
          <div className="max-w-full px-0 md:px-36">
            <div
              className="px-4 md:px-0 text-center tracking-normal md:tracking-tighter text-2xl md:text-4xl mt-6 mb-3 leading-tight md:leading-normal font-normal"
              style={{ color: '#E2001A' }}
            >
              Ils ont adoré !
            </div>
            <div className="experience-component experience-layouts-herocarousel">
              <Carousel history={history} />
            </div>
            <div className="w-full flex justify-center mt-5 md:mt-10 mb-5 md:mb-10">
              <button
                className="rc-btn rc-btn--one text-xs md:text-sm"
                onClick={() =>
                  this.scrollToInputEmail(4, 'Je veux être informé ')
                }
              >
                Je veux être informé
              </button>
            </div>
          </div>
          <div className="h-2 bg-gray-100"></div>
          <div className="max-w-full px-0 md:px-36">
            <div className="flex justify-center">
              <div
                className="w-full md:w-1/2 px-4 md:px-0 text-center tracking-normal md:tracking-tighter text-2xl md:text-4xl my-6 md:my-12 leading-tight md:leading-normal font-normal"
                style={{ color: '#E2001A' }}
              >
                Whistle Fit et Royal Canin vous aident à mieux comprendre et
                répondre aux besoins uniques de votre animal
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-start">
              <LazyLoad className="w-full md:w-1/2 flex justify-center">
                <img
                  src={packshotWf}
                  alt="Bracelet"
                  className="w-100 md:w-96 mr-0 md:mr-16"
                />
              </LazyLoad>
              <div
                className="w-full md:w-1/2 text-sm md:text-lg px-4 md:px-0 leading-loose mt-0 md:mt-20"
                id="email"
              >
                Chez Royal Canin, nous avons passé plus de 50 ans à soutenir la
                santé des animaux de compagnie grâce à nos solutions
                nutritionnelles innovantes et à nos conseils d'experts en
                matière de santé. Associé à notre connaissance approfondie des
                chats et des chiens, la technologie intelligente Whistle Fit
                vous permet de mieux comprendre les besoins en constante
                évolution de votre animal pour y répondre de la manière la plus
                adaptée.
              </div>
            </div>
          </div>
          <div className="h-2 bg-gray-100"></div>
          <div className="max-w-full px-0 md:px-36">
            <div className="flex justify-center">
              <div
                className="w-full md:w-2/3 px-4 md:px-0 text-center tracking-normal md:tracking-tighter text-2xl md:text-4xl mt-6 md:mt-12 mb-3 leading-tight md:leading-normal font-normal"
                style={{ color: '#E2001A' }}
              >
                Whistle Fit vous intéresse ? Faites-le nous savoir. Complétez le
                formulaire pour être informé en premier de la disponibilité du
                produit.
              </div>
            </div>
            <div className="flex justify-center">
              <span className="w-80 rc-input rc-input--inline rc-input--label">
                <input
                  id="id-email"
                  className={`w-80 border-bottom  ${
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
                  Merci de votre intérêt pour Whistle Fit ! Votre e-mail a été
                  enregistré avec succès pour les mises à jour.
                </div>
              </span>
            </div>
            <div className="w-full flex justify-center mt-5 md:mt-10 mb-5 md:mb-10">
              <button
                className={`rc-btn rc-btn--one text-xs md:text-sm ${
                  this.state.isRegisterLoading ? 'ui-btn-loading' : ''
                } ${this.state.isSaveSuccess ? 'hidden' : ''}`}
                onClick={this.register}
                disabled={
                  !(
                    !this.state.isCheckedArr.includes(false) &&
                    EMAIL_REGEXP.test(this.state.email)
                  )
                }
              >
                Je suis intéressé, veux être informé !
              </button>
            </div>
            <div className="flex flex-col items-center mb-10 px-4 md:px-4">
              {this.state.consentList.map((item, index) => {
                return (
                  <div className="flex" key={index}>
                    <span className="red mr-1">*</span>
                    <div className="max-w-xl rc-input">
                      <input
                        className="rc-input__checkbox"
                        id={`id-checkbox-cat-${index}`}
                        checked={this.state.isCheckedArr[index]}
                        type="checkbox"
                        name={`checkbox-${index}`}
                        onChange={() => this.changeConsentArr(index)}
                      />
                      <label
                        className="text-sm italic rc-input__label--inline"
                        for={`id-checkbox-cat-${index}`}
                        dangerouslySetInnerHTML={this.createMarkup(
                          item.consentTitle
                        )}
                      ></label>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default Whistlefit;
