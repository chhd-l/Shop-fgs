import React, { useRef } from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FormattedMessage, injectIntl } from 'react-intl';
import image1 from './images/image1.jpg';
import image2 from './images/image2.jpg';
import image3 from './images/image3.jpg';
import image4 from './images/image4.jpg';
import cat from './images/cat.jpg'
import dog from './images/dog.jpg'

import { inject, observer } from 'mobx-react';
import BreadCrumbs from '@/components/BreadCrumbs';
import './index.css';

const localItemRoyal = window.__.localItemRoyal;

@inject('checkoutStore', 'loginStore', 'clinicStore', 'configStore')
@injectIntl
@observer
class Tailorednutrition extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  componentDidMount() {
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
              <FormattedMessage id="tailorednutrition.title" />
            </h2>
            <p style={{ fontSize: '1.2rem' }}>
              <FormattedMessage id="tailorednutrition.description" />
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
                  <FormattedMessage id="tailorednutrition.nutritionTitle" />
                </h2>
                <p>
                  <FormattedMessage id="tailorednutrition.nutritionDetail" />
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
                  <FormattedMessage id="tailorednutrition.formulasTitle" />
                </h2>
                <p>
                  <FormattedMessage id="tailorednutrition.formulasDetail" />
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
                  <FormattedMessage id="tailorednutrition.natureTitle" />
                </h2>
                <p>
                  <FormattedMessage id="tailorednutrition.natureDetail" />
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
                  <FormattedMessage id="tailorednutrition.uniqueTitle" />
                </h2>
                <p>
                  <FormattedMessage id="tailorednutrition.uniqueDetail" />
                </p>
              </div>
            </div>
          </div>
          <section
            style={{ textAlign: 'center', width: '90%', margin: '0 auto', color: 'rgb(102, 102, 102)' }}
          >
            <h2>
              <FormattedMessage id="tailorednutrition.result" />
            </h2>
            <p>
              <FormattedMessage id="tailorednutrition.resultDetail" />
            </p>
          </section>
          <section style={{ textAlign: 'left', width: '100%', margin: '0 auto' }}>
            <h2 style={{ color: '#E2001A', marginTop: '40px', fontSize: '2.5rem', padding: '0 200px' }}>
               <FormattedMessage id="tailorednutrition.shopTile"/>
            </h2>
            <div
              class="rc-layout-container rc-two-column"
              style={{ padding: '20px 200px' }}
            >
              <div class="rc-column" style={{ border: '1px solid #ccc' , cursor: 'pointer'}} onClick={() => {
                  this.props.history.push('/list/dogs')
                }}>
                <img src={dog} style={{ width: '100%' }} />
                <p style={{color: '#E2001A', fontSize: '1.5rem', fontWeight: '400'}}><FormattedMessage id="tailorednutrition.shopDog"/></p>
              </div>
              <div class="rc-column" style={{ border: '1px solid #ccc', marginLeft: '20px', cursor: 'pointer'}} onClick={() => {
                  this.props.history.push('/list/cats')
                }}>
                <img src={cat} style={{ width: '100%' }} />
                <p style={{color: '#E2001A', fontSize: '1.5rem', fontWeight: '400'}}><FormattedMessage id="tailorednutrition.shopCat"/></p>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }
}

export default Tailorednutrition;
