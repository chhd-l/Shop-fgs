import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Progress from '../components/Progress';
import React from 'react';
// import { Link } from 'react-router-dom';
import { specialWorksConditions_contents } from '../modules/specialWorksConditions';
import './index.less';
import BreadCrumbs from '../components/BreadCrumbs';
import RuLocalReturnTo from '../components/RuLocalReturnTo';

const FileUrl = window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX

const SpecialWorksConditions = () => {
  return (
    <div className="text-black specialWorksConditions">
      <Header showMiniIcons={true} showUserIcon={true} />
      <div id='ReturnTo' className="relative rc-content--fixed-header text-base" style={{
        zIndex: '-1'
      }}>
        <Progress />
        <div className="md:p-8 pb-8 pt-6 px-3">
          <BreadCrumbs noHomeLink />
        </div>
        <div id='ListOfDocuments' className="md:p-8 pl-8 px-3">
          <div className="max-w-screen-md m-auto">
            <ol className="md:p-8 p-0">
              {specialWorksConditions_contents.map((item, idx) => (
                <li className='mb-8' key={idx}>
                  <h3 className="flex items-center">
                    <span className="mr-1">{idx + 1}.</span>
                    <div className="border-white border-solid border-b-2 hover:border-red-600">
                      <a
                        href={`${FileUrl}/img/ru-local/pdf/${item.url}`}
                        className="transition-colors duration-200 hover:text-red-600"
                      >
                        {item.span}
                      </a>
                    </div>
                  </h3>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <RuLocalReturnTo start={-500} end={-900} />
      </div>
      <Footer />
    </div>
  );
};

export default SpecialWorksConditions;
