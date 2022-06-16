import React from 'react';
import LazyLoad from 'react-lazyload';
import joinusnewlogo from './image/joinusnewlogo.png';
import rulogo from '../../image/CLUB_logoRU@2x.png';
import joinusnewright from './image/joinusnewright.png';
import joinusnewru from './image/joinusnewrightru2.png';
import joinusnewtr from './image/joinusnewrighttr.png';
import './index.css';
import { FormattedMessage } from 'react-intl-phraseapp';
import { DistributeHubLinkOrATag } from '@/components/DistributeLink';

const JoinTodayNew = () => {
  return (
    <div
      className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-top--sm rc-margin-top--lg--mobile three-column-content-block"
      style={{ marginTop: '0' }}
    >
      <div
        className="rc-bg-colour--brand3"
        id="benefits-box"
        style={{ padding: '1px 0' }}
      >
        <div className="rc-full-width">
          <div>
            <div className="experience-component experience-assets-importContentAsset">
              <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
                <div className="content-asset">
                  <div
                    className="row rc-max-width--xl rc-match-heights flexwrapJoin"
                    style={{
                      margin: '0',
                      display: 'flex',
                      flexWrap: 'wrap'
                    }}
                  >
                    <div className="col-12 col-md-4 order-1 md:order-0  orderJoin1">
                      <div className="rc-column rc-padding--none">
                        <LazyLoad>
                          {window.__.env.REACT_APP_COUNTRY == 'ru' ? (
                            <img
                              className="w-auto lazyloaded logomargin"
                              style={{
                                maxWidth: '50%'
                              }}
                              src={rulogo}
                            />
                          ) : (
                            <img
                              className="w-auto lazyloaded logomargin"
                              style={{
                                maxWidth: '50%'
                              }}
                              src={joinusnewlogo}
                            />
                          )}
                        </LazyLoad>
                      </div>
                    </div>
                    <div className="col-12 col-md-4 m-auto rc-padding-x--sm rc-padding-x--lg--mobile rc-padding-top--lg--mobile order-0 md:order-1 orderJoin2">
                      <div className="text-center">
                        <h2 style={{ fontWeight: '550' }}>
                          <FormattedMessage id="ClubLP.NewJoinUs.title" />
                        </h2>
                      </div>
                      <div className="rc-intro inherit-fontsize rc-text--center textCenterJoin">
                        <a className="">
                          <FormattedMessage id="ClubLP.NewJoinUs.content" />
                        </a>
                      </div>
                      <div
                        style={{ display: 'flex', justifyContent: 'center' }}
                      >
                        <DistributeHubLinkOrATag
                          href={'/product-finder'}
                          ariaLabel="Links to product finder"
                        >
                          <button
                            onClick={() => {
                              window.__.env.REACT_APP_COUNTRY == 'ru' &&
                                window?.dataLayer?.push({
                                  event: 'ruClubSubscriptionCtA',
                                  ruClubSubscriptionCtAName:
                                    'Choose a diet - Middle'
                                });
                            }}
                            className="rc-btn rc-btn--one"
                            style={{
                              paddingLeft: '90px',
                              paddingRight: '90px'
                            }}
                          >
                            <FormattedMessage id="ClubLP.NewJoinUs.button" />
                          </button>
                        </DistributeHubLinkOrATag>
                      </div>
                    </div>
                    <div className="col-12 col-md-4 order-2 md:order-2 ">
                      <div className="rc-column rc-padding--none">
                        <LazyLoad height={180}>
                          {window.__.env.REACT_APP_COUNTRY == 'ru' ? (
                            <img
                              src={joinusnewru}
                              style={{
                                maxHeight: '90%',
                                maxWidth: '90%',
                                marginLeft: '3vw'
                              }}
                            />
                          ) : window.__.env.REACT_APP_COUNTRY == 'tr' ? (
                            <img
                              src={joinusnewtr}
                              style={{
                                maxHeight: '90%',
                                maxWidth: '90%',
                                marginLeft: '5vw'
                              }}
                            />
                          ) : (
                            <img
                              src={joinusnewright}
                              style={{
                                maxHeight: '90%',
                                maxWidth: '90%',
                                marginLeft: '5vw'
                              }}
                            />
                          )}
                        </LazyLoad>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinTodayNew;
