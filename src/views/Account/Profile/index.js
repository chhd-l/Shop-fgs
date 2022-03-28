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
import { FormattedMessage } from 'react-intl-phraseapp';
import { myAccountPushEvent } from '@/utils/GA';
import BannerTip from '@/components/BannerTip';
import './index.less';
import Modal from '@/components/Modal';
import { seoHoc } from '@/framework/common';
import Canonical from '@/components/Canonical';

const localItemRoyal = window.__.localItemRoyal;

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
@seoHoc('Account personal information')
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
        postCode: '',
        phoneNumber: '',
        rfc: ''
      },
      communicationData: {
        contactMethod: ''
      },
      clinicData: {
        clinicName: '',
        clinicId: '',
        recommendationCode: ''
      },
      originData: null, // 提交接口时，保留未修改参数用
      loading: true,
      personalDataIsEdit: false,
      editOperationPaneName: '',
      successMsg: ''
    };
  }
  componentWillUnmount() {}
  componentDidMount() {
    myAccountPushEvent('Personal information');

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
      let recommendationCode;
      const context = res.context;
      this.props.loginStore.setUserInfo(context);
      if (context.defaultClinics) {
        prescriberName = context.defaultClinics.clinicsName;
        prescriberId = context.defaultClinics.clinicsId;
        recommendationCode = context.defaultClinics.recommendationCode || '';
      }

      let mydata = {
        firstName: context.firstName,
        lastName: context.lastName,
        email: context.email,
        birthdate: context.birthDay
          ? context.birthDay.split('-').join('/')
          : context.birthDay,
        country: context.countryId,
        county: context.county,
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
        provinceId: context?.provinceId,
        region: context?.region,
        firstNameKatakana: context?.firstNameKatakana,
        lastNameKatakana: context?.lastNameKatakana
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
          clinicId: prescriberId,
          recommendationCode: recommendationCode
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
    const { loading, editOperationPaneName, originData, personalData } =
      this.state;
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
        <GoogleTagManager
          key={this.props.location.key}
          additionalEvents={event}
        />
        <Canonical />
        <Header {...this.props} showMiniIcons={true} showUserIcon={true} />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3 p-basicinfo">
          <BannerTip />
          <BreadCrumbs />
          <div
            className="rc-padding--sm rc-max-width--xl"
            id="rc_myaccount_profile"
          >
            <div className="rc-layout-container rc-five-column">
              <SideMenu type="Profile" customCls="rc-md-up" />
              <div className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop">
                {editOperationPaneName ? null : (
                  <Link to="/account" className="rc-md-down mb-2 inlineblock">
                    <span className="red">&lt;</span>
                    <span className="rc-styled-link rc-progress__breadcrumb ml-2">
                      <FormattedMessage id="account.home" />
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
                        +window.__.env.REACT_APP_HIDE_ACCOUNT_BILLING_ADDR
                      }
                      updateEditOperationPanelName={
                        this.updateEditOperationPanelName
                      }
                    />
                  </PanleContainer>

                  {window.__.env.REACT_APP_COUNTRY !== 'ru' &&
                    window.__.env.REACT_APP_CHECKOUT_WITH_CLINIC === 'true' && (
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
                      needEmail={
                        !Boolean(
                          +window.__.env
                            .REACT_APP_HIDE_ACCOUNT_COMMUNICATION_EMAIL
                        )
                      }
                      needMessengers={
                        !Boolean(
                          +window.__.env
                            .REACT_APP_HIDE_ACCOUNT_COMMUNICATION_MESSENGERS
                        )
                      }
                      // 美国 墨西哥 不需要phone
                      needPhone={
                        !Boolean(
                          +window.__.env
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
                  {window.__.env.REACT_APP_DELETE_My_ACCOUNT_URL && (
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
