import React from "react"
import { FormattedMessage } from 'react-intl'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import BreadCrumbs from '@/components/BreadCrumbs'
import SideMenu from '@/components/SideMenu'
import './index.css'

export default class AccountProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cartData: localStorage.getItem('rc-cart-data') ? JSON.parse(localStorage.getItem('rc-cart-data')) : []
    }
  }
  render () {
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
                      <div className="personalInfo">
                        <div className="profileSubFormTitle">
                          <h5 className="rc-espilon rc-margin--none">
                            <FormattedMessage id="account.personalData" />
                          </h5>
                          <button
                            className="editPersonalInfoBtn rc-styled-link"
                            name="personalInformation"
                            id="personalInfoEditBtn"
                            title={<FormattedMessage id="edit" />}
                            alt={<FormattedMessage id="edit" />}>
                            <FormattedMessage id="edit" />
                          </button>
                        </div>
                        <hr />
                        <div className="userProfileInfo address">
                          <span id="userFullName">Ken yang</span>
                          <span id="userBirthDate"></span>
                          <span id="userEmail">1411211848@qq.com</span>
                        </div>
                      </div>
                    </div>
                    <div className="rc-column rc-padding-x--none--mobile">
                      <div className="contactInfo">
                        <div className="profileSubFormTitle">
                          <h5 className="rc-espilon rc-margin--none">
                            <FormattedMessage id="account.TheAddressBook" />
                          </h5>
                          <button
                            className="editPersonalInfoBtn rc-styled-link"
                            name="contactInformation"
                            id="contactInfoEditBtn"
                            title={<FormattedMessage id="edit" />}
                            alt={<FormattedMessage id="edit" />}>
                            <FormattedMessage id="edit" />
                          </button>
                        </div>
                        <hr />
                        <div className="row userContactInfo">
                          <div className="col-lg-6 address">
                            <span className="rc-meta">
                              <b>
                                <FormattedMessage id="address" />
                              </b>
                            </span>
                            <span id="userCountryDist">Russia</span><span id="userAdd1" data-address2="false">
                            </span>
                            <span id="userCountryDist"></span>
                            <span id="userCityRegion">
                            </span>
                            <span id="userHouseHousing">
                            </span>
                            <span id="userEntAppartment">
                            </span>
                            <span id="userZipcode">
                            </span>
                          </div>
                          <div className="col-lg-6 address">
                            <span className="rc-meta">
                              <b>
                                <FormattedMessage id="phone" />
                              </b>
                            </span>
                            <span></span>
                            <span></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="rc-column col-lg-6">
                      <div className="userContactPreferenceInfo">
                        <div className="profileSubFormTitle">
                          <h5 className="rc-espilon rc-margin--none">
                            <FormattedMessage id="account.preferredMmethodsOfCommunication" />
                          </h5>
                          <button className="editPersonalInfoBtn rc-styled-link" name="contactPreference" id="contactPrefEditBtn"
                            title={<FormattedMessage id="edit" />}
                            alt={<FormattedMessage id="edit" />}>
                            <FormattedMessage id="edit" />
                          </button>
                        </div>
                        <hr />
                        <span className="rc-meta">
                          <b>
                            <FormattedMessage id="account.preferredContactMethod" />
                          </b>
                        </span>
                        <div className="row rc-padding-top--xs rc-margin-left--none rc-padding-left--none contactPreferenceContainer">
                          <div className="rc-input rc-input--inline rc-margin-y--xs">
                            <input className="rc-input__checkbox"
                              id="optsmobile"
                              type="checkbox"
                              disabled=""
                              alt={<FormattedMessage id="phone" />}
                              name="dwfrm_profile_customer_optsmobile"
                              value="true" />
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