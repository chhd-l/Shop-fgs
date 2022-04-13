import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import BreadCrumbs from '@/components/BreadCrumbs';

const ProductFinder = (props: any) => {
  let location = useLocation();
  const element = useRef<HTMLElement>(null);

  useEffect(() => {
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
          extraRationsUnits={JSON.stringify(['japanCup'])}
          currentlocation={JSON.stringify(location)}
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
