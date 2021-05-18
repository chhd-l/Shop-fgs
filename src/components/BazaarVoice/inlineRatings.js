import React from 'react';
import { getDeviceType } from '@/utils/utils';

const isMobilePhone = getDeviceType() === 'H5';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        className={`${isMobilePhone ? '' : 'd-flex justify-content-center'}`}
        data-bv-show="inline_rating"
        data-bv-product-id={this.props.productId}
        data-bv-redirect-url={this.props.productRedirectUrl || ''}
      />
    );
  }
}

export default Index;
