import React, { useEffect, useState } from 'react';
import { getDeviceType, optimizeImage } from '@/utils/utils';
import { FormattedMessage } from 'react-intl-phraseapp';
import LazyLoad from 'react-lazyload';
import landingBanner from './image/landing-banner.jpg';
import './index.less';
import HowItWorks from '@/views/ClubLandingPage/HowItWorks';
import SubscriptionBenefitsBanner from '../../views/ClubLandingPageNew/Components/LongBanner/SubscriprionBenefitsBanner';
import HowItWorksNew from '../../views/ClubLandingPageNew/Components/HowItWorksNew';
import SubscriptionTab from './SubscriptionTab/subscriptionTab';

const pdpmobilebackgrounddog = {
  backgroundImage: `url(${optimizeImage({
    originImageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/goodsdeatailsbackgroundmobile.png`,
    width: 1200
  })})`,
  overflow: 'hidden',
  backgroundSize: 'cover'
};

const pdpmobilebackgrounddogtr = {
  backgroundImage: `url(${optimizeImage({
    originImageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/goodsdeatailsbackgroundmobiletr.png`,
    width: 1200
  })})`,
  overflow: 'hidden',
  backgroundSize: 'cover'
};
const pdpmobilebackgrounddogfr = {
  backgroundImage: `url(${optimizeImage({
    originImageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/goodsdeatailsbackgroundmobilefr.png`,
    width: 750
  })})`,
  overflow: 'hidden',
  backgroundSize: 'cover'
};

const pdpbackgroundmobilecats = {
  backgroundImage: `url(${optimizeImage({
    originImageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/goodsdeatailsbackgroundmobilecat.png`,
    width: 1200
  })})`,
  overflow: 'hidden',
  backgroundSize: 'cover'
};

const pdpbackgroundmobilecatstr = {
  backgroundImage: `url(${optimizeImage({
    originImageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/goodsdeatailsbackgroundmobilecattr.png`,
    width: 1200
  })})`,
  overflow: 'hidden',
  backgroundSize: 'cover'
};

const pdpbackgroundmobilecatsfr = {
  backgroundImage: `url(${optimizeImage({
    originImageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/goodsdeatailsbackgroundmobilecatfr.png`,
    width: 1200
  })})`,
  overflow: 'hidden',
  // backgroundSize: 'cover'
  backgroundSize: '100% 140%'
};

const pdpbackgrounddogs = {
  backgroundImage: `url(${optimizeImage({
    originImageUrl:
      window.__.env.REACT_APP_COUNTRY === 'ru'
        ? `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/goodsdetailtabbackgrounddogru.png`
        : `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/goodsdeatailtabbackgrounddog.png`,
    width: 1200
  })})`,
  height: '800px',
  backgroundSize: 'cover',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column'
};

const pdpbackgroundcats = {
  backgroundImage: `url(${optimizeImage({
    originImageUrl:
      window.__.env.REACT_APP_COUNTRY === 'ru'
        ? `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/goodsdeatailtabbackgroundcatru.png`
        : `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/goodsdeatailtabbackgroundcat.png`,
    width: 1400
  })})`,
  height: '700px',
  backgroundSize: 'cover',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column'
};

let clubListDataNew = [
  {
    text: <FormattedMessage id={'ClubLP.SubscriptionBenefitsNew.icon1'} />,
    img: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/clubiconnew1.png`,
    alt: 'CLUB BENEFITS PET ADVISOR'
  },
  {
    text: <FormattedMessage id={'ClubLP.SubscriptionBenefitsNew.icon2'} />,
    img:
      window.__.env.REACT_APP_COUNTRY == 'tr'
        ? `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/discountnewtr.png`
        : `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/clubiconnew2.png`,
    alt: 'CLUB BENEFITS DISCOUNT'
  },
  {
    text: <FormattedMessage id={'ClubLP.SubscriptionBenefitsNew.icon3'} />,
    img: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/clubiconnew3.png`,
    alt: 'CLUB BENEFITS PET ADVISOR'
  },
  {
    text: <FormattedMessage id={'ClubLP.SubscriptionBenefitsNew.icon4'} />,
    img: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/clubiconnew4.png`,
    alt: 'CLUB BENEFITS PET ADVISOR'
  },
  {
    text: (
      <FormattedMessage
        id={'ClubLP.SubscriptionBenefitsNew.icon5'}
        values={{ val1: null, val2: null }}
      />
    ),
    img: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/phoneicon@4x.png`,
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
        img: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/iconsixnew.png`,
        alt: 'CLUB BENEFITS PET ADVISOR'
      }
    : {}
];

let clubListData = [
  {
    text: <FormattedMessage id="clubListData.tip1" />,
    img: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/pictonutrition@4x.png`,
    alt: 'CLUB BENEFITS PET ADVISOR'
  },
  {
    text: <FormattedMessage id="clubListData.tip2" />,
    img: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/pictogifts@4x.png`,
    alt: 'CLUB BENEFITS DISCOUNT'
  },
  {
    text: <FormattedMessage id="clubListData.tip3" />,
    img: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/pictospetadviser@4x.png`,
    alt: 'CLUB BENEFITS PET ADVISOR'
  },
  {
    text: <FormattedMessage id="clubListData.tip4" />,
    img: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/auto@2x.png`,
    alt: 'CLUB BENEFITS PET ADVISOR'
  },
  {
    text: <FormattedMessage id="clubListData.tip5" />,
    img: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/pictoshipping@4x.png`,
    alt: 'CLUB BENEFITS PET ADVISOR'
  }
];
if (window.__.env.REACT_APP_COUNTRY === 'ru') {
  clubListData.push({
    text: <FormattedMessage id="clubListData.tip6" />,
    img: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/iconsix.png`,
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
    goodsDetailSpace,
    goodsAttributesValueRelList
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
          ? `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/ruhowitworksnewcat1.png`
          : `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/ruhowitworksnewdogcdn1.png`
    },
    {
      HowitworksStep:
        getSpeciesId(goodsDetailSpace) == '1'
          ? `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/ruhowitworksnewcat2.png`
          : `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/ruhowitworksnewdog2.png`
    },
    {
      HowitworksStep:
        getSpeciesId(goodsDetailSpace) == '1'
          ? `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/ruhowitworksnewcat3.png`
          : `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/ruhowitworksnewdog3.png`
    },
    {
      HowitworksStep:
        getSpeciesId(goodsDetailSpace) == '1'
          ? `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/ruhowitworksnewcat4.png`
          : `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/ruhowitworksnewdog4.png`
    }
  ];

  const RuhowitworksnewListmobiles = [
    {
      HowitworksStep:
        getSpeciesId(goodsDetailSpace) == '1'
          ? `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/ruhowitworknewmobilecat1.png`
          : `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/ruhowitworknewmobiledog1.png`
    },
    {
      HowitworksStep:
        getSpeciesId(goodsDetailSpace) == '1'
          ? `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/ruhowitworknewmobilecat2.png`
          : `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/ruhowitworknewmobiledog2.png`
    },
    {
      HowitworksStep:
        getSpeciesId(goodsDetailSpace) == '1'
          ? `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/ruhowitworknewmobilecat3.png`
          : `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/ruhowitworknewmobiledog3.png`
    },
    {
      HowitworksStep:
        getSpeciesId(goodsDetailSpace) == '1'
          ? `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/ruhowitworknewmobilecat4.png`
          : `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/ruhowitworknewmobiledog4.png`
    }
  ];

  //Fr Image
  const FrhowitworksnewLists = [
    {
      HowitworksStep:
        getSpeciesId(goodsDetailSpace) == '1'
          ? `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/frhowitworksnewcat1.png`
          : `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/frhowitworksnewdog1.png`
    },
    {
      HowitworksStep:
        getSpeciesId(goodsDetailSpace) == '1'
          ? `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/frhowitworksnewcat2.png`
          : `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/frhowitworksnewdog2.png`
    },
    {
      HowitworksStep:
        getSpeciesId(goodsDetailSpace) == '1'
          ? `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/frhowitworksnewcat3.png`
          : `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/frhowitworksnewdog3.png`
    },
    {
      HowitworksStep:
        getSpeciesId(goodsDetailSpace) == '1'
          ? `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/frhowitworksnewcat4.png`
          : `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/frhowitworksnewdog4.png`
    }
  ];

  const FrhowitworksnewListmobiles = [
    {
      HowitworksStep:
        getSpeciesId(goodsDetailSpace) == '1'
          ? `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/frhowitworknewmobilecat1.png`
          : `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/frhowitworknewmobiledog1.png`
    },
    {
      HowitworksStep:
        getSpeciesId(goodsDetailSpace) == '1'
          ? `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/frhowitworknewmobilecat2.png`
          : `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/frhowitworknewmobiledog2.png`
    },
    {
      HowitworksStep:
        getSpeciesId(goodsDetailSpace) == '1'
          ? `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/frhowitworknewmobilecat3.png`
          : `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/frhowitworknewmobiledog3.png`
    },
    {
      HowitworksStep:
        getSpeciesId(goodsDetailSpace) == '1'
          ? `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/frhowitworknewmobilecat4.png`
          : `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/frhowitworknewmobiledog4.png`
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
        getSpeciesId(goodsDetailSpace) == '1'
          ? `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/benefitsonecat.png`
          : `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/benefitsonedog.png`,
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
        getSpeciesId(goodsDetailSpace) == '1'
          ? `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/benefitstwocat.png`
          : `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/benefitstwodog.png`,
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
      SubscriptionImg: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/benefitsthree2.png`,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              .map(
                (el) =>
                  `<div class="content" style="white-space: pre-line;">${el}</div><p></p>`
              )
              .join('')}
          </p>`;
                    })
                    .join('');
                } else {
                  const ParnutsStatement =
                    parsedContent
                      .map((ele) => {
                        return ele['Parnuts Statement'];
                      })
                      .filter((e) => e)[0] || '';
                  const ParnutsStatementRet =
                    ParnutsStatement && isVet
                      ? `<div class="content" style="white-space: pre-line;font-weight: 400;">${ParnutsStatement}</div>`
                      : '';
                  const retContent = parsedContent.filter(
                    (el) => !el.hasOwnProperty('Parnuts Statement')
                  );
                  ret =
                    ParnutsStatementRet +
                    retContent
                      .map((ele) => {
                        return `<div class="content" style="white-space: pre-line;">${
                          Object.values(ele)[0]
                        }</div>`;
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
        g.displayName = g.displayName || g.translateList?.[0]?.translateName;
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
    // if (window.__.env.REACT_APP_COUNTRY === 'ru') {
    //   const dom = `<div class='mixed-Feeding-box'>
    //       <div class='rc-margin-bottom--md'>
    //         <h2 class='mixed-Feeding-title rc-beta'>Смешанное кормление</h2>
    //       </div>
    //       <h3 class='mixed-Feeding-title2 rc-beta'>Сочетайте преимущества сухого и влажного продуктов</h3>
    //
    //       <p class='mixed-Feeding-text rc-intro rc-margin-bottom--none text-center d-md-block d-none'>Смешанное кормление – это сочетание сухого и консервированного кормов в рационе вашего питомца. Каждый из кормов сам по себе является полноценным и сбалансированным, но ежедневное сочетание сухого и влажного кормов позволяет получить оптимальную комбинацию преимуществ обоих видов продуктов.</p>
    //        <div class='rc-margin-bottom--md--desktop rc-padding-top--md'>
    //         <h3 class='rc-beta'>Преимущества смешанного кормления</h3>
    //       </div>
    //       <div class='mixed-Feeding-content'>
    //         <div class='mixed-Feeding-content-item'>
    //           <h3 class='mixed-Feeding-title'>Сухой корм ROYAL CANIN®</h3>
    //           <h4 >Дополнительные преимущества</h4>
    //           <div class='mixed-Feeding-content-list'>
    //             <li>гигиена полости рта</li>
    //             <li>добавление в рацион определенных нутриентов</li>
    //           </div>
    //         </div>
    //         <div class='mixed-Feeding-content-item rc-text--center'>
    //           <LazyLoad>
    //             <img
    //               src=${mixFeedingIcon}
    //               alt=''
    //               class="m-auto rc-margin--none--desktop rc-width"
    //             />
    //           </LazyLoad>
    //         </div>
    //         <div class='mixed-Feeding-content-item'>
    //           <h3 class='mixed-Feeding-title'>Влажный корм ROYAL CANIN®</h3>
    //           <h4 >Дополнительные преимущества</h4>
    //           <div>
    //             <li>контроль веса</li>
    //             <li>стимуляция аппетита</li>
    //             <li>стимуляция ощущений за счет текстуры</li>
    //             <li>дополнительный источник влаги и поддержание здоровья мочевыделительной системы</li>
    //           </div>
    //         </div>
    //       </div>
    //     </div>`;
    //   tmpGoodsDescriptionDetailList.push({
    //     displayName: 'Смешанное кормление',
    //     content: dom
    //   });
    // }

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

    hashDailyPortionAnchor(tmpGoodsDescriptionDetailList);
  };

  //hash为#ConnectedPackDailyPortion的页面跳转
  const hashDailyPortionAnchor = (goodsDetailTabsData) => {
    const urlHash = window.location.hash;
    if (urlHash !== '#ConnectedPackDailyPortion') {
      return;
    }
    const lifeStagesAttr = (goodsAttributesValueRelList ?? [])
      .filter((item) => item.goodsAttributeName === 'Lifestages')
      .map((item) => item?.goodsAttributeValue);
    const growingCheck =
      lifeStagesAttr.findIndex((item) =>
        /(baby|puppy|kitten|junior)/.test(item.toLowerCase())
      ) > -1;
    const adultCheck =
      lifeStagesAttr.findIndex((item) =>
        /(adult|mature|senior)/.test(item.toLowerCase())
      ) > -1;
    const guideTabIndex = (goodsDetailTabsData ?? []).findIndex(
      (item) => item.descriptionName === 'Guide'
    );
    console.log(
      'ConnectedPackDailyPortion hash check:',
      growingCheck,
      adultCheck,
      guideTabIndex
    );
    if (growingCheck) {
      if (guideTabIndex > -1) {
        const activeTabIndex = isMobile
          ? [activeTabIdxList, guideTabIndex]
          : [guideTabIndex];
        setActiveTabIdxLists(activeTabIndex);
        props.setState &&
          props.setState({ activeTabIdxList: activeTabIndex }, () => {
            window.setTimeout(() => {
              scrollToTarget(
                isMobile
                  ? 'j-details-tabitem-Guide'
                  : 'j-details-description-tabs'
              );
            }, 500);
          });
      } else {
        return;
      }
    } else if (adultCheck) {
      window.setTimeout(() => {
        scrollToTarget('j-details-dailyportion');
      }, 500);
    }
  };

  const scrollToTarget = (domId) => {
    let target = document.getElementById(domId);
    let header = document.getElementsByTagName('header')[0];
    window.scrollTo(
      0,
      (target?.offsetTop ?? 80) - (header?.offsetHeight ?? 0) - 80
    );
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
      window?.dataLayer?.push({
        event: 'pdpTabsClick',
        pdpTabsClickTabName: ele?.descriptionName
      });
  };

  useEffect(() => {
    handleTabData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //club new subscribtion每次提交的时候记得把true改为false
  const Show = true;

  const createMarkup = (text) => ({ __html: text });
  const headerHeight = document.querySelector('.rc-header')?.offsetHeight;
  return isMobile ? (
    <div>
      {goodsDetailTabsData.map((ele, index) => (
        <React.Fragment key={index} id="GoodsDetailTabs">
          <dl
            className="goodsdetailtabs-item-mobile"
            id={`j-details-tabitem-${ele.descriptionName}`}
          >
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
                <div className={` ${ele.descriptionName}`}>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: ele.content
                    }}
                  />
                </div>
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
              style={{ margin: 0 }}
            >
              <div
                className="rc-list__header d-flex justify-content-between text-uppercase"
                style={{ margin: '0 0.9375rem', width: 'auto' }}
                onClick={changeTab.bind(null, {
                  idx: goodsDetailTabsData.length,
                  type: 'toggle',
                  ele: { descriptionName: 'club' }
                })}
              >
                <div>
                  <FormattedMessage id="subscription" />
                </div>
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
                style={{ overflow: 'hidden', padding: 0 }}
              >
                <p>
                  <SubscriptionTab />
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
      style={{ position: 'relative' }}
      data-tms="Product description"
    >
      <div
        id="j-details-for-club"
        style={{ position: 'absolute', top: -headerHeight }}
      />
      <div className="rc-match-heights rc-content-h-middle rc-reverse-layout">
        <div>
          <div className="rc-border-bottom rc-border-colour--interface">
            <nav className="rc-fade--x rc-max-width--xl rc-padding-x--sm">
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
                      <FormattedMessage id="subscription" />
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
                <div
                  className={`block ${ele.descriptionName} rc-max-width--xl rc-padding-x--sm`}
                >
                  <p
                    aria-hidden="true"
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
                <SubscriptionTab />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoodsDetailTabs;
