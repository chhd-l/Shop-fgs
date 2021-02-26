import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
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
import { setSeoConfig, getDeviceType } from '@/utils/utils';
import Female from '@/assets/images/female.png';
import Male from '@/assets/images/male.png';
import Cat from '@/assets/images/cat.png';
import Dog from '@/assets/images/dog.png';
import LazyLoad from 'react-lazyload';
import { Helmet } from 'react-helmet';
import { myAccountPushEvent } from '@/utils/GA';

const pageLink = window.location.href;

@injectIntl
@inject('loginStore')
@observer
class Pet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      petList: [],
      seoConfig: {
        title: '',
        metaKeywords: '',
        metaDescription: ''
      },
      isMobile: false,
      loading: true
    };
  }
  componentDidMount() {
    myAccountPushEvent('Pets')
    this.setState({ isMobile: getDeviceType() !== 'PC' });
    setSeoConfig().then((res) => {
      this.setState({ seoConfig: res });
    });
    this.getPetList();
  }
  isHavePet() {
    const { history } = this.props;
    // history.push('/account/pets/petForm');
  }

  get userInfo() {
    return this.props.loginStore.userInfo;
  }

  getPetList = async () => {
    let customerId = this.userInfo && this.userInfo.customerId
    let consumerAccount = this.userInfo && this.userInfo.consumerAccount
    if (!customerId) {
      this.showErrorMsg(this.props.intl.messages.getConsumerAccountFailed);
      this.setState({
        loading: false
      });
      return false;
    }
    let params = {
      customerId,
      consumerAccount
    };
    await getPetList(params)
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
                      <FormattedMessage id="home" />
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
                          <div className="children-nomargin">
                            <p style={{ wordBreak: 'break-all' }}>
                              <FormattedMessage id="account.noPet"></FormattedMessage>
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
                      <p className="title">
                        <FormattedMessage id="pet.petListTitle" />
                      </p>
                      {isMobile
                        ? petList.map((el) => (
                            <div className="petItem">
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
                                  />
                                </LazyLoad>
                              </div>
                              <div className="content">
                                <h1 className="name red">
                                  {el.petsName}{' '}
                                  <LazyLoad>
                                    <img
                                      style={{ width: '20px' }}
                                      src={!el.petsSex ? Male : Female}
                                    />
                                  </LazyLoad>
                                </h1>
                                <div className="key">
                                  <span>
                                    <FormattedMessage id="birthday" />
                                  </span>
                                  <span>
                                    <FormattedMessage id="breed" />
                                  </span>
                                </div>
                                <div className="value">
                                  <span>{el.birthOfPets}</span>
                                  <span>{el.petsBreed}</span>
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
                        : this.state.petList.map((el) => (
                            <div className="petItem">
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
                                  />
                                </LazyLoad>
                              </div>
                              <div className="content">
                                <h1 className="name red">
                                  {el.petsName}{' '}
                                  <LazyLoad>
                                    <img
                                      style={{ width: '15px' }}
                                      src={!el.petsSex ? Male : Female}
                                    />
                                  </LazyLoad>
                                </h1>
                                <div className="key">
                                  <span>
                                    <FormattedMessage id="birthday" />
                                  </span>
                                  <span>
                                    <FormattedMessage id="breed" />
                                  </span>
                                </div>
                                <div className="value">
                                  <span>{el.birthOfPets}</span>
                                  <span>
                                    {el.petsBreed && (
                                      <FormattedMessage id={el.petsBreed} />
                                    )}
                                  </span>
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
                        <span className="rc-icon rc-plus--xs rc-iconography plus-icon mt-1" style={{ fontSize: '42px' }} />{' '}
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
        </main>
        <Footer />
      </div>
    );
  }
}
export default Pet;
