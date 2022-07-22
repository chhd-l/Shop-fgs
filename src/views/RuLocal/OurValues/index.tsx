import BreadCrumbs from '../components/BreadCrumbs';
import { Button } from '@/components/Common';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React from 'react';
import FootLink from '../components/FootLink';
import MyTab from '../components/MyTab';
import { linkList, value10003 } from './mock';
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
      <Header showMiniIcons={true} showUserIcon={true} />
      <div className="relative rc-content--fixed-header">
      <BreadCrumbs />
        <div className="p-cs-2 max-w-1400 mx-auto">
          <div className="p-cs-1 mt-28">
            <h1 className=" text-cs-primary text-center text-4vw leading-4.3vw">
              Здоровье питомцев — наша главная забота
            </h1>
            <p className="text-16 text-center">
              Все, что мы делаем, обусловлено стремлением заботиться о здоровье
              и благополучии каждой кошки и собаки.
            </p>
          </div>
          <div className="bg-cs-gray-f6 w-full h-cs-8" />
          <div className="px-cs-2 mt-cs-36">
            <MyTab tabList={tabList} />
          </div>
          <div className="bg-cs-gray-f6 w-full h-cs-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 py-cs-30">
            <div className="flex w-full justify-end order-last md:order-first col-span-1">
              <img
                src={value10003}
                alt=""
                className=" w-full h-full md:w-cs-240 md:h-cs-180 "
              />
            </div>
            <div className="text-center md:text-left col-span-2">
              <h2 className="text-cs-primary text-30 text-center md:text-left">
                Устойчивое развитие
              </h2>
              <p className="text-16 text-cs-gray text-center md:text-left mt-cs-16 mb-cs-36">
                Наш подход к обеспечению устойчивого развития заключается в том,
                что мы относимся к домашним животным, людям и планете с
                уважением, которого они заслуживают.
              </p>
              <Button>Узнайте больше</Button>
            </div>
          </div>
          <div className="bg-cs-gray-f6 w-full h-cs-8" />
          <FootLink linkList={linkList} />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default OurValues;
