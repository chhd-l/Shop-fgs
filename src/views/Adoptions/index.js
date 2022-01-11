import React, { useState, useEffect } from 'react';
import Selection from '@/components/Selection';
import { useLocalStore } from 'mobx-react';
import Skeleton from 'react-skeleton-loader';
import Header from '@/components/Header';
import { Helmet } from 'react-helmet';
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

import stores from '@/store';
import { getShelterList } from '@/api/recommendation';
import { getDetails, getLoginDetails } from '@/api/details';
import { getFrequencyDict } from '@/utils/utils';
let goodsInfoNosObj = {
  8172118196590126: 'Kitten <br/> (3-12 months)',
  8172256907894156: 'Adult Cat<br/> (1+ years)',
  493013: 'Small Puppy <br/> (3-12 months)',
  493817: 'Medium Puppy <br/>(3-12 months)',
  492818: 'Large Puppy <br/>(3-12 months)',
  512514: 'Small Adult Dog<br/> (1+ years)',
  517417: 'Medium Adult Dog<br/> (1+ years)',
  517906: 'Large Adult Dog <br/>(1+ years)'
};
const Adoptions = (props) => {
  const { loginStore, paymentStore, checkoutStore, configStore } =
    useLocalStore(() => stores);

  const [seoConfig, setSeoConfig] = useState({
    title: 'Royal canin',
    metaKeywords: 'Royal canin',
    metaDescription: 'Royal canin'
  });
  const [btnLoading, setBtnLoading] = useState(false);
  const [shelter, setShelter] = useState({});
  const [shelterList, setShelterList] = useState([]);
  const [goodsList, setGoodsList] = useState([]);

  useEffect(() => {
    getShelters();
    getGoodsInfos();
    // getSeoConfig()
  }, []);
  const getSeoConfig = () => {
    setSeoConfig({
      pageName: 'adoptions page'
    }).then((res) => {
      setSeoConfig(res);
    });
  };
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
  };
  const addCart = async (product) => {
    console.info('product', product);
    if (
      !shelter.value ||
      !product.goodsInfo?.goodsInfoId ||
      product.goodsInfo.stock < 1
    ) {
      console.info('....');
      return;
    }
    // 获取detail
    let details = await getDetail(product.goodsInfo.goodsInfoId);
    // details = Object.assign({},details,details.goodsInfo)
    return;
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
    let res = goodsRes.context;
    // GARecommendationProduct([res], 3, frequencyDictRes);
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
  const hanldeUnloginAddToCart = async (product) => {
    let cartItem = Object.assign({}, product, product.goodsInfo, {
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
    try {
      await checkoutStore.hanldeUnloginAddToCart({
        valid: product.goodsInfo.stock > 0,
        cartItemList: [cartItem]
      });
      props.history.push('/cart');
    } catch (err) {
      setBtnLoading(false);
    }
  };
  const hanldeLoginAddToCart = async (details) => {
    let param = {
      goodsInfoId: details.goodsInfo.goodsInfoId,
      goodsNum: 1,
      recommendationId: shelter.value,
      recommendationName: shelter.name,
      currentUnitPrice: details.goodsInfo?.marketPrice,
      goodsInfoFlag: 0,
      periodTypeId: null
      // goodsInfoFlag: details.goodsInfoFlag,
      // periodTypeId: details.defaultFrequencyId
    };
    try {
      await sitePurchase(param);
      await checkoutStore.updateLoginCart({
        intl: props.intl
      });
      props.history.push('/cart');
    } catch (err) {
      setBtnLoading(false);
    }
  };
  const getGoodsInfos = async () => {
    let goodsInfoNos = Object.keys(goodsInfoNosObj);
    let res = await getList({
      goodsInfoNos
    });
    let goodsLists = res.context.esGoodsPage?.content;
    // 找出sku并放到goodsInfo上
    goodsInfoNos.forEach((id) => {
      goodsLists.forEach((el) => {
        let goodsInfo = el.goodsInfos.find((info) => info.goodsInfoNo == id);
        if (goodsInfo) {
          el.goodsNameStr = goodsInfoNosObj[id];
          el.goodsInfo = goodsInfo;
        }
      });
    });
    // 查出的其他数据不应该被展示
    let list = goodsLists.filter((el) => el.goodsInfo);
    console.info('list', list);
    setGoodsList(list);
  };
  const handleSelectChange = (data) => {
    setShelter(data);
  };
  const GAShelterLPdropdownClick = () => {
    // dataLayer.push({
    //   event: 'shelterLPdropdownClick'
    // });
  };
  return (
    <div>
      <Helmet>
        <link rel="canonical" href={pageLink} />
        <title>{seoConfig.title}</title>
        <meta name="description" content={seoConfig.metaDescription} />
        <meta name="keywords" content={seoConfig.metaKeywords} />
      </Helmet>
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
              <div className="rc-layout-container rc-five-column   padding-x--lg-forpc">
                <div className="rc-column rc-double-width sub-title font-26px">
                  Get started by selecting your shelter
                </div>
                <div className="rc-column rc-triple-width">
                  <p
                    style={{
                      color: '#444444',
                      fontSize: '14px',
                      fontWeight: '500'
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
                    <button
                      onClick={() => addCart(item)}
                      class={`rc-btn rc-btn--two ${
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
        <UsAndRu />
        <Footer />
      </main>
    </div>
  );
};
export default injectIntl(Adoptions);
