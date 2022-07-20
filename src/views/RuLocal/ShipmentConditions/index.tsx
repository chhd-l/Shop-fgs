import BreadCrumbs from '@/components/BreadCrumbs';
import Header from '@/components/Header';
import React from 'react';
import { ShipmentConditions_contents } from '../modules/ShipmentConditions';
import ExplanationTable from './components/ExplanationTable';
import ShipmentConditionsTable from './components/ShipmentConditionsTable';
import './index.less'

const FileUrl = window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX;

const ShipmentConditions = () => {

  const returnList = (type: string, Subvalue:any) => {
        switch (type) {
            case 'span':
                return <p className='mb-16'>{Subvalue}</p>
            
            case 'list':
                return <div className='border border-solid relative'>
                    {
                        Subvalue.map((strs:string[], idx:number) => {
                            if(idx === 0) return <div className='hover:bg-cs-gray-f6 h-12 bg-white flex-1 border-t border-solid flex absolute left-1/2 w-1/2' style={{
                                transform: 'translateX(-50%)',
                                top: '3rem',
                            }}>
                                {strs.map((str:string, index:number) => <span key={index} className='flex-1 flex items-center justify-center'>{str}</span>)}
                            </div>
                            if(idx === 1) return <div className='flex h-24 hover:bg-cs-gray-f6'>
                                {strs.map((str:string, index:number) => {
                                    if(index === 1) return <div key={index} className='w-1/2 flex'><span className='h-1/2 flex items-center justify-center w-full'>{str}</span></div>
                                    return <div key={index} className='flex-1 flex items-center justify-center'>{str}</div>
                                })}
                            </div>
                            return <div className='flex hover:bg-cs-gray-f6 h-12 border-t border-solid'>
                            {strs.map((str:string, index:number) => <div key={index} className='flex-1 flex items-center justify-center'>{str}</div>)}
                        </div>
                        })
                    }
                </div>
        
            default:
                break;
        }
  }

  return (
    <div className="text-black ShipmentConditions">
      <Header showMiniIcons={true} showUserIcon={true} />
      <div className="relative rc-content--fixed-header">
        <div className="md:p-12">
          <BreadCrumbs />
        </div>
        <div className="px-24 py-12">
          <div className="relative h-full py-8 px-24">
            <div
              className="absolute top-0 left-0 w-full h-full"
              style={{
                background: `url(${FileUrl}/img/ru-local/shipment-conditions/10003.jpg) no-repeat center`,
                backgroundSize: 'auto',
                zIndex: '-1'
              }}
            />
            <div className="h-cs-409 w-full max-w-500 max-h-420 bg-white p-8">
              <h1 className="text-cs-40 leading-cs-56 text-red-500">
                Условия доставки интернет-магазина ROYAL CANIN®
              </h1>
              <p>
                Доставка заказов до двери по{' '}
                <span>Москве и Московской области</span> осуществляется
                курьерской компанией{' '}
                <strong>Logsis (ООО «Логсис Групп»).&nbsp;</strong>Доставка
                заказов по <strong>другим регионам России</strong>{' '}
                осуществляется курьерской компанией{' '}
                <strong>DPD (АО «ДПД РУС»).&nbsp;&nbsp;</strong>В случае если у
                вас возникли вопросы по статусу вашего заказа, то вы можете
                обратиться в нашу Службу заботы по телефону{' '}
                <strong>8-800-200-37-35</strong> или проверить статус заказа на{' '}
              </p>
            </div>
          </div>
          <div className="text-base mt-10 p-8">
              <div className="w-full max-w-screen-lg m-auto">
              {
                  ShipmentConditions_contents.map((item, idx) => <div key={idx}>
                      <h1 className='my-6 text-red-500 font-light'>{item.title}</h1>
                      {returnList(item.type, item.Subvalue)}
                  </div>)
              }
              <ShipmentConditionsTable />
              </div>
          </div>
        </div>
        <div className='h-2 bg-cs-gray-f6' />
        <ExplanationTable />
      </div>
    </div>
  );
};

export default ShipmentConditions;
