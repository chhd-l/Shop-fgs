import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
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
import AccountPaymentMethod from "@/views/Account/PaymentMethod"
import AccountOrders from "@/views/Account/Orders";
import AccountOrdersDetail from "@/views/Account/OrdersDetail";
import AccountOrdersAfterSale from "@/views/Account/OrdersAfterSale";
import AccountOrdersAfterSaleSuccess from "@/views/Account/OrdersAfterSaleSuccess";
import AccountOrdersAfterSaleDetail from "@/views/Account/OrdersAfterSaleDetail";
import AccountPetForm from "@/views/Account/PetForm";
import AccountPetList from "@/views/Account/PetList";
import AccountShippingAddress from "@/views/Account/ShippingAddress";
import AccountShippingAddressForm from "@/views/Account/ShippingAddressForm";
import AccountRefunds from "@/views/Account/Refunds";
import AccountReturnOrder from "@/views/Account/ReturnOrder";

import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { Container } from 'semantic-ui-react';
import config from './config';

const token = sessionStorage.getItem('rc-token')

const BasicRoute = () => (
  <HashRouter>
    <RouteFilter />
    <ScrollToTop>
      <Security {...config.oidc}>
        <Container text style={{ marginTop: '7em' }}>
          <Route path="/" exact component={Home} />
          <Route path="/implicit/callback" component={LoginCallback} />
        </Container>
      </Security>
      <Switch>
        {/* <Route exact path="/" component={Home} /> */}
        <Route exact path="/login" component={Login} />
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
        <Route path='/account' exact render={()=>(token ? <AccountHome></AccountHome> : <Redirect to= '/'/>) } />
        <Route path='/account' exact component={AccountHome} />
        <Route path='/account/information' exact component={AccountProfile} />
        <Route path='/account/pets' exact component={AccountPets} />
        <Route path='/account/orders' exact component={AccountOrders} />
        <Route path='/account/orders-detail/:orderNumber' component={AccountOrdersDetail} />
        <Route path='/account/pets/petForm' exact component={AccountPetForm} />
        <Route path='/account/pets/petList' exact component={AccountPetList} />
        <Route path='/account/shippingAddress' exact component={AccountShippingAddress} />
        <Route path='/account/paymentMethod' exact component={AccountPaymentMethod} />
        <Route path='/account/shippingAddress/create' exact component={AccountShippingAddressForm} />
        <Route path='/account/shippingAddress/:addressId' exact component={AccountShippingAddressForm} />
        
        <Route path='/account/refunds' exact component={AccountRefunds} />
        <Route path='/account/return-order' exact component={AccountReturnOrder} />

        <Route path='/account/orders-aftersale/:orderNumber' exact component={AccountOrdersAfterSale} />
        <Route path='/account/orders-aftersale/success/:returnNumber' component={AccountOrdersAfterSaleSuccess} />
        <Route path='/account/return-order-detail/:returnNumber' component={AccountOrdersAfterSaleDetail} />

        <Route component={Exception} />
      </Switch>
    </ScrollToTop>
  </HashRouter>
);

export default BasicRoute;
