import React, { useState } from 'react';
import BannerTip from '@/components/BannerTip';
import BreadCrumbs from '@/components/BreadCrumbs';
import SideMenu from '@/components/SideMenu';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Canonical from '@/components/Canonical';
import { getDeviceType } from '@/utils/utils';
import GoogleTagManager from '@/components/GoogleTagManager';
import Table from './components/table';
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

  const [myLoyaltyPoints, setMyLoyaltyPoints] = useState(2300);

  const [pageNum, setPageNum] = useState(1);
  const [totalPage, setTotalPage] = useState(10);
  const [data, setData] = useState([]);

  const sendPageNumber = (pageNumber) => {
    setPageNum(pageNumber);
  };

  const sendData = (data) => {
    setData(data);
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
              <div>
                <div className="title">
                  <FormattedMessage id="Transaction history" />
                </div>
                <div className="flex mt-4 mb-3">
                  <div className="flex flex-column mr-6">
                    <div className="stage">
                      <FormattedMessage id="My Stage" />
                    </div>
                    <div className="content">
                      <FormattedMessage id="Bronze" />
                    </div>
                  </div>
                  <div className="flex flex-column points">
                    <div className="stage">
                      <FormattedMessage id="My Loyalty Points" />
                    </div>
                    {data.length > 0 ? (
                      <div className="content">{myLoyaltyPoints}</div>
                    ) : (
                      <div className="pt-2">
                        <FormattedMessage id="There is no point history." />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <Table pageNum={pageNum} sendData={sendData} />
              <div className="h-3"></div>
              <Pagination
                pageNum={pageNum}
                totalPage={totalPage}
                sendPageNumber={sendPageNumber}
              />
            </div>
          </div>
        </div>
        <Footer />
      </main>
      <style jsx>{`
        .title {
          color: #e2001a;
          font-size: 18px;
        }
        .stage {
          color: #666;
          font-size: 16px;
        }
        .content {
          color: #666;
          font-size: 26px;
          font-weight: 500;
        }
      `}</style>
    </>
  );
};

export default Loyalty;
