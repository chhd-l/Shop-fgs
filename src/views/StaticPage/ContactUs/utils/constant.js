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
    //regExp: EMAIL_REGEXP,
    require: true,
    errMsg: CURRENT_LANGFILE['contactUs.requiredField']
  },
  {
    key: 'phoneNumber',
    //regExp: process.env.REACT_APP_LANG === 'fr' ? /[+(33)|0]\d{9}$/ : '',
    require: false,
    errMsg: ""
  },
//   {
//     key: 'address1',
//     require: true,
//     errMsg: CURRENT_LANGFILE['payment.errorInfo'].replace(
//       /{.+}/,
//       CURRENT_LANGFILE['payment.address1']
//     )
//   },
//   {
//     key: 'country',
//     require: true,
//     errMsg: CURRENT_LANGFILE['payment.errorInfo'].replace(
//       /{.+}/,
//       CURRENT_LANGFILE['payment.country']
//     )
//   },
//   {
//     key: 'city',
//     require: true,
//     errMsg: CURRENT_LANGFILE['payment.errorInfo'].replace(
//       /{.+}/,
//       CURRENT_LANGFILE['payment.city']
//     )
//   },
//   {
//     key: 'postCode',
//     regExp: /^\d{5}$/,
//     require: true,
//     errMsg: CURRENT_LANGFILE['enterCorrectPostCode']
//   }
];