import React from 'react';
import { GTMID, GTM_SITE_ID } from "@/utils/constant"
import { inject } from 'mobx-react'

@inject("loginStore")
class GoogleTagManager extends React.Component {
  componentDidMount () {
    const event = {
      page: {
        type: '',
        theme: ''
      },
      site: {
        id: GTM_SITE_ID,
        environment: process.env.REACT_APP_ENV,
        country: 'MX'
      }
    }
    let userInfo = this.props.loginStore.userInfo
    if (userInfo) {
      event.user = {
        id: userInfo.customerId,
        country: 'MX',
        locale: userInfo.city, // "es-MX"
        accountType: 'test'
      }
    }
    let additionalEvents = Object.assign({}, event, this.props.additionalEvents)

    loadJS(`window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(${JSON.stringify(additionalEvents)});`, function () { })
    if (this.props.ecommerceEvents) {
      loadJS(`window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(${JSON.stringify(this.props.ecommerceEvents)});`, function () { })
    }
    loadJS(`(function(w,d,s,l,i){w[l] = w[l] || [];
      w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js', });
      var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
      j.async=true;j.src='//www.googletagmanager.com/gtm.js?id='+i+dl
      ;
      f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','${GTMID}');`, function () { }, 'optanon-category-2', 'text/plain')
  }
  render () {
    return (<React.Fragment />)
  }
}

function loadJS (code, callback, className, type) {
  var script = document.createElement("script"),
    fn = callback || function () { };
  if (className) {
    script.className = className
  }
  if (type) {
    script.type = type
  } else {
    script.type = "text/javascript";
  }
  script.innerHTML = code
  //IE
  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState == "loaded" || script.readyState == "complete") {
        script.onreadystatechange = null;
        fn();
      }
    };
  } else {
    //其他浏览器
    script.onload = function () {
      fn();
    };
  }
  document.getElementsByTagName("head")[0].appendChild(script);
}

export default GoogleTagManager;