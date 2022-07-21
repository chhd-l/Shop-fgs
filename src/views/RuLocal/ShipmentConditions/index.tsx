import BreadCrumbs from '@/components/BreadCrumbs';
import Header from '@/components/Header';
import React from 'react';
import { Button } from '@/components/Common';
import ExplanationTable from './components/ExplanationTable';
import ShipmentConditionsTable from './components/ShipmentConditionsTable';
import ReturnList from './components/ShipmentConditionsReturnList';
import Footer from '@/components/Footer';

const FileUrl =
  window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX +
  '/img/ru-local/shipment-conditions/';

const ShipmentConditions = () => {

  return (
    <div className="text-black ShipmentConditions">
      <Header showMiniIcons={true} showUserIcon={true} />
      <div className="relative rc-content--fixed-header">
        <div className="p-12">
          <BreadCrumbs />
        </div>
        <div className="md:px-24 py-12 px-8">
          <div className="relative h-full py-8 md:px-24 px-4 overflow-hidden">
            <img
              className="absolute top-0 left-0 w-full"
              src={`${FileUrl}10003.jpg`}
              style={{
                zIndex: -1
              }}
              alt=""
            />
            <div className="h-cs-409 w-full md:max-w-500 md:max-h-420 bg-white px-8 md:py-8 py-4 md:mt-0" style={{
              marginTop: '46%'
            }}>
              <h1 className="md:text-cs-40 md:leading-cs-56 text-red-500 mb-4">
                Условия доставки интернет-магазина ROYAL CANIN®
              </h1>
              <p className='font-light'>
                Доставка заказов до двери по{' '}
                <span>Москве и Московской области</span> осуществляется
                курьерской компанией{' '}
                <strong>Logsis (ООО «Логсис Групп»).&nbsp;</strong>Доставка
                заказов по <strong>другим регионам России</strong>{' '}
                осуществляется курьерской компанией {' '}
                <strong>DPD (АО «ДПД РУС»).&nbsp;&nbsp;</strong>В случае если у
                вас возникли вопросы по статусу вашего заказа, то вы можете
                обратиться в нашу Службу заботы по телефону{' '}
                <strong>8-800-200-37-35</strong> или проверить статус заказа на{' '}
                <a className='text-purple-800 underline' href="https://www.dpd.ru/ols/trace2/extended.do2"><strong>сайте</strong></a> (кроме Москвы и Московской области).
              </p>
            </div>
          </div>
        </div>
        <div className="h-2 bg-cs-gray-f6" />
        <div className="text-base mt-10 px-6 md:p-8">
          <div className="w-full max-w-screen-lg m-auto">
            <ReturnList />
            <ShipmentConditionsTable />
          </div>
        </div>
        <div className="h-2 bg-cs-gray-f6" />
        <ExplanationTable />
        <div className="flex max-w-900 flex-col-reverse md:flex-row m-auto mb-16 px-8 md:p-0">
          <div className="md:m-0 m-auto">
            <img
              src={FileUrl + '10001.png'}
              alt=""
              className=" w-full h-full md:w-cs-240 "
            />
          </div>
          <div className="flex-col ml-0 md:ml-cs-22 md:text-left text-center">
            <h2 className="text-cs-primary text-30 leading-cs-40 text-center md:text-left">
              Остались вопросы?
            </h2>
            <p className="text-center md:text-left mt-cs-16 mb-cs-36">
              Наши эксперты здесь, чтобы помочь Вам!
            </p>
            <Button type="primary">Связаться с нами</Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShipmentConditions;
