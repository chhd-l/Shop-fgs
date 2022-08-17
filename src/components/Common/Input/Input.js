import React from 'react';
import cn from 'classnames';
import { DivWrapper } from './style';

const Input = ({
  type = 'text',
  maxLength = 50,
  name,
  valid = true,
  highLightSuccess = false,
  onChange,
  onInput,
  onBlur,
  value,
  label,
  inValidLabel,
  id,
  toolTip,
  rightOperateBoxJSX,
  className,
  dataTestid = 'input',
  isWarning,
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
        className={cn(
          'rc-input rc-input--full-width relative rc-input-overwrite',
          {
            // 'rc-input--error': !valid,
            'rc-input--success': valid && highLightSuccess,
            'rc-input--error': isWarning
          }
        )}
        data-rc-feature-forms-setup="true"
      >
        <input
          className={cn('rc-input__control-overwrite')}
          id={id}
          data-auto-testid={dataTestid}
          type={type}
          maxLength={maxLength}
          name={name}
          onChange={onChange}
          onInput={onInput}
          onBlur={onBlur}
          value={value}
          {...rest}
        />
        <label className="rc-input__label-overwrite">
          <span className="rc-input__label-text-overwrite">{label}</span>
        </label>
        {rightOperateBoxJSX ? (
          <div className="absolute right-0 bottom-0 z-10">
            {rightOperateBoxJSX}
          </div>
        ) : null}
      </div>
      <div className="invalid-feedback">{inValidLabel}</div>
      {toolTip}
    </DivWrapper>
  );
};
export default Input;
