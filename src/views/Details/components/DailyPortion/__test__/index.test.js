import React from 'react';
import Index from '../index';
import { render, act, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import stores from '@/store';
import { Provider } from 'mobx-react';

jest.mock('react-intl', () => {
  return {
    FormattedMessage: ({ id, values, children }) => {
      let kkk = null;
      if (values && values?.val && values?.val?.props) {
        kkk = (
          <div
            data-testid={values?.val?.props['data-testid'] ?? ''}
            onClick={values?.val.props.onClick}
          ></div>
        );
      }
      return (
        <span>
          {id}
          {kkk}
          {children && children()}
        </span>
      );
    },
    injectIntl: (e) => e,
    intl: (e) => e,
    createIntlCache: (e) => e,
    createIntl: (e) => e,
    useIntl: () => {
      return {
        formatMessage: jest.fn()
      };
    }
  };
});

jest.mock('@/components/GoogleTagManager', () => {
  return () => <div>GoogleTagManager</div>;
});
jest.mock('@/components/Footer', () => {
  return () => <div>Footer</div>;
});
jest.mock('@/components/Header', () => {
  return () => <div>Header</div>;
});
jest.mock('@/components/BannerTip', () => {
  return () => <div>BannerTip</div>;
});
jest.mock('@/components/SideMenu', () => {
  return () => <div>SideMenu</div>;
});

jest.mock('@okta/okta-react', () => {
  const authState = {
    idToken: 'sdada',
    accessToken: {
      value: 'sdadad'
    },
    isAuthenticated: false
  };
  return {
    useOktaAuth: (e) => {
      return { authState, oktaAuth: jest.fn(), ...e };
    },
    withOktaAuth: (e) => e
  };
});

jest.mock('@/api/details', () => {
  const originalModule = jest.requireActual('@/api/details');
  return {
    __esModule: true,
    ...originalModule,
    productFinderDailyPortionRation: jest.fn(
      ({
        countryCode,
        breedCode,
        petActivityCode,
        genderCode,
        neutered,
        age,
        weight,
        bcs,
        speciesCode,
        technologyCode,
        energyCategory,
        referenceEnergyValue,
        density,
        packWeight,
        goodsInfoUnit
      }) =>
        new Promise((resolve, reject) => {
          return resolve({
            code: 'K-000000',
            context: {
              quantityPerDay: 5,
              unit: 'KG'
            },
            message: '操作に成功しました'
          });
        })
    ),
    productFinderDailyPortion: jest.fn(
      ({ countryCode, species }) =>
        new Promise((resolve, reject) => {
          return resolve({
            code: 'K-000000',
            context: {
              breeds: [
                {
                  breedCode: 'american_curl_longhair',
                  localName: 'American Curl Longhair'
                },
                {
                  breedCode: 'serengeti',
                  localName: 'Serengeti'
                },
                {
                  breedCode: 'tiffanie',
                  localName: 'Tiffany'
                }
              ]
            },
            message: '操作に成功しました'
          });
        })
    ),
    getDailyPortionLifeStage: jest.fn(
      ({
        countryCode,
        breedCode,
        petActivityCode,
        genderCode,
        neutered,
        age,
        weight,
        bcs,
        speciesCode,
        technologyCode,
        energyCategory,
        referenceEnergyValue,
        density,
        packWeight,
        goodsInfoUnit
      }) =>
        new Promise((resolve, reject) => {
          return resolve({
            code: 'K-000000',
            context: {
              quantityPerDay: 5,
              unit: 'KG'
            },
            message: '操作に成功しました'
          });
        })
    )
  };
});
const propsData = {
  details: {
    weightValue: null,
    goods: {
      goodsId: '8a7080ea8019630b01801cec45610023',
      cateId: 1809,
      brandId: 400,
      brandName: null,
      goodsName: 'エイジング 12+',
      goodsSubtitle: '',
      goodsNewSubtitle: 'Mature cats over 12 years old',
      goodsDescription: null,
      goodsDescriptionDetails: null,
      goodsNo: '2561',
      innerGoodsNo: 'JP_2561',
      goodsUnit: null,
      goodsCateName: 'Cat/Feline Health Nutrition/Dry',
      goodsImg:
        'https://cdn.royalcanin-weshare-online.io/nD8cpngBRYZmsWpckqgH/v5/jp-spt-2561-ageing-12-pkg-1',
      goodsWeight: 1.0,
      marketPrice: null,
      supplyPrice: null,
      goodsType: 0,
      costPrice: null,
      createTime: '2022-04-12 08:37:39.000',
      updateTime: '2022-09-08 12:28:54.000',
      addedTime: '2022-04-12 08:37:39.000',
      goodsSource: 1,
      delFlag: 0,
      addedFlag: 1,
      moreSpecFlag: 1,
      priceType: 2,
      customFlag: 0,
      levelDiscountFlag: 0,
      companyInfoId: 1163,
      supplierName: 'Royal Canin_France',
      storeId: 123457919,
      storeName: null,
      cateName: null,
      submitTime: '2022-04-12 08:38:08.000',
      auditStatus: 1,
      auditReason: null,
      goodsDetail: '',
      goodsMobileDetail: null,
      stock: null,
      goodsInfoIds: null,
      storeCateIds: null,
      storeCateNames: null,
      companyType: null,
      goodsCubage: 1.0,
      freightTempId: 62,
      freightTempName: 'Default template',
      saleType: 0,
      goodsVideo: null,
      linePrice: null,
      allowPriceSet: 0,
      goodsEvaluateNum: 0,
      goodsCollectNum: 0,
      goodsSalesNum: 154,
      goodsFavorableCommentNum: 4,
      grouponForbiddenFlag: false,
      subscriptionStatus: 1,
      minMarketPrice: 900.0,
      minSubscriptionPrice: 900.0,
      avgEvaluate: null,
      avgEvaluateScore: null,
      baseSpec: null,
      saleableFlag: 1,
      displayFlag: 1,
      weShareId: 605323,
      weightValue: '4',
      goodsStoreCateNames: null,
      productCategoryNames: null,
      defaultPurchaseType: null,
      defaultFrequencyId: null,
      resource: null,
      promotions: 'autoship',
      goodsPillar: null,
      exclusiveFlag: null,
      wsEnergyCategory: 'normal_outdoor_fcn_breed',
      wsReferenceEnergyValue: 4079.0,
      wsTechnologyCode: 'dry',
      wsDensity: 440.0,
      sourceCreateTime: null,
      sourceUpdateTime: null,
      serviceTypeId: null,
      assignResources: null,
      isTopPlp: 0
    },
    storeCates: [
      {
        storeCateId: 7420,
        storeId: null,
        goodsCateId: null,
        cateName: 'キャットフード',
        cateParentId: null,
        cateImg: null,
        cateDescription: null,
        catePath: null,
        cateGrade: null,
        pinYin: null,
        createTime: null,
        updateTime: null,
        delFlag: null,
        sort: null,
        productNum: null,
        displayStatus: null,
        cateTitle: null,
        cateType: null,
        cateRouter: null,
        isDefault: null,
        productNo: null,
        altName: null,
        filterStatus: null,
        periodBeginTime: null,
        periodEndTime: null,
        storeCateList: null,
        isPeriod: null,
        spinYin: null
      }
    ],
    images: [
      {
        imageId: 584752,
        goodsId: '8a7080ea8019630b01801cec45610023',
        imageType: 'master',
        goodsInfoId: null,
        artworkUrl:
          'https://cdn.royalcanin-weshare-online.io/nD8cpngBRYZmsWpckqgH/v5/jp-spt-2561-ageing-12-pkg-1',
        middleUrl: null,
        thumbUrl: null,
        bigUrl: null,
        createTime: '2022-04-12 08:39:02.000',
        updateTime: '2022-08-05 01:56:25.000',
        delFlag: 0
      },
      {
        imageId: 584753,
        goodsId: '8a7080ea8019630b01801cec45610023',
        imageType: 'kibble',
        goodsInfoId: null,
        artworkUrl:
          'https://cdn.royalcanin-weshare-online.io/mj8apngBRYZmsWpcHqhK/v5/jp-spt-2561-ageing-12-kbl-2',
        middleUrl: null,
        thumbUrl: null,
        bigUrl: null,
        createTime: '2022-04-12 08:39:02.000',
        updateTime: '2022-08-05 01:56:25.000',
        delFlag: 0
      },
      {
        imageId: 584754,
        goodsId: '8a7080ea8019630b01801cec45610023',
        imageType: 'bag',
        goodsInfoId: null,
        artworkUrl:
          'https://cdn.royalcanin-weshare-online.io/nD8cpngBRYZmsWpckqgH/v5/jp-spt-2561-ageing-12-pkg-1',
        middleUrl: null,
        thumbUrl: null,
        bigUrl: null,
        createTime: '2022-04-12 08:39:02.000',
        updateTime: '2022-08-05 01:56:25.000',
        delFlag: 0
      }
    ],
    goodsSpecs: [
      {
        specId: 3339520,
        goodsId: '8a7080ea8019630b01801cec45610023',
        specName: '内容量',
        createTime: '2022-04-12 08:38:08.000',
        updateTime: '2022-08-05 01:56:25.000',
        delFlag: 0,
        mockSpecId: 3339520,
        specDetailIds: [592579853, 855113501, 996045862],
        editable: null
      }
    ],
    goodsSpecDetails: [
      {
        specDetailId: 996045862,
        goodsId: '8a7080ea8019630b01801cec45610023',
        specId: 3339520,
        detailName: '400g',
        createTime: '2022-04-12 08:43:08.000',
        updateTime: '2022-08-05 01:56:25.000',
        delFlag: 0,
        mockSpecId: 3339520,
        mockSpecDetailId: 996045862,
        calculateSort: 400,
        editable: null,
        isSelected: null
      },
      {
        specDetailId: 855113501,
        goodsId: '8a7080ea8019630b01801cec45610023',
        specId: 3339520,
        detailName: '2kg',
        createTime: '2022-04-12 08:43:08.000',
        updateTime: '2022-08-05 01:56:25.000',
        delFlag: 0,
        mockSpecId: 3339520,
        mockSpecDetailId: 855113501,
        calculateSort: 2000,
        editable: null,
        isSelected: true
      },
      {
        specDetailId: 592579853,
        goodsId: '8a7080ea8019630b01801cec45610023',
        specId: 3339520,
        detailName: '4kg',
        createTime: '2022-04-12 08:43:08.000',
        updateTime: '2022-08-05 01:56:25.000',
        delFlag: 0,
        mockSpecId: 3339520,
        mockSpecDetailId: 592579853,
        calculateSort: 4000,
        editable: null,
        isSelected: null
      }
    ],
    goodsInfos: [
      {
        goodsInfoId: '8a7080ea8019630b01801cf0d8b502f7',
        goodsId: '8a7080ea8019630b01801cec45610023',
        goodsInfoName: 'エイジング 12+',
        goodsInfoNo: '3182550786201',
        innerGoodsInfoNo: 'JP_3182550786201',
        goodsInfoImg: null,
        goodsInfoBarcode: '31055005',
        stock: 4997,
        marketPrice: 900.0,
        marketPriceExclVat: null,
        supplyPrice: null,
        retailPrice: null,
        grouponPrice: null,
        costPrice: null,
        createTime: '2022-04-12 08:43:08.000',
        updateTime: '2022-08-05 01:56:25.000',
        addedTime: null,
        delFlag: 0,
        addedFlag: 1,
        companyInfoId: 1163,
        storeId: 123457919,
        storeName: null,
        customFlag: 0,
        levelDiscountFlag: 0,
        auditStatus: 1,
        companyType: 0,
        aloneFlag: false,
        salePrice: 900.0,
        priceType: 2,
        mockSpecIds: [3339520],
        mockSpecDetailIds: [996045862],
        specDetailRelIds: null,
        buyCount: 0,
        count: null,
        maxCount: null,
        intervalPriceIds: [],
        specText: null,
        intervalMinPrice: null,
        intervalMaxPrice: null,
        validFlag: null,
        cateId: 1809,
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
        subscriptionPrice: 900.0,
        linePrice: 0.0,
        basePrice: 2.25,
        subscriptionBasePrice: 2.25,
        basePriceType: '',
        goodsInfoWeight: 400.0,
        goodsInfoUnit: 'g',
        goods: null,
        goodsPromotion: null,
        description: null,
        auditCatFlag: null,
        prescriberFlag: null,
        goodsMeasureNum: 1.0,
        goodsMeasureUnit: 'ea',
        subscriptionDiscountPrice: 0.0,
        goodsInfoFlag: null,
        periodTypeId: null,
        purchasePrice: null,
        purchasePriceExclVat: null,
        goodsInfoType: null,
        goodsInfoBundleRels: [],
        recommendationId: null,
        recommendationName: null,
        recommendationSerialCode: null,
        weShareScode: null,
        packSize: '400g',
        subscriptionPercentage: '0%',
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
        externalSku: '31055005',
        promotions: 'autoship',
        isOfflineStore: null,
        petsId: null,
        petsType: null,
        questionParams: null,
        referenceData: null,
        depth: 0.0,
        depthUnit: 'mm',
        width: 0.0,
        widthUnit: 'mm',
        height: 0.0,
        heightUnit: 'mm',
        specification: null,
        isNotShowCart: null,
        externalStock: 4997,
        externalMarketPrice: null,
        externalSubscriptionPrice: null,
        externalLinePrice: null,
        externalPurchasePrice: null,
        factor: 1,
        stockUomId: null,
        priceUomId: null,
        priceUom: null,
        stockUom: null,
        defaultSku: null,
        displayOnShop: null,
        productCategory: null,
        cateRate: null,
        sort: null
      },
      {
        goodsInfoId: '8a7080ea8019630b01801cf0d92a02fb',
        goodsId: '8a7080ea8019630b01801cec45610023',
        goodsInfoName: 'エイジング 12+',
        goodsInfoNo: '3182550786218',
        innerGoodsInfoNo: 'JP_3182550786218',
        goodsInfoImg: null,
        goodsInfoBarcode: '31055021',
        stock: 3438,
        marketPrice: 6636.0,
        marketPriceExclVat: null,
        supplyPrice: null,
        retailPrice: null,
        grouponPrice: null,
        costPrice: null,
        createTime: '2022-04-12 08:43:08.000',
        updateTime: '2022-08-05 01:56:25.000',
        addedTime: null,
        delFlag: 0,
        addedFlag: 1,
        companyInfoId: 1163,
        storeId: 123457919,
        storeName: null,
        customFlag: 0,
        levelDiscountFlag: 0,
        auditStatus: 1,
        companyType: 0,
        aloneFlag: false,
        salePrice: 6636.0,
        priceType: 2,
        mockSpecIds: [3339520],
        mockSpecDetailIds: [855113501],
        specDetailRelIds: null,
        buyCount: 0,
        count: null,
        maxCount: null,
        intervalPriceIds: [],
        specText: null,
        intervalMinPrice: null,
        intervalMaxPrice: null,
        validFlag: null,
        cateId: 1809,
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
        subscriptionPrice: 6636.0,
        linePrice: 0.0,
        basePrice: 3318.0,
        subscriptionBasePrice: 3318.0,
        basePriceType: '',
        goodsInfoWeight: 2.0,
        goodsInfoUnit: 'kg',
        goods: null,
        goodsPromotion: null,
        description: null,
        auditCatFlag: null,
        prescriberFlag: null,
        goodsMeasureNum: 1.0,
        goodsMeasureUnit: 'ea',
        subscriptionDiscountPrice: 0.0,
        goodsInfoFlag: null,
        periodTypeId: null,
        purchasePrice: null,
        purchasePriceExclVat: null,
        goodsInfoType: null,
        goodsInfoBundleRels: [],
        recommendationId: null,
        recommendationName: null,
        recommendationSerialCode: null,
        weShareScode: null,
        packSize: '2kg',
        subscriptionPercentage: '0%',
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
        externalSku: '31055021',
        promotions: 'autoship',
        isOfflineStore: null,
        petsId: null,
        petsType: null,
        questionParams: null,
        referenceData: null,
        depth: 0.0,
        depthUnit: 'mm',
        width: 0.0,
        widthUnit: 'mm',
        height: 0.0,
        heightUnit: 'mm',
        specification: null,
        isNotShowCart: null,
        externalStock: 3438,
        externalMarketPrice: null,
        externalSubscriptionPrice: null,
        externalLinePrice: null,
        externalPurchasePrice: null,
        factor: 1,
        stockUomId: null,
        priceUomId: null,
        priceUom: null,
        stockUom: null,
        defaultSku: null,
        displayOnShop: null,
        productCategory: null,
        cateRate: null,
        sort: null
      },
      {
        goodsInfoId: '8a7080ea8019630b01801cf0d99f02ff',
        goodsId: '8a7080ea8019630b01801cec45610023',
        goodsInfoName: 'エイジング 12+',
        goodsInfoNo: '3182550786225',
        innerGoodsInfoNo: 'JP_3182550786225',
        goodsInfoImg: null,
        goodsInfoBarcode: '31055041',
        stock: 0,
        marketPrice: 3755.0,
        marketPriceExclVat: null,
        supplyPrice: null,
        retailPrice: null,
        grouponPrice: null,
        costPrice: null,
        createTime: '2022-04-12 08:43:08.000',
        updateTime: '2022-08-05 01:56:25.000',
        addedTime: null,
        delFlag: 0,
        addedFlag: 1,
        companyInfoId: 1163,
        storeId: 123457919,
        storeName: null,
        customFlag: 0,
        levelDiscountFlag: 0,
        auditStatus: 1,
        companyType: 0,
        aloneFlag: false,
        salePrice: 3755.0,
        priceType: 2,
        mockSpecIds: [3339520],
        mockSpecDetailIds: [592579853],
        specDetailRelIds: null,
        buyCount: 0,
        count: null,
        maxCount: null,
        intervalPriceIds: [],
        specText: null,
        intervalMinPrice: null,
        intervalMaxPrice: null,
        validFlag: null,
        cateId: 1809,
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
        subscriptionPrice: 3755.0,
        linePrice: 0.0,
        basePrice: 938.75,
        subscriptionBasePrice: 938.75,
        basePriceType: '',
        goodsInfoWeight: 4.0,
        goodsInfoUnit: 'kg',
        goods: null,
        goodsPromotion: null,
        description: null,
        auditCatFlag: null,
        prescriberFlag: null,
        goodsMeasureNum: 1.0,
        goodsMeasureUnit: 'ea',
        subscriptionDiscountPrice: 0.0,
        goodsInfoFlag: null,
        periodTypeId: null,
        purchasePrice: null,
        purchasePriceExclVat: null,
        goodsInfoType: null,
        goodsInfoBundleRels: [],
        recommendationId: null,
        recommendationName: null,
        recommendationSerialCode: null,
        weShareScode: null,
        packSize: '4kg',
        subscriptionPercentage: '0%',
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
        externalSku: '31055041',
        promotions: 'autoship',
        isOfflineStore: null,
        petsId: null,
        petsType: null,
        questionParams: null,
        referenceData: null,
        depth: 0.0,
        depthUnit: 'mm',
        width: 0.0,
        widthUnit: 'mm',
        height: 0.0,
        heightUnit: 'mm',
        specification: null,
        isNotShowCart: null,
        externalStock: 0,
        externalMarketPrice: null,
        externalSubscriptionPrice: null,
        externalLinePrice: null,
        externalPurchasePrice: null,
        factor: 1,
        stockUomId: null,
        priceUomId: null,
        priceUom: null,
        stockUom: null,
        defaultSku: null,
        displayOnShop: null,
        productCategory: null,
        cateRate: null,
        sort: null
      }
    ],
    goodsLevelPrices: null,
    goodsCustomerPrices: null,
    goodsIntervalPrices: [],
    storeGoodsTabs: [],
    distributionGoods: false,
    grouponFlag: null,
    taggingList: null,
    filterList: null,
    goodsAttributesValueRelList: [
      {
        id: 'GAR202207050558164780',
        goodsId: '8a7080ea8019630b01801cec45610023',
        goodsAttributeId: 'A20220116083116247',
        goodsAttributeValueId: 'AV146755622324559872',
        goodsAttributeName: 'Species',
        goodsAttributeNameEn: 'Species',
        goodsAttributeValue: 'Cat',
        goodsAttributeValueEn: 'Cat',
        createTime: '2022-07-05 05:58:16.000',
        updateTime: null,
        delTime: null,
        delFlag: false,
        dataSource: 0
      },
      {
        id: 'GAR202207050558164781',
        goodsId: '8a7080ea8019630b01801cec45610023',
        goodsAttributeId: 'A20220116083116244',
        goodsAttributeValueId: 'AV146755622278422528',
        goodsAttributeName: 'Portfolio Classification',
        goodsAttributeNameEn: 'Portfolio Classification',
        goodsAttributeValue:
          'ROYAL CANIN / SPT Retail / Feline Health Nutrition',
        goodsAttributeValueEn:
          'ROYAL CANIN / SPT Retail / Feline Health Nutrition',
        createTime: '2022-07-05 05:58:16.000',
        updateTime: null,
        delTime: null,
        delFlag: false,
        dataSource: 0
      },
      {
        id: 'GAR202207050558164782',
        goodsId: '8a7080ea8019630b01801cec45610023',
        goodsAttributeId: 'A20220116083116242',
        goodsAttributeValueId: 'AV146755621485699072',
        goodsAttributeName: 'Pillar',
        goodsAttributeNameEn: 'Pillar',
        goodsAttributeValue: 'SPT Retail',
        goodsAttributeValueEn: 'SPT retail',
        createTime: '2022-07-05 05:58:16.000',
        updateTime: null,
        delTime: null,
        delFlag: false,
        dataSource: 0
      },
      {
        id: 'GAR202207050558164783',
        goodsId: '8a7080ea8019630b01801cec45610023',
        goodsAttributeId: 'A20220116083116240',
        goodsAttributeValueId: 'AV146755620906885120',
        goodsAttributeName: 'Sterilized',
        goodsAttributeNameEn: 'STÉRILISÉ',
        goodsAttributeValue: 'false',
        goodsAttributeValueEn: 'NON',
        createTime: '2022-07-05 05:58:16.000',
        updateTime: null,
        delTime: null,
        delFlag: false,
        dataSource: 0
      },
      {
        id: 'GAR202207050558164784',
        goodsId: '8a7080ea8019630b01801cec45610023',
        goodsAttributeId: 'A20220116083116237',
        goodsAttributeValueId: 'AV146755621095628800',
        goodsAttributeName: 'Range',
        goodsAttributeNameEn: 'Gramme',
        goodsAttributeValue: 'Feline Health Nutrition_Cat',
        goodsAttributeValueEn: 'Feline Health Nutrition',
        createTime: '2022-07-05 05:58:16.000',
        updateTime: null,
        delTime: null,
        delFlag: false,
        dataSource: 0
      },
      {
        id: 'GAR202207050558164785',
        goodsId: '8a7080ea8019630b01801cec45610023',
        goodsAttributeId: 'A20220116083116234',
        goodsAttributeValueId: 'AV146755621066268672',
        goodsAttributeName: 'Breeds',
        goodsAttributeNameEn: 'RACE',
        goodsAttributeValue: 'Cat_Cat',
        goodsAttributeValueEn: 'Tous les chats',
        createTime: '2022-07-05 05:58:16.000',
        updateTime: null,
        delTime: null,
        delFlag: false,
        dataSource: 0
      },
      {
        id: 'GAR202207050558164786',
        goodsId: '8a7080ea8019630b01801cec45610023',
        goodsAttributeId: 'A20220116083116232',
        goodsAttributeValueId: 'AV146755620885913600',
        goodsAttributeName: 'Technology',
        goodsAttributeNameEn: 'Texture des aliments',
        goodsAttributeValue: 'Dry',
        goodsAttributeValueEn: 'Aliment sec',
        createTime: '2022-07-05 05:58:16.000',
        updateTime: null,
        delTime: null,
        delFlag: false,
        dataSource: 0
      },
      {
        id: 'GAR202207050558164787',
        goodsId: '8a7080ea8019630b01801cec45610023',
        goodsAttributeId: 'A20220116083116230',
        goodsAttributeValueId: 'AV146755621091434496',
        goodsAttributeName: 'Lifestages',
        goodsAttributeNameEn: 'ÂGE',
        goodsAttributeValue: 'Senior_Cat',
        goodsAttributeValueEn: 'Senior (+12 ans)',
        createTime: '2022-07-05 05:58:16.000',
        updateTime: null,
        delTime: null,
        delFlag: false,
        dataSource: 0
      }
    ],
    isSkuNoQuery: false,
    goodsDescriptionDetailList: [
      {
        id: 'GDD202208050156251260',
        goodsCateId: 1809,
        goodsId: '8a7080ea8019630b01801cec45610023',
        descriptionId: 'D20220116083116704',
        descriptionName: 'Text',
        displayName: null,
        contentType: 'json',
        editable: true,
        content: '',
        sort: 2,
        status: true,
        storeId: 123457919,
        createTime: '2022-08-05 01:56:25.000',
        updateTime: null,
        delTime: null,
        delFlag: false,
        translateList: []
      },
      {
        id: 'GDD202208050156251331',
        goodsCateId: 1809,
        goodsId: '8a7080ea8019630b01801cec45610023',
        descriptionId: 'D20220116083116703',
        descriptionName: 'Compositions',
        displayName: null,
        contentType: 'json',
        editable: true,
        content:
          '[{"LEGAL_TEXT_HEADING":"室内で生活する老齢猫用（12歳以上）"}, {"原材料":"原材料：植物性分離タンパク*、小麦粉、動物性脂肪、肉類（鶏、七面鳥）、米、とうもろこし、植物性繊維、加水分解タンパク（鶏、七面鳥）、チコリパルプ、魚油、大豆油、酵母および酵母エキス、トマト（リコピン源）、フラクトオリゴ糖、サイリウム、緑茶抽出物（ポリフェノール源）、加水分解酵母（マンナンオリゴ糖源）、加水分解甲殻類（グルコサミン源）、ルリチシャ油、マリーゴールド抽出物（ルテイン源）、加水分解軟骨（コンドロイチン硫酸源）、アミノ酸類（タウリン、DL-メチオニン、L-リジン、L-トリプトファン、L-カルニチン）、βｰカロテン、ミネラル類（K、Ca、Cl、Na、Zn、Mn、Fe、Cu、I、Se）、ビタミン類（A、コリン、D3、E、C、ナイアシン、パントテン酸カルシウム、B2、B6、B1、葉酸、ビオチン、B12）、酸化防止剤（BHA、没食子酸プロピル）"}, {"成分（保証分析値）":"成分（保証分析値）：\\nたんぱく質　　28.0 %以上、\\n脂質　　17.0 %以上、\\n粗繊維　　5.4 %以下、\\n灰分　　5.8 %以下、\\n水分　　6.5 %以下、\\n食物繊維　　10.9 %"}, {"ビタミン（1 kg中）":"ビタミン（1 kg中）：\\nA　　21,500 IU、\\nD3　　700 IU、\\nE　　530 mg"}, {"カロリー含有量 （代謝エネルギー）":"カロリー含有量 （代謝エネルギー）：408 kcal/100 g"}]',
        sort: 3,
        status: true,
        storeId: 123457919,
        createTime: '2022-08-05 01:56:25.000',
        updateTime: null,
        delTime: null,
        delFlag: false,
        translateList: []
      },
      {
        id: 'GDD202208050156251372',
        goodsCateId: 1809,
        goodsId: '8a7080ea8019630b01801cec45610023',
        descriptionId: 'D20220116083116701',
        descriptionName: 'Benefits',
        displayName: null,
        contentType: 'json',
        editable: true,
        content:
          '[{"【食欲を刺激】":{"Description":"高齢期の猫の中には、年を重ねるにつれ味覚や嗅覚が衰えることに伴って食事量が減少する猫がいます。＜エイジング 12+＞は、高い嗜好性を持ち、噛みやすく設計された2層構造のキブル（粒）により、高齢猫の食欲を刺激します。"}}, {"【健やかな高齢期のサポート】":{"Description":"リコピンを含む独自の抗酸化成分とオメガ3系脂肪酸が高齢期の猫の健康をサポートします。"}}, {"【健康な腎臓を維持】":{"Description":"健康な腎臓を維持するために、リンの含有量を適切に調整。"}}]',
        sort: 4,
        status: true,
        storeId: 123457919,
        createTime: '2022-08-05 01:56:25.000',
        updateTime: null,
        delTime: null,
        delFlag: false,
        translateList: []
      },
      {
        id: 'GDD202208050156251403',
        goodsCateId: 1809,
        goodsId: '8a7080ea8019630b01801cec45610023',
        descriptionId: 'D20220116083116699',
        descriptionName: 'Guide',
        displayName: null,
        contentType: 'json',
        editable: true,
        content:
          '[{"Table":{"asset_id":644007,"Image":"https://cdn.royalcanin-weshare-online.io/T1aynHkBBKJuub5qSrB_/v3/jp-spt-2561-ageing-12-fg-3-01"}}]',
        sort: 5,
        status: true,
        storeId: 123457919,
        createTime: '2022-08-05 01:56:25.000',
        updateTime: null,
        delTime: null,
        delFlag: false,
        translateList: []
      }
    ],
    toPrice: 6636.0,
    fromPrice: 900.0
  },
  speciesValue: 'Dog'
};

describe('Index Test', () => {
  window.dataLayer = [];

  test('test ru', async () => {
    const history = createMemoryHistory();
    window.__.env.REACT_APP_COUNTRY = 'ru';
    await act(async () => {
      const { debug, container } = await render(
        <Provider {...stores}>
          <Router history={{ ...history }}>
            <Index {...propsData} />
          </Router>
        </Provider>
      );
    });
  });

  test('test fr', async () => {
    const history = createMemoryHistory();
    window.__.env.REACT_APP_COUNTRY = 'fr';
    await act(async () => {
      const { debug, container } = await render(
        <Provider {...stores}>
          <Router history={{ ...history }}>
            <Index {...propsData} />
          </Router>
        </Provider>
      );
    });
  });

  test('test tr', async () => {
    const history = createMemoryHistory();
    window.__.env.REACT_APP_COUNTRY = 'tr';
    await act(async () => {
      const { debug, container } = await render(
        <Provider {...stores}>
          <Router history={{ ...history }}>
            <Index {...propsData} />
          </Router>
        </Provider>
      );
    });
  });

  test('test se', async () => {
    const history = createMemoryHistory();
    window.__.env.REACT_APP_COUNTRY = 'se';
    await act(async () => {
      const { debug, container } = await render(
        <Provider {...stores}>
          <Router history={{ ...history }}>
            <Index {...propsData} />
          </Router>
        </Provider>
      );
    });
  });

  test('test jp', async () => {
    const history = createMemoryHistory();
    window.__.env.REACT_APP_COUNTRY = 'jp';
    await act(async () => {
      const { debug, container } = await render(
        <Provider {...stores}>
          <Router history={{ ...history }}>
            <Index {...propsData} />
          </Router>
        </Provider>
      );
      // debug();
      const pf_checkbox_mixbreed = screen.getByTestId('pf-checkbox-mixbreed');
      await fireEvent.click(pf_checkbox_mixbreed);
      const select_options_items = screen.getAllByTestId('select_options_item');
      console.log('select_options_items', select_options_items);
      const select_options_item_one = screen.getAllByTestId(
        'select_options_item'
      )[0];
      await fireEvent.click(select_options_item_one);
      const mixed_breed_medium_11_25kg = screen.getByTestId(
        'mixed_breed_medium_11_25kg'
      );
      await fireEvent.click(mixed_breed_medium_11_25kg);
      // gender
      const gender_male = screen.getByTestId('male');
      await fireEvent.click(gender_male);
      //petActivityCode
      const gender_moderate = screen.getByTestId('moderate');
      await fireEvent.click(gender_moderate);
      //ageBool
      const select_options_item_two = screen.getAllByTestId(
        'select_options_item'
      )[1];
      await fireEvent.click(select_options_item_two);
      const ageAdd = screen.getByTestId('ageAdd');
      const year = screen.getByTestId('year');
      await fireEvent.click(year);
      await fireEvent.click(ageAdd);
      await fireEvent.click(select_options_item_two);
      const month = screen.getByTestId('month');
      await fireEvent.click(month);
      await fireEvent.click(ageAdd);
      //weightBool
      const weight = screen.getByTestId('weight');
      await fireEvent.change(weight, { target: { value: 5 } });
      //neutered
      const neutered = screen.getByTestId('true');
      await fireEvent.click(neutered);
      const handleToStep2 = screen.getByTestId('handleToStep2');
      await userEvent.click(handleToStep2);

      // debug();
      // step2
      const BcsSelect = screen.getByTestId('BcsSelect-3');
      await fireEvent.click(BcsSelect);
      const bcsBtn = screen.getByTestId('bcsBtn');
      await fireEvent.click(bcsBtn);

      //step3
      const againCalculation = screen.getByTestId('againCalculation');
      await fireEvent.click(againCalculation);
    });
  });
});
