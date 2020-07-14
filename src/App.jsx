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

import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { Container } from 'semantic-ui-react';
import config from './config';

import '@/assets/css/global.css'
import en_US from '@/lang/en_US'
import es_ES from '@/lang/es_ES'
import ru_RU from '@/lang/ru_RU'
import { IntlProvider } from 'react-intl';
import { Provider } from "mobx-react"
import stores from './store';
import store from 'storejs'

import ScrollToTop from "@/components/ScrollToTop";
import RouteFilter from "@/components/RouteFilter";
import Home from "@/views/Home";
import List from "@/views/List";
import Login from "@/views/Login";
import Details from "@/views/Details";
import Cart from "@/views/Cart";
import Payment from "@/views/Payment";
import Confirmation from "@/views/Confirmation";
import Prescription from "@/views/Prescription";
import Exception from "@/views/Exception";
import Help from "@/views/Help";
import FAQ from "@/views/FAQ";
import TermUse from "@/views/TermUse";
import PrivacyPolicy from "@/views/PrivacyPolicy";
import AccountHome from "@/views/Account/Home";
import AccountProfile from "@/views/Account/Profile";
import AccountPets from "@/views/Account/Pet";
import AccountOrders from "@/views/Account/Orders";
import AccountOrdersDetail from "@/views/Account/OrdersDetail";
import AccountOrdersAfterSale from "@/views/Account/OrdersAfterSale";
import AccountOrdersAfterSaleSuccess from "@/views/Account/OrdersAfterSaleSuccess";
import AccountOrdersAfterSaleDetail from "@/views/Account/OrdersAfterSaleDetail";
import AccountPaymentMethod from "@/views/Account/PaymentMethod"
import AccountSubscription from "@/views/Account/Subscription"
import AccountSubscriptionDetail from "@/views/Account/SubscriptionDetail"
import AccountPaymentMethodForm from "@/views/Account/CreditCardForm"
import AccountPetForm from "@/views/Account/PetForm";
import AccountPetList from "@/views/Account/PetList";
import ProductReview from '@/views/Account/ProductReview'
import AccountShippingAddress from "@/views/Account/ShippingAddress";
// import AccountRefunds from "@/views/Account/Refunds";
import AccountShippingAddressForm from "@/views/Account/ShippingAddressForm";

import AccountReturnOrder from "@/views/Account/ReturnOrder";
import ForgetPassword from "@/views/ForgetPassword";

const token = localStorage.getItem('rc-token')

const langMap = {
  en: en_US,
  es: es_ES,
  ru: ru_RU
}
const DEFAULT_LANGUAGE = 'es'
store.set('lang', 'en') // todo delete...
const localLang = store.get('lang')
let defaultLang = langMap[localLang] ? localLang : DEFAULT_LANGUAGE
let defaultLangFile = langMap[localLang] || es_ES

async function getCountryByIp () {
  let response = await fetch('https://ipapi.co/json/');
  let data = response.json();
  data.then(res => {
    const tmpCountry = res.country.toLowerCase()
    let tmpdefaultLang = langMap[tmpCountry] ? tmpCountry : DEFAULT_LANGUAGE
    if (defaultLang !== tmpdefaultLang) {
      window.location.reload()
      store.set('lang', tmpdefaultLang)
    }
  })
}

// getCountryByIp() // todo release...

const App = () => (
  <Provider {...stores}>
    <IntlProvider locale={defaultLang} messages={defaultLangFile}>
      <Router path="/">
        <RouteFilter />
        <ScrollToTop>
          <Switch>
            <Security {...config.oidc}>
              <Route path="/" exact component={Home} />
              <Route path="/implicit/callback" component={LoginCallback} />
              {/* <Route exact path="/login" component={Login} /> */}
              <Route exact path="/login" render={props => (token ? <Redirect to="/account" /> : <Login {...props} />)} />

              <Route
                exact
                path="/list/:category"
                render={(props) => (
                  <List key={props.match.params.category} {...props} />
                )}
              />
              <Route
                exact
                path="/list/:category/:keywords"
                render={(props) => (
                  <List
                    key={props.match.params.category + props.match.params.keywords}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/details/:id"
                render={(props) => <Details key={props.match.params.id} {...props} />}
              />
              <Route exact path="/cart" component={Cart} />
              <Route
                exact
                path="/payment/:type"
                render={(props) => (
                  <Payment key={props.match.params.type} {...props} />
                )}
              />
              <Route exact path="/confirmation" component={Confirmation} />
              <Route exact path="/prescription" component={Prescription} />
              <Route exact path="/help" component={Help} />
              <Route exact path="/FAQ" component={FAQ} />
              <Route exact path="/termuse" component={TermUse} />
              <Route exact path="/privacypolicy" component={PrivacyPolicy} />


              <Route path='/account' exact component={AccountHome} />
              <Route path='/account/information' exact component={AccountProfile} />
              <Route path='/account/pets' exact component={AccountPets} />
              <Route path='/account/orders' exact component={AccountOrders} />
              <Route path='/account/orders-detail/:orderNumber' exact component={AccountOrdersDetail} />
              <Route path='/account/pets/petForm' exact component={AccountPetForm} />
              <Route path='/account/pets/petList' exact component={AccountPetList} />
              <Route path='/account/shippingAddress' exact component={AccountShippingAddress} />
              <Route path='/account/paymentMethod' exact component={AccountPaymentMethod} />
              <Route path='/account/return-order' exact component={AccountReturnOrder} />
              <Route path='/account' exact render={() => (token ? <AccountHome></AccountHome> : <Redirect to='/' />)} />
              <Route path='/account/information' exact component={AccountProfile} />
              <Route path='/account/pets' exact component={AccountPets} />
              <Route path='/account/orders' exact component={AccountOrders} />
              <Route path='/account/orders-detail/:orderNumber' exact component={AccountOrdersDetail} />
              <Route path='/account/pets/petForm' exact component={AccountPetForm} />
              <Route path='/account/pets/petList' exact component={AccountPetList} />
              <Route path='/account/shippingAddress' exact component={AccountShippingAddress} />
              <Route path='/account/paymentMethod' exact component={AccountPaymentMethod} />
              <Route path='/account/subscription' exact component={AccountSubscription} />
              <Route path='/account/subscription-detail/:subscriptionNumber' exact component={AccountSubscriptionDetail} />
              <Route path='/account/return-order' exact component={AccountReturnOrder} />
              <Route path='/account/orders-aftersale/:orderNumber' exact component={AccountOrdersAfterSale} />
              <Route path='/account/orders-aftersale/success/:returnNumber' exact component={AccountOrdersAfterSaleSuccess} />
              <Route path='/account/return-order-detail/:returnNumber' exact component={AccountOrdersAfterSaleDetail} />
              <Route path='/account/productReview/:tid' exact component={ProductReview} />

              <Route path='/account/shippingAddress/create' exact component={AccountShippingAddressForm} />
              <Route path='/account/paymentMethod/create' exact component={AccountPaymentMethodForm} />

              <Route path='/account/shippingAddress/:addressId' exact component={AccountShippingAddressForm} />
              <Route exact path="/forgetPassword" component={ForgetPassword} />

              {/* <Route exact component={Exception} /> */}
            </Security>

          </Switch>
        </ScrollToTop>
      </Router>
    </IntlProvider>
  </Provider>
);
export default App;
