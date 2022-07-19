import BreadCrumbs from '@/components/BreadCrumbs';
import React from 'react';
const OurHistory = () => {
  return (
    <div className="p-cs-2">
      <BreadCrumbs />
      <div className="p-cs-1">
        <h1 className=" text-cs-primary text-center text-4vw leading-4.3vw">
          Более 50 лет в области здорового питания
        </h1>
        <p className="text-16 text-center">
          С 1968 года компания ROYAL CANIN® работает над тем, чтобы сделать
          питание одним из методов поддержания здоровья кошек и собак. Это наш
          способ сделать мир для домашних животных лучше.
        </p>
      </div>
    </div>
  );
};

export default OurHistory;
