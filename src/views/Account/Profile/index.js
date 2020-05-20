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
import './index.css'

export default class AccountProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cartData: localStorage.getItem('rc-cart-data') ? JSON.parse(localStorage.getItem('rc-cart-data')) : [],
      personalData: {
        firstName: 'Ken',
        lastName: 'yang',
        birthdate: '01/01/2020',
        email: '1411211848@qq.com'
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
        phone: true,
        email: false
      }
    }
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
  }
  updateFormData (key, form) {
    this.setState({
      [key]: Object.assign({}, form)
    })
  }
  render () {
    // const { personalDataEditFormVisible } = this.state
    const event = {
      "page": {
        "type": "Account",
        "hitTimestamp": new Date().toISOString(),
        "theme": ""
      }
    }
    return (
      <div>
        <GoogleTagManager additionalEvents={event} />
        <Header cartData={this.state.cartData} showMiniIcons={true} location={this.props.location} />
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
                        data={this.state.personalData}
                        updateData={form => this.updateFormData('personalData', form)} />
                    </div>
                    <div className="rc-column rc-padding-x--none--mobile">
                      <AddressBookEditForm
                        data={this.state.addressBookData}
                        updateData={form => this.updateFormData('addressBookData', form)} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="rc-column col-lg-6">
                      <CommunicationDataEditForm
                        data={this.state.communicationData}
                        updateData={form => this.updateFormData('addressBookData', form)} />
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