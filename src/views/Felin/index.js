import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LazyLoad from 'react-lazyload';

function Divider() {
  return (
    <div
      className="rc-border-bottom rc-border-colour--brand4"
      style={{ borderBottomWidth: '4px' }}
    />
  );
}

export default class Felin extends React.Component {
  render() {
    return (
      <div>
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={this.props.location}
          history={this.props.history}
          match={this.props.match}
        />
        <main className="rc-content--fixed-header rc-bg-colour--brand3">
          <div className="rc-bg-colour--brand3 pt-4 pb-4">
            <div className="d-flex justify-content-center">
              <span className="mr-4 ui-cursor-pointer">dsfadsf</span>
              <span className="mr-4 ui-cursor-pointer">dasfdsaf</span>
              <span className="ui-cursor-pointer">dafdfsa</span>
            </div>
            <br />
            <br />
            <br />
            <br />
            <div className="row">
              <div className="col-4 offset-2">
                <LazyLoad>
                  <img
                    src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/felin/logoAtelier felin.png`}
                  />
                </LazyLoad>
                <div className="rc-gamma inherit-fontsize mt-2">
                  <h3>
                    Un nouveau lieu d’échanges sur la santé et le bien-être de
                    votre chat, au coeur de Paris
                  </h3>
                </div>

                <button className="rc-btn rc-btn--one">
                  Venez rencontrer nos comportementalistes félins
                </button>
                <p className="mt-3">
                  L'Atelier Félin est ouvert du 20 avril au 12 juin 2021
                </p>
              </div>
              <div className="col-6">
                <LazyLoad>
                  <img
                    src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/felin/cat.jpeg`}
                  />
                </LazyLoad>
              </div>
            </div>
            <div className="rc-padding--sm rc-max-width--xl">
              <div className="row">
                <div className="col-6">
                  <div className="">
                    <div className="rc-gamma inherit-fontsize">
                      <h3>
                        Vous partagez votre vie avec un chat en appartement ?
                        Posez toutes vos questions à nos experts
                      </h3>
                    </div>
                    <p>
                      L’Atelier Félin est fait pour vous : venez rencontrer des
                      experts, posez-leur vos questions sur le comportement de
                      votre chat, ses habitudes, ses soins et la nourriture la
                      plus appropriée à ses besoins… Des comportementalistes
                      félins et vétérinaires vous accueillent pour établir le
                      profil de votre chat et vous apporter gratuitement des
                      conseils personnalisés et spécifiques à la vie en
                      appartement.
                    </p>
                    <button className="rc-btn rc-btn--two">
                      Venez rencontrer nos experts
                    </button>
                  </div>
                </div>
                <div className="col-6">
                  <LazyLoad>
                    <img
                      src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/felin/person.jpeg`}
                    />
                  </LazyLoad>
                </div>
                <div className="col-12">
                  <Divider />
                </div>
                <div className="col-6">
                  <LazyLoad>
                    <img
                      src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/felin/grid.jpeg`}
                    />
                  </LazyLoad>
                </div>
                <div className="col-6">
                  <div className="rc-gamma inherit-fontsize">
                    <h3>
                      Obtenez une recommandation personnalisée pour son
                      alimentation
                    </h3>
                  </div>
                  <p>
                    Chaque chat est unique et a des besoins spécifiques selon sa
                    race, son âge, ses sensibilités et son mode de vie. En nous
                    communiquant le profil de votre chat, nous déterminerons
                    ensemble l'aliment qui lui conviendra le mieux.
                  </p>
                  <button className="rc-btn rc-btn--two">
                    Venez découvrir l’univers du chat dans notre magasin
                  </button>
                </div>
                <div className="col-12">
                  <Divider />
                </div>
                <div className="col-6">
                  <div className="rc-gamma inherit-fontsize">
                    <h3>
                      Faites l’expérience de notre nouveau service de
                      distribution de croquettes personnalisé et plus durable
                    </h3>
                  </div>
                  <p>
                    Toutes nos croquettes sont distribuées à la demande et
                    servies dans un contenant réutilisable et consigné. Lorsque
                    votre contenant est vide, vous pouvez le recharger en
                    boutique, ou vous faire livrer une nouvelle dose. Notre
                    livreur repartira avec le contenant vide qui sera
                    reconditionné pour un nouvel usage.
                  </p>
                  <button className="rc-btn rc-btn--two">
                    Venez découvrir l’univers du chat dans notre magasin
                  </button>
                </div>
                <div className="col-6">
                  <LazyLoad>
                    <img
                      src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/felin/box.jpeg`}
                    />
                  </LazyLoad>
                </div>
                <div className="col-12">
                  <Divider />
                </div>
                <div className="col-6">
                  <LazyLoad>
                    <img
                      src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/felin/store.jpeg`}
                    />
                  </LazyLoad>
                </div>
                <div className="col-6">
                  <div className="rc-gamma inherit-fontsize">
                    <h3>Découvrez l’Atelier Félin</h3>
                  </div>
                  <p>
                    L’Atelier Félin est un lieu unique de Royal Canin,
                    spécialiste de la santé animale et de la nutrition. Nous
                    vous accueillons au coeur du marais, au 6 Rue des Coutures
                    Saint-Gervais, du 20 avril au 12 juin 2021. Venez rencontrer
                    nos associations partenaires pour adopter des chats (le
                    weekend exclusivement).
                  </p>
                  <button className="rc-btn rc-btn--two">
                    Venez découvrir l’univers du chat dans notre magasin
                  </button>
                </div>
                <div className="col-12">
                  <Divider />
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
