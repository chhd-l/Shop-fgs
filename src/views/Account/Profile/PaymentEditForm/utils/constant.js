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
  {
    key: 'firstName',
    require: true,
    errMsg: CURRENT_LANGFILE['contactUs.requiredField']
  },
  {
    key: 'lastName',
    require: true,
    errMsg: CURRENT_LANGFILE['contactUs.requiredField']
  },
  {
    key: 'address1',
    require: true,
    errMsg: CURRENT_LANGFILE['contactUs.requiredField']
  },
  {
    key: 'address2',
    require: false,
    errMsg: CURRENT_LANGFILE['contactUs.requiredField']
  },
  {
    key: 'country',
    require: true,
    errMsg: CURRENT_LANGFILE['contactUs.requiredField']
  },
  {
    key: 'state',
    require: true,
    errMsg: CURRENT_LANGFILE['contactUs.requiredField']
  },
  {
    key: 'city',
    require: true,
    errMsg: CURRENT_LANGFILE['contactUs.requiredField']
  },
  {
    key: 'zipCode',
    require: true,
    errMsg: CURRENT_LANGFILE['contactUs.requiredField']
  },
  {
    key: 'email',
    require: true,
    errMsg: CURRENT_LANGFILE['contactUs.requiredField']
  },
];