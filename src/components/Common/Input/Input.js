import React from 'react';
import cn from 'classnames';
import { DivWrapper } from './style';

const Input = ({
  type = 'text',
  maxLength = 50,
  name,
  valid = true,
  onChange,
  onBlur,
  value,
  label,
  inValidLabel,
  id,
  toolTip,
  rightOperateBoxJSX,
  className,
  ...rest
}) => {
  return (
    <DivWrapper
      className={cn(
        'form-group md:mb-10 required text-left relative',
        className
      )}
    >
      <div
        className={cn('rc-input rc-input--full-width relative', {
          'rc-input--error': !valid
        })}
        data-rc-feature-forms-setup="true"
      >
        <input
          className="rc-input__control-overwrite"
          id={id}
          type={type}
          maxLength={maxLength}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          {...rest}
        />
        <label className="rc-input__label-overwrite">
          <span className="rc-input__label-text-overwrite">{label}</span>
        </label>
        {rightOperateBoxJSX ? (
          <div className="absolute right-0 bottom-0">{rightOperateBoxJSX}</div>
        ) : null}
      </div>
      <div className="invalid-feedback">{inValidLabel}</div>
      {toolTip}
    </DivWrapper>
  );
};
export default Input;
