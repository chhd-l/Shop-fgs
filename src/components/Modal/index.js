import React from 'react'
import { FormattedMessage } from 'react-intl'

export default class Modal extends React.Component {
  static defaultProps = {
    modalTitle: <FormattedMessage id="information" />,
    modalText: '',
    visible: false,
    confirmLoading: false,
    confirmBtnText: <FormattedMessage id="yes" />,
    cancelBtnVisible: true
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
        {
          visible
            ? <div className={`rc-shade `} style={{ backgroundColor: 'rgba(51,51,51,.5)' }} />
            : null
        }
        <div
          className={`modal fade ${visible ? "show" : ""}`}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="removeProductLineItemModal"
          style={{ display: visible ? "block" : "none", overflow: 'hidden' }}
          aria-hidden="true"
        >
          <div className="modal-dialog mt-0 mb-0" role="document" style={{ top: '50%', transform: 'translateY(-50%)' }}>
            <div className="modal-content mt-0">
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
              <div className="modal-body delete-confirmation-body" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                {this.props.modalText}
                {this.props.children}
              </div>
              <div className="modal-footer">
                {
                  this.props.cancelBtnVisible
                    ? <button
                      type="button"
                      className="btn btn-outline-primary"
                      data-dismiss="modal"
                      onClick={() => this.close()}
                    >
                      <FormattedMessage id="cancel" />
                    </button>
                    : null
                }
                <button
                  type="button"
                  className={`btn btn-primary cart-delete-confirmation-btn ${this.props.confirmLoading ? 'ui-btn-loading' : ''}`}
                  data-dismiss="modal"
                  onClick={() => this.hanldeClickConfirm()}
                >
                  {this.props.confirmBtnText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}