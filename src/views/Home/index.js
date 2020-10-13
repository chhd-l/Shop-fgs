import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { formatMoney } from '@/utils/utils';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import HeroCarousel from '@/components/HeroCarousel2';
import FooterImage from './modules/FooterImage';
import './index.css';
import CARECAT from '@/assets/images/MX-L-VET-CARE-CAT.jpg';
import CAREDOG from '@/assets/images/MX-L-VET-CARE-DOG.jpg';
import DIETCAT from '@/assets/images/MX-L-VET-DIET-CAT.jpg';
import DIETDOG from '@/assets/images/MX-L-VET-DIET-DOG.jpg';

import Bundles_Breed_Cat from '@/assets/images/home-catogery-mx/Bundles_Breed_Cat.jpg';
import Bundles_Breed_Dog from '@/assets/images/home-catogery-mx/Bundles_Breed_Dog.jpg';

import Urinary from '@/assets/images/home-catogery/Urinary.jpg';
import Dermatology from '@/assets/images/home-catogery/Dermatology.jpg';
import WeightManagement from '@/assets/images/home-catogery/Weight-Management.jpg';
import Gastrointestinal from '@/assets/images/home-catogery/Gastrointestinal.jpg';
import VitalSupport from '@/assets/images/home-catogery/Vital-Support.jpg';
import HealthManagement from '@/assets/images/home-catogery/Health-Management.jpg';

const localItemRoyal = window.__.localItemRoyal;

const numENUM = {
  en: 6,
  es: 6,
  de: 6,
  fr: 4,
  ru: 4
};

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    // console.log(111111,process.env.REACT_APP_AdyenOriginKEY)
    if (localItemRoyal.get('isRefresh')) {
      localItemRoyal.remove('isRefresh');
      window.location.reload();
      return false;
    }
  }
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  render() {
    const event = {
      page: {
        type: 'Homepage',
        theme: ''
      }
    };
    const curNum = numENUM[process.env.REACT_APP_LANG];
    const _catogeryJXS = {
      en: (
        <>
          <div className="col-md-4 col-6">
            <FormattedMessage id="product.catogery4.name">
              {(txt) => (
                <Link
                  className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                  to="/list/vd"
                  title={txt}
                >
                  <picture className="category-cards__card__img">
                    <source srcSet={CARECAT} />
                    <img src={CARECAT} alt={txt} title={txt} />
                  </picture>
                  <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                    <h3 className="rc-margin--none">{txt}</h3>
                  </div>
                </Link>
              )}
            </FormattedMessage>
          </div>
          <div className="col-md-4 col-6">
            <FormattedMessage id="product.catogery2.name">
              {(txt) => (
                <Link
                  className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                  to="/list/prescription-cats"
                  title={txt}
                >
                  <picture className="category-cards__card__img">
                    <source srcSet={DIETCAT} />
                    <img src={DIETCAT} alt={txt} title={txt} />
                  </picture>
                  <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                    <h3 className="rc-margin--none">{txt}</h3>
                  </div>
                </Link>
              )}
            </FormattedMessage>
          </div>
          <div className="col-md-4 col-6">
            <FormattedMessage id="product.catogery7.name">
              {(txt) => (
                <Link
                  className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                  to="/list/breed-cats"
                  title={txt}
                >
                  <picture className="category-cards__card__img">
                    <source srcSet={Bundles_Breed_Cat} />
                    <img src={Bundles_Breed_Cat} alt={txt} title={txt} />
                  </picture>
                  <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                    <h3 className="rc-margin--none">{txt}</h3>
                  </div>
                </Link>
              )}
            </FormattedMessage>
          </div>
          <div className="col-md-4 col-6">
            <FormattedMessage id="product.catogery3.name">
              {(txt) => (
                <Link
                  className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                  to="/list/vcn"
                  title={txt}
                >
                  <picture className="category-cards__card__img">
                    <source srcSet={CAREDOG} />
                    <img src={CAREDOG} alt={txt} title={txt} />
                  </picture>
                  <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                    <h3 className="rc-margin--none">{txt}</h3>
                  </div>
                </Link>
              )}
            </FormattedMessage>
          </div>
          <div className="col-md-4 col-6">
            <FormattedMessage id="product.catogery1.name">
              {(txt) => (
                <Link
                  className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                  to="/list/prescription-dogs"
                  title={txt}
                >
                  <picture className="category-cards__card__img">
                    <source srcSet={DIETDOG} />
                    <img src={DIETDOG} alt={txt} title={txt} />
                  </picture>
                  <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                    <h3 className="rc-margin--none">{txt}</h3>
                  </div>
                </Link>
              )}
            </FormattedMessage>
          </div>
          <div className="col-md-4 col-6">
            <FormattedMessage id="product.catogery8.name">
              {(txt) => (
                <Link
                  className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                  to="/list/breed-dogs"
                  title={txt}
                >
                  <picture className="category-cards__card__img">
                    <source srcSet={Bundles_Breed_Dog} />
                    <img src={Bundles_Breed_Dog} alt={txt} title={txt} />
                  </picture>
                  <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                    <h3 className="rc-margin--none">{txt}</h3>
                  </div>
                </Link>
              )}
            </FormattedMessage>
          </div>
        </>
      ),
      es: (
        <>
          <div className="col-md-4 col-6">
            <FormattedMessage id="product.catogery4.name">
              {(txt) => (
                <Link
                  className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                  to="/list/vd"
                  title={txt}
                >
                  <picture className="category-cards__card__img">
                    <source srcSet={CARECAT} />
                    <img src={CARECAT} alt={txt} title={txt} />
                  </picture>
                  <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                    <h3 className="rc-margin--none">{txt}</h3>
                  </div>
                </Link>
              )}
            </FormattedMessage>
          </div>
          <div className="col-md-4 col-6">
            <FormattedMessage id="product.catogery2.name">
              {(txt) => (
                <Link
                  className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                  to="/list/prescription-cats"
                  title={txt}
                >
                  <picture className="category-cards__card__img">
                    <source srcSet={DIETCAT} />
                    <img src={DIETCAT} alt={txt} title={txt} />
                  </picture>
                  <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                    <h3 className="rc-margin--none">{txt}</h3>
                  </div>
                </Link>
              )}
            </FormattedMessage>
          </div>
          <div className="col-md-4 col-6">
            <FormattedMessage id="product.catogery7.name">
              {(txt) => (
                <Link
                  className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                  to="/list/breed-cats"
                  title={txt}
                >
                  <picture className="category-cards__card__img">
                    <source srcSet={Bundles_Breed_Cat} />
                    <img src={Bundles_Breed_Cat} alt={txt} title={txt} />
                  </picture>
                  <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                    <h3 className="rc-margin--none">{txt}</h3>
                  </div>
                </Link>
              )}
            </FormattedMessage>
          </div>
          <div className="col-md-4 col-6">
            <FormattedMessage id="product.catogery3.name">
              {(txt) => (
                <Link
                  className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                  to="/list/vcn"
                  title={txt}
                >
                  <picture className="category-cards__card__img">
                    <source srcSet={CAREDOG} />
                    <img src={CAREDOG} alt={txt} title={txt} />
                  </picture>
                  <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                    <h3 className="rc-margin--none">{txt}</h3>
                  </div>
                </Link>
              )}
            </FormattedMessage>
          </div>
          <div className="col-md-4 col-6">
            <FormattedMessage id="product.catogery1.name">
              {(txt) => (
                <Link
                  className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                  to="/list/prescription-dogs"
                  title={txt}
                >
                  <picture className="category-cards__card__img">
                    <source srcSet={DIETDOG} />
                    <img src={DIETDOG} alt={txt} title={txt} />
                  </picture>
                  <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                    <h3 className="rc-margin--none">{txt}</h3>
                  </div>
                </Link>
              )}
            </FormattedMessage>
          </div>
          <div className="col-md-4 col-6">
            <FormattedMessage id="product.catogery8.name">
              {(txt) => (
                <Link
                  className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                  to="/list/breed-dogs"
                  title={txt}
                >
                  <picture className="category-cards__card__img">
                    <source srcSet={Bundles_Breed_Dog} />
                    <img src={Bundles_Breed_Dog} alt={txt} title={txt} />
                  </picture>
                  <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                    <h3 className="rc-margin--none">{txt}</h3>
                  </div>
                </Link>
              )}
            </FormattedMessage>
          </div>
        </>
      ),
      de: (
        <>
          <div className="col-md-4 col-6">
            <FormattedMessage id="product.de.catogery1.name">
              {(txt) => (
                <Link
                  className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                  to="/list/urinary"
                  title={txt}
                >
                  <picture className="category-cards__card__img">
                    <source srcSet={Urinary} />
                    <img src={Urinary} alt={txt} title={txt} />
                  </picture>
                  <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                    <h3 className="rc-margin--none">{txt}</h3>
                  </div>
                </Link>
              )}
            </FormattedMessage>
          </div>
          <div className="col-md-4 col-6">
            <FormattedMessage id="product.de.catogery2.name">
              {(txt) => (
                <Link
                  className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                  to="/list/dermatology"
                  title={txt}
                >
                  <picture className="category-cards__card__img">
                    <source srcSet={Dermatology} />
                    <img src={Dermatology} alt={txt} title={txt} />
                  </picture>
                  <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                    <h3 className="rc-margin--none">{txt}</h3>
                  </div>
                </Link>
              )}
            </FormattedMessage>
          </div>
          <div className="col-md-4 col-6">
            <FormattedMessage id="product.de.catogery3.name">
              {(txt) => (
                <Link
                  className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                  to="/list/weight-management"
                  title={txt}
                >
                  <picture className="category-cards__card__img">
                    <source srcSet={WeightManagement} />
                    <img src={WeightManagement} alt={txt} title={txt} />
                  </picture>
                  <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                    <h3 className="rc-margin--none">{txt}</h3>
                  </div>
                </Link>
              )}
            </FormattedMessage>
          </div>
          <div className="col-md-4 col-6">
            <FormattedMessage id="product.de.catogery4.name">
              {(txt) => (
                <Link
                  className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                  to="/list/gastrointestinal-tract"
                  title={txt}
                >
                  <picture className="category-cards__card__img">
                    <source srcSet={Gastrointestinal} />
                    <img src={Gastrointestinal} alt={txt} title={txt} />
                  </picture>
                  <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                    <h3 className="rc-margin--none">{txt}</h3>
                  </div>
                </Link>
              )}
            </FormattedMessage>
          </div>
          <div className="col-md-4 col-6">
            <FormattedMessage id="product.de.catogery5.name">
              {(txt) => (
                <Link
                  className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                  to="/list/vital-support"
                  title={txt}
                >
                  <picture className="category-cards__card__img">
                    <source srcSet={VitalSupport} />
                    <img src={VitalSupport} alt={txt} title={txt} />
                  </picture>
                  <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                    <h3 className="rc-margin--none">{txt}</h3>
                  </div>
                </Link>
              )}
            </FormattedMessage>
          </div>
          <div className="col-md-4 col-6">
            <FormattedMessage id="product.de.catogery6.name">
              {(txt) => (
                <Link
                  className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                  to="/list/health-management"
                  title={txt}
                >
                  <picture className="category-cards__card__img">
                    <source srcSet={HealthManagement} />
                    <img src={HealthManagement} alt={txt} title={txt} />
                  </picture>
                  <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                    <h3 className="rc-margin--none">{txt}</h3>
                  </div>
                </Link>
              )}
            </FormattedMessage>
          </div>
        </>
      ),
      fr: (
        <>
          <div className="col-md-3 col-6">
            <FormattedMessage id="product.fr.catogery1.name">
              {(txt) => (
                <Link
                  className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                  to="/list/chien"
                  title={txt}
                >
                  <picture className="category-cards__card__img">
                    <source
                      srcSet={
                        'https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw14af5a08/Homepage/Dog_categorie-RU@2x.jpg?sw=144&amp;sfrm=jpg'
                      }
                    />
                    <img
                      src={
                        'https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw14af5a08/Homepage/Dog_categorie-RU@2x.jpg?sw=144&amp;sfrm=jpg'
                      }
                      alt={txt}
                      title={txt}
                      style={{ width: '144px' }}
                    />
                  </picture>
                  <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                    <h3 className="rc-margin--none">{txt}</h3>
                  </div>
                </Link>
              )}
            </FormattedMessage>
          </div>
          <div className="col-md-3 col-6">
            <FormattedMessage id="product.fr.catogery2.name">
              {(txt) => (
                <Link
                  className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                  to="/list/chat"
                  title={txt}
                >
                  <picture className="category-cards__card__img">
                    <source
                      srcSet={
                        'https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw6be7a2ed/Homepage/Cat_categorie@2x.jpg?sw=144&amp;sfrm=jpg'
                      }
                    />
                    <img
                      src={
                        'https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw6be7a2ed/Homepage/Cat_categorie@2x.jpg?sw=144&amp;sfrm=jpg'
                      }
                      alt={txt}
                      title={txt}
                      style={{ width: '144px' }}
                    />
                  </picture>
                  <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                    <h3 className="rc-margin--none">{txt}</h3>
                  </div>
                </Link>
              )}
            </FormattedMessage>
          </div>
          <div className="col-md-3 col-6">
            <FormattedMessage id="product.fr.catogery3.name">
              {(txt) => (
                <Link
                  className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                  to="/list/chiot"
                  title={txt}
                >
                  <picture className="category-cards__card__img">
                    <source
                      srcSet={
                        'https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw8c207eec/Homepage/Puppy_categorie@2x.jpg?sw=144&amp;sfrm=jpg'
                      }
                    />
                    <img
                      src={
                        'https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw8c207eec/Homepage/Puppy_categorie@2x.jpg?sw=144&amp;sfrm=jpgs'
                      }
                      alt={txt}
                      title={txt}
                      style={{ width: '144px' }}
                    />
                  </picture>
                  <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                    <h3 className="rc-margin--none">{txt}</h3>
                  </div>
                </Link>
              )}
            </FormattedMessage>
          </div>
          <div className="col-md-3 col-6">
            <FormattedMessage id="product.fr.catogery4.name">
              {(txt) => (
                <Link
                  className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                  to="/list/chaton"
                  title={txt}
                >
                  <picture className="category-cards__card__img">
                    <source
                      srcSet={
                        'https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw2ef1d157/Homepage/Kitten_categorie@2x.jpg?sw=144&amp;sfrm=jpg'
                      }
                    />
                    <img
                      src={
                        'https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw2ef1d157/Homepage/Kitten_categorie@2x.jpg?sw=144&amp;sfrm=jpg'
                      }
                      alt={txt}
                      title={txt}
                      style={{ width: '144px' }}
                    />
                  </picture>
                  <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                    <h3 className="rc-margin--none">{txt}</h3>
                  </div>
                </Link>
              )}
            </FormattedMessage>
          </div>
        </>
      ),
      ru: (
        <>
          <div className="col-md-3 col-6">
            <FormattedMessage id="dogs">
              {(txt) => (
                <Link
                  className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                  to="/list/dogs-ru"
                  title={txt}
                >
                  <picture className="category-cards__card__img">
                    <source
                      srcSet={
                        'https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw14af5a08/Homepage/Dog_categorie-RU@2x.jpg?sw=144&amp;sfrm=jpg'
                      }
                    />
                    <img
                      src={
                        'https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw14af5a08/Homepage/Dog_categorie-RU@2x.jpg?sw=144&amp;sfrm=jpg'
                      }
                      alt={txt}
                      title={txt}
                      style={{ width: '144px' }}
                    />
                  </picture>
                  <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                    <h3 className="rc-margin--none">{txt}</h3>
                  </div>
                </Link>
              )}
            </FormattedMessage>
          </div>
          <div className="col-md-3 col-6">
            <FormattedMessage id="cats">
              {(txt) => (
                <Link
                  className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                  to="/list/cats-ru"
                  title={txt}
                >
                  <picture className="category-cards__card__img">
                    <source
                      srcSet={
                        'https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw6be7a2ed/Homepage/Cat_categorie@2x.jpg?sw=144&amp;sfrm=jpg'
                      }
                    />
                    <img
                      src={
                        'https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw6be7a2ed/Homepage/Cat_categorie@2x.jpg?sw=144&amp;sfrm=jpg'
                      }
                      alt={txt}
                      title={txt}
                      style={{ width: '144px' }}
                    />
                  </picture>
                  <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                    <h3 className="rc-margin--none">{txt}</h3>
                  </div>
                </Link>
              )}
            </FormattedMessage>
          </div>
          <div className="col-md-3 col-6">
            <FormattedMessage id="product.ru.catogery3.name">
              {(txt) => (
                <Link
                  className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                  to="/list/puppy-ru"
                  title={txt}
                >
                  <picture className="category-cards__card__img">
                    <source
                      srcSet={
                        'https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw8c207eec/Homepage/Puppy_categorie@2x.jpg?sw=144&amp;sfrm=jpg'
                      }
                    />
                    <img
                      src={
                        'https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw8c207eec/Homepage/Puppy_categorie@2x.jpg?sw=144&amp;sfrm=jpgs'
                      }
                      alt={txt}
                      title={txt}
                      style={{ width: '144px' }}
                    />
                  </picture>
                  <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                    <h3 className="rc-margin--none">{txt}</h3>
                  </div>
                </Link>
              )}
            </FormattedMessage>
          </div>
          <div className="col-md-3 col-6">
            <FormattedMessage id="product.ru.catogery4.name">
              {(txt) => (
                <Link
                  className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                  to="/list/kitten-ru"
                  title={txt}
                >
                  <picture className="category-cards__card__img">
                    <source
                      srcSet={
                        'https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw2ef1d157/Homepage/Kitten_categorie@2x.jpg?sw=144&amp;sfrm=jpg'
                      }
                    />
                    <img
                      src={
                        'https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw2ef1d157/Homepage/Kitten_categorie@2x.jpg?sw=144&amp;sfrm=jpg'
                      }
                      alt={txt}
                      title={txt}
                      style={{ width: '144px' }}
                    />
                  </picture>
                  <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                    <h3 className="rc-margin--none">{txt}</h3>
                  </div>
                </Link>
              )}
            </FormattedMessage>
          </div>
        </>
      )
    };
    return (
      <div>
        <GoogleTagManager additionalEvents={event} />
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={this.props.location}
          history={this.props.history}
        />
        <main className="rc-content--fixed-header rc-main-content__wrapper ">
          <BannerTip />
          <div className="rc-full-width">
            <div className="experience-component experience-layouts-herocarousel">
              <HeroCarousel history={this.props.history} />
            </div>
          </div>

          <section>
            <div className="rc-bg-colour--brand3 rc-margin-bottom--xs">
              <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile category-cards rc-padding--sm">
                <div
                  className={`${
                    curNum === 6 ? '' : 'row'
                  } rc-match-heights text-center text-md-left`}
                >
                  <div
                    className={`${
                      curNum === 6 ? 'DeCenter' : ''
                    } col-lg-3 align-self-center`}
                  >
                    <h2 className="rc-beta rc-margin--none rc-padding--xs rc-padding--lg--mobile text-center rc-padding-top--none">
                      <FormattedMessage id="home.productsCategory" />
                    </h2>
                  </div>
                  <div className={`${curNum === 6 ? 'DeCenter' : ''} col-lg-9`}>
                    <div className="row custom-gutter">
                      {_catogeryJXS[process.env.REACT_APP_LANG]}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* <!-- divider --> */}
          <section>
            <div
              className="rc-border-bottom rc-border-colour--brand4"
              style={{ borderBottomWidth: '1px' }}
            >
              {' '}
            </div>
          </section>

          {/* <!-- ads --> */}
          <section>
            <div className="rc-bg-colour--brand3" style={{ padding: '1px 0' }}>
              <div className="rc-full-width">
                <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile value-proposition">
                  <h4 className="rc-beta text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile">
                    <FormattedMessage id="home.convenientTitle" />
                  </h4>
                  <div className="value-proposition__container">
                    <div className="row mx-0">
                      <div className="col-12 col-md-6 col-xxl-4 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
                        <div className="d-flex justify-content-center align-items-center w-100 value-proposition__content">
                          <img
                            className="value-proposition__img"
                            src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw3206e904/homepage/pack@2x.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png"
                            alt="  "
                            title="  "
                          />
                          <div className="pl-3 d-flex align-items-center value-proposition__text">
                            <p className="rc-margin-bottom--none rc-intro">
                              <FormattedMessage id="home.convenientTip1" />
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-xxl-4 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
                        <div className="d-flex justify-content-center align-items-center w-100 value-proposition__content">
                          <img
                            className="value-proposition__img"
                            src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw0093423f/homepage/delivery@2x.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png"
                            alt="  "
                            title="  "
                          />
                          <div className="pl-3 d-flex align-items-center value-proposition__text">
                            <p className="rc-margin-bottom--none rc-intro">
                              <FormattedMessage
                                id="home.convenientTip2"
                                values={{
                                  val: formatMoney(
                                    process.env.REACT_APP_MINIMUM_AMOUNT
                                  )
                                }}
                              />
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-xxl-4 d-flex px-0  pl-md-2 pr-md-0 pr-xxl-3 pl-xxl-0 justify-content-center">
                        <div className="d-flex justify-content-center align-items-center w-100 value-proposition__content">
                          <img
                            className="value-proposition__img"
                            src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw91a30682/homepage/question@2x.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png"
                            alt="  "
                            title="  "
                          />
                          <div className="pl-3 d-flex align-items-center value-proposition__text">
                            <p className="rc-margin-bottom--none rc-intro">
                              <FormattedMessage id="home.convenientTip3" />
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="experience-component experience-assets-divider">
            <div
              className="rc-border-bottom rc-border-colour--brand4"
              style={{ borderBottomWidth: '4px' }}
            >
              {' '}
            </div>
          </div>
          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-centeredIconList">
                  <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile centered-icon-list">
                    <div
                      className="row col-10 col-md-5 bottom-content__icon-list mx-auto text-center"
                      style={{ justifyContent: 'center' }}
                    >
                      <div className="col-6 col-md-3 centered-icon-list__icon">
                        <img
                          src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw489a492c/homepage/Payment-secure@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png"
                          srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw489a492c/homepage/Payment-secure@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw489a492c/homepage/Payment-secure@2x.png?sw=80&amp;sh=62&amp;sm=cut&amp;sfrm=png 2x"
                          className="mx-auto"
                          alt="Secure payments"
                          title="Secure payments"
                        />
                        <p className="rc-meta text-center markup-text">
                          <FormattedMessage id="home.point1" />
                        </p>
                      </div>
                      {process.env.REACT_APP_LANG === 'de' ? null : (
                        <div className="col-6 col-md-3 centered-icon-list__icon">
                          <img
                            src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw128623a0/homepage/reimbursed@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png"
                            srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw128623a0/homepage/reimbursed@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw128623a0/homepage/reimbursed@2x.png?sw=80&amp;sh=62&amp;sm=cut&amp;sfrm=png 2x"
                            className="mx-auto"
                            alt="Quality assurance"
                            title="Quality assurance"
                          />
                          <p className="rc-meta text-center markup-text">
                            <FormattedMessage id="home.point2" />
                          </p>
                        </div>
                      )}
                      <div className="col-6 col-md-3 centered-icon-list__icon">
                        <img
                          src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dwb61f3539/homepage/premium@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png"
                          srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dwb61f3539/homepage/premium@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dwb61f3539/homepage/premium@2x.png?sw=80&amp;sh=62&amp;sm=cut&amp;sfrm=png 2x"
                          className="mx-auto"
                          alt="Premium service"
                          title="Premium service"
                        />
                        <p className="rc-meta text-center markup-text">
                          <FormattedMessage id="home.point3" />
                        </p>
                      </div>
                      <div className="col-6 col-md-3 centered-icon-list__icon">
                        <img
                          src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw2e4c369e/homepage/shippment@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png"
                          srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw2e4c369e/homepage/shippment@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw2e4c369e/homepage/shippment@2x.png?sw=80&amp;sh=62&amp;sm=cut&amp;sfrm=png 2x"
                          className="mx-auto"
                          alt="Fast shipping"
                          title="Fast shipping"
                        />
                        <p className="rc-meta text-center markup-text">
                          <FormattedMessage id="home.point4" />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-threeColumnContentBlock">
                  <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-top--sm rc-margin-top--lg--mobile three-column-content-block">
                    <FooterImage />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default Home;
