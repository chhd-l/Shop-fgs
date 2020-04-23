import React from "react";

class PayProductInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: []
    };
  }
  get totalCount() {
    return this.state.productList.reduce(
      (total, item) => total + item.currentAmount,
      0
    );
  }
  componentDidMount() {
    let productList = JSON.parse(localStorage.getItem("rc-cart-data"));
    this.setState({
      productList: productList,
    });
  }
  getProducts(plist) {
    const List = plist.map((el, i) => {
      let selectedSizeItem = el.sizeList.filter((item) => item.selected)[0];
      return (
        <div class="product-summary__products__item" key={i}>
          <div class="product-line-item">
            <div class="product-line-item-details d-flex flex-row">
              <div class="item-image">
                <img class="product-image" src={el.goodsImg} />
              </div>
              <div class="wrap-item-title">
                <div class="item-title">
                  <div class="line-item-name capitalize">
                    <span class="light">{el.goodsName}</span>
                  </div>
                </div>
                <div class="line-item-total-price justify-content-start pull-left">
                  <div class="item-attributes">
                    <p class="line-item-attributes">
                      {selectedSizeItem.detailName} - {el.quantity} item
                    </p>
                  </div>
                </div>
                <div class="line-item-total-price justify-content-end pull-right">
                  <div>
                    {el.currentAmount === 0 ? "0" : "$" + el.currentAmount}
                  </div>
                </div>
              </div>
            </div>
            <div class="item-options"></div>
          </div>
        </div>
      );
    });
    return List;
  }
  render() {
    const { productList } = this.state
    const List = this.getProducts(productList);
    return (
      <div class="product-summary__inner">
        <div class="product-summary__recap">
          <div class="product-summary__itemnbr checkout--padding rc-bg-colour--brand4">
            {productList.reduce((total, item) => total + item.quantity, 0)} item
            total product
          </div>
          <div class="product-summary__recap__content">
            <div class="rc-border-colour--interface rc-border-left rc-border-right checkout--padding">
              {List}
              <div class="product-summary__fees order-total-summary">
                <div class="row leading-lines subtotal-item">
                  <div class="col-8 start-lines">
                    <p class="order-receipt-label">
                      <span>Total</span>
                    </p>
                  </div>
                  <div class="col-4 end-lines">
                    <p class="text-right">
                      <span class="sub-total">
                        {this.totalCount === 0 ? "0" : "$" + this.totalCount}
                      </span>
                    </p>
                  </div>
                </div>
                <div class="row leading-lines shipping-item">
                  <div class="col-7 start-lines">
                    <p class="order-receipt-label order-shipping-cost">
                      <span>Delivery</span>
                    </p>
                  </div>
                  <div class="col-5 end-lines">
                    <p class="text-right">
                      <span class="shipping-total-cost">0</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="product-summary__total grand-total row leading-lines rc-bg-colour--brand4 checkout--padding">
            <div class="col-6 start-lines order-receipt-label">
              <span>Total cost</span>
            </div>
            <div class="col-6 end-lines text-right">
              <span class="grand-total-sum">
                {this.totalCount === 0 ? "0" : "$" + this.totalCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PayProductInfo;
