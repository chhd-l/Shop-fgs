import React from "react";
import { FormattedMessage } from 'react-intl'
import { formatMoney } from "@/utils/utils.js"

class PayProductInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: []
    };
  }
  get totalCount () {
    return formatMoney(this.state.productList.reduce(
      (total, item) => total + item.currentAmount,
      0
    ))
  }
  componentDidMount () {
    let productList = JSON.parse(localStorage.getItem("rc-cart-data"));
    this.setState({
      productList: productList,
    });
  }
  getProducts (plist) {
    const List = plist.map((el, i) => {
      let selectedSizeItem = el.sizeList.filter((item) => item.selected)[0];
      return (
        <div className="product-summary__products__item" key={i}>
          <div className="product-line-item">
            <div className="product-line-item-details d-flex flex-row">
              <div className="item-image">
                <img className="product-image" src={el.goodsImg} />
              </div>
              <div className="wrap-item-title">
                <div className="item-title">
                  <div className="line-item-name capitalize">
                    <span className="light">{el.goodsName}</span>
                  </div>
                </div>
                <div className="line-item-total-price justify-content-start pull-left">
                  <div className="item-attributes">
                    <p className="line-item-attributes">
                      {selectedSizeItem.detailName} - {el.quantity} {el.quantity > 1 ? <FormattedMessage id="items" /> : <FormattedMessage id="item" />}
                    </p>
                  </div>
                </div>
                <div className="line-item-total-price justify-content-end pull-right">
                  <div>
                    $ {formatMoney(el.currentAmount)}
                  </div>
                </div>
              </div>
            </div>
            <div className="item-options"></div>
          </div>
        </div>
      );
    });
    return List;
  }
  render () {
    const { productList } = this.state
    const List = this.getProducts(productList);
    return (
      <div className="product-summary__inner">
        <div className="product-summary__recap">
          <div className="product-summary__itemnbr checkout--padding rc-bg-colour--brand4">
            {productList.reduce((total, item) => total + item.quantity, 0)}&nbsp;
            {productList.reduce((total, item) => total + item.quantity, 0) > 1 ? <FormattedMessage id="items" /> : <FormattedMessage id="item" />}&nbsp;
            <FormattedMessage id="payment.totalProduct" />
          </div>
          <div className="product-summary__recap__content">
            <div className="rc-border-colour--interface rc-border-left rc-border-right checkout--padding">
              {List}
              <div className="product-summary__fees order-total-summary">
                <div className="row leading-lines subtotal-item">
                  <div className="col-8 start-lines">
                    <p className="order-receipt-label">
                      <span><FormattedMessage id="total" /></span>
                    </p>
                  </div>
                  <div className="col-4 end-lines">
                    <p className="text-right">
                      <span className="sub-total">
                        $ {this.totalCount}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="row leading-lines shipping-item">
                  <div className="col-7 start-lines">
                    <p className="order-receipt-label order-shipping-cost">
                      <span><FormattedMessage id="delivery" /></span>
                    </p>
                  </div>
                  <div className="col-5 end-lines">
                    <p className="text-right">
                      <span className="shipping-total-cost">0</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="product-summary__total grand-total row leading-lines rc-bg-colour--brand4 checkout--padding">
            <div className="col-6 start-lines order-receipt-label">
              <span><FormattedMessage id="totalCost" /></span>
            </div>
            <div className="col-6 end-lines text-right">
              <span className="grand-total-sum">
                $ {this.totalCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PayProductInfo;
