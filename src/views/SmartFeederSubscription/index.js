import React, { Component } from 'react';
import Help from './modules/Help';
// import FAQ from './modules/FAQ';
import Details from './modules/Details';
import StaticPage from './modules/StaticPage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './index.less';
import goodsDetailTab from './modules/goodsDetailTab.json';
console.info('goodsDetailTab', goodsDetailTab);
class SmartFeederSubscription extends Component {
  render() {
    const { location, history, match } = this.props;

    return (
      <div>
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={location}
          history={history}
          match={match}
        />
        <main className="rc-content--fixed-header smartfeedersubscription">
          <StaticPage />
          <section className="rc-max-width--xl rc-padding-x--sm rc-padding-x--xl--mobil">
            <h2 className="smartfeedersubscription-title">
              Select your product
            </h2>
            <div className="rc-layout-container rc-five-column">
              <div className="rc-column" style={{background: 'red'}}>
                <h1> 1 / 2 </h1>
              </div>
              <div className="rc-column rc-double-width">
                <h1> 1 / 2 </h1>
              </div>
            </div>
            <Details goodsDetailTab={goodsDetailTab.data} />
          </section>
          {/* <FAQ /> */}
          <Help />
        </main>
        <Footer />
      </div>
    );
  }
}

export default SmartFeederSubscription;
