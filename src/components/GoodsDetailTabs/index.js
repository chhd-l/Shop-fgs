import React, { useEffect, useState } from 'react';
import { formatMoney, getDeviceType } from '@/utils/utils';
import { FormattedMessage, injectIntl, useIntl } from 'react-intl';
import ConfirmTooltip from '@/components/ConfirmTooltip';
import Selection from '@/components/Selection';
import LazyLoad from 'react-lazyload';

import phoneicon from './image/phoneicon@4x.png';
import gifticon from './image/pictogifts@4x.png';
import spetadviser from './image/pictospetadviser@4x.png';
import shippingicon from './image/pictoshipping@4x.png';
import nutrition from './image/pictonutrition@4x.png';
import landingBanner from './image/landing-banner.jpg';
import iconsix from './image/iconsix.png';
import './index.less';
import HowItWorks from '@/views/ClubLandingPage/HowItWorks';
import SubscriptionBenefitsBanner from '../../views/ClubLandingPageNew/Components/LongBanner/SubscriprionBenefitsBanner';
import HowItWorksNew from '../../views/ClubLandingPageNew/Components/HowItWorksNew';
import pdpbackgroundmobiledog from './image/goodsdeatailsbackgroundmobile.png';
import pdpbackgrounddog from './image/goodsdetailtabbackground.png'
import pdpbackgroundcat from './image/goodsdeatailtabbackgroundcat.png'
import auto from './image/auto@2x.png';
import clubiconnew1 from './image/clubiconnew1.png';
import clubiconnew2 from './image/clubiconnew2.png';
import clubiconnew3 from './image/clubiconnew3.png';
import clubiconnew4 from './image/clubiconnew4.png';
import clubiconnew5 from './image/clubiconnew5.png';
import benefitsone from '../../views/ClubLandingPageNew/Components/LongBanner/image/benefitsone.png';
import benefitstwo from '../../views/ClubLandingPageNew/Components/LongBanner/image/benefitstwo.png';
import benefitsthree from '../../views/ClubLandingPageNew/Components/LongBanner/image/benefitsthree.png';

const pdpmobilebackgrounddog = {
  backgroundImage: `url(${pdpbackgroundmobiledog})`,
  overflow: 'hidden',
  backgroundSize: 'cover'
};


const pdpbackgrounddogs={
  backgroundImage: `url(${pdpbackgrounddog})`,
  height:'700px',
  backgroundSize: 'cover',
  overflow: 'hidden',
  display:'flex',
  flexDirection:'column',
}

const pdpbackgroundcats={
  backgroundImage: `url(${pdpbackgroundcat})`,
  height:'700px',
  backgroundSize: 'cover',
  overflow: 'hidden',
  display:'flex',
  flexDirection:'column',
}


const SubscriptionItems = [
  {
    SubscriptionImg: benefitsone,
    SubscriptionTitle: (
      <FormattedMessage id="ClubLP.LongBanner.SubscriptionTitle1" />
    )
  },
  {
    SubscriptionImg: benefitstwo,
    SubscriptionTitle: (
      <FormattedMessage id="ClubLP.LongBanner.SubscriptionTitle2" />
    )
  },
  {
    SubscriptionImg: benefitsthree,
    SubscriptionTitle: (
      <FormattedMessage id="ClubLP.LongBanner.SubscriptionTitle3" />
    )
  }
];

let clubListDataNew = [
  {
    text: <FormattedMessage
      id={'ClubLP.SubscriptionBenefitsNew.icon1'}
    />,
    img: clubiconnew1,
    alt: 'CLUB BENEFITS PET ADVISOR'
  },
  {
    text: <FormattedMessage
      id={'ClubLP.SubscriptionBenefitsNew.icon2'}
    />,
    img: clubiconnew2,
    alt: 'CLUB BENEFITS DISCOUNT'
  },
  {
    text: <FormattedMessage
      id={'ClubLP.SubscriptionBenefitsNew.icon3'}
    />,
    img: clubiconnew3,
    alt: 'CLUB BENEFITS PET ADVISOR'
  },
  {
    text: <FormattedMessage
      id={'ClubLP.SubscriptionBenefitsNew.icon4'}
    />,
    img: clubiconnew4,
    alt: 'CLUB BENEFITS PET ADVISOR'
  },
  {
    text: <FormattedMessage
      id={'ClubLP.SubscriptionBenefitsNew.icon5'}
    />,
    img: clubiconnew5,
    alt: 'CLUB BENEFITS PET ADVISOR'
  },
  process.env.REACT_APP_COUNTRY === 'RU'?
  {
    text: <FormattedMessage
      id={'ClubLP.SubscriptionBenefitsNew.icon6'}
    />,
    img: iconsix,
    alt: 'CLUB BENEFITS PET ADVISOR'
  }:{

    },
];

let clubListData = [
  {
    text: <FormattedMessage id="clubListData.tip1" />,
    img: nutrition,
    alt: 'CLUB BENEFITS PET ADVISOR'
  },
  {
    text: <FormattedMessage id="clubListData.tip2" />,
    img: gifticon,
    alt: 'CLUB BENEFITS DISCOUNT'
  },
  {
    text: <FormattedMessage id="clubListData.tip3" />,
    img: spetadviser,
    alt: 'CLUB BENEFITS PET ADVISOR'
  },
  {
    text: <FormattedMessage id="clubListData.tip4" />,
    img: auto,
    alt: 'CLUB BENEFITS PET ADVISOR'
  },
  {
    text: <FormattedMessage id="clubListData.tip5" />,
    img: shippingicon,
    alt: 'CLUB BENEFITS PET ADVISOR'
  }
];
if (process.env.REACT_APP_COUNTRY === 'RU') {
  clubListData.push({
    text: <FormattedMessage id="clubListData.tip6" />,
    img: iconsix,
    alt: 'CLUB BENEFITS PET ADVISOR'
  });
}
const GoodsDetailTabs = function (props) {
  const intl = useIntl();
  let hubGA = process.env.REACT_APP_HUB_GA == '1';
  let isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';
  let [goodsDetailTabsData, setGoodsDetailTabsData] = useState([]);
  let {
    goodsDescriptionDetailList,
    goodsType,
    activeTabIdxList,
    saleableFlag,
    displayFlag,
    detailRes,
    isClub,
    goodsDetailSpace
  } = props;
  console.log(goodsDetailSpace,"🐕")
  if (activeTabIdxList === undefined) {
    activeTabIdxList = isMobile ? [] : [0];
  }
  const [activeTabIdxLists, setActiveTabIdxLists] = useState(activeTabIdxList);
  useEffect(() => {
    // activeTabIdxList变化监听
    setActiveTabIdxLists(activeTabIdxList);
  }, [props.activeTabIdxList]);

  if (saleableFlag === undefined) {
    saleableFlag = detailRes?.goods?.saleableFlag;
  }
  if (displayFlag === undefined) {
    displayFlag = detailRes?.goods?.displayFlag;
  }
  if (goodsDescriptionDetailList === undefined) {
    goodsDescriptionDetailList = detailRes.goodsDescriptionDetailList;
  }

  const handleTabData = () => {
    const isVet = goodsType === 3; //vet todo 没有测试这种场景
    const sptGoods = goodsType === 0 || goodsType === 1;
    let tmpGoodsDescriptionDetailList = (goodsDescriptionDetailList || []).sort(
      (a, b) => a.sort - b.sort
    );

    let packProducts = ['BP04', 'BP07', 'BP06', 'BP05', 'BP02', 'BP01', 'BP03'];
    let goodsNo = location.pathname.split('-')[
      location.pathname.split('-').length - 1
    ];
    tmpGoodsDescriptionDetailList = tmpGoodsDescriptionDetailList
      .map((g) => {
        let ret = g.content;
        if (g.content && g.contentType === 'json') {
          try {
            const parsedContent = JSON.parse(g.content).map((el) => {
              // console.log(el, 'el----');
              // el = JSON.parse(el);
              // console.log(el, 'el----1111');
              return el;
            });
            // weshre导入的Description name，此值固定，不跟随国家而变动，以便根据三种情况，处理不同的展示方式
            // 1 特殊处理description tab【只取EretailShort/Prescriber Description进行展示】
            // 2 特殊处理benifit tab【拼接星星展示样式】
            // 3 特殊处理compositions tab【拼接每个desc换行展示】
            switch (g.descriptionName) {
              case 'Text':
                const shortDesc = parsedContent
                  .map((ele) => {
                    return ele['EretailShort Description'];
                  })
                  .filter((e) => e)[0];
                const prescriberDesc = parsedContent
                  .map((ele) => {
                    return ele['Prescriber Description'];
                  })
                  .filter((e) => e)[0];
                const blodDesc = parsedContent
                  .map((ele) => {
                    return ele['Prescriber Blod Description'];
                  })
                  .filter((e) => e)[0];
                // if (goodsType === 2) {
                if (packProducts.includes(goodsNo)) {
                  ret = `<p style="white-space: pre-line; font-weight: 400">${blodDesc}</p><p style="white-space: pre-line; font-weight: 400">${prescriberDesc}</p><p style="white-space: pre-line;">${shortDesc}</p>`;
                } else if (!saleableFlag && displayFlag) {
                  props.setState &&
                    props.setState({
                      descContent: isVet ? prescriberDesc : shortDesc
                    });

                  ret = null;
                } else if (isVet) {
                  ret = prescriberDesc
                    ? `<p style="white-space: pre-line;">${prescriberDesc}</p>`
                    : '';
                } else {
                  ret = shortDesc
                    ? `<p style="white-space: pre-line;">${shortDesc}</p>`
                    : '';
                }
                break;
              case 'Benefits':
                let tmpHtml = parsedContent
                  .map((ele) => {
                    return `<li>
          <div class="list_title">${Object.keys(ele)[0]}</div>
          <div class="list_item" style="padding-top: .9375rem; margin-bottom: 1.25rem;">${
            Object.values(ele)[0].Description
          }</div>
        </li>`;
                  })
                  .join('');
                ret = `<ul class="ui-star-list rc_proudct_html_tab2 list-paddingleft-2">
          ${tmpHtml}
        </ul>`;

                break;
              case 'Compositions':
                // if (goodsType === 2) {
                if (packProducts.includes(goodsNo)) {
                  ret = parsedContent
                    .map((ele, i) => {
                      return `<p><div class="title">${
                        Object.keys(ele)[0]
                      }</div></p><p>
            ${Object.values(Object.values(ele)[0])
              .map((el) => `<div class="content">${el}</div><p></p>`)
              .join('')}
          </p>`;
                    })
                    .join('');
                } else {
                  ret = parsedContent
                    .map((ele) => {
                      return `<p>
            <div class="content">${Object.values(ele)[0]}</div>
          </p>`;
                    })
                    .join('');
                }
                break;
              case 'Guide':
                console.log(parsedContent, 'parsedContent');
                ret = parsedContent[0]['Table']['Description'];
            }
          } catch (err) {
            console.log(111, err);
          }
        }
        g.displayName =
          g.translateList &&
          g.translateList[0] &&
          g.translateList[0].translateName;
        g.content = ret;
        return g;
      })
      .filter((e) => e.displayName && e.content);

    // 美国需临时加入一个tab
    if (process.env.REACT_APP_COUNTRY === 'US') {
      let COHORTPng = `${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/detail/COHORT-A_CLUB-BENEFITS_PET-ADVISOR.png`;
      let BENEFITS_WELCOMEPng = `${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/detail/CLUB-BENEFITS_WELCOME-BOX.png`;
      let BENEFITS_DISCOUNT = `${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/detail/CLUB-BENEFITS_DISCOUNT.png`;
      let BENEFITS_PRODUCTPng = `${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/detail/CLUB-BENEFITS_PRODUCT-RECOS.png`;
      let HOWTOJOINSHOPpng = `${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/detail/HOW-TO-JOIN-SHOP.png`;
      let HOWTOJOINAUTOSHIPpng = `${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/detail/HOW-TO-JOIN-AUTOSHIP.png`;
      let HOWTOJOINSCHEDULEpng = `${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/detail/HOW-TO-JOIN-SCHEDULE.png`;
      let HOWTOJOINENJOYpng = `${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/detail/HOW-TO-JOIN-ENJOY.png`;

      tmpGoodsDescriptionDetailList.push({
        displayName: 'Royal Canin Club',
        content:
          '<div class="row rc-margin-x--none flex-column-reverse flex-md-row"><div class="col-12 col-md-6 row rc-padding-x--none rc-margin-x--none rc-padding-top--lg--mobile"><div class="d-block d-md-flex align-items-center col-6 col-md-12 rc-padding-left--none"><img src=' +
          COHORTPng +
          ' alt="CLUB BENEFITS PET ADVISOR" class="m-auto rc-margin--none--desktop"><div class="rc-intro rc-padding-left--sm rc-margin-bottom--none text-center d-block d-md-none"><p style="text-align: left;"><strong>Royal Canin Pet Advisor Live </strong>- chat with veterinarians around the clock about your pet’s health, nutrition, behavior and more.</p></div><div class="rc-intro rc-padding-left--sm rc-margin-bottom--none text-center d-md-block d-none"><p style="text-align: left;"><strong>Royal Canin Pet Advisor Live </strong>- chat with veterinarians around the clock about your pet’s health, nutrition, behavior and more.</p></div></div><div class="rc-hidden align-items-center col-6 col-md-12 rc-padding-left--none"><img src=' +
          BENEFITS_WELCOMEPng +
          ' alt="CLUB BENEFITS DISCOUNT" class="m-auto rc-margin--none--desktop"><div class="rc-intro rc-padding-left--sm rc-margin-bottom--none text-center d-block d-md-none"><p style="text-align: left;"><strong>Specialty Welcome Box&nbsp;</strong>- with your first order, you’ll get an assortment of gifts to help you welcome your new pet home.</p></div><div class="rc-intro rc-padding-left--sm rc-margin-bottom--none text-center d-md-block d-none"><p style="text-align: left;"><strong>Specialty Welcome Box&nbsp;</strong>- with your first order, you’ll get an assortment of gifts to help you welcome your new pet home.</p></div></div><div class="d-block d-md-flex align-items-center col-6 col-md-12 rc-padding-left--none"><img src=' +
          BENEFITS_DISCOUNT +
          ' alt="CLUB BENEFITS DISCOUNT" class="m-auto rc-margin--none--desktop"><div class="rc-intro rc-padding-left--sm rc-margin-bottom--none text-center d-block d-md-none"><p style="text-align: left;"><strong>Special Savings + FREE Shipping </strong>- save 30% on your first order and another 5% on every autoship order.</p></div><div class="rc-intro rc-padding-left--sm rc-margin-bottom--none text-center d-md-block d-none"><p style="text-align: left;"><strong>Special Savings + FREE Shipping&nbsp;</strong>-&nbsp;save 30% on your first order and another 5% on every autoship order.</p></div></div><div class="d-block d-md-flex align-items-center col-6 col-md-12 rc-padding-left--none"><img src=' +
          BENEFITS_PRODUCTPng +
          ' alt="CLUB BENEFITS PRODUCT RECOS" class="m-auto rc-margin--none--desktop"><div class="rc-intro rc-padding-left--sm rc-margin-bottom--none text-center d-block d-md-none"><p style="text-align: left;"><strong>Expert Recommendations –</strong>&nbsp;receive recommendations for pet food and products as your pet grows.</p></div><div class="rc-intro rc-padding-left--sm rc-margin-bottom--none text-center d-md-block d-none"><p style="text-align: left;"><strong>Expert Recommendations –</strong>&nbsp;receive recommendations for pet food and products as your pet grows.</p></div></div></div><div class="col-12 col-md-6"><div class="rc-video-wrapper"><iframe src="https://www.youtube.com/embed/FYwO1fiYoa8?enablejsapi=1&amp;origin=https%3A%2F%2Fshop.royalcanin.com" title="making a better world for pets" allowfullscreen="" frameborder="0"></iframe></div></div></div><div class="arrow-img-columns rc-max-width--lg rc-padding-y--md rc-padding-y--xl--mobile rc-padding-x--md--mobile"><div class="rc-margin-bottom--md"><h2 class="rc-beta">How to Join Royal Canin Club</h2></div><div class="rc-card-grid rc-match-heights rc-card-grid--fixed text-center rc-content-v-middle"><div class="rc-grid"><div><h3 class="rc-intro height-50 rc-margin-bottom--xs rc-padding-bottom--xs"><strong>GRAB YOUR PRODUCTS</strong></h3><img class="mx-auto rc-margin-bottom--xs" alt="HOW TO JOIN SHOP" src=' +
          HOWTOJOINSHOPpng +
          '><div class="inherit-fontsize rc-body rc-padding-top--xs children-nomargin"><p>Find your handpicked nutrition products in your cart.</p></div></div></div><div class="rc-grid"><div><h3 class="rc-intro height-50 rc-margin-bottom--xs rc-padding-bottom--xs"><strong>CHOOSE AUTOMATIC SHIPPING</strong></h3><img class="mx-auto rc-margin-bottom--xs" alt="HOW TO JOIN AUTOSHIP" src=' +
          HOWTOJOINAUTOSHIPpng +
          '><div class="inherit-fontsize rc-body rc-padding-top--xs children-nomargin"><p>Set your automatic shipping schedule and input your payment method.</p></div></div></div><div class="rc-grid"><div><h3 class="rc-intro height-50 rc-margin-bottom--xs rc-padding-bottom--xs"><strong>GET WHAT YOUR PET NEEDS, WHEN YOU NEED IT</strong></h3><img class="mx-auto rc-margin-bottom--xs" alt="HOW TO JOIN SCHEDULE" src=' +
          HOWTOJOINSCHEDULEpng +
          '><div class="inherit-fontsize rc-body rc-padding-top--xs children-nomargin"><p>Receive your product automatically based on your schedule. Change or cancel at any time.</p></div></div></div><div class="rc-grid"><div><h3 class="rc-intro height-50 rc-margin-bottom--xs rc-padding-bottom--xs"><strong>ENJOY YOUR PERKS</strong></h3><img class="mx-auto rc-margin-bottom--xs" alt="HOW TO JOIN ENJOY" src=' +
          HOWTOJOINENJOYpng +
          '><div class="inherit-fontsize rc-body rc-padding-top--xs children-nomargin"><p>Get your exclusive <strong>Royal Canin Club</strong> perks, including access to Royal Canin Pet Advisor Live.</p></div></div></div></div></div>'
      });
    }
    // if (process.env.REACT_APP_COUNTRY === 'RU' && saleableFlag && sptGoods) {
    //   let mixfeeding = `${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/detail/Mixfeeding.png`;
    //   let MixfeedingFood = `${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/detail/Mixfeeding-Food.png`;
    //   tmpGoodsDescriptionDetailList.push({
    //     displayName: 'Смешанное кормление',
    //     content:
    //       '<div class="content-asset"><div class="rc-layout-container rc-two-column"><div class="rc-column"><h2 class="rc-alpha rc-margin-bottom--xs">СМЕШАННОЕ КОРМЛЕНИЕ</h2><span class="rc-beta">Предложите своему питомцу самое лучшее – в сочетании двух разных текстур</span><p></p><p>Смешанное кормление – это система питания, которая подразумевает включение в рацион животного как сухих, так и влажных продуктов. Каждая из этих категорий полноценна и сбалансированна и может применяться самостоятельно, но их сочетание – отличный способ дать питомцу преимущества каждого типа продуктов.</p><p></p><img class=" lazyloaded" src=' +
    //       mixfeeding +
    //       ' alt="image"></div> <div class="rc-column"><div class="rc-card card-border-style"><img class=" lazyloaded" src=' +
    //       MixfeedingFood +
    //       ' alt="image"></div></div></div></div>'
    //   });
    // }
    props.setState && props.setState({ tmpGoodsDescriptionDetailList });
    setGoodsDetailTabsData(tmpGoodsDescriptionDetailList);
  };
  const changeTab = ({ idx, type, ele }) => {
    if (type === 'switch') {
      // 切换其他，先删除所有，再添加本身
      activeTabIdxList = [idx];
    } else if (type === 'toggle') {
      // 如果有本身，则删除，否则添加
      const i = activeTabIdxLists.indexOf(idx);
      if (i > -1) {
        activeTabIdxList.splice(i, 1);
      } else {
        activeTabIdxList.push(idx);
      }
    }
    setActiveTabIdxLists(activeTabIdxList);
    props.setState && props.setState({ activeTabIdxList });

    hubGA &&
      dataLayer.push({
        event: 'pdpTabsClick',
        pdpTabsClickTabName: ele?.descriptionName
      });
  };

  useEffect(() => {
    handleTabData();
  }, []);

  //club new subscribtion每次提交的时候记得把true改为false
  const Show = true;

  //判断猫狗
  const [spaceShow,setSpaceShow]=useState('1');

  const getSpeciesId = (item) => {
    if (process.env.REACT_APP_COUNTRY == 'DE') {
      return getDeSpecies(item)[0] == 'Hund' ? '2' : '1';
    } else {
      return (
        {
          1158: '1', //Russia Cat SPT food
          1159: '1', //Russia Cat VET Food
          1160: '2', //Russia Dog SPT food
          1161: '2', //Russia Dog VET food
          1165: '1', //Turkey Cat SPT food
          1166: '1', //Turkey Cat VET Food
          1167: '2', //Turkey Dog SPT food
          1168: '2', //Turkey Dog VET food
          1133: '2', //France Dog SPT food
          1134: '1', //France Cat SPT food
          1153: '2', //France Dog VET food
          1154: '1', //France Cat VET Food
          1172: '1', //US Cat SPT food
          1173: '1', //US Cat VET food
          1174: '2', //US Dog SPT food
          1175: '2' //US Dog VET food
        }[item] || ''
      );
    }
  };

  useEffect(()=>{
    setSpaceShow(getSpeciesId(goodsDetailSpace))
    console.log(spaceShow,"🤭🤭")
  },[])

  console.log(getSpeciesId(goodsDetailSpace),"🤭")

  const createMarkup = (text) => ({ __html: text });
  const headerHeight = document.querySelector('.rc-header')?.offsetHeight;
  return isMobile ? (
    <div>
      {goodsDetailTabsData.map((ele, index) => (
        <React.Fragment key={index} id="GoodsDetailTabs">
          <dl className="goodsdetailtabs-item-mobile">
            <div
              className={`rc-list__accordion-item test-color
        ${activeTabIdxLists.includes(index) ? 'showItem' : 'hiddenItem'}`}
            >
              <div
                className="rc-list__header d-flex justify-content-between text-uppercase"
                onClick={changeTab.bind(null, {
                  idx: index,
                  type: 'toggle',
                  ele
                })}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: ele.displayName
                  }}
                />
                <span
                  className={`rc-vertical-align icon-change ${
                    activeTabIdxLists.includes(index)
                      ? 'rc-icon rc-up rc-brand1'
                      : 'rc-icon rc-down rc-iconography'
                  }`}
                  style={{ right: '1rem', height: '28px' }}
                ></span>
              </div>
              <div className={`rc-list__content`} style={{ overflowX: 'auto' }}>
                <p
                  dangerouslySetInnerHTML={{
                    __html: ele.content
                  }}
                />
              </div>
            </div>
          </dl>
        </React.Fragment>
      ))}
      {isClub ? (
        <>
          <dl
            className="goodsdetailtabs-item-mobile"
            style={{ position: 'relative' }}
          >
            <div
              id="j-details-for-club"
              style={{ position: 'absolute', top: -headerHeight }}
            ></div>
            <div
              className={`rc-list__accordion-item test-color
        ${
          activeTabIdxLists.includes(goodsDetailTabsData.length)
            ? 'showItem'
            : 'hiddenItem'
        }`}
            >
              <div
                className="rc-list__header d-flex justify-content-between text-uppercase"
                onClick={changeTab.bind(null, {
                  idx: goodsDetailTabsData.length,
                  type: 'toggle',
                  ele: { descriptionName: 'club' }
                })}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: intl.messages['club']
                  }}
                />
                <span
                  className={`rc-vertical-align icon-change ${
                    activeTabIdxLists.includes(goodsDetailTabsData.length)
                      ? 'rc-icon rc-up rc-brand1'
                      : 'rc-icon rc-down rc-iconography'
                  }`}
                  style={{ right: '1rem', height: '28px' }}
                />
              </div>
              <div
                className={`rc-list__content`}
                style={{ overflow: 'hidden' }}
              >
                <p>
                  {Show ? null : (
                    <>
                      <div className="row rc-margin-x--none flex-column-reverse flex-md-row">
                        <div className="col-12 col-md-6 row rc-padding-x--none rc-margin-x--none rc-padding-top--lg--mobile">
                          {clubListData.map((item, i) => (
                            <div
                              className="d-flex align-items-center col-12 col-md-12 rc-padding-left--none"
                              key={i}
                            >
                              <div style={{ width: '80px' }}>
                                <LazyLoad>
                                  <img
                                    src={item.img}
                                    alt={item.alt}
                                    className="m-auto rc-margin--none--desktop"
                                  />
                                </LazyLoad>
                              </div>
                              <div className="rc-intro rc-padding-left--sm rc-margin-bottom--none text-center value-proposition__text">
                                <p style={{ textAlign: 'left' }}>{item.text}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="rc-video-wrapper">
                            <img src={landingBanner} />
                          </div>
                        </div>
                      </div>
                      <HowItWorks />
                    </>
                  )}

                  {Show ? (
                    <>
                      <div
                        className="clubdetailsmobile"
                        style={pdpmobilebackgrounddog}
                      >
                        <div className="row rc-margin-x--none">
                          <div className="rc-full-width">
                            <div className="experience-component experience-assets-contentBlock">
                              <div
                                className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile"
                                style={{ marginBottom: '0px' }}
                              >
                                <div className="rc-beta  rc-margin-bottom--sm rc-margin-bottom--lg--mobile">
                                  <p
                                    style={{
                                      fontSize: '1em',
                                      textAlign: 'center',
                                      fontWeight: 'bold'
                                    }}
                                  >
                                    GIVE YOUR PET A<br />
                                    COMPLETE HEALTH SOLUTION,
                                    <br />
                                    BY SUBSCRIPTION
                                  </p>
                                  <p
                                    style={{
                                      fontSize: '0.7em',
                                      textAlign: 'center'
                                    }}
                                  >
                                    Free from engagement
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: 'column'
                          }}
                        >
                          <div
                            className={`rc-list__content`}
                            style={{ overflow: 'hidden' }}
                          >
                            <p>
                              <div className="row rc-margin-x--none flex-column-reverse flex-md-row">
                                <div className="col-12 col-md-6 row rc-padding-x--none rc-margin-x--none rc-padding-top--lg--mobile">
                                  {clubListDataNew.map((item, i) => (
                                    <div
                                      className="d-flex align-items-center col-12 col-md-12 rc-padding-left--none"
                                      key={i}
                                    >
                                      <div style={{ width: '80px' }}>
                                        <LazyLoad>
                                          <img
                                            src={item.img}
                                            alt={item.alt}
                                            className="m-auto rc-margin--none--desktop"
                                          />
                                        </LazyLoad>
                                      </div>
                                      <div className="rc-intro rc-padding-left--sm rc-margin-bottom--none text-center value-proposition__text">
                                        <p style={{ textAlign: 'left' }}>
                                          {item.text}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </p>
                          </div>
                          <div>
                            <SubscriptionBenefitsBanner
                              SubscriptionItem={SubscriptionItems}
                            />
                          </div>
                        </div>
                      </div>
                      <HowItWorksNew />
                    </>
                  ) : null}
                </p>
              </div>
            </div>
          </dl>
        </>
      ) : null}
    </div>
  ) : (
    <div
      id="GoodsDetailTabs"
      className="rc-max-width--xl rc-padding-x--sm"
      style={{ position: 'relative' }}
    >
      <div
        id="j-details-for-club"
        style={{ position: 'absolute', top: -headerHeight }}
      ></div>
      <div className="rc-match-heights rc-content-h-middle rc-reverse-layout">
        <div>
          <div className="rc-border-bottom rc-border-colour--interface">
            <nav className="rc-fade--x">
              <ul
                className="rc-scroll--x rc-list rc-list--inline rc-list--align rc-list--blank"
                role="tablist"
              >
                {goodsDetailTabsData.map((ele, index) => (
                  <li key={index}>
                    <button
                      className="rc-tab rc-btn rounded-0 border-top-0 border-right-0 border-left-0"
                      data-toggle={`tab__panel-${index}`}
                      aria-selected={
                        activeTabIdxLists.includes(index) ? 'true' : 'false'
                      }
                      role="tab"
                      onClick={changeTab.bind(null, {
                        idx: index,
                        type: 'switch',
                        ele
                      })}
                    >
                      {ele.displayName}
                    </button>
                  </li>
                ))}
                {isClub ? (
                  <li key={goodsDetailTabsData.length}>
                    <button
                      className="j-details-for-club rc-tab rc-btn rounded-0 border-top-0 border-right-0 border-left-0"
                      data-toggle={`tab__panel-${goodsDetailTabsData.length}`}
                      aria-selected={
                        activeTabIdxLists.includes(goodsDetailTabsData.length)
                          ? 'true'
                          : 'false'
                      }
                      role="tab"
                      onClick={changeTab.bind(null, {
                        idx: goodsDetailTabsData.length,
                        type: 'switch',
                        ele: { descriptionName: 'club' }
                      })}
                    >
                      <FormattedMessage id="club" />
                    </button>
                  </li>
                ) : null}
              </ul>
            </nav>
          </div>
          <div className="rc-tabs tabs-detail" style={{ marginTop: '40px' }}>
            {goodsDetailTabsData.map((ele, i) => (
              <div
                id={`tab__panel-${i}`}
                key={i}
                className="rc-tabs__content__single clearfix benefits ingredients rc-showhide"
                aria-expanded={activeTabIdxLists.includes(i) ? 'true' : 'false'}
              >
                <div className={`block ${ele.descriptionName}`}>
                  <p
                    className="content rc-scroll--x detail-content-tabinfo"
                    style={{ marginBottom: '4rem' }}
                    dangerouslySetInnerHTML={createMarkup(ele.content)}
                  />
                </div>
              </div>
            ))}
            {isClub ? (
              <div
                id={`tab__panel-${goodsDetailTabsData.length}`}
                key={goodsDetailTabsData.length}
                className="rc-tabs__content__single clearfix benefits ingredients rc-showhide"
                aria-expanded={
                  activeTabIdxLists.includes(goodsDetailTabsData.length)
                    ? 'true'
                    : 'false'
                }
              >
                {Show ? null : (
                  <div className="block">
                    <div className="row rc-margin-x--none flex-column-reverse flex-md-row">
                      <div className="col-12 col-md-6 row rc-padding-x--none rc-margin-x--none rc-padding-top--lg--mobile">
                        {clubListData.map((item) => (
                          <div className="d-md-flex align-items-center col-12 col-md-12 rc-padding-left--none">
                            <img
                              src={item.img}
                              alt={item.alt}
                              className="m-auto rc-margin--none--desktop"
                            />
                            <div className="rc-intro rc-padding-left--sm rc-margin-bottom--none text-center d-flex align-items-center h-100">
                              <p className="mb-0" style={{ textAlign: 'left' }}>
                                {item.text}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="rc-video-wrapper">
                          <img src={landingBanner} />
                          {/* <iframe
                          src="https://www.youtube.com/embed/FYwO1fiYoa8?enablejsapi=1&amp;origin=https%3A%2F%2Fshop.royalcanin.com"
                          allowfullscreen=""
                          frameborder="0"
                          title="making a better world for pets"
                        /> */}
                        </div>
                      </div>
                    </div>
                    <HowItWorks />
                  </div>
                )}
                {Show ? (
                  <div>
                    <div style={spaceShow == "1"?pdpbackgroundcats:pdpbackgrounddogs}>
                      <div className="row rc-margin-x--none">
                        <div className="rc-full-width">
                          <div className="experience-component experience-assets-contentBlock">
                            <div
                              className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile"
                              style={{ marginBottom: '0px' }}
                            >
                              <div className="rc-beta  rc-margin-bottom--sm rc-margin-bottom--lg--mobile">
                                <p
                                  style={{
                                    fontSize: '1.1em'
                                  }}
                                >
                                  <FormattedMessage
                                    id="ClubLP.LongBanner.title"
                                    values={{ val1: <br />, val2: <br /> }}
                                  ></FormattedMessage>
                                </p>
                                <p style={{ fontSize: '0.7em' }}>
                                  <FormattedMessage id="ClubLP.LongBanner.content2" />
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        <div style={{ width: '50vw' }}>
                          <div className="col-12 col-md-6 row rc-padding-x--none rc-margin-x--none rc-padding-top--lg--mobile">
                            {clubListDataNew.map((item) => (
                              <div className="d-md-flex align-items-center col-12 col-md-12 rc-padding-left--none">
                                <img
                                  src={item.img}
                                  alt={item.alt}
                                  className="m-auto rc-margin--none--desktop"
                                />
                                <div className="rc-intro rc-padding-left--sm rc-margin-bottom--none text-center d-flex align-items-center h-100">
                                  <p
                                    className="mb-0"
                                    style={{ textAlign: 'left', width: '22vw' }}
                                  >
                                    {item.text}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div style={{ width: '100vw', marginTop: '-5vh' }}>
                          <SubscriptionBenefitsBanner
                            SubscriptionItem={SubscriptionItems}
                          />
                        </div>
                      </div>
                    </div>
                    <HowItWorksNew />
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoodsDetailTabs;
