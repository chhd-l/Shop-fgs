/*
 * Created By ZuoQin On 2022/02/22
 * japan order cancel success tip modal
 */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';

export default class Modal extends React.Component {
  static defaultProps = {
    modalTitle: '',
    modalText: <FormattedMessage id="order.cancelOrderSuccessTip" />,
    confirmBtnText: <FormattedMessage id="Done" />,
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
          className={`modal overflow-hidden fade ${visible ? 'show' : ''}`}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="removeProductLineItemModal"
          style={{ display: visible ? 'block' : 'none' }}
          aria-hidden="true"
        >
          <div
            className="modal-dialog my-0"
            role="document"
            style={{ top: '30%', transform: 'translateY(-50%)' }}
          >
            <div className="modal-content min-w-full relative mt-0 ml-0">
              <div className="flex justify-between p-4">
                <span className="medium text-xl"> {this.props.modalTitle}</span>
                <span
                  className="iconfont iconguan cursor-pointer hover:text-rc-red"
                  onClick={this.close}
                />
              </div>
              <div
                className="modal-body px-0"
                style={{
                  maxHeight: '50vh'
                }}
              >
                <div className="flex flex-column items-center">
                  <span className="iconfont green mr-2 text-2xl iconchenggong mb-2" />
                  <span className="medium text-xl mb-2 text-center">
                    {this.props.modalText}
                  </span>
                </div>
              </div>
              <div className="modal-footer p-0">
                <div className="w-full flex flex-row-reverse p-4">
                  <div className="flex items-center">
                    <button
                      className="rc-btn rc-btn--one"
                      onClick={this.handleClickConfirm}
                    >
                      {this.props.confirmBtnText}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
