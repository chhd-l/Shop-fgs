import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import Skeleton from 'react-skeleton-loader';
import { Link } from 'react-router-dom';
import { getReturnDetails } from '@/api/order';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import { IMG_DEFAULT } from '@/utils/constant';
import './index.css';
import LazyLoad from 'react-lazyload';
import { Helmet } from 'react-helmet';
import { seoHoc } from '@/framework/common';

const sessionItemRoyal = window.__.sessionItemRoyal;

const pageLink = window.location.href;

@seoHoc()
class OrdersAfterSaleSuccess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      returnNumber: '',
      afterSaleType: '',
      details: null,
      loading: true,
      errMsg: ''
    };
  }
  componentDidMount() {
    this.setState(
      {
        returnNumber: this.props.match.params.returnNumber,
        afterSaleType: sessionItemRoyal.get('rc-after-sale-type')
      },
      () => this.queryReturnDetails()
    );
  }
  queryReturnDetails() {
    getReturnDetails(this.state.returnNumber)
      .then((res) => {
        this.setState({
          details: res.context,
          loading: false
        });
      })
      .catch((err) => {
        this.setState({
          errMsg: err.message.toString(),
          loading: false
        });
      });
  }
  render() {
    const { details, errMsg } = this.state;
    const event = {
      page: {
        type: 'Account',
        theme: '',
        path: location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: ''
      }
    };
    return (
      <div>
        <GoogleTagManager additionalEvents={event} />
        <Helmet>
          <link rel="canonical" href={pageLink} />
        </Helmet>

        <Header {...this.props} />
        <main className="rc-content--fixed-header">
          <BannerTip />
          <div className="rc-layout-container rc-three-column rc-max-width--xl">
            <div className="rc-column rc-double-width">
              <div className="center">
                {this.state.loading ? (
                  <Skeleton
                    color="#f5f5f5"
                    width="100%"
                    height="50%"
                    count={5}
                  />
                ) : details ? (
                  <React.Fragment>
                    <span className="flex items-center justify-center bg-green rounded-full w-14 h-14 md:w-20 md:h-20 mb-2">
                      <span className="iconfont iconduigoux font-bold text-white text-4xl inline-block md:text-5xl" />
                    </span>
                    <h4>
                      <strong>
                        The{' '}
                        {details.returnType === 'RETURN'
                          ? 'return refund'
                          : 'exchange'}{' '}
                        application is submited successfully!
                      </strong>
                    </h4>
                    <p style={{ marginBottom: '5px' }}>
                      Your application has been submited for review, you can
                      view the progress in the personal center.
                    </p>
                    <Link
                      to={`/account/return-order-detail/${this.state.returnNumber}`}
                      className="rc-meta rc-styled-link backtohome"
                      style={{ fontWeight: 500 }}
                    >
                      View after-sale details
                    </Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Link
                      to="/home"
                      className="rc-meta rc-styled-link backtohome"
                      style={{ fontWeight: 500 }}
                    >
                      <FormattedMessage id="confirmation.visitOnlineStore" />
                    </Link>
                    <p className="rc-margin-top--sm">
                      <strong>Return number: {this.state.returnNumber}</strong>
                    </p>
                    <div className="rc-bg-colour--brand3 rc-max-width--xl rc-bottom-spacing rc-padding--sm imformation">
                      <div className="info-container text-left">
                        {details.returnItems.map((item) => (
                          <div className="d-flex mb-1" key={item.skuId}>
                            <LazyLoad>
                              <img
                                className="img-fluid border"
                                src={item.pic || IMG_DEFAULT}
                                alt={item.skuName}
                                title={item.skuName}
                                style={{ width: '20%' }}
                              />
                            </LazyLoad>
                            <span className="ml-2">
                              {item.skuName}
                              <br />
                              {item.specDetails} - {item.num} items
                            </span>
                          </div>
                        ))}
                        <div className="circle-line"></div>
                      </div>
                    </div>
                  </React.Fragment>
                ) : errMsg ? (
                  <div className="text-center mt-5 mb-5">
                    <span className="rc-icon rc-incompatible--xs rc-iconography"></span>
                    {errMsg}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </div>
    );
  }
}
export default OrdersAfterSaleSuccess;
