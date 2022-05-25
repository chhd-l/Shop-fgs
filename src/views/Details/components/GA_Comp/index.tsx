import React, { useState,  useEffect } from 'react'
import GoogleTagManager from '@/components/GoogleTagManager';
import { useLocation } from 'react-router-dom'

interface Props {
  details: any
  props: any
}

const GA_Comp = ({details, props}: Props) => {
  let location = useLocation()
  const [event, setEvent] = useState({})
  const [ecoEvents, setEcoEvents] = useState({})
  const [GAListParam, setGAListParam] = useState('')

  

//商品详情页 埋点
const GAProductDetailPageView = (item: any) => {
  const ecoEvents = {
    event: `${window.__.env.REACT_APP_GTM_SITE_ID}eComProductView`,
    ecommerce: {
      currencyCode: window.__.env.REACT_APP_GA_CURRENCY_CODE,
      detail: {
        actionField: {
          list: GAListParam //list's name where the product was clicked from (Catalogue, Homepage, Search Results)
        },
        products: [
          {
            id: item.goodsNo, //?goodsId客户反馈不对，id这里为空
            name: item.goodsName,
            price: item.minMarketPrice,
            brand: item.brandName || 'ROYAL CANIN',
            club: 'no',
            category: item.goodsCateName,
            variant:
              item.goodsSpecDetails &&
              item.goodsSpecDetails[0] &&
              parseInt(item.goodsSpecDetails[0].detailName),
            sku: item.goodsInfos.length && item.goodsInfos[0].goodsInfoNo
          }
        ]
      }
    }
  };
  setEcoEvents(ecoEvents)
}

useEffect(() => {
  if (location.state) {
    if (!!location.state.GAListParam) {
      setGAListParam(location.state.GAListParam)
    }
  }
}, [])
useEffect(() => {
  if(details?.goodsInfos?.length) {
    GAProductDetailPageView(details)
  }
}, details)
  useEffect(() => {
    const fromPathName =
      location.state?.historyBreads?.[0]?.link?.pathname || location.pathname;
      let theme = '';
      let specieId = 0;
    if (fromPathName?.indexOf('dog') > -1) {
      theme = 'Dog';
      specieId = 2;
    }
    if (fromPathName?.indexOf('cat') > -1) {
      theme = 'Cat';
      specieId = 1;
    }
    setEvent({
      page: {
        type: 'product',
        theme: '',
        path: location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: ''
      },
      pet: {
        specieId: ''
      }
    })
  }, [])
  return (
    <div>
      {Object.keys(event).length ? (
        <GoogleTagManager
          key={props.location.key}
          additionalEvents={event}
          ecommerceEvents={ecoEvents}
        />
      ) : null}
    </div>
  )
}

export default GA_Comp