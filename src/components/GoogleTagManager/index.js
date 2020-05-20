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
      // "user": {
      //   "id": "dffdgf-46fddf45-242ghde45",
      //   "country": "MX",
      //   "locale": "es-MX",
      //   "accountType": "test"
      // },
      "page": {
        "type": "",
        "hitTimestamp": new Date().toISOString(),
        "theme": ""
      },
      "site": {
        "id": "RCMXPCO1",
        "environment": "prd",
        "country": "FR"
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