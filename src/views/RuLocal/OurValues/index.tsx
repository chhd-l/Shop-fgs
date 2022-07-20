import BreadCrumbs from '@/components/BreadCrumbs';
import { Button } from '@/components/Common';
import React from 'react';
import MyTab from '../components/MyTab';
import { value10003 } from './mock';
import {
  ElementKnowledge,
  ElmentenAccuracy,
  ElmentenPetNeeds,
  ElmentenRespect,
  ElmentenThusiasm
} from './TabPanel';

const tabList = [
  {
    tab: 'Знания',
    element: <ElementKnowledge />
  },
  {
    tab: 'Увлеченность',
    element: <ElmentenThusiasm />
  },
  {
    tab: 'Потребности питомцев',
    element: <ElmentenPetNeeds />
  },
  {
    tab: 'Точность',
    element: <ElmentenAccuracy />
  },
  {
    tab: 'Уважение',
    element: <ElmentenRespect />
  }
];
const OurValues = () => {
  return (
    <>
      <div className="p-cs-2 max-w-1400 mx-auto">
        <BreadCrumbs />
        <div className="p-cs-1 mt-28">
          <h1 className=" text-cs-primary text-center text-4vw leading-4.3vw">
            Здоровье питомцев — наша главная забота
          </h1>
          <p className="text-16 text-center">
            Все, что мы делаем, обусловлено стремлением заботиться о здоровье и
            благополучии каждой кошки и собаки.
          </p>
        </div>
        <div className="bg-cs-gray-f6 w-full h-cs-8" />
        <div className="px-cs-2 mt-cs-36">
          <MyTab tabList={tabList} />
        </div>
        <div className="bg-cs-gray-f6 w-full h-cs-8" />
        <div className="grid grid-cols-1 md:grid-cols-2">
          <img src={value10003} alt="" className="order-last md:order-first" />
          <div className="text-center md:text-left">
            <h2 className="text-cs-primary text-30 text-center md:text-left">
              Устойчивое развитие
            </h2>
            <p className="text-16 text-cs-gray text-center md:text-left">
              Наш подход к обеспечению устойчивого развития заключается в том,
              что мы относимся к домашним животным, людям и планете с уважением,
              которого они заслуживают.
            </p>
            <Button>Узнайте больше</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurValues;
