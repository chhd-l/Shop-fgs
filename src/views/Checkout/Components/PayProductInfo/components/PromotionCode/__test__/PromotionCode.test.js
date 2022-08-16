import React from 'react';
import PromotionCode from '../PromotionCode';
import { render, act, screen, fireEvent } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import stores from '@/store';
import renderWithProvider from '@/jest/renderWithProvider';
// import { rest } from 'msw';
// import { setupServer } from 'msw/node';
// const server = setupServer(
//   rest.get('/greeting', (req, res, ctx) => {
//     return res(ctx.json({ greeting: 'hello there' }));
//   })
// );

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());
describe('PromotionCode Test', () => {
  test('PromotionCode Test', async () => {
    await stores.checkoutStore.setPromotionCode('100');
    renderWithProvider(<PromotionCode />, { stores });
    const btn = screen.getByTestId('PromotionApplyBtn');
    fireEvent.click(btn, {});
  });

  test('PromotionCode Test2', async () => {
    await stores.checkoutStore.setPromotionCode('');
    renderWithProvider(<PromotionCode />, { stores });
  });

  test('PromotionCode Test3', async () => {
    const sessionItemRoyal = window.__.sessionItemRoyal;
    const tmpParam = {
      addedFlag: 1,
      addedTime: '2021-04-12 09:40:29.000',
      allowPriceSet: null,
      aloneFlag: false,
      auditCatFlag: null,
      auditStatus: 1,
      basePrice: 13.99,
      basePriceType: '',
      brandId: 400,
      buyCount: 1,
      cateId: 1134,
      cateName: null,
      cateRate: null,
      checked: false,
      commissionRate: null,
      companyInfoId: 1053,
      companyType: 0,
      costPrice: null,
      count: null,
      couponLabels: [],
      createTime: '2021-11-04 13:23:17.000',
      customFlag: 0,
      defaultSku: 0,
      delFlag: 0,
      depth: 0,
      depthUnit: 'mm',
      description: null,
      displayOnShop: null,
      distributionCommission: null,
      distributionGoodsAudit: 0,
      distributionGoodsAuditReason: null,
      distributionSalesCount: null,
      enterPriseAuditState: null,
      enterPriseGoodsAuditReason: null,
      enterPrisePrice: null,
      externalLinePrice: null,
      externalMarketPrice: null,
      externalPurchasePrice: null,
      externalSku: '293210',
      externalStock: 956,
      externalSubscriptionPrice: null,
      factor: 1,
      freightTempId: 62,
      goods: {
        goodsId: '2c918085768f3a4101768f3f73c10093',
        cateId: 1134,
        brandId: 400,
        brandName: null
      },
      goodsAttributesValueRelVOList: [
        {
          id: 'GAR202207110614484060',
          goodsId: '2c918085768f3a4101768f3f73c10093'
        }
      ],
      goodsCategory: null,
      goodsCollectNum: 0,
      goodsCubage: 1,
      goodsEvaluateNum: 4,
      goodsFavorableCommentNum: 4,
      goodsId: '2c918085768f3a4101768f3f73c10093',
      goodsInfoBarcode: '3182550920391',
      goodsInfoBundleRels: [],
      goodsInfoFlag: 0,
      goodsInfoId: '2c91808576903fd801769045d7210124',
      goodsInfoImg:
        'https://d2cstgstorage.z13.web.core.windows.net/FR_492944_master.jpg',
      goodsInfoName: 'Appetite Control Care',
      goodsInfoNo: '293210',
      goodsInfoType: null,
      goodsInfoUnit: 'KG',
      goodsInfoWeight: 2,
      goodsInfos: [
        {
          goodsInfoId: '2c91808576903fd801769045d7210124',
          goodsId: '2c918085768f3a4101768f3f73c10093'
        }
      ],
      goodsMeasureNum: 1,
      goodsMeasureUnit: 'ea',
      goodsName: 'Appetite Control Care',
      goodsPromotion: null,
      goodsSalesNum: 341,
      goodsSpecDetails: [],
      goodsSpecs: [
        {
          specId: 20670,
          goodsId: '2c918085768f3a4101768f3f73c10093',
          specName: 'Taille'
        }
      ],
      goodsStatus: 0,
      goodsUnit: null,
      goodsWeight: 1,
      grouponLabel: null,
      grouponPrice: null,
      height: 0,
      heightUnit: 'mm',
      innerGoodsInfoNo: 'FR_293210',
      intervalMaxPrice: null,
      intervalMinPrice: null,
      intervalPriceIds: null,
      isHidden: null,
      isNotShowCart: 0,
      isOfflineStore: false,
      itemTotalAmount: null,
      joinDistributior: null,
      levelDiscountFlag: 0,
      linePrice: 27.99,
      marketPrice: 27.99,
      marketPriceExclVat: null,
      marketingCode: null,
      marketingId: null,
      marketingLabels: [],
      marketingName: null,
      maxCount: null,
      maxStock: null,
      mockSpecDetailIds: null,
      mockSpecIds: null,
      packSize: '2KG',
      packageId: null,
      peaweeUseing: null,
      periodTypeId: null,
      petsId: null,
      petsType: null,
      prefixBreed: null,
      prefixFn: null,
      prescriberFlag: null,
      priceType: 2,
      priceUom: null,
      priceUomId: '33586ce71f5811ecaa72a77450361cec',
      productCategory: null,
      promotionDiscountPrice: null,
      promotions: 'club',
      purchaseId: 12321926170,
      purchasePrice: '100.00000',
      purchasePriceExclVat: null,
      questionParams: null,
      recommendationId: '',
      recommendationInfos: '',
      recommendationName: '',
      recommendationSerialCode: null,
      referenceData: null,
      retailPrice: null,
      salePrice: 27.99,
      saleType: 0,
      settingPrice: null,
      smallProgramCode: null,
      sortNumber: null,
      specDetailRelIds: null,
      specText: '2KG',
      specification: null,
      stock: 956,
      stockUom: null,
      stockUomId: '33586ce71f5811ecaa72a77450361cec',
      storeCateIds: null,
      storeId: 123457909,
      storeName: null,
      subscriptionBasePrice: 12.6,
      subscriptionDiscountPrice: null,
      subscriptionPercentage: '10%',
      subscriptionPlanGiftList: null,
      subscriptionPlanId: null,
      subscriptionPlanPromotionFlag: null,
      subscriptionPrice: 25.19,
      subscriptionStatus: 1,
      supplyPrice: null,
      taggingVOList: null,
      updateTime: '2022-08-02 05:47:17.000',
      utmCampaign: null,
      utmMedium: null,
      utmSource: null,
      validFlag: null,
      virtualAlert: null,
      virtualInventory: null,
      weShareScode: null,
      width: 0,
      widthUnit: 'mm'
    };
    sessionItemRoyal.set('guest-uuid', tmpParam);
    stores.checkoutStore.setPromotionCode('100');
    stores.loginStore.changeIsLogin(true);
    renderWithProvider(<PromotionCode />, { stores });
    const btn = screen.getByTestId('PromotionApplyBtn');
    fireEvent.click(btn, {});
  });
});
