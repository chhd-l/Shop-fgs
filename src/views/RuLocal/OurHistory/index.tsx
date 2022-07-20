import BreadCrumbs from '@/components/BreadCrumbs';
import { Button } from '@/components/Common';
import React from 'react';
import MyTab from '../components/MyTab';
import { hirtory10001, hirtory10002 } from './mock';
import {
  Tab1960,
  Tab1970,
  Tab1980,
  Tab1990,
  Tab2000,
  Tab2010
} from './TabPanel';

const tabList = [
  { tab: '1960-е годы', element: <Tab1960 /> },
  {
    tab: '1970-е годы',
    element: <Tab1970 />
  },
  {
    tab: '1980-е годы',
    element: <Tab1980 />
  },
  {
    tab: '1990-е годы',
    element: <Tab1990 />
  },
  {
    tab: '2000-е годы',
    element: <Tab2000 />
  },
  {
    tab: '2010-е годы',
    element: <Tab2010 />
  }
];
const OurHistory = () => {
  return (
    <>
      <div className="p-cs-2 max-w-1400 mx-auto">
        <BreadCrumbs />
        <div className="p-cs-1 mt-28">
          <h1 className=" text-cs-primary text-center text-4vw leading-4.3vw">
            Более 50 лет в области здорового питания
          </h1>
          <p className="text-16 text-center">
            С 1968 года компания ROYAL CANIN® работает над тем, чтобы сделать
            питание одним из методов поддержания здоровья кошек и собак. Это наш
            способ сделать мир для домашних животных лучше.
          </p>
        </div>
        <MyTab tabList={tabList} />
      </div>
      <div className="bg-cs-gray-f6 w-full h-cs-8"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 pt-cs-66 pb-cs-88 px-cs-2">
        <div className="grid grid-cols-1  md:grid-cols-3 px-cs-30 items-end">
          <div className="col-span-1 flex items-end justify-end">
            <img
              src={hirtory10001}
              alt=""
              className=" w-full h-cs-180 md:w-cs-148 "
            />
          </div>
          <div className="ml-0 md:ml-cs-22 col-span-2">
            <h2 className="text-cs-primary text-30 leading-cs-40 text-center md:text-left">
              Наши ценности
            </h2>
            <p className=" text-center md:text-left mt-cs-16 mb-cs-36">
              Узнайте больше об идеях и ценностях, определяющих роль компании
              ROYAL CANIN® в мире.
            </p>
            <Button>Узнайте больше</Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 px-cs-30 items-end">
          <div className="col-span-1 flex justify-end">
            <img
              src={hirtory10002}
              alt=""
              className=" w-full h-cs-180 md:w-cs-148 "
            />
          </div>
          <div className="ml-0 md:ml-cs-22 col-span-2">
            <h2 className="text-cs-primary text-30 leading-cs-40 text-center md:text-left">
              Питание, учитывающее особые потребности
            </h2>
            <p className=" text-center md:text-left mt-cs-16 mb-cs-36">
              Наша работа основана на всестороннем и постоянно развивающемся и
              дополняющемся изучении основ здоровья и правильного питания
              животных.
            </p>
            <Button>Узнайте больше</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurHistory;
