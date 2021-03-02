import React from 'react';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import UnloginCart from './modules/unLoginCart';
import LoginCart from './modules/loginCart';
import './index.css';
import { setSeoConfig } from '@/utils/utils';
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
    let breed = [],
           id = [],
          obj = {
      specieId: [],
      breedName: []
    }
    const { loginStore:{isLogin},checkoutStore: { cartData, loginCartData },configStore } = this.props
    if (isLogin) {
      for (let item of loginCartData) {
        item.goodsAttributesValueRelVOList.filter(item => item.goodsAttributeName == 'breeds').forEach(item2 => {
          breed.push(item2.goodsAttributeValue)
        })
        if (item.cateId == '1134') {
          id.push(1)
        } else {
          id.push(2)
        }
      }
    } else {
      cartData?.[0]?.goodsAttributesValueRelList?.toJS().filter(item => item.goodsAttributeName == 'breeds').forEach(item2 => {
        breed.push(item2.goodsAttributeValue)
        if (item.cateId == '1134') {
          id.push(1)
        } else {
          id.push(2)
        }
      })
    }
    obj.specieId = id
    obj.breedName = breed
    this.setState({pet:obj})
    configStore.setGAPet(obj)

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
