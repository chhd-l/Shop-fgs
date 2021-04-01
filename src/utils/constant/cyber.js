import visaImg from '@/assets/images/credit-cards/visa.svg';
import amexImg from '@/assets/images/credit-cards/amex.svg';
import mastercardImg from '@/assets/images/credit-cards/mastercard.svg';
import discoverImg from '@/assets/images/credit-cards/discover.svg';

const CardTypeDesc = {
  '001': 'Visa',
  '002': 'Mastercard',
  '003': 'Amex',
  '004': 'Discover'
};

const cardTypeImg = {
  visa: visaImg,
  mastercard: mastercardImg,
  amex: amexImg,
  discover: discoverImg
};

const CardTypeArr = {
  cyberVisa: '001',
  cyberMastercard: '002',
  cyberAmex: '003',
  cyberDiscover: '004'
};

const CardTypeName = {
  cyberVisa: 'Visa',
  cyberMastercard: 'Mastercard',
  cyberAmex: 'Amex',
  cyberDiscover: 'Discover'
};

const cyberFormTitle = {
  cardHolderName: 'cyber.form.cardHolderName2',
  cardNumber: 'cyber.form.cardNumber2',
  EXPMonth: 'cyber.form.EXPMonth2',
  EXPYear: 'cyber.form.EXPYear2',
  secureCode: 'cyber.form.secureCode2'
};

export { CardTypeDesc, cardTypeImg, CardTypeArr, CardTypeName, cyberFormTitle };
