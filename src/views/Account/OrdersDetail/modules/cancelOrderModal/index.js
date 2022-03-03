/*
 * Created By ZuoQin On 2022/02/21
 * japan order cancellation confirmation modal
 */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { formatDate } from '@/utils/utils';
import { OrderAllProduct } from '@/views/Account/OrdersDetail/modules';

export default class Modal extends React.Component {
  static defaultProps = {
    modalTitle: <FormattedMessage id="Order cancellation confirmation" />,
    cancelBtnText: <FormattedMessage id="order.cancelCancelOrder" />,
    middleSpanText: <FormattedMessage id="or" />,
    confirmBtnText: <FormattedMessage id="order.sureCancelOrder" />,
    visible: false, //是否显示弹框
    details: null,
    cancelJpOrderLoading: false
  };
  close = () => {
    this.props.close();
  };
  handleClickCancel = () => {
    this.props.handleClickCancel();
  };
  handleClickConfirm = () => {
    this.props.handleClickConfirm();
  };
  render() {
    const { visible, details } = this.props;
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
            style={{ top: '40%', transform: 'translateY(-50%)' }}
          >
            <div className="modal-content p-4 relative mt-0">
              <div className="flex justify-between flex-col-reverse md:flex-row">
                <span className="medium text-xl"> {this.props.modalTitle}</span>
                <span
                  className="iconfont iconguan cursor-pointer hover:text-rc-red text-right mb-2 md:mb-0"
                  onClick={this.close}
                />
              </div>
              <div className="modal-body px-0 overflow-y-auto overflow-x-hidden max-h-1/2-screen">
                {details ? (
                  <div className="row m-0 border md:border-0">
                    <div
                      className="col-12 border-t-0 border-l-0 border-r-0 md:border table-header rounded mt-0"
                      style={{ backgroundColor: '#f6f6f6' }}
                    >
                      <div className="row pt-3 pb-2 px-1 md:px-4 md:pt-4 md:pb-3">
                        {/* 订单创建时间 */}
                        <div className="md:mr-8 text-left mb-2">
                          <FormattedMessage id="order.orderDate" />
                          <br />
                          <span className="medium">
                            {formatDate({
                              date: details.tradeState.createTime
                            })}
                          </span>
                        </div>
                        {/* 订单号 */}
                        <div className="text-right md:text-left mb-2">
                          <FormattedMessage id="order.orderNumber" />
                          <br />
                          <span className="medium">{details.id}</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 table-body rounded md:mt-3 mb-2 pl-0 pr-0">
                      <OrderAllProduct
                        details={details}
                        orderNumberForOMS={''}
                      />
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="modal-footer border-t-0 md:border-t pr-0 pb-0">
                <div className="w-full flex justify-center md:justify-end">
                  <div className="flex items-center  flex-col md:flex-row">
                    <span
                      className="rc-styled-link border-b border-gray-300 hover:border-rc-red mb-2"
                      onClick={this.handleClickCancel}
                    >
                      {this.props.cancelBtnText}
                    </span>
                    <span className="mx-2 mb-2">
                      {this.props.middleSpanText}
                    </span>
                    <button
                      className={`rc-btn rc-btn--one mb-2 ${
                        this.props.cancelJpOrderLoading ? 'ui-btn-loading' : ''
                      }`}
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
