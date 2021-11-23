import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.less';
export default class index extends Component {
  static propTypes = {
    prop: PropTypes
  };

  render() {
    return (
      <div className="description ">
        <div className="description-item">
          <div className="descrition-title">
            <span>Les recommandations de votre éleveur</span>
            <span></span>
          </div>
          <div className="description-content">
            <div className="content-bg">
              Les quantités d'aliments recommandées sont indiquées au dos du
              sac. Veillez à ce que la transition alimentaire se fasse lentement
              au cours de la semaine pour éviter les troubles gastriques.
            </div>

            <div>
              Les conseils d'alimentation de Royal Canin figurent également sur
              l'emballage du produit.
            </div>

            <div style={{ height: 1, background: '#666666' }}></div>

            <div style={{ display: 'flex', display: 'none' }}>
              <div></div>
              <div>
                Discover now the perfect tool to calculate the ideal ration for
                your pet. Fill in your pet’s information in the interactive
                feeding guide and you will get the daily feeding recommendation.{' '}
              </div>

              <div>
                <button>Calculate portion</button>
              </div>
            </div>
          </div>
        </div>
        <div className="description-item">
          <div className="descrition-title">
            <span>Bénéfices produit </span>
            <span></span>
          </div>
          <div className="description-content">
            <div className="content-bg">
              Offre personnelle valable sur l'intégralité de nos aliments chien
              & chat (hors aliments humides, Babycat milk, gamme Size mini
              indoor & conditionnements de 1kg) et cumulable avec l'offre
              d'abonnement. Valable une seule fois et uniquement sur la boutique
              en ligne Royal Canin https://www.royalcanin.com/fr/shop selon le
              format du produit acheté.
            </div>
            <div style={{ height: 1, background: '#666666' }}></div>

            <div style={{ display: 'flex', display: 'none' }}>
              <div></div>
              <div>
                Discover now the perfect tool to calculate the ideal ration for
                your pet. Fill in your pet’s information in the interactive
                feeding guide and you will get the daily feeding recommendation.{' '}
              </div>

              <div>
                <button>Calculate portion</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
