import React from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import BreadCrumbs from '@/components/BreadCrumbs'
import SideMenu from '@/components/SideMenu'
import { FormattedMessage } from 'react-intl'
import { formatMoney } from "@/utils/utils"
// import './index.css'

export default class AccountOrders extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cartData: localStorage.getItem('rc-cart-data') ? JSON.parse(localStorage.getItem('rc-cart-data')) : [],
      orderNumber: '',
      details: null
    }
  }
  componentDidMount () {
    const res = {
      orderDate: '05/14/2020',
      orderNumber: '000053310',
      totalAmount: 2339,
      status: 'Not done',
      goodsName: 'Mini Adult',
      goodsImg: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw1e081197/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.png?sw=250&amp;sh=380&amp;sm=fit',
      amount: 1839,
      size: '4.00kg',
      quantity: '1.0',

      name: 'Ken',
      surName: 'Yang',
      country: 'Russia',
      region: 'Moscow',
      city: '',
      area: 'Other',
      street: '1',
      paymentMethod: '************* 0008'
    }
    console.log(this.props.match.params.orderNumber)
    setTimeout(() => {
      this.setState({
        details: res
      })
    }, 1000)
  }
  render () {
    return (
      <div>
        <Header cartData={this.state.cartData} showMiniIcons={true} location={this.props.location} />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
          <BreadCrumbs />
          <div className="rc-padding--sm rc-max-width--xl">
            <div className="rc-layout-container rc-five-column">
              <SideMenu />
              <div className="my__account-content rc-column rc-quad-width">
                <div className="row justify-content-center">
                  <div className="order_listing_details col-12 no-padding">
                    <div className="card confirm-details orderDetailsPage">
                      <div className="card-body">
                        <div className="d-flex justify-content-between row rc-padding-x--sm flex-column flex-md-row">
                          <div className="rc-padding-left--xs--mobile">
                            <p className="rc-padding-left--xs--mobile">
                              Order Date:
                              <br className="d-none d-md-block" />
                              <span className="medium">05/15/2020</span>
                            </p>
                          </div>
                          <div className="rc-padding-left--xs--mobile">
                            <p className="rc-padding-left--xs--mobile">
                              Your order number:
                              <br className="d-none d-md-block" />
                              <span className="medium">000053423</span>
                            </p>
                          </div>
                          <div className="rc-padding-left--xs--mobile">
                            <p className="rc-padding-left--xs--mobile">
                              Just
                            <br className="d-none d-md-block" />
                              <span className="medium price-symbol">$ 2 616</span>
                            </p>
                          </div>
                        </div>
                        <hr className="rc-margin-top---none" />
                        <div className="d-flex justify-content-between rc-column flex-column flex-md-row">
                          <span className="rc-padding-top--xs medium">Not done</span>
                        </div>
                        <div className="row rc-margin-x--none">
                          <div className="col-12 col-md-8 rc-column rc-padding-top--none">
                            <div className="row">
                              <div className="col-6 col-sm-4 d-flex align-items-center rc-padding-left--sm rc-padding-left--lg--mobile">
                                <span className="rc-padding-right--sm rc-padding-right--lg--mobile">1 x</span>
                                <img className="img-fluid" src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw3d4a98fb/products/RU/packshot_2016_FHN_DRY_Sterilised_37_4.png?sw=500" alt="Sterilised 37" title="Sterilised 37" />
                              </div>
                              <div className="col-6 col-sm-8 order-item-detail rc-padding-top--sm">
                                <span className="medium title_product text_content">Sterilised 37 </span><br />
                                <span>4.00 kg</span>
                                <div className="rc-text--left medium d-block d-md-none rc-padding-top--sm price-symbol">$ 2 616</div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-md-4 d-none d-md-block">
                            <div className="col-7 offset-md-5 rc-padding-top--sm">
                              <div className="rc-text--right medium price-symbol">$ 2 616</div>
                            </div>
                          </div>
                        </div>
                        <hr className="rc-margin-top--none" />
                        <div className="paymentDesc d-flex justify-content-sm-end">
                          <div className="d-flex flex-column rc-padding-right--sm align-items-end">
                            <span className="textColor rc-padding-left--sm rc-padding-bottom--xs">Total</span>
                            <span className="textColor rc-padding-left--sm rc-padding-bottom--xs">Delivery</span>
                            <span className="textColor rc-padding-left--sm rc-padding-bottom--xs">Including VAT</span>
                            <span className="rc-delta textColor rc-padding-left--sm"><b>Total</b></span>
                          </div>
                          <div className="d-flex flex-column rc-padding-right--xs rc-padding-left--lg--mobile">
                            <span className="textColor rc-padding-bottom--xs price-symbol">
                              $ 2 616</span>
                            <span className="textColor rc-padding-bottom--xs">
                              Is free
                            </span>
                            <span className="textColor rc-padding-bottom--xs price-symbol">$ 436</span>
                            <span className="rc-delta textColor price-symbol"><b>$ 2 616</b></span>
                          </div>
                        </div>
                        <hr className="rc-margin-top--xs" />
                        <div className="orderDetailFooter d-flex justify-content-between rc-padding-x--sm flex-column flex-sm-row rc-three-column">
                          <div className="rc-column rc-double-width">
                            <h5 className="rc-large-body"><b>Delivery Addresses</b></h5>
                            <div className="row">
                              <div className="col-12 col-sm-4">
                                <p className="rc-margin-bottom--none">Ken yang</p>
                                <p className="rc-margin-bottom--none">Russia</p>
                                <p className="rc-margin-bottom--none">Moscow</p>
                                <p className="rc-margin-bottom--none">Other</p>
                                <p className="rc-margin-bottom--none">Ababurovo 123456</p>
                              </div>
                              <div className="col-12 col-sm-4">
                                <p className="rc-margin-bottom--none">1</p>
                                <p className="rc-margin-bottom--none">House number 1</p>
                                <p className="rc-margin-bottom--none">+7 (923) 456-78-90</p>
                              </div>
                            </div>
                          </div>
                          <div className="rc-column">
                            <h6 className="rc-large-body"><b>Payment method</b></h6>
                            <div className="d-flex">
                              <img src="/on/demandware.static/-/Sites/default/dwc6f3441f/visa-dark.svg" alt="image" style={{ maxWidth: '14%' }} />
                              <span className="rc-padding-left--sm">************* 0008</span>
                            </div>
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