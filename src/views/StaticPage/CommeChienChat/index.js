import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { seoHoc } from '@/framework/common';
import { Canonical } from '@/components/Common';
import './index.less';

import img_banner from '@/assets/images/comme-chien-chat/banner.png';
import img_dog from '@/assets/images/comme-chien-chat/dog_new.png';
import img_dog2 from '@/assets/images/comme-chien-chat/dog2_new.png';
import img_toy from '@/assets/images/comme-chien-chat/toy_new.png';
import img_store from '@/assets/images/comme-chien-chat/store_new.png';
import img_a1 from '@/assets/images/comme-chien-chat/a1.png';
import img_a2 from '@/assets/images/comme-chien-chat/a2.png';
import img_a3 from '@/assets/images/comme-chien-chat/a3.png';
import img_a4 from '@/assets/images/comme-chien-chat/a4.png';

const ListCard = () => {
  const list = [
    {
      imgSrc: img_a1,
      title: 'Forum Conseils',
      desc: 'Venez découvrir des forums de discussion autour des tracas et de la gestion du quotidien de vos animaux !',
      url: 'https://www.eventbrite.com/cc/pet-tips-1053149?utm-campaign=social&utm-content=creatorshare&utm-medium=discovery&utm-term=odclsxcollection&utm-source=cp&aff=escb'
    },
    {
      imgSrc: img_a2,
      title: 'Tout sur les races',
      desc: 'Des experts viennent vous parler de vos races préférées !',
      url: 'https://www.eventbrite.com/cc/breed-talk-1063519?utm-campaign=social&utm-content=creatorshare&utm-medium=discovery&utm-term=odclsxcollection&utm-source=cp&aff=escb'
    },
    {
      imgSrc: img_a3,
      title: 'Education Canine',
      desc: 'Besoin d’aide avec votre chien ? Apprendre les bases de l’éducation ? Participez à nos différents cours et balades éducatives !',
      url: 'https://www.eventbrite.com/cc/education-canine-1063529?utm-campaign=social&utm-content=creatorshare&utm-medium=discovery&utm-term=odclsxcollection&utm-source=cp&aff=escb'
    },
    {
      imgSrc: img_a4,
      title: 'Ateliers',
      desc: 'Nous vous proposons différents workshop au sein de notre Concept Store, toilettage, ateliers avec les enfants et bien d’autres !',
      url: 'https://www.eventbrite.com/cc/workshop-1063539?utm-campaign=social&utm-content=creatorshare&utm-medium=discovery&utm-term=odclsxcollection&utm-source=cp&aff=escb'
    }
  ];
  return (
    <div className="list-card-box">
      {list.map((item, index) => (
        <div className="list-item" key={index}>
          <div className="list-img-box">
            <img src={item.imgSrc} alt="image" />
          </div>
          <div className="list-main">
            <div className="list-title">{item.title}</div>
            <div className="list-desc">{item.desc}</div>
            <div className="flex justify-center">
              <a
                className="rc-btn rc-btn--two iconfont iconcalendar"
                href={item.url}
                target="_blank"
              >
                <span>Réservez vite</span>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

@seoHoc()
class CommeChienChat extends React.Component {
  scrollToView = () => {
    const headerHeight = window.innerWidth > 768 ? 120 : 66;
    const top = document.getElementById('link1').offsetTop;

    window.scrollTo({
      top: top - headerHeight,
      left: 0,
      behavior: 'smooth'
    });
  };

  render() {
    return (
      <div>
        <Canonical />
        <Header {...this.props} showMiniIcons={true} showUserIcon={true} />

        <main className="rc-content--fixed-header rc-bg-colour--brand3">
          <div className="comme-chien-chat-box">
            <div className="section">
              <div className="section-content">
                <div className="title-1">
                  Comme chien et chat de Royal Canin
                </div>
                <div className="desc-1">
                  Royal Canin réouvre dans le 3e arrondissement son Concept
                  Store, un lieu unique en son genre pour vous, vos chiens et
                  vos chats. Un espace de découvertes sur votre animal et ses
                  besoins, allant de la recommandation nutritionnelle à des
                  activités en tout genre.
                </div>
                <div className="top-banner">
                  <img src={img_banner} alt="Comme chien & chat" />
                </div>
                <div className="flex justify-center">
                  <button
                    className="rc-btn rc-btn--sm rc-btn--two"
                    data-testid="scrollToView"
                    onClick={this.scrollToView}
                  >
                    Consultez les événements que nous proposons
                  </button>
                </div>
              </div>
            </div>

            <div className="section bg-gray">
              <div className="section-content column-2">
                <div className="section-content-item">
                  <div className="title-2">
                    Bienvenue chez Comme Chien et Chat
                  </div>
                  <div className="desc-2">
                    "Vous connaissez votre animal sur le bout des doigts et
                    pourtant, il n'est pas toujours évident de prendre soin de
                    lui au quotidien, de trouver les bons produits pour lui, les
                    bons conseils et surtout le bon interlocuteur. <br />
                    <br />
                    Chez Comme Chien et Chat, laissez vous guider par nos
                    conseillers, et découvrez tous les besoins spécifiques et
                    insoupçonnés de votre chat ou de votre chien, accompagnés
                    des conseils, produits et services qui leur sont les plus
                    adaptés pour vivre en ville et ailleurs. <br />
                    <br />
                    Ici, vous rencontrez d'autres passionnés, des experts et des
                    connaisseurs des chats et des chiens au travers de nos
                    événements, que nous avons imaginés spécialement pour vous.
                    <br />
                    <br />
                    Car la santé et le bien-être de votre animal sont notre
                    priorité, nous avions à cœur chez Royal Canin, de créer un
                    lieu avec tout ce dont vous avez besoin pour prendre soin de
                    votre compagnon à 4 pattes. "<br />
                    <br />
                  </div>
                  <div className="m-justify-center">
                    <a
                      className="rc-btn rc-btn--sm rc-btn--two"
                      href="https://www.google.com/maps/place/Royal+Canin+:+Exposition+Instinct/@48.8640126,2.3627913,17z/data=!3m1!4b1!4m5!3m4!1s0x47e66f0182a25dc7:0xe8b708c92eb2e656!8m2!3d48.8640091!4d2.36498"
                      target="_blank"
                    >
                      Nous rendre visite
                    </a>
                  </div>
                  <div className="address">
                    Ouverture le 14 Septembre 2022 <br />
                    126, rue de Turenne, 75003 Paris <br />
                    Metro : Filles du Calvaire
                  </div>
                </div>
                <div className="section-content-item m-row-start-1">
                  <img className="w564" src={img_dog} alt="dog&cat" />
                </div>
              </div>
            </div>

            <div className="section">
              <div className="section-content column-2">
                <div className="section-content-item">
                  <img className="w538" src={img_dog2} alt="pet&dog" />
                </div>
                <div className="section-content-item content-justify-center">
                  <div className="title-2">
                    Conseils d'experts en nutrition et accessoires de bien-être
                  </div>
                  <div className="desc-2 customized-desc">
                    Venez découvrir notre approche nutritionnelle ainsi que
                    l'étendue de notre gamme sous les conseils de notre équipe
                    sur place. Nous y proposons aussi un portefeuille
                    d'accessoires divers pour le bien-être optimal de votre
                    animal.
                  </div>
                </div>
              </div>
            </div>

            <div className="section bg-gray" id="link1">
              <div className="section-content">
                <div className="title-1">Venez assister à nos évènements !</div>
                <ListCard />
              </div>
            </div>

            <div className="section">
              <div className="section-content column-2">
                <div className="section-content-item content-justify-center">
                  <div className="title-2">Faites leurs plaisir ! </div>
                  <div className="desc-2">
                    Profitez d'avantages exceptionnels en achetant dans notre
                    Concept Store.
                  </div>
                </div>
                <div className="section-content-item">
                  <img className="w560" src={img_toy} alt="img" />
                </div>
              </div>
            </div>

            <div className="section bg-gray">
              <div className="section-content">
                <div className="section-content-item content-align-center">
                  <div className="title-2">
                    Venez à la découverte de Royal Canin
                  </div>
                  <div className="flex align-center pb-6">
                    <a
                      className="rc-btn rc-btn--sm rc-btn--two"
                      href="https://www.google.com/maps/place/Royal+Canin+:+Exposition+Instinct/@48.8640126,2.3627913,17z/data=!3m1!4b1!4m5!3m4!1s0x47e66f0182a25dc7:0xe8b708c92eb2e656!8m2!3d48.8640091!4d2.36498"
                      target="_blank"
                    >
                      Où nous trouver
                    </a>
                  </div>
                  <div className="desc-2">Ouverture le 14 Septembre 2022</div>
                  <div className="desc-2">126, rue de Turenne, 75003 Paris</div>
                  <div className="desc-2 pb-6">Métro : Filles du Calvaire</div>
                  <div className="pb-4">
                    <img className="w556" src={img_store} alt="img" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </div>
    );
  }
}

export default CommeChienChat;
