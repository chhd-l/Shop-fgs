import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';

interface Props {
  status: Boolean;
}

const InstockStatusComp = ({ status }: Props) => {
  return (
    <div className="stock__wrapper">
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
