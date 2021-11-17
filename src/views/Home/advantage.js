import React from 'react';
import { FormattedMessage } from 'react-intl';
import { formatMoney } from '@/utils/utils';
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
      text: <FormattedMessage id="home.convenientTip1" />
    },
    {
      imgUrl: delivery,
      imgAlt: 'delivery image',
      text: (
        <FormattedMessage
          id="home.convenientTip2"
          values={{
            val: formatMoney(window.__.env.REACT_APP_MINIMUM_AMOUNT)
          }}
        />
      )
    },
    {
      imgUrl: question,
      imgAlt: 'question icon',
      text: <FormattedMessage id="home.convenientTip3" />
    }
  ];

  const list =
    {
      uk: [
        {
          imgUrl: pack,
          imgAlt: 'pack icon',
          text: <FormattedMessage id="home.convenientTip1" />
        },
        {
          imgUrl: delivery,
          imgAlt: 'delivery image',
          text: (
            <FormattedMessage
              id="home.convenientTip2"
              values={{
                val: formatMoney(30)
              }}
            />
          )
        },
        {
          imgUrl: question,
          imgAlt: 'question icon',
          text: <FormattedMessage id="home.convenientTip3" />
        }
      ],
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
      ],
      fr: [
        {
          imgUrl: pack,
          imgAlt: 'pack icon',
          text: <FormattedMessage id="home.convenientTip1" />
        },
        {
          imgUrl: autoship,
          imgAlt: 'autoship icon',
          text: "Bénéficiez d'une livraison automatique"
        },
        {
          imgUrl: delivery,
          imgAlt: 'delivery icon',
          text: (
            <FormattedMessage
              id="home.convenientTip2"
              values={{
                val: formatMoney(window.__.env.REACT_APP_MINIMUM_AMOUNT)
              }}
            />
          )
        },
        {
          imgUrl: question,
          imgAlt: 'question icon',
          text: <FormattedMessage id="home.convenientTip3" />
        }
      ],
      de: [
        {
          imgUrl: pack,
          imgAlt: 'pack icon',
          text: <FormattedMessage id="home.convenientTip1" />
        },
        {
          imgUrl: autoship,
          imgAlt: 'autoship icon',
          text: <FormattedMessage id="home.convenientTip2" />
        },
        {
          imgUrl: delivery,
          imgAlt: 'delivery icon',
          text: (
            <FormattedMessage
              id="home.convenientTip3"
              values={{
                val: formatMoney(window.__.env.REACT_APP_MINIMUM_AMOUNT)
              }}
            />
          )
        },
        {
          imgUrl: question,
          imgAlt: 'question icon',
          text: <FormattedMessage id="home.convenientTip4" />
        }
      ],
      ru: [
        {
          imgUrl: pack,
          imgAlt: 'pack icon',
          text: <FormattedMessage id="home.convenientTip1" />
        },
        {
          imgUrl: autoship,
          imgAlt: 'autoship icon',
          text: <FormattedMessage id="home.convenientTip4" />
        },
        {
          imgUrl: delivery,
          imgAlt: 'delivery icon',
          text: (
            <FormattedMessage
              id="home.convenientTip2"
              values={{
                val: 2500
              }}
            />
          )
        },
        {
          imgUrl: question,
          imgAlt: 'question icon',
          text: <FormattedMessage id="home.convenientTip3" />
        }
      ],
      tr: [
        {
          imgUrl: pack,
          imgAlt: 'pack icon',
          text: <FormattedMessage id="home.convenientTip1" />
        },
        {
          imgUrl: autoship,
          imgAlt: 'autoship icon',
          text: <FormattedMessage id="home.convenientTip4" />
        },
        {
          imgUrl: delivery,
          imgAlt: 'delivery image',
          text: (
            <FormattedMessage
              id="home.convenientTip2"
              values={{
                val: formatMoney(window.__.env.REACT_APP_MINIMUM_AMOUNT)
              }}
            />
          )
        },
        {
          imgUrl: question,
          imgAlt: 'question icon',
          text: <FormattedMessage id="home.convenientTip3" />
        }
      ]
    }[window.__.env.REACT_APP_COUNTRY] || defaultList;

  return list.map((item, i) => (
    <div
      className={`col-12 col-md-6 col-xxl-${
        12 / list.length
      } d-flex px-0 pl-md-0 pr-md-2 pr-xxl-3 pl-xxl-0 justify-content-center`}
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
