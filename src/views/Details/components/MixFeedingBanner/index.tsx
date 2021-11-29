import React, {useEffect, useState} from 'react'
import './index.less'

const MixFeedingBanner = ({originalProductInfo, mixFeedingByProductInfo}) =>{
  const {imageSrc, goodsTitle, technology} = originalProductInfo
  console.log(technology,'technologytechnology')
  return (
    <div className="mix-feeding-sticky-banner">
      <div className="goods-info-warp flex items-center p-3">
        <div className="goods-info-image mr-4">
          <img src={imageSrc}/>
        </div>
        <div>
          <p className="text-sm mb-1">{technology.valueEn}</p>
          <p className="mb-0 goods-info-title">{goodsTitle}</p>
        </div>
      </div>
      <span className="rc-icon rc-plus--xs rc-iconography mx-3"></span>
      <div className="goods-info-warp flex items-center p-3">
      <div className="goods-info-image mr-4">
          <img src={mixFeedingByProductInfo.imageSrc}/>
        </div>
        <div>
          <p className="text-sm mb-1">{technology.value ? technology.value === 'dry'?'Влажный':"Сухой":'' }</p>
          <p className="mb-0 goods-info-title">{mixFeedingByProductInfo.goodsTitle}</p>
        </div>
      </div>
    </div>
  )
}

export default MixFeedingBanner