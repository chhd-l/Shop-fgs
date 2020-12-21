import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import BreadCrumbs from '@/components/BreadCrumbs';
import { FormattedMessage } from 'react-intl';
import Question from './modules/Question';
import LazyLoad from 'react-lazyload';
import { setSeoConfig } from '@/utils/utils';
import { Helmet } from 'react-helmet';

import catImg from '@/assets/images/product-finder-cat.jpg';
import dogImg from '@/assets/images/product-finder-dog.jpg';
import './index.less';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

class ProductFinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seoConfig: {
        title: '',
        metaKeywords: '',
        metaDescription: ''
      },
      type: '' // cat dog
    };
    this.seletTheType = this.seletTheType.bind(this);
  }
  componentDidMount() {
    const cachedType = localItemRoyal.get(`pf-cache-type`);
    const tmpOrder = sessionItemRoyal.get('pf-edit-order');
    const cachedQuestionData = localItemRoyal.get(
      `pf-cache-${cachedType}-question`
    );

    if (cachedType && (cachedQuestionData || tmpOrder)) {
      this.setState({ type: cachedType });
    }
    setSeoConfig({
      pageName: 'Product finder'
    }).then(res => {
      this.setState({seoConfig: res})
    });
  }
  seletTheType(type) {
    this.setState({ type });
  }
  render() {
    const btnJSX = (
      <div className="rc-btn-group">
        <button
          className="rc-btn rc-btn--one"
          onClick={this.seletTheType.bind(this, 'cat')}
        >
          <FormattedMessage id="cats3" />
        </button>
        <button
          className="rc-btn rc-btn--one"
          onClick={this.seletTheType.bind(this, 'dog')}
        >
          <FormattedMessage id="dogs3" />
        </button>
      </div>
    );
    const homeJSX = (
      <>
        <div className="row">
          <div className="col-12 col-md-4 order-0 order-md-1 text-center">
            <h1 className="rc-gamma rc-padding--none text-center">
              <FormattedMessage id="productFinder.tip1" />
            </h1>
            <p>
              <FormattedMessage id="productFinder.tip2" />
            </p>
            <h4 className="rc-delta text-center mb-3 rc-margin-bottom--sm rc-sm-up">
              <FormattedMessage id="productFinder.tip3" />
            </h4>
            <div className="rc-md-up">{btnJSX}</div>
          </div>
          <div className="col-6 col-md-4 order-1 order-md-0">
            <LazyLoad style={{ width: '100%', height: '100%' }}>
              <img src={catImg} alt="" />
            </LazyLoad>
          </div>
          <div className="col-6 col-md-4 order-2 order-md-2">
            <LazyLoad style={{ width: '100%', height: '100%' }}>
              <img src={dogImg} alt="" />
            </LazyLoad>
          </div>
        </div>
        <div className="next-step-button d-md-none">{btnJSX}</div>
      </>
    );
    const { match, history, location } = this.props;
    const { type } = this.state;
    const event = {
      event: "virtualPageView",
      page: {
        type: 'Product Finder',
        hitTimestamp:new Date(),
        virtualPageURL: match.path,
        theme:''
      }
    };
    return (
      <div>
        <GoogleTagManager additionalEvents={event} />
        <Helmet>
          <title>{this.state.seoConfig.title}</title>
          <meta name="description" content={this.state.seoConfig.metaDescription}/>
          <meta name="keywords" content={this.state.seoConfig.metaKeywords}/>
        </Helmet>
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={location}
          history={history}
          match={match}
        />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
          <BannerTip />
          <BreadCrumbs />
          <div className="rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile rc-max-width--lg mb-0">
            {type ? (
              <Question
                type={type}
                defaultQuestionData={localItemRoyal.get(
                  `pf-cache-${type}-question`
                )}
                defaultStep={sessionItemRoyal.get('pf-edit-order')}
                history={this.props.history}
              />
            ) : (
              homeJSX
            )}
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default ProductFinder;
