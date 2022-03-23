import React, { Component } from 'react';
import { seoHoc } from '@/framework/common';
import LazyLoad from 'react-lazyload';
import { DistributeHubLinkOrATag } from '@/components/DistributeLink';
import Canonical from '@/components/Canonical';

@seoHoc('Contact Us Page')
class FrFaq extends Component {
  render() {
    return (
      <div>
        <Canonical />
        <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
          <div className="rc-layout-container rc-five-column rc-match-heights text-center md:text-left">
            <div className="rc-column rc-triple-width">
              <div
                className="background-cover"
                style={{
                  backgroundImage: `url(${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/02_help.jpg)`
                }}
              >
                <picture className="rc-card__image">
                  <LazyLoad>
                    <img
                      className=" lazyloaded"
                      src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/02_help.jpg`}
                      alt="help icon"
                    />
                  </LazyLoad>
                </picture>
              </div>
            </div>
            <div className="rc-column rc-double-width rc-padding--none">
              <article className="rc-full-width rc-column">
                <div className="rc-border-all rc-border-colour--interface fullHeight">
                  <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight">
                    <div className="rc-column rc-double-width rc-padding-top--md--mobile">
                      <p>
                        {`Vous pouvez également consulter notre rubrique `}
                        <DistributeHubLinkOrATag
                          style={{
                            textDecoration: 'underline',
                            color: 'rgb(236,0,26)',
                            backgroundColor: 'rgb(255,255,255)',
                            padding: '0 3px'
                          }}
                          to="/faq"
                          href="/about-us/faqs"
                        >
                          FAQ
                        </DistributeHubLinkOrATag>
                        qui vous apportera de nombreuses réponses.
                      </p>
                    </div>
                    <div className="rc-column rc-content-v-middle">
                      <LazyLoad>
                        <img
                          className="lazyloaded"
                          src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/FAQ_icon@90.jpg`}
                          alt="faq icon"
                        />
                      </LazyLoad>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default FrFaq;
