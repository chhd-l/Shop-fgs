/*
 * Created By ZuoQin On 2022/02/21
 * japan order cancellation confirmation modal
 */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import {
  formatDate,
  formatMoney,
  getClubLogo,
  optimizeImage
} from '@/utils/utils';
import { IMG_DEFAULT } from '@/utils/constant';
import { Link } from 'react-router-dom';

export default class Modal extends React.Component {
  static defaultProps = {
    modalTitle: <FormattedMessage id="Order cancellation confirmation" />,
    modalText: '',
    cancelBtnText: <FormattedMessage id="order.cancelCancelOrder" />,
    middleSpanText: <FormattedMessage id="or" />,
    confirmBtnText: <FormattedMessage id="order.sureCancelOrder" />,
    visible: false, //是否显示弹框
    details: null,
    welcomeGiftLists: [],
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
    const { visible, details, welcomeGiftLists } = this.props;
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
              <div
                className="modal-body px-0 overflow-y-scroll overflow-x-hidden"
                style={{
                  maxHeight: '50vh'
                }}
              >
                {this.props.modalText}
                {details ? (
                  <div className="row m-0 border md:border-0">
                    <div
                      className="col-12 border-t-0 border-l-0 border-r-0 md:border table-header rounded mt-0"
                      style={{ backgroundColor: '#f6f6f6' }}
                    >
                      <div className="row pt-3 pb-2 px-1 md:px-4 md:pt-4 md:pb-3">
                        {/* 订单号 */}
                        <div className="col-6 text-left mb-2">
                          <FormattedMessage id="order.orderDate" />
                          <br />
                          <span className="medium">
                            {formatDate({
                              date: details.tradeState.createTime
                            })}
                          </span>
                        </div>
                        {/* 订单状态 */}
                        <div className="col-6 text-right md:text-left mb-2">
                          <FormattedMessage id="order.orderNumber" />
                          <br />
                          <span className="medium">{details.id}</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 table-body rounded md:mt-3 mb-2 pl-0 pr-0">
                      <div className="order__listing text-left">
                        <div className="order-list-container">
                          {details.tradeItems
                            .concat(details.gifts || [])
                            .map((item, i) => (
                              <div
                                className="border-0 md:border border-bottom px-2 py-3"
                                key={i}
                              >
                                <div
                                  className={`row align-items-center px-2 md:px-0`}
                                >
                                  <div className="col-4 col-md-2 d-flex justify-content-center align-items-center">
                                    <img
                                      className="order-details-img-fluid w-100"
                                      src={
                                        optimizeImage({
                                          originImageUrl: item.pic
                                        }) || IMG_DEFAULT
                                      }
                                      alt={item.spuName}
                                      title={item.spuName}
                                    />
                                  </div>
                                  <div className="col-8 col-md-3 p-0">
                                    <span className="">
                                      <span
                                        className="medium ui-text-overflow-line2 text-break color-444"
                                        title={item.spuName}
                                      >
                                        {item.spuName}
                                      </span>
                                      <span className="ui-text-overflow-line2">
                                        {item.specDetails}
                                      </span>
                                      {item.subscriptionSourceList?.length ? (
                                        <span>
                                          <span className="iconfont mr-2 text-rc-red">
                                            &#xe675;
                                          </span>
                                          <FormattedMessage id="subscription.numberFirstWordUpperCase" />
                                          {item.subscriptionSourceList.map(
                                            (el) => (
                                              <p className="ui-text-overflow-line1">
                                                <Link
                                                  to={`/account/subscription/order/detail/${el.subscribeId}`}
                                                  className="rc-styled-link medium mb-0"
                                                >
                                                  {el.subscribeId}
                                                </Link>
                                              </p>
                                            )
                                          )}
                                        </span>
                                      ) : null}
                                      <span className="rc-md-down">
                                        {details.subscriptionResponseVO &&
                                        item.subscriptionStatus ? (
                                          <>
                                            <span className="red font-weight-normal">
                                              {formatMoney(
                                                item.subscriptionPrice
                                              )}
                                            </span>

                                            <span className="text-line-through ml-2">
                                              {formatMoney(item.originalPrice)}
                                            </span>
                                          </>
                                        ) : (
                                          formatMoney(item.originalPrice)
                                        )}
                                      </span>
                                    </span>
                                  </div>
                                  <div className="col-6 col-md-2 text-right md:text-left rc-md-up">
                                    <FormattedMessage
                                      id="xProduct"
                                      values={{
                                        val: item.num
                                      }}
                                    />
                                  </div>
                                  <div
                                    className={`col-6 col-md-3 text-right md:text-left rc-md-up`}
                                  >
                                    {details.subscriptionResponseVO &&
                                    item.subscriptionStatus ? (
                                      <>
                                        <span className="red font-weight-normal">
                                          {formatMoney(item.subscriptionPrice)}
                                        </span>
                                        <span className="text-line-through ml-2">
                                          {formatMoney(item.originalPrice)}
                                        </span>
                                      </>
                                    ) : (
                                      formatMoney(item.originalPrice)
                                    )}
                                  </div>
                                  <div
                                    className={`col-12 col-md-2 text-right md:text-left text-nowrap rc-md-up font-weight-normal d-flex justify-content-center flex-column`}
                                  >
                                    {details.subscriptionResponseVO &&
                                    item.subscriptionStatus
                                      ? formatMoney(
                                          item.subscriptionPrice * item.num
                                        )
                                      : formatMoney(
                                          item.originalPrice * item.num
                                        )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          {/*welcome box gifts*/}
                          {welcomeGiftLists.map((item, i) => (
                            <div className="border-bottom px-2 py-3" key={i}>
                              <div
                                className={`row align-items-center px-2 md:pxr-0`}
                              >
                                <div className="col-4 col-md-2 d-flex justify-content-center align-items-center">
                                  <img
                                    className="order-details-img-fluid w-100"
                                    src={
                                      optimizeImage({
                                        originImageUrl:
                                          item.goodsInfoImg || item.pic
                                      }) ||
                                      getClubLogo({
                                        goodsInfoFlag: item.goodsInfoFlag
                                      })
                                    }
                                    alt=""
                                    title=""
                                  />
                                </div>
                                <div className="col-8 col-md-3">
                                  <span
                                    className="medium ui-text-overflow-line2 text-break color-444"
                                    title={item.goodsInfoName}
                                  >
                                    {item.goodsInfoName}
                                  </span>
                                  <span className="ui-text-overflow-line2">
                                    <span className="rc-md-down">
                                      <FormattedMessage
                                        id="quantityText"
                                        values={{
                                          specText: '',
                                          buyCount: item.quantity
                                        }}
                                      />
                                    </span>
                                  </span>
                                  <span className="rc-md-down 1111">
                                    {formatMoney(item.marketPrice)}
                                  </span>
                                </div>
                                <div className="col-6 col-md-2 text-right md:text-left rc-md-up">
                                  <FormattedMessage
                                    id="xProduct"
                                    values={{
                                      val: item.quantity
                                    }}
                                  />
                                </div>
                                <div className="col-6 col-md-3 text-right md:text-left rc-md-up">
                                  {formatMoney(item.marketPrice)}
                                </div>
                                <div className="col-12 col-md-2 text-right md:text-left text-nowrap rc-md-up font-weight-normal">
                                  {formatMoney(item.marketPrice)}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
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
