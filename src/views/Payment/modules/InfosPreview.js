import React from 'react'
import { FormattedMessage } from "react-intl";
import { getDictionary } from "@/utils/utils";
import { find } from 'lodash'
import store from 'storejs'

class InfosPreview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countryList: [],
      cityList: []
    }
  }
  componentDidMount () {
    getDictionary({ type: 'city' })
      .then(res => {
        this.setState({
          cityList: res
        })
      })
    getDictionary({ type: 'country' })
      .then(res => {
        this.setState({
          countryList: res
        })
      })
  }
  matchNamefromDict (dictList, id) {
    return find(dictList, ele => ele.id == id)
      ? find(dictList, ele => ele.id == id).name
      : id
  }
  render () {
    const loginDeliveryInfo = store.get('loginDeliveryInfo')
    return (
      <div className="card shipping-summary">
        <div className="card-header rc-padding-right--none clearfix">
          <h5 className="pull-left"><FormattedMessage id="payment.addressTitle" /></h5>
        </div>
        <div className="card-body rc-padding--none">
          <p className="shipping-addr-label multi-shipping padding-y--sm">
            Addresses and shipping methods are indicated under your goods.
         </p>
          <div className="single-shipping">
            <div className="rc-border-all rc-border-colour--interface checkout--padding">
              <div className="summary-details shipping rc-margin-bottom--xs">
                <div className="address-summary row">
                  <div className="col-md-12 deliveryAddress">
                    <h5 className="center">
                      <FormattedMessage id="payment.deliveryTitle" />
                    </h5>
                    <div className="row">
                      <div className="col-md-6">
                        <FormattedMessage id="payment.firstName" />
                      </div>
                      <div className="col-md-6">
                        &nbsp;{loginDeliveryInfo.deliveryAddress.firstName}
                      </div>
                      <div className="col-md-6">
                        <FormattedMessage id="payment.lastName" />
                      </div>
                      <div className="col-md-6">
                        &nbsp;{loginDeliveryInfo.deliveryAddress.lastName}
                      </div>
                      <div className="col-md-6">
                        <FormattedMessage id="payment.address1" />
                      </div>
                      <div className="col-md-6">
                        &nbsp;{loginDeliveryInfo.deliveryAddress.address1}
                      </div>
                      <div className="col-md-6">
                        <FormattedMessage id="payment.address2" />
                      </div>
                      <div className="col-md-6">
                        &nbsp;{loginDeliveryInfo.deliveryAddress.address2}
                      </div>
                      <div className="col-md-6">
                        <FormattedMessage id="payment.country" />
                      </div>
                      <div className="col-md-6">
                        &nbsp;{this.matchNamefromDict(this.state.countryList, loginDeliveryInfo.deliveryAddress.country)}
                      </div>
                      <div className="col-md-6">
                        <FormattedMessage id="payment.city" />
                      </div>
                      <div className="col-md-6">
                        &nbsp;{this.matchNamefromDict(this.state.cityList, loginDeliveryInfo.deliveryAddress.city)}
                      </div>
                      <div className="col-md-6">
                        <FormattedMessage id="payment.postCode" />
                      </div>
                      <div className="col-md-6">
                        &nbsp;{loginDeliveryInfo.deliveryAddress.postCode}
                      </div>
                      <div className="col-md-6">
                        <FormattedMessage id="payment.phoneNumber" />
                      </div>
                      <div className="col-md-6">
                        &nbsp;{loginDeliveryInfo.deliveryAddress.phoneNumber}
                      </div>
                      <div className="col-md-6">
                        <FormattedMessage id="payment.rfc" />
                      </div>
                      <div className="col-md-6">
                        &nbsp;{loginDeliveryInfo.deliveryAddress.rfc}
                      </div>
                      <div className="col-md-6">
                        <FormattedMessage id="payment.normalDelivery2" />
                      </div>
                      <div className="col-md-6">
                        <FormattedMessage id="payment.forFree" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 address-summary-left">
                    <h5 className="center">
                      <FormattedMessage id="payment.billTitle" />
                    </h5>
                    <div className="row">
                      <div className="col-md-6">
                        <FormattedMessage id="payment.firstName" />
                      </div>
                      <div className="col-md-6">
                        &nbsp;{loginDeliveryInfo.billingAddress.firstName}
                      </div>
                      <div className="col-md-6">
                        <FormattedMessage id="payment.lastName" />
                      </div>
                      <div className="col-md-6">
                        &nbsp;{loginDeliveryInfo.billingAddress.lastName}
                      </div>
                      <div className="col-md-6">
                        <FormattedMessage id="payment.address1" />
                      </div>
                      <div className="col-md-6">
                        &nbsp;{loginDeliveryInfo.billingAddress.address1}
                      </div>
                      <div className="col-md-6">
                        <FormattedMessage id="payment.address2" />
                      </div>
                      <div className="col-md-6">
                        &nbsp;{loginDeliveryInfo.billingAddress.address2}
                      </div>
                      <div className="col-md-6">
                        <FormattedMessage id="payment.country" />
                      </div>
                      <div className="col-md-6">
                        &nbsp;{this.matchNamefromDict(this.state.countryList, loginDeliveryInfo.billingAddress.country)}
                      </div>
                      <div className="col-md-6">
                        <FormattedMessage id="payment.city" />
                      </div>
                      <div className="col-md-6">
                        &nbsp;{this.matchNamefromDict(this.state.cityList, loginDeliveryInfo.billingAddress.city)}
                      </div>
                      <div className="col-md-6">
                        <FormattedMessage id="payment.postCode" />
                      </div>
                      <div className="col-md-6">
                        &nbsp;{loginDeliveryInfo.billingAddress.postCode}
                      </div>
                      <div className="col-md-6">
                        <FormattedMessage id="payment.phoneNumber" />
                      </div>
                      <div className="col-md-6">
                        &nbsp;{loginDeliveryInfo.billingAddress.phoneNumber}
                      </div>
                      <div className="col-md-6">
                        <FormattedMessage id="payment.rfc" />
                      </div>
                      <div className="col-md-6">
                        &nbsp;{loginDeliveryInfo.billingAddress.rfc}
                      </div>
                      <div className="col-md-6">
                        <FormattedMessage id="payment.commentOnDelivery" />
                      </div>
                      <div className="col-md-6">
                        &nbsp;{loginDeliveryInfo.commentOnDelivery}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default InfosPreview