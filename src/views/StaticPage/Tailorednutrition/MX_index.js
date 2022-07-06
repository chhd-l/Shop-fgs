import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import LazyLoad from 'react-lazyload';

import { inject, observer } from 'mobx-react';
import BreadCrumbs from '@/components/BreadCrumbs';
import { seoHoc } from '@/framework/common';
import './index.css';
import { Canonical } from '@/components/Common';

const localItemRoyal = window.__.localItemRoyal;

@injectIntl
@seoHoc('Health and nutrition page')
class Tailorednutrition extends React.Component {
  render(h) {
    const event = {
      page: {
        type: 'Content',
        theme: 'Health Nutrition',
        path: location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: ''
      }
    };
    return (
      <div>
        <GoogleTagManager
          key={this.props.location.key}
          additionalEvents={event}
        />
        <Canonical />
        <Header {...this.props} showMiniIcons={true} showUserIcon={true} />
        <main className="rc-content--fixed-header rc-bg-colour--brand3">
          <BannerTip />
          <BreadCrumbs />

          <div className="storefront-page">
            <nav
              className="rc-progress rc-progress--breadcrumbs-stepped rc-max-width--xl rc-padding-x--sm rc-padding-y--xs rc-margin-top--xs "
              data-progress-setup="true"
            ></nav>
            <div className="experience-region experience-main">
              <div className="experience-component experience-layouts-1column">
                <div className="row rc-margin-x--none">
                  <div className="rc-full-width">
                    <div className="experience-component experience-assets-headingBlock">
                      <div className="rc-max-width--md text-center rc-margin-y--md">
                        <div className="rc-alpha inherit-fontsize">
                          <h1>La salud es nuestra obsesión&nbsp;</h1>
                        </div>
                        <div className="rc-intro inherit-fontsize children-nomargin rc-margin-bottom--sm heading-block-content">
                          <h2>
                            Nuestra pasión por la salud animal nos ha inspirado
                            con muchas innovaciones para todos los gatos y
                            perros, independientemente de su edad, sensibilidad,
                            raza, estilo de vida y necesidades específicas.
                            Durante más de 50 años, hemos estado elaborando
                            alimentos que respaldan la salud y promueven el
                            bienestar de cachorros, gatitos, perros y gatos en
                            todo el mundo.
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="experience-component experience-layouts-1column">
                <div className="row rc-margin-x--none">
                  <div className="rc-full-width">
                    <div className="experience-component experience-assets-contentBlock">
                      <div className="rc-content-block rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile content-block rc-max-width--lg">
                        <a
                          id="undefined"
                          name="undefined"
                          className="page-section-anchor"
                          aria-hidden="true"
                        ></a>
                        <div className="row align-items-md-center">
                          <div className=" col-12 col-lg-6">
                            <div className="text-center text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                              <h2 className="rc-beta markup-text">
                                ¿Qué es una dieta a la medida?
                              </h2>
                              <p>
                                Diseñamos alimentos para satisfacer necesidades
                                únicas con gran precisión. Cada alimento
                                fabricado proporciona a cada gato o perro los
                                nutrientes y aminoácidos que necesita para
                                apoyar sus músculos, mantener su cuerpo en buen
                                estado de salud y ayudarlo a fortalecer sus
                                defensas naturales.
                              </p>
                            </div>
                          </div>
                          <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
                            <picture>
                              <img
                                className="w-100 lazyloaded"
                                src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/SACRED_BIRMAN_KITTEN___BIRTH___GROWTH___BRAND_EMBLEMATIC_Med._Res.___Basic-1.jpg`}
                                alt="Alimentation sur mesure - Chats"
                                title="Alimentation sur mesure - Chats"
                              />
                            </picture>
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
                    <div className="experience-component experience-assets-contentBlock">
                      <div className="rc-content-block rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile content-block rc-max-width--lg">
                        <a
                          id="undefined"
                          name="undefined"
                          className="page-section-anchor"
                          aria-hidden="true"
                        ></a>
                        <div className="row align-items-md-center">
                          <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
                            <LazyLoad>
                              <img
                                className="w-100 lazyloaded"
                                src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/GERMAN_SHEPHERD_PUPPY___BRAND_-_BREED_EMBLEMATIC_Med._Res.___Basic.jpg`}
                                alt="Alimentation sur mesure - Chiens"
                                title="Alimentation sur mesure - Chiens"
                              />
                            </LazyLoad>
                          </div>
                          <div className=" col-12 col-lg-6">
                            <div className="text-center text-center text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                              <h2 className="rc-beta markup-text">
                                Fórmulas Desarrolladas
                              </h2>
                              <p>
                                Tomemos el ejemplo de un pastor alemán: es
                                particularmente apreciado por su coraje, lealtad
                                e inteligencia. Sin embargo, a pesar de su gran
                                fortaleza física y mental, el pastor alemán es
                                conocido por su sensibilidad digestiva. Por ello
                                hemos desarrollado una fórmula adecuada que
                                contiene proteínas de fácil asimilación y fibras
                                específicas para que sea tan fuerte por dentro
                                como por fuera.
                              </p>
                            </div>
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
                    <div className="experience-component experience-assets-contentBlock">
                      <div className="rc-content-block rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile content-block rc-max-width--lg">
                        <a
                          id="undefined"
                          name="undefined"
                          className="page-section-anchor"
                          aria-hidden="true"
                        ></a>
                        <div className="row align-items-md-center">
                          <div className=" col-12 col-lg-6">
                            <div className="text-center text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                              <h2 className="rc-beta markup-text">
                                Alimenta su Salud
                              </h2>
                              <p>
                                Un jack russell perfectamente saludable puede
                                saltar seis veces su tamaño. Fomentar su
                                increíble potencial natural con proteínas y
                                antioxidantes especialmente seleccionados, ayuda
                                a satisfacer sus necesidades específicas.
                              </p>
                            </div>
                          </div>
                          <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
                            <picture data-rc-feature-objectfillpolyfill-setup="true">
                              <img
                                className="w-100 lazyloaded"
                                alt="Chiens - Alimentation en fonction de la taille"
                                title="Chiens - Alimentation en fonction de la taille"
                                src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/JACK_RUSSEL_TERRIER_ADULT_-_VET_VHN_Med._Res.___Basic.jpg`}
                              />{' '}
                            </picture>
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
                    <div className="experience-component experience-assets-contentBlock">
                      <div className="rc-content-block rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile content-block rc-max-width--lg">
                        <a
                          id="undefined"
                          name="undefined"
                          className="page-section-anchor"
                          aria-hidden="true"
                        ></a>
                        <div className="row align-items-md-center">
                          <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
                            <picture>
                              <img
                                className="w-100 lazyloaded"
                                alt="Alimentation sur mesure - Races"
                                title="Alimentation sur mesure - Races"
                                src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/ROYAL_CANIN_50_YEARS_IMAGES_PERSIAN_3_12_Med._Res.___Basic.jpg`}
                              />
                            </picture>
                          </div>
                          <div className=" col-12 col-lg-6">
                            <div className="text-center text-center text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                              <h2 className="rc-beta markup-text">
                                Alimentos diseñados para satisfacer necesidades
                                únicas
                              </h2>
                              <p>
                                Muchas mascotas tienen mandíbulas y
                                comportamientos específicos que afectan la forma
                                en que comen. Es por ello que no solo adaptamos
                                nuestras recetas a un nivel nutricional, sino
                                que también estudiamos la forma y textura de
                                cada croqueta para satisfacer mejor las
                                necesidades físicas de cada animal.
                              </p>
                            </div>
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
                    <div className="experience-component experience-assets-textContent">
                      <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile richtext text-center ">
                        <h2 className="text-cs-primary rc-beta markup-text">
                          El Resultado
                        </h2>
                        <br />
                        <p>
                          El resultado es una dieta diseñada para satisfacer
                          necesidades específicas de salud con gran precisión.
                          Esta dieta proporciona a tu mascota un conjunto
                          completo y equilibrado de nutrientes y aminoácidos que
                          necesita para desarrollar músculos fuertes, mantener
                          un cuerpo saludable y fortalecer su sistema
                          inmunológico. Dale toda la energía que necesita para
                          prosperar y tener la mejor salud posible.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="experience-component experience-layouts-1column">
                <div className="row rc-margin-x--none">
                  <div className="rc-full-width"></div>
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

export default Tailorednutrition;
