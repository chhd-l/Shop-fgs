import { loadJS } from '@/utils/utils';
export const setGoogleProductStructuredDataMarkup = ({
  instockStatus,
  details,
  spuImages,
  goodsDetailTab,
  goodsNo
}) => {
  loadJS({
    code: JSON.stringify({
      '@context': 'http://schema.org/',
      '@type': 'Product',
      name: details.goodsName,
      description: goodsDetailTab[0] && goodsDetailTab[0].content,
      mpn: goodsNo,
      sku: goodsNo,
      image: spuImages.map((s) => s.artworkUrl),
      offers: {
        url: {},
        '@type': 'AggregateOffer',
        priceCurrency: process.env.REACT_APP_CURRENCY,
        availability: instockStatus
          ? 'http://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
        lowPrice: details.fromPrice,
        highPrice: details.toPrice || details.fromPrice
      }
    }),
    type: 'application/ld+json'
  });
};
