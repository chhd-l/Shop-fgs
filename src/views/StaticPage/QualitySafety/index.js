import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import BreadCrumbs from '@/components/BreadCrumbs';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import { FormattedMessage } from 'react-intl';
import image1 from './images/image1.jpg';
import image2 from './images/image2.jpg';
import image3 from './images/image3.jpg';
import image4 from './images/image4.jpg';
import image5 from './images/image5.jpg';
import cat from './images/cat.jpg';
import dog from './images/dog.jpg';
import './index.css';
import { cloneDeep, findIndex, find } from 'lodash';
import { toJS } from 'mobx';
import LoginButton from '@/components/LoginButton';
import { setSeoConfig } from '@/utils/utils';

const localItemRoyal = window.__.localItemRoyal;
class QualitySafety extends React.Component {
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
              <FormattedMessage id="qualitySafety.title" />
            </h2>
            <p style={{ fontSize: '1.2rem' }}>
              <FormattedMessage id="qualitySafety.description" />
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
                <h2 style={{ color: '#E2001A', marginTop: '40px' }}>
                  <FormattedMessage id="qualitySafety.foodTitle" />
                </h2>
                <p>
                  <FormattedMessage id="qualitySafety.foodDetail" />
                </p>
              </div>
            </div>
            <div className="rc-column">
              <img src={image1} style={{ width: '100%' }} alt="" />
            </div>
          </div>
          <div
            className="rc-layout-container rc-two-column"
            style={{ padding: '20px 200px' }}
          >
            <div className="rc-column">
              <img
                src={image2}
                style={{ width: '100%', marginTop: '50px' }}
                alt=""
              />
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
                <h2 style={{ color: '#E2001A', marginTop: '40px' }}>
                  <FormattedMessage id="qualitySafety.consistentTitle" />
                </h2>
                <p>
                  <FormattedMessage id="qualitySafety.consistentDetail" />
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
                <h2 style={{ color: '#E2001A', marginTop: '40px' }}>
                  <FormattedMessage id="qualitySafety.materialsTitle" />
                </h2>
                <p>
                  <FormattedMessage id="qualitySafety.materialsDetail" />
                </p>
              </div>
            </div>
            <div className="rc-column">
              <img src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw97202e87/Quality-safety/2015-Pet-Center-pictures-Campus-Royal-Canin-000004.jpg?sw=622&sfrm=jpg" style={{ width: '100%' }} alt="" />
            </div>
          </div>
          {/* <div
            className="rc-layout-container rc-two-column"
            style={{ padding: '20px 200px' }}
          >
            <div className="rc-column">
              <img
                src={image4}
                style={{ width: '100%', marginTop: '50px' }}
                alt=""
              />
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
                <h2 style={{ color: '#E2001A', marginTop: '40px' }}>
                  <FormattedMessage id="qualitySafety.rigorousTitle" />
                </h2>
                <p>
                  <FormattedMessage id="qualitySafety.rigorousDetail" />
                </p>
              </div>
            </div>
          </div> */}
          {/* <div
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
                <h2 style={{ color: '#E2001A', marginTop: '40px' }}>
                  <FormattedMessage id="qualitySafety.ingredientsTitle" />
                </h2>
                <p>
                  <FormattedMessage id="qualitySafety.ingredientsDetail" />
                </p>
              </div>
            </div>
            <div className="rc-column">
              <img src={image5} style={{ width: '100%' }} alt="" />
            </div>
          </div> */}
          {/* <section
            style={{
              textAlign: 'left',
              width: '100%',
              margin: '0 auto',
              padding: '20px 200px'
            }}
          >
            <div
              style={{
                border: 'solid 5px rgb(226, 0, 26)',
                borderWidth: '3px',
                borderRadius: '5px',
                padding: '2rem'
              }}
            >
              <h2
                style={{
                  color: '#E2001A',
                  marginTop: '40px',
                  fontSize: '2.5rem',
                  paddingLeft: '200px'
                }}
              >
                <FormattedMessage id="qualitySafety.shopTile" />
              </h2>
              <div className="rc-layout-container rc-two-column">
                <div
                  className="rc-column"
                  style={{ border: '1px solid #ccc', cursor: 'pointer' }}
                  onClick={() => {
                    this.props.history.push('/list/dogs');
                  }}
                >
                  <img src={dog} style={{ width: '100%' }} alt="" />
                  <p
                    style={{
                      color: '#E2001A',
                      fontSize: '1.5rem',
                      margin: '20px 0 20px 20px',
                      fontWeight: '400'
                    }}
                  >
                    <FormattedMessage id="qualitySafety.shopDog" />{' '}
                  </p>
                </div>
                <div
                  className="rc-column"
                  style={{
                    border: '1px solid #ccc',
                    marginLeft: '20px',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    this.props.history.push('/list/cats');
                  }}
                >
                  <img src={cat} style={{ width: '100%' }} alt="" />
                  <p
                    style={{
                      color: '#E2001A',
                      fontSize: '1.5rem',
                      margin: '20px 0 20px 20px',
                      fontWeight: '400'
                    }}
                  >
                    <FormattedMessage id="qualitySafety.shopCat" />{' '}
                  </p>
                </div>
              </div>
            </div>
          </section> */}
          <section
            style={{
              textAlign: 'center',
              width: '90%',
              margin: '80px auto',
              color: 'rgb(102, 102, 102)'
            }}
          >
            <h2 style={{ fontSize: '2.5rem' }}>
              <FormattedMessage id="qualitySafety.FoodQualityandSafety" />
            </h2>
            <p>
              <FormattedMessage id="qualitySafety.foodQualityDetail" />
            </p>
          </section>
          {
            process.env.REACT_APP_LANG == 'fr'
            ?
            <section
              style={{
                textAlign: 'center',
                width: '90%',
                margin: '80px auto',
                color: 'rgb(102, 102, 102)'
              }}
            >
              <h2 style={{ fontSize: '2.5rem' }}>
                Ingrédients entièrement traçables
              </h2>
              <p>
                100 % des matières premières utilisées sont analysées et un échantillon de chacune d'entre elles est conservé pendant deux ans. Nous sommes ainsi en mesure de tracer d'un bout à l'autre de la chaîne chaque matière première pendant toute la durée de commercialisation du produit.
              </p>
            </section>
            :null
          }
        </main>
        <Footer />
      </div>
    );
  }
}

export default QualitySafety;
