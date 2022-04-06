import React, { Component, useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Selection from '@/components/Selection';
import Loading from '@/components/Loading';
import { ADDRESS_RULE } from './utils/constant';
import { backSpacerUP, backSpacerDOWN } from './utils/usPhone';
import { validData } from '@/utils/utils';
import { seoHoc } from '@/framework/common';
import './index.less';
import { submitContactUsInfo } from '@/api/staticPageApi';
import { Helmet } from 'react-helmet';

import Bitmap from './images/Bitmap.png';

const pageLink = window.location.href;

function JpContactUs(props) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div>
      <Helmet>
        <link rel="canonical" href={pageLink} />
      </Helmet>
      <div className="contactUs">
        {/* {isLoading ? <Loading bgColor={'#fff'} /> : null} */}
        <Header {...props} showMiniIcons={true} showUserIcon={true} />
        <div
          className="rc-content--fixed-header w-full"
          style={{ background: '#fff' }}
        >
          <div className="jp-contactUs w-full mt-16 mb-4 flex justify-center flex-wrap md:h-auto">
            <div className="jp-contactUs-top w-full flex justify-center md:justify-end flex-wrap md:flex-nowrap md:flex-none md:w-cs-920 clear-both md:relative md:pb-20">
              <h1 className="title-first md:w-cs-320 md:flex-shrink-0 md:float-left md:mb-6 text-center text-30 md:text-40 leading-8 md:absolute md:top-8 md:left-0 z-10">
                お問い合わせ窓口
              </h1>
              <img
                src={Bitmap}
                alt=""
                className="md:float-right w-cs-320 h-cs-246 md:w-cs-600 md:h-cs-450 md:order-2 "
              />
              {/* w-77/100 m-auto  w-77/100 md:w-auto m-auto*/}
              <p className="md:float-left md:w-cs-320 md:absolute md:top-28 md:left-0 z-10">
                <p
                  className="text-22 md:text-26 leading-7 md:leading-8 font-medium"
                  style={{
                    color: '#E2001A'
                  }}
                >
                  マイ ロイヤルカナンでお買
                  <br />
                  い上げの製品・サービス内
                  <br />
                  容について
                </p>
                <p className="text-22 mt-4 md:mt-2 mb-2 font-medium">
                  0120-253-912
                </p>
                <p
                  className="text-18 pb-12"
                  style={{ fontFamily: 'Ping Fang SC' }}
                >
                  <span
                    className="h-cs-68 inline-block mb-2 font-medium"
                    style={{ color: '#666', lineHeight: '34px' }}
                  >
                    受付時間: 月曜～土曜 11:00～16:00
                    <br />
                    日曜・祝日・弊社指定定休日を除く
                  </span>
                  <br />
                  <span
                    className="h-cs-68 inline-block font-medium"
                    style={{ color: '#E2001A', lineHeight: '34px' }}
                  >
                    受付時間: 月曜～土曜 11:00～16:00
                    <br />
                    日曜・祝日・弊社指定定休日を除く
                  </span>
                </p>
              </p>
            </div>
            <div
              className="h-2 w-full"
              style={{ backgroundColor: '#f6f6f6' }}
            ></div>
            <div className="jp-contactUs-bottom w-cs-288 md:w-cs-920 pt-12 md:pt-20 pb-16  md:pb-48 2xl:pb-16  clear-both">
              <h1
                className="md:text-center text-22 md:text-30 leading-7 md:leading-10  font-medium mb-4 md:mb-8 md:w-cs-4/5 m-auto"
                style={{
                  color: '#E2001A',
                  fontFamily: 'Ping Fang SC'
                }}
              >
                製品の内容や品質についてのお問い合わせ
              </h1>
              {/* flex justify-center flex-wrap */}
              <div className=" md:flex md:justify-between  m-auto">
                <div className="md:w-cs-439 md:h-cs-168">
                  <h1
                    className="text-18 leading-6 font-medium mb-4 md:w-cs-3/4"
                    style={{ fontFamily: 'Ping Fang SC', color: '#E2001A' }}
                  >
                    ペット専門店、ブリーダーがお奨めする総合栄養食について
                  </h1>
                  <p className="text-22 mb-4 font-medium">0120-125-850</p>
                  <p
                    className="text-18 font-medium leading-8"
                    style={{ fontFamily: 'Ping Fang SC', color: '#666' }}
                  >
                    受付時間：月曜～土曜 09:30～16:00
                    <br />
                    土曜・日曜・祝日。弊社指定定休日を除く
                  </p>
                </div>
                <div className="mt-4 md:mt-auto md:w-cs-439 md:h-cs-168">
                  <h1
                    className="text-18 leading-6 font-medium mb-4 md:mb-10"
                    style={{ fontFamily: 'Ping Fang SC', color: '#E2001A' }}
                  >
                    動物病院がお奨めする食事療法食について
                  </h1>
                  <p className="text-22 mb-4 font-medium">0120-618-505</p>
                  <p
                    className="text-18 font-medium leading-8"
                    style={{ fontFamily: 'Ping Fang SC', color: '#666' }}
                  >
                    受付時間：月曜～土曜 09:30～16:00
                    <br />
                    土曜・日曜・祝日。弊社指定定休日を除く
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default injectIntl(seoHoc('Contact Us Page')(JpContactUs));
