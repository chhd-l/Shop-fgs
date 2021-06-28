import { loadJS, filterObjectValue } from '@/utils/utils';

// 判断购买方式
const getPdpScreenLoadCTAs = (data) => {
  const { currentSubscriptionStatus, currentSubscriptionPrice, skuPromotions } =
    data;
  let content = ['Single Purchase'];
  if (
    currentSubscriptionStatus &&
    currentSubscriptionPrice &&
    skuPromotions == 'autoship'
  ) {
    content.push('Subscription');
  }
  if (
    currentSubscriptionStatus &&
    currentSubscriptionPrice &&
    skuPromotions == 'club'
  ) {
    content.push('Club');
  }
  return content;
};

const setGoogleProductStructuredDataMarkup = ({
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
        priceCurrency: window.__.env.REACT_APP_CURRENCY,
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

// 初次加载页面需要填充的产品ga数据
const hubGAProductDetailPageView = (item, pdpScreenLoadData) => {
  const {
    cateId,
    minMarketPrice,
    goodsCateName,
    goodsName,
    goodsInfos,
    goodsNo,
    goodsAttributesValueRelList,
    goodsImg
  } = item;
  const { clinicStore, selectPrice } = pdpScreenLoadData;
  const cateName = goodsCateName?.split('/') || '';
  const SKU = goodsInfos?.[0]?.goodsInfoNo || '';
  const size =
    item?.sizeList.length &&
    item?.sizeList
      .filter((item) => item.selected)
      .map((selectItem) => selectItem.specText)
      .toString();
  const breed =
    goodsAttributesValueRelList.length &&
    goodsAttributesValueRelList
      .filter(
        (attr) =>
          attr.goodsAttributeName &&
          attr.goodsAttributeName.toLowerCase() == 'breeds'
      )
      .map((item) => item.goodsAttributeValue);
  const specie = breed.toString().indexOf('Cat') > -1 ? 'Cat' : 'Dog';
  const recommendationID = clinicStore?.linkClinicId || '';

  const GAProductsInfo = {
    price: selectPrice || minMarketPrice,
    specie,
    range: cateName?.[1] || '',
    name: goodsName,
    mainItemCode: goodsNo,
    SKU,
    recommendationID,
    technology: cateName?.[2] || '',
    brand: 'Royal Canin',
    size,
    breed,
    imageURL: goodsImg
  };
  const product = filterObjectValue(GAProductsInfo);
  if (window.dataLayer) {
    dataLayer.push({
      products: [product]
    });
    dataLayer.push({
      event: 'pdpScreenLoad',
      pdpScreenLoadCTAs: getPdpScreenLoadCTAs(pdpScreenLoadData)
    });
  }
};

//hub加入购物车，埋点
const hubGAAToCar = (quantity, form) => {
  dataLayer.push({
    event: 'pdpAddToCart',
    pdpAddToCartQuantity: quantity,
    pdpAddToCartCtA: { 0: 'One Shot', 1: 'Subscription', 2: 'Club' }[
      form.buyWay
    ]
  });
};

//零售商购物 埋点
const HubGaPdpBuyFromRetailer = () => {
  dataLayer.push({
    event: 'pdpBuyFromRetailer'
  });
};

export {
  setGoogleProductStructuredDataMarkup,
  hubGAProductDetailPageView,
  hubGAAToCar,
  HubGaPdpBuyFromRetailer
};
