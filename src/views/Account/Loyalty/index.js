import React, { useState, useEffect } from 'react';
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
import { ownerPointsInfo } from '@/api/payment';
import { inject, observer } from 'mobx-react';
import './index.less';
import { ownerTotalPoints } from '@/api/payment';

const isMobile = getDeviceType() !== 'PC';

const Loyalty = (props) => {
  const customerId = props?.loginStore?.userInfo?.customerId;
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
  const [totalPage, setTotalPage] = useState(1);

  const limit = isMobile ? 5 : 10; //每页的数据总量

  const [data, setData] = useState([]);

  const sendPageNumber = (pageNumber) => {
    setPageNum(pageNumber);
  };

  useEffect(() => {
    //获取当前积分
    ownerTotalPoints({ customerId })
      .then((res) => {
        setMyLoyaltyPoints(res.context.totalPoints);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  //使用获取积分记录
  useEffect(() => {
    ownerPointsInfo({ customerId, limit, page: pageNum }) //8000017bf858119b439bb8741f75cece
      .then((res) => {
        setData(res.context.pointsRecordInfos);
        setTotalPage(res.context.totalPage);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [pageNum]);

  return (
    <>
      <GoogleTagManager key={props.location.key} additionalEvents={event} />
      <Canonical />
      <Header {...props} showMiniIcons={true} showUserIcon={true} />
      <main className="loyalty rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
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
                  <FormattedMessage id="account.loyalty.transactionHistory" />
                </div>
                <div className="flex mt-4 mb-3">
                  <div className="flex flex-column mr-6">
                    <div className="stage">
                      <FormattedMessage id="account.loyalty.myStage" />
                    </div>
                    <div className="content">
                      <FormattedMessage id="account.loyalty.bronze" />
                    </div>
                  </div>
                  <div className="flex flex-column points">
                    <div className="stage">
                      <FormattedMessage id="account.loyalty.myLoyaltyPoints" />
                    </div>
                    {data?.length > 0 ? (
                      <div className="content">{myLoyaltyPoints}</div>
                    ) : (
                      <div className="pt-2">
                        <FormattedMessage id="account.loyalty.noPointHistory" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <Table data={data} />
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
    </>
  );
};

export default inject('loginStore')(observer(Loyalty));
