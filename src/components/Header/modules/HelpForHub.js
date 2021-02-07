import React from 'react';
import LazyLoad from 'react-lazyload';

function DescJSX({ item }) {
  return (
    <div className="dropdown-nav__help__text align-self-center">
      <h4 className="title rc-delta">{item.content}</h4>
      <div
        className="desc children-nomargin text-left rc-text-colour--text"
        dangerouslySetInnerHTML={{ __html: item.title }}
      />
    </div>
  );
}

function IconPanel({ item }) {
  return (
    <div className="dropdown-nav__help__card call-us rc-border-all rc-border-colour--interface d-flex align-items-center">
      <div className="rc-margin-right--xs flex-grow-1">
        <span className="medium">{item.subtitle}</span>
        <div>
          {item.link ? (
            <a href={item.link} className="rc-large-body tel red">
              {item.title}
            </a>
          ) : (
            <span className="rc-large-body tel red">{item.title}</span>
          )}
        </div>
        <div className="children-nomargin">
          <p>{item.description}</p>
        </div>
      </div>
      <div className="rc-padding-left--xs rc-lg-up">
        <LazyLoad>
          <img
            className="ls-is-cached lazyloaded"
            alt="Par téléphone icon"
            src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/icon callus@2x.png`}
          />
        </LazyLoad>
      </div>
      <div className="rc-padding-left--xs rc-md-down">
        <LazyLoad>
          <img
            className="lazyload"
            src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/icon callus@2x.png`}
            alt="Par téléphone icon"
          />
        </LazyLoad>
      </div>
    </div>
  );
}

export default function Help({ data }) {
  return (
    <div className="dropdown-nav__help d-md-flex">
      {data.menuItems.map((item) => {
        return (
          <React.Fragment key={item.id}>
            {item.icon ? <IconPanel item={item} /> : <DescJSX item={item} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}
