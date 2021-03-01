import locales from '@/lang';
import catsImg from '@/assets/images/banner-list/cats.jpg';
import dogsImg from '@/assets/images/banner-list/dogs.jpg';
import visaImg from '@/assets/images/credit-cards/visa.svg';
import amexImg from '@/assets/images/credit-cards/amex.svg';
import mastercardImg from '@/assets/images/credit-cards/mastercard.svg';
import discoverImg from '@/assets/images/credit-cards/discover.svg';
import cartebancaireImg from '@/assets/images/credit-cards/cartebancaire.png';
import oxxo from '@/assets/images/oxxo.png';

import breedCatsImg from '@/assets/images/banner-list/Banner_BHN_Persa.jpg';
import breedDogsImg from '@/assets/images/banner-list/Banner_BHN_German_Shepherd.jpg';

import CARECAT from '@/assets/images/MX-L-VET-CARE-CAT.jpg';
import CAREDOG from '@/assets/images/MX-L-VET-CARE-DOG.jpg';
import DIETCAT from '@/assets/images/MX-L-VET-DIET-CAT.jpg';
import DIETDOG from '@/assets/images/MX-L-VET-DIET-DOG.jpg';
import Bundles_Breed_Cat from '@/assets/images/home-catogery-mx/Bundles_Breed_Cat.jpg';
import Bundles_Breed_Dog from '@/assets/images/home-catogery-mx/Bundles_Breed_Dog.jpg';

import untereHarnwege from '@/assets/images/home-catogery-de/01_UntereHarnwege.jpg';
import hautFell from '@/assets/images/home-catogery-de/02_HautFell.jpg';
import ubergewicht from '@/assets/images/home-catogery-de/03_Ubergewicht.jpg';
import diabetesMellitus from '@/assets/images/home-catogery-de/04_Diabetes_mellitus.jpg';
import magenDarmTrakt from '@/assets/images/home-catogery-de/05_Magen-Darm-Trakt.jpg';
import leber from '@/assets/images/home-catogery-de/06_Leber.jpg';
import niere from '@/assets/images/home-catogery-de/07_Niere.jpg';
import gelenke from '@/assets/images/home-catogery-de/08_Gelenke.jpg';
import herz from '@/assets/images/home-catogery-de/09_Herz.jpg';
import kastration from '@/assets/images/home-catogery-de/10_Kastration.jpg';
import maulhohle from '@/assets/images/home-catogery-de/11_Maulhohle.jpg';
import verhalten from '@/assets/images/home-catogery-de/12_Verhalten.jpg';
import aufzuchtWachstum from '@/assets/images/home-catogery-de/13_AufzuchtWachstum.jpg';
import prophylaxe from '@/assets/images/home-catogery-de/14_Prophylaxe.jpg';
import pillAssist from '@/assets/images/home-catogery-de/15_PillAssist.jpg';

import puppyRuImg from '@/assets/images/banner-list/puppy-ru.png';
import kittenRuImg from '@/assets/images/banner-list/kitten-ru.png';
import catsRuImg from '@/assets/images/banner-list/cats-ru.png';

const CURRENT_LANGFILE = locales;

export const IMG_DEFAULT =
  'data:image/png;base64,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';
export const SUBSCRIPTION_DISCOUNT_RATE = '35%';

export const DELIVER_STATUS_ENUM = {
  NOT_YET_SHIPPED: CURRENT_LANGFILE['deliveryStatus.NOT_YET_SHIPPED'],
  SHIPPED: CURRENT_LANGFILE['deliveryStatus.SHIPPED'],
  PART_SHIPPED: CURRENT_LANGFILE['deliveryStatus.PART_SHIPPED'],
  VOID: CURRENT_LANGFILE['deliveryStatus.VOID']
};
export const ORDER_STATUS_ENUM = {
  INIT: CURRENT_LANGFILE['orderStatus.INIT'],
  REMEDY: CURRENT_LANGFILE['orderStatus.REMEDY'],
  REFUND: CURRENT_LANGFILE['orderStatus.REFUND'],
  AUDIT: CURRENT_LANGFILE['orderStatus.AUDIT'],
  DELIVERED_PART: CURRENT_LANGFILE['orderStatus.DELIVERED_PART'],
  DELIVERED: CURRENT_LANGFILE['orderStatus.DELIVERED'],
  CONFIRMED: CURRENT_LANGFILE['orderStatus.CONFIRMED'],
  COMPLETED: CURRENT_LANGFILE['orderStatus.COMPLETED'],
  VOID: CURRENT_LANGFILE['orderStatus.VOID']
};
export const PAY_STATUS_ENUM = {
  REFUND: CURRENT_LANGFILE['payStatus.REFUND'],
  NOT_PAID: CURRENT_LANGFILE['payStatus.NOT_PAID'],
  PAID: CURRENT_LANGFILE['payStatus.PAID'],
  PAYING: CURRENT_LANGFILE['payStatus.PAID_IN']
};

export const CREDIT_CARD_IMG_ENUM = {
  VISA: visaImg,
  MASTERCARD: mastercardImg,
  'AMERICAN EXPRESS': amexImg,
  DISCOVER: discoverImg,
  OXXO: oxxo,
  AMEX: amexImg
};

export const CREDIT_CARD_IMGURL_ENUM = [visaImg, amexImg, mastercardImg];
const tmpArr = [visaImg, mastercardImg];
export const ADYEN_CREDIT_CARD_IMGURL_ENUM =
  {
    fr: [visaImg, mastercardImg, cartebancaireImg],
    ru: [visaImg, mastercardImg, discoverImg, amexImg],
    en: [visaImg, mastercardImg, discoverImg, amexImg]
  }[process.env.REACT_APP_LANG] || tmpArr;
export const ADYEN_CREDIT_CARD_BRANDS = {
  fr: ['mc', 'visa', 'cartebancaire'],
  ru: ['mc', 'visa', 'amex', 'discover'],
  en: ['mc', 'visa', 'amex', 'discover'],
  de: ['mc', 'visa']
}[process.env.REACT_APP_LANG] || ['mc', 'visa', 'amex'];

export const EMAIL_REGEXP = /^[\w.%+-]+@[\w.-]+\.[\w]{2,6}$/;

export const ADDRESS_RULE = [
  {
    key: 'firstName',
    require: true,
    errMsg: CURRENT_LANGFILE['payment.errorInfo'].replace(
      /{.+}/,
      CURRENT_LANGFILE['payment.firstName']
    )
  },
  {
    key: 'lastName',
    require: true,
    errMsg: CURRENT_LANGFILE['payment.errorInfo'].replace(
      /{.+}/,
      CURRENT_LANGFILE['payment.lastName']
    )
  },
  {
    key: 'address1',
    require: true,
    errMsg: CURRENT_LANGFILE['payment.errorInfo'].replace(
      /{.+}/,
      CURRENT_LANGFILE['payment.address1']
    )
  },
  {
    key: 'country',
    require: true,
    errMsg: CURRENT_LANGFILE['payment.errorInfo'].replace(
      /{.+}/,
      CURRENT_LANGFILE['payment.country']
    )
  },
  {
    key: 'city',
    require: true,
    errMsg: CURRENT_LANGFILE['payment.errorInfo'].replace(
      /{.+}/,
      CURRENT_LANGFILE['payment.city']
    )
  },
  {
    key: 'province',
    // require: true,
    require: process.env.REACT_APP_LANG === 'en'? false : true,
    errMsg: CURRENT_LANGFILE['payment.errorInfo'].replace(
      /{.+}/,
      CURRENT_LANGFILE['payment.province']
    )
  },
  // {
  //   key: 'email',
  //   regExp: EMAIL_REGEXP,
  //   require: true,
  //   errMsg: CURRENT_LANGFILE['enterCorrectValue'].replace(
  //     /{.+}/,
  //     CURRENT_LANGFILE['email']
  //   )
  // },
  {
    key: 'phoneNumber',
    regExp: process.env.REACT_APP_LANG === 'fr' ? /[+(33)|0]\d{9}$/ : '',
    require: process.env.REACT_APP_LANG === 'de'? false : true,
    errMsg: CURRENT_LANGFILE['enterCorrectPhoneNumber']
  },
  {
    key: 'postCode',
    regExp: /^\d{5}$/,
    require: true,
    errMsg: CURRENT_LANGFILE['enterCorrectPostCode']
  }
];

export const PAYMENT_METHOD_RULE = [
  {
    key: 'phoneNumber',
    regExp: process.env.REACT_APP_LANG === 'fr' ? /[+(33)|0]\d{9}$/ : '',
    require: true,
    errMsg: CURRENT_LANGFILE['payment.errorInfo'].replace(
      /{.+}/,
      CURRENT_LANGFILE['payment.phoneNumber']
    )
  },
  {
    key: 'cardOwner',
    require: true,
    errMsg: CURRENT_LANGFILE['payment.errorInfo'].replace(
      /{.+}/,
      CURRENT_LANGFILE['payment.cardOwner']
    )
  },
  {
    key: 'email',
    regExp: EMAIL_REGEXP,
    require: true,
    errMsg: CURRENT_LANGFILE['enterCorrectValue'].replace(
      /{.+}/,
      CURRENT_LANGFILE['email']
    )
  }
];

export const PRESONAL_INFO_RULE = [
  {
    key: 'firstName',
    require: true,
    errMsg: CURRENT_LANGFILE['payment.errorInfo'].replace(
      /{.+}/,
      CURRENT_LANGFILE['payment.firstName']
    )
  },
  {
    key: 'lastName',
    require: true,
    errMsg: CURRENT_LANGFILE['payment.errorInfo'].replace(
      /{.+}/,
      CURRENT_LANGFILE['payment.lastName']
    )
  },
  {
    key: 'address1',
    require: true,
    errMsg: CURRENT_LANGFILE['payment.errorInfo'].replace(
      /{.+}/,
      CURRENT_LANGFILE['payment.address1']
    )
  },
  {
    key: 'country',
    require: true,
    errMsg: CURRENT_LANGFILE['payment.errorInfo'].replace(
      /{.+}/,
      CURRENT_LANGFILE['payment.country']
    )
  },
  {
    key: 'city',
    require: true,
    errMsg: CURRENT_LANGFILE['payment.errorInfo'].replace(
      /{.+}/,
      CURRENT_LANGFILE['payment.city']
    )
  },
  {
    key: 'email',
    regExp: EMAIL_REGEXP,
    require: true,
    errMsg: CURRENT_LANGFILE['enterCorrectValue'].replace(
      /{.+}/,
      CURRENT_LANGFILE['email']
    )
  },
  {
    key: 'phoneNumber',
    regExp: process.env.REACT_APP_LANG === 'fr' ? /[+(33)|0]\d{9}$/ : '',
    require: process.env.REACT_APP_LANG == 'de' ? false : true,
    errMsg: CURRENT_LANGFILE['payment.errorInfo'].replace(
      /{.+}/,
      CURRENT_LANGFILE['payment.phoneNumber']
    )
  },
  {
    key: 'postCode',
    regExp: /^\d{5}$/,
    require: true,
    errMsg: CURRENT_LANGFILE['enterCorrectValue'].replace(
      /{.+}/,
      CURRENT_LANGFILE['payment.postCode2']
    )
  }
];
