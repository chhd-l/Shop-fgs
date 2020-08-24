import React from 'react';
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
export const requestInvoiceJSX = {
    es: <li className="rc-list__item">
      <Link className="rc-list__link text-decoration-none color-f6f6f6" to="/requestinvoice" role="menuitem">
        <FormattedMessage id="footer.RequestInvoice" />
      </Link>
    </li>,
    en: <li className="rc-list__item">
      <Link className="rc-list__link text-decoration-none color-f6f6f6" to="/requestinvoice" role="menuitem">
        <FormattedMessage id="footer.RequestInvoice" />
      </Link>
    </li>,
    de: null
  }