import React from 'react';
import { inject, observer } from 'mobx-react';
import UnloginCart from './modules/unLoginCart';
import LoginCart from './modules/loginCart';
import './index.css';
import { setSeoConfig } from '@/utils/utils';
import { Helmet } from 'react-helmet';

const localItemRoyal = window.__.localItemRoyal;
const pageLink = window.location.href

@inject('loginStore', 'configStore')
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
    }
  }
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  componentDidMount() {
    setSeoConfig().then(res => {
      this.setState({seoConfig: res})
    });
    // if (localItemRoyal.get('isRefresh')) {
    //   localItemRoyal.remove('isRefresh');
    //   window.location.reload();
    //   return false;
    // }
  }
  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  render() {
    const { configStore, history, match } = this.props;
    return (
      <>
        <Helmet>
        <link rel="canonical" href={pageLink} />
            <title>{this.state.seoConfig.title}</title>
            <meta name="description" content={this.state.seoConfig.metaDescription}/>
            <meta name="keywords" content={this.state.seoConfig.metaKeywords}/>
        </Helmet>
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
