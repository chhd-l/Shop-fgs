import React from 'react';
import gtmParts from 'react-google-tag-manager';
import { GTMID } from "@/utils/constant"

class GoogleTagManager extends React.Component {
  componentDidMount () {
    const dataLayerName = this.props.dataLayerName || 'dataLayer';
    const scriptId = this.props.scriptId || 'react-google-tag-manager-gtm';

    if (!window[dataLayerName]) {
      const gtmScriptNode = document.getElementById(scriptId);

      eval(gtmScriptNode.textContent);
    }
  }

  render () {
    const event = {
      "page": {
        "type": "",
        "hitTimestamp": new Date().toISOString(),
        "theme": ""
      },
      "site": {
        "id": "RCMXPCO1",
        "environment": "uat", // prd
        "country": "FR"
      }
    }
    let userInfo = sessionStorage.getItem("rc-userinfo")
    if (userInfo) {
      userInfo = JSON.parse(userInfo)
      event.user = {
        "id": userInfo.customerId,
        "country": "MX",
        "locale": userInfo.city, // "es-MX"
        "accountType": "test"
      }
    }
    let additionalEvents = Object.assign({}, event, this.props.additionalEvents)

    const gtm = gtmParts({
      id: this.props.gtmId || GTMID,
      dataLayerName: this.props.dataLayerName || 'dataLayer',
      additionalEvents,
      previewVariables: this.props.previewVariables || false,
    });

    return (
      <div>
        <div>{gtm.noScriptAsReact()}</div>
        <div id={this.props.scriptId || 'react-google-tag-manager-gtm'}>
          {gtm.scriptAsReact()}
        </div>
      </div>
    );
  }
}

export default GoogleTagManager;