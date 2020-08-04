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
    const info = this.props.info || store.get('info')
    const { paymentInfo } = this.props
    return (<div style={{ padding: '0 15px' }}>
      <div className="row rc-bg-colour--brand3 pt-3 pb-3">
        <div className="col-12 col-md-6">
          <FormattedMessage id="deliveryAddress" /><br />
          <span className="medium">{info.deliveryAddress.firstName}{' '}{info.deliveryAddress.lastName}</span><br />
          {info.deliveryAddress.postCode}, {info.deliveryAddress.phoneNumber}<br />
          {this.matchNamefromDict(this.state.countryList, info.deliveryAddress.country)}{' '}{this.matchNamefromDict(this.state.cityList, info.deliveryAddress.city)}<br />
          {info.deliveryAddress.address1}<br />
          {info.deliveryAddress.address2}{info.deliveryAddress.address2 ? <br /> : null}
          {info.deliveryAddress.rfc}{info.deliveryAddress.rfc ? <br /> : null}
          {info.commentOnDelivery}
        </div>
        {
          paymentInfo
            ? <div className="col-12 col-md-6">
              <img
                className="d-inline-block mr-1"
                style={{ width: '20%' }}
                src={paymentInfo.img} />
              <span className="medium">********{paymentInfo.last4Digits}</span><br />
              {paymentInfo.payAccountName}<br />
              {paymentInfo.payPhoneNumber}<br />
              {paymentInfo.email}
            </div>
            : null
        }
        <div className="col-12 col-md-6 mt-3">
          <FormattedMessage id="billingAddress" /><br />
          <span className="medium">{info.billingAddress.firstName}{' '}{info.billingAddress.lastName}</span><br />
          {info.billingAddress.postCode}, {info.billingAddress.phoneNumber}<br />
          {this.matchNamefromDict(this.state.countryList, info.billingAddress.country)}{' '}{this.matchNamefromDict(this.state.cityList, info.billingAddress.city)}<br />
          {info.billingAddress.address1}<br />
          {info.billingAddress.address2}{info.billingAddress.address2 ? <br /> : null}
          {info.billingAddress.rfc}{info.billingAddress.rfc ? <br /> : null}
        </div>
      </div>
    </div>
    )
  }
}

export default InfosPreview