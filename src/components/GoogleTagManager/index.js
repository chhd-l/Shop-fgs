import React from 'react';
import { inject, observer } from 'mobx-react';
import { loadJS, filterObjectValueDeep } from '@/utils/utils';
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
    return <React.Fragment />;
  }

  componentDidMount() {
    // REACT_APP_HUB_GA是hub(土耳其，法国，俄罗斯)和美国专用的
    const { page = {}, pet = {}, search = {} } = this.props.additionalEvents;
    const commonSite = {
      country: window.__.env.REACT_APP_GA_COUNTRY,
      environment: window.__.env.REACT_APP_GA_ENV,
      id: window.__.env.REACT_APP_GTM_SITE_ID
    };
    let event = {
      page: {},
      site: {
        ...commonSite,
        currency: window.__.env.REACT_APP_GA_CURRENCY_CODE
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
        ...commonSite
      },
      page: {
        type: page?.type || '',
        theme: page?.theme || '',
        globalURI: page?.path || ''
      },
      search,
      pet: {
        specieID: pet?.specieId || '',
        breedName: pet?.breedName || ''
      }
    };

    let userInfo = this.props.loginStore.userInfo;

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
        country: window.__.env.REACT_APP_GA_COUNTRY,
        id: userInfo.customerId
      };
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
        country: window.__.env.REACT_APP_GA_COUNTRY,
        id: ''
      };
    }
    event.user.country = window.__.env.REACT_APP_GA_COUNTRY;

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

    let hubGA = window.__.env.REACT_APP_HUB_GA == '1';
    let addEvents = hubGA ? hubAdditionalEvents : additionalEvents;
    let { ecommerceEvents = {}, hubEcommerceEvents = {} } = this.props;
    let ecEvents = hubGA ? hubEcommerceEvents : ecommerceEvents;

    loadJS({
      code: `window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(${JSON.stringify(filterObjectValueDeep(addEvents))});`
    });

    if (
      Object.keys(ecommerceEvents).length > 0 ||
      Object.keys(hubEcommerceEvents).length > 0
    ) {
      loadJS({
        code: `window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(${JSON.stringify(
        filterObjectValueDeep(ecEvents)
      )});`
      });
    }

    loadJS({
      url: `https://rcdfcdn.mars.com/consent-management/global-script.js`,
      id: 'global-script'
    });

    loadJS({
      url: `https://www.googleoptimize.com/optimize.js?id=OPT-K6SFSDH`,
      type: 'text/plain',
      className: 'optanon-category-2'
    });

    //   if (!hubGA) {
    //     loadJS({
    //       code: `(function(w,d,s,l,i){w[l] = w[l] || [];
    //     w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js', });
    //     var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
    //     j.async=true;j.src='//www.googletagmanager.com/gtm.js?id='+i+dl
    //     ;
    //     f.parentNode.insertBefore(j,f);
    // })(window,document,'script','dataLayer','${window.__.env.REACT_APP_GA_GTMID}');`,
    //       className: 'optanon-category-2',
    //       type: 'text/plain'
    //     });
    //   }
  }
}

export default GoogleTagManager;
