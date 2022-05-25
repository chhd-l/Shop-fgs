import React from 'react';
import { inject, observer } from 'mobx-react';
import Skeleton from 'react-skeleton-loader';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';
import BreadCrumbs from '@/components/BreadCrumbs';
import SideMenu from '@/components/SideMenu';
import Modal from '@/components/Modal';
import BannerTip from '@/components/BannerTip';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import { IMG_DEFAULT } from '@/utils/constant';
import LazyLoad from 'react-lazyload';
import PageBaseInfo from '@/components/PageBaseInfo';
import AppointmentInfo from './modules/AppointmentInfo';
import { getWays } from '@/api/payment';
import { getMemberAppointDetail, cancelAppointByNo } from '@/api/appointment';
import { formatDate, handleAppointmentDict } from '@/utils/utils';

function HeadTip(props) {
  return (
    <>
      <div className="row align-items-center text-left mx-1 mb-2 md:mx-0">
        <div className="col-3 col-md-1">{props.icon}</div>
        <div className={`col-9 col-md-11`}>
          <span
            className={`font-weight-normal color-444 ${props.titleColor || ''}`}
          >
            {props.title}
          </span>
          <br />
          {props.tip}
        </div>
        {props.moreTip ? <>{props.moreTip}</> : null}
      </div>
    </>
  );
}

@inject('paymentStore')
@injectIntl
@observer
class AccountOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appointmentNo: '',
      details: null,
      loading: true,
      errMsg: '',
      cancelAppointModalVisible: false,
      errModalText: '',
      errModalVisible: false
    };
  }
  componentDidMount() {
    const { paymentStore } = this.props;
    this.setState(
      {
        appointmentNo: this.props.match.params.appointmentNo
      },
      () => {
        this.init();
      }
    );
    getWays().then((res) => {
      paymentStore.setSupportPaymentMethods(
        res?.context?.payPspItemVOList[0]?.payPspItemCardTypeVOList || []
      );
    });
  }
  async init() {
    const { appointmentNo } = this.state;
    this.setState({ loading: true });
    try {
      const res = await getMemberAppointDetail({ apptNo: appointmentNo });
      let resContext = res.context.settingVO;
      const dictRes = await handleAppointmentDict(resContext);
      const details = Object.assign(resContext, {
        canChangeAppoint: resContext.status === 0 && resContext.businessPaid,
        canCancelAppoint: resContext.status === 0,
        cancelAppointLoading: false,
        appointmentType: dictRes?.appointType,
        expertType: dictRes?.expertName,
        appointmentStatus:
          resContext.status === 0 ? (
            <FormattedMessage id="appointment.status.Booked" />
          ) : resContext.status === 1 ? (
            <FormattedMessage id="appointment.status.Arrived" />
          ) : (
            <FormattedMessage id="appointment.status.Cancel" />
          )
      });
      this.setState({
        details: details,
        loading: false
      });
    } catch (err) {
      this.setState({
        loading: false,
        errMsg: err.message.toString()
      });
    }
  }
  //特殊处理feline订单HeadTip
  renderFelineHeadTip = () => {
    const { details } = this.state;
    let ret = null;
    switch (details.status) {
      case 0: // Booked
        ret = (
          <>
            <HeadTip
              icon={
                <i className="iconfont iconfuwudiqiu ml-3 text-rc-detail-red text-5xl" />
              }
              title={<FormattedMessage id="appointment.serviceBooked" />}
              titleColor="text-warning"
              tip={<FormattedMessage id="appointment.serviceBookedTip" />}
            />
            <hr />
          </>
        );
        break;
      case 1: // Arrived
        ret = (
          <>
            <HeadTip
              icon={
                <i className="iconfont iconfuwudiqiu ml-3 text-rc-detail-red text-5xl" />
              }
              title={<FormattedMessage id="appointment.serviceArrived" />}
              titleColor="text-warning"
              tip={<FormattedMessage id="appointment.serviceArrivedTip" />}
            />
            <hr />
          </>
        );
        break;
    }
    return ret;
  };
  async cancelAppoint() {
    const { details } = this.state;
    try {
      await cancelAppointByNo({ apptNo: details.apptNo });
      await this.init();
    } catch (err) {
      this.setState({ errModalVisible: true, errModalText: err.message });
    } finally {
      this.setState({ cancelAppointModalVisible: false });
    }
  }
  //feline订单操作按钮显示
  renderOperationBtns = () => {
    const { details } = this.state;
    return (
      <>
        {/*felin订单cancel appoint*/}
        {details.canCancelAppoint ? (
          <span
            className="inline-flex items-center cursor-pointer"
            onClick={() => {
              this.setState({ cancelAppointModalVisible: true });
            }}
          >
            <span className="iconfont iconchahao text-rc-red mr-2" />
            <FormattedMessage id="cancel" />
          </span>
        ) : null}
        {/*felin订单change appoint*/}
        {details.canChangeAppoint ? (
          <span className="ml-4 md:ml-8 inline-flex items-center">
            <span className="iconfont iconedit-data text-green mr-2" />
            <FormattedMessage id="appointment.reSchedule">
              {(txt) => (
                <Link to={`/felin?id=${details.apptNo}`} title={txt} alt={txt}>
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
    const { details } = this.state;

    return (
      <div>
        <PageBaseInfo additionalEvents={event} />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3 ord-detail">
          <BannerTip />
          <BreadCrumbs />
          <div className="md:p-8 rc-max-width--xl">
            <div className="rc-layout-container rc-five-column">
              <SideMenu type="Appointments" customCls="rc-md-up" />
              <div className="my__account-content rc-column rc-quad-width p-2">
                <Link
                  to="/account/appointments"
                  className="rc-md-down mt-3 ml-2 inlineblock"
                >
                  <span className="red">&lt;</span>
                  <span className="rc-styled-link rc-progress__breadcrumb ml-2">
                    <FormattedMessage id="account.appointmentsTitle" />
                  </span>
                </Link>
                <div className="card confirm-details orderDetailsPage mx-0 border-0">
                  {this.state.loading ? (
                    <Skeleton
                      color="#f5f5f5"
                      width="100%"
                      height="50%"
                      count={5}
                    />
                  ) : details ? (
                    <div className="card-body p-0">
                      {this.renderFelineHeadTip()}
                      <div className="row mx-2 md:mx-0 mt-4">
                        <div className="col-12 flex md:flex-row flex-col border md:bg-rc-f6 rounded mt-3 md:mt-0 pt-3 pb-2 px-1 md:px-4 md:py-3">
                          <div className="col-md-3">
                            <FormattedMessage id="appointment.appointmentPlacedOn" />
                            <br />
                            <span className="medium orderHeaderTextColor">
                              {formatDate({ date: details.createTime })}
                            </span>
                          </div>
                          <div className="col-md-3">
                            <FormattedMessage id="appointment.appointmentNumber" />
                            <br />
                            <span className="medium orderHeaderTextColor">
                              {details.apptNo}
                            </span>
                          </div>
                          <div className="col-md-3">
                            <FormattedMessage id="appointment.appointmentStatus" />
                            <br />
                            <span
                              className="medium orderHeaderTextColor"
                              title={details.appointmentStatus}
                            >
                              {details.appointmentStatus}
                            </span>
                          </div>
                        </div>
                        <div className="col-12 order-list-container rder__listing md:border md:border-rc-ddd rounded mx-0 md:mt-3 mb-2 row align-items-center p-2">
                          <div className="col-4 col-md-2 d-flex justify-content-center align-items-center">
                            <LazyLoad className="w-full">
                              <img
                                className="w-100"
                                style={{ maxWidth: '70%' }}
                                src={details.goodsInfoImg || IMG_DEFAULT}
                                alt={details.goodsInfoName}
                                title={details.goodsInfoName}
                              />
                            </LazyLoad>
                          </div>
                          <div className="col-8 col-md-4">
                            <span
                              className="medium ui-text-overflow-line2 text-break color-444"
                              title={details.goodsInfoName}
                            >
                              {details.goodsInfoName}
                            </span>
                            <span className="ui-text-overflow-line2">
                              <span>
                                {details.expertType} – {details.minutes}
                                <FormattedMessage id="min" /> –
                                {details.appointmentType}
                              </span>
                            </span>
                          </div>
                          <div
                            className={`col-12 col-md-6 md:pr-8 font-weight-normal d-flex justify-end flex-row`}
                          >
                            {this.renderOperationBtns()}
                          </div>
                        </div>
                      </div>
                      <AppointmentInfo details={details} />
                    </div>
                  ) : this.state.errMsg ? (
                    <div className="text-center mt-5">
                      <span className="rc-icon rc-incompatible--xs rc-iconography" />
                      {this.state.errMsg}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <Modal
            key="2"
            visible={this.state.cancelAppointModalVisible}
            modalTitle={<FormattedMessage id="appointment.delApptModalTitle" />}
            modalText={
              <FormattedMessage id="appointment.delApptModalContent" />
            }
            cancelBtnText={
              <FormattedMessage id="appointment.delApptModel.cancel" />
            }
            confirmBtnText={
              <FormattedMessage id="appointment.delApptModel.confirm" />
            }
            close={() => {
              this.setState({ cancelAppointModalVisible: false });
            }}
            hanldeClickConfirm={() => this.cancelAppoint()}
          />
          <Modal
            key="3"
            visible={this.state.errModalVisible}
            modalText={this.state.errModalText}
            close={() => {
              this.setState({ errModalVisible: false });
            }}
            hanldeClickConfirm={() => {
              this.setState({ errModalVisible: false });
            }}
          />
          <Footer />
        </main>
      </div>
    );
  }
}

export default AccountOrders;
