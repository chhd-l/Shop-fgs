import React from 'react';
import './index.less';
import {
  Tab1960Data,
  Tab1970Data,
  Tab1980Data,
  Tab1990Data,
  Tab2000Data,
  Tab2010Data
} from './mock';

const textSize = 'max-w-screen-md mx-auto m-7';

export type TextRenderProps = {
  title: string;
  desc: string;
  path: string;
};
const Render = ({ title, desc, path }: TextRenderProps) => {
  return (
    <div className="md:mt-16 md:px-cs-6 px-0">
      <img src={path} alt="" className="" />
      <div className={textSize}>
        <h2 className=" text-26 text-rc-red text-center">{title}</h2>
        <p className="mt-4 text-center text-16 text-cs-gray">{desc}</p>
      </div>
    </div>
  );
};
export const Tab1960 = () => {
  return (
    <div>
      {Tab1960Data.map((item) => (
        <Render
          title={item.title}
          path={item.path}
          desc={item.desc}
          key={item.title}
        />
      ))}
    </div>
  );
};

export const Tab1970 = () => {
  return (
    <div>
      {Tab1970Data.map((item) => (
        <Render
          title={item.title}
          path={item.path}
          desc={item.desc}
          key={item.title}
        />
      ))}
    </div>
  );
};

export const Tab1980 = () => {
  return (
    <div>
      {Tab1980Data.map((item) => (
        <Render
          title={item.title}
          path={item.path}
          desc={item.desc}
          key={item.title}
        />
      ))}
    </div>
  );
};

export const Tab1990 = () => {
  return (
    <div>
      {Tab1990Data.map((item) => (
        <Render
          title={item.title}
          path={item.path}
          desc={item.desc}
          key={item.title}
        />
      ))}
    </div>
  );
};

export const Tab2000 = () => {
  return (
    <div>
      {Tab2000Data.map((item) => (
        <Render
          title={item.title}
          path={item.path}
          desc={item.desc}
          key={item.title}
        />
      ))}
    </div>
  );
};

export const Tab2010 = () => {
  return (
    <div>
      {Tab2010Data.map((item) => (
        <Render
          title={item.title}
          path={item.path}
          desc={item.desc}
          key={item.title}
        />
      ))}
    </div>
  );
};
