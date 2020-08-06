import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { queryStoreCateIds } from "@/utils/utils";
import store from 'storejs'
import { getConfig } from '@/api/user'

class RouteFilter extends Component {
  shouldComponentUpdate (nextProps) {
    if (nextProps.location.pathname === "/prescription" && sessionStorage.getItem('clinic-reselect') === "true") {
      return false
    }

    if (nextProps.location.pathname === "/prescription"
      && ((store.get("rc-clinic-id-link") && store.get("rc-clinic-name-link"))
        || (store.get("rc-clinic-id-select") && store.get("rc-clinic-name-select"))
        || (store.get("rc-clinic-id-default") && store.get("rc-clinic-name-default")))) {
      this.props.history.replace("/payment/payment");
      return false
    }

    if (!localStorage.getItem('rc-token') && nextProps.location.pathname.indexOf("/account") !== -1) {
      this.props.history.push("/");
      return false
    }
    return true
  }
  async componentDidMount () {
    if (!localStorage.getItem('rc-token') && this.props.location.pathname.indexOf("/account") !== -1) {
      this.props.history.push("/");
    }

    getConfig().then(res => {
      sessionStorage.setItem('currency', JSON.stringify(res.context.currency))
    })
    if (window.location.href.indexOf('/#/') !== -1) {
      window.location.href = window.location.href.split('/#/').join('/')
    }
    if (this.props.location.pathname === "/payment/payment") {
      loadJS(
        "https://js.paymentsos.com/v2/latest/secure-fields.min.js",
        function () {
          window.POS.setPublicKey(process.env.REACT_APP_PaymentKEY)
          window.POS.setEnvironment(process.env.REACT_APP_PaymentENV);
          const style = {
            base: {
              secureFields: {
                width: "calc(100% - 45px)",
              },
              pan: {
                display: "inline-block",
                width: "50%",
              },
              expirationDate: {
                display: "inline-block",
                width: "30%",
              },
              cvv: {
                display: "inline-block",
                width: "20%",
              },
            },
          };
          window.POS.setStyle(style);
          window.POS.initSecureFields("card-secure-fields");
          try {
            document
              .getElementById("zoozIframe")
              .setAttribute("scrolling", "no");
          } catch (e) { }
          if (document.getElementById("payment-form")) {
            document
              .getElementById("payment-form")
              .addEventListener("submit", function (event) {
                console.log(document.getElementById("cardholder-name"))
                event.preventDefault();
                const additionalData = {
                  holder_name: document.getElementById("cardholder-name").value, // This field is mandatory
                };
                window.POS.createToken(additionalData, function (result) {
                  console.log(result, "result");
                  // Grab the token here
                  sessionStorage.setItem("payosdata", result);
                });
              });
          }
        }
      );
      loadJS(
        "https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/3.9.5/adyen.js",
      );
    }
    if (this.props.location.pathname !== "/login") {
      loadJS(process.env.REACT_APP_ONTRUST_SRC,
        function () { },
        {
          domainScript: process.env.REACT_APP_ONTRUST_DOMAIN_SCRIPT,
          documentLanguage: 'true'
        })
      if (process.env.REACT_APP_ONTRUST_MARS_FOOTER) {
        loadJS(process.env.REACT_APP_ONTRUST_MARS_FOOTER)
      }
    }
    if (this.props.location.pathname === "/confirmation" && !sessionStorage.getItem('orderNumber')) {
      this.props.history.push("/");
    }

    queryStoreCateIds();
  }
  render () {
    return <React.Fragment />;
  }
}

function loadJS (url, callback, dataSets) {
  var script = document.createElement("script"),
    fn = callback || function () { };
  script.type = "text/javascript";
  script.charset = "UTF-8";

  if (dataSets) {
    for (let key in dataSets) {
      script.dataset[key] = dataSets[key]
    }
  }
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
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

export default withRouter(RouteFilter);
