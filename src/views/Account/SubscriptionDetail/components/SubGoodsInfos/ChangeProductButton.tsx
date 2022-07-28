import React from 'react';
import { FormattedMessage } from 'react-intl';

type ChangeProductButtonProps = {
  handleClickChangeProduct: () => void;
};
const ChangeProductButton = ({
  handleClickChangeProduct
}: ChangeProductButtonProps) => {
  return (
    <div
      className="rc-card-content px-3 md:px-0 mt-cs-24 font-semibold text-cs-primary rounded-full border-2 border-cs-primary text-center py-2"
      onClick={handleClickChangeProduct}
    >
      <FormattedMessage id="subscriptionDetail.changeProduct" />
      {/* <div className=" flex items-center">
        <span
          style={{
            width: 'auto',
            paddingTop: '6px'
          }}
          className={cn(`text-plain rc-styled-link ui-text-overflow-md-line1`, {
            'ui-btn-loading': productListLoading
          })}
          onClick={() => handleClickChangeProduct(idx)}
        >
          <em
            className="iconfont iconrefresh font-bold mr-2"
            style={{
              fontSize: '1.1rem',
              color: 'rgb(58,180,29)'
            }}
          />
<FormattedMessage id="subscriptionDetail.changeProduct" />
          <span>
          </span>
        </span>
      </div> */}
    </div>
  );
};

export default ChangeProductButton;
