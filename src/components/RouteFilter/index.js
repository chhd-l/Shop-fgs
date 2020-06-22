import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { queryStoreCateIds } from "@/utils/utils";

class RouteFilter extends Component {
  shouldComponentUpdate (nextProps) {
    if (
      nextProps.location.pathname === "/prescription" &&
      sessionStorage.getItem("rc-clinics-id") &&
      sessionStorage.getItem("rc-clinics-name")
    ) {
      this.props.history.push("/payment/shipping");
    }

    // 切换路由时，刷新下页面，解决外部组件无法初始化问题
    if (this.props.location !== nextProps.location) {
      // window.location.reload();
      return false;
    }
  }
  async componentDidMount () {
    console.log(window.location.href, 'href')
    if(window.location.href.indexOf('/#/') !== -1) {
      window.location.href = window.location.href.split('/#/').join('/')
    }
    if (this.props.location.pathname === "/payment/payment") {
      loadJS(
        "https://js.paymentsos.com/v2/latest/secure-fields.min.js",
        function () {
          // window.POS.setPublicKey("fd931719-5733-4b77-b146-2fd22f9ad2e3");
          // window.POS.setPublicKey("e13025c1-e45e-4ead-a18b-782efcee5250");
          let key, env
          if (process.env.NODE_ENV === 'development') {
            key = 'fd931719-5733-4b77-b146-2fd22f9ad2e3'
            env = 'test'
          } else if (process.env.NODE_ENV === 'production') {
            key = process.env.REACT_APP_PaymentKEY
            env = process.env.REACT_APP_PaymentENV
          }
          window.POS.setPublicKey(key)
          window.POS.setEnvironment(env);
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
    }
    if (this.props.location.pathname !== "/login") {
      let tmpSrc = process.env.REACT_APP_ONTRUST_SRC
      loadJS(tmpSrc, function () { })
    }
    if (this.props.location.pathname === "/confirmation" && !localStorage.getItem('orderNumber')) {
      this.props.history.push("/");
    }

    if (!localStorage.getItem('rc-token') && this.props.location.pathname.indexOf("/account") !== -1) {
      this.props.history.push("/");
    }
    queryStoreCateIds();
  }
  render () {
    return <React.Fragment />;
  }
}

function loadJS (url, callback) {
  var script = document.createElement("script"),
    fn = callback || function () { };
  script.type = "text/javascript";
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
