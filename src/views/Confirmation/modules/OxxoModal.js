import React, { Component } from "react";
import oxxo from "@/assets/images/oxxo.png";
import EBANX from "@/assets/images/EBANX.svg";
import "./OxxoModal.css";
import OxxoModalBody from "./OxxoModalBody";
import ReactToPrint from "react-to-print";

export default class OxxoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  close() {
    this.props.close();
  }
  render() {
    const { visible } = this.props;
    return (
      <React.Fragment>
        {visible ? (
          <div
            className={`rc-shade `}
            style={{ backgroundColor: "rgba(51,51,51,.5)" }}
          />
        ) : null}
        <div
          className={`modal fade ${visible ? "show" : ""}`}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="removeProductLineItemModal"
          style={{ display: visible ? "block" : "none", overflow: "hidden" }}
          aria-hidden="true"
        >
          <div
            className="modal-dialog mt-0 mb-0"
            role="document"
            id="oxxoModal"
            style={{ top: "50%", transform: "translateY(-50%)" }}
          >
            <div className="modal-content mt-0">
              <div id="mainBody" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                <OxxoModalBody ref={(el) => (this.componentRef = el)} />
                <ReactToPrint
                  trigger={() => {
                    // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                    // to the root node of the returned component as it will be overwritten.
                    return <div className="printPanel"> <button className="print" href="#">Print</button></div>;
                  }}
                  content={() => this.componentRef}
                />
              </div>
              <div className="modal-footer">
                <a href="#" style={{ marginRight: '35px' }}>Visit store map</a>
                <a href="#" onClick={() => this.close()}>Close</a>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
