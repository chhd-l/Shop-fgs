import React from 'react';
import Skeleton from 'react-skeleton-loader';
import { inject, observer } from 'mobx-react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import BreadCrumbs from '@/components/BreadCrumbs';
import SideMenu from '@/components/SideMenu';
import Pagination from '@/components/Pagination';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { getDeviceType, formatDate, getDictionary } from '@/utils/utils';
import appointmentImg from '@/assets/images/no-appointments.png';
import { IMG_DEFAULT } from '@/utils/constant';
import LazyLoad from 'react-lazyload';
import { myAccountPushEvent } from '@/utils/GA';
import './index.less';
import { getAppointList } from '@/api/appointment';
import { funcUrl } from '@/lib/url-utils';
import { seoHoc } from '@/framework/common';
import Canonical from '@/components/Canonical';

@inject('checkoutStore')
@injectIntl
@seoHoc('Account orders')
@observer
class AccountOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appointmentList: [],
      loading: true,
      initLoading: true,
      currentPage: 1,
      totalPage: 1,
      initing: true,
      errMsg: '',
      everHaveNoOrders: true
    };

    this.pageSize = 6;
    this.deviceType = getDeviceType();
    this.handleClickCardItem = this.handleClickCardItem.bind(this);
  }

  componentDidMount() {
    myAccountPushEvent('Appointments');
    const appointmentNo = funcUrl({ name: 'appointmentNo' });
    if (appointmentNo) {
      this.props.history.push(`/account/appointments/detail/${appointmentNo}`);
      return;
    }
    this.queryOrderList();
  }

  async queryOrderList() {
    const { initing, currentPage } = this.state;
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
      pageSize: this.pageSize
    };
    try {
      const res = await getAppointList(param);
      let appointDictRes = await Promise.all([
        getDictionary({
          type: 'appointment_type'
        }),
        getDictionary({
          type: 'expert_type'
        })
      ]);
      let tmpList = Array.from(res.context.page.content, (ele) => {
        const appointmentDictRes = appointDictRes[0].filter(
          (item) => item.id === ele?.apptTypeId
        );
        const expertDictRes = appointDictRes[1].filter(
          (item) => item.id === ele?.expertTypeId
        );
        return Object.assign(ele, {
          canChangeAppoint: ele.status === 0 && ele.businessPaid,
          canCancelAppoint: ele.status === 0,
          cancelAppointLoading: false,
          appointmentType:
            appointmentDictRes.length > 0 ? appointmentDictRes[0]?.name : '',
          expertType: expertDictRes.length > 0 ? expertDictRes[0].name : '',
          appointmentStatus:
            ele.status === 0 ? (
              <FormattedMessage id="appointment.status.Booked" />
            ) : ele.status === 1 ? (
              <FormattedMessage id="appointment.status.Arrived" />
            ) : (
              <FormattedMessage id="appointment.status.Cancel" />
            )
        });
      });
      if (this.state.initing) {
        this.setState({ everHaveNoOrders: !tmpList.length });
      }
      this.setState({
        appointmentList: tmpList,
        totalPage: res.context.page.totalPages
      });
    } catch (err) {
      this.setState({
        errMsg: err.message.toString()
      });
    } finally {
      this.setState({
        loading: false,
        initing: false,
        initLoading: false
      });
    }
  }

  handlePageNumChange = (params) => {
    this.setState(
      {
        currentPage: params.currentPage
      },
      () => this.queryOrderList()
    );
  };

  handleClickCardItem(item) {
    if (this.deviceType !== 'PC') {
      this.props.history.push(`/account/appointments/detail/${item.apptNo}`);
    }
  }

  renderOperationBtns = (appointment) => {
    return (
      <>
        {/*felin订单change appoint*/}
        {appointment.canChangeAppoint ? (
          <span className="inline-flex items-center">
            <span className="iconfont iconedit-data text-green mr-2" />
            <FormattedMessage id="appointment.reSchedule">
              {(txt) => (
                <Link
                  to={`/felin?id=${appointment.apptNo}`}
                  title={txt}
                  alt={txt}
                >
                  {txt}
                </Link>
              )}
            </FormattedMessage>
          </span>
        ) : null}
      </>
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
    const { errMsg, everHaveNoOrders, appointmentList } = this.state;
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
          <div className="md:p-8 rc-max-width--xl ord-list">
            <div className="rc-layout-container rc-five-column">
              <SideMenu type="Appointments" customCls="rc-md-up" />
              <div
                className={`my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop px-0 md:px-3`}
              >
                {this.state.initLoading ? (
                  <div className="mt-4">
                    <Skeleton
                      color="#f5f5f5"
                      width="100%"
                      height="50%"
                      count={4}
                    />
                  </div>
                ) : errMsg ? (
                  <div className="text-center mt-5">
                    <span className="rc-icon rc-incompatible--xs rc-iconography" />
                    {errMsg}
                  </div>
                ) : everHaveNoOrders ? (
                  <>
                    {/* 无任何预约 */}
                    <div className={`content-asset`}>
                      <div className="rc-layout-container rc-two-column">
                        <div className="rc-column p-4	">
                          <LazyLoad>
                            <img
                              src={appointmentImg}
                              className="w-100"
                              alt="appointment image"
                            />
                          </LazyLoad>
                        </div>
                        <div className="rc-column d-flex align-items-center justify-content-center">
                          <div>
                            <p className="mb-2">
                              <FormattedMessage id="account.appointment.tips" />
                            </p>
                            <Link
                              href=""
                              to="/felin"
                              className="rc-btn rc-btn--one"
                            >
                              <FormattedMessage id="account.appointment.btns" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="row m-0 mb-3 md:m-0">
                      <div className="col-12 rc-md-down">
                        <Link to="/account">
                          <span className="red">&lt;</span>
                          <span className="rc-styled-link rc-progress__breadcrumb ml-2 mt-1">
                            <FormattedMessage id="account.home" />
                          </span>
                        </Link>
                      </div>
                    </div>

                    <div className="order__listing">
                      <div className="appointment-list-container">
                        {this.state.loading ? (
                          <div className="mt-4">
                            <Skeleton
                              color="#f5f5f5"
                              width="100%"
                              height="50%"
                              count={4}
                            />
                          </div>
                        ) : appointmentList.length ? (
                          <>
                            {appointmentList.map((appointment) => {
                              return (
                                <div
                                  className="card-container border border-d7d7d7"
                                  key={appointment.id}
                                  onClick={this.handleClickCardItem.bind(
                                    this,
                                    appointment
                                  )}
                                >
                                  <div className="card rc-margin-y--none ml-0 border-0">
                                    <div className="card-header border-color-d7d7d7 row rc-margin-x--none align-items-center pl-0 pr-0 rc-md-up bg-rc-f6">
                                      <div className="col-12 col-md-2">
                                        <p>
                                          <FormattedMessage id="appointment.appointmentPlacedOn" />
                                          <br className="d-none d-md-block" />
                                          <span className="medium orderHeaderTextColor">
                                            {formatDate({
                                              date: appointment.createTime
                                            })}
                                          </span>
                                        </p>
                                      </div>
                                      <div className="col-12 col-md-3">
                                        <p>
                                          <FormattedMessage id="appointment.appointmentNumber" />
                                          <br className="d-none d-md-block" />
                                          <span className="medium orderHeaderTextColor">
                                            {appointment.apptNo}
                                          </span>
                                        </p>
                                      </div>
                                      <div className="col-12 col-md-3">
                                        <p>
                                          <FormattedMessage id="appointment.appointmentStatus" />
                                          <br className="d-none d-md-block" />
                                          <span
                                            className="medium orderHeaderTextColor"
                                            title={
                                              appointment.appointmentStatus
                                            }
                                          >
                                            {appointment.appointmentStatus}
                                          </span>
                                        </p>
                                      </div>
                                      <div className="col-12 col-md-1" />
                                      <div className="col-12 col-md-3 text-nowrap padding0">
                                        <FormattedMessage id="appointment.appointmentDetails">
                                          {(txt) => (
                                            <Link
                                              className="d-flex rc-padding-left--none rc-btn rc-btn--icon-label rc-padding-right--none orderDetailBtn text-wrap align-items-center"
                                              to={`/account/appointments/detail/${appointment.apptNo}`}
                                            >
                                              <em className="rc-iconography rc-icon rc-news--xs" />
                                              <span
                                                className="medium pull-right--desktop rc-styled-link text-current"
                                                title={txt}
                                              >
                                                {txt}
                                              </span>
                                            </Link>
                                          )}
                                        </FormattedMessage>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row mb-3 mt-3 align-items-center m-0 relative">
                                    <div className="col-10 col-md-9">
                                      <div
                                        className={`row rc-margin-x--none align-items-center`}
                                      >
                                        <div className="col-4 col-md-2 d-flex justify-content-md-center">
                                          <LazyLoad>
                                            <img
                                              className="ord-list-img-fluid"
                                              src={
                                                appointment.goodsInfoImg ||
                                                IMG_DEFAULT
                                              }
                                              alt={appointment.goodsInfoName}
                                              title={appointment.goodsInfoName}
                                            />
                                          </LazyLoad>
                                        </div>
                                        <div className="col-8 col-md-6">
                                          <span className="medium color-444 ui-text-overflow-line2">
                                            {appointment.goodsInfoName}
                                          </span>
                                          <span>
                                            {appointment.expertType} –{' '}
                                            {appointment.minutes}
                                            <FormattedMessage id="min" /> –
                                            {appointment.appointmentType}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-2 col-md-3 text-center md:pl-0 md:pr-0">
                                      <div className="rc-md-up">
                                        {this.renderOperationBtns(appointment)}
                                      </div>
                                      <span className="iconfont iconjiantouyou1 bold rc-md-down font-20" />
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </>
                        ) : (
                          <div className="text-center margin-50">
                            <FormattedMessage id="appointment.noDataTip" />
                          </div>
                        )}
                        {!appointmentList.length ? null : (
                          <div className="grid-footer rc-full-width mt-4 md:mt-2">
                            <Pagination
                              loading={this.state.loading}
                              totalPage={this.state.totalPage}
                              defaultCurrentPage={this.state.currentPage}
                              key={this.state.currentPage}
                              onPageNumChange={this.handlePageNumChange}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </div>
    );
  }
}
export default AccountOrders;
