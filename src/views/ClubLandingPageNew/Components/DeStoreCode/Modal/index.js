/*
 * Created By ZuoQin On 2021/03/25
 * 询问是否绑定prescriber弹框
 */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import './index.less';
import PrescriberCode from '../precriberCode';

export default class Modal extends React.Component {
  close = () => {
    this.props.close();
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
          className={`modal prescriber-code-modal fade ${
            visible ? 'show' : ''
          }`}
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
              <div className="mobile-margin-top">
                <button
                  type="button"
                  className="close-btn close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => this.close()}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <PrescriberCode />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
