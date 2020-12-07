import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import BreadCrumbs from '@/components/BreadCrumbs';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import image1 from './images/image1.jpg';
import image2 from './images/image2.jpg';
import image3 from './images/image3.jpg';
import LazyLoad from 'react-lazyload';
import { setSeoConfig } from '@/utils/utils';

import './index.css';

const localItemRoyal = window.__.localItemRoyal;

class Help extends React.Component {
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  componentDidMount() {
    setSeoConfig();
    // if (localItemRoyal.get('isRefresh')) {
    //   localItemRoyal.remove('isRefresh');
    //   window.location.reload();
    //   return false;
    // }
  }

  render(h) {
    const event = {
      page: {
        type: 'Content',
        theme: 'Brand'
      }
    };
    return (
      <div className="recommendation">
        <GoogleTagManager additionalEvents={event} />
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={this.props.location}
          history={this.props.history}
          match={this.props.match}
        />
        <main className="rc-content--fixed-header rc-bg-colour--brand3">
          <BannerTip />
          <BreadCrumbs />
          <section
            style={{ textAlign: 'center', width: '60%', margin: '0 auto' }}
          >
            <h2
              style={{
                color: '#E2001A',
                marginTop: '40px',
                fontSize: '2.5rem'
              }}
            >
              La santé est notre obsession
            </h2>
            <p style={{ fontSize: '1.2rem' }}>
              Tout ce que nous faisons est motivé par notre passion pour la
              santé et le bien-être de chaque chien et chat.
            </p>
          </section>

          <div
            className="rc-layout-container rc-two-column"
            style={{ padding: '20px 200px' }}
          >
            <div
              className="rc-column"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div>
                <h2 style={{ color: '#666', marginTop: '40px' }}>
                  Respecter leur nature
                </h2>
                <p>
                  Nous respectons les chats et les chiens pour ce qu'ils sont :
                  des animaux de compagnie incroyables. Ce respect est né d'une
                  connaissance approfondie de leur vraie nature et de leurs
                  besoins uniques. Ce respect guide chacune de nos décisions
                  quant à nos produits et services, tout en façonnant notre
                  attitude en tant qu'entreprise.
                </p>
                <h2 style={{ color: '#666', marginTop: '40px' }}>
                  Les animaux de compagnie en premier
                </h2>
                <p>
                  Nous faisons toujours passer les besoins des animaux de
                  compagnie en premier. Cela nous donne un objectif clair pour
                  orienter nos recherches, renforce la qualité nutritionnelle de
                  tous nos produits et aide les chats et les chiens à vivre plus
                  longtemps et en meilleure santé.
                </p>
              </div>
            </div>
            <div className="rc-column">
              <LazyLoad>
              <img src={image1} style={{ width: '100%' }} alt="" />
              </LazyLoad>
            </div>
          </div>
          <div
            className="rc-layout-container rc-two-column"
            style={{ padding: '20px 200px' }}
          >
            <div className="rc-column">
              <LazyLoad>
              <img
                src={image2}
                style={{ width: '100%', marginTop: '50px' }}
                alt=""
              />
              </LazyLoad>
            </div>
            <div
              className="rc-column"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div>
                <h2 style={{ color: '#666', marginTop: '40px' }}>
                  Une précision absolue
                </h2>
                <p>
                  Nos connaissances et notre expérience approfondies nous ont
                  permis de bien comprendre les besoins des animaux de compagnie
                  et les nutriments nécessaires pour les garder en parfaite
                  santé. Cette précision garantit la haute performance de nos
                  aliments, que ce soit leur forme, leur texture, leur
                  appétence, leur digestibilité, leur innocuité ou leur
                  traçabilité.
                </p>
                <h2 style={{ color: '#666', marginTop: '40px' }}>
                  Une passion pour les animaux de compagnie
                </h2>
                <p>
                  Nous mettons tout notre cœur et notre âme dans tout ce que
                  nous faisons, et notre passion pour rendre le monde meilleur
                  pour les animaux de compagnie et leurs maître est authentique.
                </p>
              </div>
            </div>
          </div>
          <div
            className="rc-layout-container rc-two-column"
            style={{ padding: '20px 200px' }}
          >
            <div
              className="rc-column"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div>
                <h2 style={{ color: '#666', marginTop: '40px' }}>
                  La quête du savoir
                </h2>
                <p>
                  Notre compréhension approfondie des besoins des chiens et des
                  chats nous permet de créer la nutrition santé pour animaux la
                  plus précise au monde. Nous n'arrêtons jamais d'apprendre et
                  ne tenons jamais rien pour acquis. C'est pourquoi, nous
                  collaborons avec des experts scientifiques, vétérinaires et
                  comportementaux, et nous entretenons un dialogue permanent
                  avec les possesseurs de chats et de chiens du monde entier.
                </p>
                <h2 style={{ color: '#666', marginTop: '40px' }}>
                  L'obsession pour la santé animale
                </h2>
                <p>
                  Toutes nos actions sont motivées par notre passion pour la
                  santé et le bien-être de chaque chien et chat.
                </p>
              </div>
            </div>
            <div className="rc-column">
              <LazyLoad>
              <img src={image3} style={{ width: '100%' }} alt="" />
              </LazyLoad>
            </div>
          </div>
          <section
            style={{ textAlign: 'center', width: '90%', margin: '80px auto' }}
          >
            <h2 style={{ fontSize: '2rem' }}>Développement durable</h2>
            <p>
              Grâce à notre approche en matière de développement durable, nous
              sommes sûrs d'offrir aux animaux, aux personnes et à la planète le
              respect qu’ils méritent.
            </p>
            <h2 style={{ fontSize: '2rem' }}>Science, Santé et Nutrition</h2>
            <p>
              Notre travail s’appuie sur un vaste socle évolutif de
              connaissances scientifiques en matière de santé et de nutrition
              animale.
            </p>
          </section>
        </main>
        <Footer />
      </div>
    );
  }
}

export default Help;
