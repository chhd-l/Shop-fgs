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
import ClinicEditForm from './modules/ClinicEditForm';
import AddressList from './modules/AddressList';
import PaymentList from './modules/PaymentList';
import { getCustomerInfo } from '@/api/user';
import { queryCityNameById } from '@/api';
import { FormattedMessage } from 'react-intl';
import { setSeoConfig } from '@/utils/utils';
import BannerTip from '@/components/BannerTip';
import './index.less';
import { Helmet } from 'react-helmet';

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
@observer
class AccountProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personalData: null,
      addressBookData: {
        address1: '',
        address2: '',
        country: 'Mexico',
        city: '',
        seoConfig: {
          title: '',
          metaKeywords: '',
          metaDescription: ''
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
      editOperationPaneName: ''
    };
  }
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  componentDidMount() {
    setSeoConfig({
      pageName: 'Account personal information'
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
  get getUserInfo() {
    return this.props.loginStore.userInfo;
  }
  queryCustomerBaseInfo = () => {
    this.setState({ loading: true });
    let customerId = this.getUserInfo.customerId

    getCustomerInfo({customerId})
      .then((res) => {
        this.setState({ loading: false });
        let prescriberName;
        let prescriberId;
        const context = res.context;
        this.props.loginStore.setUserInfo(context);
        if (context.defaultClinics) {
          prescriberName = context.defaultClinics.clinicsName;
          prescriberId = context.defaultClinics.clinicsId;
        }

        this.setState({
          originData: context,
          personalData: {
            customerId,
            firstName: context.firstName,
            lastName: context.lastName,
            email: context.email,
            birthdate: context.birthDay
              ? context.birthDay.split('-').join('/')
              : context.birthDay,
            country: context.countryId,
            city: context.cityId,

            phoneNumber: context.contactPhone,
            rfc: context.reference,
            address1: context.address1,
            address2: context.address2,
            postCode: context.postalCode,
            communicationEmail: context.communicationEmail,
            communicationPhone: context.communicationPhone
          },
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

        queryCityNameById({
          id: [context.cityId]
        }).then((cityRes) => {
          const cityVORes = cityRes.context.systemCityVO || [];
          this.setState({
            personalData: Object.assign(this.state.personalData, {
              cityName: cityVORes.filter((c) => c.id === context.cityId).length
                ? cityVORes.filter((c) => c.id === context.cityId)[0].cityName
                : ''
            })
          });
        });
      })
      .catch(() => {
        this.setState({ loading: false });
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
                  <>
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
                        updateEditOperationPanelName={
                          this.updateEditOperationPanelName
                        }
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
                      />
                    </PanleContainer>

                    <PanleContainer
                      customCls={classNames({
                        hidden: false
                
                      })}
                    >
                      <CommunicationDataEditForm
                        originData={originData}
                        data={personalData}
                        key={Object.keys(personalData || {})}
                        updateData={this.queryCustomerBaseInfo}
                        updateEditOperationPanelName={
                          this.updateEditOperationPanelName
                        }
                      />
                    </PanleContainer>
                  </>
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

export default AccountProfile;
