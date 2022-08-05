import React from 'react';
import {
  ShipmentConditionsTable_DPD,
  ShipmentConditionsTable_Kak,
  ShipmentConditionsTable_lists
} from '../../modules/ShipmentConditions';

const ShipmentConditionsTable = () => {
  return (
    <div>
      <div>
        <h1 className="my-6 text-red-500 font-light">Доставка по России*</h1>
        <p className="mb-6">
          При заказе на сумму от 2500 руб. доставка бесплатна.
        </p>
        <p className="mb-3">
          Доставка в Калининградскую область, Камчатский край, Магаданскую обл.,
          Ненецкий автономный округ, Ханты-Мансийский автономный округ,
          Сахалинскую обл., Чукотский автономный округ и Якутию временно не
          осуществляется.
        </p>
        <div className="border border-solid text-center">
          {ShipmentConditionsTable_lists.map((strs, idx) => {
            return (
              <div
                key={idx}
                className={`hover:bg-cs-gray-f6 flex py-5 ${idx !== 0 && 'border-t border-solid'}`}
              >
                {strs.map((str, index) => (
                  <div
                    className="flex-1 px-2 flex items-center justify-center"
                    key={index}
                  >
                    {str}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
        <p className="mt-4">
          *В таблице указана стоимость и сроки доставки в областные центры.
          Расширенную информацию по стоимости и срокам доставки в другие города
          России Вы можете узнать из{' '}
          <a
            className="transition-colors hover:text-red-600 border-solid border-transparent border-b hover:border-red-600"
            href={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/ru-local/shipment-conditions/PDF_1.pdf`}
          >
            <strong>файла</strong>
          </a>{' '}
          или связавшись с нами по телефону Службы заботы 8 800 200 37 35
          (звонок по России бесплатный). Возможность доставки, а также стоимость
          и сроки доставки будут отображены автоматически при выборе региона и
          города доставки в процессе формирования заказа на сайте.
        </p>
        <p className="mt-4">
          <span className="underline ">
            Обратите внимание при заказе в регионы России:
          </span>
          <br />
          Проверяйте правильность индекса и полного адреса доставки (и деталей
          адреса), наличие и корректность телефона указанного Вами при
          оформлении заказа. От правильности и полноты этих данных зависит
          доставка Вашего заказа и правильный расчет стоимости доставки. Заказ
          не может быть доставлен, если не указан контактный телефон или указан
          неправильный номер.
        </p>
      </div>
      <div className="md:-mx-32">
        <div>
          <h1 className="mb-6 mt-14 text-red-500 text-2xl font-light text-center">
            При доставке транспортной компанией DPD Вы получаете:
          </h1>
          <div className="md:flex-row flex-col flex justify-between">
            {ShipmentConditionsTable_DPD.map((item, idx) => (
              <div
                className="md:w-cs-29/100 p-8 text-center"
                key={idx}
                style={{
                  boxShadow: '0 8px 15px rgb(0 0 0 / 10%)'
                }}
              >
                <img
                  className="w-8 m-auto mb-8"
                  src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/ru-local/shipment-conditions/${item.url}@2x.png`}
                  alt=""
                />
                <p className=' text-lg'>{item.span}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1 className="mb-6 mt-14 text-red-500 text-2xl font-light text-center">
            Как пользоваться данными функциями:
          </h1>
          <div className="flex items-end justify-between md:flex-row flex-col">
            {ShipmentConditionsTable_Kak.map((item, idx) => (
              <div className="md:w-cs-31/100 pb-8 pt-16" key={idx}>
                <p className=' text-lg'>
                  {item.span} <strong>{item.strong}</strong>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentConditionsTable;
