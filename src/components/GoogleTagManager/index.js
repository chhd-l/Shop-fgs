import React from 'react';
import ReactDOM from 'react-dom';
import gtmParts from 'react-google-tag-manager';
import { GTMID, GTM_SITE_ID } from "@/utils/constant"

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
    let userInfo = sessionStorage.getItem("rc-userinfo")
    if (userInfo) {
      userInfo = JSON.parse(userInfo)
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
    loadJS(`window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(${JSON.stringify(this.props.ecommerceEvents || {})});`, function () { })
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
  render2 () {
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
    let userInfo = sessionStorage.getItem("rc-userinfo")
    if (userInfo) {
      userInfo = JSON.parse(userInfo)
      event.user = {
        id: userInfo.customerId,
        country: 'MX',
        locale: userInfo.city, // "es-MX"
        accountType: 'test'
      }
    }
    let additionalEvents = Object.assign({}, event, this.props.additionalEvents)
    return (
      <>
        <script dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
          window.dataLayer.push(${JSON.stringify(additionalEvents)});`
        }}>
        </script>
        {
          this.props.ecommerceEvents && <script dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
            window.dataLayer.push(${JSON.stringify(this.props.ecommerceEvents)});`
          }}>
          </script>
        }

        <script type="text/plain" className="optanon-category-2" dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l] = w[l] || [];
            w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js', });
            var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;j.src='//www.googletagmanager.com/gtm.js?id='+i+dl
            ;
            f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTMID}');`
        }}>
        </script>
      </>
    );
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