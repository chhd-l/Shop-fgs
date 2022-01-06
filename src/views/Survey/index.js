import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { loadJS } from '@/utils/utils';

const surveyUrlMap = {
  'delivery-experience': {
    ru: 'https://surveys.hotjar.com/bc3cfd25-fd13-4a33-8e9c-232c0e74f60a',
    tr: 'https://surveys.hotjar.com/0194608e-4a9a-4d5c-b535-af60969562dc',
    fr: 'https://surveys.hotjar.com/04118bde-7dba-420b-b3df-e4d4eea51198'
  },
  'delivery-experience-club': {
    ru: 'https://surveys.hotjar.com/459cac78-8f80-4d0f-99db-ae943bbc150b',
    tr: 'https://surveys.hotjar.com/f67d748f-792e-4e72-bf70-8767e8278ccb',
    fr: 'https://surveys.hotjar.com/04fc5696-903a-4251-b2d0-c178861d9023'
  },
  nps: {
    ru: 'https://surveys.hotjar.com/f216525f-fb37-4b7b-b68e-7757922ee251',
    tr: 'https://surveys.hotjar.com/e65ee6c5-1c4a-4e39-8901-f8a3c142d4f7',
    fr: 'https://surveys.hotjar.com/67b8033f-d5bf-4387-9d2f-2ae0836b86f5'
  },
  'nps-club': {
    ru: 'https://surveys.hotjar.com/17cba08d-ef1c-4125-b714-3b5bf9e52e3e',
    tr: 'https://surveys.hotjar.com/c3e123d2-7e39-49f4-9ce2-b46f5ad67417',
    fr: 'https://surveys.hotjar.com/37d60370-2aa8-42c2-85a1-be1cf104c3de'
  },
  'unsubscription-feedback': {
    ru: 'https://surveys.hotjar.com/825b5572-21fe-48f7-a1ec-b2c71e5dd2b2',
    tr: 'https://surveys.hotjar.com/9108b833-541b-458f-ad7d-b44459f9c9c0',
    fr: 'https://surveys.hotjar.com/8f69c40d-0863-45dc-9d14-05b3fd801868'
  }
};

export default class Survey extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const surveyId = this.props.match.params?.id ?? '0';
    // const surveyUrl = surveyUrlMap[surveyId]
    //   ? surveyUrlMap[surveyId][window.__.env.REACT_APP_COUNTRY] ?? ''
    //   : '';

    // return (
    //   <div>
    //     <Header {...this.props} showMiniIcons={false} showUserIcon={false} />
    //     <div style={{ height: 650, marginTop: 150 }}>
    //       {/* <iframe
    //         src={surveyUrl}
    //         frameBorder="0"
    //         style={{ width: '100%', height: 650 }}
    //       ></iframe> */}
    //     </div>
    //     <Footer />
    //   </div>
    // );

    const countryCode = window.__.env.REACT_APP_COUNTRY;
    let productFinderUrl = `${window.origin}/${countryCode}/product-finder`;
    if (['de', 'us', 'mx'].indexOf(countryCode) > -1) {
      productFinderUrl = `${window.origin}/product-finder`;
    } else if (window.__.env.REACT_APP_HUB_URLPREFIX) {
      productFinderUrl = `${window.__.env.REACT_APP_HUB_URLPREFIX}/product-finder`;
    }

    return (
      <div>
        <iframe
          src={productFinderUrl}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            left: '0px',
            top: '0px'
          }}
          frameBorder="0"
        />
      </div>
    );
  }

  componentDidMount() {
    loadJS({
      code: `(function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:2617415,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`
    });
  }
}
