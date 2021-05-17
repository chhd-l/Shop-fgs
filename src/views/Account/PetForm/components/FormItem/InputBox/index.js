import React from 'react';
import { FormattedMessage } from 'react-intl';
import './index.less';

export default (props) => {
  const { htmlFor, FormattedMsg = '', name, value, handleChange } = props;
  return (
    <div className="form-input-box">
      <label className="form-control-label rc-full-width" htmlFor={htmlFor}>
        <FormattedMessage id={FormattedMsg} />
      </label>
            
      <input
        type="text"
        className="rc-input__control input-custom"
        id={name}
        name={name}
        required=""
        aria-required="true"
        value={value}
        onChange={handleChange}
        maxLength="50"
      />
    </div>
  );
};
