/*
 * Created By ZuoQin On 2021/03/25
 * 询问是否绑定prescriber弹框
 */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import './index.less';

export default class Modal extends React.Component {
  static defaultProps = {
    modalTitle: <FormattedMessage id="bindPrescriber.modal.title" />,
    modalText: <FormattedMessage id="bindPrescriber.modal.content" />,
    cancelBtnText: <FormattedMessage id="bindPrescriber.modal.no" />,
    middleSpanText: <FormattedMessage id="bindPrescriber.modal.or" />,
    confirmBtnText: <FormattedMessage id="bindPrescriber.modal.yes" />,
    visible: false //是否显示弹框
  };
  close = () => {
    this.props.close();
  };
  handleClickConfirm = () => {
    this.props.handleClickConfirm();
  };
  render() {
    const { visible } = this.props;
    return (
      <React.Fragment>
        {visible ? (
          <div
            className={`rc-shade `}
            style={{ backgroundColor: 'rgba(51,51,51,.5)' }}
          />
        ) : null}
        <div
          className={`modal prescriber-modal fade ${visible ? 'show' : ''}`}
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
            <div className="modal-content prescriber-modal-content mt-0">
              <div className="prescriber-modal-header">
                {this.props.modalTitle}
              </div>
              <div
                className="modal-body delete-confirmation-body"
                style={{
                  maxHeight: '50vh',
                  overflowY: this.props.overflowVisible ? 'visible' : 'auto'
                }}
              >
                {this.props.modalText}
                {this.props.children}
              </div>
              <div className="modal-footer">
                <a
                  id="modalFooterCancel"
                  type="button"
                  className="rc-styled-link"
                  data-dismiss="modal"
                  onClick={this.close}
                >
                  {this.props.cancelBtnText}
                </a>
                <span className="middle-span-text">
                  {this.props.middleSpanText}
                </span>
                <button
                  id="modalFooterConfirm"
                  type="button"
                  className="btn btn-primary cart-delete-confirmation-btn"
                  data-dismiss="modal"
                  onClick={this.handleClickConfirm}
                >
                  {this.props.confirmBtnText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
