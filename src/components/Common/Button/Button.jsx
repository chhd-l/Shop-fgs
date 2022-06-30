import React from 'react';
import cn from 'classnames';

const Button = ({ loading, className, disabled, children, ...rest }) => {
  return (
    <button
      className={cn(
        `rc-btn rc-btn--one flex items-center justify-between`,
        className,
        {
          'ui-btn-loading bg-rc-red border-rc-red': loading
        }
      )}
      disabled={loading || disabled}
      {...rest}
    >
      {children}
    </button>
  );
  return (
    <button
      className={cn(`rc-btn rc-btn--one`, className, {
        'opacity-50 bg-rc-red border-rc-red': loading
      })}
      disabled={loading || disabled}
      {...rest}
    >
      {loading ? (
        <span
          className="ui-btn-loading opacity-100 transform top-1/2 -translate-y-1/2 absolute"
          style={{ left: '.25rem' }}
        />
      ) : null}
      {children}
    </button>
  );
};

export default Button;
