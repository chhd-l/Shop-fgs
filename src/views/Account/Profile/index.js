import React from "react"
import { FormattedMessage } from 'react-intl'
import GoogleTagManager from '@/components/GoogleTagManager'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import BreadCrumbs from '@/components/BreadCrumbs'
import SideMenu from '@/components/SideMenu'
import PersonalDataEditForm from './modules/PersonalDataEditForm'
import AddressBookEditForm from './modules/AddressBookEditForm'
import CommunicationDataEditForm from './modules/CommunicationDataEditForm'
import { getCustomerInfo } from "@/api/user"
import './index.css'

export default class AccountProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      personalData: {
        firstName: '',
        lastName: '',
        birthdate: '',
        email: ''
      },
      addressBookData: {
        address: '',
        country: "Mexico",
        city: '',
        postCode: '',
        phoneNumber: '',
        rfc: ''
      },
      communicationData: {
        contactMethod: ''
      },
      originData: null
    }
    this.personalDataEditFormRef = React.createRef();
    this.addressBookEditFormRef = React.createRef();
    this.communicationDataEditFormRef = React.createRef();
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
        const context = res.context
        sessionStorage.setItem('rc-userinfo', JSON.stringify(context))
        this.setState({
          originData: context,
          personalData: {
            firstName: context.firstName,
            lastName: context.lastName,
            email: context.email,
            birthdate: context.birthDay ? context.birthDay.split('-').join('/') : context.birthDay
          },
          addressBookData: {
            address: context.customerAddress,
            country: context.country || 'Mexico',
            city: context.city,
            postCode: context.postCode,
            phoneNumber: context.contactPhone,
            rfc: context.reference
          },
          communicationData: {
            contactMethod: context.contactMethod
          }
        })
      })
  }
  render () {
    const event = {
      "page": {
        "type": "Account",
        "theme": ""
      }
    }
    return (
      <div>
        <GoogleTagManager additionalEvents={event} />
        <Header showMiniIcons={true} location={this.props.location} history={this.props.history} />
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
                      <AddressBookEditForm
                        originData={this.state.originData}
                        data={this.state.addressBookData}
                        updateData={() => this.queryCustomerBaseInfo()} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="rc-column col-lg-6">
                      <CommunicationDataEditForm
                        originData={this.state.originData}
                        data={this.state.communicationData}
                        updateData={() => this.queryCustomerBaseInfo()} />
                    </div>
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