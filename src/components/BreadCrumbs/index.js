import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import BreadcrumbNameMap from './breadcrumbNameMap';
import { FormattedMessage } from 'react-intl';

const BreadCrumbs = withRouter((props) => {
  const { location, match } = props;
  const breadcrumbNameMap = BreadcrumbNameMap;

  const url = location.pathname;

  let mapData = breadcrumbNameMap[url] || breadcrumbNameMap[match.path] || [];

  return (
    <div className="rc-bg-colour--brand3" style={{ paddingTop: '1px' }}>
      <div className="rc-progress--breadcrumbs-stepped rc-max-width--xl rc-padding-x--sm rc-padding-y--xs">
        <ul
          className="d-flex"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          <li
            itemScope
            itemType="https://schema.org/ListItem"
            itemProp="itemListElement"
          >
            <Link
              to="/home"
              className="rc-styled-link rc-progress__breadcrumb mr-0"
              aria-label="Links to home page"
              itemType="https://schema.org/Thing"
              itemProp="item"
            >
              <span itemProp="name">
                <FormattedMessage id="homePage" />
              </span>
            </Link>
          </li>
          {mapData.length > 0 && (
            <span itemProp="name" className="font-weight-normal ml-2 mr-2">
              &gt;
            </span>
          )}
          {mapData.map((item, index) => (
            <>
              <li
                key={index}
                itemScope
                itemType="https://schema.org/ListItem"
                itemProp="itemListElement"
              >
                {item.href ? (
                  <Link
                    className="rc-styled-link rc-progress__breadcrumb mr-0"
                    itemType="https://schema.org/Thing"
                    itemProp="item"
                    to={item.href}
                  >
                    <span itemProp="name">
                      <FormattedMessage id={`${item.name}`} />
                    </span>
                  </Link>
                ) : (
                  <FormattedMessage id={`${item.name}`}>
                    {(txt) => (
                      <span itemProp="name" title={txt}>
                        {txt}
                      </span>
                    )}
                  </FormattedMessage>
                )}
              </li>
              {index !== mapData.length - 1 && (
                <span className="font-weight-normal ml-2 mr-2">&gt;</span>
              )}
            </>
          ))}
        </ul>
      </div>
    </div>
  );
});

export default BreadCrumbs;
