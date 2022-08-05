import React from 'react';
import { isMobile as isMobilePhone } from '@/utils/utils';
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        className={`${
          isMobilePhone ? '' : 'd-flex justify-content-center'
        } mt-2`}
        data-bv-show="inline_rating"
        data-bv-product-id={this.props.productId}
      />
    );
  }
}

export default Index;
