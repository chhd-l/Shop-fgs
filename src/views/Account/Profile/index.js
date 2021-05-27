import React from 'react';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import GoogleTagManager from '@/components/GoogleTagManager';
import Skeleton from 'react-skeleton-loader';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BreadCrumbs from '@/components/BreadCrumbs';
import SideMenu from '@/components/SideMenu';
import PersonalDataEditForm from './modules/PersonalDataEditForm';
import CommunicationDataEditForm from './modules/CommunicationDataEditForm';
import DeleteMyAccount from './modules/DeleteMyAccount';
import ClinicEditForm from './modules/ClinicEditForm';
import AddressList from './modules/AddressList';
import PaymentList from './modules/PaymentList';
import { getCustomerInfo } from '@/api/user';
import { FormattedMessage } from 'react-intl';
import { setSeoConfig } from '@/utils/utils';
import { myAccountPushEvent } from '@/utils/GA';
import BannerTip from '@/components/BannerTip';
import './index.less';
import { Helmet } from 'react-helmet';
import Modal from '@/components/Modal';

const localItemRoyal = window.__.localItemRoyal;
const pageLink = window.location.href;

function PanleContainer(props) {
  const loading = props.loading || false;
  return (
    <div
      className={`rc-layout-container rc-one-column mb-3 ${props.customCls}`}
    >
      <div
        className={classNames('rc-column', 'rc-padding-x--none--mobile', {
          'p-0': !loading
        })}
      >
        {loading ? (
          <Skeleton color="#f5f5f5" width="100%" height="10%" count={5} />
        ) : (
          props.children
        )}
      </div>
    </div>
  );
}

@inject('loginStore')
@observer
class AccountProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personalData: null,
      addressBookData: {
        address1: '',
        address2: '',
        country: '',
        city: '',
        seoConfig: {
          title: 'Royal canin',
          metaKeywords: 'Royal canin',
          metaDescription: 'Royal canin'
        },
        postCode: '',
        phoneNumber: '',
        rfc: ''
      },
      communicationData: {
        contactMethod: ''
      },
      clinicData: {
        clinicName: '',
        clinicId: ''
      },
      originData: null, // 提交接口时，保留未修改参数用
      loading: true,
      personalDataIsEdit: false,
      editOperationPaneName: '',
      successMsg: ''
    };
  }
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  componentDidMount() {
    myAccountPushEvent('Personal information');

    setSeoConfig({
      pageName: 'Account personal information'
    }).then((res) => {
      this.setState({ seoConfig: res });
    });
    // if (localItemRoyal.get('isRefresh')) {
    //   localItemRoyal.remove('isRefresh');
    //   window.location.reload();
    //   return false;
    // }
    this.queryCustomerBaseInfo();
  }
  get userInfo() {
    return this.props.loginStore.userInfo;
  }
  queryCustomerBaseInfo = async () => {
    try {
      const customerId = this.userInfo && this.userInfo.customerId;
      this.setState({ loading: true });
      let res = await getCustomerInfo({ customerId });
      this.setState({ loading: false });
      let prescriberName;
      let prescriberId;
      const context = res.context;
      this.props.loginStore.setUserInfo(context);
      if (context.defaultClinics) {
        prescriberName = context.defaultClinics.clinicsName;
        prescriberId = context.defaultClinics.clinicsId;
      }

      let mydata = {
        firstName: context.firstName,
        lastName: context.lastName,
        email: context.email,
        birthdate: context.birthDay
          ? context.birthDay.split('-').join('/')
          : context.birthDay,
        country: context.countryId,
        cityId: context.cityId,
        city: context.city,
        areaId: context.areaId,
        area: context.area,
        phoneNumber: context.contactPhone,
        rfc: context.reference,
        address1: context.address1,
        address2: context.address2,
        postCode: context.postalCode,
        entrance: context?.entrance,
        apartment: context?.apartment,
        communicationEmail: context.communicationEmail,
        communicationPhone: context.communicationPhone,
        communicationPrint: context.communicationPrint,
        provinceNo: context?.provinceNo,
        province: context?.province,
        provinceId: context?.provinceId
      };

      this.setState({
        originData: context,
        personalData: mydata,
        addressBookData: {
          address1: context.house,
          address2: context.housing,
          country: context.countryId,
          city: context.cityId,
          postCode: context.postCode,
          phoneNumber: context.contactPhone,
          rfc: context.reference
        },
        communicationData: {
          contactMethod: context.contactMethod
        },
        clinicData: {
          clinicName: prescriberName,
          clinicId: prescriberId
        }
      });
    } catch (err) {
    } finally {
      this.setState({ loading: false });
    }
  };
  updateIsEditFlag = (data) => {
    console.log(data);
    this.setState({
      personalDataIsEdit: data
    });
  };
  updateEditOperationPanelName = (name) => {
    this.setState({ editOperationPaneName: name });
  };

  render() {
    const {
      loading,
      editOperationPaneName,
      originData,
      personalData,
      seoConfig
    } = this.state;
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
      <div className="accountProfile">
        <GoogleTagManager additionalEvents={event} />
        <Helmet>
          <link rel="canonical" href={pageLink} />
          <title>{seoConfig ? seoConfig.title : ''}</title>
          <meta
            name="description"
            content={seoConfig ? seoConfig.metaDescription : ''}
          />
          <meta
            name="keywords"
            content={seoConfig ? seoConfig.metaKeywords : ''}
          />
        </Helmet>
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={this.props.location}
          history={this.props.history}
          match={this.props.match}
        />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3 p-basicinfo">
          <BannerTip />
          <BreadCrumbs />
          <div className="rc-padding--sm rc-max-width--xl">
            <div className="rc-layout-container rc-five-column">
              <SideMenu type="Profile" customCls="rc-md-up" />
              <div className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop">
                {editOperationPaneName ? null : (
                  <Link to="/account" className="rc-md-down mb-2 inlineblock">
                    <span className="red">&lt;</span>
                    <span className="rc-styled-link rc-progress__breadcrumb ml-2">
                      <FormattedMessage id="home" />
                    </span>
                  </Link>
                )}

                <div className="card-body_">
                  <PanleContainer
                    loading={loading}
                    customCls={classNames({
                      hidden:
                        editOperationPaneName &&
                        editOperationPaneName !== 'My account'
                    })}
                  >
                    <PersonalDataEditForm
                      originData={originData}
                      data={personalData}
                      key={Object.keys(personalData || {})}
                      updateData={this.queryCustomerBaseInfo}
                      updateIsEditFlag={(data) => this.updateIsEditFlag(data)}
                      personalDataIsEdit={this.state.personalDataIsEdit}
                      updateEditOperationPanelName={
                        this.updateEditOperationPanelName
                      }
                      editFormVisible={editOperationPaneName === 'My account'}
                    />
                  </PanleContainer>

                  <PanleContainer
                    customCls={classNames({
                      hidden:
                        editOperationPaneName &&
                        editOperationPaneName !== 'My addresses'
                    })}
                  >
                    <AddressList
                      hideBillingAddr={
                        +process.env.REACT_APP_HIDE_ACCOUNT_BILLING_ADDR
                      }
                      updateEditOperationPanelName={
                        this.updateEditOperationPanelName
                      }
                    />
                  </PanleContainer>

                  {process.env.REACT_APP_CHECKOUT_WITH_CLINIC === 'true' && (
                    <PanleContainer
                      loading={loading}
                      customCls={classNames({
                        hidden:
                          editOperationPaneName &&
                          editOperationPaneName !== 'Clinic'
                      })}
                    >
                      <ClinicEditForm
                        originData={originData}
                        data={this.state.clinicData}
                        updateData={this.queryCustomerBaseInfo}
                        updateEditOperationPanelName={
                          this.updateEditOperationPanelName
                        }
                      />
                    </PanleContainer>
                  )}

                  <PanleContainer
                    customCls={classNames({
                      hidden:
                        editOperationPaneName &&
                        editOperationPaneName !== 'My payments'
                    })}
                  >
                    <PaymentList
                      history={this.props.history}
                      updateEditOperationPanelName={
                        this.updateEditOperationPanelName
                      }
                      // 此入口总是要email phone
                      needEmail={true}
                      needPhone={true}
                    />
                  </PanleContainer>

                  <PanleContainer
                    customCls={classNames({
                      hidden:
                        editOperationPaneName &&
                        editOperationPaneName !== 'Communication'
                    })}
                  >
                    <CommunicationDataEditForm
                      originData={originData}
                      data={personalData}
                      userInfo={this.userInfo}
                      // 俄罗斯 需要message
                      needMessengers={
                        !Boolean(
                          +process.env
                            .REACT_APP_HIDE_ACCOUNT_COMMUNICATION_MESSENGERS
                        )
                      }
                      // 美国 墨西哥 不需要phone
                      needPhone={
                        !Boolean(
                          +process.env
                            .REACT_APP_HIDE_ACCOUNT_COMMUNICATION_PHONE
                        )
                      }
                      key={Object.keys(personalData || {})}
                      updateData={this.queryCustomerBaseInfo}
                      updateEditOperationPanelName={
                        this.updateEditOperationPanelName
                      }
                    />
                  </PanleContainer>

                  {/* 俄罗斯增加 Delete my account 模块，先做接口，后期跳转到okta */}
                  {process.env.REACT_APP_DELETE_My_ACCOUNT_URL && (
                    <PanleContainer
                      customCls={classNames({
                        hidden: editOperationPaneName
                      })}
                    >
                      <DeleteMyAccount />
                    </PanleContainer>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </main>
        <Modal
          type="fullscreen"
          visible={true}
          footerVisible={false}
          modalTitle={<FormattedMessage id="addPet" />}
          confirmBtnText={<FormattedMessage id="continue" />}
        />
      </div>
    );
  }
}

export default AccountProfile;
