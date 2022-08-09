import BreadCrumbs from '../components/BreadCrumbs';
import { Footer, Header } from '@/components';
import React from 'react';
import MyTab from '../components/MyTab';
import {
  Tab1960,
  Tab1970,
  Tab1980,
  Tab1990,
  Tab2000,
  Tab2010
} from './TabPanel';
import HistoryFoot from './components/HistoryFoot';

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
      <Header showMiniIcons={true} showUserIcon={true} />
      <div className="relative rc-content--fixed-header">
        <div className="px-cs-1 max-w-1400 mx-auto">
          <BreadCrumbs />
          <div className="p-cs-1 md:mt-28 mt-0">
            <h1 className=" text-cs-primary text-center text-30 leading-cs-40">
              Более 50 лет в области здорового питания
            </h1>
            <p className="text-16 text-center">
              С 1968 года компания ROYAL CANIN® работает над тем, чтобы сделать
              питание одним из методов поддержания здоровья кошек и собак. Это
              наш способ сделать мир для домашних животных лучше.
            </p>
          </div>
        </div>
        <div className="bg-cs-gray-f6 w-full h-cs-8" />
        <div className="md:px-cs-1 px-0 mt-cs-36">
          <MyTab tabList={tabList} />
        </div>
        <div className="bg-cs-gray-f6 w-full h-cs-8" />
        <HistoryFoot />
      </div>
      <Footer />
    </>
  );
};

export default OurHistory;
