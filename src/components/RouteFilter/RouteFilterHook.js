import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { loadJS, dynamicLoadCss } from '@/utils/utils';
import { withRouter } from 'react-router-dom';

const RouteFilterHook = (props) => {
  const {
    configStore,
    location: { pathname }
  } = props;
  // 处理onetrust(cookie banner)动态插入，包括script和css
  useEffect(() => {
    const bannerConfigInfo = configStore.info?.bannerConfigInfo;
    if (bannerConfigInfo && pathname !== '/pickupmap') {
      const div = window.document.createElement('div');
      div.innerHTML = bannerConfigInfo;
      const scripts = div.querySelectorAll('script');
      const links = div.querySelectorAll('link');
      let scriptsCount = scripts.length;
      let linksCount = links.length;
      while (scriptsCount--) {
        const curScript = scripts[scriptsCount];
        let param = {
          url: curScript.src,
          dataSets: { ...curScript.dataset }
        };
        if (curScript.innerHTML) {
          param = { ...param, ...{ code: curScript.innerHTML } };
        }
        loadJS(param);
      }

      while (linksCount--) {
        const curLink = links[linksCount];
        dynamicLoadCss(curLink.href);
      }
    }
  }, [configStore.info?.bannerConfigInfo, pathname]);

  return <div />;
};

export default inject('configStore')(observer(withRouter(RouteFilterHook)));
