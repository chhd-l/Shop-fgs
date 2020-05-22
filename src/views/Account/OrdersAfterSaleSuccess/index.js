import React from "react"
import { FormattedMessage } from 'react-intl'
import { Link } from "react-router-dom"
import successImg from "@/assets/images/credit-cards/success.png"
import './index.css'

export default class OrdersAfterSaleSuccess extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <div>
        <div className="center">
          <img src={successImg} alt="" />
          <h4>
            The return refund/exchange application is submited successfully!
          </h4>
          <p style={{ marginBottom: '5px' }}>
            Your application has been submited for review, you can view the progress in the personal center.
          </p>
          <div className="info-container text-left">
            <div className="d-flex mb-1">
              <img
                class="img-fluid border"
                src="https://wanmi-b2b.oss-cn-shanghai.aliyuncs.com/202004271507544701.png"
                alt="Satiety Support Feline" title="Satiety Support Feline"
                style={{ width: "20%" }} />
              <span className="ml-2">
                Satiety Support Feline<br />
                4kg - 2 items
              </span>
            </div>
            <div className="d-flex justify-content-between mb-1">
              <span>Return number: </span>
              <span>R23333333</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Return amount: </span>
              <span className="red">200</span>
            </div>
            <div class="circle-line"></div>
          </div>
          <Link to="/" className="rc-meta rc-styled-link backtohome">
            <FormattedMessage id="confirmation.visitOnlineStore" />
          </Link>&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/" className="rc-meta rc-styled-link backtohome">
            <FormattedMessage id="confirmation.visitOnlineStore" />
          </Link>
        </div>

      </div>
    )
  }
}