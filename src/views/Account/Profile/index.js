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
import { FormattedMessage } from 'react-intl';
import { setSeoConfig } from '@/utils/utils';
import './index.less';

const localItemRoyal = window.__.localItemRoyal;

function PanleContainer(props) {
  const loading = props.loading || false;
  return (
    <div className={`rc-layout-container rc-one-column ${props.customCls}`}>
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
      loading: true,
      editOperationPaneName: ''
    };
  }
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  componentDidMount() {
    setSeoConfig()
    // if (localItemRoyal.get('isRefresh')) {
    //   localItemRoyal.remove('isRefresh');
    //   window.location.reload();
    //   return false;
    // }
    this.queryCustomerBaseInfo();
  }
  queryCustomerBaseInfo = () => {
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
      .catch(() => {
        this.setState({ loading: false });
      });
  };
  updateEditOperationPanelName = (name) => {
    this.setState({ editOperationPaneName: name });
  };

  render() {
    const { loading, editOperationPaneName } = this.state;
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
              <SideMenu type="Profile" customCls="rc-md-up" />
              <div className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop">
                {editOperationPaneName ? null : (
                  <Link to="/account" className="rc-md-down">
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
                        originData={this.state.originData}
                        data={this.state.personalData}
                        updateData={this.queryCustomerBaseInfo}
                        updateEditOperationPanelName={
                          this.updateEditOperationPanelName
                        }
                      />
                    </PanleContainer>

                    <PanleContainer
                      loading={loading}
                      customCls={classNames({
                        hidden:
                          process.env.REACT_APP_CHECKOUT_WITH_CLINIC ===
                            'true' &&
                          editOperationPaneName &&
                          editOperationPaneName !== 'Clinic'
                      })}
                    >
                      <ClinicEditForm
                        originData={this.state.originData}
                        data={this.state.clinicData}
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
                        hidden:
                          editOperationPaneName &&
                          editOperationPaneName !== 'Communication'
                      })}
                    >
                      <CommunicationDataEditForm
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
