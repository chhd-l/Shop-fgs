import React from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import BreadCrumbs from '../components/BreadCrumbs';
import { Link } from 'react-router-dom';
import './index.less';
import HrLine from '../components/HrLine';
const TailoredNutrition = () => {
  return (
    <div className="ru-local-tailored-nutrition">
      <Header showMiniIcons={true} showUserIcon={true} />
      <main className="rc-content--fixed-header rc-bg-colour--brand3">
        <BreadCrumbs />
        <div
          className="rc-padding--sm rc-margin-bottom--xs rc-bg-colour--brand3 hero-panel"
          data-component="content-animation"
          id="hero-panel-1-tailored-nutrition-page"
        >
          <div className="rc-padding-y--md rc-md-down"></div>
          <div className="rc-layout-container rc-two-column rc-max-width--xl rc-content-h-middle ">
            <div className="rc-column   rc-text--left">
              <div className="rc-full-width">
                <div>
                  <h1 className="rc-alpha ">
                    Здоровье каждого питомца уникально
                  </h1>
                  <p className="text-jutext-justify">
                    С 1968 года мы в мельчайших подробностях изучаем уникальные
                    потребности кошек и собак, связанные с особенностями их
                    здоровья. За это время мы узнали, что даже небольшая разница
                    в пищевой ценности кормов может значительно влиять на жизнь
                    и здоровье вашего питомца.
                  </p>
                </div>
              </div>
            </div>
            <div className="rc-column   rc-text--left">
              <div className="rc-full-width">
                <img className="lazyautosizes lazyloaded" 
                src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/ru-local/tailored-nutrition/10001.jpg`}
                />
              </div>
            </div>
          </div>
          <div className="rc-padding-y--md rc-md-down"></div>
        </div>
        <HrLine />
        <div
          className="rc-margin--none rc-bg-colour--brand3 rc-full-width "
          data-component="content-animation"
          id="content-block-with-text-2-tailored-nutrition-page"
        >
          <div className="rc-padding-y--md rc-md-down"></div>
          <div className="rc-layout-container rc-one-column rc-text--center rc-max-width--md">
            <div className="rc-column">
              <div className="rc-full-width">
                <div className="rc-container-text">
                  <h2
                    className="rc-beta "
                    data-en-title="Что такое питание, учитывающее особые потребности?"
                  >
                    Что такое питание, учитывающее особые потребности?
                  </h2>
                  <p>
                    В каждой формуле количество натуральных антиоксидантов,
                    витаминов, клетчатки, пребиотиков и минеральных веществ
                    точно рассчитано для удовлетворения уникальных потребностей
                    вашего питомца, связанных с особенностями его здоровья.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="rc-padding-y--md rc-md-down"></div>
        </div>
        <div>slider mock</div>
        <HrLine />

        <div
          className="rc-margin--none rc-bg-colour--brand3 rc-full-width "
          data-component="content-animation"
          id="content-block-with-text-1-tailored-nutrition-page"
        >
          <div className="rc-padding-y--md rc-md-down"></div>
          <div className="rc-layout-container rc-one-column rc-text--center rc-max-width--md">
            <div className="rc-column">
              <div className="rc-full-width">
                <div className="rc-container-text">
                  <h2
                    className="rc-beta "
                    data-en-title="Разработано с учетом потребностей, связанных с особенностями здоровья"
                  >
                    Разработано с учетом потребностей, связанных с особенностями
                    здоровья
                  </h2>
                  <p>
                    Здоровье каждой кошки и собаки так же уникально, как и они
                    сами. Однако потребности, связанные с особенностями
                    здоровья, зачастую определяются размерами, породой или
                    образом жизни животного. Узнайте, как наши гаммы продуктов
                    могут помочь каждому животному поддерживать здоровье и
                    физическую форму.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="rc-padding-y--md rc-md-down"></div>
        </div>

        <div>tab mock</div>
        <div className="rc-padding-y--sm rc-showhide">
          <div
            className="rc-padding--sm rc-margin--none rc-bg-colour--brand3"
            data-component="content-animation"
          >
            <div className="rc-padding-y--md rc-md-down"></div>
            <div className="rc-layout-container rc-two-column rc-content-h-middle rc-max-width--xl ">
            <div className="rc-column rc-single "></div>
              <div className="rc-column rc-single ">
                <div
                  className="rc-padding--sm rc-full-width rc-margin-bottom--xs rc-bg-colour--brand3 "
                  data-component="content-animation"
                  id="content-block-with-text-and-image-15-tailored-nutrition-page"
                >
                  <div className="rc-padding-y--md rc-md-down"></div>
                  <div className="rc-layout-container rc-one-column rc-max-width--xl">
                    <div className="rc-column">
                      <div className="rc-full-width ">
                        <img className="lazyautosizes lazyloaded" 
                        src="https://cdn.royalcanin-weshare-online.io/M-fKpHoBaPOZra8q8bYa/v5/0090721-banner2-1?w=320"
                />
                      </div>
                    </div>
                  </div>
                  <div className="rc-layout-container rc-one-column rc-max-width--xl">
                    <div className="rc-column">
                      <div className="rc-full-width rc-text--center ">
                        <div className="rc-container-text">
                          <h4>Повседневный корм</h4>
                          <h2
                            className="rc-beta "
                            data-en-title="Корм для котят"
                          >
                            Корм для котят
                          </h2>
                          <Link
                            className="rc-btn rc-btn--two"
                           to="/cats/products/kitten"
                          >
                            Узнайте больше
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rc-padding-y--md rc-md-down"></div>
                </div>
              </div>
              <div className="rc-column rc-single "></div>
            </div>
            <div className="rc-padding-y--md rc-md-down"></div>
          </div>
        </div>
        <HrLine alwaysShow={true}/>
        <div className="rc-padding--sm rc-margin-bottom--xs rc-bg-colour--brand3 rc-animation-001--base rc-animation-001--active"></div>
      </main>
      <Footer />
    </div>
  );
};
export default TailoredNutrition;
