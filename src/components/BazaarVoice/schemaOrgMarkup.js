import { loadJS } from '../../utils/utils';

export function addSchemaOrgMarkup(details) {
  // if (!!+process.env.REACT_APP_SHOW_BAZAARVOICE_RATINGS) {
  loadJS({
    code: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Product',
      '@id': window.location.href,
      name: details.goodsName,
      description: details.goodsNewSubtitle,
      sku: details.goodsNo,
      image: details.goodsImg,
      brand: details.brandName
    }),
    type: 'application/ld+json'
  });
  // }
}
