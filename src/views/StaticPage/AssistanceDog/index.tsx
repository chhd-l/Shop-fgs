import React from 'react';
import { seoHoc } from '@/framework/common';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LazyLoad from 'react-lazyload';
import { DivWrapper } from './style';
import Form from './form';
import { injectIntl, FormattedMessage } from 'react-intl-phraseapp';
import { scrollIntoView } from '@/lib/scroll-to-utils';
import { Button, Canonical } from '@/components/Common';
import GoogleTagManager from '@/components/GoogleTagManager';
// @ts-ignore
@injectIntl
@seoHoc('AssistanceDogPage')
class AssistanceDog extends React.Component {
  render() {
    // @ts-ignore
    const { location } = this.props;
    const event = {
      page: {
        type: 'Landing Page',
        theme: '',
        path: location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: ''
      }
    };
    return (
      <DivWrapper>
        <Canonical />
        <GoogleTagManager key={location.key} additionalEvents={event} />
        <Header {...this.props} showMiniIcons={true} showUserIcon={true} />
        <main className={'rc-content--fixed-header'} data-testid="assisTest">
          <div className="bg-rc-f6 grid grid-cols-12">
            <div className="col-span-12 md:col-span-6 px-5 md:px-0 py-8 md:pl-24 md:pr-6">
              <p className="text-rc-red text-3xl md:text-4xl md:leading-snug">
                Profitez de notre offre partenaire Chiens Guides France
              </p>
              <p className="mt-4 leading-loose">
                <span className="font-light">
                  Vous êtes porteur d’une Carte Mobilité Inclusion ou
                  d’Invalidité et d’un Certificat National d’Identification de
                  Chien Guide Eduqué ? Inscrivez-vous dès maintenant pour
                  bénéficier des avantages Royal Canin.
                </span>{' '}
                <span>
                  {/* Inscrivez-vous dès maintenant pour bénéficier des avantages
                  Royal Canin. */}
                </span>
              </p>
              <p className="text-rc-red my-7 text-xl">
                Un service qui facilite vos démarches et vous aide à prendre
                soin de votre animal
              </p>
              <ul className="list-tips leading-7 text-lg">
                {[
                  {
                    desc: 'Une équipe dédiée'
                  },
                  {
                    desc: 'Des remises uniques'
                  },
                  {
                    desc: 'Des livraisons flexibles, automatiques et offertes'
                  },
                  {
                    desc: 'Un aliment adapté'
                  }
                ].map((item, i) => (
                  <li className="mt-5 flex items-start" key={i}>
                    <span className="iconfont iconPets inline-block text-rc-red rotate-90	transform mr-3 text-2xl" />
                    {item.desc}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="bg-white col-span-12 md:col-span-6 px-5 md:px-0 pt-7 md:pr-32 md:pl-5 pb-10"
              id="registerForm"
            >
              <p className="text-rc-red text-2xl text-center md:text-left">
                Pour bénéficier de vos avantages contactez-nous !
              </p>
              <p className="mb-8 text-lg mt-3 text-center md:text-left">
                Par téléphone au{' '}
                <a href="tel:0800 41 51 61" className="font-medium">
                  0 800 41 51 61
                </a>
                * ou en complétant le formulaire ci-dessous pour être
                re-contacté par un de nos experts**
              </p>
              {/* @ts-ignore */}
              <Form intl={this.props.intl} />
            </div>
          </div>
          <Divider />
          <div className="grid grid-cols-12 py-10 px-5 md:px-0 md:w-2/3 mx-auto">
            <div className="col-span-12 md:col-span-6 md:ml-16 order-2">
              <p className="text-rc-red text-3xl leading-snug">
                Royal Canin s’engage auprès des Chiens Guides d’Aveugles
              </p>
              <p className="text-lg mt-5 leading-relaxed">
                {/* Royal Canin, partenaire depuis de nombreuses années de la
                Fédération Française des Chiens Guides d’Aveugles, et de
                nombreuses écoles de Chiens Guides, poursuit son engagement avec
                des actions concrètes à destination des personnes déficientes
                visuelles. */}
                Royal Canin, partenaire depuis de nombreuses années de la
                Fédération Française des Chiens guides d’aveugles (FFAC), et de
                nombreuses Ecoles de chiens guides fédérées, poursuit son
                engagement avec des actions concrètes à destination des
                personnes déficientes visuelles.
              </p>
            </div>
            <div className="col-span-12 md:col-span-6 order-1 md:order-3">
              <LazyLoad>
                <img
                  src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/AssistanceDog/dog-1-v2@2x.png`}
                  alt="assistance dog"
                  className="mx-auto md:ml-24 w-2/3 md:w-1/2 mb-4 md:mb-0"
                />
              </LazyLoad>
            </div>
          </div>
          <Divider />
          <div className="grid grid-cols-12 py-10 px-5 md:px-0 md:w-2/3 mx-auto">
            <div className="col-span-12 md:col-span-6">
              <LazyLoad>
                <img
                  src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/AssistanceDog/dog-2-1@2x.png`}
                  alt="assistance dog"
                  className="w-80 mx-auto mb-4 md:mb-0"
                />
              </LazyLoad>
            </div>
            <div className="col-span-12 md:col-span-6">
              <p className="text-rc-red text-2xl leading-tight">
                Nos engagements pour les personnes déficientes visuelles
              </p>
              <p className="mt-5">
                L'accueil d'un Chien Guide est une étape importante pour lui
                comme pour vous. Royal Canin met à disposition un
                service réservé permettant de :
              </p>
              <ul className="mt-5">
                {[
                  {
                    icon: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/AssistanceDog/icon01@2x.png`,
                    desc: "Simplifier l'accès à nos aliments"
                  },
                  {
                    icon: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/AssistanceDog/icon02@2x.png`,
                    desc: 'Accompagner la santé du Chien Guide grâce à une nutrition adaptée'
                  },
                  {
                    icon: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/AssistanceDog/icon03@2x.png`,
                    desc: 'Réserver un tarif exclusif de nos aliments aux maîtres de chiens guides'
                  }
                ].map((item, i) => (
                  <li className="flex items-center my-2 font-medium" key={i}>
                    <img src={item.icon} alt="dog icon" className="w-10 mr-2" />
                    <span>{item.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Divider />
          <div className="grid grid-cols-12 md:gap-x-16 py-10 w-3/5 md:w-2/5 mx-auto text-center px-5 md:px-0">
            {[
              {
                img: {
                  src: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/AssistanceDog/mechanism-1-1@2x.png`
                },
                desc: "Fédération Française des Associations de Chiens Guides d'Aveugles"
              },
              {
                img: {
                  src: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/AssistanceDog/mechanism-2@2x.png`
                },
                desc: 'Association Nationale des Maitres de Chiens Guides'
              },
              {
                img: {
                  src: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/AssistanceDog/mechanism-3@2x.png`
                },
                desc: 'Ecoles de chiens guides fédérées'
              }
            ].map((item, i) => (
              <div className="col-span-12 md:col-span-4 mb-3 md:mb-0" key={i}>
                <LazyLoad>
                  <img
                    src={item.img.src}
                    alt="mechanism img"
                    className="w-4/5 md:w-auto mx-auto"
                  />
                </LazyLoad>
                <p className="font-normal mt-3">{item.desc}</p>
              </div>
            ))}
          </div>
          <Divider />
          <div className="mt-12 text-center">
            <p className="text-rc-red text-2xl">
              Découvrez l’aliment adapté aux besoins précis de votre animal
            </p>
            <Button
              type="primary"
              className="mt-6"
              onClick={() => {
                scrollIntoView(document.querySelector(`#registerForm`));
              }}
            >
              Contactez-nous
            </Button>
          </div>
          <p className="md:w-1/2 mx-auto text-center py-10 text-lg px-5 md:px-0">
            *Contactez-nous du lundi au vendredi de 8h30 à 19h et le samedi de
            9h à 18h. Appels gratuits depuis un poste fixe. <br />
            <br />
            ** Après avoir complété le formulaire un expert vous recontactera
            sous 48h.
          </p>
        </main>
        <Footer />
      </DivWrapper>
    );
  }
}

const Divider = () => <div className="h-2 bg-rc-f6" />;

export default AssistanceDog;
