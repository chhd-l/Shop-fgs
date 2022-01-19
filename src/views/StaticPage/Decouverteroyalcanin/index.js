import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { setSeoConfig } from '@/utils/utils';
import './index.less';
const pageLink = window.location.href;

const Decouverteroyalcanin = (props) => {
  const [seoinfo, setSeoinfo] = useState({});
  const event = {
    page: {
      type: '',
      theme: '',
      path: props.location.pathname
    }
  };
  useEffect(() => {
    setSeoConfig({
      pageName: ''
    }).then((res) => {
      setSeoinfo(res);
    });
  });
  return (
    <div>
      <GoogleTagManager additionalEvents={event} />
      <Helmet>
        <link rel="canonical" href={pageLink} />
        <title>{seoinfo.title}</title>
        <meta name="description" content={seoinfo.metaDescription} />
        <meta name="keywords" content={seoinfo.metaKeywords} />
      </Helmet>
      <Header {...props} showMiniIcons={true} showUserIcon={true} />
      <div className="rc-content--fixed-header rc-bg-colour--brand3 decouverteroyalcanin">
        <div className="rc-layout-container rc-two-column  rc-max-width--xl rc-padding-left--md items-center">
          <div className="rc-column">
            <div style={{ maxWidth: '504px' }} className="m-auto">
              <h1 className="xs: text-3xl lg:text-5xl  rc-padding-bottom--md">
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
            <img
              src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/static-page/decouverteroyalcanin/pic1.png`}
            />
          </div>
        </div>

        <div className="rc-layout-container rc-two-column rc-padding-x--xl  rc-max-width--xl items-center">
          <div className="rc-column">
            <h2 className="xs:text-xl lg:text-3xl rc-padding-bottom--md">
              Expériences incroyables
            </h2>
            <p className="rc-padding-bottom--sm">
              Incroyable Aventure : venez découvrir l’histoire et le patrimoine
              de Royal Canin avec une frise chronologique numérique innovante et
              interactive.{' '}
            </p>
            <p className="rc-padding-bottom--xs rc-padding-top--xs">
              Incroyables Amis : participez à un quizz ludique pour mieux
              comprendre le comportement de vos chats et chiens.
            </p>
            <p className="rc-padding-bottom--xs rc-padding-top--xs">
              Incroyable Sens : découvrez comment vos animaux perçoivent le
              monde, comment ils le sentent, le voient et l’entendent.
              Plongez-vous dans une pièce immersive qui avec des écrans incurvés
              nouvelle génération, des bancs chauffants et vibrants, vous
              permettra de ressentir ce que ressentent vos animaux.
            </p>
          </div>
          <div className="rc-column">
            <img
              src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/static-page/decouverteroyalcanin/pic2.png`}
            />
          </div>
        </div>

        <div className=" rc-max-width--xl items-center rc-padding-y--md  rc-padding-x--xl">
          <div class="rc-layout-container rc-one-column">
            <div class="rc-column">
              <p>
                Incroyable Aventure : venez découvrir l’histoire et le
                patrimoine de Royal Canin avec une frise chronologique numérique
                innovante et interactive.
              </p>
              <br />
              <p>
                Incroyables Amis : participez à un quizz ludique pour mieux
                comprendre le comportement de vos chats et chiens.
              </p>
              <br />
              <p>
                Incroyable Sens : découvrez comment vos animaux perçoivent le
                monde, comment ils le sentent, le voient et l’entendent.
                Plongez-vous dans une pièce immersive qui avec des écrans
                incurvés nouvelle génération, des bancs chauffants et vibrants,
                vous permettra de ressentir ce que ressentent vos animaux.
              </p>
              <p>
                <button class="rc-btn rc-btn--two" disabled="">
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
        </div>

        <div className="rc-layout-container rc-two-column  rc-max-width--xl">
          <div className="rc-column">
            <img
              src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/static-page/decouverteroyalcanin/pic3.png`}
            />
          </div>
          <div className="rc-column">
            <h2>A la découverte des expériences Royal Canin</h2>
            <p>
              Faites l’expérience du monde du point de vue de votre compagnon
              chat ou chien. Vous êtes-vous déjà demandé comment votre chien ou
              votre chat voit, sent et entend le monde qui l’entoure ? Cette
              aventure immersive et multi-sensorielle vous donnera un aperçu
              étonnant de la vie de votre animal.
            </p>
          </div>
        </div>

        <div className="rc-layout-container rc-two-column  rc-max-width--xl">
          <div className="rc-column">
            <h2>
              Venez écouter et échanger avec nos experts sur tous les sujets
              autour des chiens et chats
            </h2>
            <p>
              Royal Canin a toujours quelque chose de différent et d’instructif
              à proposer. Des ateliers indoor, des activités en extérieur, des
              rencontres pilotées par des experts et bien plus encore.
            </p>
          </div>
          <div className="rc-column">
            <img
              src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/static-page/decouverteroyalcanin/pic4.png`}
            />
          </div>
        </div>

        <div className="rc-layout-container rc-two-column  rc-max-width--xl">
          <div className="rc-column">
            <img
              src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/static-page/decouverteroyalcanin/pic5.png`}
            />
          </div>
          <div className="rc-column">
            <h2>
              Incroyables moments : une séance photo professionnelle avec votre
              animal
            </h2>
            <p>
              Offrez vous une séance photo avec un photographe professionnel
              pour immortaliser votre relation avec votre animal.
            </p>
          </div>
        </div>
        <div className=" rc-max-width--xl">
          <h2>Venez à la découverte de Royal Canin</h2>
          <h4>Où nous trouver</h4>
          <p>
            {`Ouverture le 24 janvier 2022 
126, rue de Turenne, 75003 Paris 
Métro : Filles du Calvaire`}
          </p>
          src=
          {`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/static-page/decouverteroyalcanin/pic6.png`}
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Decouverteroyalcanin;
