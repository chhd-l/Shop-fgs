import React from 'react'
import { FormattedMessage } from 'react-intl'

export default class Modal extends React.Component {
  static defaultProps = {
    modalTitle: 'Information',
    modalText: '',
    visible: false,
    confirmLoading: false
  }
  constructor(props) {
    super(props)
  }
  close () {
    this.props.close()
  }
  hanldeClickConfirm () {
    this.props.hanldeClickConfirm()
  }
  render () {
    const { visible } = this.props
    return (
      <React.Fragment>
        {/* modal */}
        <div
          className={`modal-backdrop fade ${visible ? "show" : ""}`}
          style={{ display: visible ? "block" : "none", zIndex: 59 }}
        ></div>
        <div
          className={`modal fade ${visible ? "show" : ""}`}
          id="removeProductModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="removeProductLineItemModal"
          style={{ display: visible ? "block" : "none", overflow: 'hidden' }}
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header delete-confirmation-header">
                <h4 className="modal-title" id="removeProductLineItemModal">{this.props.modalTitle}</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => this.close()}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body delete-confirmation-body">
                {this.props.modalText}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  data-dismiss="modal"
                  onClick={() => this.close()}
                >
                  <FormattedMessage id="cancel" />
                </button>
                <button
                  type="button"
                  className={`btn btn-primary cart-delete-confirmation-btn ${this.props.confirmLoading ? 'ui-btn-loading' : ''}`}
                  data-dismiss="modal"
                  onClick={() => this.hanldeClickConfirm()}
                >
                  <FormattedMessage id="yes" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}