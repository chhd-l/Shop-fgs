import { loadJS } from '../../utils/utils';

export function addSchemaOrgMarkup(details, instockStatus) {
  const avgRatingComponent = document.getElementsByClassName(
    'bv_avgRating_component_container'
  );
  const numReviewsComponent = document.getElementsByClassName(
    'bv_numReviews_text'
  );
  const code = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': window.location.href,
    name: details.goodsName,
    sku: details.goodsNo,
    mpn: details.goodsNo,
    image: details.goodsImg,
    brand: details.brandName || 'Royal Canin',
    description: details.goodsDescription || 'Royal Canin',
    offers: {
      '@type': 'Offer',
      url: window.location.href,
      priceCurrency: process.env.REACT_APP_CURRENCY,
      availability: instockStatus
        ? 'http://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      price: details.toPrice || details.fromPrice,
      lowPrice: details.fromPrice,
      highPrice: details.toPrice || details.fromPrice
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue:
        avgRatingComponent.length > 0 ? avgRatingComponent[0].innerHTML : '',
      reviewCount:
        numReviewsComponent.length > 0
          ? numReviewsComponent[0].innerHTML.split('(')[1].split(')')[0]
          : ''
    }
  };
  loadJS({
    code: JSON.stringify(code),
    type: 'application/ld+json'
  });
}
