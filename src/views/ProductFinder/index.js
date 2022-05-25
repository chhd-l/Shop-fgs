import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import BreadCrumbs from '@/components/BreadCrumbs';
import { FormattedMessage } from 'react-intl-phraseapp';
import Question from './modules/Question';
import LazyLoad from 'react-lazyload';
import { seoHoc } from '@/framework/common';
import { productFinderPushEvent } from '@/utils/GA';

import catImg from '@/assets/images/product-finder-cat.jpg';
import dogImg from '@/assets/images/product-finder-dog.jpg';
import './index.less';
import Canonical from '@/components/Canonical';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;
const isHubGA = window.__.env.REACT_APP_HUB_GA;

const GAStep = [
  'age',
  'breedCode',
  'sterilized',
  'genderCode',
  'weight',
  'sensitivity',
  'petActivityCode',
  'lifestyle'
];

@seoHoc('Product finder')
class ProductFinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '' // cat dog
    };
    this.seletTheType = this.seletTheType.bind(this);
  }
  componentDidMount() {
    sessionItemRoyal.remove('product-finder-edit-order');
    sessionItemRoyal.remove('pf-result');
    this.GAHandle('speciesCode');
  }
  getStepCurrent = (stepCurrent) => {
    let type = this.state.type || 'cat';
    let stepVirtualPageURLObj = {
      speciesCode: 'productfinder/vAPI/choice/step',
      reasonForDiet: 'productfinder/vAPI/' + type + '/reason_step1',
      sensitivity: 'productfinder/vAPI/' + type + '/specificNeed_step',
      age: 'productfinder/vAPI/' + type + '/age_step',
      breedCode: 'productfinder/vAPI/' + type + '/breed_step',
      size: 'productfinder/vAPI/' + type + '/size_step',
      lifestyle: 'productfinder/vAPI/' + type + '/lifestyle_step',
      sterilized: 'productfinder/vAPI/' + type + '/sterilization_step',
      name: 'productfinder/vAPI/' + type + '/name_step',
      petActivityCode: 'productfinder/vAPI/' + type + '/activity_step',
      weight: 'productfinder/vAPI/' + type + '/weight_step',
      genderCode: 'productfinder/vAPI/' + type + '/gender_step',
      neutered: 'productfinder/vAPI/' + type + '/neutered_step'
    };
    return stepVirtualPageURLObj[stepCurrent];
  };

  GAHandle = (stepName, stepOrder, answerdQuestionList) => {
    if (!dataLayer) return;
    window?.dataLayer?.push({
      event: 'virtualPageView',
      page: {
        type: 'Product Finder',
        virtualPageURL: this.getStepCurrent(stepName)
      }
    });
    // if(isHubGA){
    //   console.log(stepName)
    //   // debugger
    //   if(GAStep.indexOf(stepName) == -1) return //用GAStep去控制需要埋点的步骤
    //   productFinderPushEvent({type:this.state.type,stepName,stepOrder,answerdQuestionList})
    // }else{
    //   dataLayer.push({
    //     event: 'productFinderScreen',
    //     page: {
    //       type: 'Product Finder',
    //       virtualPageURL: this.getStepCurrent(stepName)
    //     }
    //   });
    // }
  };
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
          <div className="col-12 col-md-4 order-0 md:order-1 text-center">
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
          <div className="col-6 col-md-4 order-1 md:order-0">
            <LazyLoad style={{ width: '100%', height: '100%' }}>
              <img src={catImg} alt="cat image" />
            </LazyLoad>
          </div>
          <div className="col-6 col-md-4 order-2 md:order-2">
            <LazyLoad style={{ width: '100%', height: '100%' }}>
              <img src={dogImg} alt="dog image" />
            </LazyLoad>
          </div>
        </div>
        <div className="next-step-button d-md-none">{btnJSX}</div>
      </>
    );
    const { match, history, location } = this.props;
    const { type } = this.state;

    let event = {
      page: {
        type: 'Product Finder',
        hitTimestamp: new Date(),
        path: location.pathname,
        theme: 'none',
        error: 'none',
        filters: 'none'
      }
    };
    return (
      <div>
        <GoogleTagManager
          key={this.props.location.key}
          additionalEvents={event}
        />
        <Canonical />
        <Header {...this.props} showMiniIcons={true} showUserIcon={true} />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
          <BannerTip />
          <BreadCrumbs />
          <div className="rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile rc-max-width--lg mb-0">
            {type ? (
              <Question
                GAHandle={this.GAHandle}
                type={type}
                history={this.props.history}
              />
            ) : (
              homeJSX
            )}
          </div>
          <Footer />
        </main>
      </div>
    );
  }
}

export default ProductFinder;
