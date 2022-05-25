import { EMAIL_REGEXP } from '@/utils/constant';
export const PHONENEMBER_REGEXP = /^(1?|(1\-)?)\d{10}$/; //美国电话号码正则表达

export const ADDRESS_RULE = [
  {
    key: 'firstName',
    require: true,
    getErrMsg: ({ intl }) => {
      const { formatMessage } = intl;
      return formatMessage({ id: 'contactUs.requiredField' });
    }
  },
  {
    key: 'lastName',
    require: true,
    getErrMsg: ({ intl }) => {
      const { formatMessage } = intl;
      return formatMessage({ id: 'contactUs.requiredField' });
    }
  },
  {
    key: 'email',
    require: true,
    getErrMsg: ({ intl }) => {
      const { formatMessage } = intl;
      return formatMessage({ id: 'contactUs.requiredField' });
    }
  },
  {
    key: 'validEmail',
    regExp: EMAIL_REGEXP,
    require: true,
    getErrMsg: ({ intl }) => {
      const { formatMessage } = intl;
      return formatMessage({ id: 'contactUs.requiredField' });
    }
  },
  {
    key: 'request',
    require: true,
    getErrMsg: ({ intl }) => {
      const { formatMessage } = intl;
      return formatMessage({ id: 'contactUs.requiredField' });
    }
  },
  {
    key: 'phoneNumber',
    require: true,
    regExp: PHONENEMBER_REGEXP,
    getErrMsg: ({ intl }) => {
      const { formatMessage } = intl;
      return formatMessage({ id: 'contactUs.requiredField' });
    }
  }
];
