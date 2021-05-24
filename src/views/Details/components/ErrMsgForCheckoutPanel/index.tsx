import React from 'react'

interface Props {
  checkOutErrMsg: string
}

function ErrMsgForCheckoutPanel({ checkOutErrMsg }: Props) {
  return (
    <div className={`text-break mt-2 mb-2 ${checkOutErrMsg ? '' : 'hidden'}`}>
      <aside
        className="rc-alert rc-alert--error rc-alert--with-close"
        role="alert"
      >
        <span className="pl-0">{checkOutErrMsg}</span>
      </aside>
    </div>
  );
}

export default ErrMsgForCheckoutPanel