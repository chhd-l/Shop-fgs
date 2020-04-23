import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import ScrollToTop from '@/components/ScrollToTop';
import RouteFilter from '@/components/RouteFilter';
import loadable from '@/utils/loadable.js';
// import Home from '@/views/Home';
// import List from '@/views/List';
// import Details from '@/views/Details';
// import Cart from '@/views/Cart'
// import Payment from '@/views/Payment'
// import Confirmation from '@/views/Confirmation'
// import Prescription from '@/views/Prescription'
// import Exception from '@/views/Exception'

const Home = loadable(() => import('@/views/Home'))
const List = loadable(() => import('@/views/List'))
const Details = loadable(() => import('@/views/Details'))
const Cart = loadable(() => import('@/views/Cart'))
const Payment = loadable(() => import('@/views/Payment'))
const Confirmation = loadable(() => import('@/views/Confirmation'))
const Prescription = loadable(() => import('@/views/Prescription'))
const Exception = loadable(() => import('@/views/Exception'))

const BasicRoute = () => (
  <HashRouter>
    <RouteFilter />
    <ScrollToTop>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/list/:category"
          render={(props) => <List key={props.match.params.category} {...props} />}
        />
        <Route
          exact
          path="/details/:id"
          render={(props) => <Details key={props.match.params.id} {...props} />} />
        <Route exact path="/cart" component={Cart} />
        <Route
          exact
          path="/payment/:type"
          render={(props) => <Payment key={props.match.params.type} {...props} />} />
        <Route exact path="/confirmation" component={Confirmation} />
        <Route exact path="/prescription" component={Prescription} />
        <Route component={Exception} />
      </Switch>
    </ScrollToTop>
  </HashRouter>
);


export default BasicRoute;