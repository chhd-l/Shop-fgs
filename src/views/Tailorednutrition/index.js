import React, { useRef } from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FormattedMessage, injectIntl } from 'react-intl';
import image1 from './images/image1.jpg';
import image2 from './images/image2.jpg';
import image3 from './images/image3.jpg';
import image4 from './images/image4.jpg';

import { inject, observer } from 'mobx-react';
import BannerTip from '@/components/BannerTip';
import './index.css';

const localItemRoyal = window.__.localItemRoyal;

@inject('checkoutStore', 'loginStore', 'clinicStore', 'configStore')
@injectIntl
@observer
class Help extends React.Component {
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
          <BannerTip />
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
              <FormattedMessage id="tailorednutrition.tip1" />
            </h2>
            <p style={{ fontSize: '1.2rem' }}></p>
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
                  <FormattedMessage id="tailorednutrition.tip2" />
                </h2>
                <p>
                  <FormattedMessage id="tailorednutrition.tip3" />
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
                  <FormattedMessage id="tailorednutrition.tip4" />
                </h2>
                <p>
                  <FormattedMessage id="tailorednutrition.tip5" />
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
                  <FormattedMessage id="tailorednutrition.tip6" />
                </h2>
                <p>
                  <FormattedMessage id="tailorednutrition.tip7" />
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
                  <FormattedMessage id="tailorednutrition.tip8" />
                </h2>
                <p>
                  <FormattedMessage id="tailorednutrition.tip9" />
                </p>
              </div>
            </div>
          </div>
          <section
            style={{ textAlign: 'center', width: '90%', margin: '0 auto' }}
          >
            <h2>
              <FormattedMessage id="tailorednutrition.tip10" />
            </h2>
            <p>
              <FormattedMessage id="tailorednutrition.tip11" />
            </p>
          </section>
        </main>
        <Footer />
      </div>
    );
  }
}

export default Help;
