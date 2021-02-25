import React from 'react';
import { inject, observer } from 'mobx-react';
import { loadJS } from '@/utils/utils';
import { sha256 } from 'js-sha256';

@inject('loginStore')
@observer
class GoogleTagManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchEvent: ''
    };
  }
  static getDerivedStateFromProps(props, state) {
    const { searchEvent } = props;
    if (searchEvent !== state.searchEvent) {
      return {
        searchEvent
      };
    }
    return null;
  }
  render() {
    // console.log(this.state.searchEvent)
    // if(Object.keys(this.state.searchEvent).length){
    //   let event = {
    //     page: {

    //     },
    //     site: {
    //       id: process.env.REACT_APP_GTM_SITE_ID,
    //       environment: process.env.REACT_APP_GA_ENV,
    //       country: process.env.REACT_APP_GA_COUNTRY,
    //       currency: process.env.REACT_APP_GA_CURRENCY_CODE
    //     }
    //   };
    //   let userInfo = this.props.loginStore.userInfo;

    //   if (userInfo) {
    //     event.user = {
    //       authentificationStatus: 'authenticated',
    //       email: sha256(userInfo.email),
    //       id: userInfo.customerId,
    //       locale : userInfo.city

    //     };
    //   }else{
    //     event.user = {
    //       authentificationStatus:'not authenticated',
    //       email: '',
    //       id: '',
    //       locale :'',
    //     }
    //   }
    //   event.user.frequency = 'prospect'
    //   event.user.country = process.env.REACT_APP_GA_COUNTRY,
    //   event.user.accountType = 'test'

    //   event.search = this.state.searchEvent.search

    //   console.log(event)

    //   loadJS({
    //     code: `window.dataLayer = window.dataLayer || [];
    //   window.dataLayer.push(${JSON.stringify(event)});`
    //   });

    //   loadJS({
    //     code: `(function(w,d,s,l,i){w[l] = w[l] || [];
    //     w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js', });
    //     var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
    //     j.async=true;j.src='//www.googletagmanager.com/gtm.js?id='+i+dl
    //     ;
    //     f.parentNode.insertBefore(j,f);
    // })(window,document,'script','dataLayer','${process.env.REACT_APP_GA_GTMID}');`,
    //     className: 'optanon-category-2',
    //     type: 'text/plain'
    //   });
    // }

    return <React.Fragment />;
  }

  componentDidMount() {
     // REACT_APP_HUB_GA是hub(土耳其，法国，俄罗斯)和美国专用的
    const {page ={}} = this.props.additionalEvents;
    const commonSite =  {
      country: process.env.REACT_APP_GA_COUNTRY,
      environment: process.env.REACT_APP_GA_ENV,
      id: process.env.REACT_APP_GTM_SITE_ID,
    };
    let event = {
      page: {},
      site: {
        ...commonSite,
        currency: process.env.REACT_APP_GA_CURRENCY_CODE
      },
      search: {
        query: '',
        results: '',
        type: ''
      },
      pet: {
        specieId: '',
        breedId: ''
      },
      checkout: {
        basketAmount: '',
        basketID: '',
        option: '',
        product: ''
      }
    };

    let hubEvent = {
      site: {
        ...commonSite,
      },
      page: {
        type: page?.type || '',
        theme: page?.theme || '',
        globalURI: page?.path || '',
      },
      pet: {
        specieID: page?.specieId || '',
        breedName: ''
      },
    };

    let userInfo = this.props.loginStore.userInfo;
    console.log({userInfo})

    if (userInfo) {
      event.user = {
        authentificationStatus: 'authenticated',
        email: sha256(userInfo.email),
        id: userInfo.customerId,
        locale: userInfo.city,
        frequency: 'returning client',
        accountType: 'internal'
      };

      hubEvent.user = {
        segment: 'Authenticated',
        country: process.env.REACT_APP_GA_COUNTRY,
        id: userInfo.customerId,
      }
    } else {
      event.user = {
        authentificationStatus: 'not authenticated',
        email: '',
        id: '',
        locale: '',
        frequency: 'prospect'
      };

      hubEvent.user = {
        segment: 'Not Authenticated',
        country: process.env.REACT_APP_GA_COUNTRY,
        id: '',
      };
    }
    (event.user.country = process.env.REACT_APP_GA_COUNTRY)

    let additionalEvents = Object.assign(
      {},
      event,
      this.props.additionalEvents
    );

    let hubAdditionalEvents = Object.assign(
      {},
      hubEvent,
      this.props.hubAdditionalEvents
    );

    let hubGA = process.env.REACT_APP_HUB_GA == '1';
    let addEvents = hubGA ? hubAdditionalEvents : additionalEvents;
    let { ecommerceEvents = {}, hubEcommerceEvents = {} } = this.props;
    let ecEvents = hubGA ? hubEcommerceEvents : ecommerceEvents;

    loadJS({
      code: `window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(${JSON.stringify(addEvents)});`
    });

    if (ecommerceEvents || hubEcommerceEvents) {
      loadJS({
        code: `window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(${JSON.stringify(ecEvents)});`
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
}

export default GoogleTagManager;
