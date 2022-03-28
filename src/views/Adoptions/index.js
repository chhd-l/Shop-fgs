import React, { useState, useEffect } from 'react';
import Selection from '@/components/Selection';
import { useLocalStore } from 'mobx-react';
import Skeleton from 'react-skeleton-loader';
import Header from '@/components/Header';
import { Helmet } from 'react-helmet';
import GoogleTagManager from '@/components/GoogleTagManager';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import { getList } from '@/api/list';
import './index.less';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import UsAndRu from '../Recommendation_US/components/UsAndRu';
const pageLink = window.location.href;
import { IMG_DEFAULT } from '@/utils/constant';
import { sitePurchase } from '@/api/cart';
import { GARecommendationProduct } from '@/utils/GA';
import { useSeo } from '@/framework/common';
import stores from '@/store';
import { getShelterList } from '@/api/recommendation';
import { getDetails, getLoginDetails } from '@/api/details';
import { getFrequencyDict } from '@/utils/utils';
let goodsInfoNosObj = {
  'goodsNo-541425': ['Kitten <br/> (3-12 months)'],
  'goodsNo-41018': ['Kitten <br/> (3-12 months)'],
  'goodsNo-541506': ['Adult Cat<br/> (1+ years)'],
  'goodsNo-471574': ['Adult Cat<br/> (1+ years)'],
  'goodsNo-493013': ['Small Puppy <br/> (3-12 months)'],
  'goodsNo-493817': ['Medium Puppy<br/> (3-12 months)'],
  'goodsNo-492818': ['Large Puppy<br/> (3-12 months)'],
  'goodsNo-512514': ['Small Adult Dog<br/> (1+ years)', '9 to 22 lbs'],
  'goodsNo-517417': ['Medium Adult Dog<br/> (1+ years)', '22 to 55 lbs'],
  'goodsNo-517935': ['Large Adult Dog<br/> (1+ years)', '56 to 100 lbs']
};
let fakeBundle = [
  {
    id: '541425-41018',
    img: 'https://d2cstgstorage.z13.web.core.windows.net/202201170450386900.jpg'
  },
  {
    id: '541506-471574',
    img: 'https://d2cstgstorage.z13.web.core.windows.net/202201170451254930.jpg'
  }
];
const sessionItemRoyal = window.__.sessionItemRoyal;

const Adoptions = (props) => {
  const { loginStore, paymentStore, checkoutStore, configStore } =
    useLocalStore(() => stores);

  const [seoConfig] = useSeo('adoptions page');
  const [btnLoading, setBtnLoading] = useState(false);
  const [shelter, setShelter] = useState({});
  const [shelterList, setShelterList] = useState([]);
  const [goodsList, setGoodsList] = useState([]);
  const event = {
    page: {
      type: 'Adoptions',
      theme: ''
    }
  };
  useEffect(() => {
    getShelters();
    getGoodsInfos();
  }, []);
  const getShelters = async () => {
    const res = await getShelterList({ prescriberType: ['Shelter'] });
    let list = res.context
      .filter((el) => el.enabled)
      .map((el) => {
        return {
          name: el.prescriberName,
          value: el.prescriberId
        };
      });
    setShelterList(list);
    let choosedShelter = sessionItemRoyal.get('handled-shelter');
    let data = list.find((el) => el.value == choosedShelter);
    data && setShelter(data);
  };
  const addCart = async (product) => {
    if (
      !shelter.value ||
      !product.goodsInfo?.goodsInfoId ||
      product.goodsInfo.stock < 1
    ) {
      console.info('....');
      return;
    }
    let details = [];
    // 获取detail
    let ids = product.goodsInfo.goodsInfoId.split('-');
    for (let id of ids) {
      let res = await getDetail(id);
      if (res.goodsInfo.stock > 0) {
        details.push(res);
      }
    }
    // details = Object.assign({},details,details.goodsInfo)
    setBtnLoading(true);

    if (loginStore.isLogin) {
      hanldeLoginAddToCart(details);
    } else {
      hanldeUnloginAddToCart(details);
    }
  };
  const getDetail = async (goodsInfoId) => {
    let requestName = loginStore.isLogin ? getLoginDetails : getDetails;
    let details = {};
    const [goodsRes, frequencyDictRes] = await Promise.all([
      requestName(goodsInfoId),
      getFrequencyDict()
    ]);
    let salePrice = goodsRes.context.goodsInfos.find(
      (el) => el.goodsInfoId == goodsInfoId
    )?.marketPrice;

    let specText = goodsRes.context.goodsInfos.find(
      (el) => el.goodsInfoId == goodsInfoId
    )?.packSize;
    let res = Object.assign({}, goodsRes.context, {
      goodsInfoId,
      salePrice,
      specText
    });
    GARecommendationProduct([res], 3, frequencyDictRes);
    res.goodsInfo = res.goodsInfos.find((el) => el.goodsInfoId == goodsInfoId);
    // handleFrequencyIdDefault(res, frequencyDictRes);
    res.sizeList = res.goodsInfos.map((g) => {
      g = Object.assign({}, g, { selected: false });
      if (g.goodsInfoId === goodsInfoId) {
        g.selected = true;
      }
      return g;
    });
    let specList = res.goodsSpecs;
    let specDetailList = res.goodsSpecDetails;
    if (specList) {
      specList.map((sItem) => {
        sItem.chidren = specDetailList.filter((sdItem, i) => {
          return sdItem.specId === sItem.specId;
        });
        sItem.chidren.map((child) => {
          if (
            res.goodsInfo.mockSpecDetailIds.indexOf(child.specDetailId) > -1
          ) {
            child.selected = true;
          }
          return child;
        });
        return sItem;
      });
    }
    res.goodsSpecDetails = res.goodsSpecDetails;
    res.goodsSpecs = specList;
    details = Object.assign({}, res, res.goods, res.goodsInfo?.goods);
    return details;
  };
  const handleFrequencyIdDefault = (goodsRes, frequencyList) => {
    let autoshipDictRes = frequencyList.filter((el) => el.goodsInfoFlag === 1);
    let clubDictRes = frequencyList.filter((el) => el.goodsInfoFlag === 2);
    let goodsInfoFlag = 0;
    let FrequencyIdDefault = '';
    if (goodsRes.goods.subscriptionStatus) {
      if (goodsRes.goodsInfo.promotions != 'club') {
        goodsInfoFlag = 1;
        FrequencyIdDefault =
          goodsRes.goods.defaultFrequencyId ||
          configStore?.info?.storeVO?.defaultSubscriptionFrequencyId ||
          (autoshipDictRes[0] && autoshipDictRes[0].id);
      } else {
        goodsInfoFlag = 2;
        FrequencyIdDefault =
          goodsRes.goods.defaultFrequencyId ||
          configStore?.info?.storeVO?.defaultSubscriptionClubFrequencyId ||
          (clubDictRes[0] && clubDictRes[0].id);
      }
      let defaultFrequencyId =
        goodsRes?.defaultFrequencyId || FrequencyIdDefault || '';
      goodsRes.defaultFrequencyId = defaultFrequencyId;
    }
    goodsRes.goodsInfoFlag = goodsInfoFlag;
  };
  const hanldeUnloginAddToCart = async (products) => {
    let cartItem = products.map((product) => {
      return Object.assign({}, product, product.goodsInfo, {
        selected: true,
        quantity: 1,
        currentUnitPrice: product.goodsInfo?.marketPrice,
        goodsInfoFlag: 0,
        periodTypeId: null,
        // goodsInfoFlag: product.goodsInfoFlag,
        // periodTypeId: product.defaultFrequencyId,
        recommendationId: shelter.value,
        recommendationName: shelter.name
      });
    });
    try {
      await checkoutStore.hanldeUnloginAddToCart({
        valid: true,
        cartItemList: cartItem,
        configStore,
        ...props
      });
      props.history.push('/cart');
    } catch (err) {
      setBtnLoading(false);
    }
  };
  const hanldeLoginAddToCart = async (details) => {
    for (let detail of details) {
      let param = {
        goodsInfoId: detail.goodsInfo.goodsInfoId,
        goodsNum: 1,
        recommendationId: shelter.value,
        recommendationName: shelter.name,
        currentUnitPrice: detail.goodsInfo?.marketPrice,
        goodsInfoFlag: 0,
        periodTypeId: null
        // goodsInfoFlag: detail.goodsInfoFlag,
        // periodTypeId: detail.defaultFrequencyId
      };
      await sitePurchase(param);
    }

    try {
      await checkoutStore.updateLoginCart({
        intl: props.intl
      });
      props.history.push('/cart');
    } catch (err) {
      setBtnLoading(false);
    }
  };
  const deleteItem = (arr, goodsInfoNo) => {
    const index = arr.findIndex(
      (el) => el.goodsInfo.goodsInfoNo === goodsInfoNo
    );
    arr.splice(index, 1);
  };
  const getGoodsInfos = async () => {
    let goodsInfoNos = Object.keys(goodsInfoNosObj).map(
      (el) => el.split('-')[1]
    ); //直接把goodsNo存成数字或者字符串会改变其排序
    let res = await getList({
      goodsInfoNos
    });
    let goodsLists = res.context.esGoodsPage?.content;
    let sortList = [];
    // 找出sku并放到goodsInfo上
    goodsInfoNos.forEach((id) => {
      goodsLists.forEach((el) => {
        let goodsInfo = el.goodsInfos.find((info) => info.goodsInfoNo == id);
        if (goodsInfo) {
          el.goodsNameStr = goodsInfoNosObj[`goodsNo-${id}`][0];
          el.weightInfo = goodsInfoNosObj[`goodsNo-${id}`][1] || '';
          el.goodsInfo = goodsInfo;
          sortList.push(el);
        }
      });
    });
    // 组装fakebundle
    let fakeProducts = fakeBundle.map((el) => {
      let fakeBundleArr = el.id.split('-').map((cel) => {
        return sortList.find((item) => item.goodsInfo.goodsInfoNo == cel);
      });
      let bundleId = fakeBundleArr
        .map((el) => el.goodsInfo.goodsInfoId)
        .join('-');
      let bundleData =
        fakeBundleArr.find((el) => el.goodsInfo.stock > 0) || fakeBundleArr[0];
      bundleData.goodsImg = el.img; //重置图片
      bundleData.goodsInfo.goodsInfoId = bundleId; //重置id
      return bundleData;
    });
    // 删除拼接fakebundle的产品
    fakeBundle.forEach((el) => {
      var item = el.id.split('-');
      item.forEach((cel) => {
        deleteItem(sortList, cel);
      });
    });
    sortList.unshift(...fakeProducts);
    // fakeIds.
    console.info(
      'sortList',
      sortList.map((el) => el.goodsNameStr)
    );
    // 查出的其他数据不应该被展示
    let list = sortList.filter((el) => el.goodsInfo);
    setGoodsList(list);
  };
  const handleSelectChange = (data) => {
    setShelter(data);
    sessionItemRoyal.set('handled-shelter', data.value);
  };
  const GAShelterLPdropdownClick = () => {
    dataLayer.push({
      event: 'shelterLPdropdownClick'
    });
  };
  const GAforEmail = () => {
    dataLayer.push({
      event: 'shelterLPSendUsAnEmail'
    });
  };
  return (
    <div>
      <Helmet>
        <link rel="canonical" href={pageLink} />
        <title>{seoConfig.title}</title>
        <meta name="description" content={seoConfig.metaDescription} />
        <meta name="keywords" content={seoConfig.metaKeywords} />
      </Helmet>
      <GoogleTagManager key={props.location.key} additionalEvents={event} />
      <Header {...props} showMiniIcons={true} showUserIcon={true} />
      <main className=" adoptions-page m-auto rc-content--fixed-header rc-bg-colour--brand3">
        <BannerTip />
        <div className="rc-max-width--lg ">
          <div className="mw-934 m-auto">
            <div className="rc-alpha inherit-fontsize text-center">
              <h1 className="mt-10 mb-4">
                Congratulations on adopting your new pet!
              </h1>
            </div>
            <div
              className="text-center rc-padding-x--md font-18px  rc-margin-bottom--sm"
              style={{ color: '#666666' }}
            >
              Get started by selecting the adoption bundle that was recommended
              to you by your shelter.
            </div>
            <div className=" rc-padding-bottom--md rc-md-down"></div>
            <div className="rc-layout-container rc-two-column text-center-h5">
              <div className="rc-column">
                <img
                  className="rc-md-up"
                  src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/recommendation/catdog.jpg`}
                />
              </div>
              <div className="rc-column introduce-container">
                <h6 className="introduce-title rc-padding-bottom--xs rc-margin-bottom--xs">
                  Shop Royal Canin®. Give Back to Your Shelter.
                </h6>
                <div>
                  You can help make a better world for shelter pets. 10% of
                  every purchase goes back to support the shelter you adopted
                  from.
                </div>
                <h6
                  className="introduce-title rc-padding-top--md rc-padding-bottom--xs rc-margin-bottom--xs"
                  style={{ fontSize: '1.125rem' }}
                >
                  Sign up for autoship to join the Royal Canin Club, and you’ll
                  receive
                </h6>
                <div className="text-left">
                  <span className="font-bold">• Free shipping</span>, with no
                  minimum purchase
                  <br />
                  <span className="font-bold">• 5% discount </span>on every
                  future autoship order
                  <br />
                  <span className="font-bold">• </span>Expert food and product
                  recommendations
                  <br />
                  <span className="font-bold">• </span>Access to a Royal Canin
                  Advisor
                  <br />
                </div>
              </div>
            </div>
            <div className="rc-margin-y--md shelter-box">
              <div
                className="rc-layout-container rc-five-column   padding-x--lg-forpc"
                data-tms="Shelter Selection"
              >
                <div className="rc-column rc-double-width sub-title font-26px">
                  Get started by selecting your shelter
                </div>
                <div className="rc-column rc-triple-width">
                  <p
                    style={{
                      color: '#444444',
                      fontSize: '18px',
                      fontWeight: 'bold'
                    }}
                  >
                    Select your shelter
                  </p>
                  <Selection
                    hasBorder={true}
                    onClick={GAShelterLPdropdownClick}
                    optionList={shelterList}
                    selectedItemChange={(data) => handleSelectChange(data)}
                    selectedItemData={{
                      value: shelter.value
                    }}
                    key={shelter.value}
                    placeholder="Please select..."
                  />
                  <p
                    style={{ color: '#E2001A', fontWeight: '400' }}
                    className="rc-padding-top--xs"
                  >
                    Please select a shelter before adding product to cart
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="text-center sub-title font-26px rc-padding--md m-auto"
            style={{ maxWidth: '520px' }}
          >
            Select the adoption bundle that was recommended to you by your
            shelter.
          </div>
          <div className="rc-card-grid rc-match-heights rc-card-grid--fixed rc-three-column">
            {goodsList.map((item) => (
              <div className="rc-grid padding-x--md-forh5">
                <article className="rc-card rc-card--a rc-padding-top--xs">
                  <div style={{ height: '18rem' }}>
                    <picture
                      style={{ height: '100%' }}
                      className="rc-card__image rc-padding-top--xs"
                    >
                      <img
                        style={{ height: '100%' }}
                        src={
                          item.goodsImg ||
                          item.goodsInfos.sort(
                            (a, b) => a.marketPrice - b.marketPrice
                          )[0].goodsInfoImg ||
                          IMG_DEFAULT
                        }
                        alt={item.goodsNameStr?.replace('<br/>', '')}
                      />
                    </picture>
                  </div>

                  <div className="rc-card__body text-center">
                    <div
                      className="rc-card__title ui-text-overflow-line2"
                      style={{ fontSize: '1.625rem' }}
                      dangerouslySetInnerHTML={{
                        __html: item.goodsNameStr
                      }}
                    ></div>
                    <p
                      style={{ height: '40px', marginBottom: '0.5rem' }}
                      className="flex items-center justify-center"
                    >
                      {item.weightInfo}
                    </p>
                    <button
                      onClick={() => addCart(item)}
                      className={`rc-btn rc-btn--two ${
                        btnLoading ? 'ui-btn-loading' : ''
                      }
                      ${
                        item.goodsInfo.stock > 0 && shelter.value
                          ? ''
                          : 'rc-btn-disabled'
                      }`}
                      style={{ fontSize: '1rem' }}
                    >
                      Add to cart
                    </button>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
        <div className="rc-padding-top--lg rc-md-down"></div>
        <div
          className="rc-border-bottom rc-border-colour--brand4 rc-margin-top--md"
          style={{ borderBottomWidth: '4px' }}
        ></div>
        <UsAndRu
          GAforEmail={GAforEmail}
          dataTms1="Reinsurance"
          dataTms2="Royal Canin Club"
          dataTms3="Why Royal Canin"
        />
        <Footer />
      </main>
    </div>
  );
};
export default injectIntl(Adoptions);
