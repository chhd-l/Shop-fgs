import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import RouteFilter from "@/components/RouteFilter";
import Home from "@/views/Home";
import List from "@/views/List";
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

let enterRoute = () => {
  if (localStorage.getItem("isRefresh")) {
    localStorage.removeItem("isRefresh");
    window.location.reload();
  }
};
let leaveRoute = () => {
  localStorage.setItem("isRefresh", true);
};

const BasicRoute = () => (
  <HashRouter>
    <RouteFilter />
    <ScrollToTop>
      <Switch>
        <Route
          onEnter={enterRoute.bind(this)}
          onLeave={leaveRoute.bind(this)}
          exact
          path="/"
          component={Home}
        />
        <Route
          onEnter={enterRoute.bind(this)}
          onLeave={leaveRoute.bind(this)}
          exact
          path="/list/:category"
          render={(props) => (
            <List key={props.match.params.category} {...props} />
          )}
        />
        <Route
          onEnter={enterRoute.bind(this)}
          onLeave={leaveRoute.bind(this)}
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
          onEnter={enterRoute.bind(this)}
          onLeave={leaveRoute.bind(this)}
          exact
          path="/details/:id"
          render={(props) => <Details key={props.match.params.id} {...props} />}
        />
        <Route exact path="/cart" component={Cart} />
        <Route
          onEnter={enterRoute.bind(this)}
          onLeave={leaveRoute.bind(this)}
          exact
          path="/payment/:type"
          render={(props) => (
            <Payment key={props.match.params.type} {...props} />
          )}
        />
        <Route
          exact
          path="/confirmation"
          onEnter={enterRoute.bind(this)}
          onLeave={leaveRoute.bind(this)}
          component={Confirmation}
        />
        <Route
          exact
          path="/prescription"
          onEnter={enterRoute.bind(this)}
          onLeave={leaveRoute.bind(this)}
          component={Prescription}
        />
        <Route
          exact
          path="/help"
          onEnter={enterRoute.bind(this)}
          onLeave={leaveRoute.bind(this)}
          component={Help}
        />
        <Route
          exact
          path="/FAQ"
          onEnter={enterRoute.bind(this)}
          onLeave={leaveRoute.bind(this)}
          component={FAQ}
        />
        <Route
          exact
          path="/termuse"
          onEnter={enterRoute.bind(this)}
          onLeave={leaveRoute.bind(this)}
          component={TermUse}
        />
        <Route
          exact
          path="/privacypolicy"
          onEnter={enterRoute.bind(this)}
          onLeave={leaveRoute.bind(this)}
          component={PrivacyPolicy}
        />
        <Route
          onEnter={enterRoute.bind(this)}
          onLeave={leaveRoute.bind(this)}
          component={Exception}
        />
      </Switch>
    </ScrollToTop>
  </HashRouter>
);

export default BasicRoute;
