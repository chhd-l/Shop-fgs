import React from 'react';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        id="bazaarvoice-review-container"
        className="rc-max-width--xl rc-padding-x--sm"
        data-bv-show="reviews"
        data-bv-product-id={this.props.productId}
      />
    );
  }
}

export default Index;
