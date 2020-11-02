import React from 'react';
import { inject, observer } from 'mobx-react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Skeleton from 'react-skeleton-loader';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BreadCrumbs from '@/components/BreadCrumbs';
import SideMenu from '@/components/SideMenu';
import PersonalDataEditForm from './modules/PersonalDataEditForm';
import CommunicationDataEditForm from './modules/CommunicationDataEditForm';
import ClinicEditForm from './modules/ClinicEditForm';
import { getCustomerInfo } from '@/api/user';
import './index.css';

const localItemRoyal = window.__.localItemRoyal;

@inject('loginStore')
@observer
class AccountProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personalData: {
        firstName: '',
        lastName: '',
        birthdate: '',
        email: '',
        country: 'Mexico',
        phoneNumber: '',
        rfc: ''
      },
      addressBookData: {
        address1: '',
        address2: '',
        country: 'Mexico',
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
        clinicId: ''
      },
      originData: null,
      loading: true
    };
    this.headerRef = React.createRef();
  }
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  componentDidMount() {
    // if (localItemRoyal.get('isRefresh')) {
    //   localItemRoyal.remove('isRefresh');
    //   window.location.reload();
    //   return false;
    // }
    this.queryCustomerBaseInfo();
  }
  queryCustomerBaseInfo() {
    this.setState({ loading: true });
    getCustomerInfo()
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
            firstName: context.firstName,
            lastName: context.lastName,
            email: context.email,
            birthdate: context.birthDay
              ? context.birthDay.split('-').join('/')
              : context.birthDay,
            country: context.countryId,
            // country: 6, //先写死墨西哥id
            phoneNumber: context.contactPhone,
            rfc: context.reference
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
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }
  render() {
    const { loading } = this.state;
    const event = {
      page: {
        type: 'Account',
        theme: ''
      }
    };
    return (
      <div className="accountProfile">
        <GoogleTagManager additionalEvents={event} />
        <Header
          ref={this.headerRef}
          showMiniIcons={true}
          showUserIcon={true}
          location={this.props.location}
          history={this.props.history}
          match={this.props.match}
        />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
          <BreadCrumbs />
          <div className="rc-padding--sm rc-max-width--xl">
            <div className="rc-layout-container rc-five-column">
              <SideMenu type="Profile" />
              <div className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop">
                <div className="card-body_">
                  {false ? (
                    <Skeleton
                      color="#f5f5f5"
                      width="100%"
                      height="50%"
                      count={5}
                    />
                  ) : (
                    <>
                      <div className="rc-layout-container rc-two-column">
                        <div className="rc-column rc-padding-x--none--mobile">
                          {loading ? (
                            <Skeleton
                              color="#f5f5f5"
                              width="100%"
                              height="10%"
                              count={5}
                            />
                          ) : (
                            <PersonalDataEditForm
                              originData={this.state.originData}
                              data={this.state.personalData}
                              updateData={() => this.queryCustomerBaseInfo()}
                            />
                          )}
                        </div>
                        <div className="rc-column rc-padding-x--none--mobile">
                          {/* <AddressBookEditForm
                        originData={this.state.originData}
                        data={this.state.addressBookData}
                        updateData={() => this.queryCustomerBaseInfo()} /> */}
                          {loading ? (
                            <Skeleton
                              color="#f5f5f5"
                              width="100%"
                              height="10%"
                              count={5}
                            />
                          ) : (
                            <CommunicationDataEditForm/>
                          )}
                        </div>
                      </div>
                      {process.env.REACT_APP_CHECKOUT_WITH_CLINIC ===
                        'true' && (
                        <div className="rc-layout-container rc-two-column">
                          <div className="rc-column rc-padding-x--none--mobile">
                            {loading ? (
                              <Skeleton
                                color="#f5f5f5"
                                width="100%"
                                height="10%"
                                count={5}
                              />
                            ) : (
                              <ClinicEditForm
                                originData={this.state.originData}
                                data={this.state.clinicData}
                                updateData={() => this.queryCustomerBaseInfo()}
                              />
                            )}
                          </div>
                          {/* <div className="rc-column rc-padding-x--none--mobile">
                      <PasswordForm />
                    </div> */}
                        </div>
                      )}
                    </>
                  )}
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
