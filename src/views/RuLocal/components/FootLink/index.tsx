import React from 'react';
import { Link } from 'react-router-dom';

type FootLinkProps = {
  linkList: {
    path: string;
    title: string;
    desc: string;
    buttonText: string;
    link: string;
  }[];
};

const FootLink = ({ linkList }: FootLinkProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 pt-cs-66 pb-cs-88 px-cs-2">
      {linkList.map((item) => (
        <div
          className="grid grid-cols-1  md:grid-cols-3 px-cs-30 items-end"
          key={item.title}
        >
          <div className="col-span-1 flex items-end justify-end">
            <img src={item.path} alt="" className=" w-full h-full " />
          </div>
          <div className="ml-0 md:ml-cs-22 col-span-2 md:text-left text-center">
            <h2 className="text-cs-primary text-30 leading-cs-40 text-center md:text-left">
              {item.title}
            </h2>
            <p className=" text-center md:text-left mt-cs-16 mb-cs-36">
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

export default FootLink;
