import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BreadCrumbs from '@/components/BreadCrumbs';
import SideMenu from '@/components/SideMenu';
import BannerTip from '@/components/BannerTip';
import ConfirmTooltip from '@/components/ConfirmTooltip';
import './index.css';
import {
  getAddressList,
  setDefaltAddress,
  deleteAddress,
  getAddressById
} from '@/api/address';
import { queryCityNameById } from '@/api';
import { Link } from 'react-router-dom';
import Loading from '@/components/Loading';
import Skeleton from 'react-skeleton-loader';
import { getDictionary, setSeoConfig, matchNamefromDict } from '@/utils/utils';
import { Helmet } from 'react-helmet';

const localItemRoyal = window.__.localItemRoyal;
const pageLink = window.location.href;

class ShippingAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      listLoading: true,
      showModal: false,
      isAdd: true,
      addressList: [],
      seoConfig: {
        title: '',
        metaKeywords: '',
        metaDescription: ''
      },
      total: 0,
      errorMsg: '',
      successMsg: '',
      addressForm: {
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        country: '1',
        city: '1',
        postCode: '',
        phoneNumber: '',
        rfc: '',
        isDefalt: false,
        deliveryAddressId: '',
        customerId: ''
      },
      countryList: [],
      currentType: 'DELIVERY',
      currentAddressList: []
    };
  }

  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  componentDidMount() {
    setSeoConfig().then((res) => {
      this.setState({ seoConfig: res });
    });
    // if (localItemRoyal.get('isRefresh')) {
    //   localItemRoyal.remove('isRefresh');
    //   window.location.reload();
    //   return false;
    // }
    this.getAddressList();
    getDictionary({ type: 'country' })
      .then((res) => {
        this.setState({
          countryList: res
        });
      })
      .catch((err) => {
        this.showErrorMsg(
          err.message.toString() || this.props.intl.messages.getDataFailed
        );
      });
  }
  getAddressList = async () => {
    this.setState({ listLoading: true });
    try {
      let res = await getAddressList();
      let addressList = res.context;
      let total = addressList.length;
      let cityRes = await queryCityNameById({
        id: addressList.map((ele) => ele.cityId)
      });
      cityRes = cityRes.context.systemCityVO || [];
      Array.from(addressList, (ele) => {
        ele.cityName = cityRes.filter((c) => c.id === ele.cityId).length
          ? cityRes.filter((c) => c.id === ele.cityId)[0].cityName
          : ele.cityId;
        return ele;
      });
      this.setState({
        addressList: addressList,
        total: total
      });
      this.switchAddressType(this.state.currentType);
      this.setState({ listLoading: false });
    } catch (err) {
      this.showErrorMsg(
        err.message || this.props.intl.messages.queryDataFailed
      );
      this.setState({ listLoading: false });
    }
  };
  getAddressById = async (id) => {
    let params = {
      id: id
    };
    const res = await getAddressById(params);
    let data = res.context;
    let nameArr = data.consigneeName.split(' ');
    let addressArr = data.deliveryAddress.split(' ');
    let addressForm = {
      firstName: nameArr[0],
      lastName: nameArr[1],
      address1: addressArr[0],
      address2: addressArr[1],
      country: data.areaId,
      city: data.cityId,
      postCode: data.postCode,
      phoneNumber: data.consigneeNumber,
      rfc: data.rfc,
      isDefalt: data.isDefaltAddress === 1 ? true : false,
      deliveryAddressId: data.deliveryAddressId,
      customerId: data.customerId
    };

    this.setState({
      addressForm: addressForm,
      showModal: true,
      isAdd: false
    });
  };

  onFormChange = ({ field, value }) => {
    let data = this.state.addressForm;
    data[field] = value;
    this.setState({
      addressForm: data
    });
  };
  isDefalt = () => {
    let data = this.state.addressForm;
    data.isDefalt = !data.isDefalt;
    this.setState({
      addressForm: data
    });
  };

  setDefaltAddress = async (id) => {
    this.setState({
      loading: true
    });
    let params = {
      deliveryAddressId: id
    };
    await setDefaltAddress(params)
      .then((res) => {
        this.showSuccessMsg(
          res.message || this.props.intl.messages.setDefaltAddressSuccess
        );
        this.getAddressList();
      })
      .catch((err) => {
        this.showErrorMsg(this.props.intl.messages.setDefaltAddressFailed);
        this.setState({
          loading: false
        });
      });
  };
  deleteAddress = async (item) => {
    let { addressList } = this.state;
    item.confirmTooltipVisible = false;
    this.setState({
      loading: true,
      addressList: addressList
    });
    if (item.canDelFlag === false) {
      this.showErrorMsg(this.props.intl.messages.deleteAddressTip);
      return;
    }
    await deleteAddress({ id: item.deliveryAddressId })
      .then((res) => {
        this.setState({ loading: false });
        this.showSuccessMsg(
          res.message || this.props.intl.messages.deleteAddressSuccess
        );
        this.getAddressList();
      })
      .catch((err) => {
        this.showErrorMsg(
          err.message.toString() || this.props.intl.messages.deleteAddressFailed
        );
        this.setState({ loading: false });
      });
  };
  showErrorMsg = (message) => {
    this.setState({
      errorMsg: message
    });
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    setTimeout(() => {
      this.setState({
        errorMsg: ''
      });
    }, 3000);
  };

  showSuccessMsg = (message) => {
    this.setState({
      successMsg: message
    });
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    setTimeout(() => {
      this.setState({
        successMsg: ''
      });
    }, 2000);
  };

  //定位
  scrollToErrorMsg() {
    const widget = document.querySelector('.content-asset');
    // widget && widget.scrollIntoView()
    // console.log(this.getElementToPageTop(widget))
    if (widget) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
  getElementToPageTop(el) {
    if (el.parentElement) {
      return this.getElementToPageTop(el.parentElement) + el.offsetTop;
    }
    return el.offsetTop;
  }
  openCreatePage = () => {
    const { history } = this.props;
    history.push('/account/shippingAddress/create');
  };
  openEditPage = (id) => {
    const { history } = this.props;
    history.push('/account/shippingAddress/' + id);
  };
  updateConfirmTooltipVisible(item, status) {
    let { addressList } = this.state;
    item.confirmTooltipVisible = status;
    this.setState({
      addressList: addressList
    });
  }
  switchAddressType = (type) => {
    const { addressList } = this.state;
    let currentAddressList = addressList.filter((item) => {
      return item.type === type;
    });
    this.setState({
      currentType: type,
      currentAddressList: currentAddressList
    });
  };
  render() {
    return (
      <div>
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
              {/* {this.state.loading ? <Loading positionFixed="true" /> : null} */}
              <SideMenu type="ShippingAddress" />
              <div className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop">
                {/* <div className="rc-border-bottom rc-border-colour--interface mb-2">
                  <h4 className="rc-delta rc-margin--none">
                    <FormattedMessage id="shippingAddress"></FormattedMessage>
                  </h4>
                </div> */}
                <div className="content-asset">
                  <div
                    className={`js-errorAlertProfile-personalInfo rc-margin-bottom--xs ${
                      this.state.errorMsg ? '' : 'hidden'
                    }`}
                  >
                    <aside
                      className="rc-alert rc-alert--error rc-alert--with-close errorAccount"
                      role="alert"
                    >
                      <span className="pl-0">{this.state.errorMsg}</span>
                      <button
                        className="rc-btn rc-alert__close rc-icon rc-close-error--xs"
                        onClick={() => {
                          this.setState({ errorMsg: '' });
                        }}
                        aria-label="Close"
                      >
                        <span className="rc-screen-reader-text">
                          <FormattedMessage id="close" />
                        </span>
                      </button>
                    </aside>
                  </div>
                  <aside
                    className={`rc-alert rc-alert--success js-alert js-alert-success-profile-info rc-alert--with-close rc-margin-bottom--xs ${
                      this.state.successMsg ? '' : 'hidden'
                    }`}
                    role="alert"
                  >
                    <p className="success-message-text rc-padding-left--sm--desktop rc-padding-left--lg--mobile rc-margin--none">
                      {this.state.successMsg}
                    </p>
                  </aside>
                  {/* <div className="table-toolbar">
                    <div style={{ display: 'flex' }}>
                      <span className="type-text">
                        <FormattedMessage id="type"></FormattedMessage>
                      </span>

                      <span className="dividing"></span>

                      <button type="button"
                        onClick={() => this.switchAddressType('DELIVERY')}
                        className={this.state.currentType === 'DELIVERY' ? 'selected-btn' : "type-btn"} >
                        <span> <FormattedMessage id="deliveryAddress"></FormattedMessage></span>
                      </button>

                      <span className="dividing"></span>

                      <button type="button"
                        onClick={() => this.switchAddressType('BILLING')}
                        className={this.state.currentType === 'BILLING' ? 'selected-btn' : "type-btn"}>
                        <span> <FormattedMessage id="billingAddress"></FormattedMessage></span>
                      </button>

                      <span className="dividing"></span>
                    </div>
                    <button type="button" className="address-btn" onClick={() => this.openCreatePage()}>
                      <span><FormattedMessage id="newAddress"></FormattedMessage></span>
                    </button>
                  </div> */}
                  <nav
                    className="rc-tabs__controller rc-fade--x "
                    data-toggle-group=""
                  >
                    <ul
                      className="rc-scroll--x rc-list rc-list--inline rc-list--align rc-list--blank text-break"
                      role="tablist"
                    >
                      <li className="rc-tabs-li">
                        <button
                          className="rc-tab text-break"
                          onClick={() => this.switchAddressType('DELIVERY')}
                          style={{ padding: '8px 15px' }}
                          data-toggle="deliveryAddress"
                          role="tab"
                        >
                          <FormattedMessage id="deliveryAddress"></FormattedMessage>
                        </button>
                      </li>
                      <li className="rc-tabs-li">
                        <button
                          className="rc-tab text-break"
                          onClick={() => this.switchAddressType('BILLING')}
                          style={{ padding: '8px 15px' }}
                          data-toggle="billingAddress"
                          role="tab"
                        >
                          <FormattedMessage id="billingAddress"></FormattedMessage>
                        </button>
                      </li>
                    </ul>
                  </nav>
                  <div className="address-add-btn">
                    <span
                      className="red font-weight-normal ui-cursor-pointer"
                      onClick={() => this.openCreatePage()}
                    >
                      <span className="d-flex align-items-center">
                        <span className="rc-icon rc-plus--xs rc-brand1 address-btn-plus"></span>
                        <span>
                          <FormattedMessage id="newAddress" />
                        </span>
                      </span>
                    </span>
                    {/* <button className="address-btn" onClick={() => this.openCreatePage()}>
                      <span><FormattedMessage id="newAddress"></FormattedMessage></span>
                    </button> */}
                  </div>

                  {this.state.listLoading ? (
                    <div className="mt-5">
                      <Skeleton
                        color="#f5f5f5"
                        width="100%"
                        height="100%"
                        count={4}
                      />
                    </div>
                  ) : (
                    <div className="row address-layout">
                      {this.state.currentAddressList.map((item) => (
                        <div
                          className="col-lg-6"
                          style={{ padding: '10px 25px' }}
                          key={item.deliveryAddressId}
                        >
                          {/* <div className="addr-line"></div> */}
                          <div
                            className={
                              'row card-address ' +
                              (item.isDefaltAddress === 1
                                ? 'card-address-default'
                                : '')
                            }
                          >
                            <div className="col-10 card-phone-title word-break">
                              <div className="address-name">
                                <span>
                                  {item.firstName + ' ' + item.lastName}
                                </span>
                                {item.isDefaltAddress === 1 ? (
                                  <span className="icon-default rc-border-colour--brand1 rc-text-colour--brand1">
                                    <FormattedMessage id="default" />
                                  </span>
                                ) : null}
                              </div>
                            </div>
                            <div className="col-2 address-action card-phone-action">
                              <a
                                className="address-click-btn"
                                onClick={() =>
                                  this.openEditPage(item.deliveryAddressId)
                                }
                              >
                                <FormattedMessage id="edit" />
                              </a>

                              <span className="dividing-action"></span>
                              <a
                                className="address-click-btn"
                                onClick={() =>
                                  this.updateConfirmTooltipVisible(item, true)
                                }
                              >
                                <FormattedMessage id="delete" />
                              </a>
                              <ConfirmTooltip
                                containerStyle={{
                                  transform: 'translate(-96%, 105%)'
                                }}
                                arrowStyle={{ left: '89%' }}
                                display={item.confirmTooltipVisible}
                                confirm={(e) => this.deleteAddress(item)}
                                updateChildDisplay={(status) =>
                                  this.updateConfirmTooltipVisible(item, status)
                                }
                              />
                              {/* <a className="address-click-btn"><FormattedMessage id="delete" /></a> */}
                            </div>
                            <div
                              className="col-lg-12"
                              style={{ fontSize: '12px' }}
                            >
                              <div>
                                <span>{item.consigneeNumber}</span>
                              </div>
                              <div>
                                <span>
                                  {matchNamefromDict(
                                    this.state.countryList,
                                    item.countryId
                                  )}
                                </span>
                              </div>
                              <div>
                                <span>{item.cityName}</span>
                              </div>
                              <div>
                                <span>{item.address1}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
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

export default injectIntl(ShippingAddress);
