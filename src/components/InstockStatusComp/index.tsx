import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import './index.less'
interface Props {
  status: Boolean;
  className?: string;
}

const InstockStatusComp = ({ status,className }: Props) => {
  return (
    <div className={`stock__wrapper stock__wrapper_comp ${className}`}>
      <div className="stock">
        {status ? (
          <>
            <label className={`availability instock`}>
              <span className="title-select" />
            </label>
            <span className="availability-msg" data-ready-to-order="true">
              <div>
                <FormattedMessage id="details.inStock" />
              </div>
            </span>
          </>
        ) : (
          <>
            <label className={`availability outofstock`}>
              <span className="title-select" />
            </label>
            <span className="availability-msg" data-ready-to-order="true">
              <div className={`out-stock`}>
                <FormattedMessage id="details.outStock" />
              </div>
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default InstockStatusComp
