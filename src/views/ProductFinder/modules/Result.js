import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import Skeleton from 'react-skeleton-loader';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BreadCrumbs from '@/components/BreadCrumbs';

import catImg from '@/assets/images/product-finder-cat.png';
import dogImg from '@/assets/images/product-finder-dog.png';

const ProductFinder = ({ location, history, match }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [productDetail, setProductDetail] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setProductDetail({
        img:
          'https://wanmi-b2b.oss-cn-shanghai.aliyuncs.com/202007260439267294.png" srcset="https://wanmi-b2b.oss-cn-shanghai.aliyuncs.com/202007260439267294.png',
        goodsName: 'Pwrson',
        subTitle: 'Adult cat food',
        price: 200
      });
    }, 2000);
  }, []);

  return (
    <div>
      <Header
        showMiniIcons={true}
        showUserIcon={true}
        location={location}
        history={history}
        match={match}
      />
      <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
        <BreadCrumbs />
        <div className="rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
          {isLoading ? (
            <div className="mt-4">
              <Skeleton color="#f5f5f5" width="100%" height="50%" count={4} />
            </div>
          ) : (
            <div className="text-center">
              <h2 className="rc-beta markup-text mb-0">Search completed!</h2>
              Below are the products that best fit your cat's needs.
              <br />
              Click on the recommendations for more information.
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductFinder;
