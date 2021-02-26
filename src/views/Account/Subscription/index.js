import React from 'react';
import Skeleton from 'react-skeleton-loader';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import BreadCrumbs from '@/components/BreadCrumbs';
import SideMenu from '@/components/SideMenu';
import Selection from '@/components/Selection';
import Pagination from '@/components/Pagination';
import { FormattedMessage, injectIntl, FormattedDate } from 'react-intl';
import { Link } from 'react-router-dom';
import { getSubList } from '@/api/subscription';
import {
  getDictionary,
  getDeviceType,
  getFrequencyDict,
  setSeoConfig,
  getFormatDate
} from '@/utils/utils';
import { IMG_DEFAULT } from '@/utils/constant';
import subscriptionIcon from './images/subscription.png';
import cancelIcon from './images/cancel.png';
import autoshipIcon from './images/autoship.png';
import noSubscription from '@/assets/images/noSubscription.jpg';
import LazyLoad from 'react-lazyload';
import { Helmet } from 'react-helmet';
import { myAccountPushEvent } from '@/utils/GA';

import './index.css';

const localItemRoyal = window.__.localItemRoyal;
const pageLink = window.location.href;

const subscriptionLandingRouter = (lang) => {
  return {
    de: '/subscription-landing-de',
    fr: '/subscription-landing',
    us: '/subscription-landing-us',
    ru: '/subscription-landing-ru',
    tr: '/subscription-landing-tr'
  }[lang];
};

class Subscription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderList: [],
      subList: [],
      seoConfig: {
        title: '',
        metaKeywords: '',
        metaDescription: ''
      },
      form: {
        subscribeId: '',
        subscribeStatus: '0'
      },
      subGiftList: [],
      isGiftLoading: true,
      isGiftErrMsg: '',
      isGiftCurrentPage: 1,
      isGiftTotalPage: 1,
      loading: true,
      currentPage: 1,
      totalPage: 1,
      initing: true,
      errMsg: '',
      frequencyList: [],
      subStatus: [
        { value: '', name: <FormattedMessage id="all" /> },
        {
          value: '0',
          name: <FormattedMessage id="active" values={{ val: 0 }} />
        },
        {
          value: '2',
          name: <FormattedMessage id="inactive" values={{ val: 2 }} />
        }
      ],
      isMobile: false
    };
    this.pageSize = 6;
  }

  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }

  async componentDidMount() {
    myAccountPushEvent('Orders & Subscriptions')
    setSeoConfig({
      pageName: 'Account subscriptions'
    }).then((res) => {
      this.setState({ seoConfig: res });
    });
    // if (localItemRoyal.get('isRefresh')) {
    //   localItemRoyal.remove('isRefresh');
    //   window.location.reload();
    //   return false;
    // }
    this.setState({ isMobile: getDeviceType() !== 'PC' });
    await getFrequencyDict().then((res) => {
      this.setState({
        frequencyList: res.map((el) => {
          return {
            id: el.id,
            name: el.name,
            value: el.name
          };
        })
      });
    });
    this.getSubList();
    this.getGiftSubList()
  }

  handleInputChange(e) {
    const target = e.target;
    const { form } = this.state;
    form[target.name] = target.value;
    this.setState({ form: form });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.getSubList();
    }, 500);
  }

  hanldeStatusChange(data) {
    const { form } = this.state;
    form.subscribeStatus = data.value;
    this.setState(
      {
        form: form,
        currentPage: 1
      },
      () => this.getSubList()
    );
  }
  getGiftSubList() {
    const { form, isGiftIniting, isGiftCurrentPage } = this.state;
    if (!isGiftIniting) {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 0);
    }

    this.setState({ isGiftLoading: true });
    let param = {
      pageNum: isGiftCurrentPage - 1,
      pageSize: this.pageSize,
      subscribeId: form.subscribeId,
      // subscribeStatus: form.subscribeStatus,
      customerAccount: localItemRoyal.get('rc-userinfo')
        ? localItemRoyal.get('rc-userinfo')['customerAccount']
        : ''
    };
    getSubList(param)
      .then((res) => {
        this.setState({
          subGiftList: res.context.subscriptionResponses,
          isGiftLoading: false,
          isGiftIniting: false,
          isGiftCurrentPage: res.context.currentPage + 1,
          isGiftTotalPage: Math.ceil(res.context.total / this.pageSize)
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isGiftLoading: false,
          isGiftIniting: false
        });
      });
  }

  getSubList() {
    const { form, initing, currentPage } = this.state;
    if (!initing) {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 0);
    }

    this.setState({ loading: true });
    let param = {
      pageNum: currentPage - 1,
      pageSize: this.pageSize,
      subscribeId: form.subscribeId,
      // subscribeStatus: form.subscribeStatus,
      customerAccount: localItemRoyal.get('rc-userinfo')
        ? localItemRoyal.get('rc-userinfo')['customerAccount']
        : ''
    };
    getSubList(param)
      .then((res) => {
        this.setState({
          subList: res.context.subscriptionResponses,
          loading: false,
          initing: false,
          currentPage: res.context.currentPage + 1,
          totalPage: Math.ceil(res.context.total / this.pageSize)
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: false,
          initing: false
        });
      });
  }
  isGiftHanldePageNumChange = (params) => {
    this.setState(
      {
        isGiftCurrentPage: params.isGiftCurrentPage
      },
      () => this.getGiftSubList()
    );
  }

  hanldePageNumChange = (params) => {
    this.setState(
      {
        currentPage: params.currentPage
      },
      () => this.getSubList()
    );
  };

  getPageBox = (isGift) => {
    let {
      frequencyList,
      isMobile,
      subGiftList,
      isGiftErrMsg,
      isGiftLoading,
      isGiftCurrentPage,
      isGiftTotalPage,
    } = this.state;
    let dataList = isGift ? subGiftList : this.state.subList;
    let loading = isGift ? isGiftLoading : this.state.loading;
    let errMsg = isGift ? isGiftErrMsg : this.state.errMsg;
    let currentPage = isGift ? isGiftCurrentPage : this.state.currentPage;
    let totalPage = isGift ? isGiftTotalPage : this.state.totalPage;
    let subscription = isGift ? 'isGiftSubscription' : 'subscription';
    let hanldePageNumChange = isGift
      ? this.isGiftHanldePageNumChange
      : this.hanldePageNumChange;
    return (
      <div className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop">
        {dataList.length ? (
          <div>
            <h4 className="rc-delta rc-margin--none pb-2">
              <FormattedMessage id={subscription} />
            </h4>
          </div>
        ) : null}
        {/* <div className="row justify-content-around">
      <div className="col-12 col-md-6 row align-items-center mt-2 mt-md-0">
        <div className="col-md-4">
          <FormattedMessage id="subscription.number" />
        </div>
        <div className="col-md-8">
          <span className="rc-input rc-input--inline rc-full-width">
            <FormattedMessage id="subscription.subscriptionNumberTip">
              {(txt) => (
                <input
                  className="rc-input__control"
                  id="id-text8"
                  type="text"
                  name="subscribeId"
                  maxLength="20"
                  value={this.state.form.subscribeId}
                  onChange={(e) => this.handleInputChange(e)}
                  placeholder={txt}
                />
              )}
            </FormattedMessage>
            <label className="rc-input__label" htmlFor="id-text8">
            </label>
          </span>
        </div>
      </div>
      <div className="col-12 col-md-6 row align-items-center mt-2 mt-md-0">
        <div className="col-md-4">
          <FormattedMessage id="subscription.status" />
        </div>
        <div className="col-md-8">
          <Selection
            optionList={this.state.subStatus}
            selectedItemChange={(el) => this.hanldeStatusChange(el)}
            selectedItemData={{
              value: this.state.form.subscribeStatus
            }}
            key={this.state.form.subscribeStatus}
          />
        </div>
      </div>
    </div> */}
        <div className="order__listing">
          <div className="order-list-container">
            {loading ? (
              <div className="mt-4">
                <Skeleton color="#f5f5f5" width="100%" height="50%" count={4} />
              </div>
            ) : errMsg ? (
              <div className="text-center mt-5">
                <span className="rc-icon rc-incompatible--xs rc-iconography"></span>
                {errMsg}
              </div>
            ) : dataList.length ? (
              <>
                {dataList.map((subItem, i) => (
                  <div
                    className="card-container"
                    style={{ marginTop: '0', marginBottom: '20px' }}
                    key={subItem.subscribeId}
                  >
                    <div className="card rc-margin-y--none ml-0">
                      <div
                        className="card-header row rc-margin-x--none align-items-center pl-0 pr-0"
                        style={{ padding: '1rem 0' }}
                      >
                        <div className="col-12 col-md-4">
                          <p
                            style={{
                              fontSize: '16px',
                              fontWeight: '400',
                              color: '#333',
                              paddingLeft: '20px'
                            }}
                          >
                            {subItem.subscribeId}
                          </p>
                        </div>
                        <div className="col-4 col-md-2"></div>
                        <div className="col-4 col-md-2"></div>
                        <div className="col-4 col-md-2 pl-4"></div>
                        {/* <div className="col-12 col-md-2 d-flex justify-content-end flex-column flex-md-row rc-padding-left--none--mobile">
                      <img
                        style={{
                          display: 'inline-block',
                          width: '20px',
                          marginRight: '5px'
                        }}
                        src={cancelIcon}
                      />
                      <a className="rc-styled-link" href="#/">
                        Cancel Autoship
                      </a>
                    </div> */}
                      </div>
                    </div>
                    <div className="row rc-margin-x--none row align-items-center 1111" style={{ padding: '1rem 0' }}>
                      <div className="col-4 col-md-4 d-flex flex-wrap">
                        {subItem.goodsInfo &&
                          subItem.goodsInfo.map((item) => (
                            <div style={{ marginLeft: '20px' }}>
                              <LazyLoad>
                                <img
                                  style={{
                                    width: '70px',
                                    display: 'inline-block'
                                  }}
                                  key={item.spuId}
                                  src={item.goodsPic || IMG_DEFAULT}
                                  alt={item.goodsName}
                                  title={item.goodsName}
                                />
                              </LazyLoad>
                              <span
                                style={{
                                  display: 'inline-block',
                                  verticalAlign: 'middle',
                                  fontSize: '12px',
                                  marginLeft: '10px',
                                  width: isMobile ? 'auto' : '250px'
                                }}
                              >
                                <p
                                  style={{
                                    fontSize: '16px',
                                    fontWeight: '400',
                                    color: '#333',
                                    marginBottom: '5px'
                                  }}
                                >
                                  {item.goodsName}
                                </p>
                                <p>
                                  {item.specText} - {item.subscribeNum}{' '}
                                  <FormattedMessage id="units" />
                                </p>
                                <p>
                                  <FormattedMessage id="subscription.frequency" />
                                  :{' '}
                                  {frequencyList.filter(
                                    (el) => el.id === item.periodTypeId
                                  )[0]
                                    ? frequencyList.filter(
                                      (el) => el.id === item.periodTypeId
                                    )[0].value
                                    : ''}
                                </p>
                              </span>
                            </div>
                          ))}
                      </div>
                      <div className="col-4 col-md-2 text-nowrap">
                        <LazyLoad>
                          <img
                            src={autoshipIcon}
                            style={{
                              width: '40px',
                              display: 'inline-block'
                            }}
                          />
                        </LazyLoad>
                        <span
                          style={{
                            display: 'inline-block',
                            verticalAlign: 'middle',
                            fontSize: '12px',
                            marginLeft: '10px'
                          }}
                        >
                          <p
                            style={{
                              width: isMobile ? '120px' : 'auto',
                              textOverflow: 'ellipsis',
                              overflow: 'hidden'
                            }}
                          >
                            <FormattedMessage id="autoShipStarted" />
                          </p>
                          <p style={{ color: '#666', fontSize: '16px' }}>
                            {getFormatDate(subItem.createTime.split(' ')[0])}
                            {/* <FormattedDate value={subItem.createTime.split(' ')[0]}/> */}
                            {/* {subItem.createTime.split(' ')[0]} */}
                          </p>
                        </span>
                      </div>
                      <div className="col-4 col-md-2">
                        {/* {subItem.frequency} */}
                      </div>
                      <div className="col-4 col-md-2">
                        {subItem.subscribeStatus === '0' ? (
                          <div>
                            <i className="greenCircle"></i>
                            <FormattedMessage id="active" />
                          </div>
                        ) : (
                            <div>
                              <i className="yellowCircle"></i>
                              <FormattedMessage id="inactive" />
                            </div>
                          )}
                      </div>
                      <div className="col-4 col-md-2">
                        <button
                          className="rc-btn rc-btn--two rc-btn--sm"
                          onClick={() => {
                            localItemRoyal.set('subDetail', subItem);
                            this.props.history.push(
                              `/account/subscription/order/detail/${subItem.subscribeId}`
                            );
                          }}
                        >
                          <FormattedMessage id="manage" />
                        </button>
                      </div>
                      {/* <div className="col-12 col-md-2"># {i + 1}</div> */}
                    </div>
                  </div>
                ))}
              </>
            ) : (
                    // <div className="text-center mt-5">
                    //   <span className="rc-icon rc-incompatible--xs rc-iconography"></span>
                    //   <FormattedMessage id="subscription.noDataTip" />
                    // </div>
                    <div className="rc-layout-container rc-two-column rc-content-h-middle rc-margin-bottom--sm">
                      <div className="rc-column">
                        <LazyLoad>
                          <img
                            src={noSubscription}
                            alt="No Subscription"
                            style={{ width: '100%' }}
                          />
                        </LazyLoad>
                      </div>
                      <div className="rc-column">
                        <div className="rc-padding-right-lg rc-padding-y--sm ">
                          <h4
                            className="red"
                            style={{ fontSize: '20px', marginBottom: '20px' }}
                          >
                            <FormattedMessage id="account.noSubscriptionTitle"></FormattedMessage>
                          </h4>
                          <div className="children-nomargin">
                            <p style={{ wordBreak: 'keep-all', width: '90%' }}>
                              <FormattedMessage
                                id="account.noSubscription"
                                values={{
                                  val1: <br />
                                }}
                              />
                            </p>
                          </div>
                          <div className="rc-margin-top--sm">
                            <Link
                              className="rc-btn rc-btn--one"
                              to={subscriptionLandingRouter(
                                process.env.REACT_APP_LANG
                              )}
                            >
                              <FormattedMessage id="account.startAutoShipping"></FormattedMessage>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
            {!errMsg && dataList.length ? (
              <div className="grid-footer rc-full-width mt-2">
                <Pagination
                  loading={loading}
                  totalPage={totalPage}
                  defaultCurrentPage={currentPage}
                  key={currentPage}
                  onPageNumChange={hanldePageNumChange}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
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
    const { frequencyList, isMobile } = this.state;
    return (
      <div className="subscription">
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
                  <SideMenu type="Subscription" />
                )}
              { }
              <div className="rc-column  rc-quad-width">
                {this.getPageBox()}
                {/* {this.getPageBox(true)} */}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default injectIntl(Subscription);
