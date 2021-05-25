import React from 'react';
import { FormattedMessage } from 'react-intl';

export default (props) => {
  const { htmlFor, FormattedMsg = '', radioGroup, radioChange } = props;

  return (
    <div className="form-radio-box">
      <label className="form-control-label rc-full-width" htmlFor={htmlFor}>
        <FormattedMessage id={FormattedMsg} />
      </label>
      <div style={{ padding: '.5rem 0' }}>
        {radioGroup.length &&
          radioGroup.map((item) => {
            return (
              <div className="rc-input rc-input--inline">
                <input
                  className="rc-input__radio"
                  value={item.value}
                  id={item.label}
                  checked={item.checked}
                  type="radio"
                  name={item.name}
                  onChange={radioChange}
                />
                <label className="rc-input__label--inline" htmlFor={item.label}>
                  <FormattedMessage id={item.label} />
                </label>
              </div>
            );
          })}
      </div>
    </div>
  );
};
