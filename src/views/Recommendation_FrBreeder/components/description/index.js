import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.less';
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first: true,
      second: true
    };
  }

  clickItem = (key) => {
    this.setState({
      [key]: !this.state[key]
    });
  };

  render() {
    let img = `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/recommendation/dog-and-cat.png`;

    return (
      <div className="description ">
        <div className="description-item">
          <div
            className="descrition-title"
            onClick={() => this.clickItem('first')}
          >
            <span>Les recommandations de votre éleveur</span>
            <span
              class="h4 icon iconfont"
              style={{ right: '1rem', height: 28 }}
            >
              {this.state.first ? '' : ''}{' '}
            </span>
          </div>
          <div className="description-content">
            <div
              style={{
                display: this.state.first ? 'block' : 'none',
                width: '100%'
              }}
            >
              <div className="content-bg">
                <img src={img} className="img-pets" />
                {this.props.text}
              </div>

              <div>
                Les conseils d'alimentation de Royal Canin figurent également
                sur l'emballage du produit.
              </div>

              {/* <div style={{ height: 1, background: '#666666' }}></div> */}

              <div style={{ display: 'flex', display: 'none' }}>
                <div></div>
                <div>
                  Discover now the perfect tool to calculate the ideal ration
                  for your pet. Fill in your pet’s information in the
                  interactive feeding guide and you will get the daily feeding
                  recommendation.{' '}
                </div>

                <div>
                  <button>Calculate portion</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="description-item">
          <div
            className="descrition-title"
            onClick={() => this.clickItem('second')}
          >
            <span>Bénéfices produit </span>
            <span
              class="h4 icon iconfont"
              style={{ right: '1rem', height: 28 }}
            >
              {this.state.second ? '' : ''}{' '}
            </span>
            {/* <span class="h4 icon iconfont" style={{right:'1rem', height:28}}></span> */}
          </div>
          <div className="description-content">
            <div style={{ display: this.state.second ? 'block' : 'none' }}>
              <div className="content-bg">
                Offre personnelle valable sur l'intégralité de nos aliments
                chien & chat (hors aliments humides, Babycat milk, gamme Size
                mini indoor & conditionnements de 1kg) et cumulable avec l'offre
                d'abonnement. Valable une seule fois et uniquement sur la
                boutique en ligne Royal Canin https://www.royalcanin.com/fr/shop
                selon le format du produit acheté.
              </div>
              <div style={{ height: 1, background: '#666666' }}></div>

              <div style={{ display: 'flex', display: 'none' }}>
                <div></div>
                <div>
                  Discover now the perfect tool to calculate the ideal ration
                  for your pet. Fill in your pet’s information in the
                  interactive feeding guide and you will get the daily feeding
                  recommendation.{' '}
                </div>

                <div>
                  <button>Calculate portion</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
