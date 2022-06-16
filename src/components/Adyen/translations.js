const packageTranslations = ({ messages }) => ({
  storeDetails: messages['adyen.storeDetails'],

  holderName: messages['adyen.holderName'],
  'creditCard.holderName.placeholder':
    messages['adyen.creditCard.holderName.placeholder'],
  'creditCard.holderName.invalid':
    messages['adyen.creditCard.holderName.invalid'],

  'creditCard.numberField.title':
    messages['adyen.creditCard.numberField.title'],
  'creditCard.numberField.placeholder':
    messages['adyen.creditCard.numberField.placeholder'],
  'creditCard.numberField.invalid':
    messages['adyen.creditCard.numberField.invalid'],

  'creditCard.expiryDateField.title':
    messages['adyen.creditCard.expiryDateField.title'],
  'creditCard.expiryDateField.placeholder':
    messages['adyen.creditCard.expiryDateField.placeholder'],
  'creditCard.expiryDateField.invalid':
    messages['adyen.creditCard.expiryDateField.invalid'],

  'creditCard.cvcField.title': messages['adyen.creditCard.cvcField.title'],
  'creditCard.cvcField.placeholder':
    messages['adyen.creditCard.cvcField.placeholder']
});

export default packageTranslations;
