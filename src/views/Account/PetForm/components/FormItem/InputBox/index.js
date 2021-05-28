import React from 'react';
import { FormattedMessage } from 'react-intl';
import './index.less';

export default (props) => {
  const { htmlFor, FormattedMsg = '', name, value, handleChange } = props;
  return (
    <>
      <label className="form-control-label rc-full-width" htmlFor={htmlFor}>
        <FormattedMessage id={FormattedMsg} />
      </label>
      <span
        className="rc-input rc-input--label rc-margin--none rc-input--full-width"
        input-setup="true"
      >
        <input
          style={{ padding: '.5rem 0' }}
          type="text"
          className="rc-input__control"
          id={name}
          name={name}
          required=""
          aria-required="true"
          value={value}
          onChange={handleChange}
          maxLength="50"
        />
        <label className="rc-input__label" htmlFor="name"></label>
      </span>
    </>
  );
};
