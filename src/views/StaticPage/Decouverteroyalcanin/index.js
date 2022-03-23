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
          <div className="rc-column">
            <div style={{ maxWidth: '504px' }} className="">
              <h1 className="xs: text-3xl lg:text-5xl  rc-padding-bottom--sm text-rc-red">
                Venez à la découverte de Royal Canin
              </h1>
              <p className="xs:text-base lg:text-xl">
                Royal Canin ouvre dans le 3ème arrondissement un nouveau concept
                store, un lieu unique en son genre pour vous, vos chiens et
                chats. Un espace de découvertes, d’expériences immersives
                alliant nouvelles technologies et tout notre savoir-faire
                animalier pour mieux comprendre vos animaux.
              </p>
            </div>
          </div>
          <div className="rc-column">
            <LazyLoad>
              <img
                src={pic1}
                // src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/static-page/decouverteroyalcanin/pic1.png`}
              />
            </LazyLoad>
          </div>
        </div>

        <div className="rc-layout-container rc-two-column rc-padding-x--xl  rc-max-width--xl items-center">
          <div className="rc-column">
            <h2 className="xs:text-xl lg:text-3xl rc-padding-bottom--sm text-rc-red">
              Expériences incroyables
            </h2>
            <p className="rc-padding-bottom--sm">
              <span className="font-semibold">Incroyable Aventure </span>: venez
              découvrir l’histoire et le patrimoine de Royal Canin avec une
              frise chronologique numérique innovante et interactive.{' '}
            </p>
            <p className="rc-padding-bottom--sm">
              <span className="font-semibold">Incroyables Amis</span> :
              participez à un quizz ludique pour mieux comprendre le
              comportement de vos chats et chiens.
            </p>
            <p>
              <span className="font-semibold">Incroyable Sens</span> : découvrez
              comment vos animaux perçoivent le monde, comment ils le sentent,
              le voient et l’entendent. Plongez-vous dans une pièce immersive
              qui avec des écrans incurvés nouvelle génération, des bancs
              chauffants et vibrants, vous permettra de ressentir ce que
              ressentent vos animaux.
            </p>
          </div>
          <div className="rc-column">
            <LazyLoad>
              <img
                src={pic2}

                // src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/static-page/decouverteroyalcanin/pic2.png`}
              />
            </LazyLoad>
          </div>
        </div>
        <div className="rc-layout-container rc-one-column rc-max-width--xl items-center rc-padding-bottom--md  rc-padding-x--xl">
          <div className="rc-column">
            <p className="rc-padding-bottom--sm">
              <span className="font-semibold">Incroyable Nutrition</span> :
              partez à la découverte de l’histoire de nos produits et de toutes
              nos innovations scientifiques. 
            </p>
            <p className="rc-padding-bottom--sm">
              <span className="font-semibold">
                Incroyables Chiots & Chatons
              </span>{' '}
              : vous voulez adopter mais vous ne savez pas encore quel serait
              votre compagnon idéal ? Avec cette expérience incroyable, en
              fonction de votre profil et votre mode de vie, nous allons vous
              aider à trouver le chien ou le chat de vos rêves.
            </p>
            <p className="rc-padding-bottom--sm">
              <span className="font-semibold">Incroyables Innovations </span>:
              découvrez toutes les innovations de Royal Canin qui vont bien
              au-delà de la nutrition.
            </p>

            <p className="rc-padding-bottom--sm">
              <span className="font-semibold">Incroyables Experts</span> :
              partez à la rencontre des experts Royal Canin. Chaque semaine,
              nous allons inviter des vétérinaires, des éleveurs, des
              psychologues pour animaux et plein d’autres professionnels
              animaliers pour animer des conférences et des workshops.
            </p>
            <p className="rc-padding-bottom--xs">
              <span className="font-semibold">Incroyables Moments </span>: qui
              n’a pas rêvé d’avoir une photo de soi avec son animal prise par un
              vrai photographe professionnel ? Royal Canin vous offre votre
              portrait avec votre animal pour fêter l’ouverture de notre concept
              store.
            </p>
            <p className="rc-padding-top--md rc-padding-bottom--xs">
              <button
                className="rc-btn rc-btn--two"
                onClick={() =>
                  redirectLink(
                    'https://www.google.com/maps/place/%C3%80+la+d%C3%A9couverte+de+Royal+Canin/@48.8640126,2.362786,17z/data=!3m1!4b1!4m5!3m4!1s0x47e66f0182a25dc7:0xe8b708c92eb2e656!8m2!3d48.8640501!4d2.3648312'
                  )
                }
              >
                Nous rendre visite
              </button>
            </p>
            <p>
              Ouverture le 24 Janvier 2022
              <br />
              126, rue de Turenne, 75003 Paris
              <br />
              Metro : Filles du Calvaire
            </p>
          </div>
        </div>
        <HrLine />

        <div className="rc-layout-container rc-two-column  rc-max-width--xl  rc-padding-x--xl items-center rc-padding-y--md">
          <div className="rc-column">
            <LazyLoad>
              <img
                src={pic3}

                // src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/static-page/decouverteroyalcanin/pic3.png`}
              />
            </LazyLoad>
          </div>
          <div className="rc-column">
            <div style={{ maxWidth: '450px' }} className="m-auto">
              <h2 className="xs:text-xl lg:text-3xl rc-padding-bottom--sm text-rc-red">
                A la découverte des expériences Royal Canin
              </h2>
              <p style={{ maxWidth: '440px' }}>
                Faites l’expérience du monde du point de vue de votre compagnon
                chat ou chien. Vous êtes-vous déjà demandé comment votre chien
                ou votre chat voit, sent et entend le monde qui l’entoure ?
                Cette aventure immersive et multi-sensorielle vous donnera un
                aperçu étonnant de la vie de votre animal.
              </p>
            </div>
          </div>
        </div>
        <HrLine />

        <div className="rc-layout-container rc-two-column  rc-max-width--xl  rc-padding-x--xl items-center rc-padding-y--md">
          <div className="rc-column">
            <div style={{ maxWidth: '450px' }}>
              <h2 className="xs:text-xl lg:text-3xl rc-padding-bottom--sm text-rc-red">
                Venez écouter et échanger avec nos experts sur tous les sujets
                autour des chiens et chats
              </h2>
              <p
                className="rc-padding-bottom--sm"
                style={{ maxWidth: '440px' }}
              >
                Royal Canin a toujours quelque chose de différent et
                d’instructif à proposer. Des ateliers indoor, des activités en
                extérieur, des rencontres pilotées par des experts et bien plus
                encore.
              </p>
              <button
                className="rc-btn rc-btn--two"
                onClick={() =>
                  redirectLink(
                    'https://www.eventbrite.com/cc/incroyables-experts-85279?utm-campaign=social&utm-content=creatorshare&utm-medium=discovery&utm-term=odclsxcollection&utm-source=cp&aff=escb'
                  )
                }
              >
                Réservez vite
              </button>
            </div>
          </div>
          <div className="rc-column">
            <LazyLoad>
              <img
                src={pic4}

                // src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/static-page/decouverteroyalcanin/pic4.png`}
              />
            </LazyLoad>
          </div>
        </div>
        <HrLine />

        <div className="rc-layout-container rc-two-column  rc-max-width--xl rc-padding-x--xl rc-padding-top--md rc-padding-bottom--md items-center">
          <div className="rc-column flex justify-center">
            <LazyLoad style={{ width: '50%' }}>
              <img
                src={pic5}

                // src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/static-page/decouverteroyalcanin/pic5.png`}
              />
            </LazyLoad>
          </div>
          <div className="rc-column">
            <div style={{ maxWidth: '450px' }}>
              <h2 className="xs:text-xl lg:text-3xl rc-padding-bottom--sm text-rc-red">
                Incroyables moments : une séance photo professionnelle avec
                votre animal
              </h2>
              <p className="rc-padding-bottom--sm">
                Offrez vous une séance photo avec un photographe professionnel
                pour immortaliser votre relation avec votre animal.
              </p>
              <button
                className="rc-btn rc-btn--two"
                onClick={() =>
                  redirectLink(
                    'https://www.eventbrite.com/cc/incroyables-moments-85499?utm-campaign=social&utm-content=creatorshare&utm-medium=discovery&utm-term=odclsxcollection&utm-source=cp&aff=escb'
                  )
                }
              >
                Inscrivez-vous{' '}
              </button>
            </div>
          </div>
        </div>
        <HrLine />

        <div className="rc-layout-container rc-one-column  rc-max-width--xl  rc-padding-top--md  rc-padding-bottom--md   rc-padding-x--xl ">
          <div className="text-center m-auto">
            <h2 className="xs:text-xl lg:text-3xl rc-padding-top--xs rc-padding-bottom--sm text-rc-red">
              Venez à la découverte de Royal Canin
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
            <p className="rc-padding-top--xs">Ouverture le 24 janvier 2022</p>

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
