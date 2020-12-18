import React from 'react';
import { inject, observer } from 'mobx-react';
import { loadJS } from '@/utils/utils';
import { sha256 } from 'js-sha256';

@inject('loginStore')
@observer
class GoogleTagManager extends React.Component {
  static defaultProps = {
    searchEvents: {
      search: {
        query: '',
        results: '',
        type: ''
      }
    }
  };
  componentDidMount() {
    const event = {
      page: {
        type: '',
        theme: ''
      },
      site: {
        id: process.env.REACT_APP_GTM_SITE_ID,
        environment: process.env.REACT_APP_GA_ENV,
        country: process.env.REACT_APP_GA_COUNTRY,
        currency: process.env.REACT_APP_GA_CURRENCY_CODE
      }
    };
    let userInfo = this.props.loginStore.userInfo;

    if (userInfo) {
      event.user = {
        authentificationStatus: this.props.loginStore.isLogin?'authenticated':'not authenticated',
        frequency: 'prospect',
        email: sha256(userInfo.email),
        id: userInfo.customerId,
        country: process.env.REACT_APP_GA_COUNTRY,
        locale: userInfo.city, // "es-MX"
        accountType: 'test'
      };
    }

    let additionalEvents = Object.assign(
      {},
      event,
      this.props.additionalEvents
      //this.props.searchEvents
    );

    loadJS({
      code: `window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(${JSON.stringify(additionalEvents)});`
    });

    if (this.props.ecommerceEvents) {
      loadJS({
        code: `window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(${JSON.stringify(this.props.ecommerceEvents)});`
      });
    }

    loadJS({
      code: `(function(w,d,s,l,i){w[l] = w[l] || [];
      w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js', });
      var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
      j.async=true;j.src='//www.googletagmanager.com/gtm.js?id='+i+dl
      ;
      f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','${process.env.REACT_APP_GA_GTMID}');`,
      className: 'optanon-category-2',
      type: 'text/plain'
    });
  }
  render() {
    return <React.Fragment />;
  }
}

export default GoogleTagManager;
