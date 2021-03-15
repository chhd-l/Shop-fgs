import locales from '@/lang';
const CURRENT_LANGFILE = locales;
export const EMAIL_REGEXP = /^[\w.%+-]+@[\w.-]+\.[\w]{2,6}$/;
export const ADDRESS_RULE = [
  {
    key: 'cardholderName',
    require: true,
    errMsg: CURRENT_LANGFILE['contactUs.requiredField']
  },
  {
    key: 'cardNumber',
    require: true,
    errMsg: CURRENT_LANGFILE['contactUs.requiredField']
  },
  {
    key: 'securityCode',
    require: true,
    errMsg: CURRENT_LANGFILE['contactUs.requiredField']
  },
  {
    key: 'expirationMonth',
    require: true,
    errMsg: CURRENT_LANGFILE['contactUs.requiredField']
  },
  {
    key: 'expirationYear',
    require: true,
    errMsg: CURRENT_LANGFILE['contactUs.requiredField']
  },
];