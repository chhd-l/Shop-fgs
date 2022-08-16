import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import HandledSpecSelect from '../index';

jest.mock('react-intl-phraseapp', () => {
  return {
    injectIntl: () => {},
    FormattedMessage: () => <div>phraseapp</div>
  };
});

jest.mock('@/components/Selection', () => {
  return ({selectedItemChange}) => {
    const params = {
      specId: 669125945,
      specDetailId: 267933385
    }
    return (
      <div
        id="selection-component"
        onClick={() => selectedItemChange?.(params)}
      >
        Selection
      </div>
    )
  };
});

const details = {
  subscribeGoodsId: 'SD202208050127194011265',
  subscribeId: 'SRCFRU000003245',
  spuId: '2c918085773ea33001773eab2914030b',
  skuId: '2c91808578c5dc0b0178c9ffae670013',
  spuNo: '3901',
  skuNo: '39010040R0',
  stock: 0,
  subscribePrice: 416.7,
  originalPrice: 463,
  subscribeNum: 1,
  specText: '0.4кг',
  goodsInfoFlag: 1,
  frequency: null,
  goodsSubtitle:
    'Корм сухой полнорационный диетический для взрослых кошек, способствующий растворению струвитных камней и предотвращению их повторного образования. Ветеринарная диета.',
  delFlag: false,
  recommendationId: 'RDW2065382',
  recommendationName: '',
  recommendationSerialCode: null,
  signOnSubscriptionFlag: null,
  canCancelPlan: null,
  canChargeDeliveryFlag: null,
  skipNextDeliveryFlag: null,
  cateId: 1159,
  goodsCategory: null,
  inventoryShortageErrorNumber: 0,
  paymentFailureErrorNumber: 0,
  subscriptionPlanGiftList: null,
  notExistStockSubscriptionPlanGiftList: null,
  subscriptionSourceList: null,
  paymentId: null,
  repeatData1: null,
  paymentMethod: null,
  goodsInfos: [
    {
      goodsInfoId: '2c91808578c5dc0b0178c9ffae670013',
      goodsId: '2c918085773ea33001773eab2914030b',
      goodsInfoName: 'Urinary S/O',
      goodsInfoNo: '39010040R0',
      innerGoodsInfoNo: 'RU_39010040R0',
      goodsInfoImg: null,
      goodsInfoBarcode: '4627150232325',
      stock: 0,
      marketPrice: 463,
      marketPriceExclVat: null,
      supplyPrice: null,
      retailPrice: null,
      grouponPrice: null,
      costPrice: null,
      createTime: '2021-11-09 01:43:47.000',
      updateTime: '2022-08-15 01:06:12.000',
      addedTime: '2022-08-15 00:57:13.000',
      delFlag: 0,
      addedFlag: 0,
      companyInfoId: 1051,
      storeId: 123457907,
      storeName: null,
      customFlag: 0,
      levelDiscountFlag: 0,
      auditStatus: 1,
      companyType: 0,
      aloneFlag: false,
      salePrice: 463,
      priceType: 2,
      mockSpecIds: [669125945],
      mockSpecDetailIds: [315401394],
      specDetailRelIds: null,
      buyCount: 0,
      count: null,
      maxCount: null,
      intervalPriceIds: null,
      specText: '0.4кг',
      intervalMinPrice: null,
      intervalMaxPrice: null,
      validFlag: null,
      cateId: 1159,
      cateName: null,
      isHidden: null,
      brandId: 400,
      storeCateIds: null,
      distributionCommission: null,
      commissionRate: null,
      distributionSalesCount: null,
      distributionGoodsAudit: 0,
      distributionGoodsAuditReason: null,
      checked: false,
      goodsStatus: 0,
      goodsUnit: null,
      marketingLabels: [],
      grouponLabel: null,
      couponLabels: [],
      goodsCubage: null,
      goodsWeight: null,
      freightTempId: null,
      saleType: 0,
      allowPriceSet: null,
      smallProgramCode: null,
      joinDistributior: null,
      goodsEvaluateNum: null,
      goodsCollectNum: null,
      goodsSalesNum: null,
      goodsFavorableCommentNum: null,
      enterPrisePrice: null,
      enterPriseAuditState: null,
      enterPriseGoodsAuditReason: null,
      subscriptionStatus: 1,
      subscriptionPrice: 416.7,
      linePrice: 0,
      basePrice: 1157.5,
      subscriptionBasePrice: 1041.75,
      basePriceType: '',
      goodsInfoWeight: 0.4,
      goodsInfoUnit: 'кг',
      goods: null,
      goodsPromotion: null,
      description: null,
      auditCatFlag: null,
      prescriberFlag: null,
      goodsMeasureNum: 1,
      goodsMeasureUnit: 'UNIT',
      subscriptionDiscountPrice: null,
      goodsInfoFlag: null,
      periodTypeId: null,
      purchasePrice: '100.00000',
      purchasePriceExclVat: null,
      goodsInfoType: null,
      goodsInfoBundleRels: [],
      recommendationId: null,
      recommendationName: null,
      recommendationSerialCode: null,
      weShareScode: 'S27477',
      packSize: '0.4кг',
      subscriptionPercentage: null,
      maxStock: null,
      subscriptionPlanId: null,
      packageId: null,
      subscriptionPlanPromotionFlag: null,
      settingPrice: null,
      virtualInventory: null,
      virtualAlert: null,
      marketingCode: null,
      marketingName: null,
      promotionDiscountPrice: null,
      marketingId: null,
      externalSku: '39010040R0',
      promotions: 'autoship',
      isOfflineStore: null,
      petsId: null,
      petsType: null,
      questionParams: null,
      referenceData: null,
      depth: 1800,
      depthUnit: 'mm',
      width: 1800,
      widthUnit: 'mm',
      height: 1800,
      heightUnit: 'mm',
      specification: null,
      isNotShowCart: null,
      externalStock: 0,
      externalMarketPrice: 463,
      externalSubscriptionPrice: 416.7,
      externalLinePrice: 0,
      externalPurchasePrice: 100,
      factor: 1,
      stockUomId: '32f0ba821f5811ecaa72a77450361cec',
      priceUomId: '32f0ba821f5811ecaa72a77450361cec',
      priceUom: null,
      stockUom: null,
      defaultSku: null,
      displayOnShop: 1,
      productCategory: null,
      cateRate: null,
      selected: true
    },
    {
      goodsInfoId: '2c91808578c5dc0b0178c9ffe87200b1',
      goodsId: '2c918085773ea33001773eab2914030b',
      goodsInfoName: 'Urinary S/O',
      goodsInfoNo: '39010150R0',
      innerGoodsInfoNo: 'RU_39010150R0',
      goodsInfoImg: null,
      goodsInfoBarcode: '4627150232349',
      stock: 1154,
      marketPrice: 1461,
      marketPriceExclVat: null,
      supplyPrice: null,
      retailPrice: null,
      grouponPrice: null,
      costPrice: null,
      createTime: '2021-11-09 01:43:47.000',
      updateTime: '2022-08-15 01:06:12.000',
      addedTime: '2022-08-15 00:57:13.000',
      delFlag: 0,
      addedFlag: 1,
      companyInfoId: 1051,
      storeId: 123457907,
      storeName: null,
      customFlag: 0,
      levelDiscountFlag: 0,
      auditStatus: 1,
      companyType: 0,
      aloneFlag: false,
      salePrice: 1461,
      priceType: 2,
      mockSpecIds: [669125945],
      mockSpecDetailIds: [480275659],
      specDetailRelIds: null,
      buyCount: 0,
      count: null,
      maxCount: null,
      intervalPriceIds: null,
      specText: '1.5кг',
      intervalMinPrice: null,
      intervalMaxPrice: null,
      validFlag: null,
      cateId: 1159,
      cateName: null,
      isHidden: null,
      brandId: 400,
      storeCateIds: null,
      distributionCommission: null,
      commissionRate: null,
      distributionSalesCount: null,
      distributionGoodsAudit: 0,
      distributionGoodsAuditReason: null,
      checked: false,
      goodsStatus: 0,
      goodsUnit: null,
      marketingLabels: [],
      grouponLabel: null,
      couponLabels: [],
      goodsCubage: null,
      goodsWeight: null,
      freightTempId: null,
      saleType: 0,
      allowPriceSet: null,
      smallProgramCode: null,
      joinDistributior: null,
      goodsEvaluateNum: null,
      goodsCollectNum: null,
      goodsSalesNum: null,
      goodsFavorableCommentNum: null,
      enterPrisePrice: null,
      enterPriseAuditState: null,
      enterPriseGoodsAuditReason: null,
      subscriptionStatus: 1,
      subscriptionPrice: 1314.9,
      linePrice: 0,
      basePrice: 974,
      subscriptionBasePrice: 876.6,
      basePriceType: '',
      goodsInfoWeight: 1.5,
      goodsInfoUnit: 'кг',
      goods: null,
      goodsPromotion: null,
      description: null,
      auditCatFlag: null,
      prescriberFlag: null,
      goodsMeasureNum: 1,
      goodsMeasureUnit: 'UNIT',
      subscriptionDiscountPrice: null,
      goodsInfoFlag: null,
      periodTypeId: null,
      purchasePrice: '100.00000',
      purchasePriceExclVat: null,
      goodsInfoType: null,
      goodsInfoBundleRels: [],
      recommendationId: null,
      recommendationName: null,
      recommendationSerialCode: null,
      weShareScode: 'S27478',
      packSize: '1.5кг',
      subscriptionPercentage: null,
      maxStock: null,
      subscriptionPlanId: null,
      packageId: null,
      subscriptionPlanPromotionFlag: null,
      settingPrice: null,
      virtualInventory: null,
      virtualAlert: null,
      marketingCode: null,
      marketingName: null,
      promotionDiscountPrice: null,
      marketingId: null,
      externalSku: '39010150R0',
      promotions: 'autoship',
      isOfflineStore: null,
      petsId: null,
      petsType: null,
      questionParams: null,
      referenceData: null,
      depth: 500,
      depthUnit: 'mm',
      width: 500,
      widthUnit: 'mm',
      height: 600,
      heightUnit: 'mm',
      specification: null,
      isNotShowCart: null,
      externalStock: 1154,
      externalMarketPrice: 1461,
      externalSubscriptionPrice: 1314.9,
      externalLinePrice: 0,
      externalPurchasePrice: 100,
      factor: 1,
      stockUomId: '32f0ba821f5811ecaa72a77450361cec',
      priceUomId: '32f0ba821f5811ecaa72a77450361cec',
      priceUom: null,
      stockUom: null,
      defaultSku: null,
      displayOnShop: null,
      productCategory: null,
      cateRate: null,
      selected: false
    },
    {
      goodsInfoId: '2c91808578c5dc0b0178ca001c1e014b',
      goodsId: '2c918085773ea33001773eab2914030b',
      goodsInfoName: 'Urinary S/O',
      goodsInfoNo: '39010350R0',
      innerGoodsInfoNo: 'RU_39010350R0',
      goodsInfoImg: null,
      goodsInfoBarcode: '4627150232363',
      stock: 534,
      marketPrice: 3088,
      marketPriceExclVat: null,
      supplyPrice: null,
      retailPrice: null,
      grouponPrice: null,
      costPrice: null,
      createTime: '2021-11-09 01:43:47.000',
      updateTime: '2022-08-15 01:06:12.000',
      addedTime: '2022-08-15 00:57:13.000',
      delFlag: 0,
      addedFlag: 1,
      companyInfoId: 1051,
      storeId: 123457907,
      storeName: null,
      customFlag: 0,
      levelDiscountFlag: 0,
      auditStatus: 1,
      companyType: 0,
      aloneFlag: false,
      salePrice: 3088,
      priceType: 2,
      mockSpecIds: [669125945],
      mockSpecDetailIds: [267933385],
      specDetailRelIds: null,
      buyCount: 0,
      count: null,
      maxCount: null,
      intervalPriceIds: null,
      specText: '3.5кг',
      intervalMinPrice: null,
      intervalMaxPrice: null,
      validFlag: null,
      cateId: 1159,
      cateName: null,
      isHidden: null,
      brandId: 400,
      storeCateIds: null,
      distributionCommission: null,
      commissionRate: null,
      distributionSalesCount: null,
      distributionGoodsAudit: 0,
      distributionGoodsAuditReason: null,
      checked: false,
      goodsStatus: 0,
      goodsUnit: null,
      marketingLabels: [],
      grouponLabel: null,
      couponLabels: [],
      goodsCubage: null,
      goodsWeight: null,
      freightTempId: null,
      saleType: 0,
      allowPriceSet: null,
      smallProgramCode: null,
      joinDistributior: null,
      goodsEvaluateNum: null,
      goodsCollectNum: null,
      goodsSalesNum: null,
      goodsFavorableCommentNum: null,
      enterPrisePrice: null,
      enterPriseAuditState: null,
      enterPriseGoodsAuditReason: null,
      subscriptionStatus: 1,
      subscriptionPrice: 2779.2,
      linePrice: 0,
      basePrice: 882.29,
      subscriptionBasePrice: 794.06,
      basePriceType: '',
      goodsInfoWeight: 3.5,
      goodsInfoUnit: 'кг',
      goods: null,
      goodsPromotion: null,
      description: null,
      auditCatFlag: null,
      prescriberFlag: null,
      goodsMeasureNum: 1,
      goodsMeasureUnit: 'UNIT',
      subscriptionDiscountPrice: null,
      goodsInfoFlag: null,
      periodTypeId: null,
      purchasePrice: '100.00000',
      purchasePriceExclVat: null,
      goodsInfoType: null,
      goodsInfoBundleRels: [],
      recommendationId: null,
      recommendationName: null,
      recommendationSerialCode: null,
      weShareScode: 'S27479',
      packSize: '3.5кг',
      subscriptionPercentage: null,
      maxStock: null,
      subscriptionPlanId: null,
      packageId: null,
      subscriptionPlanPromotionFlag: null,
      settingPrice: null,
      virtualInventory: null,
      virtualAlert: null,
      marketingCode: null,
      marketingName: null,
      promotionDiscountPrice: null,
      marketingId: null,
      externalSku: '39010350R0',
      promotions: 'autoship',
      isOfflineStore: null,
      petsId: null,
      petsType: null,
      questionParams: null,
      referenceData: null,
      depth: 0,
      depthUnit: 'mm',
      width: 0,
      widthUnit: 'mm',
      height: 0,
      heightUnit: 'mm',
      specification: null,
      isNotShowCart: null,
      externalStock: 534,
      externalMarketPrice: 3088,
      externalSubscriptionPrice: 2779.2,
      externalLinePrice: 0,
      externalPurchasePrice: 100,
      factor: 1,
      stockUomId: '32f0ba821f5811ecaa72a77450361cec',
      priceUomId: '32f0ba821f5811ecaa72a77450361cec',
      priceUom: null,
      stockUom: null,
      defaultSku: null,
      displayOnShop: null,
      productCategory: null,
      cateRate: null,
      selected: false
    },
    {
      goodsInfoId: '2c91808578c5dc0b0178ca002c03017c',
      goodsId: '2c918085773ea33001773eab2914030b',
      goodsInfoName: 'Urinary S/O',
      goodsInfoNo: '39010700R2',
      innerGoodsInfoNo: 'RU_39010700R2',
      goodsInfoImg: null,
      goodsInfoBarcode: '4627150232387',
      stock: 1222,
      marketPrice: 5712,
      marketPriceExclVat: null,
      supplyPrice: null,
      retailPrice: null,
      grouponPrice: null,
      costPrice: null,
      createTime: '2021-11-09 01:43:47.000',
      updateTime: '2022-08-15 01:06:12.000',
      addedTime: '2022-08-15 00:57:13.000',
      delFlag: 0,
      addedFlag: 1,
      companyInfoId: 1051,
      storeId: 123457907,
      storeName: null,
      customFlag: 0,
      levelDiscountFlag: 0,
      auditStatus: 1,
      companyType: 0,
      aloneFlag: false,
      salePrice: 5712,
      priceType: 2,
      mockSpecIds: [669125945],
      mockSpecDetailIds: [685569249],
      specDetailRelIds: null,
      buyCount: 0,
      count: null,
      maxCount: null,
      intervalPriceIds: null,
      specText: '7кг',
      intervalMinPrice: null,
      intervalMaxPrice: null,
      validFlag: null,
      cateId: 1159,
      cateName: null,
      isHidden: null,
      brandId: 400,
      storeCateIds: null,
      distributionCommission: null,
      commissionRate: null,
      distributionSalesCount: null,
      distributionGoodsAudit: 0,
      distributionGoodsAuditReason: null,
      checked: false,
      goodsStatus: 0,
      goodsUnit: null,
      marketingLabels: [],
      grouponLabel: null,
      couponLabels: [],
      goodsCubage: null,
      goodsWeight: null,
      freightTempId: null,
      saleType: 0,
      allowPriceSet: null,
      smallProgramCode: null,
      joinDistributior: null,
      goodsEvaluateNum: null,
      goodsCollectNum: null,
      goodsSalesNum: null,
      goodsFavorableCommentNum: null,
      enterPrisePrice: null,
      enterPriseAuditState: null,
      enterPriseGoodsAuditReason: null,
      subscriptionStatus: 1,
      subscriptionPrice: 5140.8,
      linePrice: 0,
      basePrice: 816,
      subscriptionBasePrice: 734.4,
      basePriceType: '',
      goodsInfoWeight: 7,
      goodsInfoUnit: 'кг',
      goods: null,
      goodsPromotion: null,
      description: null,
      auditCatFlag: null,
      prescriberFlag: null,
      goodsMeasureNum: 1,
      goodsMeasureUnit: 'UNIT',
      subscriptionDiscountPrice: null,
      goodsInfoFlag: null,
      periodTypeId: null,
      purchasePrice: '100.00000',
      purchasePriceExclVat: null,
      goodsInfoType: null,
      goodsInfoBundleRels: [],
      recommendationId: null,
      recommendationName: null,
      recommendationSerialCode: null,
      weShareScode: 'S27480',
      packSize: '7кг',
      subscriptionPercentage: null,
      maxStock: null,
      subscriptionPlanId: null,
      packageId: null,
      subscriptionPlanPromotionFlag: null,
      settingPrice: null,
      virtualInventory: null,
      virtualAlert: null,
      marketingCode: null,
      marketingName: null,
      promotionDiscountPrice: null,
      marketingId: null,
      externalSku: '39010700R2',
      promotions: 'autoship',
      isOfflineStore: null,
      petsId: null,
      petsType: null,
      questionParams: null,
      referenceData: null,
      depth: 0,
      depthUnit: 'mm',
      width: 0,
      widthUnit: 'mm',
      height: 0,
      heightUnit: 'mm',
      specification: null,
      isNotShowCart: null,
      externalStock: 1222,
      externalMarketPrice: 5712,
      externalSubscriptionPrice: 5140.8,
      externalLinePrice: 0,
      externalPurchasePrice: 100,
      factor: 1,
      stockUomId: '32f0ba821f5811ecaa72a77450361cec',
      priceUomId: '32f0ba821f5811ecaa72a77450361cec',
      priceUom: null,
      stockUom: null,
      defaultSku: null,
      displayOnShop: null,
      productCategory: null,
      cateRate: null,
      selected: false
    }
  ],
  goodsSpecs: [
    {
      specId: 669125945,
      goodsId: '2c918085773ea33001773eab2914030b',
      specName: 'размер',
      createTime: '2022-06-13 06:33:27.000',
      updateTime: '2022-08-15 01:06:12.000',
      delFlag: 0,
      mockSpecId: 669125945,
      specDetailIds: [267933385, 315401394, 480275659, 685569249],
      editable: null,
      chidren: [
        {
          specDetailId: 267933385,
          goodsId: '2c918085773ea33001773eab2914030b',
          specId: 669125945,
          detailName: '3.5кг',
          createTime: '2022-06-13 06:33:27.000',
          updateTime: '2022-08-15 01:06:12.000',
          delFlag: 0,
          mockSpecId: 669125945,
          mockSpecDetailId: 267933385,
          calculateSort: null,
          editable: null,
          isSelected: null,
          addedFlag: 1,
          goodsInfoUnit: 'кг',
          isEmpty: false,
          isUnitPriceZero: false,
          isDisabled: false,
          canSelectedOutOfStock: false,
          value: '3.5кг',
          name: '3.5кг',
          name2: 'details.inStock',
          selected: false
        },
        {
          specDetailId: 315401394,
          goodsId: '2c918085773ea33001773eab2914030b',
          specId: 669125945,
          detailName: '0.4кг',
          createTime: '2022-06-13 06:33:27.000',
          updateTime: '2022-08-15 01:06:12.000',
          delFlag: 0,
          mockSpecId: 669125945,
          mockSpecDetailId: 315401394,
          calculateSort: null,
          editable: null,
          isSelected: null,
          addedFlag: 0,
          goodsInfoUnit: 'кг',
          isEmpty: true,
          isUnitPriceZero: false,
          isDisabled: true,
          canSelectedOutOfStock: false,
          value: '0.4кг',
          name: '0.4кг',
          name2: 'details.outStock',
          needHidden: true,
          disabled: true,
          selected: true
        },
        {
          specDetailId: 480275659,
          goodsId: '2c918085773ea33001773eab2914030b',
          specId: 669125945,
          detailName: '1.5кг',
          createTime: '2022-06-13 06:33:27.000',
          updateTime: '2022-08-15 01:06:12.000',
          delFlag: 0,
          mockSpecId: 669125945,
          mockSpecDetailId: 480275659,
          calculateSort: null,
          editable: null,
          isSelected: null,
          addedFlag: 1,
          goodsInfoUnit: 'кг',
          isEmpty: false,
          isUnitPriceZero: false,
          isDisabled: false,
          canSelectedOutOfStock: false,
          value: '1.5кг',
          name: '1.5кг',
          name2: 'details.inStock',
          selected: false
        },
        {
          specDetailId: 685569249,
          goodsId: '2c918085773ea33001773eab2914030b',
          specId: 669125945,
          detailName: '7кг',
          createTime: '2022-06-13 06:33:27.000',
          updateTime: '2022-08-15 01:06:12.000',
          delFlag: 0,
          mockSpecId: 669125945,
          mockSpecDetailId: 685569249,
          calculateSort: null,
          editable: null,
          isSelected: null,
          addedFlag: 1,
          goodsInfoUnit: 'кг',
          isEmpty: false,
          isUnitPriceZero: false,
          isDisabled: false,
          canSelectedOutOfStock: false,
          value: '7кг',
          name: '7кг',
          name2: 'details.inStock',
          selected: false
        }
      ]
    }
  ],
  goodsSpecDetails: [
    {
      specDetailId: 267933385,
      goodsId: '2c918085773ea33001773eab2914030b',
      specId: 669125945,
      detailName: '3.5кг',
      createTime: '2022-06-13 06:33:27.000',
      updateTime: '2022-08-15 01:06:12.000',
      delFlag: 0,
      mockSpecId: 669125945,
      mockSpecDetailId: 267933385,
      calculateSort: null,
      editable: null,
      isSelected: null,
      addedFlag: 1,
      goodsInfoUnit: 'кг',
      isEmpty: false,
      isUnitPriceZero: false,
      isDisabled: false,
      canSelectedOutOfStock: false,
      value: '3.5кг',
      name: '3.5кг',
      name2: 'details.inStock',
      selected: false
    },
    {
      specDetailId: 315401394,
      goodsId: '2c918085773ea33001773eab2914030b',
      specId: 669125945,
      detailName: '0.4кг',
      createTime: '2022-06-13 06:33:27.000',
      updateTime: '2022-08-15 01:06:12.000',
      delFlag: 0,
      mockSpecId: 669125945,
      mockSpecDetailId: 315401394,
      calculateSort: null,
      editable: null,
      isSelected: null,
      addedFlag: 0,
      goodsInfoUnit: 'кг',
      isEmpty: true,
      isUnitPriceZero: false,
      isDisabled: true,
      canSelectedOutOfStock: false,
      value: '0.4кг',
      name: '0.4кг',
      name2: 'details.outStock',
      needHidden: true,
      disabled: true,
      selected: true
    },
    {
      specDetailId: 480275659,
      goodsId: '2c918085773ea33001773eab2914030b',
      specId: 669125945,
      detailName: '1.5кг',
      createTime: '2022-06-13 06:33:27.000',
      updateTime: '2022-08-15 01:06:12.000',
      delFlag: 0,
      mockSpecId: 669125945,
      mockSpecDetailId: 480275659,
      calculateSort: null,
      editable: null,
      isSelected: null,
      addedFlag: 1,
      goodsInfoUnit: 'кг',
      isEmpty: false,
      isUnitPriceZero: false,
      isDisabled: false,
      canSelectedOutOfStock: false,
      value: '1.5кг',
      name: '1.5кг',
      name2: 'details.inStock',
      selected: false
    },
    {
      specDetailId: 685569249,
      goodsId: '2c918085773ea33001773eab2914030b',
      specId: 669125945,
      detailName: '7кг',
      createTime: '2022-06-13 06:33:27.000',
      updateTime: '2022-08-15 01:06:12.000',
      delFlag: 0,
      mockSpecId: 669125945,
      mockSpecDetailId: 685569249,
      calculateSort: null,
      editable: null,
      isSelected: null,
      addedFlag: 1,
      goodsInfoUnit: 'кг',
      isEmpty: false,
      isUnitPriceZero: false,
      isDisabled: false,
      canSelectedOutOfStock: false,
      value: '7кг',
      name: '7кг',
      name2: 'details.inStock',
      selected: false
    }
  ],
  oldSubscribeNum: 1,
  oldPeriodTypeId: 5583,
  oldSkuId: '2c91808578c5dc0b0178c9ffae670013',
  canDelete: false,
  confirmTooltipVisible: false,
  promotions: 'autoship'
};

const testProps = {
  renderAgin: false,
  details: details,
  updatedSku: () => {},
  defaultSkuId: "defaultSkuId",
  defaultSkuNo: "defaultSkuNo",
  inModal: false,
}


describe('Handled Spec Select Comp Test', () => {
  it('handled spec select', async () => {
    await render(<HandledSpecSelect {...testProps}/>);
    const Selection = document.getElementById("selection-component");
    fireEvent.click(Selection);
  });
});
