import locales from '@/lang';
const CURRENT_LANGFILE = locales;
export const EMAIL_REGEXP = /^[\w.%+-]+@[\w.-]+\.[\w]{2,6}$/;
export const PHONENEMBER_REGEXP = /^(1?|(1\-)?)\d{10}$/; //美国电话号码正则表达
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
  },
  {
    key: 'phoneNumber',
    regExp: PHONENEMBER_REGEXP,
    errMsg: CURRENT_LANGFILE['contactUs.validUsPhoneField']
  }
];
