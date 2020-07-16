import React, { Component } from "react";
import { formatMoney } from "@/utils/utils";
import { FormattedMessage } from "react-intl";
import oxxo from "@/assets/images/oxxo.png";
import EBANX from "@/assets/images/EBANX.svg";
import testBarCode from "@/assets/images/testBarCode.svg";
import "./OxxoModal.css";

export default class OxxoModalBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalAmount: "1598",
      oxxoNumbers: ["88745", "56746", "57789", "37556", "76590", "06445"],
      oxxoAllNumber: "887455674657789375567659006445",
      amount: '600'
    };
  }
  render() {
    return (
      <div id="oxxoModalBody">
        <div className="oxxoHeader">
          <img src={EBANX} alt="" style={{ display: "inline-block" }} />
          <img src={oxxo} alt="" style={{ display: "inline-block" }} />
        </div>
        <div>
          <div className="oxxoTitle">
            <div className="totalAmount">
              <FormattedMessage
                id="totalPay"
                values={{
                  val: formatMoney(this.state.totalAmount),
                }}
              />
            </div>
          </div>
          <ul>
            <li>
              <FormattedMessage id="sendInformationByEmail" />
            </li>
            <li><FormattedMessage id="deposited48Hours" /></li>
            <li>
                <FormattedMessage id="mentionPagoService" />
            </li>
            <li><FormattedMessage id="tellCashier" /></li>
          </ul>
          <ul className="commission">
            <li>
              <span className="firstSpan"><FormattedMessage id="oxxoCommission" /></span>
              <span><FormattedMessage id="maximumAmount" /></span>
            </li>
          </ul>
          <div className="oxxoNumberPanel">
            {this.state.oxxoNumbers.map((x) => (
              <div className="oxxoNumber">
                <span>{x}</span>
              </div>
            ))}
          </div>
          <div className="barCode">
            <img
              src={testBarCode}
              alt=""
            />
            <div className="number">{this.state.oxxoAllNumber}</div>
            <div className="expirationPayment"><FormattedMessage id="expirationDate" /></div>
            <div className="expirationDate"><FormattedMessage id="before" /> 7 am. on July 11, 2020</div>
          </div>
          <div style={{ padding: "0px 35px" }}>
            <div className="concept">
              <div className="conceptHeader">
                <div style={{ padding: "10px 25px" }}><FormattedMessage id="concept" /></div>
              </div>
              <div style={{ padding: "0px 25px" }}>
                <div style={{ marginBottom: "15px",marginTop:'15px' }}>
                  <div className="shadowCircle"></div>
                  <span><FormattedMessage id="buy" /></span>
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <div><FormattedMessage id="purchaseHomeOnline" /></div>
                  <div>13062511</div>
                </div>
                <div style={{ marginBottom: "15px",fontWeight: 700 }}>{formatMoney(this.state.amount)}</div>
                <div className="feeTip"><FormattedMessage id="oxxoTransactionFee" /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
