import React from 'react';
import LazyLoad from 'react-lazyload';
import NavItem from './NavItemForHub';
import { HelpDivWrapper } from '../style';

function DescJSX({ item }) {
  return (
    <div
      className="dropdown-nav__help__text align-self-center w-full"
      // style={{ minWidth: '250px' }}
    >
      <h1 className="title rc-delta mb-1 -mt-2 ui-text-overflow-line2">
        {item.Title}
      </h1>
      <div
        className="desc ui-contact-us-info children-nomargin text-left rc-text-colour--text ui-text-overflow-line2"
        dangerouslySetInnerHTML={{ __html: item.Content }}
      />
    </div>
  );
}

function IconPanel({ data, item, handleClickNavItem }) {
  return (
    <NavItem
      item={item}
      className={`dropdown-nav__help__card call-us rc-border-all rc-border-colour--interface d-flex align-items-center dropdown-nav__help__card_${item.Icon} ml-0 hover:border-rc-red h-full`}
      style={{ minHeight: 'auto' }}
      onClick={() => {
        handleClickNavItem({
          item: data,
          cItem: item
        });
      }}
    >
      <div className="rc-margin-right--xs flex-grow-1 text-nowrap11">
        <span
          className="font-medium md:font-light"
          style={{ color: '#767676' }}
        >
          {item.Subtitle}
        </span>

        {/* <div className="children-nomargin">
          <p>{item.Description}</p>
        </div> */}
      </div>
      <div className="flex items-center">
        {/* <span
          className="iconfont red rc-padding--xs font-medium"
          style={{ fontSize: '1.5rem' }}
          dangerouslySetInnerHTML={{
            __html: {
              contact: '&#xe61f;',
              email: '&#xe603;',
              advice: '&#xe64c;'
            }[item.Icon]
          }}
        /> */}
        <span className={`rc-icon rc-brand1 rc-${item.Icon}--sm`} />
        {item.contactPhone ? (
          <div className="title rc-delta mb-0">{item.contactPhone}</div>
        ) : null}
      </div>
    </NavItem>
  );
}

const InfoTextContactMenuItem = ({ item }) => {
  return (
    <p className="ui-text-overflow-line3 text-sm" style={{ maxWidth: 650 }}>
      {item.InfoText}
    </p>
  );
};

export default function Help({ data, handleClickNavItem }) {
  return (
    <HelpDivWrapper className="dropdown-nav__help grid grid-cols-12 gap-4 md:p-0 px-4">
      {data.MenuItems.map((item) => {
        return (
          <React.Fragment key={item.id}>
            {item.Icon ? (
              <div className="col-span-12 md:col-span-4">
                <IconPanel
                  data={data}
                  item={item}
                  handleClickNavItem={handleClickNavItem}
                />
              </div>
            ) : item.Type === 'InfoTextContactMenuItem' ? (
              <div className="col-span-12">
                <InfoTextContactMenuItem item={item} />
              </div>
            ) : (
              <div className="col-span-12">
                <DescJSX item={item} />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </HelpDivWrapper>
  );
}
