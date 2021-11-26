import React from 'react';
import Header from '@/components/Header';
import { loadJS } from '@/utils/utils';

export default class Survey extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header
          showMiniIcons={false}
          showUserIcon={false}
          location={this.props.location}
          history={this.props.history}
          match={this.props.match}
        />
        <div style={{ height: 1200 }}></div>
      </div>
    );
  }

  componentDidMount() {
    loadJS({
      code: `(function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:2718868,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`
    });
  }
}
