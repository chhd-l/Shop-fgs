import React from 'react';
import { getDeviceType } from '@/utils/utils';
import clubLogo from '@/assets/images/club-icon-big.png';
import clubDesc from '../image/club-desc@2x.png';

import icon1 from '../image/clubiconnew1.png';
import icon2 from '../image/clubiconnew2.png';
import icon3 from '../image/clubiconnew3.png';
import icon4 from '../image/clubiconnew4.png';
import icon5 from '../image/clubiconnew5.png';
import icon6 from '../image/iconsix.png';

import './tab.less';

export default function SubscriptionTab() {
  const scrollToTop = () => {
    window && window.scrollTo(0, 0);
  };
  const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';

  return (
    <div className="new-subscription-tab">
      <div className="rc-max-width--xl rc-padding-x--sm">
        <div className="text-center rc-beta">
          <img src={clubLogo} className="main-lo" alt="" />
        </div>
        <div className="text-center rc-beta rc-margin-bottom--md">
          <p className="main-title">
            Une solution qui vous simplifie la vie et <br /> vous aide à
            maintenir la santé de votre animal par la nutrition.
          </p>
        </div>
        <div className="subscription-desc rc-margin-bottom--md">
          <article className="rc-beta text-center">
            {isMobile ? (
              <>
                <div style={{ margin: '10px 0' }}>
                  <img src={clubDesc} alt="" style={{ width: '100%' }} />
                </div>
                <p className="sub-title">
                  Un coffret de bienvenue offert
                  <br /> dès le 1er achat avec le CLUB
                </p>
              </>
            ) : (
              <>
                <p className="sub-title">
                  Un coffret de bienvenue offert
                  <br /> dès le 1er achat avec le CLUB
                </p>
                <div style={{ margin: '10px 0' }}>
                  <img src={clubDesc} alt="" style={{ width: '100%' }} />
                </div>
              </>
            )}
            <p className="sub-desc">
              Royal Canin récompense votre fidélité. <br /> Gâtez votre animal
              avec des cadeaux exclusifs toute l’année.
            </p>
          </article>
          <article className="rc-beta">
            <p className="text-center sub-title">
              Vos produits préférés livrés chez vous et à votre rythme
            </p>
            <dl>
              <dt>
                <img src={icon1} width="64" alt="" />
              </dt>
              <dd>Un abonnement gratuit et sans engagement</dd>
            </dl>
            <dl>
              <dt>
                <img src={icon2} width="64" alt="" />
              </dt>
              <dd>10 % de réduction sur CHAQUE commande</dd>
            </dl>
            <dl>
              <dt>
                <img src={icon3} width="64" alt="" />
              </dt>
              <dd>Des livraisons offertes, automatiques et flexibles</dd>
            </dl>
          </article>
          <article className="rc-beta">
            <p className="text-center sub-title">
              Une alimentation qui prend soin
              <br /> de votre animal
            </p>
            <dl>
              <dt>
                <img src={icon4} width="64" alt="" />
              </dt>
              <dd>
                Une alimentation adaptée au fur et à mesure que ses besoins
                évoluent
              </dd>
            </dl>
            <dl>
              <dt>
                <img src={icon5} width="64" alt="" />
              </dt>
              <dd>Des quantités de nourriture précises</dd>
            </dl>
            <dl>
              <dt>
                <img src={icon6} width="64" alt="" />
              </dt>
              <dd>
                Un aliment équilibré dont les bienfaits ont été scientifiquement
                prouvés
              </dd>
            </dl>
          </article>
        </div>
        <div className="text-center rc-margin-bottom--none">
          <span
            className="ui-cursor-pointer"
            onClick={scrollToTop}
            style={{ fontSize: '1rem', lineHeight: '1.33em' }}
          >
            <span
              style={{
                display: 'inline-block',
                verticalAlign: 'middle',
                fontWeight: 500,
                color: '#444',
                borderBottom: '1px solid rgba(68,68,68,.3)'
              }}
            >
              Back to top
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              style={{
                color: '#767676',
                display: 'inline',
                marginLeft: 5,
                display: 'inline-block',
                verticalAlign: 'middle'
              }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
