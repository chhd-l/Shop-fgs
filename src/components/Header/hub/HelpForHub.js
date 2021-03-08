import React from 'react';
import LazyLoad from 'react-lazyload';
import NavItem from './NavItemForHub';

function DescJSX({ item }) {
  return (
    <div
      className="dropdown-nav__help__text align-self-center"
      style={{ width: '250px' }}
    >
      <h4 className="title rc-delta">{item.Title}</h4>
      <div
        className="desc children-nomargin text-left rc-text-colour--text"
        dangerouslySetInnerHTML={{ __html: item.Content }}
      />
    </div>
  );
}

function IconPanel({ data, item, handleClickNavItem }) {
  return (
    <NavItem
      item={item}
      className="dropdown-nav__help__card call-us rc-border-all rc-border-colour--interface d-flex align-items-center"
      onClick={() => {
        handleClickNavItem({
          item: data,
          cItem: item
        });
      }}
    >
      <div className="rc-margin-right--xs flex-grow-1 text-nowrap">
        <span className="medium">{item.Subtitle}</span>
        {item.contactPhone ? (
          <div className="title rc-delta mb-0">{item.contactPhone}</div>
        ) : null}
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

export default function Help({ data, handleClickNavItem }) {
  return (
    <div className="dropdown-nav__help d-md-flex">
      {data.MenuItems.map((item) => {
        return (
          <React.Fragment key={item.id}>
            {item.Icon ? (
              <IconPanel
                data={data}
                item={item}
                handleClickNavItem={handleClickNavItem}
              />
            ) : (
              <DescJSX item={item} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
