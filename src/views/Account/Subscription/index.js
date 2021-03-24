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
import subscriptionIcon from './images/subscription.png';
import cancelIcon from './images/cancel.png';
import autoshipIcon from './images/autoship.png';
import noSubscription from '@/assets/images/noSubscription.jpg';
import LazyLoad from 'react-lazyload';
import { Helmet } from 'react-helmet';
import { myAccountPushEvent } from '@/utils/GA';
import AutoshipItem from './components/AutoshipItem';
import ClubItem from './components/ClubItem';

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
      subscriptionType: 'All',
      isMobile: getDeviceType() !== 'PC'
    };
    this.pageSize = 6;
  }

  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }

  async componentDidMount() {
    myAccountPushEvent('Subscriptions');
    setSeoConfig({
      pageName: 'Account subscriptions'
    }).then((res) => {
      this.setState({ seoConfig: res });
    });
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

  getSubList() {
    const { form, initing, currentPage, subscriptionType } = this.state;
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
    if (subscriptionType !== 'All') {
      param.subscriptionType = subscriptionType;
    }
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
      subList,
      loading,
      errMsg,
      currentPage,
      totalPage
    } = this.state;
    let subscription = 'subscription';

    return (
      <div className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop">
        {subList.length ? (
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="rc-delta rc-margin--none pb-2">
              <FormattedMessage id={subscription} />
            </h4>
            <div style={{ width: '200px' }}>
              <Selection
                optionList={[
                  { name: 'All', value: 'All' },
                  { name: 'Autoship', value: 'Autoship' },
                  { name: 'Club', value: 'Club' },
                  { name: 'Contract Product', value: 'Contract Product' }
                ]}
                selectedItemChange={(el) => {
                  this.setState(
                    { subscriptionType: el.value, currentPage: 1 },
                    () => {
                      this.getSubList();
                    }
                  );
                }}
                selectedItemData={{
                  value: this.state.subscriptionType
                }}
                customStyleType="select-one"
              />
            </div>
          </div>
        ) : null}
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
            ) : subList.length ? (
              <>
                {subList.map((subItem, i) => {
                  let subItemComp = null;
                  if (subItem.subscriptionType === 'Club') {
                    subItemComp = <ClubItem subItem={subItem} />;
                  } else if (subItem.subscriptionType === 'Autoship') {
                    subItemComp = (
                      <AutoshipItem
                        subItem={subItem}
                        frequencyList={frequencyList}
                        history={this.props.history}
                      />
                    );
                  } else {
                    subItemComp = (
                      <AutoshipItem
                        subItem={subItem}
                        frequencyList={frequencyList}
                        history={this.props.history}
                      />
                    );
                  }
                  return subItemComp;
                })}
              </>
            ) : (
              <div className="rc-layout-container rc-two-column rc-content-h-middle rc-margin-bottom--sm">
                <div className="rc-column">
                  <LazyLoad style={{ width: '100%' }}>
                    <img
                      src={noSubscription}
                      alt="No Subscription"
                      className="w-100"
                    />
                  </LazyLoad>
                </div>
                <div className="rc-column">
                  <div className="rc-padding-right-lg rc-padding-y--sm ">
                    <h4
                      className="red"
                      style={{ fontSize: '20px', marginBottom: '20px' }}
                    >
                      <FormattedMessage id="account.noSubscriptionTitle" />
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
                        to="/subscription-landing"
                      >
                        <FormattedMessage id="account.startAutoShipping" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {!errMsg && subList.length ? (
              <div className="grid-footer rc-full-width mt-2">
                <Pagination
                  loading={loading}
                  totalPage={totalPage}
                  defaultCurrentPage={currentPage}
                  key={currentPage}
                  onPageNumChange={this.hanldePageNumChange}
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
              {}
              <div className="rc-column rc-quad-width">{this.getPageBox()}</div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default injectIntl(Subscription);
