import React from 'react';
import { Link } from 'react-router-dom';
import { linkList } from '../../mock';

const HistoryFoot = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 pt-cs-2 pb-cs-88 px-cs-2">
      {linkList.map((item) => (
        <div
          className="grid grid-cols-1  md:grid-cols-3 md:px-cs-30 px-0 items-end"
          key={item.title}
        >
          <div className="col-span-1 flex items-end justify-end order-2 md:order-1 px-0 md:px-cs-40 pt-0 md:pt-cs-24">
            <img src={item.path} alt="" className=" w-full h-full " />
          </div>
          <div className=" col-span-2 md:text-left text-center  order-1 md:order-2">
            <h2 className="text-cs-primary text-30 leading-cs-40 md:text-left text-center">
              {item.title}
            </h2>
            <p className=" md:text-left text-center mt-cs-16 mb-cs-36 text-16">
              {item.desc}
            </p>
            <Link to={item.link} className="rc-btn rc-btn--two">
              {item.buttonText}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryFoot;
