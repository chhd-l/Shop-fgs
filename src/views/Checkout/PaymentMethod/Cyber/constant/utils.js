export const ADDRESS_RULE = [
  {
    key: 'cardholderName',
    require: true,
    getErrMsg: ({ intl }) => {
      const { formatMessage } = intl;
      return formatMessage({ id: 'contactUs.requiredField' });
    }
  },
  {
    key: 'cardNumber',
    require: true,
    getErrMsg: ({ intl }) => {
      const { formatMessage } = intl;
      return formatMessage({ id: 'contactUs.requiredField' });
    }
  },
  {
    key: 'securityCode',
    require: true,
    getErrMsg: ({ intl }) => {
      const { formatMessage } = intl;
      return formatMessage({ id: 'contactUs.requiredField' });
    }
  },
  {
    key: 'expirationMonth',
    require: true,
    getErrMsg: ({ intl }) => {
      const { formatMessage } = intl;
      return formatMessage({ id: 'contactUs.requiredField' });
    }
  },
  {
    key: 'expirationYear',
    require: true,
    getErrMsg: ({ intl }) => {
      const { formatMessage } = intl;
      return formatMessage({ id: 'contactUs.requiredField' });
    }
  }
];
