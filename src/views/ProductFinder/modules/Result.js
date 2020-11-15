import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Skeleton from 'react-skeleton-loader';
import { inject, observer } from 'mobx-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BreadCrumbs from '@/components/BreadCrumbs';
import LoginButton from '@/components/LoginButton';
import Help from './Help';
import { formatMoney } from '@/utils/utils';

import catImg from '@/assets/images/product-finder-cat.png';
import dogImg from '@/assets/images/product-finder-dog.png';

const sessionItemRoyal = window.__.sessionItemRoyal;

function QListAndPetJSX(props) {
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
            <img
              src={{ cat: catImg, dog: dogImg }[props.type]}
              style={{ width: '50%', margin: '0 auto' }}
              alt=""
            />
            <ul className="rc-list rc-list--blank rc-list--align ml-2 mr-2">
              {['My dsfa', 'dsfahofiads', 'ddsadsadsfdsa'].map((ele, i) => (
                <li
                  className={`d-flex justify-content-between align-items-center pt-1 pb-1 ${
                    i ? 'border-top' : ''
                  }`}
                >
                  <span>{ele}</span>
                  <p className="rc-styled-link mb-1">
                    <FormattedMessage id="edit" />
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="border rounded">
            <div className="row align-items-center mt-4 mb-2 mb-md-4">
              <div className="col-12 col-md-6 mb-4 mb-md-0">
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
              </div>
              <div className="col-12 col-md-6 text-center text-md-left">
                <div className="row">
                  <div className="col-6 mb-2 mb-md-0">
                    Age
                    <br />
                    <span className="font-weight-normal">2 years old</span>
                  </div>
                  <div className="col-6 mb-2 mb-md-0">
                    Breed
                    <br />
                    <span className="font-weight-normal">Mix Breed</span>
                  </div>
                  <div className="col-6 mb-2 mb-md-0">
                    Gender
                    <br />
                    <span className="font-weight-normal">Female</span>
                  </div>
                  <div className="col-6 mb-2 mb-md-0">
                    Sterilized
                    <br />
                    <span className="font-weight-normal">Yes</span>
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
                <Link className="rc-btn rc-btn--one mb-3" to="/account/pet">
                  <FormattedMessage id="productFinder.createMyPetProfile" />
                </Link>
              ) : (
                <LoginButton
                  beforeLoginCallback={async () => {
                    sessionItemRoyal.set('okta-redirectUrl', '/account/pet');
                  }}
                  btnClass="rc-btn rc-btn--one mb-3"
                  history={props.history}
                >
                  <FormattedMessage id="productFinder.createMyPetProfile" />
                </LoginButton>
              )}

              <br />
              <Link className="rc-btn rc-btn--two mb-4" to="/product-finder">
                <FormattedMessage id="productFinder.startAgin" />
              </Link>
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
      type: '',
      qListVisible: false,
      productDetail: null,
      isLoading: true
    };
  }
  componentDidMount() {
    this.setState({ type: this.props.match.params.type });
    const res = sessionItemRoyal.get('product-finder-result');
    if (res) {
      this.setState({ productDetail: JSON.parse(res), isLoading: false });
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
  render() {
    const { location, history, match } = this.props;
    const { productDetail, qListVisible, isLoading, type } = this.state;
    return (
      <div>
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={location}
          history={history}
          match={match}
        />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
          <BreadCrumbs />
          <div className="rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
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
                    />
                  </div>
                )}

                <h2 className="rc-beta markup-text mb-0 text-center">
                  <FormattedMessage id="productFinder.searchCompleted" />
                </h2>
                <p className="text-center" style={{ fontSize: '1.25rem' }}>
                  <FormattedMessage id="productFinder.searchResultTip1" />
                  <br />
                  <FormattedMessage id="productFinder.searchResultTip2" />
                </p>
                <div className="p-f-result-box">
                  <div className="border rounded row pt-3 pb-3">
                    <div className="col-12 col-md-6">
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
                          <FormattedMessage id="chooseTheProduct" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="row flex-nowrap mt-2">
                    <span className="rc-icon rc-incompatible--xs rc-iconography" />
                    <p style={{ fontSize: '.66em' }}>
                      The recommendations provided here are for informational
                      purpose only.It should not be considered as guarantee for
                      what may be best for your indivaidual pet.
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
                              <FormattedMessage id="chooseTheProduct" />
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
                  />
                </div>
                <hr />
                <div className="p-f-help-box mt-4">
                  <p
                    className="text-center pt-3"
                    style={{ fontSize: '1.3rem' }}
                  >
                    <FormattedMessage id="productFinder.helpTip1" />
                  </p>
                  <p className="text-center">
                    <FormattedMessage id="productFinder.helpTip2" />
                  </p>
                  <Help />
                </div>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default ProductFinderResult;
