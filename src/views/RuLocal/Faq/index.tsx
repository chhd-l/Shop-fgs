import BreadCrumbs from '@/components/BreadCrumbs';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React from 'react';

const Faq = () => {
  return (
    <div>
      <Header showMiniIcons={true} showUserIcon={true} />
      <main className="rc-content--fixed-header rc-bg-colour--brand3 px-8">
        <div className="p-12">
          <BreadCrumbs />
        </div>
        <div>
            <div className='max-w-screen-md m-auto p-1'>
            <h1 className='text-center mb-0 text-red-500'>Часто задаваемые вопросы</h1>
            <p className='text-center my-6'>
            Все, что мы делаем, обусловлено стремлением заботиться о здоровье и благополучии каждой кошки и собаки.
            </p>
            </div>
        <div className="h-2 bg-cs-gray-f6" />
        <div className='p-8'>
            <div className='pt-8'>
            <h1 className='text-center mb-0 text-red-500'>Доставка</h1>
            </div>
        </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Faq;
