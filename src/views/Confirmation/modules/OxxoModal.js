import React, { Component } from "react";
import "./OxxoModal.css";
import OxxoModalBody from "./OxxoModalBody";
import ReactToPrint from "react-to-print";
import { FormattedMessage } from "react-intl";

export default class OxxoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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
              <div id="mainBody" style={{ maxHeight: '80vh',minHeight: '80vh', overflowY: 'auto' }}>
                {/* <OxxoModalBody ref={(el) => (this.componentRef = el)} />
                <ReactToPrint
                  trigger={() => {
                    // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                    // to the root node of the returned component as it will be overwritten.
                    return <div className="printPanel"> <button className="print" href="#"><FormattedMessage id="print" /></button></div>;
                  }}
                  content={() => this.componentRef}
                /> */}
                  <iframe src={this.props.oxxoPayUrl} width="100%" style={{ height: '78vh' }}>
                  </iframe>
              </div>
              <div className="modal-footer" style={{ borderTop: 'none' }}>
                <a href="https://www.oxxo.cl/ubicaciones" target="blank" style={{ marginRight: '35px' }}><FormattedMessage id="visitStoreMap" /></a>
                <a href="#" onClick={() => this.close()}><FormattedMessage id="close" /></a>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
