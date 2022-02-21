import { CREDIT_CARD_IMG_ENUM } from '@/utils/constant';

const getCardImg = ({ supportPaymentMethods = [], currentVendor }) => {
  return (
    supportPaymentMethods.filter(
      (s) => s.cardType?.toUpperCase() === currentVendor?.toUpperCase()
    )[0]?.imgUrl ||
    CREDIT_CARD_IMG_ENUM[currentVendor?.toUpperCase()] ||
    //'https://js.paymentsos.com/v2/iframe/latest/static/media/unknown.c04f6db7.svg'
    'https://checkoutshopper-test.adyen.com/checkoutshopper/images/logos/nocard.svg'
  );
};

export default getCardImg;
