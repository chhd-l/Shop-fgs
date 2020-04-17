import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import ScrollToTop from '@/components/ScrollToTop';
import Home from '@/views/Home';
import List from '@/views/List';
import Details from '@/views/Details';
import Buy from '@/views/Buy';
import Cart from '@/views/Cart'


const BasicRoute = () => (
  <HashRouter>
    <ScrollToTop>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/list/:type"
          render={(props) => <List key={props.match.params.type} {...props} />}
        />
        <Route
          exact
          path="/details/:id"
          render={(props) => <Details key={props.match.params.id} {...props} />} />
        <Route exact path="/buy" component={Buy} />
        <Route exact path="/cart" component={Cart} />
      </Switch>
    </ScrollToTop>
  </HashRouter>
);


export default BasicRoute;