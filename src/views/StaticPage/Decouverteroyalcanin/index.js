import React from 'react';
import { Helmet } from 'react-helmet';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useSeo } from '@/framework/common';
import LazyLoad from 'react-lazyload';
import pic1 from './images/pic-01.jpg';
import pic2 from './images/pic-02.jpg';
import pic3 from './images/pic-03.jpg';
import pic4 from './images/pic-04.jpg';
import pic5 from './images/pic-05.jpg';
import pic6 from './images/pic-06.jpg';
const pageLink = window.location.href;

const HrLine = () => (
  <hr
    className="rc-max-width--xl"
    style={{ borderWidth: '8px', borderColor: '#f4f4f4' }}
  />
);

const Decouverteroyalcanin = (props) => {
  const [seoinfo] = useSeo();
  const event = {
    page: {
      type: '',
      theme: '',
      path: props.location.pathname
    }
  };
  const redirectLink = (link) => {
    location.href = link;
  };
  return (
    <div>
      <GoogleTagManager key={props.location.key} additionalEvents={event} />
      <Helmet>
        <link rel="canonical" href={pageLink} />
        <title>{seoinfo.title}</title>
        <meta name="description" content={seoinfo.metaDescription} />
        <meta name="keywords" content={seoinfo.metaKeywords} />
      </Helmet>
      <Header {...props} showMiniIcons={true} showUserIcon={true} />
      <div className="rc-content--fixed-header rc-bg-colour--brand3 decouverteroyalcanin">
        <div
          className="rc-layout-container rc-two-column  rc-max-width--xl rc-padding-x--xl
        rc-padding-top--md rc-padding-bottom--md items-center"
        >
          <div className="rc-column order-2 md:order-1">
            <div style={{ maxWidth: '504px' }} className="">
              <h1 className="xs: text-3xl lg:text-5xl  rc-padding-bottom--sm text-rc-red">
                INSTINCT L'EXPOSITION
              </h1>
              <p className="xs:text-base lg:text-xl">
                Royal Canin ouvre dans le 3ème arrondissement une nouvelle
                exposition, un lieu unique en son genre pour vous, vos chiens et
                vos chats. Un espace qui célèbre la magnificense de l'animal de
                compagnie.
              </p>
            </div>
          </div>
          <div className="rc-column order-1 md:order-2">
            <LazyLoad>
              {/* {`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/icons/addresses.svg`} */}
              <video
                width="584"
                height="365"
                src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/INSTINCT_FR_DEF.mp4`}
                controls
                className="border"
              >
                您的浏览器不支持 video 标签。
              </video>
            </LazyLoad>
          </div>
        </div>

        <div className="rc-layout-container rc-two-column rc-padding-x--xl  rc-max-width--xl items-center">
          <div className="rc-column">
            <h2 className="xs:text-xl lg:text-3xl rc-padding-bottom--sm text-rc-red">
              Venez découvrir la beauté des chiens et des chats
            </h2>
            <p className="rc-padding-bottom--sm">
              À travers l’exposition Instinct, nous souhaitons partager notre
              passion pour les chiens et les chats. Célébrer leurs magnificence
              et déclarer au monde entier l’amour que nous avons pour ces
              animaux Cette exposition a été imaginé autour de ce qui nous
              rapproche de nos animaux : l’instinct.
            </p>
            <p className="rc-padding-bottom--sm">
              “Tendance innée et puissante, commune à tous les êtres vivants ou
              à tous les individus d'une même espèce”
            </p>
            <p>
              L’exposition pet friendly et gratuite sera présentée dans notre
              boutique « À la découverte de ROYAL CANIN® » pendant 3 mois, du 19
              Mai au 19 Août.
            </p>
          </div>
          <div className="rc-column">
            <LazyLoad>
              <img
                src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/RC_Affiches A34.jpg`}

                // src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/static-page/decouverteroyalcanin/pic2.png`}
              />
            </LazyLoad>
          </div>
        </div>
        <div className="rc-layout-container rc-one-column rc-max-width--xl items-center rc-padding-bottom--md  rc-padding-x--xl">
          <div className="rc-column">
            <p className="rc-padding-bottom--sm">
              Cette collection privée de 27 tirages est disponible au grand
              publique, ces œuvres représentent chacune un instinct :
              protecteur, séducteur, frondeur, joueur et prédateur.
            </p>
          </div>
        </div>
        <HrLine />

        <div className="rc-layout-container rc-two-column  rc-max-width--xl  rc-padding-x--xl items-center rc-padding-y--md">
          <div className="rc-column">
            <LazyLoad>
              <img
                src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/decouverteroyalcaninhot3.png`}
              />
            </LazyLoad>
          </div>
          <div className="rc-column">
            <div style={{ maxWidth: '450px' }} className="m-auto">
              <h2 className="xs:text-xl lg:text-3xl rc-padding-bottom--sm text-rc-red">
                D'incroyables moments
              </h2>
              <p style={{ maxWidth: '440px' }}>
                Les instants capturés par Tim Flach, Alexander Crispin, Éric
                Isselée et Dan Burn-Forti  dévoilent les instincts en
                nuances.Chez ROYAL CANIN®, nous aimons ces instincts et ces
                instants partagés. C’est pourquoi il nous parait si essentiel de
                veiller dans les moindres détails à la santé et au bien-être de
                nos chats et nos chiens. A la fin de l’exposition, on pourra
                acheter si on le souhaite, le livre de l’exposition, qui sera
                comme une extension de cette dernière. Dans ce livre, on pourra
                y trouver des clichés inédits non exposé, la vision de nos
                photographes sur « l’instinct » et bien sûr le souvenir d’un
                moment de ces instants d’émotions devant ces photographies.
              </p>
            </div>
          </div>
        </div>
        <HrLine />

        <div className="rc-layout-container rc-one-column  rc-max-width--xl  rc-padding-top--md  rc-padding-bottom--md   rc-padding-x--xl ">
          <div className="text-center m-auto">
            <h2 className="xs:text-xl lg:text-3xl rc-padding-top--xs rc-padding-bottom--sm text-rc-red">
              Venez découvrir l'Exposition Instinct
            </h2>
            <button
              className="rc-btn rc-btn--two rc-margin-bottom--xs"
              onClick={() =>
                redirectLink(
                  'https://www.google.com/maps/place/%C3%80+la+d%C3%A9couverte+de+Royal+Canin/@48.8640126,2.362786,17z/data=!3m1!4b1!4m5!3m4!1s0x47e66f0182a25dc7:0xe8b708c92eb2e656!8m2!3d48.8640501!4d2.3648312'
                )
              }
            >
              Où nous trouver
            </button>
            {/* <h4
              style={{ color: '#E2001A' }}
              className="xs:text-base lg:text-xl rc-padding-y--xs"
            >
              Où nous trouver
            </h4> */}
            <p className="rc-padding-top--xs">
              Ouverture du 19 Mai au 19 Août 2022
            </p>

            <p>126, rue de Turenne, 75003 Paris</p>

            <p className="rc-padding-bottom--sm">Métro : Filles du Calvaire</p>
            <LazyLoad>
              <img
                src={pic6}
                style={{ maxWidth: '400px', width: '100%' }}
                // src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/static-page/decouverteroyalcanin/pic6.png`}
              />
            </LazyLoad>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Decouverteroyalcanin;
