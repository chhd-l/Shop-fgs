import React from 'react'
import { FormattedMessage } from 'react-intl-phraseapp';

interface Props {
  checkOutErrMsg: string,
  formattedKey?:string,
}

function ErrMsgForCheckoutPanel({ checkOutErrMsg,formattedKey }: Props) {
  return (
    <div className={`text-break mt-2 mb-2 ${checkOutErrMsg || formattedKey ? '' : 'hidden'}`}>
      <aside
        className="rc-alert rc-alert--error rc-alert--with-close"
        role="alert"
      >
        <span className="pl-0">{formattedKey?<FormattedMessage id={formattedKey}/>:checkOutErrMsg}</span>
      </aside>
    </div>
  );
}

export default ErrMsgForCheckoutPanel