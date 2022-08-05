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
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import { Link } from 'react-router-dom';
import { getSubList } from '@/api/subscription';
import { getDictionary, isMobile, getClubLogo } from '@/utils/utils';
import { funcUrl } from '@/lib/url-utils';
import noSubscription from '@/assets/images/noSubscription.jpg';
import LazyLoad from 'react-lazyload';
import { myAccountPushEvent } from '@/utils/GA';
import { ItemContainer } from './components';

import './index.less';
import nutrition from '../../../components/GoodsDetailTabs/image/pictonutrition@4x.png';
import gifticon from '../../../components/GoodsDetailTabs/image/pictogifts@4x.png';
import spetadviser from '../../../components/GoodsDetailTabs/image/pictospetadviser@4x.png';
import shippingicon from '../../../components/GoodsDetailTabs/image/pictoshipping@4x.png';
import landingBanner from '../../../components/GoodsDetailTabs/image/landing-banner.jpg';
import iconsix from '../../../components/GoodsDetailTabs/image/iconsix.png';
import auto from '../../../components/GoodsDetailTabs/image/auto@2x.png';
import { DivWrapper } from './style';
import { seoHoc } from '@/framework/common';
import { Canonical, Button } from '@/components/Common';

const localItemRoyal = window.__.localItemRoyal;
const country = window.__.env.REACT_APP_GA_COUNTRY;

//针对ru和tr noSubscription采用这个页面
const clubNoSubscription = function () {
  let clubListData = [
    {
      text: <FormattedMessage id="clubListData.tip1" />,
      img: nutrition,
      alt: 'CLUB BENEFITS PET ADVISOR'
    },
    {
      text: <FormattedMessage id="clubListData.tip2" />,
      img: gifticon,
      alt: 'CLUB BENEFITS DISCOUNT'
    },
    {
      text: <FormattedMessage id="clubListData.tip3" />,
      img: spetadviser,
      alt: 'CLUB BENEFITS PET ADVISOR'
    },
    {
      text: <FormattedMessage id="clubListData.tip4" />,
      img: auto,
      alt: 'CLUB BENEFITS PET ADVISOR'
    },
    {
      text: <FormattedMessage id="clubListData.tip5" />,
      img: shippingicon,
      alt: 'CLUB BENEFITS PET ADVISOR'
    }
  ];
  if (window.__.env.REACT_APP_COUNTRY === 'ru') {
    clubListData.push({
      text: <FormattedMessage id="clubListData.tip6" />,
      img: iconsix,
      alt: 'CLUB BENEFITS PET ADVISOR'
    });
  }
  return (
    <>
      <div className="subscription-club-no-subscription">
        <img
          className="m-auto subscription-club-no-subscription-logo"
          src={getClubLogo({})}
          alt="club icon"
        />
        <p>
          <FormattedMessage id="subscription.clubNoSubscription.tip1" />
        </p>
        <p>
          <FormattedMessage id="subscription.clubNoSubscription.tip2" />
        </p>
        <div className="rc-margin-top--sm">
          <Link to="/club-subscription">
            <Button type="primary">
              <FormattedMessage id="subscription.clubNoSubscription.getStart" />
            </Button>
          </Link>
        </div>
      </div>
      <div className="block mt-4 md:mt-0">
        <h3 className="red">
          <FormattedMessage id="subscription.clubNoSubscription" />
        </h3>
        <div className="row rc-margin-x--none flex-column-reverse flex-md-row">
          <div className="col-12 col-md-6 row rc-padding-x--none rc-margin-x--none rc-padding-top--lg--mobile">
            {clubListData.map((item, i) => (
              <div
                className="d-md-flex align-items-center col-12 col-md-12 rc-padding-left--none club-no-subscription"
                key={i}
              >
                <img
                  src={item.img}
                  alt={item.alt}
                  className="m-auto rc-margin--none--desktop"
                />
                <div className="rc-intro rc-padding-left--sm rc-margin-bottom--none text-center d-flex align-items-center h-1001111">
                  <p className="mb-0 text-left">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="col-12 col-md-6">
            <div className="rc-video-wrapper">
              <img src={landingBanner} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

@injectIntl
@seoHoc('Account subscriptions')
class Subscription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderList: [],
      subList: [],
      form: {
        subscribeId: '',
        subscribeStatus: '0'
      },
      loading: true,
      currentPage: 1,
      totalPage: 1,
      initing: true,
      errMsg: '',
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
      subscriptionTypeList: [],
      subscriptionType: 'All',
      testNumber: 0
    };
    this.pageSize = 6;
  }

  async componentDidMount() {
    let subscriptionId = funcUrl({ name: 'subscriptionId' });
    let updateLifeStage = funcUrl({ name: 'updateLifeStage' });
    let needBindPet = funcUrl({ name: 'needBindPet' });
    if (subscriptionId) {
      let res = await getSubList({ subscribeId: subscriptionId });
      console.info('res.contextres.contextres.context');
      let hasDetails = res.context?.subscriptionResponses?.length;
      if (hasDetails) {
        let url = `/account/subscription/order/detail/${subscriptionId}`;
        if (updateLifeStage) {
          url += '?updateLifeStage=true';
        }
        if (needBindPet) {
          url += '?needBindPet=true';
        }
        this.props.history.push(url);
        return;
      }
    }
    switch (country?.toLowerCase()) {
      case 'jp':
        myAccountPushEvent('My subscriptions');
        break;
      default:
        myAccountPushEvent('Subscriptions');
        break;
    }
    const res = await getDictionary({ type: 'SubscriptionType' });
    const arr = res.map((el) => {
      return {
        id: el.id,
        name: el.name,
        value: el.valueEn
      };
    });
    this.setState({
      subscriptionTypeList: arr
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
    const {
      intl: { formatMessage }
    } = this.props;
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
        let subList = res.context.subscriptionResponses;
        subList = subList.map((sItem) => {
          sItem.itemSpecLogoConf = {
            Individualization: {
              src: getClubLogo({ subscriptionType: 'Individualization' }),
              alt: 'indv logo'
            },
            Club: { src: getClubLogo({}), alt: 'club logo' }
          }[sItem.subscriptionType];
          sItem.goodsInfo = sItem.goodsInfo.map((gItem) => {
            gItem.displayGoodsName =
              sItem.subscriptionType === 'Individualization'
                ? formatMessage(
                    { id: 'subscription.personalized' },
                    { val1: gItem.petsName }
                  )
                : gItem.goodsName;
            gItem.displaySubscribeNum =
              sItem.subscriptionType === 'Individualization'
                ? 1
                : sItem.subscribeNum;

            return gItem;
          });
          return sItem;
        });
        this.setState(
          {
            subList,
            loading: false,
            initing: false,
            currentPage: res.context.currentPage + 1,
            totalPage: Math.ceil(res.context.total / this.pageSize)
          },
          () => {
            // 未查询出结果时，显示订阅ad
            // if (!this.state.subList.length) {
            //   this.setState({
            //     errMsg: this.props.intl.messages['subscription.noDataTip']
            //   });
            // } else {
            //   this.setState({
            //     errMsg: ''
            //   });
            // }
          }
        );
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
    const { subList, loading, errMsg, currentPage, totalPage } = this.state;
    let subscription = 'subscription';

    return (
      <div className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop">
        {this.state.subscriptionType !== 'All' || subList.length ? (
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="rc-delta rc-margin--none pb-2">
              <FormattedMessage id={subscription} />
            </h4>
            <div style={{ width: isMobile ? '100px' : '200px' }}>
              <Selection
                optionList={this.state.subscriptionTypeList}
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
            ) : this.state.subscriptionType !== 'All' || subList.length ? (
              <>
                {subList.map((subItem, i) => {
                  return (
                    <ItemContainer {...this.props} subItem={subItem} key={i} />
                  );
                })}
              </>
            ) : window.__.env.REACT_APP_COUNTRY === 'ru' ||
              window.__.env.REACT_APP_COUNTRY === 'tr' ? (
              clubNoSubscription()
            ) : (
              <div className="rc-layout-container rc-two-column rc-content-h-middle rc-margin-bottom--sm">
                <div className="rc-column p-4">
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
                    <h4 className="red text-xl mb-5">
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
                      <Link to={'/subscription-landing'}>
                        <Button type="primary">
                          <FormattedMessage id="account.startAutoShipping" />
                        </Button>
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
    return (
      <DivWrapper className="subscription">
        <GoogleTagManager
          key={this.props.location.key}
          additionalEvents={event}
        />
        <Canonical />
        <Header {...this.props} showMiniIcons={true} showUserIcon={true} />
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
                <SideMenu type="Subscription" />
              )}
              {}
              <div className="rc-column rc-quad-width">{this.getPageBox()}</div>
            </div>
          </div>
          <Footer />
        </main>
      </DivWrapper>
    );
  }
}

export default Subscription;
