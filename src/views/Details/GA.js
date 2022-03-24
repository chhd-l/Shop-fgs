import { loadJS, filterObjectValue } from '@/utils/utils';
import { getSpecies } from '@/utils/GA';

const filterAttrValue = (list, keyWords) => {
  return (list || [])
    .filter((attr) => attr?.goodsAttributeName?.toLowerCase() == keyWords)
    .map((item) => item?.goodsAttributeValue);
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
      '@context': 'http://schema.org/',
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
    imageURL: goodsImg
  };
  const product = filterObjectValue(GAProductsInfo);
  if (window.dataLayer) {
    // dataLayer?.push({
    //   products: [product]
    // });
    setTimeout(() => {
      dataLayer?.push({
        event: 'pdpScreenLoad',
        pdpScreenLoad: {
          products: [product] //为了区分plp，pdp，checkout的products
        },
        pdpScreenLoadCTAs: getPdpScreenLoadCTAs(pdpScreenLoadData)
      });
    }, 5000);
  }
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

export {
  setGoogleProductStructuredDataMarkup,
  hubGAProductDetailPageView,
  hubGAAToCar,
  HubGaPdpBuyFromRetailer,
  GAPdpSizeChange
};
