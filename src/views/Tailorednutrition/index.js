import React, { useRef } from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Skeleton from 'react-skeleton-loader';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import emailImg from '@/assets/images/emailus_icon@1x.jpg';
import callImg from '@/assets/images/customer-service@2x.jpg';
import helpImg from '@/assets/images/slider-img-help.jpg';
import image1 from './images/image1.jpg'
import image2 from './images/image2.jpg'
import image3 from './images/image3.jpg'
import image4 from './images/image4.jpg'

import storeLogo from '@/assets/images/storeLogo.png';
import ImageMagnifier from '@/components/ImageMagnifier';
import { formatMoney } from '@/utils/utils';
// import paymentImg from "./img/payment.jpg";
import { inject, observer } from 'mobx-react';
import BannerTip from '@/components/BannerTip';
import { getRecommendationList } from '@/api/recommendation';
import { getPrescriptionById } from '@/api/clinic';
import { sitePurchase } from '@/api/cart';
import './index.css';
import { cloneDeep, findIndex, find } from 'lodash';
import { toJS } from 'mobx';
import LoginButton from '@/components/LoginButton';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

@inject('checkoutStore', 'loginStore', 'clinicStore')
@inject('configStore')
@observer
@injectIntl
class Help extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  componentDidMount() {  
    if (localItemRoyal.get('isRefresh')) {
      localItemRoyal.remove('isRefresh');
      window.location.reload();
      return false;
    }
  }
  
  render(h) {
    const event = {
      page: {
        type: 'Content',
        theme: ''
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
          <div
            className={`rc-padding-bottom--xs cart-error-messaging cart-error ${
              this.state.errorMsg ? '' : 'hidden'
            }`}
            style={{
              width: '50%',
              margin: '20px auto 0'
            }}
          >
            <aside
              className="rc-alert rc-alert--error rc-alert--with-close"
              role="alert"
            >
              {this.state.errorMsg}
            </aside>
          </div>
          <section style={{ textAlign: 'center', width: '60%', margin: '0 auto' }}>
            <h2 style={{ color: '#E2001A', marginTop: '40px', fontSize: '2.5rem' }}>
              La santé mérite qu'on se batte pour elle
            </h2>
            <p style={{fontSize: '1.2rem'}}>
              Notre obsession de la santé des animaux de compagnie nous a inspiré une série d'innovations pour les animaux de compagnie présentant de graves problèmes de santé. D'innombrables chiots, chatons, chiens et chats sont la preuve vivante du succès de ces formules. Qu'il s'agisse de se rétablir d'une procédure médicale, de surmonter des problèmes d'allergies alimentaires ou de protéger les animaux de compagnie les plus fragiles, une alimentation sur mesure peut aider ces animaux à atteindre le summum de leur santé.
            </p>
          </section>

          <div
            class="rc-layout-container rc-two-column"
            style={{ padding: '20px 200px' }}
          >
            <div
              class="rc-column"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div>
                <h2 style={{ color: '#E2001A', marginTop: '40px' }}>
                  Qu'est-ce qu'une alimentation sur mesure?
                </h2>
                <p>
                  Nous formulons des aliments conçus pour répondre avec une grande précision à des besoins uniques. Chaque aliment fournit à chaque chat ou chaque chien un complexe complet et équilibré de nutriments et d'acides aminés dont il a besoin pour aider à soutenir sa musculature, à préserver son organisme en bonne santé et à renforcer ses défenses naturelles.
                </p>
              </div>
            </div>
            <div class="rc-column">
              <img src={image1} style={{ width: '100%' }} />
            </div>
          </div>
          <div
            class="rc-layout-container rc-two-column"
            style={{ padding: '20px 200px' }}
          >
            <div class="rc-column">
              <img src={image2} style={{ width: '100%' }} />
            </div>
            <div
              class="rc-column"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div>
                <h2 style={{ color: '#E2001A', marginTop: '40px' }}>
                  Formules élaborées
                </h2>
                <p>
                  Prenez l'exemple du berger allemand : il est particulièrement apprécié pour son courage, sa fidélité et son intelligence. Cependant, malgré sa grande force physique et mentale, le berger allemand est connu pour sa sensibilité digestive. Nous avons donc élaboré une formule adaptée qui contient des protéines facilement assimilables et des fibres spécifiques pour qu'il soit aussi fort à l'intérieur qu'à l'extérieur.
                </p>
              </div>
            </div>
          </div>
          <div
            class="rc-layout-container rc-two-column"
            style={{ padding: '20px 200px' }}
          >
            <div
              class="rc-column"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div>
                <h2 style={{ color: '#E2001A', marginTop: '40px' }}>
                  Encourager leurs prédispositions naturelles
                </h2>
                <p>
                  Un jack russell en parfaite santé peut sauter à une hauteur équivalente à six fois sa taille. Favoriser son incroyable potentiel naturel avec des protéines et des antioxydants spécialement sélectionnés permet de répondre à ses besoins spécifiques.
                </p>
              </div>
            </div>
            <div class="rc-column">
              <img src={image3} style={{ width: '100%' }} />
            </div>
          </div>
          <div
            class="rc-layout-container rc-two-column"
            style={{ padding: '20px 200px' }}
          >
            <div class="rc-column">
              <img src={image4} style={{ width: '100%' }} />
            </div>
            <div
              class="rc-column"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div>
                <h2 style={{ color: '#E2001A', marginTop: '40px' }}>
                  Des formules uniques pour des besoins uniques
                </h2>
                <p>
                  De nombreux animaux de compagnie ont une mâchoire spécifique et un comportement particulier qui modifient leur façon de manger. C'est pour cette raison que nous adaptons non seulement nos recettes au niveau nutritionnel, mais que nous étudions aussi la forme et la texture de chaque croquette pour mieux répondre aux besoins physiques de chaque animal.
                </p>
              </div>
            </div>
          </div>
          <section style={{ textAlign: 'center', width: '90%', margin: '0 auto' }}>
            <h2>
              Le résultat
            </h2>
            <p>
            Le résultat est une alimentation conçue pour répondre à des besoins de santé particuliers avec une grande précision. Cette alimentation apporte à votre animal un ensemble complet et équilibré de nutriments et d'acides aminés dont il a besoin pour développer des muscles forts, garder un corps en bonne santé et renforcer son système immunitaire. Donnez-lui toute l’énergie nécessaire pour s’épanouir et avoir la meilleure santé possible.
            </p>
          </section>
        </main>
        <Footer />
      </div>
    );
  }
}

export default Help;
