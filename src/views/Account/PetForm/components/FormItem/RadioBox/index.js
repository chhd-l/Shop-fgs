import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';

export default ({
  htmlFor,
  FormattedMsg = '',
  radioGroup,
  radioChange,
  setState
}) => {
  const handleChange = (e) => {
    radioGroup.forEach((item) => {
      let checked = item.value == e.currentTarget.value;
      item.checked = checked;
    });
    let checkedRadio = radioGroup.find((el) => el.checked);
    // setState({ radioGroup: newGroup });
    radioChange(checkedRadio.value);
  };
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
                  id={item.id}
                  checked={item.checked}
                  type="radio"
                  name={item.name}
                  onChange={handleChange}
                />
                <label className="rc-input__label--inline" htmlFor={item.id}>
                  <FormattedMessage id={item.label} />
                </label>
              </div>
            );
          })}
      </div>
    </div>
  );
};
