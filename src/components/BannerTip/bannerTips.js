import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl-phraseapp';
import { getDeviceType } from '@/utils/utils';
import { isLimitLogin } from '@/components/LoginButton/utils';
import './index.less';
import { accountCallBack, mktCallBack } from '@/api/home.js';

const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';
const localItemRoyal = window.__.localItemRoyal;
const isLogin = !!localItemRoyal.get('rc-token');

function Container({ children }) {
  return isMobile ? (
    <marquee style={{ display: 'flex', alignItems: 'center' }}>
      {children}
    </marquee>
  ) : (
    <div
      className="rc-column rc-content-v-middle rc-zeta rc-margin--none rc-padding--xs"
      style={{ padding: '.3rem .5rem' }}
    >
      {children}
    </div>
  );
}

function AlertTips() {
  return (
    <span className="rc-margin-right--xs rc-margin-left--xs">
      Important Notice: Due to an increase in demand, your preferred product may
      be currently unavailable.
      <br />
      Your pet’s health is our top priority, and we’re working hard to ensure
      their formulas are back in stock soon.
      <br />
      Thank you for your patience.
    </span>
  );
}

// 美国4/17的美国中部时间早8点到晚4点不能登录账户
function LimitLoginAlertTips() {
  return (
    <span className="rc-margin-right--xs rc-margin-left--xs">
      Important Notice: Maintenance is planned for April 17th, 2021 from 8am-4pm
      CST.
      <br />
      Checkout and account access may be unavailable during this time. Please
      check back after 4pm CST.
      <br />
      We apologize for the inconvenience. Thank you!
    </span>
  );
}

const bannerTips = () => {
  const [mktMessage, setMktMessage] = useState('');
  const [show, setShow] = useState(null);
  const oktaSessionToken = localItemRoyal.get('okta-session-token');
  const history = useHistory();
  function ShowMKTMessage() {
    // example: ?customerId=800001798a0bf24f7bc8e5dc96ac5d88&consentId=127&uuid=812e111ebe754154a9092805c08937f9
    let parameters = history.location.search;
    parameters.replace('?', '');
    let searchList = parameters.split('&');
    let customerId = '';
    let consentId = '';
    let uuid = '';
    if (searchList.length === 3) {
      customerId = searchList[0].split('=')[1];
      consentId = searchList[1].split('=')[1];
      uuid = searchList[2].split('=')[1];
    }

    if (customerId && consentId && uuid) {
      mktCallBack({ customerId, consentId, uuid }).then((res) => {
        if (res.context && res.context.customerActivateStatus) {
          setMktMessage(<FormattedMessage id="home.MKTReturnHasUser" />);
        } else {
          setMktMessage(<FormattedMessage id="home.MKTReturnNoUser" />);
        }
        return showFiveSeconds();
      });
    } else if (oktaSessionToken) {
      let mtkOktaKey = 'already-show-MKT_' + oktaSessionToken;
      const alreadyShowMkt = localItemRoyal.get(mtkOktaKey);
      if (alreadyShowMkt === 'true') {
        return;
      }
      accountCallBack().then((res) => {
        if (res.context && res.context.mktConsentActivateStatus) {
          setMktMessage(<FormattedMessage id="home.userReturnHasMKT" />);
        } else {
          if (res.context.mktSelectedFlag) {
            setMktMessage(<FormattedMessage id="home.userReurnNoMKT" />);
          } else {
            setMktMessage(<FormattedMessage id="home.userReturnHasMKT" />); // Not select MKT when register
          }
        }
        localItemRoyal.set(mtkOktaKey, 'true');
        return showFiveSeconds();
      });
    }
  }

  function showFiveSeconds() {
    setShow(true);
    return setTimeout(() => {
      setShow(false);
    }, 5000);
  }

  useEffect(() => {
    if (window.__.env.REACT_APP_COUNTRY === 'de' && isLogin) {
      const timeId = ShowMKTMessage();
      return () => {
        clearTimeout(timeId);
      };
    }
  }, []);

  return (
    <div
      // id="bannerTip"
      className="red font-weight-normal p-1 position-relative text-center pl-2 pr-2 pr-md-4 pl-md-4 rc-bg-colour--brand4 rc-bannertip-containner"
    >
      {window.__.env.REACT_APP_IS_PROMOTION === 'true' && (
        <div>
          {/* 美国临时加一个写死的Notice  */}
          {window.__.env.REACT_APP_COUNTRY === 'us' ? (
            <div className="rc-bg-colour--brand4 text-center">
              <div className="rc-layout-container rc-content-h-middle">
                <div className="rc-column rc-content-v-middle rc-zeta rc-margin--none rc-padding--xs">
                  <div className="d-flex align-items-center">
                    {window.__.env.REACT_APP_COUNTRY == 'us' &&
                    isLimitLogin() ? (
                      <LimitLoginAlertTips />
                    ) : (
                      <AlertTips />
                    )}
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          {show && window.__.env.REACT_APP_COUNTRY === 'de' ? mktMessage : null}
          <div className="rc-bg-colour--brand4 text-center">
            <div className="rc-layout-container rc-content-h-middle">
              <Container>
                {window.__.env.REACT_APP_COUNTRY == 'de' ? null : (
                  <span className="rc-icon rc-refresh rc-brand1 rc-iconography" />
                )}
                <span className="align-middle">
                  <span className="rc-margin-right--xs rc-margin-left--xs rc-bannertip-text ui-cursor-pointer-pure">
                    <FormattedMessage id="home.promotionTip" />
                  </span>
                  {window.__.env.REACT_APP_COUNTRY == 'de' ? (
                    <Link
                      to="/how-to-order"
                      className="rc-btn rc-btn--sm rc-btn--two rc-margin-left--xs"
                    >
                      <FormattedMessage id="bannerTip.btnText" />
                    </Link>
                  ) : (
                    <Link
                      to="/subscription-landing"
                      className="rc-btn rc-btn--sm rc-btn--two rc-margin-left--xs"
                    >
                      <FormattedMessage id="bannerTip.btnText" />
                    </Link>
                  )}
                </span>
              </Container>
            </div>
          </div>
        </div>
      )}
      <FormattedMessage id="home.note1" defaultMessage={' '} />{' '}
      <FormattedMessage id="home.note2" defaultMessage={' '} />
    </div>
  );
};
export default bannerTips;
