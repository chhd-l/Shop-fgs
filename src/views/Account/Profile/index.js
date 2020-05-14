import React from "react"
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
        <main class="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
          <BreadCrumbs />
          <div class="rc-padding--sm rc-max-width--xl">
            <div class="rc-layout-container rc-five-column">
              <SideMenu type="Profile" />
              <div class="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop">
                <div class="card-body_">
                  <div class="rc-layout-container rc-two-column">
                    <div class="rc-column rc-padding-x--none--mobile">
                      <div class="personalInfo">
                        <div class="profileSubFormTitle">
                          <h5 class="rc-espilon rc-margin--none">Personal data</h5>
                          <button class="editPersonalInfoBtn rc-styled-link" name="personalInformation" id="personalInfoEditBtn" title="Edit" alt="Edit">Edit</button>
                        </div>
                        <hr />
                        <div class="userProfileInfo address">
                          <span id="userFullName">Ken yang</span>
                          <span id="userBirthDate"></span>
                          <span id="userEmail">1411211848@qq.com</span>
                        </div>
                      </div>
                    </div>
                    <div class="rc-column rc-padding-x--none--mobile">
                      <div class="contactInfo">
                        <div class="profileSubFormTitle">
                          <h5 class="rc-espilon rc-margin--none">The address book</h5>
                          <button class="editPersonalInfoBtn rc-styled-link" name="contactInformation" id="contactInfoEditBtn" title="Edit" alt="Edit">Edit</button>
                        </div>
                        <hr />
                        <div class="row userContactInfo">
                          <div class="col-lg-6 address">
                            <span class="rc-meta"><b>Address</b></span>
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
                          <div class="col-lg-6 address">
                            <span class="rc-meta"><b>Phone</b></span>
                            <span></span>
                            <span></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="rc-column col-lg-6">
                      <div class="userContactPreferenceInfo">
                        <div class="profileSubFormTitle">
                          <h5 class="rc-espilon rc-margin--none">Preferred methods of communication</h5>
                          <button class="editPersonalInfoBtn rc-styled-link" name="contactPreference" id="contactPrefEditBtn" title="Edit" alt="Edit">Edit</button>
                        </div>
                        <hr />
                        <span class="rc-meta"><b>Preferred Contact Method</b></span>
                        <div class="row rc-padding-top--xs rc-margin-left--none rc-padding-left--none contactPreferenceContainer">
                          <div class="rc-input rc-input--inline rc-margin-y--xs">
                            <input class="rc-input__checkbox" id="optsmobile" type="checkbox" disabled="" alt="Phone" name="dwfrm_profile_customer_optsmobile" value="true" />
                            <label class="rc-input__label--inline" for="optsmobile">
                              Phone
                                </label>
                          </div>
                          <div class="rc-input rc-input--inline rc-margin-y--xs">
                            <input class="rc-input__checkbox" id="optsemail" type="checkbox" disabled="" alt="Email" name="dwfrm_profile_customer_optsemail" checked="true" value="true" />
                            <label class="rc-input__label--inline" for="optsemail">
                              Email
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