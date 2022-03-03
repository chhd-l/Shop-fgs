import { CREDIT_CARD_IMG_ENUM } from '@/utils/constant';

const getCardImg = ({ supportPaymentMethods = [], currentVendor }) => {
  return (
    CREDIT_CARD_IMG_ENUM[currentVendor?.toUpperCase()] ||
    supportPaymentMethods.filter(
      (s) => s.cardType?.toUpperCase() === currentVendor?.toUpperCase()
    )[0]?.imgUrl ||
    //'https://js.paymentsos.com/v2/iframe/latest/static/media/unknown.c04f6db7.svg'
    'https://checkoutshopper-test.adyen.com/checkoutshopper/images/logos/nocard.svg'
  );
};

export default getCardImg;
