import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import { FormattedMessage } from 'react-intl';
import { setSeoConfig } from '@/utils/utils';

function Exception({ location, match, history }) {
  setSeoConfig();
  return (
    <React.Fragment>
      <Header
        showMiniIcons={false}
        match={match}
        location={location}
        history={history}
      />
      <div
        className="page rc-content--fixed-header"
        data-action="RedirectURL-Start"
        data-querystring=""
      >
        <BannerTip />
        <div className="container full-vh">
          <div className="rc-padding--md rc-text--center rc-bg-colour--interface">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              x="0px"
              y="0px"
              viewBox="0 0 260 265"
              xmlSpace="preserve"
              className="rc-svg--animated rc-padding-bottom--none"
              data-js-import-interactive-svg=""
              svg-animate-processed="true"
            >
              <g id="kennel">
                <polygon
                  style={{ fill: '#E2001A' }}
                  points="234.7,265 25.3,265 25.3,90 130.3,13.3 234.7,90"
                ></polygon>
                <g>
                  <defs>
                    <polygon
                      id="SVGID_1_"
                      points="234.7,265 25.3,265 25.3,90 130.3,13.3 234.7,90"
                    ></polygon>
                  </defs>
                  <g style={{ enableBackground: 'new' }}>
                    <rect
                      x="50.6"
                      y="66"
                      style={{ fill: '#960011' }}
                      width="158.7"
                      height="3.3"
                    ></rect>
                  </g>
                  <g style={{ enableBackground: 'new' }}>
                    <rect
                      x="115"
                      y="16.2"
                      style={{ fill: '#960011' }}
                      width="35"
                      height="3.3"
                    ></rect>
                  </g>
                  <g style={{ enableBackground: 'new' }}>
                    <rect
                      x="26"
                      y="115.9"
                      style={{ fill: '#960011' }}
                      width="208"
                      height="3.3"
                    ></rect>
                  </g>
                  <g style={{ enableBackground: 'new' }}>
                    <rect
                      x="26"
                      y="165.7"
                      style={{ fill: '#960011' }}
                      width="208"
                      height="3.3"
                    ></rect>
                  </g>
                  <g style={{ enableBackground: 'new' }}>
                    <rect
                      x="26"
                      y="215.5"
                      style={{ fill: '#960011' }}
                      width="208"
                      height="3.3"
                    ></rect>
                  </g>
                  <g style={{ enableBackground: 'new' }}>
                    <rect
                      x="-24.7"
                      y="265.4"
                      style={{ fill: '#960011' }}
                      width="285.5"
                      height="3.3"
                    ></rect>
                  </g>
                </g>
                <polygon
                  style={{ fill: '#960011' }}
                  points="260,95.9 130.1,0.1 130,0 130,0 130,0 129.9,0.1 0,95.9 8.9,109.3 130,20 251.1,109.3  "
                ></polygon>
                <g>
                  <path
                    style={{ fill: '#960011' }}
                    d="M194.3,166.1c0-37.3-28.9-67.8-64.3-67.8l0,0c-35.4,0-64.3,30.5-64.3,67.8V265h128.6V166.1z"
                  ></path>
                </g>
              </g>
              <g id="sign">
                <rect
                  x="81.1"
                  y="120.8"
                  transform="matrix(0.3965 -0.918 0.918 0.3965 -41.4349 179.9058)"
                  style={{ fill: '#808285' }}
                  width="70"
                  height="1.3"
                ></rect>
                <rect
                  x="143.2"
                  y="86.5"
                  transform="matrix(0.9179 -0.3967 0.3967 0.9179 -36.3822 67.049)"
                  style={{ fill: '#808285' }}
                  width="1.3"
                  height="70"
                ></rect>
                <circle
                  style={{ fill: '#F6F6F6' }}
                  cx="130"
                  cy="89.4"
                  r="3.7"
                ></circle>
                <rect
                  x="86.7"
                  y="145.8"
                  style={{ fill: '#F6F6F6' }}
                  width="86.5"
                  height="57.5"
                ></rect>
                <g>
                  <path
                    style={{ fill: '#E2001A' }}
                    d="M113.1,183.5v4.4h-2.7v-4.4H99.4V181l9.9-20.6h3l-9.9,20.6h8v-7.8h2.7v7.8h3.4v2.5H113.1z"
                  ></path>
                  <path
                    style={{ fill: '#E2001A' }}
                    d="M130,188.1c-4.3,0-7.5-3-7.5-7.6v-12.8c0-4.5,3.2-7.6,7.5-7.6c4.3,0,7.5,3,7.5,7.6v12.8         C137.5,185.1,134.3,188.1,130,188.1z M134.7,167.9c0-3-1.7-5.2-4.7-5.2c-3,0-4.7,2.2-4.7,5.2v12.5c0,3,1.7,5.2,4.7,5.2         c3,0,4.7-2.2,4.7-5.2V167.9z"
                  ></path>
                  <path
                    style={{ fill: '#E2001A' }}
                    d="M157.2,183.5v4.4h-2.7v-4.4h-10.9V181l9.9-20.6h3l-9.9,20.6h8v-7.8h2.7v7.8h3.4v2.5H157.2z"
                  ></path>
                </g>
              </g>
            </svg>

            <div className="rc-bg-colour--brand3">
              <div className="rc-padding--sm rc-margin-bottom--xs">
                <div className="rc-padding-y--md rc-md-down"></div>

                <div className="rc-layout-container rc-one-column rc-max-width--md">
                  <div className="rc-column">
                    <div className="rc-full-width rc-text--center rc-padding-x--sm">
                      <div className="rc-alpha inherit-fontsize">
                        <h1>
                          <FormattedMessage id="home.pageNotFound" />
                        </h1>
                      </div>
                      <div>
                        <FormattedMessage id="home.pageNotFoundInfo" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rc-padding-y--md rc-md-down"></div>
              </div>
            </div>
            <Link
              to="/home"
              className="rc-btn rc-btn--two"
              role="button"
              aria-pressed="true"
            >
              <FormattedMessage id="continueShopping" />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </React.Fragment>
  );
}

export default Exception;
