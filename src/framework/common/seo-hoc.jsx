import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

const seoHoc = (seoPageName) => {
  return (WrappedComponent) => {
    return class extends Component {
      constructor(props) {
        super(props);
        this.state = {
          seoConfig: {
            title: 'Royal canin',
            metaKeywords: 'Royal canin',
            metaDescription: 'Royal canin'
          }
        };
      }
      componentDidMount() {
        const setSeoConfig = require('@/utils/utils').setSeoConfig;
        setSeoConfig({ pageName: seoPageName }).then((res) => {
          this.setState({ seoConfig: res });
        });
      }
      render() {
        const { seoConfig } = this.state;
        return (
          <>
            <Helmet>
              <title>{seoConfig.title}</title>
              <meta name="description" content={seoConfig.metaDescription} />
              <meta name="keywords" content={seoConfig.metaKeywords} />
            </Helmet>
            <WrappedComponent {...this.props} />
          </>
        );
      }
    };
  };
};

export default seoHoc;
