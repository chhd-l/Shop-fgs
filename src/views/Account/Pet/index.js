import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import { inject, observer } from 'mobx-react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Skeleton from 'react-skeleton-loader';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BreadCrumbs from '@/components/BreadCrumbs';
import BannerTip from '@/components/BannerTip';
import SideMenu from '@/components/SideMenu';
import './index.less';
import noPet from '@/assets/images/noPet.jpg';
import { Link } from 'react-router-dom';
import { getPetList } from '@/api/pet';
import { getDict } from '@/api/dict';
import { setSeoConfig, getDeviceType, getDictionary } from '@/utils/utils';
import Female from '@/assets/images/female.png';
import Male from '@/assets/images/male.png';
import Cat from '@/assets/images/cat.png';
import Dog from '@/assets/images/dog.png';
import LazyLoad from 'react-lazyload';
import { Helmet } from 'react-helmet';
import { myAccountPushEvent } from '@/utils/GA';
import { formatDate } from '../../../utils/utils';

const pageLink = window.location.href;

@injectIntl
@inject('loginStore')
@observer
class Pet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      petList: [],
      seoConfig: {
        title: 'Royal canin',
        metaKeywords: 'Royal canin',
        metaDescription: 'Royal canin'
      },
      isMobile: false,
      loading: true,
      catBreedList: [],
      dogBreedList: []
    };
  }
  componentDidMount() {
    myAccountPushEvent('Pets');
    this.setState({ isMobile: getDeviceType() !== 'PC' });
    setSeoConfig({
      pageName: 'Account pet'
    }).then((res) => {
      this.setState({ seoConfig: res });
    });
    this.getBreedList();
  }

  async getBreedList() {
    const catBreedList = await getDictionary({ type: 'catBreed' });
    const dogBreedList = await getDictionary({ type: 'dogBreed' });
    this.setState({
      catBreedList,
      dogBreedList
    });
    this.getPetList();
  }
  get userInfo() {
    return this.props.loginStore.userInfo;
  }

  getPetList = async () => {
    let customerId = this.userInfo && this.userInfo.customerId;
    let consumerAccount = this.userInfo && this.userInfo.consumerAccount;
    if (!customerId) {
      // showErrorMsg(this.props.intl.messages.getConsumerAccountFailed);
      this.setState({
        loading: false
      });
      return false;
    }
    getPetList({
      customerId,
      consumerAccount
    })
      .then((res) => {
        let petList = res.context.context;
        this.setState({
          loading: false,
          petList: petList
        });
      })
      .catch((err) => {
        this.setState({
          loading: false
        });
      });
  };

  petBreed(el) {
    if (el.isPurebred === 0) {
      return this.props.intl.messages['Mixed Breed'];
    } else if (el.petsBreed && el.petsType === 'dog') {
      return (
        (this.state.dogBreedList.length &&
          this.state.dogBreedList.filter(
            (item) => item.valueEn == el.petsBreed
          )?.[0]?.name) ||
        el.petsBreed
      );
    } else {
      return (
        (this.state.catBreedList.length &&
          this.state.catBreedList.filter(
            (item) => item.valueEn == el.petsBreed
          )?.[0]?.name) ||
        el.petsBreed
      );
    }
  }

  render() {
    const event = {
      page: {
        type: 'Account',
        theme: '',
        path: location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: ''
      }
    };
    let { isMobile, petList, loading } = this.state;
    console.log('petList', petList);
    return (
      <div id="Pets">
        <GoogleTagManager additionalEvents={event} />
        <Helmet>
          <link rel="canonical" href={pageLink} />
          <title>{this.state.seoConfig.title}</title>
          <meta
            name="description"
            content={this.state.seoConfig.metaDescription}
          />
          <meta name="keywords" content={this.state.seoConfig.metaKeywords} />
        </Helmet>
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={this.props.location}
          history={this.props.history}
          match={this.props.match}
        />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
          <BannerTip />
          <BreadCrumbs />
          <div className="rc-padding--sm rc-max-width--xl">
            <div className="rc-layout-container rc-five-column">
              {isMobile ? (
                <div className="col-12 rc-md-down">
                  <Link to="/account">
                    <span className="red">&lt;</span>
                    <span className="rc-styled-link rc-progress__breadcrumb ml-2 mt-1">
                      <FormattedMessage id="account.home" />
                    </span>
                  </Link>
                </div>
              ) : (
                <SideMenu type="Pets" />
              )}
              <div className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop">
                {/* <div className="rc-border-bottom rc-border-colour--interface rc-margin-bottom--sm">
                  <h4 className="rc-delta rc-margin--none">
                    <FormattedMessage id="account.pets"></FormattedMessage>
                  </h4>
                </div> */}
                <div className="content-asset">
                  {loading ? (
                    <Skeleton
                      color="#f5f5f5"
                      width="100%"
                      height="50%"
                      count={5}
                    />
                  ) : petList.length <= 0 ? (
                    <div className="rc-layout-container rc-two-column rc-content-h-middle rc-margin-bottom--sm">
                      <div className="rc-column rc-md-down">
                        <LazyLoad>
                          <img
                            style={{ width: '100%' }}
                            src={noPet}
                            alt="No pets"
                          />
                        </LazyLoad>
                      </div>
                      <div className="rc-column">
                        <div className="rc-padding-right-lg rc-padding-y--sm ">
                          <div className="children-nomargin text-break">
                            <p>
                              <FormattedMessage id="account.noPet" />
                            </p>
                          </div>
                          <div
                            className="rc-margin-top--xs"
                            style={{ textAlign: isMobile ? 'center' : 'left' }}
                          >
                            <Link
                              className="rc-btn rc-btn--one"
                              to="/account/pets/petForm"
                            >
                              <FormattedMessage id="account.addPet"></FormattedMessage>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="rc-column rc-md-up">
                        <LazyLoad>
                          <img src={noPet} alt="No pets" />
                        </LazyLoad>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="title mb-4">
                        <FormattedMessage id="pet.petListTitle" />
                      </p>
                      {isMobile
                        ? petList.map((el, i) => (
                            <div className="petItem" key={i}>
                              <div className="photo">
                                {/* <LazyLoad> */}
                                <img
                                  style={{
                                    width: '90px',
                                    borderRadius: '50%'
                                  }}
                                  src={
                                    (el.petsImg && el.petsImg.includes('https')
                                      ? el.petsImg
                                      : null) ||
                                    (el.petsType === 'cat' ? Cat : Dog)
                                  }
                                  alt="Pet avatar"
                                />
                                {/* </LazyLoad> */}
                              </div>
                              <div className="content">
                                <h1 className="name red">
                                  {el.petsName}{' '}
                                  <img
                                    style={{ width: '1.25rem' }}
                                    src={!el.petsSex ? Male : Female}
                                    alt="pet sex icon"
                                  />
                                </h1>
                                <div className="key">
                                  <span className="ui-text-overflow-line1">
                                    <FormattedMessage id="birthday" />
                                  </span>
                                  <span>
                                    <FormattedMessage id="breed" />
                                  </span>
                                </div>
                                <div className="value">
                                  <span>
                                    {formatDate({ date: el.birthOfPets })}
                                  </span>
                                  <span>{this.petBreed(el)}</span>
                                </div>
                              </div>
                              <div className="operation">
                                <Link
                                  className="edit rc-styled-link"
                                  to={'/account/pets/petForm/' + el.petsId}
                                >
                                  <FormattedMessage id="edit" />
                                </Link>
                              </div>
                            </div>
                          ))
                        : this.state.petList.map((el, i) => (
                            <div className="petItem" key={i}>
                              <div className="photo">
                                <LazyLoad>
                                  <img
                                    style={{
                                      width: '90px',
                                      borderRadius: '50%'
                                    }}
                                    src={
                                      (el.petsImg &&
                                      el.petsImg.includes('https')
                                        ? el.petsImg
                                        : null) ||
                                      (el.petsType === 'cat' ? Cat : Dog)
                                    }
                                    alt="Pet avatar"
                                  />
                                </LazyLoad>
                              </div>
                              <div className="content">
                                <h1 className="name red">
                                  {el.petsName}{' '}
                                  <LazyLoad>
                                    <img
                                      style={{ width: '.9375rem' }}
                                      src={!el.petsSex ? Male : Female}
                                      alt="pet sex icon"
                                    />
                                  </LazyLoad>
                                </h1>
                                <div className="key">
                                  <span className="ui-text-overflow-line1">
                                    <FormattedMessage id="birthday" />
                                  </span>
                                  <span>
                                    <FormattedMessage id="breed" />
                                  </span>
                                </div>
                                <div className="value">
                                  <span>
                                    {formatDate({ date: el.birthOfPets })}
                                  </span>
                                  <span>{this.petBreed(el)}</span>
                                </div>
                              </div>
                              <div className="operation">
                                <Link
                                  className="edit rc-styled-link"
                                  to={'/account/pets/petForm/' + el.petsId}
                                >
                                  <FormattedMessage id="edit" />
                                </Link>
                              </div>
                            </div>
                          ))}
                      <Link
                        className="petItem addNew text-center ui-cursor-pointer"
                        to="/account/pets/petForm"
                        style={{
                          display: 'block'
                        }}
                      >
                        <span className="iconfont iconjia mr-1 font-bold" />
                        <span>
                          <FormattedMessage id="pet.addNewPet" />
                        </span>
                        {/* Add a new PET */}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </div>
    );
  }
}
export default Pet;
