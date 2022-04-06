import { useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { accountCallBack, mktCallBack } from '@/api/home';
import qs from 'qs';

const localItemRoyal = window.__.localItemRoyal;

/**
 * 显示您的账号未激活提示逻辑
 */
const MktMessage = ({ loginStore, className }) => {
  const { isLogin } = loginStore;
  const [mktMessage, setMktMessage] = useState(''); //显示您的账号未激活提示逻辑
  const [show, setShow] = useState(null);
  const oktaSessionToken = localItemRoyal.get('okta-session-token');
  const history = useHistory();
  function ShowMKTMessage() {
    // example: ?customerId=800001798a0bf24f7bc8e5dc96ac5d88&consentId=127&uuid=812e111ebe754154a9092805c08937f9
    // let parameters = history.location.search;
    const searchParamObj = qs.parse(history.location.search, {
      ignoreQueryPrefix: true
    });
    // parameters.replace('?', '');
    // let searchList = parameters.split('&');
    let customerId = searchParamObj?.customerId;
    let consentId = searchParamObj?.consentId;
    let uuid = searchParamObj?.uuid;
    // if (searchList.length === 3) {
    //   customerId = searchList[0].split('=')[1];
    //   consentId = searchList[1].split('=')[1];
    //   uuid = searchList[2].split('=')[1];
    // }
    if (customerId && consentId && uuid) {
      mktCallBack({ customerId, consentId, uuid }).then((res) => {
        if (res.context && res.context.customerActivateStatus) {
          setMktMessage(<FormattedMessage id="home.MKTReturnHasUser" />);
        } else {
          setMktMessage(<FormattedMessage id="home.MKTReturnNoUser" />);
        }
        return showFiveSeconds(true);
      });
    } else if (oktaSessionToken && isLogin) {
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
        return showFiveSeconds(true);
      });
    }
    return showFiveSeconds(false);
  }

  function showFiveSeconds(isShow) {
    if (!isShow) {
      return;
    }
    setShow(isShow);
    return setTimeout(() => {
      setShow(!isShow);
    }, 5000);
  }

  useEffect(() => {
    if (window.__.env.REACT_APP_COUNTRY === 'de') {
      const timeId = ShowMKTMessage();
      return () => {
        clearTimeout(timeId);
      };
    }
  }, []);

  const mktMessageVisible = useMemo(() => {
    return show && window.__.env.REACT_APP_COUNTRY === 'de';
  }, [show]);

  return mktMessageVisible ? (
    <div className={className}>{mktMessage}</div>
  ) : null;
};

export default inject('loginStore')(observer(MktMessage));
