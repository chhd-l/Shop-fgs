import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import LazyLoad from 'react-lazyload';

import pack from '@/assets/images/home/pack@2x.png';
import autoship from '@/assets/images/home/autoship@2x.png';
import delivery from '@/assets/images/home/delivery@2x.png';
import question from '@/assets/images/home/question@2x.png';

export function Advantage() {
  const defaultList = [
    {
      imgUrl: pack,
      imgAlt: 'pack icon',
      text: <FormattedMessage id="home.whyShopRoyalCanin.findDiet" />
    },
    {
      imgUrl: autoship,
      imgAlt: 'autoship icon',
      text: <FormattedMessage id="home.whyShopRoyalCanin.autoShip" />
    },
    {
      imgUrl: delivery,
      imgAlt: 'delivery icon',
      text: <FormattedMessage id="home.whyShopRoyalCanin.goodDelivery" />
    },
    {
      imgUrl: question,
      imgAlt: 'question icon',
      text: <FormattedMessage id="home.whyShopRoyalCanin.goodAfterService" />
    }
  ];

  const list =
    {
      us: [
        {
          imgUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/CLUB-BENEFITS_PRODUCT-RECOS@x2.png`,
          imgAlt: 'ideal formula',
          text: 'Expert recommendations on food tailored to your pet’s needs'
        },
        {
          imgUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/CLUB-BENEFITS_DISCOUNT@x2.png`,
          imgAlt: 'club benefits',
          text: 'Save 30% off your first purchase through Royal Canin Club, and 5% off every autoship order'
        },
        {
          imgUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/CLUB-BENEFITS_FREE-SHIPPING@x2.png`,
          imgAlt: 'Free Automatic Shipping',
          text: 'Free automatic shipping – no minimum purchase'
        },
        {
          imgUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/COHORT-A_CLUB-BENEFITS_PET-ADVISOR2@x2.png`,
          imgAlt: 'Welcome Box',
          text: 'Expert feeding advice, product updates and support from a Royal Canin Advisor'
        }
      ]
    }[window.__.env.REACT_APP_COUNTRY] || defaultList;

  return list.map((item, i) => (
    <div
      className={`col-12 col-md-6 col-xxl-${
        12 / list.length
      } d-flex px-0 md:pl-0 md:pr-2 pr-xxl-3 pl-xxl-0 justify-content-center`}
      key={i}
    >
      <div className="d-flex justify-content-center align-items-center w-100 value-proposition__content">
        <LazyLoad height={200}>
          <img
            className="value-proposition__img"
            style={{ width: '80px' }}
            src={item.imgUrl}
            alt={item.imgAlt}
            title=""
          />
        </LazyLoad>

        <div className="pl-3 d-flex align-items-center value-proposition__text">
          <p className="rc-margin-bottom--none rc-intro text-left">
            {item.text}
          </p>
        </div>
      </div>
    </div>
  ));
}
