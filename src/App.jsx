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
  Switch
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

import RegisterRequired from '@/views/Login/RegisterRequired';
import ScrollToTop from '@/components/ScrollToTop';
import RouteFilter from '@/components/RouteFilter';
import Home from '@/views/Home';
import List from '@/views/List';
import ListSource from '@/views/List/source';
import Login from '@/views/Login';
// import Details from '@/views/Details';
import Details from '@/views/Details/index.js';
import Cart from '@/views/Cart';
import Payment from '@/views/Payment';
import Confirmation from '@/views/Confirmation';
import PayResult from '@/views/Payment/modules/PayResult';
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
import AccountPaymentMethod from '@/views/Account/PaymentMethod';
import AccountSubscription from '@/views/Account/Subscription';
import AccountSubscriptionDetail from '@/views/Account/SubscriptionDetail';
import AccountPaymentMethodForm from '@/views/Account/CreditCardForm';
import AccountPetForm from '@/views/Account/PetForm/index.js';
// import AccountPetForm from '@/views/Account/PetForm/index.js';
import AccountPetList from '@/views/Account/PetList';
import ProductReview from '@/views/Account/ProductReview';
import AccountShippingAddress from '@/views/Account/ShippingAddress';
// import AccountRefunds from "@/views/Account/Refunds";
import AccountShippingAddressForm from '@/views/Account/ShippingAddressForm';

import AccountReturnOrder from '@/views/Account/ReturnOrder';
import ForgetPassword from '@/views/ForgetPassword';
import Recommendation from '@/views/Recommendation';
import Recommendation_FR from '@/views/Recommendation_FR';
import ProductFinder from '@/views/ProductFinder';
import ProductFinderResult from '@/views/ProductFinder/modules/Result';
import ProductFinderNoResult from '@/views/ProductFinder/modules/NoResult';

import TermUse from '@/views/StaticPage/TermUse';
import TermsAndConditions from '@/views/StaticPage/TermUse/TermsAndConditions';
import PrivacyPolicy from '@/views/StaticPage/PrivacyPolicy';
import Exception from '@/views/StaticPage/Exception';
import Page403 from '@/views/StaticPage/403';
import Page500 from '@/views/StaticPage/500';
import Help from '@/views/StaticPage/Help';
import Packfeed from './views/StaticPage/PackmixfeedingwetDry';
import TermsConditions from '@/views/StaticPage/TermsAndConditions';
import SubscriptionLanding from '@/views/StaticPage/SubscriptionLanding';
import DE_SubscriptionLanding from '@/views/StaticPage/SubscriptionLanding/DE_index.js';
import US_SubscriptionLanding from '@/views/StaticPage/SubscriptionLanding/US_index.js';
import RU_SubscriptionLanding from '@/views/StaticPage/SubscriptionLanding/RU_index.js';
import TR_SubscriptionLanding from '@/views/StaticPage/SubscriptionLanding/TR_index.js';
import TR_GeneralConditions from '@/views/StaticPage/GeneralConditions/TR_index.js';
import generalConditions from '@/views/StaticPage/GeneralConditions';
import Tailorednutrition from '@/views/StaticPage/Tailorednutrition';
import QualitySafety from '@/views/StaticPage/QualitySafety';
import SearchShow from '@/views/StaticPage/SearchShow';
import AboutUs from '@/views/StaticPage/AboutUs/index.js';
import AboutUsDe from '@/views/StaticPage/AboutUs/de-index';
import CatNutrition from '@/views/StaticPage/CatNutrition/index.js';
import CadeauCoussinChat from '@/views/StaticPage/CadeauCoussinChat/index.js';
import PromotionRefuge from '@/views/StaticPage/PromotionRefuge/index.js';
import RefugeSource from '@/views/StaticPage/PromotionRefuge/source.js';
import RU_Values from '@/views/StaticPage/Values/RU_index.js';
import FR_Values from '@/views/StaticPage/Values/FR_index.js';
import ShipmentConditions from '@/views/StaticPage/ShipmentConditions';
import RequestInvoices from '@/views/StaticPage/RequestInvoices';
import ConoceMasDeEvet from '@/views/StaticPage/ConoceMasDeEvet';
import Consent1TR from '@/views/StaticPage/tr/Consent/Consent1';
import Consent2TR from '@/views/StaticPage/tr/Consent/Consent2';
import register from '@/views/Register';
const localItemRoyal = window.__.localItemRoyal;
const sessionItemRoyal = window.__.sessionItemRoyal;
const token = localItemRoyal.get('rc-token');
import {linkTransform} from "@/api/refuge"

import { registerLocale, setDefaultLocale } from  "react-datepicker";
import fr from "date-fns/locale/fr";
import es from "date-fns/locale/es";
import de from "date-fns/locale/de";
if(process.env.REACT_APP_LANG === 'fr') {
  registerLocale(process.env.REACT_APP_LANG, fr)
  setDefaultLocale('fr')
}else if(process.env.REACT_APP_LANG === 'de') {
  registerLocale(process.env.REACT_APP_LANG, de)
  setDefaultLocale('de')
}else if(process.env.REACT_APP_LANG === 'es') {
  registerLocale(process.env.REACT_APP_LANG, es)
  setDefaultLocale('es')
}else if(process.env.REACT_APP_LANG === 'us') {
  
}


const LoginCallback = (props) => {
  const { oktaAuth, authState } = useOktaAuth();
  const authStateReady = !authState.isPending;

  useEffect(async () => {
    const consentString = localItemRoyal.get('rc-consent-list');
    const authCallBack =
      window.location.search.indexOf('?code') >= 0 &&
      window.location.search.indexOf('&state') >= 0;

    if (consentString && !authStateReady && !authCallBack) {
      await oktaAuth.signInWithRedirect(process.env.REACT_APP_HOMEPAGE);
    } else {
      if (authStateReady) {
      } else {
        await oktaAuth.handleLoginRedirect();
      }
      let homePage = '';
      process.env.REACT_APP_HOMEPAGE === '/'
        ? (homePage = '')
        : (homePage = process.env.REACT_APP_HOMEPAGE);
      
      sessionItemRoyal.set('fromLoginPage', true);
      window.location.href = homePage + '/required';
    }
  }, [oktaAuth, authStateReady]);

  return <div />;
};

window.addEventListener("popstate",function(e){
  location.reload()
},false)

const regRefuge = (props)=>{
  console.log(props)
  debugger
  return '/refuge108782'
}

const App = () => (
  <Provider {...stores}>
    <IntlProvider locale={process.env.REACT_APP_LANG} messages={locales}>
      <Router
        basename={process.env.REACT_APP_HOMEPAGE}
        path={'/'}
        forceRefresh={true}
      >
        <RouteFilter />
        <ScrollToTop>
          <Security oktaAuth={config}>
            <Switch>
              <Route exact path={'/'} component={Home} />
              <Route exact path={'/home/'} component={Home} />
              <Route
                exact
                path="/implicit/callback"
                render={(props) => <LoginCallback {...props} />}
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
              <Route exact path="/prescription" component={Prescription} />
              <Route
                exact
                path="/prescriptionNavigate"
                component={PrescriptionNavigate}
              />

              <Route exact path="/help" component={Help} />
              <Route
                exact
                path="/general-terms-conditions"
                component={TermsConditions}
              />
              <Route exact path="/packmixfeedingwetdry" component={Packfeed} />
              <Route
                exact
                path="/termsandconditions"
                component={TermsConditions}
              />
              <Route
                exact
                path="/FAQ/:catogery"
                render={(props) => (
                  <FAQ key={props.match.params.catogery} {...props} />
                )}
              />
              <Route
                exact
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
                  if (process.env.REACT_APP_LANG === 'fr') {
                    return (
                      <Recommendation_FR
                        key={props.match.params.id}
                        {...props}
                      />
                    );
                  } else {
                    return (
                      <Recommendation key={props.match.params.id} {...props} />
                    );
                  }
                }}
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
                path="/account/shippingAddress"
                exact
                component={AccountShippingAddress}
              />
              <Route
                path="/account/paymentMethod"
                exact
                component={AccountPaymentMethod}
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

              <Route
                path="/account/shippingAddress/create"
                exact
                component={AccountShippingAddressForm}
              />
              <Route
                path="/account/paymentMethod/create"
                exact
                component={AccountPaymentMethodForm}
              />

              <Route
                path="/account/shippingAddress/:addressId"
                exact
                component={AccountShippingAddressForm}
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
                path="/subscription-landing-de"
                exact
                component={DE_SubscriptionLanding}
              />
              <Route
                path="/subscription-landing"
                exact
                component={SubscriptionLanding}
              />
              <Route
                path="/subscription-landing-us"
                exact
                component={US_SubscriptionLanding}
              />
              <Route
                path="/subscription-landing-ru"
                exact
                component={RU_SubscriptionLanding}
              />
              <Route
                path="/subscription-landing-tr"
                exact
                component={TR_SubscriptionLanding}
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
                  process.env.REACT_APP_LANG == 'de' ? AboutUsDe : AboutUs
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
                path="/promotion-refuge.html"
                component={PromotionRefuge}
              />
              <Route path="/values-ru" exact component={RU_Values} />
              <Route path="/values" exact component={FR_Values} />
              <Route
                path="/Tailorednutrition"
                exact
                component={Tailorednutrition}
              />
              <Route path="/Quality-safety" exact component={QualitySafety} />
              <Route
                path="/shipmentConditions"
                exact
                component={ShipmentConditions}
              />
              <Route exact path="/forgetPassword" component={ForgetPassword} />
              <Route path="/403" component={Page403} />
              <Route path="/500" component={Page500} />

              <Route path="/consent1-tr" component={Consent1TR} />
              <Route path="/consent2-tr" component={Consent2TR} />
              <Route path="/register" component={register} />
              {/* 特殊处理匹配PLP/PDP页面 */}
              <Route
                exact
                path="/list/:category/:keywords"
                render={(props) => (
                  <List
                    key={
                      props.match.params.category + props.match.params.keywords
                    }
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/on/demandware.store/Sites-FR-Site/fr_FR/Search-Show"
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
              
              <Route
                path="/"
                render={(props) => {
                  const { location } = props;
                  //为了匹配/refuge108785 这种数字动态的短链接
                  if(/^\/refuge/.test(location.pathname)) return <RefugeSource key={Math.random()} {...props}/>

                  //为了匹配/boxer01，boxer02等
                  if(/^\/boxer/.test(location.pathname)) return <ListSource key={Math.random()} {...props}/>
                  //为了匹配/bulldog01，bulldog02等
                  if(/^\/bulldog/.test(location.pathname)) return <ListSource key={Math.random()} {...props}/>
                  //为了匹配chihuahua01,chihuahua02等
                  if(/^\/chihuahua/.test(location.pathname)) return <ListSource key={Math.random()} {...props}/>
                  //为了匹配bergerallemand01，bergerallemand02等
                  if(/^\/bergerallemand/.test(location.pathname)) return <ListSource key={Math.random()} {...props}/>
                  //为了匹配golden01，golden02等
                  if(/^\/golden/.test(location.pathname)) return <ListSource key={Math.random()} {...props}/>
                  //为了匹配labrador01，labrador02等
                  if(/^\/labrador/.test(location.pathname)) return <ListSource key={Math.random()} {...props}/>

                  if(/^\/shihtzu/.test(location.pathname)) return <ListSource key={Math.random()} {...props}/>

                  if(/^\/yorkshire/.test(location.pathname)) return <ListSource key={Math.random()} {...props}/>

                  if(/^\/british/.test(location.pathname)) return <ListSource key={Math.random()} {...props}/>

                  if(/^\/mainecoon/.test(location.pathname)) return <ListSource key={Math.random()} {...props}/>

                  if(/^\/persan/.test(location.pathname)) return <ListSource key={Math.random()} {...props}/>

                  // 只有一级路由(/)且存在-的，匹配(details - /mini-dental-care-1221)，否则不匹配(list - /cats /dog-size/x-small)
                  if (/^(?!.*(\/).*\1).+[-].+$/.test(location.pathname)) {
                    return <Details key={props.match.params.id} {...props} />;
                  } else {
                    return (
                      <List
                        key={
                          props.match.params.category + props.location.search
                        }
                        {...props}
                      />
                    );
                  }
                }}
              />
            </Switch>
          </Security>
        </ScrollToTop>
      </Router>
    </IntlProvider>
  </Provider>
);
export default App;
