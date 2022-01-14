import React, { useEffect } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import LazyLoad from 'react-lazyload';
import { getDeviceType } from '@/utils/utils';
import emailImg from '@/assets/images/emailus_icon@1x.jpg';
import callImg from '@/assets/images/customer-service@2x.jpg';
import helpImg from '@/assets/images/slider-img-help.jpg';
import recommendation2 from '@/assets/images/fr_recommendation2.png';
import recommendation3 from '@/assets/images/fr_recommendation3.png';
import recommendation4 from '@/assets/images/fr_recommendation4.png';

const isMobile = getDeviceType() === 'H5';
const FrDefault = (props) => {
  return (
    <div className="rc-content-block rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile content-block rc-max-width--lg">
      <div className="row align-items-md-center">
        <div className=" col-12 col-lg-6">
          <div className=" text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
            {/* <h2 className="rc-beta markup-text">
      <FormattedMessage id="recommendation.plusTitle" />
    </h2> */}
            <p style={{ color: 'rgb(23, 43, 77)' }}>
              <FormattedMessage id="recommendation.plusContent" />
            </p>
            {/* <button
      className={`rc-btn rc-btn--two ${
        props.buttonLoading ? 'ui-btn-loading' : ''
      } ${props.inStockProducts.length ? '' : 'rc-btn-disabled'}`}
      onClick={props.addCart}
    >
      <FormattedMessage id="recommendation.plusBtn" />
    </button> */}
          </div>
        </div>
        <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
          <LazyLoad>
            <img src={props.PuppyJPG} alt="puppy image" />
          </LazyLoad>
        </div>
      </div>
    </div>
  );
};
const FrSPT = (props) => {
  const configStore = props.configStore;
  return (
    <>
      <div className="rc-max-width--lg rc-padding-y--lg">
        <div className="rc-max-width--md text-center rc-padding-x--sm">
          <h2 className="rc-beta text-center">
            Ne manquez jamais de nourriture pour votre animal!
          </h2>
          <div className="rc-intro inherit-fontsize children-nomargin rc-margin-bottom--md--mobile">
            <h2>
              Notre service d'expédition automatique est conçu pour vous
              simplifier la vie et vous permettre de toujours recevoir le
              meilleur régime alimentaire pour votre animal de compagnie,
              directement à votre porte.
            </h2>
          </div>
          {/* <div className="d-block d-md-none rc-text--center">
                          <Link to="/cats">
                            <button className="rc-btn rc-btn--one rc-margin-right--xs rc-margin-bottom--xs">
                              Voir les formules pour chat
                            </button>
                          </Link>
                          <Link to="/dogs">
                            <button className="rc-btn rc-btn--one rc-margin-bottom--xs">
                              Voir les formules pour chien
                            </button>
                          </Link>
                        </div> */}
        </div>
        <div className="rc-layout-container rc-two-column rc-content-h-middle flex-md-row flex-column-reverse">
          <div className="rc-column">
            <div className="rc-padding-y--lg--mobile rc-full-width">
              <ul className="rc-list rc-list--blank rc-list--align rc-list--large-icon">
                <li className="rc-list__item">
                  <em className="wof rc-margin-right--xs"></em>
                  Économisez 10% sur chaque commande
                </li>
                <li className="rc-list__item">
                  <em className="wof rc-margin-right--xs"></em>
                  Livraison automatique selon votre calendrier
                </li>
                <li className="rc-list__item">
                  <em className="wof rc-margin-right--xs"></em>
                  Livraison gratuite
                </li>
                <li className="rc-list__item">
                  <em className="wof rc-margin-right--xs"></em>
                  Modifier ou annuler à tout moment
                </li>
              </ul>
              <p style={{ marginTop: '30px', marginBottom: '30px' }}>
                <button
                  className={`rc-btn rc-btn--one ${
                    props.buttonLoading ? 'ui-btn-loading' : ''
                  } ${
                    props.inStockProducts.length ? '' : 'rc-btn-solid-disabled'
                  }`}
                  onClick={props.addCart}
                >
                  {/* <FormattedMessage id="recommendation.viewInCart" /> */}
                  S'inscrire
                </button>
              </p>
              {/* <div className="d-none d-md-block rc-btn-group m-0 rc-column rc-padding-x--none">
                              <Link to="/cats">
                                <button className="rc-btn rc-btn--one rc-margin-right--xs rc-margin-bottom--xs">
                                  Voir les formules pour chat
                                </button>
                              </Link>
                              <Link to="/dogs">
                                <button className="rc-btn rc-btn--one rc-margin-bottom--xs">
                                  Voir les formules pour chien
                                </button>
                              </Link>
                            </div> */}
            </div>
          </div>
          <div className="rc-column">
            <img
              alt="Avec l'Abonnement, ils auront toujours ce dont ils ont besoin"
              className="w-100 lazyloaded"
              src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/autoship.webp`}
            />
          </div>
        </div>
      </div>
      <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm">
        <div className="rc-margin-top--md rc-margin-top--none--mobile rc-padding-x--lg--mobile">
          <h2 className="rc-beta rc-margin--none text-center rc-padding-x--lg--mobile">
            Prêt à démarrer ?
          </h2>
        </div>
        <div className="row rc-content-v-middle text-center rc-padding-top--md rc-margin-x--none">
          <div className="col-6 col-md-3 rc-column">
            <div className="rc-margin-bottom--sm">
              <img
                className="m-auto w-auto lazyloaded"
                alt="image one"
                title="image one"
                src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/pack@180.png`}
              />
            </div>
            <h7>
              Trouvez les produits{' '}
              <strong>nutritionnels que vous avez sélectionnés</strong> dans
              votre panier.
            </h7>
          </div>
          <div className="col-6 col-md-3 rc-column">
            <div className="rc-margin-bottom--sm">
              <img
                className="m-auto w-auto lazyloaded"
                alt="image two"
                title="image two"
                src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/autoship@180.png`}
              />
            </div>
            <h7>
              Sélectionnez votre mode{' '}
              <strong>d'expédition, de livraison </strong>et{' '}
              <strong>de paiement</strong>.
            </h7>
          </div>
          <div className="col-6 col-md-3 rc-column">
            <div className="rc-margin-bottom--sm">
              <img
                className="m-auto w-auto lazyloaded"
                alt="image three"
                title="image three"
                src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/autoship2@180.png`}
              />
            </div>
            <h7>
              <strong>Recevez votre produit automatiquement</strong>, selon
              votre propre agenda.
            </h7>
          </div>
          <div className="col-6 col-md-3 rc-column">
            <div className="rc-margin-bottom--sm">
              <img
                className="m-auto w-auto lazyloaded"
                alt="image four"
                title="image four"
                src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/autoship3@180.png`}
              />
            </div>
            <h7>
              <p>
                Modifiez votre planning{' '}
                <strong>de livraison à n'importe quel moment.</strong>
              </p>
            </h7>
          </div>
        </div>

        <p className="flex justify-center mt-8 mb-0 md:mb-8">
          <button
            className={`rc-btn rc-btn--one ${
              props.buttonLoading ? 'ui-btn-loading' : ''
            } ${props.inStockProducts.length ? '' : 'rc-btn-solid-disabled'}`}
            onClick={props.addCart}
          >
            {/* <FormattedMessage id="recommendation.viewInCart" /> */}
            Commencez maintenant
          </button>
        </p>
      </div>
      <div className="help-page mb-0 md:mb-4">
        <section style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#E2001A', marginTop: isMobile ? '0' : '40px' }}>
            <FormattedMessage id="recommendation.thirdTitle" />
          </h2>
          <p className="mt-2">
            <FormattedMessage id="recommendation.thirdContent" />
          </p>
        </section>
        <div className="experience-region experience-main">
          <div className="experience-region experience-main">
            <div className="experience-component experience-layouts-1column">
              <div className="row rc-margin-x--none">
                <div className="rc-full-width">
                  <div className="experience-component experience-assets-contactUsBlock">
                    <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm">
                      <div className="rc-layout-container rc-two-column rc-margin-y--sm text-center md:text-left rc-margin-top--lg--mobile">
                        {/* <div className="rc-padding-bottom--none--mobile" style={{ width: '40%' }}>
                              <h1 className="rc-beta" style={{ margin: '0 0 0 1rem' }}>
                                <font style={{ verticalAlign: "inherit" }}>
                                  <font style={{ verticalAlign: "inherit" }}><FormattedMessage id="help.needHelp" /></font>
                                </font>
                              </h1>
                            </div>
                            <div style={{ width: '60%' }}>
                              <div className="rc-large-body inherit-fontsize children-nomargin">
                                <p>
                                  <FormattedMessage id="help.tip1" /><br /><FormattedMessage id="help.tip4" />
                                </p>
                              </div>
                            </div> */}
                      </div>
                      <div className="rc-layout-container rc-five-column rc-match-heights rc-reverse-layout-mobile text-center md:text-left">
                        <div className="rc-column rc-double-width rc-padding--none">
                          <article className="rc-full-width rc-column rc-margin-top--md--mobile">
                            <div className="rc-border-all rc-border-colour--interface fullHeight">
                              <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight rc-padding-top--md--mobile">
                                <div className="rc-column rc-double-width rc-padding-top--md--mobile">
                                  <div className="w-100">
                                    <b style={{ color: '#00BCA3' }}>
                                      <FormattedMessage id="help.byTelephone" />
                                    </b>
                                    <p>{configStore.contactTimePeriod}</p>
                                    <div className="rc-margin-top--xs">
                                      <p
                                        style={{ color: '#00BCA3' }}
                                        className="rc-numeric rc-md-up"
                                      >
                                        {configStore.storeContactPhoneNumber}
                                      </p>
                                    </div>
                                    <div className="rc-margin-top--xs">
                                      <p
                                        style={{ color: '#00BCA3' }}
                                        className="rc-alpha rc-border--none rc-md-down"
                                      >
                                        {configStore.storeContactPhoneNumber}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="rc-column rc-content-v-middle">
                                  <LazyLoad>
                                    <img
                                      className="align-self-center widthAuto"
                                      src={callImg}
                                      alt="By telephone"
                                      title="By telephone"
                                    />
                                  </LazyLoad>
                                </div>
                              </div>
                            </div>
                          </article>
                          <article className="rc-full-width rc-column">
                            <div className="rc-border-all rc-border-colour--interface fullHeight">
                              <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight rc-padding-top--md--mobile">
                                <div className="rc-column rc-double-width rc-padding-top--md--mobile">
                                  <div className="w-100">
                                    <b style={{ color: '#0087BD' }}>
                                      <FormattedMessage id="help.byEmail" />
                                    </b>
                                    <p>
                                      <span style={{ color: 'rgb(0, 0, 0)' }}>
                                        <FormattedMessage id="help.tip3" />
                                      </span>
                                    </p>
                                    <div className="rc-margin-top--xs">
                                      <p
                                        className="rc-numeric rc-md-up"
                                        style={{
                                          color: 'rgb(0, 135, 189)'
                                        }}
                                      >
                                        {configStore.storeContactEmail}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="rc-column rc-content-v-middle">
                                  <LazyLoad>
                                    <img
                                      className="align-self-center widthAuto"
                                      src={emailImg}
                                      alt="By email"
                                      title="By email"
                                    />
                                  </LazyLoad>
                                </div>
                              </div>
                            </div>
                          </article>
                        </div>
                        <div className="rc-column rc-triple-width">
                          <div
                            className="background-cover"
                            style={{
                              backgroundImage: `url(${require('@/assets/images/slider-img-help.jpg?sw=802&amp;sh=336&amp;sm=cut&amp;sfrm=png')})`
                            }}
                          >
                            <picture className="rc-card__image">
                              <LazyLoad>
                                <img src={helpImg} alt="help-icon" title="" />
                              </LazyLoad>
                            </picture>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section style={{ textAlign: 'center' }}>
        <h2 style={{ color: '#E2001A', marginTop: '40px' }}>
          <FormattedMessage id="recommendation.fourTitle" />
        </h2>
        <p className="mt-2">
          <FormattedMessage id="recommendation.fourContent" />
        </p>
        <p className="mt-4 mb-8">
          <button
            className={`rc-btn rc-btn--one ${
              props.buttonLoading ? 'ui-btn-loading' : ''
            } ${props.inStockProducts.length ? '' : 'rc-btn-solid-disabled'}`}
            onClick={props.addCart}
          >
            {/* <FormattedMessage id="recommendation.viewInCart"/> */}
            Commander
          </button>
        </p>
        <div className="experience-component experience-assets-youtubeVideo">
          <div className="rc-max-width--md rc-padding-x--lg">
            <div className="rc-video-wrapper dog-video">
              <iframe
                allowfullscreen=""
                frameborder="0"
                id="video-dog"
                className="optanon-category-4 "
                src="https://www.youtube.com/embed/Vhl0Wvpt-KQ"
              />
            </div>
          </div>
        </div>
      </section>
      <section
        className="picList list-none picListImg flex justify-center"
        style={{ textAlign: 'center', display: 'flex' }}
      >
        <li>
          <img className="" src={recommendation2} alt="recommendation image" />
        </li>
        <li>
          <img className="" src={recommendation3} alt="recommendation image" />
        </li>
        <li>
          <img className="" src={recommendation4} alt="recommendation image" />
        </li>
      </section>
    </>
  );
};
const Fr = (props) => {
  const imgUrlPreFix = `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/recommendation`;
  let PuppyJPG = `${imgUrlPreFix}/${props.intl.messages['recommendation.plusImg']}`;
  return (
    <>
      {props.isSPT ? (
        <FrSPT
          configStore={props.configStore}
          addCart={props.addCart}
          inStockProducts={props.inStockProducts}
          buttonLoading={props.buttonLoading}
        />
      ) : (
        <FrDefault PuppyJPG={PuppyJPG} />
      )}
    </>
  );
};
export default injectIntl(Fr);
