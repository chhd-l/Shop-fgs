import React, { useEffect, useState } from 'react';

const ErrorMessage = ({ msg }) => {
  return msg ? (
    <div className="rc-padding-bottom--xs cart-error-messaging cart-error">
      <aside
        className="rc-alert rc-alert--error rc-alert--with-close text-break"
        role="alert"
      >
        <span className="pl-0">{msg}</span>
      </aside>
    </div>
  ) : null;
};
export default ErrorMessage;
