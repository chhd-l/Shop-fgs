import { loadJS } from '../../utils/utils';

export function addSchemaOrgMarkup(details, instockStatus, homePageText) {
  const avgRatingComponent = document.getElementsByClassName(
    'bv_avgRating_component_container'
  );
  const numReviewsComponent =
    document.getElementsByClassName('bv_numReviews_text');
  const code = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': window.location.href,
    name: details.goodsName,
    sku: details.goodsNo,
    mpn: details.goodsNo,
    image: details.goodsImg,
    brand: details.brandName || 'Royal Canin',
    description: details.goodsSubtitle || 'Royal Canin',
    // "itemListElement": [{
    //   "@type": "ListItem",
    //   "position": 1,
    //   "name": homePageText,
    //   "item": location.href.replace(/[^\/]+(?!.*\/)/,'') // 首页链接
    // },{
    //   "@type": "ListItem",
    //   "position": 2,
    //   "name": details.goodsName,
    //   "item": window.location.href,
    // }],
    offers: {
      '@type': 'Offer',
      url: window.location.href,
      priceCurrency: window.__.env.REACT_APP_CURRENCY,
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
