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

import config from './config';

import '@/assets/iconfont/iconfont.css';
import '@/assets/css/global.css';
import locales from '@/lang'; // ENUM_LANGFILE[process.env.REACT_APP_LANG]

// const locales = {
//   'en-US': require('./locales/en-US.js'),
//   'zh-CN': require('./locales/zh-CN.js')
// };

import '@/utils/global';
import { IntlProvider } from 'react-intl';
import { Provider } from 'mobx-react';
import stores from './store';
import { PDP_Regex } from '@/utils/constant';

import RegisterRequired from '@/views/Login/RegisterRequired';
import demo from '@/views/demo';
import ScrollToTop from '@/components/ScrollToTop';
import RouteFilter from '@/components/RouteFilter';
import Home from '@/views/Home';
import Test from '@/views/Test';
import List from '@/views/List';
import Login from '@/views/Login';
// import Details from '@/views/Details';
import Details from '@/views/Details/index.js';
import Cart from '@/views/Cart';
import Payment from '@/views/Payment';
import Confirmation from '@/views/Confirmation';
import Adyen3DSFail from '@/views/Payment/modules/Adyen3DSFail';
import PayResult from '@/views/Payment/modules/PayResult';
import Payu3dsPayResult from '@/views/Payment/modules/Payu3dsPayResult';
import Prescription from '@/views/Prescription';
import PrescriptionNavigate from '@/views/PrescriptionNavigate';
import FAQ from '@/views/FAQ';
import Widerrufsbelehrung from '@/views/Widerrufsbelehrung';
import AccountHome from '@/views/Account/Home';
import AccountProfile from '@/views/Account/Profile';
import AccountPets from '@/views/Account/Pet';
import AccountOrders from '@/views/Account/Orders';
import AccountOrdersDetail from '@/views/Account/OrdersDetail';
import AccountOrdersAfterSale from '@/views/Account/OrdersAfterSale';
import AccountOrdersAfterSaleSuccess from '@/views/Account/OrdersAfterSaleSuccess';
import AccountOrdersAfterSaleDetail from '@/views/Account/OrdersAfterSaleDetail';
import AccountSubscription from '@/views/Account/Subscription';
import AccountSubscriptionDetail from '@/views/Account/SubscriptionDetail';
import AccountPetForm from '@/views/Account/PetForm/index.js';
import OktaLoginPage from '@/views/OktaLoginPage/index.js';
import OktaLogoutPage from '@/views/OktaLogoutPage/index.js';
// import AccountPetForm from '@/views/Account/PetForm/index.js';
import AccountPetList from '@/views/Account/PetList';
import ProductReview from '@/views/Account/ProductReview';
// import AccountRefunds from "@/views/Account/Refunds";

import AccountReturnOrder from '@/views/Account/ReturnOrder';
import ForgetPassword from '@/views/ForgetPassword';
import Recommendation from '@/views/Recommendation';
import Recommendation_FR from '@/views/Recommendation_FR';
import Recommendation_US from '@/views/Recommendation_US';
import ProductFinder from '@/views/ProductFinder';
import ProductFinderResult from '@/views/ProductFinder/modules/Result';
import ProductFinderNoResult from '@/views/ProductFinder/modules/NoResult';

import TermUse from '@/views/StaticPage/TermUse';
import TermsAndConditions from '@/views/StaticPage/TermUse/TermsAndConditions';
import PrivacyPolicy from '@/views/StaticPage/PrivacyPolicy';
import Exception from '@/views/StaticPage/Exception';
import Page403 from '@/views/StaticPage/403';
import Page500 from '@/views/StaticPage/500';
import Mentionslegales from '@/views/StaticPage/Mentionslegales';
import Help from '@/views/StaticPage/Help';
import ContactUs from '@/views/StaticPage/ContactUs';
import Packfeed from './views/StaticPage/PackmixfeedingwetDry';
import TermsConditions from '@/views/StaticPage/TermsAndConditions';
import TermsConditionsUs from './views/StaticPage/TermsAndConditions/US_index';
import TermsConditionsTr from './views/StaticPage/TermsAndConditions/TR_index';
import SubscriptionLanding from '@/views/StaticPage/SubscriptionLanding';
import DE_SubscriptionLanding from '@/views/StaticPage/SubscriptionLanding/DE_index.js';
import US_SubscriptionLanding from '@/views/StaticPage/SubscriptionLanding/US_index.js';
import RU_SubscriptionLanding from '@/views/StaticPage/SubscriptionLanding/RU_index.js';
import TR_SubscriptionLanding from '@/views/StaticPage/SubscriptionLanding/TR_index.js';
import TR_GeneralConditions from '@/views/StaticPage/GeneralConditions/TR_index.js';
import generalConditions from '@/views/StaticPage/GeneralConditions';
import Tailorednutrition from '@/views/StaticPage/Tailorednutrition/index';
import US_Tailorednutrition from '@/views/StaticPage/Tailorednutrition/US_index';
import OnlineStore from '@/views/StaticPage/OnlineStore/index';
import QualitySafety from '@/views/StaticPage/QualitySafety/index';
import US_QualitySafety from '@/views/StaticPage/QualitySafety/US_index';
import SearchShow from '@/views/StaticPage/SearchShow/index';
import AboutUs from '@/views/StaticPage/AboutUs/index.js';
import AboutUsDe from '@/views/StaticPage/AboutUs/de-index';
import CatNutrition from '@/views/StaticPage/CatNutrition/index.js';
import CadeauCoussinChat from '@/views/StaticPage/CadeauCoussinChat/index.js';
import PromotionRefuge from '@/views/StaticPage/PromotionRefuge/index.js';
import RefugeSource from '@/views/StaticPage/PromotionRefuge/source.js';
import RU_Values from '@/views/StaticPage/Values/RU_index.js';
import US_Values from '@/views/StaticPage/Values/US_index.js';
import FR_Values from '@/views/StaticPage/Values/FR_index.js';
import Values from '@/views/StaticPage/Values/index.js';
import ShipmentConditions from '@/views/StaticPage/ShipmentConditions';
import RequestInvoices from '@/views/StaticPage/RequestInvoices';
import ConoceMasDeEvet from '@/views/StaticPage/ConoceMasDeEvet';
import Consent1TR from '@/views/StaticPage/tr/Consent/Consent1';
import Consent2TR from '@/views/StaticPage/tr/Consent/Consent2';
import register from '@/views/Register';
import welcome from '@/views/Register/welcome.js';
import KittenNutrition from '@/views/StaticPage/kitten-nutrition';
import smartFeederSubscription from '@/views/SmartFeederSubscription';
import ShelterPrescription from '@/views/StaticPage/ShelterPrescription';
import Felin from '@/views/Felin';
import FelinRecommendation from '@/views/FelinRecommendation';
import CancelEmail from '@/views/StaticPage/CancelEmail';

import ClubLandingPage from './views/ClubLandingPage';
import { redirectFun } from '@/redirect/utils';

const localItemRoyal = window.__.localItemRoyal;
const sessionItemRoyal = window.__.sessionItemRoyal;
const token = localItemRoyal.get('rc-token');

Date.prototype.addHours = function (h) {
  this.setHours(this.getHours() + h);
  return this;
};

import { registerLocale, setDefaultLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import es from 'date-fns/locale/es';
import de from 'date-fns/locale/de';
import VetLandingPage from './views/ClubLandingPage/vetlandingpage';
import ClubLandingPageNew from './views/ClubLandingPageNew';

if (process.env.REACT_APP_COUNTRY === 'FR') {
  registerLocale(process.env.REACT_APP_LANG, fr);
  setDefaultLocale('fr');
} else if (process.env.REACT_APP_COUNTRY === 'DE') {
  registerLocale(process.env.REACT_APP_LANG, de);
  setDefaultLocale('de');
} else if (process.env.REACT_APP_COUNTRY === 'MX') {
  registerLocale(process.env.REACT_APP_LANG, es);
  setDefaultLocale('es');
} else if (process.env.REACT_APP_COUNTRY === 'US') {
}

// 处理storepotal通过嵌入iframe，引入shop页面时，带入token的情况
const tokenFromUrl = window.location.search
  .substr(1)
  .split('&')
  .filter((ele) => ele.includes('stoken'))?.[0]
  ?.split('=')[1];
if (tokenFromUrl) {
  sessionItemRoyal.set('rc-iframe-from-storepotal', 1);
  localItemRoyal.set('rc-token', tokenFromUrl);
}

const LoginCallback = (props) => {
  const { oktaAuth, authState } = useOktaAuth();
  const authStateReady = !authState.isPending;

  useEffect(async () => {
    const sessionToken = localItemRoyal.get('okta-session-token');
    const authCallBack =
      window.location.search.indexOf('?code') >= 0 &&
      window.location.search.indexOf('&state') >= 0;
    if (sessionToken && !authStateReady && !authCallBack) {
      await oktaAuth.signInWithRedirect(process.env.REACT_APP_HOMEPAGE);
    } else {
      if (authStateReady) {
      } else {
        await oktaAuth.handleLoginRedirect();
      }
      sessionItemRoyal.set('fromLoginPage', true);
      props && props.history.push('/required');
    }
  }, [oktaAuth, authStateReady]);

  return <div />;
};

const ImplicitLogin = () => {
  const { oktaAuth } = useOktaAuth();
  oktaAuth.signInWithRedirect(process.env.REACT_APP_HOMEPAGE);
  return <div />;
};

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
  return (
    <Provider {...stores}>
      <IntlProvider locale={process.env.REACT_APP_LANG} messages={locales}>
        <Router
          basename={process.env.REACT_APP_HOMEPAGE}
          path={'/'}
          forceRefresh={true}
        >
          <ScrollToTop>
            <Security
              oktaAuth={config}
              // onAuthRequired={customAuthHandler}
              restoreOriginalUri={restoreOriginalUri}
            >
              <RouteFilter />
              <Switch>
                <Route exact path={'/'} component={Home} />
                <Route exact path={'/cancelEmail'} component={CancelEmail} />
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
                <Route exact path={'/home/'} component={Home} />
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
                {/* <Route exact path="/login" component={Login} /> */}
                <Route
                  exact
                  path="/login"
                  render={(props) =>
                    token ? <Redirect to="/account/" /> : <Login {...props} />
                  }
                />
                <Route path="/requestinvoice" component={RequestInvoices} />
                <Route exact path="/cart" component={Cart} />
                <Route
                  exact
                  path="/checkout"
                  render={(props) => (
                    <Payment key={props.match.params.type} {...props} />
                  )}
                />
                <Route exact path="/confirmation" component={Confirmation} />
                <Route exact path="/PayResult" component={PayResult} />
                <Route
                  exact
                  path="/Payu3dsPayResult"
                  component={Payu3dsPayResult}
                />
                <Route
                  exact
                  path="/kitten-nutrition"
                  component={KittenNutrition}
                />
                <Route exact path="/Adyen3DSFail" component={Adyen3DSFail} />
                <Route exact path="/demo" component={demo} />
                <Route exact path="/prescription" component={Prescription} />
                <Route
                  exact
                  path="/prescriptionNavigate"
                  component={PrescriptionNavigate}
                />
                <Route exact path="/help/contact" component={ContactUs} />
                <Route exact path="/help" component={Help} />
                <Route
                  path="/shelter-landing-page"
                  component={ShelterPrescription}
                />
                <Route
                  exact
                  path="/general-terms-conditions"
                  render={(props) => {
                    let fragment = '';
                    switch (process.env.REACT_APP_COUNTRY) {
                      case 'FR':
                        fragment = <TermsConditions {...props} />;
                        break;
                      case 'TR':
                        fragment = <TermsConditionsTr {...props} />;
                        break;
                    }
                    return fragment;
                  }}
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
                    process.env.REACT_APP_COUNTRY == 'FR'
                      ? TermsConditions
                      : TermsConditionsUs
                  }
                />
                <Route
                  exact
                  path="/club-subscription"
                  render={(props) => {
                    let tmpComponent;
                    switch (process.env.REACT_APP_COUNTRY) {
                      case 'RU':
                      case 'TR':
                        return <ClubLandingPage {...props} />;
                      default:
                        return <Exception {...props} />;
                    }
                  }}
                />
                <Route
                  exact
                  sensitive
                  path="/faq"
                  render={(props) => (
                    <FAQ key={props.match.params.catogery} {...props} />
                  )}
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
                      <Recommendation key={props.match.params.id} {...props} />
                    );
                  }}
                />
                <Route
                  exact
                  path="/recommendationfr"
                  render={(props) => {
                    return <Recommendation_FR {...props} />;
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
                  render={(props) => <Recommendation_US {...props} />}
                />

                <Route exact path="/termuse" component={TermUse} />
                <Route
                  exact
                  path="/Terms-And-Conditions"
                  component={TermsAndConditions}
                />
                <Route exact path="/privacypolicy" component={PrivacyPolicy} />

                <Route path="/account" exact component={AccountHome} />
                <Route
                  path="/account/information"
                  exact
                  component={AccountProfile}
                />
                <Route path="/account/pets" exact component={AccountPets} />
                <Route path="/account/orders" exact component={AccountOrders} />
                <Route
                  path="/account/orders/detail/:orderNumber"
                  exact
                  component={AccountOrdersDetail}
                />
                <Route
                  path="/account/pets/petForm/:id"
                  exact
                  render={(props) => (
                    <AccountPetForm key={props.match.params.id} {...props} />
                  )}
                  // component={AccountPetForm}
                />
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
                  path="/account/return-order"
                  exact
                  component={AccountReturnOrder}
                />
                <Route
                  path="/account/subscription"
                  exact
                  component={AccountSubscription}
                />
                <Route
                  path="/account/subscription/order/detail/:subscriptionNumber"
                  exact
                  component={AccountSubscriptionDetail}
                />
                <Route
                  path="/account/orders-aftersale/:orderNumber"
                  exact
                  component={AccountOrdersAfterSale}
                />
                <Route
                  path="/account/orders-aftersale/success/:returnNumber"
                  exact
                  component={AccountOrdersAfterSaleSuccess}
                />
                <Route
                  path="/account/return-order-detail/:returnNumber"
                  exact
                  component={AccountOrdersAfterSaleDetail}
                />
                <Route
                  path="/account/productReview/:tid"
                  exact
                  component={ProductReview}
                />
                {/* <Route path="/required" exact component={RegisterRequired} /> */}
                <Route path="/required" exact component={RegisterRequired} />
                {/* <Route
                  exact
                  path="/required"
                  render={(props) =>
                    token ? <required {...props} /> : <Redirect to="/home" />
                  }
                /> */}

                <Route
                  path="/conoce-mas-de-evet"
                  exact
                  component={ConoceMasDeEvet}
                />
                <Route path="/product-finder" exact component={ProductFinder} />
                <Route
                  exact
                  path="/product-finder-recommendation"
                  component={ProductFinderResult}
                />
                <Route
                  exact
                  path="/product-finder-noresult"
                  component={ProductFinderNoResult}
                />

                <Route
                  exact
                  path="/subscription-landing"
                  component={(() => {
                    let sublanding = '';
                    switch (process.env.REACT_APP_COUNTRY) {
                      case 'DE':
                        sublanding = DE_SubscriptionLanding;
                        break;
                      case 'US':
                        sublanding = US_SubscriptionLanding;
                        break;
                      case 'RU':
                        sublanding = VetLandingPage;
                        break;
                      case 'TR':
                        sublanding = TR_SubscriptionLanding;
                        break;
                      default:
                        sublanding = SubscriptionLanding;
                    }
                    return sublanding;
                  })()}
                />
                <Route path="/clublandingpagenew"
                       exact
                       component={ClubLandingPageNew}
                />

                <Route
                  path="/general-conditions"
                  exact
                  component={generalConditions}
                />


                <Route
                  path="/general-conditions-tr"
                  exact
                  component={TR_GeneralConditions}
                />
                <Route
                  path="/About-Us"
                  exact
                  component={
                    process.env.REACT_APP_COUNTRY == 'DE' ? AboutUsDe : AboutUs
                  }
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

                {/* <Route path="/Values-ru" exact component={RU_Values} />
                <Route path="/Values-us" exact component={US_Values} />
                <Route path="/Values" exact component={FR_Values} /> */}
                <Route
                  exact
                  path="/Values"
                  component={
                    { FR: FR_Values, US: US_Values, RU: RU_Values }[
                      process.env.REACT_APP_COUNTRY
                    ] || Values
                  }
                />

                <Route
                  sensitive
                  path="/Tailorednutrition"
                  exact
                  component={
                    process.env.REACT_APP_COUNTRY == 'US'
                      ? US_Tailorednutrition
                      : Tailorednutrition
                  }
                />
                <Route exact path="/retail-products" component={OnlineStore} />
                <Route
                  path="/Quality-safety"
                  exact
                  component={
                    process.env.REACT_APP_COUNTRY == 'US'
                      ? US_QualitySafety
                      : QualitySafety
                  }
                />
                <Route
                  path="/shipmentConditions"
                  exact
                  component={ShipmentConditions}
                />
                <Route
                  exact
                  path="/forgetPassword"
                  component={ForgetPassword}
                />
                <Route path="/404" component={Exception} />
                <Route path="/403" component={Page403} />
                <Route path="/500" component={Page500} />

                <Route path="/mentionslegales" component={Mentionslegales} />

                <Route path="/consent1-tr" component={Consent1TR} />
                <Route path="/consent2-tr" component={Consent2TR} />
                <Route path="/register" component={register} />
                <Route path="/welcome/:id" component={welcome} />

                <Route
                  path="/smart-feeder-subscription"
                  component={smartFeederSubscription}
                />

                <Route
                  path="/FelinRecommendation/:id"
                  component={FelinRecommendation}
                />
                <Route path="/latelier/felin" component={Felin} />
                {/* 特殊处理匹配PLP/PDP页面 */}
                <Route
                  exact
                  path="/list/:category/:keywords"
                  render={(props) => (
                    <List
                      key={
                        props.match.params.category +
                        props.match.params.keywords
                      }
                      {...props}
                    />
                  )}
                />

                <Route
                  exact
                  // path="/on/demandware.store/Sites-FR-Site/fr_FR/Search-Show"
                  path={`/on/demandware.store/Sites-${process.env.REACT_APP_LANG.toUpperCase()}-Site/${process.env.REACT_APP_LANG.toLowerCase()}_${process.env.REACT_APP_LANG.toUpperCase()}/Search-Show`}
                  render={(props) => {
                    if (props.location.state && props.location.state.noresult) {
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
                  path="/list/:category"
                  render={(props) => (
                    <List
                      key={props.match.params.category + props.location.search}
                      {...props}
                    />
                  )}
                />
                <Route exact sensitive path="/FAQ" component={Exception} />
                <Route
                  path="/"
                  render={(props) => {
                    const { location } = props;
                    const { pathname, search } = location;

                    //为了匹配/refuge108785 这种数字动态的短链接
                    if (/^\/refuge/.test(pathname))
                      return <RefugeSource key={Math.random()} {...props} />;

                    // 只有一级路由(/)且存在-，且-后边的字符串包含了数字的，匹配(details - /mini-dental-care-1221)，否则不匹配(list - /cats /retail-products /dog-size/x-small)
                    console.log(999,PDP_Regex.test(pathname))
                    if (PDP_Regex.test(pathname)) {
                      let redirectUrl = '';
                      const splitName = { FR: '_FR.html', US: '_US.html' }[
                        process.env.REACT_APP_COUNTRY
                      ];
                      const productNameMappping = {
                        '/ageing-12+-en-gelÃ©e-4153':
                          '/ageing-12+-en-gelee-4153',
                        '/british-shorthair-bouchÃ©es-spÃ©cial-2032':
                          '/british-shorthair-bouchees-special-2032',
                        '/intense-beauty-en-gelÃ©e-4151':
                          '/intense-beauty-en-gelee-4151',
                        '/kitten-en-gelÃ©e-4150': '/kitten-en-gelee-4150',
                        '/kitten-sterilised-en-gelÃ©e-1072':
                          '/kitten-sterilised-en-gelee-1072',
                        '/maine-coon-bouchÃ©es-spÃ©cial-2031':
                          '/maine-coon-bouchees-special-2031',
                        '/persan-bouchÃ©es-spÃ©cial-2030':
                          '/persan-bouchees-special-2030'
                      };
                      if (productNameMappping[pathname]) {
                        redirectUrl = productNameMappping[pathname];
                      } else if (pathname.split('--').length > 1) {
                        redirectUrl = pathname.split('--').join('-');
                      } else if (pathname.split(splitName).length > 1) {
                        redirectUrl = pathname.split(splitName)[0];
                      } else if (pathname.split('.html').length > 1) {
                        redirectUrl = pathname.split('.html')[0];
                      }

                      // PDP文件重定向start
                      const specailPlpUrlMapping = {
                        ...redirectFun()
                      };

                      redirectUrl = specailPlpUrlMapping[pathname + search];

                      console.log(redirectUrl)

                      // PDP文件重定向end

                      if (redirectUrl) {
                        return <Redirect to={redirectUrl} />;
                      } else {
                        return (
                          <Details key={props.match.params.id} {...props} />
                        );
                      }
                    } else {
                      // 除去PDP页面文件重定向start
                      const specailPlpUrlMapping = {
                        ...redirectFun()
                      };
                      
                      let redirectUrl = '';
                      // if (pathname.split('.html').length > 1) {
                      //   redirectUrl = pathname.split('.html')[0];
                      // } else if (specailPlpUrlMapping[pathname + search]) {
                      //   redirectUrl = specailPlpUrlMapping[pathname + search];
                      // }
                      redirectUrl = specailPlpUrlMapping[pathname + search];

                      console.log(pathname)
                      console.log(redirectUrl)
                      //debugger

                      // 除去PDP页面文件重定向end
                      if (redirectUrl) {
                        return <Redirect to={redirectUrl} />;
                      } else {
                        return (
                          <List
                            key={
                              props.match.params.category +
                              props.location.search
                            }
                            {...props}
                          />
                        );
                      }
                    }
                  }}
                />
                <Route path="*" component={Exception} />
              </Switch>
            </Security>
          </ScrollToTop>
        </Router>
      </IntlProvider>
    </Provider>
  );
};

export default App;
