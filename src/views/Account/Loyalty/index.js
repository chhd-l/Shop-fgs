import React from 'react';
import BannerTip from '@/components/BannerTip';
import BreadCrumbs from '@/components/BreadCrumbs';
import SideMenu from '@/components/SideMenu';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Canonical from '@/components/Canonical';
import { getDeviceType } from '@/utils/utils';
import GoogleTagManager from '@/components/GoogleTagManager';
import Form from './components/form';
import Pagination from './components/pagination';
import { FormattedMessage } from 'react-intl-phraseapp';
import { Link } from 'react-router-dom';

const isMobile = getDeviceType() !== 'PC';
const localItemRoyal = window.__.localItemRoyal;

const Loyalty = (props) => {
  const event = {
    page: {
      type: 'AccountLoyalty',
      theme: '',
      path: props.location.pathname,
      error: '',
      hitTimestamp: new Date(),
      filters: ''
    }
  };
  return (
    <>
      <GoogleTagManager key={props.location.key} additionalEvents={event} />
      <Canonical />
      <Header {...props} showMiniIcons={true} showUserIcon={true} />
      <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
        <BannerTip />
        <BreadCrumbs />
        <div className="rc-padding--sm rc-max-width--xl">
          <div className="rc-layout-container rc-five-column">
            {isMobile ? (
              <div className="col-12 rc-md-down">
                <Link to="/account">
                  <span className="red">&lt;</span>
                  <span className="rc-styled-link rc-progress__breadcrumb ml-2 mt-1">
                    <FormattedMessage id="account.home" />
                  </span>
                </Link>
              </div>
            ) : (
              <SideMenu type="Loyalty" />
            )}
            <div className="rc-column rc-quad-width">
              <Form />
              <div className="h-3"></div>
              <Pagination />
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Loyalty;
