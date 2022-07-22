import React, { useState } from 'react';
import { IconTabList } from '../../mock';
import './index.less';

const IconTab = () => {
  const [active, setActive] = useState(0);
  return (
    <>
      <div className="flex flex-row justify-center cursor-pointer  overflow-scroll">
        {IconTabList.map((item, index) => (
          <div
            className={`icon_navigation-tab text-center ${
              active === index && 'active'
            }`}
            key={item.text}
            onClick={() => setActive(index)}
          >
            <img src={item.icon} alt="" className="image-rounded" />
            <span>{item.text}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-cs-64 mb-cs-48">
        <div className="w-full flex justify-center order-2 md:order-1 mt-cs-48 md:mt-0">
          <img
            src={IconTabList[active].path}
            alt=""
            className=" max-w-320 max-h-242"
          />
        </div>
        <div className=" px-cs-4 md:pr-cs-240 order-1 md:order-2">
          {IconTabList[active].list.map((item) => (
            <p key={item} className=" mb-cs-16 text-16 text-cs-gray">
              {item}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default IconTab;
