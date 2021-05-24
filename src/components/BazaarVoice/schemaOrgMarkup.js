import { loadJS } from '../../utils/utils';

export function addSchemaOrgMarkup(details, instockStatus) {
  const avgRatingComponent = document.getElementsByClassName(
    'bv_avgRating_component_container '
  );
  const numReviewsComponent = document.getElementsByClassName(
    'bv_numReviews_text '
  );
  const code = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': window.location.href,
    name: 'Kenmore White 17" Microwave',
    sku: details.goodsNo,
    mpn: details.goodsNo,
    image: details.goodsImg,
    brand: details.brandName || 'Royal Canin',
    offers: {
      '@type': 'Offer',
      priceCurrency: process.env.REACT_APP_CURRENCY,
      availability: instockStatus
        ? 'http://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
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
    // review: [
    //   {
    //     '@type': 'Review',
    //     author: 'Ellie',
    //     datePublished: '2011-04-01',
    //     reviewBody: 'The lamp burned out and now I have to replace it.',
    //     name: 'Not a happy camper',
    //     reviewRating: {
    //       '@type': 'Rating',
    //       bestRating: '5',
    //       ratingValue: '1',
    //       worstRating: '1'
    //     }
    //   }
    // ]
  };
  loadJS({
    code: JSON.stringify(code),
    type: 'application/ld+json'
  });
}
