import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from '@/views/Home';
import List from '@/views/List';
import Details from '@/views/Details';
import Buy from '@/views/Buy';
import Cart from '@/views/Cart'


const BasicRoute = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact
        path="/list/:type"
        render={(props) => <List key={props.match.params.type} {...props} />}
      />
      <Route exact path="/details/:id" component={Details} />
      <Route exact path="/buy" component={Buy} />
      <Route exact path="/cart" component={Cart} />
    </Switch>
  </HashRouter>
);


export default BasicRoute;