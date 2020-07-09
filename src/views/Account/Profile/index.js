import React from "react"
import { inject } from 'mobx-react'
import GoogleTagManager from '@/components/GoogleTagManager'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import BreadCrumbs from '@/components/BreadCrumbs'
import SideMenu from '@/components/SideMenu'
import PersonalDataEditForm from './modules/PersonalDataEditForm'
import AddressBookEditForm from './modules/AddressBookEditForm'
import CommunicationDataEditForm from './modules/CommunicationDataEditForm'
import ClinicEditForm from './modules/ClinicEditForm'
import PasswordForm from './modules/PasswordForm'
import { getCustomerInfo } from "@/api/user"
import './index.css'

@inject("loginStore")
class AccountProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      personalData: {
        firstName: '',
        lastName: '',
        birthdate: '',
        email: '',
        country: "Mexico",
        phoneNumber: '',
        rfc: ''
      },
      addressBookData: {
        address1: '',
        address2: '',
        country: "Mexico",
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
      originData: null
    }
    this.headerRef = React.createRef()
  }
  componentWillUnmount () {
    localStorage.setItem("isRefresh", true);
  }
  componentDidMount () {
    if (localStorage.getItem("isRefresh")) {
      localStorage.removeItem("isRefresh");
      window.location.reload();
      return false
    }
    this.queryCustomerBaseInfo()
  }
  queryCustomerBaseInfo () {
    getCustomerInfo()
      .then(res => {
        let prescriberName
        let prescriberId
        const context = res.context
        this.props.loginStore.setUserInfo(context)
        if (context.defaultClinics) {
          prescriberName = context.defaultClinics.clinicsName
          prescriberId = context.defaultClinics.clinicsId
          sessionStorage.removeItem('rc-clinics-name-select')
          sessionStorage.removeItem('rc-clinics-id-select')
          sessionStorage.setItem('rc-clinics-name-default', prescriberName)
          sessionStorage.setItem('rc-clinics-id-default', prescriberId)
        }
        this.setState({
          originData: context,
          personalData: {
            firstName: context.firstName,
            lastName: context.lastName,
            email: context.email,
            birthdate: context.birthDay ? context.birthDay.split('-').join('/') : context.birthDay,
            // country: context.countryId,
            country:6, //先写死墨西哥id
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
        })
      })
  }
  render () {
    const event = {
      page: {
        type: 'Account',
        theme: ''
      }
    }
    return (
      <div>
        <GoogleTagManager additionalEvents={event} />
        <Header ref={this.headerRef} showMiniIcons={true} showUserIcon={true} location={this.props.location} history={this.props.history} />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
          <BreadCrumbs />
          <div className="rc-padding--sm rc-max-width--xl">
            <div className="rc-layout-container rc-five-column">
              <SideMenu type="Profile" />
              <div className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop">
                <div className="card-body_">

                  <div className="rc-layout-container rc-two-column">
                    <div className="rc-column rc-padding-x--none--mobile">
                      <PersonalDataEditForm
                        originData={this.state.originData}
                        data={this.state.personalData}
                        updateData={() => this.queryCustomerBaseInfo()} />
                    </div>
                    <div className="rc-column rc-padding-x--none--mobile">
                      {/* <AddressBookEditForm
                        originData={this.state.originData}
                        data={this.state.addressBookData}
                        updateData={() => this.queryCustomerBaseInfo()} /> */}
                      <CommunicationDataEditForm
                        originData={this.state.originData}
                        data={this.state.communicationData}
                        updateData={() => this.queryCustomerBaseInfo()} />
                    </div>
                  </div>
                  <div className="rc-layout-container rc-two-column">
                    <div className="rc-column rc-padding-x--none--mobile">
                      <ClinicEditForm
                        originData={this.state.originData}
                        data={this.state.clinicData}
                        updateData={() => this.queryCustomerBaseInfo()} />
                    </div>
                    {/* <div className="rc-column rc-padding-x--none--mobile">
                      <PasswordForm />
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
}

export default AccountProfile