import visaImg from '@/assets/images/credit-cards/visa.svg';
import amexImg from '@/assets/images/credit-cards/amex.svg';
import mastercardImg from '@/assets/images/credit-cards/mastercard.svg';
import discoverImg from '@/assets/images/credit-cards/discover.svg';

const cardTypeImg = {
  visa: visaImg,
  mastercard: mastercardImg,
  amex: amexImg,
  discover: discoverImg
};

const cyberFormTitle = {
  cardHolderName: 'cyber.form.cardHolderName2',
  cardNumber: 'cyber.form.cardNumber2',
  EXPMonth: 'cyber.form.EXPMonth2',
  EXPYear: 'cyber.form.EXPYear2',
  secureCode: 'cyber.form.secureCode2'
};

const cyberCardTypeToValue = {
  '001': 'Visa',
  '002': 'Mastercard',
  '003': 'Amex',
  '004': 'Discover'
};

export { cardTypeImg, cyberFormTitle, cyberCardTypeToValue };
