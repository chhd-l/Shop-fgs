import React from "react"
import { FormattedMessage } from 'react-intl'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import BreadCrumbs from '@/components/BreadCrumbs'
import SideMenu from '@/components/SideMenu'
import './index.css'
import noPet from "@/assets/images/noPet.jpg"
import { Link } from 'react-router-dom';

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
              <SideMenu type="Pets" />
              <div className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop">
                <div class="rc-border-bottom rc-border-colour--interface rc-margin-bottom--sm">
                  <h4 class="rc-delta rc-margin--none">
                    <font style={{verticalAlign: 'inherit',}}>
                      <font style={{verticalAlign: 'inherit',}}>Pets</font>
                    </font>
                  </h4>
                </div>
                <div class="content-asset">
                  <div class="rc-layout-container rc-two-column rc-content-h-middle rc-margin-bottom--sm">
                    <div class="rc-column">
                      <div class="rc-padding-right-lg rc-padding-y--sm ">
                          <div class="children-nomargin">
                            <p>
                              <font style={{verticalAlign: 'inherit',}}>
                                Create your pet profile today! Fill in the information and choose the most suitable diet
                              </font>
                            </p>
                          </div>
                          <div class="rc-margin-top--sm">
                            <Link class="rc-btn rc-btn--one" to="/account/pets/petForm">
                              <font style={{verticalAlign: 'inherit',}}>Add pet</font>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div class="rc-column">
                        <img src={noPet} alt="No pets"/>
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