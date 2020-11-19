import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import BreadCrumbs from '@/components/BreadCrumbs';
import Footer from '@/components/Footer';
import { FormattedMessage, injectIntl } from 'react-intl';
import image1 from './images/image1.jpg';
import image2 from './images/image2.jpg';
import image3 from './images/image3.jpg';
import cat from './images/cat.jpg';
import dog from './images/dog.jpg';
import { inject, observer } from 'mobx-react';
import './index.css';
import { setSeoConfig } from '@/utils/utils';

const localItemRoyal = window.__.localItemRoyal;

@inject('checkoutStore', 'loginStore', 'clinicStore')
@inject('configStore')
@observer
@injectIntl
class AboutUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  componentDidMount() {
    setSeoConfig()
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
          <BreadCrumbs />
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
              <FormattedMessage id="aboutUs.title" defaultMessage={' '} />
            </h2>
            <p style={{ fontSize: '1.2rem' }}>
              <FormattedMessage id="aboutUs.description" defaultMessage={' '} />
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
                  <FormattedMessage id="aboutUs.history" defaultMessage={' '} />
                </h2>
                <p>
                  <FormattedMessage id="aboutUs.historyDetail" />
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
                  <FormattedMessage id="aboutUs.ourValues" />
                </h2>
                <p>
                  <FormattedMessage id="aboutUs.ourValuesDetail" />
                </p>
                {this.props.intl.messages['aboutUs.learnMore'] ? (
                  <a
                    className="rc-btn rc-btn--one gtm-content-block-btn js-hnc-try-the-club"
                    href={process.env.REACT_APP_LANG == 'fr'?"/values-fr":'/tailorednutrition'}
                  >
                    <FormattedMessage
                      id="aboutUs.learnMore"
                      defaultMessage={' '}
                    />
                  </a>
                ) : null}
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
                  <FormattedMessage id="aboutUs.FoodQualityandSafety" />
                </h2>
                <p>
                  <FormattedMessage id="aboutUs.FoodQualityandSafetyDetail" />
                </p>
                {this.props.intl.messages['aboutUs.learnMore'] ? (
                  <a
                    className="rc-btn rc-btn--one gtm-content-block-btn js-hnc-try-the-club"
                    href="/qualitySafety"
                  >
                    <FormattedMessage
                      id="aboutUs.learnMore"
                      defaultMessage={' '}
                    />
                  </a>
                ) : null}
              </div>
            </div>
            <div className="rc-column">
              <img src={image3} style={{ width: '100%' }} alt="" />
            </div>
          </div>
          <section
            style={{ textAlign: 'center', width: '90%', margin: '80px auto' }}
          >
            <h2 style={{ fontSize: '2.5rem' }}>
              <FormattedMessage id="aboutUs.IncredibleDetail" />
            </h2>
            <p>
              <FormattedMessage id="aboutUs.SeeHowWeDo" />
            </p>
            <iframe
              src="https://www.youtube.com/embed/OrQZm_1SvFE"
              width="608"
              height="342"
              title="making a better world for pets"
              allowfullscreen=""
              frameborder="0"
            ></iframe>
          </section>
          <section
            style={{ textAlign: 'left', width: '100%', margin: '0 auto',display:process.env.REACT_APP_LANG === 'fr'?'none':'block' }}
          >
            <h2
              style={{
                color: '#E2001A',
                marginTop: '40px',
                fontSize: '2.5rem',
                paddingLeft: '200px'
              }}
            >
              <FormattedMessage id="aboutUs.shopTile" />
            </h2>
            <div
              className="rc-layout-container rc-two-column"
              style={{ padding: '20px 200px' }}
            >
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
                    fontWeight: '400'
                  }}
                >
                  <FormattedMessage id="aboutUs.shopDog" />
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
                    fontWeight: '400'
                  }}
                >
                  <FormattedMessage id="aboutUs.shopCat" />
                </p>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }
}

export default AboutUs;
