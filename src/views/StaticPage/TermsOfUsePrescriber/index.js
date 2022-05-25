import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { seoHoc } from '@/framework/common';
import BannerTip from '@/components/BannerTip';
import './index.less';
import { dataList } from './data';
import Canonical from '@/components/Canonical';
const localItemRoyal = window.__.localItemRoyal;
// alert(1)

@seoHoc()
class TermsOfUsePrescriber extends React.Component {
  render(h) {
    return (
      <div className="TermsAndConditions">
        <Canonical />
        <Header {...this.props} showMiniIcons={true} showUserIcon={true} />
        <main className="rc-content--fixed-header rc-bg-colour--brand3">
          <BannerTip />
          <div className="rc-bg-colour--brand3 rc-bottom-spacing data-checkout-stage rc-max-width--lg rc-padding-x--md--mobile">
            <div className="rc-bg-colour--brand3">
              <div className="rc-padding--sm rc-padding-left--none">
                <div className="rc-one-column">
                  <div className="rc-column rc-padding-left--none">
                    <div className="rc-full-width rc-text--left rc-padding-x--sm rc- padding-left--none">
                      <h2 className="text-center">
                        Bedingungen für Vermittlung von Verkäufen über den ROYAL
                        CANIN®-Onlineshop
                      </h2>
                      {/* <span>Stand: [19.10.2020]</span> */}
                    </div>
                  </div>
                </div>
                {dataList.map((item, index) => {
                  return (
                    <p key={index}>
                      <div className="mb-2 dark bold">
                        <span className="pr-3">
                          {' '}
                          <span style={{ marginRight: 10 }}>
                            {index + 1}.
                          </span>{' '}
                          {item.title}
                        </span>
                      </div>
                      {item.children.map((child, idx) => {
                        return (
                          <div
                            className="pl-4"
                            key={idx}
                            style={{ marginTop: 5 }}
                          >
                            <span style={{ marginRight: 10 }}>
                              {index + 1}.{idx + 1}
                            </span>{' '}
                            {child}
                          </div>
                        );
                      })}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </div>
    );
  }
}

export default TermsOfUsePrescriber;
