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
import AccountOrders from "@/views/Account/Orders";
import AccountOrdersDetail from "@/views/Account/OrdersDetail";


const BasicRoute = () => (
  <HashRouter>
    <RouteFilter />
    <ScrollToTop>
      <Switch>
        <Route exact path="/" component={Home} />
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

        <Route path='/account' exact component={AccountHome} />
        <Route path='/account/information' component={AccountProfile} />
        <Route path='/account/orders' exact component={AccountOrders} />
        <Route path='/account/orders/detail/:orderNumber' component={AccountOrdersDetail} />

        <Route component={Exception} />
      </Switch>
    </ScrollToTop>
  </HashRouter>
);

export default BasicRoute;
