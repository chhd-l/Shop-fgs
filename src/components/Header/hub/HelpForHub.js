import React from 'react';
import LazyLoad from 'react-lazyload';
import NavItem from './NavItemForHub';

function DescJSX({ item }) {
  return (
    <div className="dropdown-nav__help__text align-self-center">
      <h4 className="title rc-delta">{item.Content}</h4>
      <div
        className="desc children-nomargin text-left rc-text-colour--text"
        dangerouslySetInnerHTML={{ __html: item.Title }}
      />
    </div>
  );
}

function IconPanel({ item }) {
  return (
    <NavItem
      item={item}
      className="dropdown-nav__help__card call-us rc-border-all rc-border-colour--interface d-flex align-items-center"
    >
      <div className="rc-margin-right--xs flex-grow-1">
        <span className="medium">{item.Subtitle}</span>
        <div>
          {item.Link && item.Link.Url ? (
            <a href={item.Link.Url} className="rc-large-body tel red">
              {item.Title}
            </a>
          ) : (
            <span className="rc-large-body tel red">{item.Title}</span>
          )}
        </div>
        <div className="children-nomargin">
          <p>{item.Description}</p>
        </div>
      </div>
      <div className="rc-padding-left--xs">
        <span
          className="iconfont red"
          style={{ fontSize: '2rem' }}
          dangerouslySetInnerHTML={{
            __html: {
              contact: '&#xe61f;',
              email: '&#xe603;',
              advice: '&#xe64c;'
            }[item.Icon]
          }}
        />
      </div>
    </NavItem>
  );
}

export default function Help({ data }) {
  return (
    <div className="dropdown-nav__help d-md-flex">
      {data.MenuItems.map((item) => {
        return (
          <React.Fragment key={item.id}>
            {item.Icon ? <IconPanel item={item} /> : <DescJSX item={item} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}
