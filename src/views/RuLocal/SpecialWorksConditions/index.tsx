import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Progress from '../components/Progress';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { specialWorksConditions_contents } from '../modules/specialWorksConditions';
import './index.less';

const SpecialWorksConditions = () => {
    const [ToOpen, setToOpen] = useState(false)

    const handlScroll = () => {
      const windowTop =
        document.querySelector('#ReturnToTop')?.getBoundingClientRect().top || 0;
        console.log('windowTop',windowTop)
        if(windowTop <= -500 && windowTop >= -1000) setToOpen(true)
        else setToOpen(false)
    };
  
    useEffect(() => {
      window.addEventListener('scroll', handlScroll, true);
      return () => {
        window.removeEventListener('scroll', handlScroll, true);
      };
    }, []);

  return (
    <div className="ui-custom-hub text-black specialWorksConditions">
      <Header showMiniIcons={true} showUserIcon={true} />
      <div className="relative rc-content--fixed-header text-base">
        <Progress />
        <div className="md:p-8 pb-8 pt-6 px-3">
          <div className="Информацияокомпании inline-block relative md:ml-16 ml-5 border-white border-solid border-b-2 hover:border-red-600">
            <Link className="cursor-pointer hover:text-red-600" to="/about-us">
              Информация о компании
            </Link>
          </div>
        </div>
        <div id='ReturnToTop' className="md:p-8 pl-8 px-3">
          <div className="max-w-screen-md m-auto">
            <ol className="md:p-8 p-0">
              {specialWorksConditions_contents.map((item, idx) => (
                <li className='mb-8' key={idx}>
                  <h3 className="flex items-center">
                    <span className="mr-1">{idx + 1}.</span>
                    <div className="border-white border-solid border-b-2 hover:border-red-600">
                      <a
                        href={item.url}
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
        <div className={`md:${ToOpen ? 'fixed top-3/4' : 'absolute top-cs-89%'} md:bg-transparent md:p-0 py-10 px-2.5 bg-cs-gray-150 right-32`}>
          <div className="flex flex-col items-center">
            <span className="w-14 h-14"
                style={{
                    background: `url(${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/ru-local/pdf/up-icon.png) no-repeat center`,
                    backgroundSize: '100% 100%'
                }}
            />
            <p className='mt-1.5'>Вернуться к началу</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SpecialWorksConditions;