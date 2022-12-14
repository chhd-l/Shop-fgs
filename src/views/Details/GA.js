/* eslint-disable no-unused-expressions */
import { loadJS, filterObjectValue, formatMoney } from '@/utils/utils';
import { getSpecies } from '@/utils/GA';

const purchaseType = {
  0: 'Single purchase',
  1: 'Autoship',
  2: 'Club'
};

const filterAttrValue = (list, keyWords) => {
  return (list || [])
    .filter((attr) => attr?.goodsAttributeName?.toLowerCase() == keyWords)
    .map((item) => item?.goodsAttributeValue);
};

const pillarEnum = {
  0: 'SPT',
  1: 'SPT',
  2: 'BUNDLE',
  3: 'VET',
  4: 'GIFT'
};

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
      '@context': 'https://schema.org/',
      '@type': 'Product',
      brand: 'Royal Canin',
      name: details.goodsName,
      description: details.goodsSubtitle || 'Royal Canin',
      // description: goodsDetailTab[0] && goodsDetailTab[0].content,
      mpn: goodsNo,
      sku: goodsNo,
      image: spuImages.map((s) => s.artworkUrl),
      offers: {
        url: {},
        '@type': 'AggregateOffer',
        priceCurrency: window.__.env.REACT_APP_CURRENCY,
        availability: instockStatus
          ? 'https://schema.org/InStock'
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
    goodsImg,
    goodsType
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
  // const breed =
  //   goodsAttributesValueRelList.length &&
  //   goodsAttributesValueRelList
  //     .filter(
  //       (attr) =>
  //         attr.goodsAttributeName &&
  //         attr.goodsAttributeName.toLowerCase() == 'breeds'
  //     )
  //     .map((item) => item.goodsAttributeValue);
  const breed = filterAttrValue(goodsAttributesValueRelList, 'breeds');
  const specie = filterAttrValue(
    goodsAttributesValueRelList,
    'species'
  ).toString();
  const range = filterAttrValue(
    goodsAttributesValueRelList,
    'range'
  ).toString();
  const technology = filterAttrValue(
    goodsAttributesValueRelList,
    'technology'
  ).toString();
  // const specie = breed.toString().indexOf('Cat') > -1 ? 'Cat' : 'Dog';
  // const deSpecie = spezies.includes('Hund') ? 'Dog' : 'Cat'; //德国用来判断是猫咪还是狗狗

  const recommendationID = clinicStore?.linkClinicId || '';

  const GAProductsInfo = {
    price: selectPrice || minMarketPrice,
    specie,
    range,
    name: goodsName,
    mainItemCode: goodsNo,
    SKU,
    recommendationID,
    technology,
    brand: 'Royal Canin',
    size,
    breed,
    imageURL: goodsImg,
    pillar: pillarEnum[goodsType]
  };
  const product = filterObjectValue(GAProductsInfo);

  const availableSizes = item?.goodsInfos.reduce(
    (previousValue, currentValue) => {
      const normalSize = {
        size: currentValue.goodsInfoWeight,
        price: currentValue.marketPrice,
        pricePerUnit: currentValue.basePrice,
        localUnit: currentValue.goodsInfoUnit
      };
      const subscriptionSize = {
        size: currentValue.goodsInfoWeight,
        price: currentValue.subscriptionPrice,
        pricePerUnit: (
          currentValue.subscriptionPrice / currentValue.goodsInfoWeight
        ).toFixed(2),
        localUnit: currentValue.goodsInfoUnit
      };
      return [...previousValue, normalSize, subscriptionSize];
    },
    []
  );
  window?.dataLayer.push({
    event: 'pdpScreenLoad',
    pdpScreenLoad: {
      products: [product], //为了区分plp，pdp，checkout的products
      availableSizes: availableSizes
    },
    pdpScreenLoadCTAs: getPdpScreenLoadCTAs(pdpScreenLoadData)
  });
};

//hub加入购物车，埋点
const hubGAAToCar = (quantity, form) => {
  window?.dataLayer?.push({
    event: 'pdpAddToCart',
    pdpAddToCartQuantity: quantity,
    pdpAddToCartCtA: { 0: 'One Shot', 1: 'Subscription', 2: 'Club' }[
      form.buyWay
    ]
  });
};

//零售商购物 埋点
const HubGaPdpBuyFromRetailer = () => {
  window.dataLayer &&
    dataLayer.push({
      event: 'pdpBuyFromRetailer'
    });
};

//选择商品规格
const GAPdpSizeChange = (size) => {
  window.dataLayer &&
    dataLayer.push({
      event: 'pdpSizeChange',
      pdpSizeChangeNewSize: size //Same wording as displayed on the site, with units depending on the country (oz, grams, lb…)
    });
};

const GAPdpRecommendedProductClick = (el) => {
  const {
    minMarketPrice,
    goodsName,
    mainItemCode,
    goodsInfoVOS,
    goodsSpecDetailVOS,
    goodsAttributesValueRelVOAllList
  } = el;
  const breed = filterAttrValue(goodsAttributesValueRelVOAllList, 'breeds');
  const specie = filterAttrValue(
    goodsAttributesValueRelVOAllList,
    'species'
  ).toString();
  const range = filterAttrValue(
    goodsAttributesValueRelVOAllList,
    'range'
  ).toString();
  const technology = filterAttrValue(
    goodsAttributesValueRelVOAllList,
    'technology'
  ).toString();
  const SKU = goodsInfoVOS?.[0]?.goodsInfoNo || '';
  const size = goodsSpecDetailVOS?.[0]?.detailName || '';
  const RecProduct = {
    // 'pillar' : 'SPT', //String : 'SPT' or 'Vet' depending on type of product range
    price: minMarketPrice, //Integer : Product Price, including discount if promo code activated for this product
    specie: specie, //String : 'Cat' or 'Dog',
    range: range, //String : Possible values are 'Size Health Nutrition', 'Breed Health Nutrition', 'Feline Care Nutrition', 'Feline Health Nutrition', 'Feline Breed Nutrition'
    name: goodsName, //String : WeShare product name, always in English
    mainItemCode: mainItemCode, //String : Main item code
    SKU: SKU, //String : product SKU
    // 'subscription': 'One Shot', //String : 'One Shot', 'Subscription', 'Club'
    // 'subscriptionFrequency': 3, //Integer : Frequency in weeks, to populate only if 'subscription' equals 'Subscription or Club'
    technology: technology, //String : 'Dry', 'Wet', 'Pack'
    brand: 'Royal Canin', //String : 'Royal Canin' or 'Eukanuba'
    size: size, //String : Same wording as displayed on the site, with units depending on the country (oz, grams...)
    breed: breed //Array : All animal breeds associated with the product in an array
    // 'quantity': 2, //Integer : Number of products, only if already added to cart
    // 'promoCodeName': 'PROMO1234', //String : Promo code name, only if promo activated
    // 'promoCodeAmount': 8 //Integer : Promo code amount, only if promo activated
  };
  const _RecProduct = filterObjectValue(RecProduct);
  if (window.dataLayer) {
    dataLayer?.push({
      event: 'PDPRecommendedProductClick',
      PDPRecommendedProductClick: {
        products: [_RecProduct]
      }
    });
  }
};

const pushPurchaseGA = (type) => {
  window.dataLayer &&
    window.dataLayer.push({
      event: `pdpPurchaseTypeChange`,
      pdpPurchaseTypeChange: {
        newItem: purchaseType[type]
      }
    });
};

export {
  setGoogleProductStructuredDataMarkup,
  hubGAProductDetailPageView,
  hubGAAToCar,
  HubGaPdpBuyFromRetailer,
  GAPdpSizeChange,
  GAPdpRecommendedProductClick,
  pushPurchaseGA
};
