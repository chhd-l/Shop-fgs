import React from "react"
import { FormattedMessage } from 'react-intl'
import Skeleton from 'react-skeleton-loader'
import { Link } from "react-router-dom"
import { getReturnDetails } from "@/api/order"
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { IMG_DEFAULT } from '@/utils/constant'
import successImg from "@/assets/images/credit-cards/success.png"
import './index.css'

export default class OrdersAfterSaleSuccess extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      returnNumber: '',
      afterSaleType: '',
      details: null,
      loading: true,
      errMsg: ''
    }
  }
  componentDidMount () {
    this.setState({
      returnNumber: this.props.match.params.returnNumber,
      afterSaleType: sessionStorage.getItem('rc-after-sale-type')
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
      .catch(err => {
        this.setState({
          errMsg: err.toString(),
          loading: false
        })
      })
  }
  render () {
    const { details, errMsg } = this.state
    return (
      <div>
        <Header history={this.props.history} />
        <main className="rc-content--fixed-header">
          <div className="rc-layout-container rc-three-column rc-max-width--xl">
            <div className="rc-column rc-double-width">
              <div className="center">
                {
                  this.state.loading
                    ? <Skeleton color="#f5f5f5" width="100%" height="50%" count={5} />
                    : details
                      ? <React.Fragment>
                        <img src={successImg} alt="" style={{ display: 'inline-block' }} />
                        <h4>
                          <b>The {details.returnType === 'RETURN' ? 'return refund' : 'exchange'} application is submited successfully!</b>
                        </h4>
                        <p style={{ marginBottom: '5px' }}>
                          Your application has been submited for review, you can view the progress in the personal center.
                        </p>
                        <Link
                          to={`/account/return-order-detail/${this.state.returnNumber}`}
                          className="rc-meta rc-styled-link backtohome"
                          style={{ fontWeight: 500 }}>
                          View after-sale details
                        </Link>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Link
                          to="/"
                          className="rc-meta rc-styled-link backtohome"
                          style={{ fontWeight: 500 }}>
                          <FormattedMessage id="confirmation.visitOnlineStore" />
                        </Link>
                        <p className="rc-margin-top--sm"><b>Return number: {this.state.returnNumber}</b></p>
                        <div className="rc-bg-colour--brand3 rc-max-width--xl rc-bottom-spacing rc-padding--sm imformation">
                          <div className="info-container text-left">
                            {details.returnItems.map(item => (
                              <div className="d-flex mb-1" key={item.skuId}>
                                <img
                                  className="img-fluid border"
                                  src={item.pic || IMG_DEFAULT}
                                  alt={item.skuName}
                                  title={item.skuName}
                                  style={{ width: "20%" }} />
                                <span className="ml-2">
                                  {item.skuName}<br />
                                  {item.specDetails} - {item.num} items
                                </span>
                              </div>
                            ))}
                            <div className="circle-line"></div>
                          </div>
                        </div>
                      </React.Fragment>
                      : errMsg
                        ? <div className="text-center mt-5 mb-5">
                          <span class="rc-icon rc-incompatible--xs rc-iconography"></span>
                          {errMsg}
                        </div>
                        : null
                }
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
}