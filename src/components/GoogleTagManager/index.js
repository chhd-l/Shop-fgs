import React from 'react';
import { inject, observer } from 'mobx-react';
import {
  loadJS,
  filterObjectValueDeep,
  loadNoScriptIframeJS
} from '@/utils/utils';
import { sha256 } from 'js-sha256';
let routerIsChange = false;
const localItemRoyal = window.__.localItemRoyal;
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
  getCookie(name) {
    var arr,
      reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
    else return null;
  }
  componentDidMount() {
    if (routerIsChange) {
      // 第一次进来不执行
      dataLayer.push({
        event: 'routeChange',
        routeChange: {
          path: window?.location?.pathname, //New route pushed into the URL
          type: this.props.additionalEvents?.page?.type //'Product', 'Product Catalogue', 'Product Finder', 'Account', 'Checkout'...
        }
      });
    } else {
      routerIsChange = true;
      this.insertGAScript();
    }
    // 监听点击cookie banner同意按钮后，动态加载GA.js
    // window.addEventListener('click', (e) => {
    //   let currentTargetDom = e.target;
    //   if (currentTargetDom.id === 'onetrust-accept-btn-handler') {
    //     this.insertGAScript();
    //   }
    // });
    // 0211update:数据统计受较大影响 故加载ga不需要同意cookiebanner
    this.handleECEvents();
  }
  handleECEvents() {
    let hubGA = window.__.env.REACT_APP_HUB_GA == '1';
    let { ecommerceEvents = {}, hubEcommerceEvents = {} } = this.props;
    let ecEvents = hubGA ? hubEcommerceEvents : ecommerceEvents;
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
  }
  insertGAScript() {
    // 如果没有同意cookie banner，不允许加载GA.js
    // if (!this.getCookie('OptanonAlertBoxClosed')) {
    //   return null;
    // }
    // REACT_APP_HUB_GA是hub(土耳其，法国，俄罗斯)和美国专用的
    const { page = {}, pet = {}, search = {} } = this.props.additionalEvents;
    const commonSite = {
      country:
        window.__.env.REACT_APP_GA_COUNTRY === 'UK'
          ? 'GB'
          : window.__.env.REACT_APP_GA_COUNTRY,
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
      event: 'dataLayerLoaded', //String : constant
      site: {
        ...commonSite
      },
      page: {
        type: page?.type || '',
        theme: page?.theme || ''
        // globalURI: page?.path || ''
      }
      // search,
      // pet: {
      //   specieID: pet?.specieId || '',
      //   breedName: pet?.breedName || ''
      // }
    };

    let userInfo = this.props.loginStore.userInfo;

    if (userInfo) {
      const oktaId = localItemRoyal.get('customer-okta-id') || '';
      event.user = {
        authentificationStatus: 'authenticated',
        email: userInfo.email && sha256(userInfo.email),
        id: userInfo.customerId,
        locale: userInfo.city,
        frequency: 'returning client',
        accountType: 'internal'
      };

      hubEvent.user = {
        // segment: 'Authenticated',
        country: window.__.env.REACT_APP_GA_COUNTRY,
        id: oktaId
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
        // segment: 'Not Authenticated',
        // country: window.__.env.REACT_APP_GA_COUNTRY,
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

    //  需求修改 327383
    // loadJS({
    //   url: `https://rcdfcdn.mars.com/consent-management/global-script.js`,
    //   id: 'global-script'
    //   integrity:'sha256-KrbjfxO8LEY7xlav+mSqct9TIHSvnq9x/TP2AafGzVw=',
    //   crossOrigin:'anonymous',
    // });

    loadJS({
      url: `https://www.googleoptimize.com/optimize.js?id=OPT-K6SFSDH`,
      type: 'text/plain',
      className: 'optanon-category-2'
      // crossOrigin: 'anonymous',
      // integrity: 'sha256-0XY0ExApFvH21IcndrXDVqbZNC2CJmsCZO06+h/qf4c=' //资源不匹配并被阻止
    });

    // loadJS({
    //   code: `(function(w,d,s,l,i){w[l] = w[l] || [];
    //     w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js', });
    //     var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
    //     j.async=true;j.src='//www.googletagmanager.com/gtm.js?id='+i+dl
    //     ;
    //     f.parentNode.insertBefore(j,f);
    // })(window,document,'script','dataLayer','${window.__.env.REACT_APP_GA_GTMID}');`,
    //   className: 'optanon-category-2',
    //   type: 'text/plain'
    // });
    // loadNoScriptIframeJS({
    //   style:
    //     'width: 100px; height: 100px; border: 0; position: absolute; top: -5000px;',
    //   src: `https://maf.pagosonline.net/ws/fp/tags.js?id=1234480200`
    // });
    loadJS({
      code: `window.dataLayer = window.dataLayer || [];
        window.dataLayer.push(${JSON.stringify(
          filterObjectValueDeep(addEvents)
        )});`
    });

    // ru 的petstory 需要放在ga执行顺序之后，不然会影响到ga的执行顺序问题
    // if (window.__.env.REACT_APP_COUNTRY === 'ru') {
    //   !(function (t) {
    //     (window.PetStoryWC = window.PetStoryWC || {}),
    //       (window.PetStoryWC.id = t.id || 'ps-widget-' + new Date().getTime());
    //     var e = document.createElement('script');
    //     e.setAttribute('type', 'text/javascript'),
    //       e.setAttribute('src', 'https://corp.petstory.ru/wc.js'),
    //       e.setAttribute(
    //         'onload',
    //         '!function({d:t,k:a,r:s}){PetStoryWC&&PetStoryWC.init&&PetStoryWC.init({draw:t,key:a,reinit:s})}({d:false,k:"' +
    //           t.key +
    //           '",r:false});'
    //       ),
    //       document.body.append(e);
    //   })({ key: 'd8ba1b22-18c0-4b5b-82f0-3768899fea64' });
    // }}
  }
}

export default GoogleTagManager;
