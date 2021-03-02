import React from 'react';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import UnloginCart from './modules/unLoginCart';
import LoginCart from './modules/loginCart';
import './index.css';
import { setSeoConfig } from '@/utils/utils';
import {doGetGAVal} from "@/utils/GA"
import GoogleTagManager from '@/components/GoogleTagManager';
import { Helmet } from 'react-helmet';

const localItemRoyal = window.__.localItemRoyal;
const pageLink = window.location.href

const isHubGA = process.env.REACT_APP_HUB_GA

@inject('loginStore', 'configStore', 'checkoutStore')
@observer
class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seoConfig: {
        title: '',
        metaKeywords: '',
        metaDescription: ''
      },
      pet: {}
    }
  }
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  componentWillMount(){
    isHubGA&&this.getPetVal()
  }
  componentDidMount() {
    setSeoConfig().then(res => {
      this.setState({ seoConfig: res })
    });
  }
  getPetVal() {
    let obj = doGetGAVal(this.props)
    this.setState({pet:obj})
  }
  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  render() {
    const { configStore, history, match } = this.props;
    const event = {
      page: {
        type: 'Cart',
        theme: '',
        path: history.location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: '',
      },
      pet: this.state.pet
    };

    return (
      <>
        <Helmet>
          <link rel="canonical" href={pageLink} />
          <title>{this.state.seoConfig.title}</title>
          <meta name="description" content={this.state.seoConfig.metaDescription} />
          <meta name="keywords" content={this.state.seoConfig.metaKeywords} />
        </Helmet>
        <GoogleTagManager additionalEvents={event}/>
        {this.isLogin ? (
          <LoginCart
            history={history}
            match={match}
            configStore={configStore}
          />
        ) : (
            <UnloginCart
              history={history}
              match={match}
              configStore={configStore}
            />
          )}
      </>
    );
  }
}

export default Cart;
