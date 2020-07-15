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
            <li>Your payment will be deposited in 48 hours.</li>
            <li>
              Mention to the cashier that you want to pay for a Mercado Pago
              service
            </li>
            <li>Tell this code to the cashier and you're done.</li>
          </ul>
          <ul className="commission">
            <li>
              <span className="firstSpan">OXXO Commission: $ 12.00</span>
              <span>Maximum amount : $ 10 000</span>
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
            <div className="expirationPayment">Expiration Payment date:</div>
            <div className="expirationDate">Before 7 am. on July 11, 2020</div>
          </div>
          <div style={{ padding: "0px 35px" }}>
            <div className="concept">
              <div className="conceptHeader">
                <div style={{ padding: "10px 25px" }}>Concept</div>
              </div>
              <div style={{ padding: "0px 25px" }}>
                <div style={{ marginBottom: "15px",marginTop:'15px' }}>
                  <div className="shadowCircle"></div>
                  <span>Buy</span>
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <div>Purchase made at The Home Depot online -</div>
                  <div>13062511</div>
                </div>
                <div style={{ marginBottom: "15px",fontWeight: 700 }}>$600</div>
                <div className="feeTip">(Does not include the OXXO transaction fee)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
