import React, { useRef } from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Skeleton from 'react-skeleton-loader';
import Header from '@/components/Header';
import BreadCrumbs from '@/components/BreadCrumbs';
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
import image5 from './images/image5.jpg'
import cat from './images/cat.jpg'
import dog from './images/dog.jpg'

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
class QualitySafety extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
    };
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
              <FormattedMessage id='qualitySafety.title'/> 
            </h2>
            <p style={{fontSize: '1.2rem'}}>
              <FormattedMessage id='qualitySafety.description'/> 
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
                  <FormattedMessage id='qualitySafety.foodTitle'/> 
                </h2>
                <p>
                  <FormattedMessage id='qualitySafety.foodDetail'/> 
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
              <img src={image2} style={{ width: '100%', marginTop: '50px' }} />
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
                  <FormattedMessage id='qualitySafety.consistentTitle'/> 
                </h2>
                <p>
                  <FormattedMessage id='qualitySafety.consistentDetail'/> 
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
                  <FormattedMessage id='qualitySafety.materialsTitle'/> 
                </h2>
                <p>
                  <FormattedMessage id='qualitySafety.materialsDetail'/> 
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
              <img src={image4} style={{ width: '100%', marginTop: '50px' }} />
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
                  <FormattedMessage id='qualitySafety.rigorousTitle'/> 
                </h2>
                <p>
                  <FormattedMessage id='qualitySafety.rigorousDetail'/> 
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
                  <FormattedMessage id='qualitySafety.ingredientsTitle'/> 
                </h2>
                <p>
                  <FormattedMessage id='qualitySafety.ingredientsDetail'/> 
                </p>
              </div>
            </div>
            <div class="rc-column">
              <img src={image5} style={{ width: '100%' }} />
            </div>
          </div>
          <section style={{ textAlign: 'left', width: '100%', margin: '0 auto', padding: '20px 200px' }}>
            <div style={{ border: 'solid 5px rgb(226, 0, 26)',borderWidth: '3px',borderRadius: '5px', padding: '2rem'}}>
              <h2 style={{ color: '#E2001A', marginTop: '40px', fontSize: '2.5rem', paddingLeft: '200px' }}>
                <FormattedMessage id='qualitySafety.shopTile'/> 
              </h2>
              <div
                class="rc-layout-container rc-two-column"
              >
                <div class="rc-column" style={{ border: '1px solid #ccc' , cursor: 'pointer'}} onClick={() => {
                    this.props.history.push('/list/dogs')
                  }}>
                  <img src={dog} style={{ width: '100%' }} />
                  <p style={{color: '#E2001A', fontSize: '1.5rem', margin: '20px 0 20px 20px', fontWeight: '400'}}><FormattedMessage id='qualitySafety.shopDog'/> </p>
                </div>
                <div class="rc-column" style={{ border: '1px solid #ccc', marginLeft: '20px', cursor: 'pointer'}} onClick={() => {
                    this.props.history.push('/list/cats')
                  }}>
                  <img src={cat} style={{ width: '100%' }} />
                  <p style={{color: '#E2001A', fontSize: '1.5rem', margin: '20px 0 20px 20px', fontWeight: '400'}}><FormattedMessage id='qualitySafety.shopCat'/> </p>
                </div>
              </div>
            </div>
          </section>
          <section style={{ textAlign: 'center', width: '90%', margin: '80px auto', color: 'rgb(102, 102, 102)' }}>
            <h2 style={{ fontSize: '2.5rem' }}>
              <FormattedMessage id='qualitySafety.FoodQualityandSafety'/>
            </h2>
            <p>
              <FormattedMessage id='qualitySafety.foodQualityDetail'/>
            </p>
          </section>
        </main>
        <Footer />
      </div>
    );
  }
}

export default QualitySafety;
