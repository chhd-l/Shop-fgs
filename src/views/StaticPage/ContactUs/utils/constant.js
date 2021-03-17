import locales from '@/lang';
const CURRENT_LANGFILE = locales;
export const EMAIL_REGEXP = /^[\w.%+-]+@[\w.-]+\.[\w]{2,6}$/;
export const ADDRESS_RULE = [
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
    key: 'email',
    require: true,
    errMsg: CURRENT_LANGFILE['contactUs.requiredField']
  },
  {
    key: 'validEmail',
    regExp: EMAIL_REGEXP,
    require: true,
    errMsg: CURRENT_LANGFILE['contactUs.validEmailField']
  },
  {
    key: 'request',
    require: true,
    errMsg: CURRENT_LANGFILE['contactUs.requiredField']
  }
];
