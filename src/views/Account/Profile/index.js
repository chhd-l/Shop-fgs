import React from "react"
import { FormattedMessage } from 'react-intl'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import BreadCrumbs from '@/components/BreadCrumbs'
import SideMenu from '@/components/SideMenu'
import PersonalDataEditForm from './modules/PersonalDataEditForm'
import AddressBookEditForm from './modules/AddressBookEditForm'
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
        street: '',
        country: "Mexico",
        city: '',
        house: '',
        caseBuilding: '',
        porch: '',
        flat: '',
        postCode: '',
        phone: '',
        phone2: ''
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
  updatePersonlData (key, form) {
    this.setState({
      [key]: Object.assign({}, form)
    })
  }
  render () {
    // const { personalDataEditFormVisible } = this.state
    return (
      <div>
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
                      <div className="userContactPreferenceInfo">
                        <div className="profileSubFormTitle">
                          <h5 className="rc-espilon rc-margin--none">
                            <FormattedMessage id="account.preferredMmethodsOfCommunication" />
                          </h5>
                          <FormattedMessage id="edit">
                            {txt => (
                              <button className="editPersonalInfoBtn rc-styled-link" name="contactPreference" id="contactPrefEditBtn"
                                title={txt}
                                alt={txt}>
                                {txt}
                              </button>
                            )}
                          </FormattedMessage>
                        </div>
                        <hr />
                        <span className="rc-meta">
                          <b>
                            <FormattedMessage id="account.preferredContactMethod" />
                          </b>
                        </span>
                        <div className="row rc-padding-top--xs rc-margin-left--none rc-padding-left--none contactPreferenceContainer">
                          <div className="rc-input rc-input--inline rc-margin-y--xs">
                            <FormattedMessage id="phone">
                              {txt => (
                                <input className="rc-input__checkbox"
                                  id="optsmobile"
                                  type="checkbox"
                                  disabled=""
                                  alt={txt}
                                  name="dwfrm_profile_customer_optsmobile"
                                  value="true" />
                              )}
                            </FormattedMessage>
                            <label className="rc-input__label--inline" for="optsmobile">
                              <FormattedMessage id="phone" />
                            </label>
                          </div>
                          <div className="rc-input rc-input--inline rc-margin-y--xs">
                            <input className="rc-input__checkbox" id="optsemail" type="checkbox" disabled="" alt="Email" name="dwfrm_profile_customer_optsemail" checked="true" value="true" />
                            <label className="rc-input__label--inline" for="optsemail">
                              <FormattedMessage id="email" />
                            </label>
                          </div>
                        </div>
                      </div>
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