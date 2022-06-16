import React, { useEffect, useState } from 'react';

const useSeo = (seoPageName) => {
  const [seoinfo, setSeoinfo] = useState({
    title: 'Royal canin',
    metaKeywords: 'Royal canin',
    metaDescription: 'Royal canin'
  });
  useEffect(() => {
    const setSeoConfig = require('@/utils/utils').setSeoConfig;
    setSeoConfig({
      pageName: seoPageName
    }).then((res) => {
      setSeoinfo(res);
    });
  }, []);
  return [seoinfo];
};

export default useSeo;
