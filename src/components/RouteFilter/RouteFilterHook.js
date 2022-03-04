import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { renderScriptOrLinkHtmlStr } from '@/utils/utils';
import { useHistory } from 'react-router-dom';

/**
 * 富文本为script/link标签时，直接append整段html无效，需动态创建对应标签
 */
const RouteFilterHook = ({ configStore }) => {
  const history = useHistory();
  const {
    location: { pathname }
  } = history;

  // --- 处理onetrust(cookie banner)动态插入，包括script和css
  useEffect(() => {
    const cookieBannerConfigInfo = configStore.info?.cookieBannerConfigInfo;
    if (cookieBannerConfigInfo && pathname !== '/pickupmap') {
      renderScriptOrLinkHtmlStr({ htmlStr: cookieBannerConfigInfo });
    }
  }, [configStore.info?.cookieBannerConfigInfo, pathname]);

  // --- 1.加载marsfooter 2.根据marsfooter状态，处理cookie settings button
  useEffect(() => {
    const marsFooterHtml = configStore.info?.marsFooter;
    if (
      !/^\/implicit\/callback|^\/required|^\/refuge|^\/okta-login-page|^\/okta-logout-page|^\/pickupmap|^\/survey/.test(
        pathname
      )
    ) {
      if (marsFooterHtml) {
        renderScriptOrLinkHtmlStr({
          htmlStr: marsFooterHtml,
          callback: () => {
            const cookieDomBox = document.querySelector('.cookieSettingBox');
            const marsFooterDomBox =
              document.querySelector('#mars-footer-panel');
            if (cookieDomBox && marsFooterDomBox) {
              marsFooterDomBox.append(cookieDomBox);
              cookieDomBox.style.visibility = 'visible';
            }
          }
        });
      }
    }
  }, [configStore.info?.marsFooter, pathname]);

  return <div />;
};

export default inject('configStore')(observer(RouteFilterHook));
