import React from 'react';
import LazyLoad from 'react-lazyload';
import NavItem from './NavItemForHub';

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
    <NavItem
      item={item}
      className="dropdown-nav__help__card call-us rc-border-all rc-border-colour--interface d-flex align-items-center"
    >
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
      <div className="rc-padding-left--xs">
        <span
          className="iconfont red"
          style={{ fontSize: '2rem' }}
          dangerouslySetInnerHTML={{
            __html: {
              Contact: '&#xe61f;',
              Email: '&#xe603;',
              Advice: '&#xe64c;'
            }[item.icon]
          }}
        />
      </div>
    </NavItem>
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
