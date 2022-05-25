import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import './index.less';

export default (props) => {
  const {
    htmlFor,
    FormattedMsg = '',
    placeholder = '',
    disabled = false,
    name,
    value,
    handleChange
  } = props;
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
          autocomplete="off"
          className="rc-input__control"
          id={name}
          name={name}
          placeholder={placeholder}
          required=""
          disabled={disabled}
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
