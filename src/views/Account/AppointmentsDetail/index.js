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
import './index.less';
import LazyLoad from 'react-lazyload';
import PageBaseInfo from '@/components/PageBaseInfo';
import AppointmentInfo from './modules/AppointmentInfo';
import { getWays } from '@/api/payment';
import { getAppointDetail, cancelAppointByNo } from '@/api/appointment';
import { getAppointDict } from '@/api/dict';
import { getFormatDate } from '@/utils/utils';

const localItemRoyal = window.__.localItemRoyal;

function HeadTip(props) {
  return (
    <>
      <div className="row align-items-center text-left ml-1 mr-1 md:ml-0 md:mr-0">
        <div className="col-3 col-md-1">{props.icon}</div>
        <div className={`col-9 ${props.operation ? 'col-md-7' : 'col-md-11'}`}>
          <span
            className={`font-weight-normal color-444 ${props.titleColor || ''}`}
          >
            {props.title}
          </span>
          <br />
          {window.__.env.REACT_APP_COUNTRY !== 'us' ? props.tip : null}
        </div>
        {props.operation ? (
          <div className="col-12 col-md-4 md:text-right text-center">
            <span className="sticky-operation-btn rc-md-down">
              {props.operation}
            </span>
            <span className="rc-md-up">{props.operation}</span>
          </div>
        ) : null}
        {props.moreTip ? <>{props.moreTip}</> : null}
      </div>
    </>
  );
}

@inject('checkoutStore', 'configStore', 'paymentStore')
@injectIntl
@observer
class AccountOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appointmentNo: '',
      details: null,
      loading: true,
      cancelOrderLoading: false,
      errMsg: '',
      cancelAppointModalVisible: false,
      normalProgressList: [],
      currentProgressIndex: -1
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
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  async init() {
    const { appointmentNo } = this.state;
    this.setState({ loading: true });
    try {
      const res = await getAppointDetail({ apptNo: appointmentNo });
      let resContext = res.context.settingVO;
      const appointDictRes = await Promise.all([
        getAppointDict({
          type: 'appointment_type'
        }),
        getAppointDict({
          type: 'expert_type'
        })
      ]);
      const appointmentType = (
        appointDictRes[0]?.context?.goodsDictionaryVOS || []
      ).filter((item) => item.id === resContext?.apptTypeId);
      const expertType = (
        appointDictRes[1]?.context?.goodsDictionaryVOS || []
      ).filter((item) => item.id === resContext?.expertTypeId);
      const details = Object.assign(resContext, {
        canChangeAppoint: true,
        canCancelAppoint: true,
        cancelAppointLoading: false,
        appointmentType:
          appointmentType.length > 0 ? appointmentType[0].name : '',
        expertType: expertType.length > 0 ? expertType[0].name : '',
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
        loading: false,
        currentProgressIndex: 1 || resContext.status
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
    const { currentProgressIndex, normalProgressList } = this.state;
    let ret = null;
    switch (currentProgressIndex) {
      case 0: // Appointment confirmed
        ret = (
          <>
            <HeadTip
              icon={
                <svg className="svg-icon w-14 h-14" aria-hidden="true">
                  <use xlinkHref="#iconTobepaid" />
                </svg>
              }
              title={normalProgressList[currentProgressIndex]?.flowStateDesc}
              titleColor="text-info"
              tip={<FormattedMessage id="orderStatus.INITTip" />}
            />
            <hr />
          </>
        );
        break;
      case 1: // Order paid
        ret = (
          <>
            <HeadTip
              icon={
                <i
                  className="iconfont iconfuwudiqiu ml-3"
                  style={{ fontSize: '48px', color: '#d81e06' }}
                />
              }
              title={<FormattedMessage id="felinOrder.servicePaid" />}
              titleColor="text-warning"
              tip={<FormattedMessage id="felinOrder.servicePaidTip" />}
            />
            <hr />
          </>
        );
        break;
      case 2: // Check in
        ret = (
          <>
            <HeadTip
              icon={
                <svg className="svg-icon w-14 h-14" aria-hidden="true">
                  <use xlinkHref="#iconCompleted" />
                </svg>
              }
              title={normalProgressList[currentProgressIndex]?.flowStateDesc}
              tip={<FormattedMessage id="order.completeTip" />}
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
      console.log(err);
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
            <span className="iconfont iconcancel text-rc-red mr-2" />
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
                        <div className="col-12 flex md:flex-row flex-col border table-header rounded mt-3 md:mt-0 pt-3 pb-2 px-1 md:px-4 md:py-3">
                          <div className="col-md-3">
                            <FormattedMessage id="appointment.appointmentPlacedOn" />
                            <br />
                            <span className="medium orderHeaderTextColor">
                              {details.createTime
                                ? getFormatDate({
                                    date: details.createTime,
                                    intl: this.props.intl
                                  })
                                : ''}
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
                        <div className="col-12 order-list-container rder__listing table-body rounded mx-0 md:mt-3 mb-2 row align-items-center p-2">
                          <div className="col-4 col-md-2 d-flex justify-content-center align-items-center">
                            <LazyLoad style={{ width: '100%' }}>
                              <img
                                className="order-details-img-fluid w-100"
                                src={details.goodsInfoImg || IMG_DEFAULT}
                                alt={details.goodsInfoName}
                                title={details.goodsInfoName}
                              />
                            </LazyLoad>
                          </div>
                          <div className="col-8 col-md-3">
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
                            className={`col-12 col-md-7 md:pr-8 font-weight-normal d-flex justify-end flex-row`}
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
          <Footer />
        </main>
      </div>
    );
  }
}

export default AccountOrders;
