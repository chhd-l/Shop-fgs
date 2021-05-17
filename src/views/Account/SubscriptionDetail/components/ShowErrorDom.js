import React, { useEffect, useState } from 'react';
const ShowErrorDom = ({ errorMsg }) => {
  return errorMsg ? (
    <div className="rc-padding-bottom--xs cart-error-messaging cart-error">
      <aside
        className="rc-alert rc-alert--error rc-alert--with-close text-break"
        role="alert"
      >
        <span className="pl-0">{errorMsg}</span>
      </aside>
    </div>
  ) : null;
};
export default ShowErrorDom;
