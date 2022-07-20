import BreadCrumbs from '@/components/BreadCrumbs';
import React from 'react';
import { cardList } from './mock';
const Sustainability = () => {
  return (
    <>
      <div className="p-cs-2 max-w-1400 mx-auto">
        <BreadCrumbs />
        <div className="p-cs-1 mt-28">
          <h1 className=" text-cs-primary text-center text-4vw leading-4.3vw">
            Наше видение устойчивого развития
          </h1>
          <p className="text-16 text-center px-0 md:px-cs-7">
            ROYAL CANIN® стремится делать жизнь домашних животных лучше, ставя
            потребности кошек и собак на первое место. Но это не всё: наш
            нутриентный подход к питанию позволяет нам учитывать воздействие
            каждой разрабатываемой нами формулы продукта на окружающую среду и
            общество, при этом обеспечивая домашних животных качественным,
            полезным и безопасным питанием. И наш путь к устойчивому развитию на
            этом не заканчивается: мы неустанно уменьшаем воздействие на планету
            и людей, делая нашу деятельность более экологически и социально
            ответственной.
          </p>
          <h1 className="text-center text-40 text-cs-primary mt-cs-100  px-0 md:px-cs-7">
            Принципы устойчивого развития, которыми руководствуется ROYAL CANIN®
          </h1>

          <h2 className="text-30  text-cs-primary text-center mt-cs-100">
            Наш путь к углеродной нейтральности
          </h2>
          <div className=" px-0 md:px-cs-272 text-center mt-cs-16 text-16 text-cs-gray">
            <p>
              В рамках обязательства Mars, Incorporated по достижению нулевых
              выбросов парниковых газов на всех этапах производственно-сбытовой
              цепи к 2050 году бренд ROYAL CANIN® взял на себя обязательство
              получить к 2025 году сертификат об углеродной нейтральности, а его
              первая линейка продуктов должна быть сертифицирована как
              углеродно-нейтральный продукт в 2022 году.
            </p>
            <p className="mt-cs-16">
              Бренд ROYAL CANIN® планирует использовать надежный и
              международно-признанный стандарт PAS 2060 углеродной нейтральности
              и будет придерживаться информационной открытости, регулярно
              отчитываясь о своем пути.
            </p>
            <p className="mt-cs-16">
              Для достижения углеродной нейтральности к 2025 году, мы предпримем
              следующие шаги:{' '}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 py-cs-36 px-0 md:px-cs-200">
            {cardList.map((item, index) => (
              <div className="max-w-full h-full md:max-w-cs-284 md:h-cs-409 shadow-sm px-cs-30 mt-cs-24">
                <h3 className="text-20 font-medium text-cs-primary text-center">
                  {index}.
                </h3>
                <p className="text-center text-16">
                  <strong>{item.strong}</strong>
                  {item.span}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sustainability;
