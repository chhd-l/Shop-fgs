import React from 'react';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        data-bv-show="rating_summary"
        data-bv-product-id={this.props.productId}
      />
    );
  }
}

export default Index;
