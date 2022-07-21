import React from 'react';
import { IconTabList } from '../../mock';
import './index.less';

const IconTab = () => {
  return (
    <div className="flex flex-row justify-center cursor-pointer ">
      {IconTabList.map((item) => (
        <div className="icon_navigation-tab text-center" key={item.text}>
          <img src={item.icon} alt="" className="image-rounded" />
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  );
};

export default IconTab;
