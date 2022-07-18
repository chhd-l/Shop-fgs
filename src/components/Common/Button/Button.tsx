import React from 'react';
import cn from 'classnames';

interface Props {
  type?: 'primary'; // 空时，为线性；primary时，为实心
  size?: string; // 空，或small
  loading?: boolean;
  className?: string;
  disabled?: boolean;
  htmlType?: 'submit' | 'reset' | 'button';
  children?: any;
  onClick?: any;
  style?: any;
}

/**
 * Button component
 */
const Button = ({
  type,
  size,
  loading,
  className,
  disabled,
  children,
  htmlType,
  ...rest
}: Props) => {
  return (
    <button
      className={cn(
        `rc-btn`,
        className,
        type === 'primary' ? 'rc-btn--one' : 'rc-btn--two',
        {
          'opacity-50 border-rc-red': loading,
          'bg-rc-red': !disabled && type === 'primary',
          'text-rc-red': loading && type !== 'primary',
          'rc-btn--sm': size === 'small'
        }
      )}
      disabled={loading || disabled}
      type={htmlType}
      {...rest}
    >
      {loading ? (
        <span
          className={cn('ui-btn-loading opacity-100', {
            'ui-btn-loading-border-red': type !== 'primary'
          })}
        />
      ) : null}
      <span>{children}</span>
    </button>
  );
};

export default Button;
