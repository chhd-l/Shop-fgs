/*
 * Copyright (c) 2018, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  useHistory
} from 'react-router-dom';
import { Security, useOktaAuth } from '@okta/okta-react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'mobx-react';
import loadable from '@/lib/loadable-component';
import { funcUrl } from './lib/url-utils';

import oktaConfig from './oktaConfig';
import stores from './store';
import { PDP_Regex } from '@/utils/constant';
// import { redirectFun } from '@/redirect/utils';
import '@/utils/init';
import { stgShowAuth, getRandom } from '@/utils/utils';
import { useDynamicLanguage } from '@/framework/common';
import ScrollToTop from '@/components/ScrollToTop';
import RouteFilter from '@/components/RouteFilter';
import RouteFilterHook from '@/components/RouteFilter/RouteFilterHook';
// import {
//   ScrollToTop,
//   RouteFilter,
//   RouteFilterHook,
//   GoogleMapMakerHandle as MakerHandle
// } from '@/components';
import qs from 'qs';
import { initializePhraseAppEditor } from 'react-intl-phraseapp';
import './vconsole';

import PickupMap from '@/views/PickupMap';
import Prescription from '@/views/Prescription';
import MakerHandle from '@/components/GoogleMap/makerHandle';

import { ExportedComponentsProvider } from '@/react-components';

// import ProductFinder from '@/views/ProductFinder';
import ProductFinder2 from '@/views/ProductFinder2/ProductFinder';
// import ProductFinderResult from '@/views/ProductFinder/modules/Result';
// import ProductFinderNoResult from '@/views/ProductFinder/modules/NoResult';
import SearchShow from '@/views/StaticPage/SearchShow';
import PromotionRefuge from '@/views/StaticPage/PromotionRefuge';
// const PromotionRefuge = loadable(() => import('@/views/StaticPage/PromotionRefuge')); // todo slide
import RefugeSource from '@/views/StaticPage/PromotionRefuge/source.js';
// import register from '@/views/Register';
import Welcome from '@/views/Register/welcome.js';
// import CancelEmail from '@/views/StaticPage/CancelEmail';
const CancelEmail = loadable(() => import('@/views/StaticPage/CancelEmail'));
// import RCInput from './components/Form/Input';
// import RCSelect from './components/Form/Downselect';
const FelinTermsConditions = loadable(() =>
  import('@/views/StaticPage/FelinTermsConditions')
);

const PreciseCatNutrition = loadable(() =>
  import('@/views/PreciseCatNutrition')
);
const CartDEBreeder = loadable(() => import('@/views/CartDEBreeder'));
// import LogRocket from 'logrocket';

// LogRocket.init('kvnk0e/shop-lki8n', {
//   dom: {
//     baseHref: '	https://fgs-cdn.azureedge.net/'
//   }
// });

const Home = loadable(() => import('@/views/Home'), 'rc-carousel');
const List = loadable(() => import('@/views/List'));
const Details = loadable(() => import('@/views/Details'), 'rc-carousel');
const Cart = loadable(() => import('@/views/Cart'));
const CartFRBreeder = loadable(() => import('@/views/CartFRBreeder'));
// const CartInStock = loadable(() => import('@/views/CartInStock'));
const Payment = loadable(() => import('@/views/Payment'));
const Checkout = loadable(() => import('@/views/Checkout'));
const demo = loadable(() => import('@/views/demo'));
const Confirmation = loadable(() => import('@/views/Confirmation'));
const AccountAppointments = loadable(() =>
  import('@/views/Account/Appointments')
);
const AccountAppointmentsDetail = loadable(() =>
  import('@/views/Account/AppointmentsDetail')
);
const PrescriptionNavigate = loadable(() =>
  import('@/views/PrescriptionNavigate')
);
const FAQ = loadable(() => import('@/views/FAQ'));
const JpFAQ = loadable(() => import('@/views/FAQ/jp-index.js'));
const Widerrufsbelehrung = loadable(() => import('@/views/Widerrufsbelehrung'));
const AccountHome = loadable(() => import('@/views/Account/Home'));
const AccountProfile = loadable(() => import('@/views/Account/Profile'));
const AccountPets = loadable(() => import('@/views/Account/Pet'));
const AccountOrders = loadable(() => import('@/views/Account/Orders'));
const AccountOrdersDetail = loadable(() =>
  import('@/views/Account/OrdersDetail')
);
const AccountSubscription = loadable(() =>
  import('@/views/Account/Subscription')
);

const Loyalty = loadable(() => import('@/views/Account/Loyalty'));

const AccountSubscriptionDetail = loadable(() =>
  import('@/views/Account/SubscriptionDetail')
);
const AccountPetForm = loadable(() => import('@/views/Account/PetForm'));
const AccountPetList = loadable(() => import('@/views/Account/PetList'));
const ProductReview = loadable(() => import('@/views/Account/ProductReview'));
const ProductReviewService = loadable(() =>
  import('@/views/Account/ProductReviewService')
);
// import AccountHome from '@/views/Account/Home';
// import AccountProfile from '@/views/Account/Profile';
// import AccountPets from '@/views/Account/Pet';
// import AccountOrders from '@/views/Account/Orders';
// import AccountOrdersDetail from '@/views/Account/OrdersDetail';
// import AccountSubscription from '@/views/Account/Subscription';
// import AccountSubscriptionDetail from '@/views/Account/SubscriptionDetail';
// import AccountPetForm from '@/views/Account/PetForm';

const OktaLoginPage = loadable(() => import('@/views/OktaLoginPage'));
const OktaLogoutPage = loadable(() => import('@/views/OktaLogoutPage'));
// import OktaLoginPage from '@/views/OktaLoginPage';
// import OktaLogoutPage from '@/views/OktaLogoutPage';
// import AccountPetList from '@/views/Account/PetList';
// import ProductReview from '@/views/Account/ProductReview';
// import ProductReviewService from '@/views/Account/ProductReviewService';
// import AccountRefunds from "@/views/Account/Refunds";

const Recommendation = loadable(() => import('@/views/Recommendation'));
const Recommendation_US = loadable(() => import('@/views/Recommendation_US'));
const Recommendation_FrBreeder = loadable(() =>
  import('@/views/Recommendation_FrBreeder')
);

const TermUse = loadable(() => import('@/views/StaticPage/TermUse'));
const Decouverteroyalcanin = loadable(() =>
  import('@/views/StaticPage/Decouverteroyalcanin')
);

const TermsAndConditions = loadable(() =>
  import('@/views/StaticPage/TermUse/TermsAndConditions')
);
const TermsOfUsePrescriber = loadable(() =>
  import('@/views/StaticPage/TermsOfUsePrescriber')
);

const PrivacyPolicy = loadable(() =>
  import('@/views/StaticPage/PrivacyPolicy')
);
const Exception = loadable(() => import('@/views/StaticPage/Exception'));
const Page403 = loadable(() => import('@/views/StaticPage/403'));
const Page500 = loadable(() => import('@/views/StaticPage/500'));
const Mentionslegales = loadable(() =>
  import('@/views/StaticPage/Mentionslegales')
);
const Help = loadable(() => import('@/views/StaticPage/Help'));
const ContactUs = loadable(() => import('@/views/StaticPage/ContactUs'));
const JpContact = loadable(() =>
  import('@/views/StaticPage/ContactUs/jp-index')
);
const AboutLoyaltyProgram = loadable(() =>
  import('@/views/StaticPage/AboutLoyaltyProgram')
);
const Packfeed = loadable(() =>
  import('@/views/StaticPage/PackmixfeedingwetDry')
);
const TermsConditions = loadable(() =>
  import('@/views/StaticPage/TermsAndConditions')
);
const TermsConditionsUs = loadable(() =>
  import('@/views/StaticPage/TermsAndConditions/US_index')
);
const TermsConditionsTr = loadable(() =>
  import('@/views/StaticPage/TermsAndConditions/TR_index')
);
const TermsConditionJP = loadable(() =>
  import('@/views/StaticPage/TermsAndConditions/JP_index')
);
const SubscriptionLanding = loadable(() =>
  import('@/views/StaticPage/SubscriptionLanding')
);
const DE_SubscriptionLanding = loadable(() =>
  import('@/views/StaticPage/SubscriptionLanding/DE_index.js')
);
const US_SubscriptionLanding = loadable(() =>
  import('@/views/StaticPage/SubscriptionLanding/US_index.js')
);
const TR_SubscriptionLanding = loadable(() =>
  import('@/views/StaticPage/SubscriptionLanding/TR_index.js')
);
const JP_SubscriptionLanding = loadable(() =>
  import('@/views/StaticPage/SubscriptionLanding/JP_index.js')
);
const TR_GeneralConditions = loadable(() =>
  import('@/views/StaticPage/GeneralConditions/TR_index.js')
);
const GeneralConditions = loadable(() =>
  import('@/views/StaticPage/GeneralConditions')
);
const Tailorednutrition = loadable(() =>
  import('@/views/StaticPage/Tailorednutrition')
);
const US_Tailorednutrition = loadable(() =>
  import('@/views/StaticPage/Tailorednutrition/US_index')
);
const MX_Tailorednutrition = loadable(() =>
  import('@/views/StaticPage/Tailorednutrition/MX_index')
);
const OnlineStore = loadable(() => import('@/views/StaticPage/OnlineStore'));
// import OnlineStore from '@/views/StaticPage/OnlineStore';
const QualitySafety = loadable(() =>
  import('@/views/StaticPage/QualitySafety')
);
const US_QualitySafety = loadable(() =>
  import('@/views/StaticPage/QualitySafety/US_index')
);
const MX_QualitySafety = loadable(() =>
  import('@/views/StaticPage/QualitySafety/MX_index')
);
const AboutUs = loadable(() => import('@/views/StaticPage/AboutUs'));
const AboutUsDe = loadable(() => import('@/views/StaticPage/AboutUs/de-index'));
const AboutMyRoyalCanin = loadable(() =>
  import('@/views/StaticPage/AboutMyRoyalCanin')
);
const AboutSubscription = loadable(() =>
  import('@/views/StaticPage/AboutSubscription')
);
const LegalNotice = loadable(() => import('@/views/StaticPage/LegalNotice'));
const CatNutrition = loadable(() => import('@/views/StaticPage/CatNutrition'));
const CadeauCoussinChat = loadable(() =>
  import('@/views/StaticPage/CadeauCoussinChat')
);

const RU_Values = loadable(() => import('@/views/StaticPage/Values/RU_index'));
const US_Values = loadable(() => import('@/views/StaticPage/Values/US_index'));
const FR_Values = loadable(() => import('@/views/StaticPage/Values/FR_index'));
const Values = loadable(() => import('@/views/StaticPage/Values'));

const sevenPay = loadable(() => import('@/views/sevenPay'));
// const sevenPayResult = loadable(() => import('@/views/sevenPayResult'));

const ShipmentConditions = loadable(() =>
  import('@/views/StaticPage/ShipmentConditions')
);
const RequestInvoices = loadable(() =>
  import('@/views/StaticPage/RequestInvoices')
);
const ConoceMasDeEvet = loadable(() =>
  import('@/views/StaticPage/ConoceMasDeEvet')
);
const Consent1TR = loadable(() =>
  import('@/views/StaticPage/tr/Consent/Consent1')
);
const Consent2TR = loadable(() =>
  import('@/views/StaticPage/tr/Consent/Consent2')
);
const Login = loadable(() => import('@/views/Login'));
const register = loadable(() => import('@/views/Register'));
const ForgetPassword = loadable(() => import('@/views/ForgetPassword'));
const ForgotSuccessEmail = loadable(() => import('@/views/ForgotSuccessEmail'));
const ResetPassword = loadable(() => import('@/views/ResetPassword'));
const ResetFailure = loadable(() => import('@/views/ResetFailure'));
const ResetSuccess = loadable(() => import('@/views/ResetSuccess'));
const ResetError = loadable(() => import('@/views/ResetError'));
const KittenNutrition = loadable(() =>
  import('@/views/StaticPage/kitten-nutrition')
);
const ShelterPrescription = loadable(() =>
  import('@/views/StaticPage/ShelterPrescription')
);
// import Loading from './components/Loading';
const VetLandingPage = loadable(() =>
  import('@/views/ClubLandingPage/vetlandingpage')
);
const ClubLandingPageNew = loadable(() => import('@/views/ClubLandingPageNew'));
const PreciseRecommendation = loadable(() =>
  import('@/views/PreciseRecommendation')
);
// const ClubLandingPageNew = loadable(() => import('@/views/ClubLandingPageNew'));
const ClubLandingPageDe = loadable(() =>
  import('@/views/ClubLandingPageNew/delandingpage')
);
const ClubLandingPageDeVet = loadable(() =>
  import('@/views/ClubLandingPageNew/devetlandingpage')
);
const DedicatedLandingPage = loadable(() =>
  import('@/views/DedicatedLandingPage')
);
const Felin = loadable(() => import('@/views/Felin2'));
const FelinRecommendation = loadable(() =>
  import('@/views/FelinRecommendation')
);
const Adoptions = loadable(() => import('@/views/Adoptions'));
const Whistlefit = loadable(() => import('@/views/Whistlefit'));
const CouponAgreement = loadable(() =>
  import('@/views/StaticPage/CouponAgreement')
);
const AssistanceDog = loadable(() =>
  import('@/views/StaticPage/AssistanceDog')
);
const CommeChienChat = loadable(() =>
  import('@/views/StaticPage/CommeChienChat')
);
const ClubLandingPage1 = loadable(() => import('@/views/ClubLandingPage1'));
const RuLocalAboutUs = loadable(() => import('@/views/RuLocal/AboutUs'));
const RuLocalContactUs = loadable(() => import('@/views/RuLocal/ContactUs'));
const RuLocalClub = loadable(() => import('@/views/RuLocal/Club'));
const RuLocalFindProduct = loadable(() =>
  import('@/views/RuLocal/FindProduct')
);
const RuLocalTailoredNutrition = loadable(() =>
  import('@/views/RuLocal/TailoredNutrition')
);

const RULocalSpecialWorksConditions = loadable(() =>
  import('@/views/RuLocal/SpecialWorksConditions')
);

const RULocalShipmentConditions = loadable(() =>
  import('@/views/RuLocal/ShipmentConditions')
);

const RULocalTermsConditions = loadable(() =>
  import('@/views/RuLocal/TermsConditions')
);

const RULocalFaq = loadable(() => import('@/views/RuLocal/Faq'));

const YandexMap = loadable(() => import('@/views/YandexMap'));
const localItemRoyal = window.__.localItemRoyal;
const sessionItemRoyal = window.__.sessionItemRoyal;

Date.prototype.addHours = function (h) {
  this.setHours(this.getHours() + h);
  return this;
};

// ??????storepotal????????????iframe?????????shop??????????????????token?????????
const tokenFromUrl = qs.parse(window.location.search, {
  ignoreQueryPrefix: true
})?.stoken;
if (tokenFromUrl) {
  sessionItemRoyal.set('rc-iframe-from-storepotal', 1);
  localItemRoyal.set('rc-token', tokenFromUrl);
}

// goodwill????????? goodWillFlag: 'GOOD_WILL'
const sPromotionCodeFromSearch = funcUrl({ name: 'spromocode' });
if (sPromotionCodeFromSearch) {
  // stores?.CheckoutStore?.setPromotionCode(sPromotionCodeFromSearch);
  localItemRoyal.set('rc-promotionCode', sPromotionCodeFromSearch);
  sessionItemRoyal.set('goodWillFlag', 'GOOD_WILL');
}

// ??????Felin????????????
const felinParams = qs.parse(window.location.search, {
  ignoreQueryPrefix: true
});

// console.log({ felinParams });

const guestId = felinParams?.guestId;
const userGroup = felinParams?.userGroup;
const petOwnerType = felinParams?.petOwnerType;

// console.log({ guestId });

if (userGroup && tokenFromUrl) {
  sessionItemRoyal.set('rc-userGroup', userGroup);
}
//guestId=${guestId}&userGroup=felinStore&petOwnerType=guest
if (guestId && userGroup && petOwnerType) {
  localItemRoyal.remove('rc-token');
  localItemRoyal.remove('rc-userinfo');
  sessionItemRoyal.set('rc-guestId', guestId);
  sessionItemRoyal.set('rc-userGroup', userGroup);
  sessionItemRoyal.set('rc-petOwnerType', petOwnerType);
}

const LoginCallback = (props) => {
  const { oktaAuth, authState } = useOktaAuth();
  const authStateReady = !authState.isPending;

  useEffect(() => {
    const init = async () => {
      const sessionToken = localItemRoyal.get('okta-session-token');
      const authCallBack =
        window.location.search.indexOf('?code') >= 0 &&
        window.location.search.indexOf('&state') >= 0; // ????????????????????????callback??????!authCallBack??????????????????callback
      if (sessionToken && !authStateReady && !authCallBack) {
        console.info('LoginCallback11');
        await oktaAuth.signInWithRedirect(window.__.env.REACT_APP_HOMEPAGE); //???????????????????????????OKTA?????????callback????????????????????????token
      } else {
        if (authStateReady) {
          console.info('LoginCallback22');
          props && props.history.push('/required');
        } else {
          console.info('LoginCallback33');
          await oktaAuth.handleLoginRedirect(); // ??????okta???callback???????????????okta??????????????????token???
        }
        console.log('authStateauthState', authState);
        // props && props.history.push('/required');
      }
    };
    init();
  }, [oktaAuth, authStateReady]);
  // }, [oktaAuth, authStateReady, authState, props]);

  return <div />;
};

const Adyen3DSFail = loadable(() =>
  import('@/views/Payment/modules/Adyen3DSFail')
);

const PayResult = loadable(() => import('@/views/Payment/modules/PayResult'));

const Payu3dsPayResult = loadable(() =>
  import('@/views/Payment/modules/Payu3dsPayResult')
);

const PaymentMethod3dsResult = loadable(() =>
  import('@/views/Payment/modules/PaymentMethod3dsResult')
);

const RegisterRequired = loadable(() =>
  import('@/views/Login/RegisterRequired')
);

const Test = loadable(() => import('@/views/Test'));
const Survey = loadable(() => import('@/views/Survey'));
const PrescriptiongGate = loadable(() => import('@/views/PrescriptionGate'));

const RU_Local_OurHistory = loadable(() =>
  import('@/views/RuLocal/OurHistory')
);
const RU_Local_Sustainability = loadable(() =>
  import('@/views/RuLocal/Sustainability')
);

const RU_Local_OurValues = loadable(() => import('@/views/RuLocal/OurValues'));
const ImplicitLogin = () => {
  const { oktaAuth } = useOktaAuth();
  oktaAuth.signInWithRedirect(window.__.env.REACT_APP_HOMEPAGE);
  return <div />;
};

var config = {
  projectId: '8f0d7f6b0396b8af7f08bf9f36d81259',
  phraseEnabled: Boolean(window.__.env.REACT_APP_PHRASE_CONTEXT_EDITOR),
  autoLowercase: false,
  branch: window.__.env.REACT_APP_PHRASE_BRANCH,
  prefix: '[[__',
  suffix: '__]]'
};
initializePhraseAppEditor(config);

const App = () => {
  const history = useHistory();

  const customAuthHandler = (oktaAuth) => {
    // Redirect to the /login page that has a CustomLoginComponent
    // This example is specific to React-Router
    history.push('/login');
  };

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri, window.location.origin));
  };

  const [loading, dynamicLanguage] = useDynamicLanguage();

  return (
    <Provider {...stores}>
      <IntlProvider
        // locale={window.__.env.REACT_APP_LANG}
        locale="en"
        messages={dynamicLanguage}
        defaultLocale={'en'}
      >
        <ExportedComponentsProvider>
          <Router
            basename={window.__.env.REACT_APP_HOMEPAGE}
            path={'/'}
            // forceRefresh={true}
          >
            <ScrollToTop>
              <Security
                oktaAuth={oktaConfig}
                // onAuthRequired={customAuthHandler}
                restoreOriginalUri={restoreOriginalUri}
              >
                <RouteFilter />
                <RouteFilterHook />
                <Switch>
                  <Route exact path={'/'} component={Home} />
                  <Route
                    exact
                    path={'/home'}
                    render={(props) => (
                      <Redirect to={{ pathname: '/' }} {...props} />
                    )}
                  />
                  <Route exact path={'/demo'} component={demo} />
                  <Route exact path={'/cancelEmail'} component={CancelEmail} />
                  {window.__.env.REACT_APP_COUNTRY === 'jp' && (
                    <Route
                      exact
                      path={'/prescription-gate'}
                      component={PrescriptiongGate}
                    />
                  )}

                  <Route
                    exact
                    path={'/okta-login-page'}
                    component={OktaLoginPage}
                  />
                  <Route
                    exact
                    path={'/okta-logout-page'}
                    component={OktaLogoutPage}
                  />
                  <Route exact path={'/pickupmap'} component={PickupMap} />
                  <Route exact path={'/test/'} component={Test} />
                  <Route
                    exact
                    path="/implicit/callback"
                    render={(props) => <LoginCallback {...props} />}
                  />
                  <Route
                    exact
                    path={'/implicit/login'}
                    render={() => <ImplicitLogin />}
                  />
                  <Route
                    path="/club-landing"
                    exact
                    render={(props) => <ClubLandingPage1 {...props} />}
                  />
                  <Route
                    exact
                    path="/precise-cat-nutrition-recommendation"
                    sensitive
                    render={(props) =>
                      stgShowAuth() ? (
                        <PreciseRecommendation {...props} />
                      ) : (
                        <List key={props.location.search} {...props} />
                      )
                    }
                  />
                  <Route path="/requestinvoice" component={RequestInvoices} />
                  <Route
                    exact
                    sensitive
                    path="/cart"
                    render={(props) => {
                      // if (props.location.search.includes('skuId')) {
                      //   return <CartInStock {...props} />;
                      // }
                      if (
                        props.location.search?.includes('prescription') &&
                        window.__.env.REACT_APP_COUNTRY
                      ) {
                        return <CartFRBreeder {...props} />;
                      }
                      return <Cart {...props} />;
                    }}
                  />
                  <Route
                    exact
                    path="/checkout"
                    render={(props) => {
                      switch (window.__.env.REACT_APP_COUNTRY) {
                        case 'fr':
                          return (
                            <Checkout
                              key={props.match.params.type}
                              {...props}
                            />
                          );
                        default:
                          return (
                            <Payment key={props.match.params.type} {...props} />
                          );
                      }
                    }}
                  />
                  <Route
                    exact
                    path="/checkoutnew"
                    render={(props) => {
                      return (
                        <Payment key={props.match.params.type} {...props} />
                      );
                    }}
                  />
                  <Route
                    exact
                    path="/confirmation"
                    sensitive
                    render={(props) => {
                      if (
                        !sessionItemRoyal.get('subOrderNumberList') ||
                        Boolean(sessionItemRoyal.get('refresh-confirm-page'))
                      ) {
                        if (window.__.env.REACT_APP_HUB) {
                          window.location.href =
                            window.__.env.REACT_APP_HUB_URLPREFIX;
                        } else {
                          return <Redirect to={{ pathname: '/' }} {...props} />;
                        }
                      } else {
                        return <Confirmation {...props} />;
                      }
                    }}
                  />

                  <Route exact path="/PayResult" component={PayResult} />
                  <Route
                    exact
                    path="/Payu3dsPayResult"
                    component={Payu3dsPayResult}
                  />
                  <Route
                    exact
                    path="/PaymentMethod3dsResult"
                    component={PaymentMethod3dsResult}
                  />
                  <Route
                    exact
                    path="/kitten-nutrition"
                    component={KittenNutrition}
                  />
                  <Route exact path="/Adyen3DSFail" component={Adyen3DSFail} />
                  <Route exact path="/prescription" component={Prescription} />
                  {/* //77777 */}
                  <Route exact path="/sevenPay" component={sevenPay} />
                  {/*<Route exact path="/sevenPayResult" component={sevenPayResult} />*/}
                  {/* indv */}
                  <Route
                    exact
                    path="/precise-cat-nutrition"
                    render={(props) =>
                      stgShowAuth() ? (
                        <PreciseCatNutrition {...props} />
                      ) : (
                        <List key={props.location.search} {...props} />
                      )
                    }
                  />
                  <Route exact path="/makerHandle" component={MakerHandle} />
                  <Route
                    exact
                    path="/prescriptionNavigate"
                    component={PrescriptionNavigate}
                  />
                  {/* us: /help/contact, jp: /contact_us , others: /help */}
                  <Route
                    exact
                    path="/help/contact"
                    render={(props) => {
                      switch (window.__.env.REACT_APP_COUNTRY) {
                        case 'us':
                          return <ContactUs {...props} />;
                        case 'jp':
                          return <Redirect to="/contact_us" {...props} />;
                        default:
                          return <Redirect to="/help" {...props} />;
                      }
                    }}
                  />
                  <Route
                    exact
                    path="/contact_us"
                    render={(props) => {
                      switch (window.__.env.REACT_APP_COUNTRY) {
                        case 'us':
                          return <Redirect to="/help/contact" {...props} />;
                        case 'jp':
                          return <JpContact {...props} />;
                        default:
                          return <Redirect to="/help" {...props} />;
                      }
                    }}
                  />
                  <Route
                    exact
                    path="/help"
                    render={(props) => {
                      switch (window.__.env.REACT_APP_COUNTRY) {
                        case 'us':
                          return <Redirect to="/help/contact" {...props} />;
                        case 'jp':
                          return <Redirect to="/contact_us" {...props} />;
                        default:
                          return <Help {...props} />;
                      }
                    }}
                  />
                  <Route
                    path="/shelter-landing-page"
                    component={ShelterPrescription}
                  />
                  <Route
                    exact
                    path="/general-terms-conditions"
                    render={(props) => {
                      let fragment = '';
                      switch (window.__.env.REACT_APP_COUNTRY) {
                        case 'fr':
                          fragment = <TermsConditions {...props} />;
                          break;
                        case 'tr':
                          fragment = <TermsConditionsTr {...props} />;
                          break;
                        case 'jp':
                          fragment = <TermsConditionJP {...props} />;
                          break;
                      }
                      return fragment;
                    }}
                  />
                  <Route
                    exact
                    path="/latelier/felin-terms-conditions"
                    component={FelinTermsConditions}
                  />
                  <Route
                    exact
                    path="/pack-mix-feeding-wet-dry"
                    component={Packfeed}
                  />
                  <Route
                    exact
                    path="/termsandconditions"
                    component={
                      window.__.env.REACT_APP_COUNTRY == 'fr'
                        ? TermsConditions
                        : TermsConditionsUs
                    }
                  />
                  <Route
                    exact
                    sensitive
                    path="/faq"
                    render={(props) =>
                      window.__.env.REACT_APP_COUNTRY === 'jp' ? (
                        <JpFAQ key={props.match.params.catogery} {...props} />
                      ) : (
                        <FAQ key={props.match.params.catogery} {...props} />
                      )
                    }
                  />
                  <Route
                    exact
                    path="/Widerrufsbelehrung"
                    component={Widerrufsbelehrung}
                  />
                  <Route
                    exact
                    path="/recommendation/:id"
                    render={(props) => {
                      return (
                        <Recommendation
                          key={props.match.params.id}
                          {...props}
                        />
                      );
                    }}
                  />
                  <Route
                    exact
                    path="/breeder/recommendation"
                    render={(props) => (
                      <Redirect
                        to={{
                          pathname: '/recommendation',
                          search: props.location.search
                        }}
                        {...props}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/recommendation"
                    render={(props) => {
                      let recommendationPage = <Recommendation_US {...props} />;
                      if (
                        window.__.env.REACT_APP_COUNTRY == 'fr' &&
                        props.location.search.includes('breeder')
                      ) {
                        recommendationPage = (
                          <Recommendation_FrBreeder {...props} />
                        );
                      } else if (
                        window.__.env.REACT_APP_COUNTRY === 'de' &&
                        props.location.search.includes('utm_campaign')
                      ) {
                        // ???????????????????????????????????????
                        recommendationPage = <CartDEBreeder {...props} />;
                      }
                      return recommendationPage;
                    }}
                  />
                  <Route
                    exact
                    path="/decouverteroyalcanin"
                    component={Decouverteroyalcanin}
                  />
                  <Route exact path="/termuse" component={TermUse} />
                  <Route
                    exact
                    path="/Terms-And-Conditions"
                    component={TermsAndConditions}
                  />
                  <Route
                    exact
                    path="/terms-of-use-prescriber"
                    component={TermsOfUsePrescriber}
                  />
                  <Route
                    exact
                    path="/privacypolicy"
                    component={PrivacyPolicy}
                  />
                  <Route path="/account" exact component={AccountHome} />
                  <Route
                    path="/account/information"
                    exact
                    component={AccountProfile}
                  />
                  <Route path="/account/pets" exact component={AccountPets} />
                  <Route
                    path="/account/orders"
                    exact
                    component={AccountOrders}
                  />
                  <Route
                    path="/account/appointments"
                    exact
                    component={AccountAppointments}
                  />
                  <Route
                    path="/account/orders/detail/:orderNumber"
                    exact
                    render={(props) => (
                      <AccountOrdersDetail
                        key={props.match.params.orderNumber}
                        {...props}
                      />
                    )}
                  />
                  <Route
                    path="/account/appointments/detail/:appointmentNo"
                    exact
                    render={(props) => (
                      <AccountAppointmentsDetail
                        key={props.match.params.appointmentNo}
                        {...props}
                      />
                    )}
                  />
                  <Route
                    path="/account/pets/petForm/:id"
                    exact
                    render={(props) => (
                      <AccountPetForm key={props.match.params.id} {...props} />
                    )}
                    // component={AccountPetForm}
                  />
                  {/* ????????????fgs ??????????????????????????????????????? */}
                  {window.__.env.REACT_APP_COUNTRY === 'jp' && (
                    <Route path="/petForm" exact component={AccountPetForm} />
                  )}
                  <Route
                    path="/account/pets/petForm/"
                    exact
                    component={AccountPetForm}
                  />
                  <Route
                    path="/account/pets/petList"
                    exact
                    component={AccountPetList}
                  />
                  <Route
                    path="/account/subscription"
                    exact
                    component={AccountSubscription}
                  />
                  <Route path="/account/loyalty" exact component={Loyalty} />
                  <Route
                    path="/account/subscription/order/detail/:subscriptionNumber"
                    exact
                    render={(props) => (
                      <AccountSubscriptionDetail
                        key={props.match.params.subscriptionNumber}
                        {...props}
                      />
                    )}
                  />
                  <Route
                    path="/account/productReview/:tid"
                    exact
                    render={(props) => (
                      <ProductReview key={props.match.params.tid} {...props} />
                    )}
                  />
                  <Route
                    path="/account/productReviewService/:tid"
                    exact
                    render={(props) => (
                      <ProductReviewService
                        key={props.match.params.tid}
                        {...props}
                      />
                    )}
                  />
                  <Route path="/whistlefit" exact component={Whistlefit} />
                  <Route path="/required" exact component={RegisterRequired} />
                  <Route
                    path="/conoce-mas-de-evet"
                    exact
                    component={ConoceMasDeEvet}
                  />
                  <Route
                    path="/product-finder/tree"
                    exact
                    component={ProductFinder2}
                  />
                  <Route
                    path="/product-finder/recommendation"
                    exact
                    component={ProductFinder2}
                  />
                  {/* <Route
                    exact
                    path="/product-finder-recommendation"
                    component={ProductFinderResult}
                  />
                  <Route
                    exact
                    path="/product-finder-noresult"
                    component={ProductFinderNoResult}
                  />

                  {/*1111111111  subscription-landing ?????????*/}
                  <Route
                    exact
                    path="/subscription-landing"
                    render={(props) => {
                      switch (window.__.env.REACT_APP_COUNTRY) {
                        case 'de':
                          return <DE_SubscriptionLanding {...props} />;
                        case 'uk':
                        // return <Redirect to={{ pathname: '/' }} {...props} />;
                        case 'se':
                        case 'us':
                          return <US_SubscriptionLanding {...props} />;
                        case 'ru':
                          return <VetLandingPage {...props} />;
                        case 'tr':
                          return <TR_SubscriptionLanding {...props} />;
                        case 'jp':
                          return (
                            <Redirect
                              to={{ pathname: '/subscription' }}
                              {...props}
                            />
                          );
                        case 'fr':
                          return (
                            <Redirect
                              to={{ pathname: '/club-subscription' }}
                              {...props}
                            />
                          );
                        default:
                          return <SubscriptionLanding {...props} />;
                      }
                    }}
                  />
                  <Route
                    path="/club-subscription"
                    exact
                    component={ClubLandingPageNew}
                  />
                  <Route
                    path="/how-to-order"
                    exact
                    component={
                      window.__.env.REACT_APP_COUNTRY == 'de'
                        ? ClubLandingPageDe
                        : Exception
                    }
                  />
                  <Route
                    path="/vet-diets"
                    exact
                    component={
                      window.__.env.REACT_APP_COUNTRY == 'de'
                        ? ClubLandingPageDeVet
                        : Exception
                    }
                  />
                  <Route
                    path="/adoptant/:id"
                    exact
                    render={(props) => {
                      if (window.__.env.REACT_APP_COUNTRY === 'fr') {
                        return (
                          <DedicatedLandingPage
                            key={props.match.params.id}
                            {...props}
                          />
                        );
                      } else {
                        return (
                          <Redirect to={{ pathname: '/404' }} {...props} />
                        );
                      }
                    }}
                  />
                  <Route
                    path="/general-conditions"
                    exact
                    render={(props) => {
                      if (window.__.env.REACT_APP_COUNTRY === 'ru') {
                        return <GeneralConditions {...props} />;
                      } else {
                        return (
                          <Redirect to={{ pathname: '/404' }} {...props} />
                        );
                      }
                    }}
                  />
                  <Route
                    path="/general-conditions-tr"
                    exact
                    component={TR_GeneralConditions}
                  />

                  <Route
                    path="/tailored-nutrition"
                    exact
                    render={(props) => {
                      if (window.__.env.REACT_APP_COUNTRY === 'ru') {
                        return <RuLocalTailoredNutrition {...props} />;
                      } else {
                        return (
                          <Redirect to={{ pathname: '/404' }} {...props} />
                        );
                      }
                    }}
                  />
                  <Route
                    path="/contact-us"
                    exact
                    render={(props) => {
                      if (window.__.env.REACT_APP_COUNTRY === 'ru') {
                        return <RuLocalContactUs {...props} />;
                      } else {
                        return (
                          <Redirect to={{ pathname: '/404' }} {...props} />
                        );
                      }
                    }}
                  />
                  <Route
                    path="/club"
                    exact
                    render={(props) => {
                      if (window.__.env.REACT_APP_COUNTRY === 'ru') {
                        return <RuLocalClub {...props} />;
                      } else {
                        return (
                          <Redirect to={{ pathname: '/404' }} {...props} />
                        );
                      }
                    }}
                  />
                  <Route
                    path="/club/find-product"
                    exact
                    render={(props) => {
                      if (window.__.env.REACT_APP_COUNTRY === 'ru') {
                        return <RuLocalFindProduct {...props} />;
                      } else {
                        return (
                          <Redirect to={{ pathname: '/404' }} {...props} />
                        );
                      }
                    }}
                  />
                  <Route
                    path="/About-Us"
                    exact
                    render={(props) => {
                      switch (window.__.env.REACT_APP_COUNTRY) {
                        case 'de':
                          return <AboutUsDe {...props} />;
                        case 'ru':
                          return <RuLocalAboutUs {...props} />;
                        default:
                          return <AboutUs {...props} />;
                      }
                    }}
                    // component={
                    //   window.__.env.REACT_APP_COUNTRY === 'de'
                    //     ? AboutUsDe
                    //     : AboutUs
                    // }
                  />
                  <Route
                    path="/myroyalcanin"
                    exact
                    render={(props) => {
                      if (window.__.env.REACT_APP_COUNTRY === 'jp') {
                        return <AboutMyRoyalCanin {...props} />;
                      } else {
                        return (
                          <Redirect to={{ pathname: '/404' }} {...props} />
                        );
                      }
                    }}
                  />
                  <Route
                    path="/subscription"
                    exact
                    render={(props) => {
                      if (window.__.env.REACT_APP_COUNTRY === 'jp') {
                        return <AboutSubscription {...props} />;
                      } else {
                        return (
                          <Redirect to={{ pathname: '/404' }} {...props} />
                        );
                      }
                    }}
                  />
                  <Route
                    path="/loyalty_program"
                    exact
                    render={(props) => {
                      if (window.__.env.REACT_APP_COUNTRY === 'jp') {
                        return <AboutLoyaltyProgram {...props} />;
                      } else {
                        return (
                          <Redirect to={{ pathname: '/404' }} {...props} />
                        );
                      }
                    }}
                  />
                  {/* AboutLoyaltyProgram */}
                  <Route
                    path="/policy/legal"
                    exact
                    render={(props) => {
                      if (window.__.env.REACT_APP_COUNTRY === 'jp') {
                        return <LegalNotice {...props} />;
                      } else {
                        return (
                          <Redirect to={{ pathname: '/404' }} {...props} />
                        );
                      }
                    }}
                  />
                  <Route path="/cat-nutrition" exact component={CatNutrition} />
                  <Route
                    path="/cadeau-coussin-chat"
                    exact
                    component={CadeauCoussinChat}
                  />
                  <Route
                    exact
                    path="/promotion-refuge"
                    component={PromotionRefuge}
                  />
                  <Route
                    exact
                    path="/Values"
                    component={
                      { fr: FR_Values, us: US_Values, ru: RU_Values }[
                        window.__.env.REACT_APP_COUNTRY
                      ] || Values
                    }
                  />
                  <Route
                    exact
                    path="/policy-point"
                    render={(props) => {
                      if (window.__.env.REACT_APP_COUNTRY === 'jp') {
                        return <CouponAgreement {...props} />;
                      } else {
                        return (
                          <Redirect to={{ pathname: '/404' }} {...props} />
                        );
                      }
                    }}
                  />
                  <Route
                    sensitive
                    path="/Tailorednutrition"
                    exact
                    render={(props) => {
                      switch (window.__.env.REACT_APP_COUNTRY) {
                        case 'us':
                        case 'uk':
                          return <US_Tailorednutrition {...props} />;
                        case 'mx':
                          return <MX_Tailorednutrition {...props} />;
                        case 'fr':
                          return <Tailorednutrition {...props} />;
                        default:
                          return (
                            <Redirect to={{ pathname: '/404' }} {...props} />
                          );
                      }
                    }}
                  />
                  {/* fr?????? */}
                  <Route
                    exact
                    path="/retail-products"
                    render={(props) => {
                      if (window.__.env.REACT_APP_COUNTRY === 'fr') {
                        return <OnlineStore {...props} />;
                      } else {
                        return (
                          <Redirect to={{ pathname: '/404' }} {...props} />
                        );
                      }
                    }}
                  />
                  <Route
                    path="/Quality-safety"
                    exact
                    // component={
                    //   window.__.env.REACT_APP_COUNTRY == 'us' ||
                    //   window.__.env.REACT_APP_COUNTRY == 'uk'
                    //     ? US_QualitySafety
                    //     : QualitySafety
                    // }
                    render={(props) => {
                      switch (window.__.env.REACT_APP_COUNTRY) {
                        case 'us':
                          return <US_QualitySafety {...props} />;
                        case 'uk':
                          return <US_QualitySafety {...props} />;
                        case 'mx':
                          return <MX_QualitySafety {...props} />;
                        default:
                          return <QualitySafety {...props} />;
                      }
                    }}
                  />
                  <Route
                    path="/shipmentConditions"
                    exact
                    render={(props) => {
                      if (window.__.env.REACT_APP_COUNTRY === 'ru') {
                        return <ShipmentConditions {...props} />;
                      } else {
                        return (
                          <Redirect to={{ pathname: '/404' }} {...props} />
                        );
                      }
                    }}
                  />
                  <Route path="/404" component={Exception} />
                  <Route path="/tr/:id" component={Exception} />
                  <Route path="/ru/:id" component={Exception} />
                  <Route path="/403" component={Page403} />
                  <Route path="/500" component={Page500} />
                  <Route path="/mentionslegales" component={Mentionslegales} />
                  <Route path="/consent1-tr" component={Consent1TR} />
                  <Route path="/consent2-tr" component={Consent2TR} />
                  <Route path="/register" component={register} />
                  <Route
                    path="/login"
                    exact
                    render={(props) => {
                      if (window.__.env.REACT_APP_FGS_SELF_LOGIN) {
                        return <Login {...props} />;
                      } else {
                        return (
                          <Redirect to={{ pathname: '/404' }} {...props} />
                        );
                      }
                    }}
                  />
                  <Route
                    path="/forgot"
                    exact
                    render={(props) => {
                      if (window.__.env.REACT_APP_FGS_SELF_LOGIN) {
                        return <ForgetPassword {...props} />;
                      } else {
                        return (
                          <Redirect to={{ pathname: '/404' }} {...props} />
                        );
                      }
                    }}
                  />
                  <Route
                    path="/forgot/success/email"
                    exact
                    render={(props) => {
                      if (window.__.env.REACT_APP_FGS_SELF_LOGIN) {
                        return <ForgotSuccessEmail {...props} />;
                      } else {
                        return (
                          <Redirect to={{ pathname: '/404' }} {...props} />
                        );
                      }
                    }}
                  />
                  <Route
                    path="/reset"
                    exact
                    render={(props) => {
                      if (window.__.env.REACT_APP_FGS_SELF_LOGIN) {
                        return <ResetPassword {...props} />;
                      } else {
                        return (
                          <Redirect to={{ pathname: '/404' }} {...props} />
                        );
                      }
                    }}
                  />
                  <Route
                    path="/reset/failure"
                    exact
                    render={(props) => {
                      if (
                        window.__.env.REACT_APP_FGS_SELF_LOGIN &&
                        window.__.env.REACT_APP_COUNTRY === 'ru'
                      ) {
                        return <ResetFailure {...props} />;
                      } else {
                        return (
                          <Redirect to={{ pathname: '/404' }} {...props} />
                        );
                      }
                    }}
                  />
                  <Route
                    path="/reset/success"
                    exact
                    render={(props) => {
                      if (window.__.env.REACT_APP_FGS_SELF_LOGIN) {
                        return <ResetSuccess {...props} />;
                      } else {
                        return (
                          <Redirect to={{ pathname: '/404' }} {...props} />
                        );
                      }
                    }}
                  />
                  <Route
                    path="/reset/error"
                    exact
                    render={(props) => {
                      if (window.__.env.REACT_APP_FGS_SELF_LOGIN) {
                        return <ResetError {...props} />;
                      } else {
                        return (
                          <Redirect to={{ pathname: '/404' }} {...props} />
                        );
                      }
                    }}
                  />
                  <Route path="/yandexmap" component={YandexMap} />
                  <Route
                    path="/welcome/:id"
                    render={(props) => (
                      <Welcome key={props.match.params.id} {...props} />
                    )}
                  />
                  <Route
                    path="/survey/:id?"
                    render={(props) => (
                      <Survey key={props.match.params.id} {...props} />
                    )}
                  />
                  {/* <Route
                    path="/smart-feeder-subscription"
                    component={smartFeederSubscription}
                  /> */}
                  {/* ??????????????????PLP/PDP?????? */}
                  <Route
                    exact
                    path="/list/:category/:keywords"
                    render={(props) => {
                      return (
                        <List
                          key={
                            props.match.params.category +
                            props.match.params.keywords
                          }
                          {...props}
                        />
                      );
                    }}
                  />
                  <Route
                    exact
                    path={window.__.env.REACT_APP_SEARCH_LINK}
                    render={(props) => {
                      if (props.location?.state?.noresult) {
                        return <SearchShow {...props} />;
                      } else {
                        return <List key={props.location.search} {...props} />;
                      }
                    }}
                  />
                  <Route
                    exact
                    path="/details/:id"
                    render={(props) => (
                      <Details key={props.match.params.id} {...props} />
                    )}
                  />
                  <Route
                    exact
                    path="/about-us/our-history"
                    component={RU_Local_OurHistory}
                  />
                  <Route
                    exact
                    path="/about-us/our-values"
                    component={RU_Local_OurValues}
                  />
                  <Route
                    exact
                    path="/about-us/sustainability"
                    component={RU_Local_Sustainability}
                  />

                  <Route
                    path="/list/:category"
                    render={(props) => (
                      <List
                        key={
                          props.match.params.category + props.location.search
                        }
                        {...props}
                      />
                    )}
                  />
                  <Route
                    path="/about-us/special-works-conditions"
                    exact
                    render={(props) => {
                      if (window.__.env.REACT_APP_COUNTRY === 'ru') {
                        return <RULocalSpecialWorksConditions {...props} />;
                      } else {
                        return (
                          <Redirect to={{ pathname: '/404' }} {...props} />
                        );
                      }
                    }}
                  />
                  <Route
                    path="/about-us/shipment-conditions"
                    exact
                    render={(props) => {
                      if (window.__.env.REACT_APP_COUNTRY === 'ru') {
                        return <RULocalShipmentConditions {...props} />;
                      } else {
                        return (
                          <Redirect to={{ pathname: '/404' }} {...props} />
                        );
                      }
                    }}
                  />
                  <Route
                    path="/about-us/terms-and-conditions"
                    exact
                    render={(props) => {
                      if (window.__.env.REACT_APP_COUNTRY === 'ru') {
                        return <RULocalTermsConditions {...props} />;
                      } else {
                        return (
                          <Redirect to={{ pathname: '/404' }} {...props} />
                        );
                      }
                    }}
                  />
                  <Route
                    path="/about-us/faq"
                    exact
                    render={(props) => {
                      if (window.__.env.REACT_APP_COUNTRY === 'ru') {
                        return <RULocalFaq {...props} />;
                      } else {
                        return (
                          <Redirect to={{ pathname: '/404' }} {...props} />
                        );
                      }
                    }}
                  />
                  <Route exact sensitive path="/FAQ" component={Exception} />
                  <Route
                    render={(props) => (
                      <FelinRecommendation
                        key={props.match.params.id}
                        {...props}
                      />
                    )}
                    path="/FelinRecommendation/:id"
                  />
                  <Route
                    path="/adoptions"
                    render={(props) => {
                      if (window.__.env.REACT_APP_COUNTRY === 'us') {
                        return <Adoptions {...props} />;
                      } else {
                        return (
                          <Redirect to={{ pathname: '/404' }} {...props} />
                        );
                      }
                    }}
                  />
                  <Route
                    path="/felin"
                    render={(props) => {
                      if (window.__.env.REACT_APP_COUNTRY === 'fr') {
                        return <Felin {...props} />;
                      } else {
                        return (
                          <Redirect to={{ pathname: '/404' }} {...props} />
                        );
                      }
                    }}
                  />
                  <Route
                    path="/felin/event"
                    render={(props) => {
                      if (window.__.env.REACT_APP_COUNTRY === 'fr') {
                        return <Felin {...props} />;
                      } else {
                        return (
                          <Redirect to={{ pathname: '/404' }} {...props} />
                        );
                      }
                    }}
                  />
                  <Route
                    path="/chiens-guides-aveugles"
                    render={(props) => {
                      if (window.__.env.REACT_APP_COUNTRY === 'fr') {
                        return <AssistanceDog {...props} />;
                      } else {
                        return (
                          <Redirect to={{ pathname: '/404' }} {...props} />
                        );
                      }
                    }}
                  />
                  <Route
                    path="/comme-chien-chat"
                    render={(props) => {
                      if (window.__.env.REACT_APP_COUNTRY === 'fr') {
                        return <CommeChienChat {...props} />;
                      } else {
                        return (
                          <Redirect to={{ pathname: '/404' }} {...props} />
                        );
                      }
                    }}
                  />
                  <Route
                    path="/"
                    render={(props) => {
                      const { location } = props;
                      const { pathname, search } = location;

                      //????????????/refuge108785 ??????????????????????????????
                      if (/^\/refuge/.test(pathname))
                        return <RefugeSource key={getRandom()} {...props} />;

                      // ??????????????????(/)?????????-??????-?????????????????????????????????????????????(details - /mini-dental-care-1221)??????????????????(list - /cats /retail-products /dog-size/x-small)
                      if (PDP_Regex.test(pathname)) {
                        let redirectUrl = '';
                        const splitName = { fr: '_FR.html', us: '_US.html' }[
                          window.__.env.REACT_APP_COUNTRY
                        ];
                        const productNameMappping = {
                          '/ageing-12+-en-gel????e-4153':
                            '/ageing-12+-en-gelee-4153',
                          '/british-shorthair-bouch????es-sp????cial-2032':
                            '/british-shorthair-bouchees-special-2032',
                          '/intense-beauty-en-gel????e-4151':
                            '/intense-beauty-en-gelee-4151',
                          '/kitten-en-gel????e-4150': '/kitten-en-gelee-4150',
                          '/kitten-sterilised-en-gel????e-1072':
                            '/kitten-sterilised-en-gelee-1072',
                          '/maine-coon-bouch????es-sp????cial-2031':
                            '/maine-coon-bouchees-special-2031',
                          '/persan-bouch????es-sp????cial-2030':
                            '/persan-bouchees-special-2030'
                        };
                        // PDP???????????????
                        // const specailPlpUrlMapping = {
                        //   ...redirectFun()
                        // };
                        if (productNameMappping[pathname]) {
                          redirectUrl = productNameMappping[pathname];
                        } else if (pathname.split('--').length > 1) {
                          redirectUrl = pathname.split('--').join('-');
                        } else if (pathname.split(splitName).length > 1) {
                          redirectUrl = pathname.split(splitName)[0];
                        } else if (pathname.split('.html').length > 1) {
                          redirectUrl = pathname.split('.html')[0];
                        }
                        // else if (specailPlpUrlMapping[pathname + search]) {
                        //   redirectUrl = specailPlpUrlMapping[pathname + search];
                        // }

                        if (redirectUrl) {
                          return (
                            <Redirect
                              to={{
                                pathname: redirectUrl,
                                search: props?.location?.search || '',
                                state: props?.location?.state
                              }}
                              {...props}
                            />
                          );
                        } else {
                          return (
                            <Details key={props.location.key} {...props} />
                          );
                        }
                      } else {
                        // ??????PDP?????????????????????start
                        // const specailPlpUrlMapping = {
                        //   ...redirectFun()
                        // };

                        let redirectUrl = '';
                        //redirectUrl = specailPlpUrlMapping[pathname + search];

                        // ??????PDP?????????????????????end
                        if (redirectUrl) {
                          console.log(`??????${redirectUrl}??????`);
                          return (
                            <Redirect
                              to={{
                                pathname: redirectUrl,
                                search: props?.location?.search || '',
                                state: props?.location?.state
                              }}
                              {...props}
                            />
                          );
                        } else {
                          // PLP
                          return (
                            <List
                              key={
                                props.match.params.category +
                                props.location.search +
                                props.location.key
                              }
                              {...props}
                            />
                          );
                        }
                      }
                    }}
                  />
                  <Route
                    path="*"
                    render={(props) => {
                      const { location } = props;
                      const { pathname, search } = location;
                      console.log('?????????404??????', { pathname, search });
                      return <Exception {...props} />;
                    }}
                    // component={Exception}
                  />
                </Switch>
              </Security>
            </ScrollToTop>
          </Router>
        </ExportedComponentsProvider>
      </IntlProvider>
    </Provider>
  );
};

export default App;
