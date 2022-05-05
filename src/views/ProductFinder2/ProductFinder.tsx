import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import BreadCrumbs from '@/components/BreadCrumbs';
import { loadJS, dynamicLoadCss } from '@/utils/utils';

const ProductFinder = (props: any) => {
  let location = useLocation();
  const element = useRef<HTMLElement>(null);

  useEffect(() => {
    // @ts-ignore
    loadJS({
      url: 'https://prdeus2rcdeslangversa.z20.web.core.windows.net/product-finder/0-0-0/product-finder-webcomp.js'
    });

    element.current?.addEventListener(
      'viewProductDetails',
      handleViewProductDetails
    );
    return () =>
      element.current?.removeEventListener(
        'viewProductDetails',
        handleViewProductDetails
      );
  }, []);

  const handleViewProductDetails = (
    customEvent: any /* use your own types instead of any */
  ) => {
    console.log('view product details :', customEvent.detail);
    alert('Check your console to see product details !');
  };

  return (
    <>
      <Header {...props} showMiniIcons={true} showUserIcon={true} />
      <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
        <BannerTip />
        <BreadCrumbs />
        <product-finder
          ref={element}
          locale="en-GB"
          country="FR"
          extra_rations_units={JSON.stringify(['japanCup'])}
          current_location={JSON.stringify(location)}
        ></product-finder>
        <div className="pb-20" />
        <Footer />
      </main>
    </>
  );
};

export default ProductFinder;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'product-finder': any;
    }
  }
}
