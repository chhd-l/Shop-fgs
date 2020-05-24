import React from "react"
import { FormattedMessage } from 'react-intl'
import Skeleton from 'react-skeleton-loader'
import { Link } from "react-router-dom"
import { getReturnDetails } from "@/api/order"
import { formatMoney } from "@/utils/utils"
import successImg from "@/assets/images/credit-cards/success.png"
import './index.css'

export default class OrdersAfterSaleSuccess extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      returnNumber: '',
      details: null,
      loading: true
    }
  }
  componentDidMount () {
    this.setState({
      returnNumber: this.props.match.params.returnNumber
    }, () => this.queryReturnDetails())
  }
  queryReturnDetails () {
    getReturnDetails(this.state.returnNumber)
      .then(res => {
        this.setState({
          details: res.context,
          loading: false
        })
      })
  }
  render () {
    const { details } = this.state
    return (
      <div>
        <div className="center">
          {
            this.state.loading
              ? <Skeleton color="#f5f5f5" width="100%" height="50%" count={5} />
              : details
                ? <React.Fragment>
                  <img src={successImg} alt="" />
                  <h4>
                    The return refund/exchange application is submited successfully!
                  </h4>
                  <p style={{ marginBottom: '5px' }}>
                    Your application has been submited for review, you can view the progress in the personal center.
                  </p>
                  <div className="info-container text-left">
                    {details.returnItems.map(item => (
                      <div className="d-flex mb-1" key={item.skuId}>
                        <img
                          class="img-fluid border"
                          src={item.pic}
                          alt={item.skuName}
                          title={item.skuName}
                          style={{ width: "20%" }} />
                        <span className="ml-2">
                          {item.skuName}<br />
                          {item.specDetails} - {item.num} items
                        </span>
                      </div>
                    ))}
                    <div className="d-flex justify-content-between mb-1">
                      <span>Return number: </span>
                      <span>{this.state.returnNumber}</span>
                    </div>
                    {/* <div className="d-flex justify-content-between">
                      <span>Return amount: </span>
                      <span className="red">{formatMoney(details.returnPrice.totalPrice)}</span>
                    </div> */}
                    <div class="circle-line"></div>
                  </div>
                  <Link to={`/account/orders-aftersale/detail/${this.state.returnNumber}`} className="rc-meta rc-styled-link backtohome">
                    View after-sale details
                  </Link>&nbsp;&nbsp;&nbsp;&nbsp;
                  <Link to="/" className="rc-meta rc-styled-link backtohome">
                    <FormattedMessage id="confirmation.visitOnlineStore" />
                  </Link>
                </React.Fragment>
                : null
          }
        </div>

      </div>
    )
  }
}