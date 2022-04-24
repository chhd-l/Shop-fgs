import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { getElementToPageTop } from '@/utils/utils';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleAClick = () => {
    const el = document.getElementById('bazaarvoice-review-container');
    const length = getElementToPageTop(el);
    window.scrollTo({
      top: length - 80,
      behavior: 'smooth'
    });
  };

  render() {
    return (
      <div>
        <span
          data-bv-show="inline_rating"
          data-bv-product-id={this.props.productId}
        />
        <span
          className="cursor-pointer"
          style={{
            marginLeft: 10,
            fontWeight: '500',
            textDecoration: 'underline',
            display: 'inline-block',
            verticalAlign: 'top'
          }}
          onClick={this.handleAClick}
        >
          <FormattedMessage id="viewReviews" />
        </span>
      </div>
    );
  }
}

export default Index;
