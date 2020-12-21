import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Skeleton from 'react-skeleton-loader';
import { inject, observer } from 'mobx-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import BreadCrumbs from '@/components/BreadCrumbs';
import LoginButton from '@/components/LoginButton';
import Help from './Help';
import { formatMoney } from '@/utils/utils';
import { setSeoConfig } from '@/utils/utils';
import { Helmet } from 'react-helmet';

import catImg from '@/assets/images/product-finder-cat.jpg';
import dogImg from '@/assets/images/product-finder-dog.jpg';
import LazyLoad from 'react-lazyload';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

function QListAndPetJSX(props) {
  const { questionlist, petBaseInfo } = props;
  let sterilized = petBaseInfo && petBaseInfo.sterilized || '...'
  let sterilizedText = sterilized
  if(sterilized.toLocaleLowerCase().includes('stérilisé')){
    // 如果是法语
    sterilizedText = sterilized.includes('Non')?'Non':'Oui'
  }
  return (
    <div className="p-f-pet-box mt-4 pt-4 mb-4 pb-4">
      <div className="row">
        <div className="col-12 col-md-6 mb-4 mb-md-0">
          <div className="border rounded">
            <p
              className="text-center mt-2 mb-0"
              style={{ fontSize: '1.25rem' }}
              onClick={props.toggleShowQList}
            >
              {props.summaryIcon}
              <FormattedMessage id="productFinder.summary" />
            </p>
            <LazyLoad style={{ height: '100%', width: '100%' }}>
              <img
                src={{ cat: catImg, dog: dogImg }[props.type]}
                style={{ width: '50%', margin: '0 auto' }}
                alt=""
              />
            </LazyLoad>
            <ul className="rc-list rc-list--blank rc-list--align ml-2 mr-2">
              {questionlist.map((ele, i) => (
                <li
                  className={`d-flex justify-content-between align-items-center pt-1 pb-1 ${
                    i ? 'border-top' : ''
                  }`}
                  key={i}
                >
                  <span style={{ flex: 1 }}>
                    {ele.productFinderAnswerDetailsVO.prefix}
                    {ele.productFinderAnswerDetailsVO.prefix ? ' ' : null}
                    <span className="red">
                      {ele.productFinderAnswerDetailsVO.suffix}
                    </span>
                  </span>
                  <p
                    className="rc-styled-link mb-1 ml-2"
                    onClick={props.handleClickEditBtn.bind(this, ele)}
                  >
                    <FormattedMessage id="edit" />
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="border rounded pr-2 pl-2">
            <div className="row align-items-center mt-4 mb-2 mb-md-4">
              <div className="col-12 col-md-6 mb-4 mb-md-0">
                <LazyLoad style={{ height: '100%', width: '100%' }}>
                  <img
                    src={{ cat: catImg, dog: dogImg }[props.type]}
                    className="border"
                    style={{
                      borderRadius: '50%',
                      width: '50%',
                      margin: '0 auto'
                    }}
                    alt=""
                  />
                </LazyLoad>
              </div>
              <div className="col-12 col-md-6 text-center text-md-left text-break">
                <div className="row">
                  <div className="col-6 mb-2 mb-md-0">
                    <FormattedMessage id="age" />
                    <br />
                    <span className="font-weight-normal">
                      {(petBaseInfo && petBaseInfo.age) || '...'}
                    </span>
                  </div>
                  <div className="col-6 mb-2 mb-md-0">
                    <FormattedMessage id="breed" />
                    <br />
                    <span className="font-weight-normal">
                      {(petBaseInfo && petBaseInfo.breed) || '...'}
                    </span>
                  </div>
                  <div className="col-6 mb-2 mb-md-0">
                    <FormattedMessage id="gender" />
                    <br />
                    <span className="font-weight-normal">
                      {(petBaseInfo && petBaseInfo.gender) || '...'}
                    </span>
                  </div>
                  <div className="col-6 mb-2 mb-md-0">
                    <FormattedMessage id="sterilized" />
                    <br />
                    <span className="font-weight-normal">
                      {sterilizedText}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center pt-3 pb-3">
              <FormattedMessage id="productFinder.createMyPetProfileTip" />
              <br />
            </p>
            <div className="text-center pb-4">
              {props.isLogin ? (
                <Link className="rc-btn rc-btn--one mb-3" to="/account/pets">
                  <FormattedMessage id="productFinder.createMyPetProfile" />
                </Link>
              ) : (
                <LoginButton
                  beforeLoginCallback={async () => {
                    sessionItemRoyal.set('okta-redirectUrl', '/account/pets');
                  }}
                  btnClass="rc-btn rc-btn--one mb-3"
                  history={props.history}
                >
                  <FormattedMessage id="productFinder.createMyPetProfile" />
                </LoginButton>
              )}

              <br />
              <span
                className="rc-btn rc-btn--two mb-4 ui-cursor-pointer"
                onClick={props.handleClickGotoStart}
              >
                <FormattedMessage id="productFinder.startAgin" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

@inject('loginStore')
@observer
class ProductFinderResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: localItemRoyal.get('pf-cache-type'),
      qListVisible: false,
      productDetail: null,
      isLoading: true,
      questionlist: [],
      seoConfig: {
        title: '',
        metaKeywords: '',
        metaDescription: ''
      },
      petBaseInfo: null
    };
  }
  componentDidMount() {
    const res = sessionItemRoyal.get('pf-result');
    const questionlist = sessionItemRoyal.get('pf-questionlist');
    if (res) {
      setSeoConfig({
        pageName: 'finder-recommendation'
      }).then(res => {
        this.setState({seoConfig: res})
      });
      const parsedQuestionlist = questionlist ? JSON.parse(questionlist) : null;
      const ageItem = parsedQuestionlist.filter(
        (ele) => ele.questionName === 'age'
      );
      const breedItem = parsedQuestionlist.filter(
        (ele) => ele.questionName === 'breedCode'
      );
      const genderItem = parsedQuestionlist.filter(
        (ele) => ele.questionName === 'genderCode'
      );
      const neuteredItem = parsedQuestionlist.filter(
        (ele) => ele.questionName === 'neutered'
      );
      this.setState({
        productDetail: JSON.parse(res),
        questionlist: parsedQuestionlist,
        petBaseInfo: {
          age: ageItem.length
            ? ageItem[0].productFinderAnswerDetailsVO.suffix
            : '',
          breed: breedItem.length
            ? breedItem[0].productFinderAnswerDetailsVO.suffix
            : '',
          gender: genderItem.length
            ? genderItem[0].productFinderAnswerDetailsVO.suffix
            : '',
          sterilized: neuteredItem.length
            ? neuteredItem[0].productFinderAnswerDetailsVO.suffix
            : ''
        },
        isLoading: false
      });
    } else {
      this.props.history.push('/product-finder');
    }
  }
  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  toggleShowQList = () => {
    this.setState((curState) => ({ qListVisible: !curState.qListVisible }));
  };
  handleClickEditBtn = (ele) => {
    sessionItemRoyal.set('pf-edit-order', ele.stepOrder);
    this.props.history.push(`/product-finder`);
  };
  handleClickGotoStart = () => {
    const { type } = this.state;
    localItemRoyal.remove(`pf-cache-type`);
    localItemRoyal.remove(`pf-cache-${type}-question`);
    sessionItemRoyal.remove('pf-edit-order');
    this.props.history.push(`/product-finder`);
  };
  render() {
    const { location, history, match } = this.props;
    const {
      productDetail,
      qListVisible,
      isLoading,
      type,
      questionlist,
      petBaseInfo
    } = this.state;
    return (
      <div>
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
          <div className="rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile p-f-product-results">
            {isLoading ? (
              <div className="mt-4">
                <Skeleton color="#f5f5f5" width="100%" height="50%" count={4} />
              </div>
            ) : (
              <div>
                {!qListVisible && (
                  <div className="text-center mb-3 rc-md-down">
                    <div
                      className="rc-bg-colour--brand4 text-center rounded ui-cursor-pointer-pure inlineblock pl-4 pr-4"
                      onClick={this.toggleShowQList}
                    >
                      {qListVisible ? (
                        <span className="rc-icon rc-down--xs rc-iconography mr-2" />
                      ) : (
                        <span className="rc-icon rc-right--xs rc-iconography mr-2" />
                      )}
                      <FormattedMessage id="productFinder.summary" />
                    </div>
                  </div>
                )}
                {qListVisible && (
                  <div>
                    <QListAndPetJSX
                      summaryIcon={
                        <span className="rc-icon rc-down--xs rc-iconography" />
                      }
                      type={type}
                      toggleShowQList={this.toggleShowQList}
                      history={history}
                      isLogin={this.isLogin}
                      questionlist={questionlist}
                      handleClickEditBtn={this.handleClickEditBtn}
                      handleClickGotoStart={this.handleClickGotoStart}
                      petBaseInfo={petBaseInfo}
                    />
                  </div>
                )}

                <h2 className="rc-beta markup-text mb-0 text-center">
                  <FormattedMessage id="productFinder.searchCompleted" />
                </h2>
                <p className="text-center" style={{ fontSize: '1.25rem' }}>
                  {type === 'dog' ? (
                    <FormattedMessage id="productFinder.searchResultTip1ForCat" />
                  ) : (
                    <FormattedMessage id="productFinder.searchResultTip1ForDog" />
                  )}

                  <br />
                  <FormattedMessage id="productFinder.searchResultTip2" />
                </p>
                <div className="p-f-result-box">
                  <div className="border rounded row pt-3 pb-3">
                    <div className="col-12 col-md-6">
                      <LazyLoad style={{ height: '100%', width: '100%' }}>
                        <img
                          src={
                            productDetail.mainProduct.goodsImg ||
                            productDetail.mainProduct.goodsInfos.sort(
                              (a, b) => a.marketPrice - b.marketPrice
                            )[0].goodsInfoImg
                          }
                          className="p-img"
                          alt=""
                        />
                      </LazyLoad>
                    </div>
                    <div className="col-12 col-md-6 d-flex flex-column justify-content-center">
                      <header className="rc-text--center">
                        <h3
                          className="rc-card__title rc-gamma ui-text-overflow-line2 text-break mb-1 TitleFitScreen"
                          title={productDetail.mainProduct.goodsName}
                        >
                          {productDetail.mainProduct.goodsName}
                        </h3>
                      </header>
                      <div
                        className="ui-text-overflow-line1 text-break sub-hover text-center SubTitleScreen"
                        title={productDetail.mainProduct.subTitle}
                      >
                        {productDetail.mainProduct.subTitle}
                      </div>
                      <div className="text-center mt-2">
                        {formatMoney(
                          Math.min.apply(
                            null,
                            productDetail.mainProduct.goodsInfos.map(
                              (g) => g.marketPrice || 0
                            )
                          )
                        )}
                      </div>
                      <div className="d-flex justify-content-center mt-3">
                        <Link
                          to={`/details/${productDetail.mainProduct.goodsInfos[0].goodsInfoId}`}
                          className="rc-btn rc-btn--one rc-btn--sm"
                        >
                          <FormattedMessage id="seeTheProduct" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="row flex-nowrap mt-2">
                    <span className="rc-icon rc-incompatible--xs rc-iconography" />
                    <p style={{ fontSize: '.66em' }}>
                      <FormattedMessage id="productFinder.searchResultWarningTip1" />
                    </p>
                  </div>
                </div>
                <p className="text-center" style={{ fontSize: '1.4rem' }}>
                  <FormattedMessage id="productFinder.otherProductsToConsider" />
                </p>
                <div className="p-f-other-box rc-scroll--x pb-4">
                  <div className="d-flex">
                    {productDetail.otherProducts.map((ele, i) => (
                      <div
                        className={`border rounded pt-3 pb-3 pl-2 pr-2 pl-md-0 pr-md-0 ${
                          i ? 'ml-2' : ''
                        }`}
                        key={ele.id}
                        style={{ flex: 1 }}
                      >
                        <div className="mb-3 p-f-product-img">
                          <LazyLoad style={{ height: '100%', width: '100%' }}>
                            <img
                              src={
                                ele.goodsImg ||
                                ele.goodsInfos.sort(
                                  (a, b) => a.marketPrice - b.marketPrice
                                )[0].goodsInfoImg
                              }
                              className="p-img"
                              alt=""
                            />
                          </LazyLoad>
                        </div>
                        <div className="d-flex flex-column justify-content-center">
                          <header className="rc-text--center">
                            <h3
                              className="rc-card__title rc-gamma ui-text-overflow-line2 text-break mb-1 TitleFitScreen p-f-product-title"
                              title={ele.goodsName}
                            >
                              {ele.goodsName}
                            </h3>
                          </header>
                          <div
                            className="ui-text-overflow-line1 text-break sub-hover text-center SubTitleScreen"
                            title={ele.subTitle}
                          >
                            {ele.subTitle}
                          </div>
                          <div className="text-center mt-2">
                            {formatMoney(
                              Math.min.apply(
                                null,
                                ele.goodsInfos.map((g) => g.marketPrice || 0)
                              )
                            )}
                          </div>
                          <div className="d-flex justify-content-center mt-3">
                            <Link
                              to={`/details/${ele.goodsInfos[0].goodsInfoId}`}
                              className="rc-btn rc-btn--one rc-btn--sm"
                            >
                              <FormattedMessage id="seeTheProduct" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rc-md-up">
                  <QListAndPetJSX
                    type={type}
                    toggleShowQList={this.toggleShowQList}
                    history={history}
                    isLogin={this.isLogin}
                    questionlist={questionlist}
                    handleClickEditBtn={this.handleClickEditBtn}
                    handleClickGotoStart={this.handleClickGotoStart}
                    petBaseInfo={petBaseInfo}
                  />
                </div>
              </div>
            )}
          </div>
          <hr />
          <div className="rc-layout-container rc-one-column rc-max-width--md rc-padding-x--none--mobile rc-padding-top--md rc-padding-bottom--lg">
            <div className="rc-full-width rc-text--center rc-padding-x--sm rc-padding-x--lg--mobile">
            <p
                className="text-center pt-3"
                style={{ fontSize: '1.3rem' }}
              >
                <FormattedMessage id="productFinder.helpTip1" />
              </p>
              <p className="rc-meta rc-margin-y--lg--mobile">
                <FormattedMessage id="productFinder.helpTip2" />
              </p>
            </div>
            
            <Help />
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default ProductFinderResult;
