import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { setSeoConfig } from '@/utils/utils';
import { Canonical } from '@/components/Common';

interface Props {
  errMsg: string;
  goodsId: string;
  pageLink: string;
  setHeadingTag: Function;
}

const SeoConfig = ({ errMsg, goodsId, pageLink, setHeadingTag }: Props) => {
  const [seoConfig, setSeoConfigInfo] = useState({
    title: 'Royal canin',
    metaKeywords: 'Royal canin',
    metaDescription: 'Royal canin',
    headingTag: 'h1'
  });
  useEffect(() => {
    if (goodsId) {
      // @ts-ignore
      setSeoConfig({
        goodsId: goodsId,
        categoryId: '',
        pageName: 'Product Detail Page'
      }).then((res) => {
        setSeoConfigInfo(res);
        setHeadingTag(res.headingTag);
      });
    }
  }, [goodsId]);

  return (
    <div>
      <Canonical href={pageLink.toLowerCase()} pageType={'PDP'} />
      <Helmet>
        <title>{seoConfig.title}</title>
        <meta name="description" content={seoConfig.metaDescription} />
        <meta name="keywords" content={seoConfig.metaKeywords} />
      </Helmet>
      {errMsg ? (
        <h1 style={{ display: 'none' }}>{seoConfig.metaDescription}</h1>
      ) : null}
    </div>
  );
};

export default SeoConfig;
