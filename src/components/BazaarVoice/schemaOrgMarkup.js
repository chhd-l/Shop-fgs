import { loadJS } from '../../utils/utils';

export function addSchemaOrgMarkup(details, instockStatus) {
  // if (!!+process.env.REACT_APP_SHOW_BAZAARVOICE_RATINGS) {
  loadJS({
    code: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Product',
      '@id': window.location.href,
      name: details.goodsName,
      description: details.goodsNewSubtitle,
      sku: details.goodsNo,
      mpn: details.goodsNo,
      image: details.goodsImg,
      brand: details.brandName || 'Royal Canin',
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
  // loadJS({
  //   code: JSON.stringify({
  //     '@context': 'https://schema.org',
  //     '@id': window.location.href,
  //     "aggregateRating": {
  //       "@type": "AggregateRating",
  //       "bestRating":5,
  //       "ratingValue":3.8,
  //       "reviewCount":1070
  //     }
  //   }),
  //   type: 'application/ld+json',
  //   id:'bv-jsonld-aggregate-rating-data'
  // });
  // loadJS({
  //   code: JSON.stringify({
  //     '@context': 'https://schema.org',
  //     '@id': window.location.href,
  //     "review": {
  //       "@type": "Review",
  //       "bestRating":5,
  //       "ratingValue":3.8,
  //       "reviewCount":1070,
  //       author:'zuoqin'
  //     }
  //   }),
  //   type: 'application/ld+json',
  //   id:'bv-jsonld-review-data'
  // });
  // }
}
