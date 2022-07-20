import React from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import BreadCrumbs from '@/components/BreadCrumbs';

const FindProduct = () => {
  return (
    <div className="ru-local-find-product">
      <Header showMiniIcons={true} showUserIcon={true} />
      <main className="rc-content--fixed-header rc-bg-colour--brand3">
      <BreadCrumbs />
        <div>11111111</div>
      </main>
      <Footer />
    </div>
  );
};
export default FindProduct;
