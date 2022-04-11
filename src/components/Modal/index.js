import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import FullScreenModal from './FullScreenModal';

export default class Modal extends React.Component {
  static defaultProps = {
    modalTitle: <FormattedMessage id="information" />,
    modalText: '',
    visible: false,
    headerVisible: true,
    confirmLoading: false,
    cancelBtnText: <FormattedMessage id="cancel" />,
    confirmBtnText: <FormattedMessage id="yes" />,
    cancelBtnVisible: true,
    footerVisible: true,
    cancelBtnIsLink: false,
    cancel: null
  };
  close() {
    this.props.close();
  }
  hanldeClickConfirm() {
    this.props.hanldeClickConfirm();
  }
  render() {
    const { visible, type } = this.props;
    if (type === 'fullscreen') {
      return <>{<FullScreenModal />}</>;
    }
    return (
      <React.Fragment>
        {/* modal */}
        {visible ? (
          <div
            className={`rc-shade `}
            style={{ backgroundColor: 'rgba(51,51,51,.5)' }}
          />
        ) : null}
        <div
          className={`modal fade ${visible ? 'show' : ''}`}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="removeProductLineItemModal"
          style={{ display: visible ? 'block' : 'none', overflow: 'hidden' }}
          aria-hidden="true"
        >
          <div
            className="modal-dialog mt-0 mb-0"
            role="document"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          >
            <div
              className="modal-content mt-0"
              style={{ position: 'relative' }}
            >
              {this.props.headerVisible && (
                <div className="modal-header delete-confirmation-header">
                  <h1 className="modal-title" id="removeProductLineItemModal">
                    {this.props.modalTitle}
                  </h1>
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
              )}

              <div
                className="modal-body delete-confirmation-body"
                style={{
                  // maxHeight: '50vh',
                  overflowY: this.props.overflowVisible ? 'visible' : 'auto'
                }}
              >
                {this.props.modalText}
                {this.props.children}
              </div>
              {this.props.footerVisible && (
                <div className="modal-footer">
                  {this.props.cancelBtnVisible &&
                  !this.props.cancelBtnIsLink ? (
                    <button
                      id="modalFooterCancel"
                      type="button"
                      className="btn btn-outline-primary"
                      data-dismiss="modal"
                      onClick={() =>
                        this.props.cancel ? this.props.cancel() : this.close()
                      }
                    >
                      {this.props.cancelBtnText}
                    </button>
                  ) : null}
                  {this.props.cancelBtnVisible && this.props.cancelBtnIsLink ? (
                    <a
                      id="modalFooterCancel"
                      type="button"
                      className="rc-styled-link"
                      data-dismiss="modal"
                      onClick={() =>
                        this.props.cancel ? this.props.cancel() : this.close()
                      }
                    >
                      {this.props.cancelBtnText}
                    </a>
                  ) : null}
                  <button
                    id="modalFooterConfirm"
                    type="button"
                    className={`btn btn-primary cart-delete-confirmation-btn ${
                      this.props.confirmLoading ? 'ui-btn-loading' : ''
                    }`}
                    data-dismiss="modal"
                    onClick={() => this.hanldeClickConfirm()}
                  >
                    {this.props.confirmBtnText}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
