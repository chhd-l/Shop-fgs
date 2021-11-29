import React, { useEffect, useState } from 'react';
import { formatMoney, getDeviceType } from '@/utils/utils';
import { FormattedMessage, injectIntl, useIntl } from 'react-intl';
import LazyLoad from 'react-lazyload';

import mixFeedingIcon from './image/mixFeeding_icon.png';
import iconsixnew from './image/iconsixnew.png';
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
import pdpbackgroundcatru from './image/goodsdeatailtabbackgroundcatru.png';
import pdpbackgroundmobiledog from './image/goodsdeatailsbackgroundmobile.png';
import pdpbackgroundmobiledogfr from './image/goodsdeatailsbackgroundmobilefr.png';
import pdpbackgroundmobiledogtr from './image/goodsdeatailsbackgroundmobiletr.png';
import pdpbackgroundmobilecat from './image/goodsdeatailsbackgroundmobilecat.png';
import pdpbackgroundmobilecattr from './image/goodsdeatailsbackgroundmobilecattr.png';
import pdpbackgroundmobilecatfr from './image/goodsdeatailsbackgroundmobilecatfr.png';
import pdpbackgrounddog from './image/goodsdetailtabbackgrounddogru.png';
import pdpbackgorunddogother from './image/goodsdeatailtabbackgrounddog.png';
import pdpbackgroundcat from './image/goodsdeatailtabbackgroundcat.png';
import auto from './image/auto@2x.png';
import clubiconnew1 from './image/clubiconnew1.png';
import clubiconnew2 from './image/clubiconnew2.png';
import discountnewtr from './image/discountnewtr.png';
import clubiconnew3 from './image/clubiconnew3.png';
import clubiconnew4 from './image/clubiconnew4.png';
import benefitsthree from '../../views/ClubLandingPageNew/Components/LongBanner/image/benefitsthree2.png';

import benefitsonedog from './image/benefitsonedog.png';
import benefitstwodog from './image/benefitstwodog.png';
import benefitsonecat from './image/benefitsonecat.png';
import benefitstwocat from './image/benefitstwocat.png';

import ruhowitworksnewdog1 from './HowitWorksimage/ruhowitworksnewdog1.png';
import ruhowitworksnewdog2 from './HowitWorksimage/ruhowitworksnewdog2.png';
import ruhowitworksnewdog3 from './HowitWorksimage/ruhowitworksnewdog3.png';
import ruhowitworksnewdog4 from './HowitWorksimage/ruhowitworksnewdog4.png';
import ruhowitworksnewcat1 from './HowitWorksimage/ruhowitworksnewcat1.png';
import ruhowitworksnewcat2 from './HowitWorksimage/ruhowitworksnewcat2.png';
import ruhowitworksnewcat3 from './HowitWorksimage/ruhowitworksnewcat3.png';
import ruhowitworksnewcat4 from './HowitWorksimage/ruhowitworksnewcat4.png';
import ruhowitworknewmobilecat1 from './HowitWorksimage/ruhowitworknewmobilecat1.png';
import ruhowitworknewmobilecat2 from './HowitWorksimage/ruhowitworknewmobilecat2.png';
import ruhowitworknewmobilecat3 from './HowitWorksimage/ruhowitworknewmobilecat3.png';
import ruhowitworknewmobilecat4 from './HowitWorksimage/ruhowitworknewmobilecat4.png';
import ruhowitworknewmobiledog1 from './HowitWorksimage/ruhowitworknewmobiledog1.png';
import ruhowitworknewmobiledog2 from './HowitWorksimage/ruhowitworknewmobiledog2.png';
import ruhowitworknewmobiledog3 from './HowitWorksimage/ruhowitworknewmobiledog3.png';
import ruhowitworknewmobiledog4 from './HowitWorksimage/ruhowitworknewmobiledog4.png';

import frhowitworksnewdog1 from './HowitWorksimage/frhowitworksnewdog1.png';
import frhowitworksnewdog2 from './HowitWorksimage/frhowitworksnewdog2.png';
import frhowitworksnewdog3 from './HowitWorksimage/frhowitworksnewdog3.png';
import frhowitworksnewdog4 from './HowitWorksimage/frhowitworksnewdog4.png';
import frhowitworksnewcat1 from './HowitWorksimage/frhowitworksnewcat1.png';
import frhowitworksnewcat2 from './HowitWorksimage/frhowitworksnewcat2.png';
import frhowitworksnewcat3 from './HowitWorksimage/frhowitworksnewcat3.png';
import frhowitworksnewcat4 from './HowitWorksimage/frhowitworksnewcat4.png';
import frhowitworknewmobilecat1 from './HowitWorksimage/frhowitworknewmobilecat1.png';
import frhowitworknewmobilecat2 from './HowitWorksimage/frhowitworknewmobilecat2.png';
import frhowitworknewmobilecat3 from './HowitWorksimage/frhowitworknewmobilecat3.png';
import frhowitworknewmobilecat4 from './HowitWorksimage/frhowitworknewmobilecat4.png';
import frhowitworknewmobiledog1 from './HowitWorksimage/frhowitworknewmobiledog1.png';
import frhowitworknewmobiledog2 from './HowitWorksimage/frhowitworknewmobiledog2.png';
import frhowitworknewmobiledog3 from './HowitWorksimage/frhowitworknewmobiledog3.png';
import frhowitworknewmobiledog4 from './HowitWorksimage/frhowitworknewmobiledog4.png';

const pdpmobilebackgrounddog = {
  backgroundImage: `url(${pdpbackgroundmobiledog})`,
  overflow: 'hidden',
  backgroundSize: 'cover'
};

const pdpmobilebackgrounddogtr = {
  backgroundImage: `url(${pdpbackgroundmobiledogtr})`,
  overflow: 'hidden',
  backgroundSize: 'cover'
};
const pdpmobilebackgrounddogfr = {
  backgroundImage: `url(${pdpbackgroundmobiledogfr})`,
  overflow: 'hidden',
  backgroundSize: 'cover'
};

const pdpbackgroundmobilecats = {
  backgroundImage: `url(${pdpbackgroundmobilecat})`,
  overflow: 'hidden',
  backgroundSize: 'cover'
};

const pdpbackgroundmobilecatstr = {
  backgroundImage: `url(${pdpbackgroundmobilecattr})`,
  overflow: 'hidden',
  backgroundSize: 'cover'
};

const pdpbackgroundmobilecatsfr = {
  backgroundImage: `url(${pdpbackgroundmobilecatfr})`,
  overflow: 'hidden',
  // backgroundSize: 'cover'
  backgroundSize: '100% 140%'
};

const pdpbackgrounddogs = {
  backgroundImage: `url(${
    window.__.env.REACT_APP_COUNTRY === 'ru'
      ? pdpbackgrounddog
      : pdpbackgorunddogother
  })`,
  height: '800px',
  backgroundSize: 'cover',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column'
};

const pdpbackgroundcats = {
  backgroundImage: `url(${
    window.__.env.REACT_APP_COUNTRY === 'ru'
      ? pdpbackgroundcatru
      : pdpbackgroundcat
  })`,
  height: '700px',
  backgroundSize: 'cover',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column'
};

let clubListDataNew = [
  {
    text: <FormattedMessage id={'ClubLP.SubscriptionBenefitsNew.icon1'} />,
    img: clubiconnew1,
    alt: 'CLUB BENEFITS PET ADVISOR'
  },
  {
    text: <FormattedMessage id={'ClubLP.SubscriptionBenefitsNew.icon2'} />,
    img: window.__.env.REACT_APP_COUNTRY == 'tr' ? discountnewtr : clubiconnew2,
    alt: 'CLUB BENEFITS DISCOUNT'
  },
  {
    text: <FormattedMessage id={'ClubLP.SubscriptionBenefitsNew.icon3'} />,
    img: clubiconnew3,
    alt: 'CLUB BENEFITS PET ADVISOR'
  },
  {
    text: <FormattedMessage id={'ClubLP.SubscriptionBenefitsNew.icon4'} />,
    img: clubiconnew4,
    alt: 'CLUB BENEFITS PET ADVISOR'
  },
  {
    text: (
      <FormattedMessage
        id={'ClubLP.SubscriptionBenefitsNew.icon5'}
        values={{ val1: null, val2: null }}
      />
    ),
    img: phoneicon,
    alt: 'CLUB BENEFITS PET ADVISOR'
  },
  window.__.env.REACT_APP_COUNTRY === 'ru'
    ? {
        text: (
          <FormattedMessage
            id={'ClubLP.SubscriptionBenefitsNew.icon6'}
            values={{
              val: (
                <a
                  onClick={() => {
                    return false;
                    // window.PetStoryWC.start();
                  }}
                  style={{
                    textDecoration: 'underline',
                    color: '#e3001b',
                    cursor: 'pointer'
                  }}
                >
                  PetStory
                </a>
              )
            }}
          />
        ),
        img: iconsixnew,
        alt: 'CLUB BENEFITS PET ADVISOR'
      }
    : {}
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
if (window.__.env.REACT_APP_COUNTRY === 'ru') {
  clubListData.push({
    text: <FormattedMessage id="clubListData.tip6" />,
    img: iconsix,
    alt: 'CLUB BENEFITS PET ADVISOR'
  });
}
const GoodsDetailTabs = function (props) {
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
  //判断猫狗
  const getSpeciesId = (item) => {
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
  };
  const LogoShows = {
    logo: <></>
  };
  //Ru Image
  const RuhowitworksnewLists = [
    {
      HowitworksStep:
        getSpeciesId(goodsDetailSpace) == '1'
          ? ruhowitworksnewcat1
          : ruhowitworksnewdog1
    },
    {
      HowitworksStep:
        getSpeciesId(goodsDetailSpace) == '1'
          ? ruhowitworksnewcat2
          : ruhowitworksnewdog2
    },
    {
      HowitworksStep:
        getSpeciesId(goodsDetailSpace) == '1'
          ? ruhowitworksnewcat3
          : ruhowitworksnewdog3
    },
    {
      HowitworksStep:
        getSpeciesId(goodsDetailSpace) == '1'
          ? ruhowitworksnewcat4
          : ruhowitworksnewdog4
    }
  ];

  const RuhowitworksnewListmobiles = [
    {
      HowitworksStep:
        getSpeciesId(goodsDetailSpace) == '1'
          ? ruhowitworknewmobilecat1
          : ruhowitworknewmobiledog1
    },
    {
      HowitworksStep:
        getSpeciesId(goodsDetailSpace) == '1'
          ? ruhowitworknewmobilecat2
          : ruhowitworknewmobiledog2
    },
    {
      HowitworksStep:
        getSpeciesId(goodsDetailSpace) == '1'
          ? ruhowitworknewmobilecat3
          : ruhowitworknewmobiledog3
    },
    {
      HowitworksStep:
        getSpeciesId(goodsDetailSpace) == '1'
          ? ruhowitworknewmobilecat4
          : ruhowitworknewmobiledog4
    }
  ];

  //Fr Image
  const FrhowitworksnewLists = [
    {
      HowitworksStep:
        getSpeciesId(goodsDetailSpace) == '1'
          ? frhowitworksnewcat1
          : frhowitworksnewdog1
    },
    {
      HowitworksStep:
        getSpeciesId(goodsDetailSpace) == '1'
          ? frhowitworksnewcat2
          : frhowitworksnewdog2
    },
    {
      HowitworksStep:
        getSpeciesId(goodsDetailSpace) == '1'
          ? frhowitworksnewcat3
          : frhowitworksnewdog3
    },
    {
      HowitworksStep:
        getSpeciesId(goodsDetailSpace) == '1'
          ? frhowitworksnewcat4
          : frhowitworksnewdog4
    }
  ];

  const FrhowitworksnewListmobiles = [
    {
      HowitworksStep:
        getSpeciesId(goodsDetailSpace) == '1'
          ? frhowitworknewmobilecat1
          : frhowitworknewmobiledog1
    },
    {
      HowitworksStep:
        getSpeciesId(goodsDetailSpace) == '1'
          ? frhowitworknewmobilecat2
          : frhowitworknewmobiledog2
    },
    {
      HowitworksStep:
        getSpeciesId(goodsDetailSpace) == '1'
          ? frhowitworknewmobilecat3
          : frhowitworknewmobiledog3
    },
    {
      HowitworksStep:
        getSpeciesId(goodsDetailSpace) == '1'
          ? frhowitworknewmobilecat4
          : frhowitworknewmobiledog4
    }
  ];

  const SubTitles = {
    title:
      getSpeciesId(goodsDetailSpace) == '1' ? (
        <FormattedMessage
          id="ClubLP.LongBanner.SubscriptionTitle.tab.cat"
          values={{ val: <br /> }}
        />
      ) : (
        <FormattedMessage
          id="ClubLP.LongBanner.SubscriptionTitle.tab.dog"
          values={{ val: <br /> }}
        />
      )
  };

  const SubscriptionItems = [
    {
      SubscriptionImg:
        getSpeciesId(goodsDetailSpace) == '1' ? benefitsonecat : benefitsonedog,
      SubscriptionTitle: (
        <a style={{ fontWeight: 'bold', fontSize: '17px' }}>
          <FormattedMessage
            id="ClubLP.LongBanner.SubscriptionTitle1.new"
            values={{ val1: <br /> }}
          />
        </a>
      )
    },
    {
      SubscriptionImg:
        getSpeciesId(goodsDetailSpace) == '1' ? benefitstwocat : benefitstwodog,
      SubscriptionTitle: (
        <a style={{ fontWeight: 'bold', fontSize: '17px' }}>
          <FormattedMessage
            id="ClubLP.LongBanner.SubscriptionTitle2.new"
            values={{ val: <br /> }}
          />
        </a>
      )
    },
    {
      SubscriptionImg: benefitsthree,
      SubscriptionTitle: (
        <a style={{ fontWeight: 'bold', fontSize: '17px' }}>
          <FormattedMessage
            id="ClubLP.LongBanner.SubscriptionTitle3.new"
            values={{ val: <br /> }}
          />
        </a>
      )
    }
  ];
  const intl = useIntl();
  let hubGA = window.__.env.REACT_APP_HUB_GA == '1';
  let isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';
  let [goodsDetailTabsData, setGoodsDetailTabsData] = useState([]);
  console.log(goodsDetailSpace, '🐕※');
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
    let goodsNo =
      location.pathname.split('-')[location.pathname.split('-').length - 1];
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
    if (window.__.env.REACT_APP_COUNTRY === 'us') {
      let COHORTPng = `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/detail/COHORT-A_CLUB-BENEFITS_PET-ADVISOR_COPY2.png`;
      let BENEFITS_WELCOMEPng = `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/detail/CLUB-BENEFITS_WELCOME-BOX.png`;
      let BENEFITS_DISCOUNT = `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/detail/CLUB-BENEFITS_DISCOUNT.png`;
      let BENEFITS_PRODUCTPng = `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/detail/CLUB-BENEFITS_PRODUCT-RECOS.png`;
      let HOWTOJOINSHOPpng = `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/detail/HOW-TO-JOIN-SHOP.png`;
      let HOWTOJOINAUTOSHIPpng = `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/detail/HOW-TO-JOIN-AUTOSHIP.png`;
      let HOWTOJOINSCHEDULEpng = `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/detail/HOW-TO-JOIN-SCHEDULE.png`;
      let HOWTOJOINENJOYpng = `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/detail/HOW-TO-JOIN-ENJOY.png`;

      tmpGoodsDescriptionDetailList.push({
        displayName: 'Royal Canin Club',
        content:
          '<div class="row rc-margin-x--none flex-column-reverse flex-md-row"><div class="col-12 col-md-6 row rc-padding-x--none rc-margin-x--none rc-padding-top--lg--mobile"><div class="d-block d-md-flex align-items-center col-6 col-md-12 rc-padding-left--none"><img src=' +
          BENEFITS_PRODUCTPng +
          ' alt="CLUB BENEFITS PET ADVISOR" class="m-auto rc-margin--none--desktop"><div class="rc-intro rc-padding-left--sm rc-margin-bottom--none text-center d-block d-md-none"><p style="text-align: left;"><strong>Expert Guidance </strong>- Receive nutritional recommendations on Royal Canin food and products as your pet grows</p></div><div class="rc-intro rc-padding-left--sm rc-margin-bottom--none text-center d-md-block d-none"><p style="text-align: left;"><strong>Expert Guidance </strong>- Receive nutritional recommendations on Royal Canin food and products as your pet grows</p></div></div><div class="rc-hidden align-items-center col-6 col-md-12 rc-padding-left--none"><img src=' +
          BENEFITS_WELCOMEPng +
          ' alt="CLUB BENEFITS DISCOUNT" class="m-auto rc-margin--none--desktop"><div class="rc-intro rc-padding-left--sm rc-margin-bottom--none text-center d-block d-md-none"><p style="text-align: left;"><strong>Specialty Welcome Box&nbsp;</strong>- with your first order, you’ll get an assortment of gifts to help you welcome your new pet home.</p></div><div class="rc-intro rc-padding-left--sm rc-margin-bottom--none text-center d-md-block d-none"><p style="text-align: left;"><strong>Specialty Welcome Box&nbsp;</strong>- with your first order, you’ll get an assortment of gifts to help you welcome your new pet home.</p></div></div><div class="d-block d-md-flex align-items-center col-6 col-md-12 rc-padding-left--none"><img src=' +
          BENEFITS_DISCOUNT +
          ' alt="CLUB BENEFITS DISCOUNT" class="m-auto rc-margin--none--desktop"><div class="rc-intro rc-padding-left--sm rc-margin-bottom--none text-center d-block d-md-none"><p style="text-align: left;"><strong>Special Savings </strong>- Save 30% off your first purchase through Royal Canin Club, and 5% off every autoship order. Plus, free shipping –– with no minimum purchase</p></div><div class="rc-intro rc-padding-left--sm rc-margin-bottom--none text-center d-md-block d-none"><p style="text-align: left;"><strong>Special Savings&nbsp;</strong>-&nbsp;Save 30% off your first purchase through Royal Canin Club, and 5% off every autoship order. Plus, free shipping –– with no minimum purchase</p></div></div><div class="d-block d-md-flex align-items-center col-6 col-md-12 rc-padding-left--none"><img src=' +
          COHORTPng +
          ' alt="CLUB BENEFITS PRODUCT RECOS" class="m-auto rc-margin--none--desktop"><div class="rc-intro rc-padding-left--sm rc-margin-bottom--none text-center d-block d-md-none"><p style="text-align: left;"><strong>Royal Canin Advisor –</strong>&nbsp;Like a coach for everything related to your pet’s nutrition, your Royal Canin Advisor can help with diet recommendations and expert feeding advice, updates on products, and more</p></div><div class="rc-intro rc-padding-left--sm rc-margin-bottom--none text-center d-md-block d-none"><p style="text-align: left;"><strong>Royal Canin Advisor –</strong>&nbsp;Like a coach for everything related to your pet’s nutrition, your Royal Canin Advisor can help with diet recommendations and expert feeding advice, updates on products, and more</p></div></div></div><div class="col-12 col-md-6"><div class="rc-video-wrapper"><iframe src="https://www.youtube.com/embed/FYwO1fiYoa8?enablejsapi=1&amp;origin=https%3A%2F%2Fshop.royalcanin.com" title="making a better world for pets" allowfullscreen="" frameborder="0"></iframe></div></div></div><div class="arrow-img-columns rc-max-width--lg rc-padding-y--md rc-padding-y--xl--mobile rc-padding-x--md--mobile"><div class="rc-margin-bottom--md"><h2 class="rc-beta">How to Join Royal Canin Club</h2></div><div class="rc-card-grid rc-match-heights rc-card-grid--fixed text-center rc-content-v-middle"><div class="rc-grid"><div><h3 class="rc-intro height-50 rc-margin-bottom--xs rc-padding-bottom--xs"><strong>GRAB YOUR PRODUCTS</strong></h3><img class="mx-auto rc-margin-bottom--xs" alt="HOW TO JOIN SHOP" src=' +
          HOWTOJOINSHOPpng +
          '><div class="inherit-fontsize rc-body rc-padding-top--xs children-nomargin"><p>Add expert-recommended pet food and products to your cart</p></div></div></div><div class="rc-grid"><div><h3 class="rc-intro height-50 rc-margin-bottom--xs rc-padding-bottom--xs"><strong>CHOOSE AUTOMATIC SHIPPING</strong></h3><img class="mx-auto rc-margin-bottom--xs" alt="HOW TO JOIN AUTOSHIP" src=' +
          HOWTOJOINAUTOSHIPpng +
          '><div class="inherit-fontsize rc-body rc-padding-top--xs children-nomargin"><p>Select automatic shipping and input your payment method</p></div></div></div><div class="rc-grid"><div><h3 class="rc-intro height-50 rc-margin-bottom--xs rc-padding-bottom--xs"><strong>GET WHAT YOUR PET NEEDS, WHEN YOU NEED IT</strong></h3><img class="mx-auto rc-margin-bottom--xs" alt="HOW TO JOIN SCHEDULE" src=' +
          HOWTOJOINSCHEDULEpng +
          '><div class="inherit-fontsize rc-body rc-padding-top--xs children-nomargin"><p>Receive your autoship purchase based on your schedule––change or cancel at any time</p></div></div></div><div class="rc-grid"><div><h3 class="rc-intro height-50 rc-margin-bottom--xs rc-padding-bottom--xs"><strong>ENJOY YOUR PERKS</strong></h3><img class="mx-auto rc-margin-bottom--xs" alt="HOW TO JOIN ENJOY" src=' +
          HOWTOJOINENJOYpng +
          '><div class="inherit-fontsize rc-body rc-padding-top--xs children-nomargin"><p>Get your exclusive Royal Canin Club perks, including access to a Royal Canin Advisor</p></div></div></div></div></div>'
      });
    }

    // 俄罗斯需添加 一个 tab
    if (window.__.env.REACT_APP_COUNTRY === 'ru') {
      const dom = `<div class='mixed-Feeding-box'>
          <div class='rc-margin-bottom--md'>
            <h2 class='mixed-Feeding-title rc-beta'>Смешанное кормление</h2>
          </div>
          <h3 class='mixed-Feeding-title2 rc-beta'>Сочетайте преимущества сухого и влажного продуктов</h3>

          <p class='mixed-Feeding-text rc-intro rc-margin-bottom--none text-center d-md-block d-none'>Смешанное кормление – это сочетание сухого и консервированного кормов в рационе вашего питомца. Каждый из кормов сам по себе является полноценным и сбалансированным, но ежедневное сочетание сухого и влажного кормов позволяет получить оптимальную комбинацию преимуществ обоих видов продуктов.</p>
           <div class='rc-margin-bottom--md--desktop rc-padding-top--md--mobile'>
            <h3 class='rc-beta'>Преимущества смешанного кормления</h3>
          </div>
          <div class='mixed-Feeding-content'>
            <div class='mixed-Feeding-content-item'>
              <h3 class='mixed-Feeding-title'>Сухой корм ROYAL CANIN®</h3>
              <h4 >Дополнительные преимущества</h4>
              <div class='mixed-Feeding-content-list'>
                <li>гигиена полости рта</li>
                <li>добавление в рацион определенных нутриентов</li>
              </div>
            </div>
            <div class='mixed-Feeding-content-item rc-text--center'>
              <LazyLoad>
                <img
                  src=${mixFeedingIcon}
                  alt=''
                  class="m-auto rc-margin--none--desktop rc-width"
                />
              </LazyLoad>
            </div>
            <div class='mixed-Feeding-content-item'>
              <h3 class='mixed-Feeding-title'>Влажный корм ROYAL CANIN®</h3>
              <h4 >Дополнительные преимущества</h4>
              <div>
                <li>контроль веса</li>
                <li>стимуляция аппетита</li>
                <li>стимуляция ощущений за счет текстуры</li>
                <li>дополнительный источник влаги и поддержание здоровья мочевыделительной системы</li>
              </div>
            </div>
          </div>
        </div>`;
      tmpGoodsDescriptionDetailList.push({
        displayName: 'Mixed Feeding',
        content: dom
      });
    }

    // if (window.__.env.REACT_APP_COUNTRY === 'ru' && saleableFlag && sptGoods) {
    //   let mixfeeding = `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/detail/Mixfeeding.png`;
    //   let MixfeedingFood = `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/detail/Mixfeeding-Food.png`;
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
                        style={
                          getSpeciesId(goodsDetailSpace) == '1'
                            ? window.__.env.REACT_APP_COUNTRY === 'tr'
                              ? pdpbackgroundmobilecatstr
                              : window.__.env.REACT_APP_COUNTRY === 'fr'
                              ? pdpbackgroundmobilecatsfr
                              : pdpbackgroundmobilecats
                            : window.__.env.REACT_APP_COUNTRY === 'tr'
                            ? pdpmobilebackgrounddogtr
                            : window.__.env.REACT_APP_COUNTRY === 'fr'
                            ? pdpmobilebackgrounddogfr
                            : pdpmobilebackgrounddog
                        }
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
                                      fontWeight: '550'
                                    }}
                                  >
                                    <FormattedMessage
                                      id="ClubLP.LongBanner.title"
                                      values={{ val1: <br />, val2: <br /> }}
                                    />
                                  </p>
                                  <p
                                    style={{
                                      fontSize: '0.7em',
                                      textAlign: 'center',
                                      color: '#666'
                                    }}
                                  >
                                    {window.__.env.REACT_APP_COUNTRY ===
                                    'ru' ? (
                                      <br />
                                    ) : (
                                      <FormattedMessage id="ClubLP.LongBanner.content2" />
                                    )}
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
                              Subtitle={SubTitles}
                              LogoShow={LogoShows}
                            />
                          </div>
                        </div>
                      </div>
                      {window.__.env.REACT_APP_COUNTRY === 'ru' ? (
                        <HowItWorksNew
                          RuhowitworksnewList={RuhowitworksnewLists}
                          RuhowitworksnewListmobile={RuhowitworksnewListmobiles}
                        />
                      ) : (
                        <HowItWorksNew
                          FrhowitworksnewListmobile={FrhowitworksnewListmobiles}
                          FrhowitworksnewList={FrhowitworksnewLists}
                        />
                      )}
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
      data-tms="Product description"
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
                    <div
                      style={
                        getSpeciesId(goodsDetailSpace) == '1'
                          ? pdpbackgroundcats
                          : pdpbackgrounddogs
                      }
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
                                    fontSize: '1.1em',
                                    fontWeight: '550'
                                  }}
                                >
                                  <FormattedMessage
                                    id="ClubLP.LongBanner.title"
                                    values={{ val1: <br />, val2: <br /> }}
                                  ></FormattedMessage>
                                </p>
                                <p style={{ fontSize: '0.7em', color: '#666' }}>
                                  {window.__.env.REACT_APP_COUNTRY === 'ru' ? (
                                    <br />
                                  ) : (
                                    <FormattedMessage id="ClubLP.LongBanner.content2" />
                                  )}
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
                                <div
                                  className="rc-intro rc-padding-left--sm rc-margin-bottom--none text-center d-flex align-items-center h-100"
                                  style={{ marginTop: '5px' }}
                                >
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
                            Subtitle={SubTitles}
                            LogoShow={LogoShows}
                          />
                        </div>
                      </div>
                    </div>
                    <HowItWorksNew
                      RuhowitworksnewList={RuhowitworksnewLists}
                      RuhowitworksnewListmobile={RuhowitworksnewListmobiles}
                      FrhowitworksnewListmobile={FrhowitworksnewListmobiles}
                      FrhowitworksnewList={FrhowitworksnewLists}
                    />
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
