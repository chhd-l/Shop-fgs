import React from 'react';
import { Link } from 'react-router-dom';
import { cat, dog } from './mock';

type RenderProps = {
  path: string;
  label: string;
  title: string;
  img: string;
};
const Render = ({ path, label, title, img }: RenderProps) => {
  return (
    <div className="rc-column rc-single ">
      <div
        className="rc-padding--sm rc-full-width rc-margin-bottom--xs rc-bg-colour--brand3 "
        data-component="content-animation"
        id="content-block-with-text-and-image-15-tailored-nutrition-page"
      >
        <div className="rc-padding-y--md rc-md-down"></div>
        <div className="rc-layout-container rc-one-column rc-max-width--xl">
          <div className="rc-column">
            <div className="rc-full-width ">
              <img className="lazyautosizes lazyloaded" src={img} alt="" />
            </div>
          </div>
        </div>
        <div className="rc-layout-container rc-one-column rc-max-width--xl">
          <div className="rc-column">
            <div className="rc-full-width rc-text--center ">
              <div className="rc-container-text">
                <h4>{label}</h4>
                <h2 className="rc-beta " data-en-title="Корм для котят">
                  {title}
                </h2>
                <Link className="rc-btn rc-btn--two" to={path}>
                  Узнайте больше
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="rc-padding-y--md rc-md-down"></div>
      </div>
    </div>
  );
};
export const TabPanel1 = () => {
  return (
    <div className="rc-layout-container rc-two-column rc-content-h-middle rc-max-width--xl ">
      {cat.map((item, index) => (
        <Render {...item} key={index} />
      ))}
      <div className="rc-column rc-single "></div>
    </div>
  );
};

export const TabPanel2 = () => {
  return (
    <div className="rc-layout-container rc-two-column rc-content-h-middle rc-max-width--xl ">
      {dog.map((item, index) => (
        <Render {...item} key={index} />
      ))}
      <div className="rc-column rc-single "></div>
    </div>
  );
};
